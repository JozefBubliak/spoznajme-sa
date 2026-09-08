'use client'

import Link from 'next/link'
import { usePar } from './_par'

/** Malý indikátor v hlavičke: aktuálny pár, alebo výzva vytvoriť. */
export function ParTag({ lang }: { lang: string }) {
  const { par, ready } = usePar()
  if (!ready) return null

  if (!par) {
    return (
      <Link
        href={`/${lang}/dotaznik/par`}
        className="text-xs font-medium text-primary transition hover:underline"
      >
        Vytvoriť pár
      </Link>
    )
  }

  return (
    <Link
      href={`/${lang}/dotaznik/p/${par.kod}`}
      className="font-mono text-xs text-muted-foreground transition hover:text-foreground"
      title={`Režim: ${par.rezim === 'live' ? 'Naživo' : 'Bez trapasu'}`}
    >
      {par.kod}
    </Link>
  )
}
