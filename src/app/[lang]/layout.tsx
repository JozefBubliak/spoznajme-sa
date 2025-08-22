// PATH: src/app/[lang]/layout.tsx
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { IntlProvider } from '@/components/IntlProvider'
import SiteHeader from '@/components/SiteHeader'        // ⬅️ default import (opravuje "not exported")
import { getDictionary } from '@/i18n/server'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

type P = {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>                      // ⬅️ params ako Promise (Next.js 15)
}

export default async function LangLayout({ children, params }: P) {
  const { lang } = await params                           // ⬅️ await params

  if (!SUPPORTED_LOCALES.includes(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <IntlProvider lang={lang} dict={dict}>
      <Suspense fallback={null}>
        <SiteHeader lang={lang} />
      </Suspense>
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
