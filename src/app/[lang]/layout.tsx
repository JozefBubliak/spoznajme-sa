// PATH: src/app/[lang]/layout.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { IntlProvider } from '@/components/IntlProvider'
import { SiteHeader } from '@/components/SiteHeader'
import { getDictionary } from '@/i18n/server'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

type Props = {
  children: React.ReactNode
  params: { lang: Locale }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = params
  if (!SUPPORTED_LOCALES.includes(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <IntlProvider lang={lang} dict={dict}>
      <SiteHeader lang={lang} />
      <main>
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} DeepTalks
        </div>
      </footer>
    </IntlProvider>
  )
}
