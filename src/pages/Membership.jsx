import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { getUserSubscription } from '../services/subscriptionService'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function Membership() {
  const { user, isAuthenticated } = useAuth()

  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadMembership() {
      if (!user) {
        if (isMounted) {
          setLoading(false)
        }

        return
      }

      try {
        if (isMounted) {
          setLoading(true)
          setError('')
        }

        const data = await getUserSubscription(user.id)

        if (isMounted) {
          setSubscription(data)
        }
      } catch (membershipError) {
        console.error('Failed to load membership:', membershipError)

        if (isMounted) {
          setError('Unable to load your membership right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadMembership()

    return () => {
      isMounted = false
    }
  }, [user])

  if (loading) {
    return (
      <LoadingScreen message="Loading your membership..." />
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO
          title="VedaByte Membership"
          description="Sign in to view your VedaByte membership and Premium access."
          url="https://vedabyte-delta.vercel.app/membership"
        />

        <main className="membership-page membership-access-page">
          <section className="membership-access-card">
            <p className="membership-label">
              VEDABYTE ACCOUNT
            </p>

            <h1 className="membership-title">
              Membership
            </h1>

            <p className="membership-text">
              Please sign in to view your membership status,
              Premium access and payment details.
            </p>

            <div className="membership-actions">
              <Link
                to="/profile"
                className="membership-primary-button"
              >
                Sign In
              </Link>

              <Link
                to="/pricing"
                className="membership-secondary-button"
              >
                View Plans
              </Link>
            </div>
          </section>
        </main>
      </>
    )
  }

  const plan = subscription?.plan || 'free'
  const status = subscription?.status || 'active'

  const expiryDate = subscription?.expires_at
    ? new Date(subscription.expires_at)
    : null

  const hasValidExpiry =
    expiryDate &&
    !Number.isNaN(expiryDate.getTime())

  const expiresAt = hasValidExpiry
    ? expiryDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'Not applicable'

  const remainingDays = hasValidExpiry
    ? Math.max(
        0,
        Math.ceil(
          (expiryDate.getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : null

  const expiryValue =
    remainingDays !== null
      ? `${expiresAt} (${remainingDays} day${
          remainingDays === 1 ? '' : 's'
        } left)`
      : expiresAt

  return (
    <>
      <SEO
        title="My VedaByte Membership"
        description="View your VedaByte plan, subscription status, expiry date and payment history."
        url="https://vedabyte-delta.vercel.app/membership"
      />

      <main className="membership-page">
        <header className="membership-header">
          <p className="membership-label">
            VEDABYTE ACCOUNT
          </p>

          <h1 className="membership-title">
            My Membership
          </h1>

          <p className="membership-text">
            Review your current plan, Premium access and
            subscription details.
          </p>
        </header>

        {error ? (
          <section className="membership-error-card">
            <h2>Membership unavailable</h2>

            <p>{error}</p>
          </section>
        ) : (
          <section className="membership-card">
            <Row
              label="Current Plan"
              value={plan.toUpperCase()}
              gold
            />

            <Row
              label="Status"
              value={status.toUpperCase()}
            />

            <Row
              label="Expires"
              value={expiryValue}
            />

            <Row
              label="Payment ID"
              value={
                subscription?.razorpay_payment_id ||
                'No payment yet'
              }
            />
          </section>
        )}

        <div className="membership-actions">
          <Link
            to="/pricing"
            className="membership-primary-button"
          >
            Upgrade / Renew
          </Link>

          <Link
            to="/premium"
            className="membership-secondary-button"
          >
            Premium Dashboard
          </Link>

          <Link
            to="/payments"
            className="membership-secondary-button"
          >
            Payment History
          </Link>
        </div>
      </main>
    </>
  )
}

function Row({ label, value, gold = false }) {
  return (
    <div className="membership-row">
      <span className="membership-row-label">
        {label}
      </span>

      <strong
        className={
          gold
            ? 'membership-row-value gold'
            : 'membership-row-value'
        }
      >
        {value}
      </strong>
    </div>
  )
}