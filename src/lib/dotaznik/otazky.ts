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

  // ───────────────────────────────────────────────────────────────────────────
  // Face-sitting (modul „Orálna intimita") — zrkadlová + riziková téma.
  // Rola: PRIJÍMAM = poloha HORE (queening/kinging), POSKYTUJEM = poloha DOLE.
  // Zdroj obsahu: podporná dokumentácia „Face sitting ž./M.".
  // ───────────────────────────────────────────────────────────────────────────
  'oralna-intimita/face-sitting/kontext': [
    {
      id: 'fs_ko_1',
      typ: 'multi',
      text: 'Kedy a kde by som túto polohu chcel(a)',
      moznosti: [
        'Doma v posteli',
        'Na hrane postele alebo na stoličke',
        'Ráno / cez deň',
        'Večer / v noci',
        'Spontánne',
        'Ako naplánovaný rituál',
        'Cez oblečenie ako predohra',
      ],
    },
    { id: 'fs_ko_2', typ: 'frekvencia', text: 'Ako často by som face-sitting zaradil(a)' },
    {
      id: 'fs_ko_3',
      typ: 'postoj',
      text: 'Brať to ako bežnú variáciu orálu — bez mocenskej roviny',
    },
    {
      id: 'fs_ko_4',
      typ: 'postoj',
      text: 'Brať to ako vedomú hru s dominanciou a submisiou',
    },
  ],

  'oralna-intimita/face-sitting/skusenost': [
    {
      id: 'fs_sk_1',
      typ: 'skusenost',
      text: 'Skúsenosť s face-sittingom (queening / kinging)',
      napoveda: 'Ber do úvahy obe polohy — hore (prijímam orál) aj dole (poskytujem orál).',
    },
    {
      id: 'fs_sk_2',
      typ: 'rola',
      text: 'Ako veľmi ma to vzrušovalo, keď som to zažil(a)',
      napoveda: 'Prijímam = poloha hore, poskytujem = poloha dole. Ak v niektorej polohe skúsenosť nemáš, nechaj prázdne.',
    },
    {
      id: 'fs_sk_3',
      typ: 'text',
      text: 'Ak niečo nesedelo — čo by to mohlo zlepšiť?',
      napoveda: 'Napr. tempo, technika, komunikácia, opora hlavy. Voliteľné.',
    },
  ],

  'oralna-intimita/face-sitting/parametre': [
    {
      id: 'fs_pa_1',
      typ: 'intenzita',
      text: 'Tlak, ktorý mi vyhovuje',
      min: 'Jemný (hover)',
      max: 'Plný kontakt',
    },
    {
      id: 'fs_pa_2',
      typ: 'intenzita',
      text: 'Tempo',
      min: 'Pomalé a zmyselné',
      max: 'Rýchle a vášnivé',
    },
    {
      id: 'fs_pa_3',
      typ: 'multi',
      text: 'Kto vedie tempo a tlak',
      moznosti: [
        'Rád/rada vediem ja (som hore)',
        'Rád/rada sa nechám viesť (som dole)',
        'Striedame sa',
        'Podľa nálady',
      ],
    },
    {
      id: 'fs_pa_4',
      typ: 'multi',
      text: 'Ako chcem počas polohy komunikovať',
      moznosti: [
        'Ticho a neverbálne',
        'Zvuky a dych',
        'Slovné pokyny',
        'Pochvaly a povzbudenie',
        'Dohodnuté kľúčové slová',
      ],
    },
    {
      id: 'fs_pa_5',
      typ: 'multi',
      text: 'Kedy chcem spätnú väzbu',
      moznosti: [
        'Priebežne, jemné usmernenia',
        'Len pri zmene tempa alebo polohy',
        'Krátke kľúčové slová podľa dohody',
        'Až po akte',
        'Dohodneme si signály',
      ],
    },
  ],

  'oralna-intimita/face-sitting/preferencie': [
    {
      id: 'fs_pr_1',
      typ: 'multi',
      text: 'Čo ma priťahuje v polohe DOLE (poskytujem orál, lono partnera nado mnou)',
      moznosti: [
        'Pocit služby a oddanosti',
        'Odovzdanie sa, submisivita',
        'Intenzívna vôňa a chuť partnera',
        'Fyzický tlak a pohltenie',
        'Pocit (pri)dusenia',
        'Keď ma partner prosí, aby som pokračoval(a)',
        'Keď partner sebavedomo vedie tempo a tlak',
        'Pocit váhy partnera na tvári',
        'Tunelové vnímanie / subspace',
      ],
    },
    {
      id: 'fs_pr_2',
      typ: 'multi',
      text: 'Čo ma priťahuje v polohe HORE (prijímam orál, sedím nad tvárou partnera)',
      moznosti: [
        'Pocit moci a kontroly',
        'Intenzita a blízkosť',
        'Vôňa a prirodzenosť partnera',
        'Pocit, že som uctievaný/á',
        'Pocit, že partnera použijem pre vlastné potešenie',
        'Pohodlie a pasivita',
        'Keď partner prosí a poslúcha',
        'Priama stimulácia bez vlastného pohybu',
        'Vidím partnerove reakcie',
      ],
    },
    {
      id: 'fs_pr_3',
      typ: 'multi',
      text: 'Akú atmosféru preferujem',
      moznosti: [
        'Dominantnú a vášnivú',
        'Hravú a laškovnú',
        'Jemnú a zmyselnú',
        'Rituál uctievania (worship)',
      ],
    },
    {
      id: 'fs_pr_4',
      typ: 'multi',
      text: 'Čo by zážitok umocnilo',
      moznosti: [
        'Konkrétne slová / dirty talk / príkazy',
        'Prostredie — hudba, svetlo, tma',
        'Určitý rytmus alebo tempo',
        'Očný kontakt a pohľad na partnera',
        'Cez bielizeň ako jemný vstup',
        'Jasná dynamika moci (D/s)',
        'Zaviazané oči',
        'Znehybnenie toho, kto je dole (bondage)',
      ],
    },
    {
      id: 'fs_pr_5',
      typ: 'postoj',
      text: 'Rytmické trenie (grinding) — použiť nos alebo bradu partnera na priamu stimuláciu',
    },
    {
      id: 'fs_pr_6',
      typ: 'postoj',
      text: 'Verbálne vedenie počas polohy („nádych… a teraz ma prijmi")',
    },
    {
      id: 'fs_pr_7',
      typ: 'multi',
      text: 'Chcem, aby to bolo',
      moznosti: ['Spontánne', 'Plánované', 'Ako rituál', 'Len občasný bonus'],
    },
    {
      id: 'fs_pr_8',
      typ: 'text',
      text: 'Jeden detail, bez ktorého to pre mňa nefunguje',
      napoveda: 'Voliteľné.',
    },
  ],

  'oralna-intimita/face-sitting/techniky': [
    { id: 'fs_te_1', typ: 'postoj', text: '„Vznášajúci sa oblak" (hover) — opora o kolená, len jemný dotyk tváre' },
    { id: 'fs_te_2', typ: 'postoj', text: '„Trón" — partner sedí obkročmo, váhu drží na vlastných kolenách' },
    { id: 'fs_te_3', typ: 'postoj', text: 'Plný kontakt s oporou (o čelo postele) — priestor na dýchanie zostáva' },
    { id: 'fs_te_4', typ: 'postoj', text: '„Plná odovzdanosť" — partner prenesie celú váhu na tvár' },
    { id: 'fs_te_5', typ: 'postoj', text: 'Reverse — osoba hore otočená smerom k nohám partnera' },
    { id: 'fs_te_6', typ: 'postoj', text: 'Side-saddle (bokom) — menej mocenské, šetrnejšie ku krku a čeľusti' },
    { id: 'fs_te_7', typ: 'postoj', text: 'Na hrane postele alebo na stoličke — stabilný uhol, ľahšie pauzy' },
    { id: 'fs_te_8', typ: 'postoj', text: 'Cez oblečenie / bielizeň vs. úplne nahí' },
    { id: 'fs_te_9', typ: 'postoj', text: 'Krátke „vlny" s pauzami vs. dlhá súvislá hra' },
    {
      id: 'fs_te_10',
      typ: 'multi',
      text: 'S čím to chcem kombinovať',
      moznosti: [
        'Dirty talk / príkazy / pochvala',
        'Worship rituál (trón, slová uctievania)',
        'Tma, hudba, zaviazané oči',
        'Znehybnenie toho, kto je dole (bondage)',
        'Edging / odďaľovanie',
        'Zrkadlo alebo vedomý očný kontakt',
      ],
    },
  ],

  'oralna-intimita/face-sitting/scenare': [
    { id: 'fs_sc_1', typ: 'postoj', text: 'S0 — dotyk bez tlaku, pár sekúnd, len blízkosť a kontakt' },
    { id: 'fs_sc_2', typ: 'postoj', text: 'S1 — jemná verzia s krátkymi intervalmi a častými pauzami' },
    { id: 'fs_sc_3', typ: 'postoj', text: 'S2 — jasne rozdelené roly (kto vedie, kto sa nechá viesť), vyskúšať obe' },
    { id: 'fs_sc_4', typ: 'postoj', text: 'S3 — intenzívnejšia verzia: viac tlaku, tempa a váhy' },
    { id: 'fs_sc_5', typ: 'postoj', text: 'S4 — pridať prvky roleplay / dominancie s jasnými hranicami' },
    {
      id: 'fs_sc_6',
      typ: 'text',
      text: 'Ako by mal vyzerať náš prvý spoločný pokus?',
      napoveda: 'Voliteľné — miesto, dĺžka, kto je hore/dole, stop-signál.',
    },
  ],

  'oralna-intimita/face-sitting/hranice': [
    { id: 'fs_hr_1', typ: 'semafor', text: 'Prirodzená vôňa a chuť partnera bez sprchy tesne predtým' },
    { id: 'fs_hr_2', typ: 'semafor', text: 'Plná váha na tvári bez opory' },
    { id: 'fs_hr_3', typ: 'semafor', text: 'Prvky obmedzenia dychu (smothering)' },
    { id: 'fs_hr_4', typ: 'semafor', text: 'Ponižujúci dirty talk voči tomu, kto je dole' },
    { id: 'fs_hr_5', typ: 'semafor', text: 'Uctievajúci dirty talk a oslovenia (kráľovná, bohyňa, pán)' },
    { id: 'fs_hr_6', typ: 'semafor', text: 'Znehybnenie toho, kto je dole (putá, držanie za ruky)' },
    { id: 'fs_hr_7', typ: 'semafor', text: 'Anilingus ako súčasť polohy' },
    { id: 'fs_hr_8', typ: 'semafor', text: 'Nahrávanie alebo fotky z tejto polohy' },
    {
      id: 'fs_hr_9',
      typ: 'text',
      text: 'Čo je pre mňa „červená vlajka" — kedy chcem okamžite stop alebo pauzu',
      napoveda: 'Voliteľné.',
    },
  ],

  'oralna-intimita/face-sitting/rizikove': [
    {
      id: 'fs_ri_1',
      typ: 'postoj',
      text: 'Zámerné krátke prekrytie dýchacích ciest (smother) ako dohodnutý opt-in prvok',
    },
    {
      id: 'fs_ri_2',
      typ: 'multi',
      text: 'Čo ma na fantázii obmedzenia dychu priťahuje',
      moznosti: [
        'Pocit úplnej bezmocnosti a odovzdanosti',
        'Adrenalín a vzrušenie z rizika',
        'Intenzívna blízkosť a pohltenie',
        'Zmenený stav vedomia (subspace)',
        'Zodpovednosť a kontrola v roli hore',
      ],
    },
    {
      id: 'fs_ri_3',
      typ: 'text',
      text: 'Náš dohodnutý stop-signál pre OKAMŽITÉ zastavenie',
      napoveda: 'Napr. opakované poklepanie po stehne partnera. Neverbálny — funguje aj bez hlasu.',
    },
    {
      id: 'fs_ri_4',
      typ: 'multi',
      text: 'Podmienky, za ktorých som ochotný(á) do toho ísť',
      moznosti: [
        'Len krátke intervaly (sekundy)',
        'Nikdy pri chorobe, strese alebo únave',
        'Nikdy pri časovom tlaku',
        'Len triezvi',
        'Váha opretá o kolená partnera',
        'Vopred dohodnutý scenár a hranice',
      ],
    },
    {
      id: 'fs_ri_5',
      typ: 'text',
      text: 'Zdravotné okolnosti, ktoré treba brať do úvahy',
      napoveda: 'Napr. panické reakcie na stiesnenie, bolesti krku/čeľuste, problémy s dýchaním. Voliteľné.',
    },
  ],

  'oralna-intimita/face-sitting/pocity': [
    {
      id: 'fs_po_1',
      typ: 'multi',
      text: 'Aké bloky alebo obavy pri tejto téme cítim',
      moznosti: [
        'Obava o dostatok vzduchu',
        'Strach, že ublížim partnerovi (v roli hore)',
        'Hanba alebo neistota',
        'Nepríjemné pocity z vône alebo chuti',
        'Fyzické nepohodlie (krk, čeľusť)',
        'Strach z odsúdenia',
        'Pocit straty kontroly',
        'Neviem, čo mám robiť',
        'Trápnosť z dynamiky moci',
      ],
    },
    {
      id: 'fs_po_2',
      typ: 'multi',
      text: 'Čo by mi pomohlo cítiť sa uvoľnenejšie',
      moznosti: [
        'Viac páuz a pomalšie tempo',
        'Jasnejšie inštrukcie od partnera',
        'Menej tlaku na výkon',
        'Vedomie, že môžem kedykoľvek prestať',
        'Uistenie, že partnerovi vôňa a chuť vyhovuje',
        'Sprcha pred hrou',
        'Začať v hover verzii',
      ],
    },
    {
      id: 'fs_po_3',
      typ: 'text',
      text: 'Čo chcem, aby partner o mojich pocitoch pri tejto téme vedel (1–3 vety)',
      napoveda: 'Voliteľné.',
    },
  ],

  'oralna-intimita/face-sitting/session-card': [
    {
      id: 'fs_se_1',
      typ: 'multi',
      text: 'Do našej „session card" pre face-sitting patrí',
      moznosti: [
        'Kto je hore a kto dole',
        'Ktorý stupeň intenzity (hover / trón / plný kontakt)',
        'Stop-signál',
        'Dĺžka alebo počet vĺn',
        'Prostredie (hudba, svetlo)',
        'Slová, ktoré chcem počuť',
        'Aftercare po',
      ],
    },
    {
      id: 'fs_se_2',
      typ: 'text',
      text: 'Konkrétny plán na najbližšiu spoločnú chvíľu',
      napoveda: 'Voliteľné — 2–3 vety.',
    },
  ],
}

export function otazkySekcie(modul: string, tema: string, sekcia: string): Otazka[] {
  return OTAZKY[`${modul}/${tema}/${sekcia}`] ?? []
}
