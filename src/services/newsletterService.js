import { supabase } from '../lib/supabase'

async function syncToBrevo(email) {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      console.warn('Brevo sync failed:', data)
    }

    return response.ok
  } catch (error) {
    console.warn('Brevo sync skipped or failed:', error)
    return false
  }
}

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
    await syncToBrevo(cleanEmail)

    return {
      success: false,
      message: 'This email is already subscribed. We also checked Brevo sync.'
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

  await syncToBrevo(cleanEmail)

  return {
    success: true,
    message: 'Successfully subscribed!'
  }
}