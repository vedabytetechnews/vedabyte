import { useEffect, useState } from 'react'
import news from '../../data/news'
import PremiumCard from '../PremiumCard'
import useSubscription from '../../hooks/useSubscription'
import { useAuth } from '../../context/AuthContext'
import { getBookmarks } from '../../services/bookmarkService'

export default function ReadingStats() {
  const { plan } = useSubscription()
  const { user, isAuthenticated } = useAuth()
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    async function loadSavedCount() {
      if (!isAuthenticated || !user) {
        setSavedCount(0)
        return
      }

      const data = await getBookmarks(user.id)
      setSavedCount(data.length)
    }

    loadSavedCount()
  }, [user, isAuthenticated])

  const premiumCount = news.filter(article => article.isPremium).length
  const totalArticles = news.length

  const stats = [
    {
      label: 'Premium Articles',
      value: premiumCount,
      text: 'Unlocked with Pro'
    },
    {
      label: 'Saved Articles',
      value: savedCount,
      text: 'From your bookmarks'
    },
    {
      label: 'AI Summaries',
      value: plan === 'pro' ? 'ON' : 'OFF',
      text: plan === 'pro' ? 'Unlocked' : 'Upgrade required'
    },
    {
      label: 'Total Articles',
      value: totalArticles,
      text: 'Available on VedaByte'
    }
  ]

  return (
    <div style={gridStyle}>
      {stats.map(item => (
        <PremiumCard key={item.label}>
          <p style={labelStyle}>{item.label}</p>
          <h3 style={valueStyle}>{item.value}</h3>
          <p style={textStyle}>{item.text}</p>
        </PremiumCard>
      ))}
    </div>
  )
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '18px'
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.25em',
  fontSize: '10px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '12px'
}

const valueStyle = {
  color: '#fff',
  fontSize: '34px',
  margin: '0 0 8px'
}

const textStyle = {
  color: '#9CA3AF',
  margin: 0,
  lineHeight: '1.6'
}