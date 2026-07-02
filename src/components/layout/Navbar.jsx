import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getUserRole } from '../../services/roleService'
import useSubscription from '../../hooks/useSubscription'

export default function Navbar() {
  const { isPro } = useSubscription()
  const { user, signIn, signOut, isAuthenticated } = useAuth()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    async function checkAdmin() {
      if (!isAuthenticated || !user) {
        setIsAdmin(false)
        return
      }

      const role = await getUserRole(user.id)
      setIsAdmin(role === 'admin')
    }

    checkAdmin()
  }, [user, isAuthenticated])

  const navStyle = `
    :root {
      --gold: #D4AF37;
      --black: #0A0A0A;
      --surface: #111111;
      --surface2: #1A1A1A;
      --border: #232323;
      --text: #FFFFFF;
      --muted: #9CA3AF;
    }

    .vb-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(10,10,10,0.96);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }

    .vb-nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .vb-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .vb-logo-icon {
      width: 34px;
      height: 34px;
      background: var(--gold);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 900;
    }

    .vb-logo-text {
      font-size: 22px;
      font-weight: 900;
      color: var(--text);
      letter-spacing: -1px;
    }

    .vb-logo-text span {
      color: var(--gold);
    }

    .vb-links {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .vb-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px;
      padding: 8px 12px;
      border-radius: 8px;
      transition: 0.2s;
    }

    .vb-link:hover,
    .vb-link.active {
      color: var(--gold);
      background: var(--surface2);
    }

    .vb-live {
      color: var(--muted);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-right: 8px;
    }

    .vb-live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22C55E;
    }

    .vb-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .vb-search-btn,
    .vb-signin,
    .vb-user {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 10px;
      height: 38px;
    }

    .vb-search-btn {
      width: 38px;
      cursor: pointer;
    }

    .vb-signin {
      padding: 0 16px;
      color: var(--gold);
      font-weight: 700;
      cursor: pointer;
    }

    .vb-signin:hover {
      background: var(--gold);
      color: #000;
    }

    .vb-user-wrap {
      position: relative;
    }

    .vb-user {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 6px 4px 12px;
      cursor: pointer;
    }

    .vb-user-name {
      color: var(--text);
      font-size: 13px;
      font-weight: 600;
    }

    .vb-avatar {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--gold);
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-weight: 800;
    }

    .vb-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vb-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 8px;
      min-width: 190px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-6px);
      transition: 0.2s;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .vb-dropdown.open {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    .vb-dropdown-item {
      width: 100%;
      padding: 10px 12px;
      border: none;
      background: transparent;
      color: var(--muted);
      text-align: left;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
    }

    .vb-dropdown-item:hover {
      background: var(--surface2);
      color: var(--text);
    }

    .vb-dropdown-item.admin {
      color: var(--gold);
      font-weight: 700;
    }

    .vb-dropdown-item.danger:hover {
      color: #EF4444;
    }

    .vb-dropdown-divider {
      height: 1px;
      background: var(--border);
      margin: 6px 0;
    }

    .vb-hamburger {
      display: none;
    }

    .vb-mobile-menu {
      display: none;
    }

    @media(max-width: 900px) {
      .vb-links {
        display: none;
      }

      .vb-hamburger {
        display: flex;
        width: 38px;
        height: 38px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: var(--surface);
        color: var(--text);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 4px;
      }

      .vb-hamburger span {
        width: 17px;
        height: 2px;
        background: currentColor;
      }

      .vb-mobile-menu.open {
        display: flex;
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: #0A0A0A;
        border-bottom: 1px solid var(--border);
        padding: 18px;
        z-index: 99;
        flex-direction: column;
        gap: 8px;
      }

      .vb-mobile-link {
        color: var(--text);
        text-decoration: none;
        padding: 12px;
        border-radius: 10px;
        background: var(--surface);
        border: none;
        text-align: left;
      }

      .vb-mobile-link.admin {
        color: var(--gold);
        font-weight: 800;
      }
    }
  `

  return (
    <>
      <style>{navStyle}</style>

      <nav className={`vb-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="vb-nav-inner">
          <a className="vb-logo" href="/">
            <div className="vb-logo-icon">V</div>
            <span className="vb-logo-text">
  {isPro ? 'VedaByte ⭐ PRO' : 'VedaByte'}
</span>
          </a>

          <div className="vb-links">
            <div className="vb-live">
              <span className="vb-live-dot"></span> LIVE
            </div>

            <a className="vb-link active" href="/">Home</a>
            <a className="vb-link" href="/category/ai">AI</a>
            <a className="vb-link" href="/category/startups">Startups</a>
            <a className="vb-link" href="/category/security">Security</a>
            <a className="vb-link" href="/search">Search</a>
            <a className="vb-link" href="/search">Search</a>

{isAuthenticated && (
  <a className="vb-link" href="/premium">
    Premium
  </a>
)}

            {isAuthenticated && (
              <a className="vb-link" href="/bookmarks">Saved</a>
            )}

            {isAdmin && (
              <a className="vb-link" href="/admin">Admin</a>
            )}
          </div>

          

          <div className="vb-right">
            <button
              className="vb-search-btn"
              onClick={() => window.location.href = '/search'}
            >
              🔍
            </button>

            {isAuthenticated ? (
              <div className="vb-user-wrap" ref={dropdownRef}>
                <div
                  className="vb-user"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="vb-user-name">
                    {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
                  </span>

                  <div className="vb-avatar">
                    {user?.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="avatar"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      'U'
                    )}
                  </div>
                </div>

                <div className={`vb-dropdown${dropdownOpen ? ' open' : ''}`}>
                  <button
                    className="vb-dropdown-item"
                    onClick={() => window.location.href = '/profile'}
                  >
                    Profile
                  </button>

                  <button
                    className="vb-dropdown-item"
                    onClick={() => window.location.href = '/settings'}
                  >
                    Settings
                  </button>

                  <button
                    className="vb-dropdown-item"
                    onClick={() => window.location.href = '/bookmarks'}
                  >
                    Saved Articles
                  </button>

                  {isAdmin && (
                    <>
                      <div className="vb-dropdown-divider"></div>

                      <button
                        className="vb-dropdown-item admin"
                        onClick={() => window.location.href = '/admin'}
                      >
                        Admin Dashboard
                      </button>
                    </>
                  )}

                  <div className="vb-dropdown-divider"></div>

                  <button
                    className="vb-dropdown-item danger"
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button className="vb-signin" onClick={signIn}>
                Sign In
              </button>
            )}

            <button
              className="vb-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`vb-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a className="vb-mobile-link" href="/">Home</a>
        <a className="vb-mobile-link" href="/category/ai">AI</a>
        <a className="vb-mobile-link" href="/category/startups">Startups</a>
        <a className="vb-mobile-link" href="/category/security">Security</a>
        <a className="vb-mobile-link" href="/search">Search</a>

        {isAuthenticated && (
          <>
            <a className="vb-mobile-link" href="/bookmarks">
              Saved Articles
            </a>

            <a className="vb-mobile-link" href="/profile">
              Profile
            </a>

            <a className="vb-mobile-link" href="/settings">
              Settings
            </a>
          </>
        )}

        {isAdmin && (
          <a className="vb-mobile-link admin" href="/admin">
            Admin Dashboard
          </a>
        )}

        {!isAuthenticated ? (
          <button className="vb-mobile-link" onClick={signIn}>
            Sign In with Google
          </button>
        ) : (
          <button className="vb-mobile-link" onClick={signOut}>
            Sign Out
          </button>
        )}
      </div>
    </>
  )
}