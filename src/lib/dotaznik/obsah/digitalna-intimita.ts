import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Digitálna a diaľková intimita — modul H8.
// Zdroje: „28_Sexting_fotky_a_videa.docx" a „27_Digitalna_intimita_a_porno.docx"
// boli prázdne (len názov, žiadny obsah). Obsah napísaný autorsky podľa
// existujúcich L4 seedov modulu — spolu presne pokrývajú oba pôvodné
// názvy: sexting/fotky/videá, ukladanie a riziko, porno spolu, kamera/VR/
// hračky na diaľku. z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Sexting ────────────────────────────────────────────────────────
const SEXTING: Blok = {
  druh: 'skupina', id: 'sexting', nadpis: 'Sexting — správy, fotky, videá',
  bloky: [
    {
      druh: 'otazka', id: 'sex_formy', typ: 'viac',
      text: 'Ktoré formy sextingu ma lákajú',
      moznosti: [
        { v: 'texty', label: 'Texty' },
        { v: 'hlasovky', label: 'Hlasové správy' },
        { v: 'foto', label: 'Fotky' },
        { v: 'video', label: 'Video' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_tvar', typ: 'jeden',
      text: 'Fotky/video s tvárou',
      moznosti: [
        { v: 'ano', label: 'Áno, v poriadku' },
        { v: 'nikdy_tvar', label: 'Nikdy tvár — len telo' },
        { v: 'zalezi', label: 'Záleží na kontexte' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_frekvencia', typ: 'jeden',
      text: 'Frekvencia',
      moznosti: [
        { v: 'casto', label: 'Často, rád(a) to udržiavam živé' },
        { v: 'obcas', label: 'Občas, pri príležitosti' },
        { v: 'zriedka', label: 'Zriedka' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_kto_iniciuje', typ: 'jeden',
      text: 'Kto zvyčajne iniciuje',
      moznosti: [
        { v: 'ja', label: 'Väčšinou ja' },
        { v: 'partner', label: 'Väčšinou partner/ka' },
        { v: 'striedavo', label: 'Striedavo' },
      ],
    },
  ],
}

// ── Ukladanie a riziko ─────────────────────────────────────────────
const UKLADANIE: Blok = {
  druh: 'skupina', id: 'ukladanie', nadpis: 'Ukladanie a riziko',
  bloky: [
    {
      druh: 'otazka', id: 'ukl_kde', typ: 'jeden',
      text: 'Kde by sa to malo ukladať',
      moznosti: [
        { v: 'mazat_hned', label: 'Mazať hneď po prezretí' },
        { v: 'zamknuty_priecinok', label: 'V zamknutom priečinku/appke' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom' },
      ],
    },
    p('ukl_dovera', 'Dôvera, že to partner/ka nikdy nezdieľa ďalej, je pre mňa podmienkou'),
    {
      druh: 'text', id: 'ukl_riziko', ton: 'vystraha',
      telo: '„Revenge" riziko (zdieľanie po rozchode) je reálne — čím citlivejší materiál, tým dôležitejšia dôvera a jasná dohoda vopred.',
    },
    { druh: 'otazka', id: 'ukl_pravidla', typ: 'text', text: 'Naše pravidlá pre mazanie a zálohovanie:' },
  ],
}

// ── Porno spolu ────────────────────────────────────────────────────
const PORNO: Blok = {
  druh: 'skupina', id: 'porno', nadpis: 'Porno spolu',
  bloky: [
    {
      druh: 'otazka', id: 'por_spolocne', typ: 'jeden',
      text: 'Spoločné pozeranie erotického/porno obsahu',
      moznosti: [
        { v: 'robime', label: 'Už to robíme a som spokojný/á' },
        { v: 'tuzim', label: 'Túžim to vyskúšať' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    { druh: 'otazka', id: 'por_vyber', typ: 'text', text: 'Kto by mal vyberať, čo pozeráme, a podľa čoho:' },
    { druh: 'otazka', id: 'por_co_skusit', typ: 'text', text: 'Čo by som z videného chcel(a) skúsiť aj naživo:' },
    {
      druh: 'otazka', id: 'por_individualne', typ: 'jeden',
      text: 'Individuálne pozeranie porna (bez partnera) a jeho hranice',
      moznosti: [
        { v: 'v_pohode', label: 'V pohode, súkromná vec každého' },
        { v: 'transparentnost', label: 'Chcem o tom vedieť / otvorene komunikovať' },
        { v: 'nechcem', label: 'Radšej nie, alebo len s dohodnutými hranicami' },
      ],
    },
  ],
}

// ── Kamera, VR, hračky na diaľku ───────────────────────────────────
const KAMERA_VR: Blok = {
  druh: 'skupina', id: 'kamera_vr', nadpis: 'Kamera, VR a hračky na diaľku',
  bloky: [
    p('kam_nahravat_seba', 'Nahrávať seba (výhradne len pre nás) mi je príjemné'),
    {
      druh: 'otazka', id: 'kam_videohovor', typ: 'jeden',
      text: 'Sex/intimita cez videohovor počas odlúčenia',
      moznosti: [
        { v: 'ano', label: 'Áno, pomáha nám to preklenúť vzdialenosť' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, nie je to pre mňa' },
      ],
    },
    p('kam_vr', 'Virtuálna realita ako forma diaľkovej intimity ma zaujíma'),
    {
      druh: 'otazka', id: 'kam_appka_hracky', typ: 'jeden',
      text: 'Appkou ovládané hračky na diaľku (partner ovláda z inej lokality)',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem to vyskúšať' },
        { v: 'mozno', label: 'Možno' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    { druh: 'otazka', id: 'kam_platformy', typ: 'text', text: 'Na ktorých platformách sa cítim súkromne/bezpečne (a ktorým sa vyhýbam):' },
  ],
}

export const DIGITALNA_INTIMITA: TemaObsah = {
  slug: 'digitalna-dialkova/digitalna-dialkova',
  nadpis: 'Digitálna a diaľková intimita',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Intimita cez obrazovku',
      telo:
        'Sexting, spoločné porno a diaľkové hračky vedia preklenúť fyzickú vzdialenosť aj obohatiť bežný ' +
        'kontakt. Kľúčová je dôvera a jasná dohoda o tom, kde materiál žije a kto k nemu má prístup.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo: 'Nič sa nezdieľa ďalej bez výslovného súhlasu. Pri pochybnostiach — radšej menej, viac rozhovoru.',
    },
  ],
  telo: [
    SEXTING,
    UKLADANIE,
    PORNO,
    KAMERA_VR,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
