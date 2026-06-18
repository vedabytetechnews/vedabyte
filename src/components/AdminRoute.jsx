import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { getUserRole } from '../services/roleService'

export default function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth()

  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkRole() {
      if (!isAuthenticated || !user) {
        setLoading(false)
        return
      }

      const role = await getUserRole(user.id)

      setIsAdmin(role === 'admin')
      setLoading(false)
    }

    checkRole()
  }, [user, isAuthenticated])

  if (loading) {
    return (
      <div
        style={{
          color: '#fff',
          padding: '60px 20px'
        }}
      >
        Checking permissions...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          padding: '100px 20px'
        }}
      >
        <h1 style={{ color: '#ef4444' }}>
          Access Denied
        </h1>

        <p style={{ color: '#9CA3AF' }}>
          Administrator access required.
        </p>
      </div>
    )
  }

  return children
}