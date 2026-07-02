export default function PremiumCard({
  children,
  className = '',
  style = {},
  glow = false
}) {
  return (
    <div
      className={className}
      style={{
        background:
          'linear-gradient(145deg, rgba(20,20,20,0.98), rgba(8,8,8,0.98))',
        border: glow
          ? '1px solid rgba(212,175,55,0.45)'
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: glow
          ? '0 0 30px rgba(212,175,55,0.18), 10px 10px 24px rgba(0,0,0,0.65), -6px -6px 14px rgba(255,255,255,0.03)'
          : '10px 10px 24px rgba(0,0,0,0.65), -6px -6px 14px rgba(255,255,255,0.03)',
        transition: 'all 0.3s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow =
          '0 0 34px rgba(212,175,55,0.25), 10px 10px 26px rgba(0,0,0,0.7), -6px -6px 16px rgba(255,255,255,0.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = glow
          ? '0 0 30px rgba(212,175,55,0.18), 10px 10px 24px rgba(0,0,0,0.65), -6px -6px 14px rgba(255,255,255,0.03)'
          : '10px 10px 24px rgba(0,0,0,0.65), -6px -6px 14px rgba(255,255,255,0.03)'
      }}
    >
      {children}
    </div>
  )
}