import { GoogleGenAI } from '@google/genai'
import { createClient } from '@supabase/supabase-js'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function createArticleId(title, description) {
  return `${title || ''}-${description || ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 180)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, description, userId } = req.body || {}

    if (!userId) {
      return res.status(401).json({
        error: 'User login required.'
      })
    }

    if (!title && !description) {
      return res.status(400).json({
        error: 'Article title or description is required.'
      })
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Summary service is not configured.'
      })
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .in('plan', ['pro', 'coffee'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!subscription) {
      return res.status(403).json({
        error: 'Premium membership required.'
      })
    }

    if (subscription.expires_at && new Date(subscription.expires_at) < new Date()) {
      return res.status(403).json({
        error: 'Premium membership expired.'
      })
    }

    const articleId = createArticleId(title, description)

    const { data: cachedSummary } = await supabase
      .from('article_summaries')
      .select('summary')
      .eq('article_id', articleId)
      .maybeSingle()

    if (cachedSummary?.summary) {
      return res.status(200).json({
        summary: cachedSummary.summary,
        cached: true
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

    await supabase
      .from('article_summaries')
      .insert([
        {
          article_id: articleId,
          summary
        }
      ])

    return res.status(200).json({
      summary,
      cached: false
    })
  } catch (error) {
    console.error('VEDABYTE SUMMARY ERROR:', error)

    return res.status(500).json({
      error: 'Unable to generate summary right now.'
    })
  }
}