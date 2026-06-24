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

  const totalEngagement =
    Number(stats.bookmarks || 0) +
    Number(stats.likes || 0) +
    Number(stats.comments || 0)

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>
        VedaByte Admin Dashboard
      </h1>

      <p style={subtitleStyle}>
        Overview of platform activity, engagement, subscribers and publishing tools.
      </p>

      <div style={adminGridStyle}>
        <AdminAction title="Manage Articles" text="Feature, edit and delete articles." link="/admin/articles" />
        <AdminAction title="Send Newsletter" text="Create Brevo email campaigns." link="/admin/newsletter" />
        <AdminAction title="Subscribers" text="Search, export and manage emails." link="/admin/subscribers" />
        <AdminAction title="Comments" text="Moderate reader comments." link="/admin/comments" />
        <AdminAction title="Users" text="View registered users." link="/admin/users" />
      </div>

      <h2 style={sectionTitleStyle}>Platform Metrics</h2>

      <div style={statsGridStyle}>
        {cards.map(card => (
          <Link key={card.label} to={card.link} style={{ textDecoration: 'none' }}>
            <div style={cardStyle}>
              <p style={{ color: '#9CA3AF', marginBottom: '12px' }}>
                {card.label}
              </p>

              <h2 style={{ color: '#D4AF37', fontSize: '42px' }}>
                {card.value}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div style={summaryBoxStyle}>
        <h3 style={{ color: '#D4AF37', marginBottom: '15px' }}>
          Platform Summary
        </h3>

        <p style={{ color: '#D1D5DB' }}>
          Total Engagement: <strong>{totalEngagement}</strong>
        </p>

        <p style={{ color: '#9CA3AF', marginTop: '10px' }}>
          Newsletter Subscribers: {stats.subscribers}
        </p>

        <p style={{ color: '#9CA3AF', marginTop: '10px' }}>
          Newsletter System: Brevo Connected ✅
        </p>
      </div>

      <h2 style={sectionTitleStyle}>
        Content Analytics
      </h2>

      <div style={analyticsGridStyle}>
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
    </div>
  )
}

function AdminAction({ title, text, link }) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div style={actionCardStyle}>
        <h3 style={{ color: '#D4AF37', marginBottom: '8px' }}>
          {title}
        </h3>

        <p style={{ color: '#9CA3AF', lineHeight: '1.6' }}>
          {text}
        </p>
      </div>
    </Link>
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
          <div key={articleId} style={analyticsItemStyle}>
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

const pageStyle = {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '45px 20px',
  color: '#fff'
}

const titleStyle = {
  color: '#D4AF37',
  fontSize: '42px',
  marginBottom: '10px'
}

const subtitleStyle = {
  color: '#9CA3AF',
  marginBottom: '30px'
}

const adminGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
  gap: '18px',
  marginBottom: '42px'
}

const actionCardStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '18px',
  padding: '22px',
  minHeight: '120px'
}

const sectionTitleStyle = {
  color: '#D4AF37',
  marginTop: '45px',
  marginBottom: '24px'
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
  gap: '24px'
}

const analyticsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
  gap: '24px'
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

const analyticsItemStyle = {
  borderBottom: '1px solid #232323',
  padding: '12px 0'
}