export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { subject, content } = req.body

  if (!subject || !content) {
    return res.status(400).json({
      success: false,
      message: 'Subject and content are required'
    })
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        name: subject,
        subject,
        sender: {
          name: 'VedaByte',
          email: 'vedabytenews@gmail.com'
        },
        type: 'classic',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; background:#0b0b0b; color:#ffffff; padding:30px;">
            <h1 style="color:#D4AF37;">VedaByte</h1>
            <div style="font-size:16px; line-height:1.7;">
              ${content.replace(/\n/g, '<br />')}
            </div>
          </div>
        `,
        recipients: {
          listIds: [Number(process.env.BREVO_LIST_ID)]
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: 'Brevo campaign creation failed',
        details: data
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Newsletter campaign created in Brevo',
      campaign: data
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while sending newsletter'
    })
  }
}