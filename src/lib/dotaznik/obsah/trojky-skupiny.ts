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
  uvod: 'Skupinová hra môže znamenať viacero párov v jednej miestnosti, rotujúcu výmenu, spoločný orál, orgiu „každý s každým" aj scénu, v ktorej niekto iba sleduje. Každá verzia má inú choreografiu pozornosti.',
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
    {
      druh: 'text', id: 'gb_bk_rozdiel', nadpis: 'Gangbang a bukkake nie sú to isté', ton: 'info',
      telo:
        'Pri gangbangu je jadrom telesná a sexuálna pozornosť viacerých mužov venovaná jednej osobe; môže zahŕňať dotyky, orál aj penetráciu. ' +
        'Bukkake je najmä vizuálne finále s viacerými ejakuláciami na telo alebo tvár a nemusí zahŕňať penetráciu. Jedného človeka môže lákať iba jeden z týchto scenárov.',
    },
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
      text: 'Ktoré aktivity ma v gangbang predstave lákajú?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'dotyky', label: 'Dotyky' },
        { v: 'oral', label: 'Orálny sex' },
        { v: 'penetracia', label: 'Penetrácia' },
        { v: 'pomocky', label: 'Pomôcky a spoločné dráždenie' },
        { v: 'dvojita', label: 'Dvojitá penetrácia alebo jej simulácia' },
      ],
    },
    {
      druh: 'otazka', id: 'gb_motivacia', typ: 'viac', inePovolene: true,
      text: 'Čo ma na gangbangu psychologicky priťahuje',
      moznosti: [
        { v: 'stredobod', label: 'Byť stredobodom obrovskej pozornosti' },
        { v: 'rozmaznavanie', label: 'Pocit rozmaznávania viacerými ľuďmi' },
        { v: 'intenzita', label: 'Fyzická intenzita a množstvo podnetov' },
        { v: 'objektivizacia', label: 'Erotická objektivizácia a „použitie"' },
        { v: 'voyeur', label: g('Sledovať partnerku a jej reakcie', 'Vnímať, že ma partner sleduje') },
        { v: 'cuckold', label: 'Cuckold/hotwife alebo compersion dynamika' },
        { v: 'tabu', label: 'Tabu, odvážnosť a prekročenie bežného scenára' },
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
      text: 'Ktoré miesta ma pri bukkake alebo skupinovom cumshote lákajú',
      moznosti: [
        { v: 'telo', label: 'Telo' },
        { v: 'prsia', label: 'Prsia' },
        { v: 'tvar', label: 'Tvár' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'nie_tvar', label: 'Kamkoľvek okrem tváre' },
      ],
    },
    {
      druh: 'otazka', id: 'bk_vizual', typ: 'viac', inePovolene: true,
      text: 'Čo ma na bukkake priťahuje',
      moznosti: [
        { v: 'vizual', label: 'Vizuál semena na tele' },
        { v: 'ocakavanie', label: 'Očakávanie spoločného finále' },
        { v: 'moc', label: 'Moc, odovzdanie alebo submisivita' },
        { v: 'exhibicia', label: 'Exhibicionizmus a byť sledovaný/á' },
        { v: 'uctievanie', label: 'Pocit, že všetka túžba smeruje na jednu osobu' },
        { v: 'messy', label: 'Messy estetika, vlhkosť a neporiadok' },
      ],
    },
    {
      druh: 'otazka', id: 'bk_zaznam', typ: 'jeden', text: 'Foto alebo video ako súčasť tejto fantázie',
      moznosti: [
        { v: 'nie', label: 'Neláka ma to' },
        { v: 'fantazia', label: 'Láka ma to iba ako fantázia' },
        { v: 'bez_tvare', label: 'Láka ma anonymný záber bez tváre' },
        { v: 'cely', label: 'Láka ma záznam celej scény' },
      ],
    },
    {
      druh: 'text', id: 'gb_bk_myty', nadpis: 'Mýty a realita', ton: 'info',
      telo:
        'Mýtus: gangbang musí byť chaotický alebo ponižujúci. Realita: môže byť pomalý, pozorne choreografovaný a zameraný na rozmaznávanie jednej osoby. ' +
        'Mýtus: bukkake automaticky znamená penetráciu. Realita: pre mnohých je to samostatná vizuálna fantázia alebo finále po orálnej a manuálnej hre. ' +
        'Fantázia o viacerých ľuďoch nie je dôvodom na hanbu a nemusí znamenať nespokojnosť s partnerom.',
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

// ── Scenár, tretia osoba a dozvuk ─────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Scenár, tretia osoba a dozvuk',
  uvod: 'Erotický charakter skupinovej skúsenosti neurčujú iba telá. Mení ho spôsob pozvania, známosť tretej osoby, miesto, rola partnera aj to, ako sa pár po zážitku znovu spojí.',
  bloky: [
    {
      druh: 'otazka',
      id: 'ramec_pravidla',
      typ: 'viac',
      text: 'Ktoré prvky chceme mať v scenári jasne pomenované?',
      moznosti: [
        { v: 'ano_mozno_nikdy', label: 'Kto je stredobodom a ako sa pozornosť strieda' },
        { v: 'stop', label: 'Či sa roly počas scény menia alebo ostávajú stabilné' },
        { v: 'len_pozorujem', label: 'Či niekto začína iba ako pozorovateľ' },
        { v: 'komunikacia', label: 'Aké slová, príkazy alebo pochvaly patria do atmosféry' },
        { v: 'exit', label: 'Ako sa scéna prirodzene uzavrie' },
        { v: 'aftercare', label: 'Ako sa pár po zážitku znovu spojí' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_ochrana',
      typ: 'viac',
      text: 'Praktická choreografia večera',
      moznosti: [
        { v: 'kondomy', label: 'Spoločný príchod a odchod páru' },
        { v: 'bariery', label: 'Najprv rozhovor alebo drink, potom presun do intimity' },
        { v: 'test', label: 'Vopred vybraná hudba, svetlo a atmosféra' },
        { v: 'vymena', label: 'Striedanie stredobodu v jednotlivých kolách' },
        { v: 'prestavky', label: 'Prestávky na rozhovor, pozorovanie alebo maznanie' },
        { v: 'poradie', label: 'Vopred predstavený sled aktivít' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_latky',
      typ: 'jeden',
      text: 'Ako plánovaná má byť táto skúsenosť',
      moznosti: [
        { v: 'bez', label: 'Detailne naplánovaná vrátane rolí a poradia' },
        { v: 'jeden', label: 'Pár pevných bodov, zvyšok spontánne' },
        { v: 'nezalezi', label: 'Čo najspontánnejšia podľa energie v miestnosti' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_aftercare',
      typ: 'viac',
      text: 'Dozvuk a spoločná reflexia',
      moznosti: [
        { v: 'zaklad', label: 'Nápoj, objatie a chvíľa páru osamote' },
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
        { v: 'nie', label: 'Záznam ma eroticky neláka' },
        { v: 'bez_tvari', label: 'Anonymný detail alebo záber bez tvárí' },
        { v: 'ano_pravidla', label: 'Celá scéna ako súčasť exhibicionistickej fantázie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_vyber_osoby',
      typ: 'viac',
      inePovolene: true,
      text: 'Výber tretej osoby — čo je pre nás dôležité',
      moznosti: [
        { v: 'dovera', label: 'Silná osobná chémia s oboma' },
        { v: 'plus18', label: 'Sebavedomá a iniciatívna energia' },
        { v: 'pravidla', label: 'Skôr jemná, vnímavá a nenápadná energia' },
        { v: 'hygiena', label: 'Konkrétny vzhľad, štýl alebo telesný typ' },
        { v: 'znamy', label: 'Človek, ktorého už obaja poznáme' },
        { v: 'novy', label: 'Úplne nový človek bez ďalšieho príbehu' },
        { v: 'klub', label: 'Niekto zo swinger/sex-positive prostredia' },
        { v: 'pozorovanim', label: 'Najprv ho/ju iba sledovať v skupine' },
      ],
    },
    { druh: 'otazka', id: 'ramec_preco_osoba', typ: 'text', text: 'Koho si predstavujem ako tretiu osobu — a čo konkrétne ma na nej priťahuje?' },
    {
      druh: 'otazka',
      id: 'ramec_miesto',
      typ: 'viac',
      inePovolene: true,
      text: 'Ktoré miesto má pre nás správnu erotickú atmosféru',
      moznosti: [
        { v: 'doma', label: 'Doma' },
        { v: 'hotel', label: 'Hotel alebo prenajatý priestor' },
        { v: 'klub', label: 'Klub (s možnosťou „len pozorovať")' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    { druh: 'otazka', id: 'ramec_nudzovy_plan', typ: 'text', text: 'Ako chceme po skupinovej scéne prejsť späť do párovej intimity?' },
  ],
}

// ── Emócie & žiarlivosť ───────────────────────────────────────────────────
const EMOCIE: Blok = {
  druh: 'skupina',
  id: 'emocie',
  nadpis: 'Emócie, žiarlivosť, zdieľanie',
  bloky: [
    { druh: 'otazka', id: 'emo_ocakavanie', typ: 'text', text: 'Čo očakávam od svojich emócií (vzrušenie × zraniteľnosť, zmiešané pocity sú normálne):' },
    { druh: 'otazka', id: 'emo_ziarlivost', typ: 'text', text: 'Čo u mňa spúšťa žiarlivosť a aký druh pozornosti by som vtedy chcel(a) od partnera/partnerky:' },
    {
      druh: 'otazka', id: 'emo_spustace', typ: 'viac', inePovolene: true,
      text: 'Ktoré momenty by vo mne mohli miešať vzrušenie so žiarlivosťou',
      moznosti: [
        { v: 'bozk', label: 'Dlhé alebo romantické bozkávanie partnera s treťou osobou' },
        { v: 'orgazmus', label: 'Orgazmus partnera spôsobený treťou osobou' },
        { v: 'pozornost', label: 'Keď tretia osoba dostáva dlhšie viac pozornosti než ja' },
        { v: 'pohlad', label: 'Intenzívny očný kontakt medzi partnerom a treťou osobou' },
        { v: 'rovnake', label: 'Interakcia partnera s osobou rovnakého pohlavia' },
        { v: 'po', label: 'Neha, maznanie alebo ďalší kontakt po sexe' },
        { v: 'bokom', label: 'Pocit, že som sa ocitol/ocitla bokom' },
      ],
    },
    { druh: 'otazka', id: 'emo_hinty', typ: 'text', text: 'Ktoré gesto, pohľad alebo dotyk ma počas scény znovu eroticky prepojí s partnerom/partnerkou?' },
    {
      druh: 'otazka', id: 'emo_compersion', typ: 'jeden', text: 'Ako na mňa pôsobí predstava partnerovej rozkoše s treťou osobou',
      moznosti: [
        { v: 'silno', label: 'Je to silný zdroj môjho vlastného vzrušenia' },
        { v: 'mix', label: 'Vzrušuje ma a zároveň vo mne vyvoláva žiarlivosť' },
        { v: 'neutral', label: 'Som skôr neutrálny/a a zvedavý/á' },
        { v: 'blok', label: 'Skôr ma to eroticky blokuje' },
      ],
    },
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
  uvod: 'Skratky DP a DAP môžu znamenať rôzne fantázie: dve penetrácie naraz, kombináciu tela a pomôcky alebo iba vizuálnu simuláciu. Preto sa oplatí pomenovať konkrétnu predstavu.',
  bloky: [
    {
      druh: 'otazka',
      id: 'edge_dp',
      typ: 'jeden',
      text: 'Dvojitá penetrácia — kde som?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia' },
        { v: 'mozno', label: 'Možno — najviac ma láka simulácia alebo jemnejšia verzia' },
        { v: 'ano', label: 'Áno — chcem ju ako súčasť skupinovej scény' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'edge_dp_podmienky',
      typ: 'text',
      text: 'Aké zloženie osôb, pomôcok a polôh si pri tejto predstave predstavujem:',
      podmienka: { ot: 'edge_dp', jeNiektora: ['mozno', 'ano'] },
    },
    {
      druh: 'otazka', id: 'edge_typy', typ: 'viac', inePovolene: true,
      text: 'Ktoré varianty ma lákajú aspoň vo fantázii',
      moznosti: [
        { v: 'dp_va', label: 'Vaginálna a análna penetrácia súčasne (DP)' },
        { v: 'dvp', label: 'Dvojitá vaginálna penetrácia (DVP)' },
        { v: 'dap', label: 'Dvojitá análna penetrácia (DAP)' },
        { v: 'pomocka', label: 'Jedna osoba a jedna pomôcka' },
        { v: 'dve_pomocky', label: 'Simulácia s dvomi pomôckami' },
        { v: 'oral_pen', label: 'Orálna stimulácia súčasne s penetráciou' },
      ],
    },
    {
      druh: 'text', id: 'edge_mytus', nadpis: 'Fantázia nemusí byť technický plán', ton: 'info',
      telo: 'Dvojitá penetrácia vo fantázii často predstavuje najmä pocit plnosti, množstvo pozornosti alebo úplné odovzdanie. Rovnakú psychologickú vrstvu môže niesť kombinácia prstov, jazyka a pomôcky bez kopírovania pornografického obrazu.',
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
        'Pozorovanie partnerovej rozkoše — voyeurizmus, compersion alebo príjemná dávka žiarlivosti.\n\n' +
        'Objavenie nových túžob — roly, príťažlivosť k rovnakému pohlaviu, služba, dominancia alebo pasívne sledovanie.\n\n' +
        'Trojka nie je test kvality vzťahu. Môže zostať fantáziou, jednorazovou skúsenosťou alebo obľúbenou formou spoločnej sexuality.',
    },
    {
      druh: 'text',
      id: 'konfiguracie',
      nadpis: 'Možné dynamiky a konfigurácie',
      telo:
        'Trojka môže mať podobu MMF (dvaja muži + žena), FMF (dve ženy + muž), alebo homogénnych skupín (MMM / FFF). ' +
        'Niekedy je stredobodom jedna osoba, inokedy sa vášeň delí rovnomerne. Rovnaké zloženie môže pôsobiť úplne inak podľa toho, kto vedie, kto pozoruje a či sa osoby rovnakého pohlavia navzájom dotýkajú.',
    },
    {
      druh: 'text',
      id: 'ako_prijemne',
      nadpis: 'Čo robí trojku eroticky živou',
      ton: 'info',
      telo:
        'Najsilnejší zážitok často nevytvorí počet aktivít, ale choreografia pozornosti: dve osoby sa chvíľu venujú jednej, potom sa stredobod zmení; partneri sa počas scény vyhľadajú pohľadom; pozorovateľ sa neskôr stane aktívnym. ' +
        'Tretia osoba môže priniesť inú energiu, telo, vôňu, techniku alebo rolu. Po zážitku môže páru vyhovovať maznanie, erotické rozprávanie detailov alebo pokojný návrat k intimite vo dvojici.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'troj_konfiguracie', typ: 'viac', inePovolene: true,
      text: 'Ktoré zloženia ma priťahujú aspoň vo fantázii',
      moznosti: [
        { v: 'mmf', label: 'MMF — dvaja muži a žena' },
        { v: 'fmf', label: 'FMF — dve ženy a muž' },
        { v: 'mmm', label: 'MMM — traja muži' },
        { v: 'fff', label: 'FFF — tri ženy' },
        { v: 'stvorka', label: 'Štvorica alebo viac ľudí' },
        { v: 'nezalezi', label: 'Zloženie nie je rozhodujúce, dôležitá je chémia' },
      ],
    },
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
      druh: 'skupina', id: 'matica_interakcii', nadpis: 'Matica interakcií — kto s kým a ako',
      uvod: 'Trojka nemusí znamenať, že každý robí všetko s každým. Oddelené otázky ukážu, či ťa láka kontakt s treťou osobou, sledovanie partnera alebo spoločná aktivita všetkých troch.',
      bloky: [
        {
          druh: 'otazka', id: 'mat_ja_tretia', typ: 'viac', inePovolene: true, text: 'Čo ma láka medzi mnou a treťou osobou',
          moznosti: [
            { v: 'pohlad', label: 'Pohľady a slovné dráždenie' }, { v: 'bozk', label: 'Bozkávanie' },
            { v: 'dotyky', label: 'Dotyky a manuálna stimulácia' }, { v: 'oral', label: 'Orálna stimulácia' },
            { v: 'penetracia', label: 'Penetrácia' }, { v: 'pomocky', label: 'Spoločná hra s pomôckou' },
            { v: 'nic', label: 'Žiadny priamy kontakt — iba spoločná pozornosť partnerovi' },
          ],
        },
        {
          druh: 'otazka', id: 'mat_partner_tretia', typ: 'viac', inePovolene: true, text: 'Čo ma vzrušuje sledovať medzi partnerom/partnerkou a treťou osobou',
          moznosti: [
            { v: 'pohlad', label: 'Flirt a očný kontakt' }, { v: 'bozk', label: 'Bozkávanie' },
            { v: 'dotyky', label: 'Dotyky a manuálna stimulácia' }, { v: 'oral', label: 'Orálna stimulácia' },
            { v: 'penetracia', label: 'Penetrácia' }, { v: 'orgazmus', label: 'Orgazmus partnera/partnerky' },
            { v: 'nic', label: 'Nechcem byť pri ich priamej interakcii' },
          ],
        },
        {
          druh: 'otazka', id: 'mat_vsetci', typ: 'viac', inePovolene: true, text: 'Ktoré spoločné aktivity všetkých troch ma lákajú',
          moznosti: [
            { v: 'bozky', label: 'Striedané bozky a dotyky v kruhu' },
            { v: 'jedna_osoba', label: 'Dvaja sa súčasne venujú jednej osobe' },
            { v: 'oral_manual', label: 'Kombinácia orálu a manuálnej stimulácie' },
            { v: 'pomocka', label: 'Jedna pomôcka používaná viacerými rukami' },
            { v: 'pozorovanie', label: 'Dvaja sa milujú a tretí sleduje alebo masturbuje' },
            { v: 'striedanie', label: 'Postupné striedanie stredobodu' },
          ],
        },
      ],
    },
    {
      druh: 'skupina',
      id: 'hranice',
      nadpis: 'Aktivity a turn-offy pri trojke',
      uvod: 'Príťažlivosť ku konkrétnej aktivite a erotický odpor nie sú vždy presné protiklady. Preto sa tu osobitne pýtame, čo ťa láka a čo ťa pri predstave trojky vypína.',
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
          text: 'Ktoré prvky ma pri predstave trojky eroticky vypínajú?',
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
        'Trojka môže odhaliť, že vás oboch priťahuje rovnaké zloženie, no odlišná rola — jeden chce byť stredobodom, druhý pozorovať alebo viesť. ' +
        'Rovnako hodnotný výsledok je zistenie, že vás viac vzrušuje rozprávanie fantázie, spoločné sledovanie, hra s pomôckami alebo pozorovanie partnera než samotné zapojenie tretej osoby.',
    },
  ],
}
