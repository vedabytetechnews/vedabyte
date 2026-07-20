import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

import NewsCard from '../components/news/NewsCard'
import Newsletter from '../components/newsletter/Newsletter'
import ErrorState from '../components/ErrorState'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'

import localNews from '../data/news'

import { getTopTechNews } from '../services/newsService'
import { getTrendingArticleIds } from '../services/trendingService'
import { getCommentCount } from '../services/commentStatsService'

import {
  getFeaturedArticleIds,
  getEditedArticleMap
} from '../services/articleAdminService'

import organizationSchema from '../seo/organizationSchema'
import websiteSchema from '../seo/websiteSchema'

import { handleImageError } from '../lib/imageFallback'

export default function Home() {
  const [articles, setArticles] = useState(localNews)
  const [trendingArticles, setTrendingArticles] = useState([])
  const [mostDiscussed, setMostDiscussed] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingLiveNews, setUsingLiveNews] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadNews() {
      try {
        const editedMap = getEditedArticleMap()

        const editedLocalNews = localNews.map(article => ({
          ...article,
          ...(editedMap[article.id] || {})
        }))

        const liveArticles = await getTopTechNews()

        const finalArticles =
          Array.isArray(liveArticles) && liveArticles.length > 0
            ? liveArticles
            : editedLocalNews

        if (!isMounted) return

        setUsingLiveNews(
          Array.isArray(liveArticles) && liveArticles.length > 0
        )

        setArticles(finalArticles)

        const trendingIds = await getTrendingArticleIds()

        if (!isMounted) return

        const matchedTrending = Array.isArray(trendingIds)
          ? trendingIds
              .map(item => {
                const article = finalArticles.find(
                  currentArticle =>
                    currentArticle.id === item.article_id
                )

                if (!article) return null

                return {
                  ...article,
                  likes: item.likes
                }
              })
              .filter(Boolean)
          : []

        setTrendingArticles(matchedTrending)

        const articlesWithComments = await Promise.all(
          finalArticles.map(async article => {
            try {
              const comments = await getCommentCount(article.id)

              return {
                ...article,
                comments: Number(comments) || 0
              }
            } catch (commentError) {
              console.error(
                `Unable to load comments for ${article.id}:`,
                commentError
              )

              return {
                ...article,
                comments: 0
              }
            }
          })
        )

        if (!isMounted) return

        const discussedArticles = articlesWithComments
          .filter(article => article.comments > 0)
          .sort((a, b) => b.comments - a.comments)
          .slice(0, 4)

        setMostDiscussed(discussedArticles)
      } catch (loadError) {
        console.error('Unable to load Home page news:', loadError)

        if (isMounted) {
          setError(loadError)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadNews()

    return () => {
      isMounted = false
    }
  }, [])

  const editedLocalNews = useMemo(() => {
    const editedMap = getEditedArticleMap()

    return localNews.map(article => ({
      ...article,
      ...(editedMap[article.id] || {})
    }))
  }, [])

  const featured = useMemo(() => {
    const featuredIds = getFeaturedArticleIds()

    const selectedLocalArticle = editedLocalNews.find(article =>
      featuredIds.includes(article.id)
    )

    return selectedLocalArticle || articles[0] || null
  }, [articles, editedLocalNews])

  const aiNews = useMemo(
    () =>
      articles.filter(
        article =>
          article.category?.toLowerCase() === 'ai'
      ),
    [articles]
  )

  const startupNews = useMemo(
    () =>
      articles.filter(
        article =>
          article.category?.toLowerCase() === 'startups'
      ),
    [articles]
  )

  const securityNews = useMemo(
    () =>
      articles.filter(
        article =>
          article.category?.toLowerCase() === 'security'
      ),
    [articles]
  )

  function saveLiveArticle(article) {
    if (!article?.isLive) return

    try {
      localStorage.setItem(
        `vedabyte_live_article_${article.id}`,
        JSON.stringify(article)
      )
    } catch (storageError) {
      console.error('Unable to save live article:', storageError)
    }
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load news"
        message="We couldn't load the latest technology news. Please refresh the page or try again later."
        buttonText="Go Home"
        buttonLink="/"
      />
    )
  }

  return (
    <>
      <SEO
        title="VedaByte | AI, Startup & Technology News"
        description="Stay updated with AI, Startups, Cybersecurity and Technology news from around the world."
        url="https://vedabyte.tech/"
      />

      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <main className="min-h-screen overflow-x-hidden bg-[#080808] text-[#f7f2e7]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-10">
          <section
            aria-label="Latest update"
            className="vb-slide-down mb-6 overflow-hidden rounded-xl border border-[#e2c76e]/30 bg-gradient-to-r from-[#b99735] via-[#d4af37] to-[#ebd477] text-[#080808] shadow-[0_12px_40px_rgba(212,175,55,0.12)] sm:mb-8"
          >
            <div className="flex min-h-12 items-center gap-2 px-4 py-3 sm:px-5">
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs"
              >
                ●
              </span>

              <p className="min-w-0 text-xs font-extrabold uppercase leading-5 tracking-[0.04em] sm:text-sm sm:tracking-[0.08em]">
                {usingLiveNews
                  ? 'Live Technology News'
                  : 'Breaking News'}
                <span className="mx-2 opacity-60">•</span>
                Latest AI, startup and cybersecurity news
              </p>
            </div>
          </section>

          {loading && (
            <div
              role="status"
              className="vb-fade-in mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#c8c2b5] sm:mb-8 sm:px-5"
            >
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-[#d4af37]/25 border-t-[#d4af37] vb-spin" />

              <span>Loading the latest technology news...</span>
            </div>
          )}

          {featured && (
            <section
              aria-label="Featured and trending news"
              className="mb-12 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-6 xl:mb-16"
            >
              <Link
                to={`/article/${featured.id}`}
                onClick={() => saveLiveArticle(featured)}
                className="vb-hover-lift vb-image-zoom vb-slide-up group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#101010] text-inherit no-underline shadow-[0_20px_60px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171717] sm:aspect-video lg:aspect-[16/9]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={handleImageError}
                    width="1200"
                    height="675"
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {featured.category && (
                    <span className="absolute left-4 top-4 rounded-full border border-[#d4af37]/35 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0d978] backdrop-blur-md sm:left-5 sm:top-5 sm:text-xs">
                      {featured.category}
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-7 lg:p-8">
                  <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#d4af37] sm:text-xs">
                    Featured story
                  </p>

                  <h1 className="max-w-4xl text-[clamp(1.65rem,5.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#fffaf0] transition-colors duration-200 group-hover:text-[#f3dc89]">
                    {featured.title}
                  </h1>

                  {featured.description && (
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-[#bcb6aa] sm:text-base sm:leading-7 lg:text-[17px]">
                      {featured.description}
                    </p>
                  )}

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#e4c85e]">
                    Read full story
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>

              <aside className="vb-slide-left min-w-0 rounded-2xl border border-white/10 bg-[#101010] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8e887d]">
                      Editor’s radar
                    </p>

                    <h2 className="text-xl font-bold tracking-[-0.02em] text-[#e4c85e] sm:text-2xl">
                      Trending
                    </h2>
                  </div>

                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.65)] vb-pulse-soft"
                  />
                </div>

                <div className="divide-y divide-white/[0.08]">
                  {articles.slice(1, 6).map((article, index) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      onClick={() => saveLiveArticle(article)}
                      className="group grid min-w-0 grid-cols-[28px_minmax(0,1fr)] gap-3 py-4 text-inherit no-underline first:pt-0 last:pb-0 focus-visible:outline-none"
                    >
                      <span className="pt-0.5 text-xs font-extrabold text-[#706a60] transition-colors group-hover:text-[#d4af37]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 text-sm font-semibold leading-5 text-[#eee8dc] transition-colors group-hover:text-[#d4af37] sm:leading-6">
                        {article.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>
            </section>
          )}

          {trendingArticles.length > 0 && (
            <NewsSection
              eyebrow="Popular with readers"
              title="Trending Now"
              icon="🔥"
            >
              <ArticleGrid>
                {trendingArticles.map(article => (
                  <article
                    key={article.id}
                    className="min-w-0 overflow-hidden rounded-2xl"
                  >
                    <div className="flex min-h-10 items-center bg-gradient-to-r from-[#b99530] to-[#ddc25f] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-black">
                      ❤️ {article.likes || 0} likes
                    </div>

                    <NewsCard {...article} />
                  </article>
                ))}
              </ArticleGrid>
            </NewsSection>
          )}

          {mostDiscussed.length > 0 && (
            <NewsSection
              eyebrow="Community conversation"
              title="Most Discussed"
              icon="💬"
            >
              <ArticleGrid>
                {mostDiscussed.map(article => (
                  <article
                    key={article.id}
                    className="min-w-0 overflow-hidden rounded-2xl"
                  >
                    <div className="flex min-h-10 items-center border border-b-0 border-white/10 bg-[#141414] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-[#d4af37]">
                      💬 {article.comments}{' '}
                      {article.comments === 1
                        ? 'comment'
                        : 'comments'}
                    </div>

                    <NewsCard {...article} />
                  </article>
                ))}
              </ArticleGrid>
            </NewsSection>
          )}

          {!usingLiveNews && (
            <>
              {aiNews.length > 0 && (
                <NewsSection
                  eyebrow="Artificial intelligence"
                  title="AI News"
                  icon="🤖"
                  viewAllLink="/category/ai"
                >
                  <ArticleGrid>
                    {aiNews.slice(0, 4).map(article => (
                      <div key={article.id} className="min-w-0">
                        <NewsCard {...article} />
                      </div>
                    ))}
                  </ArticleGrid>
                </NewsSection>
              )}

              {startupNews.length > 0 && (
                <NewsSection
                  eyebrow="Founders and innovation"
                  title="Startup News"
                  icon="🚀"
                  viewAllLink="/category/startups"
                >
                  <ArticleGrid>
                    {startupNews.slice(0, 4).map(article => (
                      <div key={article.id} className="min-w-0">
                        <NewsCard {...article} />
                      </div>
                    ))}
                  </ArticleGrid>
                </NewsSection>
              )}

              {securityNews.length > 0 && (
                <NewsSection
                  eyebrow="Digital defence"
                  title="Cybersecurity News"
                  icon="🔐"
                  viewAllLink="/category/security"
                >
                  <ArticleGrid>
                    {securityNews.slice(0, 4).map(article => (
                      <div key={article.id} className="min-w-0">
                        <NewsCard {...article} />
                      </div>
                    ))}
                  </ArticleGrid>
                </NewsSection>
              )}
            </>
          )}

          <NewsSection
            eyebrow={
              usingLiveNews
                ? 'Updated from live sources'
                : 'The latest from VedaByte'
            }
            title="Latest Technology News"
            icon="📰"
          >
            <ArticleGrid>
              {articles.map(article => (
                <div key={article.id} className="min-w-0">
                  <NewsCard {...article} />
                </div>
              ))}
            </ArticleGrid>
          </NewsSection>

          <div className="vb-slide-up mt-14 sm:mt-16 lg:mt-20">
  <Newsletter />
</div>
        </div>
      </main>
    </>
  )
}

function NewsSection({
  eyebrow,
  title,
  icon,
  viewAllLink,
  children
}) {
  return (
    <section className="mb-12 min-w-0 sm:mb-14 lg:mb-16">
      <header className="mb-5 flex min-w-0 items-end justify-between gap-4 border-b border-white/10 pb-4 sm:mb-6">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f897e] sm:text-xs">
              {eyebrow}
            </p>
          )}

          <h2 className="flex min-w-0 items-center gap-2.5 text-[clamp(1.45rem,4vw,2.15rem)] font-bold leading-tight tracking-[-0.03em] text-[#fff8e9]">
            <span aria-hidden="true" className="shrink-0">
              {icon}
            </span>

            <span>{title}</span>
          </h2>
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="vb-underline hidden shrink-0 text-sm font-bold text-[#d4af37] no-underline sm:inline-flex"
          >
            View all
          </Link>
        )}
      </header>

      {children}
    </section>
  )
}

function ArticleGrid({ children }) {
  return (
    <div className="vb-stagger grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
      {children}
    </div>
  )
}