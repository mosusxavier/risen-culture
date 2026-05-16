'use client';

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '12px' }}>Support</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '40px', letterSpacing: '0.02em' }}>
          CONTACT <span style={{ color: 'var(--burgundy)' }}>US</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          {/* Contact Info */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--white-dim)', marginBottom: '40px' }}>
              We would love to hear from you. Whether you have a question about our collections, your order, or just want to say hi, our team is here to help.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>CUSTOMER SUPPORT</h3>
              <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--burgundy)', letterSpacing: '0.05em' }}>risenculture.shop@gmail.com</p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>BUSINESS INQUIRIES</h3>
              <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', color: 'var(--burgundy)', letterSpacing: '0.05em' }}>risenculture.shop@gmail.com</p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>WORKING HOURS</h3>
              <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--white-dim)', letterSpacing: '0.05em' }}>Monday – Saturday<br />10:00 AM – 6:00 PM IST</p>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '8px' }}>FOLLOW US</h3>
              <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.9rem', color: 'var(--white-dim)', letterSpacing: '0.05em' }}>Instagram: @risenculture.shop</p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: 'var(--card-bg)', padding: '40px', border: '1px solid var(--white-faint)' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', marginBottom: '8px' }}>Full Name</label>
              <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '12px', background: 'var(--off-black)', border: '1px solid var(--white-faint)', color: 'var(--white)', fontFamily: 'var(--font-condensed)' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', marginBottom: '8px' }}>Email Address</label>
              <input type="email" placeholder="Your Email" style={{ width: '100%', padding: '12px', background: 'var(--off-black)', border: '1px solid var(--white-faint)', color: 'var(--white)', fontFamily: 'var(--font-condensed)' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', marginBottom: '8px' }}>Subject</label>
              <input type="text" placeholder="Order Issue, Sizing, etc." style={{ width: '100%', padding: '12px', background: 'var(--off-black)', border: '1px solid var(--white-faint)', color: 'var(--white)', fontFamily: 'var(--font-condensed)' }} />
            </div>
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white-dim)', marginBottom: '8px' }}>Message</label>
              <textarea placeholder="Your Message" rows={5} style={{ width: '100%', padding: '12px', background: 'var(--off-black)', border: '1px solid var(--white-faint)', color: 'var(--white)', fontFamily: 'var(--font-condensed)', resize: 'none' }}></textarea>
            </div>
            <button style={{ width: '100%', padding: '16px', background: 'var(--burgundy)', border: 'none', color: 'var(--white)', fontFamily: 'var(--font-condensed)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8e1a30')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--burgundy)')}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
