'use client';

import Link from 'next/link';

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', href: '/shop?category=new' },
    { label: "Men's Collection", href: '/shop?category=men' },
    { label: "Women's Collection", href: '/shop?category=women' },
    { label: 'Limited Drops', href: '/shop?collection=limited' },
    { label: 'All Products', href: '/shop' },
  ],
  Support: [
    { label: 'My Account', href: '/account' },
    { label: 'Order Tracking', href: '/account#orders' },
    { label: 'Returns Policy', href: '/#contact' },
    { label: 'Size Guide', href: '/#size-guide' },
    { label: 'Contact Us', href: '/#contact' },
  ],
  Brand: [
    { label: 'Our Story', href: '/#about' },
    { label: 'The Mission', href: '/#about' },
    { label: 'Community', href: '/#gallery' },
    { label: 'Admin Portal', href: '/admin' },
    { label: 'Stockists', href: '/#contact' },
  ],
};

const socials = [
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'TW', href: 'https://twitter.com' },
  { label: 'YT', href: 'https://youtube.com' },
  { label: 'FB', href: 'https://facebook.com' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--off-black)',
      borderTop: '1px solid var(--white-faint)',
      padding: '60px 5% 32px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '48px',
        maxWidth: '1300px',
        margin: '0 auto',
        paddingBottom: '48px',
        borderBottom: '1px solid var(--white-faint)',
      }}>
        {/* Brand column */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '2.2rem',
            letterSpacing: '0.1em', color: 'var(--white)', marginBottom: '10px',
          }}>
            RISEN<span style={{ color: 'var(--burgundy)' }}>.</span>CULTURE
          </div>
          <div style={{
            fontFamily: 'var(--font-condensed)', fontSize: '0.72rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--white-dim)', marginBottom: '16px',
          }}>
            He Rose. So Do We.
          </div>
          <p style={{ fontSize: '0.83rem', lineHeight: '1.7', color: 'rgba(245,240,235,0.4)', maxWidth: '240px' }}>
            Christian streetwear for the bold generation. Tiruchirappalli, Tamil Nadu, India.
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px', border: '1px solid rgba(245,240,235,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--white-dim)', textDecoration: 'none', fontSize: '0.8rem',
                  fontFamily: 'var(--font-condensed)', letterSpacing: '0.05em',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--burgundy)';
                  e.currentTarget.style.borderColor = 'var(--burgundy)';
                  e.currentTarget.style.color = 'var(--white)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(245,240,235,0.1)';
                  e.currentTarget.style.color = 'var(--white-dim)';
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h5 style={{
              fontFamily: 'var(--font-condensed)', fontSize: '0.68rem',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--burgundy)', marginBottom: '18px',
            }}>
              {heading}
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map(link => (
                <li key={link.label}>
                  <Link href={link.href} style={{
                    fontSize: '0.85rem', color: 'rgba(245,240,235,0.45)',
                    textDecoration: 'none', fontFamily: 'var(--font-condensed)',
                    letterSpacing: '0.05em', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.45)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h5 style={{
            fontFamily: 'var(--font-condensed)', fontSize: '0.68rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--burgundy)', marginBottom: '18px',
          }}>
            Newsletter
          </h5>
          <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,235,0.4)', lineHeight: '1.6', marginBottom: '14px' }}>
            Join the movement. Be the first to know about drops and restocks.
          </p>
          <div style={{ display: 'flex', gap: '0' }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="rc-input"
              style={{ borderRight: 'none', fontSize: '0.82rem', padding: '10px 14px' }}
            />
            <button style={{
              background: 'var(--burgundy)', border: 'none', color: 'var(--white)',
              padding: '10px 14px', cursor: 'pointer', fontFamily: 'var(--font-condensed)',
              fontSize: '0.7rem', letterSpacing: '0.1em', flexShrink: 0,
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--burgundy-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--burgundy)')}
            >
              JOIN
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1300px', margin: '24px auto 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <p style={{
          fontSize: '0.72rem', color: 'rgba(245,240,235,0.22)',
          fontFamily: 'var(--font-condensed)', letterSpacing: '0.1em',
        }}>
          © 2024 Risen Culture · All rights reserved.
        </p>
        <p style={{
          fontFamily: 'var(--font-condensed)', fontSize: '0.68rem',
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--burgundy)',
        }}>
          Philippians 4:13 · He Rose. So Do We.
        </p>
      </div>
    </footer>
  );
}
