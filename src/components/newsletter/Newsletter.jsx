import { useState } from 'react'
import { subscribeEmail } from '../../services/newsletterService'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({
    type: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(e) {
    e.preventDefault()

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

    setLoading(true)
    setStatus({ type: '', message: '' })

    const result = await subscribeEmail(cleanEmail)

    setStatus({
      type: result.success ? 'success' : 'error',
      message: result.message
    })

    if (result.success) {
      setEmail('')
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        marginTop: '80px',
        background: '#111111',
        border: '1px solid #232323',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center'
      }}
    >
      <h2
        style={{
          color: '#D4AF37',
          marginBottom: '15px',
          fontSize: '32px'
        }}
      >
        Join The VedaByte Tech Newsletter
      </h2>

      <p
        style={{
          color: '#D1D5DB',
          marginBottom: '25px'
        }}
      >
        Get the latest AI, startup and technology news delivered to your inbox.
      </p>

      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          style={{
            width: '320px',
            maxWidth: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #232323',
            background: '#0A0A0A',
            color: '#FFFFFF',
            marginRight: '10px'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#8a742b' : '#D4AF37',
            color: '#000',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status.message && (
        <p
          style={{
            color: status.type === 'success' ? '#22c55e' : '#ef4444',
            marginTop: '20px',
            fontWeight: '600'
          }}
        >
          {status.type === 'success' ? '✓ ' : '⚠ '}
          {status.message}
        </p>
      )}
    </div>
  )
}