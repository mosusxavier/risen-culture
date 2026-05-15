'use client';

import Link from 'next/link';

export default function SizeGuidePage() {
  return (
    <div style={{ background:'var(--black)', minHeight:'100vh', paddingTop:'100px', paddingBottom:'100px' }}>
      <div style={{ maxWidth:'800px', margin:'0 auto', padding:'0 5%' }}>
        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'40px' }}>
          <Link href="/" style={{ color:'var(--white-dim)', textDecoration:'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color:'var(--white)' }}>Size Guide</span>
        </div>

        <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'12px' }}>Risen Culture Standards</p>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,8vw,6rem)', lineHeight:0.9, marginBottom:'36px' }}>SIZE GUIDE</h1>
        
        <div style={{ background:'var(--off-black)', border:'1px solid var(--white-faint)', padding:'40px', marginBottom:'60px' }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'8px' }}>MEN&apos;S OVERSIZED TEES</h2>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'32px' }}>Dimensions in Inches</p>
          
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'var(--font-condensed)', fontSize:'1rem', letterSpacing:'0.05em' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid var(--white-faint)', color:'var(--white-dim)' }}>
                  <th style={{ textAlign:'left', padding:'16px 0' }}>SIZE</th>
                  <th style={{ textAlign:'center', padding:'16px 0' }}>CHEST</th>
                  <th style={{ textAlign:'center', padding:'16px 0' }}>SHOULDER</th>
                  <th style={{ textAlign:'center', padding:'16px 0' }}>LENGTH</th>
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
                    <td style={{ padding:'20px 0', color:'var(--white)', fontWeight:700 }}>{sz}</td>
                    <td style={{ padding:'20px 0', textAlign:'center', color:'var(--white-dim)' }}>{ch}</td>
                    <td style={{ padding:'20px 0', textAlign:'center', color:'var(--white-dim)' }}>{sh}</td>
                    <td style={{ padding:'20px 0', textAlign:'center', color:'var(--white-dim)' }}>{len}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'40px' }}>
          <div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', marginBottom:'16px', color:'var(--white)' }}>HOW TO MEASURE</h3>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'12px', color:'var(--white-dim)', fontFamily:'var(--font-body)', fontSize:'0.9rem', lineHeight:'1.6' }}>
              <li><strong>CHEST:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
              <li><strong>SHOULDER:</strong> Measure from one shoulder point to the other across the back.</li>
              <li><strong>LENGTH:</strong> Measure from the highest point of the shoulder down to the hem.</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', marginBottom:'16px', color:'var(--white)' }}>FIT TIPS</h3>
            <p style={{ color:'var(--white-dim)', fontFamily:'var(--font-body)', fontSize:'0.9rem', lineHeight:'1.6' }}>
              Our oversized tees are designed to have a relaxed, boxy fit with dropped shoulders. If you prefer a more standard fit, we recommend sizing down.
            </p>
            <div style={{ marginTop:'24px' }}>
              <Link href="/shop" style={{ display:'inline-block', padding:'12px 28px', background:'var(--burgundy)', color:'var(--white)', textDecoration:'none', fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.2em', textTransform:'uppercase' }}>Back to Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
