import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Polohy — modul D3 „Polohy".
// Zdroj: „16_Polohy_a_ergonomia.docx". Klasické polohy, variácie pre hĺbku
// a uhol, orálne/nepenetratívne polohy, poloha × anál/hrádza/prostata,
// poloha × prístup pre ruky/ústa, poloha × hračky, poloha × prostredie,
// variácie pre rozdiely tela a komfort, praktické pohodlie a lubrikáciu.
// Konkrétne techniky (čo robia ruky/ústa/hračky) majú vlastné podrobné
// témy — tu je dôraz na to, KTORÁ poloha čo umožňuje, nie na samotnú
// techniku. z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Rámec: čo od polôh chceme ──────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec — komfort, ergonómia, prístup',
  bloky: [
    {
      druh: 'otazka', id: 'ram_priorita', typ: 'viac',
      text: 'Čo je pre mňa pri výbere polohy najdôležitejšie',
      moznosti: [
        { v: 'komfort', label: 'Fyzický komfort a ergonómia' },
        { v: 'ocny_kontakt', label: 'Očný kontakt a intimita' },
        { v: 'hlbka', label: 'Hĺbka a intenzita' },
        { v: 'kontrola', label: 'Kto má kontrolu nad tempom' },
        { v: 'pristup_ruky', label: 'Voľné ruky/ústa na doplnkovú stimuláciu' },
        { v: 'vizual', label: 'Vizuálny zážitok' },
      ],
    },
    { druh: 'otazka', id: 'ram_opory', typ: 'text', text: 'Ktoré opory mi pomáhajú (vankúš pod panvou/kolenami, okraj postele):' },
  ],
}

// ── Klasické polohy ────────────────────────────────────────────────
const KLASICKE: Blok = {
  druh: 'skupina', id: 'klasicke', nadpis: 'Klasické polohy',
  bloky: [
    {
      druh: 'otazka', id: 'kla_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré klasické polohy mám rád(a)',
      moznosti: [
        { v: 'misionar', label: 'Misionárska — intimita a očný kontakt' },
        { v: 'zozadu', label: 'Zozadu („na psíka") — hĺbka a dynamika' },
        { v: 'cowgirl', label: g('Cowgirl / žena hore — kontrola u nej a vizuálny zážitok', 'Cowgirl / žena hore — kontrola a rytmus v mojich rukách') },
        { v: 'reverse_cowgirl', label: 'Reverse cowgirl — vizuálny uhol' },
        { v: 'bok', label: 'Na boku / „spooning" — pokojná, na dlhšie vlny' },
        { v: 'stoj', label: 'V stoji / na okraji postele-stola' },
        { v: 'lotos', label: 'Lotosová — tvárou k sebe, hlboké spojenie' },
        { v: 'zadna_sklon', label: g('Zadná so sklonom — intenzita a vzrušenie', 'Zadná so sklonom — maximálna penetrácia') },
        { v: 'experimentalne', label: 'Experimentálne (akrobatické, nábytok)' },
        { v: 'kombinacia', label: 'Kombinácia viacerých polôh' },
      ],
    },
    p('kla_variacie', 'Drobné variácie (vankúš pod panvou, zdvihnuté nohy, náklon) mi menia zážitok výrazne'),
    {
      druh: 'otazka', id: 'kla_zmena_pocas', typ: 'jeden',
      text: 'Ako často meníme polohy počas jedného aktu',
      moznosti: [
        { v: 'casto', label: 'Často — dodáva to dynamiku' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'zriedka', label: 'Zriedka — radšej ostávam pri jednej' },
      ],
    },
    { druh: 'otazka', id: 'kla_zmena_pocas_ine', typ: 'text', text: 'Vlastná odpoveď — zmena polôh počas aktu (voliteľné):' },
    {
      druh: 'otazka', id: 'kla_prehody', typ: 'viac', inePovolene: true,
      text: 'Aké prechody medzi polohami ma lákajú',
      moznosti: [
        { v: 'plynule', label: 'Plynulé otočenie bez straty rytmu' },
        { v: 'nahle', label: 'Náhla zmena ako výbuch energie' },
        { v: 'partner_vedie', label: 'Partner/ka ma presunie a prevezme vedenie' },
        { v: 'ja_vediem', label: 'Ja určím ďalšiu polohu a tempo' },
        { v: 'striedanie_kontroly', label: 'S každou polohou sa zmení, kto vedie' },
        { v: 'pauza', label: 'Medzi polohami krátka pauza na bozky a dotyky' },
      ],
    },
    {
      druh: 'otazka', id: 'kla_energia_poloh', typ: 'viac', inePovolene: true,
      text: 'Akú energiu chcem cez polohy vytvárať',
      moznosti: [
        { v: 'ocny_kontakt', label: 'Jemnú intimitu a hlboký očný kontakt' },
        { v: 'odovzdanie', label: 'Pocit odovzdania a vedenia druhou osobou' },
        { v: 'dominancia', label: 'Dynamickú dominanciu a pevné držanie' },
        { v: 'kontrola_hore', label: 'Kontrolu osoby, ktorá je hore' },
        { v: 'hlbka', label: 'Hĺbku a silné pohyby' },
        { v: 'hravost', label: 'Hravé skúšanie nábytku a nových uhlov' },
      ],
    },
    {
      druh: 'text', id: 'kla_dynamika_info', nadpis: 'Poloha mení viac než uhol', ton: 'info',
      telo:
        'Zozadu a v stoji sa ľahko vytvára dravá energia, pevný stisk bokov a väčší rozsah pohybu. Lyžičky či misionárska poloha podporujú pomalé tempo, dlhý dotyk a pohľad. ' +
        'Poloha hore dáva jednej osobe kontrolu nad uhlom a rytmom; plynulý prechod môže túto kontrolu vymeniť bez toho, aby sa stratilo napätie.',
    },
    {
      druh: 'otazka', id: 'kla_obluba', typ: 'jeden',
      text: 'Ktorá poloha je pre mňa „tá najlepšia" na orgazmus',
      moznosti: [
        { v: 'misionar', label: 'Misionárska' },
        { v: 'zozadu', label: 'Zozadu' },
        { v: 'zena_hore', label: 'Žena hore' },
        { v: 'bok', label: 'Na boku' },
        { v: 'ina', label: 'Iná / závisí' },
        { v: 'nie_pri_penetracii', label: 'Orgazmus mám skôr mimo penetrácie' },
      ],
    },
  ],
}

