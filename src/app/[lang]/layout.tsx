import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { IntlProvider, type Dictionary } from '@/components/IntlProvider'
import SiteHeader from '@/components/SiteHeader'
import { getDictionary } from '@/i18n/server'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const { lang } = params
  if (!SUPPORTED_LOCALES.includes(lang)) notFound()

  const dict = (await getDictionary(lang)) as Dictionary

  return (
    <IntlProvider lang={lang} dict={dict}>
      <Suspense fallback={null}>
        <SiteHeader lang={lang} />
      </Suspense>
      {children}
    </IntlProvider>
  )
}

