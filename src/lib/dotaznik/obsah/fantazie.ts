import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Fantázie — screening a preklad do reality — nový modul A6 (doplnený nad
// rámec pôvodného návrhu, doména A „Naladenie a rámec").
// Zdroje: „strom.docx" (kap. 12 „Fantázie — skríning + preklad do reality")
// a „Dotazník Pre Páry.docx" (odkaz na WSFQ — Wilson Sex Fantasy
// Questionnaire — 4 stabilné klastre fantázií: Intimate / Exploratory /
// Impersonal / Sadomasochistic). Chýbajúci centrálny modul: štruktúrovaný
// prehľad štyroch klastrov fantázií so škálami frekvencie/dôležitosti a
// samostatným „prepínačom" realizácie pre každý klaster (len fantázia ↔
// cez slová/roleplay ↔ možno ↔ za podmienok ↔ áno reálne). Konkrétny krok
// prevodu JEDNEJ fantázie do reality („pilot") má vlastnú kartu v téme
// „Súhlas, bezpečie a komunikácia". Všeobecné zdieľanie fantázií v páre je
// aj v „Dlhodobej intimite" (A1) — tu je dôraz na mapovanie klastrov, nie
// na vzťahovú dynamiku.
// ─────────────────────────────────────────────────────────────────────────────

const FREKV_DOLEZITOST: Moznost[] = [
  { v: 'caste_dolezite', label: 'Časté a pre mňa dôležité' },
  { v: 'obcasne', label: 'Občasné, príjemné spestrenie' },
  { v: 'zriedkave', label: 'Zriedkavé, mihnú sa' },
  { v: 'nie', label: 'Túto oblasť vo fantázii nemám' },
]
const REALIZACIA: Moznost[] = [
  { v: 'len_fantazia', label: 'Len fantázia — nechcem realizovať' },
  { v: 'slova_roleplay', label: 'Cez slová / dirty talk / roleplay „naniby"' },
  { v: 'mozno', label: 'Možno niekedy, potrebujem o tom premýšľať' },
  { v: 'za_podmienok', label: 'Áno, ale za jasných podmienok' },
  { v: 'ano_realne', label: 'Áno, chcem to skúsiť reálne' },
]

type Okruh = { id: string; nazov: string; popis: string }
// 4 stabilné klastre podľa WSFQ (Wilson Sex Fantasy Questionnaire), doplnené
// o bežné príklady z „strom.docx" tak, aby si každý klaster vedel predstaviť.
const OKRUHY: Okruh[] = [
  { id: 'intimate', nazov: 'Intimate — blízkosť a romantika', popis: 'Hlboké citové zblíženie so známym partnerom, romantické „filmové" scény, dôvera.' },
  { id: 'exploratory', nazov: 'Exploratory — novota a skupiny', popis: 'Nové praktiky, skupiny, výmena partnerov, dobrodružstvo, riziko byť objavený.' },
  { id: 'impersonal', nazov: 'Impersonal — cudzinci a pozorovanie', popis: 'Anonymní partneri, náhodné stretnutia, voyeurizmus/exhibicionizmus, byť sledovaný/á alebo sledovať.' },
  { id: 'sadomasochistic', nazov: 'Sadomasochistic — moc a disciplína', popis: 'Dominancia, submisia, strata/prevzatie kontroly, disciplína, hra s bolesťou.' },
]

function okruhBlok(o: Okruh): Blok {
  return {
    druh: 'skupina', id: `okr_${o.id}`, nadpis: o.nazov,
    bloky: [
      { druh: 'text', id: `okr_${o.id}_info`, telo: o.popis },
      { druh: 'otazka', id: `okr_${o.id}_frekvencia`, typ: 'jeden', text: 'Ako často a ako silno sa mi táto predstava vracia', moznosti: FREKV_DOLEZITOST },
      { druh: 'otazka', id: `okr_${o.id}_realizacia`, typ: 'jeden', text: 'Chcem to niekedy preniesť do reality?', moznosti: REALIZACIA },
      { druh: 'otazka', id: `okr_${o.id}_konkretne`, typ: 'text', text: 'Konkrétnejšie (voliteľné) — čo presne si predstavujem:' },
    ],
  }
}

// ── Ako táto téma funguje ─────────────────────────────────────────────
const AKO_FUNGUJE: Blok = {
  druh: 'skupina', id: 'ako_funguje', nadpis: 'Ako táto téma funguje',
  bloky: [
    {
      druh: 'text', id: 'funguje_info', ton: 'info',
      telo:
        'Pri každom okruhu fantázií oceníš dve veci samostatne: ako často/silno sa ti táto predstava vracia, ' +
        'a či ju vôbec chceš preniesť do reality — od „len fantázia" cez „za podmienok" až po „áno naozaj". ' +
        'Fantázia nikdy nie je záväzok ju splniť.',
    },
  ],
}

// ── Hranie s tabu ────────────────────────────────────────────────────
// Zdroj: „32_Sny_tuzby_a_fantazie_a_TABU.docx" — krátky, generický fragment
// (prekonávanie zábran, adrenalín, psychologická stimulácia); zaradené sem
// ako doplnkový blok namiesto samostatnej témy.
const TABU: Blok = {
  druh: 'skupina', id: 'tabu', nadpis: 'Hranie s tabu',
  bloky: [
    {
      druh: 'text', id: 'tabu_info',
      telo:
        'Prekonávanie zábran a skúmanie tabuizovaných tém môže byť cestou k novým dimenziám vzrušenia — ' +
        'láka v tom adrenalín zo „zakázaného" a pocit odvahy, nie samotný akt. Vyžaduje jasnú komunikáciu a dôveru.',
    },
    {
      druh: 'otazka', id: 'tabu_diskusia', typ: 'jeden',
      text: 'Chcem diskutovať o svojich najtajnejších fantáziách s partnerom/kou',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) sa podelím' },
        { v: 'potrebujem_cas', label: 'Možno, potrebujem na to čas' },
        { v: 'nie', label: 'Nie, necítim sa pri tom komfortne' },
      ],
    },
    {
      druh: 'otazka', id: 'tabu_skumanie', typ: 'jeden',
      text: 'Ako vnímam skúmanie tabuizovaných praktík všeobecne',
      moznosti: [
        { v: 'laka', label: 'Láka ma to, rád(a) by som ich preskúmal(a)' },
        { v: 'mozno_pripraveny', label: 'Možno, ak sa na to budem cítiť pripravený/á' },
        { v: 'nie', label: 'Nie, nemám o to záujem' },
      ],
    },
  ],
}

