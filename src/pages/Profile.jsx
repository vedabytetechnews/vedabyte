import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProfileStats } from '../services/profileService'

export default function Profile() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      const data = await getProfileStats(user.id)
      setStats(data)
    }

    loadProfile()
  }, [user])

  if (!isAuthenticated) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Please sign in to view your profile.
      </div>
    )
  }

  if (!stats) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading profile...
      </div>
    )
  }

  const name = user?.user_metadata?.full_name || 'VedaByte User'
  const email = user?.email
  const avatar = user?.user_metadata?.avatar_url

  const totalEngagement =
    stats.bookmarks +
    stats.likes +
    stats.comments

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '45px 20px',
        color: '#fff'
      }}
    >
      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '24px',
          padding: '35px',
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          flexWrap: 'wrap',
          marginBottom: '35px'
        }}
      >
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '22px',
            background: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            color: '#000',
            fontSize: '36px',
            fontWeight: '900'
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            name[0]
          )}
        </div>

        <div>
          <h1
            style={{
              color: '#D4AF37',
              fontSize: '38px',
              marginBottom: '8px'
            }}
          >
            {name}
          </h1>

          <p style={{ color: '#9CA3AF' }}>
            {email}
          </p>

          <p
            style={{
              color: '#6B7280',
              marginTop: '8px'
            }}
          >
            Member Since:{' '}
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : 'Unknown'}
          </p>
        </div>
      </div>

      <h2
        style={{
          color: '#D4AF37',
          marginBottom: '20px'
        }}
      >
        Your Activity
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
          gap: '24px'
        }}
      >
        <div style={cardStyle}>
          <p style={labelStyle}>Bookmarks</p>
          <h3 style={numberStyle}>{stats.bookmarks}</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Likes</p>
          <h3 style={numberStyle}>{stats.likes}</h3>
        </div>

        <div style={cardStyle}>
          <p style={labelStyle}>Comments</p>
          <h3 style={numberStyle}>{stats.comments}</h3>
        </div>
      </div>

      <div
        style={{
          marginTop: '35px',
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '20px',
          padding: '30px'
        }}
      >
        <h3
          style={{
            color: '#D4AF37',
            marginBottom: '20px'
          }}
        >
          Account Overview
        </h3>

        <p style={{ color: '#D1D5DB' }}>
          Total Engagement:{' '}
          <strong>{totalEngagement}</strong>
        </p>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '12px'
          }}
        >
          User ID: {user.id.slice(0, 12)}...
        </p>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '12px'
          }}
        >
          Account Type: Standard Member
        </p>
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '20px',
  padding: '28px'
}

const labelStyle = {
  color: '#9CA3AF',
  marginBottom: '12px'
}

const numberStyle = {
  color: '#FFFFFF',
  fontSize: '42px'
}