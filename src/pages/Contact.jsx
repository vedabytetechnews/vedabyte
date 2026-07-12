import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <p style={eyebrowStyle}>CONTACT</p>

        <h1 style={titleStyle}>Contact VedaByte</h1>

        <p style={updatedStyle}>
          We'd love to hear from you.
        </p>

        <section style={cardStyle}>
          <h2 style={headingStyle}>General Enquiries</h2>

          <p style={paragraphStyle}>
            Email us anytime regarding partnerships, media requests,
            technical support or Premium Membership.
          </p>

          <a
            href="mailto:vedabytenews@gmail.com"
            style={emailStyle}
          >
            vedabytenews@gmail.com
          </a>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Business</h2>

          <p style={paragraphStyle}>
            Advertising, sponsorships, startup collaborations,
            product launches and strategic partnerships.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Support</h2>

          <p style={paragraphStyle}>
            Need help with your account or Premium Membership?
            We'll respond as quickly as possible.
          </p>
        </section>

        <section style={cardStyle}>
          <h2 style={headingStyle}>Response Time</h2>

          <p style={paragraphStyle}>
            Most emails receive a response within
            <strong style={{ color: '#D4AF37' }}> 24–48 business hours.</strong>
          </p>
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
  color: '#fff',
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
  fontSize: 'clamp(44px,7vw,72px)',
  margin: '14px 0'
}

const updatedStyle = {
  color: '#9CA3AF',
  marginBottom: '40px'
}

const cardStyle = {
  border: '1px solid #232323',
  borderRadius: '18px',
  padding: '28px',
  marginBottom: '24px',
  background: '#101010'
}

const headingStyle = {
  marginBottom: '14px',
  fontSize: '24px'
}

const paragraphStyle = {
  color: '#B7BDC8',
  fontSize: '17px',
  lineHeight: '1.8'
}

const emailStyle = {
  display: 'inline-block',
  marginTop: '18px',
  color: '#D4AF37',
  textDecoration: 'none',
  fontWeight: '700'
}

const backStyle = {
  marginTop: '40px'
}

const linkStyle = {
  color: '#D4AF37',
  textDecoration: 'none',
  fontWeight: '700'
}