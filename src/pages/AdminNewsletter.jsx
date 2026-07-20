import { useMemo, useState } from 'react'

import SEO from '../components/SEO'

export default function AdminNewsletter() {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const contentLength = content.length

  const canSubmit = useMemo(() => {
    return (
      subject.trim().length > 0 &&
      content.trim().length > 0 &&
      !loading
    )
  }, [subject, content, loading])

  async function handleSend(event) {
    event.preventDefault()

    if (!canSubmit) return

    setLoading(true)
    setMessage('')
    setStatus('')

    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: subject.trim(),
          content: content.trim()
        })
      })

      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            `Newsletter request failed with status ${response.status}.`
        )
      }

      setStatus('success')
      setMessage(
        'Newsletter campaign was created successfully in Brevo.'
      )
      setSubject('')
      setContent('')
    } catch (sendError) {
      console.error('Newsletter campaign creation failed:', sendError)

      setStatus('error')
      setMessage(
        sendError.message ||
          'The newsletter campaign could not be created.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Send Newsletter | VedaByte Admin"
        description="Create and send VedaByte newsletter campaigns through Brevo."
        url="https://vedabyte-delta.vercel.app/admin/newsletter"
      />

      <main className="admin-newsletter-page">
        <header className="admin-newsletter-header">
          <p className="admin-newsletter-label">
            BREVO CAMPAIGNS
          </p>

          <h1>Send Newsletter</h1>

          <p>
            Create a VedaByte newsletter campaign for your subscribers.
          </p>
        </header>

        <section className="admin-newsletter-layout">
          <form
            onSubmit={handleSend}
            className="admin-newsletter-form"
          >
            <div className="admin-newsletter-field">
              <label htmlFor="newsletter-subject">
                Subject
              </label>

              <input
                id="newsletter-subject"
                type="text"
                value={subject}
                onChange={event => {
                  setSubject(event.target.value)
                  setMessage('')
                  setStatus('')
                }}
                placeholder="Example: This Week in AI"
                maxLength={150}
                required
              />

              <div className="admin-newsletter-field-info">
                <span>
                  Keep the subject clear and specific.
                </span>

                <span>
                  {subject.length}/150
                </span>
              </div>
            </div>

            <div className="admin-newsletter-field">
              <label htmlFor="newsletter-content">
                Newsletter content
              </label>

              <textarea
                id="newsletter-content"
                value={content}
                onChange={event => {
                  setContent(event.target.value)
                  setMessage('')
                  setStatus('')
                }}
                placeholder="Write your newsletter here..."
                rows={12}
                required
              />

              <div className="admin-newsletter-field-info">
                <span>
                  This content will be sent to Brevo.
                </span>

                <span>
                  {contentLength} characters
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="admin-newsletter-submit"
            >
              {loading
                ? 'Creating campaign...'
                : 'Create Brevo Campaign'}
            </button>

            {message && (
              <div
                className={`admin-newsletter-message ${status}`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                <strong>
                  {status === 'success'
                    ? 'Campaign created'
                    : 'Campaign failed'}
                </strong>

                <p>{message}</p>
              </div>
            )}
          </form>

          <aside className="admin-newsletter-guide">
            <p className="admin-newsletter-guide-label">
              BEFORE SENDING
            </p>

            <h2>Campaign checklist</h2>

            <div className="admin-newsletter-checklist">
              <div>
                <span>1</span>
                <p>
                  Confirm the subject has no spelling mistakes.
                </p>
              </div>

              <div>
                <span>2</span>
                <p>
                  Check article links and calls to action.
                </p>
              </div>

              <div>
                <span>3</span>
                <p>
                  Preview the campaign inside Brevo before sending.
                </p>
              </div>

              <div>
                <span>4</span>
                <p>
                  Confirm the correct subscriber list is selected.
                </p>
              </div>
            </div>

            <div className="admin-newsletter-note">
              Creating the campaign does not necessarily mean it is sent
              immediately. Review its status in Brevo after creation.
            </div>
          </aside>
        </section>
      </main>
    </>
  )
}