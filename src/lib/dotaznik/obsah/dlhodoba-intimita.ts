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
    {
      druh: 'text', id: 'bliz_info',
      telo: 'Prepojenie na emocionálnej úrovni je základom silného vzťahu. Spoločné zdieľanie myšlienok, pocitov a túžob pomáha lepšie porozumieť partnerovi a vytvára priestor pre otvorenosť.',
    },
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
    {
      druh: 'text', id: 'akt_info',
      telo: 'Naplánovanie spoločných aktivít alebo experimentov môže priniesť nové podnety a zamedziť rutine.',
    },
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
        { v: 'varenie_flirt', label: 'Spoločná príprava večere s hravým, flirtujúcim podtónom' },
        { v: 'kupel_sviecky', label: 'Kúpeľ s bublinkami, olejmi a sviečkami' },
        { v: 'eroticke_listy', label: 'Písanie erotických listov alebo lístočkov' },
        { v: 'tanec', label: 'Spoločný pomalý tanec' },
        { v: 'prechadzka_dotyky', label: 'Prechádzka spojená s dotykmi a bozkami na verejnosti' },
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

// ── Spoločné vzdelávanie o intimite ─────────────────────────────
const VZDELAVANIE: Blok = {
  druh: 'skupina', id: 'vzdelavanie', nadpis: 'Spoločné vzdelávanie o intimite',
  bloky: [
    {
      druh: 'otazka', id: 'vzd_zaujem', typ: 'jeden',
      text: 'Záujem o spoločné vzdelávanie sa o intímnych témach (nie erotický obsah, ale poznatky/zručnosti)',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) sa učím nové veci' },
        { v: 'mozno', label: 'Možno, ak by to bolo zábavné a nenútené' },
        { v: 'nie', label: 'Nie, preferujem vlastné experimentovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'vzd_forma', typ: 'viac',
      text: 'Aké formy vzdelávania by ma lákali',
      moznosti: [
        { v: 'knihy', label: 'Knihy alebo články' },
        { v: 'videa', label: 'Videá alebo online kurzy' },
        { v: 'workshop', label: 'Workshop alebo seminár (osobne)' },
      ],
    },
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
  "druh": "text",
  "id": "ini_uvod",
  "nadpis": "Kto začína a akým spôsobom",
  "telo": "Iniciatíva môže byť jemná, spontánna, intenzívna alebo hravá. Niekto rád vedie, iný rád prijíma pozornosť a niekto roly strieda. Rozlíš, čo chceš prijímať, čo chceš sám ponúkať a ako si chcete iniciatívu rozdeliť."
},
    {
      druh: 'text', id: 'ini_formy_popis',
      telo: 'Iniciatíva môže mať mnoho podôb — od romantických gest cez hravé flirtovanie až po intenzívne prejavy túžby. Každý partner má svoje preferencie, ktoré dokážu podnietiť vášeň a blízkosť.',
    },
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
  "druh": "otazka",
  "id": "ini_formy_prijimam",
  "typ": "viac",
  "text": "Aké formy iniciatívy chcem prijímať od druhého?",
  "moznosti": [
    {
      "v": "jemna",
      "label": "Jemná a zmyselná — romantické gestá, pomalé či nežné dotyky, masáž a očný kontakt"
    },
    {
      "v": "spontanna",
      "label": "Spontánna a prekvapivá — nečakané objatie, náhle dotyky a vášnivý bozk"
    },
    {
      "v": "intenzivna",
      "label": "Intenzívna — pevnejšie uchopenie, jasné signály, naliehavosť alebo rýchle rozopnutie oblečenia po vzájomnej dohode"
    },
    {
      "v": "hrava",
      "label": "Hravá a zvodná — flirtovanie, tance, pohyby a hry"
    },
    {
      "v": "kreativna",
      "label": "Kreatívna — tematické role, scenáre, prekvapenia a nové prostredie"
    }
  ],
  "inePovolene": true
},
    {
  "druh": "otazka",
  "id": "ini_formy_poskytujem",
  "typ": "viac",
  "text": "Aké formy iniciatívy chcem poskytovať?",
  "moznosti": [
    {
      "v": "jemna",
      "label": "Jemná a pozorná — hladenie, masáž, nežné bozky a budovanie atmosféry"
    },
    {
      "v": "spontanna",
      "label": "Rýchla a spontánna — nečakané bozky, dotyky a momenty vášne"
    },
    {
      "v": "intenzivna",
      "label": "Intenzívna a dominantná — pevné uchopenie a výrazné vedenie po dohode; bez nátlaku"
    },
    {
      "v": "hrava",
      "label": "Hravá a zvedavá — provokujúce pohľady, tance, nové nápady a návrhy"
    },
    {
      "v": "podla_nalady",
      "label": "Kombinácia podľa nálady"
    }
  ],
  "inePovolene": true
},
    {
      druh: 'otazka', id: 'ini_kedy', typ: 'jeden',
      text: 'Kedy je pre mňa ideálne začať iniciatívu',
      moznosti: [
        { v: 'vecer', label: 'Večer, keď je pokojná atmosféra' },
        { v: 'rano', label: 'Ráno, hneď po prebudení' },
        { v: 'kedykolvek', label: 'Kedykoľvek počas dňa — podľa nálady' },
        { v: 'specialne', label: 'V špeciálnych situáciách (oslavy, výlety)' },
      ],
    },
    {
  "druh": "otazka",
  "id": "ini_kedy_ine",
  "typ": "text",
  "text": "Čas iniciatívy — vlastná odpoveď alebo doplnenie (voliteľné):"
},
    {
      druh: 'otazka', id: 'ini_faza', typ: 'jeden',
      text: 'V ktorej chvíli zbližovania najradšej preberám iniciatívu?',
      napoveda: 'Ide o priebeh zbližovania, nie o čas dňa. Pozvanie môže druhý prijať aj odmietnuť.',
      moznosti: [
        { v: 'zaciatok', label: 'Hneď na začiatku — vyhovuje mi urobiť prvý krok' },
        { v: 'priebeh', label: 'V priebehu, keď cítim rastúcu túžbu' },
        { v: 'podla_chvile', label: 'V rôznych chvíľach, podľa situácie' },
        { v: 'cakam_signal', label: 'Najprv čakám na signál záujmu druhého' },
        { v: 'nepreberam', label: 'Iniciatívu radšej nepreberám' },
      ],
    },
    {
  "druh": "otazka",
  "id": "ini_faza_ine",
  "typ": "text",
  "text": "Chvíľa preberania iniciatívy — vlastná odpoveď alebo doplnenie (voliteľné):"
},
    {
      druh: 'otazka', id: 'ini_situacie', typ: 'viac',
      text: 'Ktoré situácie ma najviac naladia na iniciatívu (inšpirácia, môžeš vybrať viac)',
      moznosti: [
        { v: 'bozk_bez_varovania', label: 'Partner ma vášnivo pobozká bez varovania' },
        { v: 'pevne_objatie', label: 'Partner ma pevne objíme a vezme do náručia' },
        { v: 'dotyky_pri_cinnosti', label: 'Partner začne jemné dotyky počas bežných činností (varenie, upratovanie, film)' },
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
      druh: 'text', id: 'ini_dynamika_popis', nadpis: 'Dynamika iniciatívy',
      telo: 'Každý má svoj spôsob, ako prejavuje a očakáva sexuálnu iniciatívu. Niektorí radi vedú, iní sa odovzdajú, niekto preferuje rovnováhu.',
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
        { v: 'pasivna', label: { m: 'Jemná a pasívna (rád čakám na iniciatívu druhého)', z: 'Jemná a pasívna (rada čakám na iniciatívu druhého)' } },
        { v: 'aktivna', label: { m: 'Aktívna (rád vediem a signalizujem túžbu)', z: 'Aktívna (rada vediem a signalizujem túžbu)' } },
        { v: 'dynamicka', label: 'Dynamická rovnováha (mením podľa nálady)' },
      ],
    },
    {
      druh: 'text', id: 'ini_tipy', nadpis: 'Tipy na vyskúšanie', ton: 'info',
      telo:
        "Deň spontánnosti: dohodnite si deň otvorený nečakanému pozvaniu, napríklad ráno v kuchyni alebo večer pri filme. Nie je to povinnosť mať sex.\n\nJemný večer: začnite nežnou masážou a podľa spoločnej chuti prejdite k intenzívnejším dotykom a objatiam.\n\nVedený večer: vopred sa dohodnite, že jeden bude viesť a druhý prijímať pozornosť, napríklad s jasnými pokynmi k dotykom alebo slovám. Dohodnutá rola nevylučuje odmietnutie ani zmenu názoru.",
    },
  ],
}

