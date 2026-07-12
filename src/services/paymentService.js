export async function createOrder(plan, user) {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      plan,
      user
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create order')
  }

  return data.order
}

export async function verifyPayment(payload) {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Payment verification failed')
  }

  return data.subscription
}