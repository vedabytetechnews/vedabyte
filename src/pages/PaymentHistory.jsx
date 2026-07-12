import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getPaymentHistory } from '../services/paymentHistoryService'

export default function PaymentHistory() {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])

  useEffect(() => {
    async function loadPayments() {
      if (!user) return

      const history = await getPaymentHistory(user.id)
      setPayments(history)
    }

    loadPayments()
  }, [user])

  return (
    <div style={pageStyle}>
      <p style={labelStyle}>PAYMENT HISTORY</p>

      <h1 style={titleStyle}>Your Payments</h1>

      {payments.length === 0 ? (
        <p style={emptyStyle}>No payments found yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={headRowStyle}>
              <th align="left">Date</th>
              <th align="left">Plan</th>
              <th align="left">Amount</th>
              <th align="left">Status</th>
              <th align="left">Payment ID</th>
            </tr>
          </thead>

          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} style={rowStyle}>
                <td style={cellStyle}>
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>

                <td style={cellStyle}>
                  {payment.plan}
                </td>

                <td style={cellStyle}>
                  ₹{payment.amount / 100}
                </td>

                <td style={{ ...cellStyle, color: '#22c55e' }}>
                  {payment.status}
                </td>

                <td style={cellStyle}>
                  {payment.razorpay_payment_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const pageStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '80px 20px',
  color: '#fff'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '.3em',
  fontWeight: '900'
}

const titleStyle = {
  fontSize: '52px',
  marginBottom: '40px'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
}

const headRowStyle = {
  color: '#D4AF37'
}

const rowStyle = {
  borderTop: '1px solid #232323'
}

const cellStyle = {
  padding: '16px 0',
  color: '#D1D5DB'
}

const emptyStyle = {
  color: '#9CA3AF',
  fontSize: '18px'
}