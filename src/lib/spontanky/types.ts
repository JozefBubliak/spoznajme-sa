export type Viditelnost = 'sukromne' | 'okolie' | 'verejne'
export type Stav = 'aktivna' | 'pozastavena' | 'zrusena' | 'ukoncena'
export type RsvpStatus = 'pridem' | 'mozno' | 'nepridem'

export interface Spontanka {
  id: string
  short_id: string
  creator_id: string | null
  creator_meno: string
  nazov: string
  datum: string
  cas: string
  popis: string
  typ_aktivity: string[]
  pre_koho: string
  ocakavany_pocet: string
  miesto_hlavne_nazov: string
  miesto_zraz_nazov: string
  miesto_zraz_cas: string
  viditelnost: Viditelnost
  stav: Stav
  dovod_zrusenia: string | null
  created_at: string
  updated_at: string
}

export interface Ucastnik {
  id: string
  spontanka_id: string
  participant_id: string
  meno: string
  status: RsvpStatus
  created_at: string
  updated_at: string
}

export interface PrinesItem {
  id: string
  spontanka_id: string
  nazov: string
  mnozstvo: string
  claimed_by_participant_id: string | null
  claimed_by_meno: string | null
  claimed_at: string | null
  order_index: number
  created_at: string
}

export interface ChatMessage {
  id: string
  spontanka_id: string
  participant_id: string
  meno: string
  text: string
  pinned: boolean
  created_at: string
}

export interface SpontankaStats {
  pridem: number
  mozno: number
  celkom: number
}

export interface SpontankaWithStats extends Spontanka {
  stats: SpontankaStats
}

export interface SpontankaDetail extends Spontanka {
  ucastnici: Ucastnik[]
  prinesiem: PrinesItem[]
  chat: ChatMessage[]
  stats: SpontankaStats
}
