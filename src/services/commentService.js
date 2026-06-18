import { supabase } from '../lib/supabase'

export async function getComments(articleId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('article_id', articleId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET COMMENTS ERROR:', error)
    return []
  }

  return data || []
}

export async function addComment(userId, articleId, content) {
  const { error } = await supabase
    .from('comments')
    .insert([
      {
        user_id: userId,
        article_id: articleId,
        content,
        is_deleted: false
      }
    ])

  if (error) {
    console.error('ADD COMMENT ERROR:', error)
    return false
  }

  return true
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from('comments')
    .update({ is_deleted: true })
    .eq('id', commentId)

  if (error) {
    console.error('DELETE COMMENT ERROR:', error)
    return false
  }

  return true
}