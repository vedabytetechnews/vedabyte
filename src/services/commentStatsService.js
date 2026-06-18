import { supabase } from '../lib/supabase'

export async function getCommentCount(articleId) {
  const { count, error } = await supabase
    .from('comments')
    .select('*', {
      count: 'exact',
      head: true
    })
    .eq('article_id', articleId)
    .eq('is_deleted', false)

  if (error) {
    console.error('COMMENT COUNT ERROR:', error)
    return 0
  }

  return count || 0
}