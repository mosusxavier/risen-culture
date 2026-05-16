'use client';

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--burgundy)', marginBottom: '12px' }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '40px', letterSpacing: '0.02em' }}>
          PRIVACY <span style={{ color: 'var(--burgundy)' }}>POLICY</span>
        </h1>
        
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.8', color: 'var(--white-dim)' }}>
          <p style={{ marginBottom: '24px' }}>Last Updated: May 16, 2026</p>
          <p style={{ marginBottom: '32px' }}>Welcome to RISEN CULTURE. Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you visit or purchase from our website.</p>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>1. Information We Collect</h2>
          <p>When you use our website, we may collect:</p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (processed securely through third-party payment providers)</li>
            <li>Order history</li>
            <li>Device/browser information</li>
            <li>IP address</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li>Process and deliver orders</li>
            <li>Provide customer support</li>
            <li>Send order updates and notifications</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and unauthorized activity</li>
            <li>Send promotional emails or offers (only if you opt in)</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>3. Payment Information</h2>
          <p style={{ marginBottom: '24px' }}>Payments on RISEN CULTURE are processed securely through trusted third-party payment gateways such as Razorpay. We do not store your full card or banking information on our servers.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>4. Cookies</h2>
          <p style={{ marginBottom: '24px' }}>We may use cookies and similar technologies to improve your browsing experience, analyze website traffic, and personalize content. You can disable cookies through your browser settings.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>5. Third-Party Services</h2>
          <p style={{ marginBottom: '24px' }}>We may use third-party services including Payment gateways, Shipping providers, Analytics tools, and Email service providers. These services may collect and process your information according to their own privacy policies.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>6. Data Security</h2>
          <p style={{ marginBottom: '24px' }}>We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no online system is 100% secure.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>7. Your Rights</h2>
          <p style={{ marginBottom: '24px' }}>You may request access to your personal data, correction of incorrect information, deletion of your data, or unsubscribing from marketing emails.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>8. Changes to This Policy</h2>
          <p style={{ marginBottom: '24px' }}>RISEN CULTURE may update this Privacy Policy at any time. Changes will be posted on this page.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px' }}>9. Contact Us</h2>
          <p>For any privacy-related questions: <br /><strong>Email:</strong> risenculture.shop@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
