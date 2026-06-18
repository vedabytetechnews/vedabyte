import { supabase } from '../lib/supabase'

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('GET USERS ERROR:', error)
    return []
  }

  return data || []
}