import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserSubscription } from '../services/subscriptionService'

export default function Membership() {
  const { user, isAuthenticated } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMembership() {
      if (!user) {
        setLoading(false)
        return
      }

      const data = await getUserSubscription(user.id)
      setSubscription(data)
      setLoading(false)
    }

    loadMembership()
  }, [user])

  if (!isAuthenticated) {
    return (
      <div style={pageStyle}>
        <h1 style={titleStyle}>Membership</h1>
        <p style={textStyle}>Please sign in to view your membership.</p>
        <Link to="/pricing" style={buttonStyle}>View Plans</Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={pageStyle}>
        <p style={textStyle}>Loading membership...</p>
      </div>
    )
  }

  const plan = subscription?.plan || 'free'
  const status = subscription?.status || 'active'
  const expiryDate = subscription?.expires_at
  ? new Date(subscription.expires_at)
  : null

const expiresAt = expiryDate
  ? expiryDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  : 'Not applicable'

const remainingDays = expiryDate
  ? Math.max(
      0,
      Math.ceil(
        (expiryDate.getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    )
  : null

  return (
    <div style={pageStyle}>
      <p style={labelStyle}>VEDABYTE ACCOUNT</p>

      <h1 style={titleStyle}>My Membership</h1>

      <div style={cardStyle}>
        <Row label="Current Plan" value={plan.toUpperCase()} gold />
        <Row label="Status" value={status.toUpperCase()} />
        <Row
  label="Expires"
  value={
    remainingDays !== null
      ? `${expiresAt} (${remainingDays} days left)`
      : expiresAt
  }
/>
        <Row
          label="Payment ID"
          value={subscription?.razorpay_payment_id || 'No payment yet'}
        />
      </div>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px' }}>
  <Link to="/pricing" style={buttonStyle}>Upgrade / Renew</Link>

  <Link to="/premium" style={secondaryButtonStyle}>Premium Dashboard</Link>

  <Link to="/payments" style={secondaryButtonStyle}>
    Payment History
  </Link>
</div>
    </div>
  )
}

function Row({ label, value, gold }) {
  return (
    <div style={rowStyle}>
      <span style={{ color: '#9CA3AF' }}>{label}</span>
      <strong style={{ color: gold ? '#D4AF37' : '#fff' }}>{value}</strong>
    </div>
  )
}

const pageStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '90px 20px',
  color: '#fff'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '12px',
  fontWeight: '900',
  marginBottom: '14px'
}

const titleStyle = {
  fontSize: '52px',
  marginBottom: '28px'
}

const textStyle = {
  color: '#9CA3AF',
  lineHeight: '1.7'
}

const cardStyle = {
  background: 'linear-gradient(145deg, #111111, #070707)',
  border: '1px solid rgba(212,175,55,0.25)',
  borderRadius: '24px',
  padding: '28px'
}

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  padding: '16px 0',
  borderBottom: '1px solid rgba(255,255,255,0.08)'
}

const buttonStyle = {
  background: 'linear-gradient(135deg, #D4AF37, #FFE08A)',
  color: '#000',
  padding: '14px 24px',
  borderRadius: '999px',
  fontWeight: '900',
  textDecoration: 'none'
}

const secondaryButtonStyle = {
  background: '#111111',
  color: '#D4AF37',
  border: '1px solid rgba(212,175,55,0.35)',
  padding: '14px 24px',
  borderRadius: '999px',
  fontWeight: '900',
  textDecoration: 'none'
}