import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Miesta a prostredie — modul A3 „Prostredie a atmosféra".
// Zdroj: „29_Miesta_a_prostredie.docx". Domáce priestory (spálňa, kúpeľňa,
// kuchyňa, obývačka), exteriér a verejné prostredia (auto, príroda, kino,
// park), hotely a prenajaté priestory, netradičné/experimentálne prostredia,
// kluby a tematické párty, bezpečnosť a diskrétnosť ako spoločný rámec.
// z/m verzia zrkadlová.
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

// ── Domáce priestory ────────────────────────────────────────────────
const DOMACE: Blok = {
  druh: 'skupina', id: 'domace', nadpis: 'Domáce priestory',
  bloky: [
    {
      druh: 'otazka', id: 'dom_spalna', typ: 'viac',
      text: 'Spálňa — čo ma láka',
      moznosti: [
        { v: 'postel', label: 'Posteľ, klasicky' },
        { v: 'podlaha', label: 'Podlaha / koberec' },
        { v: 'zrkadlo', label: 'Zrkadlo pri posteli' },
        { v: 'doplnky', label: 'Vankúše, prikrývky, svetelné reťaze' },
      ],
    },
    {
      druh: 'otazka', id: 'dom_kupelna', typ: 'viac',
      text: 'Kúpeľňa',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha (stojace polohy, tečúca voda)' },
        { v: 'vana', label: 'Spoločná vaňa (oleje, kúpeľové bomby)' },
        { v: 'umyvadlo', label: 'Umývadlo / pult' },
      ],
    },
    p('dom_bezpecnost_sprcha', 'V sprche/vani mi záleží na protišmykovej opore — bez nej sa neuvoľním'),
    {
      druh: 'otazka', id: 'dom_kuchyna', typ: 'viac',
      text: 'Kuchyňa',
      moznosti: [
        { v: 'stol_pult', label: 'Stôl / kuchynský pult ako opora' },
        { v: 'jedlo', label: 'Food-play (čokoláda, šľahačka, ovocie)' },
      ],
    },
    {
      druh: 'otazka', id: 'dom_obyvacka', typ: 'viac',
      text: 'Obývačka',
      moznosti: [
        { v: 'gauc', label: 'Gauč' },
        { v: 'podlaha_krb', label: 'Podlaha pri krbe' },
        { v: 'prikryvky', label: 'Prikrývky a vankúše na komfort' },
      ],
    },
  ],
}

// ── Exteriér a verejné prostredia ────────────────────────────────────
const EXTERIER: Blok = {
  druh: 'skupina', id: 'exterier', nadpis: 'Exteriér a verejné prostredia (diskrétne)',
  bloky: [
    {
      druh: 'otazka', id: 'ext_auto', typ: 'jeden',
      text: 'Auto',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'mozno', label: 'Možno, za jasných podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('ext_priroda', 'Príroda (les, pláž) — pocit slobody a kontakt s prírodou ma láka'),
    {
      druh: 'otazka', id: 'ext_verejne_miesta', typ: 'viac',
      text: 'Ktoré verejné miesta ma (opatrne) lákajú',
      moznosti: [
        { v: 'kino', label: 'Kino' },
        { v: 'park', label: 'Park' },
        { v: 'ziadne', label: 'Žiadne — radšej súkromie' },
      ],
    },
    {
      druh: 'text', id: 'ext_pravidla', ton: 'vystraha',
      telo: 'Vždy bez svedkov, bez rizika priestupku a s jasným plánom rýchleho ukončenia. Diskrétnosť má prednosť pred vzrušením z rizika.',
    },
    { druh: 'otazka', id: 'ext_hranica', typ: 'text', text: 'Kde je moja hranica diskrétnosti — čo je pre mňa ešte OK a čo už nie:' },
  ],
}

// ── Hotely a prenajaté priestory ──────────────────────────────────────
const HOTELY: Blok = {
  druh: 'skupina', id: 'hotely', nadpis: 'Hotely a prenajaté priestory',
  bloky: [
    p('hot_unik', '„Mini-únik" — hotel alebo prenajatý apartmán ako zmena prostredia ma láka'),
    {
      druh: 'otazka', id: 'hot_rital', typ: 'viac',
      text: 'Čo by som si vzal(a) so sebou / pripravil(a)',
      moznosti: [
        { v: 'sviecky', label: 'Sviečky / atmosféra' },
        { v: 'playlist', label: 'Playlist' },
        { v: 'pomocky', label: 'Pomôcky a lubrikant' },
        { v: 'tematicka_izba', label: 'Tematická izba (ak je k dispozícii)' },
      ],
    },
    { druh: 'otazka', id: 'hot_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) takýto „date out" night',
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'obcas', label: 'Občas' },
        { v: 'zriedka', label: 'Zriedka, stačí výnimočne' },
      ],
    },
  ],
}

