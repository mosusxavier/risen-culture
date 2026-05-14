'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export interface CartItem {
  id: string; // Internal id: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  qty: number;
  icon: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rc_cart');
    if (saved && !user) {
      setItems(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  // Handle User Login/Logout Cart Merging
  useEffect(() => {
    if (!isInitialized) return;

    if (user) {
      const syncCartToDb = async () => {
        // Fetch existing cloud cart
        const { data: cloudItems, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        let merged = [...(cloudItems || [])].map((dbItem: any) => ({
          id: `${dbItem.product_id}-${dbItem.size}-${dbItem.color}`,
          productId: dbItem.product_id,
          name: dbItem.name,
          price: dbItem.price,
          size: dbItem.size,
          color: dbItem.color,
          qty: dbItem.qty,
          icon: dbItem.icon
        }));

        // Merge local storage cart into cloud if local items exist
        const saved = localStorage.getItem('rc_cart');
        if (saved) {
          const localItems: CartItem[] = JSON.parse(saved);
          
          for (const localItem of localItems) {
            const existingCloudIndex = merged.findIndex(i => i.id === localItem.id);
            if (existingCloudIndex >= 0) {
              // Add quantities
              merged[existingCloudIndex].qty += localItem.qty;
              await supabase.from('cart_items').update({ qty: merged[existingCloudIndex].qty })
                .match({ user_id: user.id, product_id: localItem.productId, size: localItem.size, color: localItem.color });
            } else {
              merged.push(localItem);
              await supabase.from('cart_items').insert({
                user_id: user.id,
                product_id: localItem.productId,
                name: localItem.name,
                size: localItem.size,
                color: localItem.color,
                qty: localItem.qty,
                price: localItem.price,
                icon: localItem.icon
              });
            }
          }
          localStorage.removeItem('rc_cart');
        }
        
        setItems(merged);
      };

      syncCartToDb();
    } else {
      // User logged out, clear items and check local storage
      const saved = localStorage.getItem('rc_cart');
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user, isInitialized]);

  // Persist to local storage if NOT logged in
  useEffect(() => {
    if (isInitialized && !user) {
      localStorage.setItem('rc_cart', JSON.stringify(items));
    }
  }, [items, user, isInitialized]);

  const addItem = useCallback(async (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    
    // Optimistic UI Update
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, { ...item, id }];
    });

    if (user) {
      // Find current qty in DB first or just blindly upsert using ON CONFLICT? 
      // Supabase js upsert requires all unique keys. The DB has UNIQUE(user_id, product_id, size, color)
      // Since we optimistically updated state, let's just calculate the new total qty from state
      const existingItem = items.find(i => i.id === id);
      const newQty = existingItem ? existingItem.qty + item.qty : item.qty;

      const { error } = await supabase.from('cart_items').upsert({
        user_id: user.id,
        product_id: item.productId,
        name: item.name,
        size: item.size,
        color: item.color,
        qty: newQty,
        price: item.price,
        icon: item.icon
      }, { onConflict: 'user_id, product_id, size, color' });

      if (error) console.error("Error saving to cart:", error);
    }
  }, [user, items]);

  const removeItem = useCallback(async (id: string) => {
    const itemToRemove = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    
    if (user && itemToRemove) {
      await supabase.from('cart_items')
        .delete()
        .match({ user_id: user.id, product_id: itemToRemove.productId, size: itemToRemove.size, color: itemToRemove.color });
    }
  }, [user, items]);

  const updateQty = useCallback(async (id: string, qty: number) => {
    const targetItem = items.find(i => i.id === id);
    if (!targetItem) return;

    if (qty <= 0) {
      removeItem(id);
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
      if (user) {
        await supabase.from('cart_items')
          .update({ qty })
          .match({ user_id: user.id, product_id: targetItem.productId, size: targetItem.size, color: targetItem.color });
      }
    }
  }, [user, items, removeItem]);

  const clearCart = useCallback(async () => {
    setItems([]);
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem('rc_cart');
    }
  }, [user]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      totalItems, totalPrice, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
