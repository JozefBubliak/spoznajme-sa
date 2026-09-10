import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Zdieľanie partnera — hotwifing / cuckolding / kandalizmus (modul „Otvorenosť").
// Zdroj: „26_Hotwifing_a_cuckolding_CNM" (mišmaš ~10 návrhov — zjednotené,
// exaktné duplikáty spojené, každý odlišný scenár zachovaný).
// Rámec dokumentu: žena = „hotwife", muž = sledujúci / podporujúci partner.
// z-verzia = pohľad hotwife, m-verzia = pohľad sledujúceho partnera; rovnaké id.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
  { v: 'ak_chce', label: g('Rád to spravím, ak po tom druhý túži', 'Rada to spravím, ak po tom druhý túži') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]

const postojOt = (id: string, text: TemaObsah['nadpis'], napoveda?: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka',
  id,
  typ: 'skala',
  text,
  napoveda,
  moznosti: POSTOJ,
  inePovolene: true,
})

// ── Hotwifing ─────────────────────────────────────────────────────────────
const HOTWIFING: Blok = {
  druh: 'skupina',
  id: 'hotwifing',
  nadpis: 'Hotwifing — sloboda a podpora',
  uvod:
    'Žena si užíva intímne chvíle s inými mužmi za plného súhlasu a podpory partnera. ' +
    'Emocionálna exkluzivita medzi partnermi zostáva neporušená; muž je „hrdý manžel", nie submisívny.',
  bloky: [
    postojOt('hw_diskretne', g(
      'Túžiš, aby mala partnerka diskrétne stretnutie s iným mužom a potom ti o ňom rozprávala?',
      'Túžiš zažiť diskrétne stretnutie s iným mužom (hotel, jeho byt) a potom o ňom partnerovi rozprávať?',
    )),
    postojOt('hw_vopred', g(
      'Chcel by si o stretnutí vedieť vopred a povzbudzovať ju?',
      'Chcela by si, aby o stretnutí partner vedel vopred a povzbudzoval ťa?',
    )),
    postojOt('hw_pritomnost', g(
      'Chceš sledovať partnerku pri sexe s iným mužom vo svojej prítomnosti?',
      'Chcela by si mať sex s iným mužom, kým ťa partner sleduje?',
    )),
    postojOt('hw_zapojenie', g(
      'Chcel by si sa počas aktu jemne zapájať (masáž, bozky, povzbudzovanie)?',
      'Chcela by si, aby sa partner počas aktu jemne zapájal (masáž, bozky, povzbudzovanie)?',
    )),
    postojOt('hw_sloppy', g(
      'Túžiš mať sex s partnerkou hneď po jej návrate od iného muža — cítiť jej vzrušenie a stopy predchádzajúceho aktu („sloppy seconds")?',
      'Túžiš mať sex s partnerom hneď po návrate od iného muža, keď si ešte vzrušená a „použitá" („sloppy seconds")?',
    )),
    postojOt('hw_gloryhole', g(
      'Chceš, aby partnerka zažila anonymný zážitok cez glory hole s tvojím vedomím a podporou?',
      'Chcela by si zažiť anonymný sex cez glory hole s vedomím a podporou partnera?',
    )),
    postojOt('hw_doma_bez', g(
      'Túžiš vedieť, že partnerka mala sex s iným mužom u vás doma, kým si nebol prítomný?',
      'Chcela by si mať sex s iným mužom doma, kým partner nie je prítomný — s jeho vedomím, potom mu o tom rozprávať?',
    )),
    {
      druh: 'otazka',
      id: 'hw_bull',
      typ: 'jeden',
      text: 'Aký typ tretej osoby („bull") preferuješ?',
      moznosti: [
        { v: 'jednorazovo', label: 'Jednorazové stretnutia s rôznymi mužmi' },
        { v: 'staly', label: 'Jeden stály „priateľ" (bull)' },
        { v: 'nevie', label: 'Ešte nevieme' },
      ],
    },
  ],
}

