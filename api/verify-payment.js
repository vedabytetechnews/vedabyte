import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function getExpiryDate(plan) {
  const date = new Date()

  if (plan === 'coffee') {
    date.setMonth(date.getMonth() + 3)
  } else {
    date.setMonth(date.getMonth() + 1)
  }

  return date.toISOString()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      user,
      plan,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    if (!user?.id || !user?.email || !plan) {
      return res.status(400).json({ message: 'Missing user or plan data' })
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: 'Payment verification failed'
      })
    }

    const expiresAt = getExpiryDate(plan)

    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: user.id,
          email: user.email,
          plan,
          status: 'active',
          razorpay_payment_id,
          expires_at: expiresAt
        }
      ])
      .select()
      .single()

    if (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Subscription activation failed'
      })
    }

    return res.status(200).json({
      success: true,
      subscription: data
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Payment verification failed'
    })
  }
}