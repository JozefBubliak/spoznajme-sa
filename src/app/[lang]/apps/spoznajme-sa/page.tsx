import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export default async function SpoznajmeSaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const groups = [
    { key: 'partneri', emoji: '💑', label: 'Partneri', desc: 'Otázky, ktoré prehlbujú lásku, dôveru a intimitu.' },
    { key: 'kamarati', emoji: '👫', label: 'Kamaráti', desc: 'Spoznajte sa naozaj — hodnoty, sny, príbehy.' },
    { key: 'rodina', emoji: '👨‍👩‍👦', label: 'Rodina', desc: 'Prepojte generácie. Témy, ktoré ešte nepadli.' },
    { key: 'rodic_dieta', emoji: '👨‍👧', label: 'Rodič–dieťa', desc: 'Bezpečný priestor pre emócie a porozumenie.' },
  ]

  const steps = [
    { n: '1', title: 'Vyber skupinu', desc: 'Partneri, kamaráti, rodina alebo rodič–dieťa.' },
    { n: '2', title: 'Čítaj otázku', desc: 'Každá karta je premyslená — vždy sa dá preskočiť.' },
    { n: '3', title: 'Zdieľaj odpoveď', desc: 'Hovorte, počúvajte, objavujte.' },
  ]

  const tiers = [
    {
      name: 'Zadarmo',
      price: null,
      badge: null,
      features: ['10 otázok z každej skupiny', 'Všetky 4 skupiny', 'Bez registrácie'],
      cta: 'Hrať zadarmo',
      href: `/${lang}/apps/spoznajme-sa/play`,
      highlighted: false,
    },
    {
      name: 'Prihlásený',
      price: null,
      badge: null,
      features: ['2 nové otázky denne z každej skupiny', 'Ukladanie obľúbených', 'História otázok', 'Magic link · Google'],
      cta: 'Prihlásiť sa',
      href: `/auth/login?next=/${lang}/apps/spoznajme-sa/play`,
      highlighted: false,
    },
    {
      name: 'Plný prístup',
      price: '6,99 €',
      badge: 'Navždy',
      features: ['8 000+ otázok bez limitu', 'Všetky skupiny a témy', 'Obľúbené a história', 'Jednorazová platba'],
      cta: 'Odomknúť za 6,99 €',
      href: `/upgrade`,
      highlighted: true,
    },
  ]

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-muted py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative">
          <Link
            href={`/${lang}/apps`}
            className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            ← Späť na Aplikácie
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <span>🃏</span>
            <span>Konverzačné kartičky</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
            <span className="gradient-text">Spoznajme sa</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Premyslené otázky pre partnerov, kamarátov, rodiny.<br />
            Hlbšie rozhovory. Skutočné spojenie.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href={`/${lang}/apps/spoznajme-sa/play`}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Spustiť hru
            </Link>
            <Link
              href={`/${lang}/produkty/karticky`}
              className="px-6 py-3 rounded-lg border text-foreground hover:bg-muted transition-colors font-medium"
            >
              Fyzické edície
            </Link>
            <a
              href="#ako-to-funguje"
              className="px-6 py-3 rounded-lg border text-foreground hover:bg-muted transition-colors font-medium"
            >
              Ako to funguje
            </a>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">Vyber skupinu</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map(g => (
              <Link
                key={g.key}
                href={`/${lang}/apps/spoznajme-sa/play`}
                className="group rounded-2xl border bg-card p-6 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 shadow-sm"
              >
                <div className="text-4xl mb-3">{g.emoji}</div>
                <h3 className="font-semibold text-foreground mb-1">{g.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="ako-to-funguje" className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">Ako to funguje</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(s => (
              <div key={s.n} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {s.n}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-3">Prístup a ceny</h2>
          <p className="text-center text-muted-foreground mb-10">Začni zadarmo, odomkni viac kedy chceš.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map(t => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 flex flex-col gap-4 shadow-sm transition-all ${
                  t.highlighted
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                    : 'bg-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-foreground">{t.name}</h3>
                    {t.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-medium">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  {t.price && (
                    <p className="text-2xl font-black text-primary">{t.price}</p>
                  )}
                </div>
                <ul className="space-y-2 flex-1">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={t.href}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold text-center transition-colors ${
                    t.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border text-foreground hover:bg-muted'
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
