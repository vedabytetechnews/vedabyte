import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, description } = req.body || {}

    if (!title && !description) {
      return res.status(400).json({
        error: 'Article title or description is required.'
      })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'AI service is not configured.'
      })
    }

    const prompt = `
You are VedaByte Intelligence, an editorial assistant for a premium technology news platform.

Summarize this technology article for developers, founders, startup operators, cybersecurity professionals, and technology readers.

Article Title:
${title || 'Untitled article'}

Article Description:
${description || 'No description provided.'}

Output exactly 4 concise bullet points.

Rules:
- No intro
- No conclusion
- No markdown heading
- No mention of Gemini, Google, AI model, chatbot, or artificial intelligence
- Make it sound like premium technology editorial analysis
- Keep each bullet under 22 words
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    })

    const summary = response?.text || ''

    if (!summary.trim()) {
      return res.status(500).json({
        error: 'No summary generated.'
      })
    }

    return res.status(200).json({
      summary
    })
  } catch (error) {
    console.error('VEDABYTE SUMMARY ERROR:', error)

    return res.status(500).json({
      error: 'Unable to generate summary right now.'
    })
  }
}