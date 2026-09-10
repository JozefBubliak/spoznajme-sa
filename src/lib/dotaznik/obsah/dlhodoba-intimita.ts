import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Dlhodobá intimita vo vzťahu — modul A1 „Mentálna príprava a túžba".
// Zdroj: „08_Dlhodoba_intimita_vo_vztahu". Jemná, tier-1 téma: emocionálna
// blízkosť, antirutina, mikro-rituály, komunikácia o túžbach, prostredie,
// senzorika bez tlaku na výkon, novota, pomôcky (soft), iniciatíva,
// spontánnosť, fantázie→realita, program na mieru, hranice.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'robime', label: 'Už na tom pracujeme a som spokojný/á' },
  { v: 'tuzim', label: 'Túžim, aby sme na tom pracovali viac' },
  { v: 'ak_chce', label: 'Rád/rada to urobím, ak po tom druhý túži' },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa na to pripravený/á' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, inePovolene: true,
})
const FREKV: Moznost[] = [
  { v: 'pravidelne', label: 'Pravidelne (napr. týždenne / mesačne)' },
  { v: 'obcas', label: 'Občas, keď je správna nálada' },
  { v: 'vynimocne', label: 'Len pri výnimočných príležitostiach' },
]

// ── Blízkosť a antirutina ──────────────────────────────────────────────
const BLIZKOST: Blok = {
  druh: 'skupina', id: 'blizkost', nadpis: 'Emocionálna blízkosť a antirutina',
  bloky: [
    p('bliz_zamerat', 'Chceme sa viac zamerať na prehlbovanie emocionálnej blízkosti'),
    p('bliz_antirutina', 'Chceme prelomiť monotónnosť skúšaním niečoho nového'),
    p('bliz_hra_otazok', 'Skúmať túžby spolu pomocou otázok alebo hier'),
    p('bliz_dovera', 'Cítim, že si môžeme dôverovať pri rozprávaní o fantáziách'),
  ],
}

// ── Mikro-rituály počas dňa ───────────────────────────────────────────
const RITUALY: Blok = {
  druh: 'skupina', id: 'rituy', nadpis: 'Každodenné mikro-rituály (mimo postele)',
  bloky: [
    p('rit_pridat', 'Chcem, aby sme pridali viac každodenných gest lásky'),
    {
      druh: 'otazka', id: 'rit_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré gestá by som chcel(a)',
      moznosti: [
        { v: 'objatie', label: 'Objatie „na 6 sekúnd"' },
        { v: 'ruky', label: 'Držanie rúk počas prechádzky' },
        { v: 'masaz', label: 'Jemná masáž pred spaním' },
        { v: 'kompliment', label: 'Kompliment („páči sa mi, ako dnes vyzeráš")' },
        { v: 'checkin', label: '„Mini check-in" — 1 veta o nálade / túžbe' },
        { v: 'dotyk_bez_ciela', label: 'Dotyk bez cieľa' },
      ],
    },
  ],
}

// ── Týždenné / špeciálne aktivity ───────────────────────────────────
const AKTIVITY: Blok = {
  druh: 'skupina', id: 'aktivity', nadpis: 'Týždenné a špeciálne aktivity',
  bloky: [
    p('akt_zaviest', 'Chcem zaviesť pravidelné týždenné alebo sezónne aktivity na posilnenie spojenia'),
    {
      druh: 'otazka', id: 'akt_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré aktivity ma lákajú',
      moznosti: [
        { v: 'rande', label: 'Rande večery (spoločná večera, wellness)' },
        { v: 'tematicky', label: 'Tematický večer s roleplay' },
        { v: 'unik', label: 'Víkendový únik (chata, hotel)' },
        { v: 'rande_naslepo', label: '„Rande naslepo" doma — jeden pripraví scénu, druhý sa nechá prekvapiť' },
        { v: 'masaz_techniky', label: 'Spoločné učenie sa masážnych techník' },
      ],
    },
    { druh: 'otazka', id: 'akt_frekvencia', typ: 'jeden', text: 'Ako často by sme tieto momenty vytvárali', moznosti: FREKV },
  ],
}

