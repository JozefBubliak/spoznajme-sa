import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Masturbácia a solo aktivity — modul B6 „Manuálna stimulácia".
// Zdroj: „12_Masturbacia_a_solo_aktivity". Sólo pre seba (zdieľanie),
// sledovanie partnera (voyeur v páre), byť sledovaný (exhib v páre),
// spoločná masturbácia, guided touch / pomáhanie, remote play, senzorika,
// hračky, prechod, bezpečnosť a súkromie. z/m verzia zrkadlová.
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

// ── Sólo pre seba ────────────────────────────────────────────────────
const SOLO: Blok = {
  druh: 'skupina', id: 'solo', nadpis: 'Sólo pre seba (otvorené zdieľanie)',
  bloky: [
    p('solo_zdielam', 'Som OK, keď partner vie, ako si to robím'),
    {
      druh: 'otazka', id: 'solo_pomocky', typ: 'viac', inePovolene: true,
      text: 'Ktoré sólo-pomôcky používam alebo by som chcel(a)',
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
  druh: 'skupina', id: 'voyeur', nadpis: 'Sledovanie partnera pri masturbácii',
  bloky: [
    p('voy_postoj', 'Pozerať sa, ako partner/ka masturbuje'),
    {
      druh: 'otazka', id: 'voy_co_vzrusuje', typ: 'viac',
      text: 'Čo ma na tom vzrušuje',
      moznosti: [
        { v: 'tempo', label: 'Tempo rúk' },
        { v: 'dych', label: 'Dych' },
        { v: 'ocny_kontakt', label: 'Očný kontakt' },
        { v: 'mapa_dotykov', label: 'Mapa dotykov — vidím, čo naozaj funguje' },
        { v: 'reakcie', label: 'Reakcie a vzdychy' },
      ],
    },
    {
      druh: 'otazka', id: 'voy_kedy', typ: 'jeden',
      text: 'Kedy ma to najviac láka',
      moznosti: [
        { v: 'spontanne', label: 'Spontánne' },
        { v: 'predohra', label: 'Ako súčasť predohry' },
        { v: 'provokovanie', label: 'Keď ma partner provokuje pohľadom' },
      ],
    },
    {
      druh: 'otazka', id: 'voy_sceny', typ: 'viac',
      text: 'Scény a prostredia',
      moznosti: [
        { v: 'zrkadlo', label: 'Pri zrkadle (reakcie z iného uhla)' },
        { v: 'gauc', label: 'Na gauči / posteli (zmena výšky a vzdialenosti)' },
        { v: 'bez_dotyku', label: '„Bez dotyku" večer — iba vizuál + slová' },
      ],
    },
  ],
}

// ── Byť sledovaný (exhib v páre) ─────────────────────────────────
const EXHIB: Blok = {
  druh: 'skupina', id: 'exhib', nadpis: 'Byť sledovaný/á pri sólo hre',
  bloky: [
    p('exh_postoj', 'Keď ma partner sleduje pri sólo hre'),
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
      text: 'Čo od partnera chcem',
      moznosti: [
        { v: 'len_pozoruj', label: '„Len pozoruješ"' },
        { v: 'navadzaj', label: '„Pozeraj a navádzaj ma"' },
        { v: 'zapoj_po_signale', label: '„Zapoj sa po signále"' },
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
    p('spol_postoj', 'Masturbovať spolu, obaja naraz'),
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
        { v: 'analne', label: 'Análne hračky (len ak obaja chcú)' },
        { v: 'bez', label: 'Bez pomôcok' },
      ],
    },
  ],
}

// ── Guided touch / pomáhanie ──────────────────────────────────
const GUIDED: Blok = {
  druh: 'skupina', id: 'guided', nadpis: 'Vedená masturbácia a pomáhanie',
  bloky: [
    p('guid_postoj', 'Vedená masturbácia — partner ma vedie slovami, rukami, tempom (bez tlaku na výkon)'),
    {
      druh: 'otazka', id: 'guid_rola', typ: 'jeden',
      text: 'Ktorá rola mi sedí',
      moznosti: [
        { v: 'vediem', label: 'Rád/rada vediem partnerove ruky a tempo' },
        { v: 'vedeny', label: 'Rád/rada som vedený/á' },
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
    { druh: 'otazka', id: 'guid_kam_ejakulat', typ: 'text', text: '„Kam s ejakulátom" — preferencie a hygiena:' },
  ],
}

// ── Remote play ────────────────────────────────────────────────
const REMOTE: Blok = {
  druh: 'skupina', id: 'remote', nadpis: 'Remote play (diaľkovo ovládané hračky)',
  bloky: [
    p('rem_postoj', 'Diaľkovo ovládané hračky ako hra moci a odovzdania'),
    {
      druh: 'otazka', id: 'rem_kto', typ: 'jeden',
      text: 'Kto ovláda',
      moznosti: [
        { v: 'ja', label: 'Ovládam ja' },
        { v: 'partner', label: 'Ovláda partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
    { druh: 'otazka', id: 'rem_pravidla', typ: 'text', text: 'Pravidlá „kde / kedy" (len súkromne a legálne):' },
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
  ],
}

// ── Bezpečnosť, hygiena, súkromie ────────────────────────
const BEZPECIE: Blok = {
  druh: 'skupina', id: 'bezpecie', nadpis: 'Bezpečnosť, hygiena a súkromie',
  bloky: [
    {
      druh: 'otazka', id: 'bez_hygiena', typ: 'viac',
      text: 'Hygiena, na ktorej mi záleží',
      moznosti: [
        { v: 'lub_uteraky', label: 'Lubrikant a uteráky na dosah' },
        { v: 'cistenie', label: 'Čistenie pomôcok, sušenie po' },
        { v: 'uskladnenie', label: 'Diskrétne uskladnenie (domácnosť, hotel)' },
        { v: 'cross', label: 'Krížová čistota pri análnych prvkoch (anus → vagína nikdy bez výmeny)' },
      ],
    },
    { druh: 'otazka', id: 'bez_sukromie', typ: 'text', text: 'Súkromie — žiadne fotky / videá bez súhlasu (teraz aj do budúcna); „stop bez otázok":' },
    { druh: 'otazka', id: 'after', typ: 'text', text: 'Ako sa cítim po spoločnej sólo hre a čo potrebujem (objatie, voda, „2+2"):' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const MASTURBACIA: TemaObsah = {
  slug: 'manualna-stimulacia/manualna-stimulacia',
  nadpis: 'Masturbácia a solo aktivity',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Prečo to zaradiť',
      telo:
        'Dôvera a „učenie sa" z partnerovej techniky — vidím, čo naozaj funguje. ' +
        'Dá sa použiť ako predohra, samostatný akt alebo „most" po pauze. ' +
        'Typy: sledovanie partnera, byť sledovaný/á, spoločná masturbácia, pomáhanie (guidance).',
    },
    {
      druh: 'text', id: 'bezpecne', nadpis: 'Ako na to bezpečne a komfortne', ton: 'info',
      telo:
        'Komunikácia pred a po — mini check-in a debrief. Jemné pravidlá súkromia: zrkadlo alebo „kamera bez záznamu" ' +
        'len ak obaja chcú. Žiadne fotky ani videá bez výslovného súhlasu. „Stop bez otázok" ostáva vždy aktívne.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo zo sólo aktivít v páre chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'solo_zdielanie', label: 'Otvorene zdieľať, ako to mám rád/a' },
        { v: 'voyeur', label: 'Sledovať partnera pri masturbácii' },
        { v: 'exhib', label: 'Byť sledovaný/á pri sólo hre' },
        { v: 'spolocna', label: 'Spoločná masturbácia (obaja naraz)' },
        { v: 'guided', label: 'Vedená masturbácia / pomáhanie' },
        { v: 'remote', label: 'Remote play (diaľkové hračky)' },
        { v: 'ziadne', label: 'Zatiaľ nič konkrétne — som zvedavý/á' },
      ],
    },
    SOLO,
    VOYEUR,
    EXHIB,
    SPOLOCNA,
    GUIDED,
    REMOTE,
    SENZORIKA,
    HRACKY,
    KONTEXT,
    BEZPECIE,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo:
        'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí. ' +
        'Sólo hry v páre sú o dôvere a zdieľaní — bez tlaku na výkon.',
    },
  ],
}
