import type { TemaObsah, Blok } from './typ'

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

const SKUSENOST: Blok = {
  druh: 'otazka', id: 'skusenost', typ: 'jeden',
  text: g(
    'Aká je tvoja doterajšia skúsenosť s vedomým sledovaním iných (voyeurizmus) alebo s tým, že si bol sledovaný (exhibicionizmus)?',
    'Aká je tvoja doterajšia skúsenosť s vedomým sledovaním iných (voyeurizmus) alebo s tým, že si bola sledovaná (exhibicionizmus)?',
  ),
  napoveda: 'Skúsenosť môže byť s partnerom alebo partnerkou, inou osobou, párom či viacerými ľuďmi.',
  moznosti: [
    { v: 'sledoval', label: 'Mám skúsenosť LEN so sledovaním — partnera alebo partnerky, iných ľudí či párov' },
    { v: 'sledovany', label: 'Mám skúsenosť LEN s predvádzaním sa — pred partnerom alebo partnerkou, kamerou či inými ľuďmi' },
    { v: 'oboje', label: 'Mám skúsenosť S OBOMA rolami' },
    { v: 'ziadna', label: 'Nemám zatiaľ skúsenosť' },
  ],
}

const SKUSENOST_SLEDOVAT: Blok = {
  druh: 'skupina', id: 'skusenost_sledovat', nadpis: 'Moja skúsenosť so sledovaním',
  podmienka: { ot: 'skusenost', jeNiektora: ['sledoval', 'oboje'] },
  bloky: [
    {
      druh: 'otazka', id: 'sledovat_hodnotenie', typ: 'jeden', text: 'Ako na teba doterajšia skúsenosť so sledovaním pôsobila?',
      moznosti: [
        { v: 'velmi', label: 'Veľmi ma vzrušovala — chcem ju opakovať alebo zaradiť' },
        { v: 'skor', label: g('Skôr ma vzrušovala — za vhodných podmienok ju rád zopakujem', 'Skôr ma vzrušovala — za vhodných podmienok ju rada zopakujem') },
        { v: 'neutral', label: 'Bola v poriadku, ale nie je mojou prioritou' },
        { v: 'zlepsit', label: 'Nesadla mi úplne, ale iná scéna alebo ľudia by to mohli zmeniť' },
        { v: 'neprijemne', label: 'Bola mi nepríjemná — nechcem ju opakovať' },
      ],
    },
    { druh: 'otazka', id: 'sledovat_zlepsit', typ: 'text', text: 'Čo by mohlo zážitok zo sledovania zlepšiť?', podmienka: { ot: 'sledovat_hodnotenie', je: 'zlepsit' } },
    {
      druh: 'otazka', id: 'sledovat_frekvencia', typ: 'jeden', text: g('Ako často by si chcel túto rolu zažívať?', 'Ako často by si chcela túto rolu zažívať?'),
      podmienka: { ot: 'sledovat_hodnotenie', nie: 'neprijemne' },
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne' },
        { v: 'nalada', label: 'Podľa nálady' },
        { v: 'obcas', label: 'Občas ako spestrenie' },
        { v: 'vynimocne', label: 'Len výnimočne' },
      ],
    },
    { druh: 'otazka', id: 'sledovat_fungovalo', typ: 'text', text: 'Čo pri sledovaní fungovalo najlepšie?', podmienka: { ot: 'sledovat_hodnotenie', nie: 'neprijemne' } },
  ],
}

