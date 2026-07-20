import React from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Application Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={pageStyle}>
          <div style={cardStyle}>
            <div style={iconStyle}>⚠️</div>

            <h1 style={titleStyle}>Something went wrong</h1>

            <p style={textStyle}>
              VedaByte encountered an unexpected error.
              Please refresh the page or return to the homepage.
            </p>

            <div style={buttonContainer}>
              <button
                onClick={() => window.location.reload()}
                style={primaryButton}
              >
                Refresh Page
              </button>

              <Link to="/" style={secondaryButton}>
                Home
              </Link>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

const pageStyle = {
  minHeight: '100vh',
  background: '#080808',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
}

const cardStyle = {
  maxWidth: '620px',
  width: '100%',
  background: '#111',
  border: '1px solid rgba(212,175,55,.3)',
  borderRadius: '18px',
  padding: '50px',
  textAlign: 'center',
  color: '#fff'
}

const iconStyle = {
  fontSize: '64px',
  marginBottom: '20px'
}

const titleStyle = {
  fontSize: '40px',
  marginBottom: '16px'
}

const textStyle = {
  color: '#aaa',
  lineHeight: 1.7,
  marginBottom: '32px'
}

const buttonContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '14px',
  flexWrap: 'wrap'
}

const primaryButton = {
  padding: '14px 24px',
  borderRadius: '10px',
  border: 'none',
  background: '#D4AF37',
  color: '#000',
  fontWeight: 700,
  cursor: 'pointer'
}

const secondaryButton = {
  padding: '14px 24px',
  borderRadius: '10px',
  border: '1px solid #D4AF37',
  color: '#D4AF37',
  textDecoration: 'none'
}