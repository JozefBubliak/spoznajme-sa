import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../../_ui'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

export default async function TemaIntro({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok={`${modul.nazov} — téma`}
      nadpis={tema.nazov}
      lead={tema.popis}
      spat={{ href: p(cesta.modulTemy(modul.slug)), label: 'Späť na témy' }}
    >
      <Volba
        href={p(cesta.temaChcem(modul.slug, tema.slug))}
        nazov="Chcem túto tému skúmať?"
        popis="Áno / Ešte nie / Nie — rovnaká logika ako pri module."
        ton="ano"
      />
      {tema.zrkadlova && (
        <div className="rounded-2xl border border-border/70 bg-card/40 p-4 text-xs text-muted-foreground">
          Zrkadlová téma: po screeningu si zvolíš rolu — <strong>prijímam</strong>, <strong>poskytujem</strong> alebo <strong>oboje</strong>.
        </div>
      )}
      {tema.rizikova && (
        <div className="rounded-2xl border border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 p-4 text-xs text-[hsl(var(--warning))]">
          Rizikové praktiky: téma obsahuje navyše sekciu s bezpečnostným rámcom a kontraindikáciami.
        </div>
      )}
    </Krok>
  )
}