// ── Orálne a nepenetratívne polohy ──────────────────────────────────
const ORALNE: Blok = {
  druh: 'skupina', id: 'oralne', nadpis: 'Orálne a nepenetratívne polohy',
  bloky: [
    {
      druh: 'otazka', id: 'ora_69', typ: 'jeden',
      text: '69 (súčasný vzájomný orál) — ktorá verzia mi je komfortná',
      moznosti: [
        { v: 'bok', label: 'Z boku' },
        { v: 'stoh', label: '„Stoh" — jeden na druhom' },
        { v: 'nie', label: 'Radšej nie — nerovnaká pozornosť je pre mňa lepšia' },
      ],
    },
    {
      druh: 'text', id: 'ora_69_info', nadpis: '69 — prečo a ako', ton: 'info',
      telo:
        'Výhoda: obaja dávate aj dostávate naraz, veľmi vizuálne a intímne. Nevýhoda: ťažko sa sústrediť na oboje — preto veľa párov 69 používa ako predohru a finále dokončí inak.\n\n' +
        'Tipy: na boku (hlava na stehne partnera) šetrí krk; ten hore riadi hĺbku a tempo; striedajte sa — chvíľu len jeden dáva, druhý si užíva. ' +
        'Pri väčšom rozdiele výšky vankúš pod hlavu toho dole.',
    },
    {
      druh: 'otazka', id: 'ora_69_ako', typ: 'viac',
      text: '69 — čo mi vyhovuje',
      moznosti: [
        { v: 'predohra', label: 'Ako predohra' },
        { v: 'az_do_konca', label: 'Až do orgazmu' },
        { v: 'striedanie', label: 'Striedanie: chvíľu dávam, chvíľu dostávam' },
        { v: 's_prstami', label: 'S prstami / hračkou' },
        { v: 'anal_pristup', label: 'S prístupom k zadku (anilingus, prst)' },
      ],
    },
    p('ora_facesitting_pristup', 'Pri face-sittingu chcem mať voľné ruky na doplnkovú stimuláciu'),
    p('ora_tribbing', 'Polohy pre trenie tiel (tribbing/dry-humping) cez oblečenie aj bez neho ma lákajú'),
  ],
}

