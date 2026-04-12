import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

const tiers = [
  {
    name: 'Zadarmo',
    price: '0 €',
    period: '',
    desc: 'Pre každého. Základný prístup k otázkam.',
    features: ['5 otázok denne', 'Všetky skupiny', 'Základný filter'],
    cta: 'Začni zadarmo',
    ctaHref: '/apps/spoznajme-sa',
    primary: false,
  },
  {
    name: 'Daily Connection',
    price: '4 €',
    period: '/mes',
    desc: 'Denná otázka, streak, história. Pre pravidelných používateľov.',
    features: ['Neobmedzené otázky', 'Denný streak', 'História otázok', 'Obľúbené', 'Prioritná podpora'],
    cta: 'Predplatiť',
    ctaHref: '/apps/daily-connection',
    primary: true,
  },
  {
    name: 'Legacy 52',
    price: '39 €',
    period: '/rok',
    desc: '52 otázok ročne + viazaná kniha s odpoveďami. Archív na celý život.',
    features: ['52 kurátorovaných otázok ročne', 'Viazaná kniha na konci roka', 'Tlačená verzia na objednávku', 'Osobná história'],
    cta: 'Čoskoro',
    ctaHref: '#',
    primary: false,
    soon: true,
  },
]

export default async function PredplatnePage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">← Produkty</Link>
          <div className="text-4xl">✨</div>
          <h1 className="text-4xl font-bold text-foreground">Predplatné</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Digitálne predplatné pre pravidelné rozhovory. Daily Connection Premium alebo Legacy ročná kniha.
          </p>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-6 shadow-sm flex flex-col ${tier.primary ? 'border-primary/40 bg-primary/5' : 'bg-card'}`}
            >
              {tier.primary && (
                <span className="self-start text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium mb-3">
                  Odporúčame
                </span>
              )}
              {tier.soon && (
                <span className="self-start text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border font-medium mb-3">
                  Čoskoro
                </span>
              )}
              <h2 className="font-semibold text-foreground">{tier.name}</h2>
              <div className="mt-2 mb-3">
                <span className="text-2xl font-bold text-primary">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{tier.desc}</p>
              <ul className="space-y-1.5 mb-6 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="text-primary">·</span>{f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.soon ? '#' : `/${lang}${tier.ctaHref}`}
                className={`block text-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tier.soon
                    ? 'border text-muted-foreground opacity-50 cursor-not-allowed pointer-events-none'
                    : tier.primary
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border text-foreground hover:bg-muted'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
