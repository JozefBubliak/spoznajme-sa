import type { TemaObsah, Blok } from './typ'
import { FACE_SITTING } from './face-sitting'
import { TROJKY_SKUPINY } from './trojky-skupiny'
import { ZDIELANIE_PARTNERA } from './zdielanie-partnera'
import { SWINGING } from './swinging'
import { ANALNA_PENETRACIA } from './analna-penetracia'
import {
  DIRTY_TALK_JAZYK_TELA_TEMA,
  DIRTY_TALK_OBSAH_TEMA,
  DIRTY_TALK_OSLOVENIA_TEMA,
  DIRTY_TALK_TON_TEMA,
  FETISE,
  MENSTRUALNA_KRV_TEMA,
  PRIRODZENOST_TEMA,
  ZENSKA_VLHKOST_TEMA,
  SEMENO_TEMA,
  WATERSPORTS_TEMA,
} from './fetise'
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
import { TABU_MANTINELY } from './tabu-mantinely'
import { TRANS_PARTNERKA } from './trans-partnerka'
import { SUMAR, BEZ_SUMARU } from './sumar'
import { MIESTA_PROSTREDIE } from './miesta-prostredie'
import { POLOHY } from './polohy'
import { VAGINALNA_PENETRACIA } from './vaginalna-penetracia'
import { DIGITALNA_INTIMITA } from './digitalna-intimita'
import { TELO_HANBA } from './telo-hanba'
import { ZDRAVIE_OCHRANA_HYGIENA } from './zdravie-ochrana-hygiena'
import { TANTRA_SLOW_SEX } from './tantra-slow-sex'
import { KOMUNIKACIA_POCAS_PO } from './komunikacia-pocas-po'
import { ORGAZMUS_KONTROLA } from './orgazmus-kontrola'
import { NEPENETRATIVNE_TRENIE } from './nepenetrativne-trenie'
import { CNM_ENM } from './cnm-enm'
import { VOYEUR_EXHIB } from './voyeur-exhib'
import { vetveniePre } from './vetvenie-skusenosti'

// Registr obsahov tém (hybrid „kniha + dotazník"). Kľúč = `${modul}/${tema}`.
// Téma bez záznamu tu → beží pôvodný generický „section walker".
const REGISTER: Record<string, TemaObsah> = {
  [FACE_SITTING.slug]: FACE_SITTING,
  [TROJKY_SKUPINY.slug]: TROJKY_SKUPINY,
  [ZDIELANIE_PARTNERA.slug]: ZDIELANIE_PARTNERA,
  [SWINGING.slug]: SWINGING,
  [ANALNA_PENETRACIA.slug]: ANALNA_PENETRACIA,
  [FETISE.slug]: FETISE,
  [PRIRODZENOST_TEMA.slug]: PRIRODZENOST_TEMA,
  [ZENSKA_VLHKOST_TEMA.slug]: ZENSKA_VLHKOST_TEMA,
  [SEMENO_TEMA.slug]: SEMENO_TEMA,
  [MENSTRUALNA_KRV_TEMA.slug]: MENSTRUALNA_KRV_TEMA,
  [WATERSPORTS_TEMA.slug]: WATERSPORTS_TEMA,
  [DIRTY_TALK_TON_TEMA.slug]: DIRTY_TALK_TON_TEMA,
  [DIRTY_TALK_OBSAH_TEMA.slug]: DIRTY_TALK_OBSAH_TEMA,
  [DIRTY_TALK_OSLOVENIA_TEMA.slug]: DIRTY_TALK_OSLOVENIA_TEMA,
  [DIRTY_TALK_JAZYK_TELA_TEMA.slug]: DIRTY_TALK_JAZYK_TELA_TEMA,
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
  [ORGAZMUS_KONTROLA.slug]: ORGAZMUS_KONTROLA,
  [NEPENETRATIVNE_TRENIE.slug]: NEPENETRATIVNE_TRENIE,
  [CNM_ENM.slug]: CNM_ENM,
  [TABU_MANTINELY.slug]: TABU_MANTINELY,
  [TRANS_PARTNERKA.slug]: TRANS_PARTNERKA,
  [VOYEUR_EXHIB.slug]: VOYEUR_EXHIB,
}

// Každá data-driven téma musí mať výslovne určené, či a ako sa vetví podľa
// skúsenosti. Kostry sú súčasťou reálnych dát dotazníka; prázdne vetvy UI
// nezobrazuje a naplnia sa pri obsahovom audite konkrétnej témy.
for (const [k, t] of Object.entries(REGISTER)) {
  REGISTER[k] = vlozVetvenie({ ...t, vetvenieSkusenosti: vetveniePre(k) })
}

// Kostru vetvenia vložíme do dotazníka IBA raz, na úrovni hlavnej témy
// (nie pri podtémach): otázka „mám skúsenosť?" + príslušná vetva. Témy so
// stavom 'aktivne'/'rozpracovane' majú vetvenie priamo vo vlastnom obsahu.
function vlozVetvenie(t: TemaObsah): TemaObsah {
  const v = t.vetvenieSkusenosti
  if (!v || v.rezim === 'nepouziva-sa' || v.stav !== 'kostra') return t
  const strany: { id: string; nadpis?: string; text: TemaObsah['nadpis'] }[] =
    v.rezim === 'davam-prijimam'
      ? [
          { id: 'vetva_mam_prijimanie', nadpis: 'prijimanie', text: 'Mám skúsenosť s prijímaním?' },
          { id: 'vetva_mam_poskytovanie', nadpis: 'poskytovanie', text: 'Mám skúsenosť s poskytovaním?' },
        ]
      : [{ id: 'vetva_mam', text: 'Mám s touto témou vlastnú skúsenosť?' }]
  const moznosti = [
    { v: 'ano', label: 'Áno' },
    { v: 'nie', label: 'Nie, zatiaľ nie' },
  ]
  // V režime dávam/prijímam sú vetvy skupiny, ktorých id obsahuje stranu.
  const bloky: Blok[] = []
  for (const s of strany) {
    bloky.push({ druh: 'otazka', id: s.id, typ: 'jeden', text: s.text, moznosti })
    const so = s.nadpis ? v.soSkusenostou.filter((b) => b.id.includes(s.nadpis!)) : v.soSkusenostou
    const bez = s.nadpis ? v.bezSkusenosti.filter((b) => b.id.includes(s.nadpis!)) : v.bezSkusenosti
    bloky.push({ druh: 'skupina', id: `${s.id}_ano`, podmienka: { ot: s.id, je: 'ano' }, bloky: so })
    bloky.push({ druh: 'skupina', id: `${s.id}_nie`, podmienka: { ot: s.id, je: 'nie' }, bloky: bez })
  }
  const skupina: Blok = { druh: 'skupina', id: 'vetvenie_skusenost', nadpis: 'Moja skúsenosť', bloky }
  return { ...t, telo: [skupina, ...t.telo] }
}

// Záverečný sumár („čo nové skúsime" + plán) na koniec každej praktickej témy.
for (const [k, t] of Object.entries(REGISTER)) {
  if (!BEZ_SUMARU.has(k)) REGISTER[k] = { ...t, zaver: [...(t.zaver ?? []), SUMAR] }
}

export function temaObsah(modul: string, tema: string): TemaObsah | undefined {
  return REGISTER[`${modul}/${tema}`]
}

export function maObsah(modul: string, tema: string): boolean {
  return `${modul}/${tema}` in REGISTER
}

/** Všetky registrované témy (pre admin prehľad obsahu). */
export function vsetkyObsahy(): TemaObsah[] {
  return Object.values(REGISTER)
}

export type { TemaObsah }
