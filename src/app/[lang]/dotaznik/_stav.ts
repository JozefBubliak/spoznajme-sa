'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ParLocal } from './_par'

// ─────────────────────────────────────────────────────────────────────────────
// Screening stav (Áno / Ešte nie / Nie / hotovo) + zámky od partnera.
// Bez realtime — polling na mount, pri fokuse okna a každých 8 s.
// ─────────────────────────────────────────────────────────────────────────────

export type StavHodnota = 'ano' | 'este_nie' | 'nie' | 'hotovo'
export type StavRiadok = { slot: 'a' | 'b'; modul: string; tema: string; stav: StavHodnota }

export type Zamok = null | 'trvaly' | 'docasny'

export function useStavy(par: ParLocal | null) {
  const [stavy, setStavy] = useState<StavRiadok[]>([])
  const [nacitane, setNacitane] = useState(false)
  const zaneprazdneny = useRef(false)

  const nacitaj = useCallback(async () => {
    if (!par || zaneprazdneny.current) return
    zaneprazdneny.current = true
    try {
      const r = await fetch(`/api/dotaznik/pary/${par.kod}?k=${encodeURIComponent(par.secret)}`)
      if (r.ok) {
        const d = await r.json()
        setStavy((d.stav ?? []) as StavRiadok[])
      }
    } catch {
      /* ignore */
    } finally {
      zaneprazdneny.current = false
      setNacitane(true)
    }
  }, [par])

  useEffect(() => {
    nacitaj()
    const onFocus = () => nacitaj()
    window.addEventListener('focus', onFocus)
    const id = window.setInterval(nacitaj, 8000)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.clearInterval(id)
    }
  }, [nacitaj])

  return { stavy, nacitane, obnov: nacitaj }
}

export function najdiStav(
  stavy: StavRiadok[],
  slot: 'a' | 'b',
  modul: string,
  tema: string | null,
): StavHodnota | undefined {
  const t = tema ?? ''
  return stavy.find((s) => s.slot === slot && s.modul === modul && s.tema === t)?.stav
}

/** Zámok od partnera pre daný modul/tému. */
export function partnerZamok(
  stavy: StavRiadok[],
  par: ParLocal,
  modul: string,
  tema: string | null,
): Zamok {
  const partnerSlot = par.slot === 'a' ? 'b' : 'a'
  const s = najdiStav(stavy, partnerSlot, modul, tema)
  if (s === 'nie') return 'trvaly'
  if (s === 'este_nie') return 'docasny'
  return null
}

export async function ulozStav(
  par: ParLocal,
  modul: string,
  tema: string | null,
  stav: StavHodnota,
): Promise<boolean> {
  try {
    const r = await fetch(`/api/dotaznik/pary/${par.kod}/stav`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: par.secret, slot: par.slot, modul, tema: tema ?? '', stav }),
    })
    return r.ok
  } catch {
    return false
  }
}
