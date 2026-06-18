import { supabase } from '../lib/supabase'

export async function getUserRole(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error('GET USER ROLE ERROR:', error)
    return 'user'
  }

  return data?.role || 'user'
}