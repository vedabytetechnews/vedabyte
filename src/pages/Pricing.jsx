import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { createOrder, verifyPayment } from '../services/paymentService'
import {
  getUserSubscription,
  createFreeSubscription
} from '../services/subscriptionService'
import SEO from '../components/SEO'

export default function Pricing() {
  const { user, isAuthenticated } = useAuth()

  const [subscription, setSubscription] = useState(null)
  const [loadingPlan, setLoadingPlan] = useState(null)

  useEffect(() => {
    async function loadSubscription() {
      if (!user) return

      try {
        const existing = await getUserSubscription(user.id)

        if (existing) {
          setSubscription(existing)
        } else {
          const created = await createFreeSubscription(user)
          setSubscription(created)
        }
      } catch (error) {
        console.error('Failed to load subscription:', error)
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

      const order = await createOrder(planKey, {
        id: user.id,
        email: user.email
      })

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
          name:
            user?.user_metadata?.full_name ||
            user?.user_metadata?.name ||
            'VedaByte User',
          email: user?.email
        },

        theme: {
          color: '#D4AF37'
        },

        handler: async function handlePaymentSuccess(response) {
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

            alert(
              'Payment completed, but verification failed. Please contact support.'
            )
          } finally {
            setLoadingPlan(null)
          }
        },

        modal: {
          ondismiss() {
            setLoadingPlan(null)
          }
        }
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay checkout is not available.')
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      alert('Unable to start payment. Please try again.')
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
      description:
        'For casual readers who want daily technology updates.',
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
      description:
        'Support the project and unlock Premium for 3 months.',
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
      description:
        'For serious readers, builders, founders and tech teams.',
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
    <>
      <SEO
        title="VedaByte Premium Plans"
        description="Choose a VedaByte membership plan for premium technology articles, intelligence summaries and weekly briefs."
        url="https://vedabyte-delta.vercel.app/pricing"
      />

      <main className="pricing-page">
        <header className="pricing-header">
          <p className="pricing-label">
            VEDABYTE MEMBERSHIP
          </p>

          <h1 className="pricing-title">
            Choose Your VedaByte Plan
          </h1>

          <p className="pricing-subtitle">
            Read smarter technology news with intelligence summaries,
            premium analysis, weekly briefs and exclusive reports.
          </p>

          {isAuthenticated && (
            <p className="pricing-current-plan">
              Current Plan:{' '}
              <strong>
                {currentPlan}
              </strong>
            </p>
          )}
        </header>

        <section
          className="pricing-grid"
          aria-label="VedaByte membership plans"
        >
          {plans.map(plan => {
            const isCurrent = currentPlan === plan.key
            const isLoading = loadingPlan === plan.key

            return (
              <article
                key={plan.key}
                className={`pricing-card${
                  plan.highlighted ? ' highlighted' : ''
                }`}
              >
                {plan.badge && (
                  <div className="pricing-badge">
                    {plan.badge}
                  </div>
                )}

                <h2 className="pricing-plan-name">
                  {plan.name}
                </h2>

                <div className="pricing-price-row">
                  <span className="pricing-price">
                    {plan.price}
                  </span>

                  <span className="pricing-period">
                    /{plan.period}
                  </span>
                </div>

                <p className="pricing-description">
                  {plan.description}
                </p>

                <ul className="pricing-features">
                  {plan.features.map(feature => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  disabled={isCurrent || isLoading}
                  onClick={() => handleUpgrade(plan.key)}
                  className={`pricing-button${
                    plan.highlighted ? ' highlighted' : ''
                  }${isCurrent ? ' current' : ''}`}
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
              </article>
            )
          })}
        </section>

        {!isAuthenticated && (
          <p className="pricing-signin">
            Please{' '}
            <Link to="/profile">
              sign in
            </Link>{' '}
            before upgrading.
          </p>
        )}
      </main>
    </>
  )
}