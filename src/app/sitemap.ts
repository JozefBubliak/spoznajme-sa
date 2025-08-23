import type { MetadataRoute } from 'next'

const languages = ['en','sk','cs','pl','hu','fr','de','uk','ru','es']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const now = new Date().toISOString()
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    ...languages.map((l) => ({ url: `${base}/${l}`, lastModified: now })),
    ...languages.map((l) => ({ url: `${base}/${l}/pomocky`, lastModified: now })),
  ]
  return entries
}
