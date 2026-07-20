import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import {
  getBookmarks,
  removeBookmark
} from '../services/bookmarkService'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'
import { handleImageError } from '../lib/imageFallback'

export default function Bookmarks() {
  const { user, isAuthenticated } = useAuth()

  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadBookmarks() {
      if (!isAuthenticated || !user) {
        if (isMounted) {
          setBookmarks([])
          setLoading(false)
        }

        return
      }

      try {
        if (isMounted) {
          setLoading(true)
          setError('')
        }

        const data = await getBookmarks(user.id)

        if (isMounted) {
          setBookmarks(Array.isArray(data) ? data : [])
        }
      } catch (loadError) {
        console.error('Bookmarks loading failed:', loadError)

        if (isMounted) {
          setBookmarks([])
          setError('Unable to load your saved articles.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadBookmarks()

    return () => {
      isMounted = false
    }
  }, [user, isAuthenticated])

  async function handleRemove(bookmarkId) {
    try {
      setRemovingId(bookmarkId)

      const success = await removeBookmark(bookmarkId)

      if (success) {
        setBookmarks(currentBookmarks =>
          currentBookmarks.filter(item => item.id !== bookmarkId)
        )
      }
    } catch (removeError) {
      console.error('Bookmark removal failed:', removeError)
      alert('Unable to remove this saved article.')
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) {
    return <LoadingScreen message="Loading saved articles..." />
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO
          title="Saved Articles | VedaByte"
          description="Sign in to view your saved VedaByte technology articles."
          url="https://vedabyte-delta.vercel.app/bookmarks"
        />

        <main className="bookmarks-page bookmarks-access-page">
          <section className="bookmarks-access-card">
            <p className="bookmarks-label">VEDABYTE LIBRARY</p>

            <h1 className="bookmarks-title">Saved Articles</h1>

            <p className="bookmarks-text">
              Please sign in to view articles you saved for later.
            </p>

            <Link to="/profile" className="bookmarks-primary-button">
              Sign In
            </Link>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Saved Articles | VedaByte"
        description="Review technology articles saved to your VedaByte account."
        url="https://vedabyte-delta.vercel.app/bookmarks"
      />

      <main className="bookmarks-page">
        <header className="bookmarks-header">
          <p className="bookmarks-label">VEDABYTE LIBRARY</p>

          <h1 className="bookmarks-title">Saved Articles</h1>

          <p className="bookmarks-text">
            Articles you saved for reading later.
          </p>

          <p className="bookmarks-count">
            {bookmarks.length} saved item
            {bookmarks.length !== 1 ? 's' : ''}
          </p>
        </header>

        {error ? (
          <section className="bookmarks-empty-card error">
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </section>
        ) : bookmarks.length === 0 ? (
          <section className="bookmarks-empty-card">
            <h2>No saved articles yet</h2>

            <p>
              Save articles from the homepage or article pages and they
              will appear here.
            </p>

            <Link to="/" className="bookmarks-primary-button">
              Browse Articles
            </Link>
          </section>
        ) : (
          <section
            className="bookmarks-grid"
            aria-label="Saved articles"
          >
            {bookmarks.map(article => {
              const isRemoving = removingId === article.id

              return (
                <article
                  key={article.id}
                  className="bookmark-card"
                >
                  <img
                    src={
                      article.article_image ||
                      '/og-image.png'
                    }
                    alt={article.article_title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    width="640"
                    height="360"
                    className="bookmark-image"
                  />

                  <div className="bookmark-content">
                    <span className="bookmark-category">
                      {article.article_category || 'Technology'}
                    </span>

                    <h2 className="bookmark-title">
                      {article.article_title}
                    </h2>

                    <p className="bookmark-date">
                      Saved: {formatSavedDate(article.created_at)}
                    </p>

                    <div className="bookmark-actions">
                      <Link
                        to={`/article/${article.article_id}`}
                        className="bookmark-open-button"
                      >
                        Open
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleRemove(article.id)}
                        disabled={isRemoving}
                        className="bookmark-remove-button"
                      >
                        {isRemoving ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </main>
    </>
  )
}

function formatSavedDate(dateValue) {
  if (!dateValue) return 'Recently'

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Recently'
  }

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}