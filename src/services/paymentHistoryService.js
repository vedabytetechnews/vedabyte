import { supabase } from '../lib/supabase'

export async function getPaymentHistory(userId) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Payment history error:', error)
    return []
  }

  return data || []
}