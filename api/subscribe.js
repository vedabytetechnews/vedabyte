export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        updateEnabled: true
      })
    })

    const data = await response.json()

    if (!response.ok && response.status !== 400) {
      return res.status(response.status).json(data)
    }

    return res.status(200).json({
      success: true,
      message: 'Added to Brevo'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Brevo error'
    })
  }
}