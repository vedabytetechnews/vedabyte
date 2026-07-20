const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VedaByte',
  alternateName: 'VedaByte Technology News',
  url: 'https://vedabyte-delta.vercel.app/',
  description:
    'Premium AI, startup, cybersecurity and technology news.',

  publisher: {
    '@type': 'Organization',
    name: 'VedaByte',
    url: 'https://vedabyte-delta.vercel.app/'
  },

  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate:
        'https://vedabyte-delta.vercel.app/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export default websiteSchema