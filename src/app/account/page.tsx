'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Tab = 'orders' | 'profile' | 'wishlist';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  processing: { bg: 'rgba(255,165,0,0.12)', color: '#ffa500' },
  shipped:    { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
  delivered:  { bg: 'rgba(45,158,39,0.12)', color: '#2d9e27' },
  cancelled:  { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
};

export default function AccountPage() {
  const { user, login, register, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('orders');
  const [authMode, setAuthMode] = useState<'login'|'register'>('login');
  const [formData, setFormData] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string|null>(null);
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const upd = (k: string, v: string) => setFormData(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (user && tab === 'orders') {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        const { data: dbOrders, error: orderErr } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });
        if (!orderErr && dbOrders) {
          setOrders(dbOrders);
        }
        setLoadingOrders(false);
      };
      fetchOrders();
    }
  }, [user, tab]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    let res = { error: null as string | null };
    if (authMode === 'login') res = await login(formData.email, formData.password);
    else res = await register(formData.name, formData.email, formData.password);
    
    if (res.error) setError(res.error);
    setLoading(false);
  };

  /* ── Not logged in ── */
  if (!user) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--black)', paddingTop:'80px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'100%', maxWidth:'420px', padding:'0 20px' }}>
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'8px' }}>Welcome Back</p>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'3rem', letterSpacing:'0.05em' }}>
              {authMode==='login' ? 'SIGN IN' : 'JOIN RC'}
            </h1>
          </div>

          {/* Toggle */}
          <div style={{ display:'flex', borderBottom:'1px solid var(--white-faint)', marginBottom:'28px' }}>
            {(['login','register'] as const).map(m => (
              <button key={m} onClick={() => setAuthMode(m)} style={{ flex:1, padding:'12px', background:'none', border:'none', borderBottom: authMode===m ? '2px solid var(--burgundy)' : '2px solid transparent', fontFamily:'var(--font-condensed)', fontSize:'0.78rem', letterSpacing:'0.2em', textTransform:'uppercase', color: authMode===m ? 'var(--white)' : 'var(--white-dim)', cursor:'pointer', marginBottom:'-1px', transition:'color 0.3s' }}>
                {m==='login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {authMode==='register' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                <label className="rc-label">Full Name</label>
                <input type="text" className="rc-input" value={formData.name} onChange={e => upd('name',e.target.value)} placeholder="Your full name" required />
              </div>
            )}
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              <label className="rc-label">Email</label>
              <input type="email" className="rc-input" value={formData.email} onChange={e => upd('email',e.target.value)} placeholder="your@email.com" required />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              <label className="rc-label">Password</label>
              <input type="password" className="rc-input" value={formData.password} onChange={e => upd('password',e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.72rem', color:'#ef4444', letterSpacing:'0.1em' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width:'100%', marginTop:'8px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? 'Please wait…' : authMode==='login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'20px', fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--burgundy)' }}>
            Philippians 4:13 · He Rose. So Do We.
          </p>
        </div>
      </div>
    );
  }

  /* ── Logged in ── */
  return (
    <div style={{ minHeight:'100vh', background:'var(--black)', paddingTop:'80px' }}>
      {/* Account header */}
      <div style={{ background:'var(--off-black)', borderBottom:'1px solid var(--white-faint)', padding:'40px 5%' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'var(--burgundy)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:'1.6rem', color:'var(--white)' }}>{user.avatar}</div>
            <div>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'4px' }}>Welcome back</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', letterSpacing:'0.05em' }}>{user.name.toUpperCase()}</h2>
              <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.75rem', color:'var(--white-dim)', letterSpacing:'0.05em' }}>{user.email}</p>
            </div>
          </div>
          <button onClick={logout} style={{ padding:'10px 20px', background:'transparent', border:'1px solid rgba(245,240,235,0.15)', color:'var(--white-dim)', fontFamily:'var(--font-condensed)', fontSize:'0.72rem', letterSpacing:'0.2em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--burgundy)'; e.currentTarget.style.color='var(--burgundy)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,240,235,0.15)'; e.currentTarget.style.color='var(--white-dim)'; }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'40px 5%' }}>
        {/* Tabs */}
        <div style={{ display:'flex', gap:'0', borderBottom:'1px solid var(--white-faint)', marginBottom:'40px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }} className="account-tabs">
          {(['orders','profile','wishlist'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:'14px 24px', background:'none', border:'none', borderBottom: tab===t ? '2px solid var(--burgundy)' : '2px solid transparent', fontFamily:'var(--font-condensed)', fontSize:'0.78rem', letterSpacing:'0.2em', textTransform:'uppercase', color: tab===t ? 'var(--white)' : 'var(--white-dim)', cursor:'pointer', marginBottom:'-1px', transition:'color 0.3s', whiteSpace:'nowrap' }}>
              {t==='orders' ? 'My Orders' : t==='profile' ? 'Profile' : 'Wishlist'}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab==='orders' && (
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>ORDER HISTORY</h2>
            {loadingOrders ? (
              <p style={{ fontFamily:'var(--font-condensed)', color:'var(--white-dim)', letterSpacing:'0.1em' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ fontFamily:'var(--font-condensed)', color:'var(--white-dim)', letterSpacing:'0.1em' }}>No orders yet. <Link href="/shop" style={{ color:'var(--burgundy)' }}>Shop now →</Link></p>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {orders.map(order => {
                  const st = STATUS_STYLES[order.status];
                  const isExpanded = expandedOrder === order.id;
                  return (
                    <div key={order.id} style={{ background:'var(--card-bg)', border:'1px solid var(--white-faint)' }}>
                      <div
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        style={{ padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px', cursor:'pointer' }}>
                        <div>
                          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'4px' }}>
                            <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.88rem', fontWeight:600, letterSpacing:'0.05em', color:'var(--white)' }}>{order.id}</span>
                            <span style={{ padding:'3px 10px', background: st.bg, color: st.color, fontFamily:'var(--font-condensed)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase' }}>
                              {order.status.charAt(0).toUpperCase()+order.status.slice(1)}
                            </span>
                          </div>
                          <div style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', letterSpacing:'0.1em', color:'var(--white-dim)' }}>
                            {new Date(order.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })} · {order.order_items.length} item{order.order_items.length>1?'s':''}
                          </div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--white)' }}>₹{order.total.toLocaleString('en-IN')}</div>
                          <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.7rem', color:'var(--burgundy)', letterSpacing:'0.1em' }}>{isExpanded ? '▲ Hide' : '▼ Details'}</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div style={{ padding:'0 24px 20px', borderTop:'1px solid var(--white-faint)' }}>
                          <div style={{ paddingTop:'16px' }}>
                            {order.order_items.map((item: any, i: number) => (
                              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(245,240,235,0.05)' }}>
                                <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.82rem', color:'var(--white-dim)' }}>{item.name} (Size {item.size}) × {item.qty}</span>
                                <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.82rem', color:'var(--white)' }}>₹{(item.price*item.qty).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                          {order.tracking && (
                            <div style={{ marginTop:'16px', padding:'14px', background:'rgba(123,28,46,0.1)', border:'1px solid rgba(123,28,46,0.2)' }}>
                              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }} className="tracking-container">
                                <div>
                                  <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--burgundy)', marginBottom:'4px' }}>Tracking ID</p>
                                  <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.9rem', color:'var(--white)', letterSpacing:'0.1em' }}>{order.tracking}</p>
                                </div>
                                <div style={{ display:'flex', gap:'8px', alignItems:'center', overflowX:'auto', paddingBottom:'4px' }} className="tracking-stages">
                                  {['Ordered','Dispatched','In Transit','Delivered'].map((stage, si) => {
                                    const stageReached = order.status==='delivered' ? true : order.status==='shipped' ? si < 3 : si < 1;
                                    return (
                                      <div key={stage} style={{ display:'flex', alignItems:'center', gap:'4px', flexShrink:0 }}>
                                        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: stageReached ? 'var(--burgundy)' : 'rgba(245,240,235,0.15)' }} />
                                        <span style={{ fontFamily:'var(--font-condensed)', fontSize:'0.58rem', letterSpacing:'0.05em', color: stageReached ? 'var(--white)' : 'rgba(245,240,235,0.3)', textTransform:'uppercase' }}>{stage}</span>
                                        {si < 3 && <div style={{ width:'16px', height:'1px', background: stageReached ? 'var(--burgundy)' : 'rgba(245,240,235,0.1)' }} className="tracking-line" />}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Profile tab */}
        {tab==='profile' && (
          <div style={{ maxWidth:'560px' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>MY PROFILE</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {[['Full Name', user.name],['Email', user.email],['Phone', '+91 98765 43210'],['Location', 'Tiruchirappalli, Tamil Nadu']].map(([label, value]) => (
                <div key={label} style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                  <label className="rc-label">{label}</label>
                  <input type="text" className="rc-input" defaultValue={value} />
                </div>
              ))}
              <button className="btn-primary" style={{ alignSelf:'flex-start', marginTop:'8px' }}>Save Changes</button>
            </div>
          </div>
        )}

        {/* Wishlist tab */}
        {tab==='wishlist' && (
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', marginBottom:'28px' }}>WISHLIST</h2>
            <p style={{ fontFamily:'var(--font-condensed)', fontSize:'0.85rem', letterSpacing:'0.1em', color:'var(--white-dim)', marginBottom:'24px' }}>
              Items you&apos;ve saved for later. Click the heart icon on any product to save it here.
            </p>
            <Link href="/shop" className="btn-secondary">Browse Products</Link>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .tracking-line { width: 8px !important; }
          .tracking-stages { gap: 4px !important; }
          .account-tabs::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </div>
  );
}
