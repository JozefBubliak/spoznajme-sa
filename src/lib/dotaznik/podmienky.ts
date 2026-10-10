import type { Podmienka, Pohlavie } from './obsah/typ'

type Hodnoty = Record<string, unknown>

export function splna(pod: Podmienka | undefined, ans: Hodnoty, pohlavie?: Pohlavie): boolean {
  if (!pod) return true
  if (pod.vsetky != null && !pod.vsetky.every((cast) => splna(cast, ans, pohlavie))) return false
  if (pod.asponJedna != null && !pod.asponJedna.some((cast) => splna(cast, ans, pohlavie))) return false
  if (pod.pohlavie != null && pod.pohlavie !== pohlavie) return false
  if (pod.ot == null) return true
  const h = ans[pod.ot] as { v?: unknown } | undefined
  const v = h?.v
  if (pod.je != null && v !== pod.je) return false
  if (pod.jeNiektora != null && !(typeof v === 'string' && pod.jeNiektora.includes(v))) return false
  if (pod.nie != null && (v == null || v === '' || v === pod.nie)) return false
  if (pod.obsahuje != null && !(Array.isArray(v) && v.includes(pod.obsahuje))) return false
  if (pod.obsahujeNiektoru != null) {
    const arr = Array.isArray(v) ? (v as string[]) : []
    if (!pod.obsahujeNiektoru.some((x) => arr.includes(x))) return false
  }
  return true
}
