import DashboardHero from '../components/premium/DashboardHero'
import WeeklyBriefCard from '../components/premium/WeeklyBriefCard'
import LatestPremiumArticles from '../components/premium/LatestPremiumArticles'
import SavedPremiumArticles from '../components/premium/SavedPremiumArticles'
import ReadingStats from '../components/premium/ReadingStats'
import SubscriptionSettings from '../components/premium/SubscriptionSettings'
import PaymentHistory from '../components/premium/PaymentHistory'
import ContinueReading from '../components/premium/ContinueReading'
import ReadingHistory from '../components/premium/ReadingHistory'

export default function Premium() {
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