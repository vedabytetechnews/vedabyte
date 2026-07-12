import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserSubscription } from '../services/subscriptionService'

export default function useSubscription() {
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState(null)
  const [plan, setPlan] = useState('free')
  const [isPro, setIsPro] = useState(false)

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null)
      setPlan('free')
      setIsPro(false)
      setLoading(false)
      return
    }

    try {
      setLoading(true)

      const data = await getUserSubscription(user.id)

      setSubscription(data)

      const currentPlan = data?.plan || 'free'
      const currentStatus = data?.status || 'inactive'

      setPlan(currentPlan)
      const hasPaidAccess =
  (currentPlan === 'pro' || currentPlan === 'coffee') &&
  currentStatus === 'active'

setIsPro(hasPaidAccess)
    } catch (error) {
      console.error('Error fetching subscription:', error)
      setSubscription(null)
      setPlan('free')
      setIsPro(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [user])

  return {
    loading,
    subscription,
    plan,
    isPro,
    refreshSubscription: fetchSubscription,
  }
}