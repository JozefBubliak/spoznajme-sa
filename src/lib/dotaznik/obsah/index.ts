import type { TemaObsah } from './typ'
import { FACE_SITTING } from './face-sitting'
import { TROJKY_SKUPINY } from './trojky-skupiny'
import { ZDIELANIE_PARTNERA } from './zdielanie-partnera'

// Registr obsahov tém (hybrid „kniha + dotazník"). Kľúč = `${modul}/${tema}`.
// Téma bez záznamu tu → beží pôvodný generický „section walker".
const REGISTER: Record<string, TemaObsah> = {
  [FACE_SITTING.slug]: FACE_SITTING,
  [TROJKY_SKUPINY.slug]: TROJKY_SKUPINY,
  [ZDIELANIE_PARTNERA.slug]: ZDIELANIE_PARTNERA,
}

export function temaObsah(modul: string, tema: string): TemaObsah | undefined {
  return REGISTER[`${modul}/${tema}`]
}

export function maObsah(modul: string, tema: string): boolean {
  return `${modul}/${tema}` in REGISTER
}

export type { TemaObsah }