const SKUSENOST_BYT_SLEDOVANY: Blok = {
  druh: 'skupina', id: 'skusenost_byt_sledovany', nadpis: g('Moja skúsenosť s tým, že som bol sledovaný', 'Moja skúsenosť s tým, že som bola sledovaná'),
  podmienka: { ot: 'skusenost', jeNiektora: ['sledovany', 'oboje'] },
  bloky: [
    {
      druh: 'otazka', id: 'byt_sledovany_hodnotenie', typ: 'jeden', text: g('Ako na teba pôsobila skúsenosť, keď si bol sledovaný?', 'Ako na teba pôsobila skúsenosť, keď si bola sledovaná?'),
      moznosti: [
        { v: 'velmi', label: 'Veľmi ma vzrušovala — chcem ju opakovať alebo zaradiť' },
        { v: 'skor', label: g('Skôr ma vzrušovala — za vhodných podmienok ju rád zopakujem', 'Skôr ma vzrušovala — za vhodných podmienok ju rada zopakujem') },
        { v: 'neutral', label: 'Bola v poriadku, ale nie je mojou prioritou' },
        { v: 'zlepsit', label: 'Nesadla mi úplne, ale iný divák alebo scéna by to mohli zmeniť' },
        { v: 'neprijemne', label: 'Bola mi nepríjemná — nechcem ju opakovať' },
      ],
    },
    { druh: 'otazka', id: 'byt_sledovany_zlepsit', typ: 'text', text: 'Čo by mohlo zážitok z predvádzania zlepšiť?', podmienka: { ot: 'byt_sledovany_hodnotenie', je: 'zlepsit' } },
    {
      druh: 'otazka', id: 'byt_sledovany_frekvencia', typ: 'jeden', text: g('Ako často by si chcel túto rolu zažívať?', 'Ako často by si chcela túto rolu zažívať?'),
      podmienka: { ot: 'byt_sledovany_hodnotenie', nie: 'neprijemne' },
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne' },
        { v: 'nalada', label: 'Podľa nálady' },
        { v: 'obcas', label: 'Občas ako spestrenie' },
        { v: 'vynimocne', label: 'Len výnimočne' },
      ],
    },
    { druh: 'otazka', id: 'byt_sledovany_fungovalo', typ: 'text', text: 'Čo na pohľade druhého človeka fungovalo najlepšie?', podmienka: { ot: 'byt_sledovany_hodnotenie', nie: 'neprijemne' } },
  ],
}

const BEZ_SKUSENOSTI_SLEDOVAT: Blok = {
  druh: 'skupina', id: 'bez_skusenosti_sledovat', nadpis: 'Sledovanie — zatiaľ bez skúsenosti',
  podmienka: { ot: 'skusenost', jeNiektora: ['sledovany', 'ziadna'] },
  bloky: [
    {
      druh: 'text', id: 'sledovat_fantazia_info', ton: 'info',
      telo: 'Fantázia nie je súhlas ani záväzok niečo uskutočniť. Môže zostať úplná aj v predstavách alebo v slovnej hre medzi partnermi.',
    },
    {
      druh: 'otazka', id: 'sledovat_fantazia_vyskyt', typ: 'jeden', text: 'Ako sa ti predstava sledovania objavuje?',
      moznosti: [
        { v: 'silna', label: 'Je to moja silná alebo opakujúca sa fantázia' },
        { v: 'obcas', label: 'Je to občasná predstava' },
        { v: 'zvedavost', label: g('Som zvedavý, ale spontánne o tom nefantazírujem', 'Som zvedavá, ale spontánne o tom nefantazírujem') },
      ],
    },
    {
      druh: 'otazka', id: 'sledovat_fantazia_pocit', typ: 'jeden', text: 'Aký pocit v tebe táto predstava vyvoláva?',
      moznosti: [
        { v: 'vzrusenie', label: 'Príjemný a výrazne vzrušujúci' },
        { v: 'zvedavost', label: 'Skôr zvedavý než vzrušujúci' },
        { v: 'neutral', label: 'Neutrálny' },
        { v: 'zmiesane', label: 'Rozpačitý alebo zmiešaný' },
        { v: 'neprijemne_vracia', label: 'Skôr nepríjemný, ale predstava sa mi napriek tomu vracia' },
      ],
    },
    {
      druh: 'otazka', id: 'sledovat_realita', typ: 'jeden', text: 'Kam chceš túto predstavu zaradiť?',
      moznosti: [
        { v: 'tuzim', label: 'Túžim to reálne skúsiť' },
        { v: 'podmienky', label: 'Možno — záleží na scéne a ľuďoch' },
        { v: 'fantazia', label: 'Chcem, aby to zostalo iba fantáziou' },
        { v: 'nie', label: 'Sledovanie druhých ma neláka' },
      ],
    },
    { druh: 'otazka', id: 'sledovat_podmienky', typ: 'text', text: 'Čo by ti umožnilo cítiť sa pri sledovaní príjemne?', podmienka: { ot: 'sledovat_realita', je: 'podmienky' } },
    {
      druh: 'otazka', id: 'sledovat_bariera', typ: 'viac', inePovolene: true, text: 'Čo ti môže brániť skúsiť sledovanie?',
      podmienka: { ot: 'sledovat_realita', jeNiektora: ['tuzim', 'podmienky'] },
      moznosti: [
        { v: 'sukromie', label: 'Potrebujem mať istotu, že všetci zúčastnení o pohľade vedia' },
        { v: 'trapnost', label: 'Trápnosť alebo neistota, ako sa pri tom správať' },
        { v: 'partner', label: g('Obava z reakcie partnerky', 'Obava z reakcie partnera') },
        { v: 'ziarlivost', label: 'Obava, že namiesto vzrušenia príde žiarlivosť' },
        { v: 'ludia', label: 'Potrebujem správnych ľudí a scénu, ktorá ma skutočne priťahuje' },
        { v: 'nic', label: g('Nič — som otvorený preskúmaniu', 'Nič — som otvorená preskúmaniu') },
      ],
    },
  ],
}

