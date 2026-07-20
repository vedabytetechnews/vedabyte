import { writeFile } from 'node:fs/promises'
import news from '../src/data/news.js'

const SITE_URL = 'https://vedabyte-delta.vercel.app'

const staticPages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily'
  },
  {
    path: '/search',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    path: '/category/ai',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    path: '/category/startups',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    path: '/category/security',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    path: '/pricing',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/privacy-policy',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/terms',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/refund-policy',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/contact',
    priority: '0.5',
    changefreq: 'monthly'
  }
]

function escapeXml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function createUrlEntry({
  url,
  lastModified,
  changefreq,
  priority
}) {
  return `
  <url>
    <loc>${escapeXml(url)}</loc>
    ${
      lastModified
        ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
        : ''
    }
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const staticEntries = staticPages.map(page =>
  createUrlEntry({
    url: `${SITE_URL}${page.path}`,
    changefreq: page.changefreq,
    priority: page.priority
  })
)

const articleEntries = news
  .filter(article => article?.id)
  .map(article => {
    const publishedDate =
      article.updatedAt ||
      article.publishedAt ||
      article.created_at

    const validDate =
      publishedDate &&
      !Number.isNaN(new Date(publishedDate).getTime())
        ? new Date(publishedDate).toISOString()
        : null

    return createUrlEntry({
      url: `${SITE_URL}/article/${encodeURIComponent(article.id)}`,
      lastModified: validDate,
      changefreq: 'weekly',
      priority: article.isPremium ? '0.7' : '0.8'
    })
  })

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...articleEntries].join('\n')}
</urlset>
`

await writeFile(
  new URL('../public/sitemap.xml', import.meta.url),
  sitemap,
  'utf8'
)

console.log(
  `Sitemap generated with ${
    staticEntries.length + articleEntries.length
  } URLs.`
)