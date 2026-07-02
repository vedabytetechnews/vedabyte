import { Link } from 'react-router-dom'
import useSubscription from '../hooks/useSubscription'
import PremiumCard from './PremiumCard'

export default function PremiumArticleGate({ children }) {
  const { loading, isPro } = useSubscription()

  if (loading) {
    return (
      <PremiumCard glow style={{ marginTop: '35px' }}>
        <p style={{ color: '#D4AF37' }}>Checking premium access...</p>
      </PremiumCard>
    )
  }

  if (!isPro) {
    return (
      <div style={{ marginTop: '35px' }}>
        <div style={blurPreviewStyle}>
          <div style={fakeLineStyle}></div>
          <div style={{ ...fakeLineStyle, width: '92%' }}></div>
          <div style={{ ...fakeLineStyle, width: '78%' }}></div>
        </div>

        <PremiumCard glow style={{ textAlign: 'center' }}>
          <p style={labelStyle}>PREMIUM ARTICLE</p>

          <div style={iconStyle}>🔒</div>

          <h2 style={titleStyle}>Continue Reading with VedaByte Pro</h2>

          <p style={textStyle}>
            This premium report is available only for Pro members. Unlock deeper
            analysis, AI summaries, weekly briefs and exclusive technology insights.
          </p>

          <div style={benefitsStyle}>
            <span>✓ Premium Articles</span>
            <span>✓ AI Summaries</span>
            <span>✓ Weekly Briefs</span>
            <span>✓ Exclusive Reports</span>
          </div>

          <Link to="/pricing" style={buttonStyle}>
            Upgrade to Pro
          </Link>
        </PremiumCard>
      </div>
    )
  }

  return children
}

const blurPreviewStyle = {
  padding: '26px',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, rgba(20,20,20,0.9), rgba(5,5,5,0.9))',
  filter: 'blur(2px)',
  opacity: 0.45,
  marginBottom: '-18px',
  border: '1px solid rgba(255,255,255,0.05)'
}

const fakeLineStyle = {
  height: '14px',
  width: '100%',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.12)',
  marginBottom: '14px'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '16px'
}

const iconStyle = {
  width: '64px',
  height: '64px',
  margin: '0 auto 18px',
  borderRadius: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px',
  background: 'linear-gradient(145deg, #151515, #060606)',
  boxShadow:
    'inset 4px 4px 10px rgba(0,0,0,0.7), inset -3px -3px 8px rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,175,55,0.35)'
}

const titleStyle = {
  color: '#fff',
  fontSize: '30px',
  marginBottom: '14px'
}

const textStyle = {
  color: '#C7C7C7',
  maxWidth: '680px',
  margin: '0 auto 24px',
  lineHeight: '1.8'
}

const benefitsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '10px',
  color: '#D4AF37',
  fontSize: '14px',
  fontWeight: '800',
  marginBottom: '26px'
}

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #D4AF37, #FFE08A)',
  color: '#000',
  padding: '14px 28px',
  borderRadius: '999px',
  fontWeight: '900',
  textDecoration: 'none',
  boxShadow: '0 10px 26px rgba(212,175,55,0.28)'
}