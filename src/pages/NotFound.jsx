import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | VedaByte"
        description="The page you requested could not be found. Return to VedaByte or search technology articles."
        url="https://vedabyte-delta.vercel.app/404"
      />

      <main className="not-found-page">
        <div className="not-found-glow" />

        <div className="not-found-content">
          <div className="not-found-code">404</div>

          <p className="not-found-label">
            PAGE NOT FOUND
          </p>

          <h1 className="not-found-title">
            This page disappeared into the tech void.
          </h1>

          <p className="not-found-description">
            The link may be incorrect, expired, or the page may have been
            moved. Return to VedaByte and continue exploring technology
            news.
          </p>

          <div className="not-found-actions">
            <Link
              to="/"
              className="not-found-primary-button"
            >
              Go to Home
            </Link>

            <Link
              to="/search"
              className="not-found-secondary-button"
            >
              Search Articles
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}