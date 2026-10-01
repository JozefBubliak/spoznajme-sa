import type { TemaObsah, Blok, Moznost } from './typ'

// Voyeurizmus a exhibicionizmus — modul H2.
// XLSM P38890–38923: partner ako divák, iné páry/jednotlivci a semi-public.
// Rešerš: Långström & Seto (2006), švédska populačná štúdia,
// https://pubmed.ncbi.nlm.nih.gov/16900414/; komunitné mapy foriem a rolí:
// https://kinkchecklist.com/categories/voyeurismexhibitionism,
// https://bdsmchecklist.com/activities/explained/fetish-types-voyeurism,
// Reddit r/nonmonogamy — play-party miestnosti s možnosťou sledovať bez výmeny.
// Zdroj ani rešerš nie sú šablóna; otázky sú usporiadané podľa psychológie
// pohľadu, rolí, publika, miery odhalenia a reakcie na túžbu partnera.

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, ale zaujíma ma to', 'Neskúšala som, ale zaujíma ma to') },
]

const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

const POHLAD_PARTNERA: Blok = {
  druh: 'skupina', id: 'pohlad_partnera', nadpis: g('Jej pohľad na mne', 'Jeho pohľad na mne'),
  uvod: g(
    'Niekedy netreba publikum ani cudzie telo. Stačí vedieť, že partnerka sleduje každý pohyb, dych a chvíľu, keď sa prestaneš kontrolovať. Jej pohľad môže byť obdivom, vedením aj tichou mocou.',
    'Niekedy netreba publikum ani cudzie telo. Stačí vedieť, že partner sleduje každý pohyb, dych a chvíľu, keď sa prestaneš kontrolovať. Jeho pohľad môže byť obdivom, vedením aj tichou mocou.',
  ),
  bloky: [
    p('pp_tanec', g('Predvádzať sa partnerke erotickým tancom alebo pomalým vyzliekaním', 'Predvádzať sa partnerovi erotickým tancom alebo pomalým vyzliekaním')),
    p('pp_masturbacia', g('Masturbovať pred partnerkou a nechať ju iba pozerať', 'Masturbovať pred partnerom a nechať ho iba pozerať')),
    p('pp_hracka', g('Používať hračku na sebe, kým partnerka sleduje moje reakcie', 'Používať hračku na sebe, kým partner sleduje moje reakcie')),
    p('pp_sex', g('Byť sledovaný partnerkou počas intímnej aktivity', 'Byť sledovaná partnerom počas intímnej aktivity')),
    {
      druh: 'otazka', id: 'pp_reakcia_divaka', typ: 'viac', inePovolene: true,
      text: g('Ako chcem, aby partnerka pri sledovaní reagovala', 'Ako chcem, aby partner pri sledovaní reagoval'),
      moznosti: [
        { v: 'ticho', label: 'Iba ticho sledovať' },
        { v: 'pohlad', label: 'Držať očný kontakt' },
        { v: 'komplimenty', label: 'Obdivovať ma a hovoriť, čo sa jej/mu páči' },
        { v: 'instrukcie', label: 'Viesť ma slovami a určovať tempo' },
        { v: 'masturbovat', label: 'Venovať sa pritom vlastnému telu' },
        { v: 'pridat_sa', label: 'Po chvíli sa pridať' },
        { v: 'nesmiem_sa_dotknut', label: 'Pozerať sa, ale nesmieť sa ma dotknúť' },
      ],
    },
  ],
}

