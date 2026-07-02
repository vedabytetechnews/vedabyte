import { Link } from 'react-router-dom'
import news from '../../data/news'
import PremiumCard from '../PremiumCard'

export default function LatestPremiumArticles() {
  const premiumArticles = news
    .filter(article => article.isPremium)
    .slice(0, 4)

  return (
    <PremiumCard glow style={{ marginTop: '30px' }}>
      <div style={headerStyle}>
        <div>
          <p style={labelStyle}>PREMIUM FEED</p>
          <h2 style={titleStyle}>Latest Premium Articles</h2>
        </div>

        <Link to="/" style={viewAllStyle}>
          View All
        </Link>
      </div>

      {premiumArticles.length === 0 ? (
        <p style={emptyStyle}>
          No premium articles yet. Mark articles with isPremium: true in news.js.
        </p>
      ) : (
        <div style={listStyle}>
          {premiumArticles.map(article => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              style={itemStyle}
            >
              <div style={badgeStyle}>PRO</div>

              <div>
                <h3 style={articleTitleStyle}>{article.title}</h3>
                <p style={metaStyle}>
                  {article.category} • 4 min read
                </p>
              </div>

              <span style={arrowStyle}>→</span>
            </Link>
          ))}
        </div>
      )}
    </PremiumCard>
  )
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '22px'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '8px'
}

const titleStyle = {
  color: '#fff',
  fontSize: '28px',
  margin: 0
}

const viewAllStyle = {
  color: '#D4AF37',
  textDecoration: 'none',
  fontWeight: '800',
  fontSize: '14px'
}

const emptyStyle = {
  color: '#9CA3AF',
  lineHeight: '1.7'
}

const listStyle = {
  display: 'grid',
  gap: '14px'
}

const itemStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  borderRadius: '18px',
  background: 'linear-gradient(145deg, #111111, #070707)',
  border: '1px solid rgba(255,255,255,0.06)',
  textDecoration: 'none',
  color: '#fff'
}

const badgeStyle = {
  background: 'linear-gradient(135deg, #D4AF37, #FFE08A)',
  color: '#000',
  fontSize: '11px',
  fontWeight: '900',
  padding: '7px 10px',
  borderRadius: '999px'
}

const articleTitleStyle = {
  margin: 0,
  fontSize: '17px',
  lineHeight: '1.4'
}

const metaStyle = {
  margin: '5px 0 0',
  color: '#9CA3AF',
  fontSize: '13px'
}

const arrowStyle = {
  color: '#D4AF37',
  fontSize: '22px',
  fontWeight: '900'
}