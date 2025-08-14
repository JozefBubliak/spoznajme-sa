import { notFound } from 'next/navigation'
import '../globals.css'
import SiteHeader from '@/components/SiteHeader'
import { IntlProvider } from '@/components/IntlProvider'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/server'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  if (!SUPPORTED_LOCALES.includes(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <IntlProvider lang={lang} dict={dict}>
      <SiteHeader lang={lang} />
      <main><div className="max-w-6xl mx-auto px-4 py-8">{children}</div></main>
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} DeepTalks</div>
      </footer>
    </IntlProvider>
  )
}