// ── Známa/slávna osoba ────────────────────────────────────────────
// Zdroj: Joyal, Cossette & Lapierre (2015) — fantázia o slávnej/známej osobe
// patrí medzi najintenzívnejšie a najčastejšie fantázie vôbec (nad polovicu
// vzorky), preto má vlastnú kartu namiesto splynutia s klastrom „Impersonal".
const SLAVNA_OSOBA: Blok = {
  druh: 'skupina', id: 'slavna_osoba', nadpis: 'Slávna alebo verejne známa osoba',
  bloky: [
    {
      druh: 'text', id: 'slavna_info',
      telo: 'Jedna z najbežnejších fantázií vôbec — predstava sexu so slávnou herečkou/hercom, spevákom/čkou alebo inou verejne známou osobou.',
    },
    { druh: 'otazka', id: 'slavna_frekvencia', typ: 'jeden', text: 'Ako často sa mi táto predstava vracia', moznosti: FREKV_DOLEZITOST },
  ],
}

// ── Trans partner/ka ─────────────────────────────────────────────────
// Príťažlivosť k trans ženám/mužom je bežná a dobre zdokumentovaná forma
// príťažlivosti, nezávislá od vlastnej sexuálnej orientácie. Vlastná karta,
// aby mala rovnaké miesto ako iné bežné fantázie, nie aby zapadla niekam
// pod „exotické" alebo sa spájala len s pornografickými klišé.
const TRANS_PARTNER: Blok = {
  druh: 'skupina', id: 'trans_partner', nadpis: 'Trans partnerka/partner',
  bloky: [
    {
      druh: 'text', id: 'trans_info',
      telo:
        'Príťažlivosť k trans ženám alebo trans mužom je bežná a nehovorí nič zvláštne o orientácii toho, ' +
        'kto ju cíti — je to len jedna z foriem toho, kto nás priťahuje. Ak by sa táto fantázia mala niekedy ' +
        'preniesť do reality, ide vždy o skutočného človeka s vlastnými hranicami a potrebou rešpektu, nie o „typ".',
    },
    { druh: 'otazka', id: 'trans_frekvencia', typ: 'jeden', text: 'Ako často sa mi táto predstava vracia', moznosti: FREKV_DOLEZITOST },
    { druh: 'otazka', id: 'trans_realizacia', typ: 'jeden', text: 'Chcem to niekedy preniesť do reality?', moznosti: REALIZACIA },
  ],
}

