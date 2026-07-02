import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useSubscription from '../hooks/useSubscription'

export default function PremiumRoute({ children }) {
  const { user, loading: authLoading } = useAuth()
  const { loading: subLoading, isPro } = useSubscription()

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-yellow-500">Checking membership...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!isPro) {
    return <Navigate to="/pricing" replace />
  }

  return children
}