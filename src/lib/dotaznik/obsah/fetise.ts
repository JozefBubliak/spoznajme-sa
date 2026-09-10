import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Fetiše a špecifické záujmy — modul G3 „Telesné tekutiny a prirodzenosť".
// Zdroj: „21_Fetise" (checklist materiálov/častí tela + hlboký ponor do
// telesných tekutín + situačné fetiše). Zjednotené, každá odlišná otázka
// zachovaná. z/m verzia zrkadlová (rovnaké id + hodnoty).
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
const p = (id: string, text: TemaObsah['nadpis'], podmienka?: Podmienka): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, ...(podmienka ? { podmienka } : {}),
})

const VYZNAM: Moznost[] = [
  { v: 'prirodzenost', label: 'Prirodzenosť a spontánnosť' },
  { v: 'dovera', label: 'Dôvera a intimita' },
  { v: 'moc', label: 'Dominancia a submisivita' },
  { v: 'estetika', label: 'Estetika, vôňa, vizuál' },
]

// ── Telesné tekutiny ─────────────────────────────────────────────────────
const SLINY: Blok = {
  druh: 'skupina', id: 'sliny', nadpis: 'Sliny',
  uvod: 'Od prirodzeného lubrikantu po symbol dominancie, submisivity a dôvery. Ich teplo a vlhkosť spájajú intimitu s erotikou.',
  bloky: [
    p('sliny_lubrikant', 'Sliny ako prirodzený lubrikant (partner nimi zvlhčí intímne miesta, pľuvne na prsty a stimuluje)'),
    p('sliny_na_telo', 'Pľuvanie na telo (prsia, brucho, genitálie) a rozotieranie'),
    p('sliny_do_ust', 'Pľuvanie do úst (chytenie za bradu, očný kontakt)'),
    p('sliny_bozk', 'Intenzívne zdieľanie slín počas bozkávania'),
    p('sliny_kombinacia', 'Kombinácia slín s inými tekutinami (semeno, vaginálna vlhkosť)'),
    { druh: 'otazka', id: 'sliny_vyznam', typ: 'viac', text: 'Čo je pre mňa na slinách vzrušujúce', moznosti: VYZNAM },
  ],
}

const SEMENO: Blok = {
  druh: 'skupina', id: 'semeno', nadpis: 'Semeno',
  uvod: 'Symbol túžby a splynutia — zmyslový zážitok (chuť, teplo, konzistencia, vôňa), dôkaz vzrušenia, prvok moci alebo odovzdania.',
  bloky: [
    {
      druh: 'otazka', id: 'semeno_na_telo', typ: 'viac', inePovolene: true,
      text: 'Ejakulácia na telo — kam je to v poriadku',
      moznosti: [
        { v: 'tvar', label: 'Tvár („facial")' },
        { v: 'prsia', label: 'Prsia a bradavky' },
        { v: 'brucho', label: 'Brucho a stehná' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'nikam', label: 'Nikam na telo' },
      ],
    },
    p('semeno_prehltanie', 'Prehĺtanie semena ako súčasť orálneho rituálu'),
    p('semeno_snowballing', '„Snowballing" — predávanie semena ústami späť partnerovi'),
    p('semeno_ocistenie', 'Orálne očistenie po ejakulácii (penis / vagína jazykom)'),
    p('semeno_lubrikant', 'Semeno rozotreté ako lubrikant (klitoris, hrádza)'),
    p('semeno_bielizen', 'Semeno na spodnej bielizni ako pripomienka / vôňa'),
    p('semeno_kombinacia', 'Kombinácia semena so slinami a vaginálnou vlhkosťou („koktail")'),
    { druh: 'otazka', id: 'semeno_vyznam', typ: 'viac', text: 'Čo je pre mňa na semene vzrušujúce', moznosti: VYZNAM },
    {
      druh: 'otazka', id: 'semeno_chut', typ: 'text',
      text: 'Komfort s chuťou — čo pomáha (napr. ovocie, veľa vody) / čo je mimo:',
    },
  ],
}

const VLHKOST: Blok = {
  druh: 'skupina', id: 'vlhkost', nadpis: 'Vaginálna vlhkosť',
  uvod: 'Jeden z najpravdivejších prejavov vzrušenia — nedá sa predstierať ani potlačiť. Pre niekoho jemný symbol dôvery, pre iného surový a dráždivý.',
  bloky: [
    p('vlhkost_ochutnat', 'Partner ju ochutná priamo, bez bariér a hanby'),
    p('vlhkost_rozotieranie', 'Rozotieranie po perách, tele alebo bradavkách'),
    p('vlhkost_ponuknut', g('Vedome sa mi partnerka ponúkne, aby som ochutnal', 'Vedome sa partnerovi ponúknem, aby ochutnal')),
    p('vlhkost_kombinacia', 'Kombinácia s inými tekutinami počas hry'),
  ],
}

