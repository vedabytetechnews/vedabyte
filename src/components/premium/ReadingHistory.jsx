import { Link } from 'react-router-dom'
import PremiumCard from '../PremiumCard'

export default function ReadingHistory() {
  const saved = localStorage.getItem('vedabyte_reading_history')
  const history = saved ? JSON.parse(saved) : []

  return (
    <PremiumCard glow>
      <p style={labelStyle}>HISTORY</p>
      <h2 style={titleStyle}>Reading History</h2>

      {history.length === 0 ? (
        <p style={textStyle}>Your recently opened articles will appear here.</p>
      ) : (
        <div style={listStyle}>
          {history.slice(0, 5).map(article => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              style={itemStyle}
            >
              <strong>{article.title}</strong>
              <span>{article.category}</span>
            </Link>
          ))}
        </div>
      )}
    </PremiumCard>
  )
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  marginBottom: '12px'
}

const titleStyle = {
  color: '#fff',
  fontSize: '28px',
  marginBottom: '20px'
}

const textStyle = {
  color: '#9CA3AF'
}

const listStyle = {
  display: 'grid',
  gap: '12px'
}

const itemStyle = {
  display: 'grid',
  gap: '6px',
  color: '#fff',
  textDecoration: 'none',
  background: '#0B0B0B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  padding: '16px'
}