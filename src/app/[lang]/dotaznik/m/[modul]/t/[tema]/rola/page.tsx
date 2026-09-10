import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, sekcieTemy, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../../../_ui'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) =>
    m.temy.filter((t) => t.zrkadlova).map((t) => ({ modul: m.slug, tema: t.slug })),
  )
}

// Vetva pre zrkadlové témy: prijímam / poskytujem / oboje.
export default async function TemaRola({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found || !found.tema.zrkadlova) notFound()
  const { modul, tema } = found
  const p = (s: string) => `/${lang}${s}`
  const prva = sekcieTemy(tema)[0].id

  return (
    <Krok
      krok={`${tema.nazov} — rola`}
      nadpis="Ako chceš pri tejto téme vystupovať?"
      lead="Zrkadlové otázky (napr. „chcem prijímať“ vs „chcem poskytovať“) sa spočítajú zvlášť pre každú rolu."
      spat={{ href: p(cesta.tema(modul.slug, tema.slug)), label: 'Späť na screening' }}
    >
      <Volba href={p(cesta.temaSekcia(modul.slug, tema.slug, prva))} nazov="Chcem prijímať" />
      <Volba href={p(cesta.temaSekcia(modul.slug, tema.slug, prva))} nazov="Chcem poskytovať" />
      <Volba href={p(cesta.temaSekcia(modul.slug, tema.slug, prva))} nazov="Oboje / zaujíma ma to zo všetkých strán" ton="ano" />
    </Krok>
  )
}
