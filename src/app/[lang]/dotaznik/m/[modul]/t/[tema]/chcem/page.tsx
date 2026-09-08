import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, sekcieTemy, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../../../_ui'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

export default async function TemaChcem({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found
  const p = (s: string) => `/${lang}${s}`

  // Áno → rola (ak zrkadlová) alebo rovno prvá sekcia; Ešte nie / Nie → zámok.
  const prvaSekcia = sekcieTemy(tema)[0]
  const anoHref = tema.zrkadlova
    ? cesta.temaRola(modul.slug, tema.slug)
    : cesta.temaSekcia(modul.slug, tema.slug, prvaSekcia.id)

  return (
    <Krok
      krok={`${tema.nazov} — screening`}
      nadpis={`Chceš skúmať tému „${tema.nazov}“?`}
      lead="Ak jeden z vás zvolí „Nie“ alebo „Ešte nie“, téma sa zamkne obom."
      spat={{ href: p(cesta.tema(modul.slug, tema.slug)), label: 'Späť na tému' }}
    >
      <Volba href={p(anoHref)} nazov="Áno, chcem to skúmať" ton="ano" />
      <Volba
        href={p(`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=docasny`)}
        nazov="Ešte nie"
        popis="Dočasný zámok."
        ton="mozno"
      />
      <Volba
        href={p(`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=trvaly`)}
        nazov="Nie"
        popis="Trvalý zámok."
        ton="nie"
      />
    </Krok>
  )
}
