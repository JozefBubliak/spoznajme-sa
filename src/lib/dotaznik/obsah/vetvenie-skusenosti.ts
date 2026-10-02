import type { Blok, VetvenieSkusenosti } from './typ'

const g = (m: string, z: string) => ({ m, z })

const zakladSoSkusenostou = (prefix = 'vetva', doplnok = ''): Blok[] => [
  {
    druh: 'otazka', id: `${prefix}_skusenost_hodnotenie`, typ: 'jeden',
    text: `Ktoré tvrdenie najviac sedí na moju doterajšiu skúsenosť${doplnok}?`,
    moznosti: [
      { v: 'velmi', label: 'Veľmi ma to vzrušovalo — chcem to opakovať alebo zaradiť' },
      { v: 'skor', label: g('Skôr ma to vzrušovalo — rád to zopakujem za vhodných podmienok', 'Skôr ma to vzrušovalo — rada to zopakujem za vhodných podmienok') },
      { v: 'neutral', label: 'Neutrálne — je to v poriadku, ale nie je to moja priorita' },
      { v: 'zlepsit', label: 'Skôr mi to nesedelo, ale môže sa to zlepšiť úpravou tempa, techniky alebo komunikácie' },
      { v: 'neprijemne', label: 'Bolo mi to nepríjemné — nechcem to opakovať' },
    ],
  },
  {
    druh: 'otazka', id: `${prefix}_skusenost_zlepsit`, typ: 'text',
    text: 'Čo by mohlo túto skúsenosť zlepšiť?',
    podmienka: { ot: `${prefix}_skusenost_hodnotenie`, je: 'zlepsit' },
  },
  {
    druh: 'otazka', id: `${prefix}_skusenost_frekvencia`, typ: 'jeden',
    text: 'Aká frekvencia mi vyhovuje?',
    podmienka: { ot: `${prefix}_skusenost_hodnotenie`, nie: 'neprijemne' },
    moznosti: [
      { v: 'pravidelne', label: 'Pravidelne' },
      { v: 'nalada', label: 'Podľa nálady' },
      { v: 'obcas', label: 'Občas ako spestrenie' },
      { v: 'vynimocne', label: 'Len výnimočne' },
    ],
  },
  {
    druh: 'otazka', id: `${prefix}_skusenost_fungovalo`, typ: 'text',
    text: 'Čo fungovalo najlepšie a čo chcem nabudúce inak?',
    podmienka: { ot: `${prefix}_skusenost_hodnotenie`, nie: 'neprijemne' },
  },
]

const zakladBezSkusenosti = (prefix = 'vetva', doplnok = ''): Blok[] => [
  {
    druh: 'text', id: `${prefix}_bez_skusenosti_uvod`, ton: 'info',
    telo: g(
      'Najprv si prečítaj úvod témy. Táto vetva sa nepýta na zážitok, ktorý si nemal; skúma iba zvedavosť, predstavu a rozdiel medzi fantáziou a chuťou skúsiť to naozaj.',
      'Najprv si prečítaj úvod témy. Táto vetva sa nepýta na zážitok, ktorý si nemala; skúma iba zvedavosť, predstavu a rozdiel medzi fantáziou a chuťou skúsiť to naozaj.',
    ),
  },
  {
    druh: 'otazka', id: `${prefix}_bez_skusenosti_lakadlo`, typ: 'text',
    text: `Čo ma na tejto predstave${doplnok} priťahuje alebo o čom chcem vedieť viac?`,
  },
  {
    druh: 'otazka', id: `${prefix}_bez_skusenosti_realita`, typ: 'jeden',
    text: 'Aký je môj súčasný vzťah k preneseniu tejto predstavy do reality?',
    moznosti: [
      { v: 'tuzim', label: 'Túžim to skúsiť' },
      { v: 'otvoreny', label: g('Som otvorený skúšaniu, ak to láka partnerku', 'Som otvorená skúšaniu, ak to láka partnera') },
      { v: 'podmienky', label: 'Možno — záleží na konkrétnej podobe' },
      { v: 'fantazia', label: 'Láka ma to iba ako fantázia' },
      { v: 'nie', label: 'Nie — nechcem to skúšať' },
    ],
  },
]