// ── Poloha × anál, hrádza, prostata ──────────────────────────────────
const ANAL: Blok = {
  druh: 'skupina', id: 'anal', nadpis: 'Poloha × anál, hrádza, prostata',
  bloky: [
    {
      druh: 'otazka', id: 'ana_ktore', typ: 'viac',
      text: 'Ktoré polohy mi vyhovujú pri análnej/prostatickej stimulácii',
      moznosti: [
        { v: 'na_styroch', label: 'Na štyroch / s vankúšom pod bokmi' },
        { v: 'bok', label: 'Na boku — jemnejšie tempo, viac kontroly' },
        { v: 'okraj_postele', label: 'Zozadu pri okraji postele — stabilita' },
      ],
    },
    {
      druh: 'text', id: 'ana_cross_clean', ton: 'vystraha',
      telo: 'Bez ohľadu na polohu platí: anus → vagína nikdy bez výmeny ochrany alebo umytia.',
    },
  ],
}

// ── Poloha × prístup pre ruky/ústa a hračky ───────────────────────────
const PRISTUP_HRACKY: Blok = {
  druh: 'skupina', id: 'pristup_hracky', nadpis: 'Poloha × prístup pre ruky/ústa a hračky',
  bloky: [
    {
      druh: 'otazka', id: 'pri_klitoris', typ: 'viac',
      text: 'V ktorých polohách chcem mať najľahší prístup ku klitorisu/bradavkám počas penetrácie',
      moznosti: [
        { v: 'misionar', label: 'Misionár' },
        { v: 'cowgirl', label: 'Cowgirl' },
        { v: 'okraj_postele', label: 'Okraj postele' },
      ],
    },
    {
      druh: 'otazka', id: 'pri_hracka', typ: 'jeden',
      text: 'Mini-vibrátor alebo párová hračka počas polohy',
      moznosti: [
        { v: 'ano_ja', label: 'Áno, ovládam ju ja' },
        { v: 'ano_partner', label: 'Áno, ovláda ju partner/ka' },
        { v: 'nie', label: 'Nie, radšej bez toho' },
      ],
    },
  ],
}

// ── Poloha × prostredie ────────────────────────────────────────────
const PROSTREDIE: Blok = {
  druh: 'skupina', id: 'prostredie', nadpis: 'Poloha × prostredie',
  bloky: [
    {
      druh: 'otazka', id: 'pro_miesto', typ: 'viac',
      text: 'Kde mi dané polohy fungujú najlepšie',
      moznosti: [
        { v: 'sprcha_vana', label: 'Sprcha / vaňa (proti stene, opory)' },
        { v: 'gauc', label: 'Gauč / podlaha pri krbe' },
        { v: 'pult', label: 'Kuchynský pult / stôl' },
        { v: 'auto', label: 'Auto — rýchle, diskrétne' },
      ],
    },
  ],
}

// ── Variácie pre rozdiely tela a komfort ──────────────────────────────
const VARIACIE: Blok = {
  druh: 'skupina', id: 'variacie', nadpis: 'Variácie pre rozdiely tela a komfort',
  bloky: [
    { druh: 'otazka', id: 'var_adaptacie', typ: 'text', text: 'Ktoré nastavenia znižujú námahu na chrbát/bedrá/kolená (vankúše, výška, uhol):' },
    p('var_citlive_miesta', 'Pri niektorých polohách mám citlivé/bolestivé miesta a potrebujem menší rozsah pohybu'),
    p('var_senzorika', 'Senzorika (svetlo, hudba, páska na oči) mi v konkrétnej polohe zosilňuje alebo tlmí vnímanie'),
  ],
}

// ── Praktické pohodlie a dozvuk ──────────────────────────────────────
const BEZPECNOST: Blok = {
  druh: 'skupina', id: 'bezpecnost', nadpis: 'Praktické pohodlie a dozvuk',
  bloky: [
    { druh: 'otazka', id: 'bez_lub', typ: 'jeden', text: 'Kedy mi lubrikant pri polohách zlepšuje zážitok',
      moznosti: [
        { v: 'ano', label: 'Takmer vždy — chcem plynulejšie pohyby' },
        { v: 'niektore', label: 'Pri niektorých polohách, tempe alebo dlhšom trvaní' },
        { v: 'nie', label: 'Zvyčajne nepotrebujem' },
      ],
    },
    {
      druh: 'otazka', id: 'bez_aftercare', typ: 'viac',
      text: 'Čo mi sadne po fyzicky náročnejšej polohe alebo dlhšom tempe',
      moznosti: [
        { v: 'napoj', label: 'Nápoj' },
        { v: 'prikrytie', label: 'Prikrytie' },
        { v: 'debrief', label: '„2+2" debrief' },
      ],
    },
  ],
}

