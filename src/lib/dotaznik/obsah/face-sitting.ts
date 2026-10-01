import type { TemaObsah, Blok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Face-sitting — obsah 1:1 podľa „Face sitting M./ž." (spracované podklady).
// Mužská (m) a ženská (z) verzia sú zrkadlové: rovnaké id otázok aj hodnoty,
// líši sa len oslovenie a rod, aby pri Double-Blind sadli odpovede proti sebe.
// Rola: DOLE = poskytuješ orál (tvár pod lonom partnera alebo partnerky).
//        HORE = prijímaš orál (sedíš na tvári partnera alebo partnerky).
// Rešerš doplnená 2026-09-30 (XLSM-009, použitá aj pri XLSM-010/011):
// - https://pubmed.ncbi.nlm.nih.gov/27235283/ — BDSM ako potešenie, relaxácia,
//   sebavyjadrenie a dobrovoľne rozvíjaná zručnosť, nie automaticky patológia.
// - https://pubmed.ncbi.nlm.nih.gov/30956128/ — systematický prehľad motívov BDSM.
// - https://pubmed.ncbi.nlm.nih.gov/32486920/ — rozmanité motívy submisie,
//   odovzdania a intenzívneho telesného zážitku.
// - https://pubmed.ncbi.nlm.nih.gov/35247866/ — sexuálny obraz tela ovplyvňuje
//   pôžitok aj pocit vlastnej prijateľnosti.
// - https://www.reddit.com/r/PlusSize/comments/1iouk21/ — skúsenosti s neistotou
//   z váhy, uhlom, reverse polohou a rozdielom medzi obavou a pôžitkom.
// - https://www.reddit.com/r/sexadvise/comments/1fezbsu/ — komunitné otázky o
//   pohybe, predstave polohy a strachu „urobiť to zle“.
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
  { v: 'neprijemne', label: 'Bolo mi to nepríjemné – nechcem to opakovať' },
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
  { v: 'telesna', label: 'Čisto telesnú — intenzívny orál bez mocenskej roly' },
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
  { v: 'navaly', label: 'Návaly intenzity s krátkymi pauzami' },
]
const KONTROLA_MOZNOSTI = [
  { v: 'vediem', label: g('Rád vediem', 'Rada vediem') },
  { v: 'viest', label: g('Rád sa nechám viesť', 'Rada sa nechám viesť') },
  { v: 'striedame', label: 'Striedame sa' },
]

// ── Rozmer tlaku a dychu ─────────────────────────────────────────────────────
const SMOTHER_UVOD: Blok = {
  druh: 'text',
  id: 'smother_uvod',
  nadpis: 'Rozmer tlaku a dychu – „Smother / breath" dimenzia',
  ton: 'info',
  telo:
    'Pocit váhy, tesnej blízkosti a pohltenia môže byť erotický aj bez záujmu o obmedzenie dychu. ' +
    'Pre niekoho je jadrom iba symbolika dominancie, iného priťahuje intenzívnejšia fantázia. Pomenuj, ktorá vrstva je pre teba skutočne vzrušujúca.',
}

