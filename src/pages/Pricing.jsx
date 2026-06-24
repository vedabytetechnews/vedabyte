import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getUserSubscription,
  createFreeSubscription
} from '../services/subscriptionService'

export default function Pricing() {
  const { user, isAuthenticated } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(false)

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

  async function handleUpgrade(planName) {
    if (!isAuthenticated) {
      alert('Please sign in before upgrading.')
      return
    }

    if (planName === 'Enterprise') {
      alert('Contact sales: vedabytenews@gmail.com')
      return
    }

    setLoading(true)

    alert('Razorpay payment integration will be connected in the next step.')

    setLoading(false)
  }

  const currentPlan = subscription?.plan || 'free'

  const plans = [
    {
      name: 'Free',
      key: 'free',
      price: '₹0',
      description: 'For casual readers who want daily tech updates.',
      features: [
        'Latest tech news',
        'Search articles',
        'Save bookmarks',
        'Basic newsletter'
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      key: 'pro',
      price: '₹199/mo',
      description: 'For builders, founders and serious tech readers.',
      features: [
        'Everything in Free',
        'AI summaries',
        'Premium insights',
        'Weekly intelligence brief',
        'Ad-light reading'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      key: 'enterprise',
      price: 'Custom',
      description: 'For teams, startups and organizations.',
      features: [
        'Team access',
        'Custom reports',
        'Market intelligence',
        'Priority support',
        'Company dashboard'
      ],
      highlighted: false
    }
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px', color: '#fff' }}>
      <h1 style={{ color: '#D4AF37', fontSize: '48px', marginBottom: '12px' }}>
        VedaByte Premium
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '14px', fontSize: '18px' }}>
        Choose the plan that fits your technology reading workflow.
      </p>

      {isAuthenticated && (
        <p style={{ color: '#D1D5DB', marginBottom: '40px' }}>
          Current Plan:{' '}
          <strong style={{ color: '#D4AF37', textTransform: 'capitalize' }}>
            {currentPlan}
          </strong>
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
        {plans.map(plan => {
          const isCurrent = currentPlan === plan.key

          return (
            <div
              key={plan.name}
              style={{
                background: '#111111',
                border: plan.highlighted ? '1px solid #D4AF37' : '1px solid #232323',
                borderRadius: '22px',
                padding: '28px'
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    display: 'inline-block',
                    background: '#D4AF37',
                    color: '#000',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontWeight: '900',
                    fontSize: '12px',
                    marginBottom: '18px'
                  }}
                >
                  RECOMMENDED
                </div>
              )}

              <h2 style={{ color: '#fff', fontSize: '30px' }}>
                {plan.name}
              </h2>

              <h3 style={{ color: '#D4AF37', fontSize: '36px', marginTop: '12px' }}>
                {plan.price}
              </h3>

              <p style={{ color: '#9CA3AF', marginTop: '12px', lineHeight: '1.6' }}>
                {plan.description}
              </p>

              <ul style={{ marginTop: '24px', paddingLeft: '20px', color: '#D1D5DB', lineHeight: '2' }}>
                {plan.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <button
                disabled={isCurrent || loading}
                onClick={() => handleUpgrade(plan.name)}
                style={{
                  marginTop: '28px',
                  width: '100%',
                  background: isCurrent ? '#232323' : plan.highlighted ? '#D4AF37' : '#232323',
                  color: isCurrent ? '#9CA3AF' : plan.highlighted ? '#000' : '#fff',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '12px',
                  fontWeight: '900',
                  cursor: isCurrent || loading ? 'default' : 'pointer'
                }}
              >
                {isCurrent
                  ? 'Current Plan'
                  : plan.name === 'Pro'
                    ? 'Upgrade to Pro'
                    : 'Contact Sales'}
              </button>
            </div>
          )
        })}
      </div>

      {!isAuthenticated && (
        <p style={{ color: '#9CA3AF', marginTop: '30px' }}>
          Please <Link to="/profile" style={{ color: '#D4AF37' }}>sign in</Link> before upgrading.
        </p>
      )}
    </div>
  )
}