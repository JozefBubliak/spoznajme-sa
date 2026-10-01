import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Digitálna a diaľková intimita — modul H8.
// Zdroje: „28_Sexting_fotky_a_videa.docx" a „27_Digitalna_intimita_a_porno.docx"
// boli prázdne; ďalší obsah nájdený v zdroj.docx P361–403 (GLOBAL-002).
// Pôvodné autorské bloky doplnené podľa súvislého zdroja a podľa
// existujúcich L4 seedov modulu — spolu presne pokrývajú oba pôvodné
// názvy: sexting/fotky/videá, ukladanie a riziko, porno spolu, kamera/VR/
// hračky na diaľku. z/m verzia zrkadlová.
// Doplnené 2026-10-01: pornografické motívy v 42 krajinách, partnered/solo/
// secret use (Zhou et al. 2025), AI-supported sexuality a digisexuality
// (nemecké národné prieskumy 2024–2026), Scarleteen a Autostraddle worksheety.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string): TemaObsah['nadpis'] => ({ m, z })

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

const MEDIA_FORMY: Blok = {
  druh: 'skupina', id: 'media_formy', nadpis: 'Erotické médiá podľa formy, motívu a spôsobu používania',
  uvod:
    g(
      'Erotické médium nie je iba video. Niekto potrebuje hlas a fantáziu, iný príbeh, interaktivitu alebo spoločné objavovanie. Rovnako dôležité ako obsah je, či ho používam sám, s vedomím partnerky, tajne alebo priamo spolu s ňou.',
      'Erotické médium nie je iba video. Niekto potrebuje hlas a fantáziu, iný príbeh, interaktivitu alebo spoločné objavovanie. Rovnako dôležité ako obsah je, či ho používam sama, s vedomím partnera, tajne alebo priamo spolu s ním.',
    ),
  bloky: [
    {
      druh: 'otazka', id: 'med_formy', typ: 'viac', inePovolene: true,
      text: 'Ktoré formy erotického obsahu ma priťahujú',
      moznosti: [
        { v: 'video', label: 'Pornografické video alebo krátke klipy' },
        { v: 'foto', label: 'Fotografie a erotické vizuály' },
        { v: 'audio', label: 'Audio erotika, hlasové príbehy alebo erotický ASMR' },
        { v: 'knihy', label: 'Romány, poviedky alebo erotická literatúra' },
        { v: 'fanfiction', label: 'Fanfiction a známe postavy v nových scenároch' },
        { v: 'hentai', label: 'Hentai, animácia, komiks alebo ilustrovaná erotika' },
        { v: 'hry', label: 'Interaktívne erotické hry alebo príbehy s voľbami' },
        { v: 'cam', label: 'Živá cam show alebo interakcia s performerom' },
        { v: 'vr', label: 'VR, 360° video alebo avatarové prostredie' },
        { v: 'ai_text', label: 'AI erotický príbeh alebo roleplay chatbot' },
        { v: 'ai_obraz', label: 'AI generované obrázky alebo personalizované video' },
        { v: 'sync', label: 'Obsah synchronizovaný s hračkou' },
      ],
    },
    {
      druh: 'otazka', id: 'med_motivy', typ: 'viac', inePovolene: true,
      text: 'Čo od erotického média najčastejšie chcem',
      moznosti: [
        { v: 'rychle_vzrusenie', label: 'Rýchlo prebudiť vzrušenie' },
        { v: 'fantazia', label: 'Zažiť fantáziu, ktorú nechcem robiť v realite' },
        { v: 'inspiracia', label: 'Nájsť techniku, scénu alebo slová pre nás dvoch' },
        { v: 'solo', label: 'Súkromný sólo priestor' },
        { v: 'spolu', label: g('Spoločná predohra a sledovanie reakcie partnerky', 'Spoločná predohra a sledovanie reakcie partnera') },
        { v: 'novota', label: 'Novosť, prekvapenie alebo tabu' },
        { v: 'pribeh', label: 'Emocionálny príbeh a pomalé budovanie napätia' },
        { v: 'identita', label: 'Skúmať rolu, orientáciu alebo stránku seba bez záväzku konať' },
      ],
    },
    {
      druh: 'otazka', id: 'med_pouzivanie', typ: 'viac', inePovolene: true,
      text: 'Ako chcem médiá používať v našom vzťahu',
      moznosti: [
        { v: 'solo_sukromne', label: 'Sólo a súkromne, bez povinnosti hlásiť konkrétny obsah' },
        { v: 'solo_otvorene', label: 'Sólo, ale otvorene vieme, že to obaja používame' },
        { v: 'spolu_vyber', label: 'Spoločne vyberať a pozerať alebo počúvať' },
        { v: 'striedat_kurator', label: g('Striedať sa v kurátorovaní večera pre partnerku', 'Striedať sa v kurátorovaní večera pre partnera') },
        { v: 'poslat_tip', label: 'Posielať si klip, príbeh alebo audio ako nepriamu fantáziu' },
        { v: 'vytvorit_spolu', label: 'Spoločne vytvoriť text, audio, fotku alebo video iba pre nás' },
        { v: 'ai_spolu', label: 'Spoločne zadávať AI scenár a sledovať, kam sa príbeh vyvinie' },
      ],
    },
    {
      druh: 'otazka', id: 'med_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje forma alebo obsah, ktorý sám nevyhľadávam', 'Keď partnera vzrušuje forma alebo obsah, ktorý sama nevyhľadávam'),
      moznosti: [
        { v: 'zvedavost', label: g('Som zvedavý, čo sa jej na tom páči', 'Som zvedavá, čo sa mu na tom páči') },
        { v: 'spolu', label: g('Chcem to s partnerkou raz preskúmať ako jej fantáziu', 'Chcem to s partnerom raz preskúmať ako jeho fantáziu') },
        { v: 'solo_ok', label: g('Mne to nič nehovorí, ale partnerkin sólo priestor rešpektujem', 'Mne to nič nehovorí, ale partnerov sólo priestor rešpektujem') },
        { v: 'hranica', label: 'Táto konkrétna forma alebo interakcia prekračuje moju vzťahovú hranicu' },
      ],
    },
    {
      druh: 'otazka', id: 'med_nevera', typ: 'viac', inePovolene: true,
      text: 'Čo už pre mňa môže pôsobiť ako vzťahová nevera alebo zatajenie',
      moznosti: [
        { v: 'tajne_platenie', label: 'Tajné platenie alebo finančné stopy' },
        { v: 'live_osoba', label: 'Interakcia so živým performerom alebo konkrétnou osobou' },
        { v: 'ai_vztah', label: 'Emocionálne pripútanie k AI companionovi' },
        { v: 'real_osoba_ai', label: 'Generovanie sexuálneho obsahu podľa reálnej osoby' },
        { v: 'nahravanie', label: 'Tvorba alebo zverejnenie vlastného obsahu' },
        { v: 'nic', label: 'Samotné médium za neveru nepovažujem; rozhoduje dohoda a utajovanie' },
      ],
    },
    {
      druh: 'text', id: 'med_myty', ton: 'info', nadpis: 'Mýty verzus realita',
      telo:
        'Mýtus: to, čo človek pozerá alebo číta, chce automaticky urobiť. Realita: médiá často slúžia práve na bezpečný priestor pre fantáziu bez želania preniesť ju do života. Mýtus: spoločné porno musí pár porovnávať. Realita: pre mnoho párov je skôr slovníkom — ukáže tempo, dynamiku alebo atmosféru, o ktorej sa ťažko začína hovoriť.',
    },
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
    MEDIA_FORMY,
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
