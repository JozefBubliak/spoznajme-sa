import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Masturbácia a solo aktivity — modul B6 „Manuálna stimulácia".
// Zdroj: „12_Masturbacia_a_solo_aktivity". Sólo pre seba (zdieľanie),
// sledovanie partnera (voyeur v páre), byť sledovaný (exhib v páre),
// spoločná masturbácia, guided touch / pomáhanie, remote play, senzorika,
// hračky a prechod. z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

// + xlsm P47091–47322: 4 m/z otázky záujmu (sledovať, byť sledovaný/á,
// spoločná, pomáhanie) + Iné, pomáhanie partnerke/partnerovi + formy,
// situácie, hračky pri spoločnej, tipy. Doplnené: intenzívne varianty
// (inštrukcie, zákaz dotyku, ejakulácia na telo), mýty.
// + xlsm ≤P47090: oprava ženskej verzie sledovania, scenáre sledovania,
// mapa vzrušenia pri predvádzaní a formy spoločnej masturbácie.
const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Vlastný vzťah k masturbácii ──────────────────────────────────────
// Zdroj: kvalitatívne štúdie o hanbe/tabu okolo masturbácie (napr. mladé
// Indky, Singh a kol., 2025) ukazujú, že vina a hanba okolo sólo aktivít
// sú v mnohých kultúrach bežné a silné — táto karta to explicitne
// pomenúva PRED ponukou spoločných/párových foriem nižšie.
const VLASTNY_VZTAH: Blok = {
  druh: 'skupina', id: 'vlastny_vztah', nadpis: 'Môj vlastný vzťah k masturbácii',
  uvod:
    'Vina alebo hanba okolo masturbácie sú v mnohých kultúrach a náboženských prostrediach bežné a silne ' +
    'naučené — nie sú znakom, že je s tebou niečo v neporiadku. Masturbácia je celoživotne bežná prax u väčšiny ' +
    'ľudí (naprieč pohlaviami) a sama osebe nespôsobuje žiadne fyzické ani psychické poškodenie.',
  bloky: [
    {
      druh: 'otazka', id: 'vv_pocit', typ: 'jeden',
      text: 'Ako sa väčšinou cítim po masturbácii',
      moznosti: [
        { v: 'uvolneny', label: 'Uvoľnený/á, v pohode' },
        { v: 'neutral', label: 'Neutrálne' },
        { v: 'obcas_vina', label: 'Občas mám pocit viny alebo hanby' },
        { v: 'casto_vina', label: 'Často mám pocit viny alebo hanby' },
      ],
    },
    {
      druh: 'otazka', id: 'vv_povod', typ: 'viac',
      text: 'Ak sa vina/hanba objavuje, odkiaľ podľa mňa pochádza',
      podmienka: { ot: 'vv_pocit', jeNiektora: ['obcas_vina', 'casto_vina'] },
      moznosti: [
        { v: 'vychova', label: 'Výchova/náboženstvo, s ktorým som vyrastal(a)' },
        { v: 'okolie', label: 'Postoj okolia/priateľov' },
        { v: 'porovnavanie', label: 'Porovnávanie s tým, koľko/ako to „majú" robiť iní' },
        { v: 'neviem', label: 'Neviem presne' },
      ],
    },
    { druh: 'otazka', id: 'vv_frekvencia', typ: 'text', text: 'Ako často masturbujem (voliteľné, len orientačne, žiadne „správne" číslo neexistuje):' },
  ],
}

// ── Sólo pre seba ────────────────────────────────────────────────────
const SOLO: Blok = {
  druh: 'skupina', id: 'solo', nadpis: 'Sólo pre seba (otvorené zdieľanie)',
  bloky: [
    p('solo_zdielam', 'Som OK, keď partner vie, ako si to robím'),
    {
      druh: 'otazka', id: 'solo_pomocky', typ: 'viac', inePovolene: true,
      text: g('Ktoré sólo-pomôcky používam alebo by som chcel', 'Ktoré sólo-pomôcky používam alebo by som chcela'),
      moznosti: [
        { v: 'ruka', label: 'Len ruka' },
        { v: 'klit_vibr', label: 'Klitorálny vibrátor / bullet' },
        { v: 'wand', label: 'Prikladací vibrátor (wand)' },
        { v: 'dildo', label: 'Dildo' },
        { v: 'masturbator', label: 'Masturbátor / rukáv' },
        { v: 'kruzok', label: 'Erekčný krúžok' },
        { v: 'plug', label: 'Análny plug / korálky' },
        { v: 'lubrikant', label: 'Lubrikant' },
      ],
    },
  ],
}

