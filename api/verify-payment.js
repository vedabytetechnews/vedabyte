import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PLAN_AMOUNT = {
  coffee: 14900,
  pro: 9900
}

function getExpiryDate(plan) {
  const date = new Date()

  if (plan === 'coffee') {
    date.setMonth(date.getMonth() + 3)
  } else if (plan === 'pro') {
    date.setMonth(date.getMonth() + 1)
  }

  return date.toISOString()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const {
      user,
      plan,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    if (
      !user?.id ||
      !user?.email ||
      !plan ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment data'
      })
    }

    if (!PLAN_AMOUNT[plan]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid membership plan'
      })
    }

    const signatureBody =
      `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(signatureBody)
      .digest('hex')

    const receivedBuffer = Buffer.from(razorpay_signature)
    const expectedBuffer = Buffer.from(expectedSignature)

    const signatureIsValid =
      receivedBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(receivedBuffer, expectedBuffer)

    if (!signatureIsValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      })
    }

    /*
     * Prevent the same Razorpay payment from being recorded twice.
     */
    const { data: existingPayment, error: existingPaymentError } =
      await supabase
        .from('payments')
        .select('id')
        .eq('razorpay_payment_id', razorpay_payment_id)
        .maybeSingle()

    if (existingPaymentError) {
      console.error(
        'Payment lookup failed:',
        existingPaymentError
      )

      return res.status(500).json({
        success: false,
        message: 'Unable to check payment record'
      })
    }

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: 'This payment has already been processed'
      })
    }

    const { data: payment, error: paymentError } =
      await supabase
        .from('payments')
        .insert([
          {
            user_id: user.id,
            email: user.email,
            plan,
            amount: PLAN_AMOUNT[plan],
            razorpay_order_id,
            razorpay_payment_id,
            status: 'success'
          }
        ])
        .select()
        .single()

    if (paymentError) {
      console.error('Payment record insert failed:', paymentError)

      return res.status(500).json({
        success: false,
        message: 'Payment was verified, but payment history could not be saved'
      })
    }

    const expiresAt = getExpiryDate(plan)

    const { data: subscription, error: subscriptionError } =
      await supabase
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

    if (subscriptionError) {
      console.error(
        'Subscription activation failed:',
        subscriptionError
      )

      /*
       * Keep the successful payment record, but mark it so the
       * problem is visible to the admin.
       */
      await supabase
        .from('payments')
        .update({
          status: 'subscription_failed'
        })
        .eq('id', payment.id)

      return res.status(500).json({
        success: false,
        message:
          'Payment succeeded, but membership activation failed. Please contact support.'
      })
    }

    return res.status(200).json({
      success: true,
      payment,
      subscription
    })
  } catch (error) {
    console.error('Payment verification error:', error)

    return res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    })
  }
}