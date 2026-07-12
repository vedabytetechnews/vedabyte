import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>LEGAL</p>

        <h1 style={titleStyle}>Terms & Conditions</h1>

        <p style={updatedStyle}>Last updated: 12 July 2026</p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>1. Acceptance of Terms</h2>

          <p style={paragraphStyle}>
            By accessing or using VedaByte, you agree to these Terms &
            Conditions. If you do not agree, please discontinue use of the
            website and services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>2. About VedaByte</h2>

          <p style={paragraphStyle}>
            VedaByte is a technology news and information platform providing
            curated news, analysis, premium content and related digital
            services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>3. User Accounts</h2>

          <p style={paragraphStyle}>
            Some features require an account. You are responsible for
            maintaining the confidentiality of your account and ensuring that
            the information you provide is accurate.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>4. Premium Membership</h2>

          <p style={paragraphStyle}>
            Premium Membership provides access to exclusive content and features
            available only to active subscribers. Access remains available for
            the duration of the active subscription period.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>5. Payments</h2>

          <p style={paragraphStyle}>
            Payments are securely processed through Razorpay. By purchasing a
            membership, you authorize the applicable charges for your selected
            plan. VedaByte does not store complete payment card or banking
            credentials.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>6. Acceptable Use</h2>

          <p style={paragraphStyle}>
            You agree not to misuse the platform, attempt unauthorized access,
            interfere with services, distribute malicious software or violate
            applicable laws while using VedaByte.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>7. Intellectual Property</h2>

          <p style={paragraphStyle}>
            Unless otherwise stated, the VedaByte brand, logo, design,
            original content and software are owned by VedaByte. Third-party
            articles, trademarks and logos remain the property of their
            respective owners.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>8. Third-Party Content</h2>

          <p style={paragraphStyle}>
            VedaByte may display or link to news and information from external
            publishers. We are not responsible for the accuracy, availability
            or content of third-party websites.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>9. Disclaimer</h2>

          <p style={paragraphStyle}>
            The information on VedaByte is provided for general informational
            purposes only. While we strive for accuracy, we do not guarantee
            that all content is complete, current or error-free.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>10. Limitation of Liability</h2>

          <p style={paragraphStyle}>
            To the maximum extent permitted by law, VedaByte shall not be
            liable for indirect, incidental or consequential damages arising
            from your use of the website or services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>11. Changes</h2>

          <p style={paragraphStyle}>
            We may modify these Terms from time to time. Continued use of
            VedaByte after updates constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>12. Governing Law</h2>

          <p style={paragraphStyle}>
            These Terms shall be governed by and interpreted in accordance with
            the laws of India. Any disputes shall be subject to the competent
            courts having jurisdiction.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>13. Contact</h2>

          <p style={paragraphStyle}>
            Questions regarding these Terms may be sent to:
          </p>

          <a
            href="mailto:vedabytenews@gmail.com"
            style={emailStyle}
          >
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