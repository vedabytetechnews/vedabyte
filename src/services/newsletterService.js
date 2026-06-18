import { supabase } from '../lib/supabase'

export async function subscribeEmail(email) {
  const cleanEmail = email.trim().toLowerCase()

  const { data: existing, error: checkError } = await supabase
    .from('newsletter_subscribers')
    .select('id,email')
    .eq('email', cleanEmail)
    .maybeSingle()

  if (checkError) {
    console.error(checkError)
    return {
      success: false,
      message: 'Something went wrong. Please try again.'
    }
  }

  if (existing) {
    return {
      success: false,
      message: 'This email is already subscribed.'
    }
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([
      {
        email: cleanEmail,
        verified: false
      }
    ])

  if (error) {
    console.error(error)
    return {
      success: false,
      message: 'Subscription failed. Please try again.'
    }
  }

  try {
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cleanEmail })
    })
  } catch (error) {
    console.warn('Brevo sync skipped in local dev:', error)
  }

  return {
    success: true,
    message: 'Successfully subscribed!'
  }
}