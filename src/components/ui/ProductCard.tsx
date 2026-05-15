'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor.name,
      qty: 1,
      icon: product.icon,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }, [addItem, product, selectedSize, selectedColor]);

  const badgeColor = product.badge === 'new' ? 'var(--burgundy)'
    : product.badge === 'sale' ? '#2a5e24'
      : 'transparent';
  const badgeBorder = product.badge === 'limited' ? '1px solid var(--burgundy)' : 'none';
  const badgeTextColor = product.badge === 'limited' ? 'var(--burgundy)' : 'var(--white)';

  return (
    <div className="pcard" style={{
      background: 'var(--card-bg)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}>
      <Link href={`/shop/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Image area */}
        <div style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: product.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {/* Image / Placeholder */}
          {(() => {
            const displayImage = (selectedColor.images && selectedColor.images[0]) || (product.images && product.images[0]);
            return displayImage ? (
              <img 
                src={displayImage} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  color: 'rgba(123,28,46,0.3)',
                  lineHeight: 1,
                }}>
                  {product.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-condensed)', fontSize: '0.65rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(245,240,235,0.2)', textAlign: 'center', padding: '0 16px',
                }}>
                  {product.name}
                </div>
              </>
            );
          })()}

          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute', top: '10px', left: '10px', zIndex: 5,
              padding: '3px 9px', fontFamily: 'var(--font-condensed)',
              fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              background: badgeColor, border: badgeBorder, color: badgeTextColor,
            }}>
              {product.badge === 'new' ? 'New' : product.badge === 'sale' ? `${product.discount}% Off` : 'Limited'}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWished(w => !w); }}
            style={{
              position: 'absolute', top: '10px', right: '10px', zIndex: 5,
              width: '30px', height: '30px',
              background: wished ? 'var(--burgundy)' : 'rgba(10,10,10,0.65)',
              backdropFilter: 'blur(8px)',
              border: wished ? '1px solid var(--burgundy)' : '1px solid rgba(245,240,235,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.3s',
            }}
          >
            {wished ? '♥' : '♡'}
          </button>
        </div>

        {/* Product info */}
        <div style={{ padding: '14px 14px 18px' }}>
          <div style={{
            fontFamily: 'var(--font-condensed)', fontSize: '0.58rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--burgundy)', marginBottom: '4px',
          }}>
            {product.tagline}
          </div>
          <div style={{
            fontFamily: 'var(--font-condensed)', fontSize: '0.92rem',
            fontWeight: 600, letterSpacing: '0.04em', color: 'var(--white)',
            marginBottom: '7px', lineHeight: 1.3,
          }}>
            {product.name}
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.95rem', fontWeight: 600 }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', color: 'rgba(245,240,235,0.3)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount && (
              <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#2d9e27', background: 'rgba(45,158,39,0.12)', padding: '2px 5px' }}>
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Color dots */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
            {product.colors.map(c => (
              <div key={c.name} title={c.name} onClick={e => { e.preventDefault(); setSelectedColor(c); }} style={{
                width: '11px', height: '11px', borderRadius: '50%',
                background: c.hex,
                border: selectedColor.name === c.name
                  ? '2px solid var(--white)'
                  : '1px solid rgba(245,240,235,0.15)',
                cursor: 'pointer',
                transform: selectedColor.name === c.name ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.2s, border-color 0.2s',
              }} />
            ))}
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--burgundy)', fontSize: '0.58rem', letterSpacing: '1px' }}>
              {'★'.repeat(Math.floor(product.rating))}
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--white-dim)' }}>
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>

      {/* Quick Add overlay on hover */}
      <div className="qadd-overlay" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 7,
        padding: '0 10px 10px',
        background: 'linear-gradient(transparent, rgba(10,10,10,0.92))',
        transform: 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        {/* Size selector */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
          {product.sizes.slice(0, 5).map(sz => (
            <button key={sz} onClick={e => { e.preventDefault(); setSelectedSize(sz); }} style={{
              flex: 1, padding: '6px 2px',
              background: selectedSize === sz ? 'var(--burgundy)' : 'rgba(10,10,10,0.85)',
              border: selectedSize === sz ? '1px solid var(--burgundy)' : '1px solid rgba(245,240,235,0.12)',
              fontFamily: 'var(--font-condensed)', fontSize: '0.6rem',
              letterSpacing: '0.08em', color: selectedSize === sz ? 'var(--white)' : 'var(--white-dim)',
              cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
            }}>
              {sz}
            </button>
          ))}
        </div>
        {/* Add to cart */}
        <button onClick={handleAddToCart} style={{
          width: '100%', padding: '10px',
          background: added ? 'var(--burgundy)' : 'var(--white)',
          border: 'none', fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: added ? 'var(--white)' : 'var(--black)',
          cursor: 'pointer', transition: 'all 0.3s',
        }}>
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>

      <style>{`
        @media (hover: hover) {
          .pcard:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
          .pcard:hover .qadd-overlay { transform: translateY(0); }
        }
        @media (hover: none), (max-width: 768px) {
          .pcard { transform: none !important; }
          .qadd-overlay { 
            position: relative !important; 
            transform: translateY(0) !important;
            background: var(--card-bg) !important;
            padding: 10px !important;
          }
          .pcard:active { transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
