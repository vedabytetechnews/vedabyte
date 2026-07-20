import { Link } from 'react-router-dom'

export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a few moments.',
  buttonText = 'Go Home',
  buttonLink = '/'
}) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}
    >
      <div
        style={{
          maxWidth: '650px',
          width: '100%',
          background: '#101010',
          border: '1px solid rgba(212,175,55,.25)',
          borderRadius: 24,
          padding: 40,
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            color: '#D4AF37',
            marginBottom: 20
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: '#9CA3AF',
            lineHeight: 1.8,
            marginBottom: 30
          }}
        >
          {message}
        </p>

        <Link
          to={buttonLink}
          style={{
            display: 'inline-block',
            background: '#D4AF37',
            color: '#000',
            padding: '14px 24px',
            borderRadius: 12,
            textDecoration: 'none',
            fontWeight: 700
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}