const SLEDOVAT: Blok = {
  druh: 'skupina', id: 'sledovat', nadpis: 'Byť divákom — vidieť to, čo býva skryté',
  uvod:
    'Vzrušenie diváka môže byť v detaile, ktorý človek pri vlastnom zapojení prehliadne: meniaci sa dych, mimovoľný pohyb panvy, strata kontroly alebo vedomie, že scéna pokračuje práve pre jeho pohľad.',
  bloky: [
    p('sl_partner_solo', g('Sledovať partnerku pri vyzliekaní, tanci alebo masturbácii', 'Sledovať partnera pri vyzliekaní, tanci alebo masturbácii')),
    p('sl_partner_ine', g('Sledovať partnerku pri dotykoch alebo sexe s inou osobou', 'Sledovať partnera pri dotykoch alebo sexe s inou osobou')),
    p('sl_cudzi_par', 'Sledovať iný pár pri erotickej alebo sexuálnej aktivite'),
    p('sl_scena_klub', 'Byť iba divákom pri scéne v klube alebo na erotickej párty'),
    p('sl_live_video', 'Sledovať živé vysielanie alebo súkromný videohovor namiesto nahrávky'),
    {
      druh: 'otazka', id: 'sl_co_vzrusuje', typ: 'viac', inePovolene: true,
      text: 'Čo ma na sledovaní priťahuje',
      moznosti: [
        { v: 'reakcie', label: 'Nestrážené reakcie, dych a zvuky' },
        { v: 'detail', label: 'Možnosť sústrediť sa na detaily tela a techniky' },
        { v: 'tajomstvo', label: 'Pocit prístupu k niečomu bežne súkromnému' },
        { v: 'moc', label: 'Moc pohľadu — druhý vie, že ho sledujem' },
        { v: 'bez_vykonu', label: 'Vzrušenie bez povinnosti aktívne podávať výkon' },
        { v: 'compersion', label: g('Radosť a hrdosť z partnerkinej rozkoše', 'Radosť a hrdosť z partnerovej rozkoše') },
        { v: 'ucenie', label: 'Učenie sa z toho, čo druhému naozaj funguje' },
      ],
    },
    {
      druh: 'otazka', id: 'sl_zapojenie', typ: 'jeden',
      text: 'Kde končí rola diváka',
      moznosti: [
        { v: 'iba_pohlad', label: 'Chcem zostať iba pri pohľade' },
        { v: 'slova', label: 'Chcem reagovať hlasom alebo pokynmi' },
        { v: 'dotyk_neskor', label: 'Po čase sa chcem dotykom pridať' },
        { v: 'plne_zapojenie', label: 'Sledovanie je pre mňa predohra k plnému zapojeniu' },
        { v: 'podla_sceny', label: 'Záleží od scény a ľudí' },
      ],
    },
  ],
}