const MOC: Blok = {
  druh: 'skupina', id: 'moc_tek', nadpis: 'Moč (watersports)',
  uvod: 'Len pri vzájomnom súhlase. Rizikovejšia oblasť — hydratácia, hygiena, nie na rany/tvár bez dohody.',
  bloky: [
    {
      druh: 'otazka', id: 'moc_uroven', typ: 'jeden',
      text: 'Kde som s „watersports"?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia / „talk"' },
        { v: 'mozno', label: 'Možno, za jasných podmienok' },
        { v: 'ano', label: 'Áno, s podmienkami' },
        { v: 'nie', label: 'Nie — hranica' },
      ],
    },
    {
      druh: 'otazka', id: 'moc_kam', typ: 'viac',
      text: 'Ak áno — kam je to v poriadku',
      podmienka: { ot: 'moc_uroven', jeNiektora: ['mozno', 'ano'] },
      moznosti: [
        { v: 'telo', label: 'Na telo' },
        { v: 'v_sprche', label: 'Len v sprche / vani' },
        { v: 'genital', label: 'Na genitálie' },
        { v: 'tvar', label: 'Na tvár' },
        { v: 'usta', label: 'Do úst' },
      ],
    },
    { druh: 'otazka', id: 'moc_podmienky', typ: 'text', text: 'Moje podmienky (hydratácia, hygiena, miesto):', podmienka: { ot: 'moc_uroven', jeNiektora: ['mozno', 'ano'] } },
  ],
}

const SLZY: Blok = {
  druh: 'skupina', id: 'slzy', nadpis: 'Slzy a emočné výlevy',
  bloky: [
    p('slzy_zranitelnost', 'Fetiš na zraniteľnosť — vidieť / prejaviť emóciu a slzy počas intimity'),
    p('slzy_scena', 'Slzy počas intenzívnej scény ako uvoľnenie / katarzia'),
  ],
}

const MENSTRUACIA: Blok = {
  druh: 'skupina', id: 'menstruacia', nadpis: 'Menštruačná krv',
  bloky: [
    p('men_sex', 'Sex počas menštruácie'),
    p('men_periodplay', '„Period play" — vedomá hra s menštruačnou krvou'),
  ],
}

// ── Oblečenie a materiály ───────────────────────────────────────────────
const MATERIALY: Blok = {
  druh: 'skupina', id: 'materialy', nadpis: 'Oblečenie a materiály',
  bloky: [
    {
      druh: 'otazka', id: 'mat_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré materiály a kúsky ma priťahujú',
      moznosti: [
        { v: 'latex', label: 'Latex / guma' },
        { v: 'pvc', label: 'PVC / vinyl' },
        { v: 'koza', label: 'Koža (korzet, postroj, rukavice)' },
        { v: 'hodvab', label: 'Hodváb / satén' },
        { v: 'cipka', label: 'Čipka' },
        { v: 'pancuchy', label: 'Nylóny / pančuchy / podväzky' },
        { v: 'kozusina', label: 'Kožušina' },
        { v: 'opatky', label: 'Vysoké opätky' },
        { v: 'rukavicky', label: 'Rukavičky' },
        { v: 'uniformy', label: 'Uniformy' },
        { v: 'bielizen', label: 'Erotická bielizeň' },
      ],
    },
    {
      druh: 'otazka', id: 'mat_kto_nosi', typ: 'jeden',
      text: 'Kto to má nosiť',
      moznosti: [
        { v: 'ja', label: 'Ja' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'oboje', label: 'Oboje' },
        { v: 'striedavo', label: 'Podľa nálady' },
      ],
    },
    p('mat_priliehave', 'Maznanie a dotyky cez priliehavé oblečenie (pocit materiálu na koži, vône latexu)'),
    p('mat_textilie_stimulacia', 'Prechádzanie hodvábom / textíliou po tele ako stimulácia'),
    p('mat_opatky_pocas', 'Nechať topánky / opätky / pančuchy počas aktu'),
  ],
}

