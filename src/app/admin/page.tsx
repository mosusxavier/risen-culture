'use client';

import { useState } from 'react';
import { PRODUCTS, MOCK_ORDERS } from '@/lib/products';
import Link from 'next/link';

type AdminTab = 'overview' | 'products' | 'orders' | 'customers';

const METRICS = [
  { label: 'Total Revenue', value: '₹1,24,850', delta: '+18.4%', icon: '₹', color: '#2d9e27' },
  { label: 'Orders This Month', value: '87', delta: '+12.1%', icon: '📦', color: '#3b82f6' },
  { label: 'Active Customers', value: '2,140', delta: '+9.3%', icon: '👥', color: 'var(--burgundy)' },
  { label: 'Avg Order Value', value: '₹1,434', delta: '+5.7%', icon: '📈', color: '#f59e0b' },
];

const STATUS_COLORS: Record<string, string> = {
  processing: '#ffa500',
  shipped: '#3b82f6',
  delivered: '#2d9e27',
  cancelled: '#ef4444',
};

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('overview');
  const [searchProduct, setSearchProduct] = useState('');
  const [searchOrder, setSearchOrder] = useState('');

  const filteredProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
    p.collection.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const filteredOrders = MOCK_ORDERS.filter(o =>
    o.id.toLowerCase().includes(searchOrder.toLowerCase()) ||
    o.status.toLowerCase().includes(searchOrder.toLowerCase())
  );

  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-black)', paddingTop: '80px' }}>
      {/* Admin Header */}
      <div style={{
        background: 'var(--black)',
        borderBottom: '1px solid var(--white-faint)',
        padding: '20px 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '4px' }}>
            Admin Portal
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em' }}>
            RISEN CULTURE <span style={{ color: 'var(--burgundy)' }}>DASHBOARD</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', color: 'var(--white)', fontSize: '1rem' }}>A</div>
          <div>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.78rem', color: 'var(--white)' }}>Admin</div>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', color: 'var(--white-dim)' }}>admin@risenculture.in</div>
          </div>
          <Link href="/" style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(245,240,235,0.15)', color: 'var(--white-dim)', fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}>
            ← Back to Site
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 160px)' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', flexShrink: 0, borderRight: '1px solid var(--white-faint)', padding: '28px 0' }}>
          {(['overview', 'products', 'orders', 'customers'] as AdminTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              display: 'block', width: '100%', padding: '14px 24px', background: tab === t ? 'rgba(123,28,46,0.15)' : 'transparent',
              border: 'none', borderLeft: tab === t ? '3px solid var(--burgundy)' : '3px solid transparent',
              fontFamily: 'var(--font-condensed)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: tab === t ? 'var(--white)' : 'var(--white-dim)',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s',
            }}>
              {t === 'overview' ? '📊 Overview' : t === 'products' ? '👕 Products' : t === 'orders' ? '📦 Orders' : '👥 Customers'}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 5%', overflowX: 'hidden' }}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '28px' }}>OVERVIEW</h2>

              {/* Metric cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3px', marginBottom: '36px' }}>
                {METRICS.map(m => (
                  <div key={m.label} style={{ background: 'var(--card-bg)', padding: '24px', borderBottom: `3px solid ${m.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                      <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', letterSpacing: '0.15em', color: m.color }}>
                        {m.delta}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', lineHeight: 1 }}>{m.value}</div>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', marginTop: '6px' }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts placeholder + Recent Orders */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Revenue chart placeholder */}
                <div style={{ background: 'var(--card-bg)', padding: '24px', gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Revenue This Month</h3>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#2d9e27' }}>₹{totalRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  {/* Bar chart */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', padding: '0 4px' }}>
                    {[30, 55, 45, 70, 60, 90, 75, 85, 65, 95, 80, 100].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '100%', background: i === 11 ? 'var(--burgundy)' : 'rgba(123,28,46,0.3)', height: `${h}%`, transition: 'height 0.5s', borderTop: '2px solid var(--burgundy)' }} />
                        <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.55rem', color: 'var(--white-dim)', letterSpacing: '0.05em' }}>
                          {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top products */}
                <div style={{ background: 'var(--card-bg)', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Top Products</h3>
                  {PRODUCTS.slice(0, 5).map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--white-faint)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--burgundy)' }}>#{i + 1}</span>
                        <div>
                          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.8rem', color: 'var(--white)' }}>{p.name}</div>
                          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', color: 'var(--white-dim)' }}>{p.reviewCount} sales</div>
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)' }}>₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div style={{ background: 'var(--card-bg)', padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Recent Orders</h3>
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--white-faint)' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.8rem', color: 'var(--white)' }}>{order.id}</div>
                        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', color: 'var(--white-dim)', marginTop: '2px' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.8rem', color: 'var(--white)' }}>₹{order.total.toLocaleString('en-IN')}</div>
                        <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.6rem', color: STATUS_COLORS[order.status], letterSpacing: '0.1em', textTransform: 'uppercase' }}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>PRODUCT CATALOG</h2>
                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.75rem' }}>+ Add Product</button>
              </div>
              <input
                type="text"
                className="rc-input"
                placeholder="Search products…"
                value={searchProduct}
                onChange={e => setSearchProduct(e.target.value)}
                style={{ marginBottom: '20px', maxWidth: '360px' }}
              />
              <div style={{ background: 'var(--card-bg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--white-faint)' }}>
                      {['Product', 'Collection', 'Price', 'Stock', 'Rating', 'Badge', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--burgundy)', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(245,240,235,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(245,240,235,0.01)' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'rgba(123,28,46,0.5)', flexShrink: 0 }}>{p.icon}</div>
                            <div>
                              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)' }}>{p.name}</div>
                              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', color: 'var(--white-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.78rem', color: 'var(--white-dim)' }}>{p.collection}</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)', fontWeight: 600 }}>₹{p.price.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.72rem', padding: '3px 8px', background: 'rgba(45,158,39,0.12)', color: '#2d9e27', letterSpacing: '0.1em' }}>In Stock</span>
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.78rem', color: 'var(--burgundy)' }}>{'★'.repeat(Math.floor(p.rating))} <span style={{ color: 'var(--white-dim)' }}>({p.reviewCount})</span></td>
                        <td style={{ padding: '14px 16px' }}>
                          {p.badge ? (
                            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', background: p.badge === 'new' ? 'var(--burgundy)' : p.badge === 'sale' ? 'rgba(45,158,39,0.2)' : 'rgba(123,28,46,0.2)', color: p.badge === 'limited' ? 'var(--burgundy)' : 'var(--white)' }}>{p.badge}</span>
                          ) : <span style={{ color: 'rgba(245,240,235,0.2)', fontSize: '0.7rem' }}>—</span>}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link href={`/shop/${p.id}`} style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--burgundy)', textDecoration: 'none', padding: '4px 8px', border: '1px solid rgba(123,28,46,0.3)', transition: 'all 0.3s' }}>View</Link>
                            <button style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)', background: 'none', border: '1px solid rgba(245,240,235,0.1)', padding: '4px 8px', cursor: 'pointer', transition: 'all 0.3s' }}>Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '28px' }}>ORDER MANAGEMENT</h2>
              <input
                type="text"
                className="rc-input"
                placeholder="Search orders by ID or status…"
                value={searchOrder}
                onChange={e => setSearchOrder(e.target.value)}
                style={{ marginBottom: '20px', maxWidth: '360px' }}
              />
              <div style={{ background: 'var(--card-bg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--white-faint)' }}>
                      {['Order ID', 'Date', 'Items', 'Total', 'Status', 'Tracking', 'Action'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--burgundy)', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, i) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid rgba(245,240,235,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(245,240,235,0.01)' }}>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)', fontWeight: 600 }}>{order.id}</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', color: 'var(--white-dim)' }}>
                          {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', color: 'var(--white-dim)' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', color: 'var(--white)', fontWeight: 600 }}>₹{order.total.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <select defaultValue={order.status} style={{ background: 'var(--off-black)', border: `1px solid ${STATUS_COLORS[order.status]}`, color: STATUS_COLORS[order.status], fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', cursor: 'pointer', outline: 'none' }}>
                            {['processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', color: order.tracking ? 'var(--burgundy)' : 'rgba(245,240,235,0.2)' }}>
                          {order.tracking || '—'}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)', background: 'none', border: '1px solid rgba(245,240,235,0.1)', padding: '5px 10px', cursor: 'pointer' }}>Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {tab === 'customers' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '28px' }}>CUSTOMERS</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3px', marginBottom: '32px' }}>
                {[['2,140', 'Total Customers'],['87', 'New This Month'],['68%', 'Returning Rate'],['4.9★', 'Avg Satisfaction']].map(([val, label]) => (
                  <div key={label} style={{ background: 'var(--card-bg)', padding: '24px', borderBottom: '3px solid var(--burgundy)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--white)', marginBottom: '4px' }}>{val}</div>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--card-bg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--white-faint)' }}>
                      {['Customer', 'Email', 'Orders', 'Total Spent', 'Status'].map(h => (
                        <th key={h} style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--burgundy)', textAlign: 'left', fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Arjun Mathew', email: 'arjun@example.com', orders: 3, spent: 5744, loyal: true },
                      { name: 'Priya Sharma', email: 'priya@example.com', orders: 2, spent: 1748, loyal: false },
                      { name: 'Samuel Rajan', email: 'samuel@example.com', orders: 5, spent: 9120, loyal: true },
                      { name: 'Divya Kumar', email: 'divya@example.com', orders: 1, spent: 699, loyal: false },
                      { name: 'Joel Thomas', email: 'joel@example.com', orders: 4, spent: 6840, loyal: true },
                    ].map((c, i) => (
                      <tr key={c.email} style={{ borderBottom: '1px solid rgba(245,240,235,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(245,240,235,0.01)' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--white)', flexShrink: 0 }}>{c.name[0]}</div>
                            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)' }}>{c.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.75rem', color: 'var(--white-dim)' }}>{c.email}</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)' }}>{c.orders}</td>
                        <td style={{ padding: '14px 16px', fontFamily: 'var(--font-condensed)', fontSize: '0.82rem', color: 'var(--white)', fontWeight: 600 }}>₹{c.spent.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 8px', background: c.loyal ? 'rgba(123,28,46,0.2)' : 'rgba(245,240,235,0.06)', color: c.loyal ? 'var(--burgundy)' : 'var(--white-dim)' }}>
                            {c.loyal ? 'Loyal' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
