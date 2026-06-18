import localNews from '../data/news'
import { getLikeCount } from './likeService'
import { getCommentCount } from './commentStatsService'

const FEATURED_KEY = 'vedabyte_featured_articles'
const DELETED_KEY = 'vedabyte_deleted_articles'
const EDITED_KEY = 'vedabyte_edited_articles'
const CREATED_KEY = 'vedabyte_created_articles'

function getStoredIds(key) {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

function saveStoredIds(key, ids) {
  localStorage.setItem(key, JSON.stringify(ids))
}

function getEditedArticles() {
  return JSON.parse(localStorage.getItem(EDITED_KEY) || '{}')
}

function saveEditedArticles(articles) {
  localStorage.setItem(EDITED_KEY, JSON.stringify(articles))
}

export async function getAdminArticles() {
  const featuredIds = getStoredIds(FEATURED_KEY)
  const deletedIds = getStoredIds(DELETED_KEY)
  const editedArticles = getEditedArticles()

  const createdArticles = getCreatedArticles()

const activeArticles = [...createdArticles, ...localNews]
    .filter(article => !deletedIds.includes(article.id))
    .map(article => ({
      ...article,
      ...(editedArticles[article.id] || {})
    }))

  const articles = await Promise.all(
    activeArticles.map(async article => {
      const likes = await getLikeCount(article.id)
      const comments = await getCommentCount(article.id)

      return {
        ...article,
        likes,
        comments,
        featured: featuredIds.includes(article.id)
      }
    })
  )

  return articles
}

export function toggleFeaturedArticle(articleId) {
  const featuredIds = getStoredIds(FEATURED_KEY)

  if (featuredIds.includes(articleId)) {
    saveStoredIds(FEATURED_KEY, [])
    return false
  }

  saveStoredIds(FEATURED_KEY, [articleId])
  return true
}

export function deleteAdminArticle(articleId) {
  const deletedIds = getStoredIds(DELETED_KEY)

  if (!deletedIds.includes(articleId)) {
    saveStoredIds(DELETED_KEY, [...deletedIds, articleId])
  }

  return true
}

export function updateAdminArticle(articleId, updates) {
  const editedArticles = getEditedArticles()

  editedArticles[articleId] = {
    ...(editedArticles[articleId] || {}),
    ...updates
  }

  saveEditedArticles(editedArticles)

  return {
    id: articleId,
    ...editedArticles[articleId]
  }
}

export function getFeaturedArticleIds() {
  return getStoredIds(FEATURED_KEY)
}

export function getEditedArticleMap() {
  return getEditedArticles()
}

function getCreatedArticles() {
  return JSON.parse(
    localStorage.getItem(CREATED_KEY) || '[]'
  )
}

function saveCreatedArticles(articles) {
  localStorage.setItem(
    CREATED_KEY,
    JSON.stringify(articles)
  )
}

export function createAdminArticle(article) {
  const createdArticles = getCreatedArticles()

  createdArticles.unshift(article)

  saveCreatedArticles(createdArticles)

  return article
}

export function getCreatedArticleList() {
  return getCreatedArticles()
}