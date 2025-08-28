'use client'
import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEO({
  title = 'Spoznajme sa – tímová kvízová hra',
  description = 'Zábavný kvíz pre tímy, školy a akcie. Spoznaj sa cez otázky a body!',
  image = 'https://deeptalks.eu/og-image.jpg',
  url = 'https://deeptalks.eu/sk/apps/quiz'
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
