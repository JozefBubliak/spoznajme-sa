import { gtext } from '@/lib/dotaznik/obsah/typ'

type PrehladPolozka = { nazov: Parameters<typeof gtext>[0]; slugs: readonly string[]; popis?: string; poduroven?: boolean }
type PrehladSkupina = { id: string; nazov: string; popis: string; polozky: readonly PrehladPolozka[] }

export const PREHLAD_SKUPINY: readonly PrehladSkupina[] = [
  {
    id: 'vztah-tuzba',
    nazov: '1. Vzťah, blízkosť a túžba',
    popis: 'Ako sa cítime vo vzťahu, čo v nás prebúdza chuť a čo jej môže brániť.',
    polozky: [
      { nazov: 'Dlhodobá intimita vo vzťahu', slugs: ['mentalna-priprava-tuzba/mentalna-priprava-tuzba'] },
      { nazov: 'Kontext vzťahu a životná situácia', slugs: ['kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia'] },
      { nazov: 'Libido a chuť', slugs: ['mentalna-priprava-tuzba/libido-chut'] },
      { nazov: 'Brzdy a spúšťače vzrušenia', slugs: ['mentalna-priprava-tuzba/brzdy-spustace'] },
      { nazov: 'Sebaprijatie, telo a hanba', slugs: ['telo-hanba-citlive/telo-hanba-citlive'] },
      { nazov: 'Špecifické obdobia a obmedzenia', slugs: ['telo-hanba-citlive/specificke-obdobia'] },
    ],
  },
  {
    id: 'dohoda',
    nazov: '2. Dohoda, komunikácia a starostlivosť',
    popis: 'Súhlas, dorozumenie počas intimity a spoločná starostlivosť o zdravie a pohodlie.',
    polozky: [
      { nazov: 'Súhlas, bezpečie a komunikácia', slugs: ['suhlas-safewords/suhlas-safewords'] },
      { nazov: 'Komunikácia počas a po', slugs: ['komunikacia-pocas-po/komunikacia-pocas-po'] },
      { nazov: 'Zdravie, ochrana a hygiena', slugs: ['zdravie-ochrana-hygiena/zdravie-ochrana-hygiena'] },
    ],
  },
  {
    id: 'naladenie',
    nazov: '3. Naladenie, bozky a pomalá blízkosť',
    popis: 'Prejavy túžby a náklonnosti, ktoré budujú napätie ešte pred intenzívnejšími praktikami.',
    polozky: [
      { nazov: 'Predohra a naladenie', slugs: ['predohra-stupnovanie/predohra-stupnovanie'] },
      { nazov: 'Bozky, dotyky a manuálna stimulácia', slugs: ['bozky/bozky'] },
      { nazov: 'Tantra, slow sex a spiritualita', slugs: ['tantra-slow-sex-spiritualita/tantra-slow-sex-spiritualita'] },
    ],
  },
  {
    id: 'zmysly',
    nazov: '4. Zmysly, atmosféra a prostredie',
    popis: 'Zrak, sluch, čuch, chuť a hmat spolu s miestom a atmosférou, v ktorej sa vieme uvoľniť.',
    polozky: [
      { nazov: 'Zrak, sluch, čuch, chuť a hmat', slugs: ['zmyslova-hra/zmyslova-hra'] },
      { nazov: 'Miesta, prostredie a atmosféra', slugs: ['prostredie-atmosfera/prostredie-atmosfera'] },
    ],
  },
  {
    id: 'slova-predstavy',
    nazov: '5. Slová, predstavy a spojenie na diaľku',
    popis: 'Ako túžbu vyjadrujeme hlasom, fantáziou, správami, obrazom alebo spoločnou predstavou.',
    polozky: [
      {
        nazov: 'Dirty talk',
        slugs: ['dirty-talk-oslovenia/obsah'],
      },
      { nazov: 'Fantázie — screening a preklad do reality', slugs: ['fantazie-preklad-reality/fantazie-preklad-reality'] },
      { nazov: 'Digitálna a diaľková intimita', slugs: ['digitalna-dialkova/digitalna-dialkova'] },
    ],
  },
  {
    id: 'solo-pomocky',
    nazov: '6. Sólo objavovanie, pomôcky a hra bez penetrácie',
    popis: 'Spoznávanie vlastného tela, spoločné objavovanie a formy potešenia bez penetrácie.',
    polozky: [
      { nazov: 'Masturbácia a sólo aktivity', slugs: ['manualna-stimulacia/manualna-stimulacia'] },
      { nazov: 'Erotické pomôcky a hračky', slugs: ['vibratory-stimulatory/vibratory-stimulatory'] },
      { nazov: 'Nepenetratívne trenie', slugs: ['nepenetrativne-trenie/nepenetrativne-trenie'] },
    ],
  },
  {
    id: 'techniky',
    nazov: '7. Priebeh, techniky a orgazmus',
    popis: 'Čo nám vyhovuje pri tempe, intenzite, polohách a najbežnejších sexuálnych praktikách.',
    polozky: [
      { nazov: 'Tempo a intenzita', slugs: ['tempo-rytmus-choreografia/tempo-rytmus-choreografia'] },
      { nazov: 'Orgazmus a jeho kontrola', slugs: ['orgazmus-kontrola/orgazmus-kontrola'] },
      { nazov: 'Polohy', slugs: ['polohy/polohy'] },
      { nazov: 'Vaginálna penetrácia', slugs: ['vaginalna-penetracia/vaginalna-penetracia'] },
      { nazov: 'Orálna intimita', slugs: ['oral-vulva-klitoris/oral-vulva-klitoris'] },
    ],
  },
  {
    id: 'pritazlivost',
    nazov: '8. Príťažlivosť a rodová zvedavosť',
    popis: 'Priestor pre zvedavosť voči rovnakému pohlaviu a trans partnerke bez vnucovania predpokladov.',
    polozky: [
      { nazov: 'Interakcie s rovnakým pohlavím', slugs: ['bi-zvedavost/bi-zvedavost'] },
      { nazov: 'Trans žena — žena s penisom', slugs: ['trans-partnerka/trans-partnerka'] },
    ],
  },
  {
    id: 'specificke-praktiky',
    nazov: '9. Špecifickejšie praktiky a dynamiky',
    popis: 'Rolové, pozorovacie, mocenské a intenzívnejšie telesné praktiky.',
    polozky: [
      { nazov: 'Roleplay a scenáre', slugs: ['roleplay-scenare/roleplay-scenare'] },
      { nazov: 'Voyeurizmus a exhibicionizmus', slugs: ['voyeur-exhib/voyeur-exhib'] },
      { nazov: 'Face Sitting', slugs: ['oral-kombinacie-polohy/face-sitting'] },
      { nazov: 'Anál a stimulácia zadku', slugs: ['analna-penetracia/analna-penetracia'] },
      { nazov: 'Dvojitá penetrácia', popis: 'Aj ako samostatná predstava bez ďalšej osoby.', slugs: ['trojky-skupiny/dvojita-penetracia'] },
      { nazov: 'BDSM a mocenská dynamika', slugs: ['dominancia-submisia/dominancia-submisia'] },
    ],
  },
  {
    id: 'telo-tekutiny',
    nazov: '10. Telo, tekutiny a fetiše',
    popis: 'Prirodzené vône a chute tela, telesné tekutiny a osobitejšie erotické záujmy.',
    polozky: [
      { nazov: 'Prirodzenosť tela — vôňa a chuť', slugs: ['telesne-tekutiny/prirodzenost'] },
      {
        nazov: {
          m: 'Jej prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
          z: 'Moja prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
        },
        slugs: ['telesne-tekutiny/zenska-vlhkost'],
      },
      { nazov: 'Semeno a ejakulácia', slugs: ['telesne-tekutiny/semeno'] },
      { nazov: 'Menštruačná krv a period play', slugs: ['telesne-tekutiny/menstrualna-krv'] },
      { nazov: 'Watersports', slugs: ['telesne-tekutiny/watersports'] },
      { nazov: 'Fetiše a špecifické záujmy', slugs: ['telesne-tekutiny/telesne-tekutiny'] },
    ],
  },
  {
    id: 'dalsi-ludia',
    nazov: '11. Ďalší ľudia a vzťahové dohody',
    popis: 'Túžby a dohody, v ktorých do erotiky alebo vzťahu vstupujú ďalší ľudia.',
    polozky: [
      { nazov: 'CNM/ENM a vzťahové štruktúry', slugs: ['cnm-enm/cnm-enm'] },
      { nazov: 'Zdieľanie partnera — hotwife / cuckold', popis: 'Jeden z páru s ďalšou osobou; druhý môže sledovať alebo byť súčasťou dohody.', slugs: ['zdielanie-partnera/zdielanie-partnera'] },
      { nazov: 'Swinging a výmena partnerov', popis: 'Dva páry a výmena medzi nimi.', slugs: ['swinging/swinging'] },
      { nazov: 'Trojky', popis: 'Jedna téma s dvoma podtémami: MMF a FMF. Každá má vlastnú skúsenosť a hranice.', slugs: ['trojky-skupiny/trojky-skupiny'] },
      { nazov: 'Skupinový sex — viac než trojica', slugs: ['trojky-skupiny/skupinovy-sex'] },
      { nazov: 'Gangbang — viacerí muži a žena', slugs: ['trojky-skupiny/gangbang'] },
      { nazov: 'Bukkake — samostatný scenár', slugs: ['trojky-skupiny/bukkake'] },
      { nazov: 'Spoločné otázky: ďalšia osoba a emócie', slugs: ['trojky-skupiny/treti-clovek'] },
    ],
  },
  {
    id: 'tabu',
    nazov: '12. Tabu a osobné mantinely',
    popis: 'Najcitlivejšie predstavy a hranice, o ktorých má zmysel hovoriť bez tlaku a hodnotenia.',
    polozky: [{ nazov: 'Tabu témy a mantinely', slugs: ['tabu-mantinely/tabu-mantinely'] }],
  },
]
