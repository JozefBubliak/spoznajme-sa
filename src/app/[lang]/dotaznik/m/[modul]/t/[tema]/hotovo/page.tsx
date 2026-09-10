import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, getTema, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../../../_ui'

type P = {
  params: Promise<{ lang: string; modul: string; tema: string }>
  searchParams: Promise<{ stav?: string }>
}

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

export default async function TemaHotovo({ params, searchParams }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const { stav } = await searchParams
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found
  const p = (s: string) => `/${lang}${s}`

  const modulObj = getModul(modul.slug)!
  const index = modulObj.temy.findIndex((t) => t.slug === tema.slug)
  const dalsiaTema = modulObj.temy[index + 1]

  const zamknute = stav === 'trvaly' || stav === 'docasny'
  const nadpis = zamknute
    ? stav === 'trvaly'
      ? `Téma „${tema.nazov}“ je uzavretá.`
      : `Téma „${tema.nazov}“ je odložená.`
    : `Téma „${tema.nazov}“ hotová.`

  return (
    <Krok
      krok={zamknute ? 'Zamknuté' : 'Téma dokončená'}
      nadpis={nadpis}
      lead={
        zamknute
          ? 'Partner uvidí len stav zámku. Zmeniť voľbu môžeš cez screening témy.'
          : 'Zhoda sa ukáže, keď túto tému dokončí aj partner/ka.'
      }
      spat={{ href: p(cesta.tema(modul.slug, tema.slug)), label: 'Zmeniť voľbu' }}
    >
      {dalsiaTema ? (
        <Volba
          href={p(cesta.tema(modul.slug, dalsiaTema.slug))}
          nazov={`Ďalšia téma: ${dalsiaTema.nazov}`}
          ton="ano"
        />
      ) : (
        <Volba href={p(cesta.modulHotovo(modul.slug))} nazov="Dokončiť modul" ton="ano" />
      )}
      <Volba href={p(cesta.modulTemy(modul.slug))} nazov="Späť na zoznam tém" />
    </Krok>
  )
}