// ── Negatívne pocity a zdieľanie ────────────────────────────────────
const NEGATIVNE: Blok = {
  druh: 'skupina', id: 'negativne', nadpis: 'Negatívne pocity a zdieľanie',
  bloky: [
    {
      druh: 'otazka', id: 'neg_pocity', typ: 'jeden',
      text: 'Mám niekedy pri niektorých fantáziách pocit hanby alebo znepokojenia',
      moznosti: [
        { v: 'ano_casto', label: 'Áno, dosť často' },
        { v: 'ano_niekedy', label: 'Niekedy, pri konkrétnej téme' },
        { v: 'nie', label: 'Nie, som s nimi v pohode' },
      ],
    },
    {
      druh: 'otazka', id: 'neg_zdielanie', typ: 'jeden',
      text: 'Ako otvorene zdieľam fantázie s partnerom/kou',
      moznosti: [
        { v: 'vsetko', label: 'Zdieľam takmer všetko' },
        { v: 'len_niektore', label: 'Len tie, pri ktorých sa cítim bezpečne' },
        { v: 'takmer_nic', label: 'Zatiaľ takmer nič nezdieľam' },
      ],
    },
  ],
}

// ── Preklad do reality — zhrnutie ────────────────────────────────────
const PREKLAD: Blok = {
  druh: 'skupina', id: 'preklad', nadpis: 'Preklad do reality — ďalší krok',
  bloky: [
    {
      druh: 'text', id: 'preklad_info', ton: 'info',
      telo:
        'Pre konkrétny prvý krok pri jednej vybranej fantázii (mini verzia, jasné hranice, na ako dlho) ' +
        'použite kartu „Pilot" v téme „Súhlas, bezpečie a komunikácia".',
    },
    { druh: 'otazka', id: 'pre_prve', typ: 'text', text: 'Ktorý okruh by som chcel(a) posunúť ďalej ako prvý:' },
    {
      druh: 'otazka', id: 'pre_pristup', typ: 'jeden',
      text: 'Akým tempom chcem k realizácii pristupovať',
      moznosti: [
        { v: 'male_kroky', label: 'Malými krokmi, postupne budovať dôveru' },
        { v: 'spontanne', label: 'Spontánne, podľa nálady, bez veľkého plánovania' },
        { v: 'az_pripraveni', label: 'Len keď sa obaja budeme cítiť úplne pripravení' },
      ],
    },
    {
      druh: 'otazka', id: 'pre_prehodnocovanie', typ: 'jeden',
      text: 'Fantázie sa časom menia — ako často by som ich chcel(a) s partnerom/kou znova prebrať',
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne, každých pár týždňov/mesiacov' },
        { v: 'ked_nieco_nove', label: 'Len keď sa objaví niečo nové, čo chcem zdieľať' },
        { v: 'nechcem_casto', label: 'Nechcem o tom hovoriť príliš často' },
      ],
    },
  ],
}

export const FANTAZIE: TemaObsah = {
  slug: 'fantazie-preklad-reality/fantazie-preklad-reality',
  nadpis: 'Fantázie — screening a preklad do reality',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Mapa vlastných fantázií',
      telo:
        'Väčšina ľudí má bohatšiu fantazijnú knižnicu, než si prizná nahlas. Táto téma pomáha pomenovať, ' +
        'ktoré okruhy fantázií sú u mňa časté a dôležité — a oddelene od toho, ktoré z nich vôbec chcem skúsiť naživo.',
    },
  ],
  telo: [
    AKO_FUNGUJE,
    ...OKRUHY.map(okruhBlok),
    SLAVNA_OSOBA,
    TRANS_PARTNER,
    TABU,
    NEGATIVNE,
    PREKLAD,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako „len fantázia", sa nikde nezobrazí ako žiadosť o realizáciu.',
    },
  ],
}
