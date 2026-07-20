import { useState } from 'react'

import { useAuth } from '../context/AuthContext'
import SEO from '../components/SEO'

export default function Settings() {
  const { user } = useAuth()

  const [newsletter, setNewsletter] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  function handleDeleteAccount() {
    alert(
      'Account deletion is not connected yet. We will add the secure deletion flow later.'
    )
  }

  return (
    <>
      <SEO
        title="VedaByte Account Settings"
        description="Manage your VedaByte account preferences, newsletter settings and theme."
        url="https://vedabyte-delta.vercel.app/settings"
      />

      <main className="settings-page">
        <header className="settings-header">
          <p className="settings-label">
            VEDABYTE ACCOUNT
          </p>

          <h1 className="settings-title">
            Account Settings
          </h1>

          <p className="settings-subtitle">
            Manage your account preferences, notifications and appearance.
          </p>
        </header>

        <section className="settings-card">
          <div className="settings-card-content">
            <div>
              <h2 className="settings-card-title">Email</h2>

              <p className="settings-card-description">
                The email connected to your VedaByte account.
              </p>
            </div>

            <p className="settings-email">
              {user?.email || 'No email available'}
            </p>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-content">
            <div>
              <h2 className="settings-card-title">
                Newsletter
              </h2>

              <p className="settings-card-description">
                Receive technology updates, weekly briefs and important
                VedaByte announcements.
              </p>
            </div>

            <label className="settings-toggle-row">
              <span>
                {newsletter ? 'Enabled' : 'Disabled'}
              </span>

              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => {
                  setNewsletter(current => !current)
                }}
                aria-label="Receive technology updates"
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-content">
            <div>
              <h2 className="settings-card-title">
                Theme
              </h2>

              <p className="settings-card-description">
                Control the appearance of your VedaByte experience.
              </p>
            </div>

            <label className="settings-toggle-row">
              <span>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => {
                  setDarkMode(current => !current)
                }}
                aria-label="Use dark mode"
              />
            </label>
          </div>
        </section>

        <section className="settings-danger-card">
          <div>
            <p className="settings-danger-label">
              DANGER ZONE
            </p>

            <h2 className="settings-danger-title">
              Delete Account
            </h2>

            <p className="settings-card-description">
              Permanently remove your VedaByte account and associated
              profile data. This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            className="settings-delete-button"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </section>
      </main>
    </>
  )
}