export async function createOrder(plan) {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plan })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create order')
  }

  return data.order
}