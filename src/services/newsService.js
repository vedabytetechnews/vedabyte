const API_KEY = import.meta.env.VITE_NEWS_API_KEY

function createSlug(text, fallback) {
  if (!text) return fallback

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || fallback
}

function formatArticle(article, index, category = 'Technology') {
  const title = article.title || 'Untitled Technology Story'

  return {
    id: createSlug(title, `live-news-${index}`),
    title,
    description:
      article.description ||
      article.content ||
      'Latest technology update from VedaByte.',
    image:
      article.urlToImage ||
      `https://picsum.photos/600/400?random=${index + 100}`,
    category,
    source: article.source?.name || 'Unknown Source',
    author: article.author || 'VedaByte Wire',
    publishedAt: article.publishedAt || new Date().toISOString(),
    url: article.url || null,
    isLive: true
  }
}

async function fetchNews(url, category) {
  try {
    if (!API_KEY) {
      console.warn('Missing VITE_NEWS_API_KEY')
      return []
    }

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'ok' || !Array.isArray(data.articles)) {
      console.error('NewsAPI returned error:', data)
      return []
    }

    return data.articles
      .filter(article => article.title && article.title !== '[Removed]')
      .map((article, index) => formatArticle(article, index, category))
  } catch (error) {
    console.error('News API Error:', error)
    return []
  }
}

export async function getTopTechNews() {
  const url =
    `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=24&apiKey=${API_KEY}`

  return fetchNews(url, 'Technology')
}

export async function getNewsByQuery(query, category) {
  const url =
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=24&apiKey=${API_KEY}`

  return fetchNews(url, category)
}

export async function getLiveCategoryNews(categorySlug) {
  const map = {
    ai: {
      query: 'artificial intelligence OR OpenAI OR AI',
      category: 'AI'
    },
    startups: {
      query: 'startup funding OR venture capital OR tech startup',
      category: 'Startups'
    },
    security: {
      query: 'cybersecurity OR ransomware OR data breach',
      category: 'Security'
    },
    programming: {
      query: 'software development OR programming OR developers',
      category: 'Programming'
    },
    cloud: {
      query: 'cloud computing OR AWS OR Azure OR Google Cloud',
      category: 'Cloud'
    },
    gadgets: {
      query: 'gadgets OR smartphones OR consumer technology',
      category: 'Gadgets'
    }
  }

  const selected = map[categorySlug] || {
    query: 'technology',
    category: 'Technology'
  }

  return getNewsByQuery(selected.query, selected.category)
}