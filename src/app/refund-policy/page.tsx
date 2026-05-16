'use client';

export default function RefundPolicy() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '12px' }}>Customer Service</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '40px', letterSpacing: '0.02em' }}>
          REFUND <span style={{ color: 'var(--burgundy)' }}>POLICY</span>
        </h1>
        
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.8', color: 'var(--white-dim)' }}>
          <p style={{ marginBottom: '24px' }}>Last Updated: May 16, 2026</p>
          <p style={{ marginBottom: '32px' }}>At RISEN CULTURE, we want you to love what you wear. If you are not satisfied with your order, please review our return and refund policy below.</p>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>1. Return Eligibility</h2>
          <p>Items are eligible for return if:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li>The return request is made within 7 days of delivery</li>
            <li>The item is unused, unwashed, and in original condition</li>
            <li>Original tags and packaging are intact</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>2. Non-Returnable Items</h2>
          <p>We do not accept returns for:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li>Worn or damaged items</li>
            <li>Products damaged after delivery</li>
            <li>Items purchased during clearance or special sale events</li>
            <li>Customized or limited-edition items (if applicable)</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>3. Refund Process</h2>
          <p style={{ marginBottom: '24px' }}>Once your returned item is received and inspected:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li>Approved refunds will be processed within 5–7 business days</li>
            <li>Refunds will be sent to the original payment method</li>
            <li>Shipping charges are non-refundable unless the issue was caused by us</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>4. Exchange Policy</h2>
          <p style={{ marginBottom: '24px' }}>We may allow exchanges for wrong size received, damaged products, or incorrect items delivered. Exchange availability depends on stock availability.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>5. Damaged or Incorrect Orders</h2>
          <p style={{ marginBottom: '24px' }}>If you receive a damaged or incorrect product, contact us within 48 hours of delivery with your order number and photos of the product.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>6. Return Shipping</h2>
          <p style={{ marginBottom: '24px' }}>Customers may be responsible for return shipping charges unless the return is due to our error.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>7. Contact Us</h2>
          <p>Email: <strong>risenculture.shop@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}
