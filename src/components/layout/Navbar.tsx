'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'New Arrivals', href: '/shop?category=new' },
    { label: 'Men', href: '/shop?category=men' },
    { label: 'Women', href: '/shop?category=women' },
    { label: 'Collections', href: '/shop' },
    { label: 'Our Story', href: '/#about' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        padding: scrolled ? '14px 5%' : '20px 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(123,28,46,0.2)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.8rem',
          letterSpacing: '0.15em', color: 'var(--white)', textDecoration: 'none',
        }}>
          RISEN<span style={{ color: 'var(--burgundy)' }}>.</span>CULTURE
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', alignItems: 'center' }} className="nav-desktop">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} style={{
                fontFamily: 'var(--font-condensed)', fontSize: '0.82rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--white-dim)', textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href={user ? '/account' : '/account'} style={{
            fontFamily: 'var(--font-condensed)', fontSize: '0.75rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--white-dim)', textDecoration: 'none', transition: 'color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-dim)')}
          className="nav-desktop">
            {user ? user.name.split(' ')[0] : 'Sign In'}
          </Link>

          <button
            onClick={openCart}
            id="nav-cart-btn"
            style={{
              fontFamily: 'var(--font-condensed)', fontSize: '0.78rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--white-dim)', background: 'none',
              border: '1px solid rgba(245,240,235,0.15)', padding: '9px 18px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--burgundy)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--white)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,240,235,0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--white-dim)';
            }}
          >
            🛍
            <span style={{
              width: '18px', height: '18px', background: 'var(--burgundy)',
              borderRadius: '50%', fontSize: '0.58rem', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--white)',
            }}>
              {totalItems}
            </span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
            className="nav-mobile"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: '24px', height: '2px', background: 'var(--white)',
                display: 'block', transition: 'all 0.3s',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translateY(7px)'
                    : i === 1 ? 'scaleX(0)'
                      : 'rotate(-45deg) translateY(-7px)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.98)',
        zIndex: 999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '32px',
        transform: mobileOpen ? 'none' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: 'var(--font-display)', fontSize: '2.5rem',
            letterSpacing: '0.1em', color: 'var(--white)', textDecoration: 'none',
          }}>
            {link.label}
          </Link>
        ))}
        <Link href="/account" style={{
          fontFamily: 'var(--font-display)', fontSize: '2.5rem',
          letterSpacing: '0.1em', color: 'var(--burgundy)', textDecoration: 'none',
        }}>
          {user ? 'Account' : 'Sign In'}
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
