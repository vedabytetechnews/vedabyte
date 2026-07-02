import { Link } from 'react-router-dom'
import PremiumCard from '../PremiumCard'

export default function ContinueReading() {
  const saved = localStorage.getItem('vedabyte_continue_reading')
  const article = saved ? JSON.parse(saved) : null

  return (
    <PremiumCard glow>
      <p style={labelStyle}>CONTINUE</p>
      <h2 style={titleStyle}>Continue Reading</h2>

      {!article ? (
        <p style={textStyle}>Open any article to start tracking your reading.</p>
      ) : (
        <Link to={`/article/${article.id}`} style={linkStyle}>
          <strong>{article.title}</strong>
          <span style={metaStyle}>{article.category} • 68% complete</span>

          <div style={barTrackStyle}>
            <div style={barFillStyle}></div>
          </div>

          <span style={continueStyle}>Continue →</span>
        </Link>
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

const linkStyle = {
  display: 'grid',
  gap: '10px',
  color: '#fff',
  textDecoration: 'none',
  background: '#0B0B0B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '18px',
  padding: '18px'
}

const metaStyle = {
  color: '#9CA3AF',
  fontSize: '14px'
}

const barTrackStyle = {
  height: '9px',
  borderRadius: '999px',
  background: '#050505',
  overflow: 'hidden'
}

const barFillStyle = {
  width: '68%',
  height: '100%',
  background: 'linear-gradient(90deg, #D4AF37, #FFE08A)',
  borderRadius: '999px'
}

const continueStyle = {
  color: '#D4AF37',
  fontWeight: '800'
}