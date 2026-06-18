import { Link } from 'react-router-dom'
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
          padding: '45px 20px',
          color: '#fff'
        }}
      >
        <h1
          style={{
            color: '#D4AF37',
            fontSize: '42px',
            marginBottom: '12px'
          }}
        >
          Saved Articles
        </h1>

        <p style={{ color: '#9CA3AF' }}>
          Please sign in to view your saved articles.
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
          padding: '45px 20px',
          color: '#fff'
        }}
      >
        Loading saved articles...
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '45px 20px'
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '35px'
        }}
      >
        <h1
          style={{
            color: '#D4AF37',
            fontSize: '42px',
            marginBottom: '10px'
          }}
        >
          Saved Articles
        </h1>

        <p style={{ color: '#D1D5DB' }}>
          Articles you saved for reading later.
        </p>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '12px'
          }}
        >
          {bookmarks.length} saved item{bookmarks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              color: '#FFFFFF',
              marginBottom: '10px'
            }}
          >
            No saved articles yet
          </h2>

          <p style={{ color: '#9CA3AF', marginBottom: '20px' }}>
            Save articles from the homepage or article pages and they will appear here.
          </p>

          <Link
            to="/"
            style={{
              background: '#D4AF37',
              color: '#000',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: '800',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Browse Articles
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
            gap: '24px'
          }}
        >
          {bookmarks.map(article => (
            <div
              key={article.id}
              style={{
                background: '#111111',
                border: '1px solid #232323',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
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

              <div
                style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
              >
                <span
                  style={{
                    color: '#D4AF37',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}
                >
                  {article.article_category || 'Technology'}
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

                <p
                  style={{
                    color: '#6B7280',
                    fontSize: '12px',
                    marginTop: '10px'
                  }}
                >
                  Saved:{' '}
                  {article.created_at
                    ? new Date(article.created_at).toLocaleDateString()
                    : 'Recently'}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    gap: '10px',
                    paddingTop: '18px'
                  }}
                >
                  <Link
                    to={`/article/${article.article_id}`}
                    style={{
                      flex: 1,
                      background: '#D4AF37',
                      color: '#000',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '800',
                      textAlign: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => handleRemove(article.id)}
                    style={{
                      flex: 1,
                      background: '#dc2626',
                      color: '#fff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: '700'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}