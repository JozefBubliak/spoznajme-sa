import type { TemaObsah, Blok, Moznost, Podmienka } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Špecifické obdobia a obmedzenia — okruh „specificke-obdobia" v module I3
// „Telo, hanba a citlivé miesta".
// Zdroj: „30_Specificke_obdobia_a_obmedzenia.docx" bol prázdny (len názov,
// žiadny obsah) — táto téma je preto napísaná od základu podľa existujúceho
// L4 seedu modulu (stres/rodičovstvo, tehotenstvo a po pôrode, menštruácia,
// menopauza, zdravotné stavy/lieky, vek a únava, dlhé odlúčenie).
// z/m verzia zrkadlová, niektoré otázky sú viazané na pohlavie 'z'.
// ─────────────────────────────────────────────────────────────────────────────

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
    MENSTRUACIA,
    MENOPAUZA,
    ZDRAVOTNE,
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
