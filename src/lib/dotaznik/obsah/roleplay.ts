import { CHUT } from './skaly'
import type { TemaObsah, Blok, Moznost, OtazkaBlok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Roleplay a scenáre — modul F8 „Roleplay a scenáre (bez tretej osoby)".
// Zdroj: „20_Roleplay_a_scenare". Výber rolí, edge roly (screening), dynamika,
// rozsah scény, kostýmy a rekvizity, atmosféra, senzorika, neštandardné
// rituály, kombinácie, skupinové prvky, mini-scenáre, rámec. z/m zrkadlová.
// Doplnené 2026-10-01 po porovnaní WSFQ/Joyal fantasy inventárov a
// komunitných BDSM checklistov The Duchy, Temple Scarlet a Autostraddle:
// medical/examination, transformácia, gender play, doll/object a human art.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POVODNY_POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis'], moznosti: Moznost[] = CHUT): OtazkaBlok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti, predosleMoznosti: POVODNY_POSTOJ,
})

// ── Tipy a mýty ────────────────────────────────────────────────────────
// Doplnené (xlsm P48624–48631 „Psychologické aspekty roleplay"): čo páru
// pomôže prekonať trápnosť a začať.
const TIPY: Blok = {
  druh: 'skupina', id: 'tipy', nadpis: 'Tipy a mýty',
  bloky: [
    { zbalitelny: true,
      druh: 'text', id: 'tipy_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Roleplay je pre hercov, ja by som sa smial(a)." — Realita: smiech k tomu patrí, uvoľní napätie a scéna sa dá kedykoľvek rozbehnúť znova. Nikto nečaká výkon.\n\n' +
        'Mýtus: „Keď chce roleplay, nestačím mu/jej taký(á), aký(á) som." — Realita: roleplay je hra s vami dvoma, nie náhrada. Kto chce hrať, chce hrať práve s tebou.\n\n' +
        'Mýtus: „Potrebujeme kostýmy a scenár." — Realita: stačí jedna veta alebo jeden rekvizit. Kostým je bonus.\n\n' +
        'Mýtus: „Fantázia o učiteľke, šéfovi či cudzincovi je zvrátená." — Realita: patria medzi najčastejšie fantázie vôbec. Robia to milióny párov.',
    },
    { zbalitelny: true,
      druh: 'text', id: 'tipy_zaciatok', nadpis: 'Ako začať bez trápnosti',
      telo:
        'Začnite hlasom, nie kostýmom — napíšte si cez deň správu „v role" (cudzinec v bare, nový kolega). ' +
        'Prvá scéna nech trvá 5–10 minút a skončí sexom ako obvykle. ' +
        'Vymeňte si 3 lístky s rolou, ktorú by ste skúsili, a ťahajte naslepo. ' +
        'Stretnite sa „prvýkrát" v bare a zbalte sa navzájom — najjednoduchší štart vôbec. ' +
        'Kto sa hanbí, nech je najprv ten, kto „len reaguje" — vedenie nechá na druhom.',
    },
    { zbalitelny: true,
      druh: 'text', id: 'tipy_pribeh', nadpis: 'Vytvorte si vlastný príbeh',
      telo:
        'Napíšte si spoločne krátky scenár alebo úlohy. Môžete si ich vopred rozdeliť, alebo nechať jeden druhého hádať, ako sa situácia vyvinie. ' +
        'Jednoduché kostýmy, hudba alebo svetlá dotvoria atmosféru. Rolu si môžete rozohrať už cez deň — správou, telefonátom, lístkom v taške.',
    },
  ],
}

