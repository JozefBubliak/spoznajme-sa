import Link from 'next/link'
import type { ReactNode } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Zdieľané prvky pre strom dotazníka. Zatiaľ len navigácia (žiadne otázky).
// ─────────────────────────────────────────────────────────────────────────────

export function Krok({
  krok,
  nadpis,
  lead,
  spat,
  children,
  dalej,
}: {
  krok?: string
  nadpis: string
  lead?: string
  spat?: { href: string; label?: string }
  children?: ReactNode
  dalej?: { href: string; label?: string }
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-14">
      {spat && (
        <Link
          href={spat.href}
          className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          ← {spat.label ?? 'Späť'}
        </Link>
      )}

      {krok && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
          {krok}
        </p>
      )}

      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {nadpis}
      </h1>

      {lead && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lead}
        </p>
      )}

      {children && <div className="mt-8 space-y-4">{children}</div>}

      {dalej && (
        <div className="mt-10">
          <Link
            href={dalej.href}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {dalej.label ?? 'Ďalej'} →
          </Link>
        </div>
      )}
    </div>
  )
}

/** Veľká vetviaca voľba — odkaz na ďalší uzol stromu. */
export function Volba({
  href,
  nazov,
  popis,
  ton = 'neutral',
}: {
  href: string
  nazov: string
  popis?: string
  ton?: 'neutral' | 'ano' | 'mozno' | 'nie'
}) {
  const ring =
    ton === 'ano'
      ? 'hover:border-[hsl(var(--success))]/50'
      : ton === 'nie'
        ? 'hover:border-[hsl(var(--destructive))]/50'
        : ton === 'mozno'
          ? 'hover:border-[hsl(var(--warning))]/50'
          : 'hover:border-primary/50'

  return (
    <Link
      href={href}
      className={`group block rounded-2xl border border-border/70 bg-card/70 p-5 transition ${ring} hover:bg-card`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold text-foreground">{nazov}</span>
        <span className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground">
          →
        </span>
      </div>
      {popis && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{popis}</p>}
    </Link>
  )
}

/** Riadok v zozname (modul / téma / sekcia) so stavovou ikonou. */
export function Riadok({
  href,
  cislo,
  nazov,
  popis,
  ikona,
  stav,
}: {
  href: string
  cislo?: number | string
  nazov: string
  popis?: string
  ikona?: string
  stav?: 'otvorene' | 'hotovo' | 'zamknute-trvalo' | 'zamknute-docasne'
}) {
  const znak =
    stav === 'hotovo'
      ? '✓'
      : stav === 'zamknute-trvalo'
        ? '🔒'
        : stav === 'zamknute-docasne'
          ? '⏳'
          : ''

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/60 p-4 transition hover:border-primary/40 hover:bg-card"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 bg-background/70 text-base">
        {ikona ?? cislo ?? '•'}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">{nazov}</span>
        {popis && (
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{popis}</span>
        )}
      </span>
      {znak && <span className="shrink-0 text-sm text-muted-foreground">{znak}</span>}
      <span className="shrink-0 text-muted-foreground transition group-hover:text-foreground">→</span>
    </Link>
  )
}

/** Malý indikátor fáz v onboardingu. */
export function Fazy({ aktivna }: { aktivna: number }) {
  const kroky = ['Úvod', 'Pár', 'Rola', 'Atlas', 'Moduly']
  return (
    <div className="mx-auto mb-8 flex w-full max-w-2xl items-center gap-2 px-5">
      {kroky.map((k, i) => (
        <div key={k} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className={`h-1 w-full rounded-full ${
              i <= aktivna ? 'bg-primary' : 'bg-border'
            }`}
          />
          <span
            className={`text-[10px] uppercase tracking-wider ${
              i === aktivna ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {k}
          </span>
        </div>
      ))}
    </div>
  )
}
