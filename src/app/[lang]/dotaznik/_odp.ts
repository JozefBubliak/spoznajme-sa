'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ParLocal } from './_par'

// ─────────────────────────────────────────────────────────────────────────────
// Ukladanie a čítanie vlastných odpovedí (jednotky L4).
// ─────────────────────────────────────────────────────────────────────────────

export type OdpRiadok = {
  modul: string
  okruh: string
  polozka: string
  typ: string
  rola: string // '' | 'prijimam' | 'poskytujem'
  hodnota: unknown
  poznamka: string | null
}

export function odpKluc(modul: string, okruh: string, polozka: string, rola = ''): string {
  return `${modul}|${okruh}|${polozka}|${rola}`
}

export function useMojeOdpovede(par: ParLocal | null, modul?: string) {
  const [mapa, setMapa] = useState<Record<string, OdpRiadok>>({})
  const [nacitane, setNacitane] = useState(false)

  const nacitaj = useCallback(async () => {
    if (!par) return
    try {
      const u = new URL(`/api/dotaznik/pary/${par.kod}/odpoved`, window.location.origin)
      u.searchParams.set('k', par.secret)
      u.searchParams.set('slot', par.slot)
      if (modul) u.searchParams.set('modul', modul)
      const r = await fetch(u.toString())
      if (r.ok) {
        const d = await r.json()
        const m: Record<string, OdpRiadok> = {}
        for (const row of (d.odpovede ?? []) as OdpRiadok[]) {
          m[odpKluc(row.modul, row.okruh, row.polozka, row.rola)] = row
        }
        setMapa(m)
      }
    } catch {
      /* ignore */
    } finally {
      setNacitane(true)
    }
  }, [par, modul])

  useEffect(() => {
    nacitaj()
  }, [nacitaj])

  return { mapa, nacitane }
}

export async function ulozOdpoved(
  par: ParLocal,
  a: {
    modul: string
    okruh: string
    polozka: string
    typ: string
    rola?: string
    hodnota: unknown
    poznamka?: string
  },
): Promise<boolean> {
  try {
    const r = await fetch(`/api/dotaznik/pary/${par.kod}/odpoved`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: par.secret, slot: par.slot, ...a }),
    })
    return r.ok
  } catch {
    return false
  }
}
