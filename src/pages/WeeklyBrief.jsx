export default function WeeklyBrief() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: '#fff',
        padding: '150px 20px 80px'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={labelStyle}>WEEKLY INTELLIGENCE</p>

        <h1 style={titleStyle}>
          Week 27 Technology Brief
        </h1>

        <p style={introStyle}>
          A premium weekly overview of the most important movements in AI,
          cybersecurity, startups, cloud infrastructure and emerging technology.
        </p>

        <section style={sectionStyle}>
          <h2>Artificial Intelligence</h2>
          <p>
            AI adoption continues to accelerate across enterprise software,
            developer tools and automation platforms. Companies are focusing on
            reasoning, coding assistance and workflow automation.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>Cybersecurity</h2>
          <p>
            Security teams are watching a rise in AI-assisted phishing, identity
            attacks and automated social engineering campaigns.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>Startups</h2>
          <p>
            AI-focused startups continue attracting investor interest, especially
            in infrastructure, productivity, cybersecurity and vertical AI tools.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2>Cloud & Infrastructure</h2>
          <p>
            Cloud providers are competing heavily around AI infrastructure,
            model deployment, GPU availability and enterprise AI services.
          </p>
        </section>
      </div>
    </div>
  )
}

const labelStyle = {
  color: '#D4AF37',
  letterSpacing: '0.3em',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
  marginBottom: '16px'
}

const titleStyle = {
  fontSize: 'clamp(42px, 7vw, 78px)',
  lineHeight: '1.05',
  marginBottom: '24px'
}

const introStyle = {
  color: '#A1A1AA',
  fontSize: '18px',
  lineHeight: '1.8',
  marginBottom: '40px'
}

const sectionStyle = {
  background: 'linear-gradient(145deg, #111111, #070707)',
  border: '1px solid rgba(212,175,55,0.22)',
  borderRadius: '24px',
  padding: '28px',
  marginBottom: '24px',
  color: '#D1D5DB',
  lineHeight: '1.8'
}