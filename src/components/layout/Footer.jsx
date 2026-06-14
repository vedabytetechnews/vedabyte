export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '80px',
        borderTop: '1px solid #232323',
        background: '#0A0A0A',
        padding: '35px 20px',
        color: '#9CA3AF'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <h2
            style={{
              color: '#D4AF37',
              marginBottom: '10px'
            }}
          >
            VedaByte
          </h2>

          <p>
            AI • Startups • Cybersecurity • Cloud • Gadgets
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '18px',
            flexWrap: 'wrap'
          }}
        >
          <a href="/" style={{ color: '#9CA3AF' }}>Home</a>
          <a href="/search" style={{ color: '#9CA3AF' }}>Search</a>
          <a href="/category/ai" style={{ color: '#9CA3AF' }}>AI</a>
          <a href="/category/security" style={{ color: '#9CA3AF' }}>Security</a>
        </div>
      </div>

      <p
        style={{
          maxWidth: '1400px',
          margin: '25px auto 0',
          color: '#6B7280'
        }}
      >
        © 2026 VedaByte. All rights reserved.
      </p>
    </footer>
  )
}