import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// CNM/ENM a vzťahové štruktúry — modul H7. Doteraz existoval len ako holé L4
// seedy v strom.ts (model / politika-informovania / poly-tvary / prakticke).
// Postavené ako plnohodnotný „kniha + dotazník" flagship priamo z čerstvo
// naštudovaných zdrojov (viď docs aj lokálny vyskum/original/):
//  - Moors, Gesselman & Garcia (2021), Front Psychol — prevalencia túžby/
//    skúsenosti s polyamóriou v reprezentatívnej vzorke USA (N=3438).
//  - Wood, Desmarais, Burleigh & Milhausen (2021), PLoS ONE — dyadické sexuálne
//    motívy a naplnenie potrieb v CNM vzťahoch (56 párov, self-determination theory).
//  - Bröning (2025), Arch Sex Behav — kvalitatívna štúdia autonómie v poly
//    vzťahoch (20 rozhovorov) — 4 aspekty autonómie + kompersia.
// Konkrétne čísla (napr. 16.8 % túži, 10.7 % skúsilo) sú vedome ponechané v
// texte — dávajú párom istotu, že nie sú jediní, kto o tom uvažuje.
// ─────────────────────────────────────────────────────────────────────────────

const ZAUJEM: Moznost[] = [
  { v: 'uz_zijeme', label: 'Už takto žijeme a som spokojný/á' },
  { v: 'chcem', label: 'Chcem to aktívne skúmať' },
  { v: 'zvedavost', label: 'Zvedavosť, potrebujem o tom vedieť viac' },
  { v: 'skor_nie', label: 'Skôr nie, ale som otvorený/á debate' },
  { v: 'nie', label: 'Nie — chcem výhradnú monogamiu' },
]
const z = (id: string, text: TemaObsah['nadpis'], napoveda?: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, napoveda, moznosti: ZAUJEM,
})

// ── Model vzťahu ──────────────────────────────────────────────────────
const MODEL: Blok = {
  druh: 'skupina', id: 'model', nadpis: 'Model vzťahu',
  uvod: 'Monogamia a CNM (consensual non-monogamy) nie sú dva tábory, ale škála. Nič z tohto nie je „lepšie" ani „horšie" — len iná dohoda medzi partnermi.',
  bloky: [
    z('mod_monogamish', '„Monogamish" — výhradný sex, ale s príležitostnými, jasne dohodnutými výnimkami (napr. spoločná trojka)'),
    z('mod_otvoreny', 'Otvorený vzťah — sexuálna aktivita s inými dovolená, romantická láska zostáva len medzi nami'),
    z('mod_swinging', 'Swinging ako lifestyle — pravidelná výmena partnerov v páre, spolu'),
    z('mod_polyamoria', 'Polyamória — romantická láska aj sex s viacerými ľuďmi súčasne, so súhlasom všetkých'),
    z('mod_anarchy', 'Relationship anarchy — žiadna vopred daná hierarchia vzťahov, každý vzťah sa definuje sám osebe'),
    {
      druh: 'text', id: 'mod_cisla', ton: 'info',
      telo:
        'Čísla, ktoré dávajú istotu: podľa reprezentatívneho prieskumu v USA (Moors, Gesselman & Garcia, 2021) ' +
        '1 zo 6 ľudí (16,8 %) túži niekedy skúsiť polyamóriu a 1 z 9 (10,7 %) to už niekedy v živote skúsil(a). ' +
        'Približne 1 z 5 dospelých (19,6–21,9 %) mal v živote skúsenosť s nejakou formou CNM vzťahu a 3–7 % ľudí ' +
        'je práve teraz v CNM vzťahu. V Nemecku uviedlo skúsenosť s otvoreným vzťahom 14 % mužov a 7 % žien ' +
        '(pod 40 rokov až 19 % / 10 %). Medzi LGB ľuďmi je CNM ešte bežnejšie — 22–48 %. Ak o tomto premýšľate, ' +
        'určite nie ste jediní.',
    },
  ],
}

