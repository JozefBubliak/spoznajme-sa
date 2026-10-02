// ─────────────────────────────────────────────────────────────────────────────
// Banka otázok — zatiaľ SEED pre jednu tému (dôkaz konceptu end-to-end).
// Kľúč = `${modul}/${tema}/${sekcia}`. Rozširuje sa modul po module
// z prekonvertovaných „mišmaš" dokumentov.
// ─────────────────────────────────────────────────────────────────────────────

export type OtazkaTyp =
  | 'postoj'
  | 'semafor'
  | 'frekvencia'
  | 'rola'
  | 'intenzita'
  | 'multi'
  | 'skusenost'
  | 'text'

export type Otazka = {
  id: string
  typ: OtazkaTyp
  text: string
  napoveda?: string
  // pre 'multi'
  moznosti?: string[]
  // pre 'intenzita'
  min?: string
  max?: string
  stupne?: number // default 5
}

// Hodnoty (jsonb v DB) — pre referenciu:
//  postoj:     { v: 'chcem'|'skor_ano'|'jedno'|'skor_nie'|'nie'|'zvedavy' }
//  semafor:    { v: 'zelena'|'zlta'|'cervena', podmienka?: string }
//  frekvencia: { v: 'casto'|'nalada'|'bonus'|'raz'|'nikdy' }
//  rola:       ukladá sa ako 2 riadky (rola='prijimam' / 'poskytujem'), hodnota = postoj
//  intenzita:  { v: 1..stupne }
//  multi:      { v: string[], ine?: string }
//  skusenost:  { v: 'bohata'|'parkrat'|'raz'|'nemam_chcem'|'nemam_nechcem' }
//  text:       { v: string }

export const POSTOJ_MOZNOSTI: { v: string; label: string }[] = [
  { v: 'chcem', label: 'Toto chcem' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'jedno', label: 'Je mi to jedno' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie (hranica)' },
  { v: 'zvedavy', label: 'Neskúšal(a), zaujíma ma' },
]

export const SEMAFOR_MOZNOSTI: { v: string; label: string; farba: string }[] = [
  { v: 'zelena', label: 'Áno', farba: 'hsl(var(--success))' },
  { v: 'zlta', label: 'Za podmienok', farba: 'hsl(var(--warning))' },
  { v: 'cervena', label: 'Tvrdá hranica', farba: 'hsl(var(--destructive))' },
]

export const FREKVENCIA_MOZNOSTI: { v: string; label: string }[] = [
  { v: 'casto', label: 'Často' },
  { v: 'nalada', label: 'Podľa nálady' },
  { v: 'bonus', label: 'Občas ako bonus' },
  { v: 'raz', label: 'Raz vyskúšať' },
  { v: 'nikdy', label: 'Nikdy' },
]

export const SKUSENOST_MOZNOSTI: { v: string; label: string }[] = [
  { v: 'bohata', label: 'Mám bohatú' },
  { v: 'parkrat', label: 'Párkrát' },
  { v: 'raz', label: 'Raz' },
  { v: 'nemam_chcem', label: 'Nemám — chcem skúsiť' },
  { v: 'nemam_nechcem', label: 'Nemám — nechcem' },
]

// ── SEED ────────────────────────────────────────────────────────────────────
export const OTAZKY: Record<string, Otazka[]> = {
  'predohra-naladenie/mentalna-priprava/skusenost': [
    {
      id: 'mp_sk_1',
      typ: 'skusenost',
      text: 'Skúsenosť s vedomým „naladením sa" pred intimitou',
      napoveda: 'Napr. fantázia, spomienky, dych, odloženie telefónu.',
    },
  ],

  'predohra-naladenie/mentalna-priprava/preferencie': [
    { id: 'mp_pr_1', typ: 'postoj', text: 'Fantazírovanie a vizualizácia scén pred intimitou' },
    { id: 'mp_pr_2', typ: 'postoj', text: 'Spomínanie na naše predošlé zážitky ako naladenie' },
    { id: 'mp_pr_3', typ: 'postoj', text: 'Vytváranie erotických príbehov v hlave' },
    {
      id: 'mp_pr_4',
      typ: 'multi',
      text: 'Čo mi pomáha vypnúť hlavu a naladiť sa',
      moznosti: [
        'Dych / mindfulness',
        'Pohyb, tanec',
        'Sprcha alebo kúpeľ',
        'Hudba',
        'Rozhovor a blízkosť',
        'Chvíľa osamote',
        'Dotyk bez cieľa',
      ],
    },
    {
      id: 'mp_pr_5',
      typ: 'intenzita',
      text: 'Koľko času pred intimitou potrebujem na naladenie',
      min: 'Stačí chvíľa',
      max: 'Potrebujem dlhší nábeh',
    },
    {
      id: 'mp_pr_6',
      typ: 'frekvencia',
      text: 'Ako často sa potrebujem vedome naladiť (inak to nepríde samo)',
    },
    {
      id: 'mp_pr_7',
      typ: 'text',
      text: 'Čo ma spoľahlivo vyhodí z nálady?',
      napoveda: 'Voliteľné. Vidí to len partner pri zhode, nie ako „odmietnutie".',
    },
  ],

  'predohra-naladenie/mentalna-priprava/hranice': [
    {
      id: 'mp_hr_1',
      typ: 'semafor',
      text: 'Hovoriť nahlas o tom, na čo počas intimity myslím',
    },
    {
      id: 'mp_hr_2',
      typ: 'semafor',
      text: 'Zdieľať s partnerom konkrétnu fantáziu',
    },
  ],
}

export function otazkySekcie(modul: string, tema: string, sekcia: string): Otazka[] {
  return OTAZKY[`${modul}/${tema}/${sekcia}`] ?? []
}
