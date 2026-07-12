import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={brandColumnStyle}>
          <Link to="/" style={brandStyle}>
            VedaByte
          </Link>

          <p style={descriptionStyle}>
            Premium technology news, intelligence summaries and curated
            insights for developers, founders and modern technology teams.
          </p>

          <p style={copyrightStyle}>
            © {new Date().getFullYear()} VedaByte. All rights reserved.
          </p>
        </div>

        <div style={linksGridStyle}>
          <div>
            <h3 style={headingStyle}>Explore</h3>

            <div style={linkColumnStyle}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>

              <Link to="/search" style={linkStyle}>
                Search
              </Link>

              <Link to="/category/ai" style={linkStyle}>
                Artificial Intelligence
              </Link>

              <Link to="/category/startups" style={linkStyle}>
                Startups
              </Link>

              <Link to="/category/security" style={linkStyle}>
                Cybersecurity
              </Link>
            </div>
          </div>

          <div>
            <h3 style={headingStyle}>Membership</h3>

            <div style={linkColumnStyle}>
              <Link to="/pricing" style={linkStyle}>
                Premium Plans
              </Link>

              <Link to="/membership" style={linkStyle}>
                My Membership
              </Link>

              <Link to="/payments" style={linkStyle}>
                Payment History
              </Link>

              <Link to="/premium" style={linkStyle}>
                Premium Dashboard
              </Link>
            </div>
          </div>

          <div>
            <h3 style={headingStyle}>Legal</h3>

            <div style={linkColumnStyle}>
              <Link to="/privacy-policy" style={linkStyle}>
                Privacy Policy
              </Link>

              <Link to="/terms" style={linkStyle}>
                Terms & Conditions
              </Link>

              <Link to="/refund-policy" style={linkStyle}>
                Refund & Cancellation
              </Link>

              <Link to="/contact" style={linkStyle}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={bottomBarStyle}>
        <div style={bottomInnerStyle}>
          <p style={bottomTextStyle}>
            Built for the future of technology news.
          </p>

          <a
            href="mailto:vedabytenews@gmail.com"
            style={emailStyle}
          >
            vedabytenews@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}

const footerStyle = {
  background: '#080808',
  borderTop: '1px solid #232323',
  color: '#FFFFFF',
  marginTop: '80px'
}

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '56px 20px',
  display: 'grid',
  gridTemplateColumns: 'minmax(260px, 1.2fr) minmax(0, 2fr)',
  gap: '60px'
}

const brandColumnStyle = {
  maxWidth: '420px'
}

const brandStyle = {
  color: '#D4AF37',
  fontSize: '26px',
  fontWeight: '900',
  textDecoration: 'none'
}

const descriptionStyle = {
  color: '#9CA3AF',
  lineHeight: '1.8',
  marginTop: '16px',
  fontSize: '15px'
}

const copyrightStyle = {
  color: '#6B7280',
  marginTop: '24px',
  fontSize: '14px'
}

const linksGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
  gap: '36px'
}

const headingStyle = {
  color: '#D4AF37',
  fontSize: '13px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  marginBottom: '18px'
}

const linkColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const linkStyle = {
  color: '#B7BDC8',
  textDecoration: 'none',
  fontSize: '15px'
}

const bottomBarStyle = {
  borderTop: '1px solid #1C1C1C'
}

const bottomInnerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  flexWrap: 'wrap'
}

const bottomTextStyle = {
  color: '#6B7280',
  margin: 0,
  fontSize: '14px'
}

const emailStyle = {
  color: '#D4AF37',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '700'
}