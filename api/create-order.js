import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const PLAN_PRICES = {
  coffee: 14900,
  pro: 9900
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { plan, user } = req.body

    if (!PLAN_PRICES[plan]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected'
      })
    }

    if (!user?.id || !user?.email) {
      return res.status(400).json({
        success: false,
        message: 'Signed-in user information is required'
      })
    }

    const order = await razorpay.orders.create({
      amount: PLAN_PRICES[plan],
      currency: 'INR',
      receipt: `vedabyte_${plan}_${Date.now()}`,
      notes: {
        plan,
        user_id: user.id,
        email: user.email
      }
    })

    return res.status(200).json({
      success: true,
      order
    })
  } catch (error) {
    console.error('Create order error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order'
    })
  }
}