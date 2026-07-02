import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PremiumCard from '../PremiumCard'
import { useAuth } from '../../context/AuthContext'
import { getBookmarks } from '../../services/bookmarkService'

export default function SavedPremiumArticles() {
  const { user, isAuthenticated } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBookmarks() {
      if (!isAuthenticated || !user) {
        setBookmarks([])
        setLoading(false)
        return
      }

      const data = await getBookmarks(user.id)
      setBookmarks(data || [])
      setLoading(false)
    }

    loadBookmarks()
  }, [user, isAuthenticated])

  return (
    <PremiumCard glow>
      <p style={labelStyle}>SAVED PRO</p>

      <h2 style={titleStyle}>Saved Articles</h2>

      {loading ? (
        <p style={textStyle}>Loading saved articles...</p>
      ) : bookmarks.length === 0 ? (
        <p style={textStyle}>No saved articles yet.</p>
      ) : (
        <div style={listStyle}>
          {bookmarks.slice(0, 5).map(bookmark => (
  <Link
    key={bookmark.id}
    to={`/article/${bookmark.article_id}`}
    style={itemStyle}
  >
    {bookmark.article_image && (
      <img
        src={bookmark.article_image}
        alt={bookmark.article_title}
        style={imageStyle}
      />
    )}

    <div>
      <strong>{bookmark.article_title}</strong>

      <span style={categoryStyle}>
        {bookmark.article_category}
      </span>
    </div>
  </Link>
))}
        </div>
      )}
    </PremiumCard>
  )
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '12px'
}

const titleStyle = {
  color: '#fff',
  fontSize: '28px',
  marginBottom: '20px'
}

const textStyle = {
  color: '#9CA3AF'
}

const listStyle = {
  display: 'grid',
  gap: '12px'
}

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  color: '#fff',
  textDecoration: 'none',
  background: '#0B0B0B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '14px'
}

const imageStyle = {
  width: '72px',
  height: '72px',
  borderRadius: '14px',
  objectFit: 'cover'
}

const categoryStyle = {
  display: 'block',
  color: '#9CA3AF',
  marginTop: '6px'
}