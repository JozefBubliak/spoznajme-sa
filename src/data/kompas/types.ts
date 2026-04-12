export type KompasAudienceSlug =
  | 'rodic-dieta'
  | 'deti'
  | 'pary'
  | 'priatelia'
  | 'praca'
  | 'citlive-temy'

export type KompasMomentSlug =
  | 'tazke-zaciatky'
  | 'ospravedlnenie-a-oprava'
  | 'hranice-a-odmietnutie'
  | 'podpora-v-tazkom-obdobi'
  | 'partnerska-komunikacia'
  | 'rodic-a-dieta'
  | 'priatelstva'
  | 'praca-a-tim'

export type KompasThemeSlug =
  | 'zacinat-rozovor'
  | 'emocie-a-regulacia'
  | 'hranice-a-dohody'
  | 'konflikt-a-spolupraca'
  | 'zmeny-a-prechody'
  | 'spomienky-a-spojenie'
  | 'digitalny-zivot'
  | 'skola-a-ucenie'
  | 'zdravie-a-tazke-temy'
  | 'identita-a-telo'

export type KompasMoment = {
  slug: KompasMomentSlug
  label: string
  description: string
}

export type KompasScenario = {
  id: string
  priority: number
  audienceSlug: KompasAudienceSlug
  momentSlug: KompasMomentSlug
  themeSlug: KompasThemeSlug
  title: string
  situation: string
  goal: string
  firstLine: string
  softerVersion: string
  directVersion: string
  avoid: string
}

export type LegacyKompasItem = KompasScenario & {
  group: string
  topic: string
  subtopic: string
  phrases: string[]
}
