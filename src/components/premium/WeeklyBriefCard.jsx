import PremiumCard from '../PremiumCard'
import { Link } from 'react-router-dom'

const briefItems = [
  {
    category: 'Artificial Intelligence',
    title: 'OpenAI accelerates enterprise AI adoption.',
    trend: '↑'
  },
  {
    category: 'Cybersecurity',
    title: 'Increase in AI-assisted phishing attacks.',
    trend: '⚠'
  },
  {
    category: 'Startups',
    title: 'Indian AI startups continue attracting investment.',
    trend: '🚀'
  },
  {
    category: 'Cloud',
    title: 'Cloud providers focus on AI infrastructure.',
    trend: '☁'
  }
]

export default function WeeklyBriefCard() {
  return (
    <PremiumCard glow style={{ marginTop: '30px' }}>
      <div style={headerStyle}>
        <div>
          <p style={labelStyle}>WEEKLY INTELLIGENCE</p>
          <h2 style={titleStyle}>
            Week 27 Technology Brief
          </h2>
        </div>

        <span style={dateStyle}>
          July 2026
        </span>
      </div>

      <div style={timelineStyle}>
        {briefItems.map(item => (
          <div key={item.category} style={itemStyle}>
            <div style={trendStyle}>
              {item.trend}
            </div>

            <div>
              <h3 style={categoryStyle}>
                {item.category}
              </h3>

              <p style={textStyle}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link to="/premium/weekly-brief" style={buttonStyle}>
  Read Full Weekly Brief →
</Link>
    </PremiumCard>
  )
}

const headerStyle = {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'28px'
}

const labelStyle = {
  color:'#D4AF37',
  fontSize:'11px',
  letterSpacing:'0.3em',
  fontWeight:'900'
}

const titleStyle = {
  color:'#fff',
  fontSize:'34px',
  margin:'10px 0 0'
}

const dateStyle = {
  color:'#999'
}

const timelineStyle = {
  display:'grid',
  gap:'20px'
}

const itemStyle = {
  display:'flex',
  gap:'20px',
  alignItems:'flex-start'
}

const trendStyle = {
  width:'42px',
  height:'42px',
  borderRadius:'12px',
  background:'#1a1a1a',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontSize:'20px'
}

const categoryStyle = {
  color:'#D4AF37',
  margin:'0 0 6px'
}

const textStyle = {
  color:'#D0D0D0',
  margin:0,
  lineHeight:'1.7'
}

const buttonStyle = {
  marginTop:'28px',
  background:'linear-gradient(135deg,#D4AF37,#FFE08A)',
  color:'#000',
  border:'none',
  padding:'14px 26px',
  borderRadius:'999px',
  fontWeight:'800',
  cursor:'pointer',
  textDecoration: 'none',
display: 'inline-flex'
}