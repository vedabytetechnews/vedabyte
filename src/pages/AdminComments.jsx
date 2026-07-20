import { useEffect, useState } from 'react'
import {
  getAllComments,
  deleteAdminComment
} from '../services/adminCommentService'

import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

export default function AdminComments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadComments() {
      try {
        const data = await getAllComments()

        if (mounted) {
          setComments(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error(err)

        if (mounted) {
          setError('Unable to load comments.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadComments()

    return () => {
      mounted = false
    }
  }, [])

  async function handleDelete(commentId) {
    const confirmDelete = window.confirm(
      'Delete this comment?'
    )

    if (!confirmDelete) return

    const success = await deleteAdminComment(commentId)

    if (success) {
      setComments(prev =>
        prev.filter(comment => comment.id !== commentId)
      )
    }
  }

  if (loading) {
    return (
      <LoadingScreen message="Loading comments..." />
    )
  }

  return (
    <>
      <SEO
        title="Comment Moderation | VedaByte Admin"
        description="Review and moderate comments."
      />

      <main className="admin-comments-page">
        <header className="admin-comments-header">
          <p className="admin-comments-label">
            COMMUNITY
          </p>

          <h1>Comment Moderation</h1>

          <p>
            Review and remove inappropriate comments.
          </p>
        </header>

        {error ? (
          <div className="admin-comments-error">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="admin-comments-empty">
            No comments found.
          </div>
        ) : (
          <div className="admin-comments-list">
            {comments.map(comment => (
              <article
                key={comment.id}
                className="admin-comment-card"
              >
                <p className="admin-comment-content">
                  {comment.content}
                </p>

                <div className="admin-comment-meta">
                  <p>
                    <strong>Article:</strong>{' '}
                    {comment.article_id}
                  </p>

                  <p>
                    <strong>User:</strong>{' '}
                    {comment.user_id}
                  </p>

                  <p>
                    <strong>Posted:</strong>{' '}
                    {comment.created_at
                      ? new Date(
                          comment.created_at
                        ).toLocaleString()
                      : 'Unknown'}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(comment.id)
                  }
                  className="admin-comment-delete"
                >
                  Delete Comment
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  )
}