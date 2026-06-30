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

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('rc_cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Persist to LocalStorage (Always)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('rc_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // 3. Background Sync to DB when User Logs In
  useEffect(() => {
    if (!isInitialized || !user) return;

    const syncWithDb = async () => {
      // Fetch cloud items
      const { data: cloudItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cloudItems && cloudItems.length > 0) {
        setItems(prev => {
          const merged = [...prev];
          cloudItems.forEach((dbItem: any) => {
            const id = `${dbItem.product_id}-${dbItem.size}-${dbItem.color}`;
            const exists = merged.find(i => i.id === id);
            if (!exists) {
              merged.push({
                id,
                productId: dbItem.product_id,
                name: dbItem.name,
                price: dbItem.price,
                size: dbItem.size,
                color: dbItem.color,
                qty: dbItem.qty,
                icon: dbItem.icon
              });
            }
          });
          return merged;
        });
      }
    };

    syncWithDb();
  }, [user, isInitialized]);

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      const updated = existing 
        ? prev.map(i => i.id === id ? { ...i, qty: i.qty + item.qty } : i)
        : [...prev, { ...item, id }];
      
      // Background sync to Supabase if logged in
      if (user) {
        const newItem = updated.find(i => i.id === id);
        if (newItem) {
          supabase.from('cart_items').upsert({
            user_id: user.id,
            product_id: newItem.productId,
            name: newItem.name,
            size: newItem.size,
            color: newItem.color,
            qty: newItem.qty,
            price: newItem.price,
            icon: newItem.icon
          }, { onConflict: 'user_id, product_id, size, color' }).then(({ error }: { error: unknown }) => {
            if (error) console.error("Sync error:", error);
          });
        }
      }
      return updated;
    });
  }, [user]);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const filtered = prev.filter(i => i.id !== id);
      const removedItem = prev.find(i => i.id === id);
      if (user && removedItem) {
        supabase.from('cart_items')
          .delete()
          .match({ user_id: user.id, product_id: removedItem.productId, size: removedItem.size, color: removedItem.color })
          .then();
      }
      return filtered;
    });
  }, [user]);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    
    setItems(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty } : i);
      const target = updated.find(i => i.id === id);
      if (user && target) {
        supabase.from('cart_items')
          .update({ qty })
          .match({ user_id: user.id, product_id: target.productId, size: target.size, color: target.color })
          .then();
      }
      return updated;
    });
  }, [user, removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    if (user) {
      supabase.from('cart_items').delete().eq('user_id', user.id).then();
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
