import { supabase } from '../lib/supabase'

export async function getUserSubscription(userId) {
  if (!userId) return null

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Get subscription error:', error)
    return null
  }

  if (!data) return null

  const isPaidPlan = data.plan === 'pro' || data.plan === 'coffee'

  const expiryTime = data.expires_at
    ? new Date(data.expires_at).getTime()
    : null

  const isExpired =
    isPaidPlan &&
    expiryTime !== null &&
    expiryTime <= Date.now()

  if (!isExpired) {
    return data
  }

  // Immediately treat the user as expired in the UI.
  // This works even if the database update is blocked by RLS.
  const expiredSubscription = {
    ...data,
    plan: 'free',
    status: 'expired',
    previous_plan: data.plan,
  }

  const { error: updateError } = await supabase
    .from('subscriptions')
    .update({
      plan: 'free',
      status: 'expired',
    })
    .eq('id', data.id)

  if (updateError) {
    console.warn(
      'Subscription expired, but database update was blocked:',
      updateError
    )
  }

  return expiredSubscription
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

export async function activatePaidPlan(user, plan, paymentId) {
  const expiresAt = new Date()

  if (plan === 'coffee') {
    expiresAt.setMonth(expiresAt.getMonth() + 3)
  }

  if (plan === 'pro') {
    expiresAt.setMonth(expiresAt.getMonth() + 1)
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: user.id,
        email: user.email,
        plan,
        status: 'active',
        razorpay_payment_id: paymentId,
        expires_at: expiresAt.toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Activate paid plan error:', error)
    throw error
  }

  return data
}

export async function activatePro(userId, paymentId) {
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 1)

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: userId,
        plan: 'pro',
        status: 'active',
        razorpay_payment_id: paymentId,
        expires_at: expiresAt.toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Activate Pro error:', error)
    throw error
  }

  return data
}