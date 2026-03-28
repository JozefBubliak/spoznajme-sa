import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { IntlProvider } from '@/components/IntlProvider'
import SiteHeader from '@/components/SiteHeader'
import { getDictionary } from '@/i18n/server'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

type P = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: P) {
  const { lang: rawLang } = await params
  const lang = rawLang as Locale

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
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} DeepTalks
        </div>
      </footer>
    </IntlProvider>
  )
}

