import { supabase } from '../lib/supabase'

export async function getTopLikedArticles() {
  const { data, error } = await supabase
    .from('likes')
    .select('article_id')

  if (error) return []

  const counts = {}

  data.forEach(item => {
    counts[item.article_id] =
      (counts[item.article_id] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}

export async function getTopCommentedArticles() {
  const { data, error } = await supabase
    .from('comments')
    .select('article_id')

  if (error) return []

  const counts = {}

  data.forEach(item => {
    counts[item.article_id] =
      (counts[item.article_id] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}

export async function getTopSavedArticles() {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('article_id')

  if (error) return []

  const counts = {}

  data.forEach(item => {
    counts[item.article_id] =
      (counts[item.article_id] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}