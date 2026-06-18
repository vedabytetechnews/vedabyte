import { useState } from 'react'

export default function AdminNewsletter() {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSend(e) {
    e.preventDefault()

    setLoading(true)
    setMessage('')

    const response = await fetch('/api/send-newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, content })
    })

    const data = await response.json()

    if (data.success) {
      setMessage('✅ Newsletter campaign created in Brevo.')
      setSubject('')
      setContent('')
    } else {
      setMessage('❌ Failed: ' + (data.message || 'Unknown error'))
      console.error(data)
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '45px 20px', color: '#fff' }}>
      <h1 style={{ color: '#D4AF37', fontSize: '42px', marginBottom: '10px' }}>
        Send Newsletter
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '30px' }}>
        Create a VedaByte newsletter campaign in Brevo.
      </p>

      <form onSubmit={handleSend} style={{ background: '#111', border: '1px solid #232323', borderRadius: '20px', padding: '25px' }}>
        <label style={labelStyle}>Subject</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Example: This Week in AI"
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Newsletter Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your newsletter here..."
          required
          rows="10"
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#8a742b' : '#D4AF37',
            color: '#000',
            border: 'none',
            padding: '13px 22px',
            borderRadius: '12px',
            fontWeight: '900',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Brevo Campaign'}
        </button>

        {message && (
          <p style={{ marginTop: '20px', color: message.startsWith('✅') ? '#22c55e' : '#ef4444' }}>
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  color: '#D4AF37',
  fontWeight: '800',
  marginBottom: '8px'
}

const inputStyle = {
  width: '100%',
  background: '#0A0A0A',
  border: '1px solid #232323',
  color: '#fff',
  padding: '14px',
  borderRadius: '12px',
  marginBottom: '20px',
  fontSize: '15px'
}