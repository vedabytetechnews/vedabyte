import { supabase } from '../lib/supabase'

export async function saveBookmark(userId, article) {
  const { error } = await supabase
    .from('bookmarks')
    .insert([
      {
        user_id: userId,
        article_id: article.id,
        article_title: article.title,
        article_category: article.category,
        article_image: article.image
      }
    ])

  if (error) {
    console.error('SAVE BOOKMARK ERROR:', error)
    return false
  }

  return true
}

export async function getBookmarks(userId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('id,user_id,article_id,article_title,article_category,article_image,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET BOOKMARKS ERROR:', error)
    return []
  }

  return data
}

export async function removeBookmark(bookmarkId) {
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId)

  if (error) {
    console.error('REMOVE BOOKMARK ERROR:', error)
    return false
  }

  return true
}