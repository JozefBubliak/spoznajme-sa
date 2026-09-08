import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function ModulIntro({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`
  const dalsi = susednyModul(modul.slug, 'dalej')

  return (
    <Krok
      krok={`Modul ${modul.cislo} — ${modul.ikona}`}
      nadpis={modul.nazov}
      lead={modul.popis}
      spat={{ href: p(cesta.moduly), label: 'Mapa modulov' }}
    >
      <Volba
        href={p(cesta.modulChcem(modul.slug))}
        nazov="Chcem túto oblasť skúmať?"
        popis="Vstupná voľba bez tlaku — Áno / Ešte nie / Nie."
        ton="ano"
      />
      {dalsi && (
        <Volba
          href={p(cesta.modul(dalsi.slug))}
          nazov={`Preskočiť na: ${dalsi.nazov}`}
          popis="Modul si môžeš otvoriť aj neskôr."
        />
      )}
    </Krok>
  )
}
