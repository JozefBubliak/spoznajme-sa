import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Trans žena — žena s penisom — modul H9. VZOR plne personalizovanej témy.
// Muž = má partnerku, žena = má partnera. Dve dimenzie: (1) moja vlastná
// túžba, (2) môj postoj, keď to vzrušuje partnera/partnerku.
//
// Rešerš (2026-09-30):
// - Lehmiller (2018, n≈4 000): 7 % mužov a 2 % žien často fantazíruje o sexe
//   s trans partnerom/partnerkou; zhruba každá 4. žena to niekedy fantazírovala.
// - Hsu, Rosenthal a kol. (2016, Arch Sex Behav): muži s touto príťažlivosťou
//   sú v priemere rovnako priťahovaní ženami — ide o variant heterosexuality.
//   6,1 % mužov malo v obľúbenej fantázii byť penetrovaný trans ženou alebo
//   ženou so strap-onom. https://en.wikipedia.org/wiki/Attraction_to_transgender_people
// - Estrogén do 3–6 mesiacov výrazne znižuje spontánne erekcie; citlivosť
//   ostáva, rozkoš je rozptýlenejšia (bradavky, krk, stehná); veľa trans žien
//   je radšej pasívna alebo nechce, aby sa riešil penis; po operácii penis
//   nemá. https://www.transwiki.co/en/wiki/sex-with-a-trans-woman ,
//   https://www.folxhealth.com/library/estrogen-hrt-and-sexual-function
// - Obavy partneriek: je to fáza alebo trvalé, hovorí pravdu, nestačím,
//   čo to znamená pre budúcnosť vzťahu. https://transamorousnetwork.com
// Pôvodné ID trans_frekvencia / trans_realizacia z fantazie.ts zachované.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už som to zažil a chcem znova', 'Už som to zažila a chcem znova') },
  { v: 'tuzim', label: 'Túžim to skúsiť' },
  { v: 'fantazia', label: 'Vzrušuje ma to len ako predstava' },
  { v: 'ak_partner', label: g('Áno, ak by to chcela moja partnerka', 'Áno, ak by to chcel môj partner') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'jeden', text, moznosti: POSTOJ,
})
const M = { pohlavie: 'm' as const }
const Z = { pohlavie: 'z' as const }
const pm = (id: string, text: string): Blok => ({ ...p(id, text), podmienka: M })
const pz = (id: string, text: string): Blok => ({ ...p(id, text), podmienka: Z })

