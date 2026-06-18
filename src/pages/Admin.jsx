import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAdminStats } from '../services/adminService'
import {
  getTopLikedArticles,
  getTopCommentedArticles,
  getTopSavedArticles
} from '../services/analyticsService'

export default function Admin() {
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState({
    liked: [],
    commented: [],
    saved: []
  })

  useEffect(() => {
    async function loadDashboard() {
      const statsData = await getAdminStats()

      const [liked, commented, saved] = await Promise.all([
        getTopLikedArticles(),
        getTopCommentedArticles(),
        getTopSavedArticles()
      ])

      setStats(statsData)
      setAnalytics({ liked, commented, saved })
    }

    loadDashboard()
  }, [])

  if (!stats) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading admin dashboard...
      </div>
    )
  }

  const cards = [
    { label: 'Bookmarks', value: stats.bookmarks, link: '/bookmarks' },
    { label: 'Likes', value: stats.likes, link: '/admin' },
    { label: 'Comments', value: stats.comments, link: '/admin/comments' },
    { label: 'Subscribers', value: stats.subscribers, link: '/admin/subscribers' }
  ]

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '45px 20px',
        color: '#fff'
      }}
    >
      <h1 style={{ color: '#D4AF37', fontSize: '42px', marginBottom: '10px' }}>
        VedaByte Admin Dashboard
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '25px' }}>
        Overview of platform activity, engagement and analytics.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '35px'
        }}
      >
        <Link to="/admin/articles" style={adminLinkStyle}>
          Manage Articles
        </Link>

        <Link to="/admin/comments" style={adminLinkStyle}>
          Manage Comments
        </Link>

        <Link to="/admin/subscribers" style={adminLinkStyle}>
          Manage Subscribers
        </Link>

        <Link to="/admin/users" style={adminLinkStyle}>
          Manage Users
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
          gap: '24px'
        }}
      >
        {cards.map(card => (
          <Link key={card.label} to={card.link} style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <p style={{ color: '#9CA3AF', marginBottom: '12px' }}>
                {card.label}
              </p>

              <h2 style={{ color: '#FFFFFF', fontSize: '42px' }}>
                {card.value}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <h2 style={{ color: '#D4AF37', marginTop: '45px', marginBottom: '24px' }}>
        Content Analytics
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '24px'
        }}
      >
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

      <div style={summaryBoxStyle}>
        <h3 style={{ color: '#D4AF37', marginBottom: '15px' }}>
          Platform Summary
        </h3>

        <p style={{ color: '#D1D5DB' }}>
          Total Engagement:{' '}
          <strong>
            {stats.bookmarks + stats.likes + stats.comments}
          </strong>
        </p>

        <p style={{ color: '#9CA3AF', marginTop: '10px' }}>
          Newsletter Subscribers: {stats.subscribers}
        </p>
      </div>
    </div>
  )
}

function AnalyticsBox({ title, items, label }) {
  return (
    <div style={summaryBoxStyle}>
      <h3 style={{ color: '#D4AF37', marginBottom: '18px' }}>
        {title}
      </h3>

      {items.length === 0 ? (
        <p style={{ color: '#9CA3AF' }}>
          No data yet.
        </p>
      ) : (
        items.map(([articleId, count]) => (
          <div
            key={articleId}
            style={{
              borderBottom: '1px solid #232323',
              padding: '12px 0'
            }}
          >
            <p style={{ color: '#fff', wordBreak: 'break-word' }}>
              {articleId}
            </p>

            <small style={{ color: '#9CA3AF' }}>
              {count} {label}
            </small>
          </div>
        ))
      )}
    </div>
  )
}

const adminLinkStyle = {
  background: '#D4AF37',
  color: '#000',
  padding: '10px 16px',
  borderRadius: '10px',
  fontWeight: '800',
  textDecoration: 'none'
}

const cardStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '20px',
  padding: '28px',
  transition: '0.2s'
}

const summaryBoxStyle = {
  marginTop: '35px',
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '20px',
  padding: '25px'
}