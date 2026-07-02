import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, description } = req.body

    const prompt = `
Summarize this technology article.

Title:
${title}

Description:
${description}

Return exactly 4 short bullet points.
No introduction.
No conclusion.
`

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    })

    return res.status(200).json({
      summary: response.text
    })
  } catch (error) {
    console.error('GEMINI SUMMARY ERROR:', error)

    return res.status(500).json({
      error: 'Unable to generate AI summary.'
    })
  }
}