import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import NewsCard from '../components/news/NewsCard'
import Newsletter from '../components/newsletter/Newsletter'
import localNews from '../data/news'
import { getTopTechNews } from '../services/newsService'
import { getTrendingArticleIds } from '../services/trendingService'
import { getCommentCount } from '../services/commentStatsService'
import {
  getFeaturedArticleIds,
  getEditedArticleMap
} from '../services/articleAdminService'

export default function Home() {
  const [articles, setArticles] = useState(localNews)
  const [trendingArticles, setTrendingArticles] = useState([])
  const [mostDiscussed, setMostDiscussed] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingLiveNews, setUsingLiveNews] = useState(false)

  useEffect(() => {
    async function loadLiveNews() {
      const editedMap = getEditedArticleMap()

      const editedLocalNews = localNews.map(article => ({
        ...article,
        ...(editedMap[article.id] || {})
      }))

      const liveArticles = await getTopTechNews()

      const finalArticles =
        liveArticles.length > 0 ? liveArticles : editedLocalNews

      setUsingLiveNews(liveArticles.length > 0)
      setArticles(finalArticles)

      const trendingIds = await getTrendingArticleIds()

      const matchedTrending = trendingIds
        .map(item => {
          const found = finalArticles.find(
            article => article.id === item.article_id
          )

          return found
            ? {
                ...found,
                likes: item.likes
              }
            : null
        })
        .filter(Boolean)

      setTrendingArticles(matchedTrending)

      const articlesWithCommentCounts = await Promise.all(
        finalArticles.map(async article => ({
          ...article,
          comments: await getCommentCount(article.id)
        }))
      )

      const discussedArticles = articlesWithCommentCounts
        .filter(article => article.comments > 0)
        .sort((a, b) => b.comments - a.comments)
        .slice(0, 4)

      setMostDiscussed(discussedArticles)
      setLoading(false)
    }

    loadLiveNews()
  }, [])

  const editedMap = getEditedArticleMap()
  const featuredIds = getFeaturedArticleIds()

  const editedLocalNews = localNews.map(article => ({
    ...article,
    ...(editedMap[article.id] || {})
  }))

  const selectedLocalFeatured = editedLocalNews.find(article =>
    featuredIds.includes(article.id)
  )

  const featured = selectedLocalFeatured || articles[0]

  const aiNews = articles.filter(article => article.category === 'AI')
  const startupNews = articles.filter(article => article.category === 'Startups')
  const securityNews = articles.filter(article => article.category === 'Security')

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 20px'
      }}
    >
      <div
        style={{
          background: '#D4AF37',
          color: '#000',
          padding: '14px 20px',
          borderRadius: '12px',
          fontWeight: '700',
          marginBottom: '35px'
        }}
      >
        🔥 {usingLiveNews ? 'LIVE TECHNOLOGY NEWS' : 'BREAKING'} • Latest AI, Startup & Cybersecurity News
      </div>

      {loading && (
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            color: '#D1D5DB',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '30px'
          }}
        >
          Loading latest technology news...
        </div>
      )}

      {featured && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '30px',
            marginBottom: '50px'
          }}
        >
          <Link
            to={`/article/${featured.id}`}
            onClick={() => {
              if (featured.isLive) {
                localStorage.setItem(
                  `vedabyte_live_article_${featured.id}`,
                  JSON.stringify(featured)
                )
              }
            }}
            style={{
              background: '#111111',
              border: '1px solid #232323',
              borderRadius: '20px',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            <img
              src={featured.image}
              alt={featured.title}
              style={{
                width: '100%',
                height: '450px',
                objectFit: 'cover'
              }}
            />

            <div style={{ padding: '25px' }}>
              <span
                style={{
                  color: '#D4AF37',
                  fontWeight: '700',
                  letterSpacing: '1px'
                }}
              >
                FEATURED STORY
              </span>

              <h1
                style={{
                  color: '#FFFFFF',
                  marginTop: '12px',
                  fontSize: '42px',
                  lineHeight: '1.2'
                }}
              >
                {featured.title}
              </h1>

              <p
                style={{
                  color: '#D1D5DB',
                  marginTop: '16px',
                  fontSize: '16px',
                  lineHeight: '1.8'
                }}
              >
                {featured.description}
              </p>
            </div>
          </Link>

          <div
            style={{
              background: '#111111',
              border: '1px solid #232323',
              borderRadius: '20px',
              padding: '25px'
            }}
          >
            <h3
              style={{
                color: '#D4AF37',
                marginBottom: '20px',
                fontSize: '24px'
              }}
            >
              Trending
            </h3>

            {articles.slice(1, 6).map(article => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                onClick={() => {
                  if (article.isLive) {
                    localStorage.setItem(
                      `vedabyte_live_article_${article.id}`,
                      JSON.stringify(article)
                    )
                  }
                }}
                style={{
                  display: 'block',
                  color: '#FFFFFF',
                  marginBottom: '18px',
                  lineHeight: '1.6',
                  borderBottom: '1px solid #232323',
                  paddingBottom: '12px',
                  textDecoration: 'none'
                }}
              >
                📰 {article.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {trendingArticles.length > 0 && (
        <>
          <h2 style={sectionTitleStyle}>🔥 Trending Now</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
              gap: '25px',
              marginBottom: '60px'
            }}
          >
            {trendingArticles.map(article => (
              <div key={article.id}>
                <div
                  style={{
                    background: '#D4AF37',
                    color: '#000',
                    padding: '8px 12px',
                    borderRadius: '10px 10px 0 0',
                    fontWeight: '800',
                    fontSize: '13px'
                  }}
                >
                  ❤️ {article.likes} Likes
                </div>

                <NewsCard {...article} />
              </div>
            ))}
          </div>
        </>
      )}

      {mostDiscussed.length > 0 && (
        <>
          <h2 style={sectionTitleStyle}>💬 Most Discussed</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
              gap: '25px',
              marginBottom: '60px'
            }}
          >
            {mostDiscussed.map(article => (
              <div key={article.id}>
                <div
                  style={{
                    background: '#111111',
                    border: '1px solid #232323',
                    borderBottom: 'none',
                    color: '#D4AF37',
                    padding: '8px 12px',
                    borderRadius: '10px 10px 0 0',
                    fontWeight: '800',
                    fontSize: '13px'
                  }}
                >
                  💬 {article.comments} Comment{article.comments !== 1 ? 's' : ''}
                </div>

                <NewsCard {...article} />
              </div>
            ))}
          </div>
        </>
      )}

      {!usingLiveNews && (
        <>
          <h2 style={sectionTitleStyle}>🤖 AI News</h2>

          <div style={gridStyle}>
            {aiNews.slice(0, 4).map(article => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>

          <h2 style={sectionTitleStyle}>🚀 Startup News</h2>

          <div style={gridStyle}>
            {startupNews.slice(0, 4).map(article => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>

          <h2 style={sectionTitleStyle}>🔐 Cybersecurity News</h2>

          <div style={gridStyle}>
            {securityNews.slice(0, 4).map(article => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </>
      )}

      <h2 style={sectionTitleStyle}>
        📰 Latest Technology News
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px'
        }}
      >
        {articles.map(article => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      <Newsletter />
    </div>
  )
}

const sectionTitleStyle = {
  color: '#D4AF37',
  fontSize: '32px',
  marginBottom: '25px'
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
  gap: '25px',
  marginBottom: '60px'
}