// ── Cuckolding ────────────────────────────────────────────────────────────
const CUCKOLDING: Blok = {
  druh: 'skupina',
  id: 'cuckolding',
  nadpis: 'Cuckolding — dynamika moci',
  uvod:
    'Muž (cuckold) nachádza vzrušenie v submisívnej role, keď sleduje partnerku so „bullom". ' +
    'Žena má dominantnú rolu a kontrolu. Môže zahŕňať prvky poníženia a servisu.',
  bloky: [
    postojOt('ck_submisia', g(
      'Láka ťa submisívna rola pri sledovaní partnerky s iným mužom (ona dominantná, ty pasívny pozorovateľ / „pomocník")?',
      'Chcela by si byť dominantná, zatiaľ čo ťa partner sleduje v submisívnej roli pri sexe s iným mužom?',
    )),
    {
      druh: 'otazka',
      id: 'ck_stupen',
      typ: 'viac',
      text: 'Ktoré stupne zapojenia ťa oslovujú? (Vyber všetky.)',
      moznosti: [
        { v: 'flirt', label: 'Sledovanie flirtovania / erotického tanca s iným mužom' },
        { v: 'dotyky', label: 'Dráždenie a dotyky s inou osobou (rukami, masáž)' },
        { v: 'oral_dava', label: 'Poskytovanie orálneho sexu inému mužovi' },
        { v: 'oral_prijima', label: 'Prijímanie orálneho sexu od iného muža' },
        { v: 'penetracia', label: 'Penetrácia a plný sex s inou osobou' },
        { v: 'viac_muzov', label: 'Viac mužov a jedna žena (gangbang)' },
      ],
    },
    postojOt('ck_kamera', g(
      'Chcel by si partnerku sledovať aj cez kameru / live stream / nahrávky (nie len naživo)?',
      'Bola by si v poriadku s tým, aby ťa partner sledoval cez kameru / live stream / nahrávky?',
    )),
    postojOt('ck_rozpravanie', g(
      'Túžiš namiesto priameho sledovania počúvať detailné rozprávanie o tom, čo sa dialo?',
      'Chcela by si partnerovi detailne rozprávať o sexuálnom akte s inou osobou?',
    )),
    postojOt('ck_servis', g(
      'Chceš byť tým, kto partnerku „očistí" po sexe s iným mužom (orálne, dotykmi)?',
      'Chcela by si, aby ťa partner „očistil" po sexe s iným mužom (orálne, dotykmi)?',
    )),
    postojOt('ck_asistencia', g(
      'Chcel by si plniť submisívne úlohy — pripraviť partnerku na stretnutie (oblečenie, sprcha), pripraviť prostredie, asistovať?',
      'Chcela by si, aby ťa partner pripravoval na stretnutie a asistoval (oblečenie, prostredie)?',
    )),
    {
      druh: 'otazka',
      id: 'ck_ponizovanie',
      typ: 'jeden',
      text: 'Verbálne alebo fyzické ponižovanie cuckolda ako súčasť dynamiky',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'jemne', label: 'Len jemné / za jasných podmienok' },
        { v: 'nie', label: 'Nie — tvrdá hranica' },
      ],
    },
    postojOt('ck_gangbang', g(
      'Láka ťa myšlienka, že je partnerka stredobodom pozornosti viacerých mužov, zatiaľ čo sleduješ?',
      'Chcela by si byť stredobodom pozornosti viacerých mužov (napr. gangbang), zatiaľ čo ťa partner sleduje?',
    )),
    {
      druh: 'otazka',
      id: 'ck_sloppy_detail',
      typ: 'viac',
      inePovolene: true,
      text: 'Ktoré aspekty „použitosti" (second sloppy) ťa priťahujú?',
      napoveda: 'Vyber len to, čo je pre teba v poriadku. Nezvolené = tabu.',
      moznosti: [
        { v: 'vlhkost', label: 'Sex s partnerkou, ktorá je ešte vlhká z predchádzajúceho aktu' },
        { v: 'vona', label: 'Cítiť vôňu iného muža na partnerke' },
        { v: 'cudzie_semeno', label: 'Partnerka má v tele ejakulát iného muža' },
        { v: 'lizanie', label: 'Lízanie alebo dotyky so zvyškami predchádzajúceho aktu' },
        { v: 'bozky', label: 'Zdieľanie počas bozkov alebo orálneho sexu' },
      ],
    },
  ],
}