// ── Sledovanie partnera (voyeur v páre) ────────────────────────────
const VOYEUR: Blok = {
  druh: 'skupina', id: 'voyeur', nadpis: g('Sledovanie partnerky pri masturbácii', 'Sledovanie partnera pri masturbácii'),
  bloky: [
    {
      druh: 'text', id: 'voy_predstav',
      telo: g(
        'Predstav si, ako ticho sedíš a sleduješ jej ruky na tele. Každý jej pohyb prezrádza, čo naozaj miluje. Jej dych sa zrýchľuje a pohľad, ktorým ťa sleduje, ťa vtiahne do hry.',
        'Predstav si, ako ticho sedíš a sleduješ jeho ruky na tele. Každý jeho pohyb prezrádza, čo naozaj miluje. Jeho dych sa zrýchľuje a pohľad, ktorým ťa sleduje, ťa vtiahne do hry.',
      ),
    },
    {
      druh: 'otazka', id: 'voy_zaujem', typ: 'jeden',
      text: g('Túžiš sledovať partnerku pri masturbácii?', 'Túžiš sledovať partnera pri masturbácii?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'ak_chce', label: g('Rád to urobím, ak po tom partnerka túži', 'Rada to urobím, ak po tom partner túži') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    { druh: 'otazka', id: 'voy_zaujem_ine', typ: 'text', text: 'Vlastná odpoveď — sledovanie (voliteľné):' },
    p('voy_postoj', g('Pozerať sa, ako partnerka masturbuje', 'Pozerať sa, ako partner masturbuje')),
    {
      druh: 'otazka', id: 'voy_co_vzrusuje', typ: 'viac',
      text: 'Čo ma na tom vzrušuje',
      moznosti: [
        { v: 'tempo', label: 'Tempo rúk' },
        { v: 'dych', label: 'Dych' },
        { v: 'ocny_kontakt', label: 'Očný kontakt' },
        { v: 'mapa_dotykov', label: 'Mapa dotykov — vidím, čo naozaj funguje' },
        { v: 'reakcie', label: 'Reakcie a vzdychy' },
        { v: 'vie_o_mne', label: 'Vie, že sa pozerám, a vedome sa so mnou hrá' },
        { v: 'pocit_kontroly', label: 'Pocit kontroly, keď vie, že ho/ju sledujem' },
      ],
    },
    {
      druh: 'otazka', id: 'voy_kedy', typ: 'jeden',
      text: 'Kedy ma to najviac láka',
      moznosti: [
        { v: 'spontanne', label: 'Spontánne' },
        { v: 'predohra', label: 'Ako súčasť predohry' },
        { v: 'provokovanie', label: 'Keď ma partner provokuje pohľadom' },
        { v: 'rastuce_vzrusenie', label: g('Keď vidím, ako jej vzrušenie postupne rastie', 'Keď vidím, ako jeho vzrušenie postupne rastie') },
        { v: 'dych_vzdychy', label: 'Keď počujem dych a vzdychy bez prikrášľovania' },
      ],
    },
    {
      druh: 'otazka', id: 'voy_sceny', typ: 'viac',
      text: 'Scény a prostredia',
      moznosti: [
        { v: 'zrkadlo', label: 'Pri zrkadle (reakcie z iného uhla)' },
        { v: 'gauc', label: 'Na gauči / posteli (zmena výšky a vzdialenosti)' },
        { v: 'bez_dotyku', label: '„Bez dotyku" večer — iba vizuál + slová' },
        { v: 's_pomockami', label: 'Partnerova sólo hra s rukami aj pomôckami' },
        { v: 'spontanna', label: 'Spontánna sólo aktivita ako predohra' },
        { v: 'zaciatok_spolocnej', label: 'Masturbácia ako začiatok spoločnej aktivity' },
      ],
    },
  ],
}

// ── Byť sledovaný (exhib v páre) ─────────────────────────────────
const EXHIB: Blok = {
  druh: 'skupina', id: 'exhib', nadpis: g('Byť sledovaný pri sólo hre', 'Byť sledovaná pri sólo hre'),
  bloky: [
    {
      druh: 'text', id: 'exh_predstav',
      telo: 'Predstav si, že ťa partner pozoruje, zatiaľ čo sa venuješ sebe. Ten okamih môže byť zdrojom sebadôvery, vzrušenia a hlbokého spojenia.',
    },
    {
      druh: 'otazka', id: 'exh_zaujem', typ: 'jeden',
      text: g('Chcel by si byť sledovaný, keď masturbuješ?', 'Chcela by si byť sledovaná, keď masturbuješ?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'ak_chce', label: g('Rád to urobím, ak po tom partnerka túži', 'Rada to urobím, ak po tom partner túži') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    { druh: 'otazka', id: 'exh_zaujem_ine', typ: 'text', text: g('Vlastná odpoveď — byť sledovaný (voliteľné):', 'Vlastná odpoveď — byť sledovaná (voliteľné):') },
    p('exh_postoj', 'Keď ma partner sleduje pri sólo hre'),
    {
      druh: 'otazka', id: 'exh_co_vzrusuje', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tom, že sa partner pozerá, najviac vzrušuje',
      moznosti: [
        { v: 'ocny_kontakt', label: 'Očný kontakt počas masturbácie' },
        { v: 'partner_tiez', label: 'Partner/ka sa pri sledovaní venuje aj sebe' },
        { v: 'postupne_sa_prida', label: 'Postupne sa pridá a začne ma dráždiť' },
        { v: 'dych_slova', label: 'Jeho/jej dych, povzbudenie alebo explicitné komentáre' },
        { v: 'zrkadlo', label: 'Zrkadlo alebo iný vizuálny uhol' },
        { v: 'jeho_jej_vzrusenie', label: 'Vidieť, ako ho/ju vzrušuje pohľad na mňa' },
        { v: 'prikazy', label: 'Intenzívne vedenie a príkazy, čo mám robiť' },
      ],
    },
    {
      druh: 'otazka', id: 'exh_komfort', typ: 'jeden',
      text: 'Čo mi je komfortnejšie',
      moznosti: [
        { v: 'ticho', label: 'Ticho' },
        { v: 'sepot', label: 'Šepot a komplimenty' },
        { v: 'provokovanie', label: 'Očný kontakt a provokovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'exh_intenzita', typ: 'jeden',
      text: 'Intenzita',
      moznosti: [
        { v: 'teasing', label: 'Pomalé „teasing"' },
        { v: 'rychle', label: 'Rýchle do vyvrcholenia' },
        { v: 'podla_nalady', label: 'Podľa nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'exh_slovnik', typ: 'jeden',
      text: g('Čo od partnerky chcem', 'Čo od partnera chcem'),
      moznosti: [
        { v: 'len_pozoruj', label: '„Len pozoruješ"' },
        { v: 'navadzaj', label: '„Pozeraj a navádzaj ma"' },
        { v: 'zapoj_po_signale', label: '„Zapoj sa po signále"' },
        { v: 'prikazuj', label: '„Prikazuj mi, čo mám robiť" (inštrukcie, tempo, kedy smiem)' },
        { v: 'komentuj', label: '„Komentuj, čo vidíš" — aj vulgárne' },
      ],
    },
    { druh: 'otazka', id: 'exh_signal', typ: 'text', text: 'Dohodnutý signál „prevezmi ma" (kedy smie prísť bližšie):' },
    {
      druh: 'otazka', id: 'exh_realita', typ: 'jeden',
      text: 'Kde som s „byť videný/á" pri sólo',
      moznosti: [
        { v: 'hlava', label: 'Len v hlave / fantázia' },
        { v: 'roleplay', label: 'Role-play' },
        { v: 'mozno', label: 'Možno, s podmienkami' },
        { v: 'ano', label: 'Áno' },
      ],
    },
  ],
}

// ── Spoločná masturbácia ────────────────────────────────────────
const SPOLOCNA: Blok = {
  druh: 'skupina', id: 'spolocna', nadpis: 'Spoločná masturbácia (obaja naraz)',
  bloky: [
    {
      druh: 'text', id: 'spol_predstav',
      telo: 'Predstav si, že ležíte vedľa seba a synchronizujete dotyky, pohyby aj pohľady. Všetko sa spája do jedného spoločného zážitku.',
    },
    {
      druh: 'otazka', id: 'spol_zaujem', typ: 'jeden',
      text: g('Ako vnímaš spoločnú masturbáciu s partnerkou?', 'Ako vnímaš spoločnú masturbáciu s partnerom?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'ak_chce', label: g('Rád to urobím, ak po tom partnerka túži', 'Rada to urobím, ak po tom partner túži') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    { druh: 'otazka', id: 'spol_zaujem_ine', typ: 'text', text: 'Vlastná odpoveď — spoločná masturbácia (voliteľné):' },
    p('spol_postoj', 'Masturbovať spolu, obaja naraz'),
    p(
      'spol_vibrator_sledovanie',
      g(
        'Pozerať sa, ako partnerka masturbuje vibrátorom, kým sa zároveň venujem sebe',
        'Masturbovať vibrátorom pred partnerom, kým sa na mňa pozerá a zároveň sa venuje sebe',
      ),
    ),
    {
      druh: 'otazka', id: 'spol_vibrator_partner_tuzi', typ: 'jeden',
      text: g(
        'Keď partnerka túži masturbovať vibrátorom predo mnou a chce, aby som sa pritom venoval sebe',
        'Keď partner túži sledovať ma s vibrátorom a pritom sa venovať sebe',
      ),
      moznosti: [
        { v: 'laka', label: g('Jej predvádzanie a vzájomné vzrušenie ma lákajú', 'Jeho pohľad a vzájomné vzrušenie ma lákajú') },
        { v: 'iba_sledujem', label: 'Radšej sa iba pozerám alebo nechám pozerať bez vlastnej masturbácie' },
        { v: 'postupne', label: 'Láka ma začať sledovaním a neskôr sa pridať' },
        { v: 'ina_hracka', label: 'Áno, ale radšej s inou hračkou alebo rukami' },
        { v: 'nie', label: 'Táto konkrétna scéna ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'spol_hracky_zaujem', typ: 'jeden',
      text: g('Chcel by si zapojiť hračky do spoločnej masturbácie?', 'Chcela by si zapojiť hračky do spoločnej masturbácie?'),
      moznosti: [
        { v: 'ano', label: 'Áno, vibrátory alebo análne hračky' },
        { v: 'mozno', label: 'Možno, podľa situácie / keď sa budeme cítiť pripravení' },
        { v: 'nie', label: 'Nie, radšej prirodzené dotyky' },
      ],
    },
    { druh: 'otazka', id: 'spol_hracky_zaujem_ine', typ: 'text', text: 'Vlastná odpoveď — hračky (voliteľné):' },
    {
      druh: 'otazka', id: 'spol_formy', typ: 'viac', inePovolene: true,
      text: 'Aké formy spoločnej masturbácie ma vzrušujú',
      moznosti: [
        { v: 'obaja_svoje_telo', label: 'Obaja sa dotýkame vlastného tela naraz' },
        { v: 'striedanie', label: g('Striedame pozorovanie, vlastné dotyky a dotyky partnerky', 'Striedame pozorovanie, vlastné dotyky a dotyky partnera') },
        { v: 'napodobnovanie', label: 'Napodobňujeme pohyby a tempo toho druhého' },
        { v: 'vibrator_a_ruka', label: 'Jeden používa vibrátor a druhý ruku alebo masturbátor' },
        { v: 'jeden_predvadza', label: 'Jeden sa s hračkou predvádza, druhý sa pozerá a venuje sebe' },
        { v: 'obaja_hracky', label: 'Obaja používame vlastnú hračku a sledujeme reakcie toho druhého' },
        { v: 'nove_pozicie', label: 'Skúšame nové pozície, uhly pohľadu a vzdialenosť' },
        { v: 'sutaziva', label: 'Hravá alebo súťaživá verzia — kto vydrží dlhšie alebo príde prvý' },
      ],
    },
    {
      druh: 'otazka', id: 'spol_tempo', typ: 'jeden',
      text: 'Tempo',
      moznosti: [
        { v: 'spolu', label: 'Synchronizovane — tempo spolu' },
        { v: 'striedave', label: 'Striedavé (edging / pauzy)' },
        { v: 'kazdy_sam', label: 'Každý svojím tempom' },
      ],
    },
    {
      druh: 'otazka', id: 'spol_pozicie', typ: 'viac',
      text: 'Pozície',
      moznosti: [
        { v: 'tvarou', label: 'Tvárou k sebe' },
        { v: 'vedla', label: 'Vedľa seba' },
        { v: 'zrkadlo', label: 'Pri zrkadle' },
      ],
    },
    {
      druh: 'otazka', id: 'spol_hracky', typ: 'viac',
      text: 'Integrované pomôcky',
      moznosti: [
        { v: 'vibr_bullet', label: 'Vibrátor / bullet' },
        { v: 'masturbator', label: 'Masturbátor / rukáv' },
        { v: 'analne', label: 'Análne hračky' },
        { v: 'bez', label: 'Bez pomôcok' },
      ],
    },
  ],
}

// ── Guided touch / pomáhanie ──────────────────────────────────
const GUIDED: Blok = {
  druh: 'skupina', id: 'guided', nadpis: 'Vedená masturbácia a pomáhanie',
  bloky: [
    {
      druh: 'text', id: 'guid_predstav',
      telo: g(
        'Masturbácia nemusí byť sólový akt. Keď sa partnerka pripojí — navádzaním, bozkami alebo šepkaním — vzniká zážitok hlbokého spojenia. Vezmeš jej ruku, ukážeš iný uhol, šepneš, čo na nej zbožňuješ… a dych sa zrýchľuje.',
        'Masturbácia nemusí byť sólový akt. Keď sa partner pripojí — navádzaním, bozkami alebo šepkaním — vzniká zážitok hlbokého spojenia. Vezmeš jeho ruku, ukážeš iný uhol, šepneš, čo na ňom zbožňuješ… a dych sa zrýchľuje.',
      ),
    },
    {
      druh: 'otazka', id: 'guid_zaujem', typ: 'jeden',
      text: g('Chcel by si, aby ti partnerka pomáhala pri masturbácii?', 'Chcela by si, aby ti partner pomáhal pri masturbácii?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'ak_chce', label: g('Rád to urobím, ak po tom partnerka túži', 'Rada to urobím, ak po tom partner túži') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    { druh: 'otazka', id: 'guid_zaujem_ine', typ: 'text', text: 'Vlastná odpoveď — pomoc pri masturbácii (voliteľné):' },
    {
      druh: 'otazka', id: 'guid_dat', typ: 'jeden',
      text: g('Ako vnímaš pomoc partnerke pri masturbácii?', 'Ako vnímaš pomoc partnerovi pri masturbácii?'),
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'ak_chce', label: g('Rád to urobím, ak po tom partnerka túži', 'Rada to urobím, ak po tom partner túži') },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    { druh: 'otazka', id: 'guid_dat_ine', typ: 'text', text: g('Vlastná odpoveď — pomáhať partnerke (voliteľné):', 'Vlastná odpoveď — pomáhať partnerovi (voliteľné):') },
    {
      druh: 'otazka', id: 'guid_formy', typ: 'viac', inePovolene: true,
      text: g('Aké formy pomoci by som chcel skúsiť', 'Aké formy pomoci by som chcela skúsiť'),
      moznosti: [
        { v: 'navadzanie', label: 'Jemné navádzanie rúk' },
        { v: 'bozky_sepot', label: 'Bozky alebo šepkanie vzrušujúcich slov počas aktivity' },
        { v: 'striedanie', label: 'Striedanie aktívnej a pasívnej role' },
        { v: 'ruka_na_ruke', label: g('Moja ruka na jej ruke — spolu v rytme', 'Moja ruka na jeho ruke — spolu v rytme') },
        { v: 'ostatne_telo', label: 'Partner/ka sa venuje zvyšku tela (prsia, krk, zadok)' },
        { v: 'hracka', label: 'Partner/ka drží hračku, ja rukou' },
      ],
    },
    p('guid_postoj', 'Vedená masturbácia — partner ma vedie slovami, rukami a tempom'),
    {
      druh: 'otazka', id: 'guid_rola', typ: 'jeden',
      text: 'Ktorá rola mi sedí',
      moznosti: [
        { v: 'vediem', label: g('Rád vediem partnerkine ruky a tempo', 'Rada vediem partnerove ruky a tempo') },
        { v: 'vedeny', label: g('Rád som vedený', 'Rada som vedená') },
        { v: 'striedanie', label: 'Striedať aktívnu a pasívnu rolu' },
      ],
    },
    {
      druh: 'otazka', id: 'guid_signaly', typ: 'viac',
      text: 'Signály v praxi',
      moznosti: [
        { v: 'ok_pridaj', label: '„OK / pridaj / uber / stačí" (rýchle gestá alebo slová)' },
        { v: 'pauza', label: 'Dohodnutý signál na pauzu / zmenu' },
        { v: 'sepot', label: 'Šepot k technikám — čo presne funguje' },
        { v: 'bozk', label: 'Bozk / dotyk ramena počas aktivity' },
      ],
    },
    { druh: 'otazka', id: 'guid_kam_ejakulat', typ: 'text', text: '„Kam s ejakulátom" — moje preferencie:' },
  ],
}

// ── Remote play ────────────────────────────────────────────────
// ── Situácie, intenzívne varianty, tipy a mýty ─────────────────────
const SITUACIE: Blok = {
  druh: 'skupina', id: 'situacie', nadpis: 'Situácie a scenáre',
  bloky: [
    {
      druh: 'otazka', id: 'sit_ktore', typ: 'viac', inePovolene: true,
      text: 'Aké situácie ma pri masturbácii alebo jej sledovaní najviac lákajú',
      moznosti: [
        { v: 'ticho', label: g('Byť sledovaný v tichu a intímnej atmosfére', 'Byť sledovaná v tichu a intímnej atmosfére') },
        { v: 'skumanie', label: 'Spoločné skúmanie tiel a vzájomné dotyky počas sólo hry' },
        { v: 'ocny_kontakt', label: 'Provokovanie očným kontaktom' },
        { v: 'sledovanie_zapojenie', label: 'Sledovanie a následné zapojenie do aktivity' },
        { v: 'hracky', label: 'Hračky na zvýšenie intenzity' },
        { v: 'porno_spolu', label: 'Masturbovať spolu pri porne alebo erotickej poviedke' },
        { v: 'videohovor', label: 'Cez videohovor, keď sme od seba' },
      ],
    },
    p('sit_instrukcie', 'Partner/ka mi presne diktuje, ako sa mám dotýkať a kedy smiem prísť'),
    p('sit_zakaz_dotyku', 'Pozerať sa na seba, ale nesmieť sa dotknúť jeden druhého'),
    p('sit_na_telo', g('Masturbovať až do konca na partnerkino telo', 'Masturbovať až do konca na partnerovo telo')),
    p('sit_prekvapenie', 'Nechať sa „prichytiť" pri masturbácii'),
    {
      druh: 'text', id: 'sit_tipy', nadpis: 'Tipy na experimentovanie', ton: 'info',
      telo:
        'Začnite pomaly — najprv len sledovaním, neskôr jemným dotykom. Dohodnite si večer bez dotyku: len sa navzájom sledujte. ' +
        'Zrkadlo alebo kamera (bez záznamu) ukáže reakcie z inej perspektívy. Šepkajte si, čo práve cítite, alebo komplimenty. ' +
        'Dohodnite si signál, kedy sa môže ten druhý priblížiť a zapojiť. Všímajte si, ako sa vzrušenie mení pri rôznych technikách — to je najlepšia škola pre oboch.',
    },
    {
      druh: 'text', id: 'sit_myty', nadpis: 'Mýty', ton: 'info',
      telo: g(
        'Mýtus: „Keď partnerka masturbuje, nestačím jej." — Realita: masturbujú aj ľudia v šťastných vzťahoch s dobrým sexom; je to iná potreba, nie náhrada. ' +
          'Mýtus: „Ženy nemasturbujú." — Realita: veľká väčšina žien áno, len o tom menej hovoria. ' +
          'Mýtus: „Sledovať partnerku pri tom je úchylné." — Realita: je to jeden z najrýchlejších spôsobov, ako sa naučiť presne to, čo jej robí dobre, a pre mnohých jeden z najvzrušujúcejších pohľadov vôbec. ' +
          'Mýtus: „Masturbácia berie chuť na spoločný sex." — Realita: u väčšiny ľudí skôr udržiava libido a telo „v kondícii".',
        'Mýtus: „Keď partner masturbuje, nestačím mu." — Realita: masturbujú aj ľudia v šťastných vzťahoch s dobrým sexom; je to iná potreba, nie náhrada. ' +
          'Mýtus: „Ženy nemasturbujú." — Realita: veľká väčšina žien áno, len o tom menej hovoria. ' +
          'Mýtus: „Sledovať partnera pri tom je úchylné." — Realita: je to jeden z najrýchlejších spôsobov, ako sa naučiť presne to, čo mu robí dobre, a pre mnohých jeden z najvzrušujúcejších pohľadov vôbec. ' +
          'Mýtus: „Masturbácia berie chuť na spoločný sex." — Realita: u väčšiny ľudí skôr udržiava libido a telo „v kondícii".',
      ),
    },
  ],
}

const REMOTE: Blok = {
  druh: 'skupina', id: 'remote', nadpis: 'Remote play (diaľkovo ovládané hračky)',
  bloky: [
    {
      druh: 'text', id: 'rem_info', ton: 'info',
      telo:
        'Remote play môže znamenať videohovor, hlasové pokyny, správy počas sólo hry alebo diaľkové ovládanie hračky. Vzdialenosť mení pozornosť: obraz zvýrazní predvádzanie, hlas fantáziu a ovládanie hračky pocit vedenia.',
    },
    p('rem_postoj', 'Diaľkovo ovládané hračky ako hra moci a odovzdania'),
    {
      druh: 'otazka', id: 'rem_kto', typ: 'jeden',
      text: 'Kto ovláda',
      moznosti: [
        { v: 'ja', label: 'Ovládam ja' },
        { v: 'partner', label: g('Ovláda partnerka', 'Ovláda partner') },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    { druh: 'otazka', id: 'rem_pravidla', typ: 'text', text: 'Kde a kedy ma diaľková hra láka:' },
    {
      druh: 'otazka', id: 'rem_format', typ: 'viac', inePovolene: true,
      text: 'Aké formy remote play ma lákajú',
      moznosti: [
        { v: 'video', label: 'Videohovor a vzájomné sledovanie' },
        { v: 'hlas', label: 'Hlasový hovor a opisovanie dotykov' },
        { v: 'spravy', label: 'Správy, fotografie alebo krátke úlohy' },
        { v: 'dialkova_hracka', label: 'Diaľkovo ovládaná hračka' },
        { v: 'partner_urcuje', label: 'Partner/ka určuje tempo a chvíľu vyvrcholenia' },
        { v: 'striedanie', label: 'Striedanie ovládania a predvádzania' },
      ],
    },
    {
      druh: 'otazka', id: 'rem_miesto', typ: 'viac', inePovolene: true,
      text: 'V akom prostredí si remote play viem predstaviť',
      moznosti: [
        { v: 'doma', label: 'Každý doma vo svojom priestore' },
        { v: 'hotel', label: 'Hotel alebo pracovná cesta' },
        { v: 'kupelna', label: 'Kúpeľňa alebo sprcha' },
        { v: 'postel', label: 'Posteľ s pripravenou atmosférou' },
        { v: 'diskretne', label: 'Diskrétna hra počas bežného dňa' },
      ],
    },
  ],
}

// ── Senzorika a atmosféra ─────────────────────────────────────
const SENZORIKA: Blok = {
  druh: 'skupina', id: 'senzorika', nadpis: 'Senzorika a atmosféra',
  bloky: [
    {
      druh: 'otazka', id: 'sen_prostriedky', typ: 'viac',
      text: 'Čím vytvárať atmosféru',
      moznosti: [
        { v: 'hudba', label: 'Hudba' },
        { v: 'svetlo', label: 'Tlmené svetlo' },
        { v: 'tma', label: 'Úplná tma (fantázia namiesto vizuálu)' },
        { v: 'vone', label: 'Vône' },
        { v: 'dirty_talk', label: 'Šepot / dirty talk' },
        { v: 'ticho', label: 'Tiché dýchanie' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_teplota', typ: 'viac',
      text: 'Teplotné podnety',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'uteraky', label: 'Teplé uteráky' },
        { v: 'svieca', label: 'Masážne sviečky' },
        { v: 'olej', label: 'Kombinácia s dotykom / olejom' },
      ],
    },
    { druh: 'otazka', id: 'sen_teplota_zony', typ: 'text', text: 'Kde na tele „áno / nie" pre teplotné hry:' },
    p('sen_deprivacia', 'Zmyslová deprivácia (blindfold / slúchadlá → zvýrazniť hmat)'),
  ],
}

// ── Hračky ──────────────────────────────────────────────────
const HRACKY: Blok = {
  druh: 'skupina', id: 'hracky', nadpis: 'Hračky a doplnky',
  bloky: [
    {
      druh: 'otazka', id: 'hr_soft', typ: 'viac',
      text: '„Soft" sada na večer',
      moznosti: [
        { v: 'bullet', label: 'Bullet vibrátor' },
        { v: 'lubrikant', label: 'Lubrikant' },
        { v: 'zrkadlo', label: 'Zrkadlo' },
        { v: 'uterak', label: 'Uterák' },
        { v: 'plug', label: 'Malý análny plug / korálky' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré ďalšie hračky ma lákajú',
      moznosti: [
        { v: 'masturbator', label: 'Masturbátor / rukáv' },
        { v: 'kruzky', label: 'Erekčné krúžky' },
        { v: 'klit_vibr', label: 'Klitorálne vibrátory' },
        { v: 'nositelne', label: 'Nositeľné (diskrétna hra)' },
        { v: 'g_p_bod', label: 'G-/P-bodové tvary' },
      ],
    },
  ],
}

// ── Prechod a kontext ─────────────────────────────────────
const KONTEXT: Blok = {
  druh: 'skupina', id: 'kontext', nadpis: 'Prechod a kontext',
  bloky: [
    {
      druh: 'otazka', id: 'ctx_prechod', typ: 'jeden',
      text: 'Prechod z „mutual"',
      moznosti: [
        { v: 'na_kontakt', label: 'Plynulo prejsť na telový kontakt (petting, trenie)' },
        { v: 'zostat', label: 'Zostať len pri sólo / mutual formách' },
        { v: 'nalada', label: 'Podľa nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'ctx_kedy', typ: 'viac',
      text: 'Kedy sólo hry v páre používať',
      moznosti: [
        { v: 'predohra', label: 'Ako predohra' },
        { v: 'samostatny', label: 'Ako samostatný akt' },
        { v: 'most', label: 'Ako „most" po pauze' },
      ],
    },
    p('ctx_zmyslovy_vecer', '„Zmyslový večer" — poradie krokov, koľko minút ktorému zmyslu'),
    {
      druh: 'otazka', id: 'ctx_po_spolocnej', typ: 'jeden',
      text: 'Ako sa najčastejšie cítim po spoločnej sólo hre',
      moznosti: [
        { v: 'blizsie', label: g('Bližšie k partnerke a viac prepojený', 'Bližšie k partnerovi a viac prepojená') },
        { v: 'vzrusene', label: 'Stále vzrušený/á a pripravený/á pokračovať' },
        { v: 'uvolnene', label: 'Uvoľnene a spokojne' },
        { v: 'zranitelne', label: 'Odhalene alebo zraniteľne' },
        { v: 'rozpacito', label: 'Trochu rozpačito, potrebujem si zvyknúť' },
        { v: 'podla_situacie', label: 'Veľmi záleží na situácii' },
      ],
    },
    { druh: 'otazka', id: 'ctx_po_spolocnej_ine', typ: 'text', text: 'Po spoločnej sólo hre — vlastná odpoveď (voliteľné):' },
    {
      druh: 'text', id: 'ctx_po_spolocnej_info', nadpis: 'Aj dozvuk je súčasť zážitku', ton: 'info',
      telo:
        'Spoločná sólo hra môže pôsobiť ako učenie, predstavenie, súťaž, veľmi osobné odhalenie alebo pokojná aktivita vedľa seba. Preto môže po nej prísť hrdosť, blízkosť, ďalšia túžba aj rozpaky. Žiadna z týchto reakcií neznamená, že je s človekom niečo zlé.',
    },
  ],
}

export const MASTURBACIA: TemaObsah = {
  slug: 'manualna-stimulacia/manualna-stimulacia',
  nadpis: 'Masturbácia a solo aktivity',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Prečo to zaradiť',
      telo: g(
        'Dôvera a „učenie sa" z partnerkinej techniky — vidím, čo naozaj funguje. Dá sa použiť ako predohra, samostatný akt alebo „most" po pauze. Typy: sledovanie partnerky, byť sledovaný, spoločná masturbácia a pomáhanie.',
        'Dôvera a „učenie sa" z partnerovej techniky — vidím, čo naozaj funguje. Dá sa použiť ako predohra, samostatný akt alebo „most" po pauze. Typy: sledovanie partnera, byť sledovaná, spoločná masturbácia a pomáhanie.',
      ),
    },
    {
      druh: 'text', id: 'hranie_vo_dvojici', nadpis: 'Hranie sa s túžbou vo dvojici',
      telo: g(
        'Masturbácia v páre môže byť jemná predohra, spôsob sebapoznania alebo vzrušujúce divadlo pre oči partnerky. Je to priestor na odhaľovanie najhlbších túžob a zdieľanie intimity.',
        'Masturbácia v páre môže byť jemná predohra, spôsob sebapoznania alebo vzrušujúce divadlo pre oči partnera. Je to priestor na odhaľovanie najhlbších túžob a zdieľanie intimity.',
      ),
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo zo sólo aktivít v páre chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'solo_zdielanie', label: g('Otvorene zdieľať, ako to mám rád', 'Otvorene zdieľať, ako to mám rada') },
        { v: 'voyeur', label: g('Sledovať partnerku pri masturbácii', 'Sledovať partnera pri masturbácii') },
        { v: 'exhib', label: g('Byť sledovaný pri sólo hre', 'Byť sledovaná pri sólo hre') },
        { v: 'spolocna', label: 'Spoločná masturbácia (obaja naraz)' },
        { v: 'guided', label: 'Vedená masturbácia / pomáhanie' },
        { v: 'sledovat_zapojit', label: g('Sledovať partnerku a postupne sa zapojiť', 'Sledovať partnera a postupne sa zapojiť') },
        { v: 'remote', label: 'Remote play (diaľkové hračky)' },
        { v: 'ziadne', label: g('Zatiaľ nič konkrétne — som zvedavý', 'Zatiaľ nič konkrétne — som zvedavá') },
      ],
    },
    VLASTNY_VZTAH,
    SOLO,
    VOYEUR,
    EXHIB,
    SPOLOCNA,
    GUIDED,
    SITUACIE,
    REMOTE,
    SENZORIKA,
    HRACKY,
    KONTEXT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo:
        'Výsledky zvýraznia formy sólo hry, pri ktorých sa vaše preferencie stretávajú. ' +
        'Sólo hry v páre môžu byť o zdieľaní, učení sa, predvádzaní aj hravosti bez tlaku na výkon.',
    },
  ],
}
