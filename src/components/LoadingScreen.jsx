export default function LoadingScreen({
  message = 'Loading VedaByte...'
}) {
  return (
    <main style={pageStyle}>
      <div style={glowStyle} />

      <div style={contentStyle}>
        <div style={logoStyle}>V</div>

        <div style={spinnerStyle} />

        <p style={messageStyle}>{message}</p>
      </div>
    </main>
  )
}

const pageStyle = {
  minHeight: 'calc(100vh - 160px)',
  background: '#080808',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  position: 'relative',
  overflow: 'hidden'
}

const glowStyle = {
  position: 'absolute',
  width: '320px',
  height: '320px',
  borderRadius: '50%',
  background: 'rgba(212, 175, 55, 0.12)',
  filter: 'blur(100px)',
  pointerEvents: 'none'
}

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1
}

const logoStyle = {
  width: '72px',
  height: '72px',
  borderRadius: '18px',
  background: 'linear-gradient(135deg, #D4AF37, #FFE08A)',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '34px',
  fontWeight: '900',
  marginBottom: '26px',
  boxShadow: '0 0 35px rgba(212, 175, 55, 0.22)'
}

const spinnerStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  border: '4px solid #232323',
  borderTopColor: '#D4AF37',
  animation: 'vedabyte-spin 0.9s linear infinite'
}

const messageStyle = {
  color: '#9CA3AF',
  marginTop: '18px',
  fontSize: '15px',
  letterSpacing: '0.04em'
}