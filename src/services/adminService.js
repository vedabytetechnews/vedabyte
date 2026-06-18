import { supabase } from '../lib/supabase'

async function getCount(table) {
  const { count, error } = await supabase
    .from(table)
    .select('*', {
      count: 'exact',
      head: true
    })

  if (error) {
    console.error(`${table} count error:`, error)
    return 0
  }

  return count || 0
}

async function getRecentComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Recent comments error:', error)
    return []
  }

  return data || []
}

async function getRecentSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Recent subscribers error:', error)
    return []
  }

  return data || []
}

async function getRecentLikes() {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Recent likes error:', error)
    return []
  }

  return data || []
}

export async function getAdminStats() {
  const [
    bookmarks,
    likes,
    comments,
    subscribers,
    recentComments,
    recentSubscribers,
    recentLikes
  ] = await Promise.all([
    getCount('bookmarks'),
    getCount('likes'),
    getCount('comments'),
    getCount('newsletter_subscribers'),
    getRecentComments(),
    getRecentSubscribers(),
    getRecentLikes()
  ])

  return {
    bookmarks,
    likes,
    comments,
    subscribers,
    recentComments,
    recentSubscribers,
    recentLikes
  }
}