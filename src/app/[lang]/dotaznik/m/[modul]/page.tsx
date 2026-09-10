import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { Krok, Riadok, Volba } from '../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

// Modul = rovno zoznam tém. Screening („Chcem to skúmať?") je až pri téme —
// jedna otázka, nie dve (modul + téma).
export default async function ModulTemy({ params }: P) {
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
      lead={`${modul.popis} Pri každej téme sa spýtame, či ju chcete otvoriť (Áno / Ešte nie / Nie).`}
      spat={{ href: p(cesta.moduly), label: 'Mapa modulov' }}
    >
      {modul.temy.map((t) => (
        <Riadok
          key={t.slug}
          href={p(cesta.tema(modul.slug, t.slug))}
          nazov={t.nazov}
          popis={[t.popis, t.zrkadlova ? '· zrkadlová' : '', t.rizikova ? '· rizikové' : '']
            .filter(Boolean)
            .join(' ')}
          ikona="•"
        />
      ))}

      {dalsi && (
        <Volba href={p(cesta.modul(dalsi.slug))} nazov={`Ďalší modul: ${dalsi.nazov}`} />
      )}
      <Volba href={p(cesta.modulHotovo(modul.slug))} nazov="Označiť modul za dokončený" ton="ano" />
    </Krok>
  )
}
