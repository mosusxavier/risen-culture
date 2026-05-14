'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Step = 'cart' | 'shipping' | 'payment' | 'confirm';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>('cart');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', state:'', pincode:'', method:'upi', upi:'' });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handlePlaceOrder = async () => {
    setLoading(true);
    const id = 'RC-' + Date.now();
    
    if (user) {
      const order = {
        id,
        user_id: user.id,
        total: grandTotal,
        shipping_info: { name: form.name, email: form.email, phone: form.phone, address: form.address, city: form.city, state: form.state, pincode: form.pincode },
        payment_method: form.method,
      };
      
      const { error: orderError } = await supabase.from('orders').insert(order);
      
      if (!orderError) {
        const orderItems = items.map(item => ({
          order_id: id,
          product_id: item.productId,
          name: item.name,
          size: item.size,
          color: item.color,
          qty: item.qty,
          price: item.price,
          icon: item.icon
        }));
        await supabase.from('order_items').insert(orderItems);
      }
    }

    setOrderId(id);
    clearCart();
    setStep('confirm');
    setLoading(false);
  };

  const shipping = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const stepLabels: Step[] = ['cart','shipping','payment','confirm'];
  const stepNames = ['Review','Shipping','Payment','Done'];

  if (items.length === 0 && step !== 'confirm') {
    return (
      <div style={{ minHeight:'100vh', background:'var(--black)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddingTop:'80px' }}>
        <svg style={{ height: '4rem', width: 'auto', fill: 'rgba(245,240,235,0.06)', marginBottom: '16px' }} viewBox="0 0 100 140">
          <rect x="40" y="0" width="20" height="140" />
          <rect x="0" y="35" width="100" height="20" />
        </svg>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', marginBottom:'12px' }}>Cart is Empty</h2>
        <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'28px' }}>Add some faith to your wardrobe first.</p>
        <Link href="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--black)', paddingTop:'80px' }}>
      {/* Header */}
      <div style={{ padding:'32px 5%', borderBottom:'1px solid var(--white-faint)' }}>
        <Link href="/" style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', letterSpacing:'0.15em', color:'var(--white)', textDecoration:'none' }}>
          RISEN<span style={{ color:'var(--burgundy)' }}>.</span>CULTURE
        </Link>
        {/* Steps */}
        <div style={{ display:'flex', gap:'0', marginTop:'24px' }}>
          {stepLabels.map((s, i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', flex: i < stepLabels.length-1 ? 1 : 0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ width:'28px', height:'28px', borderRadius:'50%', background: stepLabels.indexOf(step) >= i ? 'var(--burgundy)' : 'var(--card-bg)', border:'1px solid var(--white-faint)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', color:'var(--white)' }}>
                  {stepLabels.indexOf(step) > i ? '✓' : i+1}
                </div>
                <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color: stepLabels.indexOf(step) >= i ? 'var(--white)' : 'var(--white-dim)', whiteSpace:'nowrap' }}>
                  {stepNames[i]}
                </span>
              </div>
              {i < stepLabels.length-1 && <div style={{ flex:1, height:'1px', background: stepLabels.indexOf(step) > i ? 'var(--burgundy)' : 'rgba(245,240,235,0.1)', margin:'0 8px', marginBottom:'20px' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'0', maxWidth:'1200px', margin:'0 auto', padding:'0 5%' }}>
        {/* Main content */}
        <div style={{ padding:'40px 40px 40px 0' }}>

          {/* STEP 1: Cart Review */}
          {step === 'cart' && (
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>REVIEW YOUR ORDER</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display:'flex', gap:'14px', padding:'16px 0', borderBottom:'1px solid var(--white-faint)' }}>
                    <div style={{ width:'60px', height:'75px', background:'var(--card-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'rgba(123,28,46,0.4)', flexShrink:0 }}>{item.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.88rem', fontWeight:600, color:'var(--white)', marginBottom:'4px' }}>{item.name}</div>
                      <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'6px' }}>Size: {item.size} · {item.color} · Qty: {item.qty}</div>
                      <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.9rem', fontWeight:600 }}>₹{(item.price*item.qty).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('shipping')} className="btn-primary" style={{ marginTop:'28px', width:'100%' }}>
                Continue to Shipping →
              </button>
            </div>
          )}

          {/* STEP 2: Shipping */}
          {step === 'shipping' && (
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>SHIPPING DETAILS</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                {[['name','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['pincode','PIN Code','text'],['city','City','text'],['state','State','text']].map(([k,label,type]) => (
                  <div key={k} style={{ gridColumn: k==='address' ? 'span 2' : 'span 1', display:'flex', flexDirection:'column', gap:'6px' }}>
                    <label className="rc-label">{label}</label>
                    <input type={type} value={form[k as keyof typeof form]} onChange={e => update(k, e.target.value)} className="rc-input" placeholder={label} />
                  </div>
                ))}
                <div style={{ gridColumn:'span 2', display:'flex', flexDirection:'column', gap:'6px' }}>
                  <label className="rc-label">Full Address</label>
                  <input type="text" value={form.address} onChange={e => update('address', e.target.value)} className="rc-input" placeholder="House No, Street, Area" />
                </div>
              </div>
              <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
                <button onClick={() => setStep('cart')} className="btn-secondary" style={{ flex:1 }}>← Back</button>
                <button onClick={() => setStep('payment')} className="btn-primary" style={{ flex:2 }} disabled={!form.name || !form.email || !form.address}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 'payment' && (
            <div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>PAYMENT METHOD</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'24px' }}>
                {[['upi','📱 UPI / Google Pay / PhonePe'],['paypal','🔵 PayPal']].map(([v,label]) => (
                  <label key={v} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px', background: form.method===v ? 'rgba(123,28,46,0.15)' : 'var(--card-bg)', border: form.method===v ? '1px solid var(--burgundy)' : '1px solid rgba(245,240,235,0.08)', cursor:'pointer', transition:'all 0.3s' }}>
                    <input type="radio" name="method" value={v} checked={form.method===v} onChange={() => update('method',v)} style={{ accentColor:'var(--burgundy)' }} />
                    <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.88rem', letterSpacing:'0.05em', color:'var(--white)' }}>{label}</span>
                  </label>
                ))}
              </div>

              {form.method==='upi' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'6px', marginBottom:'20px' }}>
                  <label className="rc-label">UPI ID</label>
                  <input type="text" className="rc-input" value={form.upi} onChange={e => update('upi',e.target.value)} placeholder="yourname@upi" />
                </div>
              )}
              {form.method==='paypal' && (
                <div style={{ marginBottom:'20px', padding:'16px', background:'rgba(245,240,235,0.05)', border:'1px solid rgba(245,240,235,0.1)', borderRadius:'4px' }}>
                  <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', color:'var(--white-dim)', letterSpacing:'0.05em' }}>
                    You will be redirected to PayPal securely to complete your payment after clicking "Place Order".
                  </p>
                </div>
              )}

              <div style={{ display:'flex', gap:'12px' }}>
                <button onClick={() => setStep('shipping')} className="btn-secondary" style={{ flex:1 }}>← Back</button>
                <button onClick={handlePlaceOrder} className="btn-primary" style={{ flex:2, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                  {loading ? 'Processing…' : `Place Order · ₹${grandTotal.toLocaleString('en-IN')}`}
                </button>
              </div>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-dim)', textAlign:'center', marginTop:'12px' }}>
                🔒 Secured with 256-bit SSL encryption
              </p>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 'confirm' && (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(45,158,39,0.15)', border:'2px solid #2d9e27', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:'2rem' }}>✓</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', marginBottom:'12px', color:'var(--white)' }}>ORDER PLACED!</h2>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white-dim)', marginBottom:'8px' }}>Order ID: <span style={{ color:'var(--white)' }}>{orderId}</span></p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'var(--white-dim)', lineHeight:'1.7', maxWidth:'460px', margin:'0 auto 32px' }}>
                Thank you for your order! You&apos;ll receive a confirmation email shortly. Your Risen Culture drop will be dispatched within 24 hours.
              </p>
              <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'32px' }}>
                &quot;He shall supply all your needs&quot; · Phil 4:19
              </div>
              <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/account" className="btn-primary">Track My Order</Link>
                <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        {step !== 'confirm' && (
          <div style={{ padding:'40px 0 40px 40px', borderLeft:'1px solid var(--white-faint)' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', marginBottom:'20px', letterSpacing:'0.05em' }}>ORDER SUMMARY</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'0', marginBottom:'20px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--white-faint)' }}>
                  <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', color:'var(--white-dim)', letterSpacing:'0.05em' }}>{item.name} × {item.qty}</span>
                  <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.8rem', color:'var(--white)' }}>₹{(item.price*item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--white-faint)' }}>
              <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color:'var(--white-dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Subtotal ({totalItems} items)</span>
              <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color:'var(--white)' }}>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--white-faint)' }}>
              <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color:'var(--white-dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Shipping</span>
              <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.78rem', color: shipping===0 ? '#2d9e27' : 'var(--white)' }}>{shipping===0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'16px 0', borderBottom:'2px solid var(--burgundy)', marginBottom:'8px' }}>
              <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--white)' }}>Total</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', color:'var(--white)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            {totalPrice < 999 && <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.1em', color:'var(--white-dim)', textAlign:'center' }}>Add ₹{(999-totalPrice).toLocaleString('en-IN')} more for free shipping</p>}
          </div>
        )}
      </div>
    </div>
  );
}
