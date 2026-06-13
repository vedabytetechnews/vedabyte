import NewsCard from '../components/news/NewsCard'
import news from '../data/news'
import Newsletter from '../components/newsletter/Newsletter'

export default function Home() {
  const featured = news[0]

  const aiNews = news.filter(article => article.category === 'AI')
  const startupNews = news.filter(article => article.category === 'Startups')
  const securityNews = news.filter(article => article.category === 'Security')

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 20px'
      }}
    >
      {/* BREAKING BAR */}

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
        🔥 BREAKING • Latest AI, Startup & Cybersecurity News
      </div>

      {/* FEATURED */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '30px',
          marginBottom: '50px'
        }}
      >
        <div
          style={{
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '20px',
            overflow: 'hidden'
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
        </div>

        {/* TRENDING */}

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

          {news.slice(1, 6).map(article => (
            <div
              key={article.id}
              style={{
                color: '#FFFFFF',
                marginBottom: '18px',
                lineHeight: '1.6',
                borderBottom: '1px solid #232323',
                paddingBottom: '12px'
              }}
            >
              📰 {article.title}
            </div>
          ))}
        </div>
      </div>

      {/* AI */}

      <h2
        style={{
          color: '#D4AF37',
          fontSize: '32px',
          marginBottom: '25px'
        }}
      >
        🤖 AI News
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px',
          marginBottom: '60px'
        }}
      >
        {aiNews.slice(0, 4).map(article => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      {/* STARTUPS */}

      <h2
        style={{
          color: '#D4AF37',
          fontSize: '32px',
          marginBottom: '25px'
        }}
      >
        🚀 Startup News
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px',
          marginBottom: '60px'
        }}
      >
        {startupNews.slice(0, 4).map(article => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      {/* SECURITY */}

      <h2
        style={{
          color: '#D4AF37',
          fontSize: '32px',
          marginBottom: '25px'
        }}
      >
        🔐 Cybersecurity News
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px',
          marginBottom: '60px'
        }}
      >
        {securityNews.slice(0, 4).map(article => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      {/* ALL NEWS */}

      <h2
        style={{
          color: '#D4AF37',
          fontSize: '32px',
          marginBottom: '25px'
        }}
      >
        📰 Latest Technology News
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px'
        }}
      >
        {news.map(article => (
          <NewsCard
            key={article.id}
            {...article}
          />
        ))}
      </div>
      <Newsletter />
    </div>
  )
}
