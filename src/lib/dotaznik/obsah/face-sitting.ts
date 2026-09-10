import type { TemaObsah, Blok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Face-sitting — obsah 1:1 podľa „Face sitting M./ž." (spracované podklady).
// Mužská (m) a ženská (z) verzia sú zrkadlové: rovnaké id otázok aj hodnoty,
// líši sa len oslovenie a rod, aby pri Double-Blind sadli odpovede proti sebe.
// Rola: DOLE = poskytuješ orál (tvár pod lonom partnera/ky).
//        HORE = prijímaš orál (sedíš na tvári partnera/ky).
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const MIERA_MOZNOSTI = [
  { v: 'velmi', label: 'Veľmi ma to vzrušovalo – chcem to opakovať / zaradiť' },
  { v: 'skor', label: g(
    'Skôr ma to vzrušovalo – rád to zopakujem, ak budú vhodné podmienky',
    'Skôr ma to vzrušovalo – rada to zopakujem, ak budú vhodné podmienky',
  ) },
  { v: 'neutral', label: 'Neutrálne – je to v poriadku, ale nie je to moja priorita' },
  { v: 'nesedelo', label: 'Skôr mi to nesedelo, ale môže sa to zlepšiť – ak upravíme tempo / techniku / komunikáciu' },
  { v: 'neprijemne', label: 'Bolo mi to nepríjemné / mimo mojich hraníc – nechcem to opakovať' },
]

const FREKVENCIA_MOZNOSTI = [
  { v: 'pravidelne', label: 'Pravidelne počas intímností' },
  { v: 'nalada', label: 'Podľa nálady (dám signál slovom / dotykom)' },
  { v: 'sporadicky', label: 'Sporadicky' },
  { v: 'prisposobim', label: g('Rád sa prispôsobím túžbam partnerky', 'Rada sa prispôsobím túžbam partnera') },
]

const STYL_MOZNOSTI = [
  { v: 'spontanne', label: 'Spontánne' },
  { v: 'planovane', label: 'Plánované' },
  { v: 'ritual', label: 'Ako rituál' },
  { v: 'bonus', label: 'Len občasný „bonus"' },
]

const ATMOSFERA_MOZNOSTI = [
  { v: 'dominantna', label: 'Dominantnú a vášnivú' },
  { v: 'hrava', label: 'Hravú a laškovnú' },
  { v: 'jemna', label: 'Jemnú a zmyselnú' },
]

const TLAK_MOZNOSTI = [
  { v: 'jemny', label: 'Jemný' },
  { v: 'stredny', label: 'Stredný' },
  { v: 'silny', label: 'Silný' },
]
const TEMPO_MOZNOSTI = [
  { v: 'pomale', label: 'Pomalé a zmyselné' },
  { v: 'striedave', label: 'Striedavé (vlny)' },
  { v: 'rychle', label: 'Rýchle a vášnivé' },
]
const KONTROLA_MOZNOSTI = [
  { v: 'vediem', label: g('Rád vediem', 'Rada vediem') },
  { v: 'viest', label: g('Rád sa nechám viesť', 'Rada sa nechám viesť') },
  { v: 'striedame', label: 'Striedame sa' },
]

// ── Rozmer tlaku a dychu (rovnaký úvodný text pre DOLE aj HORE) ──────────────
const SMOTHER_UVOD: Blok = {
  druh: 'text',
  id: 'smother_uvod',
  nadpis: 'Rozmer tlaku a dychu – „Smother / breath" dimenzia',
  ton: 'vystraha',
  telo:
    'Táto časť je určená len pre páry, ktoré spoločne a dobrovoľne zaujíma fantázia obmedzenia dychu. ' +
    'Ide o rizikovú praktiku, ktorá vyžaduje maximálnu dôveru, jasnú komunikáciu a vopred dohodnuté pravidlá. ' +
    'Ak ťa táto téma neláka, pokojne ju preskoč.',
}

// ── Blok „Poskytujúca rola (Dole)" ─────────────────────────────────────────
const DOLE: Blok = {
  druh: 'skupina',
  id: 'dole',
  nadpis: 'Poskytujúca rola („Dole")',
  uvod: g(
    'Táto časť je pre teba ako partnera, ktorý poskytuje orálnu stimuláciu. Pomôže ti pomenovať pocity, hranice a potreby v tejto pozícii.',
    'Táto časť je pre teba ako partnerku, ktorá poskytuje orálnu stimuláciu. Pomôže ti pomenovať pocity, hranice a potreby v tejto pozícii.',
  ),
  podmienka: { ot: 'skusenost', obsahujeNiektoru: ['dole', 'oboje'] },
  bloky: [
    {
      druh: 'otazka',
      id: 'dole_miera',
      typ: 'skala',
      text: 'Ktoré tvrdenie najviac sedí na tvoju skúsenosť v polohe DOLE?',
      napoveda: g('Tvoja tvár pod partnerkiným lonom / telom.', 'Tvoja tvár pod partnerovým lonom / telom.'),
      moznosti: MIERA_MOZNOSTI,
    },
    {
      druh: 'otazka',
      id: 'dole_miera_zlepsit',
      typ: 'text',
      text: 'Čo by to podľa teba mohlo zlepšiť?',
      podmienka: { ot: 'dole_miera', je: 'nesedelo' },
    },
    { druh: 'otazka', id: 'dole_frekvencia', typ: 'jeden', text: 'Frekvencia, ktorá ti vyhovuje:', moznosti: FREKVENCIA_MOZNOSTI },
    { druh: 'otazka', id: 'dole_styl', typ: 'viac', text: 'Chceš, aby to bolo:', moznosti: STYL_MOZNOSTI },
    {
      druh: 'otazka',
      id: 'dole_priahuje',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo ťa na tejto roli najviac priťahuje? (reálne alebo vo fantázii)',
      moznosti: [
        { v: 'sluzba', label: 'Pocit služby a oddanosti' },
        { v: 'submisia', label: g('Submisivita a odovzdanie sa partnerke', 'Submisivita a odovzdanie sa partnerovi') },
        { v: 'vona', label: g('Partnerkina intenzívna vôňa a chuť', 'Partnerova intenzívna vôňa a chuť') },
        { v: 'tlak', label: 'Pocit fyzického tlaku a pohltenia' },
        { v: 'pridusenie', label: 'Pocit pridusenia' },
        { v: 'prosba', label: g('Keď ma partnerka prosí, aby som pokračoval', 'Keď ma partner prosí, aby som pokračovala') },
        { v: 'vedenie', label: g('Keď partnerka sebavedomo a aktívne vedie tempo a tlak', 'Keď partner sebavedomo a aktívne vedie tempo a tlak') },
        { v: 'vaha', label: g('Pocit partnerkinej váhy na mojej tvári', 'Pocit partnerovej váhy na mojej tvári') },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_dolezitejsie',
      typ: 'jeden',
      text: 'Čo je pre teba dôležitejšie?',
      moznosti: [
        { v: 'pouzity', label: g('Byť „použitý" pre potešenie partnerky', 'Byť „použitá" pre potešenie partnera') },
        { v: 'oceneny', label: g('Byť ocenený za svoju snahu (pochvala, vďaka)', 'Byť ocenená za svoju snahu (pochvala, vďaka)') },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_signal',
      typ: 'viac',
      text: 'Aký signál ti najlepšie napovie, že to robíš dobre?',
      moznosti: [
        { v: 'zvuky', label: g('Partnerkine zvuky a vzdychy', 'Partnerove zvuky a vzdychy') },
        { v: 'pohyby', label: g('Pohyby partnerkinho tela a panvy', 'Pohyby partnerovho tela a panvy') },
        { v: 'slova', label: 'Slovné potvrdenie alebo príkazy' },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_obavy',
      typ: 'viac',
      text: 'Máš nejaké obavy alebo mentálne bloky?',
      napoveda: 'Môžeš označiť viacero možností.',
      moznosti: [
        { v: 'vzduch', label: 'Obava o dostatok vzduchu' },
        { v: 'hanba', label: 'Hanba alebo neistota' },
        { v: 'vona', label: 'Nepríjemné pocity z vône alebo chuti' },
        { v: 'nepohodlie', label: 'Fyzické nepohodlie (krk, čeľusť)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_pomoc',
      typ: 'viac',
      text: 'Čo by ti pomohlo cítiť sa uvoľnenejšie?',
      moznosti: [
        { v: 'pauzy', label: 'Viac pauz a pomalšie tempo' },
        { v: 'instrukcie', label: g('Jasnejšie inštrukcie od partnerky', 'Jasnejšie inštrukcie od partnera') },
        { v: 'menej_tlaku', label: 'Menej tlaku na výkon' },
        { v: 'stop', label: 'Vedomie, že môžem kedykoľvek prestať' },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_lakadlo',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo je pre teba najväčším lákadlom v tejto polohe?',
      moznosti: [
        { v: 'moc', label: 'Pocit moci a kontroly' },
        { v: 'intenzita', label: 'Intenzita a blízkosť' },
        { v: 'vona', label: g('Vôňa a prirodzenosť partnerky', 'Vôňa a prirodzenosť partnera') },
        { v: 'uctievanie', label: g('Pocit, že ma partnerka uctieva', 'Pocit, že ma partner uctieva') },
        { v: 'pasivita', label: 'Pohodlie a pasivita' },
      ],
    },
    { druh: 'otazka', id: 'dole_atmosfera', typ: 'jeden', text: 'Akú atmosféru preferuješ?', moznosti: ATMOSFERA_MOZNOSTI },
    {
      druh: 'otazka',
      id: 'dole_umocni',
      typ: 'viac',
      text: 'Čo by mohlo tvoj zážitok ešte viac umocniť?',
      napoveda: 'Môžeš označiť viacero možností.',
      moznosti: [
        { v: 'slova', label: 'Konkrétne slová alebo frázy (dirty talk, príkazy)' },
        { v: 'prostredie', label: 'Špecifické prostredie (hudba, svetlo)' },
        { v: 'rytmus', label: 'Určitý rytmus alebo tempo' },
        { v: 'pohlad', label: g('Pohľad na partnerku', 'Pohľad na partnera') },
        { v: 'bielizen', label: 'Cez bielizeň ako fetiš' },
        { v: 'dynamika', label: 'Jasná dynamika moci (dominancia / submisivita)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'dole_eroticke',
      typ: 'viac',
      text: 'Čo je pre teba v tejto roli najviac erotické?',
      moznosti: [
        { v: 'plnim', label: g('Keď plním pokyny partnerky', 'Keď plním pokyny partnera') },
        { v: 'iniciativa', label: g('Keď partnerka preberá iniciatívu a je aktívna', 'Keď partner preberá iniciatívu a je aktívny') },
        { v: 'uziva', label: g('Keď vidím, že si to partnerka užíva', 'Keď vidím, že si to partner užíva') },
      ],
    },
    { druh: 'otazka', id: 'dole_hranice', typ: 'text', text: 'Aké sú tvoje hranice? Čo by ťa odradilo?' },

    { druh: 'text', id: 'dole_konkretne_nadpis', nadpis: 'Konkrétne preferencie – intenzita a kontrola', telo: '' },
    { druh: 'otazka', id: 'dole_tlak', typ: 'jeden', text: 'Tlak', moznosti: TLAK_MOZNOSTI },
    { druh: 'otazka', id: 'dole_tempo', typ: 'jeden', text: 'Tempo', moznosti: TEMPO_MOZNOSTI },
    { druh: 'otazka', id: 'dole_kontrola', typ: 'jeden', text: 'Kontrola', moznosti: KONTROLA_MOZNOSTI },
    {
      druh: 'otazka',
      id: 'dole_worship',
      typ: 'viac',
      inePovolene: true,
      text: '„Worship / service" – detail. Čo ťa v tejto dynamike láka?',
      napoveda: 'Môžeš označiť viac možností.',
      moznosti: [
        { v: 'urob_dobre', label: g('Keď mi partnerka hovorí „urob mi dobre"', 'Keď mi partner hovorí „urob mi dobre"') },
        { v: 'pochvala', label: 'Pochvala' },
        { v: 'prosby', label: 'Prosby' },
        { v: 'prikazy', label: 'Príkazy' },
        { v: 'ponizovanie', label: 'Ponižovanie' },
      ],
    },

    {
      druh: 'skupina',
      id: 'dole_smother',
      nadpis: 'Pre rolu „Dole" (prijímajúci tlak)',
      bloky: [
        SMOTHER_UVOD,
        {
          druh: 'otazka',
          id: 'dole_smother_priahuje',
          typ: 'viac',
          text: 'Čo ťa na tejto fantázii priťahuje?',
          moznosti: [
            { v: 'bezmocnost', label: 'Pocit úplnej bezmocnosti a odovzdanosti' },
            { v: 'adrenalin', label: 'Adrenalín a vzrušenie z rizika' },
            { v: 'blizkost', label: 'Intenzívny pocit blízkosti a pohltenia' },
            { v: 'subspace', label: 'Zmenený stav vedomia (subspace)' },
          ],
        },
        {
          druh: 'otazka',
          id: 'dole_smother_signal',
          typ: 'viac',
          inePovolene: true,
          text: 'Aký je tvoj bezpečnostný signál, ktorý znamená OKAMŽITÉ ZASTAVENIE?',
          moznosti: [
            { v: 'gesto', label: g('Dohodnuté gesto (napr. opakované poklepanie po tele partnerky)', 'Dohodnuté gesto (napr. opakované poklepanie po tele partnera)') },
          ],
        },
      ],
    },
  ],
}

// ── Blok „Prijímajúca rola (Hore)" ────────────────────────────────────────
const HORE: Blok = {
  druh: 'skupina',
  id: 'hore',
  nadpis: 'Prijímajúca rola („Hore")',
  uvod: g(
    'Táto časť je pre teba ako partnera, ktorý prijíma orálnu stimuláciu. Pomôže ti pomenovať, čo ťa v tejto pozícii priťahuje a čo prežívaš.',
    'Táto časť je pre teba ako partnerku, ktorá prijíma orálnu stimuláciu. Pomôže ti pomenovať, čo ťa v tejto pozícii priťahuje a čo prežívaš.',
  ),
  podmienka: { ot: 'skusenost', obsahujeNiektoru: ['hore', 'oboje'] },
  bloky: [
    {
      druh: 'otazka',
      id: 'hore_miera',
      typ: 'skala',
      text: 'Ktoré tvrdenie najviac sedí na tvoju skúsenosť v polohe HORE?',
      napoveda: g('Si nad partnerkinou tvárou / na jej tvári.', 'Si nad partnerovou tvárou / na jeho tvári.'),
      moznosti: MIERA_MOZNOSTI,
    },
    {
      druh: 'otazka',
      id: 'hore_miera_zlepsit',
      typ: 'text',
      text: 'Čo by to podľa teba mohlo zlepšiť?',
      podmienka: { ot: 'hore_miera', je: 'nesedelo' },
    },
    { druh: 'otazka', id: 'hore_frekvencia', typ: 'jeden', text: 'Frekvencia, ktorá ti vyhovuje:', moznosti: FREKVENCIA_MOZNOSTI },
    { druh: 'otazka', id: 'hore_styl', typ: 'viac', text: 'Chceš, aby to bolo:', moznosti: STYL_MOZNOSTI },
    {
      druh: 'otazka',
      id: 'hore_lakadlo',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo je pre teba najväčším lákadlom v tejto polohe?',
      moznosti: [
        { v: 'moc', label: 'Pocit moci a kontroly' },
        { v: 'intenzita', label: 'Intenzita a blízkosť' },
        { v: 'vona', label: 'Moja vôňa a prirodzenosť' },
        { v: 'uctievany', label: g('Pocit, že si uctievaný', 'Pocit, že si uctievaná') },
        { v: 'pouzivam', label: g('Pocit, že partnerku používam pre vlastné potešenie', 'Pocit, že partnera používam pre vlastné potešenie') },
        { v: 'pasivita', label: 'Pohodlie a pasivita' },
        { v: 'prosim', label: g('Keď partnerku prosím, keď poslúcha', 'Keď partnera prosím, keď poslúcha') },
        { v: 'sebavedomy', label: g('Keď som sebavedomý a aktívny', 'Keď som sebavedomá a aktívna') },
      ],
    },
    { druh: 'otazka', id: 'hore_atmosfera', typ: 'jeden', text: 'Akú atmosféru preferuješ?', moznosti: ATMOSFERA_MOZNOSTI },
    {
      druh: 'otazka',
      id: 'hore_umocni',
      typ: 'viac',
      text: 'Čo by mohlo tvoj zážitok ešte viac umocniť?',
      napoveda: 'Môžeš označiť viacero možností.',
      moznosti: [
        { v: 'slova', label: 'Konkrétne slová alebo frázy (dirty talk, príkazy)' },
        { v: 'prostredie', label: 'Špecifické prostredie (hudba, svetlo)' },
        { v: 'rytmus', label: 'Určitý rytmus alebo tempo' },
        { v: 'pohlad', label: g('Pohľad na partnerku', 'Pohľad na partnera') },
        { v: 'dynamika', label: 'Jasná dynamika moci (dominancia / submisivita)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'hore_eroticke',
      typ: 'viac',
      text: 'Čo je pre teba v tejto roli najviac erotické?',
      moznosti: [
        { v: 'plnis', label: 'Keď plníš moje pokyny' },
        { v: 'iniciativa', label: g('Keď preberáš iniciatívu a si aktívna', 'Keď preberáš iniciatívu a si aktívny') },
        { v: 'uziva', label: 'Keď vidím, že si to užívaš' },
      ],
    },
    { druh: 'otazka', id: 'hore_hranice', typ: 'text', text: 'Aké sú tvoje hranice? Čo by ťa odradilo?' },

    {
      druh: 'skupina',
      id: 'hore_smother',
      nadpis: 'Pre rolu „Hore" (kontrolujúci tlak)',
      uvod: '(opakovaná sekcia pre symetriu modulu – logika zachovaná)',
      bloky: [
        SMOTHER_UVOD,
        {
          druh: 'otazka',
          id: 'hore_smother_priahuje',
          typ: 'viac',
          text: 'Čo ťa priťahuje na tejto mocenskej dynamike?',
          moznosti: [
            { v: 'kontrola', label: 'Pocit absolútnej kontroly a dominancie' },
            { v: 'zodpovednost', label: g('Zodpovednosť za zážitok partnerky', 'Zodpovednosť za zážitok partnera') },
            { v: 'hlbka', label: 'Intenzita a hĺbka prepojenia' },
          ],
        },
        { druh: 'otazka', id: 'hore_smother_fungovalo', typ: 'text', text: 'Čo fungovalo / čomu sa chceš vyhnúť:' },
        { druh: 'otazka', id: 'hore_smother_podmienky', typ: 'text', text: 'Moje podmienky:' },
        { druh: 'otazka', id: 'hore_smother_hranice', typ: 'text', text: 'Moje jasné hranice:' },
        { druh: 'otazka', id: 'hore_smother_cervena', typ: 'text', text: 'Červená vlajka (stop / pauza):' },
      ],
    },
  ],
}

// ── „Ešte nie" vetva (žiadna skúsenosť) ────────────────────────────────────
function fantaziaPostoj(rola: 'hore' | 'dole'): Blok {
  const R = rola.toUpperCase()
  return {
    druh: 'skupina',
    id: `en_${rola}`,
    nadpis: `Fantázia a vnútorný postoj – pozícia ${R}`,
    bloky: [
      {
        druh: 'otazka',
        id: `en_${rola}_fantazia`,
        typ: 'jeden',
        text: `Je face sitting niečo, čo sa ti objavuje v myšlienkach alebo fantáziách – keď si predstavíš seba v pozícii ${R}?`,
        moznosti: [
          { v: 'silna', label: 'Je to moja silná / opakujúca sa fantázia' },
          { v: 'obcasna', label: 'Je to občasná predstava' },
          { v: 'zvedavy', label: g('Som zvedavý, ale nie je to súčasť mojich fantázií', 'Som zvedavá, ale nie je to súčasť mojich fantázií') },
        ],
      },
      {
        druh: 'text',
        id: `en_${rola}_pozn`,
        ton: 'info',
        telo: g(
          'Už samotný fakt, že si zvolil preskúmať túto tému, znamená zvedavosť. Tu neriešime odpoveď „nezaujíma ma to". • Fantázia ≠ súhlas • Zvedavosť ≠ záväzok',
          'Už samotný fakt, že si zvolila preskúmať túto tému, znamená zvedavosť. Tu neriešime odpoveď „nezaujíma ma to". • Fantázia ≠ súhlas • Zvedavosť ≠ záväzok',
        ),
      },
      {
        druh: 'otazka',
        id: `en_${rola}_pocit`,
        typ: 'jeden',
        text: 'Keď si túto predstavu pripustíš, aký pocit v tebe vyvoláva?',
        moznosti: [
          { v: 'prijemny', label: 'Príjemný / veľmi vzrušujúci' },
          { v: 'zvedavy', label: 'Skôr zvedavý než vzrušujúci' },
          { v: 'neutralny', label: 'Neutrálny' },
          { v: 'rozpacity', label: 'Rozpačitý / zmiešaný z vlastných pocitov' },
          { v: 'neprijemny_vracia', label: 'Skôr nepríjemný, ale aj tak sa mi vracia' },
        ],
      },
      {
        druh: 'text',
        id: `en_${rola}_pozn2`,
        ton: 'vystraha',
        telo: '⚠️ Tu sa nič nehodnotí. Aj „nepríjemné, ale vracia sa" je dôležitá informácia.',
      },
    ],
  }
}

function ochota(rola: 'hore' | 'dole'): Blok {
  const R = rola.toUpperCase()
  return {
    druh: 'skupina',
    id: `en_ochota_${rola}_sk`,
    nadpis: `Ochota preniesť do reality – pozícia ${R}`,
    bloky: [
      {
        druh: 'otazka',
        id: `en_ochota_${rola}`,
        typ: 'jeden',
        text: 'Ako to máš momentálne s prenesením do reality?',
        moznosti: [
          { v: 'tuzim', label: 'Túžim to skúsiť' },
          { v: 'vyskusam', label: 'Vyskúšam, ak po tom túžiš' },
          { v: 'podmienky', label: 'Možno, ale len za jasných podmienok' },
          { v: 'fantazia', label: 'Chcem, aby to ostalo len moja fantázia' },
          { v: 'nekomfort', label: 'Necítim sa komfortne' },
        ],
      },
      {
        druh: 'otazka',
        id: `en_ochota_${rola}_podmienky`,
        typ: 'text',
        text: 'Za akých podmienok?',
        podmienka: { ot: `en_ochota_${rola}`, je: 'podmienky' },
      },
      {
        druh: 'otazka',
        id: `en_bariery_${rola}`,
        typ: 'viac',
        inePovolene: true,
        text: `Čo by mohol byť tvoj blok v ochote skúsiť to v pozícii ${R}?`,
        napoveda: 'Môžeš označiť viacero – nič z toho nie je „zlé".',
        moznosti:
          rola === 'dole'
            ? [
                { v: 'dych', label: 'Obava z dychu (len pocitová)' },
                { v: 'kontrola', label: 'Pocit straty kontroly' },
                { v: 'hanba', label: 'Hanba / trápnosť' },
                { v: 'hygiena', label: 'Hygiena / vôňa' },
                { v: 'odsudenie', label: 'Strach z odsúdenia' },
                { v: 'nic', label: g('Nič – som otvorený všetkému', 'Nič – som otvorená všetkému') },
              ]
            : [
                { v: 'ublizim', label: 'Strach, že ti ublížim' },
                { v: 'zodpovednost', label: 'Pocit zodpovednosti' },
                { v: 'trapnost', label: 'Trápnosť / neistota' },
                { v: 'reakcia', label: 'Obava z tvojej reakcie' },
                { v: 'neviem', label: g('Neviem, čo by som mal robiť', 'Neviem, čo by som mala robiť') },
                { v: 'nic', label: g('Nič – som otvorený všetkému', 'Nič – som otvorená všetkému') },
              ],
      },
    ],
  }
}

const ESTE_NIE: Blok = {
  druh: 'skupina',
  id: 'este_nie',
  nadpis: '„Ešte nie" vetva',
  uvod: 'Ak nemáš skúsenosť v pozícii HORE, v pozícii DOLE, alebo žiadnu skúsenosť s face sittingom.',
  podmienka: { ot: 'skusenost', obsahuje: 'ziadna' },
  bloky: [
    fantaziaPostoj('hore'),
    fantaziaPostoj('dole'),
    {
      druh: 'otazka',
      id: 'en_rola',
      typ: 'jeden',
      text: 'Ktorá rola je pre teba predstaviteľnejšia?',
      moznosti: [
        { v: 'hore', label: 'Skôr hore' },
        { v: 'dole', label: 'Skôr dole' },
        { v: 'obe', label: 'Obe' },
        { v: 'neviem', label: 'Zatiaľ neviem' },
      ],
    },
    {
      druh: 'otazka',
      id: 'en_vzrusenie_hore',
      typ: 'jeden',
      text: 'Ako silno ťa samotná predstava vzrušuje? – HORE',
      moznosti: [
        { v: 'velmi', label: 'Veľmi' },
        { v: 'skor', label: 'Skôr áno' },
        { v: 'neutral', label: 'Neutrálne' },
        { v: 'skor_nie', label: 'Skôr nie, ale nie je mi to cudzie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'en_vzrusenie_dole',
      typ: 'jeden',
      text: 'Ako silno ťa samotná predstava vzrušuje? – DOLE',
      moznosti: [
        { v: 'velmi', label: 'Veľmi' },
        { v: 'skor', label: 'Skôr áno' },
        { v: 'neutral', label: 'Neutrálne' },
        { v: 'skor_nie', label: 'Skôr nie, ale nie je mi to cudzie' },
      ],
    },
    ochota('hore'),
    ochota('dole'),
    {
      druh: 'text',
      id: 'en_logika',
      ton: 'info',
      telo:
        '👉 Ak zvolíš „Chcem, aby to ostalo len moja fantázia" alebo „Necítim sa komfortne" u oboch pozícií, modul sa tu ukončí. ' +
        'Partner dostane jasnú hranicu bez odmietnutia teba ako osoby. Ak len u jednej pozície, aktívna zostane tá druhá.',
    },
  ],
}

// ── Spoločné bloky (bez ohľadu na skúsenosť) ──────────────────────────────
const SPOLOCNE: Blok[] = [
  {
    druh: 'skupina',
    id: 'nastavenie',
    nadpis: 'Moje nastavenie',
    bloky: [
      { druh: 'otazka', id: 'nastavenie_podmienky', typ: 'text', text: 'Moje podmienky, aby to bolo príjemné:' },
      { druh: 'otazka', id: 'nastavenie_hranice', typ: 'text', text: 'Moje jasné hranice (čo určite nie):' },
      { druh: 'otazka', id: 'nastavenie_cervena', typ: 'text', text: 'Čo je pre mňa „červená vlajka" (kedy chcem stop / pauzu):' },
    ],
  },
  {
    druh: 'skupina',
    id: 'poznamky',
    nadpis: g('Otvorené poznámky pre partnerku', 'Otvorené poznámky pre partnera'),
    bloky: [
      { druh: 'otazka', id: 'poznamky_vediet', typ: 'text', text: g('Čo chcem, aby partnerka vedela (1–3 vety):', 'Čo chcem, aby partner vedel (1–3 vety):') },
      {
        druh: 'otazka',
        id: 'poznamky_bojim',
        typ: 'text',
        text: g(
          'Čoho sa bojím / čo nechcem (čo by ma úplne odradilo, aj keby to partnerka chcela):',
          'Čoho sa bojím / čo nechcem (čo by ma úplne odradilo, aj keby to partner chcel):',
        ),
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'spol_intenzita',
    nadpis: 'Intenzita a kontrola',
    bloky: [
      { druh: 'otazka', id: 'spol_tlak', typ: 'jeden', text: 'Tlak', moznosti: TLAK_MOZNOSTI },
      { druh: 'otazka', id: 'spol_tempo', typ: 'jeden', text: 'Tempo', moznosti: TEMPO_MOZNOSTI },
      { druh: 'otazka', id: 'spol_kontrola', typ: 'jeden', text: 'Kontrola', moznosti: KONTROLA_MOZNOSTI },
      {
        druh: 'otazka',
        id: 'spol_worship',
        typ: 'viac',
        inePovolene: true,
        text: '„Worship / service" – detail. Ktoré z týchto vecí ťa lákajú?',
        moznosti: [
          { v: 'prosby', label: 'Prosby' },
          { v: 'prikazy', label: 'Príkazy' },
          { v: 'ponizovanie', label: 'Ponižovanie' },
        ],
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'spol_komunikacia_sk',
    nadpis: 'Komunikácia',
    bloky: [
      {
        druh: 'otazka',
        id: 'spol_komunikacia',
        typ: 'jeden',
        text: 'Spôsob komunikácie',
        moznosti: [
          { v: 'ticha', label: 'Tichá a neverbálna' },
          { v: 'zvuky', label: 'Zvuky a dych' },
          { v: 'slovne', label: 'Slovné pokyny' },
          { v: 'pochvaly', label: 'Pochvaly a povzbudenie' },
        ],
      },
      {
        druh: 'otazka',
        id: 'spol_spatna',
        typ: 'viac',
        text: 'Spätná väzba',
        moznosti: [
          { v: 'priebezna', label: 'Chcem priebežnú spätnú väzbu' },
          { v: 'jemne', label: 'Jemné usmernenia priebežne' },
          { v: 'potvrdenia', label: 'Potvrdenia v kľúčových momentoch (zmena tempa / polohy)' },
          { v: 'kratke', label: 'Krátke dohodnuté slová' },
          { v: 'poakte', label: 'Stačí mi spätná väzba po akte' },
          { v: 'signaly', label: 'Dohodneme si signály' },
        ],
      },
    ],
  },
]

export const FACE_SITTING: TemaObsah = {
  slug: 'oral-kombinacie-polohy/face-sitting',
  nadpis: 'Face Sitting',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'co_je_to',
      nadpis: 'Čo je to?',
      telo:
        'Face sitting (tiež známe ako „queening" pre ženy alebo „kinging" pre mužov) je intímna poloha, pri ktorej si jeden ' +
        'z partnerov sadne alebo kľakne nad tvár druhého, pričom dochádza k orálnej stimulácii genitálií alebo análnej oblasti. ' +
        'Táto praktika môže mať mnoho podôb – od jemnej a zmyselnej až po dominantnú a intenzívnu, v závislosti od dohody a preferencií oboch partnerov.',
    },
    {
      druh: 'text',
      id: 'intimny_pohlad',
      nadpis: 'Intímny pohľad',
      ton: 'citat',
      telo: g(
        'Predstav si intimitu, kde sa nemusíš na nič hrať. Kde sa jeden z vás vedome odovzdá tomu druhému s absolútnou dôverou.\n\n' +
          'Face sitting nie je len „poloha z filmu". Je to rituál uctievania. Je to chvíľa, keď sa svet vonku rozplynie a zostane len vôňa partnerky, jej teplo a rytmus dychu.\n\n' +
          'Pre niektorých mužov je to o pocite moci a kontroly (kinging), pre iných o hlbokom uvoľnení, odovzdaní sa a pocite, že slúžim jej rozkoši.',
        'Predstav si intimitu, kde sa nemusíš na nič hrať. Kde sa jeden z vás odovzdá do rúk (alebo lona) toho druhého s absolútnou dôverou.\n\n' +
          'Face sitting nie je len „poloha z filmu". Je to rituál uctievania. Je to chvíľa, keď sa svet vonku rozplynie a zostane len vôňa partnera, jeho teplo a rytmus dychu.\n\n' +
          'Pre niekoho je to o pocite moci a kráľovskej hodnoty (queening), pre iného o hlbokom uvoľnení a pocite, že „slúžim" kráse milovanej osoby.',
      ),
    },
    {
      druh: 'text',
      id: 'master_dokument',
      ton: 'info',
      telo:
        '→ Master dokument: „Facesitting – Sprievodca pre páry" — hĺbkový sprievodca psychológiou, technickými variáciami a bezpečnosťou. Otvor si ho, ak chcete vedieť viac.',
    },
  ],
  telo: [
    {
      druh: 'otazka',
      id: 'skusenost',
      typ: 'viac',
      text: 'Máš skúsenosť s face sittingom?',
      napoveda: 'Môžeš označiť viac možností.',
      moznosti: [
        { v: 'dole', label: 'Áno, v pozícii DOLE' },
        { v: 'hore', label: 'Áno, v pozícii HORE' },
        { v: 'oboje', label: 'Áno, v oboch pozíciách' },
        { v: 'ziadna', label: 'Nie, nemám žiadnu skúsenosť' },
      ],
    },
    DOLE,
    HORE,
    ESTE_NIE,
    ...SPOLOCNE,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'ukoncenie',
      nadpis: 'Ukončenie modulu',
      telo:
        'Výsledkom je informácia pre partnera: či máš k tejto téme fantázie a či ju chceš preniesť do reality. ' +
        'Už samotný fakt, že si tému otvoril/a, znamená zvedavosť — preto tu chýba odpoveď „nie", čo je logické.',
    },
    {
      druh: 'text',
      id: 'preklik_sprievodca',
      ton: 'info',
      nadpis: 'Facesitting: Komplexný sprievodca umením odovzdanosti a rituálom uctievania',
      telo:
        'Preklik – ak chcete vedieť viac. Časť slúži na hĺbkové pochopenie psychologickej a fyzickej podstaty facesittingu, búranie mýtov a normalizáciu pocitov.',
    },
  ],
}
