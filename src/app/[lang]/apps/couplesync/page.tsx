import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'CoupleSync – vzťahový dotazník | DeepTalks',
  description:
    'Partnerský dotazník, ktorý vám pomôže zosúladiť očakávania aj túžby. Vyplňte ho každý zvlášť a porovnajte výsledky.',
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  const game = dict.apps.games.couplesync
  const back = dict.apps.games.ctaBack
  const how = dict.apps.games.how

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <Link
        href={`/${lang}/apps`}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← {back}
      </Link>

      <header className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl font-semibold tracking-tight">{game.name}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
          {game.description}
        </p>
        <div className="flex gap-3 pt-1 justify-center md:justify-start">
          <Link
            href={game.link}
            className="px-4 py-2 rounded-md bg-black text-white text-sm"
          >
            {game.cta}
          </Link>
          <a
            href="#how"
            className="px-4 py-2 rounded-md border text-sm"
          >
            {how}
          </a>
        </div>
      </header>

      <section id="how" className="grid md:grid-cols-3 gap-6">
        {game.manual.map((step: string, i: number) => (
          <div key={i} className="rounded-xl border p-5">
            <h3 className="font-medium">{i + 1}. {step}</h3>
          </div>
        ))}
      </section>
    </div>
  )
}
