import { supabase } from '../lib/supabase'

export async function subscribeEmail(email) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([
      {
        email,
        verified: false
      }
    ])

  if (error) {
    console.error(error)
    return false
  }

  return true
}