// ── Netradičné a experimentálne prostredia ────────────────────────────
const NETRADICNE: Blok = {
  druh: 'skupina', id: 'netradicne', nadpis: 'Netradičné a experimentálne prostredia',
  bloky: [
    {
      druh: 'otazka', id: 'net_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré netradičné prostredia ma lákajú preskúmať',
      moznosti: [
        { v: 'vytah', label: 'Výťah (krátko, diskrétne)' },
        { v: 'balkon', label: 'Balkón / terasa' },
        { v: 'garaz', label: 'Garáž / pivnica' },
        { v: 'kancelaria', label: 'Kancelária mimo pracovnej doby' },
      ],
    },
  ],
}

// ── Kluby a tematické párty ──────────────────────────────────────────
const KLUBY: Blok = {
  druh: 'skupina', id: 'kluby', nadpis: 'Kluby a tematické párty',
  bloky: [
    {
      druh: 'otazka', id: 'klu_zaujem', typ: 'jeden',
      text: 'Záujem skúsiť klub alebo tematickú párty (swingers/lifestyle)',
      moznosti: [
        { v: 'ano_za_podmienok', label: 'Áno, za jasných podmienok' },
        { v: 'zvedavy', label: 'Zvedavý/á, ale zatiaľ len ako predstava' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'klu_rola', typ: 'jeden',
      text: 'Preferovaná rola',
      moznosti: [
        { v: 'host', label: '„Host" — aktívne zapojenie' },
        { v: 'guest', label: '„Guest" — len pozorovanie' },
        { v: 'nezalezi', label: 'Nezáleží, uvidíme' },
      ],
    },
    p('klu_bez_zaznamu', 'Pravidlá súkromia a zákaz akéhokoľvek záznamu sú pre mňa podmienkou'),
  ],
}

// ── Bezpečnosť a diskrétnosť ──────────────────────────────────────────
const BEZPECNOST: Blok = {
  druh: 'skupina', id: 'bezpecnost', nadpis: 'Bezpečnosť a diskrétnosť',
  bloky: [
    {
      druh: 'text', id: 'bez_info', ton: 'info',
      telo: 'Novota a zmena prostredia prehlbujú dôveru len vtedy, keď je vopred jasné, čo je „ešte OK" a čo nie — najmä mimo súkromia domova.',
    },
    { druh: 'otazka', id: 'bez_signal', typ: 'text', text: 'Náš signál/plán, ak sa mimo domova náhle prestanem cítiť komfortne:' },
    { druh: 'otazka', id: 'bez_pomocky', typ: 'text', text: 'Čo mať vždy poruke mimo domova (uterák, lubrikant, hygienické pomôcky):' },
  ],
}

export const MIESTA_PROSTREDIE: TemaObsah = {
  slug: 'prostredie-atmosfera/prostredie-atmosfera',
  nadpis: 'Miesta a prostredie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Zmena miesta ako zdroj novosti',
      telo:
        'Intimita nemusí patriť len spálni. Zmena priestoru — iná izba, kúpeľňa, výlet, diskrétne miesto vonku — ' +
        'prináša novosť a dobrodružstvo bez toho, aby sa menilo čokoľvek iné.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo: 'Mimo súkromia domova platí navyše: diskrétnosť, legálnosť a jasný plán, ako situáciu rýchlo a bezpečne ukončiť.',
    },
  ],
  telo: [
    DOMACE,
    EXTERIER,
    HOTELY,
    NETRADICNE,
    KLUBY,
    BEZPECNOST,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
