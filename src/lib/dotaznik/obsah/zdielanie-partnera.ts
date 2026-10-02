import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Zdieľanie partnera — hotwifing / cuckolding / kandalizmus (modul „Otvorenosť").
// Zdroj: „26_Hotwifing_a_cuckolding_CNM" (mišmaš ~10 návrhov — zjednotené,
// exaktné duplikáty spojené, každý odlišný scenár zachovaný).
// Rámec dokumentu: žena = „hotwife", muž = sledujúci / podporujúci partner.
// z-verzia = pohľad hotwife, m-verzia = pohľad sledujúceho partnera; rovnaké id.
// Reaudit XLSM P38957–40199: všetky varianty prítomnosť/neprítomnosť,
// rozprávanie, návrat, sloppy seconds, glory hole, exhibícia a kandalizmus.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
  { v: 'ak_chce', label: g('Rád to preskúmam, ak po tom partnerka túži', 'Rada to preskúmam, ak po tom partner túži') },
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
  uvod: g(
    'Partnerkina sloboda môže byť sama osebe erotická: vidieť ju žiadanú, počuť detaily a cítiť hrdosť, že sa po dobrodružstve vracia práve k tebe. Hotwifing nemusí obsahovať submisiu ani ponižovanie — partner môže byť hrdý obdivovateľ, režisér alebo ten, komu porozpráva celý príbeh.',
    'Byť stredobodom túžby iného muža a zároveň cítiť partnerovu hrdosť môže spájať dobrodružstvo s hlbokým pocitom domova. Hotwife môže flirtovať, stretnúť sa diskrétne, predvádzať sa pred partnerom alebo sa k nemu vrátiť s detailmi a ešte živým vzrušením.',
  ),
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
      text: g('Aký typ tretej osoby si v tejto fantázii predstavujem pri partnerke', 'Aký typ tretej osoby ma v tejto fantázii priťahuje'),
      moznosti: [
        { v: 'jednorazovo', label: 'Jednorazové stretnutia s rôznymi mužmi' },
        { v: 'staly', label: 'Jeden stály „priateľ" (bull)' },
        { v: 'znamy', label: 'Niekto známy, pri kom rastie napätie postupne' },
        { v: 'anonymny', label: 'Anonymný alebo takmer anonymný muž' },
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
  uvod: g(
    'Cuckolding pridáva k sledovaniu mocenskú vrstvu: partnerka rozhoduje, komu venuje telo a pozornosť, zatiaľ čo muž zostáva divákom, pomocníkom alebo tým, ku komu sa neskôr vráti. Ponižovanie môže byť súčasťou, ale nie je povinné.',
    'Cuckolding môže zmeniť ženskú slobodu na mocenský obraz: partner sleduje, čaká, pomáha alebo prijíma návrat po inom mužovi. Pre niektoré ženy je jadrom vlastná dominancia a jeho submisia; iné chcú iba hrdý, voyeuristický pohľad bez ponižovania.',
  ),
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
      druh: 'otazka', id: 'ck_ulohy_pocas', typ: 'viac', inePovolene: true,
      text: g('Ktoré úlohy pri jej stretnutí ma eroticky priťahujú', 'Ktoré úlohy chcem partnerovi pri mojom stretnutí zadávať'),
      moznosti: [
        { v: 'obliect', label: g('Vybrať jej oblečenie, obliecť ju a pripnúť jej šperk hotwife', 'Nechať partnera vybrať moje oblečenie, obliecť ma a pripnúť mi šperk hotwife') },
        { v: 'odviest', label: g('Odviezť ju na stretnutie alebo priviesť tretiu osobu k nám', 'Nechať sa partnerom odviezť na stretnutie alebo priviesť tretiu osobu k nám') },
        { v: 'napoje', label: g('Podávať im nápoje a starať sa o ich pohodlie', 'Prikázať partnerovi podávať nám nápoje a starať sa o naše pohodlie') },
        { v: 'pripravit_ju', label: g('Pripraviť partnerku dotykmi alebo orálne pre druhého muža', 'Nechať partnera pripraviť ma dotykmi alebo orálne pre druhého muža') },
        { v: 'pripravit_ho', label: g('Pomôcť pripraviť alebo ústami vzrušiť aj druhého muža', 'Prikázať partnerovi, aby pomohol pripraviť alebo ústami vzrušil aj druhého muža') },
        { v: 'cakat', label: g('Čakať v inej miestnosti, počúvať a byť privolaný až neskôr', 'Nechať partnera čakať v inej miestnosti, počúvať a privolať ho až neskôr') },
        { v: 'sledovat', label: g('Kľačať a iba sledovať bez priameho zapojenia', 'Nechať partnera kľačať a iba sledovať bez priameho zapojenia') },
        { v: 'chodidla', label: g('Masírovať alebo bozkávať jej chodidlá, kým je s iným mužom', 'Nechať si partnerom masírovať alebo bozkávať chodidlá, kým som s iným mužom') },
        { v: 'zaznam', label: g('Fotografovať alebo nahrávať scénu pre nás', 'Prikázať partnerovi fotografovať alebo nahrávať scénu pre nás') },
        { v: 'cleanup', label: g('Po skončení ju jazykom očistiť a potom pokračovať ďalšou službou', 'Po skončení nechať partnera, aby ma jazykom očistil a pokračoval ďalšou službou') },
      ],
    },
    {
      druh: 'otazka', id: 'ck_zakazy', typ: 'viac', inePovolene: true,
      text: g('Ktoré erotické obmedzenia mojej roly ma priťahujú', 'Ktoré erotické obmedzenia chcem partnerovi určovať'),
      moznosti: [
        { v: 'nedotykat', label: g('Nesmiem sa jej dotknúť, kým mi to nedovolí', 'Partner sa ma nesmie dotknúť, kým mu to nedovolím') },
        { v: 'bez_penetracie', label: g('Môžem jej slúžiť ústami, ale nesmiem ju penetrovať', 'Partner mi môže slúžiť ústami, ale nesmie ma penetrovať') },
        { v: 'len_pozerat', label: g('Môžem iba pozerať alebo počúvať', 'Partner môže iba pozerať alebo počúvať') },
        { v: 'bez_reci', label: g('Nesmiem hovoriť, iba poslúchať jej pokyny', 'Partner nesmie hovoriť, iba poslúchať moje pokyny') },
        { v: 'klietka', label: g('Čakám zamknutý v klietke cudnosti', 'Partner čaká zamknutý v klietke cudnosti') },
        { v: 'bez_orgazmu', label: g('Môj orgazmus zostáva odopretý', 'Partnerov orgazmus zostáva odopretý') },
        { v: 'ziadne', label: 'Obmedzenia ma nelákajú — chcem hrdú a rovnocennú hotwife dynamiku' },
      ],
    },
    {
      druh: 'otazka', id: 'ck_orgazmus_partner', typ: 'viac', inePovolene: true,
      text: g('Ako má byť počas stretnutia vedená moja rozkoš', 'Ako chcem počas stretnutia viesť partnerovu rozkoš'),
      moznosti: [
        { v: 'volne', label: g('Môžem masturbovať a vyvrcholiť podľa seba', 'Partner môže masturbovať a vyvrcholiť podľa seba') },
        { v: 'az_po_nej', label: g('Masturbovať môžem až po jej vyvrcholení', 'Partner môže masturbovať až po mojom vyvrcholení') },
        { v: 'na_prikaz', label: g('Vyvrcholím iba na jej príkaz', 'Partner vyvrcholí iba na môj príkaz') },
        { v: 'pred_nimi', label: g('Vyvrcholím pred nimi ako súčasť predstavenia', 'Nechám partnera vyvrcholiť pred nami ako súčasť predstavenia') },
        { v: 'na_telo', label: g('Vyvrcholím na miesto, ktoré mi partnerka určí', 'Určím partnerovi, kam smie vyvrcholiť') },
        { v: 'ocistit', label: g('Po vyvrcholení musím vlastné semeno zlízať alebo upratať', 'Po vyvrcholení prikážem partnerovi vlastné semeno zlízať alebo upratať') },
        { v: 'odoprety', label: g('Zostanem vzrušený bez orgazmu aj po skončení', 'Partner zostane vzrušený bez orgazmu aj po skončení') },
      ],
    },
    {
      druh: 'otazka',
      id: 'ck_ponizovanie',
      typ: 'jeden',
      text: 'Verbálne alebo fyzické ponižovanie cuckolda ako súčasť dynamiky',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'jemne', label: 'Len jemné / za jasných podmienok' },
        { v: 'nie', label: 'Nie, eroticky ma to vypína' },
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
  uvod: g(
    'Partnerka nemusí mať sex s nikým ďalším. Niekedy stačí odvážne oblečenie, pohľady v miestnosti, flirt alebo tanec — a vedomie, že všetci túžia, zatiaľ čo ty poznáš tajomstvo medzi vami.',
    'Nemusíš mať sex s nikým ďalším. Niekedy stačí cítiť pohľady, hrať sa s flirtom alebo tancom a tajnými pohľadmi dávať partnerovi najavo, komu patrí váš spoločný príbeh.',
  ),
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

const MOTIVACIE: Blok = {
  druh: 'skupina', id: 'motivacie', nadpis: 'Čo je na zdieľaní erotické',
  bloky: [
    {
      druh: 'otazka', id: 'mot_jadro', typ: 'viac', inePovolene: true,
      text: 'Ktoré motívy ma priťahujú najviac',
      moznosti: [
        { v: 'ziaduca', label: g('Hrdosť, že partnerka je taká žiaduca', 'Cítiť sa krásna, žiadaná a obdivovaná') },
        { v: 'rozkoš', label: g('Vidieť alebo si predstavovať jej nestráženú rozkoš', 'Dovoliť si rozkoš bez skrývania pred partnerom') },
        { v: 'sloboda', label: g('Dopriať jej sexuálnu slobodu bez straty nášho spojenia', 'Sloboda objavovať a zároveň cítiť partnerovu podporu') },
        { v: 'voyeur', label: g('Voyeurizmus — sledovať každý pohyb, dych a reakciu', 'Exhibicionizmus — vedieť, že partner sleduje každý pohyb') },
        { v: 'ziarlivost', label: 'Vzrušujúca zmes túžby, hrdosti a jemnej žiarlivosti' },
        { v: 'navrat', label: 'Návrat k sebe a pokračovanie v spoločnej intimite' },
        { v: 'detaily', label: 'Počúvať alebo rozprávať presné detaily neskôr' },
        { v: 'moc', label: g('Odovzdať partnerke moc a zostať v podpornej či submisívnej role', 'Mať moc nad scénou, partnerovým pohľadom a jeho čakaním') },
        { v: 'tabu', label: 'Prekročenie tabu a pocit, že máme vlastné pravidlá' },
      ],
    },
    {
      druh: 'otazka', id: 'mot_najsilnejsi_moment', typ: 'viac', inePovolene: true,
      text: 'Ktorý moment predstavy je najsilnejší',
      moznosti: [
        { v: 'priprava', label: g('Pomáhať partnerke pripraviť sa a sledovať jej očakávanie', 'Pripravovať sa s vedomím, že partner vie, kam idem') },
        { v: 'prvy_dotyk', label: 'Prvý dotyk tretej osoby' },
        { v: 'partnerov_pohlad', label: g('Vidieť, že partnerka sa počas aktu pozerá na mňa', 'Stretnúť sa počas aktu s partnerovým pohľadom') },
        { v: 'sprava', label: 'Dostať alebo poslať správu počas stretnutia' },
        { v: 'pribeh', label: 'Detailné rozprávanie po návrate' },
        { v: 'navrat', label: 'Prvý spoločný dotyk po návrate' },
        { v: 'stopy', label: 'Vôňa, vlhkosť alebo iné stopy predchádzajúceho zážitku' },
      ],
    },
  ],
}

// Reálny návrat po samostatnom stretnutí: v komunitách hotwife/stag sa často
// opisuje ako „reclaiming“ — samostatný zážitok sa rozprávaním, bozkami a
// pokračovaním premení na spoločnú erotickú skúsenosť páru.
// Zdroje a jazyk komunity:
// https://www.vixen-games.com/2024/07/19/reclaiming-after-watching-your-hotwife/
// https://vxnlifestyle.com/reclaim-sex/
// Odborný kontext erotickej compersion:
// https://www.cosrtlearn.org.uk/wp-content/uploads/2024/05/Niki-D-Loving-Freedom-2023.pdf
// Cleanup ako pomenovaná cuckold praktika a jej globálne komunitné varianty:
// https://www.sdc.com/swingers-terms/
// https://www.joyclub.de/groups/cuckold/forum/t3421770.was_soll_und_darf_der_cucki.html
// https://www.cuckold.com.ar/foros/tema/24
// https://thekinkacademy.com/dictionary/creampie-cleanup/
const NAVRAT_A_ROZPRAVANIE: Blok = {
  druh: 'skupina',
  id: 'navrat_a_rozpravanie',
  nadpis: 'Skutočný návrat — príbeh, ktorý pokračuje doma',
  uvod: g(
    'Stretnutie sa nemusí skončiť zatvorením hotelových dverí. Partnerka sa môže vrátiť ešte rozohriata, sadnúť si k tebe a postupne ti odovzdať celý zážitok: pohľad, prvý bozk, slová, dotyky aj to, čo jej telo prezrádza bez slov. Pre mnohých je práve tento návrat jadrom fantázie — jej dobrodružstvo sa rozprávaním a tvojou túžbou zmení na niečo, čo patrí vám dvom.',
    'Stretnutie sa nemusí skončiť odchodom z hotela či cudzieho bytu. Môžeš sa vrátiť ešte rozohriata, sadnúť si k partnerovi a postupne mu odovzdať celý zážitok: pohľad, prvý bozk, slová, dotyky aj to, čo tvoje telo prezrádza bez slov. Pre mnohé páry je práve tento návrat jadrom fantázie — tvoj zážitok sa rozprávaním a jeho túžbou zmení na niečo, čo patrí vám dvom.',
  ),
  bloky: [
    postojOt('navrat_realny', g(
      'Vzrušuje ťa reálny návrat partnerky zo stretnutia s iným mužom a následné rozprávanie o tom, čo zažila?',
      'Vzrušuje ťa vrátiť sa z reálneho stretnutia s iným mužom a rozprávaním znovu prebudiť celý zážitok pred partnerom?',
    )),
    {
      druh: 'otazka', id: 'navrat_kedy', typ: 'viac', inePovolene: true,
      text: 'Kedy a ako má rozprávanie začať',
      moznosti: [
        { v: 'dvere', label: g('Hneď pri dverách — ešte skôr, než sa prezlečie', 'Hneď pri dverách — ešte skôr, než sa prezlečiem') },
        { v: 'vyzliekanie', label: g('Keď ju pomaly vyzliekam a pýtam sa', 'Keď ma partner pomaly vyzlieka a pýta sa') },
        { v: 'bozky', label: 'Počas prvých bozkov a dotykov po návrate' },
        { v: 'pocuvanie', label: g('Kým počúvam a vzrušujem sa bez dotykov', 'Kým partner počúva a vzrušuje sa bez dotykov') },
        { v: 'masturbacia', label: g('Kým pri jej rozprávaní masturbujem', 'Kým partner pri mojom rozprávaní masturbuje') },
        { v: 'sex', label: 'Počas spoločného sexu — príbeh a telo pokračujú naraz' },
        { v: 'neskor', label: 'Až neskôr, keď si celý zážitok vedome znovu prehráme' },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_sposob', typ: 'viac', inePovolene: true,
      text: g('Ako chcem príbeh od partnerky počuť', 'Ako chcem partnerovi príbeh rozprávať'),
      moznosti: [
        { v: 'chronologicky', label: 'Od prvého pohľadu až po rozlúčku, krok za krokom' },
        { v: 'otazky', label: g('Ja sa pýtam a ona mi odpovedá', 'Partner sa pýta a ja mu odpovedám') },
        { v: 'spoved', label: g('Ona rozpráva sama ako erotickú spoveď', 'Rozprávam sama ako erotickú spoveď') },
        { v: 'pritomny_cas', label: 'V prítomnom čase, akoby sa to dialo práve teraz' },
        { v: 'vybrane', label: 'Iba najvzrušujúcejšie obrazy a detaily' },
        { v: 'spravy', label: 'Najprv cez správy alebo hlasovú nahrávku, potom osobne' },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_detaily', typ: 'viac', inePovolene: true,
      text: 'Ktoré detaily chcem počuť alebo rozprávať',
      moznosti: [
        { v: 'iskra', label: 'Kedy vznikla prvá iskra a kto urobil prvý krok' },
        { v: 'bozk', label: 'Ako chutil a pôsobil prvý bozk' },
        { v: 'slova', label: 'Čo si povedali alebo pošepkali' },
        { v: 'dotyky', label: 'Ako, kde a akým tempom sa dotýkali' },
        { v: 'robila', label: g('Čo mu partnerka robila a ako na to reagoval', 'Čo som mu robila a ako na to reagoval') },
        { v: 'robil', label: g('Čo robil on jej a pri čom sa najviac vzrušila', 'Čo robil on mne a pri čom som sa najviac vzrušila') },
        { v: 'poloha', label: 'Ktoré polohy, pohyby alebo momenty boli najsilnejšie' },
        { v: 'orgazmus', label: 'Ako prišlo vyvrcholenie a čo mu predchádzalo' },
        { v: 'partner', label: g('Či počas stretnutia myslela na mňa', 'Či som počas stretnutia myslela na partnera') },
        { v: 'rozdiel', label: 'V čom bola energia alebo štýl zážitku iný — bez hodnotenia tiel' },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_zmyslove_stopy', typ: 'viac', inePovolene: true,
      text: g('Ktoré zmyslové stopy návratu ma vzrušujú', 'Ktoré zmyslové stopy chcem po návrate priniesť partnerovi'),
      moznosti: [
        { v: 'jazyk', label: g('Pri bozku cítiť na jej perách alebo jazyku chuť druhého muža', 'Pri bozku nechať partnera cítiť na mojich perách alebo jazyku chuť druhého muža') },
        { v: 'koza', label: g('Cítiť jeho vôňu na jej koži, vlasoch alebo oblečení', 'Priniesť jeho vôňu na koži, vlasoch alebo oblečení') },
        { v: 'dych', label: g('Počuť v jej dychu, že je ešte vzrušená', 'Nechať partnera počuť v mojom dychu, že som ešte vzrušená') },
        { v: 'bielizen', label: g('Vidieť jej vlhkú alebo posunutú bielizeň', 'Ukázať partnerovi vlhkú alebo posunutú bielizeň') },
        { v: 'stopy', label: g('Objavovať na nej stopy dotykov, bozkov alebo rozmazaného mejkapu', 'Nechať partnera objavovať stopy dotykov, bozkov alebo rozmazaného mejkapu') },
        { v: 'vlhkost', label: g('Cítiť, že jej telo je ešte vlhké a rozohriate', 'Nechať partnera cítiť, že moje telo je ešte vlhké a rozohriate') },
        { v: 'semeno', label: g('Vidieť, cítiť alebo ochutnať stopy jeho semena', 'Priniesť partnerovi viditeľné alebo hmatateľné stopy jeho semena') },
        { v: 'bez_stop', label: 'Chcem iba slovný opis — fyzické stopy ma nelákajú' },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_otazky', typ: 'viac', inePovolene: true,
      text: g('Ktoré otázky by som jej chcel klásť', 'Ktoré otázky chcem od partnera počuť'),
      moznosti: [
        { v: 'prvy_bozk', label: g('„Ako ťa prvýkrát pobozkal?"', '„Ako ťa prvýkrát pobozkal?"') },
        { v: 'chut', label: g('„Cítiš ešte jeho chuť na jazyku?"', '„Cítiš ešte jeho chuť na jazyku?"') },
        { v: 'ty_jemu', label: g('„Čo presne si mu robila?"', '„Čo presne si mu robila?"') },
        { v: 'on_tebe', label: g('„Čo presne robil on tebe?"', '„Čo presne robil on tebe?"') },
        { v: 'najviac', label: g('„Pri čom si ho chcela najviac?"', '„Pri čom si ho chcela najviac?"') },
        { v: 'orgazmus', label: g('„Ako si vyvrcholila a čo si vtedy cítila?"', '„Ako si vyvrcholila a čo si vtedy cítila?"') },
        { v: 'myslienka', label: g('„Spomenula si si počas toho na mňa?"', '„Spomenula si si počas toho na mňa?"') },
        { v: 'teraz', label: g('„Čo chceš, aby som s tebou urobil teraz?"', '„Čo chceš, aby s tebou partner urobil teraz?"') },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_pravdivost', typ: 'jeden', inePovolene: true,
      text: 'Aký vzťah má mať rozprávanie k tomu, čo sa naozaj stalo',
      moznosti: [
        { v: 'presne', label: 'Chcem čo najpresnejší a pravdivý opis' },
        { v: 'jadro', label: 'Pravdivé jadro, ale eroticky zvýraznené detaily' },
        { v: 'vyber', label: 'Iba vybrané skutočné momenty, ktoré nás oboch vzrušujú' },
        { v: 'mix', label: 'Skutočný zážitok môžeme pri rozprávaní ďalej rozvíjať fantáziou' },
      ],
    },
    {
      druh: 'otazka', id: 'navrat_podoba_spojenia', typ: 'viac', inePovolene: true,
      text: 'Akú podobu má mať naše opätovné spojenie po návrate',
      moznosti: [
        { v: 'drsne', label: g('Drsný a vlastnícky sex, pri ktorom si ju znovu beriem pre seba', 'Drsný a vlastnícky sex, pri ktorom si ma partner znovu berie pre seba') },
        { v: 'zmyselne', label: 'Pomalé, zmyselné milovanie a sústredenie iba na nás dvoch' },
        { v: 'cleanup', label: 'Cleanup, orálna služba a telesné stopy ako pokračovanie zážitku' },
        { v: 'maznanie', label: 'Nahé maznanie, dotyky a pokojná telesná blízkosť bez ďalšieho sexu' },
        { v: 'slova', label: 'Rozprávanie, pochvala a uistenie, že tento príbeh patrí nám dvom' },
        { v: 'jedlo', label: 'Jedlo alebo drink v posteli a spoločné vychutnávanie dozvuku' },
        { v: 'oddych', label: 'Najprv jej dopriať oddych a vrátiť sa k sebe až neskôr' },
        { v: 'bez_ritualu', label: 'Nepotrebujem osobitný rituál návratu' },
      ],
    },
    postojOt('navrat_pokracovanie', g(
      'Túžiš po rozprávaní partnerku znovu „získať" bozkami, dotykmi alebo sexom a pokračovať tam, kde jej stretnutie skončilo?',
      'Túžiš, aby ťa partner po rozprávaní znovu „získal" bozkami, dotykmi alebo sexom a pokračoval tam, kde sa stretnutie skončilo?',
    )),
  ],
}

const CLEANUP_A_SLUZBA: Blok = {
  druh: 'skupina',
  id: 'cleanup_a_sluzba',
  nadpis: 'Cleanup — jej návrat ako príkaz, odmena a služba',
  uvod: g(
    'V cuckold dynamike môže byť návrat viac než rozprávanie. Partnerka ti môže podať vlhké nohavičky, posadiť sa na tvoju tvár a rozhodovať, ako ju očistíš. Pre niekoho je to nežné uctievanie, pre iného odmena za čakanie, služba, práca s cudzím semenom alebo výrazná ukážka jej moci. Práve význam tejto chvíle rozhoduje, či pôsobí láskyplne, surovo alebo ponižujúco.',
    'V cuckold dynamike môže byť návrat viac než rozprávanie. Môžeš partnerovi podať vlhké nohavičky, posadiť sa na jeho tvár a rozhodovať, ako ťa očistí. Pre niekoho je to nežné uctievanie, pre iného odmena za čakanie, služba, práca s cudzím semenom alebo výrazná ukážka tvojej moci. Práve význam tejto chvíle rozhoduje, či pôsobí láskyplne, surovo alebo ponižujúco.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'cleanup_jadro', typ: 'viac', inePovolene: true,
      text: 'Čo je na cleanup fantázii najsilnejšie',
      moznosti: [
        { v: 'uctievanie', label: g('Uctievať partnerkino telo a rozkoš po návrate', 'Nechať partnera uctievať moje telo a rozkoš po návrate') },
        { v: 'sluzba', label: g('Slúžiť jej bez toho, aby bola stredobodom moja rozkoš', 'Prijať partnerovu službu bez potreby venovať sa jeho rozkoši') },
        { v: 'moc', label: g('Jej sebavedomá moc a právo dávať mi príkazy', 'Moja sebavedomá moc a právo dávať partnerovi príkazy') },
        { v: 'odmena', label: g('Vnímať očistenie ako odmenu za čakanie', 'Dať partnerovi očistenie ako odmenu za čakanie') },
        { v: 'stopa', label: 'Cítiť prítomnosť tretej osoby cez chuť, vôňu a telesné stopy' },
        { v: 'ponizenie', label: g('Erotické poníženie a vedomie, že dokončujem po inom mužovi', 'Eroticky partnera ponížiť tým, že dokončuje po inom mužovi') },
        { v: 'prepojenie', label: 'Premeniť oddelený zážitok na telesnú chvíľu, ktorú zdieľame spolu' },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_predmety', typ: 'viac', inePovolene: true,
      text: g('Čo mi má partnerka po návrate odovzdať', 'Čo chcem partnerovi po návrate odovzdať'),
      moznosti: [
        { v: 'vlhke_nohavicky', label: g('Jej vlhké nohavičky so stopami rozkoše a cudzieho semena', 'Moje vlhké nohavičky so stopami rozkoše a cudzieho semena') },
        { v: 'oblecenie', label: g('Oblečenie, ktoré má na sebe vôňu alebo stopy stretnutia', 'Oblečenie, ktoré má na sebe vôňu alebo stopy stretnutia') },
        { v: 'fotka', label: 'Fotografiu alebo krátke video ako obraz toho, čo nasledovalo' },
        { v: 'sprava', label: 'Správu či hlasovú nahrávku s príkazom, čo má nasledovať doma' },
        { v: 'nic', label: 'Nič do ruky — samotné telo po návrate je najsilnejšia stopa' },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_nohavicky', typ: 'viac', inePovolene: true,
      text: g('Čo chcem s jej nohavičkami po návrate robiť', 'Čo chcem partnerovi prikázať urobiť s mojimi nohavičkami'),
      moznosti: [
        { v: 'drzat', label: g('Držať ich pri sebe počas jej rozprávania', 'Držať ich pri sebe počas môjho rozprávania') },
        { v: 'privonat', label: 'Privoňať k nim a vnímať zmes tiel' },
        { v: 'pery', label: 'Priložiť ich na pery alebo tvár' },
        { v: 'ochutnat', label: 'Ochutnať vlhkosť alebo semeno priamo z látky' },
        { v: 'masturbacia', label: g('Masturbovať s nimi, kým partnerka rozpráva', 'Nechať partnera s nimi masturbovať, kým rozprávam') },
        { v: 'nosenie', label: g('Obliecť si ich alebo ich nosiť pri sebe ako znak služby', 'Prikázať partnerovi, aby si ich obliekol alebo ich nosil pri sebe') },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_telo', typ: 'viac', inePovolene: true,
      text: g('Ako chcem partnerku po návrate očistiť', 'Ako sa chcem po návrate nechať partnerom očistiť'),
      moznosti: [
        { v: 'tvar', label: g('Partnerka si sadne na moju tvár a nechá ma pracovať jazykom', 'Sadnem si partnerovi na tvár a nechám ho pracovať jazykom') },
        { v: 'rozkrocena', label: g('Kľačím alebo ležím pod ňou, keď sa mi rozkročí nad tvárou', 'Rozkročím sa nad partnerovou tvárou a určujem polohu') },
        { v: 'nohy', label: g('Zlízať stopy z jej stehien, zadku a okolia vulvy', 'Nechať zlízať stopy zo stehien, zadku a okolia vulvy') },
        { v: 'vulva', label: g('Jazykom ju očistiť zvonka aj pri vchode do vagíny', 'Nechať sa jazykom očistiť zvonka aj pri vchode do vagíny') },
        { v: 'prsty', label: g('Očistiť jej prsty alebo ich zlízať po tom, čo sa sama dotýkala', 'Dať partnerovi zlízať moje prsty po tom, čo sa sama dotýkam') },
        { v: 'telo', label: g('Zlízať cudzie semeno z jej brucha, pŕs alebo inej časti tela', 'Nechať partnera zlízať cudzie semeno z môjho brucha, pŕs alebo inej časti tela') },
        { v: 'bozk', label: g('Po očistení sa s ňou pobozkať a vrátiť jej chuť späť', 'Po očistení partnera pobozkať a ochutnať stopu späť') },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_prikazy', typ: 'viac', inePovolene: true,
      text: g('Ktoré príkazy by som pri tom chcel počuť', 'Ktoré príkazy by som pri tom chcela dávať'),
      moznosti: [
        { v: 'klakni', label: '„Kľakni si a počkaj na mňa."' },
        { v: 'privonaj', label: '„Privoňaj si k tomu, čo som ti priniesla."' },
        { v: 'ochutnaj', label: '„Ochutnaj ho na mojom tele."' },
        { v: 'vycisti', label: '„Vyčisti ma jazykom."' },
        { v: 'bez_ruk', label: '„Bez rúk — používaj iba ústa a jazyk."' },
        { v: 'pozeraj', label: '„Pozeraj sa na mňa, kým to robíš."' },
        { v: 'neprestavaj', label: '„Neprestávaj, kým ti nepoviem."' },
        { v: 'povedz', label: '„Povedz mi, čo na mne cítiš a chutíš."' },
        { v: 'bez_orgazmu', label: g('„Tvoja rozkoš dnes počká."', '„Tvoja rozkoš dnes počká."') },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_ton', typ: 'jeden', inePovolene: true,
      text: 'Akú náladu má mať tento rituál',
      moznosti: [
        { v: 'nezna', label: 'Nežné uctievanie a vďačná služba bez ponižovania' },
        { v: 'hrda', label: 'Hrdá hotwife a partner, ktorý s chuťou prijíma jej návrat' },
        { v: 'dominantna', label: 'Pevné príkazy, kontrola a jasná podriadená rola partnera' },
        { v: 'ponizujuca', label: 'Surové slová a erotické poníženie ako jadro scény' },
        { v: 'premenliva', label: 'Začať nežne a postupne prejsť do výraznej moci' },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_ritual', typ: 'viac', inePovolene: true,
      text: g('Ako chcem, aby sa cleanup stal naším rituálom', 'Ako chcem, aby sa cleanup stal naším rituálom'),
      moznosti: [
        { v: 'okamzite', label: 'Hneď po stretnutí, kým sú všetky stopy čerstvé' },
        { v: 'po_pribehu', label: 'Až po detailnom rozprávaní, ktoré najprv vystupňuje túžbu' },
        { v: 'prikaz', label: g('Partnerka mi ho prikáže bez prosby', 'Prikážem ho partnerovi bez prosby') },
        { v: 'ziadost', label: g('Partnerka ma oň požiada a ja jej službu vedome ponúknem', 'Požiadam partnera a nechám ho službu vedome ponúknuť') },
        { v: 'iniciativa', label: g('Sám si kľaknem a ponúknem sa bez slov', 'Partner si sám kľakne a ponúkne sa bez slov') },
        { v: 'vdaka', label: g('Po službe jej poďakujem za odmenu', 'Po službe si nechám od partnera poďakovať za odmenu') },
        { v: 'pravidelne', label: 'Ako očakávané zakončenie každého podobného stretnutia' },
        { v: 'vynimocne', label: 'Iba niekedy, keď na túto intenzitu máme obaja chuť' },
        { v: 'chastity', label: g('Cleanup prebehne, kým zostávam zamknutý alebo bez orgazmu', 'Cleanup prebehne, kým partner zostáva zamknutý alebo bez orgazmu') },
      ],
    },
    {
      druh: 'otazka', id: 'cleanup_partner_tuzi', typ: 'jeden', inePovolene: true,
      text: g('Keď partnerka túži, aby som ju po inom mužovi takto očistil', 'Keď partner túži, aby ma po inom mužovi mohol takto očistiť'),
      moznosti: [
        { v: 'silno', label: g('Jej túžba a moc ma silno vzrušujú', 'Jeho túžba slúžiť mi a ochutnať môj návrat ma silno vzrušujú') },
        { v: 'jemne', label: 'Láka ma nežná verzia bez ponižovania' },
        { v: 'slova', label: 'Chcem sa s tým hrať iba cez slová alebo fantáziu' },
        { v: 'vybrane', label: 'Lákajú ma iba vybrané časti — vôňa, nohavičky, orál alebo príkazy' },
        { v: 'nie', label: 'Táto podoba návratu ma neláka' },
      ],
    },
    {
      druh: 'text', id: 'cleanup_myty', nadpis: 'Nie je to iba „očistenie"', ton: 'info',
      telo:
        'Cleanup je v komunitách pomenovaná samostatná praktika, nie náhodný detail po sexe. Môže spájať fluid fetish, pussy worship, službu, príkazy, facesitting, odmenu za čakanie aj erotické poníženie. ' +
        'Nemusí však byť ponižujúci: pre niektoré páry je to obdivný rituál, v ktorom partner prijíma celé dobrodružstvo ženy — jej túžbu, telo aj stopy — a ona sa vracia priamo do stredu ich spoločnej erotiky.',
    },
  ],
}

const PARTNEROVA_TUZBA: Blok = {
  druh: 'skupina', id: 'partnerova_tuzba', nadpis: g('Keď po tom túži partnerka', 'Keď po tom túži partner'),
  bloky: [
    {
      druh: 'otazka', id: 'pt_reakcia', typ: 'viac', inePovolene: true,
      text: g('Ako na mňa pôsobí jej túžba po inom mužovi', 'Ako na mňa pôsobí jeho túžba vidieť ma s iným mužom'),
      moznosti: [
        { v: 'nakazliva', label: g('Jej vzrušenie je nákazlivé a prebúdza moju fantáziu', 'Jeho vzrušenie je nákazlivé a pomáha mi cítiť sa žiadaná') },
        { v: 'hrdost', label: g('Vzrušuje ma, že mi túžbu povedala otvorene', 'Vzrušuje ma, že ma chce takto obdivovať a zdieľať') },
        { v: 'vybrane', label: 'Láka ma iba vybraná forma — flirt, pohľady, dotyky alebo rozprávanie' },
        { v: 'fantazia', label: 'Chcem ju rozvíjať v slovách, ale nie uskutočniť' },
        { v: 'neistota', label: 'Prebúdza vo mne viac neistoty alebo žiarlivosti než túžby' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'otazka', id: 'pt_rola', typ: 'jeden',
      text: g('Ak by som túto túžbu preskúmal, akú rolu chcem mať', 'Ak by som túto túžbu preskúmala, akú rolu chcem mať'),
      moznosti: [
        { v: 'hrdy', label: g('Hrdý partner bez submisie', 'Slobodná žena s hrdým partnerom') },
        { v: 'voyeur', label: g('Tichý alebo aktívny pozorovateľ', 'Predvádzať sa priamo pre jeho pohľad') },
        { v: 'reziser', label: g('Režisér, ktorý vyberá alebo vedie scénu', 'Nechať partnera scénu vybrať alebo viesť') },
        { v: 'submisivny', label: g('Submisívny cuckold alebo pomocník', 'Dominantná hotwife, ktorá riadi partnerovu rolu') },
        { v: 'nepritomny', label: g('Nebyť pri tom a počuť príbeh až potom', 'Byť sama a podeliť sa až po návrate') },
      ],
    },
  ],
}

const MYTY: Blok = {
  druh: 'skupina', id: 'myty', nadpis: 'Mýty, ktoré berú tejto fantázii dych',
  bloky: [
    {
      druh: 'text', id: 'myty_text', ton: 'info',
      telo:
        'Mýtus: túžba po inom mužovi znamená, že partner nestačí. Realita: jadrom môže byť práve partnerov pohľad, hrdosť, návrat a spoločné tajomstvo — bez nich by fantázia stratila význam.\n\n' +
        'Mýtus: hotwifing a cuckolding sú to isté. Realita: hotwifing môže byť oslavou ženskej slobody bez poníženia; cuckolding pridáva submisiu, moc alebo erotické poníženie.\n\n' +
        'Mýtus: žiarlivosť znamená, že fantázia nefunguje. Realita: pre mnohých je práve zmes žiarlivosti, hrdosti a túžby jej najsilnejšou časťou.\n\n' +
        'Mýtus: „použitá" je hodnotenie ženy. Realita: v erotickom scenári môže byť toto slovo dohodnutým obrazom intenzity a návratu; mimo tejto dynamiky nemusí mať žiadny význam.\n\n' +
        'Mýtus: fantázia musí smerovať k realite. Realita: rozprávanie, roleplay alebo predstava návratu môžu byť jej plnohodnotnou podobou.',
    },
  ],
}

// ── Konkrétna podoba dynamiky ─────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Ako má vyzerať náš príbeh',
  bloky: [
    {
      druh: 'otazka',
      id: 'sp_dohody',
      typ: 'viac',
      text: 'Ktoré prvky majú byť v našej verzii jasné',
      moznosti: [
        { v: 'hranice', label: 'Či ide o flirt, dotyky, orál alebo plný sex' },
        { v: 'stop', label: 'Či sa partner pozerá, počúva, vedie alebo nie je prítomný' },
        { v: 'pravidla', label: 'Čo zostáva výhradne medzi nami dvoma' },
        { v: 'check', label: 'Koľko detailov chceme počas stretnutia zdieľať' },
        { v: 'aftercare', label: 'Ako má vyzerať návrat a pokračovanie medzi nami' },
      ],
    },
    {
      druh: 'otazka',
      id: 'sp_vyber_bull',
      typ: 'viac',
      inePovolene: true,
      text: 'Aká tretia osoba robí fantáziu erotickou',
      moznosti: [
        { v: 'spolahlivost', label: 'Pokojný a pozorný muž' },
        { v: 'plus18', label: 'Sebavedomý alebo dominantný muž' },
        { v: 'testy', label: 'Niekto, kto sa sústredí najmä na jej rozkoš' },
        { v: 'kondom', label: 'Niekto, kto rešpektuje partnerovu prítomnosť alebo pohľad' },
        { v: 'diskretnost', label: 'Diskrétny muž mimo spoločenského okruhu' },
        { v: 'znamy', label: 'Skôr niekto známy obom' },
        { v: 'anonym', label: 'Skôr niekto úplne cudzí / anonymný' },
      ],
    },
    {
      druh: 'otazka',
      id: 'sp_ochrana',
      typ: 'viac',
      text: 'Čo má zostať iba medzi nami dvoma',
      moznosti: [
        { v: 'kondomy', label: 'Bozky alebo určité oslovenia' },
        { v: 'bariery', label: 'Spoločná posteľ alebo domov' },
        { v: 'testy', label: 'Noc, ráno alebo zaspávanie spolu' },
        { v: 'antikoncepcia', label: 'Rituál návratu a prvý dotyk po stretnutí' },
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
    { druh: 'otazka', id: 'sp_aftercare', typ: 'text', text: 'Ako chcem, aby po návrate pokračovala túžba medzi nami:' },
    postojOt('cnm_swingers', 'Zaujíma nás aj obojstranná výmena / swinging (rovnocenné zapojenie oboch)?', 'Detailná téma je „Swinging" — tu len či to vôbec zvažujeme.'),
  ],
}

// ── Otvorené poznámky ─────────────────────────────────────────────────────
const POZNAMKY: Blok = {
  druh: 'skupina',
  id: 'poznamky',
  nadpis: g('Otvorené poznámky pre partnerku', 'Otvorené poznámky pre partnera'),
  bloky: [
    { druh: 'otazka', id: 'pozn_hranice', typ: 'text', text: 'Ktorá konkrétna verzia tejto fantázie ma priťahuje najviac:' },
    { druh: 'otazka', id: 'pozn_cervena', typ: 'text', text: 'Ktorý detail by túto fantáziu pre mňa eroticky vypol:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela (1–3 vety):', 'Čo chcem, aby partner vedel (1–3 vety):') },
    { druh: 'otazka', id: 'pozn_ziarlivost', typ: 'text', text: 'Aká zmes hrdosti, túžby a žiarlivosti je pre mňa vzrušujúca:' },
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
      telo: g(
        'Predstav si partnerku, ktorú túžba iného muža rozžiari — a jej pohľad sa napriek tomu vracia k tebe. Môžeš byť pri tom, počuť príbeh neskôr, viesť scénu alebo byť prvým dotykom po návrate. Jadro fantázie často nie je „stratiť ju", ale vidieť ju naplno žiadanú a znovu si vybrať jeden druhého.',
        'Predstav si, že cítiš pohľad iného muža a zároveň vieš, že partner tvoju túžbu vidí, podporuje alebo na teba čaká. Môže ťa sledovať, počúvať detaily neskôr alebo byť prvým dotykom po návrate. Jadro fantázie často nie je odchod zo vzťahu, ale sloboda a návrat.',
      ),
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
  telo: [HOTWIFING, CUCKOLDING, KANDALIZMUS, MOTIVACIE, NAVRAT_A_ROZPRAVANIE, CLEANUP_A_SLUZBA, PARTNEROVA_TUZBA, MYTY, RAMEC, POZNAMKY],
  zaver: [
    {
      druh: 'text',
      id: 'nezabudnut',
      nadpis: 'Na čo nezabudnúť',
      ton: 'info',
      telo:
        'Najsilnejší detail nemusí byť samotný sex s iným mužom. Môže ním byť príprava, partnerov pohľad, správa počas stretnutia, rozprávanie detailov, prvý dotyk po návrate alebo vedomie, že fantázia patrí iba vám dvom.',
    },
    {
      druh: 'text',
      id: 'zaver',
      telo:
        'Výsledok ukáže, či vás spája hotwife sloboda, voyeuristický pohľad, cuckold dynamika, verejný obdiv, rozprávanie alebo návrat — a ktorá forma má zostať iba fantáziou.',
    },
  ],
}
