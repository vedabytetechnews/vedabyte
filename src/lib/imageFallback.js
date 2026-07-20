const FALLBACK_IMAGE = '/og-image.png'

const BLOCKED_DOMAINS = [
  'gematsu.com',
  'www.gematsu.com'
]

export function getSafeImageUrl(image) {
  if (!image) {
    return FALLBACK_IMAGE
  }

  try {
    const url = new URL(image)

    if (
      BLOCKED_DOMAINS.some(domain =>
        url.hostname.includes(domain)
      )
    ) {
      return FALLBACK_IMAGE
    }

    return image
  } catch {
    return FALLBACK_IMAGE
  }
}

export function handleImageError(event) {
  event.currentTarget.onerror = null
  event.currentTarget.src = FALLBACK_IMAGE
}