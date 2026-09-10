import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { Volba } from '../../_ui'
import Screening from '../../_screening'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

// Jedna obrazovka: rámec modulu + screening „Áno / Ešte nie / Nie" spolu.
export default async function ModulIntro({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`
  const dalsi = susednyModul(modul.slug, 'dalej')

  return (
    <Screening
      lang={lang}
      modul={modul.slug}
      tema={null}
      nazov={modul.nazov}
      krok={`Modul ${modul.cislo} — ${modul.ikona}`}
      nadpis={modul.nazov}
      lead={`${modul.popis} — Chceš túto oblasť skúmať? „Nie“ alebo „Ešte nie“ ju zamkne aj partnerovi; dôvod sa nezobrazí.`}
      spatHref={cesta.moduly}
      cielAno={cesta.modulTemy(modul.slug)}
      cielEsteNie={`${cesta.modulZamknute(modul.slug)}?typ=docasny`}
      cielNie={`${cesta.modulZamknute(modul.slug)}?typ=trvaly`}
      neskorHref={cesta.moduly}
      neskorLabel="Rozhodnem sa neskôr — späť na moduly"
      extra={
        dalsi ? (
          <Volba
            href={p(cesta.modul(dalsi.slug))}
            nazov={`Preskočiť na: ${dalsi.nazov}`}
            popis="Modul si môžeš otvoriť aj neskôr."
          />
        ) : null
      }
    />
  )
}
