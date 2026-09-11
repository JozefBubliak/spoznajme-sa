import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Súhlas, bezpečie a komunikácia — modul I1 „Súhlas, safe-words a signály".
// Zdroje: „01_Metodika_a_bezpecie" (centrálny modul konsentu, bezpečnostných
// signálov, hygieny/ochrany, hraníc, tretích osôb, foto/video) a
// „02_Zaklady_suhlas_a_komunikacia" (emócie a psychológia naprieč témami —
// žiarlivosť, hanba/vina okolo fantázií, aftercare ako štandard, prevod
// fantázie do reality). Toto je „pred modulmi aj priebežne" rámec domény I —
// detailná hygiena/ochrana je v I2, telo/hanba v I3, konkrétne aftercare a
// žiarlivosť pri tretej osobe majú svoje vlastné sekcie v trojky-skupiny.ts /
// swinging.ts / zdielanie-partnera.ts / bdsm.ts — tu len spoločný základ.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Súhlasím, takto to chcem' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne / nezáleží mi na tom' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — dôležité pre mňa' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Základy súhlasu ──────────────────────────────────────────────────
const ZAKLADY: Blok = {
  druh: 'skupina', id: 'zaklady', nadpis: 'Základy súhlasu',
  bloky: [
    {
      druh: 'text', id: 'zaklady_info', ton: 'info',
      telo:
        'Jasné „Áno – Možno – Nie", možnosť kedykoľvek skončiť bez vysvetľovania, žiadny tlak na účasť. ' +
        'Súhlas z minula neplatí automaticky nabudúce — pri opakovaní sa vždy oplatí krátky re-check.',
    },
    {
      druh: 'otazka', id: 'zak_forma', typ: 'viac',
      text: 'Ktorá forma potvrdenia súhlasu mi vyhovuje',
      moznosti: [
        { v: 'slovne', label: 'Slovne — priame „áno"' },
        { v: 'gesto', label: 'Gesto (prikývnutie, pritiahnutie k sebe)' },
        { v: 'ticho_ok', label: 'Pokračovanie bez námietky beriem ako súhlas' },
      ],
    },
    {
      druh: 'otazka', id: 'zak_recheck', typ: 'jeden',
      text: 'Kedy chcem re-check (opätovné potvrdenie) pri opakovaní tej istej aktivity',
      moznosti: [
        { v: 'vzdy', label: 'Vždy nanovo, aj keď sme to už robili' },
        { v: 'po_case', label: 'Ak od poslednej skúsenosti prešiel dlhší čas' },
        { v: 'nie', label: 'Netreba, staré „áno" mi stačí' },
      ],
    },
  ],
}

// ── Bezpečnostné signály a stop-mechanizmy ───────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Bezpečnostné signály a stop-mechanizmy',
  bloky: [
    {
      druh: 'otazka', id: 'sig_system', typ: 'jeden',
      text: 'Aký systém zastavenia nám vyhovuje',
      moznosti: [
        { v: 'jedno_slovo', label: 'Jedno safe-word (STOP)' },
        { v: 'semafor', label: 'Semafor — zelená / žltá / červená' },
        { v: 'neverbalny', label: 'Neverbálny signál (3× stisk ruky, pustenie predmetu)' },
        { v: 'kombinacia', label: 'Kombinácia slova aj gesta (pre chvíle, keď nemôžem hovoriť)' },
      ],
    },
    { druh: 'otazka', id: 'sig_slovo', typ: 'text', text: 'Naše konkrétne slová / gestá (STOP, spomaliť, pridaj, uber):' },
    p('sig_checkin', 'Krátke „check-iny" počas scény (bez prerušenia nálady) sú pre mňa dôležité'),
  ],
}

// ── Hygiena, ochrana a lubrikácia (prehľad) ──────────────────────────
const HYGIENA: Blok = {
  druh: 'skupina', id: 'hygiena_prehlad', nadpis: 'Hygiena, ochrana a lubrikácia — prehľad',
  bloky: [
    {
      druh: 'text', id: 'hygiena_info', ton: 'info',
      telo:
        'Bariérová ochrana (kondómy, fólie), hygienické prestávky, výmena kondómu/rukavice medzi zónami ' +
        '(najmä anál → nikdy späť k vulve), vhodný typ lubrikantu. Detailné preferencie sú v téme „Zdravie, ochrana a hygiena".',
    },
    {
      druh: 'otazka', id: 'hyg_bariery', typ: 'jeden',
      text: 'Bariérová ochrana',
      moznosti: [
        { v: 'vzdy', label: 'Vždy' },
        { v: 'niektore', label: 'Pri niektorých aktivitách' },
        { v: 'v_par', label: 'V stálom páre po dohode nie' },
      ],
    },
    {
      druh: 'otazka', id: 'hyg_luby', typ: 'jeden',
      text: 'Preferovaný typ lubrikantu',
      moznosti: [
        { v: 'vodny', label: 'Vodný' },
        { v: 'silikon', label: 'Silikónový' },
        { v: 'hybrid', label: 'Hybridný' },
        { v: 'neviem', label: 'Neviem, potrebujem poradiť' },
      ],
    },
  ],
}

