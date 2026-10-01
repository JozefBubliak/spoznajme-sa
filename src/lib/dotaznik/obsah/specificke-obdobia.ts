import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Špecifické obdobia a obmedzenia — okruh „specificke-obdobia" v module I3
// „Telo, hanba a citlivé miesta".
// Zdroj: „30_Specificke_obdobia_a_obmedzenia.docx" bol prázdny (len názov,
// žiadny obsah) — táto téma je preto napísaná od základu podľa existujúceho
// L4 seedu modulu (stres/rodičovstvo, tehotenstvo a po pôrode, menštruácia,
// menopauza, zdravotné stavy/lieky, vek a únava, dlhé odlúčenie).
// z/m verzia zrkadlová, niektoré otázky sú viazané na pohlavie 'z'.
// Doplnené 2026-10-01: Natsal-3 (plodnosť, IVF, zdravotné prechody),
// fantasy inventáre WSFQ/Joyal a komunitné kink checklisty (breeding fantasy),
// štúdie sexuality po mastektómii/prostatektómii a pri chronickej bolesti.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string): TemaObsah['nadpis'] => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'aktualne', label: 'Aktuálne sa ma to týka' },
  { v: 'niekedy', label: 'Občas / v niektorých fázach' },
  { v: 'netyka', label: 'Momentálne sa ma to netýka' },
]
const p = (id: string, text: TemaObsah['nadpis'], podmienka?: Podmienka): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ, ...(podmienka ? { podmienka } : {}),
})

// ── Stres a rodičovstvo ─────────────────────────────────────────────
const RODICOVSTVO: Blok = {
  druh: 'skupina', id: 'rodicovstvo', nadpis: 'Stres a rodičovstvo',
  bloky: [
    p('rod_sukromie', 'Malé deti doma výrazne obmedzujú naše súkromie a spontánnosť'),
    p('rod_energia', 'Po celom dni s deťmi/prácou mi na intimitu chýba energia, nie chuť'),
    {
      druh: 'otazka', id: 'rod_riesenie', typ: 'viac',
      text: 'Čo nám v tejto fáze pomáha',
      moznosti: [
        { v: 'planovanie', label: 'Vopred naplánovaný „sex date"' },
        { v: 'kratsie', label: 'Kratšie, menej „výkonovo" ladené stretnutia' },
        { v: 'cez_den', label: 'Využiť okno cez deň, nie len večer' },
        { v: 'pomoc_okolia', label: 'Zariadiť si pravidelne pomoc (stráženie, výpomoc)' },
      ],
    },
  ],
}

// ── Tehotenstvo a po pôrode ───────────────────────────────────────────
const TEHOTENSTVO: Blok = {
  druh: 'skupina', id: 'tehotenstvo', nadpis: 'Tehotenstvo a po pôrode',
  bloky: [
    {
      druh: 'otazka', id: 'teh_tuzba', typ: 'jeden', podmienka: { pohlavie: 'z' },
      text: 'Ako sa mi počas tehotenstva zvyčajne mení túžba',
      moznosti: [
        { v: 'vyssia', label: 'Skôr vyššia (najmä 2. trimester)' },
        { v: 'nizsia', label: 'Skôr nižšia' },
        { v: 'kolisa', label: 'Kolíše podľa trimestra a pohody' },
      ],
    },
    {
      druh: 'otazka', id: 'teh_polohy', typ: 'text',
      text: 'Ktoré polohy alebo úpravy potrebujeme v tehotenstve zohľadniť (pohodlie, tlak na brucho):',
    },
    p('teh_lekarske', 'Chcem, aby sme sex v tehotenstve konzultovali s lekárom, ak máme pochybnosti'),
    {
      druh: 'otazka', id: 'popo_navrat', typ: 'jeden', podmienka: { pohlavie: 'z' },
      text: 'Po pôrode — návrat k intimite',
      moznosti: [
        { v: 'lekarske_potvrdenie', label: 'Počkám na potvrdenie od lekára a vlastný pocit pripravenosti' },
        { v: 'postupne', label: 'Chcem ísť postupne — najprv nesexuálna blízkosť' },
        { v: 'neviem_este', label: 'Ešte neviem, budem to riešiť keď príde čas' },
      ],
    },
    p('popo_dojcanie', 'Dojčenie mení môj vzťah k vlastnému telu / prsiam počas intimity (citlivosť, nekomfort, alebo naopak)', { pohlavie: 'z' }),
  ],
}

