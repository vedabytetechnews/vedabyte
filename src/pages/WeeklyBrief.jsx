import SEO from '../components/SEO'

const briefSections = [
  {
    title: 'Artificial Intelligence',
    text:
      'AI adoption continues to accelerate across enterprise software, developer tools and automation platforms. Companies are focusing on reasoning, coding assistance and workflow automation.'
  },
  {
    title: 'Cybersecurity',
    text:
      'Security teams are watching a rise in AI-assisted phishing, identity attacks and automated social engineering campaigns.'
  },
  {
    title: 'Startups',
    text:
      'AI-focused startups continue attracting investor interest, especially in infrastructure, productivity, cybersecurity and vertical AI tools.'
  },
  {
    title: 'Cloud & Infrastructure',
    text:
      'Cloud providers are competing heavily around AI infrastructure, model deployment, GPU availability and enterprise AI services.'
  }
]

export default function WeeklyBrief() {
  return (
    <>
      <SEO
        title="Week 27 Technology Brief | VedaByte Premium"
        description="A premium weekly overview of major developments in AI, cybersecurity, startups, cloud infrastructure and emerging technology."
        url="https://vedabyte-delta.vercel.app/premium/weekly-brief"
      />

      <main className="weekly-brief-page">
        <div className="weekly-brief-container">
          <header className="weekly-brief-header">
            <p className="weekly-brief-label">
              WEEKLY INTELLIGENCE
            </p>

            <h1 className="weekly-brief-title">
              Week 27 Technology Brief
            </h1>

            <p className="weekly-brief-intro">
              A premium weekly overview of the most important
              movements in AI, cybersecurity, startups, cloud
              infrastructure and emerging technology.
            </p>

            <div className="weekly-brief-meta">
              <span>July 2026</span>
              <span aria-hidden="true">•</span>
              <span>Premium Report</span>
            </div>
          </header>

          <section
            className="weekly-brief-sections"
            aria-label="Weekly technology intelligence sections"
          >
            {briefSections.map((section, index) => (
              <article
                key={section.title}
                className="weekly-brief-card"
              >
                <div className="weekly-brief-card-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="weekly-brief-card-content">
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}