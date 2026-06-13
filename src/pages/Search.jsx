import { useState } from 'react'
import NewsCard from '../components/news/NewsCard'
import news from '../data/news'

export default function Search() {
  const [query, setQuery] = useState('')

  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase()) ||
    article.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}
    >
      <h1
        style={{
          color: '#fff',
          marginBottom: '20px'
        }}
      >
        Search Articles
      </h1>

      <input
        type="text"
        placeholder="Search AI, Startups, Security..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '16px',
          background: '#111',
          border: '1px solid #232323',
          borderRadius: '12px',
          color: '#fff',
          marginBottom: '30px',
          fontSize: '16px'
        }}
      />

      <p
        style={{
          color: '#9CA3AF',
          marginBottom: '25px'
        }}
      >
        {filteredNews.length} results found
      </p>

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
    </div>
  )
}