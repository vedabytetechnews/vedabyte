export function formatRelativeTime(dateString) {
  const now = new Date()
  const date = new Date(dateString)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  if (diff < 172800) return 'Yesterday'
  return `${Math.floor(diff / 86400)} days ago`
}

export function calculateReadTime(text) {
  if (!text) return '1 min read'
  const words = text.split(' ').length
  return `${Math.ceil(words / 200)} min read`
}

export function getCategoryColor(category) {
  const colors = {
    ai: 'bg-purple-500/20 text-purple-300',
    cybersecurity: 'bg-red-500/20 text-red-300',
    dev: 'bg-blue-500/20 text-blue-300',
    startups: 'bg-green-500/20 text-green-300',
    tech: 'bg-yellow-500/20 text-yellow-300',
    all: 'bg-gray-500/20 text-gray-300'
  }
  return colors[category] || colors.tech
}