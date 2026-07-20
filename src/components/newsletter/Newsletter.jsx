import { useState } from 'react'
import { subscribeEmail } from '../../services/newsletterService'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(event) {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/

    if (!emailRegex.test(cleanEmail)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      })
      return
    }

    try {
      setLoading(true)
      setStatus({
        type: '',
        message: ''
      })

      const result = await subscribeEmail(cleanEmail)

      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      })

      if (result.success) {
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter subscription failed:', error)

      setStatus({
        type: 'error',
        message: 'Unable to subscribe right now. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter-panel">
      <div className="newsletter-panel__content">
        <p className="newsletter-panel__eyebrow">
          VedaByte Intelligence
        </p>

        <h2 className="newsletter-panel__title">
          Join the VedaByte Tech Newsletter
        </h2>

        <p className="newsletter-panel__description">
          Get the latest AI, startup and technology news delivered to your
          inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="newsletter-panel__form"
          noValidate
        >
          <label
            htmlFor="newsletter-email"
            className="newsletter-panel__label"
          >
            Email address
          </label>

          <div className="newsletter-panel__fields">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              disabled={loading}
              autoComplete="email"
              inputMode="email"
              className="newsletter-panel__input"
              aria-invalid={status.type === 'error'}
              aria-describedby={
                status.message
                  ? 'newsletter-status'
                  : undefined
              }
            />

            <button
              type="submit"
              disabled={loading}
              className="newsletter-panel__button"
            >
              {loading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="newsletter-panel__spinner"
                  />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
        </form>

        {status.message && (
          <p
            id="newsletter-status"
            role={status.type === 'error' ? 'alert' : 'status'}
            className={`newsletter-panel__status newsletter-panel__status--${status.type}`}
          >
            <span aria-hidden="true">
              {status.type === 'success' ? '✓' : '⚠'}
            </span>

            {status.message}
          </p>
        )}

        <p className="newsletter-panel__privacy">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}