// ── Techniky a polohy ────────────────────────────────────────────────
// Zdroj: xlsm P49154–49200 (Face sitting — otázky pre ženu, muž ako
// prijímateľ, poskytovanie, kombinácie). Doplnené: orál na penis pri
// „kinging", semenníky/hrádza, sanie, vibrátor, masturbácia, reverse.
const TECHNIKY: Blok = {
  druh: 'skupina', id: 'techniky', nadpis: 'Techniky a polohy',
  uvod: 'Face sitting sa dá použiť pri cunnilinguse, felácii aj anilinguse. Tu si pomenuj, čo presne chceš.',
  bloky: [
    {
      druh: 'otazka', id: 'tech_hore_pocit', typ: 'jeden',
      text: 'Ako sa cítim pri prijímaní face sittingu (som hore)',
      moznosti: [
        { v: 'milujem', label: g('Milujem to', 'Milujem to — je to pre mňa veľmi vzrušujúce') },
        { v: 'otvoreny', label: g('Som otvorený, ale nie som si istý komfortom', 'Som otvorená, ale potrebujem viac komfortu') },
        { v: 'nie', label: 'Nie, táto praktika mi nevyhovuje' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_hore_z', typ: 'viac', inePovolene: true,
      podmienka: { pohlavie: 'z' },
      text: 'Aké techniky chcem, keď som hore',
      moznosti: [
        { v: 'lizanie_klitoris', label: 'Intenzívne lízanie klitorisu' },
        { v: 'fukanie', label: 'Jemné fúkanie alebo dýchanie na citlivé miesta' },
        { v: 'oral_prsty_gbod', label: 'Orál + prstovanie (klitoris + G-bod)' },
        { v: 'sanie', label: 'Sanie klitorisu' },
        { v: 'jazyk_dnu', label: 'Jazyk vo vagíne' },
        { v: 'dlhe_tahy', label: 'Dlhé ťahy celým jazykom od vagíny ku klitorisu' },
        { v: 'anilingus', label: 'Anilingus — sadnem si viac dozadu' },
        { v: 'nos_brada', label: 'Rytmické trenie klitorisu o nos alebo bradu partnera' },
        { v: 'vlastne_ruky', label: 'Dotýkam sa pritom svojich pŕs alebo klitorisu' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_hore_m', typ: 'viac', inePovolene: true,
      podmienka: { pohlavie: 'm' },
      text: 'Aké techniky chcem, keď prijímam',
      moznosti: [
        { v: 'anilingus_jemny', label: 'Jemná stimulácia análnej oblasti jazykom' },
        { v: 'oral_prostata', label: 'Orál kombinovaný s masážou prostaty' },
        { v: 'striedanie_bozky', label: 'Striedanie orálnych techník s jemnými bozkami' },
        { v: 'oral_penis', label: 'Orál na penis — kľačím nad jej tvárou' },
        { v: 'semenniky', label: 'Lízanie semenníkov' },
        { v: 'hradza', label: 'Hrádza — jazyk medzi semenníkmi a anusom' },
        { v: 'trenie', label: 'Rytmický pohyb panvy podľa toho, čo mi robí dobre' },
        { v: 'vlastne_ruky', label: 'Dotýkam sa pritom svojho tela alebo penisu' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_hore_poloha_z', typ: 'viac', inePovolene: true,
      podmienka: { pohlavie: 'z' },
      text: 'Ako chcem byť hore',
      moznosti: [
        { v: 'klacanie', label: 'Kľačanie nad tvárou partnera' },
        { v: 'plny_sed', label: 'Sed na tvári — úplné uvoľnenie váhy' },
        { v: 'striedanie', label: 'Striedanie kľačania a sedenia' },
        { v: 'celo_postele', label: 'Držím sa čela postele / steny' },
        { v: 'otocena', label: 'Otočená k jeho nohám — dosiahnem na penis' },
        { v: 'jazdenie', label: 'Sama sa pohybujem, „jazdím" na jeho jazyku' },
        { v: 'bokom', label: 'Sedím bokom — sidesaddle' },
        { v: 'hrana', label: 'Som na hrane postele alebo na stabilnom sedadle' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_hore_poloha_m', typ: 'viac', inePovolene: true,
      podmienka: { pohlavie: 'm' },
      text: 'Aká poloha mi vyhovuje',
      moznosti: [
        { v: 'ona_kontrola', label: 'Partnerka má úplnú kontrolu nad tempom a pohybom' },
        { v: 'chrbat_nohy', label: 'Ležím na chrbte so zdvihnutými nohami' },
        { v: 'kinging', label: 'Kľaknem si nad jej tvár (kinging)' },
        { v: 'na_styroch', label: 'Na štyroch, ona zozadu' },
        { v: 'striedanie', label: 'Striedam rôzne pozície' },
        { v: 'bokom', label: 'Som nad ňou bokom — sidesaddle' },
        { v: 'hrana', label: 'Som na hrane postele alebo na stabilnom sedadle' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_dole_pocit', typ: 'jeden',
      text: 'Ako vnímam poskytovanie face sittingu (som dole)',
      moznosti: [
        { v: 'milujem', label: 'Milujem dávať túto formu potešenia' },
        { v: 'otvoreny', label: g('Som otvorený, ale potrebujem viac skúseností', 'Som otvorená, ale potrebujem viac skúseností') },
        { v: 'nekomfort', label: 'Necítim sa pri tom komfortne' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_dole', typ: 'viac', inePovolene: true,
      text: 'Aké techniky používam, keď som dole',
      moznosti: [
        { v: 'kruzenie_anus', label: 'Jemné krúženie jazykom okolo análneho otvoru' },
        { v: 'striedanie_tempa', label: 'Striedanie tempa — pomalé a intenzívne' },
        { v: 'dotyky_boky', label: 'Orál + jemné dotyky bokov a stehien' },
        { v: 'ruky_zadok', label: 'Držím za zadok a riadim pohyb' },
        { v: 'prsty', label: 'Pridávam prsty' },
        { v: 'nechat_sa', label: 'Nechám sa úplne viesť — len jazyk' },
      ],
    },
    {
      druh: 'otazka', id: 'tech_kombinacie', typ: 'viac', inePovolene: true,
      text: 'Kombinácia face sittingu s inými technikami',
      moznosti: [
        { v: 'masaz', label: 'Orál + masáž' },
        { v: 'nechty', label: 'Striedanie orálu a jemného škrabania nechtami' },
        { v: 'vibrator', label: 'Vibrátor súčasne' },
        { v: 'masturbacia', label: 'Ten dole si pritom masturbuje / je masturbovaný' },
        { v: 'plesnutie', label: 'Plesknutia po zadku' },
        { v: 'slova', label: 'Príkazy, prosby alebo pochvala' },
        { v: 'worship', label: 'Rituál uctievania a „trónová" atmosféra' },
        { v: 'zrkadlo', label: 'Zrkadlo alebo vedomý očný kontakt' },
        { v: 'zmysly', label: 'Tma, hudba alebo zaviazané oči' },
        { v: 'znehybnenie', label: 'Znehybnenie osoby dole ako súčasť mocenskej fantázie' },
        { v: 'edging', label: 'Edging — budovanie viacerých vĺn vzrušenia' },
        { v: 'jednoducha', label: 'Bez kombinácií — jednoduchá stimulácia' },
      ],
    },
    {
      druh: 'text', id: 'tech_myty', nadpis: 'Mýty a tipy', ton: 'info',
      telo: g(
        'Mýtus: „Musím na jej tvári vyzerať dokonale." — Realita: partnerku môže vzrušovať práve tvoja neupravená túžba, pohyb panvy a to, že si vezmeš jej pozornosť pre seba.\n\n' +
          'Mýtus: „Face sitting automaticky znamená hru s dychom." — Realita: mnohých priťahuje poloha, blízkosť, uctievanie či mocenský obraz bez toho, aby bol dych jadrom fantázie.\n\n' +
          'Mýtus: „Ten dole je pasívny." — Realita: jazyk, pery, ruky, zvuky aj aktívne vedenie panvy z neho môžu robiť rovnocenného tvorcu zážitku.\n\n' +
          'Mýtus: „Ak ma láka dominancia alebo služba, musí to určovať náš bežný vzťah." — Realita: sexuálna rola môže byť krátkym priestorom na uvoľnenie, hru a sebavyjadrenie bez zmeny života mimo spálne.',
        'Mýtus: „Musím na jeho tvári vyzerať dokonale." — Realita: partnera môže vzrušovať práve tvoja neupravená túžba, pohyb panvy a to, že si vezmeš jeho pozornosť pre seba.\n\n' +
          'Mýtus: „Face sitting automaticky znamená hru s dychom." — Realita: mnohých priťahuje poloha, blízkosť, uctievanie či mocenský obraz bez toho, aby bol dych jadrom fantázie.\n\n' +
          'Mýtus: „Ten dole je pasívny." — Realita: jazyk, pery, ruky, zvuky aj aktívne vedenie panvy z neho môžu robiť rovnocenného tvorcu zážitku.\n\n' +
          'Mýtus: „Ak ma láka dominancia alebo služba, musí to určovať náš bežný vzťah." — Realita: sexuálna rola môže byť krátkym priestorom na uvoľnenie, hru a sebavyjadrenie bez zmeny života mimo spálne.',
      ),
    },
  ],
}

// ── Blok „Poskytujúca rola (Dole)" ─────────────────────────────────────────
const DOLE: Blok = {
  druh: 'skupina',
  id: 'dole',
  nadpis: 'Poskytujúca rola („Dole")',
  uvod: g(
    'Táto časť je pre teba ako partnera, ktorý poskytuje orálnu stimuláciu. Pomôže ti pomenovať pocity, lákadlá a potreby v tejto pozícii.',
    'Táto časť je pre teba ako partnerku, ktorá poskytuje orálnu stimuláciu. Pomôže ti pomenovať pocity, lákadlá a potreby v tejto pozícii.',
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
        { v: 'zivy_tron', label: g('Byť pre partnerku „živým trónom" alebo nástrojom jej rozkoše', 'Byť pre partnera „živým trónom" alebo nástrojom jeho rozkoše') },
        { v: 'tunel', label: g('Tunelové sústredenie iba na partnerkinu vôňu, chuť a pohyb', 'Tunelové sústredenie iba na partnerovu vôňu, chuť a pohyb') },
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
        { v: 'tlak', label: 'Zmena tlaku alebo rytmu panvy' },
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
        { v: 'vykon', label: 'Tlak na výkon alebo obava, či to robím dobre' },
        { v: 'hanba', label: 'Hanba alebo neistota' },
        { v: 'trapnost', label: 'Pocit trápnosti v nezvyčajnej polohe' },
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
        { v: 'stop', label: g('Možnosť sám určovať dĺžku jednotlivých vĺn', 'Možnosť sama určovať dĺžku jednotlivých vĺn') },
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
        { v: 'uctievanie', label: g('Pocit, že uctievam partnerku a jej potešenie', 'Pocit, že uctievam partnera a jeho potešenie') },
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
    { druh: 'otazka', id: 'dole_hranice', typ: 'text', text: 'Ktoré prvky ma v tejto roli eroticky vypínajú alebo rušia?' },
    {
      druh: 'otazka', id: 'dole_rola', typ: 'jeden',
      text: g('Akú rolu chcem mať ako muž dole', 'Akú rolu chcem mať ako žena dole'),
      moznosti: [
        { v: 'pasivna', label: g('Pasívnu — nechám partnerku viesť pohyb', 'Pasívnu — nechám partnera viesť pohyb') },
        { v: 'aktivna', label: 'Aktívnu — jazykom, rukami a rytmom vediem zážitok ja' },
        { v: 'striedat', label: 'Striedať aktívnu a pasívnu rolu' },
      ],
    },
    { druh: 'otazka', id: 'dole_pocut', typ: 'text', text: g('Čo by som počas tejto polohy najradšej počul od partnerky?', 'Čo by som počas tejto polohy najradšej počula od partnera?') },
    { druh: 'otazka', id: 'dole_nevyslovene', typ: 'text', text: 'O ktorom lákavom prvku sa mi hovorí najťažšie, hoci ma zaujíma?' },
    { druh: 'otazka', id: 'dole_prvykrat', typ: 'text', text: 'Ako by vyzerala moja ideálna prvá alebo nová verzia tejto polohy?' },
    { druh: 'otazka', id: 'dole_fungovalo', typ: 'text', text: g('Čo pri doterajšej skúsenosti fungovalo a čo by som nabudúce zmenil?', 'Čo pri doterajšej skúsenosti fungovalo a čo by som nabudúce zmenila?') },
    { druh: 'otazka', id: 'dole_zhrnutie', typ: 'text', text: 'Jednou vetou: najviac ma na tom berie, keď…' },

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
            { v: 'adrenalin', label: 'Adrenalín z intenzity a mocenského napätia' },
            { v: 'blizkost', label: 'Intenzívny pocit blízkosti a pohltenia' },
            { v: 'subspace', label: 'Zmenený stav vedomia (subspace)' },
          ],
        },
        {
          druh: 'otazka',
          id: 'dole_smother_signal',
          typ: 'viac',
          inePovolene: true,
          text: 'Ako chcem, aby sa počas tejto fantázie menila váha a intenzita?',
          moznosti: [
            { v: 'gesto', label: 'Podľa pohybu mojich rúk alebo bokov' },
            { v: 'vlny', label: 'V krátkych vlnách: priblíženie, tlak, uvoľnenie' },
            { v: 'stabilne', label: 'Stabilná váha bez častých zmien' },
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
        { v: 'prosim', label: g('Keď ma partnerka prosí, aby som pokračoval', 'Keď ma partner prosí, aby som pokračovala') },
        { v: 'poslucha', label: g('Keď partnerka poslúcha moje vedenie', 'Keď partner poslúcha moje vedenie') },
        { v: 'sebavedomy', label: g('Keď je partnerka dole sebavedomá a aktívna', 'Keď je partner dole sebavedomý a aktívny') },
        { v: 'bez_zodpovednosti', label: g('Na chvíľu nemusím niesť zodpovednosť za partnerkino potešenie — iba prijímam', 'Na chvíľu nemusím niesť zodpovednosť za partnerovo potešenie — iba prijímam') },
        { v: 'stredobod', label: g('Som stredobodom partnerkinej úplnej pozornosti', 'Som stredobodom partnerovej úplnej pozornosti') },
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
        { v: 'plnis', label: g('Keď partnerka plní moje pokyny', 'Keď partner plní moje pokyny') },
        { v: 'iniciativa', label: g('Keď partnerka preberá iniciatívu a je aktívna', 'Keď partner preberá iniciatívu a je aktívny') },
        { v: 'uziva', label: g('Keď vidím, že si to partnerka užíva', 'Keď vidím, že si to partner užíva') },
      ],
    },
    { druh: 'otazka', id: 'hore_hranice', typ: 'text', text: 'Ktoré prvky ma v tejto roli eroticky vypínajú alebo rušia?' },
    { druh: 'otazka', id: 'hore_plus_dva', typ: 'text', text: 'Čo by zvýšilo moju chuť na túto polohu približne o dva body z desiatich?' },
    {
      druh: 'otazka', id: 'hore_pocity', typ: 'viac', inePovolene: true,
      text: 'Ktoré tri vnemy chcem cítiť najvýraznejšie', napoveda: 'Vyber najviac tri hlavné vnemy.',
      moznosti: [
        { v: 'tlak', label: 'Tlak' },
        { v: 'pohyb', label: 'Pohyb panvy' },
        { v: 'jazyk', label: 'Jazyk' },
        { v: 'ruky', label: 'Ruky na bokoch, zadku alebo stehnách' },
        { v: 'rytmus', label: 'Stály rytmus' },
        { v: 'pauzy', label: 'Pauzy a návraty' },
      ],
    },
    {
      druh: 'otazka', id: 'hore_vedenie', typ: 'jeden', text: 'Kto má viesť tempo a tlak',
      moznosti: [
        { v: 'ja', label: 'Ja ako osoba hore' },
        { v: 'partner', label: g('Partnerka dole svojím jazykom a rukami', 'Partner dole svojím jazykom a rukami') },
        { v: 'striedame', label: 'Striedame sa počas jednej scény' },
      ],
    },
    { druh: 'otazka', id: 'hore_frazy', typ: 'text', text: 'Ktoré slová alebo frázy ma v tejto polohe okamžite naladia?' },
    { druh: 'otazka', id: 'hore_tabu', typ: 'text', text: 'Čo je pre mňa na tejto polohe najviac tabu — a práve preto vzrušujúce?' },
    { druh: 'otazka', id: 'hore_fungovalo', typ: 'text', text: g('Čo pri doterajšej skúsenosti fungovalo a čo by som nabudúce zmenil?', 'Čo pri doterajšej skúsenosti fungovalo a čo by som nabudúce zmenila?') },
    { druh: 'otazka', id: 'hore_zhrnutie', typ: 'text', text: 'Jednou vetou: najviac ma na tom vzrušuje…' },

    {
      druh: 'skupina',
      id: 'hore_smother',
      nadpis: 'Pre rolu „Hore" (kontrolujúci tlak)',
      bloky: [
        {
          druh: 'text', id: 'hore_smother_uvod', ton: 'info',
          telo: g(
            'V role hore môže byť vzrušujúca samotná symbolika moci, vedomé dávkovanie váhy alebo pocit, že partnerka zostáva úplne sústredená na tvoje potešenie.',
            'V role hore môže byť vzrušujúca samotná symbolika moci, vedomé dávkovanie váhy alebo pocit, že partner zostáva úplne sústredený na tvoje potešenie.',
          ),
        },
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
        { druh: 'otazka', id: 'hore_smother_podmienky', typ: 'text', text: 'Scenár a atmosféra, v ktorých ma táto mocenská vrstva láka:' },
        { druh: 'otazka', id: 'hore_smother_hranice', typ: 'text', text: 'Chcem skôr symbolickú dominanciu, jemný tlak alebo výraznú váhu — prečo?' },
        { druh: 'otazka', id: 'hore_smother_cervena', typ: 'text', text: 'Čo by túto fantáziu pre mňa pokazilo alebo zmenilo na neerotickú?' },
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
          'Fantázia o polohe hore alebo dole môže byť príjemná práve pre svoju intenzitu, tabu alebo mocenskú symboliku. Nemusí presne kopírovať to, čo človeka láka v realite.',
          'Fantázia o polohe hore alebo dole môže byť príjemná práve pre svoju intenzitu, tabu alebo mocenskú symboliku. Nemusí presne kopírovať to, čo človeka láka v realite.',
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
        ton: 'info',
        telo: 'Mýtus: opakujúca sa predstava automaticky prezrádza skrytú potrebu. Realita: fantázia môže spracúvať moc, hanbu, zvedavosť alebo telesnú intenzitu bez toho, aby bola plánom.',
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
                { v: 'nenormalne', label: 'Pocit, že je táto túžba „perverzná" alebo nenormálna' },
                { v: 'vaha_partner', label: g('Obava z partnerkinej váhy alebo intenzity tlaku', 'Obava z partnerovej váhy alebo intenzity tlaku') },
                { v: 'hygiena', label: 'Rozpaky z prirodzenej vône alebo chuti' },
                { v: 'odsudenie', label: 'Strach z odsúdenia' },
                { v: 'nic', label: g('Nič – som otvorený všetkému', 'Nič – som otvorená všetkému') },
              ]
            : [
                { v: 'ublizim', label: 'Strach, že ti ublížim' },
                { v: 'zodpovednost', label: 'Pocit zodpovednosti' },
                { v: 'trapnost', label: 'Trápnosť / neistota' },
                { v: 'vaha_telo', label: g('Strach, že som pre partnerku príliš ťažký', 'Strach, že som pre partnera príliš ťažká') },
                { v: 'nenormalne', label: 'Pocit, že je táto túžba „perverzná" alebo nenormálna' },
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
        'Odpovede môžu ukázať, že jedna rola láka výrazne viac než druhá, alebo že predstava funguje lepšie než reálny zážitok. ' +
        'Aj takýto rozdiel je užitočný: odhaľuje, či je jadrom uctievanie, poskytovanie potešenia, kontrola, váha, vôňa alebo samotné tabu.',
    },
  ],
}

// ── Spoločné bloky (bez ohľadu na skúsenosť) ──────────────────────────────
const SPOLOCNE: Blok[] = [
  {
    druh: 'skupina', id: 'fantazia_spolocna', nadpis: 'Fantázia — bez ohľadu na skúsenosť',
    bloky: [
      {
        druh: 'otazka', id: 'fant_frekvencia', typ: 'jeden', text: 'Ako často sa face sitting objavuje v mojich fantáziách',
        moznosti: [
          { v: 'takmer_vzdy', label: 'Takmer vždy, keď fantazírujem' },
          { v: 'casto', label: 'Často' },
          { v: 'niekedy', label: 'Niekedy' },
          { v: 'zriedka', label: 'Zriedka' },
          { v: 'nikdy', label: 'Nikdy' },
        ],
      },
      {
        druh: 'otazka', id: 'fant_vzrusenie', typ: 'jeden', text: 'Ako ma vzrušuje samotná predstava',
        moznosti: [
          { v: 'velmi', label: 'Veľmi' },
          { v: 'skor', label: 'Skôr áno' },
          { v: 'neutral', label: 'Neutrálne' },
          { v: 'skor_nie', label: 'Skôr nie' },
        ],
      },
      {
        druh: 'otazka', id: 'fant_kontext', typ: 'viac', inePovolene: true,
        text: 'Kde sa táto fantázia najčastejšie objavuje?',
        moznosti: [
          { v: 'solo', label: 'V sólo fantáziách alebo pri masturbácii' },
          { v: 'partner', label: g('Vo fantázii priamo s partnerkou', 'Vo fantázii priamo s partnerom') },
          { v: 'spolu', label: 'Počas spoločného sexu ako predstava alebo slová' },
          { v: 'cez_den', label: 'Mimo sexu — ako náhla predstava cez deň' },
          { v: 'tabu', label: 'Najmä vtedy, keď ju vnímam ako tajnú alebo zakázanú' },
          { v: 'neobjavuje', label: 'Vo fantáziách sa mi neobjavuje' },
        ],
      },
      {
        druh: 'otazka', id: 'fant_narocne_pocity', typ: 'viac', inePovolene: true,
        text: 'Ktoré náročné pocity sa miešajú s mojou zvedavosťou alebo vzrušením?',
        moznosti: [
          { v: 'ziadne', label: 'Žiadne — táto túžba mi pripadá prirodzená' },
          { v: 'hanba', label: 'Hanba alebo rozpaky z vlastného tela' },
          { v: 'nenormalne', label: 'Obava, že je to „perverzné" alebo nenormálne' },
          { v: 'odsudenie', label: g('Strach, že ma partnerka odsúdi', 'Strach, že ma partner odsúdi') },
          { v: 'vykon', label: 'Tlak, že musím vyzerať alebo podať výkon určitým spôsobom' },
          { v: 'zmiesane', label: 'Vzrušenie a odpor alebo neistota zároveň' },
        ],
      },
      {
        druh: 'text', id: 'fant_normalizacia', nadpis: 'Fantázia nemusí vyzerať ako realita', ton: 'info',
        telo: 'Niekto sníva o úplnej dominancii, hoci v realite ho láka iba jemné kľačanie nad tvárou. Iného vzrušuje vôňa, váha alebo uctievanie bez mocenskej hry. Rozdiel medzi predstavou a praxou je bežný. Ani tabu fantázia, ani záujem o službu či moc z človeka nerobia „perverzného" alebo pokazeného.',
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'psychologia_rol',
    nadpis: 'Čo môže byť na tejto polohe také silné',
    uvod: g(
      'Hore môžeš prežívať moc, obdiv a úľavu od povinnosti stále niečo dávať. Dole môžeš byť aktívnym tvorcom partnerkinej rozkoše, jej „živým trónom" alebo človekom, ktorému sa celý svet zúži na jej telo. Ani jedna rola nie je menejcenná a nemusí kopírovať to, aký si mimo sexu.',
      'Hore môžeš prežívať moc, obdiv a úľavu od povinnosti stále niečo dávať. Dole môžeš byť aktívnou tvorkyňou partnerovej rozkoše, jeho „živým trónom" alebo ženou, ktorej sa celý svet zúži na jeho telo. Ani jedna rola nie je menejcenná a nemusí kopírovať to, aká si mimo sexu.',
    ),
    bloky: [
      {
        druh: 'otazka', id: 'psychologia_hore', typ: 'viac', inePovolene: true,
        text: 'Keď si predstavím seba hore, ktoré vnútorné prežívanie ma láka?',
        moznosti: [
          { v: 'bozstvo', label: g('Cítiť sa ako kráľ alebo božstvo', 'Cítiť sa ako kráľovná alebo bohyňa') },
          { v: 'obdiv', label: g('Vidieť partnerkin obdiv a úplnú pozornosť', 'Vidieť partnerov obdiv a úplnú pozornosť') },
          { v: 'vypnutie', label: 'Vypnúť zodpovednosť a iba prijímať' },
          { v: 'vedenie', label: 'Viesť pohybom panvy a brať si presne to, čo mi robí dobre' },
          { v: 'triumf', label: 'Triumf, sebaistota a radosť z vlastnej sexuálnej sily' },
          { v: 'tabu', label: 'Prekročiť vlastnú hanblivosť a užiť si zakázaný pocit' },
        ],
      },
      {
        druh: 'otazka', id: 'psychologia_dole', typ: 'viac', inePovolene: true,
        text: 'Keď si predstavím seba dole, ktoré vnútorné prežívanie ma láka?',
        moznosti: [
          { v: 'sluzba', label: g('Slúžiť partnerkinej rozkoši a byť v tom užitočný', 'Slúžiť partnerovej rozkoši a byť v tom užitočná') },
          { v: 'objekt', label: g('Byť partnerkiným „živým trónom" alebo erotickým nástrojom', 'Byť partnerovým „živým trónom" alebo erotickým nástrojom') },
          { v: 'pohltenie', label: g('Nechať sa pohltiť partnerkiným teplom, vôňou a pohybom', 'Nechať sa pohltiť partnerovým teplom, vôňou a pohybom') },
          { v: 'aktivita', label: g('Aktívne tvoriť partnerkin pôžitok jazykom, perami a rukami', 'Aktívne tvoriť partnerov pôžitok jazykom, perami a rukami') },
          { v: 'odovzdanie', label: 'Na chvíľu sa vzdať bežnej kontroly a sústrediť sa iba na jeden zmyslový svet' },
          { v: 'pokora', label: 'Pokora a oddanosť bez pocitu menejcennosti' },
          { v: 'euforia', label: 'Eufória alebo hlboké ponorenie, pri ktorom ustúpi analytické premýšľanie' },
        ],
      },
      {
        druh: 'text', id: 'psychologia_ponorenie', nadpis: 'Hlboké ponorenie nie je povinný výsledok', ton: 'info',
        telo: 'Niektorí ľudia nazývajú intenzívne zúženie pozornosti pri submisívnej alebo zmyslovo pohlcujúcej hre „subspace". Iní cítia iba príjemné sústredenie, vzrušenie alebo nič zvláštne. Nie je to dôkaz kvality zážitku ani úroveň, ktorú treba dosiahnuť.',
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'partnerova_tuzba',
    nadpis: g('Keď po tom túži moja partnerka', 'Keď po tom túži môj partner'),
    uvod: g(
      'Partnerkina túžba nemusí automaticky znamenať tvoju túžbu. Môže ťa vzrušiť jej sebavedomie, chuť uctievať ju alebo predstava, že ona uctieva teba — a pritom ti môže sedieť iba jedna konkrétna verzia.',
      'Partnerova túžba nemusí automaticky znamenať tvoju túžbu. Môže ťa vzrušiť jeho sebavedomie, chuť uctievať ho alebo predstava, že on uctieva teba — a pritom ti môže sedieť iba jedna konkrétna verzia.',
    ),
    bloky: [
      {
        druh: 'otazka', id: 'partner_chce_mna_hore', typ: 'jeden',
        text: g('Ako reagujem na predstavu, že partnerka chce mňa hore na svojej tvári?', 'Ako reagujem na predstavu, že partner chce mňa hore na svojej tvári?'),
        moznosti: [
          { v: 'vzrusuje', label: g('Jej túžba po mne ma sama osebe vzrušuje', 'Jeho túžba po mne ma sama osebe vzrušuje') },
          { v: 'chcem', label: g('Chcem jej túto rolu dopriať aj preto, že viem, ako ju láka', 'Chcem mu túto rolu dopriať aj preto, že viem, ako ho láka') },
          { v: 'jemne', label: g('Som zvedavý iba na jemnú alebo krátku verziu', 'Som zvedavá iba na jemnú alebo krátku verziu') },
          { v: 'fantazia', label: 'Páči sa mi to ako fantázia, slová alebo obraz, nie ako reálna poloha' },
          { v: 'neutral', label: g('Jej túžbe rozumiem, ale vo mne erotickú odozvu nevyvoláva', 'Jeho túžbe rozumiem, ale vo mne erotickú odozvu nevyvoláva') },
          { v: 'nie', label: 'Táto rola mi nesedí' },
        ],
      },
      {
        druh: 'otazka', id: 'partner_chce_seba_hore', typ: 'jeden',
        text: g('Ako reagujem na predstavu, že partnerka chce byť hore na mojej tvári?', 'Ako reagujem na predstavu, že partner chce byť hore na mojej tvári?'),
        moznosti: [
          { v: 'vzrusuje', label: g('Jej sebavedomá túžba ma silno vzrušuje', 'Jeho sebavedomá túžba ma silno vzrušuje') },
          { v: 'uctievat', label: g('Láka ma uctievať ju a sústrediť sa iba na jej pôžitok', 'Láka ma uctievať ho a sústrediť sa iba na jeho pôžitok') },
          { v: 'aktivne', label: g('Chcem byť dole, ale aktívne viesť jej pohyb a stimuláciu', 'Chcem byť dole, ale aktívne viesť jeho pohyb a stimuláciu') },
          { v: 'fantazia', label: 'Páči sa mi táto mocenská fantázia iba v slovách alebo predstavách' },
          { v: 'neutral', label: g('Rád jej túžbu spoznám, ale zatiaľ ma osobne nevzrušuje', 'Rada jeho túžbu spoznám, ale zatiaľ ma osobne nevzrušuje') },
          { v: 'nie', label: 'Táto rola mi nesedí' },
        ],
      },
      {
        druh: 'otazka', id: 'partnerova_tuzba_detail', typ: 'text',
        text: g('Ktorá časť partnerkinej túžby ma priťahuje a ktorá vo mne vyvoláva neistotu alebo odpor?', 'Ktorá časť partnerovej túžby ma priťahuje a ktorá vo mne vyvoláva neistotu alebo odpor?'),
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'mapa_poloh',
    nadpis: 'Nie jedna poloha, ale celé menu',
    uvod: 'To, že nesedí jeden uhol alebo jedna intenzita, ešte nehovorí nič o celej téme. Rozdiel môže urobiť smer, opora tela, oblečenie, dĺžka vĺn aj to, kto sa aktívne pohybuje.',
    bloky: [
      {
        druh: 'otazka', id: 'mapa_kontakt', typ: 'viac', inePovolene: true,
        text: 'Ktoré podoby kontaktu ma eroticky lákajú?',
        moznosti: [
          { v: 'hover', label: 'Hover — telo tesne nad tvárou, dotyk iba podľa pohybu' },
          { v: 'tron', label: 'Trón — obkročmo s váhou najmä vo vlastných nohách' },
          { v: 'kontakt', label: 'Súvislý mäkký kontakt a výrazný pocit blízkosti' },
          { v: 'pohyb', label: 'Rytmické jazdenie a trenie o jazyk, nos alebo bradu' },
        ],
      },
      {
        druh: 'otazka', id: 'mapa_geometria', typ: 'viac', inePovolene: true,
        text: 'Ktorú geometriu si viem predstaviť?',
        moznosti: [
          { v: 'tvarou', label: g('Tvárou k partnerke — pohľad a kontakt', 'Tvárou k partnerovi — pohľad a kontakt') },
          { v: 'reverse', label: g('Reverse — otočený k partnerkiným nohám', 'Reverse — otočená k partnerovým nohám') },
          { v: 'bokom', label: 'Sidesaddle — bokom a asymetricky' },
          { v: 'hrana', label: 'Hrana postele alebo stabilné sedadlo — iný uhol tela' },
        ],
      },
      {
        druh: 'otazka', id: 'mapa_vrstvy', typ: 'viac', inePovolene: true,
        text: 'Ktoré ďalšie vrstvy menia môj zážitok?',
        moznosti: [
          { v: 'bielizen', label: 'Najprv cez bielizeň — vôňa, teplo a teasing' },
          { v: 'naha', label: 'Nahé telo a priamy kontakt' },
          { v: 'vlny', label: 'Krátke intenzívne vlny a návraty' },
          { v: 'dlho', label: 'Dlhý súvislý rytmus' },
          { v: 'oci', label: g('Očný kontakt alebo vedomie, že ma partnerka sleduje', 'Očný kontakt alebo vedomie, že ma partner sleduje') },
          { v: 'zrkadlo', label: 'Zrkadlo a možnosť vidieť celú scénu' },
        ],
      },
      {
        druh: 'text', id: 'mapa_telo_mytus', nadpis: 'Uhol nie je hodnotenie tela', ton: 'info',
        telo: g(
          'Ak jeden uhol neprináša dosť stimulácie alebo sa pri ňom cítiš neisto, neznamená to, že je tvoje telo „zlé". Anatómia, výška, pohyblivosť aj poloha jazyka menia zážitok. Partnerkina túžba po tvojom tele môže byť oveľa silnejšia než tvoj vlastný kritický pohľad.',
          'Ak jeden uhol neprináša dosť stimulácie alebo sa pri ňom cítiš neisto, neznamená to, že je tvoje telo „zlé". Anatómia, výška, pohyblivosť aj poloha jazyka menia zážitok. Partnerova túžba po tvojom tele môže byť oveľa silnejšia než tvoj vlastný kritický pohľad.',
        ),
      },
    ],
  },
  {
    druh: 'skupina',
    id: 'nastavenie',
    nadpis: 'Moje nastavenie',
    bloky: [
      { druh: 'otazka', id: 'nastavenie_podmienky', typ: 'text', text: 'Atmosféra a naladenie, v ktorých mi táto poloha znie najlepšie:' },
      { druh: 'otazka', id: 'nastavenie_hranice', typ: 'text', text: 'Čo ma pri nej eroticky vypína alebo vytrhne z nálady:' },
      { druh: 'otazka', id: 'nastavenie_cervena', typ: 'text', text: g('Ktorý detail by som chcel zmeniť oproti svojim doterajším predstavám alebo skúsenostiam:', 'Ktorý detail by som chcela zmeniť oproti svojim doterajším predstavám alebo skúsenostiam:') },
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
          'Čo mi komplikuje uvoľnenie a čo by mi od partnerky pomohlo:',
          'Čo mi komplikuje uvoľnenie a čo by mi od partnera pomohlo:',
        ),
      },
      { druh: 'otazka', id: 'poznamky_zaciatok', typ: 'text', text: g('Ako má partnerka začať — jedna konkrétna veta alebo gesto:', 'Ako má partner začať — jedna konkrétna veta alebo gesto:') },
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
          { v: 'urob_dobre', label: 'Tón „urob mi dobre"' },
          { v: 'pochvala', label: 'Pochvala a ocenenie' },
          { v: 'prosby', label: 'Prosby' },
          { v: 'prikazy', label: 'Príkazy' },
          { v: 'ponizovanie', label: 'Jemné ponižovanie' },
          { v: 'ziadne', label: 'Žiadne slovné prvky' },
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
          { v: 'dirty_talk', label: 'Dirty talk' },
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
      { druh: 'otazka', id: 'spol_rec_turnoff', typ: 'text', text: 'Ktoré slová alebo tón hlasu ma počas tejto polohy eroticky vypínajú?' },
    ],
  },
  {
    druh: 'skupina', id: 'dych_rozmer', nadpis: 'Váha, pohltenie a fantázia dychu',
    uvod: 'Táto vrstva nie je automatickou súčasťou face sittingu. Niekto miluje iba blízkosť a váhu, iného priťahuje symbolika úplného pohltenia alebo mocenská fantázia.',
    bloky: [
      {
        druh: 'otazka', id: 'dych_zaujem', typ: 'jeden', text: 'Čo ma na tejto vrstve láka',
        moznosti: [
          { v: 'vaha', label: 'Iba pocit váhy, tepla a tesnej blízkosti' },
          { v: 'fantazia', label: 'Aj fantázia obmedzenia dychu a pohltenia' },
          { v: 'symbolika', label: 'Najmä symbolika dominancie bez telesnej intenzity' },
          { v: 'nic', label: 'Táto vrstva ma neláka' },
        ],
      },
      {
        druh: 'otazka', id: 'dych_podoba', typ: 'jeden', text: 'V akej podobe si ju viem predstaviť',
        moznosti: [
          { v: 'hlava', label: 'Iba ako fantáziu v hlave alebo dirty talk' },
          { v: 'symbolicky', label: 'Symbolická dominancia a jemný tlak' },
          { v: 'intenzivne', label: 'Intenzívnejšia váha a pocit pohltenia' },
          { v: 'nie', label: 'Nechcem túto vrstvu' },
        ],
      },
      { druh: 'otazka', id: 'dych_vzrusenie', typ: 'text', text: 'Čo presne je na predstave váhy, pohltenia alebo dychu pre mňa erotické?' },
      {
        druh: 'otazka', id: 'dych_hore_forma', typ: 'jeden', text: 'Keď som hore, moja ideálna mocenská vrstva je',
        moznosti: [
          { v: 'symbolika', label: 'Iba symbolika dominancie' },
          { v: 'jemny_tlak', label: 'Jemný tlak a vedomé dávkovanie váhy' },
          { v: 'pohyb', label: 'Výrazný pohyb panvy a pocit vedenia' },
          { v: 'neviem', label: 'Zatiaľ neviem' },
        ],
      },
      { druh: 'otazka', id: 'dych_hore_preco', typ: 'text', text: 'Čo ma na mocenskej role hore priťahuje najviac?' },
    ],
  },
  {
    druh: 'skupina', id: 'spol_vona', nadpis: 'Vôňa, chuť a prirodzenosť',
    bloky: [
      {
        druh: 'otazka', id: 'spol_vona_postoj', typ: 'jeden', text: g('Prirodzená vôňa a chuť partnerky je pre mňa', 'Prirodzená vôňa a chuť partnera je pre mňa'),
        moznosti: [
          { v: 'spinac', label: 'Silný erotický spínač' },
          { v: 'prijemna', label: 'Príjemná súčasť blízkosti' },
          { v: 'neutral', label: 'Neutrálna' },
          { v: 'blok', label: 'Skôr mentálny blok' },
        ],
      },
      { druh: 'otazka', id: 'spol_vona_uvolnenie', typ: 'text', text: g('Čo by mi pomohlo menej riešiť vlastnú alebo partnerkinu vôňu a viac vnímať zážitok?', 'Čo by mi pomohlo menej riešiť vlastnú alebo partnerovu vôňu a viac vnímať zážitok?') },
      {
        druh: 'text', id: 'spol_vona_mytus', nadpis: 'Mýtus o prirodzenosti', ton: 'info',
        telo: g(
          'Mýtus: pri orále musí telo voňať ako kozmetika. Realita: veľa mužov priťahuje práve prirodzená vôňa, chuť a vlhkosť partnerky. Rozpaky sú bežné, no nie sú dôkazom, že je s telom niečo zlé.',
          'Mýtus: pri orále musí telo voňať ako kozmetika. Realita: veľa žien priťahuje práve prirodzená vôňa a chuť partnera. Rozpaky sú bežné, no nie sú dôkazom, že je s telom niečo zlé.',
        ),
      },
    ],
  },
  {
    druh: 'skupina', id: 'spol_diskusia', nadpis: 'Body pre spoločný rozhovor',
    bloky: [
      {
        druh: 'otazka', id: 'spol_iniciativa', typ: 'jeden',
        text: 'Kto má túto polohu častejšie iniciovať?',
        moznosti: [
          { v: 'ja', label: 'Častejšie ja' },
          { v: 'partner', label: g('Častejšie partnerka', 'Častejšie partner') },
          { v: 'striedavo', label: 'Približne striedavo' },
          { v: 'nalada', label: 'Bez stáleho pravidla — podľa nálady a konkrétnej roly' },
        ],
      },
      {
        druh: 'otazka', id: 'disk_ciel', typ: 'viac', inePovolene: true, text: 'Čo ma na spoločnom skúšaní láka ako hlavný cieľ',
        moznosti: [
          { v: 'orgazmus', label: 'Orgazmus' },
          { v: 'moc', label: 'Hra moci' },
          { v: 'zmysly', label: 'Zmyslovosť a blízkosť' },
          { v: 'objavovanie', label: 'Objavovanie novej polohy bez cieľa' },
          { v: 'uctievanie', label: 'Rituál uctievania alebo služby' },
        ],
      },
      { druh: 'otazka', id: 'disk_uspech', typ: 'text', text: g('Čo by som považoval za vydarený zážitok, aj keby trval iba krátko?', 'Čo by som považovala za vydarený zážitok, aj keby trval iba krátko?') },
      {
        druh: 'otazka', id: 'disk_detail', typ: 'viac', text: 'Ktoré detaily sú pre mňa kľúčové',
        moznosti: [
          { v: 'slova', label: 'Slová' }, { v: 'tlak', label: 'Tlak' }, { v: 'pohlad', label: 'Pohľad' },
          { v: 'vona', label: 'Vôňa' }, { v: 'kontrola', label: 'Kontrola' }, { v: 'tabu', label: 'Tabu prvok' },
        ],
      },
      { druh: 'otazka', id: 'disk_pochopit', typ: 'text', text: g('Čo chcem, aby partnerka pochopila o mojej fantázii?', 'Čo chcem, aby partner pochopil o mojej fantázii?') },
      { druh: 'otazka', id: 'disk_obava', typ: 'text', text: 'Aká je moja najväčšia obava a čo by mi pomohlo uvoľniť sa?' },
      {
        druh: 'otazka', id: 'disk_verzia', typ: 'jeden', text: 'Ktorá verzia ma láka najviac',
        moznosti: [
          { v: 'jemna', label: 'Jemná a zmyselná' },
          { v: 'stredna', label: 'Stredná — váha, pohyb a výrazný rytmus' },
          { v: 'dominantna', label: 'Dominantná a intenzívna' },
        ],
      },
      { druh: 'otazka', id: 'disk_rola_preco', typ: 'text', text: 'Túžim viac byť hore alebo dole — a čo ma na tej roli priťahuje?' },
      { druh: 'otazka', id: 'disk_tajny_ritual', typ: 'text', text: 'Ktorý detail by mohol byť iba naším tajným rituálom?' },
      { druh: 'otazka', id: 'disk_veta', typ: 'text', text: g('Jedna veta pre partnerku: najviac ma vzruší, keď ty…', 'Jedna veta pre partnera: najviac ma vzruší, keď ty…') },
    ],
  },
  {
    druh: 'text', id: 'rebrik_experimentov', nadpis: 'Sedem erotických nálad', ton: 'info',
    telo:
      'Face sitting môže mať sedem odlišných erotických nálad: tesné priblíženie bez orálu; jemný dotyk a teasing; pokojné uctievanie; aktívne jazdenie; trónová dominancia; zmyslové pohltenie; alebo fantázia postavená na slovách, príkazoch a rituáli. ' +
      'Nie sú to stupne, ktoré treba „splniť". Každá dvojica si môže obľúbiť jedinú náladu alebo medzi nimi meniť podľa chuti.',
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
      telo: g(
        'Face sitting (kinging, keď si hore ty, alebo queening, keď je hore partnerka) je intímna poloha, v ktorej jeden z vás sedí či kľačí nad tvárou druhého a prijíma orálnu stimuláciu genitálií alebo análnej oblasti. Môže byť jemný a zmyselný, hravý, aktívny aj výrazne dominantný.',
        'Face sitting (queening, keď si hore ty, alebo kinging, keď je hore partner) je intímna poloha, v ktorej jeden z vás sedí či kľačí nad tvárou druhého a prijíma orálnu stimuláciu genitálií alebo análnej oblasti. Môže byť jemný a zmyselný, hravý, aktívny aj výrazne dominantný.',
      ),
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
        '→ Master dokument: „Facesitting – Sprievodca pre páry" — hĺbkový pohľad na psychológiu, technické variácie a mocenskú dynamiku.',
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
    TECHNIKY,
    ...SPOLOCNE,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'ukoncenie',
      nadpis: 'Ukončenie modulu',
      telo:
        'Face sitting môže byť jemný orálny variant, hra váhy a rytmu, rituál uctievania aj výrazná mocenská fantázia. ' +
        'Rozdielne odpovede neznamenajú pokazenú zhodu: často iba ukazujú, že jedného priťahuje poloha, druhého konkrétna rola, vôňa, slová alebo predstava bez potreby realizácie.',
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
