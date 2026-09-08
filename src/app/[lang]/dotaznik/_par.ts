'use client'

import { useEffect, useState } from 'react'

// Lokálny (per-zariadenie) stav páru. Žiadny účet — len toto v localStorage.
export type ParLocal = {
  kod: string
  secret: string
  slot: 'a' | 'b'
  rezim: 'live' | 'blind' | 'open'
  prezyvka?: string
}

const KEY = 'dotaznik_par'

export function readPar(): ParLocal | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ParLocal) : null
  } catch {
    return null
  }
}

export function writePar(p: ParLocal) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* ignore */
  }
}

export function clearPar() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

/** Reaktívne čítanie lokálneho páru (null kým sa nezhydratuje). */
export function usePar(): { par: ParLocal | null; ready: boolean } {
  const [par, setPar] = useState<ParLocal | null>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setPar(readPar())
    setReady(true)
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPar(readPar())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return { par, ready }
}

/** Odkaz na zdieľanie partnerovi (obsahuje secret vo fragmente). */
export function zdielacíOdkaz(lang: string, kod: string, secret: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://deeptalks.eu'
  return `${origin}/${lang}/dotaznik/p/${kod}#k=${secret}`
}

/** Vytiahne kód + secret z prilepeného odkazu alebo holého kódu. */
export function parsujOdkaz(input: string): { kod: string; secret?: string } {
  const t = input.trim()
  const hashMatch = t.match(/\/dotaznik\/p\/([A-Z0-9-]+)(?:#k=([A-Za-z0-9_-]+))?/i)
  if (hashMatch) return { kod: hashMatch[1].toUpperCase(), secret: hashMatch[2] }
  return { kod: t.toUpperCase().replace(/[^A-Z0-9-]/g, '') }
}
