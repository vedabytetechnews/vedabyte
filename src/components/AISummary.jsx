import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSubscription from '../hooks/useSubscription'
import PremiumCard from './PremiumCard'

export default function AISummary({ article }) {
  const { loading, isPro } = useSubscription()

  const [summary, setSummary] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  async function generateSummary() {
    try {
      setGenerating(true)
      setError('')

      const res = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: article?.title,
          description: article?.description
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate summary')
      }

      setSummary(data.summary)
    } catch (err) {
      console.error(err)
      setError('Unable to generate AI summary right now.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <PremiumCard glow style={{ marginTop: '35px' }}>
        <p style={{ color: '#D4AF37' }}>Checking AI access...</p>
      </PremiumCard>
    )
  }

  if (!isPro) {
    return (
      <PremiumCard glow style={{ marginTop: '35px' }}>
        <p style={labelStyle}>PRO AI FEATURE</p>
        <div style={iconStyle}>🔒</div>
        <h2 style={titleStyle}>AI Summary Locked</h2>

        <p style={textStyle}>
          Upgrade to VedaByte Pro to unlock instant AI-powered summaries,
          premium reports and weekly intelligence briefs.
        </p>

        <Link to="/pricing" style={buttonStyle}>
          Upgrade to Pro
        </Link>
      </PremiumCard>
    )
  }

  return (
    <PremiumCard glow style={{ marginTop: '35px' }}>
      <div style={topRowStyle}>
        <div>
          <p style={labelStyle}>VEDABYTE AI</p>
          <h2 style={titleStyle}>30 Second Summary</h2>
        </div>

        <div style={iconStyle}>🤖</div>
      </div>

      <div style={dividerStyle}></div>

      {!summary ? (
        <>
          <p style={textStyle}>
            Generate a smart AI summary for this article using Gemini.
          </p>

          <button
            onClick={generateSummary}
            disabled={generating}
            style={buttonStyle}
          >
            {generating ? 'Generating...' : 'Generate AI Summary'}
          </button>
        </>
      ) : (
        <div style={summaryStyle}>
          {summary.split('\n').map((line, index) => (
            <p key={index} style={summaryLineStyle}>
              {line}
            </p>
          ))}
        </div>
      )}

      {error && <p style={errorStyle}>{error}</p>}

      <p style={footerStyle}>Powered by Gemini AI</p>
    </PremiumCard>
  )
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.28em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '10px'
}

const titleStyle = {
  color: '#FFFFFF',
  fontSize: '28px',
  lineHeight: '1.15',
  margin: 0
}

const textStyle = {
  color: '#C7C7C7',
  lineHeight: '1.8',
  maxWidth: '680px',
  marginBottom: '22px'
}

const topRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '18px'
}

const iconStyle = {
  width: '58px',
  height: '58px',
  borderRadius: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  background: 'linear-gradient(145deg, #151515, #060606)',
  border: '1px solid rgba(212,175,55,0.25)'
}

const dividerStyle = {
  height: '1px',
  background:
    'linear-gradient(90deg, transparent, rgba(212,175,55,0.65), transparent)',
  margin: '24px 0'
}

const summaryStyle = {
  color: '#DADADA',
  lineHeight: '1.8'
}

const summaryLineStyle = {
  marginBottom: '10px'
}

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #D4AF37, #FFE08A)',
  color: '#000',
  border: 'none',
  padding: '13px 24px',
  borderRadius: '999px',
  fontWeight: '900',
  textDecoration: 'none',
  cursor: 'pointer'
}

const footerStyle = {
  color: '#777',
  marginTop: '16px',
  fontSize: '12px'
}

const errorStyle = {
  color: '#ef4444',
  marginTop: '14px'
}