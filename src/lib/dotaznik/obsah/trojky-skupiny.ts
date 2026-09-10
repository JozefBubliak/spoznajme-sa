import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Trojky, skupiny a gangbang — modul „Otvorenosť a zapojenie iných".
// Zdroj: „24_Trojky_skupiny_a_gangbang" (mišmaš viacerých návrhov — zjednotené,
// exaktné duplikáty spojené, každá odlišná otázka zachovaná).
// Mužská (m) / ženská (z) verzia zrkadlová: rovnaké id + hodnoty.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

// Postoj k CNM scenáru (opakovaná škála naprieč celým dokumentom).
const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
  { v: 'ak_chce', label: g('Rád to spravím, ak po tom druhý túži', 'Rada to spravím, ak po tom druhý túži') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]

const STREDOBOD_POCIT: Moznost[] = [
  { v: 'milujem', label: 'Milujem túto dynamiku, je to môj sen' },
  { v: 'mozno', label: g('Možno, rád by som to vyskúšal', 'Možno, rada by som to vyskúšala') },
  { v: 'nie', label: 'Nie, preferujem rovnakú pozornosť medzi všetkými' },
]

const ROLY_DYNAMIKA: Moznost[] = [
  { v: 'dominant', label: 'Jeden partner je dominantný a vedie celú dynamiku' },
  { v: 'vyvazene', label: 'Role sú vyvážené, všetci na rovnakej úrovni' },
  { v: 'striedanie', label: 'Role sa striedajú (raz dominant, raz submisívny)' },
]

const postojOtazka = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka',
  id,
  typ: 'skala',
  text,
  moznosti: POSTOJ,
  inePovolene: true,
})

