import type { Moznost } from './typ'

export const ZONY_TELA: Moznost[] = [
  { v: 'tvar', label: 'Tvár a pery' },
  { v: 'usi', label: 'Uši' },
  { v: 'krk', label: 'Krk a šija' },
  { v: 'ramena', label: 'Ramená a kľúčne kosti' },
  { v: 'hrudnik', label: { m: 'Hrudník a bradavky', z: 'Prsia a bradavky' } },
  { v: 'ruky', label: 'Ruky, dlane a zápästia' },
  { v: 'chrbat', label: 'Chrbát a kríže' },
  { v: 'brucho', label: 'Brucho a podbruško' },
  { v: 'boky', label: 'Boky a pás' },
  { v: 'zadok', label: 'Zadok' },
  { v: 'stehna', label: 'Vnútorné stehná' },
  { v: 'kolena', label: 'Podkolenné jamky' },
  { v: 'chodidla', label: 'Lýtka, chodidlá a prsty' },
]

// PREF-2026-09-17: iba postoj k aktivite. Skúsenosť, pocity a dôležitosť
// majú samostatné odpovede. Staré hodnoty sa automaticky nepreklasifikujú.
export const CHUT: Moznost[] = [
  { v: 'pacim', label: 'Chcem to / páči sa mi to' },
  { v: 'ochota', label: { m: 'Rád, ak chceš ty', z: 'Rada, ak chceš ty' } },
  { v: 'mozno', label: 'Možno — potrebujem sa o tom najprv porozprávať' },
  { v: 'nie', label: 'Nie — toto nechcem' },
]

export const DOLEZITOST: Moznost[] = [
  { v: 'velmi_dolezite', label: 'Veľmi dôležité' },
  { v: 'skor_dolezite', label: 'Skôr dôležité' },
  { v: 'malo_dolezite', label: 'Málo dôležité' },
  { v: 'nedolezite', label: 'Nie je to pre mňa dôležité' },
]

export const SCHOPNOST: Moznost[] = [
  { v: 'dari_sa', label: 'Darí sa mi to väčšinou' },
  { v: 'niekedy', label: 'Niekedy sa mi to podarí, inokedy nie' },
  { v: 'tazke', label: 'Je to pre mňa ťažké' },
  { v: 'neviem', label: 'Neviem to zatiaľ posúdiť' },
]

export const PRIJATIE_PREJAVU: Moznost[] = [
  { v: 'prirodzene', label: 'Je to pre mňa prirodzené a príjemné' },
  { v: 'podla_situacie', label: 'Závisí to od situácie' },
  { v: 'rozpaky', label: 'Cítim pri tom rozpaky alebo zábrany' },
  { v: 'ticho', label: 'Viac mi vyhovuje tichý prejav' },
  { v: 'neviem', label: 'Neviem to zatiaľ posúdiť' },
]

export const VYSKYT_POCITU: Moznost[] = [
  { v: 'casto', label: 'Často' },
  { v: 'niekedy', label: 'Niekedy' },
  { v: 'zriedka', label: 'Zriedka' },
  { v: 'vobec', label: 'Vôbec' },
  { v: 'neviem', label: 'Neviem to posúdiť' },
]

export const UCINOK: Moznost[] = [
  { v: 'pomaha', label: 'Pomáha mi to' },
  { v: 'niekedy_pomaha', label: 'Pomáha mi to iba niekedy' },
  { v: 'bez_vplyvu', label: 'Nemá to na mňa výrazný vplyv' },
  { v: 'nesedi', label: 'Nesedí mi to' },
  { v: 'neviem', label: 'Zatiaľ to neviem posúdiť' },
]
