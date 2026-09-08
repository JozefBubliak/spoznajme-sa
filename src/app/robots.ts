import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // neverejné pracovné vetvy
      disallow: ['/dotaznik', '/*/dotaznik'],
    },
    sitemap: 'https://deeptalks.eu/sitemap.xml',
  }
}
