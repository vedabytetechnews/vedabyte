import { useEffect, useState } from 'react'
import {
  getAllSubscribers,
  deleteSubscriber
} from '../services/adminSubscriberService'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSubscribers() {
      const data = await getAllSubscribers()
      setSubscribers(data)
      setLoading(false)
    }

    loadSubscribers()
  }, [])

  async function handleDelete(id) {
    const success = await deleteSubscriber(id)

    if (success) {
      setSubscribers(prev =>
        prev.filter(item => item.id !== id)
      )
    }
  }

  if (loading) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading subscribers...
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '45px 20px',
        color: '#fff'
      }}
    >
      <h1
        style={{
          color: '#D4AF37',
          fontSize: '42px',
          marginBottom: '10px'
        }}
      >
        Newsletter Subscribers
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '30px' }}>
        Manage VedaByte newsletter audience.
      </p>

      {subscribers.length === 0 ? (
        <div style={boxStyle}>No subscribers found.</div>
      ) : (
        subscribers.map(subscriber => (
          <div key={subscriber.id} style={boxStyle}>
            <p style={{ color: '#fff', fontWeight: '700' }}>
              {subscriber.email}
            </p>

            <p style={metaStyle}>
              Verified: {subscriber.verified ? 'Yes' : 'No'}
            </p>

            <p style={metaStyle}>
              Subscribed:{' '}
              {subscriber.subscribed_at
                ? new Date(subscriber.subscribed_at).toLocaleString()
                : 'Unknown'}
            </p>

            <button
              onClick={() => handleDelete(subscriber.id)}
              style={{
                marginTop: '15px',
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '800'
              }}
            >
              Delete Subscriber
            </button>
          </div>
        ))
      )}
    </div>
  )
}

const boxStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '18px',
  padding: '22px',
  marginBottom: '18px'
}

const metaStyle = {
  color: '#9CA3AF',
  fontSize: '13px',
  marginTop: '6px'
}