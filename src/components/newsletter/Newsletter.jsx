import { useState } from 'react'
import { subscribeEmail } from '../../services/newsletterService'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubscribe(e) {
    e.preventDefault()

    setSuccess(false)

    const cleanEmail = email.trim().toLowerCase()
    console.log('VALIDATION RUNNING')
    const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/

    if (!emailRegex.test(cleanEmail)) {
      alert('Please enter a valid email address')
      return
    }

    const result = await subscribeEmail(cleanEmail)

    if (result) {
      setSuccess(true)
      setEmail('')
    } else {
      alert('Subscription failed. This email may already exist.')
    }
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
        Join The VedaByte Newsletter
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
          style={{
            background: '#D4AF37',
            color: '#000',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Subscribe
        </button>
      </form>

      {success && (
        <p
          style={{
            color: '#22c55e',
            marginTop: '20px',
            fontWeight: '600'
          }}
        >
          ✓ Successfully subscribed!
        </p>
      )}
    </div>
  )
}