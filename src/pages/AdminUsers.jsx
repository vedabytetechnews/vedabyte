import { useEffect, useMemo, useState } from 'react'
import { getAllUsers } from '../services/adminUserService'

import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadUsers() {
      try {
        const data = await getAllUsers()

        if (mounted) {
          setUsers(Array.isArray(data) ? data : [])
        }
      } catch (loadError) {
        console.error('Unable to load users:', loadError)

        if (mounted) {
          setError('Unable to load registered users right now.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      mounted = false
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()

    if (!cleanQuery) {
      return users
    }

    return users.filter(user => {
      const displayName = String(
        user.display_name || ''
      ).toLowerCase()

      const email = String(
        user.email || ''
      ).toLowerCase()

      const userId = String(
        user.id || ''
      ).toLowerCase()

      return (
        displayName.includes(cleanQuery) ||
        email.includes(cleanQuery) ||
        userId.includes(cleanQuery)
      )
    })
  }, [query, users])

  if (loading) {
    return <LoadingScreen message="Loading users..." />
  }

  return (
    <>
      <SEO
        title="Registered Users | VedaByte Admin"
        description="View registered VedaByte users and account information."
        url="https://vedabyte-delta.vercel.app/admin/users"
      />

      <main className="admin-users-page">
        <header className="admin-users-header">
          <p className="admin-users-label">
            USER MANAGEMENT
          </p>

          <h1>Registered Users</h1>

          <p>
            View VedaByte user accounts and registration details.
          </p>
        </header>

        {error ? (
          <section className="admin-users-error">
            <h2>Users unavailable</h2>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <section
              className="admin-user-stats-grid"
              aria-label="User statistics"
            >
              <UserStatCard
                label="Total Users"
                value={users.length}
              />

              <UserStatCard
                label="Visible Results"
                value={filteredUsers.length}
              />

              <UserStatCard
                label="Named Profiles"
                value={
                  users.filter(user => user.display_name).length
                }
              />

              <UserStatCard
                label="Email Accounts"
                value={
                  users.filter(user => user.email).length
                }
              />
            </section>

            <section className="admin-users-toolbar">
              <label htmlFor="admin-user-search">
                Search users
              </label>

              <input
                id="admin-user-search"
                type="search"
                placeholder="Search by name, email or user ID..."
                value={query}
                onChange={event => setQuery(event.target.value)}
              />

              <p>
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </section>

            {filteredUsers.length === 0 ? (
              <section className="admin-users-empty">
                <h2>No users found</h2>

                <p>
                  Try searching with a different name, email address or
                  user ID.
                </p>
              </section>
            ) : (
              <section className="admin-users-list">
                {filteredUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
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

function UserStatCard({ label, value }) {
  return (
    <article className="admin-user-stat-card">
      <p>{label}</p>
      <h2>{value}</h2>
    </article>
  )
}

function UserCard({ user }) {
  const displayName =
    user.display_name ||
    user.email ||
    'Unnamed User'

  const initial = displayName
    .trim()
    .charAt(0)
    .toUpperCase() || 'U'

  return (
    <article className="admin-user-card">
      <div className="admin-user-avatar">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>

      <div className="admin-user-information">
        <h2>{displayName}</h2>

        <div className="admin-user-meta">
          <p>
            <strong>Email:</strong>{' '}
            {user.email || 'Not available'}
          </p>

          <p>
            <strong>Joined:</strong>{' '}
            {user.created_at
              ? new Date(user.created_at).toLocaleString()
              : 'Unknown'}
          </p>

          <p className="admin-user-id">
            <strong>User ID:</strong>{' '}
            {user.id}
          </p>
        </div>
      </div>
    </article>
  )
}