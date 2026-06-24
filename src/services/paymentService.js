export async function createOrder() {
  const response = await fetch('/api/create-order', {
    method: 'POST'
  })

  const data = await response.json()

  return data.order
}