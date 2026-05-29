import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, signIn, signOut, isAuthenticated } = useAuth()

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-500 font-bold text-xl">Veda</span>
        <span className="text-white font-bold text-xl">Byte</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">Home</a>
        <a href="/search" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">Search</a>
        {isAuthenticated && (
          <a href="/bookmarks" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">Bookmarks</a>
        )}
      </div>

      {/* Auth Button */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <img src={user?.user_metadata?.avatar_url} className="w-8 h-8 rounded-full" alt="avatar" />
            <button onClick={signOut} className="text-gray-400 hover:text-red-400 text-sm transition-colors">
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={signIn} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}