const BEZ_SKUSENOSTI_BYT_SLEDOVANY: Blok = {
  druh: 'skupina', id: 'bez_skusenosti_byt_sledovany', nadpis: g('Byť sledovaný — zatiaľ bez skúsenosti', 'Byť sledovaná — zatiaľ bez skúsenosti'),
  podmienka: { ot: 'skusenost', jeNiektora: ['sledoval', 'ziadna'] },
  bloky: [
    {
      druh: 'text', id: 'byt_sledovany_fantazia_info', ton: 'info',
      telo: 'Fantázia o predvádzaní sa nemusí byť plánom. Môže zostať pri predstave, zrkadle alebo vedomom pohľade partnera či partnerky.',
    },
    {
      druh: 'otazka', id: 'byt_sledovany_fantazia_vyskyt', typ: 'jeden', text: 'Ako sa ti predstava predvádzania objavuje?',
      moznosti: [
        { v: 'silna', label: 'Je to moja silná alebo opakujúca sa fantázia' },
        { v: 'obcas', label: 'Je to občasná predstava' },
        { v: 'zvedavost', label: g('Som zvedavý, ale spontánne o tom nefantazírujem', 'Som zvedavá, ale spontánne o tom nefantazírujem') },
      ],
    },
    {
      druh: 'otazka', id: 'byt_sledovany_fantazia_pocit', typ: 'jeden', text: 'Aký pocit v tebe táto predstava vyvoláva?',
      moznosti: [
        { v: 'vzrusenie', label: 'Príjemný a výrazne vzrušujúci' },
        { v: 'zvedavost', label: 'Skôr zvedavý než vzrušujúci' },
        { v: 'neutral', label: 'Neutrálny' },
        { v: 'zmiesane', label: 'Rozpačitý alebo zmiešaný' },
        { v: 'neprijemne_vracia', label: 'Skôr nepríjemný, ale predstava sa mi napriek tomu vracia' },
      ],
    },
    {
      druh: 'otazka', id: 'byt_sledovany_realita', typ: 'jeden', text: 'Kam chceš túto predstavu zaradiť?',
      moznosti: [
        { v: 'tuzim', label: 'Túžim to reálne skúsiť' },
        { v: 'podmienky', label: 'Možno — záleží na scéne a divákovi' },
        { v: 'fantazia', label: 'Chcem, aby to zostalo iba fantáziou' },
        { v: 'nie', label: g('Byť sledovaný ma neláka', 'Byť sledovaná ma neláka') },
      ],
    },
    { druh: 'otazka', id: 'byt_sledovany_podmienky', typ: 'text', text: 'Čo by ti umožnilo cítiť sa pod pohľadom príjemne?', podmienka: { ot: 'byt_sledovany_realita', je: 'podmienky' } },
    {
      druh: 'otazka', id: 'byt_sledovany_bariera', typ: 'viac', inePovolene: true, text: 'Čo ti môže brániť skúsiť to?',
      podmienka: { ot: 'byt_sledovany_realita', jeNiektora: ['tuzim', 'podmienky'] },
      moznosti: [
        { v: 'telo', label: 'Neistota z vlastného tela alebo nahoty' },
        { v: 'vykon', label: 'Pocit, že musím podávať výkon' },
        { v: 'zamrznutie', label: 'Obava, že pod pohľadom stuhnem alebo stratím vzrušenie' },
        { v: 'dovera', label: 'Potrebujem veľmi dôverovať človeku, ktorý sa pozerá' },
        { v: 'kontrola', label: 'Potrebujem mať kontrolu nad tým, čo presne uvidí' },
        { v: 'nic', label: g('Nič — som otvorený preskúmaniu', 'Nič — som otvorená preskúmaniu') },
      ],
    },
  ],
}