const REPRODUKCNA_EROTIKA: Blok = {
  druh: 'skupina', id: 'reprodukcna_erotika', nadpis: 'Reprodukčná erotika — fantázia, telo a skutočný plán sú tri rôzne veci',
  uvod:
    'Breeding alebo impregnation fantasy môže erotizovať plnosť, odovzdanie, označenie, plodnosť či predstavu spoločného dieťaťa. Sama osebe nehovorí, že človek chce otehotnieť, niekoho oplodniť alebo meniť antikoncepčné rozhodnutia.',
  bloky: [
    {
      druh: 'otazka', id: 'repr_co_laka', typ: 'viac', inePovolene: true,
      text: 'Čo ma na reprodukčnej erotike priťahuje',
      moznosti: [
        { v: 'breeding_slova', label: 'Breeding/impregnation dirty talk bez reálneho plánu' },
        { v: 'naplnenie', label: g('Predstava, že partnerku „naplním“', 'Predstava, že ma partner „naplní“') },
        { v: 'creampie', label: 'Vizuálna alebo telesná creampie fantázia' },
        { v: 'riziko_fantazia', label: 'Pocit zakázaného rizika iba vo fantázii' },
        { v: 'plodnost', label: 'Symbol plodnosti, mužnosti, ženskosti alebo tvorivosti' },
        { v: 'spolocne_dieta', label: 'Emocionálna predstava spoločného dieťaťa' },
        { v: 'tehotenske_telo', label: 'Tehotenské telo, rastúce brucho a zmena citlivosti' },
        { v: 'laktacia', label: 'Laktácia, adult nursing alebo mlieko ako erotický prvok' },
        { v: 'oznacenie', label: 'Pocit označenia, vlastníctva alebo úplného odovzdania' },
      ],
    },
    {
      druh: 'otazka', id: 'repr_realita', typ: 'jeden',
      text: 'Ako sa moja fantázia vzťahuje k realite',
      moznosti: [
        { v: 'len_fantazia', label: 'Je to iba erotická fantázia, reálne tehotenstvo nechcem' },
        { v: 'fantazia_a_mozno', label: 'Fantázia ma vzrušuje a dieťa možno chcem inokedy' },
        { v: 'realny_ciel', label: 'Aktuálne sa snažíme o dieťa a erotický význam je pre mňa súčasťou toho' },
        { v: 'bez_tehotenstva', label: 'Chcem tento motív hrať bez možnosti tehotenstva' },
        { v: 'nelaka', label: 'Tento motív ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'repr_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje breeding alebo tehotenská fantázia', 'Keď partnera vzrušuje breeding alebo tehotenská fantázia'),
      moznosti: [
        { v: 'spolocne', label: g('Jej túžba ma vzrušuje a chcem ju zdieľať', 'Jeho túžba ma vzrušuje a chcem ju zdieľať') },
        { v: 'slova', label: 'Láka ma dirty talk a symbolika, nie reálny cieľ' },
        { v: 'emocie', label: 'Dojíma ma predstava rodiny, ale erotický prvok necítim' },
        { v: 'tlak', label: 'Takáto fantázia vo mne vytvára tlak alebo obavu' },
        { v: 'nie', label: 'Nechcem tento motív v našej intimite' },
      ],
    },
    { druh: 'otazka', id: 'repr_slova', typ: 'text', text: 'Konkrétne slová, obrazy alebo hranica medzi fantasy a reálnym plánom, ktoré potrebujem pomenovať:' },
    {
      druh: 'text', id: 'repr_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo:
        'Mýtus: breeding fantasy znamená nezodpovednosť alebo tajnú túžbu po dieťati. Realita: často je to symbol extrémnej blízkosti, telesnosti a odovzdania. Mýtus: snaženie o dieťa musí erotiku automaticky zničiť. Realita: niektorým párom pomáha oddeliť „sex podľa kalendára“ od sexu pre potešenie; iným práve význam plodnosti pridáva intenzitu.',
    },
  ],
}

// ── Menštruácia ────────────────────────────────────────────────────
const MENSTRUACIA: Blok = {
  druh: 'skupina', id: 'menstruacia', nadpis: 'Menštruácia',
  bloky: [
    {
      druh: 'otazka', id: 'men_postoj', typ: 'jeden', podmienka: { pohlavie: 'z' },
      text: 'Sex počas menštruácie',
      moznosti: [
        { v: 'ano', label: 'Áno, v pohode (napr. s uterákom / v sprche)' },
        { v: 'niektore', label: 'Len niektoré aktivity (nie penetrácia)' },
        { v: 'nie', label: 'Nie, radšej nie' },
      ],
    },
    p('men_libido', 'U mňa sa okolo menštruácie (pred / počas) mení libido — často stúpa aj kvôli hormonálnym zmenám', { pohlavie: 'z' }),
    { druh: 'otazka', id: 'men_bolest', typ: 'text', text: 'Ak mám menštruačné kŕče/bolesti, čo vtedy pomáha (teplo, masáž, žiadny tlak na sex):' },
  ],
}

// ── Menopauza a perimenopauza ──────────────────────────────────────
const MENOPAUZA: Blok = {
  druh: 'skupina', id: 'menopauza', nadpis: 'Menopauza a perimenopauza',
  bloky: [
    p('men2_sucho', 'Suchosť pri penetrácii vyžaduje viac lubrikantu a dlhšiu predohru', { pohlavie: 'z' }),
    p('men2_libido', 'Zaznamenávam zmenu (pokles alebo naopak nárast) libida v tejto fáze', { pohlavie: 'z' }),
    { druh: 'otazka', id: 'men2_co_pomaha', typ: 'text', text: 'Čo mi v tomto období najviac pomáha (lubrikant, viac času, iné techniky):' },
  ],
}

// ── Zdravotné stavy a lieky ──────────────────────────────────────────
const ZDRAVOTNE: Blok = {
  druh: 'skupina', id: 'zdravotne', nadpis: 'Zdravotné stavy a lieky',
  bloky: [
    {
      druh: 'otazka', id: 'zdr_lieky', typ: 'jeden',
      text: 'Užívam lieky, ktoré ovplyvňujú libido alebo funkciu (napr. antidepresíva)',
      moznosti: [
        { v: 'ano', label: 'Áno, a chcem sa o tom s partnerom rozprávať otvorene' },
        { v: 'ano_nechcem', label: 'Áno, ale zatiaľ o tom nechcem hovoriť do detailu' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    { druh: 'otazka', id: 'zdr_chronicke', typ: 'text', text: 'Chronický stav (bolesť, únava, endometrióza a pod.), ktorý ovplyvňuje intimitu, a čo pri ňom pomáha:' },
    { druh: 'otazka', id: 'zdr_obmedzenia_polohy', typ: 'text', text: 'Fyzické obmedzenia, ktoré treba zohľadniť pri polohách alebo tempe:' },
  ],
}

const ZIVOTNE_PRECHODY: Blok = {
  druh: 'skupina', id: 'zivotne_prechody', nadpis: 'Zdravotné a životné prechody — nové telo, nová mapa rozkoše',
  uvod:
    'Operácia, liečba, neplodnosť alebo strata môžu zmeniť funkciu, citlivosť aj obraz vlastného tela. Neznamenajú koniec erotiky; často iba rušia starý scenár a otvárajú potrebu objaviť nové zóny, tempo a význam intimity.',
  bloky: [
    {
      druh: 'otazka', id: 'zivp_situacie', typ: 'viac', inePovolene: true,
      text: 'Ktoré situácie ovplyvňujú alebo môžu ovplyvniť našu intimitu',
      moznosti: [
        { v: 'snazenie', label: 'Snaženie o dieťa a sex podľa plodných dní' },
        { v: 'neplodnost', label: 'Neplodnosť, vyšetrenia alebo IVF' },
        { v: 'strata', label: 'Potrat alebo strata tehotenstva' },
        { v: 'porod', label: 'Pôrod, jazva, panvové dno alebo zmenená citlivosť' },
        { v: 'mastektomia', label: 'Mastektómia, rekonštrukcia alebo zmena citlivosti hrudníka' },
        { v: 'hysterektomia', label: 'Hysterektómia alebo gynekologická operácia' },
        { v: 'prostatektomia', label: 'Prostatektómia alebo zmena erekcie a ejakulácie' },
        { v: 'rakovina', label: 'Onkologická liečba a únava alebo zmena obrazu tela' },
        { v: 'endo_vulvo', label: 'Endometrióza, vulvodýnia alebo chronická panvová bolesť' },
        { v: 'lieky', label: 'Lieky meniace libido, vzrušenie alebo orgazmus' },
        { v: 'operacia', label: 'Iná operácia, jazva, protéza, ostómia alebo katéter' },
      ],
    },
    {
      druh: 'otazka', id: 'zivp_co_chcem', typ: 'viac', inePovolene: true,
      text: 'Čo chcem v období zmeny objavovať',
      moznosti: [
        { v: 'nove_zony', label: 'Nové citlivé zóny mimo pôvodného centra sexu' },
        { v: 'bez_penetracie', label: 'Plnohodnotný sex bez penetrácie' },
        { v: 'bez_orgazmu', label: 'Erotiku bez povinného orgazmu' },
        { v: 'pomocky', label: 'Pomôcky, polohy a opory pre nové telo' },
        { v: 'jazva', label: 'Postupné erotické prijatie jazvy alebo zmenenej časti tela' },
        { v: 'fantazia', label: 'Erotické slová a fantáziu aj v dňoch bez fyzickej energie' },
        { v: 'prijimat', label: 'Prijímať rozkoš bez fyzickej námahy a bez povinnosti oplácať' },
      ],
    },
    {
      druh: 'otazka', id: 'zivp_partner', typ: 'jeden',
      text: g('Ako chcem reagovať, keď sa partnerkino telo alebo funkcia zmení', 'Ako chcem reagovať, keď sa partnerovo telo alebo funkcia zmení'),
      moznosti: [
        { v: 'objavovat', label: g('Chcem s ňou zvedavo objavovať novú mapu rozkoše', 'Chcem s ním zvedavo objavovať novú mapu rozkoše') },
        { v: 'nechat_viest', label: g('Chcem, aby ma viedla v tom, čo je dnes príjemné', 'Chcem, aby ma viedol v tom, čo je dnes príjemné') },
        { v: 'potrebujem_cas', label: 'Potrebujem čas prispôsobiť sa aj ja' },
        { v: 'neviem', label: 'Neviem, ale chcem o tom vedieť hovoriť bez predstierania' },
      ],
    },
    { druh: 'otazka', id: 'zivp_ziaducnost', typ: 'text', text: g('Čo mi pomáha cítiť sa partnerkou žiaduci aj v zmenenom tele:', 'Čo mi pomáha cítiť sa partnerom žiaduca aj v zmenenom tele:') },
    {
      druh: 'text', id: 'zivp_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo:
        'Mýtus: keď telo už nereaguje ako predtým, sexuálny život sa skončil. Realita: výskum po operáciách, pri bolesti aj poranení miechy opakovane opisuje sexuálne znovuobjavenie — širšiu definíciu sexu, nové zóny a tvorivejšie roly. Zmena funkcie nie je zánik túžby ani žiaducnosti.',
    },
  ],
}

// ── Vek a únava ────────────────────────────────────────────────────
const VEK_UNAVA: Blok = {
  druh: 'skupina', id: 'vek_unava', nadpis: 'Vek a únava',
  bloky: [
    p('vek_energia', 'S pribúdajúcim vekom sa mení moja energia a potrebujem to zohľadniť v plánovaní intimity'),
    {
      druh: 'otazka', id: 'vek_pristup', typ: 'jeden',
      text: 'Ako na to reagujem',
      moznosti: [
        { v: 'planovanie', label: 'Radšej plánujem, keď mám energiu istá' },
        { v: 'kratsie_castejsie', label: 'Kratšie, ale častejšie chvíle' },
        { v: 'nezmenilo_sa', label: 'Zatiaľ sa u mňa nič výrazne nezmenilo' },
      ],
    },
  ],
}

// ── Dlhé odlúčenie ────────────────────────────────────────────────
const ODLUCENIE: Blok = {
  druh: 'skupina', id: 'odlucenie', nadpis: 'Dlhé odlúčenie',
  bloky: [
    {
      druh: 'otazka', id: 'odl_navrat', typ: 'jeden',
      text: 'Po dlhšom odlúčení (pracovná cesta, hospitalizácia, LDR fáza) sa najradšej vraciam k intimite',
      moznosti: [
        { v: 'hned', label: 'Hneď, s plnou vášňou' },
        { v: 'postupne', label: 'Postupne — najprv čas spolu, potom blízkosť' },
        { v: 'rozhovor_prvy', label: 'Potrebujem najprv „dobehnúť" rozhovorom, čo sa dialo' },
      ],
    },
    p('odl_udrzanie', 'Počas odlúčenia mi pomáha udržiavať spojenie na diaľku (správy, hovory, sexting)'),
  ],
}

export const SPECIFICKE_OBDOBIA: TemaObsah = {
  slug: 'telo-hanba-citlive/specificke-obdobia',
  nadpis: 'Špecifické obdobia a obmedzenia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Život sa mení, intimita sa prispôsobuje',
      telo:
        'Rodičovstvo, tehotenstvo, zdravie, vek — každá fáza života mení, čo je pre nás v danú chvíľu dostupné ' +
        'a príjemné. Táto téma pomenúva, ktoré obdobia sa nás práve týkajú, a čo v nich pomáha.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo: 'Nič tu nie je natrvalo — odpovede sa oplatí obnoviť vždy, keď sa životná situácia zmení.',
    },
  ],
  telo: [
    RODICOVSTVO,
    TEHOTENSTVO,
    REPRODUKCNA_EROTIKA,
    MENSTRUACIA,
    MENOPAUZA,
    ZDRAVOTNE,
    ZIVOTNE_PRECHODY,
    VEK_UNAVA,
    ODLUCENIE,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — cieľom je spoločné prispôsobenie sa, nie porovnávanie.',
    },
  ],
}
