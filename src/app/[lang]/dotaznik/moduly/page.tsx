import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Riadok, Fazy } from '../_ui'

type P = { params: Promise<{ lang: string }> }

const citlivostLabel: Record<number, string> = {
  1: 'jemné',
  2: 'stredné',
  3: 'citlivé',
}

export default async function ModulyMapa({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <>
      <Fazy aktivna={4} />
      <Krok
        krok="Mapa modulov"
        nadpis="11 oblastí, od jemných po citlivé. Poradie je odporúčané, nie povinné."
        lead="Každý modul sa otvára otázkou „Chcem to skúmať?“. Môžeš ísť po poradí alebo si vybrať."
        spat={{ href: p(cesta.atlas), label: 'Atlas' }}
      >
        {MODULY.map((m) => (
          <Riadok
            key={m.slug}
            href={p(cesta.modul(m.slug))}
            cislo={m.cislo}
            ikona={m.ikona}
            nazov={`${m.cislo}. ${m.nazov}`}
            popis={`${citlivostLabel[m.citlivost]} · ${m.temy.length} tém`}
          />
        ))}
      </Krok>
    </>
  )
}