// Povinná klasifikácia všetkých data-driven tém. Nová téma bez záznamu zlyhá
// hneď pri načítaní registra, aby sa vetvenie už nedalo potichu zabudnúť.
const kostra = (
  rezim: 'jedna-skusenost' | 'davam-prijimam',
): VetvenieSkusenosti => {
  const bezSkusenosti = rezim === 'davam-prijimam'
    ? [
        { druh: 'skupina' as const, id: 'vetva_bez_prijimanie', nadpis: 'Prijímanie — bez skúsenosti', bloky: zakladBezSkusenosti('vetva_prijimanie', ' pri prijímaní') },
        { druh: 'skupina' as const, id: 'vetva_bez_poskytovanie', nadpis: 'Poskytovanie — bez skúsenosti', bloky: zakladBezSkusenosti('vetva_poskytovanie', ' pri poskytovaní') },
      ]
    : zakladBezSkusenosti()
  const soSkusenostou = rezim === 'davam-prijimam'
    ? [
        { druh: 'skupina' as const, id: 'vetva_skusenost_prijimanie', nadpis: 'Moja skúsenosť s prijímaním', bloky: zakladSoSkusenostou('vetva_prijimanie', ' pri prijímaní') },
        { druh: 'skupina' as const, id: 'vetva_skusenost_poskytovanie', nadpis: 'Moja skúsenosť s poskytovaním', bloky: zakladSoSkusenostou('vetva_poskytovanie', ' pri poskytovaní') },
      ]
    : zakladSoSkusenostou()
  return {
    rezim,
    stav: 'kostra',
    bezSkusenosti,
    soSkusenostou,
    paroveZobrazenie: 'vsetko-relevantne-okrem-nie',
  }
}

const bezVetvenia = (dovod: string): VetvenieSkusenosti => ({ rezim: 'nepouziva-sa', dovod })