const SCENARE_SLEDOVAT: Blok = {
  druh: 'skupina', id: 'scenare_sledovat_skupina', nadpis: g('Čo by som chcel sledovať', 'Čo by som chcela sledovať'),
  bloky: [
    {
      druh: 'otazka', id: 'scenare_sledovat', typ: 'viac', inePovolene: true, favoritPovoleny: true,
      text: g('Čo by si chcel sledovať?', 'Čo by si chcela sledovať?'),
      moznosti: [
        { v: 'partner_tanec', label: g('Partnerku pri erotickom tanci alebo pomalom vyzliekaní', 'Partnera pri erotickom tanci alebo pomalom vyzliekaní') },
        { v: 'partner_masturbacia', label: g('Partnerku pri masturbácii', 'Partnera pri masturbácii') },
        { v: 'partner_hracka', label: g('Partnerku pri používaní erotickej pomôcky', 'Partnera pri používaní erotickej pomôcky') },
        { v: 'partner_ina_osoba', label: g('Partnerku pri dotykoch alebo sexe s inou osobou', 'Partnera pri dotykoch alebo sexe s inou osobou') },
        { v: 'ina_osoba_solo', label: 'Inú osobu pri vyzliekaní, masturbácii alebo používaní hračky' },
        { v: 'iny_par', label: 'Iný pár pri erotickej alebo sexuálnej aktivite' },
        { v: 'skupina', label: 'Viac ľudí pri spoločnej sexuálnej scéne' },
      ],
    },
  ],
}

const SCENARE_BYT_SLEDOVANY: Blok = {
  druh: 'skupina', id: 'scenare_byt_sledovany_skupina', nadpis: g('Pri čom by som chcel byť sledovaný', 'Pri čom by som chcela byť sledovaná'),
  bloky: [
    {
      druh: 'otazka', id: 'scenare_byt_sledovany', typ: 'viac', inePovolene: true, favoritPovoleny: true,
      text: g('Pri čom by si chcel byť sledovaný?', 'Pri čom by si chcela byť sledovaná?'),
      moznosti: [
        { v: 'tanec', label: 'Pri erotickom tanci alebo pomalom vyzliekaní' },
        { v: 'masturbacia', label: 'Pri masturbácii' },
        { v: 'hracka', label: g('Pri používaní erotickej pomôcky na penise, semenníkoch alebo anuse', 'Pri používaní erotickej pomôcky na vulve, klitorise, vo vagíne alebo v anuse') },
        { v: 'sex_partner', label: 'Pri sexe s partnerom alebo partnerkou' },
        { v: 'sex_ina_osoba', label: 'Pri dotykoch alebo sexe s inou osobou' },
        { v: 'oral', label: 'Pri poskytovaní alebo prijímaní orálneho sexu' },
        { v: 'dominancia', label: 'Pri dominantnej alebo submisívnej scéne' },
      ],
    },
  ],
}

