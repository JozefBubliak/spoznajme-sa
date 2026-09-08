import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Riadok, Volba } from '../../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function ModulTemy({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok={`Modul ${modul.cislo} — ${modul.nazov}`}
      nadpis="Témy v tejto oblasti"
      lead="Každá téma sa opäť otvára vlastným screeningom. Zrkadlové témy majú roly „prijímam / poskytujem“, rizikové majú navyše bezpečnostný rámec."
      spat={{ href: p(cesta.modul(modul.slug)), label: 'Späť na modul' }}
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
      <Volba href={p(cesta.modulHotovo(modul.slug))} nazov="Označiť modul za dokončený" ton="ano" />
    </Krok>
  )
}