// ── Politika informovania ────────────────────────────────────────────
const POLITIKA: Blok = {
  druh: 'skupina', id: 'politika_informovania', nadpis: 'Politika informovania — čo si hovoríme',
  uvod: 'Kvalitatívny výskum autonómie v poly vzťahoch (Bröning, 2025) ukazuje, že asertívna a jasná komunikácia je jedným zo 4 kľúčových pilierov spokojnosti — nie voľnosť samotná, ale schopnosť si o nej otvorene povedať.',
  bloky: [
    {
      druh: 'otazka', id: 'pol_model', typ: 'jeden',
      text: 'Aký typ informovania nám vyhovuje najviac?',
      moznosti: [
        { v: 'plna', label: 'Plná transparentnosť — vieme o sebe všetko' },
        { v: 'hall_pass', label: '„Hall pass" — vopred dohodnuté výnimky/situácie, konkrétne detaily netreba' },
        { v: 'dadt', label: '„DADT" (don\'t ask, don\'t tell) — vieme, že sa to deje, detaily nechceme' },
        { v: 'nevieme', label: 'Ešte nevieme, chceme sa o tom rozprávať' },
      ],
    },
    { druh: 'otazka', id: 'pol_co_zdielat', typ: 'text', text: 'Čo presne chcem, aby mi partner/ka hovoril(a) (a čo naopak nie):' },
    z('pol_asertivita', 'Viem si otvorene povedať o tom, čo potrebujem, aj keď je to nepohodlné', 'Asertívna komunikácia — jeden zo 4 pilierov spokojnosti podľa výskumu.'),
    {
      druh: 'otazka', id: 'pol_frekvencia', typ: 'jeden',
      text: 'Ako často chceme mať „check-in" rozhovor o tom, ako nám táto štruktúra funguje?',
      moznosti: [
        { v: 'tyzdenne', label: 'Pravidelne (týždenne/mesačne)' },
        { v: 'podla_potreby', label: 'Podľa potreby, keď niečo cítim' },
        { v: 'po_udalosti', label: 'Vždy po nejakej novej skúsenosti' },
        { v: 'nechceme', label: 'Nechceme to formalizovať' },
      ],
    },
  ],
}

// ── Poly tvary / konfigurácie ────────────────────────────────────────
const TVARY: Blok = {
  druh: 'skupina', id: 'poly_tvary', nadpis: 'Konfigurácie — akú „tvar" môže mať poly vzťah',
  uvod: 'Výskum (Wood a kol., 2021) naznačuje, že primárny partner zvyčajne napĺňa potreby blízkosti a opory, kým sekundárny partner často napĺňa potrebu vášne a novoty — obe roly majú svoju hodnotu, žiadna nie je „menejcenná".',
  bloky: [
    z('tv_v', '„V" — jeden človek má dvoch partnerov, ktorí spolu nie sú romanticky prepojení'),
    z('tv_triada', 'Triáda / throuple — traja ľudia navzájom prepojení'),
    z('tv_quad', 'Quad — dva páry prepojené do jedného vzťahového kruhu'),
    {
      druh: 'otazka', id: 'tv_hierarchia', typ: 'jeden',
      text: 'Hierarchická vs. nehierarchická štruktúra',
      moznosti: [
        { v: 'hierarchicka', label: 'Hierarchická — máme jasného primárneho partnera, ostatné vzťahy sú sekundárne' },
        { v: 'nehierarchicka', label: 'Nehierarchická — žiadny vzťah nie je automaticky „nadradený"' },
        { v: 'nevieme', label: 'Ešte nevieme, chceme to nechať vyvíjať' },
      ],
    },
    z('tv_solo', '„Solo poly" — nechcem žiadneho „primárneho" partnera ani spoločnú domácnosť, ale mám viac vzťahov'),
    z('tv_polyfidelita', 'Polyfidelita — uzavretá skupina viacerých ľudí, verní si navzájom, nie smerom von'),
  ],
}

