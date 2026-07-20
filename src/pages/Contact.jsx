import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const contactCards = [
  {
    title: 'General Enquiries',
    description:
      'Email us regarding partnerships, media requests, technical support or Premium Membership.',
    email: 'vedabytenews@gmail.com'
  },
  {
    title: 'Business',
    description:
      'Advertising, sponsorships, startup collaborations, product launches and strategic partnerships.'
  },
  {
    title: 'Support',
    description:
      'Need help with your account or Premium Membership? We will respond as quickly as possible.'
  },
  {
    title: 'Response Time',
    description:
      'Most emails receive a response within 24–48 business hours.'
  }
]

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact | VedaByte"
        description="Contact the VedaByte team for support, partnerships, advertising and Premium Membership."
        url="https://vedabyte-delta.vercel.app/contact"
      />

      <main className="contact-page">
        <div className="contact-container">
          <header className="contact-header">
            <p className="contact-label">CONTACT</p>

            <h1 className="contact-title">
              Contact VedaByte
            </h1>

            <p className="contact-subtitle">
              We'd love to hear from you.
            </p>
          </header>

          <section className="contact-grid">
            {contactCards.map(card => (
              <article
                key={card.title}
                className="contact-card"
              >
                <h2>{card.title}</h2>

                <p>{card.description}</p>

                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="contact-email"
                  >
                    {card.email}
                  </a>
                )}
              </article>
            ))}
          </section>

          <div className="contact-back">
            <Link to="/">
              ← Back to VedaByte
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}