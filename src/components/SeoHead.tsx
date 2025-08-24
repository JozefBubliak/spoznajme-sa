import React from 'react'

type Props = { jsonLd?: object | object[] }

export function SeoHead({ jsonLd }: Props) {
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
  return (
    <>
      {blocks.map((b, i) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
          key={i}
          type="application/ld+json"
        />
      ))}
    </>
  )
}
