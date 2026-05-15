'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, REVIEWS } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

const FEATURED = PRODUCTS.slice(0, 4);

export default function HomePage() {
  useEffect(() => {
    const loader = document.getElementById('rc-loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 2000);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="rc-loader">
        <div className="loader-logo">RISEN<span>.</span>CULTURE</div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
      </div>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', background:'var(--black)' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 20% 50%, rgba(123,28,46,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(123,28,46,0.12) 0%, transparent 50%), linear-gradient(180deg,#0a0a0a 0%,#0f0608 100%)' }} />
        <div style={{ position:'absolute', inset:0, opacity:0.04, backgroundImage:'linear-gradient(var(--white) 1px,transparent 1px),linear-gradient(90deg,var(--white) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
        <svg style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', height:'clamp(25rem,60vw,60rem)', width:'auto', fill:'rgba(123,28,46,0.06)', pointerEvents:'none' }} viewBox="0 0 100 140">
          <rect x="40" y="0" width="20" height="140" />
          <rect x="0" y="35" width="100" height="20" />
        </svg>
        <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 20px', maxWidth:'900px' }}>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.75rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy-light)', marginBottom:'20px', animation:'fadeUp 0.8s 0.2s both' }}>Christian Streetwear · Est. 2026</p>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(4.5rem,12vw,11rem)', lineHeight:0.9, letterSpacing:'0.02em', color:'var(--white)', marginBottom:'24px', animation:'fadeUp 0.8s 0.4s both' }}>
            HE ROSE.<br /><span style={{ color:'var(--burgundy)' }}>SO DO</span> WE.
          </h1>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'clamp(1rem,2.5vw,1.5rem)', fontWeight:300, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'48px', animation:'fadeUp 0.8s 0.6s both' }}>
            Wear your faith. <span style={{ color:'var(--white)', fontWeight:600 }}>Make it known.</span>
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', animation:'fadeUp 0.8s 0.8s both' }}>
            <Link href="/shop" className="btn-primary">Shop the Collection</Link>
            <Link href="#about" className="btn-secondary">Our Story</Link>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', animation:'fadeUp 0.8s 1.2s both' }} className="nav-desktop">
          <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--white-dim)' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(var(--burgundy),transparent)', animation:'scrollLine 1.5s ease infinite' }} />
        </div>
      </section>

      {/* ANNOUNCEMENT */}
      <div style={{ background:'var(--burgundy)', padding:'10px 5%', display:'flex', justifyContent:'center', alignItems:'center', gap:'12px 24px', flexWrap:'wrap', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white)', textAlign: 'center' }}>
        <span>† Free Shipping above ₹999</span>
        <span style={{ opacity:0.4 }} className="nav-desktop">|</span>
        <span>New Drop: Crown of Thorns</span>
        <span style={{ opacity:0.4 }} className="nav-desktop">|</span>
        <span>Handcrafted in India</span>
      </div>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding:'clamp(80px,10vw,130px) 5%', background:'var(--black)' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p className="section-label reveal">New Arrivals</p>
          <h2 className="section-title reveal">LATEST DROPS</h2>
          <p className="section-sub reveal" style={{ margin:'0 auto', textAlign:'center' }}>Premium Christian streetwear. Every tee tells a story of resurrection power.</p>
        </div>
        <div className="grid-responsive">
          {FEATURED.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign:'center', marginTop:'48px' }}>
          <Link href="/shop" className="btn-secondary reveal">View All Products</Link>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="about" style={{ padding:'clamp(80px,10vw,130px) 5%', background:'var(--off-black)' }}>
        <div className="grid-story">
          <div className="reveal-left">
            <p className="section-label">Our Story</p>
            <h2 className="section-title">BORN FROM<br /><span style={{ color:'var(--burgundy)' }}>FAITH.</span><br />BUILT FOR THE BOLD.</h2>
            <p className="section-sub" style={{ marginTop:'16px' }}>Risen Culture was born in Tiruchirappalli, Tamil Nadu — out of a conviction that faith deserves a voice in every street, every crowd. We design statements of identity for the generation that dares to stand apart.</p>
            <p className="section-sub" style={{ marginTop:'14px' }}>Every thread, every print, every stitch is an act of worship. When you wear your faith boldly, you invite conversations that change lives. That&apos;s the Risen Culture mission.</p>
            <div className="grid-stats">
              {[['2K+','Believers Wearing RC'],['4.9','Average Rating'],['4-9 Days','Dispatch Time'],['100%','Faith-Inspired']].map(([num, label]) => (
                <div key={label} style={{ background:'var(--card-bg)', padding:'24px', borderLeft:'3px solid var(--burgundy)' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'2.6rem', color:'var(--white)' }}>{num}</div>
                  <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)', marginTop:'4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right" style={{ position:'relative', aspectRatio:'3/4', background:'var(--card-bg)', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,var(--card-bg) 0%,#1a0810 100%)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(6rem,15vw,12rem)', color:'rgba(123,28,46,0.2)' }}>RC</div>
            </div>
            <div style={{ position:'absolute', bottom:'24px', left:'24px', right:'24px', background:'rgba(10,10,10,0.8)', backdropFilter:'blur(10px)', padding:'20px 24px', borderTop:'2px solid var(--burgundy)' }}>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)', lineHeight:1.6 }}>
                <strong style={{ color:'var(--white)' }}>&quot;For I am not ashamed of the gospel&quot;</strong><br />Romans 1:16 · The founding verse of Risen Culture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding:'clamp(80px,10vw,130px) 5%', background:'var(--black)' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p className="section-label reveal">Shop By</p>
          <h2 className="section-title reveal">COLLECTIONS</h2>
        </div>
        <div className="grid-categories">
          {[
            { title:"Men's", sub:'Bold, heavyweight pieces', href:'/shop?category=men', icon:'†', grad:'linear-gradient(135deg,#1a0810,#0f0608)' },
            { title:"Women's", sub:'Elegant faith wear', href:'/shop?category=women', icon:'✦', grad:'linear-gradient(135deg,#2d0d1a,#1a0810)' },
            { title:'New Arrivals', sub:'Latest drops', href:'/shop?category=new', icon:'↑', grad:'linear-gradient(135deg,#0f0f0f,#1a0810)' },
            { title:'Limited Drops', sub:"Once they're gone…", href:'/shop?badge=limited', icon:'♛', grad:'linear-gradient(135deg,#1a0810,#2d0d1a)' },
          ].map(cat => (
            <Link key={cat.title} href={cat.href} className="reveal" style={{ background:cat.grad, aspectRatio:'1', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'32px', textDecoration:'none', position:'relative', overflow:'hidden', transition:'transform 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.transform='scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-60%)', fontFamily:'var(--font-display)', fontSize:'clamp(4rem,8vw,8rem)', color:'rgba(123,28,46,0.18)' }}>{cat.icon}</div>
              <div>
                <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'6px' }}>Shop</p>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', color:'var(--white)' }}>{cat.title}</h3>
                <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color:'var(--white-dim)', letterSpacing:'0.1em', marginTop:'4px' }}>{cat.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:'clamp(80px,10vw,130px) 5%', background:'var(--off-black)' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <p className="section-label reveal">Reviews</p>
          <h2 className="section-title reveal">WHAT THEY SAY</h2>
        </div>
        <div className="grid-responsive">
          {REVIEWS.map(r => (
            <div key={r.name} className="reveal" style={{ background:'var(--card-bg)', padding:'36px', borderTop:'3px solid var(--burgundy)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'3.5rem', color:'var(--burgundy)', lineHeight:0.5, marginBottom:'16px' }}>&quot;</div>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'1rem', lineHeight:'1.8', color:'var(--white-dim)', fontStyle:'italic', marginBottom:'24px' }}>{r.text}</p>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--burgundy)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'1.2rem', color:'var(--white)', flexShrink:0 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.9rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white)' }}>{r.name}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--burgundy)', marginTop:'2px' }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY GALLERY & UPLOAD */}
      <section id="gallery" style={{ padding:'clamp(60px,8vw,100px) 5%', background:'var(--off-black)', borderTop:'1px solid var(--white-faint)' }}>
        <div style={{ textAlign:'center', marginBottom:'60px' }}>
          <p className="reveal" style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'12px' }}>#RISENCULTURE</p>
          <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem,6vw,5rem)', marginBottom:'20px' }}>JOIN THE COMMUNITY</h2>
          <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color:'var(--white-dim)', maxWidth:'600px', margin:'0 auto' }}>Show us how you wear your faith. Tag us on socials or upload your look below to be featured.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px', marginBottom:'60px' }}>
          {/* Mock Gallery Items */}
          {[1,2,3,4].map(i => (
            <div key={i} className="reveal" style={{ aspectRatio:'1', background:'var(--card-bg)', position:'relative', overflow:'hidden', border:'1px solid var(--white-faint)' }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'4rem', color:'rgba(245,240,235,0.03)' }}>✝</div>
              <div style={{ position:'absolute', bottom:'16px', left:'16px', fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.1em', color:'var(--white-dim)' }}>@community_user_{i}</div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ maxWidth:'500px', margin:'0 auto', background:'var(--black)', padding:'40px', border:'1px solid var(--burgundy)', textAlign:'center' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', marginBottom:'12px' }}>UPLOAD YOUR LOOK</h3>
          <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.1em', color:'var(--white-dim)', marginBottom:'24px' }}>Got your Risen Culture apparel? Share a photo and join the movement.</p>
          <div 
            onClick={() => document.getElementById('comm-upload')?.click()}
            style={{ border:'2px dashed var(--white-faint)', padding:'30px', cursor:'pointer', transition:'all 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--burgundy)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--white-faint)'}>
            <div style={{ fontSize:'2rem', marginBottom:'10px' }}>📸</div>
            <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Select Photo or Drag & Drop</p>
            <input type="file" style={{ display:'none' }} id="comm-upload" accept="image/*" />
          </div>
          <button style={{ marginTop:'20px', width:'100%', padding:'14px', background:'var(--burgundy)', border:'none', color:'var(--white)', fontFamily:'var(--font-condensed)', fontSize:'0.8rem', letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer' }}>
            Submit for Feature
          </button>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:'clamp(80px,10vw,120px) 5%', background:'var(--burgundy)', textAlign:'center' }}>
        <p className="reveal" style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(245,240,235,0.7)', marginBottom:'16px' }}>Limited Time</p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,8vw,7rem)', color:'var(--white)', lineHeight:0.95, marginBottom:'24px' }}>NEW DROP NOW LIVE</h2>
        <p className="reveal" style={{ fontFamily:'var(--font-condensed)', fontSize:'1rem', letterSpacing:'0.15em', color:'rgba(245,240,235,0.8)', marginBottom:'36px' }}>The Crown of Thorns collection is live. Limited pieces. Don&apos;t miss out.</p>
        <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/shop?badge=limited" style={{ padding:'16px 40px', background:'var(--white)', color:'var(--burgundy)', fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.25em', textTransform:'uppercase', textDecoration:'none' }}>Shop Limited Drops</Link>
          <Link href="/shop" style={{ padding:'16px 40px', background:'transparent', color:'var(--white)', fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.25em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(245,240,235,0.4)' }}>All Products</Link>
        </div>
      </section>
    </>
  );
}
