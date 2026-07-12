import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>LEGAL</p>

        <h1 style={titleStyle}>Privacy Policy</h1>

        <p style={updatedStyle}>Last updated: 12 July 2026</p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>1. Introduction</h2>

          <p style={paragraphStyle}>
            VedaByte respects your privacy and is committed to protecting your
            personal information. This Privacy Policy explains what information
            we collect, why we collect it, how we use it, and the choices
            available to you when you use the VedaByte website and services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>2. Information We Collect</h2>

          <p style={paragraphStyle}>
            We may collect information that you provide directly, including
            your name, email address, profile information, newsletter
            preferences, saved articles, comments, membership details and
            support requests.
          </p>

          <p style={paragraphStyle}>
            We may also collect technical information such as your browser
            type, device information, IP address, pages visited, usage activity
            and diagnostic data.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>3. How We Use Information</h2>

          <p style={paragraphStyle}>
            We use information to provide and secure VedaByte, authenticate
            users, manage memberships, process payments, deliver newsletters,
            improve content, prevent fraud, respond to support requests and
            comply with applicable legal obligations.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>4. Payments</h2>

          <p style={paragraphStyle}>
            Payments are processed through Razorpay. VedaByte does not directly
            store complete card, bank-account or UPI credentials. Razorpay may
            collect and process payment information according to its own terms
            and privacy policy.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>5. Service Providers</h2>

          <p style={paragraphStyle}>
            We may use trusted service providers including Supabase for
            authentication and database services, Vercel for hosting, Razorpay
            for payments, Brevo for email communication, and third-party news
            and analytics providers.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>6. Cookies and Analytics</h2>

          <p style={paragraphStyle}>
            VedaByte may use cookies, local storage and similar technologies to
            maintain sessions, remember preferences, improve performance and
            understand how the service is used.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>7. Data Retention</h2>

          <p style={paragraphStyle}>
            We retain personal information only for as long as reasonably
            necessary to provide our services, maintain business and payment
            records, resolve disputes and meet legal obligations.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>8. Data Security</h2>

          <p style={paragraphStyle}>
            We use reasonable technical and organisational safeguards to
            protect personal information. However, no internet-based system can
            be guaranteed to be completely secure.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>9. Your Choices and Rights</h2>

          <p style={paragraphStyle}>
            You may request access to, correction of, or deletion of your
            personal information, subject to applicable law and legitimate
            retention requirements. You may also unsubscribe from marketing
            emails using the unsubscribe option included in those messages.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>10. Third-Party Links</h2>

          <p style={paragraphStyle}>
            VedaByte may link to third-party websites and news sources. We are
            not responsible for the privacy practices or content of those
            external services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>11. Changes to This Policy</h2>

          <p style={paragraphStyle}>
            We may update this Privacy Policy from time to time. The latest
            version will be posted on this page with the revised update date.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>12. Contact Us</h2>

          <p style={paragraphStyle}>
            For privacy questions, requests or complaints, contact:
          </p>

          <a href="mailto:vedabytenews@gmail.com" style={emailStyle}>
            vedabytenews@gmail.com
          </a>
        </section>

        <div style={backStyle}>
          <Link to="/" style={linkStyle}>
            ← Back to VedaByte
          </Link>
        </div>
      </div>
    </main>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: '#080808',
  color: '#FFFFFF',
  padding: '90px 20px'
}

const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto'
}

const eyebrowStyle = {
  color: '#D4AF37',
  letterSpacing: '0.28em',
  fontSize: '12px',
  fontWeight: '900'
}

const titleStyle = {
  fontSize: 'clamp(44px, 7vw, 72px)',
  margin: '14px 0 8px'
}

const updatedStyle = {
  color: '#9CA3AF',
  marginBottom: '48px'
}

const sectionStyle = {
  padding: '26px 0',
  borderBottom: '1px solid #232323'
}

const headingStyle = {
  fontSize: '23px',
  marginBottom: '14px'
}

const paragraphStyle = {
  color: '#B7BDC8',
  fontSize: '17px',
  lineHeight: '1.85',
  margin: '10px 0'
}

const emailStyle = {
  display: 'inline-block',
  color: '#D4AF37',
  marginTop: '8px',
  textDecoration: 'none',
  fontWeight: '700'
}

const backStyle = {
  marginTop: '42px'
}

const linkStyle = {
  color: '#D4AF37',
  textDecoration: 'none',
  fontWeight: '800'
}