// ── Mýty a tipy ─────────────────────────────────────────────────────
const MYTY: Blok = {
  druh: 'text', id: 'myty', nadpis: 'Mýty a tipy', ton: 'info',
  telo:
    'Mýtus: „Dobrý sex = veľa polôh." — Realita: väčšina párov má 2–4 obľúbené a mení malé detaily (uhol, vankúš, nohy). To stačí.\n\n' +
    'Mýtus: „Žena má mať orgazmus z penetrácie v každej polohe." — Realita: väčšina žien potrebuje pri penetrácii aj klitoris. Poloha, kde je voľná ruka alebo hračka, je často ta pravá.\n\n' +
    'Tipy: vankúš pod panvu pri misionárskej zmení uhol na G-bod; pri „zozadu" nech žena zníži hrudník k posteli; pri žene hore nech sa skôr kĺže dopredu-dozadu než skáče. ' +
    'Prechod medzi polohami nemusí prerušiť rytmus — otočte sa bez vytiahnutia (misionár → na boku → ona hore).',
}

// ── Žena hore — čo môže robiť ────────────────────────────────────────
// Zdroj: xlsm nadpis „Možnosti sebarealizácie ženy (Čo môžeš robiť hore)" bez
// obsahu — dotvorené.
const ZENA_HORE: Blok = {
  druh: 'skupina', id: 'zena_hore', nadpis: 'Žena hore — čo sa dá robiť',
  uvod: 'Keď je žena hore, riadi uhol, hĺbku aj tempo — je to najjednoduchšia cesta, ako si vziať presne to, čo potrebuje.',
  bloky: [
    {
      druh: 'otazka', id: 'zh_pohyby', typ: 'viac', inePovolene: true,
      text: g('Čo chcem, aby robila, keď je hore', 'Čo rada robím, keď som hore'),
      moznosti: [
        { v: 'grinding', label: 'Kĺzanie dopredu-dozadu (grinding) — klitoris o jeho telo' },
        { v: 'skakanie', label: 'Skákanie hore-dole' },
        { v: 'kruzenie', label: 'Krúženie panvou' },
        { v: 'predklon', label: 'Predklon — prsia pri jeho tvári, bozky' },
        { v: 'zaklon', label: 'Záklon — ruky opreté o jeho stehná' },
        { v: 'drep', label: 'Drep na chodidlách — hlbšie a intenzívnejšie' },
        { v: 'dotyk_seba', label: 'Dotýkanie sa klitorisu / pŕs počas jazdy' },
        { v: 'teasing', label: 'Dráždenie — len špička dnu, pauzy, zastavenie tesne pred' },
        { v: 'otocenie', label: 'Otočenie chrbtom (reverse) bez vytiahnutia' },
        { v: 'drzat_ruky', label: 'Pridržať mu ruky nad hlavou' },
      ],
    },
    {
      druh: 'otazka', id: 'zh_on', typ: 'viac',
      text: g('Čo pri tom rád robím ja zdola', 'Čo chcem, aby pri tom robil zdola'),
      moznosti: [
        { v: 'boky', label: 'Držať za boky a udávať rytmus' },
        { v: 'prsia', label: 'Hladkať a stláčať prsia' },
        { v: 'klitoris', label: 'Palcom na klitoris' },
        { v: 'zadok', label: 'Chytiť za zadok / plesknúť' },
        { v: 'prirazat', label: 'Prirážať zdola' },
        { v: 'nic', label: 'Nič — len sa pozerať a nechať ju' },
      ],
    },
    p('zh_hanba', g('Partnerka sa hore niekedy hanbí za svoje telo alebo „výkon"', 'Hore sa niekedy hanbím za svoje telo alebo „výkon"')),
    {
      druh: 'text', id: 'zh_tipy', ton: 'info',
      telo:
        'Mýtus: „Hore musím divoko skákať ako v porne." — Realita: väčšine žien prinesie viac pomalé kĺzanie s tlakom klitorisu; skákanie unaví stehná za pár minút. ' +
        'Mýtus: „Zdola vidí každý môj záhyb." — Realita: muži opisujú pohľad na ženu hore ako jeden z najvzrušujúcejších vôbec — nevidia „nedostatky", vidia ju. ' +
        'Tip: ruky oprieť o jeho hruď alebo čelo postele, vankúš pod jeho zadok zmení uhol.',
    },
  ],
}

