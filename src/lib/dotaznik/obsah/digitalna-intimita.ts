import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Digitálna a diaľková intimita — modul H8.
// Zdroje: „28_Sexting_fotky_a_videa.docx" a „27_Digitalna_intimita_a_porno.docx"
// boli prázdne; ďalší obsah nájdený v zdroj.docx P361–403 (GLOBAL-002).
// Pôvodné autorské bloky doplnené podľa súvislého zdroja a podľa
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
      druh: 'text',
      id: 'por_info',
      telo: 'Spoločné sledovanie erotického obsahu môže byť podnetom na rozhovor o fantáziách, zvedavé spestrenie alebo súčasť blízkosti. Môžete si pripraviť príjemné svetlo, vôňu a pohodlie; pritom môžete len sedieť spolu, držať sa za ruky alebo sa objať. Nie je potrebné pokračovať k sexu. Vyberajte pomaly podľa komfortu oboch, hovorte o hraniciach a kedykoľvek prestaňte. Film nie je návod ani meradlo toho, ako má vyzerať vaše telo či intimita.',
    },
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
    {
      druh: 'otazka',
      id: 'por_pocit_predstava',
      typ: 'jeden',
      text: 'Ako sa cítim pri predstave spoločného sledovania erotického filmu?',
      moznosti: [
        {
          v: 'laka',
          label: { m: 'Znie to vzrušujúco, rád by som to vyskúšal', z: 'Znie to vzrušujúco, rada by som to vyskúšala' },
        },
        { v: 'zalezi_film', label: 'Môže to byť zaujímavé, záleží na konkrétnom filme' },
        {
          v: 'neistota',
          label: { m: 'Nie som si istý, necítim sa pri tom komfortne', z: 'Nie som si istá, necítim sa pri tom komfortne' },
        },
      ],
    },
    {
      druh: 'otazka',
      id: 'por_pocit_predstava_ine',
      typ: 'text',
      text: 'Pocity pri predstave sledovania — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'por_typ',
      typ: 'viac',
      text: 'Aký typ erotického obsahu by ma najviac lákal',
      moznosti: [
        { v: 'jemna_zmyselna', label: 'Jemná erotika so zmyselnou atmosférou' },
        { v: 'vasnive', label: 'Vášnivé, realistické scény' },
        { v: 'pribeh', label: 'So silným príbehom a estetikou' },
        { v: 'amaterske', label: 'Prirodzené, amatérske' },
        { v: 'odvaznejsie', label: 'Odvážnejšie (špecifické fantázie/fetiše)' },
        { v: 'nelaka', label: 'Erotické filmy ma nelákajú' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka', id: 'por_ocakavanie', typ: 'jeden',
      text: 'Čo od spoločného sledovania očakávam',
      moznosti: [
        { v: 'inspiracia', label: 'Inšpiráciu pre náš intímny život' },
        { v: 'komunikacia', label: 'Otvorenejšiu komunikáciu o túžbach' },
        { v: 'vzrusenie', label: 'Zvýšenie vzrušenia a blízkosti' },
        { v: 'len_zvedavost', label: 'Len zvedavosť, nie súčasť intímneho života' },
      ],
    },
    {
      druh: 'otazka',
      id: 'por_ocakavanie_ine',
      typ: 'text',
      text: 'Očakávania od spoločného sledovania — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'por_hranice_jasnost',
      typ: 'jeden',
      text: 'Mám pri výbere erotického obsahu jasné hranice a preferencie?',
      moznosti: [
        { v: 'viem', label: 'Áno, viem, čo ma láka a čo nie' },
        {
          v: 'rozhovor',
          label: { m: 'Nie som si istý, potrebujem sa o tom porozprávať', z: 'Nie som si istá, potrebujem sa o tom porozprávať' },
        },
        { v: 'nezaujem', label: 'Nemám záujem sledovať erotické filmy' },
      ],
    },
    {
      druh: 'otazka',
      id: 'por_hranice_jasnost_ine',
      typ: 'text',
      text: 'Moje hranice pri obsahu — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'por_priebeh',
      typ: 'viac',
      text: 'Ako by malo spoločné sledovanie prebiehať',
      moznosti: [
        { v: 'obcasne', label: 'Občasné, na spestrenie' },
        { v: 'cielene', label: 'S cieľom objavovať nové fantázie' },
        { v: 'atmosfera', label: 'V príjemnej atmosfére — sviečky, pohodlie, prípadne pohár vína' },
        { v: 'ako_predohra', label: 'Ako súčasť predohry — vzájomné dráždenie' },
        { v: 'masturbacia_pocas', label: 'Masturbácia počas sledovania (sólo alebo vzájomne)' },
      ],
      inePovolene: true,
      napoveda: 'Atmosféra ani nápoj nie sú podmienkou. Dohoda musí zostať slobodná a jasná.',
    },
    {
      druh: 'otazka',
      id: 'por_priebeh_postoj',
      typ: 'jeden',
      text: 'Ako sa staviam k vyskúšaniu takéhoto priebehu?',
      moznosti: [
        { v: 'viem', label: 'Viem si vybrať, čo mi vyhovuje' },
        {
          v: 'otvoreny',
          label: { m: 'Neviem ešte ako, ale som otvorený skúšaniu', z: 'Neviem ešte ako, ale som otvorená skúšaniu' },
        },
        { v: 'nepaci', label: 'Nepáči sa mi táto predstava' },
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

// ── Erotická literatúra ─────────────────────────────────────────────
const EROTICKA_LITERATURA: Blok = {
  druh: 'skupina', id: 'eroticka_literatura', nadpis: 'Čítanie erotických príbehov',
  bloky: [
    {
      druh: 'otazka', id: 'lit_citam', typ: 'jeden',
      text: 'Čítanie erotických príbehov/literatúry (knihy, fanfiction, audio)',
      moznosti: [
        { v: 'robim_rada', label: 'Robím to a baví ma to' },
        { v: 'tuzim', label: 'Túžim to vyskúšať' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'lit_nahlas', typ: 'jeden',
      text: 'Čítanie úryvku nahlas partnerovi/partnerke ako predohra',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, radšej si to nechám pre seba' },
      ],
    },
    { druh: 'otazka', id: 'lit_zdielat', typ: 'text', text: 'Príbeh/scéna, ktorá ma najviac oslovila a chcel(a) by som ju zdieľať:' },
  ],
}

// ── Platformy na tvorbu obsahu (OnlyFans a podobné) ─────────────────
const PLATFORMY: Blok = {
  druh: 'skupina', id: 'platformy', nadpis: 'Platformy na tvorbu obsahu (OnlyFans a podobné)',
  uvod:
    'Ide o zásadne inú vec než súkromný sexting — obsah smeruje k cudzím ľuďom, často za peniaze. ' +
    'Riziká: reputácia, anonymita, finančné stopy, možnosť úniku. Vyžaduje spoločný súhlas oboch, nie rozhodnutie jedného.',
  bloky: [
    {
      druh: 'otazka', id: 'plat_postoj', typ: 'jeden',
      text: 'Náš spoločný postoj k platformám na tvorbu platieného intímneho obsahu',
      moznosti: [
        { v: 'ano_podmienky', label: 'Áno, za prísnych podmienok (napr. bez tváre, pseudonym)' },
        { v: 'mozno', label: 'Možno, potrebujeme sa o tom viac porozprávať' },
        { v: 'nie', label: 'Nie, nechceme to' },
      ],
    },
    {
      druh: 'otazka', id: 'plat_riziko', typ: 'viac',
      text: 'Čo by sme museli mať ošetrené, ak by sme do toho išli',
      moznosti: [
        { v: 'anonymita', label: 'Úplná anonymita (žiadna tvár, žiadne rozpoznateľné znaky)' },
        { v: 'financie', label: 'Oddelené financie/účet' },
        { v: 'suhlas_oboch', label: 'Výslovný súhlas oboch pred každým zverejnením' },
        { v: 'ukoncenie', label: 'Jasná dohoda, ako a kedy s tým prestaneme' },
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
    {
      druh: 'otazka', id: 'kam_ovladanie_pravidla', typ: 'viac',
      text: 'Ak by sme skúsili hračku na diaľkové ovládanie, čo potrebujem mať vopred jasné',
      moznosti: [
        { v: 'kto_ovlada', label: 'Kto drží ovládač (ja/partner/striedavo) — nie oboje naraz' },
        { v: 'casove_okno', label: 'Vopred dohodnuté časové okno, nie kedykoľvek bez varovania' },
        { v: 'okamzite_vypnutie', label: 'Moje okamžité právo vypnúť/požiadať o zastavenie, bez otázok' },
        { v: 'len_suvkromie', label: 'Len v súkromí, nikdy na verejnosti' },
      ],
    },
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
    EROTICKA_LITERATURA,
    KAMERA_VR,
    PLATFORMY,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