// ── Časti tela a vzhľad ────────────────────────────────────────────────
const CASTI_TELA: Blok = {
  druh: 'skupina', id: 'casti_tela', nadpis: 'Časti tela a vzhľad',
  bloky: [
    p('foot_davam', 'Foot fetish — venovať pozornosť chodidlám partnera (masáž, bozky, olizovanie prstov)'),
    p('foot_dostavam', 'Foot fetish — keď partner venuje pozornosť mojim chodidlám'),
    {
      druh: 'otazka', id: 'ct_zony', typ: 'viac', inePovolene: true,
      text: 'Ktoré časti tela / prvky vzhľadu ma zvlášť priťahujú',
      moznosti: [
        { v: 'ruky', label: 'Ruky, prsty, nechty / manikúra' },
        { v: 'vlasy', label: 'Vlasy (ovinutie okolo ruky, vôňa, ťahanie)' },
        { v: 'brucho', label: 'Brucho a bedrá' },
        { v: 'zadok', label: 'Zadok — estetika' },
        { v: 'prsia', label: 'Prsia (non-nude)' },
        { v: 'okuliare', label: 'Okuliare' },
        { v: 'makeup', label: 'Makeup štýly' },
        { v: 'piercing', label: 'Piercing a tetovanie (obdivovanie, lízanie zdobených miest)' },
        { v: 'lesk', label: 'Lesk — olej na tele' },
        { v: 'metalicke', label: 'Metalické doplnky' },
        { v: 'bodypaint', label: 'Body paint' },
      ],
    },
  ],
}

// ── Vône a pach ───────────────────────────────────────────────────────
const VONE: Blok = {
  druh: 'skupina', id: 'vone', nadpis: 'Vône a prirodzený pach',
  bloky: [
    p('vona_prirodzena', 'Prirodzený pach tela a pohlavia ako afrodiziakum'),
    p('vona_parfum', 'Konkrétny parfum / vôňa ako súčasť hry'),
    {
      druh: 'otazka', id: 'nohavicky', typ: 'viac',
      text: 'Použité nohavičky — čo ma láka',
      moznosti: [
        { v: 'uchovanie', label: 'Uchovanie / nosenie pri sebe kvôli vôni' },
        { v: 'sniffing', label: 'Cítenie vône (sniffing)' },
        { v: 'na_tvar', label: 'Prikladanie na tvár počas predohry' },
        { v: 'ziadne', label: 'Nič z toho' },
      ],
    },
  ],
}

// ── Dirty talk, prosby a hlas ─────────────────────────────────────────
const DIRTY_TALK: Blok = {
  druh: 'skupina', id: 'dirty_talk', nadpis: 'Dirty talk, prosby a hlas',
  bloky: [
    p('dt_hruby', 'Hrubší slovník / vulgárne'),
    {
      druh: 'otazka', id: 'dt_urazky', typ: 'jeden',
      text: 'Sexuálne urážky / ponižovanie',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'za_podmienok', label: 'Len za jasných podmienok (presné slová dohodnúť)' },
        { v: 'nie', label: 'Nie — tvrdá hranica' },
      ],
    },
    p('dt_prosby', 'Prosby a pokorné reči'),
    p('dt_hlas', 'Fetiš na hlas — šepot, ASMR, pomalý hlas do ucha'),
    { druh: 'otazka', id: 'dt_mimo', typ: 'text', text: 'Presné slová / oslovenia, ktoré sú absolútne mimo:' },
  ],
}

// ── Voyeurizmus a exhibicionizmus ───────────────────────────────────
const VOYEUR: Blok = {
  druh: 'skupina', id: 'voyeur', nadpis: 'Voyeurizmus a exhibicionizmus',
  bloky: [
    p('vo_partner_solo', 'Sledovať partnera pri masturbácii / intímnej aktivite'),
    p('vo_iny_par', 'Sledovať iný pár pri sexe (klub, párty)'),
    p('vo_porno', 'Spoločné sledovanie erotických filmov ako predohra'),
    p('ex_partnerom', 'Byť sledovaný/á partnerom (erotický tanec, masturbácia)'),
    p('ex_inymi', 'Byť sledovaný/á inými pármi alebo divákmi počas intimity'),
    p('ex_semipublic', 'Diskrétne riziko odhalenia na verejnom mieste (auto, pláž, tmavá ulička)'),
    p('vo_natacanie', 'Natáčanie videí — len pre nás'),
  ],
}