const PUBLIKUM: Blok = {
  druh: 'skupina', id: 'publikum', nadpis: g('Byť videný — od súkromného pohľadu po publikum', 'Byť videná — od súkromného pohľadu po publikum'),
  uvod:
    'Byť sledovaný môže znamenať jemné predvádzanie pre jedného človeka aj pocit, že celá miestnosť sleduje práve vás. Meniť sa môže počet ľudí, ich blízkosť, známosť, reakcie aj to, či ostanú divákmi.',
  bloky: [
    {
      druh: 'otazka', id: 'pub_kto', typ: 'viac', inePovolene: true,
      text: 'Kto ma vo fantázii alebo realite sleduje',
      moznosti: [
        { v: 'partner', label: g('Iba partnerka', 'Iba partner') },
        { v: 'jedna_znama', label: 'Jedna známa a dôveryhodná osoba' },
        { v: 'jeden_cudzi', label: 'Jeden neznámy divák' },
        { v: 'iny_par', label: 'Iný pár' },
        { v: 'mala_skupina', label: 'Malá vybraná skupina' },
        { v: 'klub', label: 'Ľudia v swingers alebo kink klube' },
        { v: 'online', label: 'Súkromné online publikum' },
        { v: 'anonymne_pohlady', label: 'Anonymné pohľady bez ďalšieho kontaktu' },
      ],
    },
    {
      druh: 'otazka', id: 'pub_co_vidi', typ: 'viac', inePovolene: true,
      text: 'Čo má publikum vidieť',
      moznosti: [
        { v: 'oblecenie', label: 'Odvážne oblečenie, telo iba naznačené' },
        { v: 'vyzliekanie', label: 'Pomalé vyzliekanie alebo erotický tanec' },
        { v: 'nahota', label: 'Nahotu a pózovanie' },
        { v: 'masturbacia', label: 'Masturbáciu alebo použitie hračky' },
        { v: 'parova_intimita', label: g('Intimitu s partnerkou', 'Intimitu s partnerom') },
        { v: 'scena', label: 'Pripravenú BDSM alebo roleplay scénu' },
        { v: 'plny_sex', label: 'Plný sexuálny akt' },
      ],
    },
    {
      druh: 'otazka', id: 'pub_reakcie', typ: 'viac', inePovolene: true,
      text: 'Aké reakcie publika ma vzrušujú',
      moznosti: [
        { v: 'ticho', label: 'Tiché sústredené pohľady' },
        { v: 'obdiv', label: 'Komplimenty a obdiv' },
        { v: 'vzrusenie', label: 'Vidieť, že sa diváci vzrušujú' },
        { v: 'pokyny', label: 'Pokyny alebo výzvy od publika' },
        { v: 'partner_hrdost', label: g('Partnerkina hrdosť, že som žiadaný', 'Partnerova hrdosť, že som žiadaná') },
        { v: 'ignorovanie', label: g('Byť vystavený, no publikum sa tvári ľahostajne', 'Byť vystavená, no publikum sa tvári ľahostajne') },
      ],
    },
    {
      druh: 'otazka', id: 'pub_rola', typ: 'jeden',
      text: 'Má publikum zostať publikom?',
      moznosti: [
        { v: 'ano', label: 'Áno, práve nedostupnosť je pointa' },
        { v: 'vybrany_dotyk', label: 'Jedna vybraná osoba sa môže pridať' },
        { v: 'postupne', label: 'Vzrušuje ma postupný prechod od pohľadov k dotykom' },
        { v: 'fantazia', label: 'Táto časť má zostať iba fantáziou' },
      ],
    },
  ],
}

const RIZIKO: Blok = {
  druh: 'skupina', id: 'miera_odhalenia', nadpis: 'Miera odhalenia — istota verzus napätie',
  uvod:
    'Niekoho priťahuje skutočný pohľad, iného iba predstava, že by mohol byť videný. Erotické napätie môže vytvoriť otvorený záves, zrkadlo, zvuk za dverami alebo klubová miestnosť bez potreby náhodného diváka.',
  bloky: [
    {
      druh: 'otazka', id: 'riz_kde', typ: 'viac', inePovolene: true,
      text: 'Ktoré prostredia alebo obrazy ma lákajú',
      moznosti: [
        { v: 'sukromie', label: g('Úplné súkromie, iba vedomý pohľad partnerky', 'Úplné súkromie, iba vedomý pohľad partnera') },
        { v: 'zrkadlo', label: 'Zrkadlo alebo kamera bez záznamu — vidíme sami seba' },
        { v: 'hotel_okno', label: 'Hotelové okno, balkón alebo rozsvietená izba ako fantázia odhalenia' },
        { v: 'auto', label: 'Auto na odľahlom mieste' },
        { v: 'plaz_les', label: 'Pláž, les alebo príroda' },
        { v: 'klub', label: 'Klubová play zóna určená na sledovanie' },
        { v: 'otvorene_dvere', label: 'Miestnosť s otvorenými dverami pre pozvaných divákov' },
        { v: 'iba_pribeh', label: 'Iba slovná fantázia o prichytení' },
      ],
    },
    {
      druh: 'otazka', id: 'riz_pocit', typ: 'viac', inePovolene: true,
      text: 'Ktorý pocit vytvára erotické napätie',
      moznosti: [
        { v: 'vsetci_vedia', label: 'Všetci presne vedia, že sa predvádzam' },
        { v: 'mozno_vidi', label: 'Možno ma niekto vidí, ale neviem kto' },
        { v: 'skoro_prichyteni', label: 'Fantázia, že nás skoro prichytili' },
        { v: 'tajomstvo', label: 'Navonok bežná situácia, ktorej erotický význam poznáme iba my' },
        { v: 'ziadne_riziko', label: 'Vzrušuje ma pohľad, nie riziko odhalenia' },
      ],
    },
  ],
}

