import { supabase } from '../lib/supabase'

async function getUserCount(table, userId) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (error) {
    console.error(`${table} profile count error:`, error)
    return 0
  }

  return count || 0
}

export async function getProfileStats(userId) {
  const [bookmarks, likes, comments] = await Promise.all([
    getUserCount('bookmarks', userId),
    getUserCount('likes', userId),
    getUserCount('comments', userId)
  ])

  return {
    bookmarks,
    likes,
    comments
  }
}