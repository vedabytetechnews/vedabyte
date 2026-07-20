import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            VedaByte
          </Link>

          <p className="site-footer__description">
            Premium technology news, intelligence summaries and curated
            insights for developers, founders and modern technology teams.
          </p>

          <p className="site-footer__copyright">
            © {currentYear} VedaByte. All rights reserved.
          </p>
        </div>

        <div className="site-footer__links-grid">
          <FooterColumn title="Explore">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/search">Search</FooterLink>
            <FooterLink to="/category/ai">
              Artificial Intelligence
            </FooterLink>
            <FooterLink to="/category/startups">
              Startups
            </FooterLink>
            <FooterLink to="/category/security">
              Cybersecurity
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Membership">
            <FooterLink to="/pricing">Premium Plans</FooterLink>
            <FooterLink to="/membership">My Membership</FooterLink>
            <FooterLink to="/payments">Payment History</FooterLink>
            <FooterLink to="/premium">Premium Dashboard</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink to="/privacy-policy">
              Privacy Policy
            </FooterLink>
            <FooterLink to="/terms">
              Terms & Conditions
            </FooterLink>
            <FooterLink to="/refund-policy">
              Refund & Cancellation
            </FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterColumn>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__bottom-text">
            Built for the future of technology news.
          </p>

          <a
            href="mailto:vedabytenews@gmail.com"
            className="site-footer__email"
          >
            vedabytenews@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <section className="site-footer__column">
      <h2 className="site-footer__heading">
        {title}
      </h2>

      <nav
        className="site-footer__link-column"
        aria-label={`${title} footer links`}
      >
        {children}
      </nav>
    </section>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="site-footer__link">
      {children}
    </Link>
  )
}