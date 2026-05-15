'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS, REVIEWS } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { use } from 'react';
import ProductCard from '@/components/ui/ProductCard';

interface Props { params: Promise<{ id: string }>; }

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) notFound();

  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc'|'features'|'reviews'>('desc');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  const currentImages = selectedColor.images || product.images || [];

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    setActiveImageIdx(0);
  };

  // Swipe detection state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    const maxIdx = currentImages.length > 0 ? currentImages.length - 1 : 0;

    if (isLeftSwipe) setActiveImageIdx(prev => Math.min(prev + 1, maxIdx));
    if (isRightSwipe) setActiveImageIdx(prev => Math.max(prev - 1, 0));
  };

  const handleAdd = () => {
    addItem({ productId: product.id, name: product.name, price: product.price, size: selectedSize, color: selectedColor.name, qty, icon: product.icon });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const related = PRODUCTS.filter(p => p.id !== product.id && (p.collection === product.collection || p.category === product.category)).slice(0,4);

  return (
    <div style={{ background:'var(--black)', paddingTop:'80px' }}>
      {/* Breadcrumb */}
      <div style={{ padding:'20px 5%', borderBottom:'1px solid var(--white-faint)', display:'flex', alignItems:'center', gap:'8px', fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white-dim)' }}>
        <Link href="/" style={{ color:'var(--white-dim)', textDecoration:'none' }}>Home</Link>
        <span>›</span>
        <Link href="/shop" style={{ color:'var(--white-dim)', textDecoration:'none' }}>Shop</Link>
        <span>›</span>
        <span style={{ color:'var(--white)' }}>{product.name}</span>
      </div>

      {/* Main product section */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'0', maxWidth:'1300px', margin:'0 auto', padding:'0 5% 80px' }}>

        {/* Left: image panel */}
        <div style={{ padding:'40px 40px 40px 0', display:'flex', flexDirection:'column', gap:'12px' }}>
          {/* Main image placeholder */}
          <div 
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndHandler}
            style={{ aspectRatio:'3/4', background:product.gradient, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', touchAction: 'pan-y' }}
          >
            {currentImages.length > 0 ? (
              <img src={currentImages[activeImageIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(6rem,15vw,10rem)', color:'rgba(123,28,46,0.25)' }}>{product.icon}</div>
            )}
            {product.badge && (
              <div style={{ position:'absolute', top:'16px', left:'16px', padding:'4px 12px', background: product.badge==='new'?'var(--burgundy)': product.badge==='sale'?'#2a5e24':'transparent', border: product.badge==='limited'?'1px solid var(--burgundy)':'none', fontFamily:'var(--font-condensed)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color: product.badge==='limited'?'var(--burgundy)':'var(--white)' }}>
                {product.badge==='new'?'New': product.badge==='sale'?`${product.discount}% Off`:'Limited'}
              </div>
            )}
          </div>
          {/* Thumbnail row */}
          <div style={{ display:'flex', gap:'8px' }}>
            {currentImages.map((img,i) => (
              <div key={i} 
                onClick={() => setActiveImageIdx(i)}
                style={{ flex:1, aspectRatio:'1', background:product.gradient, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border: i===activeImageIdx ? '1px solid var(--white)' : '1px solid transparent', opacity: i===activeImageIdx ? 1 : 0.5, transition:'all 0.3s', fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'rgba(123,28,46,0.3)', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.borderColor='var(--white)'; }}
                onMouseLeave={e => { if(i!==activeImageIdx){ e.currentTarget.style.opacity='0.5'; e.currentTarget.style.borderColor='transparent'; } }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: info panel */}
        <div style={{ padding:'40px 0' }}>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'8px' }}>{product.tagline}</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,5vw,3.5rem)', letterSpacing:'0.02em', color:'var(--white)', lineHeight:1, marginBottom:'16px' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px' }}>
            <span style={{ color:'var(--burgundy)', fontSize:'0.85rem' }}>{'★'.repeat(Math.floor(product.rating))}</span>
            <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.75rem', color:'var(--white-dim)', letterSpacing:'0.1em' }}>{product.rating} · {product.reviewCount} reviews</span>
          </div>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:'12px', marginBottom:'28px' }}>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', color:'var(--white)' }}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && <span style={{ fontFamily:'var(--font-condensed)', fontSize:'1rem', color:'rgba(245,240,235,0.3)', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
            {product.discount && <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.75rem', background:'rgba(45,158,45,0.15)', color:'#2d9e27', padding:'3px 8px' }}>{product.discount}% OFF</span>}
          </div>

          {/* Color selector */}
          <div style={{ marginBottom:'24px' }}>
            <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'10px' }}>
              Colour: <span style={{ color:'var(--white)' }}>{selectedColor.name}</span>
            </p>
            <div style={{ display:'flex', gap:'8px' }}>
              {product.colors.map(c => (
                <div key={c.name} title={c.name} onClick={() => handleColorChange(c)} style={{ width:'28px', height:'28px', borderRadius:'50%', background:c.hex, border: selectedColor.name===c.name ? '3px solid var(--white)' : '2px solid transparent', cursor:'pointer', transition:'all 0.2s', outline:'1px solid rgba(245,240,235,0.2)' }} />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)' }}>
                Size: <span style={{ color:'var(--white)' }}>{selectedSize}</span>
              </p>
              <button 
                onClick={() => setShowSizeChart(true)}
                style={{ background:'none', border:'none', fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--burgundy)', cursor:'pointer' }}>Size Guide</button>
            </div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{ padding:'10px 16px', border: selectedSize===s ? '1px solid var(--white)' : '1px solid rgba(245,240,235,0.15)', background: selectedSize===s ? 'var(--white)' : 'transparent', color: selectedSize===s ? 'var(--black)' : 'var(--white-dim)', fontFamily:'var(--font-condensed)', fontSize:'0.78rem', letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s' }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Qty + Add to Cart */}
          <div style={{ display:'flex', gap:'12px', marginBottom:'20px', flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', border:'1px solid rgba(245,240,235,0.15)' }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:'44px', height:'52px', background:'none', border:'none', color:'var(--white-dim)', cursor:'pointer', fontSize:'1.2rem', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--white)')} onMouseLeave={e => (e.currentTarget.style.color='var(--white-dim)')}>−</button>
              <span style={{ width:'44px', textAlign:'center', fontFamily:'var(--font-condensed)', fontSize:'1rem' }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ width:'44px', height:'52px', background:'none', border:'none', color:'var(--white-dim)', cursor:'pointer', fontSize:'1.2rem', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='var(--white)')} onMouseLeave={e => (e.currentTarget.style.color='var(--white-dim)')}>+</button>
            </div>
            <button onClick={handleAdd} style={{ flex:1, minWidth:'200px', padding:'14px 28px', background: added ? '#2a5e24' : 'var(--burgundy)', border:'none', color:'var(--white)', fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.25em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => setWished(w => !w)} style={{ width:'52px', height:'52px', background: wished ? 'var(--burgundy)' : 'transparent', border:'1px solid rgba(245,240,235,0.15)', color: wished ? 'var(--white)' : 'var(--white-dim)', cursor:'pointer', fontSize:'1.1rem', transition:'all 0.3s' }}>
              {wished ? '♥' : '♡'}
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display:'flex', gap:'20px', padding:'16px 0', borderTop:'1px solid var(--white-faint)', borderBottom:'1px solid var(--white-faint)', marginBottom:'28px', flexWrap:'wrap' }}>
            {['🚚 Free Shipping over ₹999', '🕒 Dispatch: 4-9 Days', '✝ Faith-Inspired', '🔒 Secure Payment'].map(b => (
              <span key={b} style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-dim)' }}>{b}</span>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div style={{ display:'flex', gap:'0', borderBottom:'1px solid var(--white-faint)', marginBottom:'20px' }}>
              {(['desc','features','reviews'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:'10px 20px', background:'none', border:'none', borderBottom: activeTab===tab ? '2px solid var(--burgundy)' : '2px solid transparent', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color: activeTab===tab ? 'var(--white)' : 'var(--white-dim)', cursor:'pointer', transition:'color 0.3s', marginBottom:'-1px' }}>
                  {tab==='desc'?'Description':tab==='features'?'Features':'Reviews'}
                </button>
              ))}
            </div>
            {activeTab==='desc' && <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', lineHeight:'1.8', color:'var(--white-dim)' }}>{product.description}</p>}
            {activeTab==='features' && (
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
                {product.features.map(f => (
                  <li key={f} style={{ display:'flex', gap:'10px', alignItems:'flex-start', fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.05em', color:'var(--white-dim)' }}>
                    <span style={{ color:'var(--burgundy)', flexShrink:0 }}>✝</span>{f}
                  </li>
                ))}
              </ul>
            )}
            {activeTab==='reviews' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {REVIEWS.slice(0,3).map(r => (
                  <div key={r.name} style={{ padding:'16px', background:'var(--card-bg)', borderLeft:'2px solid var(--burgundy)' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px' }}>
                      <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', color:'var(--white)' }}>{r.name}</span>
                      <span style={{ color:'var(--burgundy)', fontSize:'0.75rem' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', lineHeight:'1.6', color:'var(--white-dim)', fontStyle:'italic' }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding:'60px 5%', borderTop:'1px solid var(--white-faint)', background:'var(--off-black)' }}>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'8px' }}>You May Also Like</p>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3.5rem)', marginBottom:'36px' }}>RELATED PRODUCTS</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'3px' }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div style={{ position:'fixed', inset:0, zIndex:10000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div onClick={() => setShowSizeChart(false)} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(10px)' }} />
          <div style={{ position:'relative', background:'var(--off-black)', width:'100%', maxWidth:'600px', border:'1px solid var(--white-faint)', padding:'40px' }}>
            <button onClick={() => setShowSizeChart(false)} style={{ position:'absolute', top:'20px', right:'20px', background:'none', border:'none', color:'var(--white-dim)', fontSize:'1.2rem', cursor:'pointer' }}>✕</button>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', marginBottom:'8px' }}>SIZE GUIDE</h3>
            <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'28px' }}>Men&apos;s Oversized Tee Dimensions (Inches)</p>
            
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-condensed)', fontSize:'0.9rem', letterSpacing:'0.05em' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid var(--white-faint)', color:'var(--white-dim)' }}>
                  <th style={{ textAlign:'left', padding:'12px 0' }}>SIZE</th>
                  <th style={{ textAlign:'center', padding:'12px 0' }}>CHEST</th>
                  <th style={{ textAlign:'center', padding:'12px 0' }}>SHOULDER</th>
                  <th style={{ textAlign:'center', padding:'12px 0' }}>LENGTH</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS', '40"', '18.5"', '27"'],
                  ['S', '42"', '19.5"', '28"'],
                  ['M', '44"', '20.5"', '29"'],
                  ['L', '46"', '21.5"', '30"'],
                  ['XL', '48"', '22.5"', '31"'],
                  ['XXL', '50"', '23.5"', '32"'],
                ].map(([sz, ch, sh, len]) => (
                  <tr key={sz} style={{ borderBottom:'1px solid rgba(245,240,235,0.04)' }}>
                    <td style={{ padding:'14px 0', color:'var(--white)', fontWeight:700 }}>{sz}</td>
                    <td style={{ padding:'14px 0', textAlign:'center', color:'var(--white-dim)' }}>{ch}</td>
                    <td style={{ padding:'14px 0', textAlign:'center', color:'var(--white-dim)' }}>{sh}</td>
                    <td style={{ padding:'14px 0', textAlign:'center', color:'var(--white-dim)' }}>{len}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop:'28px', fontSize:'0.75rem', color:'rgba(245,240,235,0.3)', lineHeight:1.6 }}>
              * Measurements are for the garment itself. We recommend comparing with a tee you already own for the best fit. Risen Culture Oversized fit is designed to be relaxed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
