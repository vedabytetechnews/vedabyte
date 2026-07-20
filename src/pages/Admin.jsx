import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAdminStats } from '../services/adminService'
import {
  getTopLikedArticles,
  getTopCommentedArticles,
  getTopSavedArticles
} from '../services/analyticsService'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function Admin() {
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState({
    liked: [],
    commented: [],
    saved: []
  })
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      try {
        const statsData = await getAdminStats()

        const [liked, commented, saved] = await Promise.all([
          getTopLikedArticles(),
          getTopCommentedArticles(),
          getTopSavedArticles()
        ])

        if (isMounted) {
          setStats(statsData)
          setAnalytics({
            liked: Array.isArray(liked) ? liked : [],
            commented: Array.isArray(commented) ? commented : [],
            saved: Array.isArray(saved) ? saved : []
          })
        }
      } catch (loadError) {
        console.error('Admin dashboard loading failed:', loadError)

        if (isMounted) {
          setError('Unable to load the admin dashboard right now.')
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  if (!stats && !error) {
    return <LoadingScreen message="Loading admin dashboard..." />
  }

  const safeStats = {
    bookmarks: Number(stats?.bookmarks || 0),
    likes: Number(stats?.likes || 0),
    comments: Number(stats?.comments || 0),
    subscribers: Number(stats?.subscribers || 0)
  }

  const cards = [
    {
      label: 'Bookmarks',
      value: safeStats.bookmarks,
      link: '/bookmarks'
    },
    {
      label: 'Likes',
      value: safeStats.likes,
      link: '/admin'
    },
    {
      label: 'Comments',
      value: safeStats.comments,
      link: '/admin/comments'
    },
    {
      label: 'Subscribers',
      value: safeStats.subscribers,
      link: '/admin/subscribers'
    }
  ]

  const actions = [
    {
      title: 'Manage Articles',
      text: 'Feature, edit and delete articles.',
      link: '/admin/articles'
    },
    {
      title: 'Send Newsletter',
      text: 'Create Brevo email campaigns.',
      link: '/admin/newsletter'
    },
    {
      title: 'Subscribers',
      text: 'Search, export and manage emails.',
      link: '/admin/subscribers'
    },
    {
      title: 'Comments',
      text: 'Moderate reader comments.',
      link: '/admin/comments'
    },
    {
      title: 'Users',
      text: 'View registered users.',
      link: '/admin/users'
    }
  ]

  const totalEngagement =
    safeStats.bookmarks +
    safeStats.likes +
    safeStats.comments

  return (
    <>
      <SEO
        title="VedaByte Admin Dashboard"
        description="Manage VedaByte articles, users, subscribers, comments and platform analytics."
        url="https://vedabyte-delta.vercel.app/admin"
      />

      <main className="admin-page">
        <header className="admin-header">
          <p className="admin-label">VEDABYTE ADMIN</p>

          <h1 className="admin-title">
            VedaByte Admin Dashboard
          </h1>

          <p className="admin-subtitle">
            Overview of platform activity, engagement, subscribers and
            publishing tools.
          </p>
        </header>

        {error ? (
          <section className="admin-error-card">
            <h2>Dashboard unavailable</h2>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <section
              className="admin-actions-grid"
              aria-label="Admin tools"
            >
              {actions.map(action => (
                <AdminAction
                  key={action.title}
                  {...action}
                />
              ))}
            </section>

            <section className="admin-section">
              <h2 className="admin-section-title">
                Platform Metrics
              </h2>

              <div className="admin-stats-grid">
                {cards.map(card => (
                  <Link
                    key={card.label}
                    to={card.link}
                    className="admin-stat-link"
                  >
                    <article className="admin-stat-card">
                      <p>{card.label}</p>
                      <h3>{card.value}</h3>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            <section className="admin-summary-card">
              <h2>Platform Summary</h2>

              <div className="admin-summary-list">
                <SummaryRow
                  label="Total Engagement"
                  value={totalEngagement}
                />

                <SummaryRow
                  label="Newsletter Subscribers"
                  value={safeStats.subscribers}
                />

                <SummaryRow
                  label="Newsletter System"
                  value="Brevo Connected ✅"
                  gold
                />
              </div>
            </section>

            <section className="admin-section">
              <h2 className="admin-section-title">
                Content Analytics
              </h2>

              <div className="admin-analytics-grid">
                <AnalyticsBox
                  title="🔥 Most Liked Articles"
                  items={analytics.liked}
                  label="likes"
                />

                <AnalyticsBox
                  title="💬 Most Commented Articles"
                  items={analytics.commented}
                  label="comments"
                />

                <AnalyticsBox
                  title="🔖 Most Saved Articles"
                  items={analytics.saved}
                  label="saves"
                />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}

function AdminAction({ title, text, link }) {
  return (
    <Link to={link} className="admin-action-link">
      <article className="admin-action-card">
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
    </Link>
  )
}

function AnalyticsBox({ title, items, label }) {
  return (
    <article className="admin-analytics-card">
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p className="admin-empty-text">
          No data yet.
        </p>
      ) : (
        <div className="admin-analytics-list">
          {items.map(([articleId, count]) => (
            <div
              key={articleId}
              className="admin-analytics-item"
            >
              <p>{articleId}</p>

              <small>
                {count} {label}
              </small>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

function SummaryRow({ label, value, gold = false }) {
  return (
    <div className="admin-summary-row">
      <span>{label}</span>

      <strong className={gold ? 'gold' : ''}>
        {value}
      </strong>
    </div>
  )
}