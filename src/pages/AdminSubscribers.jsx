import { useEffect, useState } from 'react'
import {
  getAllSubscribers,
  deleteSubscriber
} from '../services/adminSubscriberService'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubscribers()
  }, [])

  async function loadSubscribers() {
    const data = await getAllSubscribers()
    setSubscribers(data)
    setLoading(false)
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Delete this subscriber from VedaByte?'
    )

    if (!confirmDelete) return

    const success = await deleteSubscriber(id)

    if (success) {
      setSubscribers(prev =>
        prev.filter(item => item.id !== id)
      )
    }
  }

  function exportCSV() {
    const rows = [
      ['Email', 'Verified', 'Subscribed At'],
      ...filteredSubscribers.map(item => [
        item.email,
        item.verified ? 'Yes' : 'No',
        item.subscribed_at || ''
      ])
    ]

    const csv = rows
      .map(row =>
        row
          .map(value => `"${String(value).replaceAll('"', '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'vedabyte-newsletter-subscribers.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  const cleanQuery = query.trim().toLowerCase()

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(cleanQuery)
  )

  const verifiedCount = subscribers.filter(item => item.verified).length
  const unverifiedCount = subscribers.length - verifiedCount

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
        Manage VedaByte newsletter audience and Brevo subscriber growth.
      </p>

      <div style={statsGridStyle}>
        <StatCard label="Total Subscribers" value={subscribers.length} />
        <StatCard label="Verified" value={verifiedCount} />
        <StatCard label="Unverified" value={unverifiedCount} />
        <StatCard label="Visible Results" value={filteredSubscribers.length} />
      </div>

      <div style={toolbarStyle}>
        <input
          type="text"
          placeholder="Search subscriber email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={exportCSV}
          disabled={filteredSubscribers.length === 0}
          style={{
            ...exportButtonStyle,
            opacity: filteredSubscribers.length === 0 ? 0.5 : 1,
            cursor: filteredSubscribers.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Export CSV
        </button>
      </div>

      {filteredSubscribers.length === 0 ? (
        <div style={boxStyle}>No subscribers found.</div>
      ) : (
        filteredSubscribers.map(subscriber => (
          <div key={subscriber.id} style={boxStyle}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <p style={{ color: '#fff', fontWeight: '800' }}>
                  {subscriber.email}
                </p>

                <p style={metaStyle}>
                  Verified: {subscriber.verified ? '✅ Yes' : '❌ No'}
                </p>

                <p style={metaStyle}>
                  Subscribed:{' '}
                  {subscriber.subscribed_at
                    ? new Date(subscriber.subscribed_at).toLocaleString()
                    : 'Unknown'}
                </p>

                <p style={metaStyle}>
                  Brevo List: VedaByte Newsletter
                </p>
              </div>

              <button
                onClick={() => handleDelete(subscriber.id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={statCardStyle}>
      <p style={{ color: '#9CA3AF', fontSize: '14px' }}>
        {label}
      </p>

      <h2
        style={{
          color: '#D4AF37',
          fontSize: '32px',
          marginTop: '8px'
        }}
      >
        {value}
      </h2>
    </div>
  )
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
  gap: '16px',
  marginBottom: '28px'
}

const statCardStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '18px',
  padding: '22px'
}

const toolbarStyle = {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
  marginBottom: '25px'
}

const inputStyle = {
  flex: 1,
  minWidth: '260px',
  background: '#111111',
  border: '1px solid #232323',
  color: '#fff',
  padding: '14px 16px',
  borderRadius: '12px',
  fontSize: '15px'
}

const exportButtonStyle = {
  background: '#D4AF37',
  color: '#000',
  border: 'none',
  padding: '12px 18px',
  borderRadius: '12px',
  fontWeight: '900'
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

const deleteButtonStyle = {
  alignSelf: 'center',
  background: '#7F1D1D',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '900'
}