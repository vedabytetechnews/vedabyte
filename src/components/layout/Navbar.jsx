import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { getUserRole } from '../../services/roleService'
import useSubscription from '../../hooks/useSubscription'

import './Navbar.css'

const navigationItems = [
  {
    label: 'AI',
    path: '/category/ai'
  },
  {
    label: 'Startups',
    path: '/category/startups'
  },
  {
    label: 'Security',
    path: '/category/security'
  }
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isPro } = useSubscription()

  const {
    user,
    signIn,
    signOut,
    isAuthenticated
  } = useAuth()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      )

      document.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [])

  useEffect(() => {
    async function checkAdmin() {
      if (!isAuthenticated || !user) {
        setIsAdmin(false)
        return
      }

      try {
        const role = await getUserRole(user.id)
        setIsAdmin(role === 'admin')
      } catch (error) {
        console.error(
          'Navbar admin check failed:',
          error
        )

        setIsAdmin(false)
      }
    }

    checkAdmin()
  }, [user, isAuthenticated])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) {
        setMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function isActive(path) {
    if (path === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(path)
  }

  async function handleSignOut() {
    try {
      await signOut()

      setDropdownOpen(false)
      setMobileOpen(false)

      navigate('/')
    } catch (error) {
      console.error('Sign-out failed:', error)
    }
  }

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  function handleMobileSignIn() {
    closeMobileMenu()
    signIn()
  }

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.user_metadata?.name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'User'

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null

  const avatarLetter =
    firstName.charAt(0).toUpperCase() || 'U'

  return (
    <>
      <header
        className={`vb-navbar${
          scrolled ? ' vb-navbar--scrolled' : ''
        }`}
      >
        <nav
          className="vb-navbar__inner"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="vb-navbar__brand"
            aria-label="VedaByte home"
          >
            <span
              className="vb-navbar__brand-mark"
              aria-hidden="true"
            >
              V
            </span>

            <span className="vb-navbar__brand-content">
              <span className="vb-navbar__brand-name">
                VedaByte

                {isPro && (
                  <span className="vb-navbar__pro-mark">
                    PRO
                  </span>
                )}
              </span>

              <span className="vb-navbar__brand-tagline">
                Technology Intelligence
              </span>
            </span>
          </Link>

          <div className="vb-navbar__desktop">
            <div className="vb-navbar__links">
              {navigationItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`vb-navbar__link${
                    isActive(item.path)
                      ? ' vb-navbar__link--active'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated && (
                <Link
                  to="/premium"
                  className={`vb-navbar__link vb-navbar__link--premium${
                    isActive('/premium')
                      ? ' vb-navbar__link--active'
                      : ''
                  }`}
                >
                  Premium
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`vb-navbar__link${
                    isActive('/admin')
                      ? ' vb-navbar__link--active'
                      : ''
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="vb-navbar__actions">
            <button
              type="button"
              className="vb-navbar__search"
              onClick={() => navigate('/search')}
              aria-label="Open search"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <span>Search</span>
            </button>

            {isAuthenticated ? (
              <div
                className="vb-navbar__account"
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="vb-navbar__account-button"
                  onClick={() => {
                    setDropdownOpen(current => !current)
                  }}
                  aria-label="Open account menu"
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                >
                  <span className="vb-navbar__avatar">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      avatarLetter
                    )}
                  </span>

                  <svg
                    className="vb-navbar__account-arrow"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="vb-navbar__dropdown"
                    role="menu"
                  >
                    <div className="vb-navbar__dropdown-user">
                      <span className="vb-navbar__dropdown-name">
                        {firstName}
                      </span>

                      <span className="vb-navbar__dropdown-email">
                        {user?.email}
                      </span>
                    </div>

                    <div className="vb-navbar__dropdown-divider" />

                    <Link
                      to="/profile"
                      className="vb-navbar__dropdown-item"
                      role="menuitem"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="vb-navbar__dropdown-item"
                      role="menuitem"
                    >
                      Settings
                    </Link>

                    <Link
                      to="/membership"
                      className="vb-navbar__dropdown-item"
                      role="menuitem"
                    >
                      My Membership
                    </Link>

                    <Link
                      to="/payments"
                      className="vb-navbar__dropdown-item"
                      role="menuitem"
                    >
                      Payment History
                    </Link>

                    <Link
                      to="/bookmarks"
                      className="vb-navbar__dropdown-item"
                      role="menuitem"
                    >
                      Saved Articles
                    </Link>

                    {isAdmin && (
                      <>
                        <div className="vb-navbar__dropdown-divider" />

                        <Link
                          to="/admin"
                          className="vb-navbar__dropdown-item vb-navbar__dropdown-item--gold"
                          role="menuitem"
                        >
                          Admin Dashboard
                        </Link>
                      </>
                    )}

                    <div className="vb-navbar__dropdown-divider" />

                    <button
                      type="button"
                      className="vb-navbar__dropdown-item vb-navbar__dropdown-item--danger"
                      onClick={handleSignOut}
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="vb-navbar__signin"
                onClick={signIn}
              >
                Sign In
              </button>
            )}

            <button
              type="button"
              className={`vb-navbar__menu-button${
                mobileOpen
                  ? ' vb-navbar__menu-button--open'
                  : ''
              }`}
              onClick={() => {
                setMobileOpen(current => !current)
              }}
              aria-label={
                mobileOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={mobileOpen}
              aria-controls="vedabyte-mobile-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          id="vedabyte-mobile-navigation"
          className="vb-mobile-navigation"
        >
          <div className="vb-mobile-navigation__content">
            <div className="vb-mobile-navigation__label">
              Explore
            </div>

            <Link
              to="/"
              className={`vb-mobile-navigation__link${
                isActive('/')
                  ? ' vb-mobile-navigation__link--active'
                  : ''
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            {navigationItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`vb-mobile-navigation__link${
                  isActive(item.path)
                    ? ' vb-mobile-navigation__link--active'
                    : ''
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/search"
              className={`vb-mobile-navigation__link${
                isActive('/search')
                  ? ' vb-mobile-navigation__link--active'
                  : ''
              }`}
              onClick={closeMobileMenu}
            >
              Search
            </Link>

            {isAuthenticated && (
              <>
                <div className="vb-mobile-navigation__divider" />

                <div className="vb-mobile-navigation__label">
                  Your account
                </div>

                <Link
                  to="/premium"
                  className={`vb-mobile-navigation__link vb-mobile-navigation__link--gold${
                    isActive('/premium')
                      ? ' vb-mobile-navigation__link--active'
                      : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  Premium
                </Link>

                <Link
                  to="/bookmarks"
                  className="vb-mobile-navigation__link"
                  onClick={closeMobileMenu}
                >
                  Saved Articles
                </Link>

                <Link
                  to="/membership"
                  className="vb-mobile-navigation__link"
                  onClick={closeMobileMenu}
                >
                  My Membership
                </Link>

                <Link
                  to="/payments"
                  className="vb-mobile-navigation__link"
                  onClick={closeMobileMenu}
                >
                  Payment History
                </Link>

                <Link
                  to="/profile"
                  className="vb-mobile-navigation__link"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="vb-mobile-navigation__link"
                  onClick={closeMobileMenu}
                >
                  Settings
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="vb-mobile-navigation__link vb-mobile-navigation__link--gold"
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </Link>
            )}

            <div className="vb-mobile-navigation__footer">
              {!isAuthenticated ? (
                <button
                  type="button"
                  className="vb-mobile-navigation__primary"
                  onClick={handleMobileSignIn}
                >
                  Sign In with Google
                </button>
              ) : (
                <button
                  type="button"
                  className="vb-mobile-navigation__danger"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