// ── Výber rolí ───────────────────────────────────────────────────────
const ROLY: Blok = {
  druh: 'skupina', id: 'roly', nadpis: 'Výber rolí',
  bloky: [
    {
      druh: 'otazka', id: 'roly_profesijne', typ: 'viac', inePovolene: true,
      text: 'Profesijné roly',
      moznosti: [
        { v: 'ucitel', label: 'Učiteľ/ka – študent/ka — prísnosť a zvedavosť' },
        { v: 'sef', label: 'Šéf/ka – asistent/ka, sekretárka — autoritatívna dynamika' },
        { v: 'policajt', label: 'Policajt/ka – zadržaný/á — hra s potrestaním' },
        { v: 'lekar', label: 'Lekár/ka – pacient/ka — intímne vyšetrenie' },
        { v: 'vojak', label: 'Vojak – zachránená osoba' },
        { v: 'fotograf', label: 'Fotograf/ka – modelka/model' },
        { v: 'maser', label: 'Masér/ka – klient/ka' },
        { v: 'dozorca', label: 'Dozorca/dozorkyňa – väzeň' },
        { v: 'taxikar', label: 'Taxikár/ka – pasažier/ka, stopár/ka' },
        { v: 'trener', label: 'Prísny tréner' },
        { v: 'eskort', label: 'Platená spoločníčka/spoločník – klient/ka (hrané, nie reálne)' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_domace', typ: 'viac', inePovolene: true,
      text: 'Domáce scenáre',
      moznosti: [
        { v: 'majster', label: 'Majster/ka – sluha/žka' },
        { v: 'opravar', label: 'Opravár/ka' },
        { v: 'sused', label: 'Sused/ka' },
        { v: 'sluzobnicka', label: '„Služobníčka"' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_romanticke', typ: 'viac', inePovolene: true,
      text: 'Romantické a „soft" roly',
      moznosti: [
        { v: 'zvodca', label: g('Zvodca a poddajná milenka', 'Zvodkyňa a poddajný milenec') },
        { v: 'spoznali', label: 'Milenci, ktorí sa práve spoznali' },
        { v: 'cudzinec_hotel', label: 'Cudzinci v hoteli / na dovolenke' },
        { v: 'byvali', label: 'Bývalí, ktorí sa po rokoch stretnú' },
        { v: 'prvy_krat', label: 'Náš „prvý raz" — nesmelosť a objavovanie' },
        { v: 'vymena', label: 'Výmena: hráme sa jeden na druhého' },
        { v: 'pickup', label: 'Neznámi v bare („pick-up")' },
        { v: 'odlucenie', label: 'Dlho odlúčení' },
        { v: 'pribeh_dotyky', label: 'Jednoduché „príbeh + dotyky"' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_fantazijne', typ: 'viac', inePovolene: true,
      text: 'Fantázijné a hrdinské',
      moznosti: [
        { v: 'superhrdinovia', label: 'Superhrdinovia — záchrana s romantickým zakončením' },
        { v: 'kral', label: 'Kráľ a kráľovná / pán a poddaná' },
        { v: 'rytier', label: 'Rytier a čarodejnica' },
        { v: 'upir', label: 'Upír / nadprirodzená bytosť' },
        { v: 'pirat', label: 'Pirát a zajatá / zajatý' },
        { v: 'zlodej', label: 'Zlodej a majiteľ/ka domu' },
        { v: 'masky', label: 'Masky' },
        { v: 'historicke', label: 'Historické / kostýmové' },
        { v: 'scifi', label: 'Sci-fi / fantasy' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_medical', typ: 'viac',
      text: 'Lekárska rola — v akom rozsahu je pre mňa OK',
      moznosti: [
        { v: 'vysetrenie', label: 'Prehliadka a „vyšetrenie" rukami' },
        { v: 'rukavice', label: 'Rukavice, plášť, stetoskop' },
        { v: 'teplomer_zrkadlo', label: 'Rekvizity (teplomer, zrkadielko, lubrikant)' },
        { v: 'gyn', label: 'Gynekologická / urologická prehliadka' },
        { v: 'nie', label: 'Lekárska rola nie' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_autorita_kedy', typ: 'viac',
      text: 'Autoritné role (šéf, policajt, učiteľ) ma lákajú najmä',
      moznosti: [
        { v: 'po_praci', label: 'Po náročnom dni — chcem, aby niekto prevzal velenie' },
        { v: 'ked_chcem_viest', label: 'Keď mám chuť ja viesť' },
        { v: 'vikend', label: 'Na plánovaný víkendový večer' },
        { v: 'spontanne', label: 'Spontánne, jednou hláškou' },
      ],
    },
    { druh: 'otazka', id: 'roly_vlastna', typ: 'text', text: 'Vlastná rola alebo scenár:' },
    { druh: 'otazka', id: 'roly_top3', typ: 'text', text: 'Moje 3 najlákavejšie roly (priorita):' },
  ],
}

// ── Edge roly — len screening ──────────────────────────────────────
const EDGE: Blok = {
  druh: 'skupina', id: 'edge', nadpis: 'Edge roly — len screening',
  uvod: 'Intenzívnejšie roly, ktoré veľa ľudí vzrušuje práve svojou zakázanosťou. Tu len zaznač, či ťa lákajú.',
  bloky: [
    {
      druh: 'otazka', id: 'edge_cnc', typ: 'jeden',
      text: 'Hrané znásilnenie (CNC — consensual non-consent)',
      moznosti: [
        { v: 'fantazia', label: 'Láka ma ako fantázia' },
        { v: 'scena', label: 'Ako scéna s detailným protokolom a hard-stopmi' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'edge_spanok', typ: 'jeden',
      text: 'Predstieranie spánku (jemné dotyky „spiaceho" tela)',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'podmienky', label: 'Len za jasných podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'edge_vek', typ: 'jeden',
      text: 'Vekové role (Daddy/Little, „mladší/starší") — len ako roleplay dospelých',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'neutralne', label: 'Neutrálne' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Dynamika ─────────────────────────────────────────────────────
const DYNAMIKA: Blok = {
  druh: 'skupina', id: 'dynamika', nadpis: 'Dynamika moci',
  bloky: [
    { doplnenieId: 'dyn_volba_ine', inePovolene: true,
      druh: 'otazka', id: 'dyn_volba', typ: 'jeden',
      text: 'Akú dynamiku pri roleplay preferujem',
      moznosti: [
        { v: 'dom', label: 'Dominantnú — viesť a určovať priebeh' },
        { v: 'sub', label: 'Submisívnu — odovzdať kontrolu' },
        { v: 'rovnocenna', label: 'Rovnocennú — zdieľanie úloh' },
        { v: 'scenar', label: g('Záleží od scenára a nálady — rád striedam', 'Záleží od scenára a nálady — rada striedam') },
      ],
    },

    p('dyn_switch', 'Switch — prepínať role počas scény'),
    { druh: 'otazka', id: 'dyn_vediem_v', typ: 'text', text: 'V ktorých rolách chcem viesť:' },
    { druh: 'otazka', id: 'dyn_prijimam_v', typ: 'text', text: 'V ktorých rolách chcem prijímať:' },
    {
      druh: 'otazka', id: 'dyn_light_prvky', typ: 'viac',
      text: 'Mocenské prvky „light"',
      moznosti: [
        { v: 'prikazy', label: 'Príkazy' },
        { v: 'pochvala', label: 'Pochvala a odmena' },
        { v: 'protokoly', label: 'Jemné protokoly' },
        { v: 'disciplinovanie', label: 'Disciplinovanie' },
      ],
    },
  ],
}

// ── Rozsah scény ────────────────────────────────────────────────
const ROZSAH: Blok = {
  druh: 'skupina', id: 'rozsah', nadpis: 'Rozsah scény',
  bloky: [
    {
      druh: 'otazka', id: 'roz_rozsah', typ: 'jeden',
      text: 'Aký rozsah',
      moznosti: [
        { v: 'dialogy', label: 'Len dialógy' },
        { v: 'dotyky', label: 'Dialógy + dotyky' },
        { v: 'bdsm_light', label: 'Ľahké BDSM rekvizity' },
        { v: 'pravidla', label: 'Scéna s pravidlami' },
      ],
    },
    {
      druh: 'otazka', id: 'roz_naskocenie', typ: 'jeden',
      text: 'Ako do role naskočiť',
      moznosti: [
        { v: 'mikronavody', label: 'Mikronávody „postoj, hlas, slovník"' },
        { v: 'scenar', label: 'Vopred napísaný scenár' },
        { v: 'improv', label: 'Voľná improvizácia' },
        { v: 'ramec', label: 'Rámec + improvizácia' },
      ],
    },
  ],
}

// ── Kostýmy a rekvizity ────────────────────────────────────────
const KOSTYMY: Blok = {
  druh: 'skupina', id: 'kostymy', nadpis: 'Kostýmy a rekvizity',
  bloky: [
    { doplnenieId: 'kos_zaujem_ine', inePovolene: true,
      druh: 'otazka', id: 'kos_zaujem', typ: 'jeden',
      text: 'Kostýmy a doplnky',
      moznosti: [
        { v: 'ano', label: 'Áno, kostýmy mi pomáhajú lepšie sa vžiť do role' },
        { v: 'mozno', label: 'Možno, ak sú jednoduché a pohodlné' },
        { v: 'nie', label: 'Nie, radšej sa sústredím na samotný zážitok' },
      ],
    },

    {
      druh: 'otazka', id: 'kos_ktore', typ: 'viac', inePovolene: true,
      text: 'Aká miera „cosplayu"',
      moznosti: [
        { v: 'masky', label: 'Masky' },
        { v: 'uniformy', label: 'Uniformy' },
        { v: 'doplnky', label: 'Drobné doplnky' },
        { v: 'plny', label: 'Plný kostým' },
        { v: 'nalada', label: 'Len nálada a rekvizita' },
      ],
    },
    {
      druh: 'otazka', id: 'kos_krabica', typ: 'viac',
      text: '„Krabica rolí" — čo mať pripravené',
      moznosti: [
        { v: 'maska', label: 'Maska' },
        { v: 'satka', label: 'Šatka' },
        { v: 'karta_prikaz', label: 'Karta s „príkazom"' },
        { v: 'signaly', label: 'Rekvizitné signály' },
      ],
    },
  ],
}

// ── Atmosféra a scéna ──────────────────────────────────────────
const ATMOSFERA: Blok = {
  druh: 'skupina', id: 'atmosfera', nadpis: 'Atmosféra a scéna',
  bloky: [
    {
      druh: 'otazka', id: 'atm_svetlo', typ: 'jeden',
      text: 'Svetlo',
      moznosti: [
        { v: 'tlmene', label: 'Tlmené' },
        { v: 'led', label: 'LED / farebné' },
        { v: 'svieky', label: 'Sviečky' },
        { v: 'plne', label: 'Plné svetlo' },
      ],
    },
    p('atm_hudba', 'Hudba ako súčasť scény'),
    p('atm_vone', 'Vône / aromatika'),
    p('atm_zrkadla', 'Zrkadlá'),
    {
      druh: 'otazka', id: 'atm_miesto', typ: 'viac', inePovolene: true,
      text: 'Kde sa mi roleplay najviac hodí',
      moznosti: [
        { v: 'spalna', label: 'Spálňa' },
        { v: 'gauc', label: 'Gauč' },
        { v: 'kuchyna', label: 'Kuchyňa (pult)' },
        { v: 'kupelna', label: 'Kúpeľňa (sprcha)' },
        { v: 'stol', label: 'Stôl' },
        { v: 'auto_hotel', label: 'Auto / hotel (diskrétne)' },
      ],
    },
    p('atm_miesto_ako_postava', '„Miesto ako postava" — prostredie ako súčasť scenára'),
  ],
}

// ── Senzorika v roleplay ─────────────────────────────────────
const SENZORIKA: Blok = {
  druh: 'skupina', id: 'senzorika', nadpis: 'Senzorika v roleplay',
  bloky: [
    {
      druh: 'otazka', id: 'sen_prostriedky', typ: 'viac',
      text: 'Čím rýchlo „zahĺbiť" do role',
      moznosti: [
        { v: 'blindfold', label: 'Blindfold' },
        { v: 'sepot', label: 'Šepot' },
        { v: 'textury', label: 'Textúry (pierka, šatky)' },
        { v: 'teplota', label: 'Teplota (ľad / teplé oleje)' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_zmysly', typ: 'viac',
      text: 'Ktoré zmysly zvýrazniť',
      moznosti: [
        { v: 'hmat', label: 'Hmat' },
        { v: 'zrak', label: 'Zrak' },
        { v: 'sluch', label: 'Sluch' },
        { v: 'cuch', label: 'Čuch' },
        { v: 'chut', label: 'Chuť' },
      ],
    },
  ],
}

// ── Neštandardné rituály ────────────────────────────────────
// ── Erotické hry (formát party hry, nie roleplay postáv) ──────────────
// Doplnené zo zdroj.docx, systematická revízia (docs/dotaznik-zdroj-progress.md).
const HRY: Blok = {
  druh: 'skupina', id: 'hry', nadpis: 'Erotické hry',
  bloky: [
    {
      druh: 'otazka', id: 'hry_typ', typ: 'viac', inePovolene: true,
      text: 'Ktoré erotické hry ma oslovujú',
      moznosti: [
        { v: 'kocky', label: 'Erotické kocky s úlohami' },
        { v: 'karty', label: 'Kartové/stolové hry s erotickými úlohami' },
        { v: 'pisanie', label: 'Písanie erotických scén alebo listov' },
        { v: 'hadanky', label: 'Hádanky s intímnymi odmenami' },
        { v: 'nikdy_som_este', label: '„Nikdy som ešte..." (odhalenie túžob)' },
        { v: 'vyzvy', label: 'Vzájomné erotické výzvy' },
        { v: 'flaska', label: 'Erotická „točená fľaška" — náhodná výzva (bozk, masáž, škrabkanie)' },
      ],
    },
    {
      druh: 'otazka', id: 'hry_odmeny_tresty', typ: 'jeden',
      text: 'Odmeny a tresty v hrách',
      moznosti: [
        { v: 'ano', label: 'Áno, zvyšujú napätie' },
        { v: 'jemne', label: 'Áno, ale jemné a zábavné' },
        { v: 'nie', label: 'Nie, preferujem neutrálne hry' },
      ],
    },
    p('hry_kreslenie', 'Kreslenie na telo (čokoláda, farby) ako súčasť hry ma láka'),
    {
      druh: 'otazka', id: 'hry_verejne', typ: 'jeden',
      text: 'Diskrétne senzuálne hry na verejnosti (nenápadné dotyky, šepot)',
      moznosti: [
        { v: 'ano', label: 'Áno, vzrušuje ma to' },
        { v: 'mozno', label: 'Možno, podľa situácie' },
        { v: 'nie', label: 'Nie, necítim sa pri tom komfortne' },
      ],
    },
    { druh: 'otazka', id: 'hry_verejne_miesta', typ: 'viac', text: 'Ak áno — ktoré miesta', moznosti: [
      { v: 'restauracia', label: 'Reštaurácia' },
      { v: 'kino', label: 'Kino' },
      { v: 'park', label: 'Park / príroda' },
      { v: 'auto', label: 'Auto' },
    ]},
  ],
}

const RITUALY: Blok = {
  druh: 'skupina', id: 'rituy', nadpis: 'Neštandardné rituály',
  bloky: [
    p('rit_maskovanie', 'Maskovanie očí'),
    p('rit_lepenie_pier', 'Lepenie pier (symbolické mlčanie)'),
    p('rit_obmedzenie', 'Hranie s obmedzením pohybu'),
    p('rit_disciplinovanie', 'Disciplinovanie ako rituál'),
    p('rit_treasure_hunt', '„Love treasure hunt" — zmyslové hľadanie/lúštenie so sexuálnou odmenou'),
    p('rit_eroticky_dennik', 'Erotický denník — striedavo si zapisovať a plniť si túžby druhého'),
    {
      druh: 'text',
      id: 'rit_kreativne_info',
      telo: 'Masky, svetlá a hry s prekvapením podporujú hravosť a uvoľnenie. Love Treasure Hunt je hľadanie indícií po byte, na konci ktorého čaká odmena; erotický denník je zošit, do ktorého si striedavo píšete túžby a plníte si ich.',
    },
    {
      druh: 'otazka',
      id: 'rit_kreativne_vyber',
      typ: 'viac',
      text: 'Ktoré kreatívne intímne hry ma lákajú?',
      moznosti: [
        { v: 'masky_pasky', label: 'Masky a pásky na oči' },
        { v: 'svetla_hudba', label: 'Tematické svetlá a hudba' },
        { v: 'treasure_hunt', label: 'Love Treasure Hunt — zmyslové hľadanie' },
        { v: 'dennik', label: 'Intímny denník — zapisovanie a dobrovoľné uskutočňovanie túžob' },
        { v: 'jednoduchsie', label: 'Žiadne z uvedených — radšej jednoduchšie formy intimity' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka', id: 'rit_dennik_temy', typ: 'viac', inePovolene: true,
      text: 'Ak by sme viedli spoločný intímny denník, čo by som doň chcel(a) zahrnúť',
      moznosti: [
        { v: 'fantazie', label: 'Nové fantázie, ktoré ma napadnú' },
        { v: 'co_fungovalo', label: 'Čo nám naposledy fungovalo / čo si zopakovať' },
        { v: 'zoznam_priani', label: 'Zoznam vecí, ktoré chcem raz vyskúšať' },
        { v: 'vdaka', label: 'Krátke poďakovanie/pochvala po spoločnej chvíli' },
      ],
    },
    p('rit_body_writing', '„Body-writing" — písanie slova/odkazu prstom na partnerovu kožu, ktorý má uhádnuť'),
  ],
}

// ── Kombinácie ─────────────────────────────────────────────
const KOMBINACIE: Blok = {
  druh: 'skupina', id: 'kombinacie', nadpis: 'Kombinácie',
  bloky: [
    { doplnenieId: 'komb_zaujem_ine', inePovolene: true,
      druh: 'otazka', id: 'komb_zaujem', typ: 'jeden',
      text: 'Mám záujem kombinovať roleplay s inými praktikami (bondage, pomôcky, masáže)',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem to preskúmať' },
        { v: 'mozno', label: 'Možno, záleží na konkrétnej situácii' },
        { v: 'nie', label: 'Nie, preferujem jednoduchšie hry' },
      ],
    },

    {
      druh: 'otazka', id: 'komb_s_cim', typ: 'viac',
      text: 'Roleplay chcem prepájať s…',
      moznosti: [
        { v: 'masaz', label: 'Masážou' },
        { v: 'senzorika', label: 'Senzorikou' },
        { v: 'bondage', label: 'Bondage (light)' },
        { v: 'hracky', label: 'Hračkami' },
        { v: 'scenove', label: '„Scénovými" vibrátormi / šatkami / putami' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_mikroscen', typ: 'viac',
      text: 'Ktoré mikroscény spojiť s rolou',
      moznosti: [
        { v: 'inspection', label: '„Inspection" (prehliadka)' },
        { v: 'dominant_kiss', label: '„Dominant kiss"' },
        { v: 'predohra', label: 'Náväznosť na predohru' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_hry_zaujem', typ: 'jeden',
      text: 'Chcem spájať roleplay s hrami',
      moznosti: [
        { v: 'ano', label: 'Áno, vymyslenie príbehu a jeho hranie je vzrušujúce' },
        { v: 'mozno', label: 'Možno, záleží na scenári' },
        { v: 'nie', label: 'Nie, preferujem jednoduché hry' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_hry_ktore', typ: 'viac', inePovolene: true,
      text: 'Aké kombinácie roleplay a hier by som chcel(a) skúsiť',
      moznosti: [
        { v: 'kartova', label: 'Roleplay s kartovou hrou (odhaľovanie úloh)' },
        { v: 'detektivka', label: 'Detektívny príbeh s intímnymi dôkazmi' },
        { v: 'masaz_pomocky', label: 'Klasické roleplay spojené s erotickou masážou alebo pomôckami' },
        { v: 'kocky', label: 'Kocky určia rolu, miesto a akciu' },
        { v: 'escape', label: 'Erotický „escape room" — za každú úlohu kus oblečenia' },
      ],
    },
    p('komb_maznanie', 'Jemné roleplay počas maznania'),
    {
      druh: 'otazka', id: 'komb_maznanie_ktore', typ: 'viac',
      text: 'Aké role počas maznania ma najviac lákajú',
      moznosti: [
        { v: 'jemna_dom_sub', label: 'Jemná dominancia/submisia (šepkanie, vedenie pohybov)' },
        { v: 'tematicke', label: 'Tematické role (učiteľ/študentka, šéf/sekretárka)' },
        { v: 'kreativne', label: 'Kombinácia kreatívnych scenárov' },
      ],
    },
    { druh: 'otazka', id: 'komb_maznanie_roly', typ: 'text', text: 'Vlastná odpoveď — role počas maznania (voliteľné):' },
  ],
}

// ── Skupinové prvky ───────────────────────────────────────
const SKUPINOVE: Blok = {
  druh: 'skupina', id: 'skupinove', nadpis: 'Skupinové prvky (voliteľné)',
  bloky: [
    {
      druh: 'otazka', id: 'skup_zaujem', typ: 'jeden',
      text: 'Skupinové prvky v roleplay',
      moznosti: [
        { v: 'nezvazujeme', label: 'Nezvažujeme' },
        { v: 'pozorujem', label: '„Pozorujem len"' },
        { v: 'soft', label: 'Soft prvky s inými' },
        { v: 'plna', label: 'Plná účasť' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_prvky', typ: 'viac',
      text: 'Ktoré prvky (len ak obaja chcú)',
      moznosti: [
        { v: 'pozorovanie', label: 'Pozorovanie' },
        { v: 'soft_swap', label: 'Soft swap' },
        { v: 'full_swap', label: 'Full swap' },
        { v: 'hotwife', label: 'Hotwifing / cuckolding' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_rovnake_pohlavie', typ: 'jeden',
      text: 'Rovnakopohlavné prvky v scéne',
      moznosti: [
        { v: 'len_dotyk', label: '„Len dotyk"' },
        { v: 'pred_partnerom', label: '„Len pred partnerom"' },
        { v: 'bez_oralu', label: '„Bez orálu"' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

const MEDICAL_TRANSFORM: Blok = {
  druh: 'skupina', id: 'medical_transform', nadpis: 'Medical, transformačný a objektový roleplay',
  uvod:
    'Tieto fantázie často nestoja na povolaní či kostýme samotnom. Medical hra môže erotizovať sústredenú pozornosť, vyšetrenie a vystavenie tela. Transformácia môže na chvíľu uvoľniť inú rodovú, telesnú alebo charakterovú stránku človeka. Objektová hra môže priniesť pocit vystavenia, vlastníctva alebo dokonalej nehybnosti.',
  bloky: [
    {
      druh: 'otazka', id: 'mt_medical', typ: 'viac', inePovolene: true,
      text: 'Ktoré medical scenáre ma eroticky lákajú',
      moznosti: [
        { v: 'vysetrenie', label: 'Dôkladné „vyšetrenie“ celého tela' },
        { v: 'ordinacia', label: 'Vyšetrujúca autorita a pacient v ordinácii' },
        { v: 'uniforma', label: 'Uniforma, rukavice, rúško alebo autoritatívny hlas' },
        { v: 'meranie', label: 'Meranie, zapisovanie výsledkov a hodnotenie reakcií' },
        { v: 'poloha', label: 'Nariadená poloha a vystavenie tela pohľadu' },
        { v: 'pomocky', label: 'Lekársky pôsobiace rekvizity alebo sexologické pomôcky' },
        { v: 'klinika', label: 'Futuristická klinika, experiment alebo „výskumný subjekt“' },
      ],
    },
    {
      druh: 'otazka', id: 'mt_transform', typ: 'viac', inePovolene: true,
      text: 'Ktoré transformačné scenáre ma lákajú',
      moznosti: [
        { v: 'crossdress', label: 'Cross-dressing alebo premena oblečením a stylingom' },
        { v: 'gender_play', label: 'Gender play — dočasne iné oslovenie, rola alebo rodový prejav' },
        { v: 'feminizacia', label: 'Feminizácia ako erotická premena' },
        { v: 'maskulinizacia', label: 'Maskulinizácia ako erotická premena' },
        { v: 'makeover', label: g('Makeover pod partnerkiným vedením', 'Makeover pod partnerovým vedením') },
        { v: 'doll', label: 'Dollification — premena na dokonale upravenú bábiku' },
        { v: 'bimbo', label: 'Bimbo/himbo fantasy — prehnaná sexualizovaná postava' },
        { v: 'statue', label: 'Socha alebo figurína — nehybnosť a vystavenie' },
        { v: 'furniture', label: 'Human furniture — telo ako trón, podnožka alebo dekorácia' },
        { v: 'creature', label: 'Fantazijná premena na zviera, bytosť alebo inú formu' },
      ],
    },
    {
      druh: 'otazka', id: 'mt_roly', typ: 'jeden',
      text: 'Ktorá strana premeny alebo vyšetrenia ma priťahuje',
      moznosti: [
        { v: 'vykonavam', label: g('Ja premieňam, obliekam alebo vyšetrujem partnerku', 'Ja premieňam, obliekam alebo vyšetrujem partnera') },
        { v: 'prijimam', label: g('Partnerka premieňa, oblieka alebo vyšetruje mňa', 'Partner premieňa, oblieka alebo vyšetruje mňa') },
        { v: 'obe', label: 'Chcem obe roly' },
        { v: 'pozorujem', label: 'Láka ma najmä výsledný obraz a pozorovanie' },
      ],
    },
    {
      druh: 'otazka', id: 'mt_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje premena alebo medical rola', 'Keď partnera vzrušuje premena alebo medical rola'),
      moznosti: [
        { v: 'laka', label: g('Jej fantázia ma láka a chcem ju s ňou vytvoriť', 'Jeho fantázia ma láka a chcem ju s ním vytvoriť') },
        { v: 'estetika', label: 'Láka ma estetika a kostým, nie poníženie ani strata identity' },
        { v: 'vybrane', label: 'Chcem iba konkrétne prvky alebo oslovenia' },
        { v: 'fantazia', label: g('Rád o tom fantazírujem, ale nechcem plnú scénu', 'Rada o tom fantazírujem, ale nechcem plnú scénu') },
        { v: 'nie', label: 'Táto premena alebo rola ma eroticky neláka' },
      ],
    },
    { druh: 'otazka', id: 'mt_slova', typ: 'text', text: 'Oslovenia, vzhľad a prvky, ktoré majú byť súčasťou tejto premeny — a ktoré by pokazili jej význam:' },
    { zbalitelny: true,
      druh: 'text', id: 'mt_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo:
        'Mýtus: gender play automaticky vypovedá o rodovej identite človeka mimo scény. Realita: niekomu pomáha skúmať identitu, inému ide iba o kostým, kontrast alebo mocenskú hru. Mýtus: medical fantasy znamená túžbu po skutočnom zákroku. Realita: často je jadrom pozornosť, autorita, vystavenie a detailné skúmanie tela.',
    },
  ],
}

// ── Mini-scenáre ──────────────────────────────────────────
const SCENARE: Blok = {
  druh: 'skupina', id: 'scenare', nadpis: 'Mini-scenáre — čo ma láka',
  bloky: [
    p('sc_light', 'Light (10–20 min) — „Po práci: šéf/ka & asistent/ka" — len dialógy + bozk/masáž'),
    p('sc_stred', 'Stredný (20–40 min) — „Policajt/ka & zadržaný/á" — pravidlá, kontrolované dotyky'),
    p('sc_hlbsi', 'Hlbší (40+ min) — „Lekár/ka & pacient/ka" — rituál, protokol, rekvizity, jasné hranice zón'),
  ],
}

// ── Rámec a poznámky ─────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Hranice a poznámky',
  bloky: [
    { druh: 'otazka', id: 'ram_hranice', typ: 'text', text: 'Moje hranice pri roleplay (čo určite nie / len s podmienkami):' },
    { druh: 'otazka', id: 'ram_aftercare', typ: 'text', text: 'Pred-brief a po-brief — čo potrebujem po scéne (objatie, spätná väzba „2+2"):' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const ROLEPLAY: TemaObsah = {
  slug: 'roleplay-scenare/roleplay-scenare',
  nadpis: 'Roleplay a scenáre',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Čo je roleplay a prečo',
      telo:
        '„Bezpečný únik" — hra na postavy, ktoré nás vzrušujú, bez zmeny reality vzťahu. ' +
        'Roleplay podporuje dôveru a uvoľňuje bariéry, ktoré bránia naplno si užiť intímne zážitky — ' +
        'v role sa dá povedať a urobiť to, na čo by „ja" nemal(a) odvahu.',
    },
    {
      druh: 'text', id: 'pravidla', nadpis: 'Základné pravidlá', ton: 'info',
      telo:
        'Dohody vopred — čo je OK / Možno / Nie. Krátky pred-brief a po-brief (debrief „2+2" — dve veci, čo sa páčili, dve, čo nabudúce inak). ' +
        'Pri kostýmoch komfort nad estetikou — pohodlné, rýchlo skladné.',
    },
  ],
  telo: [
    { doplnenieId: 'skusenost_ine', inePovolene: true,
      druh: 'otazka', id: 'skusenost', typ: 'jeden',
      text: 'Ako sa cítim pri zapojení hrania rolí do intímneho života?',
      moznosti: [
        { v: 'milujem', label: 'Milujem to a chcem experimentovať viac' },
        { v: 'laka', label: 'Láka ma to, chcem to skúšať' },
        { v: 'otvoreny_skusenosti', label: g('Som otvorený, ale potrebujem viac skúseností', 'Som otvorená, ale potrebujem viac skúseností') },
        { v: 'zvedavy', label: 'Som zvedavý/á, ale opatrne' },
        { v: 'neutralne', label: 'Neutrálne' },
        { v: 'nie', label: 'Necítim sa na to pripravený/á' },
        { v: 'nekomfort', label: 'Necítim sa pri tom komfortne' },
      ],
    },

    { doplnenieId: 'rp_zaujem_ine', inePovolene: true,
      druh: 'otazka', id: 'rp_zaujem', typ: 'jeden',
      text: 'Lákajú ma fantázie spojené s hraním rolí',
      moznosti: [
        { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
        { v: 'tuzim', label: 'Túžim to viac zapojiť do našich hier' },
        { v: 'ak_chces', label: g('Rád to vyskúšam, ak po tom túžiš', 'Rada to vyskúšam, ak po tom túžiš') },
        { v: 'mozno', label: 'Možno, záleží na situácii' },
        { v: 'nie', label: 'Nie, necítim sa pri tom komfortne' },
      ],
    },

    {
      druh: 'otazka', id: 'rp_frekvencia', typ: 'jeden',
      text: 'Ako často by som chcel(a) roleplay',
      moznosti: [
        { v: 'vzacne', label: 'Vzácne — na výnimočné večery' },
        { v: 'mesacne', label: 'Raz za mesiac' },
        { v: 'tyzdenne', label: 'Pokojne každý týždeň' },
        { v: 'kratke_casto', label: 'Často, ale len krátke scénky a hlášky' },
      ],
    },
    {
      druh: 'otazka', id: 'rp_kto_vymysla', typ: 'jeden',
      text: 'Kto vymýšľa scenár',
      moznosti: [
        { v: 'ja', label: 'Rád/rada ho vymyslím ja' },
        { v: 'partner', label: 'Nech ma partner/ka prekvapí' },
        { v: 'spolu', label: 'Napíšeme ho spolu' },
        { v: 'nahoda', label: 'Náhoda — karty, kocky, lístky' },
      ],
    },
    TIPY,
    ROLY,
    EDGE,
    DYNAMIKA,
    ROZSAH,
    KOSTYMY,
    ATMOSFERA,
    HRY,
    SENZORIKA,
    RITUALY,
    KOMBINACIE,
    SKUPINOVE,
    MEDICAL_TRANSFORM,
    SCENARE,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'report', nadpis: 'Čo z toho vznikne', ton: 'info',
      telo:
        'Z odpovedí oboch: „top 3 roly" pre každého + spoločné prieniky, mini-scenáre na mieru (10 / 20 / 40 min) s krokmi a slovníkom, ' +
        'a nápady, ako scénu rozbehnúť.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
