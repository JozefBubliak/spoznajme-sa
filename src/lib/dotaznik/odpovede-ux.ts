import type { OtazkaBlok } from './obsah/typ'

export type HodnotaOtazky = { v?: unknown; ine?: string; favorit?: string }

export function prepniMoznost(blok: OtazkaBlok, vybrane: string[], v: string): string[] {
  if (vybrane.includes(v)) return vybrane.filter(x => x !== v)
  if (blok.vylucneMoznosti?.includes(v)) return [v]
  return [...vybrane.filter(x => !blok.vylucneMoznosti?.includes(x)), v]
}

/** Len zobrazenie pôvodných dát; nič sa neposiela na server bez vlastnej zmeny. */
export function hodnotaPreOtazku(blok: OtazkaBlok, ans: Record<string, unknown>): HodnotaOtazky | undefined {
  const saved = ans[blok.id] as HodnotaOtazky | undefined
  const extra = blok.doplnenieId ? ans[blok.doplnenieId] as HodnotaOtazky | undefined : undefined
  let hodnota = saved
  if (blok.povodnyText && typeof saved?.v === 'string') {
    hodnota = { ...saved, v: [], ine: saved.ine ?? saved.v }
  } else if (blok.povodnyJeden && typeof saved?.v === 'string') {
    hodnota = { ...saved, v: saved.v ? [saved.v] : [] }
  }
  if (typeof extra?.v === 'string' && hodnota?.ine == null) {
    hodnota = { ...hodnota, ine: extra.v }
  }
  return hodnota
}

/** Pôvodné „neutrálne“ ani „skôr nie“ nesmú byť potichu premenené na ochotu. */
export function predoslaMoznost(blok: OtazkaBlok, hodnota: HodnotaOtazky | undefined) {
  const v = hodnota?.v
  if (typeof v !== 'string' || blok.moznosti?.some(m => m.v === v)) return undefined
  return blok.predosleMoznosti?.find(m => m.v === v)
}
