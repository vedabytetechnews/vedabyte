import PremiumCard from '../PremiumCard'
import useSubscription from '../../hooks/useSubscription'

export default function DashboardHero() {
  const { plan, subscription } = useSubscription()

  return (
    <PremiumCard glow>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <p
            style={{
              color: '#D4AF37',
              letterSpacing: '.3em',
              fontSize: '11px',
              fontWeight: 900,
              marginBottom: 10
            }}
          >
            VEDABYTE PRO
          </p>

          <h1
            style={{
              fontSize: '48px',
              margin: 0,
              color: '#fff'
            }}
          >
            👋 Welcome Back
          </h1>

          <p
            style={{
              color: '#9CA3AF',
              marginTop: '18px',
              lineHeight: '1.8'
            }}
          >
            Everything important in technology,
            curated exclusively for Pro members.
          </p>
        </div>

        <div
          style={{
            minWidth: 240,
            background: '#0B0B0B',
            borderRadius: 20,
            padding: 24,
            border: '1px solid rgba(212,175,55,.15)'
          }}
        >
          <p style={{ color: '#777' }}>Membership</p>

          <h2 style={{ color: '#D4AF37', margin: '8px 0' }}>
            {plan.toUpperCase()}
          </h2>

          <p style={{ color: '#22c55e' }}>
            {subscription?.status || 'active'}
          </p>
        </div>
      </div>
    </PremiumCard>
  )
}