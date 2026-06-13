import { useParams } from 'react-router-dom'
import { useState } from 'react'

import news from '../data/news'
import { useAuth } from '../context/AuthContext'
import { saveBookmark } from '../services/bookmarkService'

export default function Article() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()

  const [saved, setSaved] = useState(false)

  const article = news.find(item => item.id === id)

  if (!article) {
    return (
      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          padding: '100px 20px'
        }}
      >
        Article not found.
      </div>
    )
  }

  async function handleSave() {
    if (!isAuthenticated) {
      alert('Please sign in first')
      return
    }

    const success = await saveBookmark(user.id, article)

    if (success) {
      setSaved(true)
      alert('Article saved successfully')
    } else {
      alert('Failed to save article')
    }
  }

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        color: '#fff'
      }}
    >
      <img
        src={article.image}
        alt={article.title}
        style={{
          width: '100%',
          height: '450px',
          objectFit: 'cover',
          borderRadius: '20px'
        }}
      />

      <div style={{ marginTop: '30px' }}>
        <span
          style={{
            color: '#D4AF37',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}
        >
          {article.category}
        </span>

        <h1
          style={{
            fontSize: '48px',
            marginTop: '15px',
            lineHeight: '1.2'
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '15px'
          }}
        >
          By VedaByte • June 2026
        </p>

        <button
          onClick={handleSave}
          disabled={saved}
          style={{
            marginTop: '25px',
            background: saved ? '#16a34a' : '#D4AF37',
            color: '#000',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {saved ? '✓ Saved' : 'Save Bookmark'}
        </button>

        <div
          style={{
            marginTop: '35px',
            fontSize: '18px',
            lineHeight: '1.9',
            color: '#D1D5DB'
          }}
        >
          <p>{article.description}</p>

          <br />

          <p>
            Technology continues to evolve rapidly across artificial
            intelligence, cloud computing, cybersecurity, software
            engineering and startup ecosystems.
          </p>

          <br />

          <p>
            Experts believe the coming years will bring major innovation,
            creating opportunities for businesses, developers and consumers
            around the world.
          </p>
        </div>
      </div>
    </div>
  )
}