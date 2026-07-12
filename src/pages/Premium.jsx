import DashboardHero from '../components/premium/DashboardHero'
import WeeklyBriefCard from '../components/premium/WeeklyBriefCard'
import LatestPremiumArticles from '../components/premium/LatestPremiumArticles'
import SavedPremiumArticles from '../components/premium/SavedPremiumArticles'
import ReadingStats from '../components/premium/ReadingStats'
import SubscriptionSettings from '../components/premium/SubscriptionSettings'
import PaymentHistory from '../components/premium/PaymentHistory'
import ContinueReading from '../components/premium/ContinueReading'
import ReadingHistory from '../components/premium/ReadingHistory'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useSubscription from '../hooks/useSubscription'

export default function Premium() {
  const { user } = useAuth()
const { isPro, subscription } = useSubscription()
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: '#fff',
        padding: '150px 20px 80px'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <DashboardHero />

        <div style={membershipCardStyle}>
  <div>
    <p style={membershipLabelStyle}>MEMBERSHIP STATUS</p>

    <h2 style={membershipTitleStyle}>
      {isPro ? 'Premium Active' : 'Free Plan'}
    </h2>

    <p style={membershipTextStyle}>
      {isPro
        ? `Welcome ${user?.user_metadata?.full_name || 'VedaByte member'}. Your premium access is active.`
        : 'Upgrade to unlock premium intelligence features.'}
    </p>
  </div>

  <Link to="/membership" style={membershipButtonStyle}>
    View Membership
  </Link>
</div>

        <div style={mainGridStyle}>
          <div style={leftColumnStyle}>
            <WeeklyBriefCard />
            <LatestPremiumArticles />
            <SavedPremiumArticles />
            <ContinueReading />
            <ReadingHistory />
          </div>

          <div style={rightColumnStyle}>
            <ReadingStats />
            <SubscriptionSettings />
            <PaymentHistory />
          </div>
        </div>
      </div>
    </div>
  )
}

const mainGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.6fr) minmax(320px, 0.9fr)',
  gap: '30px',
  marginTop: '30px'
}

const leftColumnStyle = {
  display: 'grid',
  gap: '30px',
  alignContent: 'start'
}

const rightColumnStyle = {
  display: 'grid',
  gap: '30px',
  alignContent: 'start'
}

const membershipCardStyle = {
  background: 'linear-gradient(145deg, #111111, #070707)',
  border: '1px solid rgba(212,175,55,0.35)',
  borderRadius: '22px',
  padding: '26px',
  marginBottom: '28px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap'
}

const membershipLabelStyle = {
  color: '#D4AF37',
  letterSpacing: '.25em',
  fontSize: '11px',
  fontWeight: '900',
  marginBottom: '10px'
}

const membershipTitleStyle = {
  color: '#fff',
  fontSize: '30px',
  margin: 0
}

const membershipTextStyle = {
  color: '#9CA3AF',
  marginTop: '10px'
}

const membershipButtonStyle = {
  background: 'linear-gradient(135deg,#D4AF37,#FFE08A)',
  color: '#000',
  padding: '13px 22px',
  borderRadius: '999px',
  fontWeight: '900',
  textDecoration: 'none'
}