// ── Motívy — prečo do toho ísť ───────────────────────────────────────
const MOTIVY: Blok = {
  druh: 'skupina', id: 'motivy', nadpis: 'Motívy — prečo by sme do toho išli',
  uvod:
    'Nie všetky dôvody sú rovnako „zdravé". Výskum sexuálnych motívov v CNM vzťahoch (Wood a kol., 2021) ukazuje, ' +
    'že sebaurčené dôvody (chcem to, baví ma to, prehlbuje to blízkosť) predpovedajú vyššiu spokojnosť — na rozdiel ' +
    'od motívov postavených na tlaku, vine alebo snahe vyhnúť sa konfliktu.',
  bloky: [
    {
      druh: 'otazka', id: 'mot_dovody', typ: 'viac', inePovolene: true,
      text: 'Čo by ma na tom najviac lákalo? (Vyber všetky, čo sedia.)',
      moznosti: [
        { v: 'rozmanitost', label: 'Sexuálna rozmanitosť a nové zážitky' },
        { v: 'blizkost', label: 'Prehĺbenie blízkosti s viacerými ľuďmi naraz' },
        { v: 'autonomia', label: 'Sloboda a autonómia v tom, koho a ako milujem' },
        { v: 'rozdelenie_potrieb', label: 'Rozdelenie rôznych potrieb medzi viac ľudí (nie jeden človek na všetko)' },
        { v: 'zvedavost', label: 'Čistá zvedavosť, chcem to vyskúšať' },
      ],
    },
    {
      druh: 'text', id: 'mot_varovanie_info', ton: 'vystraha',
      telo: 'Je dôležité si úprimne priznať, či nejde len o snahu vyhnúť sa konfliktu, strate partnera, alebo o niečo, čo odo mňa niekto očakáva.',
    },
    {
      druh: 'otazka', id: 'mot_varovanie', typ: 'jeden',
      text: 'Ktoré z toho najviac sedí na mňa práve teraz?',
      moznosti: [
        { v: 'moja_volba', label: 'Je to moja slobodná voľba, chcem to' },
        { v: 'neistota', label: 'Nie som si úplne istý/á, potrebujem si to premyslieť' },
        { v: 'tlak', label: 'Cítim v tom istý tlak alebo strach — chcem sa o tom porozprávať skôr, než niečo zmeníme' },
      ],
    },
  ],
}

// ── Žiarlivosť a kompersia ────────────────────────────────────────────
const ZIARLIVOST: Blok = {
  druh: 'skupina', id: 'ziarlivost_compersion', nadpis: 'Žiarlivosť a kompersia',
  uvod:
    'Kompersia je opak žiarlivosti — radosť z toho, že je partner/ka šťastný/á s niekým iným. Nie je to povinnosť ' +
    'ani znak „správneho" poly človeka; žiarlivosť aj kompersia sa u tej istej osoby môžu striedať aj pri tej istej udalosti.',
  bloky: [
    {
      druh: 'otazka', id: 'zia_skusenost', typ: 'jeden',
      text: 'Ako u mňa zvyčajne vyzerá žiarlivosť, keď sa objaví?',
      moznosti: [
        { v: 'mierna', label: 'Mierna, prechodná — dá sa s ňou pracovať' },
        { v: 'silna', label: 'Býva dosť silná, potrebujem si ju vedome regulovať' },
        { v: 'zriedka', label: 'Zriedkavo ju cítim' },
        { v: 'nevieme', label: 'Ešte som to nezažil(a), neviem' },
      ],
    },
    { druh: 'otazka', id: 'zia_spustace', typ: 'text', text: 'Čo u mňa žiarlivosť najčastejšie spúšťa (konkrétna situácia, nie osoba):' },
    { druh: 'otazka', id: 'zia_pomaha', typ: 'text', text: 'Čo mi vtedy najviac pomáha (uistenie, čas, kontakt, samota):' },
    z('zia_kompersia_zazitok', 'Zažil(a) som kompersiu — radosť z partnerovho šťastia s iným — a chcem jej dať priestor'),
  ],
}

// ── Praktické ─────────────────────────────────────────────────────────
const PRAKTICKE: Blok = {
  druh: 'skupina', id: 'prakticke', nadpis: 'Praktické — každodennosť',
  bloky: [
    {
      druh: 'otazka', id: 'pra_cas', typ: 'jeden',
      text: 'Ako riešime čas venovaný jednotlivým vzťahom?',
      moznosti: [
        { v: 'planovane', label: 'Vopred naplánovaný, jasne rozdelený čas' },
        { v: 'plynule', label: 'Plynulo podľa toho, čo sa práve deje' },
        { v: 'nevieme', label: 'Ešte to riešime' },
      ],
    },
    {
      druh: 'otazka', id: 'pra_byvanie', typ: 'jeden',
      text: 'Bývanie a „nesting partner" (partner, s ktorým zdieľam domácnosť)',
      moznosti: [
        { v: 'mame', label: 'Máme/chceme mať jedného „nesting" partnera' },
        { v: 'oddelene', label: 'Preferujem oddelené domácnosti pre všetkých' },
        { v: 'nevieme', label: 'Ešte nevieme' },
      ],
    },
    {
      druh: 'otazka', id: 'pra_safer_sex', typ: 'viac',
      text: 'Pravidlá „safer sex" naprieč vzťahmi',
      moznosti: [
        { v: 'bariery_vzdy', label: 'Bariérová ochrana vždy mimo hlavného vzťahu' },
        { v: 'testy_pravidelne', label: 'Pravidelné STI testy všetkých zapojených' },
        { v: 'info_pred', label: 'Informovať partnera pred zmenou bariérovej praxe s niekým iným' },
        { v: 'nevieme', label: 'Ešte nemáme spoločné pravidlá' },
      ],
    },
    { druh: 'otazka', id: 'pra_metamour', typ: 'jeden',
      text: 'Vzťah k „metamour" (partnerovmu/partnerkinmu ďalšiemu partnerovi)',
      moznosti: [
        { v: 'priatelstvo', label: 'Chcel(a) by som sa s nimi kamarátiť' },
        { v: 'zdvorilost', label: 'Stačí mi slušný, no odstupový vzťah' },
        { v: 'nechcem_poznat', label: 'Radšej ich vôbec nechcem poznať' },
      ],
    },
  ],
}