export const VETVENIE_SKUSENOSTI: Record<string, VetvenieSkusenosti> = {
  'prostredie-atmosfera/prostredie-atmosfera': kostra('jedna-skusenost'),
  'trojky-skupiny/trojky-skupiny': kostra('jedna-skusenost'),
  'roleplay-scenare/roleplay-scenare': kostra('jedna-skusenost'),
  'telesne-tekutiny/telesne-tekutiny': kostra('davam-prijimam'),
  'telesne-tekutiny/prirodzenost': kostra('davam-prijimam'),
  'telesne-tekutiny/zenska-vlhkost': kostra('davam-prijimam'),
  'telesne-tekutiny/semeno': kostra('davam-prijimam'),
  'telesne-tekutiny/menstrualna-krv': kostra('davam-prijimam'),
  'telesne-tekutiny/watersports': kostra('davam-prijimam'),
  'dirty-talk-oslovenia/ton': kostra('davam-prijimam'),
  'dirty-talk-oslovenia/obsah': kostra('davam-prijimam'),
  'dirty-talk-oslovenia/oslovenia': kostra('davam-prijimam'),
  'dirty-talk-oslovenia/jazyk-tela': kostra('davam-prijimam'),
  'telo-hanba-citlive/telo-hanba-citlive': bezVetvenia('Téma mapuje aktuálne prežívanie tela, nie skúsenosť s praktikou.'),
  'zmyslova-hra/zmyslova-hra': kostra('davam-prijimam'),
  'vaginalna-penetracia/vaginalna-penetracia': kostra('davam-prijimam'),
  'cnm-enm/cnm-enm': kostra('jedna-skusenost'),
  'vibratory-stimulatory/vibratory-stimulatory': kostra('davam-prijimam'),
  'komunikacia-pocas-po/komunikacia-pocas-po': bezVetvenia('Komunikačné preferencie sa nepodmieňujú skúsenosťou s jednou praktikou.'),
  'swinging/swinging': kostra('jedna-skusenost'),
  'oral-vulva-klitoris/oral-vulva-klitoris': kostra('davam-prijimam'),
  'telo-hanba-citlive/specificke-obdobia': bezVetvenia('Vetví sa podľa životnej situácie a telesnej dostupnosti, nie podľa skúsenosti.'),
  'tabu-mantinely/tabu-mantinely': bezVetvenia('Je to prierezová mapa mantinelov, nie jedna praktika.'),
  'trans-partnerka/trans-partnerka': kostra('jedna-skusenost'),
  'orgazmus-kontrola/orgazmus-kontrola': kostra('davam-prijimam'),
  'nepenetrativne-trenie/nepenetrativne-trenie': kostra('davam-prijimam'),
  'tantra-slow-sex-spiritualita/tantra-slow-sex-spiritualita': kostra('jedna-skusenost'),
  'predohra-stupnovanie/predohra-stupnovanie': kostra('davam-prijimam'),
  'manualna-stimulacia/manualna-stimulacia': kostra('davam-prijimam'),
  'polohy/polohy': kostra('jedna-skusenost'),
  'mentalna-priprava-tuzba/mentalna-priprava-tuzba': bezVetvenia('Téma opisuje dlhodobý vzorec vzťahu, nie skúsenosť s praktikou.'),
  'bi-zvedavost/bi-zvedavost': kostra('jedna-skusenost'),
  'mentalna-priprava-tuzba/libido-chut': bezVetvenia('Téma mapuje aktuálnu túžbu a motiváciu.'),
  'oral-kombinacie-polohy/face-sitting': {
    rezim: 'hore-dole',
    stav: 'aktivne',
    bezSkusenosti: [],
    soSkusenostou: [],
    paroveZobrazenie: 'vsetko-relevantne-okrem-nie',
  },
  'dominancia-submisia/dominancia-submisia': kostra('davam-prijimam'),
  'mentalna-priprava-tuzba/brzdy-spustace': bezVetvenia('Téma mapuje príčiny chuti a nechuti, nie jednu praktiku.'),
  'digitalna-dialkova/digitalna-dialkova': kostra('jedna-skusenost'),
  'bozky/bozky': kostra('davam-prijimam'),
  'fantazie-preklad-reality/fantazie-preklad-reality': bezVetvenia('Rozdiel fantázia verzus realita je samotným obsahom celej témy.'),
  'analna-penetracia/analna-penetracia': {
    rezim: 'davam-prijimam',
    stav: 'rozpracovane',
    bezSkusenosti: [],
    soSkusenostou: [],
    paroveZobrazenie: 'vsetko-relevantne-okrem-nie',
  },
  'zdielanie-partnera/zdielanie-partnera': kostra('jedna-skusenost'),
  'voyeur-exhib/voyeur-exhib': kostra('davam-prijimam'),
  'kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia': bezVetvenia('Téma sama určuje kontext pre ostatné vetvy.'),
  'suhlas-safewords/suhlas-safewords': bezVetvenia('Ide o samostatnú mapu komunikácie a hraníc.'),
  'tempo-rytmus-choreografia/tempo-rytmus-choreografia': bezVetvenia('Je to prierezový slovník preferencií naprieč praktikami.'),
  'zdravie-ochrana-hygiena/zdravie-ochrana-hygiena': bezVetvenia('Vetví sa podľa zdravotnej situácie, nie podľa skúsenosti.'),
}

export function vetveniePre(slug: string): VetvenieSkusenosti {
  const vetvenie = VETVENIE_SKUSENOSTI[slug]
  if (!vetvenie) throw new Error(`Téma ${slug} nemá klasifikované vetvenie podľa skúsenosti.`)
  return vetvenie
}
