import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function ModulHotovo({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`
  const dalsi = susednyModul(modul.slug, 'dalej')

  return (
    <Krok
      krok="Modul dokončený"
      nadpis={`„${modul.nazov}“ máš za sebou.`}
      lead="Zhodu uvidíš až po tom, čo túto oblasť dokončí aj partner/ka."
      spat={{ href: p(cesta.modul(modul.slug)), label: 'Späť na zoznam tém' }}
    >
      {dalsi ? (
        <Volba href={p(cesta.modul(dalsi.slug))} nazov={`Ďalší modul: ${dalsi.nazov}`} ton="ano" />
      ) : (
        <Volba href={p(cesta.hotovo)} nazov="Dokončiť celý dotazník" ton="ano" />
      )}
      <Volba href={p(cesta.moduly)} nazov="Späť na mapu modulov" />
    </Krok>
  )
}