// ── Experimentovanie a náročnejšie polohy ────────────────────────────
// Zdroj: xlsm P49389 („chýbajú otázky na experimentovanie s polohami alebo
// náročnejšími praktikami"). Obsah dotvorený.
const EXPERIMENT: Blok = {
  druh: 'skupina', id: 'experiment', nadpis: 'Experimentovanie a náročnejšie polohy',
  bloky: [
    {
      druh: 'otazka', id: 'exp_ochota', typ: 'jeden',
      text: 'Ako sa staviam ku skúšaniu nových polôh',
      moznosti: [
        { v: 'milujem', label: 'Milujem to — čím viac nového, tým lepšie' },
        { v: 'obcas', label: 'Občas niečo nové, inak osvedčené' },
        { v: 'ked_partner', label: 'Ak to navrhne partner/ka, idem do toho' },
        { v: 'osvedcene', label: 'Radšej ostávam pri osvedčených' },
      ],
    },
    {
      druh: 'otazka', id: 'exp_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré náročnejšie polohy ma lákajú',
      moznosti: [
        { v: 'lotos', label: 'Lotos — sedíme tvárou k sebe, prepletení' },
        { v: 'zdvihnuta', label: 'Žena zdvihnutá v náručí / nohy okolo pása' },
        { v: 'stoj_zozadu', label: 'V stoji zozadu, predklon' },
        { v: 'noha_na_rameni', label: 'Noha na ramene / nohy vysoko' },
        { v: 'kovadlina', label: 'Kolená k hrudi („zložená")' },
        { v: 'okraj_nabytku', label: 'Cez okraj stola, pultu, operadla gauča' },
        { v: 'schody', label: 'Na schodoch' },
        { v: 'stolicka', label: 'Na stoličke / v kresle' },
        { v: 'mostik', label: 'Mostík, záklon, akrobatické polohy' },
        { v: 'kamasutra', label: 'Polohy z Kámasútry podľa obrázkov' },
      ],
    },
    p('exp_pomocky', 'Pomôcky na polohy — klin/vankúš, hojdačka, popruhy na dvere'),
    p('exp_zrkadlo', 'Polohy pred zrkadlom, aby sme sa videli'),
    p('exp_vyzva', 'Hra typu „každý týždeň jedna nová poloha" / kocky / karty s polohami'),
    p('exp_narocne', 'Fyzicky náročné polohy, pri ktorých sa zapotíme a ide o výkon'),
    {
      druh: 'otazka', id: 'exp_brzdy', typ: 'viac', inePovolene: true,
      text: 'Čo ma pri nových polohách brzdí',
      moznosti: [
        { v: 'kondicia', label: 'Kondícia, sila, ohybnosť' },
        { v: 'vyska', label: 'Rozdiel vo výške / váhe' },
        { v: 'smiesnost', label: 'Pocit, že budem vyzerať smiešne' },
        { v: 'strata_rytmu', label: 'Prerušenie rytmu a vzrušenia pri prechode' },
        { v: 'nic', label: 'Nič' },
      ],
    },
  ],
}

// ── Top 3 na najbližší mesiac ───────────────────────────────────────
const TOP3: Blok = {
  druh: 'skupina', id: 'top3', nadpis: 'Top 3 polohy na najbližší mesiac',
  bloky: [
    { druh: 'otazka', id: 'top_zoznam', typ: 'text', text: 'Moje top 3 polohy, ktoré by som chcel(a) v najbližšom čase (znova) vyskúšať, a prečo:' },
  ],
}

export const POLOHY: TemaObsah = {
  slug: 'polohy/polohy',
  nadpis: 'Polohy',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Poloha nie je len o fyzike',
      telo:
        'Poloha určuje mieru prepojenia, kontroly, prístupu k doplnkovej stimulácii aj to, kto vedie tempo. ' +
        'Táto téma mapuje, ktoré polohy fungujú a prečo — nie techniku samotnú.',
    },
  ],
  telo: [
    RAMEC,
    MYTY,
    KLASICKE,
    ZENA_HORE,
    ORALNE,
    ANAL,
    PRISTUP_HRACKY,
    PROSTREDIE,
    EXPERIMENT,
    VARIACIE,
    BEZPECNOST,
    TOP3,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
