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
import { ROLEPLAY } from './roleplay'
import { POMOCKY_HRACKY } from './pomocky-hracky'
import { ROVNAKE_POHLAVIE } from './rovnake-pohlavie'
import { PREDOHRA_NALADENIE } from './predohra-naladenie'
import { SUHLAS_BEZPECIE } from './suhlas-bezpecie'
import { BRZDY_SPUSTACE } from './brzdy-spustace'
import { SPECIFICKE_OBDOBIA } from './specificke-obdobia'
import { KONTEXT_VZTAHU } from './kontext-vztahu'
import { LIBIDO_CHUT } from './libido-chut'
import { ZMYSLOVA_HRA } from './zmyslova-hra'
import { TEMPO_INTENZITA } from './tempo-intenzita'
import { FANTAZIE } from './fantazie'
import { MIESTA_PROSTREDIE } from './miesta-prostredie'
import { POLOHY } from './polohy'
import { VAGINALNA_PENETRACIA } from './vaginalna-penetracia'
import { DIGITALNA_INTIMITA } from './digitalna-intimita'
import { TELO_HANBA } from './telo-hanba'
import { ZDRAVIE_OCHRANA_HYGIENA } from './zdravie-ochrana-hygiena'
import { TANTRA_SLOW_SEX } from './tantra-slow-sex'
import { KOMUNIKACIA_POCAS_PO } from './komunikacia-pocas-po'

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
  [ROLEPLAY.slug]: ROLEPLAY,
  [POMOCKY_HRACKY.slug]: POMOCKY_HRACKY,
  [ROVNAKE_POHLAVIE.slug]: ROVNAKE_POHLAVIE,
  [PREDOHRA_NALADENIE.slug]: PREDOHRA_NALADENIE,
  [SUHLAS_BEZPECIE.slug]: SUHLAS_BEZPECIE,
  [BRZDY_SPUSTACE.slug]: BRZDY_SPUSTACE,
  [SPECIFICKE_OBDOBIA.slug]: SPECIFICKE_OBDOBIA,
  [KONTEXT_VZTAHU.slug]: KONTEXT_VZTAHU,
  [LIBIDO_CHUT.slug]: LIBIDO_CHUT,
  [ZMYSLOVA_HRA.slug]: ZMYSLOVA_HRA,
  [TEMPO_INTENZITA.slug]: TEMPO_INTENZITA,
  [FANTAZIE.slug]: FANTAZIE,
  [MIESTA_PROSTREDIE.slug]: MIESTA_PROSTREDIE,
  [POLOHY.slug]: POLOHY,
  [VAGINALNA_PENETRACIA.slug]: VAGINALNA_PENETRACIA,
  [DIGITALNA_INTIMITA.slug]: DIGITALNA_INTIMITA,
  [TELO_HANBA.slug]: TELO_HANBA,
  [ZDRAVIE_OCHRANA_HYGIENA.slug]: ZDRAVIE_OCHRANA_HYGIENA,
  [TANTRA_SLOW_SEX.slug]: TANTRA_SLOW_SEX,
  [KOMUNIKACIA_POCAS_PO.slug]: KOMUNIKACIA_POCAS_PO,
}

export function temaObsah(modul: string, tema: string): TemaObsah | undefined {
  return REGISTER[`${modul}/${tema}`]
}

export function maObsah(modul: string, tema: string): boolean {
  return `${modul}/${tema}` in REGISTER
}

export type { TemaObsah }
