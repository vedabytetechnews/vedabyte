import { useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'
import { getPaymentHistory } from '../services/paymentHistoryService'
import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function PaymentHistory() {
  const { user } = useAuth()

  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPayments() {
      if (!user) {
        if (isMounted) {
          setPayments([])
          setLoading(false)
        }

        return
      }

      try {
        if (isMounted) {
          setLoading(true)
          setError('')
        }

        const history = await getPaymentHistory(user.id)

        if (isMounted) {
          setPayments(Array.isArray(history) ? history : [])
        }
      } catch (loadError) {
        console.error('Payment history loading error:', loadError)

        if (isMounted) {
          setPayments([])
          setError('Unable to load your payment history.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadPayments()

    return () => {
      isMounted = false
    }
  }, [user])

  if (loading) {
    return <LoadingScreen message="Loading payment history..." />
  }

  return (
    <>
      <SEO
        title="VedaByte Payment History"
        description="Review your VedaByte Premium and supporter membership payments."
        url="https://vedabyte-delta.vercel.app/payments"
      />

      <main className="payment-history-page">
        <div className="payment-history-container">
          <header className="payment-history-header">
            <p className="payment-history-label">
              PAYMENT HISTORY
            </p>

            <h1 className="payment-history-title">
              Your Payments
            </h1>

            <p className="payment-history-subtitle">
              Review your VedaByte Premium and supporter-plan transactions.
            </p>
          </header>

          {!user && (
            <EmptyState
              title="Sign in required"
              text="Please sign in to view your VedaByte payment history."
            />
          )}

          {user && error && (
            <EmptyState
              title="Something went wrong"
              text={error}
              error
            />
          )}

          {user && !error && payments.length === 0 && (
            <EmptyState
              title="No payments found yet"
              text="Your successful VedaByte membership payments will appear here."
            />
          )}

          {user && !error && payments.length > 0 && (
            <section
              className="payment-history-grid"
              aria-label="Payment transactions"
            >
              {payments.map(payment => {
                const paymentDate = formatPaymentDate(
                  payment.created_at
                )

                const amount =
                  Number(payment.amount || 0) / 100

                const status =
                  payment.status || 'unknown'

                return (
                  <article
                    key={payment.id}
                    className="payment-history-card"
                  >
                    <div className="payment-card-header">
                      <div>
                        <p className="payment-card-label">
                          PLAN
                        </p>

                        <h2 className="payment-plan-name">
                          {formatPlanName(payment.plan)}
                        </h2>
                      </div>

                      <span
                        className={`payment-status ${
                          status === 'success'
                            ? 'success'
                            : 'pending'
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="payment-details">
                      <PaymentRow
                        label="Amount"
                        value={`₹${amount.toFixed(2)}`}
                      />

                      <PaymentRow
                        label="Payment date"
                        value={paymentDate}
                      />

                      <PaymentRow
                        label="Payment ID"
                        value={
                          payment.razorpay_payment_id ||
                          'Not available'
                        }
                        code
                      />

                      <PaymentRow
                        label="Order ID"
                        value={
                          payment.razorpay_order_id ||
                          'Not available'
                        }
                        code
                      />
                    </div>
                  </article>
                )
              })}
            </section>
          )}
        </div>
      </main>
    </>
  )
}

function PaymentRow({ label, value, code = false }) {
  return (
    <div className="payment-row">
      <span className="payment-row-label">
        {label}
      </span>

      <span
        className={
          code
            ? 'payment-row-value payment-code'
            : 'payment-row-value'
        }
      >
        {value}
      </span>
    </div>
  )
}

function EmptyState({ title, text, error = false }) {
  return (
    <section
      className={`payment-empty-card${
        error ? ' error' : ''
      }`}
    >
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  )
}

function formatPlanName(plan) {
  if (plan === 'pro') return 'Premium'
  if (plan === 'coffee') return 'Support VedaByte'

  return plan || 'Unknown plan'
}

function formatPaymentDate(dateValue) {
  if (!dateValue) {
    return 'Not available'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return 'Not available'
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}