import { useState } from 'react'

import NewsCard from '../components/news/NewsCard'
import news from '../data/news'
import SEO from '../components/SEO'

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
    <>
      <SEO
        title="Search Technology News | VedaByte"
        description="Search VedaByte for AI, startup, cybersecurity, programming, cloud and technology stories."
        url="https://vedabyte-delta.vercel.app/search"
      />

      <main className="search-page">
        <section className="search-hero">
          <span className="search-label">
            Search VedaByte
          </span>

          <h1 className="search-title">
            Find technology stories faster
          </h1>

          <p className="search-description">
            Search AI, startups, cybersecurity, programming, cloud,
            gadgets and sources.
          </p>

          <label className="search-input-label" htmlFor="article-search">
            Search articles
          </label>

          <input
            id="article-search"
            type="search"
            placeholder="Search articles, categories, sources..."
            value={query}
            onChange={event => setQuery(event.target.value)}
            autoFocus
            className="search-input"
          />

          <div className="search-filters">
            {[
              'AI',
              'Startups',
              'Security',
              'Cloud',
              'Programming',
              'Gadgets'
            ].map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setQuery(category)}
                className="search-filter-button"
              >
                {category}
              </button>
            ))}

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="search-clear-button"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        <section className="search-results">
          <div className="search-results-header">
            <h2 className="search-results-title">
              {query ? `Results for "${query}"` : 'All Articles'}
            </h2>

            <p className="search-results-count">
              {filteredNews.length} result
              {filteredNews.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredNews.length === 0 ? (
            <div className="search-empty-state">
              <h3>No articles found</h3>

              <p>
                Try searching for AI, Startups, Security, Programming,
                Cloud or Gadgets.
              </p>

              <button
                type="button"
                onClick={() => setQuery('')}
                className="search-empty-button"
              >
                Show all articles
              </button>
            </div>
          ) : (
            <div className="search-results-grid">
              {filteredNews.map(article => (
                <NewsCard
                  key={article.id}
                  {...article}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}