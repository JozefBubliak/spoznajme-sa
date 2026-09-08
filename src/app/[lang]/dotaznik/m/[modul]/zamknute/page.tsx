import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../_ui'

type P = {
  params: Promise<{ lang: string; modul: string }>
  searchParams: Promise<{ typ?: string }>
}

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function ModulZamknute({ params, searchParams }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const { typ } = await searchParams
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`
  const trvaly = typ === 'trvaly'
  const dalsi = susednyModul(modul.slug, 'dalej')

  return (
    <Krok
      krok="Zamknuté"
      nadpis={
        trvaly
          ? `Oblasť „${modul.nazov}“ je pre vás uzavretá.`
          : `Oblasť „${modul.nazov}“ máš zatiaľ odloženú.`
      }
      lead={
        trvaly
          ? 'Partner uvidí len ikonu trvalého zámku, bez detailov. Ak chceš, môžeš pridať jednovetový dôvod (voliteľné).'
          : 'Partner uvidí ikonu dočasného zámku. Kedykoľvek sa sem môžeš vrátiť a oblasť odomknúť.'
      }
      spat={{ href: p(cesta.modulChcem(modul.slug)), label: 'Zmeniť voľbu' }}
    >
      {!trvaly && (
        <Volba
          href={p(cesta.modulChcem(modul.slug))}
          nazov="Odomknúť teraz"
          popis="Znova otvorí screening — zvoľ „Áno“."
          ton="ano"
        />
      )}
      {dalsi && (
        <Volba href={p(cesta.modul(dalsi.slug))} nazov={`Pokračovať: ${dalsi.nazov}`} />
      )}
      <Volba href={p(cesta.moduly)} nazov="Späť na mapu modulov" />
    </Krok>
  )
}