// ── Hranice a tabu ────────────────────────────────────────────────────
const HRANICE: Blok = {
  druh: 'skupina', id: 'hranice', nadpis: 'Hranice a tabu',
  bloky: [
    {
      druh: 'text', id: 'hranice_info',
      telo:
        'Naprieč celým dotazníkom platí jedno „Áno – Možno – Nikdy". Tu si zapíš to, čo je väčšie než jedna téma — ' +
        'rozdiel medzi „mäkkým NIE" (za istých podmienok možno inokedy) a „tvrdým NIE" (nikdy, bod).',
    },
    { druh: 'otazka', id: 'hr_mekke_nie', typ: 'text', text: 'Moje „mäkké NIE" — čo je len podmienka, nie zákaz:' },
    { druh: 'otazka', id: 'hr_tvrde_nie', typ: 'text', text: 'Moje „tvrdé NIE" — čo je nikdy:' },
  ],
}

// ── Tretie osoby a skupiny (univerzálny rámec) ───────────────────────
const TRETIE_OSOBY: Blok = {
  druh: 'skupina', id: 'tretie_osoby', nadpis: 'Tretie osoby a skupiny — univerzálny rámec',
  bloky: [
    {
      druh: 'text', id: 'tretie_info', ton: 'info',
      telo:
        'Kedykoľvek je v hre tretia osoba (trojka, swingers, zdieľanie partnera), platí ten istý základ: ' +
        'pravidlá výberu, testovanie/STI, dohodnuté miesto, „exit signál" a aftercare. Detaily preferencií sú ' +
        'v konkrétnych témach (Trojky a skupiny, Swingers, Zdieľanie partnera).',
    },
    {
      druh: 'otazka', id: 'tre_exit', typ: 'jeden',
      text: 'Máme dohodnutý „exit signál", ktorým hocikto z nás môže situáciu okamžite ukončiť',
      moznosti: [
        { v: 'ano', label: 'Áno, máme ho' },
        { v: 'treba', label: 'Ešte nie, ale chcem si ho dohodnúť' },
        { v: 'netykame', label: 'Zatiaľ sa nás táto téma netýka' },
      ],
    },
  ],
}