const PSYCHOLOGIA: Blok = {
  druh: 'skupina', id: 'psychologia', nadpis: 'Čo robí pohľad erotickým',
  bloky: [
    {
      druh: 'otazka', id: 'psy_motivy', typ: 'viac', inePovolene: true,
      text: 'Čo ma na sledovaní alebo predvádzaní priťahuje najviac',
      moznosti: [
        { v: 'ziaduci', label: g('Cítiť sa žiadaný a obdivovaný', 'Cítiť sa žiadaná a obdivovaná') },
        { v: 'sebavedomie', label: 'Sebavedomie a pocit, že telo môže zažiariť' },
        { v: 'zranitelnost', label: 'Zraniteľnosť a odhalenie niečoho súkromného' },
        { v: 'kontrola_pohladu', label: 'Kontrola nad tým, čo druhý uvidí a kedy' },
        { v: 'objekt', label: 'Byť na chvíľu erotickým objektom pohľadu' },
        { v: 'tabu', label: 'Prekročenie tabu a pocit zakázanosti' },
        { v: 'vykon', label: 'Predvádzanie, výkon a hra s publikom' },
        { v: 'autenticita', label: 'Vidieť alebo ukázať autentické reakcie bez prikrášlenia' },
      ],
    },
    {
      druh: 'otazka', id: 'psy_pocity', typ: 'viac', inePovolene: true,
      text: 'Aké pocity sa pri tejto predstave miešajú so vzrušením',
      moznosti: [
        { v: 'hrdost', label: 'Hrdosť' },
        { v: 'hanblivost', label: 'Hanblivosť, ktorá vzrušenie zosilňuje' },
        { v: 'ziarlivost', label: 'Jemná žiarlivosť' },
        { v: 'sloboda', label: 'Sloboda a odvaha' },
        { v: 'moc', label: 'Moc alebo odovzdanie' },
        { v: 'tréma', label: 'Tréma z výkonu' },
      ],
    },
    {
      druh: 'otazka', id: 'psy_realita', typ: 'jeden',
      text: 'Kde má táto túžba zostať',
      moznosti: [
        { v: 'fantazia', label: 'Iba v predstavách alebo dirty talku' },
        { v: 'partner', label: g('Iba medzi mnou a partnerkou', 'Iba medzi mnou a partnerom') },
        { v: 'kontrolovane', label: 'V pripravenom priestore s vybraným publikom' },
        { v: 'realita', label: 'Chcem ju skúmať aj v realite' },
        { v: 'neviem', label: 'Ešte neviem' },
      ],
    },
  ],
}

