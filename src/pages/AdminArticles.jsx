import { useEffect, useState } from 'react'
import {
  getAdminArticles,
  toggleFeaturedArticle,
  deleteAdminArticle,
  updateAdminArticle
} from '../services/articleAdminService'

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState(null)
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    image: ''
  })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    loadArticles()
  }, [])

  async function loadArticles() {
    const data = await getAdminArticles()
    setArticles(data)
    setLoading(false)
  }

  function handleFeature(articleId) {
    const isNowFeatured = toggleFeaturedArticle(articleId)

    setArticles(prev =>
      prev.map(article => ({
        ...article,
        featured: isNowFeatured && article.id === articleId
      }))
    )
  }

  function handleDelete(articleId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article from admin view?'
    )

    if (!confirmDelete) return

    deleteAdminArticle(articleId)

    setArticles(prev =>
      prev.filter(article => article.id !== articleId)
    )
  }

  function startEditing(article) {
    setEditingArticle(article)
    setForm({
      title: article.title,
      category: article.category,
      description: article.description,
      image: article.image
    })
  }

  function cancelEditing() {
    setEditingArticle(null)
    setForm({
      title: '',
      category: '',
      description: '',
      image: ''
    })
  }

  function handleSaveEdit(event) {
    event.preventDefault()

    if (!editingArticle) return

    const updates = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim()
    }

    updateAdminArticle(editingArticle.id, updates)

    setArticles(prev =>
      prev.map(article =>
        article.id === editingArticle.id
          ? { ...article, ...updates }
          : article
      )
    )

    cancelEditing()
  }

  const cleanQuery = query.trim().toLowerCase()

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(cleanQuery) ||
    article.category.toLowerCase().includes(cleanQuery) ||
    article.description.toLowerCase().includes(cleanQuery)
  )

  const featuredCount = articles.filter(article => article.featured).length
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0)
  const totalComments = articles.reduce((sum, article) => sum + article.comments, 0)

  if (loading) {
    return (
      <div style={{ color: '#fff', padding: '50px 20px' }}>
        Loading articles...
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '45px 20px', color: '#fff' }}>
      <h1 style={{ color: '#D4AF37', fontSize: '42px', marginBottom: '10px' }}>
        Article Management
      </h1>

      <p style={{ color: '#9CA3AF', marginBottom: '30px' }}>
        Review, feature, edit and manage local VedaByte articles.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px', marginBottom: '30px' }}>
        <StatCard label="Total Articles" value={articles.length} />
        <StatCard label="Featured" value={featuredCount} />
        <StatCard label="Total Likes" value={totalLikes} />
        <StatCard label="Total Comments" value={totalComments} />
      </div>

      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={inputStyle}
      />

      {editingArticle && (
        <form onSubmit={handleSaveEdit} style={editorStyle}>
          <h2 style={{ color: '#D4AF37', marginBottom: '18px' }}>
            Edit Article
          </h2>

          <label style={labelStyle}>Title</label>
          <button
  onClick={() => {
    setCreating(true)
    setEditingArticle(null)

    setForm({
      title: '',
      category: 'AI',
      description: '',
      image: ''
    })
  }}
  style={{
    background: '#D4AF37',
    color: '#000',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '10px',
    fontWeight: '900',
    cursor: 'pointer',
    marginBottom: '25px'
  }}
>
  + Create New Article
</button>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={inputStyle}
            required
          >
            <option value="AI">AI</option>
            <option value="Startups">Startups</option>
            <option value="Security">Security</option>
            <option value="Programming">Programming</option>
            <option value="Cloud">Cloud</option>
            <option value="Gadgets">Gadgets</option>
          </select>

          <label style={labelStyle}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
            required
          />

          <label style={labelStyle}>Image URL</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            style={inputStyle}
            required
          />

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" style={primaryButtonStyle}>
              Save Changes
            </button>

            <button type="button" onClick={cancelEditing} style={secondaryButtonStyle}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '24px' }}>
        {filteredArticles.map(article => (
          <div
            key={article.id}
            style={{
              background: '#111111',
              border: article.featured ? '1px solid #D4AF37' : '1px solid #232323',
              borderRadius: '18px',
              overflow: 'hidden'
            }}
          >
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />

            <div style={{ padding: '20px' }}>
              <span style={{ color: '#D4AF37', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
                {article.category}
              </span>

              {article.featured && (
                <span style={featuredBadgeStyle}>
                  FEATURED
                </span>
              )}

              <h3 style={{ color: '#fff', marginTop: '10px', lineHeight: '1.4' }}>
                {article.title}
              </h3>

              <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '12px', lineHeight: '1.6' }}>
                {article.description}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px', color: '#D1D5DB', fontSize: '14px' }}>
                <span>❤️ {article.likes}</span>
                <span>💬 {article.comments}</span>
                <span>ID: {article.id}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                <button
                  onClick={() => handleFeature(article.id)}
                  style={{
                    flex: 1,
                    background: article.featured ? '#232323' : '#D4AF37',
                    color: article.featured ? '#fff' : '#000',
                    border: 'none',
                    padding: '11px',
                    borderRadius: '10px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  {article.featured ? 'Unfeature' : 'Feature'}
                </button>

                <button
                  onClick={() => startEditing(article)}
                  style={editButtonStyle}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(article.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{ background: '#111111', border: '1px solid #232323', borderRadius: '16px', padding: '20px' }}>
      <p style={{ color: '#9CA3AF', fontSize: '14px' }}>{label}</p>
      <h2 style={{ color: '#D4AF37', fontSize: '32px', marginTop: '8px' }}>
        {value}
      </h2>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid #232323',
  color: '#fff',
  padding: '14px 16px',
  borderRadius: '12px',
  marginBottom: '18px',
  fontSize: '16px'
}

const labelStyle = {
  display: 'block',
  color: '#D4AF37',
  fontWeight: '800',
  marginBottom: '8px'
}

const editorStyle = {
  background: '#111111',
  border: '1px solid #D4AF37',
  borderRadius: '18px',
  padding: '24px',
  marginBottom: '35px'
}

const primaryButtonStyle = {
  background: '#D4AF37',
  color: '#000',
  border: 'none',
  padding: '12px 18px',
  borderRadius: '10px',
  fontWeight: '900',
  cursor: 'pointer'
}

const secondaryButtonStyle = {
  background: '#232323',
  color: '#fff',
  border: 'none',
  padding: '12px 18px',
  borderRadius: '10px',
  fontWeight: '900',
  cursor: 'pointer'
}

const editButtonStyle = {
  flex: 1,
  background: '#1F2937',
  color: '#fff',
  border: 'none',
  padding: '11px',
  borderRadius: '10px',
  fontWeight: '900',
  cursor: 'pointer'
}

const deleteButtonStyle = {
  flex: 1,
  background: '#7F1D1D',
  color: '#fff',
  border: 'none',
  padding: '11px',
  borderRadius: '10px',
  fontWeight: '900',
  cursor: 'pointer'
}

const featuredBadgeStyle = {
  marginLeft: '10px',
  background: '#D4AF37',
  color: '#000',
  fontSize: '11px',
  fontWeight: '900',
  padding: '4px 8px',
  borderRadius: '999px'
}