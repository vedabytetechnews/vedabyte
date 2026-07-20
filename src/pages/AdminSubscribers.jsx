import { useEffect, useMemo, useState } from 'react'
import {
  getAllSubscribers,
  deleteSubscriber
} from '../services/adminSubscriberService'

import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let mounted = true

    async function loadSubscribers() {
      try {
        const data = await getAllSubscribers()

        if (mounted) {
          setSubscribers(Array.isArray(data) ? data : [])
        }
      } catch (loadError) {
        console.error('Unable to load subscribers:', loadError)

        if (mounted) {
          setError('Unable to load newsletter subscribers right now.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadSubscribers()

    return () => {
      mounted = false
    }
  }, [])

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Delete this subscriber from VedaByte?'
    )

    if (!confirmDelete) return

    try {
      setDeletingId(id)

      const success = await deleteSubscriber(id)

      if (success) {
        setSubscribers(previousSubscribers =>
          previousSubscribers.filter(item => item.id !== id)
        )
      }
    } catch (deleteError) {
      console.error('Unable to delete subscriber:', deleteError)
    } finally {
      setDeletingId(null)
    }
  }

  const filteredSubscribers = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()

    if (!cleanQuery) {
      return subscribers
    }

    return subscribers.filter(subscriber =>
      String(subscriber.email || '')
        .toLowerCase()
        .includes(cleanQuery)
    )
  }, [query, subscribers])

  function exportCSV() {
    if (filteredSubscribers.length === 0) return

    const rows = [
      ['Email', 'Verified', 'Subscribed At'],
      ...filteredSubscribers.map(item => [
        item.email || '',
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

    const csvWithBom = `\uFEFF${csv}`

    const blob = new Blob([csvWithBom], {
      type: 'text/csv;charset=utf-8;'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'vedabyte-newsletter-subscribers.csv'

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  const verifiedCount = subscribers.filter(
    item => item.verified
  ).length

  const unverifiedCount =
    subscribers.length - verifiedCount

  if (loading) {
    return (
      <LoadingScreen message="Loading subscribers..." />
    )
  }

  return (
    <>
      <SEO
        title="Newsletter Subscribers | VedaByte Admin"
        description="Manage, search and export VedaByte newsletter subscribers."
        url="https://vedabyte-delta.vercel.app/admin/subscribers"
      />

      <main className="admin-subscribers-page">
        <header className="admin-subscribers-header">
          <p className="admin-subscribers-label">
            NEWSLETTER AUDIENCE
          </p>

          <h1>Newsletter Subscribers</h1>

          <p>
            Manage VedaByte newsletter audience and Brevo subscriber
            growth.
          </p>
        </header>

        {error ? (
          <section className="admin-subscribers-error">
            <h2>Subscribers unavailable</h2>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <section
              className="admin-subscriber-stats-grid"
              aria-label="Subscriber statistics"
            >
              <StatCard
                label="Total Subscribers"
                value={subscribers.length}
              />

              <StatCard
                label="Verified"
                value={verifiedCount}
              />

              <StatCard
                label="Unverified"
                value={unverifiedCount}
              />

              <StatCard
                label="Visible Results"
                value={filteredSubscribers.length}
              />
            </section>

            <section className="admin-subscriber-toolbar">
              <div className="admin-subscriber-search">
                <label htmlFor="subscriber-search">
                  Search subscribers
                </label>

                <input
                  id="subscriber-search"
                  type="search"
                  placeholder="Search subscriber email..."
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={exportCSV}
                disabled={filteredSubscribers.length === 0}
                className="admin-subscriber-export-button"
              >
                Export CSV
              </button>
            </section>

            <p className="admin-subscriber-results">
              Showing {filteredSubscribers.length} of{' '}
              {subscribers.length} subscribers
            </p>

            {filteredSubscribers.length === 0 ? (
              <section className="admin-subscribers-empty">
                <h2>No subscribers found</h2>

                <p>
                  Try searching with a different email address.
                </p>
              </section>
            ) : (
              <section className="admin-subscriber-list">
                {filteredSubscribers.map(subscriber => (
                  <SubscriberCard
                    key={subscriber.id}
                    subscriber={subscriber}
                    deleting={
                      deletingId === subscriber.id
                    }
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}

function StatCard({ label, value }) {
  return (
    <article className="admin-subscriber-stat-card">
      <p>{label}</p>
      <h2>{value}</h2>
    </article>
  )
}

function SubscriberCard({
  subscriber,
  deleting,
  onDelete
}) {
  return (
    <article className="admin-subscriber-card">
      <div className="admin-subscriber-information">
        <div className="admin-subscriber-email-row">
          <h2>{subscriber.email}</h2>

          <span
            className={
              subscriber.verified
                ? 'admin-subscriber-status verified'
                : 'admin-subscriber-status unverified'
            }
          >
            {subscriber.verified
              ? 'Verified'
              : 'Unverified'}
          </span>
        </div>

        <div className="admin-subscriber-meta">
          <p>
            <strong>Subscribed:</strong>{' '}
            {subscriber.subscribed_at
              ? new Date(
                  subscriber.subscribed_at
                ).toLocaleString()
              : 'Unknown'}
          </p>

          <p>
            <strong>Brevo list:</strong>{' '}
            VedaByte Newsletter
          </p>

          <p className="admin-subscriber-id">
            <strong>Subscriber ID:</strong>{' '}
            {subscriber.id}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(subscriber.id)}
        disabled={deleting}
        className="admin-subscriber-delete-button"
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </button>
    </article>
  )
}