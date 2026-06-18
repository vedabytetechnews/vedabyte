import { useState } from 'react'
import NewsCard from '../components/news/NewsCard'
import news from '../data/news'

export default function Search() {
  const [query, setQuery] = useState('')

  const cleanQuery = query.trim().toLowerCase()

  const filteredNews = news.filter(article => {
    if (!cleanQuery) return true

    return (
      article.title?.toLowerCase().includes(cleanQuery) ||
      article.description?.toLowerCase().includes(cleanQuery) ||
      article.category?.toLowerCase().includes(cleanQuery) ||
      article.source?.toLowerCase().includes(cleanQuery)
    )
  })

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '45px 20px'
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '22px',
          padding: '32px',
          marginBottom: '35px'
        }}
      >
        <span
          style={{
            color: '#D4AF37',
            fontWeight: '800',
            textTransform: 'uppercase',
            fontSize: '13px'
          }}
        >
          Search VedaByte
        </span>

        <h1
          style={{
            color: '#FFFFFF',
            marginTop: '10px',
            marginBottom: '12px',
            fontSize: '42px',
            lineHeight: '1.15'
          }}
        >
          Find technology stories faster
        </h1>

        <p
          style={{
            color: '#D1D5DB',
            marginBottom: '24px',
            lineHeight: '1.7'
          }}
        >
          Search AI, startups, cybersecurity, programming, cloud, gadgets and sources.
        </p>

        <input
          type="text"
          placeholder="Search articles, categories, sources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            padding: '16px 18px',
            background: '#0A0A0A',
            border: '1px solid #232323',
            borderRadius: '14px',
            color: '#FFFFFF',
            fontSize: '16px',
            outline: 'none'
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '18px'
          }}
        >
          {['AI', 'Startups', 'Security', 'Cloud', 'Programming', 'Gadgets'].map(category => (
            <button
              key={category}
              onClick={() => setQuery(category)}
              style={{
                background: '#D4AF37',
                color: '#000',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              {category}
            </button>
          ))}

          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <h2
          style={{
            color: '#D4AF37',
            fontSize: '28px'
          }}
        >
          {query ? `Results for "${query}"` : 'All Articles'}
        </h2>

        <p style={{ color: '#9CA3AF' }}>
          {filteredNews.length} result{filteredNews.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filteredNews.length === 0 ? (
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '18px',
            padding: '40px',
            textAlign: 'center',
            color: '#D1D5DB'
          }}
        >
          <h3
            style={{
              color: '#FFFFFF',
              marginBottom: '10px'
            }}
          >
            No articles found
          </h3>

          <p>
            Try searching for AI, Startups, Security, Programming, Cloud or Gadgets.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: '25px'
          }}
        >
          {filteredNews.map(article => (
            <NewsCard
              key={article.id}
              {...article}
            />
          ))}
        </div>
      )}
    </div>
  )
}