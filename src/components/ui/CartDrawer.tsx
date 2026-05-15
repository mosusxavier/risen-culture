'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          zIndex: 2000, backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s, visibility 0.35s',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0, width: '400px', maxWidth: '100vw',
        zIndex: 2001, background: 'var(--off-black)',
        borderLeft: '1px solid var(--white-faint)',
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px', borderBottom: '1px solid var(--white-faint)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em' }}>
            YOUR CART
          </span>
          <button onClick={closeCart} style={{
            background: 'none', border: 'none', color: 'var(--white-dim)',
            fontSize: '1.1rem', cursor: 'pointer', transition: 'color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--white-dim)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'rgba(245,240,235,0.07)', marginBottom: '12px' }}>✝</div>
              <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Your cart is empty
              </p>
              <button onClick={closeCart} style={{
                marginTop: '20px', padding: '12px 28px', background: 'var(--burgundy)',
                border: 'none', color: 'var(--white)', cursor: 'pointer',
                fontFamily: 'var(--font-condensed)', fontSize: '0.75rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{
                display: 'flex', gap: '12px', padding: '16px 0',
                borderBottom: '1px solid var(--white-faint)',
              }}>
                {/* Icon placeholder */}
                <div style={{
                  width: '64px', height: '80px', background: 'var(--card-bg)',
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'rgba(123,28,46,0.4)',
                }}>
                  {item.icon}
                </div>
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--white)', marginBottom: '4px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)', marginBottom: '8px' }}>
                    Size: {item.size} · Color: {item.color}
                  </div>
                  {/* Qty + Price row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid rgba(245,240,235,0.1)' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{
                        width: '28px', height: '28px', background: 'none', border: 'none',
                        color: 'var(--white-dim)', cursor: 'pointer', fontSize: '0.9rem',
                      }}>−</button>
                      <span style={{ width: '28px', textAlign: 'center', fontFamily: 'var(--font-condensed)', fontSize: '0.82rem' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{
                        width: '28px', height: '28px', background: 'none', border: 'none',
                        color: 'var(--white-dim)', cursor: 'pointer', fontSize: '0.9rem',
                      }}>+</button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', fontWeight: 600 }}>
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} style={{
                  background: 'none', border: 'none', color: 'rgba(245,240,235,0.3)',
                  cursor: 'pointer', fontSize: '0.75rem', alignSelf: 'flex-start',
                  padding: '4px', transition: 'color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--burgundy)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.3)')}
                >✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--white-faint)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--white)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>Shipping</span>
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: totalPrice >= 999 ? '#2d9e27' : 'var(--white)' }}>
                {totalPrice >= 999 ? 'FREE' : '₹60'}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--white-faint)' }}>
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--white)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)' }}>
                ₹{(totalPrice + (totalPrice >= 999 ? 0 : 60)).toLocaleString('en-IN')}
              </span>
            </div>

            <Link href="/checkout" onClick={closeCart} style={{
              display: 'block', width: '100%', padding: '14px', background: 'var(--burgundy)',
              border: 'none', color: 'var(--white)', cursor: 'pointer',
              fontFamily: 'var(--font-condensed)', fontSize: '0.82rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              textAlign: 'center', textDecoration: 'none', transition: 'background 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--burgundy-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--burgundy)')}
            >
              Proceed to Checkout →
            </Link>
            <div style={{
              textAlign: 'center', marginTop: '12px',
              fontFamily: 'var(--font-condensed)', fontSize: '0.6rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--burgundy)', fontWeight: 600,
            }}>
              Dispatch Time: 4-9 Working Days
            </div>
            <div style={{
              textAlign: 'center', marginTop: '8px',
              fontFamily: 'var(--font-condensed)', fontSize: '0.6rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(245,240,235,0.2)',
            }}>
              Philippians 4:19 · He shall supply every need
            </div>
          </div>
        )}
      </div>
    </>
  );
}
