export default function createArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',

    headline: article.title,

    description:
      article.description ||
      'Read the latest technology news and analysis on VedaByte.',

    image: [
      article.image ||
        'https://vedabyte-delta.vercel.app/og-image.png'
    ],

    datePublished:
      article.publishedAt ||
      new Date().toISOString(),

    dateModified:
      article.updatedAt ||
      article.publishedAt ||
      new Date().toISOString(),

    author: {
      '@type': 'Organization',
      name: article.source || 'VedaByte Editorial'
    },

    publisher: {
      '@type': 'Organization',
      name: 'VedaByte',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vedabyte-delta.vercel.app/pwa-512.png'
      }
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vedabyte-delta.vercel.app/article/${article.id}`
    }
  }
}