// ── 1. Moja predstava ────────────────────────────────────────────────
const ROVINA: Blok = {
  druh: 'skupina', id: 'rovina', nadpis: 'Moja predstava',
  bloky: [
    {
      druh: 'otazka', id: 'trans_frekvencia', typ: 'jeden',
      text: g(
        'Ako často ma napadne predstava sexu s trans ženou',
        'Ako často ma napadne predstava trans ženy — so mnou alebo s mojím partnerom',
      ),
      moznosti: [
        { v: 'nikdy', label: 'Nikdy' },
        { v: 'zriedka', label: 'Zriedka' },
        { v: 'obcas', label: 'Občas' },
        { v: 'casto', label: 'Často' },
        { v: 'velmi_casto', label: 'Veľmi často — patrí k mojim najsilnejším predstavám' },
      ],
    },
    {
      druh: 'otazka', id: 'trans_realizacia', typ: 'jeden',
      text: g('Chcel by som to niekedy zažiť naozaj?', 'Chcela by som to niekedy zažiť naozaj?'),
      moznosti: [
        { v: 'len_fantazia', label: 'Nie, nech ostane predstavou' },
        { v: 'talk', label: g('Len v rozprávaní s partnerkou počas sexu', 'Len v rozprávaní s partnerom počas sexu') },
        { v: 'doma', label: g('Doma s partnerkou — strap-on, hra na rolu', 'Doma s partnerom — ja so strap-onom, hra na rolu') },
        { v: 'za_podmienok', label: 'S trans ženou, za určitých podmienok' },
        { v: 'ano', label: 'S trans ženou, naozaj' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_kde', typ: 'viac', inePovolene: true,
      text: 'Kde sa to u mňa objavuje',
      moznosti: [
        { v: 'myslienky', label: 'V myšlienkach a pri masturbácii' },
        { v: 'porno', label: 'Pozerám porno s trans ženami' },
        { v: 'anime', label: 'Futanari, anime, kreslené, AI obrázky' },
        { v: 'chat', label: 'Chat, sexting, videohovor s trans ženou' },
        { v: 'seznamka', label: 'Prezerám profily na zoznamkách (Feeld a pod.)' },
        { v: 'stretnutie_samo', label: g('Stretnutie s trans ženou bez partnerky', 'Stretnutie s trans ženou bez partnera') },
        { v: 'trojka', label: g('Trojka: ja, moja partnerka a trans žena', 'Trojka: ja, môj partner a trans žena') },
      ],
    },
    {
      druh: 'otazka', id: 'tr_skusenost', typ: 'jeden',
      text: 'Moja skúsenosť s trans ženou',
      moznosti: [
        { v: 'ziadna', label: 'Žiadna' },
        { v: 'online', label: 'Len online' },
        { v: 'raz', label: 'Raz naživo' },
        { v: 'viackrat', label: 'Viackrát naživo' },
        { v: 'vztah', label: 'Vzťah alebo dlhší vzťah' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_od_kedy', typ: 'jeden',
      text: 'Odkedy to vo mne je',
      moznosti: [
        { v: 'odjakziva', label: 'Odjakživa, odkedy si pamätám' },
        { v: 'roky', label: 'Niekoľko rokov' },
        { v: 'nedavno', label: 'Objavilo sa to nedávno' },
        { v: 'vlny', label: 'Prichádza a odchádza vo vlnách' },
      ],
    },
  ],
}

// ── 2. Čo ma vzrušuje ────────────────────────────────────────────────
const PRITAHUJE: Blok = {
  druh: 'skupina', id: 'pritahuje', nadpis: 'Čo ma na tom vzrušuje',
  bloky: [
    {
      druh: 'otazka', id: 'tr_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma najviac vzrušuje',
      moznosti: [
        { v: 'kombinacia', label: 'Ženské telo, prsia a penis naraz' },
        { v: 'zenskost', label: 'Jej ženskosť — tvár, vlasy, oblečenie, pohyby, hlas' },
        { v: 'penis', label: 'Jej penis — vidieť ho, dotýkať sa ho, ochutnať ho' },
        { v: 'erekcia', label: 'Vidieť jej vzrušenie — erekciu, ejakuláciu' },
        { v: 'aktivna', label: 'Že ma môže penetrovať žena' },
        { v: 'tabu', label: 'Zakázanosť a tabu' },
        { v: 'bez_muza', label: g('Zažiť penis bez toho, aby to bol muž', 'Ženskosť a penis v jednom tele') },
        { v: 'porozumenie', label: g('Že presne vie, ako funguje mužské telo', 'Že je to žena, ktorá má zároveň to, čo má muž') },
        { v: 'dominancia', label: 'Dominantná trans žena' },
        { v: 'jemnost', label: 'Jemná, poddajná trans žena' },
        { v: 'pozerat_partnera', label: g('Pozerať sa na ňu s mojou partnerkou', 'Pozerať sa na ňu s mojím partnerom') },
      ],
    },
    {
      druh: 'otazka', id: 'tr_typ', typ: 'viac', inePovolene: true,
      text: 'Aká ma láka',
      moznosti: [
        { v: 'velmi_zenska', label: g('Veľmi ženská — na ulici by som nič nepoznal', 'Veľmi ženská — na ulici by som nič nepoznala') },
        { v: 'vyrazne_prsia', label: 'S výraznými prsiami' },
        { v: 'prirodzena', label: 'Prirodzená, bez veľkých úprav' },
        { v: 'velky_penis', label: 'S väčším penisom' },
        { v: 'maly_penis', label: 'S menším penisom' },
        { v: 'erekcia_dolezita', label: 'Dôležité je, aby mala erekciu' },
        { v: 'po_operacii', label: 'Už po operácii — bez penisu' },
        { v: 'nezalezi', label: 'Nezáleží, ide o konkrétnu ženu' },
      ],
    },
  ],
}

// ── 3. Čo by som s ňou chcel/a robiť ─────────────────────────────────
const PRAKTIKY: Blok = {
  druh: 'skupina', id: 'praktiky', nadpis: g('Čo by som s ňou chcel robiť', 'Čo by som s ňou chcela robiť ja'),
  uvod: 'Každá položka zvlášť — aj keď je to zatiaľ len predstava.',
  bloky: [
    p('tr_bozky', 'Bozkávať sa s ňou'),
    p('tr_prsia', 'Hladkať, bozkávať a sať jej prsia a bradavky'),
    p('tr_dotyk_penis', 'Dotýkať sa jej penisu, masturbovať ju'),
    pm('tr_ona_mna', 'Aby ma rukou masturbovala ona'),
    pz('tr_ona_mna', 'Aby ma prstami hladila a dráždila ona'),
    p('tr_oral_dat', 'Dávať jej orál'),
    p('tr_oral_prijat', 'Prijímať od nej orál'),
    p('tr_69', '69 s ňou'),
    pm('tr_trenie', 'Trenie našich penisov o seba'),
    pz('tr_trenie', 'Trieť sa o ňu — jej penis o moju vulvu'),
    pm('tr_penetrovat', 'Análne ju penetrovať'),
    pz('tr_penetrovat', 'Penetrovať ju strap-onom'),
    pm('tr_byt_penetrovany', 'Byť ňou análne penetrovaný'),
    pz('tr_byt_penetrovany', 'Byť ňou penetrovaná vaginálne'),
    pz('tr_byt_penetrovana_anal', 'Byť ňou penetrovaná análne'),
    p('tr_ejakulacia', 'Aby sa udelala na mňa'),
    p('tr_prehltnut', 'Prehltnúť jej spermu'),
    p('tr_dominuje', 'Aby ma ovládala'),
    p('tr_dominujem', 'Ovládať ju'),
    {
      druh: 'otazka', id: 'tr_rola', typ: 'jeden',
      text: 'Ktorá rola ma láka',
      moznosti: [
        { v: 'top', label: 'Ja penetrujem ju' },
        { v: 'bottom', label: 'Ona penetruje mňa' },
        { v: 'obe', label: 'Oboje, striedanie' },
        { v: 'bez_penetracie', label: 'Bez penetrácie — dotyky a orál' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_bez_erekcie', typ: 'jeden',
      text: 'Keby nemala erekciu alebo nechcela, aby sa riešil jej penis',
      napoveda: 'Hormóny u veľa trans žien výrazne oslabia erekciu; mnohé sú radšej pasívne alebo si penis nechcú dávať do centra pozornosti.',
      moznosti: [
        { v: 'stale', label: 'Stále by ma to lákalo — ide mi o ňu celú' },
        { v: 'menej', label: 'Lákalo by ma to menej' },
        { v: 'nie', label: 'Nelákalo by ma to — penis je pre mňa podstatný' },
        { v: 'neviem', label: 'Neviem' },
      ],
    },
  ],
}

// ── 4. Keď to vzrušuje môjho partnera / moju partnerku ───────────────────
const POSTOJ_K_PARTNEROVI: Blok = {
  druh: 'skupina', id: 'postoj_partner',
  nadpis: g('Keby to vzrušovalo moju partnerku', 'Keby to vzrušovalo môjho partnera'),
  uvod: g(
    'Predstav si, že ti partnerka prizná, že ju vzrušujú trans ženy — že by chcela vidieť ženu s penisom, byť s ňou, alebo ťa pri nej sledovať.',
    'Predstav si, že ti partner prizná, že ho vzrušujú trans ženy — že pozerá také porno alebo by chcel byť so ženou, ktorá má penis.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'pp_reakcia', typ: 'viac', inePovolene: true,
      text: g('Ako by som reagoval', 'Ako by som reagovala'),
      moznosti: [
        { v: 'vzrusilo', label: 'Vzrušilo by ma to' },
        { v: 'zvedavost', label: g('Bol by som zvedavý, čo ju na tom láka', 'Bola by som zvedavá, čo ho na tom láka') },
        { v: 'fantazia_ok', label: g('Ako jej predstava mi to neprekáža', 'Ako jeho predstava mi to neprekáža') },
        { v: 'ulava', label: g('Uľavilo by sa mi, že mi to povedala', 'Uľavilo by sa mi, že mi to povedal') },
        { v: 'prekvapenie', label: 'Prekvapilo by ma to, potrebujem čas' },
        { v: 'nepriemne', label: 'Bolo by mi to nepríjemné' },
      ],
    },
    {
      druh: 'otazka', id: 'pp_obavy', typ: 'viac', inePovolene: true,
      text: g('Čoho by som sa bál', 'Čoho by som sa bála'),
      moznosti: [
        { v: 'nestacim', label: g('Že jej nestačím', 'Že mu nestačím') },
        { v: 'orientacia', label: g('Že ju priťahujú aj ženy / že je bi', 'Že ho priťahujú muži / že je gay') },
        { v: 'trvale', label: 'Že to nie je chvíľková zvedavosť, ale natrvalo' },
        { v: 'odide', label: g('Že ju to raz odvedie odo mňa', 'Že ho to raz odvedie odo mňa') },
        { v: 'tajomstvo', label: g('Že mi niečo tají — napríklad, že už to zažila', 'Že mi niečo tají — napríklad, že už to zažil') },
        { v: 'okolie', label: 'Čo by si pomysleli ostatní' },
        { v: 'nic', label: 'Ničoho' },
      ],
    },
    {
      druh: 'otazka', id: 'pp_pomohlo', typ: 'viac', inePovolene: true,
      text: 'Čo by mi pomohlo',
      moznosti: [
        { v: 'vediet', label: 'Vedieť, že ma chce rovnako ako predtým' },
        { v: 'pravda', label: 'Celá pravda — odkedy to má a čo presne chce' },
        { v: 'pri_tom', label: 'Byť pri tom, nič bez mňa' },
        { v: 'pomaly', label: 'Postupovať pomaly — najprv len rozhovor a porno' },
        { v: 'zapojit', label: 'Zapojiť do toho aj moju túžbu' },
      ],
    },
    p('pp_talk', g('Rozprávať sa o jej predstave počas sexu', 'Rozprávať sa o jeho predstave počas sexu')),
    p('pp_porno', 'Pozerať spolu trans porno'),
    p('pp_trojka', 'Trojka s trans ženou, kde som aj ja'),
    p('pp_pozerat', g('Pozerať sa, ako je moja partnerka s trans ženou', 'Pozerať sa, ako je môj partner s trans ženou')),
    p('pp_bezo_mna', g('Aby to partnerka zažila bezo mňa a potom mi to porozprávala', 'Aby to partner zažil bezo mňa a potom mi to porozprával')),
    pm('pp_ona_strapon', 'Aby partnerka namiesto toho nosila strap-on a bola mojou „ženou s penisom"'),
    pz('pp_ja_strapon', 'Nosiť pre partnera strap-on a byť jeho „ženou s penisom"'),
    pm('pp_pegging', 'Nechať sa partnerkou penetrovať strap-onom'),
    pz('pp_pegging', 'Penetrovať partnera strap-onom'),
    {
      druh: 'otazka', id: 'pp_hranica', typ: 'text',
      text: g('Kde by bola moja hranica, keby to chcela partnerka:', 'Kde by bola moja hranica, keby to chcel partner:'),
    },
  ],
}

// ── 5. Trojka ────────────────────────────────────────────────────────
const TROJKA: Blok = {
  druh: 'skupina', id: 'trojka', nadpis: g('Trojka: ja, partnerka a trans žena', 'Trojka: ja, partner a trans žena'),
  bloky: [
    {
      druh: 'otazka', id: 'tj_kto', typ: 'viac', inePovolene: true,
      text: 'Kto s kým — čo ma láka',
      moznosti: [
        { v: 'ja_s_nou', label: 'Ja s ňou' },
        { v: 'partner_s_nou', label: g('Partnerka s ňou', 'Partner s ňou') },
        { v: 'ona_s_oboma', label: 'Ona s nami oboma naraz' },
        { v: 'ona_mna_partner_pozera', label: g('Ona so mnou, partnerka sa pozerá', 'Ona so mnou, partner sa pozerá') },
        { v: 'ja_pozeram', label: 'Ja sa len pozerám' },
        { v: 'dvojita', label: g('Partnerka a ona spolu so mnou', 'Partner a ona spolu so mnou') },
      ],
    },
    pm('tj_ona_partnerku', 'Aby trans žena penetrovala moju partnerku'),
    pz('tj_ona_mna_pred_nim', 'Aby ma trans žena penetrovala pred mojím partnerom'),
    pm('tj_ona_mna_pred_nou', 'Aby ma trans žena penetrovala pred mojou partnerkou'),
    pz('tj_ona_jeho', 'Aby trans žena penetrovala môjho partnera'),
  ],
}

// ── 6. Len my dvaja ──────────────────────────────────────────────────
const DOMA: Blok = {
  druh: 'skupina', id: 'bez_tretej', nadpis: 'Len my dvaja',
  uvod: 'Veľa párov si túto predstavu užíva doma, bez tretej osoby.',
  bloky: [
    pm('bt_strapon', 'Partnerka s realistickým strap-onom — ako žena s penisom'),
    pz('bt_strapon', 'Ja s realistickým strap-onom — ako žena s penisom'),
    pm('bt_duty', 'Hra na rolu: moja partnerka je trans žena'),
    pz('bt_duty', 'Hra na rolu: som trans žena a partner je so mnou'),
    pm('bt_pegging', 'Partnerka ma penetruje strap-onom'),
    pz('bt_pegging', 'Penetrujem partnera strap-onom'),
    pm('bt_ja_zena', 'Ja v dámskom prádle / ako žena — partnerka ma tak berie'),
    pz('bt_on_zena', 'Partner v dámskom prádle / ako žena'),
    p('bt_porno', 'Spoločné trans porno, futanari alebo erotické poviedky'),
    p('bt_talk', 'Rozprávať počas sexu, čo by sme s ňou robili'),
  ],
}

// ── 7. Pocity ────────────────────────────────────────────────────────
const POCITY: Blok = {
  druh: 'skupina', id: 'pocity', nadpis: 'Čo pri tom cítim',
  bloky: [
    {
      druh: 'otazka', id: 'tr_pocit', typ: 'viac', inePovolene: true,
      text: 'Čo pri tejto predstave cítim',
      moznosti: [
        { v: 'vzrusenie', label: 'Čisté vzrušenie, bez výčitiek' },
        { v: 'hanba', label: 'Hanbu — čo by si pomysleli iní' },
        { v: 'orientacia', label: 'Otázku, čo to hovorí o mojej orientácii' },
        { v: 'strach_partner', label: g('Strach, ako by reagovala partnerka', 'Strach, ako by reagoval partner') },
        { v: 'vina', label: g('Vinu voči partnerke', 'Vinu voči partnerovi') },
        { v: 'zvedavost', label: 'Zvedavosť' },
      ],
    },
    {
      druh: 'otazka', id: 'tr_partner_vie', typ: 'jeden',
      text: g('Vie o tejto mojej predstave partnerka?', 'Vie o tejto mojej predstave partner?'),
      moznosti: [
        { v: 'vie_ok', label: 'Vie a je to v poriadku' },
        { v: 'vie_zdrzanlivo', label: 'Vie, ale nehovoríme o tom' },
        { v: 'nevie', label: 'Nevie' },
        { v: 'nie_je', label: 'Túto predstavu nemám' },
      ],
    },
    { druh: 'otazka', id: 'tr_pozn', typ: 'text', text: g('Čo chcem, aby partnerka vedela:', 'Čo chcem, aby partner vedel:') },
  ],
}

export const TRANS_PARTNERKA: TemaObsah = {
  slug: 'trans-partnerka/trans-partnerka',
  nadpis: 'Trans žena — žena s penisom',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Ženské telo, prsia — a penis',
      telo: g(
        'Ženská tvár, vlasy a prsia a k tomu penis. Pre niekoho to najlepšie z oboch svetov, pre iného zakázané tabu, pre ďalšieho možnosť zažiť penis bez toho, aby to bol muž. ' +
          'Táto téma sa pýta na dve veci: čo by si chcel ty — a ako by si to vnímal, keby to vzrušovalo tvoju partnerku.',
        'Ženská tvár, vlasy a prsia a k tomu penis. Láka to viac žien, než by sa zdalo — a ešte viac mužov. ' +
          'Táto téma sa pýta na dve veci: či to niečím láka teba — a ako by si to vnímala, keby to vzrušovalo tvojho partnera.',
      ),
    },
    {
      druh: 'text', id: 'cisla', nadpis: g('Nie si v tom sám', 'Nie si v tom sama'), ton: 'info',
      telo:
        'Vo veľkom americkom prieskume sexuálnych fantázií (Lehmiller, takmer 4 000 ľudí) 7 % mužov uviedlo, že o sexe s trans ženou fantazírujú často — a zhruba každá štvrtá žena o tom niekedy fantazírovala. ' +
        'Asi 6 % mužov má vo svojej najobľúbenejšej fantázii, že ich penetruje trans žena alebo žena so strap-onom. ' +
        'Trans porno patrí medzi najsledovanejšie kategórie a najviac ho pozerajú heterosexuálni muži.',
    },
    {
      druh: 'text', id: 'myty', nadpis: 'Mýty', ton: 'info',
      telo: g(
        'Mýtus: „Keď ma to priťahuje, som gay." — Realita: výskum ukazuje, že títo muži sú v priemere rovnako priťahovaní ženami. Priťahuje ťa žena; odborníci to opisujú ako variant heterosexuality.\n\n' +
          'Mýtus: „Nikto normálny to nemá." — Realita: pozri čísla vyššie. Nie je za čo sa hanbiť.\n\n' +
          'Mýtus: „Keď to chce partnerka, nestačím jej." — Realita: jej predstava iného tela nie je kritika toho tvojho.',
        'Mýtus: „Keď to vzrušuje môjho partnera, je gay." — Realita: výskum ukazuje, že títo muži sú v priemere rovnako priťahovaní ženami. Priťahuje ho žena.\n\n' +
          'Mýtus: „Keď to chce, nestačím mu." — Realita: jeho predstava iného tela nie je kritika toho tvojho. Veľa párov si ju užíva spolu — napríklad so strap-onom.\n\n' +
          'Mýtus: „Ženy takú predstavu nemajú." — Realita: zhruba každá štvrtá žena o tom niekedy fantazírovala.',
      ),
    },
    {
      druh: 'text', id: 'realita', nadpis: 'Dobré vedieť',
      telo:
        'Predstava z porna a realita sa líšia. Hormóny u väčšiny trans žien do pár mesiacov výrazne oslabia erekciu — citlivosť ostáva, ale rozkoš sa presúva aj na prsia, krk a stehná. ' +
        'Veľa trans žien je v posteli radšej pasívnych, niektoré nechcú, aby bol ich penis stredobodom, a po operácii ho už nemajú. ' +
        'Slovo „shemale" z porna mnohé vnímajú ako urážku — ony samy o sebe hovoria „trans žena".',
    },
  ],
  telo: [
    ROVINA,
    PRITAHUJE,
    PRAKTIKY,
    POSTOJ_K_PARTNEROVI,
    TROJKA,
    DOMA,
    POCITY,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: g(
        'Partnerka uvidí len to, v čom sa zhodnete. Čo označíš „Nie", sa jej nezobrazí.',
        'Partner uvidí len to, v čom sa zhodnete. Čo označíš „Nie", sa mu nezobrazí.',
      ),
    },
  ],
}
