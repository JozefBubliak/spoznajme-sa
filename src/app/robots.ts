import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // neverejné pracovné vetvy
      disallow: ['/dotaznik', '/*/dotaznik', '/intimne-dobrodruzstvo', '/api/intimne-dobrodruzstvo', '/*/apps/intimne-dobrodruzstvo'],
    },
    sitemap: 'https://deeptalks.eu/sitemap.xml',
  }
}