// ── Foto/video a zdieľanie ────────────────────────────────────────────
const FOTO_VIDEO: Blok = {
  druh: 'skupina', id: 'foto_video', nadpis: 'Foto/video a zdieľanie',
  bloky: [
    {
      druh: 'otazka', id: 'fv_pravidla', typ: 'jeden',
      text: 'Nahrávanie (foto/video) intímnych chvíľ',
      moznosti: [
        { v: 'len_pre_nas', label: 'Len pre nás, nikdy nezdieľať' },
        { v: 'so_zmazanim', label: 'Áno, ale s dohodnutým časovým zmazaním' },
        { v: 'nikdy', label: 'Nikdy nič nenahrávať' },
      ],
    },
    p('fv_bez_suhlasu', 'Zákaz zdieľania alebo ukazovania čohokoľvek bez výslovného súhlasu druhého — bez výnimky'),
    {
      druh: 'otazka', id: 'fv_zive_prenosy', typ: 'jeden',
      text: 'Živé prenosy / kamera pri diaľkovej intimite',
      moznosti: [
        { v: 'ano', label: 'Áno, za dohodnutých podmienok' },
        { v: 'mozno', label: 'Možno, potrebujem o tom hovoriť' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Žiarlivosť a jej zvládanie ────────────────────────────────────────
const ZIARLIVOST: Blok = {
  druh: 'skupina', id: 'ziarlivost', nadpis: 'Žiarlivosť a jej zvládanie',
  bloky: [
    {
      druh: 'text', id: 'ziarlivost_info',
      telo:
        'Najčastejšie sa objaví pri tretej osobe, ale nielen tam. Pred-brief pomenuje očakávania a spúšťače ' +
        'vopred; post-care debrief „2+2" (2 veci super, 2 na úpravu) spracuje pocity potom.',
    },
    { druh: 'otazka', id: 'zia_spustace', typ: 'text', text: 'Čo u mňa spúšťa žiarlivosť:' },
    { druh: 'otazka', id: 'zia_pomaha', typ: 'text', text: 'Čo mi vtedy pomáha (slovo, gesto, uistenie):' },
    {
      druh: 'otazka', id: 'zia_pauza', typ: 'jeden',
      text: 'Ak pocítim žiarlivosť uprostred situácie',
      moznosti: [
        { v: 'poviem', label: 'Chcem, aby som to mohol/mohla hneď povedať a zastavili sme sa' },
        { v: 'signal', label: 'Radšej dohodnutý tichý signál' },
        { v: 'po', label: 'Zvládnem to a preberieme to až potom' },
      ],
    },
  ],
}

// ── Hanba a vina okolo fantázií ────────────────────────────────────────
const HANBA_FANTAZIE: Blok = {
  druh: 'skupina', id: 'hanba_fantazie', nadpis: 'Hanba a vina okolo fantázií',
  bloky: [
    {
      druh: 'text', id: 'hanba_info', ton: 'info',
      telo: 'Fantázia neznamená povinnosť ju zrealizovať. Zdieľanie prebieha podľa vlastného komfortu, nie pod tlakom.',
    },
    {
      druh: 'otazka', id: 'han_komfort', typ: 'jeden',
      text: 'Ako mi je, keď zdieľam fantáziu, ktorá ma robí zraniteľným/zraniteľnou',
      moznosti: [
        { v: 'v_pohode', label: 'V pohode, cítim sa bezpečne' },
        { v: 'mierny_nekomfort', label: 'Mierny nekomfort, ale zvládam to' },
        { v: 'tazke', label: 'Je to pre mňa ťažké — potrebujem viac času a bezpečia' },
      ],
    },
    { druh: 'otazka', id: 'han_pomaha', typ: 'text', text: 'Čo mi pomáha zbaviť sa hanby pri zdieľaní (nehodnotiaci jazyk, súkromie, postupnosť):' },
  ],
}

// ── Aftercare ako štandard ─────────────────────────────────────────────
const AFTERCARE: Blok = {
  druh: 'skupina', id: 'aftercare', nadpis: 'Aftercare ako štandard',
  bloky: [
    {
      druh: 'text', id: 'aftercare_info',
      telo: 'Aftercare platí vždy — pri BDSM scéne, skupinovom zážitku aj pri „bežnom" sexe. Telo aj emócie potrebujú „dobehnúť".',
    },
    {
      druh: 'otazka', id: 'aft_menu', typ: 'viac', inePovolene: true,
      text: 'Moje „aftercare menu" — čo potrebujem po intimite',
      moznosti: [
        { v: 'napoj', label: 'Nápoj / jedlo' },
        { v: 'prikrytie', label: 'Prikrytie / teplo' },
        { v: 'dotyk', label: 'Dotyk a objatie' },
        { v: 'slovo', label: 'Slovný rozhovor o tom, čo sme práve zažili' },
        { v: 'ticho', label: 'Ticho a priestor' },
        { v: 'samota', label: 'Chvíľu samoty' },
      ],
    },
  ],
}

// ── Prevod fantázie do reality ("pilot") ───────────────────────────────
const PILOT: Blok = {
  druh: 'skupina', id: 'pilot', nadpis: 'Prevod fantázie do reality — „pilot"',
  bloky: [
    {
      druh: 'text', id: 'pilot_info',
      telo:
        'Namiesto skoku rovno do celej fantázie: vyberte si jednu „pilotnú" fantáziu, naplánujte jej mini verziu ' +
        'a vopred si jasne stanovte hranice — potom vyhodnoťte a rozhodnite, či ísť ďalej.',
    },
    { druh: 'otazka', id: 'pil_ktora', typ: 'text', text: 'Ktorú jednu fantáziu by som chcel(a) skúsiť ako prvý „pilot":' },
    {
      druh: 'otazka', id: 'pil_ako_dlho', typ: 'jeden',
      text: 'Na ako dlho / ako veľký prvý krok',
      moznosti: [
        { v: 'jedno_male', label: 'Jeden malý krok, nič viac' },
        { v: 'cela_scena', label: 'Celá mini-scéna, uvidíme' },
        { v: 'len_rozhovor', label: 'Zatiaľ len rozhovor o tom, nie realizácia' },
      ],
    },
    { druh: 'otazka', id: 'pil_podmienky', typ: 'text', text: 'Za akých podmienok — čo musí platiť, aby som sa cítil(a) bezpečne:' },
  ],
}

export const SUHLAS_BEZPECIE: TemaObsah = {
  slug: 'suhlas-safewords/suhlas-safewords',
  nadpis: 'Súhlas, bezpečie a komunikácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Rámec, ktorý platí všade',
      telo:
        'Táto téma je spoločný základ pre celý dotazník — súhlas, bezpečnostné signály, hygiena a komunikácia ' +
        'o pocitoch. Vypĺňa sa raz, no jej odpovede (safe-word, aftercare potreby, spúšťače žiarlivosti) sú dobré ' +
        'mať na pamäti pri každej ďalšej téme.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Ako to funguje', ton: 'info',
      telo:
        '„Áno – Možno – Nikdy" a právo kedykoľvek prestať platí vždy, bez výnimky a bez potreby vysvetľovania. ' +
        'Výsledky zohľadnia len zhody medzi tebou a partnerom.',
    },
  ],
  telo: [
    ZAKLADY,
    SIGNALY,
    HYGIENA,
    HRANICE,
    TRETIE_OSOBY,
    FOTO_VIDEO,
    ZIARLIVOST,
    HANBA_FANTAZIE,
    AFTERCARE,
    PILOT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Toto nie je jednorazový formulár — vráťte sa k nemu, kedykoľvek sa niečo v dohode zmení. Čo niekto označí ako tvrdé NIE, sa nikde nezobrazí.',
    },
  ],
}