// ── Kandalizmus ───────────────────────────────────────────────────────────
const KANDALIZMUS: Blok = {
  druh: 'skupina',
  id: 'kandalizmus',
  nadpis: 'Kandalizmus — obdivovanie a exhibícia',
  uvod:
    'Vzrušenie z toho, že je partnerka vystavená pozornosti iných — nemusí ísť o sex. ' +
    'Spája voyeurizmus (partner sleduje reakcie okolia) a exhibíciu (partnerka je stredobodom).',
  bloky: [
    postojOt('kd_obdivovana', g(
      'Túžiš vidieť, ako je partnerka obdivovaná a sledovaná inými mužmi na verejnom mieste?',
      'Túžiš byť obdivovaná inými na verejnom mieste, kým je partner pri tebe a sleduje to?',
    )),
    postojOt('kd_flirt', g(
      'Túžiš sledovať, ako partnerka flirtuje s inými, pričom vieš, že patrí len tebe?',
      'Túžiš flirtovať alebo jemne provokovať iných pred očami partnera?',
    )),
    postojOt('kd_tanec', g(
      'Vzrušuje ťa, keď má partnerka provokatívne oblečenie / erotický tanec priťahujúci pozornosť?',
      'Vzrušuje ťa provokatívne oblečenie / erotický tanec s iným mužom, kým ťa partner sleduje?',
    )),
    postojOt('kd_dotyky_divaci', g(
      'Chcel by si sledovať, ako partnerku dráždi iná osoba (dotyky, erotická masáž) pred divákmi?',
      'Chcela by si sa nechať dráždiť inou osobou (dotyky, erotická masáž) pred divákmi, kým ťa partner sleduje?',
    )),
    postojOt('kd_akt_divaci', g(
      'Túžiš sledovať partnerku pri intímnom akte (bozky, orál, penetrácia) pred vybraným publikom?',
      'Túžiš po intímnom akte (bozky, orál, penetrácia) pred vybraným publikom, kým ťa partner pozoruje?',
    )),
    postojOt('kd_zabery', g(
      'Vzrušuje ťa zdieľanie intímnych fotiek / videí partnerky s vybranými osobami alebo komunitou (s plnou kontrolou)?',
      'Bola by si v poriadku so zdieľaním intímnych fotiek / videí s vybranými osobami (po vzájomnej dohode)?',
    )),
  ],
}

// ── Rámec, súhlas, bezpečnosť ─────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Rámec, súhlas a bezpečnosť',
  bloky: [
    {
      druh: 'otazka',
      id: 'sp_dohody',
      typ: 'viac',
      text: 'Čo si chceme dohodnúť pred akoukoľvek aktivitou?',
      moznosti: [
        { v: 'hranice', label: 'Jasné hranice — čo áno / možno / nikdy' },
        { v: 'stop', label: 'Bezpečné slovo alebo gesto' },
        { v: 'pravidla', label: 'Pravidlá (kto je zapojený, čo je dovolené)' },
        { v: 'check', label: 'Priebežné kontrolovanie pocitov oboch' },
        { v: 'aftercare', label: 'Aftercare po každom zážitku' },
      ],
    },
    {
      druh: 'otazka',
      id: 'sp_vyber_bull',
      typ: 'viac',
      inePovolene: true,
      text: 'Bull / tretia osoba — čo je pre nás dôležité',
      moznosti: [
        { v: 'spolahlivost', label: 'Spoľahlivosť a rešpekt k pravidlám páru' },
        { v: 'plus18', label: '18+' },
        { v: 'testy', label: 'Testy STI, hygienické návyky' },
        { v: 'kondom', label: 'Ochrana samozrejmosťou' },
        { v: 'diskretnost', label: 'Diskrétnosť, mlčanlivosť' },
        { v: 'znamy', label: 'Skôr niekto známy obom' },
        { v: 'anonym', label: 'Skôr niekto úplne cudzí / anonymný' },
      ],
    },
    {
      druh: 'otazka',
      id: 'sp_ochrana',
      typ: 'viac',
      text: 'Ochrana zdravia',
      moznosti: [
        { v: 'kondomy', label: 'Kondómy vždy' },
        { v: 'bariery', label: 'Bariéry pri oráli' },
        { v: 'testy', label: 'Pravidelné testy STI oboch partnerov' },
        { v: 'antikoncepcia', label: 'Vyriešená antikoncepcia' },
      ],
    },
    {
      druh: 'otazka',
      id: 'sp_emoc_exkluzivita',
      typ: 'jeden',
      text: 'Emocionálna exkluzivita',
      moznosti: [
        { v: 'vyhradne', label: 'Romanticky a emočne výhradne my dvaja — sex s inými je čisto fyzický' },
        { v: 'otvoreni', label: 'Sme otvorení aj emočnému prepojeniu s inými' },
        { v: 'nevieme', label: 'Ešte nevieme' },
      ],
    },
    { druh: 'otazka', id: 'sp_aftercare', typ: 'text', text: 'Čo potrebujem v rámci aftercare (hneď po aj na druhý deň):' },
    postojOt('cnm_swingers', 'Zaujíma nás aj obojstranná výmena / swinging (rovnocenné zapojenie oboch)?', 'Detailná téma je „Swinging" — tu len či to vôbec zvažujeme.'),
  ],
}

