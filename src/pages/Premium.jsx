import { Link } from 'react-router-dom'

import DashboardHero from '../components/premium/DashboardHero'
import WeeklyBriefCard from '../components/premium/WeeklyBriefCard'
import LatestPremiumArticles from '../components/premium/LatestPremiumArticles'
import SavedPremiumArticles from '../components/premium/SavedPremiumArticles'
import ReadingStats from '../components/premium/ReadingStats'
import SubscriptionSettings from '../components/premium/SubscriptionSettings'
import PaymentHistory from '../components/premium/PaymentHistory'
import ContinueReading from '../components/premium/ContinueReading'
import ReadingHistory from '../components/premium/ReadingHistory'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

import { useAuth } from '../context/AuthContext'
import useSubscription from '../hooks/useSubscription'

export default function Premium() {
  const { user, isAuthenticated } = useAuth()

  const {
    loading,
    isPro,
    subscription
  } = useSubscription()

  if (loading) {
    return <LoadingScreen message="Checking Premium access..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO
          title="VedaByte Premium"
          description="Sign in to access VedaByte Premium intelligence, reports and weekly briefs."
          url="https://vedabyte-delta.vercel.app/premium"
        />

        <main className="premium-access-page">
          <section className="premium-access-card">
            <p className="premium-access-label">
              VEDABYTE PREMIUM
            </p>

            <h1 className="premium-access-title">
              Sign in to continue
            </h1>

            <p className="premium-access-text">
              Sign in to view your membership status and access
              VedaByte Premium.
            </p>

            <div className="premium-access-actions">
              <Link
                to="/profile"
                className="premium-primary-button"
              >
                Sign In
              </Link>
            </div>
          </section>
        </main>
      </>
    )
  }

  if (!isPro) {
    return (
      <>
        <SEO
          title="Upgrade to VedaByte Premium"
          description="Upgrade your VedaByte membership to access premium articles, weekly briefs and exclusive reports."
          url="https://vedabyte-delta.vercel.app/premium"
        />

        <main className="premium-access-page">
          <section className="premium-access-card">
            <p className="premium-access-label">
              VEDABYTE PREMIUM
            </p>

            <h1 className="premium-access-title">
              Premium access required
            </h1>

            <p className="premium-access-text">
              Upgrade your VedaByte membership to unlock premium
              articles, weekly intelligence briefs, reading insights
              and exclusive reports.
            </p>

            <div className="premium-access-actions">
              <Link
                to="/pricing"
                className="premium-primary-button"
              >
                View Premium Plans
              </Link>

              <Link
                to="/membership"
                className="premium-secondary-button"
              >
                View Membership
              </Link>
            </div>
          </section>
        </main>
      </>
    )
  }

  const memberName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'VedaByte member'

  return (
    <>
      <SEO
        title="VedaByte Premium Dashboard"
        description="Access your VedaByte Premium articles, weekly intelligence briefs and reading insights."
        url="https://vedabyte-delta.vercel.app/premium"
      />

      <main className="premium-page">
        <div className="premium-container">
          <DashboardHero />

          <section className="premium-membership-card">
            <div className="premium-membership-content">
              <p className="premium-membership-label">
                MEMBERSHIP STATUS
              </p>

              <h2 className="premium-membership-title">
                Premium Active
              </h2>

              <p className="premium-membership-text">
                Welcome {memberName}. Your premium access is active.
              </p>

              {subscription?.expires_at && (
                <p className="premium-expiry-text">
                  Access valid until{' '}
                  <strong>
                    {formatExpiryDate(subscription.expires_at)}
                  </strong>
                </p>
              )}
            </div>

            <Link
              to="/membership"
              className="premium-membership-button"
            >
              View Membership
            </Link>
          </section>

          <div className="premium-dashboard-grid">
            <section className="premium-left-column">
              <WeeklyBriefCard />
              <LatestPremiumArticles />
              <SavedPremiumArticles />
              <ContinueReading />
              <ReadingHistory />
            </section>

            <aside className="premium-right-column">
              <ReadingStats />
              <SubscriptionSettings />
              <PaymentHistory />
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function formatExpiryDate(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Not available'
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}