import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NewsCard from '../components/news/NewsCard'
import localNews from '../data/news'
import { getLiveCategoryNews } from '../services/newsService'

export default function Category() {
  const { slug } = useParams()

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingLiveNews, setUsingLiveNews] = useState(false)

  const descriptions = {
    ai: 'Artificial Intelligence news, research, tools and industry developments.',
    startups: 'Startup funding, innovation, founders and emerging technology companies.',
    security: 'Cybersecurity threats, privacy, data protection and digital safety.',
    programming: 'Software engineering, development tools and coding trends.',
    cloud: 'Cloud infrastructure, DevOps and enterprise computing.',
    gadgets: 'Consumer technology, devices and hardware innovation.'
  }

  useEffect(() => {
    async function loadCategoryNews() {
      setLoading(true)

      const liveArticles = await getLiveCategoryNews(slug)

      if (liveArticles.length > 0) {
        setArticles(liveArticles)
        setUsingLiveNews(true)
      } else {
        const fallbackArticles = localNews.filter(
          article =>
            article.category.toLowerCase() === slug.toLowerCase()
        )

        setArticles(fallbackArticles)
        setUsingLiveNews(false)
      }

      setLoading(false)
    }

    loadCategoryNews()
  }, [slug])

  const featuredArticle = articles[0]

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '45px 20px'
      }}
    >
      <div
  className="category-hero"
  style={{
    background: '#111111',
    border: '1px solid #232323',
    borderRadius: '24px',
    marginBottom: '40px'
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
          {usingLiveNews ? 'Live Category' : 'Category'}
        </span>

        <h1
          style={{
            color: '#FFFFFF',
            marginTop: '10px',
            fontSize: 'clamp(32px, 6vw, 52px)',
            textTransform: 'capitalize',
            lineHeight: '1.1'
          }}
        >
          {slug}
        </h1>

        <p
          style={{
            color: '#D1D5DB',
            marginTop: '15px',
            maxWidth: '700px',
            lineHeight: '1.7'
          }}
        >
          {descriptions[slug.toLowerCase()] ||
            'Latest technology news and insights.'}
        </p>

        <div
          style={{
            marginTop: '20px',
            color: '#9CA3AF'
          }}
        >
          {loading
            ? 'Loading articles...'
            : `${articles.length} Articles Available`}
        </div>
      </div>

      {loading ? (
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '18px',
            padding: '40px',
            color: '#D1D5DB'
          }}
        >
          Loading latest {slug} news...
        </div>
      ) : articles.length === 0 ? (
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '18px',
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
            No articles found
          </h2>

          <p
            style={{
              color: '#9CA3AF'
            }}
          >
            No content is currently available in this category.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              background: '#111111',
              border: '1px solid #232323',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '45px'
            }}
          >
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              style={{
                width: '100%',
                height: 'clamp(240px, 40vw, 420px)',
                objectFit: 'cover'
              }}
            />

            <div className="category-featured">
              <span
                style={{
                  color: '#D4AF37',
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}
              >
                {usingLiveNews ? 'Live Featured Story' : 'Featured Story'}
              </span>

              <h2
                style={{
                  color: '#FFFFFF',
                  marginTop: '15px',
                  fontSize: 'clamp(26px,5vw,36px)',
                  lineHeight: '1.2'
                }}
              >
                {featuredArticle.title}
              </h2>

              <p
                style={{
                  color: '#D1D5DB',
                  marginTop: '15px',
                  lineHeight: '1.8'
                }}
              >
                {featuredArticle.description}
              </p>

              {featuredArticle.source && (
                <p
                  style={{
                    color: '#9CA3AF',
                    marginTop: '15px',
                    fontSize: '14px'
                  }}
                >
                  Source: {featuredArticle.source}
                </p>
              )}
            </div>
          </div>

          <h2
            style={{
              color: '#D4AF37',
              marginBottom: '25px',
              fontSize: '30px'
            }}
          >
            Latest Articles
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: '25px'
            }}
          >
            {articles.map(article => (
              <NewsCard
                key={article.id}
                {...article}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}