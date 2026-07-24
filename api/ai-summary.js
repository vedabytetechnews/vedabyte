import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY
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
    console.log('===== AI SUMMARY START =====')

    console.log('Node:', process.version)

    console.log('Environment:', {
      groq: !!process.env.GROQ_API_KEY,
      supabaseUrl: !!process.env.SUPABASE_URL,
      serviceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    })

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

    const { data: subscription, error: subscriptionError } =
      await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .in('plan', ['pro', 'coffee'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

    if (subscriptionError) {
      console.error(subscriptionError)

      return res.status(500).json({
        error: 'Supabase error.'
      })
    }

    if (!subscription) {
      return res.status(403).json({
        error: 'Premium membership required.'
      })
    }

    if (
      subscription.expires_at &&
      new Date(subscription.expires_at) < new Date()
    ) {
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
You are VedaByte Intelligence, the premium AI analyst for VedaByte.

Summarize the following technology article.

Title:
${title || "Untitled"}

Description:
${description || "No description"}

Write EXACTLY four bullet points.

Rules:
- Each bullet under 22 words.
- Focus only on important facts.
- Professional editorial tone.
- No introduction.
- No conclusion.
- No markdown headings.
- No emojis.
- No hype.
- No speculation.
- Don't repeat the title.
- Write for developers, founders, startup operators, cybersecurity professionals and technology readers.
`

    console.log('Calling Groq...')

    const response = await ai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 300
    })

    console.log('Groq response received.')

    const summary =
      response.choices?.[0]?.message?.content?.trim() || ''

    if (!summary) {
      throw new Error('Groq returned an empty response.')
    }

    const { error: insertError } = await supabase
      .from('article_summaries')
      .insert([
        {
          article_id: articleId,
          summary
        }
      ])

    if (insertError) {
      console.error('Insert Error')
      console.error(insertError)
    }

    console.log('===== AI SUMMARY END =====')

    return res.status(200).json({
      summary,
      cached: false
    })

  } catch (err) {

    console.error('========== AI SUMMARY ERROR ==========')
    console.error(err)

    return res.status(500).json({
      error: err.message || 'Unable to generate summary.'
    })
  }
}