import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Miesta a prostredie — modul A3 „Prostredie a atmosféra".
// Zdroj: „29_Miesta_a_prostredie.docx". Domáce priestory (spálňa, kúpeľňa,
// kuchyňa, obývačka), exteriér a verejné prostredia (auto, príroda, kino,
// park), hotely a prenajaté priestory, netradičné/experimentálne prostredia,
// kluby, tematické párty a diskrétnosť ako erotická preferencia.
// z/m verzia zrkadlová.
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

// ── Domáce priestory ────────────────────────────────────────────────
const DOMACE: Blok = {
  druh: 'skupina', id: 'domace', nadpis: 'Domáce priestory',
  bloky: [
    {
      druh: 'otazka',
      id: 'dom_spalna',
      typ: 'viac',
      text: 'Spálňa — čo ma láka',
      moznosti: [
        { v: 'postel', label: 'Posteľ, klasicky' },
        { v: 'podlaha', label: 'Podlaha / koberec s podložkou' },
        { v: 'zrkadlo', label: 'Zrkadlo pri posteli' },
        { v: 'doplnky', label: 'Vankúše, prikrývky, svetelné reťaze' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'dom_kupelna',
      typ: 'viac',
      text: 'Kúpeľňa',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha (stojace polohy, tečúca voda)' },
        { v: 'vana', label: 'Spoločná vaňa (oleje, kúpeľové bomby)' },
        { v: 'umyvadlo', label: 'Umývadlo / pult' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'dom_kuchyna',
      typ: 'viac',
      text: 'Kuchyňa',
      moznosti: [
        { v: 'stol_pult', label: 'Stôl / kuchynský pult ako opora' },
        { v: 'jedlo', label: 'Food-play (čokoláda, šľahačka, ovocie)' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'dom_obyvacka',
      typ: 'viac',
      text: 'Obývačka',
      moznosti: [
        { v: 'gauc', label: 'Gauč' },
        { v: 'podlaha_krb', label: 'Podlaha pri krbe' },
        { v: 'prikryvky', label: 'Prikrývky a vankúše na komfort' },
      ],
      inePovolene: true,
    },
  ],
}

// ── Exteriér a verejné prostredia ────────────────────────────────────
const EXTERIER: Blok = {
  druh: 'skupina', id: 'exterier', nadpis: 'Exteriér a verejné prostredia (diskrétne)',
  bloky: [
    {
      druh: 'otazka',
      id: 'ext_skusenost_spokojnost',
      typ: 'jeden',
      text: 'Akú mám skúsenosť s intimitou mimo spálne?',
      moznosti: [
        { v: 'spokojnost', label: 'Už ju zažívam a som s tým spokojný/á' },
        { v: 'zmiesana', label: 'Mám skúsenosť, ale spokojnosť je zmiešaná alebo chcem niečo zmeniť' },
        { v: 'ziadna', label: 'Zatiaľ nemám skúsenosť' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ext_ochota',
      typ: 'jeden',
      inePovolene: true,
      text: 'Chcem preskúmať intimitu mimo spálne?',
      moznosti: [
        { v: 'chcem', label: 'Chcem — láka ma to vyskúšať alebo zopakovať' },
        { v: 'ak_chces', label: 'Rád/rada, ak chceš aj ty' },
        { v: 'mozno', label: 'Možno — potrebujem rozhovor o podmienkach' },
        { v: 'nie', label: 'Nie — teraz sa na to necítim' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ext_miesta_prehlad',
      typ: 'viac',
      text: 'Ktoré miesta mimo spálne ma lákajú?',
      moznosti: [
        { v: 'kupelna', label: 'Kúpeľňa' },
        { v: 'priroda', label: 'Príroda' },
        { v: 'auto', label: 'Auto' },
        { v: 'swingers_klub', label: 'Swingers klub' },
        { v: 'ziadne', label: 'Žiadne' },
      ],
      inePovolene: true,
    },
    {
      druh: 'text', id: 'ext_info', ton: 'info',
      telo:
        'Intímny život sa nemusí odohrávať len v spálni. Auto pod nočnou oblohou, les, opustená pláž — ' +
        'zmena prostredia dokáže priniesť pocit dobrodružstva, aký doma nezažijete. Stačí trocha odvahy a kreativity.',
    },
    {
      druh: 'otazka', id: 'ext_auto', typ: 'jeden',
      text: 'Auto',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'mozno', label: 'Možno, za jasných podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'text', id: 'ext_auto_tip', ton: 'info',
      telo: 'Prakticky: predné aj zadné sedadlá majú svoje polohy — a prikrývka cez okná rieši súkromie aj na osvetlenej ulici.',
    },
    p('ext_priroda', 'Príroda (les, pláž) — pocit slobody a kontakt s prírodou ma láka'),
    {
      druh: 'otazka', id: 'ext_verejne_miesta', typ: 'viac',
      text: 'Ktoré miesta s nádychom verejnosti ma lákajú',
      moznosti: [
        { v: 'kino', label: 'Kino' },
        { v: 'park', label: 'Park' },
        { v: 'swingers_klub', label: 'Swingers klub (téma sama o sebe — pozri modul o zdieľaní partnera)' },
        { v: 'ziadne', label: 'Žiadne — radšej súkromie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ext_techniky',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké podoby intimity chcem skúsiť mimo spálne?',
      moznosti: [
        { v: 'rychlovka', label: 'Rýchlovky — krátke spontánne chvíle blízkosti v súkromí' },
        { v: 'spontanne_prekvapenie', label: 'Spontánne prekvapenie počas bežného dňa (dotyk, šepot, bozk)' },
        { v: 'zmysly_vonku', label: 'Hranie so zmyslami — vietor, vône, teplota a slnko' },
      ],
    },
    {
      druh: 'text',
      id: 'ext_novost_info',
      telo: 'Nové prostredie môže znamenať malú zmenu doma, pobyt v hoteli alebo súkromné miesto v prírode. Rozlišuj, čo si vieš predstaviť a čo chceš naozaj skúsiť. Výber miesta nie je súhlasom s konkrétnou aktivitou.',
    },
    {
      druh: 'otazka',
      id: 'ext_nove_miesta',
      typ: 'viac',
      text: 'S ktorými novými miestami chcem experimentovať?',
      moznosti: [
        { v: 'priroda', label: 'Príroda — les alebo pláž' },
        { v: 'hotel_apartman', label: 'Hotel alebo prenajatý apartmán' },
        { v: 'kupelna', label: 'Kúpeľňa alebo sprcha' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'ext_prostredie_najviac',
      typ: 'jeden',
      inePovolene: true,
      text: 'Aké prostredie ma najviac láka?',
      moznosti: [
        { v: 'priroda', label: 'Príroda — les, pláž alebo hory' },
        { v: 'hotel', label: 'Romantický pobyt v hoteli' },
        { v: 'doma', label: 'Jednoduché zmeny doma — sviečky, nové obliečky' },
      ],
    },
    { druh: 'otazka', id: 'ext_hranica', typ: 'text', text: 'Kde je moja hranica diskrétnosti — čo je pre mňa ešte OK a čo už nie:' },
    {
      druh: 'otazka', id: 'ext_frekvencia', typ: 'jeden', inePovolene: true,
      text: 'Ako často by som chcel(a) experimentovať s prostredím',
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne (napr. raz mesačne)' },
        { v: 'obcas', label: 'Občas, keď je správna príležitosť' },
        { v: 'special', label: 'Len pri špeciálnych príležitostiach' },
      ],
    },
    {
      druh: 'otazka', id: 'ext_dobrodruzstvo_dolezitost', typ: 'jeden', inePovolene: true,
      text: 'Ako dôležitý je pre mňa pocit dobrodružstva v intímnych chvíľach',
      moznosti: [
        { v: 'velmi', label: 'Veľmi — posilňuje našu dôveru' },
        { v: 'dolezity', label: 'Dôležitý — pomáha nám vyhnúť sa rutine' },
        { v: 'zaujimave', label: 'Zaujímavé, ale nie kľúčové' },
        { v: 'nie', label: 'Nie je to pre mňa dôležité' },
      ],
    },
    {
      druh: 'text',
      id: 'ext_pomocky_info',
      telo: 'Diskrétne pomôcky môžu byť menšie, tiché a prenosné. Skúsenosť s nimi a ochota použiť ich nabudúce sú odlišné otázky. Ani nenápadnosť nenahrádza súkromie a dohodu.',
    },
    {
      druh: 'otazka',
      id: 'ext_pomocky_skusenost',
      typ: 'jeden',
      text: 'Akú mám skúsenosť s diskrétnymi pomôckami mimo spálne?',
      moznosti: [
        {
          v: 'spokojnost',
          label: { m: 'Už ich používame a som spokojný', z: 'Už ich používame a som spokojná' },
        },
        { v: 'ina', label: 'Mám skúsenosť, ale chcem ju opísať inak' },
        { v: 'ziadna', label: 'Zatiaľ žiadnu' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ext_pomocky_ochota',
      typ: 'jeden',
      inePovolene: true,
      text: 'Chcem diskrétne pomôcky mimo spálne použiť?',
      moznosti: [
        { v: 'chcem', label: 'Chcem — láka ma začať alebo pokračovať' },
        {
          v: 'ak_chces',
          label: { m: 'Rád, ak chceš aj ty', z: 'Rada, ak chceš aj ty' },
        },
        { v: 'mozno', label: 'Možno — potrebujem rozhovor o podmienkach' },
        {
          v: 'nie',
          label: { m: 'Nie — necítim sa na to pripravený', z: 'Nie — necítim sa na to pripravená' },
        },
      ],
    },
    {
      druh: 'text',
      id: 'ext_dovera_info',
      telo: 'Dobrodružstvo môže pre niekoho znamenať spoločnú dôveru a zmenu rutiny; pre iného nie je dôležité. Nie je skúškou kvality vzťahu ani povinnosťou prekračovať hranice.',
    },
    p('ext_diskretne_pomocky', 'Diskrétne erotické pomôcky mimo spálne (menšie, tiché, prenosné) ma lákajú'),
  ],
}

// ── Hotely a prenajaté priestory ──────────────────────────────────────
const HOTELY: Blok = {
  druh: 'skupina', id: 'hotely', nadpis: 'Hotely a prenajaté priestory',
  bloky: [
    p('hot_unik', '„Mini-únik" — hotel alebo prenajatý apartmán ako zmena prostredia ma láka'),
    {
      druh: 'otazka', id: 'hot_rital', typ: 'viac',
      text: 'Čo by som si vzal(a) so sebou / pripravil(a)',
      moznosti: [
        { v: 'sviecky', label: 'Sviečky / atmosféra' },
        { v: 'playlist', label: 'Playlist' },
        { v: 'pomocky', label: 'Pomôcky a lubrikant' },
        { v: 'tematicka_izba', label: 'Tematická izba (ak je k dispozícii)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'hot_typ_priestoru',
      typ: 'viac',
      text: 'Aký prenajatý alebo dovolenkový priestor ma láka?',
      moznosti: [
        { v: 'hotel', label: 'Hotel' },
        { v: 'apartman', label: 'Prenajatý apartmán' },
        { v: 'chata', label: 'Chata' },
      ],
      inePovolene: true,
    },
    { druh: 'otazka', id: 'hot_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) takýto „date out" night',
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'obcas', label: 'Občas' },
        { v: 'zriedka', label: 'Zriedka, stačí výnimočne' },
      ],
    },
  ],
}

// ── Netradičné a experimentálne prostredia ────────────────────────────
const NETRADICNE: Blok = {
  druh: 'skupina', id: 'netradicne', nadpis: 'Netradičné a experimentálne prostredia',
  bloky: [
    {
      druh: 'otazka', id: 'net_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré netradičné prostredia ma lákajú preskúmať',
      moznosti: [
        { v: 'vytah', label: 'Výťah (krátko, diskrétne)' },
        { v: 'balkon', label: 'Balkón / terasa' },
        { v: 'garaz', label: 'Garáž / pivnica' },
        { v: 'kancelaria', label: 'Kancelária mimo pracovnej doby' },
        { v: 'sauna', label: 'Verejná sauna/wellness (diskrétne, mimo špičky)' },
      ],
    },
    {
      druh: 'otazka',
      id: 'net_scenare_zdroj',
      typ: 'viac',
      text: 'Ktoré netradičné prostredia ma lákajú ako predstava alebo dohodnutý scenár?',
      moznosti: [
        { v: 'kino', label: 'Kino — predstava diskrétnych dotykov a predohry' },
        { v: 'park', label: 'Park — predstava skrytého miesta a napätia z verejnosti' },
        { v: 'hotel', label: 'Tematická hotelová izba — jacuzzi, krb, dekorácie' },
        { v: 'party', label: 'Erotická alebo maskovaná párty, swingers klub' },
        { v: 'vytah_strecha', label: 'Výťah alebo strecha s výhľadom' },
        { v: 'kancelaria', label: 'Kancelária — roleplay a experimentovanie' },
      ],
      inePovolene: true,
    },
    {
      druh: 'text',
      id: 'net_predstava_ramec',
      telo: 'Predstava verejného miesta nemusí byť plánom na jej uskutočnenie. Atmosféru si možno vytvoriť aj v súkromnom roleplay.',
    },
  ],
}

// ── Sex vo vode ──────────────────────────────────────────────────────
// Zdroj: xlsm P49388 („sex vo vode (bazén, vírivka, sprcha)" — označené ako
// nepokryté). Sprcha a vaňa sú v DOMACE; tu ostatné vodné prostredia a to,
// čo je na vode iné (nadnášanie, teplota, voda zmýva lubrikáciu).
const VODA: Blok = {
  druh: 'skupina', id: 'voda', nadpis: 'Sex vo vode',
  uvod:
    'Voda nadnáša, mení vnímanie váhy aj dotyku a pridáva teplotu a zvuk. Zároveň zmýva prirodzenú ' +
    'lubrikáciu — preto sa vo vode častejšie dráždi a penetrácia býva lepšia na kraji než úplne pod hladinou.',
  bloky: [
    {
      druh: 'otazka', id: 'voda_kde', typ: 'viac', inePovolene: true,
      text: 'Ktoré vodné prostredia ma lákajú',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'vana', label: 'Vaňa' },
        { v: 'virivka', label: 'Vírivka / jacuzzi' },
        { v: 'bazen_sukromny', label: 'Súkromný bazén (dom, chata, prenajatá vila)' },
        { v: 'more', label: 'More' },
        { v: 'jazero', label: 'Jazero / rieka' },
        { v: 'sauna_parna', label: 'Sauna / parná kúpeľ (súkromná)' },
        { v: 'dazd', label: 'Dážď vonku' },
      ],
    },
    {
      druh: 'otazka', id: 'voda_skusenost', typ: 'jeden',
      text: 'Moja skúsenosť so sexom vo vode',
      moznosti: [
        { v: 'casto', label: 'Máme to radi a robíme to' },
        { v: 'par_krat', label: 'Párkrát sme to zažili' },
        { v: 'nie_laka', label: 'Ešte nie, ale láka ma to' },
        { v: 'nie', label: 'Neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'voda_co', typ: 'viac',
      text: 'Čo vo vode chcem robiť',
      moznosti: [
        { v: 'bozky_dotyky', label: 'Bozky, dotyky a maznanie' },
        { v: 'masaz', label: 'Umývanie a masáž partnera/ky' },
        { v: 'rukami', label: 'Stimulácia rukami' },
        { v: 'oral_kraj', label: 'Orál na kraji (bazén, vaňa, vírivka)' },
        { v: 'penetracia', label: 'Penetrácia' },
        { v: 'sprchova_hlavica', label: 'Stimulácia prúdom vody / sprchovou hlavicou' },
        { v: 'hracky', label: 'Vodotesné hračky' },
      ],
    },
    {
      druh: 'otazka', id: 'voda_polohy', typ: 'viac',
      text: 'Polohy vo vode, ktoré ma lákajú',
      moznosti: [
        { v: 'stoj_stena', label: 'V stoji pri stene (sprcha, bazén)' },
        { v: 'nadnasana', label: g('Partnerka ma nohami obkročí a voda ju nadnáša', 'Obkročím partnera nohami a voda ma nadnáša') },
        { v: 'kraj_sediac', label: 'Jeden sedí na kraji, druhý vo vode' },
        { v: 'na_nom', label: 'Žena hore na sediacom partnerovi (vírivka, vaňa)' },
        { v: 'zozadu_kraj', label: 'Zozadu, opretá o kraj bazéna/vane' },
        { v: 'lezanie_vana', label: 'Ležanie vo vani / spooning vo vode' },
      ],
    },
    p('voda_lubrikant', 'Silikónový lubrikant, ktorý sa vo vode nezmýva'),
    p('voda_teplota', 'Kontrast teplôt — horúca vírivka, studená sprcha, chladný vzduch'),
    p('voda_prirodna', 'Kúpanie nahí v prírode (nudistická pláž, osamelé jazero)'),
    {
      druh: 'otazka', id: 'voda_brzdy', typ: 'viac', inePovolene: true,
      text: 'Čo mi vo vode zážitok kazí',
      moznosti: [
        { v: 'suchost', label: 'Voda zmýva lubrikáciu — trenie' },
        { v: 'chlor_sol', label: 'Chlór alebo soľ' },
        { v: 'zima', label: 'Zima po vylezení' },
        { v: 'nic', label: 'Nič, užívam si to' },
      ],
    },
  ],
}

// ── Karty zo zdroja ─────────────────────────────────────────────────
// Zdroj: xlsm P48825–48840 (karty Sprcha/vaňa, Jedlo & miesto, Date out,
// Diskrétnosť, Klub). Date out = hot_frekvencia, diskrétnosť = ext_hranica,
// klub = klu_podmienky.
const KARTY: Blok = {
  druh: 'skupina', id: 'karty', nadpis: 'Sprcha, jedlo a miesto',
  bloky: [
    {
      druh: 'otazka', id: 'karta_sprcha', typ: 'jeden',
      text: 'Sprcha / vaňa spolu — ako často',
      moznosti: [
        { v: 'nie', label: 'Nie, neláka ma to' },
        { v: 'obcas', label: 'Občas, ako spestrenie' },
        { v: 'casto', label: 'Často — spoločná sprcha je náš rituál' },
        { v: 'vzdy_predohra', label: 'Ako pravidelná predohra pred posteľou' },
      ],
    },
    {
      druh: 'otazka', id: 'karta_sprcha_co', typ: 'viac',
      text: 'Čo v sprche / vani áno',
      moznosti: [
        { v: 'umyvanie', label: 'Umývať sa navzájom' },
        { v: 'bozky', label: 'Bozky a maznanie' },
        { v: 'oral', label: 'Orál' },
        { v: 'sex', label: 'Sex' },
        { v: 'holenie', label: 'Holiť sa navzájom' },
      ],
    },
    {
      druh: 'otazka', id: 'karta_jedlo_miesto', typ: 'viac', inePovolene: true,
      text: 'Jedlo & miesto — ktoré kombinácie sú lákavé',
      moznosti: [
        { v: 'kuchyna_slahacka', label: 'Šľahačka / čokoláda v kuchyni na pulte' },
        { v: 'vecera_dezert', label: 'Večera pri sviečkach a dezert z tela' },
        { v: 'piknik', label: 'Piknik v prírode' },
        { v: 'vino_vana', label: 'Víno a ovocie vo vani / vírivke' },
        { v: 'restauracia_dotyky', label: 'Dotyky pod stolom v reštaurácii' },
        { v: 'room_service', label: 'Room service v hoteli' },
      ],
    },
  ],
}

// ── Kluby a tematické párty ──────────────────────────────────────────
const KLUBY: Blok = {
  druh: 'skupina', id: 'kluby', nadpis: 'Kluby a tematické párty',
  bloky: [
    {
      druh: 'otazka', id: 'klu_zaujem', typ: 'jeden',
      text: 'Záujem skúsiť klub alebo tematickú párty (swingers/lifestyle)',
      moznosti: [
        { v: 'ano_za_podmienok', label: 'Áno, za jasných podmienok' },
        { v: 'zvedavy', label: 'Zvedavý/á, ale zatiaľ len ako predstava' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    {
      druh: 'otazka', id: 'klu_rola', typ: 'jeden',
      text: 'Preferovaná rola',
      moznosti: [
        { v: 'host', label: '„Host" — aktívne zapojenie' },
        { v: 'guest', label: '„Guest" — len pozorovanie' },
        { v: 'nezalezi', label: 'Nezáleží, uvidíme' },
      ],
    },
    p('klu_bez_zaznamu', 'Pravidlá súkromia a zákaz akéhokoľvek záznamu sú pre mňa podmienkou'),
    {
      druh: 'otazka', id: 'klu_podmienky', typ: 'viac', inePovolene: true,
      text: 'Chceme skúsiť klub? Za akých podmienok',
      moznosti: [
        { v: 'prva_len_drink', label: 'Prvá návšteva len na drink a obzretie' },
        { v: 'len_pozerat', label: 'Len pozerať, nič viac' },
        { v: 'sex_len_my', label: 'Sex len medzi nami dvoma, ostatní sa môžu dívať' },
        { v: 'mimo_mesta', label: 'Mimo nášho mesta, kde nás nikto nepozná' },
        { v: 'tematicky', label: 'Tematický večer (masky, dress code)' },
        { v: 's_parom', label: 'So spriateleným párom' },
        { v: 'nechcem', label: 'Klub nechcem' },
      ],
    },
  ],
}

// ── Osvetlenie a úprava priestoru ────────────────────────────────────
const OSVETLENIE: Blok = {
  druh: 'skupina', id: 'osvetlenie', nadpis: 'Osvetlenie a úprava priestoru',
  bloky: [
    {
      druh: 'text',
      id: 'osv_info',
      nadpis: 'Svetlo a priestor',
      telo: 'Tlmené lampy alebo sviečky môžu podporiť pokoj a romantiku, farebné svetlá hravosť; niekomu vyhovuje tma a inému denné či priame svetlo. Sprcha, kuchynský pult alebo súkromné miesto v prírode ponúkajú odlišnú atmosféru. Spoločné objavovanie priestoru a rytmu môže priniesť nové zážitky a dôveru, ak obaja rešpektujete svoje hranice.',
    },
    {
      druh: 'otazka', id: 'osv_typ', typ: 'jeden', inePovolene: true,
      text: 'Preferované osvetlenie pri intímnych chvíľach',
      moznosti: [
        { v: 'tlmene', label: 'Tlmené svetlo — lampy alebo sviečky' },
        { v: 'farebne', label: 'Farebné svetlo (LED — červená/modrá)' },
        { v: 'tma', label: 'Úplná tma' },
        { v: 'denne', label: 'Prirodzené denné svetlo' },
      ],
    },
    {
      druh: 'otazka', id: 'osv_intenzita', typ: 'jeden', inePovolene: true,
      text: 'Intenzita svetla',
      moznosti: [
        { v: 'jemne', label: 'Jemné, romantické' },
        { v: 'priame', label: 'Priame — zvýrazní detaily tiel' },
      ],
    },
    {
      druh: 'otazka',
      id: 'osv_poriadok_dolezitost',
      typ: 'jeden',
      inePovolene: true,
      text: 'Ako dôležitá je pre mňa upravenosť miestnosti?',
      moznosti: [
        { v: 'velmi', label: 'Veľmi dôležitá' },
        { v: 'trochu', label: 'Záleží mi na nej, ale nie je podmienkou' },
        { v: 'nezalezi', label: 'Nezáleží mi na nej' },
      ],
    },
    {
      druh: 'otazka',
      id: 'osv_priprava_detaily',
      typ: 'viac',
      text: 'Ktoré úpravy priestoru mi pomáhajú cítiť sa dobre?',
      moznosti: [
        { v: 'poriadok', label: 'Uprataná posteľ a čisté prostredie' },
        { v: 'dekoracie', label: 'Dekorácie — kvety a svetelné reťaze' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'osv_pohodlie',
      typ: 'viac',
      text: 'Aké materiály a detaily mi prinášajú pohodlie?',
      moznosti: [
        { v: 'materialy', label: 'Mäkké materiály — napríklad hodváb alebo satén' },
        { v: 'teplota', label: 'Príjemná teplota — ani teplo, ani chlad' },
      ],
      inePovolene: true,
    },
    {
      druh: 'text',
      id: 'osv_detaily_info',
      telo: 'Pohodlie môžu tvoriť mäkké materiály, upravená posteľ, kvety či svetelné reťaze. Myslite aj na pripravené pomôcky, teplotu a klimatizáciu; fotografie a obrazy môžu atmosféru doplniť, ak vám vyhovujú.',
    },
    {
      druh: 'otazka',
      id: 'osv_vizualne_podnety',
      typ: 'viac',
      text: 'Aké vizuálne podnety mi v priestore vyhovujú?',
      moznosti: [
        { v: 'fotografie', label: 'Fotografie' },
        { v: 'obrazy', label: 'Obrazy' },
        { v: 'ziadne', label: 'Radšej bez vizuálnych podnetov' },
      ],
      inePovolene: true,
    },
  ],
}

// ── Zvuk a rušenie ──────────────────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „3) Prostredie, logistika, rituály" —
// hlasitosť/hudba ako maskovanie zvuku, krátke okná príležitosti,
// pred-rituál pripravenosti, prerušenia a návrat po nich.
const ZVUK: Blok = {
  druh: 'skupina', id: 'zvuk', nadpis: 'Zvuk, hudba a hlasitosť',
  bloky: [
    {
      druh: 'otazka', id: 'zvu_hlasitost', typ: 'jeden',
      text: 'Vlastné zvuky (moje aj partnerove) počas sexu',
      moznosti: [
        { v: 'chcem_pocut', label: 'Chcem partnera/ku počuť naplno' },
        { v: 'hudba_maskuje', label: 'Radšej hudba, ktorá zvuky prekryje' },
        { v: 'zalezi_na_mieste', label: 'Záleží na tom, kde sme (doma vs u niekoho)' },
      ],
    },
    {
      druh: 'otazka', id: 'zvu_hudba', typ: 'jeden',
      text: 'Hudba počas sexu',
      moznosti: [
        { v: 'ritmicka', label: 'Rytmická, udáva tempo' },
        { v: 'ambient', label: 'Ambientná, na pozadí' },
        { v: 'ticho', label: 'Radšej ticho' },
      ],
    },
    { druh: 'otazka', id: 'zvu_playlist', typ: 'text', text: 'Môj „sex playlist" — žánre, ktoré fungujú (a ktoré sú tabu):' },
  ],
}

// ── Krátke okno príležitosti ───────────────────────────────────────
const KRATKE_OKNO: Blok = {
  druh: 'skupina', id: 'kratke_okno', nadpis: 'Krátke okno príležitosti',
  bloky: [
    { druh: 'otazka', id: 'okn_kedy', typ: 'text', text: 'Kedy je u nás reálne „okno" na intimitu (čas, dni, situácie):' },
    {
      druh: 'otazka', id: 'okn_planovanie', typ: 'jeden',
      text: 'V krátkom okne preferujem',
      moznosti: [
        { v: 'planovane', label: 'Vopred naplánované' },
        { v: 'spontanne', label: 'Spontánne, keď okno vznikne' },
      ],
    },
    {
      druh: 'otazka', id: 'okn_co_v_kratkom', typ: 'jeden',
      text: 'V krátkom okne (5–20 min) uprednostním',
      moznosti: [
        { v: 'rychly_sex', label: 'Rýchly sex' },
        { v: 'intenzivne_maznanie', label: 'Intenzívne maznanie bez „musieť dokončiť"' },
      ],
    },
  ],
}

// ── Pred-rituál a príprava ──────────────────────────────────────────
const PRED_RITUAL: Blok = {
  druh: 'skupina', id: 'pred_ritual', nadpis: 'Pred-rituál a príprava',
  bloky: [
    {
      druh: 'otazka',
      id: 'pri_na_dosah',
      typ: 'viac',
      text: 'Čo musí byť pripravené na dosah, aby som sa cítil(a) uvoľnene',
      moznosti: [
        { v: 'lubrikant', label: 'Lubrikant' },
        { v: 'uterak', label: 'Uterák' },
        { v: 'voda', label: 'Voda na pitie' },
        { v: 'hracky', label: 'Hračky' },
        { v: 'obcerstvenie', label: 'Občerstvenie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'pri_rusive_prvky',
      typ: 'viac',
      text: 'Čo chcem pred intimitou odložiť alebo stíšiť?',
      moznosti: [
        { v: 'telefon', label: 'Telefóny a oznámenia' },
        { v: 'hluk', label: 'Rušivý hluk' },
        { v: 'povinnosti', label: 'Pracovné podnety a rozptyľujúce povinnosti' },
        { v: 'nic', label: 'Nič konkrétne' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka', id: 'pri_priprava_vzrusujuca', typ: 'jeden',
      text: 'Príprava (sprcha, prádlo, parfum) je pre mňa',
      moznosti: [
        { v: 'vzrusujuca_sucast', label: 'Vzrušujúca súčasť predohry' },
        { v: 'minimalizmus', label: 'Chcem minimalizmus, rovno k veci' },
      ],
    },
    p('pri_jest_pit', 'Pred sexom rád(a) niečo zjem/vypijem — nie je to pre mňa rušivé'),
  ],
}

// ── Prerušenia a návrat ─────────────────────────────────────────────
const PRERUSENIA: Blok = {
  druh: 'skupina', id: 'preusenia', nadpis: 'Prerušenia a návrat',
  bloky: [
    { druh: 'otazka', id: 'per_pravidla', typ: 'text', text: 'Naše pravidlá pre prerušenia (mobil, zvonček, deti, zvieratá):' },
    {
      druh: 'otazka', id: 'per_pokracovat', typ: 'jeden',
      text: 'Po prerušení',
      moznosti: [
        { v: 'pokracovat', label: 'Vieme pokojne pokračovať tam, kde sme skončili' },
        { v: 'vypne_ma', label: 'Prerušenie ma väčšinou úplne vypne' },
      ],
    },
    {
      druh: 'otazka', id: 'per_navrat', typ: 'jeden',
      text: 'Čo najviac pomáha pri návrate späť do nálady',
      moznosti: [
        { v: 'objatie_bozk', label: 'Objatie / bozk' },
        { v: 'sprcha', label: 'Krátka prestávka / sprcha' },
        { v: 'restart', label: 'Reštart úplne od začiatku' },
      ],
    },
  ],
}

// ── Po sexe (v tomto priestore) ─────────────────────────────────────
const PO_SEXE: Blok = {
  druh: 'skupina', id: 'po_sexe', nadpis: 'Po sexe — v danom priestore',
  bloky: [
    {
      druh: 'otazka', id: 'pos_potrebujem', typ: 'jeden',
      text: 'Po sexe najviac potrebujem',
      moznosti: [
        { v: 'fyzicky_kontakt', label: 'Fyzický kontakt' },
        { v: 'priestor', label: 'Trochu priestoru' },
      ],
    },
    { druh: 'otazka', id: 'pos_slova', typ: 'text', text: 'Slová, ktoré chcem po sexe počuť (pochvala, uistenie, poďakovanie):' },
    p('pos_nepriejemne_mobil', 'Okamžité siahnutie po mobile/odchod hneď po sexe je pre mňa nepríjemné'),
  ],
}

// Zjednodušená verzia podľa revízie používateľa 2026-10-01. Staršie jemné
// členenie sa nezobrazuje; miesto je jedna voľba, nie séria intenzít a podmienok.
// Zdroje zoznamu mimo domova:
// - https://pmc.ncbi.nlm.nih.gov/articles/PMC5519052/ — hotel ako samostatná položka
//   v reprezentatívnom americkom výskume sexuálnej diverzity.
// - https://pmc.ncbi.nlm.nih.gov/articles/PMC2885574/ — domov, hotel, sauna,
//   klub, park, toaleta, doprava, kino a auto ako skúmané kategórie miesta.
// - https://onlinedoctor.superdrug.com/public-sex.html — európsko-americký
//   komunitný prieskum: park, pláž, kancelária a verejná toaleta.
const MIESTA_DOMA: Blok = {
  druh: 'skupina', id: 'miesta_doma', nadpis: 'Miesta doma',
  bloky: [
    {
      druh: 'otazka', id: 'miesta_doma_vyber', typ: 'viac', inePovolene: true,
      text: 'Ktoré miesta doma ma lákajú na intimitu alebo sex?',
      moznosti: [
        { v: 'spalna', label: 'Spálňa a posteľ' },
        { v: 'obyvacka', label: 'Obývačka a gauč' },
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'vana', label: 'Vaňa' },
        { v: 'kuchyna', label: 'Kuchyňa — stôl alebo pult' },
        { v: 'podlaha', label: 'Podlaha alebo koberec' },
        { v: 'pradelna', label: 'Práčovňa' },
        { v: 'balkon', label: 'Balkón alebo terasa' },
        { v: 'zahrada', label: 'Záhrada alebo dvor' },
        { v: 'garaz', label: 'Garáž alebo dielňa' },
        { v: 'schody', label: 'Schody alebo chodba' },
        { v: 'bazensauna', label: 'Domáci bazén, vírivka alebo sauna' },
      ],
    },
  ],
}

const MIESTA_MIMO_DOMOVA: Blok = {
  druh: 'skupina', id: 'miesta_mimo_domova', nadpis: 'Miesta mimo domova',
  bloky: [
    {
      druh: 'otazka', id: 'miesta_mimo_vyber', typ: 'viac', inePovolene: true,
      text: 'Ktoré miesta mimo domova ma lákajú na intimitu alebo sex?',
      moznosti: [
        { v: 'hotel', label: 'Hotel, motel alebo prenajatý apartmán' },
        { v: 'chata', label: 'Chata alebo dovolenkový dom' },
        { v: 'iny_domov', label: 'Dom alebo byt niekoho iného' },
        { v: 'auto', label: 'Auto' },
        { v: 'stan', label: 'Stan alebo kempovanie' },
        { v: 'les', label: 'Les' },
        { v: 'luka_park', label: 'Lúka alebo park' },
        { v: 'plaz', label: 'Pláž alebo pobrežie' },
        { v: 'voda', label: 'Jazero, more alebo bazén' },
        { v: 'wellness', label: 'Sauna, wellness alebo vírivka' },
        { v: 'kancelaria', label: 'Kancelária alebo pracovisko' },
        { v: 'klub', label: 'Klub, sex klub alebo tematická párty' },
        { v: 'kino', label: 'Kino alebo divadlo' },
        { v: 'toaleta', label: 'Toaleta alebo prezliekacia kabínka' },
        { v: 'doprava', label: 'Vlak, lietadlo alebo loď' },
        { v: 'vytah_strecha', label: 'Výťah alebo strecha' },
      ],
    },
  ],
}

const CO_NA_MIESTE_LAKA: Blok = {
  druh: 'skupina', id: 'miesto_vyznam', nadpis: 'Čo na zmene miesta vzrušuje',
  uvod:
    'Miesto nie je iba kulisa. Niekedy vzrušuje novosť, inokedy pocit úniku z bežného života, anonymita hotela, sloboda v prírode alebo tajomstvo, že tentoraz nie ste tam, kde zvyčajne.',
  bloky: [
    {
      druh: 'otazka', id: 'miesto_co_laka', typ: 'viac', inePovolene: true,
      text: 'Čo ma na sexe na inom mieste priťahuje?',
      moznosti: [
        { v: 'novost', label: 'Novosť — známe telo v úplne inom priestore' },
        { v: 'spontannost', label: 'Spontánnosť a pocit „stalo sa to samo“' },
        { v: 'unik', label: 'Únik od povinností a bežných rolí' },
        { v: 'tajomstvo', label: 'Tajomstvo a pocit, že o tom vieme iba my dvaja' },
        { v: 'riziko_videnia', label: 'Fantázia, že by nás niekto mohol zazrieť alebo začuť' },
        { v: 'anonymita', label: 'Anonymita hotela alebo cudzieho mesta' },
        { v: 'priroda', label: 'Kontakt s prírodou, vzduchom, vodou alebo nočnou oblohou' },
        { v: 'luxus', label: 'Luxus, výnimočnosť a pocit rozmaznávania' },
        { v: 'spomienka', label: 'Vytvorenie spoločnej spomienky spojenej s konkrétnym miestom' },
        { v: 'rola', label: 'Miesto mi uľahčuje vstúpiť do inej roly alebo nálady' },
      ],
    },
  ],
}

const SCENARE_MIESTA: Blok = {
  druh: 'skupina', id: 'miesto_scenare', nadpis: 'Scenáre, ktoré by mohli prebudiť chuť',
  bloky: [
    {
      druh: 'otazka', id: 'miesto_scenare_vyber', typ: 'viac', inePovolene: true,
      text: 'Ktoré scenáre ma lákajú?',
      moznosti: [
        { v: 'ina_izba', label: 'Bez plánovania sa presunúť do inej miestnosti doma' },
        { v: 'hotel_noc', label: 'Hotelová noc, pri ktorej na chvíľu zmizne bežný život' },
        { v: 'vylet_odbočka', label: 'Počas výletu spontánne odbočiť na miesto, ktoré nás zaujme' },
        { v: 'chata_vikend', label: 'Víkend na chate venovaný blízkosti a sexu' },
        { v: 'auto_zastavka', label: 'Neplánovaná zastávka autom a rýchly spontánny sex' },
        { v: 'priroda_noc', label: 'Byť spolu v prírode, pod hviezdami alebo pri vode' },
        { v: 'cudzie_mesto', label: 'Správať sa v cudzom meste ako milenci, ktorí sa práve stretli' },
        { v: 'luxusny_priestor', label: 'Rozmaznávať sa v krásnej izbe, apartmáne alebo wellness priestore' },
        { v: 'verejna_fantazia', label: 'Vytvoriť si v súkromí atmosféru verejného alebo zakázaného miesta' },
        { v: 'klub_party', label: 'Navštíviť erotický klub alebo tematickú párty' },
      ],
    },
    {
      druh: 'otazka', id: 'miesto_nalada', typ: 'viac', inePovolene: true,
      text: 'Akú náladu má zmena miesta priniesť?',
      moznosti: [
        { v: 'rychla', label: 'Rýchlu a spontánnu' },
        { v: 'romanticka', label: 'Romantickú a výnimočnú' },
        { v: 'dobrodruzna', label: 'Dobrodružnú a hravú' },
        { v: 'surova', label: 'Surovú, prirodzenú a bez príprav' },
        { v: 'tajna', label: 'Tajnú a zakázanú' },
        { v: 'luxusna', label: 'Luxusnú a rozmaznávajúcu' },
        { v: 'dlha', label: 'Pomalú, dlhú a bez časového tlaku' },
      ],
    },
  ],
}

const PARTNER_A_FANTAZIA: Blok = {
  druh: 'skupina', id: 'miesto_partner_fantazia', nadpis: 'Partnerova túžba a moja fantázia',
  bloky: [
    {
      druh: 'otazka', id: 'miesto_partner_tuzi', typ: 'jeden', inePovolene: true,
      text: g('Keď partnerku silno láka miesto, ktoré som si nevybral', 'Keď partnera silno láka miesto, ktoré som si nevybrala'),
      moznosti: [
        { v: 'nakazlive', label: g('Jej nadšenie vo mne môže prebudiť vlastnú chuť', 'Jeho nadšenie vo mne môže prebudiť vlastnú chuť') },
        { v: 'skusim', label: g('Rád ho preskúmam ako spoločný experiment', 'Rada ho preskúmam ako spoločný experiment') },
        { v: 'fantazia', label: 'Môžeme sa s tým hrať vo fantázii alebo roleplay' },
        { v: 'ine_miesto', label: 'Radšej nájdime iné miesto, ktoré láka oboch' },
        { v: 'nie', label: 'Zmena miesta ma sama osebe neláka' },
      ],
    },
    { druh: 'otazka', id: 'miesto_fantazia', typ: 'text', text: 'Miesto alebo scénar, ktorý sa mi vracia vo fantázii a prečo:' },
    { druh: 'otazka', id: 'miesto_spomienka', typ: 'text', text: g('Miesto spojené s našou silnou erotickou spomienkou, ku ktorému by som sa chcel vrátiť:', 'Miesto spojené s našou silnou erotickou spomienkou, ku ktorému by som sa chcela vrátiť:') },
    {
      druh: 'text', id: 'miesto_myty', nadpis: 'Mýty verzus realita', ton: 'info',
      telo:
        'Mýtus: zaujímavý sex potrebuje exotické miesto. Realita: pre niekoho je najväčšou zmenou už presun z postele na gauč alebo spoločná sprcha. Mýtus: fantázia o verejnom mieste musí byť plánom. Realita: často vzrušuje samotné tajomstvo, spontánnosť alebo predstava videnia — rovnakú náladu možno vytvoriť aj v súkromí.',
    },
  ],
}

export const MIESTA_PROSTREDIE: TemaObsah = {
  slug: 'prostredie-atmosfera/prostredie-atmosfera',
  nadpis: 'Miesta a prostredie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'miesto_uvod', nadpis: 'Keď sa zmení kulisa, zmení sa aj príbeh',
      telo:
        'Iná miestnosť môže prebudiť spontánnosť, hotel odložiť bežné roly a príroda priniesť pocit slobody. Nejde o zbieranie miest ani o výkon. Ide o to nájsť kulisy, v ktorých sa medzi vami objaví iný druh túžby.',
    },
  ],
  telo: [MIESTA_DOMA, MIESTA_MIMO_DOMOVA, CO_NA_MIESTE_LAKA, SCENARE_MIESTA, PARTNER_A_FANTAZIA],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
