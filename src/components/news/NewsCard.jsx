import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { saveBookmark } from '../../services/bookmarkService'

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

  async function handleSave(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      alert('Please sign in first')
      return
    }

    const success = await saveBookmark(user.id, {
      id,
      title,
      category,
      image
    })

    if (success) {
  setSaved(true)

    } else {
      console.error('Failed to save article')
    }
  }

  const cardContent = (
    <article
  style={{
    background: '#111111',
    border: '1px solid #232323',
    borderRadius: '18px',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}
>
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '220px',
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
          {category}
        </span>

        <h3
          style={{
            color: '#ffffff',
            marginTop: '10px',
            lineHeight: '1.4',
            fontSize: '20px'
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '10px',
            fontSize: '14px'
          }}
        >
          {description}
        </p>

        <p
          style={{
            color: '#D4AF37',
            fontSize: '12px',
            marginTop: '14px',
            fontWeight: '700'
          }}
        >
          Source: {source || 'VedaByte'}
        </p>

        <p
          style={{
            color: '#6B7280',
            fontSize: '12px',
            marginTop: '5px'
          }}
        >
          {publishedAt
            ? new Date(publishedAt).toLocaleDateString()
            : 'Today'}
        </p>

        <button
  onClick={handleSave}
  disabled={saved}
  style={{
    marginTop: 'auto',
    width: '100%',
    background: saved ? '#16a34a' : '#D4AF37',
    color: '#000',
    border: 'none',
    padding: '11px',
    borderRadius: '10px',
    fontWeight: '800',
    cursor: 'pointer'
  }}
>
          {saved ? '✓ Saved' : 'Save Article'}
        </button>
      </div>
    </article>
  )

  if (isLive) {
  return (
    <Link
      to={`/article/${id}`}
      onClick={() => {
        localStorage.setItem(
          `vedabyte_live_article_${id}`,
          JSON.stringify({
            id,
            title,
            category,
            image,
            description,
            source,
            publishedAt,
            url,
            isLive
          })
        )
      }}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      {cardContent}
    </Link>
  )
}

  return (
    <Link
      to={`/article/${id}`}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      {cardContent}
    </Link>
  )
}