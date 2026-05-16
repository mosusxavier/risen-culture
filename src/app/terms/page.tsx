'use client';

export default function TermsAndConditions() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '12px' }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '40px', letterSpacing: '0.02em' }}>
          TERMS & <span style={{ color: 'var(--burgundy)' }}>CONDITIONS</span>
        </h1>
        
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.8', color: 'var(--white-dim)' }}>
          <p style={{ marginBottom: '24px' }}>Last Updated: May 16, 2026</p>
          <p style={{ marginBottom: '32px' }}>By accessing and using RISEN CULTURE, you agree to the following terms and conditions.</p>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>1. General</h2>
          <p style={{ marginBottom: '24px' }}>RISEN CULTURE reserves the right to modify products, pricing, policies, or website content at any time without prior notice.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>2. Product Information</h2>
          <p style={{ marginBottom: '24px' }}>We aim to display product colors and designs accurately. However, slight variations may occur depending on screen settings and manufacturing.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>3. Pricing</h2>
          <p style={{ marginBottom: '24px' }}>All prices are listed in INR unless stated otherwise. RISEN CULTURE reserves the right to change prices without prior notice.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>4. Orders</h2>
          <p style={{ marginBottom: '24px' }}>We reserve the right to refuse or cancel orders, limit quantities purchased, or cancel suspicious or fraudulent transactions.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>5. Payments</h2>
          <p style={{ marginBottom: '24px' }}>Payments are processed securely through third-party payment providers. RISEN CULTURE is not responsible for payment failures caused by banking systems, gateways, or technical interruptions.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>6. Intellectual Property</h2>
          <p style={{ marginBottom: '24px' }}>All website content including logos, graphics, product designs, branding, images, and text belongs to RISEN CULTURE and may not be copied or reproduced without permission.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>7. Limitation of Liability</h2>
          <p style={{ marginBottom: '24px' }}>RISEN CULTURE shall not be liable for indirect damages, delayed deliveries caused by courier partners, technical website interruptions, or misuse of products.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>8. Governing Law</h2>
          <p style={{ marginBottom: '24px' }}>These terms are governed by the laws of India.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>9. Contact</h2>
          <p>Email: <strong>risenculture.shop@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}
