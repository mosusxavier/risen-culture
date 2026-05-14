'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const badgeParam = searchParams.get('badge');

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sort, setSort] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1999);
  const [gridCols, setGridCols] = useState(3);

  const toggleSize = (s: string) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleColor = (c: string) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (categoryParam === 'men') list = list.filter(p => p.category === 'men' || p.category === 'unisex');
    else if (categoryParam === 'women') list = list.filter(p => p.category === 'women' || p.category === 'unisex');
    else if (categoryParam === 'new') list = list.filter(p => p.badge === 'new');
    if (badgeParam) list = list.filter(p => p.badge === badgeParam);
    if (selectedSizes.length) list = list.filter(p => selectedSizes.some(s => p.sizes.includes(s)));
    if (selectedColors.length) list = list.filter(p => selectedColors.some(c => p.colors.some(pc => pc.name === c)));
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'new') list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    return list;
  }, [categoryParam, badgeParam, selectedSizes, selectedColors, maxPrice, sort]);

  const pageTitle = categoryParam === 'men' ? "MEN'S COLLECTION"
    : categoryParam === 'women' ? "WOMEN'S COLLECTION"
    : categoryParam === 'new' ? 'NEW ARRIVALS'
    : badgeParam === 'limited' ? 'LIMITED DROPS'
    : 'ALL PRODUCTS';

  const allColors = ['Black', 'Off-White', 'Burgundy', 'Navy', 'Charcoal', 'Cognac'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding:'80px 5% 0', background:'var(--black)', paddingTop:'100px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white-dim)', borderBottom:'1px solid var(--white-faint)', paddingBottom:'14px' }}>
          <a href="/" style={{ color:'var(--white-dim)', textDecoration:'none' }}>Home</a>
          <span>›</span>
          <span style={{ color:'var(--white)' }}>Shop</span>
          {categoryParam && <><span>›</span><span style={{ color:'var(--white)' }}>{pageTitle}</span></>}
        </div>
      </div>

      {/* Collection Header */}
      <div style={{ padding:'40px 5% 28px', background:'var(--black)', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'20px', borderBottom:'1px solid var(--white-faint)' }}>
        <div>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'8px' }}>Risen Culture</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem,6vw,4.5rem)', lineHeight:0.95, letterSpacing:'0.02em' }}>{pageTitle}</h1>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)', marginTop:'10px' }}>Showing {filtered.length} Products</p>
        </div>
        <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 16px', background:'var(--card-bg)', border:'1px solid var(--white-faint)', cursor:'pointer', color:'var(--white-dim)', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', transition:'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--burgundy)'; e.currentTarget.style.color='var(--white)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-faint)'; e.currentTarget.style.color='var(--white-dim)'; }}>
            ⚙ Filters
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ background:'var(--card-bg)', border:'1px solid var(--white-faint)', color:'var(--white)', padding:'10px 14px', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', outline:'none' }}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="rating">Best Rated</option>
            <option value="new">Newest</option>
          </select>
          <div style={{ display:'flex', gap:'2px' }}>
            {[2,3,4].map(n => (
              <button key={n} onClick={() => setGridCols(n)} style={{ width:'36px', height:'36px', background: gridCols===n ? 'var(--burgundy)' : 'var(--card-bg)', border: gridCols===n ? '1px solid var(--burgundy)' : '1px solid var(--white-faint)', cursor:'pointer', color: gridCols===n ? 'var(--white)' : 'var(--white-dim)', fontSize:'0.9rem', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s' }}>
                {n===2?'⊞':n===3?'⊟':'⊠'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display:'flex', minHeight:'70vh', background:'var(--black)' }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{ width:'240px', flexShrink:0, borderRight:'1px solid var(--white-faint)', padding:'28px 20px' }}>
            {/* Size */}
            <div style={{ marginBottom:'28px' }}>
              <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'14px', paddingBottom:'10px', borderBottom:'1px solid var(--white-faint)' }}>Size</div>
              <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
                {allSizes.map(s => (
                  <button key={s} onClick={() => toggleSize(s)} style={{ padding:'5px 10px', border: selectedSizes.includes(s) ? '1px solid var(--burgundy)' : '1px solid rgba(245,240,235,0.12)', background: selectedSizes.includes(s) ? 'var(--burgundy)' : 'transparent', fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.1em', cursor:'pointer', color: selectedSizes.includes(s) ? 'var(--white)' : 'var(--white-dim)', transition:'all 0.3s' }}>{s}</button>
                ))}
              </div>
            </div>
            {/* Color */}
            <div style={{ marginBottom:'28px' }}>
              <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'14px', paddingBottom:'10px', borderBottom:'1px solid var(--white-faint)' }}>Color</div>
              <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                {[['Black','#0a0a0a'],['Off-White','#f5f0eb'],['Burgundy','#7B1C2E'],['Navy','#1a2744'],['Charcoal','#3d3d3d'],['Cognac','#5c3317']].map(([name, hex]) => (
                  <div key={name} title={name} onClick={() => toggleColor(name)} style={{ width:'20px', height:'20px', borderRadius:'50%', background:hex, border: selectedColors.includes(name) ? '2px solid var(--white)' : '2px solid transparent', cursor:'pointer', transform: selectedColors.includes(name) ? 'scale(1.25)' : 'scale(1)', transition:'all 0.2s', outline: name === 'Off-White' ? '1px solid rgba(245,240,235,0.3)' : 'none' }} />
                ))}
              </div>
            </div>
            {/* Price */}
            <div style={{ marginBottom:'28px' }}>
              <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'14px', paddingBottom:'10px', borderBottom:'1px solid var(--white-faint)' }}>Price</div>
              <input type="range" min={299} max={1999} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width:'100%', accentColor:'var(--burgundy)', cursor:'pointer' }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-condensed)', fontSize:'0.68rem', color:'var(--white-dim)', marginTop:'6px' }}>
                <span>₹299</span><span>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button onClick={() => { setSelectedSizes([]); setSelectedColors([]); setMaxPrice(1999); }} style={{ width:'100%', padding:'9px', background:'transparent', border:'1px solid rgba(245,240,235,0.1)', color:'var(--white-dim)', fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--burgundy)'; e.currentTarget.style.color='var(--burgundy)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,240,235,0.1)'; e.currentTarget.style.color='var(--white-dim)'; }}>
              Clear All Filters
            </button>
          </aside>
        )}

        {/* Grid */}
        <div style={{ flex:1, padding:'28px', paddingBottom:'80px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 20px' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'4rem', color:'rgba(245,240,235,0.06)', marginBottom:'16px' }}>✝</div>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.9rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)' }}>No products match your filters</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${gridCols},1fr)`, gap:'3px', transition:'all 0.3s' }} className="shop-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .shop-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:480px){
          .shop-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--black)', fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--burgundy)' }}>Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
