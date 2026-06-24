import { supabase } from '../lib/supabase'

export async function getUserSubscription(userId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function createFreeSubscription(user) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: user.id,
        email: user.email,
        plan: 'free',
        status: 'active'
      }
    ])
    .select()
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function activatePro(userId, paymentId) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update({
      plan: 'pro',
      status: 'active',
      razorpay_payment_id: paymentId
    })
    .eq('user_id', userId)
    .select()

  if (error) {
    console.error('Activate Pro error:', error)
    throw error
  }

  console.log('Pro activated:', data)
  return data
}

