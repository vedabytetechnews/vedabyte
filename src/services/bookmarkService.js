import { supabase } from '../lib/supabase'

export async function saveBookmark(userId, article) {
  const { data, error } = await supabase
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
    .select()

  console.log('BOOKMARK DATA:', data)
  console.error('BOOKMARK ERROR FULL')
console.error(JSON.stringify(error, null, 2))
console.error(error)

  if (error) {
    return false
  }

  return true
}

export async function getBookmarks(userId) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
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
    console.error(error)
    return false
  }

  return true
}