// ── MMF ───────────────────────────────────────────────────────────────────
const MMF: Blok = {
  druh: 'skupina',
  id: 'mmf',
  nadpis: 'Trojka s ďalším mužom (MMF)',
  uvod: g(
    'Predstav si, že si so svojou partnerkou a ďalším mužom — sleduješ, ako si užíva pozornosť, alebo vedieš tempo, prípadne sa staneš aktívnou súčasťou zážitku.',
    'Predstav si dvoch mužov, ktorí sa sústredia na teba — ich pohľady, dotyky, dych. Môžeš mať všetko pod kontrolou, alebo sa poddať a nechať sa unášať.',
  ),
  bloky: [
    postojOtazka('mmf_postoj', g(
      'Vzrušuje ťa predstava trojky s partnerkou a ďalším mužom?',
      'Vzrušuje ťa predstava trojky s tvojím partnerom a ďalším mužom?',
    )),
    {
      druh: 'otazka',
      id: 'mmf_rozdelenie',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké rozdelenie pozornosti preferuješ? (Vyber všetky, ktoré ťa vzrušujú.)',
      moznosti: [
        { v: 'len_jej', label: g('Dvaja muži sa venujú len partnerke, bez interakcie medzi sebou', 'Dvaja muži sa venujú len mne, bez interakcie medzi sebou') },
        { v: 'aj_sebe', label: g('Dvaja muži sa venujú partnerke aj sebe navzájom', 'Dvaja muži sa venujú mne aj sebe navzájom') },
        { v: 'jeden_asistuje', label: 'Jeden muž je stredobodom, druhý mu asistuje a sleduje' },
        { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_stredobod_pocit',
      typ: 'jeden',
      text: g('Aká je tvoja predstava, keď sa dvaja muži venujú len partnerke?', 'Aká je tvoja predstava, keď sa obaja venujú len tebe?'),
      moznosti: STREDOBOD_POCIT,
    },
    {
      druh: 'otazka',
      id: 'mmf_prijat',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké interakcie by si chcel(a) prijať od druhého muža?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'hladenie', label: 'Hladenie tela, rúk, stehien, krku' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou' },
        { v: 'dvojita_penetracia', label: 'Dvojitá penetrácia' },
        { v: 'oral', label: 'Orálna stimulácia' },
        { v: 'ziadna', label: 'Nepreferujem interakciu s ďalším mužom — chcem sa sústrediť len na partnera/ku' },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_poskytnut',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké interakcie by si chcel(a) poskytnúť druhému mužovi?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'hladenie', label: 'Hladenie jeho tela, skúmanie jeho reakcií' },
        { v: 'oral', label: 'Poskytovanie orálnej stimulácie' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou' },
        { v: 'ziadna', label: 'Nepreferujem interakciu s ďalším mužom' },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_medzi_muzmi',
      typ: 'viac',
      inePovolene: true,
      text: 'Ako vnímaš interakciu medzi dvoma mužmi?',
      podmienka: { pohlavie: 'm' },
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie medzi mužmi (jemné alebo vášnivé)' },
        { v: 'hladenie', label: 'Hladenie tela druhého muža (hruď, ramená)' },
        { v: 'oral', label: 'Poskytovanie orálnej stimulácie druhému mužovi' },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhým mužom' },
      ],
    },
  ],
}

// ── FMF ───────────────────────────────────────────────────────────────────
const FMF: Blok = {
  druh: 'skupina',
  id: 'fmf',
  nadpis: 'Trojka s ďalšou ženou (FMF)',
  uvod: g(
    'Predstav si, že si obklopený dvoma ženami — ich vzájomná chémia pridáva na intenzite. Môžeš si užívať ich pozornosť naplno, alebo sledovať, ako sa venujú aj sebe navzájom.',
    'Zapojenie ďalšej ženy môže byť cestou k objaveniu svojej sexuality v bezpečnom prostredí. Pohľad na partnera, ako si to užíva, môže byť zdrojom tvojho vlastného vzrušenia.',
  ),
  bloky: [
    postojOtazka('fmf_postoj', g(
      'Vzrušuje ťa predstava trojky s partnerkou a ďalšou ženou?',
      'Vzrušuje ťa predstava trojky so ženou a tvojím partnerom?',
    )),
    {
      druh: 'otazka',
      id: 'fmf_rozdelenie',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké rozdelenie pozornosti preferuješ? (Vyber všetky, ktoré ťa vzrušujú.)',
      moznosti: [
        { v: 'dve_aj_sebe', label: g('Ty a druhá žena sa venujete partnerke aj sebe navzájom', 'Ty a druhá žena sa venujete partnerovi aj sebe navzájom') },
        { v: 'dve_len_jemu', label: g('Ty a druhá žena sa venujete len partnerke, bez vzájomnej interakcie', 'Ty a druhá žena sa venujete len partnerovi, bez vzájomnej interakcie') },
        { v: 'ja_stredobod', label: 'Ja som stredobodom pozornosti — obaja sa venujú len mne' },
        { v: 'druha_stredobod', label: 'Druhá žena je stredobodom pozornosti' },
        { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
        { v: 'pozorovatel', label: g('Byť len pozorovateľom — vzrušuje ma tá predstava, ale ostávam neaktívny', 'Byť len pozorovateľkou — vzrušuje ma tá predstava, ale ostávam neaktívna') },
      ],
    },
    {
      druh: 'otazka',
      id: 'fmf_stredobod_pocit',
      typ: 'jeden',
      text: g('Aká je tvoja predstava, keď sa obaja venujú len tebe?', 'Aká je tvoja predstava, keď sa obaja venujú len tebe?'),
      moznosti: STREDOBOD_POCIT,
    },
    {
      druh: 'otazka',
      id: 'fmf_prijat_ona',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo by si si rád(a) užil(a) od druhej ženy?',
      podmienka: { pohlavie: 'z' },
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — jemné, vášnivé, skúmavé' },
        { v: 'hladenie', label: 'Hladenie pŕs, tela, vnímanie jej dotykov' },
        { v: 'oral', label: 'Jej jazyk na tvojom tele, orálna stimulácia' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou na intímnych miestach' },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhou ženou' },
      ],
    },
    {
      druh: 'otazka',
      id: 'fmf_poskytnut_ona',
      typ: 'viac',
      inePovolene: true,
      text: 'A čo by si bola ochotná spraviť ty?',
      podmienka: { pohlavie: 'z' },
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — vášnivo, zvedavo, hravo' },
        { v: 'hladenie', label: 'Hladenie jej pŕs, tela, sledovanie jej reakcií' },
        { v: 'oral', label: 'Poskytovanie orálnej stimulácie' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou, hra s jej vzrušením' },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhou ženou' },
      ],
    },
  ],
}

// ── Skupinový sex ─────────────────────────────────────────────────────────
const SKUPINY: Blok = {
  druh: 'skupina',
  id: 'skupiny',
  nadpis: 'Skupinový sex (group play)',
  uvod: 'Keď sa hranice rozplývajú a všetci sú súčasťou zážitku — viacero párov, rotujúca výmena, orgie „každý s každým".',
  bloky: [
    {
      druh: 'otazka',
      id: 'skup_scenare',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké scenáre v rámci skupinového sexu si vieš predstaviť?',
      moznosti: [
        { v: 'viacero_parov', label: 'Viacero párov v jednej miestnosti s voľnou výmenou partnerov' },
        { v: 'striedanie', label: 'Striedanie partnerov v rámci skupiny (rotujúca výmena)' },
        { v: 'gangbang', label: g('Gangbang — viacerí muži sústredení na partnerku', 'Gangbang — viacerí muži sústredení na mňa') },
        { v: 'bukkake', label: 'Bukkake' },
        { v: 'oralny_gang', label: 'Skupinová hra s orálnym sexom' },
      ],
    },
    postojOtazka('orgie_postoj', 'Chcel(a) by si byť súčasťou orgie, kde sa každý môže zapojiť s každým?'),
    postojOtazka('kazdy_postoj', 'Chcel(a) by si byť súčasťou aktivity, kde každý môže preskúmať interakcie s kýmkoľvek v miestnosti?'),
    postojOtazka('kazdy_kombinacia', 'Cítiš vzrušenie pri myšlienke na kombináciu dotykov, bozkov a viacnásobných interakcií počas jednej aktivity?'),
    postojOtazka('kazdy_sloboda', 'Túžiš slobodne objavovať nové interakcie vo väčšej skupine, pričom vieš, že tvoj partner je s tebou?'),
  ],
}

// ── Gangbang & bukkake ────────────────────────────────────────────────────
const GANGBANG: Blok = {
  druh: 'skupina',
  id: 'gangbang',
  nadpis: 'Gangbang a bukkake',
  uvod: g(
    'Predstav si, že sleduješ partnerku ako stredobod pozornosti viacerých mužov — ako súčasť hry, alebo ako divák a opora.',
    'Predstav si, že si stredobodom pozornosti. Každý dotyk, každý pohľad patrí tebe, zatiaľ čo partner ťa podporuje — či ako súčasť hry, alebo ako divák.',
  ),
  bloky: [
    postojOtazka('gb_postoj', g(
      'Chcel by si vidieť partnerku v dynamike gangbang, kde je stredobodom pozornosti viacerých mužov?',
      'Chcela by si zažiť gangbang, kde sa viacerí muži zamerajú na tvoje potešenie a ty budeš stredobodom pozornosti?',
    )),
    postojOtazka('gb_partner_pritomnost', g(
      'Chcel by si byť súčasťou gangbang aktivity partnerky — ako zapojený účastník alebo podporný pozorovateľ?',
      'Chcela by si, aby bol partner prítomný — ako pozorovateľ alebo zapojený účastník — keď si užívaš s viacerými mužmi?',
    )),
    {
      druh: 'otazka',
      id: 'gb_partner_rola',
      typ: 'jeden',
      text: 'Akú rolu má mať partner pri gangbangu?',
      moznosti: [
        { v: 'ucastnik', label: 'Zapojený účastník' },
        { v: 'pozorovatel', label: 'Pasívny pozorovateľ' },
        { v: 'opora', label: 'Podpora v pozadí' },
      ],
    },
    {
      druh: 'otazka',
      id: 'gb_aktivity',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo môže gangbang zahŕňať (v rámci mojich hraníc)?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'dotyky', label: 'Dotyky' },
        { v: 'oral', label: 'Orálny sex' },
        { v: 'penetracia', label: 'Penetrácia' },
      ],
    },
    postojOtazka('bk_postoj', g(
      'Chcel by si sledovať, ako si partnerka užíva bukkake — ako divák alebo aktívny účastník?',
      'Chcela by si zažiť bukkake — byť centrom pozornosti, keď viacerí muži ukončia svoje vzrušenie na tvojom tele?',
    )),
    {
      druh: 'otazka',
      id: 'bk_miesta',
      typ: 'viac',
      inePovolene: true,
      text: 'Dohodnuté miesta pre ejakuláciu (čo je v poriadku)',
      moznosti: [
        { v: 'telo', label: 'Telo' },
        { v: 'prsia', label: 'Prsia' },
        { v: 'tvar', label: 'Tvár' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'nie_tvar', label: 'Kamkoľvek okrem tváre' },
      ],
    },
  ],
}

