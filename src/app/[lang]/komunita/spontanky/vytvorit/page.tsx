import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { CreateForm } from '@/components/spontanky/CreateForm'

type P = { params: Promise<{ lang: string }> }

export default async function VytvorSpontankuPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href={`/${lang}/komunita/spontanky`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Spontánky
          </Link>
          <h1 className="text-2xl font-bold text-foreground mt-3">Vytvoriť spontánku</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Neformálne stretnutie — bez vstupného, bez pódia, každý za seba.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <CreateForm lang={lang} />
      </div>
    </div>
  )
}
