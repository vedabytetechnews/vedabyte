import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import news from '../data/news'

import { useAuth } from '../context/AuthContext'

import { saveBookmark } from '../services/bookmarkService'
import { getEditedArticleMap } from '../services/articleAdminService'

import PremiumArticleGate from '../components/PremiumArticleGate'
import AISummary from '../components/AISummary'

import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import createArticleSchema from '../seo/articleSchema'
import createBreadcrumbSchema from '../seo/breadcrumbSchema'

import { handleImageError } from '../lib/imageFallback'

import {
  getLikeCount,
  hasUserLiked,
  likeArticle,
  unlikeArticle
} from '../services/likeService'

import {
  getComments,
  addComment,
  deleteComment
} from '../services/commentService'

export default function Article() {
  const { id } = useParams()

  const {
    user,
    isAuthenticated
  } = useAuth()

  const [saved, setSaved] = useState(false)

  const [liked, setLiked] = useState(false)

  const [likeCount, setLikeCount] = useState(0)

  const [comments, setComments] = useState([])

  const [commentText, setCommentText] = useState('')

  const [commentLoading, setCommentLoading] = useState(false)

  const editedMap = getEditedArticleMap()

  const localArticle = news.find(item => item.id === id)

  const mergedLocalArticle = localArticle
    ? {
        ...localArticle,
        ...(editedMap[localArticle.id] || {})
      }
    : null

  const savedLiveArticle = localStorage.getItem(
    `vedabyte_live_article_${id}`
  )

  const liveArticle = savedLiveArticle
    ? JSON.parse(savedLiveArticle)
    : null

  const article =
    mergedLocalArticle ||
    liveArticle

  useEffect(() => {
    async function loadLikes() {
      if (!article) return

      const count =
        await getLikeCount(article.id)

      setLikeCount(count)

      if (isAuthenticated && user) {
        const alreadyLiked =
          await hasUserLiked(
            user.id,
            article.id
          )

        setLiked(alreadyLiked)
      }
    }

    loadLikes()
  }, [article, user, isAuthenticated])

  useEffect(() => {
    async function loadComments() {
      if (!article) return

      const data =
        await getComments(article.id)

      setComments(data)
    }

    loadComments()
  }, [article])

  useEffect(() => {
    if (!article) return

    localStorage.setItem(
      'vedabyte_continue_reading',
      JSON.stringify({
        id: article.id,
        title: article.title,
        category: article.category
      })
    )
  }, [article])

  useEffect(() => {
    if (!article) return

    const savedHistory =
      localStorage.getItem(
        'vedabyte_reading_history'
      )

    const history =
      savedHistory
        ? JSON.parse(savedHistory)
        : []

    const current = {
      id: article.id,
      title: article.title,
      category: article.category
    }

    const updatedHistory = [
      current,
      ...history.filter(
        item => item.id !== article.id
      )
    ].slice(0, 10)

    localStorage.setItem(
      'vedabyte_reading_history',
      JSON.stringify(updatedHistory)
    )
  }, [article])

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>

        <p>
          This article does not exist.
        </p>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    )
  }

  const relatedArticles = news
    .map(item => ({
      ...item,
      ...(editedMap[item.id] || {})
    }))
    .filter(
      item =>
        item.id !== article.id &&
        item.category === article.category
    )
    .slice(0, 3)

  async function handleSave() {
    if (!isAuthenticated) {
      alert('Please sign in first')
      return
    }

    const success =
      await saveBookmark(
        user.id,
        article
      )

    if (success) {
      setSaved(true)
    }
  }

  async function handleLike() {
    if (!isAuthenticated) {
      alert('Please sign in first')
      return
    }

    if (liked) {
      const success =
        await unlikeArticle(
          user.id,
          article.id
        )

      if (success) {
        setLiked(false)

        setLikeCount(prev =>
          Math.max(prev - 1, 0)
        )
      }
    } else {
      const success =
        await likeArticle(
          user.id,
          article.id
        )

      if (success) {
        setLiked(true)

        setLikeCount(prev => prev + 1)
      }
    }
  }

  async function handleAddComment(e) {
    e.preventDefault()

    if (!isAuthenticated) {
      alert('Please sign in first')
      return
    }

    if (!commentText.trim()) return

    setCommentLoading(true)

    const success =
      await addComment(
        user.id,
        article.id,
        commentText.trim()
      )

    if (success) {
      setCommentText('')

      const updated =
        await getComments(article.id)

      setComments(updated)
    }

    setCommentLoading(false)
  }

  async function handleDeleteComment(
    commentId
  ) {
    const success =
      await deleteComment(commentId)

    if (success) {
      setComments(prev =>
        prev.filter(
          comment =>
            comment.id !== commentId
        )
      )
    }
  }

    const ArticlePreviewContent = (
    <section className="article-content">
      <div className="article-content-card">
        <p>{article.description}</p>

        <div className="article-ai-summary">
          <AISummary article={article} />
        </div>

        <p>
          This development reflects how quickly the technology industry is
          changing. Companies are investing heavily in artificial intelligence,
          cloud platforms, cybersecurity, developer tools and connected devices
          to remain competitive.
        </p>
      </div>
    </section>
  )

  const ArticleLockedContent = (
    <section className="article-content">
      <div className="article-content-card">
        <h2 className="article-content-heading">
          Key Points
        </h2>

        <ul>
          <li>
            This story highlights an important shift in the technology sector.
          </li>

          <li>
            The update may impact consumers, startups, developers and enterprise
            users.
          </li>

          <li>
            VedaByte will continue tracking related developments as the story
            evolves.
          </li>
        </ul>
      </div>

      <div className="article-content-card">
        <h2 className="article-content-heading">
          Why It Matters
        </h2>

        <p>{article.description}</p>
      </div>

      {article.isLive && (
        <div className="article-content-card article-content-card--source">
          <h2 className="article-content-heading">
            Original Reporting
          </h2>

          <p>
            This live article is sourced from{' '}
            {article.source || 'an external publisher'}.
            VedaByte provides a clean reading view,
            AI summary and bookmark support.
          </p>
        </div>
      )}
    </section>
  )

  return (
    <>
      <SEO
        title={`${article.title} | VedaByte`}
        description={
          article.description ||
          'Read the latest AI, startup and technology news on VedaByte.'
        }
        image={
          article.image ||
          'https://vedabyte-delta.vercel.app/og-image.png'
        }
        url={`https://vedabyte-delta.vercel.app/article/${article.id}`}
        type="article"
      />

      <StructuredData
        data={createArticleSchema(article)}
      />

      <StructuredData
        data={createBreadcrumbSchema([
          {
            name: 'Home',
            url: 'https://vedabyte-delta.vercel.app/'
          },
          {
            name: article.category || 'Technology',
            url: `https://vedabyte-delta.vercel.app/category/${(
              article.category || 'technology'
            ).toLowerCase()}`
          },
          {
            name: article.title,
            url: `https://vedabyte-delta.vercel.app/article/${article.id}`
          }
        ])}
      />

      <div className="article-page">

        <Link
          to="/"
          className="article-back-link"
        >
          ← Back to Home
        </Link>

        <div className="article-hero">
          <div className="article-hero-image-wrapper">
            <img
              src={article.image}
              alt={article.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={handleImageError}
              width="1200"
              height="675"
              className="article-hero-image"
            />
          </div>
        </div>

        <header className="article-header">

          <div className="article-badges">

            <span className="article-category-badge">
              {article.category}
            </span>

            {article.isPremium && (
              <span className="article-premium-badge">
                PRO
              </span>
            )}

          </div>

          <h1 className="article-title">
            {article.title}
          </h1>

          <div className="article-meta">

            <span className="article-meta__source">
              {article.source || 'VedaByte Editorial'}
            </span>

            <span>•</span>

            <span>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString()
                : 'June 2026'}
            </span>

            <span>•</span>

            <span>4 min read</span>

          </div>

          <p className="article-description">
            {article.description}
          </p>

          <div className="article-actions">

            <button
              onClick={handleSave}
              disabled={saved}
              className={`article-action-button ${
                saved
                  ? 'article-action-button--saved'
                  : 'article-action-button--save'
              }`}
            >
              {saved
                ? '✓ Saved to Bookmarks'
                : 'Save Bookmark'}
            </button>

            <button
              onClick={handleLike}
              className={`article-action-button ${
                liked
                  ? 'article-action-button--liked'
                  : ''
              }`}
            >
              {liked ? '♥ Liked' : '♡ Like'} • {likeCount}
            </button>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="article-source-link"
              >
                Read Original Source
              </a>
            )}

          </div>

          {ArticlePreviewContent}

          {article.isPremium ? (
            <PremiumArticleGate>
              {ArticleLockedContent}
            </PremiumArticleGate>
          ) : (
            ArticleLockedContent
          )}
          </header>
          <section className="article-comments">
            <h2 className="article-section-title">
              Comments • {comments.length}
            </h2>

            {isAuthenticated ? (
              <form
                onSubmit={handleAddComment}
                className="article-comment-form"
              >
                <textarea
                  value={commentText}
                  onChange={event =>
                    setCommentText(event.target.value)
                  }
                  placeholder="Share your thoughts..."
                  rows="4"
                  className="article-comment-textarea"
                />

                <button
                  type="submit"
                  disabled={commentLoading}
                  className="article-comment-submit"
                >
                  {commentLoading
                    ? 'Posting...'
                    : 'Post Comment'}
                </button>
              </form>
            ) : (
              <p className="article-comment-signin">
                Please sign in to post a comment.
              </p>
            )}

            <div className="article-comments-list">
              {comments.length === 0 ? (
                <p className="article-comments-empty">
                  No comments yet. Be the first to comment.
                </p>
              ) : (
                comments.map(comment => (
                  <article
                    key={comment.id}
                    className="article-comment"
                  >
                    <p className="article-comment__content">
                      {comment.content}
                    </p>

                    <p className="article-comment__date">
                      {comment.created_at
                        ? new Date(
                            comment.created_at
                          ).toLocaleString()
                        : 'Just now'}
                    </p>

                    {isAuthenticated &&
                      user?.id === comment.user_id && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteComment(
                              comment.id
                            )
                          }
                          className="article-comment__delete"
                        >
                          Delete
                        </button>
                      )}
                  </article>
                ))
              )}
            </div>
          </section>
                    <section className="article-related">
            <h2 className="article-section-title">
              Related Articles
            </h2>

            {relatedArticles.length === 0 ? (
              <p className="article-related-empty">
                No related articles found.
              </p>
            ) : (
              <div className="article-related-grid">
                {relatedArticles.map(item => (
                  <Link
                    key={item.id}
                    to={`/article/${item.id}`}
                    className="article-related-card"
                  >
                    <span className="article-related-card__category">
                      {item.category}
                    </span>

                    <h3 className="article-related-card__title">
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
                    </section>
        </div>
      </>
    )
}