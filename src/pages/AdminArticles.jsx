import { useEffect, useMemo, useState } from 'react'
import {
  getAdminArticles,
  toggleFeaturedArticle,
  deleteAdminArticle,
  updateAdminArticle
} from '../services/articleAdminService'

import LoadingScreen from '../components/LoadingScreen'
import SEO from '../components/SEO'

const EMPTY_FORM = {
  title: '',
  category: 'AI',
  description: '',
  image: ''
}

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingArticle, setEditingArticle] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    let isMounted = true

    async function loadArticles() {
      try {
        const data = await getAdminArticles()

        if (isMounted) {
          setArticles(Array.isArray(data) ? data : [])
        }
      } catch (loadError) {
        console.error('Unable to load admin articles:', loadError)

        if (isMounted) {
          setError('Unable to load articles right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => {
      isMounted = false
    }
  }, [])

  function handleFeature(articleId) {
    const isNowFeatured = toggleFeaturedArticle(articleId)

    setArticles(previousArticles =>
      previousArticles.map(article => ({
        ...article,
        featured:
          article.id === articleId
            ? isNowFeatured
            : false
      }))
    )
  }

  function handleDelete(articleId) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article from the admin view?'
    )

    if (!confirmDelete) return

    deleteAdminArticle(articleId)

    setArticles(previousArticles =>
      previousArticles.filter(article => article.id !== articleId)
    )

    if (editingArticle?.id === articleId) {
      cancelEditing()
    }
  }

  function startEditing(article) {
    setEditingArticle(article)

    setForm({
      title: article.title || '',
      category: article.category || 'AI',
      description: article.description || '',
      image: article.image || ''
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function cancelEditing() {
    setEditingArticle(null)
    setForm(EMPTY_FORM)
  }

  function handleInputChange(event) {
    const { name, value } = event.target

    setForm(previousForm => ({
      ...previousForm,
      [name]: value
    }))
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

    if (
      !updates.title ||
      !updates.category ||
      !updates.description ||
      !updates.image
    ) {
      return
    }

    updateAdminArticle(editingArticle.id, updates)

    setArticles(previousArticles =>
      previousArticles.map(article =>
        article.id === editingArticle.id
          ? { ...article, ...updates }
          : article
      )
    )

    cancelEditing()
  }

  const filteredArticles = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()

    if (!cleanQuery) {
      return articles
    }

    return articles.filter(article => {
      const title = String(article.title || '').toLowerCase()
      const category = String(article.category || '').toLowerCase()
      const description = String(article.description || '').toLowerCase()
      const articleId = String(article.id || '').toLowerCase()

      return (
        title.includes(cleanQuery) ||
        category.includes(cleanQuery) ||
        description.includes(cleanQuery) ||
        articleId.includes(cleanQuery)
      )
    })
  }, [articles, query])

  const featuredCount = articles.filter(
    article => article.featured
  ).length

  const totalLikes = articles.reduce(
    (sum, article) => sum + Number(article.likes || 0),
    0
  )

  const totalComments = articles.reduce(
    (sum, article) => sum + Number(article.comments || 0),
    0
  )

  if (loading) {
    return <LoadingScreen message="Loading articles..." />
  }

  return (
    <>
      <SEO
        title="Article Management | VedaByte Admin"
        description="Manage, edit, feature and remove VedaByte articles."
        url="https://vedabyte-delta.vercel.app/admin/articles"
      />

      <main className="admin-articles-page">
        <header className="admin-articles-header">
          <p className="admin-articles-label">
            CONTENT MANAGEMENT
          </p>

          <h1>Article Management</h1>

          <p>
            Review, feature, edit and manage local VedaByte articles.
          </p>
        </header>

        {error ? (
          <section className="admin-articles-error">
            <h2>Articles unavailable</h2>
            <p>{error}</p>
          </section>
        ) : (
          <>
            <section
              className="admin-article-stats-grid"
              aria-label="Article statistics"
            >
              <StatCard
                label="Total Articles"
                value={articles.length}
              />

              <StatCard
                label="Featured"
                value={featuredCount}
              />

              <StatCard
                label="Total Likes"
                value={totalLikes}
              />

              <StatCard
                label="Total Comments"
                value={totalComments}
              />
            </section>

            <section className="admin-article-toolbar">
              <label
                htmlFor="admin-article-search"
                className="admin-article-search-label"
              >
                Search articles
              </label>

              <input
                id="admin-article-search"
                type="search"
                placeholder="Search by title, category, description or ID..."
                value={query}
                onChange={event => setQuery(event.target.value)}
                className="admin-article-input"
              />

              <p className="admin-article-results-count">
                Showing {filteredArticles.length} of {articles.length}{' '}
                articles
              </p>
            </section>

            {editingArticle && (
              <form
                onSubmit={handleSaveEdit}
                className="admin-article-editor"
              >
                <div className="admin-article-editor-heading">
                  <div>
                    <p>EDITING ARTICLE</p>
                    <h2>{editingArticle.title}</h2>
                  </div>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="admin-article-close-button"
                    aria-label="Close article editor"
                  >
                    ×
                  </button>
                </div>

                <div className="admin-article-form-grid">
                  <div className="admin-article-field admin-article-field-wide">
                    <label htmlFor="article-title">
                      Title
                    </label>

                    <input
                      id="article-title"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      className="admin-article-input"
                      required
                    />
                  </div>

                  <div className="admin-article-field">
                    <label htmlFor="article-category">
                      Category
                    </label>

                    <select
                      id="article-category"
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="admin-article-input"
                      required
                    >
                      <option value="AI">AI</option>
                      <option value="Startups">Startups</option>
                      <option value="Security">Security</option>
                      <option value="Programming">
                        Programming
                      </option>
                      <option value="Cloud">Cloud</option>
                      <option value="Gadgets">Gadgets</option>
                    </select>
                  </div>

                  <div className="admin-article-field">
                    <label htmlFor="article-image">
                      Image URL
                    </label>

                    <input
                      id="article-image"
                      name="image"
                      type="url"
                      value={form.image}
                      onChange={handleInputChange}
                      className="admin-article-input"
                      required
                    />
                  </div>

                  <div className="admin-article-field admin-article-field-wide">
                    <label htmlFor="article-description">
                      Description
                    </label>

                    <textarea
                      id="article-description"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      className="admin-article-input admin-article-textarea"
                      required
                    />
                  </div>
                </div>

                <div className="admin-article-editor-actions">
                  <button
                    type="submit"
                    className="admin-article-primary-button"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="admin-article-secondary-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {filteredArticles.length === 0 ? (
              <section className="admin-articles-empty">
                <h2>No articles found</h2>

                <p>
                  Try searching with a different title, category or
                  article ID.
                </p>
              </section>
            ) : (
              <section className="admin-article-list-grid">
                {filteredArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onFeature={handleFeature}
                    onEdit={startEditing}
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}

function StatCard({ label, value }) {
  return (
    <article className="admin-article-stat-card">
      <p>{label}</p>
      <h2>{value}</h2>
    </article>
  )
}

function ArticleCard({
  article,
  onFeature,
  onEdit,
  onDelete
}) {
  return (
    <article
      className={`admin-article-card ${
        article.featured ? 'featured' : ''
      }`}
    >
      <div className="admin-article-image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          onError={event => {
            event.currentTarget.src =
              'https://placehold.co/800x450/111111/D4AF37?text=VedaByte'
          }}
        />

        {article.featured && (
          <span className="admin-article-featured-badge">
            FEATURED
          </span>
        )}
      </div>

      <div className="admin-article-card-content">
        <p className="admin-article-category">
          {article.category}
        </p>

        <h2>{article.title}</h2>

        <p className="admin-article-description">
          {article.description}
        </p>

        <div className="admin-article-meta">
          <span>❤️ {Number(article.likes || 0)}</span>
          <span>💬 {Number(article.comments || 0)}</span>
        </div>

        <p className="admin-article-id">
          ID: {article.id}
        </p>

        <div className="admin-article-card-actions">
          <button
            type="button"
            onClick={() => onFeature(article.id)}
            className={
              article.featured
                ? 'admin-article-unfeature-button'
                : 'admin-article-feature-button'
            }
          >
            {article.featured ? 'Unfeature' : 'Feature'}
          </button>

          <button
            type="button"
            onClick={() => onEdit(article)}
            className="admin-article-edit-button"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(article.id)}
            className="admin-article-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}