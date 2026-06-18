import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()

  const [newsletter, setNewsletter] =
    useState(true)

  const [darkMode, setDarkMode] =
    useState(true)

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px',
        color: '#fff'
      }}
    >
      <h1
        style={{
          color: '#D4AF37',
          marginBottom: '30px'
        }}
      >
        Account Settings
      </h1>

      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '20px',
          padding: '25px',
          marginBottom: '25px'
        }}
      >
        <h3>Email</h3>

        <p
          style={{
            color: '#9CA3AF'
          }}
        >
          {user?.email}
        </p>
      </div>

      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '20px',
          padding: '25px',
          marginBottom: '25px'
        }}
      >
        <h3>Newsletter</h3>

        <label>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() =>
              setNewsletter(!newsletter)
            }
          />
          {' '}
          Receive technology updates
        </label>
      </div>

      <div
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '20px',
          padding: '25px',
          marginBottom: '25px'
        }}
      >
        <h3>Theme</h3>

        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />
          {' '}
          Dark Mode
        </label>
      </div>

      <div
        style={{
          background: '#111111',
          border: '1px solid #7f1d1d',
          borderRadius: '20px',
          padding: '25px'
        }}
      >
        <h3
          style={{
            color: '#ef4444'
          }}
        >
          Danger Zone
        </h3>

        <button
          style={{
            marginTop: '15px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}