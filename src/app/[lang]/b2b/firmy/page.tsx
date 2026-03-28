import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function B2BFirmyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/b2b`} className="text-xs text-muted-foreground hover:text-foreground">← Pre organizácie</Link>
          <div className="text-4xl">🏢</div>
          <h1 className="text-4xl font-bold text-foreground">Firemné tímy</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Teambuildingové aktivity a workshopy pre lepšiu komunikáciu, psychologickú bezpečnosť a súdržnosť tímu.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/b2b/dopyt`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Odoslať dopyt
            </Link>
            <Link href={`/${lang}/b2b/workshop`} className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted">
              Workshopy
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: 'Kickoff stretnutie', desc: 'Nový tím, nový projekt. Ľad lámat otázkami, nie aktivitami.' },
            { title: 'Retrospektíva', desc: 'Čo fungovalo? Čo nie? Štruktúrovaný rozhovor po sprinte.' },
            { title: 'Teambuilding', desc: 'Hlbšie ako kvíz. Kratšie ako výlet. Otázky, ktoré spájajú.' },
            { title: 'Onboarding', desc: 'Nový kolega sa rýchlejšie zžije, keď sa pýtame správne veci.' },
            { title: 'Leadership', desc: 'Pre manažérov a vedúcich tímov. Empatia, spätná väzba, dôvera.' },
            { title: 'Remote tím', desc: 'Hybridné a plne vzdialené tímy. Digitálne aj poštou.' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
