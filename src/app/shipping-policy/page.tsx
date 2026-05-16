'use client';

export default function ShippingPolicy() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '12px' }}>Customer Service</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '40px', letterSpacing: '0.02em' }}>
          SHIPPING <span style={{ color: 'var(--burgundy)' }}>POLICY</span>
        </h1>
        
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.8', color: 'var(--white-dim)' }}>
          <p style={{ marginBottom: '24px' }}>Last Updated: May 16, 2026</p>
          <p style={{ marginBottom: '32px' }}>Thank you for shopping with RISEN CULTURE.</p>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>1. Order Processing Time</h2>
          <p style={{ marginBottom: '24px' }}>Orders are typically processed within 1–3 business days after payment confirmation. Processing times may increase during product launches, sales, holidays, or high-demand periods.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>2. Shipping Timeline</h2>
          <p>Estimated delivery times:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li><strong>Metro cities:</strong> 3–7 business days</li>
            <li><strong>Other regions:</strong> 5–10 business days</li>
          </ul>
          <p style={{ marginBottom: '24px' }}>Delivery times may vary depending on courier availability and location.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>3. Shipping Charges</h2>
          <p style={{ marginBottom: '24px' }}>Shipping charges will be displayed during checkout. Free shipping may be offered during promotional campaigns.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>4. Order Tracking</h2>
          <p style={{ marginBottom: '24px' }}>Once your order is shipped, tracking details will be sent through email or SMS.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>5. Failed Deliveries</h2>
          <p style={{ marginBottom: '24px' }}>If delivery fails due to incorrect address or customer unavailability, additional shipping charges may apply.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>6. Delays</h2>
          <p style={{ marginBottom: '24px' }}>RISEN CULTURE is not responsible for delays caused by natural disasters, courier issues, government restrictions, or unforeseen logistics problems.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>7. Contact</h2>
          <p>Email: <strong>risenculture.shop@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}
