import PremiumCard from '../PremiumCard'
import useSubscription from '../../hooks/useSubscription'

export default function SubscriptionSettings() {
  const { plan, subscription } = useSubscription()

  return (
    <PremiumCard glow style={{ marginTop: '30px' }}>
      <p style={labelStyle}>ACCOUNT</p>

      <h2 style={titleStyle}>Subscription Settings</h2>

      <div style={rowStyle}>
        <span>Current Plan</span>
        <strong>{plan.toUpperCase()}</strong>
      </div>

      <div style={rowStyle}>
        <span>Status</span>
        <strong style={{ color: '#22c55e' }}>
          {subscription?.status || 'active'}
        </strong>
      </div>

      <div style={rowStyle}>
        <span>Payment Provider</span>
        <strong>Razorpay</strong>
      </div>

      <p style={noteStyle}>
        Payment history, cancellation, renewal and billing controls will be added
        before Razorpay Live launch.
      </p>
    </PremiumCard>
  )
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '12px'
}

const titleStyle = {
  color: '#fff',
  fontSize: '28px',
  marginBottom: '22px'
}

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  padding: '14px 0',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  color: '#D1D5DB'
}

const noteStyle = {
  color: '#9CA3AF',
  lineHeight: '1.7',
  marginTop: '20px'
}