import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Erotické pomôcky a hračky — modul E1 „Vibrátory a stimulátory".
// Zdroj: „zdroj.docx" (sekcia Erotické pomôcky a hračky — katalóg). Vibrátory,
// dildá, análne, penisové a párové, DP, BDSM pomôcky, lubrikanty. z/m zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

const VIBRATORY: Blok = {
  druh: 'skupina', id: 'vibratory', nadpis: 'Vibrátory',
  bloky: [
    {
      druh: 'otazka', id: 'vib_klit', typ: 'viac', inePovolene: true,
      text: 'Klitorálne vibrátory',
      moznosti: [
        { v: 'bullet', label: 'Bullet (malý bodový)' },
        { v: 'na_vulvu', label: 'Na priloženie k vulve' },
        { v: 'kralik', label: 'Tvarované stimulátory („králik")' },
        { v: 'air_pulse', label: 'Saco-tlakové / air-pulse' },
        { v: 'musle', label: 'Vibračné mušle (diskrétne pod bielizeň)' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_vag', typ: 'viac',
      text: 'Vaginálne vibrátory',
      moznosti: [
        { v: 'rovny', label: 'Klasický rovný' },
        { v: 'g_bod', label: 'Zakrivený na G-bod' },
        { v: 'dlhy', label: 'Dlhší na hĺbku' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_komb', typ: 'viac',
      text: 'Kombinované',
      moznosti: [
        { v: 'rabbit', label: 'Rabbit (vagína + klitoris)' },
        { v: 'dvojite', label: 'Dvojité pre súčasnú stimuláciu' },
        { v: 'hradza', label: 'Na masáž hrádze' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_nositelne', typ: 'viac',
      text: 'Nositeľné',
      moznosti: [
        { v: 'nohavicky', label: 'Vibračné nohavičky s diaľkovým ovládaním' },
        { v: 'vajicko', label: 'Mini vibračné vajíčko' },
      ],
    },
    {
      druh: 'otazka', id: 'vib_pouzitie', typ: 'viac',
      text: 'Použitie',
      moznosti: [
        { v: 'solo', label: 'Sólo' },
        { v: 'partner_ovlada', label: 'Partner ovláda' },
        { v: 'penetracia', label: 'Počas penetrácie (medzi telami)' },
        { v: 'oral', label: 'Počas orálu' },
        { v: 'hands_free', label: '„Hands-free"' },
      ],
    },
    p('vib_intenzita', 'Vysoká intenzita / air-pulse (silné podnety)'),
  ],
}

const DILDA: Blok = {
  druh: 'skupina', id: 'dilda', nadpis: 'Dildá',
  bloky: [
    {
      druh: 'otazka', id: 'dil_typy', typ: 'viac', inePovolene: true,
      text: 'Typy',
      moznosti: [
        { v: 'silikon', label: 'Silikónové' },
        { v: 'sklo', label: 'Sklenené (chlad, hladkosť)' },
        { v: 'kov', label: 'Kovové' },
        { v: 'realisticke', label: 'Realistické tvary' },
        { v: 'texturovane', label: 'Textúrované / žilkovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_specialne', typ: 'viac',
      text: 'Špeciálne tvary',
      moznosti: [
        { v: 'dvojite', label: 'Dvojité (double-ended)' },
        { v: 'dp', label: 'Pre dvojitú penetráciu' },
        { v: 'gp_bod', label: 'Zakrivené na G-bod / P-bod' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_velkost', typ: 'jeden',
      text: 'Veľkosť',
      moznosti: [
        { v: 'male', label: 'Malé' },
        { v: 'stredne', label: 'Stredné' },
        { v: 'velke', label: 'Veľké' },
        { v: 'size_play', label: '„Size play" ako fantázia' },
        { v: 'progresia', label: 'Postupné zväčšovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'dil_strapon', typ: 'jeden',
      text: 'Strap-on',
      moznosti: [
        { v: 'pegging', label: 'Pegging — ona penetruje jeho' },
        { v: 'ona_ju', label: 'Ona penetruje ju' },
        { v: 'bezremenove', label: 'Bezremeňové / „strapless"' },
        { v: 'nezaujima', label: 'Nezaujíma ma' },
      ],
    },
  ],
}

const ANALNE: Blok = {
  druh: 'skupina', id: 'analne', nadpis: 'Análne hračky',
  bloky: [
    {
      druh: 'otazka', id: 'an_koliky', typ: 'viac',
      text: 'Kolíky',
      moznosti: [
        { v: 'male', label: 'Malé pre začiatočníkov' },
        { v: 'vibracne', label: 'Vibračné' },
        { v: 'chvostik', label: 'S chvostíkom' },
        { v: 'nositelne', label: 'Nositeľné (krátke intervaly)' },
      ],
    },
    {
      druh: 'otazka', id: 'an_koralky', typ: 'jeden',
      text: 'Análne korálky — kedy vytiahnuť',
      moznosti: [
        { v: 'vydych', label: 'Na výdych' },
        { v: 'vyvrcholenie', label: 'Pri vyvrcholení' },
        { v: 'nezaujem', label: 'Nezáujem' },
      ],
    },
    p('an_dilda', 'Análne dildá zakrivené na prostatu'),
    {
      druh: 'otazka', id: 'an_prostaticke', typ: 'jeden',
      text: 'Prostatické stimulátory (anatomické, vibračné)',
      podmienka: { pohlavie: 'm' },
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'an_kombinacie', typ: 'viac',
      text: 'Kombinácie',
      moznosti: [
        { v: 'pocas_piv', label: 'Análny kolík počas vaginálnej penetrácie' },
        { v: 'vibrator', label: 'Dvojitá stimulácia s vibrátorom' },
        { v: 'oral', label: 'Plug počas orálu' },
      ],
    },
    {
      druh: 'otazka', id: 'an_bezpecnost', typ: 'viac',
      text: 'Bezpečnosť',
      moznosti: [
        { v: 'zakladna', label: 'VŽDY základňa / stoper' },
        { v: 'lub', label: 'Veľa lubrikantu' },
        { v: 'cistenie', label: 'Čistenie medzi použitiami' },
        { v: 'kondom', label: 'Kondóm na hračke pri zdieľaní' },
      ],
    },
  ],
}

const PENISOVE: Blok = {
  druh: 'skupina', id: 'penisove', nadpis: 'Penisové a párové pomôcky',
  bloky: [
    {
      druh: 'otazka', id: 'pen_kruzky', typ: 'viac',
      text: 'Erekčné krúžky',
      moznosti: [
        { v: 'erekcia', label: 'Na udržanie erekcie' },
        { v: 'vibracia', label: 'S vibráciou pre partnerku' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_masturbatory', typ: 'viac',
      text: 'Masturbátory',
      moznosti: [
        { v: 'umela_vagina', label: 'Umelá vagína (napr. Fleshlight)' },
        { v: 'textura', label: 'S textúrou' },
        { v: 'rukavy', label: 'Vibračné rukávy' },
      ],
    },
    {
      druh: 'otazka', id: 'pen_navleky', typ: 'jeden',
      text: 'Návleky na penis',
      moznosti: [
        { v: 'objem', label: 'Na zväčšenie objemu' },
        { v: 'textura', label: 'Textúry pre stimuláciu partnerky' },
        { v: 'nezaujima', label: 'Nezaujíma ma' },
      ],
    },
    p('pen_parove_vibr', 'Párový vibrátor (tvar U) nosený počas penetrácie'),
  ],
}

const DP: Blok = {
  druh: 'skupina', id: 'dp', nadpis: 'Dvojitá penetrácia (DP)',
  bloky: [
    p('dp_postoj', 'Dvojitá penetrácia (penis + hračka: anál + vagína, prípadne dve v jednej oblasti)'),
    {
      druh: 'otazka', id: 'dp_konfig', typ: 'viac',
      text: 'Konfigurácia',
      moznosti: [
        { v: 'vagina_anal', label: 'Penis vo vagíne + vibrátor v anále' },
        { v: 'anal_vagina', label: 'Penis v anále + vibrátor vo vagíne' },
        { v: 'dve_hracky', label: 'Dve hračky' },
      ],
    },
    {
      druh: 'otazka', id: 'dp_priprava', typ: 'viac',
      text: 'Príprava',
      moznosti: [
        { v: 'rozsirenie', label: 'Rozšírenie otvorov pred aktom' },
        { v: 'lub', label: 'Veľa lubrikantu' },
        { v: 'koordinacia', label: 'Koordinácia pohybov' },
        { v: 'pomaly', label: 'Pomaly, s pauzami' },
      ],
    },
  ],
}

const BDSM_POMOCKY: Blok = {
  druh: 'skupina', id: 'bdsm_pomocky', nadpis: 'BDSM pomôcky',
  uvod: 'Detailná téma je „BDSM a mocenská dynamika" — tu len či nás pomôcky lákajú.',
  bloky: [
    {
      druh: 'otazka', id: 'bdsm_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomôcky ma lákajú',
      moznosti: [
        { v: 'kovove_puta', label: 'Kovové putá' },
        { v: 'manzety', label: 'Kožené manžety' },
        { v: 'zavesne', label: 'Závesné obmedzovače' },
        { v: 'lana', label: 'Laná na shibari' },
        { v: 'pasky', label: 'Bondážne pásky (nelepivé)' },
        { v: 'vak', label: 'Bondážny vak' },
        { v: 'flogger', label: 'Flogger' },
        { v: 'placacka', label: 'Plácačka / paddle' },
        { v: 'prut', label: 'Prút / trstica' },
        { v: 'gag', label: 'Gag / náhubok' },
        { v: 'nakrcnik', label: 'Nákrčník a vodítko' },
      ],
    },
  ],
}

const LUBRIKANTY: Blok = {
  druh: 'skupina', id: 'lubrikanty', nadpis: 'Lubrikanty a doplnky',
  bloky: [
    {
      druh: 'otazka', id: 'lub_typ', typ: 'viac',
      text: 'Typy lubrikantu',
      moznosti: [
        { v: 'vodny', label: 'Vodný (univerzál)' },
        { v: 'silikon', label: 'Silikónový (nie na silikónové hračky)' },
        { v: 'hybrid', label: 'Hybridný' },
        { v: 'hrejivy', label: 'Hrejivý / chladivý' },
        { v: 'analny', label: 'Análny (hustejší)' },
        { v: 'ochuteny', label: 'Ochutený (na orál)' },
      ],
    },
    {
      druh: 'otazka', id: 'lub_ine', typ: 'viac',
      text: 'Doplnky',
      moznosti: [
        { v: 'ekologicke', label: 'Ekologické pomôcky a lubrikanty' },
        { v: 'svieca', label: 'Masážne sviečky' },
        { v: 'uterak', label: 'Uterák / podložka' },
      ],
    },
  ],
}

const KONTEXT: Blok = {
  druh: 'skupina', id: 'kontext', nadpis: 'Kto ovláda a kontext',
  bloky: [
    {
      druh: 'otazka', id: 'kto_ovlada', typ: 'jeden',
      text: 'Kto ovláda hračku',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    {
      druh: 'otazka', id: 'kedy', typ: 'viac',
      text: 'Kedy',
      moznosti: [
        { v: 'solo', label: 'Sólo' },
        { v: 'spolu', label: 'Spolu' },
        { v: 'penetracia', label: 'Počas penetrácie' },
        { v: 'oral', label: 'Počas orálu' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const POMOCKY_HRACKY: TemaObsah = {
  slug: 'vibratory-stimulatory/vibratory-stimulatory',
  nadpis: 'Erotické pomôcky a hračky',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'prehlad', nadpis: 'Prehľad',
      telo:
        'Hračky, doplnky a pomôcky pre páry aj jednotlivcov — výber, kombinovanie a bezpečné používanie. ' +
        'Vibrátory, dildá, análne hračky, penisové a párové pomôcky, BDSM pomôcky, lubrikanty.',
    },
    {
      druh: 'text', id: 'bezpecnost', nadpis: 'Bezpečnosť a hygiena', ton: 'info',
      telo:
        'Materiál (silikón / sklo / kov) a kompatibilita s lubrikantom — silikónový lub nie na silikónové hračky. ' +
        'Čistenie po každom použití, kondóm na hračke pri zdieľaní. Análne hračky VŽDY so základňou / stopérom. ' +
        'Análne → vaginálne nikdy bez výmeny ochrany.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Ktoré kategórie pomôcok ťa lákajú?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'vibratory', label: 'Vibrátory' },
        { v: 'dilda', label: 'Dildá' },
        { v: 'analne', label: 'Análne hračky' },
        { v: 'penisove', label: 'Penisové a párové pomôcky' },
        { v: 'dp', label: 'Dvojitá penetrácia' },
        { v: 'bdsm', label: 'BDSM pomôcky' },
        { v: 'ziadne', label: 'Zatiaľ nič konkrétne — som zvedavý/á' },
      ],
    },
    VIBRATORY,
    DILDA,
    ANALNE,
    PENISOVE,
    DP,
    BDSM_POMOCKY,
    LUBRIKANTY,
    KONTEXT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
