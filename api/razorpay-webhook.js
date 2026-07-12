import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export const config = {
  api: {
    bodyParser: false
  }
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
const PLAN_AMOUNT = {
  coffee: 14900,
  pro: 9900
}

function getExpiryDate(plan) {
  const expiry = new Date()

  if (plan === 'coffee') {
    expiry.setMonth(expiry.getMonth() + 3)
  } else {
    expiry.setMonth(expiry.getMonth() + 1)
  }

  return expiry.toISOString()
}

async function readRawBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    )
  }

  return Buffer.concat(chunks)
}

async function activateMembership({
  userId,
  email,
  plan,
  amount,
  orderId,
  paymentId
}) {
  const { data: existingPayment, error: paymentLookupError } =
    await supabase
      .from('payments')
      .select('id, status')
      .eq('razorpay_payment_id', paymentId)
      .maybeSingle()

  if (paymentLookupError) {
    throw paymentLookupError
  }

  if (existingPayment?.status === 'success') {
    return {
      duplicate: true,
      message: 'Payment already processed'
    }
  }

  let paymentRecord = existingPayment

  if (!paymentRecord) {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          user_id: userId,
          email,
          plan,
          amount,
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          status: 'processing'
        }
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    paymentRecord = data
  }

  const expiresAt = getExpiryDate(plan)

  const { data: subscription, error: subscriptionError } =
    await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: userId,
          email,
          plan,
          status: 'active',
          razorpay_payment_id: paymentId,
          expires_at: expiresAt
        }
      ])
      .select()
      .single()

  if (subscriptionError) {
    await supabase
      .from('payments')
      .update({
        status: 'subscription_failed'
      })
      .eq('id', paymentRecord.id)

    throw subscriptionError
  }

  const { error: paymentUpdateError } = await supabase
    .from('payments')
    .update({
      status: 'success'
    })
    .eq('id', paymentRecord.id)

  if (paymentUpdateError) {
    throw paymentUpdateError
  }

  return {
    duplicate: false,
    subscription
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const receivedSignature = req.headers['x-razorpay-signature']

    if (!webhookSecret || !receivedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Webhook secret or signature missing'
      })
    }

    const rawBody = await readRawBody(req)

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex')

    const receivedBuffer = Buffer.from(receivedSignature)
    const expectedBuffer = Buffer.from(expectedSignature)

    const signatureIsValid =
      receivedBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(receivedBuffer, expectedBuffer)

    if (!signatureIsValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook signature'
      })
    }

    const event = JSON.parse(rawBody.toString('utf8'))

    if (
      event.event !== 'payment.captured' &&
      event.event !== 'order.paid'
    ) {
      return res.status(200).json({
        success: true,
        ignored: true
      })
    }

    const paymentEntity =
      event.payload?.payment?.entity

    const orderEntity =
      event.payload?.order?.entity

    if (!paymentEntity) {
      return res.status(400).json({
        success: false,
        message: 'Payment information missing'
      })
    }

    const notes = {
      ...(orderEntity?.notes || {}),
      ...(paymentEntity?.notes || {})
    }

    const userId = notes.user_id
    const email = notes.email
    const plan = notes.plan

    if (
      !userId ||
      !email ||
      !PLAN_AMOUNT[plan]
    ) {
      console.error('Webhook user information missing:', {
        userId,
        email,
        plan,
        paymentId: paymentEntity.id
      })

      return res.status(400).json({
        success: false,
        message: 'User or plan information missing from order notes'
      })
    }

    const result = await activateMembership({
      userId,
      email,
      plan,
      amount: paymentEntity.amount || PLAN_AMOUNT[plan],
      orderId: paymentEntity.order_id || orderEntity?.id,
      paymentId: paymentEntity.id
    })

    return res.status(200).json({
      success: true,
      duplicate: result.duplicate
    })
  } catch (error) {
    console.error('Razorpay webhook error:', error)

    return res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    })
  }
}