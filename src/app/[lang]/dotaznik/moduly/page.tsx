import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, DOMENY, modulyDomeny } from '@/lib/dotaznik/strom'
import { Krok, Riadok } from '../_ui'

type P = { params: Promise<{ lang: string }> }

const citlivostLabel: Record<number, string> = { 1: 'jemné', 2: 'stredné', 3: 'citlivé' }

export default async function ModulyMapa({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Mapa tém"
      nadpis="9 oblastí, 56 modulov. Poradie je odporúčané, nie povinné."
      lead="Vyber si oblasť a modul. Každý modul sa otvára otázkou „Chcem to skúmať?“ a vetví sa na okruhy a konkrétne položky."
      spat={{ href: p(cesta.atlas), label: 'Atlas' }}
      siroky
    >
      {DOMENY.map((d) => {
        const moduly = modulyDomeny(d.id)
        return (
          <section key={d.id} className="space-y-3">
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-xl">{d.ikona}</span>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/90">
                  {d.id} · {d.nazov}
                </h2>
                <p className="text-xs text-muted-foreground">{d.popis}</p>
              </div>
            </div>
            {moduly.map((m) => (
              <Riadok
                key={m.slug}
                href={p(cesta.modul(m.slug))}
                ikona={m.ikona}
                nazov={`${m.kod} · ${m.nazov}`}
                popis={[
                  `${citlivostLabel[m.citlivost]}`,
                  `${m.temy.length} okruhov`,
                  m.zrkadlovy ? '⇄ zrkadlový' : '',
                  m.rizikovy ? '🔒 rizikový' : '',
                  m.tier1 ? '★ základ' : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
              />
            ))}
          </section>
        )
      })}
    </Krok>
  )
}
