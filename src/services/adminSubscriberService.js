import { supabase } from '../lib/supabase'

export async function getAllSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export async function getSubscribers() {
  return getAllSubscribers()
}

export async function getNewsletterSubscribers() {
  return getAllSubscribers()
}

export async function deleteSubscriber(id) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    return false
  }

  return true
}