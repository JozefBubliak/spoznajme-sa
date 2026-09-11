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

// ── Zvuk a rušenie ──────────────────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „3) Prostredie, logistika, rituály" —
// hlasitosť/hudba ako maskovanie zvuku, krátke okná príležitosti,
// pred-rituál pripravenosti, prerušenia a návrat po nich.
const ZVUK: Blok = {
  druh: 'skupina', id: 'zvuk', nadpis: 'Zvuk, hudba a hlasitosť',
  bloky: [
    {
      druh: 'otazka', id: 'zvu_hlasitost', typ: 'jeden',
      text: 'Vlastné zvuky (moje aj partnerove) počas sexu',
      moznosti: [
        { v: 'chcem_pocut', label: 'Chcem partnera/ku počuť naplno' },
        { v: 'hudba_maskuje', label: 'Radšej hudba, ktorá zvuky prekryje' },
        { v: 'zalezi_na_mieste', label: 'Záleží na tom, kde sme (doma vs u niekoho)' },
      ],
    },
    {
      druh: 'otazka', id: 'zvu_hudba', typ: 'jeden',
      text: 'Hudba počas sexu',
      moznosti: [
        { v: 'ritmicka', label: 'Rytmická, udáva tempo' },
        { v: 'ambient', label: 'Ambientná, na pozadí' },
        { v: 'ticho', label: 'Radšej ticho' },
      ],
    },
    { druh: 'otazka', id: 'zvu_playlist', typ: 'text', text: 'Môj „sex playlist" — žánre, ktoré fungujú (a ktoré sú tabu):' },
  ],
}

// ── Krátke okno príležitosti ───────────────────────────────────────
const KRATKE_OKNO: Blok = {
  druh: 'skupina', id: 'kratke_okno', nadpis: 'Krátke okno príležitosti',
  bloky: [
    { druh: 'otazka', id: 'okn_kedy', typ: 'text', text: 'Kedy je u nás reálne „okno" na intimitu (čas, dni, situácie):' },
    {
      druh: 'otazka', id: 'okn_planovanie', typ: 'jeden',
      text: 'V krátkom okne preferujem',
      moznosti: [
        { v: 'planovane', label: 'Vopred naplánované' },
        { v: 'spontanne', label: 'Spontánne, keď okno vznikne' },
      ],
    },
    {
      druh: 'otazka', id: 'okn_co_v_kratkom', typ: 'jeden',
      text: 'V krátkom okne (5–20 min) uprednostním',
      moznosti: [
        { v: 'rychly_sex', label: 'Rýchly sex' },
        { v: 'intenzivne_maznanie', label: 'Intenzívne maznanie bez „musieť dokončiť"' },
      ],
    },
  ],
}

// ── Pred-rituál a príprava ──────────────────────────────────────────
const PRED_RITUAL: Blok = {
  druh: 'skupina', id: 'pred_ritual', nadpis: 'Pred-rituál a príprava',
  bloky: [
    {
      druh: 'otazka', id: 'pri_na_dosah', typ: 'viac',
      text: 'Čo musí byť pripravené na dosah, aby som sa cítil(a) uvoľnene',
      moznosti: [
        { v: 'lubrikant', label: 'Lubrikant' },
        { v: 'ochrana', label: 'Kondómy/ochrana' },
        { v: 'uterak', label: 'Uterák' },
        { v: 'voda', label: 'Voda na pitie' },
        { v: 'hracky', label: 'Hračky' },
      ],
    },
    {
      druh: 'otazka', id: 'pri_priprava_vzrusujuca', typ: 'jeden',
      text: 'Príprava (sprcha, prádlo, parfum) je pre mňa',
      moznosti: [
        { v: 'vzrusujuca_sucast', label: 'Vzrušujúca súčasť predohry' },
        { v: 'minimalizmus', label: 'Chcem minimalizmus, rovno k veci' },
      ],
    },
    p('pri_jest_pit', 'Pred sexom rád(a) niečo zjem/vypijem — nie je to pre mňa rušivé'),
  ],
}

// ── Prerušenia a návrat ─────────────────────────────────────────────
const PRERUSENIA: Blok = {
  druh: 'skupina', id: 'preusenia', nadpis: 'Prerušenia a návrat',
  bloky: [
    { druh: 'otazka', id: 'per_pravidla', typ: 'text', text: 'Naše pravidlá pre prerušenia (mobil, zvonček, deti, zvieratá):' },
    {
      druh: 'otazka', id: 'per_pokracovat', typ: 'jeden',
      text: 'Po prerušení',
      moznosti: [
        { v: 'pokracovat', label: 'Vieme pokojne pokračovať tam, kde sme skončili' },
        { v: 'vypne_ma', label: 'Prerušenie ma väčšinou úplne vypne' },
      ],
    },
    {
      druh: 'otazka', id: 'per_navrat', typ: 'jeden',
      text: 'Čo najviac pomáha pri návrate späť do nálady',
      moznosti: [
        { v: 'objatie_bozk', label: 'Objatie / bozk' },
        { v: 'sprcha', label: 'Krátka prestávka / sprcha' },
        { v: 'restart', label: 'Reštart úplne od začiatku' },
      ],
    },
  ],
}

// ── Po sexe (v tomto priestore) ─────────────────────────────────────
const PO_SEXE: Blok = {
  druh: 'skupina', id: 'po_sexe', nadpis: 'Po sexe — v danom priestore',
  bloky: [
    {
      druh: 'otazka', id: 'pos_potrebujem', typ: 'jeden',
      text: 'Po sexe najviac potrebujem',
      moznosti: [
        { v: 'fyzicky_kontakt', label: 'Fyzický kontakt' },
        { v: 'priestor', label: 'Trochu priestoru' },
      ],
    },
    { druh: 'otazka', id: 'pos_slova', typ: 'text', text: 'Slová, ktoré chcem po sexe počuť (pochvala, uistenie, poďakovanie):' },
    p('pos_nepriejemne_mobil', 'Okamžité siahnutie po mobile/odchod hneď po sexe je pre mňa nepríjemné'),
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
    ZVUK,
    KRATKE_OKNO,
    PRED_RITUAL,
    PRERUSENIA,
    PO_SEXE,
    BEZPECNOST,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
