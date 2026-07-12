import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>LEGAL</p>

        <h1 style={titleStyle}>Refund & Cancellation Policy</h1>

        <p style={updatedStyle}>Last updated: 12 July 2026</p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>1. Digital Membership</h2>

          <p style={paragraphStyle}>
            VedaByte Premium is a digital subscription that provides immediate
            access to premium articles, reports, newsletters and exclusive
            features after successful payment.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>2. Cancellation</h2>

          <p style={paragraphStyle}>
            You may cancel your membership renewal at any time. Cancellation
            prevents future renewals but does not revoke access already granted
            for the current paid subscription period.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>3. Refunds</h2>

          <p style={paragraphStyle}>
            Because Premium Membership is a digital product with instant access,
            payments are generally non-refundable after successful activation.
          </p>

          <p style={paragraphStyle}>
            Refund requests may be considered in exceptional circumstances such
            as duplicate payments, technical issues that prevent access, or
            accidental charges, subject to review by VedaByte.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>4. Failed Transactions</h2>

          <p style={paragraphStyle}>
            If a payment fails but money is deducted, Razorpay and your bank
            usually reverse the amount automatically according to their
            settlement process.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>5. Contact</h2>

          <p style={paragraphStyle}>
            For refund or payment-related questions, contact us at:
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