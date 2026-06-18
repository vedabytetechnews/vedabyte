import { supabase } from '../lib/supabase'

export async function getTrendingArticleIds() {
  const { data, error } = await supabase
    .from('likes')
    .select('article_id')

  if (error) {
    console.error('TRENDING ERROR:', error)
    return []
  }

  const counts = {}

  data.forEach(item => {
    counts[item.article_id] = (counts[item.article_id] || 0) + 1
  })

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([article_id, likes]) => ({
      article_id,
      likes
    }))
}