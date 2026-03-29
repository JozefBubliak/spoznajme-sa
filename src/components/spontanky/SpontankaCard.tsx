import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { SpontankaWithStats } from '@/lib/spontanky/types'

const STAV_LABELS: Record<string, string> = {
  aktivna: 'Aktívna',
  pozastavena: 'Pozastavená',
  zrusena: 'Zrušená',
  ukoncena: 'Ukončená',
}

const STAV_COLORS: Record<string, string> = {
  aktivna: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pozastavena: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  zrusena: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  ukoncena: 'bg-muted text-muted-foreground',
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('sk-SK', {
    weekday: 'short', day: 'numeric', month: 'long',
  })
}

interface Props {
  sp: SpontankaWithStats
  lang: string
}

export function SpontankaCard({ sp, lang }: Props) {
  const isPast = new Date(sp.datum) < new Date(new Date().setHours(0, 0, 0, 0))

  return (
    <Link
      href={`/${lang}/komunita/spontanky/${sp.id}`}
      className={cn(
        'block rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30',
        isPast && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', STAV_COLORS[sp.stav])}>
            {STAV_LABELS[sp.stav]}
          </span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted border">
            Spontánka
          </span>
        </div>
        <div className="text-right text-xs text-muted-foreground shrink-0">
          {formatDatum(sp.datum)}
        </div>
      </div>

      <h3 className="font-semibold text-foreground text-base mb-1 leading-snug line-clamp-2">
        {sp.nazov}
      </h3>

      <div className="text-sm text-muted-foreground mb-3 line-clamp-1">
        📍 {sp.miesto_hlavne_nazov} · {sp.cas}
      </div>

      {sp.popis && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {sp.popis}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="text-green-600 dark:text-green-400">●</span>
            {sp.stats.pridem} príde
          </span>
          <span className="flex items-center gap-1">
            <span className="text-amber-500">●</span>
            {sp.stats.mozno} možno
          </span>
        </div>
        {sp.ocakavany_pocet && (
          <span className="text-xs text-muted-foreground">{sp.ocakavany_pocet}</span>
        )}
      </div>
    </Link>
  )
}