// ── Pozorovanie ───────────────────────────────────────────────────────────
const POZOROVANIE: Blok = {
  druh: 'skupina',
  id: 'pozorovanie',
  nadpis: 'Pozorovanie',
  uvod: 'Byť len pozorovateľom je jemný vstup do skupinových aktivít — zažiť atmosféru bez nutnosti aktívneho zapojenia.',
  bloky: [
    postojOtazka('voyeur_postoj', 'Chcel(a) by si byť pasívnym pozorovateľom počas skupinových aktivít — len sledovať bez aktívneho zapojenia?'),
    postojOtazka('watch_partner_postoj', 'Chcel(a) by si sledovať svojho partnera pri intímnej aktivite s inou osobou?'),
  ],
}

// ── Rámec, súhlas, bezpečnosť ─────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Rámec, súhlas a bezpečnosť',
  uvod: 'Skôr než sa do čohokoľvek pustíte — dohody, ochrana, výber osoby, miesto, aftercare.',
  bloky: [
    {
      druh: 'otazka',
      id: 'ramec_pravidla',
      typ: 'viac',
      text: 'Čo si chceme dohodnúť pred začiatkom?',
      moznosti: [
        { v: 'ano_mozno_nikdy', label: 'Zoznam „čo áno / možno / nikdy"' },
        { v: 'stop', label: 'Stop-slovo alebo gesto (semafor)' },
        { v: 'len_pozorujem', label: '„Len pozorujem" je platná voľba' },
        { v: 'komunikacia', label: 'Komunikácia a rešpekt počas celej scény' },
        { v: 'exit', label: 'Exit signál — „končíme, ideme domov"' },
        { v: 'aftercare', label: 'Aftercare ako pevná súčasť' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_ochrana',
      typ: 'viac',
      text: 'Ochrana zdravia — naše pravidlá',
      moznosti: [
        { v: 'kondomy', label: 'Kondómy pre každého účastníka' },
        { v: 'bariery', label: 'Bariéry (dental dam) pri oráli' },
        { v: 'test', label: 'Test STI v dohodnutom limite pred stretnutím' },
        { v: 'vymena', label: 'Výmena ochrany medzi partnermi a zónami' },
        { v: 'prestavky', label: 'Hygienické prestávky' },
        { v: 'poradie', label: 'Jasné poradie aktivít' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_latky',
      typ: 'jeden',
      text: 'Alkohol a látky',
      moznosti: [
        { v: 'bez', label: 'Radšej úplne bez' },
        { v: 'jeden', label: 'Maximálne jeden drink' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_aftercare',
      typ: 'viac',
      text: 'Aftercare a debrief',
      moznosti: [
        { v: 'zaklad', label: 'Nápoj, prikrytie, objatie hneď po' },
        { v: 'dva_dva', label: '„2+2" — dve veci super, dve na úpravu' },
        { v: 'checkin', label: 'Check-in po 24 hodinách (pocity, žiarlivosť, čo nabudúce)' },
        { v: 'samostatne', label: 'Debrief osamote len s partnerom' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_foto',
      typ: 'jeden',
      text: 'Foto / video',
      moznosti: [
        { v: 'nie', label: 'Striktne nie — žiadne záznamy' },
        { v: 'bez_tvari', label: 'Len s výslovným súhlasom všetkých, bez tvárí' },
        { v: 'ano_pravidla', label: 'Áno, s pravidlami (kto vlastní a maže)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_vyber_osoby',
      typ: 'viac',
      inePovolene: true,
      text: 'Výber tretej osoby — čo je pre nás dôležité',
      moznosti: [
        { v: 'dovera', label: 'Dôveryhodnosť a rešpekt k hraniciam' },
        { v: 'plus18', label: '18+' },
        { v: 'pravidla', label: 'Kompatibilita s pravidlami páru' },
        { v: 'hygiena', label: 'Bezpečnostné a hygienické návyky, testy' },
        { v: 'znamy', label: 'Priateľ známy obom' },
        { v: 'novy', label: 'Nový človek' },
        { v: 'klub', label: 'Len cez overený klub' },
        { v: 'pozorovanim', label: 'Začať pozorovaním' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_miesto',
      typ: 'viac',
      inePovolene: true,
      text: 'Kde by nám to bolo komfortné',
      moznosti: [
        { v: 'doma', label: 'Doma' },
        { v: 'hotel', label: 'Hotel alebo prenajatý priestor' },
        { v: 'klub', label: 'Klub (s možnosťou „len pozorovať")' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    { druh: 'otazka', id: 'ramec_nudzovy_plan', typ: 'text', text: 'Núdzový plán (prerušenie bez vysvetľovania, bezpečný odvoz, následná starostlivosť):' },
  ],
}

// ── Emócie & žiarlivosť ───────────────────────────────────────────────────
const EMOCIE: Blok = {
  druh: 'skupina',
  id: 'emocie',
  nadpis: 'Emócie, žiarlivosť, zdieľanie',
  bloky: [
    { druh: 'otazka', id: 'emo_ocakavanie', typ: 'text', text: 'Čo očakávam od svojich emócií (vzrušenie × zraniteľnosť, zmiešané pocity sú normálne):' },
    { druh: 'otazka', id: 'emo_ziarlivost', typ: 'text', text: 'Čo u mňa spúšťa žiarlivosť a aké mám limity:' },
    { druh: 'otazka', id: 'emo_hinty', typ: 'text', text: 'Naše dohodnuté „comfort-hinty" (ruka, pohľad, slovo):' },
    {
      druh: 'otazka',
      id: 'emo_zdielanie',
      typ: 'jeden',
      text: 'Zdieľanie detailov po akcii',
      moznosti: [
        { v: 'ano', label: 'Áno, vzrušuje ma to' },
        { v: 'ak_chce', label: 'Len ak to chce počuť aj druhý' },
        { v: 'nie', label: 'Nie, nechcem detaily' },
      ],
    },
  ],
}

// ── DP/DAP „edge" screening ───────────────────────────────────────────────
const EDGE: Blok = {
  druh: 'skupina',
  id: 'edge',
  nadpis: 'Dvojitá penetrácia (DP/DAP) — samostatná karta',
  uvod: 'Rizikovejšia oblasť — najprv len ako screening fantázie, do reality len s jasnými podmienkami a bezpečnosťou.',
  bloky: [
    {
      druh: 'otazka',
      id: 'edge_dp',
      typ: 'jeden',
      text: 'Dvojitá penetrácia — kde som?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia' },
        { v: 'mozno', label: 'Možno, s jasnými podmienkami a bezpečnosťou' },
        { v: 'ano', label: 'Áno, s podmienkami' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'edge_dp_podmienky',
      typ: 'text',
      text: 'Za akých podmienok (bezpečnosť, pomôcky namiesto druhej osoby, poradie):',
      podmienka: { ot: 'edge_dp', jeNiektora: ['mozno', 'ano'] },
    },
  ],
}

export const TROJKY_SKUPINY: TemaObsah = {
  slug: 'trojky-skupiny/trojky-skupiny',
  nadpis: 'Trojky, skupiny a gangbang',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'preco_trojka',
      nadpis: 'Prečo práve trojka?',
      telo:
        'Novosť a vzrušenie — zapojenie tretej osoby pridáva nový rozmer k známej dynamike.\n\n' +
        'Sústredenie pozornosti — byť stredobodom dvoch osôb posilňuje sebavedomie.\n\n' +
        'Dôvera a komunikácia — príležitosť prehĺbiť dôveru, ak stojí na rešpekte a jasných hraniciach.\n\n' +
        'Objavenie nových túžob — spoznať skryté túžby partnera aj seba.\n\n' +
        'Spoločný zážitok — pre mnohé páry emocionálny zážitok, ktorý vzťah posilní.',
    },
    {
      druh: 'text',
      id: 'konfiguracie',
      nadpis: 'Možné dynamiky a konfigurácie',
      telo:
        'Trojka môže mať podobu MMF (dvaja muži + žena), FMF (dve ženy + muž), alebo homogénnych skupín (MMM / FFF). ' +
        'Niekedy je stredobodom jedna osoba, inokedy sa vášeň delí rovnomerne. Dôležité je, aby ste si dynamiku a pravidlá určili spoločne vopred.',
    },
    {
      druh: 'text',
      id: 'ako_prijemne',
      nadpis: 'Ako zabezpečiť, aby to bolo príjemné pre všetkých',
      ton: 'info',
      telo:
        'Otvorená komunikácia o hraniciach, očakávaniach a túžbach. Dohodnuté pravidlá (kto s kým, čo je a nie je prijateľné). ' +
        'Výber osoby, ktorá rešpektuje hranice a je emocionálne stabilná. Ochrana a pravidelné testovanie. ' +
        'Aftercare — čas na diskusiu, vyjadrenie pocitov a emocionálnu starostlivosť.',
    },
  ],
  telo: [
    {
      druh: 'otazka',
      id: 'troj_dynamika',
      typ: 'viac',
      inePovolene: true,
      text: 'Aký typ dynamiky preferuješ pri trojke? (Vyber všetky, ktoré ťa oslovujú.)',
      moznosti: [
        { v: 'jedna_stredobod', label: 'Jedna osoba ako stredobod pozornosti (všetci sa venujú jednej)' },
        { v: 'rovnaka', label: 'Rovnaká pozornosť venovaná všetkým (každý sa venuje každému)' },
        { v: 'dve_tretej', label: 'Dve osoby sa venujú tretej bez interakcie medzi sebou' },
        { v: 'jedna_pasivna', label: 'Jedna osoba má pasívnu rolu (pozorovateľ), zvyšné dve interagujú' },
      ],
    },
    {
      druh: 'otazka',
      id: 'troj_aktivita',
      typ: 'jeden',
      text: 'Chceš byť počas trojky aktívny/á alebo skôr pasívny/á?',
      moznosti: [
        { v: 'aktivny', label: 'Chcem byť aktívny/á a zapojiť sa naplno' },
        { v: 'pasivny', label: 'Rád/rada by som bol/a v pasívnej úlohe (sledovanie, jemné zapojenie)' },
        { v: 'diskusia', label: 'Nie som si istý/á — preferujem diskusiu predtým' },
      ],
    },
    MMF,
    FMF,
    {
      druh: 'otazka',
      id: 'troj_roly',
      typ: 'viac',
      text: 'Chceš skúsiť situáciu, kde…',
      moznosti: ROLY_DYNAMIKA,
    },
    {
      druh: 'skupina',
      id: 'hranice',
      nadpis: 'Hranice a komfort pri trojke',
      uvod: 'Toto, čo tu nezvolíš, sa automaticky považuje za tabu. Nikto nechce nepríjemné prekvapenia.',
      bloky: [
        {
          druh: 'otazka',
          id: 'hr_aktivity_partner_treti',
          typ: 'viac',
          inePovolene: true,
          text: 'Aké aktivity si vieš predstaviť medzi partnerom/kou a treťou osobou?',
          moznosti: [
            { v: 'bozk', label: 'Bozkávanie medzi partnerom a treťou osobou' },
            { v: 'oral', label: 'Orálna stimulácia medzi partnerom a treťou osobou' },
            { v: 'penetracia', label: 'Penetrácia medzi partnerom a treťou osobou' },
            { v: 'pomocky', label: 'Hranie sa s erotickými pomôckami' },
            { v: 'ds', label: 'Dominantno-submisívne prvky (zväzovanie, príkazy, podriadenie)' },
            { v: 'sleduje', label: 'Partner sleduje, ale nezasahuje' },
            { v: 'aktivne', label: 'Partner sa zapája aktívne so všetkými' },
          ],
        },
        {
          druh: 'otazka',
          id: 'hr_tabu',
          typ: 'viac',
          inePovolene: true,
          text: 'Čo je pre teba tabu a v trojke to neprijmeš?',
          moznosti: [
            { v: 'bozk', label: 'Partner bozkáva tretiu osobu' },
            { v: 'oral_dava', label: 'Partner poskytuje orál tretej osobe' },
            { v: 'oral_prijima', label: 'Partner prijíma orál od tretej osoby' },
            { v: 'penetracia', label: 'Penetrácia medzi partnerom a treťou osobou' },
            { v: 'viac_kontaktu', label: 'Partner má viac fyzického kontaktu s treťou osobou ako so mnou' },
            { v: 'rovnake_pohlavie', label: 'Akákoľvek interakcia medzi rovnakým pohlavím' },
            { v: 'bdsm', label: 'Akékoľvek BDSM prvky (zväzovanie, škrtenie, facky)' },
          ],
        },
        {
          druh: 'otazka',
          id: 'hr_vidiet_partnera',
          typ: 'jeden',
          text: 'Ako by si sa cítil/a, keby si videl/a svojho partnera v akcii s treťou osobou?',
          moznosti: [
            { v: 'vzrusuje', label: 'Vzrušuje ma to, chcem to skúsiť' },
            { v: 'mozno', label: 'Možno, musel/a by som to vidieť a posúdiť' },
            { v: 'nie', label: 'Nie, neviem si to predstaviť' },
          ],
        },
      ],
    },
    SKUPINY,
    GANGBANG,
    POZOROVANIE,
    RAMEC,
    EMOCIE,
    EDGE,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'zaver',
      nadpis: 'Záver sekcie — trojka ako cesta k novým zážitkom',
      telo:
        'Výsledky zohľadnia len zhody medzi tebou a partnerom — dostanete iba možnosti, ktoré sú pre vás oboch prijateľné a vzrušujúce. ' +
        'Žiadny nátlak, len rešpekt, komunikácia a spoločné objavovanie. Ak striktne niekto niečo odmietne, vo výsledku sa to nezobrazí.',
    },
  ],
}
