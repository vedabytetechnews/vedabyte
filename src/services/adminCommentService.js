import { supabase } from '../lib/supabase'

export async function getAllComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET ALL COMMENTS ERROR:', error)
    return []
  }

  return data || []
}

export async function deleteAdminComment(commentId) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    console.error('DELETE COMMENT ERROR:', error)
    return false
  }

  return true
}