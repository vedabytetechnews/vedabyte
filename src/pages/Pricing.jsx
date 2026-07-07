import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createOrder, verifyPayment } from '../services/paymentService'

import {
  getUserSubscription,
  createFreeSubscription
} from '../services/subscriptionService'

export default function Pricing() {
  const { user, isAuthenticated } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(null)

  useEffect(() => {
    async function loadSubscription() {
      if (!user) return

      const existing = await getUserSubscription(user.id)

      if (existing) {
        setSubscription(existing)
      } else {
        const created = await createFreeSubscription(user)
        setSubscription(created)
      }
    }

    loadSubscription()
  }, [user])

  async function handleUpgrade(planKey) {
    if (!isAuthenticated || !user) {
      alert('Please sign in before upgrading.')
      return
    }

    if (planKey === 'free') return

    try {
      setLoadingPlan(planKey)

      const order = await createOrder(planKey)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'VedaByte',
        description:
          planKey === 'coffee'
            ? 'Support VedaByte - 3 Months Premium'
            : 'VedaByte Premium Monthly',
        order_id: order.id,
        prefill: {
          name: user?.user_metadata?.full_name || 'VedaByte User',
          email: user?.email
        },
        theme: {
          color: '#D4AF37'
        },
        handler: async function (response) {
          try {
            const updated = await verifyPayment({
              user: {
                id: user.id,
                email: user.email
              },
              plan: planKey,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })

            setSubscription(updated)

            alert(
              planKey === 'coffee'
                ? 'Thank you for supporting VedaByte! 3 months Premium activated.'
                : 'Premium subscription activated!'
            )
          } catch (error) {
            console.error(error)
            alert('Payment completed, but verification failed. Please contact support.')
          }
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      alert('Unable to start payment. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  const currentPlan = subscription?.plan || 'free'

  const plans = [
    {
      name: 'Free',
      key: 'free',
      price: '₹0',
      period: 'forever',
      description: 'For casual readers who want daily technology updates.',
      features: [
        'Latest technology news',
        'AI, Startup and Cybersecurity categories',
        'Search articles',
        'Save bookmarks',
        'Comments',
        'Limited intelligence summaries'
      ],
      highlighted: false
    },
    {
      name: 'Support VedaByte ☕',
      key: 'coffee',
      price: '₹149',
      period: 'one-time',
      description: 'Support the project and unlock Premium for 3 months.',
      features: [
        'Everything in Free',
        '3 months Premium included',
        'Unlimited intelligence summaries',
        'Weekly Intelligence Brief',
        'Premium article access',
        'Supporter badge coming soon'
      ],
      highlighted: true,
      badge: 'BEST STARTER'
    },
    {
      name: 'Premium',
      key: 'pro',
      price: '₹99',
      period: 'per month',
      description: 'For serious readers, builders, founders and tech teams.',
      features: [
        'Everything in Free',
        'Unlimited intelligence summaries',
        'Premium articles',
        'Exclusive reports',
        'Daily email digest',
        'Priority support'
      ],
      highlighted: false,
      badge: 'MONTHLY'
    }
  ]

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <p style={labelStyle}>VEDABYTE MEMBERSHIP</p>

        <h1 style={titleStyle}>Choose Your VedaByte Plan</h1>

        <p style={subtitleStyle}>
          Read smarter technology news with intelligence summaries, premium
          analysis, weekly briefs and exclusive reports.
        </p>

        {isAuthenticated && (
          <p style={currentStyle}>
            Current Plan:{' '}
            <strong style={{ color: '#D4AF37', textTransform: 'capitalize' }}>
              {currentPlan}
            </strong>
          </p>
        )}
      </div>

      <div style={gridStyle}>
        {plans.map(plan => {
          const isCurrent = currentPlan === plan.key
          const isLoading = loadingPlan === plan.key

          return (
            <div
              key={plan.key}
              style={{
                ...cardStyle,
                border: plan.highlighted
                  ? '1px solid rgba(212,175,55,0.7)'
                  : '1px solid #232323',
                boxShadow: plan.highlighted
                  ? '0 0 35px rgba(212,175,55,0.18)'
                  : 'none'
              }}
            >
              {plan.badge && <div style={badgeStyle}>{plan.badge}</div>}

              <h2 style={planNameStyle}>{plan.name}</h2>

              <div style={priceRowStyle}>
                <span style={priceStyle}>{plan.price}</span>
                <span style={periodStyle}>/{plan.period}</span>
              </div>

              <p style={descriptionStyle}>{plan.description}</p>

              <ul style={featureListStyle}>
                {plan.features.map(feature => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button
                disabled={isCurrent || isLoading}
                onClick={() => handleUpgrade(plan.key)}
                style={{
                  ...buttonStyle,
                  background: isCurrent
                    ? '#232323'
                    : plan.highlighted
                      ? 'linear-gradient(135deg, #D4AF37, #FFE08A)'
                      : '#D4AF37',
                  color: isCurrent ? '#9CA3AF' : '#000',
                  cursor: isCurrent || isLoading ? 'default' : 'pointer',
                  opacity: isLoading ? 0.75 : 1
                }}
              >
                {isLoading
                  ? 'Opening Payment...'
                  : isCurrent
                    ? 'Current Plan'
                    : plan.key === 'coffee'
                      ? 'Support & Unlock'
                      : plan.key === 'pro'
                        ? 'Start Premium'
                        : 'Current Plan'}
              </button>
            </div>
          )
        })}
      </div>

      {!isAuthenticated && (
        <p style={signinStyle}>
          Please{' '}
          <Link to="/profile" style={{ color: '#D4AF37' }}>
            sign in
          </Link>{' '}
          before upgrading.
        </p>
      )}
    </div>
  )
}

const pageStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '80px 20px',
  color: '#fff'
}

const headerStyle = {
  maxWidth: '760px',
  marginBottom: '42px'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '12px',
  fontWeight: '900',
  marginBottom: '14px'
}

const titleStyle = {
  fontSize: 'clamp(42px, 7vw, 72px)',
  lineHeight: '1.05',
  marginBottom: '18px'
}

const subtitleStyle = {
  color: '#9CA3AF',
  fontSize: '18px',
  lineHeight: '1.8'
}

const currentStyle = {
  color: '#D1D5DB',
  marginTop: '20px'
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
  gap: '24px'
}

const cardStyle = {
  background: 'linear-gradient(145deg, #111111, #070707)',
  borderRadius: '24px',
  padding: '30px',
  position: 'relative'
}

const badgeStyle = {
  display: 'inline-block',
  background: '#D4AF37',
  color: '#000',
  padding: '7px 11px',
  borderRadius: '999px',
  fontWeight: '900',
  fontSize: '11px',
  marginBottom: '18px'
}

const planNameStyle = {
  color: '#fff',
  fontSize: '28px',
  marginBottom: '14px'
}

const priceRowStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
  marginBottom: '16px'
}

const priceStyle = {
  color: '#D4AF37',
  fontSize: '42px',
  fontWeight: '900'
}

const periodStyle = {
  color: '#9CA3AF',
  marginBottom: '8px'
}

const descriptionStyle = {
  color: '#9CA3AF',
  lineHeight: '1.7',
  minHeight: '56px'
}

const featureListStyle = {
  marginTop: '24px',
  paddingLeft: '0',
  listStyle: 'none',
  color: '#D1D5DB',
  lineHeight: '2'
}

const buttonStyle = {
  marginTop: '28px',
  width: '100%',
  border: 'none',
  padding: '14px',
  borderRadius: '14px',
  fontWeight: '900'
}

const signinStyle = {
  color: '#9CA3AF',
  marginTop: '30px'
}