// ── Roleplay a situačné prvky ──────────────────────────────────────
const ROLEPLAY: Blok = {
  druh: 'skupina', id: 'roleplay', nadpis: 'Roleplay a situačné prvky',
  bloky: [
    {
      druh: 'otazka', id: 'rp_spanok', typ: 'jeden',
      text: 'Predstieranie spánku / jemné dotyky „spiaceho" tela',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'za_podmienok', label: 'Len za jasných podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('rp_identita', 'Skrývanie identity — maska, zaviazané oči, „slepá dôvera"'),
    p('rp_verejny', 'Verejný sex (diskrétny)'),
    p('rp_kostymy', 'Sex v kostýmoch (zvieracie uši, fantasy oblečenie)'),
    p('rp_smoking', 'Smoking fetish — partner fajčí počas aktu'),
    p('rp_tehotenstvo', 'Fetiš na tehotenstvo / laktáciu (bruško, dojčenie ako prvok)'),
    p('rp_vek', 'Fetiš na vekový rozdiel — ako roleplay „mladší / starší" (len dospelí)'),
  ],
}

// ── Messy play ──────────────────────────────────────────────────────
const MESSY: Blok = {
  druh: 'skupina', id: 'messy', nadpis: 'Messy play',
  bloky: [
    p('messy_jedlo', 'Jedlo ako rekvizita (šľahačka, med, ovocie)'),
    p('messy_bodypaint', 'Body paint / „liquid latex" / farby na tele'),
    p('messy_olej', 'Olej a lesk po celom tele'),
  ],
}

// ── Rámec + poznámky ───────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec, semafor a poznámky',
  bloky: [
    {
      druh: 'otazka', id: 'ram_zacat', typ: 'viac',
      text: 'Ako chceme fetiše objavovať',
      moznosti: [
        { v: 'diskusia', label: 'Najprv diskusia o preferenciách a hraniciach' },
        { v: 'mierne', label: 'Začať miernymi formami, postupne rozvíjať' },
        { v: 'filmy', label: 'Spolu si pozrieť obsah na tú tému a rozprávať sa' },
        { v: 'reflexia', label: 'Po každom experimente reflexia „2+2"' },
      ],
    },
    { druh: 'otazka', id: 'ram_ochutnavanie', typ: 'jeden',
      text: 'Ako vnímam ochutnávanie telesných tekutín partnera celkovo',
      moznosti: [
        { v: 'vzrusujuce', label: 'Je to veľmi vzrušujúce' },
        { v: 'situacia', label: 'Záleží na situácii a nálade' },
        { v: 'neprijemne', label: 'Nie je mi to príjemné' },
      ],
    },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne, za podmienok):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'sem_stopslovo', typ: 'text', text: 'Naše stop-slovo / gesto:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
    { druh: 'otazka', id: 'pozn_bojim', typ: 'text', text: 'Čoho sa bojím / čo ma úplne odradí:' },
  ],
}

export const FETISE: TemaObsah = {
  slug: 'telesne-tekutiny/telesne-tekutiny',
  nadpis: 'Fetiše a špecifické záujmy',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_su', nadpis: 'Čo sú fetiše',
      telo:
        'Špecifické podnety, predmety, situácie alebo dynamiky, ktoré vyvolávajú sexuálne vzrušenie. ' +
        'Sú prirodzenou súčasťou sexuality. Delia sa na fyzické (časti tela, materiály, obuv), ' +
        'dynamické (dominancia/submisivita, voyeurizmus, exhibicionizmus) a psychologické (roleplay, mocenské hry).',
    },
    {
      druh: 'text', id: 'ako_zacat', nadpis: 'Ako začať', ton: 'info',
      telo:
        'Diskusia o preferenciách a hraniciach. Začať miernymi formami a postupne rozvíjať. ' +
        'Vzájomný súhlas a dôvera sú základ — hranice sa niekedy menia s rastúcou dôverou.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Aké fetiše ťa lákajú preskúmať?',
      napoveda: 'Rýchly prehľad — detaily sú nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'tekutiny', label: 'Telesné tekutiny (sliny, semeno, vlhkosť…)' },
        { v: 'materialy', label: 'Materiály a oblečenie (latex, koža, pančuchy…)' },
        { v: 'casti_tela', label: 'Časti tela a vzhľad (chodidlá, ruky, vlasy…)' },
        { v: 'vone', label: 'Vône a prirodzený pach' },
        { v: 'dirty_talk', label: 'Dirty talk a hlas' },
        { v: 'voyeur', label: 'Voyeurizmus / exhibicionizmus' },
        { v: 'roleplay', label: 'Roleplay a situačné prvky' },
        { v: 'messy', label: 'Messy play (jedlo, farby, olej)' },
        { v: 'ziadne', label: 'Zatiaľ nič konkrétne — som zvedavý/á' },
      ],
    },
    SLINY,
    SEMENO,
    VLHKOST,
    MOC,
    SLZY,
    MENSTRUACIA,
    MATERIALY,
    CASTI_TELA,
    VONE,
    DIRTY_TALK,
    VOYEUR,
    ROLEPLAY,
    MESSY,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'reflexia', nadpis: 'Reflexia po experimente', ton: 'info',
      telo: 'Po každom novom kroku si povedzte, čo bolo príjemné a čo nie („2+2" — dve super, dve na úpravu), a naplánujte ďalší.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