// ── Prostredie a atmosféra ─────────────────────────────────────────
const PROSTREDIE: Blok = {
  druh: 'skupina', id: 'prostredie', nadpis: 'Prostredie a atmosféra',
  bloky: [
    {
      druh: 'otazka', id: 'pro_zmysly', typ: 'viac',
      text: 'Čím chcem vytvárať atmosféru',
      moznosti: [
        { v: 'svetlo', label: 'Tlmené osvetlenie / sviečky' },
        { v: 'hudba', label: 'Playlist / hudba' },
        { v: 'vona', label: 'Vône, aromatika' },
        { v: 'teplota', label: 'Teplota v miestnosti' },
        { v: 'obliecky', label: 'Nové posteľné obliečky' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_zmyslovy_rit', typ: 'viac',
      text: 'Zmyslový rituál — čo ma láka',
      moznosti: [
        { v: 'pierka', label: 'Pierka' },
        { v: 'oleje', label: 'Oleje' },
        { v: 'teplota', label: 'Ľad / teplota' },
        { v: 'paska', label: 'Zaviazané oči' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_miesta', typ: 'viac', inePovolene: true,
      text: 'Ktoré prostredia ma lákajú',
      moznosti: [
        { v: 'spalna', label: 'Spálňa' },
        { v: 'kupelna', label: 'Kúpeľňa / sprcha' },
        { v: 'gauc', label: 'Gauč' },
        { v: 'hotel', label: 'Hotel / prenajatý apartmán' },
        { v: 'priroda', label: 'Príroda (les, pláž) — legálne a diskrétne' },
        { v: 'nova_izba', label: '„Nová" izba doma' },
      ],
    },
    { druh: 'otazka', id: 'pro_frekvencia', typ: 'jeden', text: 'Ako často meniť prostredie', moznosti: FREKV },
  ],
}

// ── Senzorika bez tlaku na výkon ──────────────────────────────────
const SENZORIKA: Blok = {
  druh: 'skupina', id: 'senzorika', nadpis: 'Senzorika a hry bez tlaku na výkon',
  bloky: [
    p('sen_teplota_textury', 'Hry s teplotou a textúrami (ľad / teplé oleje, satén / hodváb / koža)'),
    {
      druh: 'otazka', id: 'sen_zony', typ: 'viac',
      text: 'Kde na tele je to v poriadku',
      moznosti: [
        { v: 'krk', label: 'Krk / pery' },
        { v: 'hrudnik', label: 'Hrudník' },
        { v: 'brucho', label: 'Brucho' },
        { v: 'stehna', label: 'Stehná' },
        { v: 'chrbat', label: 'Chrbát' },
        { v: 'nie_genital', label: 'NIE genitálie' },
      ],
    },
    p('sen_deprivacia', 'Zmyslová deprivácia jemne (páska na oči / slúchadlá → zvýrazniť hmat)'),
    p('sen_jedlo', 'Hraní s jedlom (čokoláda, ovocie, prenášanie chutí v bozku)'),
    { druh: 'otazka', id: 'sen_jedlo_kde', typ: 'text', text: 'Ktoré chute a miesta na tele sú lákavé:' },
  ],
}

// ── Novota a mikro-dobrodružstvá ────────────────────────────────
const NOVOTA: Blok = {
  druh: 'skupina', id: 'novota', nadpis: 'Novota a mikro-dobrodružstvá',
  bloky: [
    p('nov_rande_naslepo', '„Rande naslepo" — jeden pripraví scénu, druhý sa nechá prekvapiť'),
    {
      druh: 'otazka', id: 'nov_light', typ: 'viac',
      text: '„Light" dobrodružstvá počas dňa',
      moznosti: [
        { v: 'sprava', label: 'Vzrušujúca správa / hlasovka' },
        { v: 'dotyk', label: 'Tajný dotyk na verejnosti' },
        { v: 'ukol', label: 'Malý úkol / výzva' },
        { v: 'mostik', label: 'Premostiť to do večernej intimity' },
      ],
    },
    p('nov_polohy', 'Vyskúšať nové polohy alebo techniky'),
  ],
}

// ── Pomôcky pre pár (soft set) ─────────────────────────────────
const POMOCKY: Blok = {
  druh: 'skupina', id: 'pomocky', nadpis: 'Pomôcky pre pár (soft set)',
  bloky: [
    p('pom_experimentovat', 'Chceme experimentovať so zmyslami alebo pomôckami'),
    {
      druh: 'otazka', id: 'pom_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomôcky by sme skúsili — áno / možno',
      moznosti: [
        { v: 'blindfold', label: 'Páska na oči' },
        { v: 'mini_vibr', label: 'Mini vibrátor' },
        { v: 'svieca', label: 'Masážna sviečka' },
        { v: 'lubrikant', label: 'Lubrikant' },
        { v: 'kruzok', label: 'Erekčný krúžok' },
      ],
    },
    {
      druh: 'otazka', id: 'pom_kto_ovlada', typ: 'jeden',
      text: 'Kto ovláda pomôcku',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
  ],
}

// ── Sexuálna iniciatíva ───────────────────────────────────────
const INICIATIVA: Blok = {
  druh: 'skupina', id: 'iniciativa', nadpis: 'Sexuálna iniciatíva',
  bloky: [
    {
      druh: 'otazka', id: 'ini_formy', typ: 'viac', inePovolene: true,
      text: 'Aké formy iniciatívy ma najviac vzrušujú',
      moznosti: [
        { v: 'spontanna', label: 'Spontánna (nečakané momenty vášne)' },
        { v: 'jemna', label: 'Jemná a zmyselná (romantické gestá, pomalé dotyky)' },
        { v: 'intenzivna', label: 'Intenzívna (silné gestá, naliehavosť, vášnivé bozky)' },
        { v: 'hrava', label: 'Hravá (flirtovanie, zvodné pohyby, tance)' },
        { v: 'kreativna', label: 'Kreatívna (prekvapenia, nové prostredie, tematické role)' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_gesta', typ: 'viac',
      text: 'Aké gestá preferujem pri iniciatíve',
      moznosti: [
        { v: 'dotyky', label: 'Jemné dotyky a masáž na začiatku predohry' },
        { v: 'bozky', label: 'Zmyselné a dlhé bozky' },
        { v: 'atmosfera', label: 'Prekvapenie romantickou atmosférou (sviečky, hudba, kvety)' },
        { v: 'drsnejsie', label: 'Drsnejšie gestá (pevné objatie, ťahanie za vlasy, uchopenie)' },
        { v: 'rozhovor', label: 'Priamy rozhovor alebo komplimenty so sexuálnym podtónom' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_dynamika', typ: 'jeden',
      text: 'Ako vnímam dynamiku iniciatívy',
      moznosti: [
        { v: 'iniciujem', label: 'Rád/rada iniciujem (milujem pocit, že vediem)' },
        { v: 'od_partnera', label: 'Preferujem, keď vychádza od partnera (užívam si byť zvádzaný/á)' },
        { v: 'rovnovaha', label: 'Uprednostňujem rovnováhu — striedať sa' },
        { v: 'obom', label: 'Otvorený/á obom (podľa nálady a situácie)' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_aktivita', typ: 'jeden',
      text: 'Akú úroveň aktivity preferujem',
      moznosti: [
        { v: 'pasivna', label: 'Jemná a pasívna (rada čakám, kým partner začne)' },
        { v: 'aktivna', label: 'Aktívna (rada vediem a signalizujem túžbu)' },
        { v: 'dynamicka', label: 'Dynamická rovnováha (mením podľa nálady)' },
      ],
    },
  ],
}

// ── Spontánny sex ────────────────────────────────────────────
const SPONTANNY: Blok = {
  druh: 'skupina', id: 'spontanny', nadpis: 'Spontánny sex',
  bloky: [
    {
      druh: 'otazka', id: 'spo_pocit', typ: 'jeden',
      text: 'Ako sa cítim pri spontánnom sexe',
      moznosti: [
        { v: 'milujem', label: 'Milujem ho — nečakané momenty sú pre mňa veľmi vzrušujúce' },
        { v: 'obcas', label: 'Občas si ho užijem, ale radšej plánujem' },
        { v: 'nie', label: 'Necítim sa pri tom komfortne — preferujem predvídateľnosť' },
      ],
    },
    {
      druh: 'otazka', id: 'spo_situacie', typ: 'viac',
      text: 'Ktoré situácie spontánneho sexu ma vzrušujú',
      moznosti: [
        { v: 'noc', label: 'V noci po zobudení' },
        { v: 'mimo_spalne', label: 'Mimo spálne (sprcha, gauč, podlaha)' },
        { v: 'verejne', label: 'Na verejných miestach (les, pláž, auto) — diskrétne' },
        { v: 'bezne_aktivity', label: 'Počas bežných aktivít (varenie, umývanie riadu)' },
      ],
    },
  ],
}

// ── Fantázie → realita ──────────────────────────────────────
const FANTAZIE: Blok = {
  druh: 'skupina', id: 'fantazie', nadpis: 'Fantázie → realita',
  bloky: [
    {
      druh: 'otazka', id: 'fan_zdielam', typ: 'jeden',
      text: 'Ako často zdieľam s partnerom svoje fantázie',
      moznosti: [
        { v: 'otvorene', label: 'Otvorene o nich hovorím' },
        { v: 'obcas', label: 'Občas, ak sa cítim komfortne' },
        { v: 'nie', label: 'Radšej si ich nechávam pre seba' },
      ],
    },
    {
      druh: 'otazka', id: 'fan_prenos', typ: 'jeden',
      text: 'Ako by som rád(a) prenášal(a) fantázie do reality',
      moznosti: [
        { v: 'planovanie', label: 'Cez spoločnú diskusiu a plánovanie' },
        { v: 'spontanne', label: 'Spontánnym experimentovaním počas intimity' },
        { v: 'kombinacia', label: 'Kombináciou oboch prístupov' },
      ],
    },
    {
      druh: 'otazka', id: 'fan_prve', typ: 'viac', inePovolene: true,
      text: 'Čo by som chcel(a) uskutočniť najskôr',
      moznosti: [
        { v: 'roleplay', label: 'Roleplay alebo tematické scénky' },
        { v: 'voda', label: 'Intímne hry s vodou (sprcha, vaňa)' },
        { v: 'verejne', label: 'Experimentovanie na verejných miestach (diskrétne)' },
        { v: 'polohy', label: 'Nové polohy a techniky' },
      ],
    },
    {
      druh: 'otazka', id: 'fan_zaciatok', typ: 'jeden',
      text: 'Ako by som začal(a) s realizáciou',
      moznosti: [
        { v: 'male_kroky', label: 'Malými krokmi a postupným budovaním dôvery' },
        { v: 'spontanne', label: 'Spontánne, podľa nálady' },
        { v: 'obaja_pripraveni', label: 'Len ak sa obaja cítime úplne pripravení' },
      ],
    },
  ],
}

// ── Vášeň cez rutinu + program na mieru ────────────────────
const PROGRAM: Blok = {
  druh: 'skupina', id: 'program', nadpis: 'Vášeň cez rutinu a „program na mieru"',
  bloky: [
    {
      druh: 'otazka', id: 'prg_rutiny', typ: 'viac',
      text: 'Ktoré rutinné aktivity by sme premenili na intímne momenty',
      moznosti: [
        { v: 'varenie', label: 'Spoločné varenie alebo stolovanie' },
        { v: 'film', label: 'Sledovanie erotických / porno filmov' },
        { v: 'prechadzky', label: 'Večerné prechádzky alebo kúpeľ' },
        { v: 'hobby', label: 'Spoločné hobby' },
      ],
    },
    { druh: 'otazka', id: 'prg_frekvencia', typ: 'jeden', text: 'Ako často by sme tieto momenty vytvárali', moznosti: FREKV },
    p('prg_tyzdenny', 'Týždenný mini-plán: 1× rituál blízkosti, 1× hravý experiment, 1× debrief'),
    p('prg_mesacna_novota', 'Mesačná novota: nové prostredie / poloha / „scéna" podľa chuti'),
    { druh: 'otazka', id: 'prg_mimo_sexu', typ: 'text', text: 'Ktoré nesexuálne chvíle vieme posilniť (dotyk bez cieľa, jemné rituály):' },
  ],
}

// ── Hranice a psychická bezpečnosť ───────────────────────
const HRANICE: Blok = {
  druh: 'skupina', id: 'hranice', nadpis: 'Hranice a psychická bezpečnosť',
  bloky: [
    p('hr_zvedavost', 'Zodpovedná zvedavosť — prekonávať zábrany s dôverou a signálmi'),
    { druh: 'otazka', id: 'hr_ano', typ: 'text', text: 'ÁNO — čo chcem:' },
    { druh: 'otazka', id: 'hr_mozno', typ: 'text', text: 'MOŽNO — za akých podmienok:' },
    { druh: 'otazka', id: 'hr_nikdy', typ: 'text', text: 'NIKDY — tvrdé limity:' },
    { druh: 'otazka', id: 'hr_debrief', typ: 'text', text: 'Náš debrief „2+2" (2 veci super, 2 upraviť) — ako a kedy:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const DLHODOBA_INTIMITA: TemaObsah = {
  slug: 'mentalna-priprava-tuzba/mentalna-priprava-tuzba',
  nadpis: 'Dlhodobá intimita vo vzťahu',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Čo je dlhodobá intimita',
      telo:
        'Viac než len fyzický dotyk — spôsob, ako sa cítite spojení, emocionálne prepojení a bezpeční. ' +
        '„Cítime sa videní a počutí." Oplatí sa pestovať blízkosť aj mimo samotného sexu.',
    },
    {
      druh: 'text', id: 'antirutina', nadpis: 'Antirutinné princípy', ton: 'info',
      telo:
        'Malé zmeny, nové zážitky, striedanie prostredí. Cieľ je zabrániť „autopilotu" a vracať pocit novoty. ' +
        'Balans medzi spontánnosťou a plánovaním; pravidelná komunikácia o potrebách a túžbach.',
    },
  ],
  telo: [
    BLIZKOST,
    RITUALY,
    AKTIVITY,
    PROSTREDIE,
    SENZORIKA,
    NOVOTA,
    POMOCKY,
    INICIATIVA,
    SPONTANNY,
    FANTAZIE,
    PROGRAM,
    HRANICE,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver', nadpis: 'Cesta k trvalej intimite', ton: 'info',
      telo:
        'Dlhodobá intimita vyžaduje odhodlanie, otvorenosť a ochotu skúšať nové veci. ' +
        'Každý krok môže viesť k hlbšiemu spojeniu. Výsledky zohľadnia len zhody medzi tebou a partnerom.',
    },
  ],
}