const PARTNEROVA_TUZBA: Blok = {
  druh: 'skupina', id: 'partnerova_tuzba', nadpis: g('Keď chce byť videná partnerka', 'Keď chce byť videný partner'),
  bloky: [
    {
      druh: 'otazka', id: 'pt_reakcia', typ: 'viac', inePovolene: true,
      text: g('Ako na mňa pôsobí partnerkina túžba predvádzať sa', 'Ako na mňa pôsobí partnerova túžba predvádzať sa'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej sebavedomie a odvaha ma vzrušujú', 'Jeho sebavedomie a odvaha ma vzrušujú') },
        { v: 'hrdost', label: g('Som hrdý, že ju iní považujú za žiaducu', 'Som hrdá, že ho iní považujú za žiaduceho') },
        { v: 'chcem_sledovat', label: 'Chcem byť hlavný divák' },
        { v: 'chcem_riadit', label: 'Chcem scénu riadiť alebo vyberať, čo ukáže' },
        { v: 'iba_sukromne', label: 'Láka ma to iba medzi nami' },
        { v: 'fantazia', label: 'Môžeme o tom fantazírovať, no nechcem ďalšie publikum' },
        { v: 'ziarlivost', label: g('Jej túžba vo mne prebúdza viac neistoty než vzrušenia', 'Jeho túžba vo mne prebúdza viac neistoty než vzrušenia') },
      ],
    },
    {
      druh: 'otazka', id: 'pt_opacne', typ: 'jeden',
      text: g('Keď partnerka chce, aby som sa predvádzal ja', 'Keď partner chce, aby som sa predvádzala ja'),
      moznosti: [
        { v: 'laka', label: g('Byť takto žiadaný ma vzrušuje', 'Byť takto žiadaná ma vzrušuje') },
        { v: 'iba_partner', label: g('Áno, ale iba pre partnerku', 'Áno, ale iba pre partnera') },
        { v: 'podla_publika', label: 'Záleží od publika a formy' },
        { v: 'fantazia', label: 'Iba ako fantázia' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
  ],
}

const MYTY: Blok = {
  druh: 'skupina', id: 'myty', nadpis: 'Mýty a tabu',
  bloky: [
    {
      druh: 'text', id: 'myty_text', ton: 'info',
      telo:
        'Mýtus: exhibicionizmus vždy znamená sex pred cudzími ľuďmi. Realita: pre mnohých je najsilnejším publikom jediný partner a najodvážnejšou scénou pomalé vyzliekanie alebo masturbácia pod jeho pohľadom.\n\n' +
        'Mýtus: kto sa rád predvádza, iba potrebuje pozornosť. Realita: môže ho priťahovať zraniteľnosť, kontrola pohľadu, výkon, objektifikácia alebo pocit úplného prijatia.\n\n' +
        'Mýtus: voyeur sa chce vždy pridať. Realita: práve možnosť zostať divákom bez výkonu môže byť jadrom túžby.\n\n' +
        'Mýtus: človek musí mať dokonalé sebavedomie. Realita: hanblivosť a odhalenie môžu byť súčasťou vzrušenia; túžba po pohľade a neistota vo vlastnom tele sa nevylučujú.\n\n' +
        'Mýtus: fantázia o odhalení je automaticky plán. Realita: môže zostať pri zrkadle, príbehu alebo hre medzi dvoma ľuďmi a byť úplná.',
    },
  ],
}

export const VOYEUR_EXHIB: TemaObsah = {
  slug: 'voyeur-exhib/voyeur-exhib',
  nadpis: 'Voyeurizmus a exhibicionizmus',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'uvod', nadpis: 'Erotika pohľadu',
      telo: g(
        'Predstav si, že sa nič na tvojom tele nezmenilo — a predsa je všetko intenzívnejšie, pretože niekto sleduje. Pohľad môže z obyčajného pohybu urobiť predstavenie, zo súkromnej reakcie tajomstvo a z hanblivosti iskru. Voyeurizmus je potešenie zo sledovania; exhibicionizmus potešenie z toho, že som videný. Mnohí ľudia v sebe nesú obe strany a prepínajú ich podľa človeka, priestoru a nálady.',
        'Predstav si, že sa nič na tvojom tele nezmenilo — a predsa je všetko intenzívnejšie, pretože niekto sleduje. Pohľad môže z obyčajného pohybu urobiť predstavenie, zo súkromnej reakcie tajomstvo a z hanblivosti iskru. Voyeurizmus je potešenie zo sledovania; exhibicionizmus potešenie z toho, že som videná. Mnohí ľudia v sebe nesú obe strany a prepínajú ich podľa človeka, priestoru a nálady.',
      ),
    },
  ],
  telo: [POHLAD_PARTNERA, SLEDOVAT, PUBLIKUM, RIZIKO, PSYCHOLOGIA, PARTNEROVA_TUZBA, MYTY],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: g(
        'Výsledok ukáže, či vás spája pohľad partnerky, rola diváka, predvádzanie, publikum alebo iba erotické napätie z predstavy odhalenia — a kde má túžba zostať fantáziou.',
        'Výsledok ukáže, či vás spája pohľad partnera, rola diváka, predvádzanie, publikum alebo iba erotické napätie z predstavy odhalenia — a kde má túžba zostať fantáziou.',
      ),
    },
  ],
}