// ── Otvorené poznámky ─────────────────────────────────────────────────────
const POZNAMKY: Blok = {
  druh: 'skupina',
  id: 'poznamky',
  nadpis: g('Otvorené poznámky pre partnerku', 'Otvorené poznámky pre partnera'),
  bloky: [
    { druh: 'otazka', id: 'pozn_hranice', typ: 'text', text: 'Moje jasné hranice (čo určite nie):' },
    { druh: 'otazka', id: 'pozn_cervena', typ: 'text', text: 'Čo je pre mňa „červená vlajka" (kedy chcem okamžite stop):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela (1–3 vety):', 'Čo chcem, aby partner vedel (1–3 vety):') },
    { druh: 'otazka', id: 'pozn_ziarlivost', typ: 'text', text: 'Čo u mňa spúšťa žiarlivosť a čo mi pomáha (reassurance):' },
  ],
}

export const ZDIELANIE_PARTNERA: TemaObsah = {
  slug: 'zdielanie-partnera/zdielanie-partnera',
  nadpis: 'Zdieľanie partnera — hotwife / cuckold',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'co_to_je',
      nadpis: 'Hotwifing a cuckolding — čo to je',
      telo:
        'Zapojenie ďalších osôb do sexuálnych aktivít ženy za plného súhlasu partnera. ' +
        'Podľa preferencií páru môžu byť tieto zážitky jemné a emocionálne alebo veľmi intenzívne a fyzické. ' +
        'Základom je dôvera, otvorená komunikácia a jasné hranice.',
    },
    {
      druh: 'text',
      id: 'rozdiel',
      nadpis: 'Rozdiel medzi hotwifingom a cuckoldingom',
      telo:
        'Hotwifing — dôraz na radosť a slobodu ženy. Partner je hrdý podporovateľ, bez submisivity a poníženia. ' +
        'Emocionálna oddanosť je výhradne medzi partnermi.\n\n' +
        'Cuckolding — submisívna rola muža, ktorý nachádza vzrušenie v sledovaní. Zahŕňa dynamiku moci, ' +
        'dominanciu ženy a často prvky poníženia alebo servisu.',
    },
    {
      druh: 'text',
      id: 'kandalizmus_intro',
      nadpis: 'Kandalizmus',
      telo:
        'Keď sa jeden z partnerov stáva stredobodom pozornosti iných — jemným flirtom, odhaleným telom alebo intímnou chvíľou — a druhý to sleduje. ' +
        'Nemusí ísť o sex; stačí, že iní túžia a obdivujú.',
    },
  ],
  telo: [HOTWIFING, CUCKOLDING, KANDALIZMUS, RAMEC, POZNAMKY],
  zaver: [
    {
      druh: 'text',
      id: 'nezabudnut',
      nadpis: 'Na čo nezabudnúť',
      ton: 'info',
      telo:
        'Komunikácia pred každým krokom. Jasné hranice a bezpečné slová. Aftercare — objatie, rozhovor, uistenie. ' +
        'Akýkoľvek scenár je len o vzájomnom súhlase a komforte, nikdy nie o tlaku.',
    },
    {
      druh: 'text',
      id: 'zaver',
      telo:
        'Výsledky zohľadnia len zhody medzi tebou a partnerom. Ak niekto niečo striktne odmietne, vo výsledku sa to nezobrazí — ' +
        'zostáva len to, čo je pre vás oboch prijateľné a vzrušujúce.',
    },
  ],
}
