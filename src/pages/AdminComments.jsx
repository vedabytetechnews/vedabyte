import { useEffect, useState } from 'react'
import {
  getAllComments,
  deleteAdminComment
} from '../services/adminCommentService'

export default function AdminComments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadComments() {
      const data = await getAllComments()
      setComments(data)
      setLoading(false)
    }

    loadComments()
  }, [])

  async function handleDelete(commentId) {
    const success = await deleteAdminComment(commentId)

    if (success) {
      setComments(prev =>
        prev.filter(comment => comment.id !== commentId)
      )
    }
  }

  if (loading) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading comments...
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '45px 20px',
        color: '#fff'
      }}
    >
      <h1
        style={{
          color: '#D4AF37',
          fontSize: '42px',
          marginBottom: '10px'
        }}
      >
        Comment Moderation
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '30px' }}>
        Review and remove comments from VedaByte.
      </p>

      {comments.length === 0 ? (
        <div style={boxStyle}>
          No comments found.
        </div>
      ) : (
        comments.map(comment => (
          <div key={comment.id} style={boxStyle}>
            <p
              style={{
                color: '#fff',
                lineHeight: '1.7',
                marginBottom: '12px'
              }}
            >
              {comment.content}
            </p>

            <p style={metaStyle}>
              Article ID: {comment.article_id}
            </p>

            <p style={metaStyle}>
              User ID: {comment.user_id}
            </p>

            <p style={metaStyle}>
              Posted:{' '}
              {comment.created_at
                ? new Date(comment.created_at).toLocaleString()
                : 'Unknown'}
            </p>

            <button
              onClick={() => handleDelete(comment.id)}
              style={{
                marginTop: '15px',
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '800'
              }}
            >
              Delete Comment
            </button>
          </div>
        ))
      )}
    </div>
  )
}

const boxStyle = {
  background: '#111111',
  border: '1px solid #232323',
  borderRadius: '18px',
  padding: '22px',
  marginBottom: '18px'
}

const metaStyle = {
  color: '#9CA3AF',
  fontSize: '13px',
  marginTop: '6px'
}