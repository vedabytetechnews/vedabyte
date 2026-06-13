const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export async function getTopTechNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=24&apiKey=${API_KEY}`
    )

    const data = await response.json()

console.log(data)
console.log('TOTAL ARTICLES:', data.articles?.length)

    if (!data.articles) {
      return []
    }

    return data.articles.map((article, index) => ({
      id: `news-${index}`,
      title: article.title || 'Untitled Article',
      description: article.description || 'No description available.',
      image:
        article.urlToImage ||
        'https://picsum.photos/600/400',
      category: 'Technology',
      url: article.url,
      source: article.source?.name || 'Unknown Source',
      publishedAt: article.publishedAt
    }))
  } catch (error) {
    console.error('News API Error:', error)
    return []
  }
}