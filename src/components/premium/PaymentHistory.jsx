import PremiumCard from '../PremiumCard'
import useSubscription from '../../hooks/useSubscription'

export default function PaymentHistory() {
  const { subscription } = useSubscription()

  return (
    <PremiumCard glow style={{ marginTop: '30px' }}>
      <p style={labelStyle}>BILLING</p>

      <h2 style={titleStyle}>Payment History</h2>

      {subscription?.razorpay_payment_id ? (
        <div style={paymentBoxStyle}>
          <p style={smallStyle}>Latest Payment</p>

          <strong style={paymentIdStyle}>
            {subscription.razorpay_payment_id}
          </strong>

          <p style={statusStyle}>Payment recorded successfully.</p>
        </div>
      ) : (
        <p style={textStyle}>
          No payment history found yet. Your first successful Pro payment will
          appear here.
        </p>
      )}
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

const paymentBoxStyle = {
  background: '#0B0B0B',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '18px',
  padding: '20px'
}

const smallStyle = {
  color: '#9CA3AF',
  marginBottom: '8px'
}

const paymentIdStyle = {
  color: '#D4AF37',
  wordBreak: 'break-all'
}

const statusStyle = {
  color: '#22c55e',
  marginTop: '12px'
}

const textStyle = {
  color: '#9CA3AF',
  lineHeight: '1.7'
}