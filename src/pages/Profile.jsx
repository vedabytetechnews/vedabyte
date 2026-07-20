import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { getProfileStats } from '../services/profileService'
import useSubscription from '../hooks/useSubscription'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function Profile() {
  const { user, isAuthenticated } = useAuth()
  const { loading: subscriptionLoading, isPro } = useSubscription()

  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      if (!user) {
        if (isMounted) {
          setStats(null)
          setLoading(false)
        }

        return
      }

      try {
        if (isMounted) {
          setLoading(true)
          setError('')
        }

        const data = await getProfileStats(user.id)

        if (isMounted) {
          setStats(data)
        }
      } catch (profileError) {
        console.error('Profile loading failed:', profileError)

        if (isMounted) {
          setError('Unable to load your profile activity right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [user])

  if (loading || subscriptionLoading) {
    return <LoadingScreen message="Loading your profile..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO
          title="VedaByte Profile"
          description="Sign in to view your VedaByte profile and activity."
          url="https://vedabyte-delta.vercel.app/profile"
        />

        <main className="profile-page profile-access-page">
          <section className="profile-access-card">
            <p className="profile-label">VEDABYTE ACCOUNT</p>

            <h1 className="profile-title">Your Profile</h1>

            <p className="profile-text">
              Sign in to view your account details, saved activity and
              membership status.
            </p>
          </section>
        </main>
      </>
    )
  }

  const safeStats = {
    bookmarks: Number(stats?.bookmarks || 0),
    likes: Number(stats?.likes || 0),
    comments: Number(stats?.comments || 0)
  }

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    'VedaByte User'

  const email = user?.email || 'No email available'

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null

  const totalEngagement =
    safeStats.bookmarks +
    safeStats.likes +
    safeStats.comments

  const memberSince = formatMemberDate(user?.created_at)

  return (
    <>
      <SEO
        title={`${name} | VedaByte Profile`}
        description="View your VedaByte profile, activity and membership status."
        url="https://vedabyte-delta.vercel.app/profile"
      />

      <main className="profile-page">
        <section className="profile-hero">
          <div className="profile-avatar">
            {avatar ? (
              <img
                src={avatar}
                alt={`${name} profile`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>

          <div className="profile-identity">
            <p className="profile-label">VEDABYTE ACCOUNT</p>

            <h1 className="profile-name">{name}</h1>

            <p className="profile-email">{email}</p>

            <p className="profile-member-date">
              Member Since: {memberSince}
            </p>

            <div
              className={
                isPro
                  ? 'profile-badge pro'
                  : 'profile-badge free'
              }
            >
              {isPro ? '⭐ Pro Member' : 'Free Member'}
            </div>
          </div>
        </section>

        <section className="profile-activity-section">
          <h2 className="profile-section-title">
            Your Activity
          </h2>

          {error ? (
            <div className="profile-error-card">
              <h3>Activity unavailable</h3>
              <p>{error}</p>
            </div>
          ) : (
            <div className="profile-stats-grid">
              <StatCard
                label="Bookmarks"
                value={safeStats.bookmarks}
              />

              <StatCard
                label="Likes"
                value={safeStats.likes}
              />

              <StatCard
                label="Comments"
                value={safeStats.comments}
              />
            </div>
          )}
        </section>

        <section className="profile-overview">
          <h2 className="profile-section-title">
            Account Overview
          </h2>

          <div className="profile-overview-list">
            <OverviewRow
              label="Total Engagement"
              value={totalEngagement}
            />

            <OverviewRow
              label="User ID"
              value={`${user.id.slice(0, 12)}...`}
              code
            />

            <OverviewRow
              label="Account Type"
              value={isPro ? 'Pro Member' : 'Free Member'}
              gold={isPro}
            />
          </div>

          <div className="profile-actions">
            <Link
              to="/membership"
              className="profile-secondary-button"
            >
              View Membership
            </Link>

            <Link
              to="/settings"
              className="profile-secondary-button"
            >
              Account Settings
            </Link>

            {!isPro && (
              <Link
                to="/pricing"
                className="profile-primary-button"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

function StatCard({ label, value }) {
  return (
    <article className="profile-stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  )
}

function OverviewRow({
  label,
  value,
  gold = false,
  code = false
}) {
  return (
    <div className="profile-overview-row">
      <span>{label}</span>

      <strong
        className={[
          gold ? 'gold' : '',
          code ? 'code' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {value}
      </strong>
    </div>
  )
}

function formatMemberDate(dateValue) {
  if (!dateValue) {
    return 'Unknown'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}