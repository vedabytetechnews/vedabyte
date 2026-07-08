import { Link } from 'react-router-dom'
import PremiumCard from './PremiumCard'

export default function PremiumArticleLock() {
  return (
    <PremiumCard glow style={{ marginTop: '35px', textAlign: 'center' }}>
      <div
        style={{
          fontSize: '52px',
          marginBottom: '18px'
        }}
      >
        🔒
      </div>

      <p
        style={{
          color: '#D4AF37',
          fontWeight: '900',
          letterSpacing: '.28em',
          fontSize: '11px'
        }}
      >
        PREMIUM ARTICLE
      </p>

      <h2
        style={{
          color: '#fff',
          fontSize: '34px',
          marginTop: '15px'
        }}
      >
        Continue Reading with VedaByte Pro
      </h2>

      <p
        style={{
          color: '#A1A1AA',
          lineHeight: '1.8',
          maxWidth: '600px',
          margin: '20px auto'
        }}
      >
        This article is reserved for Premium members. Unlock exclusive
        intelligence reports, deep analysis and advanced technology coverage.
      </p>

      <Link
        to="/pricing"
        style={{
          display: 'inline-block',
          padding: '15px 28px',
          borderRadius: '999px',
          textDecoration: 'none',
          background: 'linear-gradient(135deg,#D4AF37,#FFE08A)',
          color: '#000',
          fontWeight: '900'
        }}
      >
        Upgrade to Premium
      </Link>
    </PremiumCard>
  )
}