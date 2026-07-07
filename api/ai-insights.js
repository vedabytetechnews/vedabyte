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
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {
    const { title, description, userId } = req.body

    if (!userId) {
      return res.status(401).json({
        error: 'User login required.'
      })
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .in('plan', ['pro', 'coffee'])
      .maybeSingle()

    if (!subscription) {
      return res.status(403).json({
        error: 'Premium required.'
      })
    }

    const articleId = createArticleId(title, description)

    const { data: cached } = await supabase
      .from('article_insights')
      .select('insights')
      .eq('article_id', articleId)
      .maybeSingle()

    if (cached?.insights) {
      return res.json({
        insights: cached.insights,
        cached: true
      })
    }

    const prompt = `
You are VedaByte Intelligence.

Analyze this technology news.

TITLE:
${title}

DESCRIPTION:
${description}

Return exactly in this format.

Why This Matters
...

Business Impact
...

Who Should Care
...

Market Outlook
...

Rules:
- No markdown
- No introduction
- No conclusion
- Professional technology journalism
- Never mention AI model names.
`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    })

    const insights = response.text

    await supabase
      .from('article_insights')
      .insert({
        article_id: articleId,
        insights
      })

    return res.json({
      insights,
      cached: false
    })
  } catch (err) {
    console.error(err)

    return res.status(500).json({
      error: 'Unable to generate insights.'
    })
  }
}