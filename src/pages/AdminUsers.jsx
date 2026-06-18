import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/adminUserService'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const data = await getAllUsers()
      setUsers(data)
      setLoading(false)
    }

    loadUsers()
  }, [])

  if (loading) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading users...
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
      <h1 style={{ color: '#D4AF37', fontSize: '42px' }}>
        Users
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '30px' }}>
        Registered VedaByte users.
      </p>

      {users.length === 0 ? (
        <div style={boxStyle}>No users found.</div>
      ) : (
        users.map(user => (
          <div key={user.id} style={boxStyle}>
            <p style={{ fontWeight: '800' }}>
              {user.display_name || user.email || 'Unnamed User'}
            </p>

            <p style={metaStyle}>
              Email: {user.email || 'Not available'}
            </p>

            <p style={metaStyle}>
              User ID: {user.id}
            </p>

            <p style={metaStyle}>
              Joined:{' '}
              {user.created_at
                ? new Date(user.created_at).toLocaleString()
                : 'Unknown'}
            </p>
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