const POHLAD_PARTNERA: Blok = {
  druh: 'skupina', id: 'pohlad_partnera', nadpis: g('Jej pohľad na mne', 'Jeho pohľad na mne'),
  uvod: g(
    'Niekedy netreba publikum ani cudzie telo. Stačí vedieť, že partnerka sleduje každý pohyb, dych a chvíľu, keď sa prestaneš kontrolovať. Jej pohľad môže byť obdivom, vedením aj tichou mocou.',
    'Niekedy netreba publikum ani cudzie telo. Stačí vedieť, že partner sleduje každý pohyb, dych a chvíľu, keď sa prestaneš kontrolovať. Jeho pohľad môže byť obdivom, vedením aj tichou mocou.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'pp_reakcia_divaka', typ: 'viac', inePovolene: true, favoritPovoleny: true,
      text: g('Ako chcem, aby partnerka pri sledovaní reagovala', 'Ako chcem, aby partner pri sledovaní reagoval'),
      moznosti: [
        { v: 'ticho', label: 'Iba ticho sledovať' },
        { v: 'pohlad', label: 'Držať očný kontakt' },
        { v: 'komplimenty', label: g('Obdivovať ma a hovoriť, čo sa jej páči', 'Obdivovať ma a hovoriť, čo sa mu páči') },
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
    {
      druh: 'otazka', id: 'sl_co_vzrusuje', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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
      druh: 'otazka', id: 'pub_kto', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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
      druh: 'otazka', id: 'pub_reakcie', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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
      druh: 'otazka', id: 'riz_kde', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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
      druh: 'otazka', id: 'riz_pocit', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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
      druh: 'otazka', id: 'psy_motivy', typ: 'viac', inePovolene: true, favoritPovoleny: true,
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

const POKRACOVANIE_SLEDOVAT_SO_SKUSENOSTOU: Blok = {
  druh: 'skupina', id: 'pokracovanie_sledovat_so_skusenostou',
  podmienka: { vsetky: [
    { ot: 'skusenost', jeNiektora: ['sledoval', 'oboje'] },
    { ot: 'sledovat_hodnotenie', jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
  ] },
  bloky: [SCENARE_SLEDOVAT, SLEDOVAT],
}

const POKRACOVANIE_SLEDOVAT_BEZ_SKUSENOSTI: Blok = {
  druh: 'skupina', id: 'pokracovanie_sledovat_bez_skusenosti',
  podmienka: { vsetky: [
    { ot: 'skusenost', jeNiektora: ['sledovany', 'ziadna'] },
    { ot: 'sledovat_realita', jeNiektora: ['tuzim', 'podmienky', 'fantazia'] },
  ] },
  bloky: [SCENARE_SLEDOVAT, SLEDOVAT],
}

const POKRACOVANIE_BYT_SLEDOVANY_SO_SKUSENOSTOU: Blok = {
  druh: 'skupina', id: 'pokracovanie_byt_sledovany_so_skusenostou',
  podmienka: { vsetky: [
    { ot: 'skusenost', jeNiektora: ['sledovany', 'oboje'] },
    { ot: 'byt_sledovany_hodnotenie', jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
  ] },
  bloky: [SCENARE_BYT_SLEDOVANY, POHLAD_PARTNERA, PUBLIKUM, RIZIKO],
}

const POKRACOVANIE_BYT_SLEDOVANY_BEZ_SKUSENOSTI: Blok = {
  druh: 'skupina', id: 'pokracovanie_byt_sledovany_bez_skusenosti',
  podmienka: { vsetky: [
    { ot: 'skusenost', jeNiektora: ['sledoval', 'ziadna'] },
    { ot: 'byt_sledovany_realita', jeNiektora: ['tuzim', 'podmienky', 'fantazia'] },
  ] },
  bloky: [SCENARE_BYT_SLEDOVANY, POHLAD_PARTNERA, PUBLIKUM, RIZIKO],
}

const KAPITOLA_SLEDOVANIE: Blok = {
  druh: 'skupina', id: 'kapitola_sledovanie', nadpis: 'Sledovanie iných',
  podmienka: { ot: 'skusenost', jeNiektora: ['sledoval', 'sledovany', 'oboje', 'ziadna'] },
  bloky: [SKUSENOST_SLEDOVAT, BEZ_SKUSENOSTI_SLEDOVAT, POKRACOVANIE_SLEDOVAT_SO_SKUSENOSTOU, POKRACOVANIE_SLEDOVAT_BEZ_SKUSENOSTI],
}

const KAPITOLA_BYT_SLEDOVANY: Blok = {
  druh: 'skupina', id: 'kapitola_byt_sledovany', nadpis: g('Byť sledovaný', 'Byť sledovaná'),
  podmienka: { ot: 'skusenost', jeNiektora: ['sledoval', 'sledovany', 'oboje', 'ziadna'] },
  bloky: [SKUSENOST_BYT_SLEDOVANY, BEZ_SKUSENOSTI_BYT_SLEDOVANY, POKRACOVANIE_BYT_SLEDOVANY_SO_SKUSENOSTOU, POKRACOVANIE_BYT_SLEDOVANY_BEZ_SKUSENOSTI],
}

const SPOLOCNA_CAST: Blok = {
  druh: 'skupina', id: 'spolocna_cast', nadpis: 'Čo majú obe roly spoločné',
  podmienka: { asponJedna: [
    { vsetky: [
      { ot: 'skusenost', jeNiektora: ['sledoval', 'oboje'] },
      { ot: 'sledovat_hodnotenie', jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
    ] },
    { vsetky: [
      { ot: 'skusenost', jeNiektora: ['sledovany', 'ziadna'] },
      { ot: 'sledovat_realita', jeNiektora: ['tuzim', 'podmienky', 'fantazia'] },
    ] },
    { vsetky: [
      { ot: 'skusenost', jeNiektora: ['sledovany', 'oboje'] },
      { ot: 'byt_sledovany_hodnotenie', jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
    ] },
    { vsetky: [
      { ot: 'skusenost', jeNiektora: ['sledoval', 'ziadna'] },
      { ot: 'byt_sledovany_realita', jeNiektora: ['tuzim', 'podmienky', 'fantazia'] },
    ] },
  ] },
  bloky: [PSYCHOLOGIA, MYTY],
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
  telo: [
    SKUSENOST,
    KAPITOLA_SLEDOVANIE,
    KAPITOLA_BYT_SLEDOVANY,
    SPOLOCNA_CAST,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: g(
        'Výsledok ukáže, či vás spája pohľad partnerky, rola diváka, predvádzanie, publikum alebo iba erotické napätie z predstavy odhalenia — a kde má túžba zostať fantáziou.',
        'Výsledok ukáže, či vás spája pohľad partnera, rola diváka, predvádzanie, publikum alebo iba erotické napätie z predstavy odhalenia — a kde má túžba zostať fantáziou.',
      ),
    },
    {
      druh: 'skupina', id: 'sumar', nadpis: 'Sumár',
      bloky: [
        {
          druh: 'otazka', id: 'sumar_nove', typ: 'text',
          text: g('Ktoré nové podoby sledovania alebo predvádzania by som chcel preskúmať?', 'Ktoré nové podoby sledovania alebo predvádzania by som chcela preskúmať?'),
        },
        {
          druh: 'otazka', id: 'sumar_viac', typ: 'text',
          text: 'Čo z toho, čo už poznáme, chcem častejšie alebo inak?',
        },
      ],
    },
  ],
}
