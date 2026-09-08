import 'server-only'
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { supabaseServer } from '@/integrations/supabase/server'

// ─────────────────────────────────────────────────────────────────────────────
// Serverové helpery pre anonymné párovanie dotazníka.
// Prístup k tabuľkám dotaznik_* výhradne odtiaľto (service-role, RLS bypass).
// ─────────────────────────────────────────────────────────────────────────────

export type Rezim = 'live' | 'blind' | 'open'
export type Slot = 'a' | 'b'

export type Par = {
  id: string
  kod: string
  rezim: Rezim
  prezyvka_a: string | null
  prezyvka_b: string | null
  vytvorene: string
}

const KOD_ABECEDA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // bez 0/O/1/I/L

export function generateKod(): string {
  const bytes = randomBytes(8)
  let out = ''
  for (let i = 0; i < 8; i++) out += KOD_ABECEDA[bytes[i] % KOD_ABECEDA.length]
  return `${out.slice(0, 4)}-${out.slice(4)}`
}

export function generateSecret(): string {
  return randomBytes(18).toString('base64url') // 24 znakov
}

export function hashSecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex')
}

function sameHash(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  return ba.length === bb.length && timingSafeEqual(ba, bb)
}

export function cleanPrezyvka(raw: unknown): string {
  return String(raw ?? '')
    .trim()
    .slice(0, 24)
    .replace(/[<>]/g, '')
}

/**
 * Overí kód + secret. Pri úspechu posunie posledná_aktivita / zmazat_po (+30 dní)
 * a vráti pár. Inak null.
 */
export async function overPar(kod: string, secret: string): Promise<Par | null> {
  if (!kod || !secret) return null
  const s = supabaseServer()

  const { data, error } = await s
    .from('dotaznik_pary')
    .select('id, kod, rezim, pin_hash, prezyvka_a, prezyvka_b, vytvorene')
    .eq('kod', kod.toUpperCase())
    .maybeSingle()

  if (error || !data) return null
  if (!sameHash(data.pin_hash as string, hashSecret(secret))) return null

  const now = new Date()
  await s
    .from('dotaznik_pary')
    .update({
      posledna_aktivita: now.toISOString(),
      zmazat_po: new Date(now.getTime() + 30 * 24 * 3600 * 1000).toISOString(),
    })
    .eq('id', data.id)

  return {
    id: data.id as string,
    kod: data.kod as string,
    rezim: data.rezim as Rezim,
    prezyvka_a: (data.prezyvka_a as string | null) ?? null,
    prezyvka_b: (data.prezyvka_b as string | null) ?? null,
    vytvorene: data.vytvorene as string,
  }
}

export function db() {
  return supabaseServer()
}
