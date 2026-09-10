import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, sekcieTemy, MODULY } from '@/lib/dotaznik/strom'
import Screening from '../../../../_screening'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

// Jedna obrazovka: rámec témy + screening „Áno / Ešte nie / Nie" spolu.
export default async function TemaIntro({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found

  const prvaSekcia = sekcieTemy(tema)[0]
  const cielAno = tema.zrkadlova
    ? cesta.temaRola(modul.slug, tema.slug)
    : cesta.temaSekcia(modul.slug, tema.slug, prvaSekcia.id)

  return (
    <Screening
      lang={lang}
      modul={modul.slug}
      tema={tema.slug}
      nazov={tema.nazov}
      krok={`${modul.nazov} — téma`}
      nadpis={tema.nazov}
      lead={[tema.popis, 'Chceš túto tému skúmať? „Nie“ alebo „Ešte nie“ ju zamkne aj partnerovi; dôvod sa nezobrazí.']
        .filter(Boolean)
        .join(' — ')}
      spatHref={cesta.modul(modul.slug)}
      cielAno={cielAno}
      cielEsteNie={`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=docasny`}
      cielNie={`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=trvaly`}
      neskorHref={cesta.modul(modul.slug)}
      neskorLabel="Rozhodnem sa neskôr — späť na zoznam tém"
      extra={
        tema.zrkadlova || tema.rizikova ? (
          <>
            {tema.zrkadlova && (
              <div className="rounded-2xl border border-border/70 bg-card/40 p-4 text-xs text-muted-foreground">
                Zrkadlová téma: po voľbe „Áno“ si zvolíš rolu — <strong>prijímam</strong>,{' '}
                <strong>poskytujem</strong> alebo <strong>oboje</strong>.
              </div>
            )}
            {tema.rizikova && (
              <div className="rounded-2xl border border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 p-4 text-xs text-[hsl(var(--warning))]">
                Rizikové praktiky: téma má navyše sekciu s bezpečnostným rámcom a kontraindikáciami.
              </div>
            )}
          </>
        ) : null
      }
    />
  )
}
