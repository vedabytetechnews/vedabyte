import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import news from '../data/news'
import { useAuth } from '../context/AuthContext'
import { saveBookmark } from '../services/bookmarkService'
import { getEditedArticleMap } from '../services/articleAdminService'

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
  const { user, isAuthenticated } = useAuth()

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

const article = mergedLocalArticle || liveArticle

  useEffect(() => {
    async function loadLikes() {
      if (!article) return

      const count = await getLikeCount(article.id)
      setLikeCount(count)

      if (isAuthenticated && user) {
        const alreadyLiked = await hasUserLiked(user.id, article.id)
        setLiked(alreadyLiked)
      }
    }

    loadLikes()
  }, [article, user, isAuthenticated])

  useEffect(() => {
    async function loadComments() {
      if (!article) return

      const data = await getComments(article.id)
      setComments(data)
    }

    loadComments()
  }, [article])

  if (!article) {
    return (
      <div
        style={{
          color: '#fff',
          textAlign: 'center',
          padding: '100px 20px'
        }}
      >
        <h1>Article not found</h1>

        <Link
          to="/"
          style={{
            color: '#D4AF37',
            display: 'inline-block',
            marginTop: '20px'
          }}
        >
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

    const success = await saveBookmark(user.id, article)

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
      const success = await unlikeArticle(user.id, article.id)

      if (success) {
        setLiked(false)
        setLikeCount(prev => Math.max(prev - 1, 0))
      }
    } else {
      const success = await likeArticle(user.id, article.id)

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

    const success = await addComment(
      user.id,
      article.id,
      commentText.trim()
    )

    if (success) {
      setCommentText('')
      const updatedComments = await getComments(article.id)
      setComments(updatedComments)
    }

    setCommentLoading(false)
  }

  async function handleDeleteComment(commentId) {
    const success = await deleteComment(commentId)

    if (success) {
      setComments(prev =>
        prev.filter(comment => comment.id !== commentId)
      )
    }
  }

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        color: '#fff'
      }}
    >
      <Link
        to="/"
        style={{
          color: '#D4AF37',
          fontWeight: '700',
          display: 'inline-block',
          marginBottom: '25px'
        }}
      >
        ← Back to Home
      </Link>

      <img
        src={article.image}
        alt={article.title}
        style={{
          width: '100%',
          height: '460px',
          objectFit: 'cover',
          borderRadius: '22px',
          border: '1px solid #232323'
        }}
      />

      <div style={{ marginTop: '30px' }}>
        <span
          style={{
            color: '#000',
            background: '#D4AF37',
            fontWeight: '800',
            textTransform: 'uppercase',
            padding: '8px 12px',
            borderRadius: '999px',
            fontSize: '12px'
          }}
        >
          {article.category}
        </span>

        <h1
          style={{
            fontSize: '48px',
            marginTop: '22px',
            lineHeight: '1.15',
            color: '#FFFFFF'
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            color: '#9CA3AF',
            marginTop: '15px',
            fontSize: '15px'
          }}
        >
          By {article.source || 'VedaByte Editorial'} •{' '}
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString()
            : 'June 2026'}{' '}
          • 4 min read
        </p>

        <p
          style={{
            color: '#D1D5DB',
            marginTop: '20px',
            fontSize: '20px',
            lineHeight: '1.7'
          }}
        >
          {article.description}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '28px'
          }}
        >
          <button
            onClick={handleSave}
            disabled={saved}
            style={{
              background: saved ? '#16a34a' : '#D4AF37',
              color: '#000',
              border: 'none',
              padding: '13px 24px',
              borderRadius: '12px',
              fontWeight: '800',
              cursor: saved ? 'default' : 'pointer'
            }}
          >
            {saved ? '✓ Saved to Bookmarks' : 'Save Bookmark'}
          </button>

          <button
            onClick={handleLike}
            style={{
              background: liked ? '#ef4444' : '#111111',
              color: liked ? '#fff' : '#D4AF37',
              border: '1px solid #232323',
              padding: '13px 24px',
              borderRadius: '12px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            {liked ? '♥ Liked' : '♡ Like'} • {likeCount}
          </button>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                background: '#111111',
                color: '#D4AF37',
                border: '1px solid #232323',
                padding: '13px 24px',
                borderRadius: '12px',
                fontWeight: '800',
                textDecoration: 'none'
              }}
            >
              Read Original Source
            </a>
          )}
        </div>

        <div
          style={{
            marginTop: '45px',
            fontSize: '18px',
            lineHeight: '1.9',
            color: '#D1D5DB',
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '20px',
            padding: '28px'
          }}
        >
          <p>{article.description}</p>

          <br />

          <p>
            This development reflects how quickly the technology industry is
            changing. Companies are investing heavily in artificial intelligence,
            cloud platforms, cybersecurity, developer tools and connected
            devices to remain competitive.
          </p>

          <br />

          <p>
            For readers, the key takeaway is clear: the next generation of
            digital products will be faster, smarter and more deeply integrated
            into everyday work. VedaByte will continue tracking these shifts
            across startups, enterprise technology and consumer innovation.
          </p>
        </div>

        <div
          style={{
            marginTop: '35px',
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '20px',
            padding: '28px'
          }}
        >
          <h2
            style={{
              color: '#D4AF37',
              marginBottom: '18px'
            }}
          >
            Key Points
          </h2>

          <ul
            style={{
              color: '#D1D5DB',
              lineHeight: '2',
              paddingLeft: '22px'
            }}
          >
            <li>This story highlights an important shift in the technology sector.</li>
            <li>The update may impact consumers, startups, developers, or enterprise users.</li>
            <li>VedaByte will continue tracking related developments as the story evolves.</li>
          </ul>
        </div>

        <div
          style={{
            marginTop: '30px',
            background: '#111111',
            border: '1px solid #232323',
            borderRadius: '20px',
            padding: '28px'
          }}
        >
          <h2
            style={{
              color: '#D4AF37',
              marginBottom: '18px'
            }}
          >
            Why It Matters
          </h2>

          <p
            style={{
              color: '#D1D5DB',
              lineHeight: '1.9',
              fontSize: '17px'
            }}
          >
            Technology news often moves quickly, but the larger impact comes
            from how these changes affect businesses, builders and everyday
            users. This story is part of a wider shift toward smarter products,
            faster platforms and more connected digital experiences.
          </p>
        </div>

        {article.isLive && (
          <div
            style={{
              marginTop: '30px',
              background: '#0F172A',
              border: '1px solid #232323',
              borderRadius: '20px',
              padding: '24px'
            }}
          >
            <h3
              style={{
                color: '#D4AF37',
                marginBottom: '10px'
              }}
            >
              Original Reporting
            </h3>

            <p
              style={{
                color: '#D1D5DB',
                lineHeight: '1.7'
              }}
            >
              This live article is sourced from{' '}
              {article.source || 'an external publisher'}. VedaByte provides a
              clean reading view, summary context and bookmark support. For the
              complete original report, use the source button above.
            </p>
          </div>
        )}
      </div>

      <section
        style={{
          marginTop: '60px',
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '22px',
          padding: '28px'
        }}
      >
        <h2
          style={{
            color: '#D4AF37',
            marginBottom: '20px',
            fontSize: '30px'
          }}
        >
          Comments • {comments.length}
        </h2>

        {isAuthenticated ? (
          <form onSubmit={handleAddComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows="4"
              style={{
                width: '100%',
                background: '#0A0A0A',
                color: '#FFFFFF',
                border: '1px solid #232323',
                borderRadius: '14px',
                padding: '14px',
                fontSize: '15px',
                resize: 'vertical'
              }}
            />

            <button
              type="submit"
              disabled={commentLoading}
              style={{
                marginTop: '14px',
                background: '#D4AF37',
                color: '#000',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '10px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p style={{ color: '#9CA3AF' }}>
            Please sign in to post a comment.
          </p>
        )}

        <div style={{ marginTop: '28px' }}>
          {comments.length === 0 ? (
            <p style={{ color: '#9CA3AF' }}>
              No comments yet. Be the first to comment.
            </p>
          ) : (
            comments.map(comment => (
              <div
                key={comment.id}
                style={{
                  borderTop: '1px solid #232323',
                  padding: '18px 0',
                  color: '#D1D5DB'
                }}
              >
                <p
                  style={{
                    color: '#FFFFFF',
                    lineHeight: '1.7',
                    marginBottom: '8px'
                  }}
                >
                  {comment.content}
                </p>

                <p
                  style={{
                    color: '#6B7280',
                    fontSize: '13px'
                  }}
                >
                  {comment.created_at
                    ? new Date(comment.created_at).toLocaleString()
                    : 'Just now'}
                </p>

                {isAuthenticated && user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    style={{
                      marginTop: '8px',
                      background: 'transparent',
                      color: '#EF4444',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '700'
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <div
        style={{
          marginTop: '60px',
          paddingTop: '35px',
          borderTop: '1px solid #232323'
        }}
      >
        <h2
          style={{
            color: '#D4AF37',
            fontSize: '30px',
            marginBottom: '25px'
          }}
        >
          Related Articles
        </h2>

        {relatedArticles.length === 0 ? (
          <p style={{ color: '#9CA3AF' }}>
            No related articles found.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
              gap: '20px'
            }}
          >
            {relatedArticles.map(item => (
              <Link
                key={item.id}
                to={`/article/${item.id}`}
                style={{
                  background: '#111111',
                  border: '1px solid #232323',
                  borderRadius: '16px',
                  padding: '20px',
                  color: '#fff',
                  textDecoration: 'none'
                }}
              >
                <span
                  style={{
                    color: '#D4AF37',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.category}
                </span>

                <h3
                  style={{
                    marginTop: '10px',
                    lineHeight: '1.4'
                  }}
                >
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}