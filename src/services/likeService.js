import { supabase } from '../lib/supabase'

export async function getLikeCount(articleId) {
  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', articleId)

  if (error) {
    console.error('GET LIKE COUNT ERROR:', error)
    return 0
  }

  return count || 0
}

export async function hasUserLiked(userId, articleId) {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('article_id', articleId)

  if (error) {
    console.error('CHECK LIKE ERROR:', error)
    return false
  }

  return data && data.length > 0
}

export async function likeArticle(userId, articleId) {
  const { error } = await supabase
    .from('likes')
    .insert([
      {
        user_id: userId,
        article_id: articleId
      }
    ])

  if (error) {
    console.error('LIKE ARTICLE ERROR:', error)
    return false
  }

  return true
}

export async function unlikeArticle(userId, articleId) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('article_id', articleId)

  if (error) {
    console.error('UNLIKE ARTICLE ERROR:', error)
    return false
  }

  return true
}