// ── Autonómia — 4 piliere podľa výskumu ──────────────────────────────
const AUTONOMIA: Blok = {
  druh: 'skupina', id: 'autonomia', nadpis: 'Autonómia — čo ju v praxi tvorí',
  uvod:
    'Kvalitatívna štúdia s 20 poly ľuďmi (Bröning, 2025) identifikovala 4 opakujúce sa piliere, ktoré rozhodujú o tom, ' +
    'či sa človek v tejto slobode cíti dobre, alebo stratený: asertívna komunikácia, samostatná regulácia emócií, ' +
    'život v súlade so sebou samým a hodnota slobody ako takej.',
  bloky: [
    z('aut_regulacia', 'Viem si sám/sama poradiť s ťažkými emóciami bez toho, aby som to hneď preniesol/preniesla na partnera'),
    z('aut_kongruencia', 'Tento spôsob vzťahu sedí s tým, kto naozaj som — necítim sa v ňom ako herec/herečka'),
    z('aut_sloboda_hodnota', 'Sloboda milovať/mať vzťah s viacerými ľuďmi je pre mňa hodnota sama osebe, nielen prostriedok'),
  ],
}

// ── Rámec a bezpečnosť ────────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec, hranice a bezpečnosť',
  bloky: [
    { druh: 'otazka', id: 'ram_hranice', typ: 'text', text: 'Moje jasné hranice (čo je mimo debaty):' },
    { druh: 'otazka', id: 'ram_veto', typ: 'jeden',
      text: '„Veto" — právo nesúhlasiť s konkrétnou osobou/aktivitou',
      moznosti: [
        { v: 'ano', label: 'Áno, chceme mať toto právo' },
        { v: 'nie', label: 'Nie, každý rozhoduje sám o svojich vzťahoch' },
        { v: 'nevieme', label: 'Ešte nevieme' },
      ],
    },
    { druh: 'otazka', id: 'ram_zmena_nazoru', typ: 'text', text: 'Ako chceme riešiť, keď niekto z nás časom zmení názor na túto štruktúru:' },
  ],
}

export const CNM_ENM: TemaObsah = {
  slug: 'cnm-enm/cnm-enm',
  nadpis: 'CNM/ENM a vzťahové štruktúry',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Čo je CNM/ENM',
      telo:
        'Consensual/Ethical Non-Monogamy — vzťahové štruktúry, kde je viac než jeden sexuálny alebo romantický ' +
        'partner súčasťou života s plným vedomím a súhlasom všetkých zapojených. Nie je to o podvádzaní — presný opak: ' +
        'základom je viac komunikácie, nie menej.',
    },
    {
      druh: 'text', id: 'preco_dolezite', ton: 'info',
      telo:
        'Táto téma nie je o presviedčaní nikoho, aby zmenil svoj vzťah. Je tu preto, lebo mnoho párov o tom aspoň ' +
        'premýšľa, a je lepšie mať k tomu spoločný jazyk a reálne dáta, než hádať. V sexe ani vo vzťahu neexistuje ' +
        'tabu, ak je na oboch stranách slobodný a informovaný súhlas.',
    },
  ],
  telo: [MODEL, POLITIKA, TVARY, MOTIVY, ZIARLIVOST, PRAKTICKE, AUTONOMIA, RAMEC],
  zaver: [
    {
      druh: 'text', id: 'zaver', ton: 'info',
      telo:
        'Výsledky zohľadnia len zhody medzi tebou a partnerom/kou. Ak niekto zvolí výhradnú monogamiu, nikde sa mu ' +
        'nezobrazí opak ako „návrh" — táto téma slúži na porovnanie, nikdy nie na presviedčanie.',
    },
  ],
}
