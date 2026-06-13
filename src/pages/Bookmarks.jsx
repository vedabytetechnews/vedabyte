import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getBookmarks,
  removeBookmark
} from '../services/bookmarkService'

export default function Bookmarks() {
  const { user, isAuthenticated } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  async function handleRemove(bookmarkId) {
  const success = await removeBookmark(bookmarkId)

  if (success) {
    setBookmarks(
      bookmarks.filter(item => item.id !== bookmarkId)
    )
  }
}

  useEffect(() => {
    async function loadBookmarks() {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      const data = await getBookmarks(user.id)
      setBookmarks(data)
      setLoading(false)
    }

    loadBookmarks()
  }, [user, isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          color: '#fff'
        }}
      >
        <h1>Saved Articles</h1>
        <p style={{ color: '#9CA3AF' }}>
          Please sign in to view your bookmarks.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          color: '#fff'
        }}
      >
        Loading bookmarks...
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}
    >
      <h1
        style={{
          color: '#fff',
          marginBottom: '30px'
        }}
      >
        Saved Articles
      </h1>

      {bookmarks.length === 0 ? (
        <p style={{ color: '#9CA3AF' }}>
          No saved articles yet.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
            gap: '24px'
          }}
        >
          {bookmarks.map((article) => (
            <div
              key={article.id}
              style={{
                background: '#111111',
                border: '1px solid #232323',
                borderRadius: '18px',
                overflow: 'hidden'
              }}
            >
              <img
                src={
                  article.article_image ||
                  'https://picsum.photos/600/400'
                }
                alt={article.article_title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />

              <div style={{ padding: '18px' }}>
                <span
                  style={{
                    color: '#D4AF37',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}
                >
                  {article.article_category}
                </span>

                <h3
                  style={{
                    color: '#fff',
                    marginTop: '10px',
                    lineHeight: '1.5'
                  }}
                >
                  {article.article_title}
                </h3>
                <button
  onClick={() => handleRemove(article.id)}
  style={{
    marginTop: '15px',
    width: '100%',
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600'
  }}
>
  Remove Bookmark
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}