// ── Spontánny sex ────────────────────────────────────────────
const SPONTANNY: Blok = {
  druh: 'skupina', id: 'spontanny', nadpis: 'Spontánny sex',
  bloky: [
    {
      druh: 'text', id: 'spo_info',
      telo: "Spontánne chvíle vznikajú z okamihu a môžu priniesť novosť, pocit slobody a osvieženie rutiny. Niekomu vyhovujú, iný potrebuje plánovanie alebo predvídateľnosť. Ani prekvapenie nenahrádza vzájomnú ochotu.",
    },
    {
      druh: 'otazka', id: 'spo_pocit', typ: 'jeden',
      text: 'Ako sa cítim pri spontánnom sexe',
      moznosti: [
  {
    "v": "milujem",
    "label": "Milujem ho — nečakané momenty mi prinášajú vzrušenie a autenticitu"
  },
  {
    "v": "obcas",
    "label": "Občas si ho užijem, ale radšej plánujem"
  },
  {
    "v": "podla_nalady",
    "label": "Občas si ho užijem, záleží na nálade"
  },
  {
    "v": "nie",
    "label": "Necítim sa pri tom komfortne — preferujem predvídateľnosť"
  },
  {
    "v": "planujem",
    "label": "Spontánnosti nie som naklonený/á, dávam prednosť plánovaniu"
  }
],
    },
    {
  "druh": "otazka",
  "id": "spo_pocit_ine",
  "typ": "text",
  "text": "Môj postoj k spontánnosti — vlastná odpoveď alebo doplnenie (voliteľné):"
},
    {
      druh: 'otazka', id: 'spo_situacie', typ: 'viac',
      text: 'Ktoré situácie spontánneho sexu ma vzrušujú',
      moznosti: [
        { v: 'noc', label: 'V noci po zobudení' },
        { v: 'mimo_spalne', label: 'Mimo spálne (sprcha, gauč, podlaha)' },
        { v: 'verejne', label: 'Na verejných miestach (les, pláž, auto) — diskrétne' },
        { v: 'bezne_aktivity', label: 'Počas bežných aktivít (varenie, umývanie riadu)' },
      ], napoveda: "V noci až po prebudení a so súhlasom oboch. Mimo domova iba v súkromí, bez zapájania nechcených svedkov."},
  ],
}

// ── Fantázie → realita ──────────────────────────────────────
const FANTAZIE: Blok = {
  druh: 'skupina', id: 'fantazie', nadpis: 'Fantázie → realita',
  bloky: [
    {
      druh: 'text', id: 'fan_info',
      telo: 'Fantázie sú mostom medzi túžbami a realitou. Vytvorenie bezpečného priestoru na ich zdieľanie zahŕňa dôveru, rešpekt a ochotu počúvať partnerove túžby bez posudzovania.',
    },
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
      druh: 'text', id: 'prg_info',
      telo: 'Aj každodenné aktivity môžu byť príležitosťou na posilnenie intimity — spoločné varenie, večerné prechádzky alebo sledovanie filmov môžu pomôcť udržať vášeň vo vzťahu.',
    },
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
    VZDELAVANIE,
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
