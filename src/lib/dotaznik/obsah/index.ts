import type { TemaObsah } from './typ'
import { FACE_SITTING } from './face-sitting'
import { TROJKY_SKUPINY } from './trojky-skupiny'
import { ZDIELANIE_PARTNERA } from './zdielanie-partnera'
import { SWINGING } from './swinging'
import { ANALNA_PENETRACIA } from './analna-penetracia'
import { FETISE } from './fetise'
import { ORALNA_INTIMITA } from './oralna-intimita'
import { BDSM } from './bdsm'
import { DLHODOBA_INTIMITA } from './dlhodoba-intimita'
import { MASTURBACIA } from './masturbacia'
import { BOZKY_DOTYKY } from './bozky-dotyky'

// Registr obsahov tém (hybrid „kniha + dotazník"). Kľúč = `${modul}/${tema}`.
// Téma bez záznamu tu → beží pôvodný generický „section walker".
const REGISTER: Record<string, TemaObsah> = {
  [FACE_SITTING.slug]: FACE_SITTING,
  [TROJKY_SKUPINY.slug]: TROJKY_SKUPINY,
  [ZDIELANIE_PARTNERA.slug]: ZDIELANIE_PARTNERA,
  [SWINGING.slug]: SWINGING,
  [ANALNA_PENETRACIA.slug]: ANALNA_PENETRACIA,
  [FETISE.slug]: FETISE,
  [ORALNA_INTIMITA.slug]: ORALNA_INTIMITA,
  [BDSM.slug]: BDSM,
  [DLHODOBA_INTIMITA.slug]: DLHODOBA_INTIMITA,
  [MASTURBACIA.slug]: MASTURBACIA,
  [BOZKY_DOTYKY.slug]: BOZKY_DOTYKY,
}

export function temaObsah(modul: string, tema: string): TemaObsah | undefined {
  return REGISTER[`${modul}/${tema}`]
}

export function maObsah(modul: string, tema: string): boolean {
  return `${modul}/${tema}` in REGISTER
}

export type { TemaObsah }
