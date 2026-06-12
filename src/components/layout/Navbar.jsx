import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, signIn, signOut, isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  const navStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    :root {
      --gold: #2563EB;
--gold-light: #3B82F6;
--gold-dim: rgba(37,99,235,0.12);

--black: #FFFFFF;
--surface: #FFFFFF;
--surface2: #F3F4F6;

--border: #E5E7EB;
--border-hover: #2563EB;

--text: #1F2937;
--text-muted: #6B7280;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--black); color: var(--text); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .vb-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s ease; border-bottom: 1px solid transparent; }
    .vb-nav.scrolled {
 background: rgba(255,255,255,0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom-color: var(--border); }
    .vb-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
    .vb-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; flex-shrink: 0; }
    .vb-logo-icon { width: 32px; height: 32px; background: var(--gold); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .vb-logo-icon svg { width: 18px; height: 18px; }
    .vb-logo-text { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; letter-spacing: -0.03em; color: var(--text); }
    .vb-logo-text span { color: var(--gold); }
    .vb-links { display: flex; align-items: center; gap: 2px; position: absolute; left: 50%; transform: translateX(-50%); }
    .vb-link { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-muted); text-decoration: none; transition: all 0.2s; letter-spacing: 0.01em; cursor: pointer; border: none; background: none; }
    .vb-link:hover { color: var(--text); background: var(--surface2); }
    .vb-link.active { color: var(--gold); }
    .vb-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .vb-search-btn { width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .vb-search-btn:hover { border-color: var(--border-hover); color: var(--gold); }
    .vb-signin { padding: 7px 16px; border-radius: 8px; border: 1px solid var(--gold); background: transparent; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em; }
    .vb-signin:hover { background: var(--gold); color: var(--black); font-weight: 700; }
    .vb-user-wrap { position: relative; }
    .vb-user { display: flex; align-items: center; gap: 8px; padding: 4px 4px 4px 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: all 0.2s; }
    .vb-user:hover { border-color: var(--border-hover); }
    .vb-user-name { font-size: 13px; font-weight: 500; color: var(--text); max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .vb-avatar { width: 28px; height: 28px; border-radius: 7px; border: 1.5px solid var(--gold); overflow: hidden; flex-shrink: 0; background: var(--surface2); display: flex; align-items: center; justify-content: center; }
    .vb-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .vb-avatar-fallback { font-size: 12px; font-weight: 700; color: var(--gold); font-family: 'Syne', sans-serif; }
    .vb-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 6px; min-width: 170px; opacity: 0; pointer-events: none; transform: translateY(-6px); transition: all 0.2s ease; box-shadow: 0 20px 50px rgba(0,0,0,0.7); }
    .vb-dropdown.open { opacity: 1; pointer-events: all; transform: translateY(0); }
    .vb-dropdown-item { padding: 9px 12px; border-radius: 8px; font-size: 13px; color: var(--text-muted); cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 8px; border: none; background: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; }
    .vb-dropdown-item:hover { background: var(--surface2); color: var(--text); }
    .vb-dropdown-item.danger:hover { color: #EF4444; }
    .vb-dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }
    .vb-live { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; }
    .vb-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)} }
    .vb-hamburger { display: none; width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); cursor: pointer; align-items: center; justify-content: center; flex-direction: column; gap: 4px; }
    .vb-hamburger span { display: block; width: 16px; height: 1.5px; background: currentColor; border-radius: 2px; transition: all 0.2s; }
    .vb-mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 16px 24px 24px; flex-direction: column; gap: 4px; z-index: 99; }
    .vb-mobile-menu.open { display: flex; }
    .vb-mobile-link { padding: 10px 12px; border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all 0.15s; text-decoration: none; border: none; background: none; text-align: left; font-family: 'DM Sans', sans-serif; }
    .vb-mobile-link:hover { background: var(--surface2); color: var(--text); }
    @media (max-width: 900px) { .vb-links { display: none; } .vb-hamburger { display: flex; } }
    @media (max-width: 600px) { .vb-live { display: none; } .vb-user-name { display: none; } }
  `

  return (
    <>
      <style>{navStyle}</style>

      <nav className={`vb-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="vb-nav-inner">

          {/* Logo */}
          <a className="vb-logo" href="/">
            <div className="vb-logo-icon">
              <svg viewBox="0 0 96 96" fill="none">
                <path d="M20 24 L48 68 L76 24" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="48" cy="76" r="6" fill="#0A0A0A"/>
              </svg>
            </div>
            <span className="vb-logo-text"><span>Veda</span>Byte</span>
          </a>

          {/* Center */}
          <div className="vb-links">
            <div className="vb-live">
              <span className="vb-live-dot"></span>Live
            </div>
            <div style={{width:'1px',height:'14px',background:'var(--border)',margin:'0 8px'}}></div>
            <a className="vb-link active" href="/">Home</a>
            <a className="vb-link" href="/search">Search</a>
            {isAuthenticated && <a className="vb-link" href="/bookmarks">Saved</a>}
          </div>

          {/* Right */}
          <div className="vb-right">
            <button className="vb-search-btn" onClick={() => window.location.href='/search'}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {isAuthenticated ? (
              <div className="vb-user-wrap" ref={dropdownRef}>
                <div className="vb-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="vb-user-name">
                    {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
                  </span>
                  <div className="vb-avatar">
                    {user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="avatar" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="vb-avatar-fallback">
                        {(user?.user_metadata?.full_name || 'U')[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`vb-dropdown${dropdownOpen ? ' open' : ''}`}>
                  <button className="vb-dropdown-item" onClick={() => { window.location.href='/bookmarks'; setDropdownOpen(false) }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    Saved Articles
                  </button>
                  <div className="vb-dropdown-divider"></div>
                  <button className="vb-dropdown-item danger" onClick={() => { signOut(); setDropdownOpen(false) }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button className="vb-signin" onClick={signIn}>Sign In</button>
            )}

            <button className="vb-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      <div className={`vb-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a className="vb-mobile-link" href="/">Home</a>
        <a className="vb-mobile-link" href="/search">Search</a>
        {isAuthenticated && <a className="vb-mobile-link" href="/bookmarks">Saved Articles</a>}
        <div style={{height:'1px',background:'var(--border)',margin:'8px 0'}}></div>
        {!isAuthenticated
          ? <button className="vb-mobile-link" onClick={signIn} style={{color:'var(--gold)'}}>Sign In with Google</button>
          : <button className="vb-mobile-link" onClick={signOut} style={{color:'#EF4444'}}>Sign Out</button>
        }
      </div>
    </>
  )
}