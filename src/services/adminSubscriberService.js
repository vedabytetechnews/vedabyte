import { supabase } from '../lib/supabase'

export async function getAllSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  console.log('SUBSCRIBERS DATA:', data)
  console.log('SUBSCRIBERS ERROR:', error)

  if (error) {
    return []
  }

  return data || []
}

export async function deleteSubscriber(subscriberId) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .delete()
    .eq('id', subscriberId)

  if (error) {
    console.error('DELETE SUBSCRIBER ERROR:', error)
    return false
  }

  return true
}