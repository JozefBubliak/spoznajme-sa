import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Button } from '@/components/ui/button'

type P = { params: Promise<{ lang: string }> }

export default async function CardsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  const game = dict.apps.games.cards
  const back = dict.apps.games.ctaBack

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{game.name}</h1>
        <p className="text-lg text-muted-foreground">{game.description}</p>
        <Image
          src="/images/placeholder.jpg"
          alt=""
          width={600}
          height={300}
          className="mx-auto rounded-lg"
        />
        <Button asChild size="lg" className="mt-4">
          <Link href={`/${lang}${game.link}`}>{game.cta}</Link>
        </Button>
      </div>

      <section className="mx-auto max-w-xl space-y-4">
        <h2 className="text-2xl font-semibold text-center">Ako to funguje</h2>
        <ol className="list-decimal list-inside space-y-2 text-left">
          {game.manual.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="text-center">
        <Button variant="link" asChild>
          <Link href={`/${lang}/apps`}>{back}</Link>
        </Button>
      </div>
    </div>
  )
}
