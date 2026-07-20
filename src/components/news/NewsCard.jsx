import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { saveBookmark } from '../../services/bookmarkService'
import {
  getSafeImageUrl,
  handleImageError
} from '../../lib/imageFallback'

export default function NewsCard({
  id,
  title,
  category,
  image,
  description,
  source,
  publishedAt,
  url,
  isLive
}) {
  const { user, isAuthenticated } = useAuth()

  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const safeImage = useMemo(
    () => getSafeImageUrl(image),
    [image]
  )

  const formattedDate = useMemo(() => {
    if (!publishedAt) return 'Today'

    const date = new Date(publishedAt)

    if (Number.isNaN(date.getTime())) {
      return 'Today'
    }

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }, [publishedAt])

  async function handleSave(event) {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated || !user) {
      window.alert('Please sign in first')
      return
    }

    if (saved || saving) return

    try {
      setSaving(true)

      const success = await saveBookmark(user.id, {
        id,
        title,
        category,
        image: safeImage
      })

      if (success) {
        setSaved(true)
      } else {
        console.error('Failed to save article')
      }
    } catch (error) {
      console.error('Failed to save article:', error)
    } finally {
      setSaving(false)
    }
  }

  function saveLiveArticle() {
    if (!isLive) return

    try {
      localStorage.setItem(
        `vedabyte_live_article_${id}`,
        JSON.stringify({
          id,
          title,
          category,
          image: safeImage,
          description,
          source,
          publishedAt,
          url,
          isLive
        })
      )
    } catch (error) {
      console.error('Unable to save live article:', error)
    }
  }

  return (
    <article className="news-card vb-hover-lift">
      <Link
        to={`/article/${id}`}
        onClick={saveLiveArticle}
        className="news-card-main-link"
        aria-label={`Read ${title}`}
      >
        <div className="news-card-image-wrapper vb-image-zoom">
          <img
            src={safeImage}
            alt={title || 'VedaByte technology article'}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            width="640"
            height="360"
            className="news-card-image"
          />

          <span className="news-card-category">
            {category || 'Technology'}
          </span>
        </div>

        <div className="news-card-content">
          <h3 className="news-card-title">
            {title}
          </h3>

          {description && (
            <p className="news-card-description">
              {description}
            </p>
          )}

          <div className="news-card-meta">
            <span className="news-card-source">
              {source || 'VedaByte'}
            </span>

            <time
              dateTime={publishedAt || undefined}
              className="news-card-date"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>

      <div className="news-card-actions">
        <Link
          to={`/article/${id}`}
          onClick={saveLiveArticle}
          className="news-card-read-link"
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={handleSave}
          disabled={saved || saving}
          className={`news-card-save-button${
            saved ? ' saved' : ''
          }`}
          aria-label={
            saved
              ? 'Article saved'
              : `Save ${title}`
          }
        >
          {saving
            ? 'Saving...'
            : saved
              ? '✓ Saved'
              : 'Save'}
        </button>
      </div>
    </article>
  )
}