import { CHUT } from './skaly'
import type { TemaObsah, Blok, Moznost, OtazkaBlok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Nepenetratívne trenie — modul B7.
// Zdroj: „13_Nepenetrativne_aktivity" (nájdené v zdroj.docx, riadky
// 65577-66101 pri systematickej revízii — pozri docs/dotaznik-zdroj-progress.md).
// Frottage/dry humping, interkrurálny sex, tribbing/scissoring, mammary
// intercourse (titjob — chýbajúca položka oproti pôvodným L4 seedom).
// + xlsm P48013–48465: petting (4 otázky m/z + druhy, experimentovanie,
// ideálny petting, tipy), plné m/z znenia frottage/interkrurálny/tribbing/
// titjob s „Prečo je vzrušujúci", karty outercourse a no-goal frekvencia.
// Doplnené: ďalšie outercourse praktiky, kde dokončiť, mýty a tipy.
// Masáž/zmyslové hry majú vlastné témy (bozky-dotyky.ts, zmyslova-hra.ts).
// z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POVODNY_POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť' },
  { v: 'ak_partner_chce', label: g('Rád to spravím, ak po tom partnerka túži', 'Rada to spravím, ak po tom partner túži') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]
const p = (id: string, text: TemaObsah['nadpis'], moznosti: Moznost[] = CHUT): OtazkaBlok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti, predosleMoznosti: POVODNY_POSTOJ,
})
// ── Petting ─────────────────────────────────────────────────────────
const PETTING: Blok = {
  druh: 'skupina', id: 'petting', nadpis: 'Petting — jemnosť, blízkosť a zmyselnosť',
  uvod: g(
    'Predstav si, ako ju hladíš po tele, pozoruješ, ako zatvára oči a celým telom vníma tvoj dotyk. Petting môže byť jemná predohra aj úplne samostatný zážitok.',
    'Predstav si, ako vaše telá splývajú v pomalých dotykoch, jemnom hladení a dlhotrvajúcom objatí. Každý dotyk je posolstvom túžby, bez toho, aby bol okamžite o sexe.',
  ),
  bloky: [
    {
      druh: 'otazka', id: 'pet_druhy', typ: 'viac', inePovolene: true,
      text: g('Ktoré druhy pettingu by som chcel skúšať alebo poskytovať', 'Ktoré druhy pettingu ma najviac lákajú'),
      moznosti: [
        { v: 'hladkanie', label: 'Jemné hladkanie rúk, tváre alebo chrbta' },
        { v: 'masaz', label: 'Masírovanie citlivých zón (šija, ramená)' },
        { v: 'erotogenne', label: 'Stimulácia erotogénnych zón (bradavky, vnútorné stehná)' },
        { v: 'trenie', label: 'Trenie tiel bez priamej penetrácie' },
        { v: 'nahe_objatie', label: 'Dlhé objatie nahí pod perinou' },
        { v: 'ruky_pod_oblecenie', label: 'Ruky pod oblečením — ako tínedžeri na gauči' },
        { v: 'prstami_genitalie', label: 'Hladkanie genitálií cez bielizeň' },
      ],
    },
    {
      druh: 'otazka', id: 'pet_experiment', typ: 'jeden',
      text: g('Mám chuť objavovať nové formy pettingu a zmyselného kontaktu', 'Mám rada experimentovanie s rôznymi formami pettingu'),
      moznosti: [
        { v: 'ano', label: g('Áno, veľmi ma to láka', 'Áno, rada objavujem nové spôsoby kontaktu') },
        { v: 'obcas', label: 'Občas, keď je správna nálada' },
        { v: 'nie', label: g('Nie, radšej zostávam pri klasike', 'Nie, preferujem jednoduché formy') },
      ],
    },
    {
      druh: 'otazka', id: 'pet_idealny', typ: 'jeden',
      text: g('Ako si predstavujem ideálny petting s partnerkou', 'Ako by som opísala svoj ideálny petting'),
      moznosti: [
        { v: 'romanticky', label: 'Romantický a jemný, plný blízkosti a náklonnosti' },
        { v: 'hravy', label: 'Zmyselný a hravý, s dôrazom na vzrušenie a erotiku' },
        { v: 'kombinacia', label: 'Kombinácia oboch' },
      ],
    },
    { doplnenieId: 'pet_hladkanie_ine', inePovolene: true,
      druh: 'otazka', id: 'pet_hladkanie', typ: 'jeden', moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
      text: g(
        'Predstav si, že cítiš jej prsty, ako pomaly objavujú tvoje telo. Chcel by si, aby ťa partnerka hladila po tvári, rukách a chrbte počas vašich intímnych chvíľ?',
        'Predstav si, ako jeho ruky pomaly kĺžu po tvojom chrbte a ramenách. Chcela by si, aby ťa partner jemne hladil po tvári, rukách a chrbte ako súčasť pettingu?',
      ),
    },

    { doplnenieId: 'pet_masaz_ine', inePovolene: true,
      druh: 'otazka', id: 'pet_masaz', typ: 'jeden', moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
      text: g(
        'Predstav si, že jej prsty pevne, no nežne masírujú tvoju šiju a ramená. Chcel by si, aby ti partnerka masírovala citlivé miesta počas predohry?',
        'Predstav si, že sa ti jeho dlane jemne zapierajú do ramien a šije. Chcela by si, aby ti partner masíroval šiju, ramená alebo kríž?',
      ),
    },

    { doplnenieId: 'pet_erotogenne_ine', inePovolene: true,
      druh: 'otazka', id: 'pet_erotogenne', typ: 'jeden', moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
      text: g(
        'Predstav si, ako sa jej dotyky približujú k tvojim najcitlivejším miestam. Chcel by si, aby ti partnerka pri pettingu stimulovala erotogénne zóny?',
        'Predstav si jeho prsty, ktoré opatrne skúmajú tvoje vnútorné stehná a bradavky. Chcela by si, aby ti partner stimuloval erotogénne zóny?',
      ),
    },

    { doplnenieId: 'pet_trenie_nahi_ine', inePovolene: true,
      druh: 'otazka', id: 'pet_trenie_nahi', typ: 'jeden', moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
      text: g(
        'Predstav si, že jej nahé telo kĺže po tvojom. Chcel by si petting, kde sa len trieme o seba bez penetrácie?',
        'Predstav si, že ste obaja nahí a tvoje telo sa trie o jeho. Chcela by si zažiť petting s trením tiel bez penetrácie?',
      ),
    },

    { zbalitelny: true,
      druh: 'text', id: 'pet_tipy', nadpis: 'Tipy na experimentovanie', ton: 'info',
      telo:
        'Vyhraďte si čas iba na dotyky a objatia — bez očakávania sexu. Skúste petting pri sviečkach alebo hudbe. ' +
        'Objavujte miesta, na ktoré sa zabúda: zátylok, zápästia, podkolenné jamky, spodok chrbta, vnútorné stehná. ' +
        'Hovorte si pri tom, čo je príjemné — stačí „tu" a „ešte". ' +
        'Pravidlo „nič pod pásom 20 minút" robí z obyčajného hladkania neuveriteľné napätie.',
    },
  ],
}

// ── Frottage / dry humping ────────────────────────────────────────
const FROTTAGE: Blok = {
  druh: 'skupina', id: 'frottage', nadpis: 'Frottage / „dry humping"',
  bloky: [
    {
      druh: 'text', id: 'fro_info',
      telo:
        'Trenie tiel cez oblečenie alebo bez neho. Látka dráždi cez spodnú bielizeň, boky sa pohybujú proti sebe a každý pohyb je predzvesťou ďalšieho. ' +
        'Prečo vzrušuje: fyzická blízkosť a napätie, hra s oblečením a jeho postupným odstraňovaním, pocit „zakázaného" ako v začiatkoch.',
    },
    p('fro_postoj', g(
      'Predstav si, že sa na tebe kĺže cez látku a cítiš jej teplo aj vlhkosť, hoci si stále oblečený. Chcel by si, aby sme sa hrali formou trenia tiel cez oblečenie?',
      'Chcela by si, aby sme preskúmali trenie tiel cez oblečenie (dry humping)?',
    )),
    { druh: 'otazka', id: 'fro_postoj_ine', typ: 'text', text: 'Vlastná odpoveď — dry humping (voliteľné):' },

    {
      druh: 'otazka', id: 'fro_styl', typ: 'jeden',
      text: 'Preferovaný štýl',
      moznosti: [
        { v: 'cez_oblecenie', label: 'Cez oblečenie — napätie z odkladania' },
        { v: 'cez_bielizen', label: 'Cez spodnú bielizeň' },
        { v: 'nahi', label: 'Nahí, bez penetrácie' },
      ],
    },
    {
      druh: 'otazka', id: 'fro_ako', typ: 'jeden',
      text: 'Ako to najviac chcem',
      moznosti: [
        { v: 'predohra', label: 'Ako predohru' },
        { v: 'samostatne', label: 'Ako samostatnú aktivitu bez pokračovania' },
        { v: 'kdekolvek', label: 'Nezáleží, hlavne že to je' },
      ],
    },
    { druh: 'otazka', id: 'fro_polohy', typ: 'text', text: 'Polohy/opory, ktoré mi pri tom vyhovujú (gauč, stolička, hrana postele):' },
  ],
}

// ── Interkrurálny sex ────────────────────────────────────────────
const INTERKRURALNY: Blok = {
  druh: 'skupina', id: 'interkruralny', nadpis: 'Interkrurálny sex (medzi stehnami)',
  bloky: [
    {
      druh: 'text', id: 'int_info',
      telo:
        'Trenie penisu medzi stehnami partnerky bez penetrácie — teplý, tesný priestor, ona ho objíma nohami a riadi tlak. ' +
        'Prečo vzrušuje: jemný kontakt, plná kontrola tempa a intenzity, s lubrikantom veľmi podobný pocit ako penetrácia. Hodí sa na predohru aj ako hlavný akt.',
    },
    p('int_postoj', g(
      'Predstav si, že jej stehná sú tesne okolo teba a ty sa pomaly hýbeš medzi nimi, zatiaľ čo sa jej pozeráš do očí. Chcel by si, aby ti partnerka poskytla interkrurálny sex?',
      'Chcela by si, aby ťa partner dráždil trením penisu medzi tvojimi stehnami?',
    )),
    { druh: 'otazka', id: 'int_postoj_ine', typ: 'text', text: 'Vlastná odpoveď — interkrurálny sex (voliteľné):' },

    {
      druh: 'otazka', id: 'int_lubrikant', typ: 'jeden',
      text: 'Lubrikant',
      moznosti: [
        { v: 'ano', label: 'Áno, na zvýšenie pôžitku' },
        { v: 'nie', label: 'Nie, uprednostňujem trenie nasucho' },
      ],
    },
    {
      druh: 'otazka', id: 'int_polohy', typ: 'viac',
      text: 'Poloha',
      moznosti: [
        { v: 'zozadu_lezmo', label: 'Zozadu na boku (spooning)' },
        { v: 'misionar', label: 'Tvárou k sebe, nohy pritisnuté k sebe' },
        { v: 'na_bruchu', label: 'Ona na bruchu, on na nej' },
        { v: 'v_stoji', label: 'V stoji zozadu' },
      ],
    },
    { druh: 'otazka', id: 'int_poloha', typ: 'text', text: 'Iná poloha:' },
  ],
}

// ── Tribbing / scissoring ──────────────────────────────────────────
const TRIBBING: Blok = {
  druh: 'skupina', id: 'tribbing', nadpis: 'Tribbing / scissoring (vulva na vulve)',
  bloky: [
    {
      druh: 'text', id: 'tri_info',
      telo:
        'Tribadizmus (scissoring) je trenie vuliev o seba — klitoris o klitoris, stehná prepletené. Obľúbený medzi ženami, ale súčasť akéhokoľvek vzťahu, kde sa objavuje ženská bi zvedavosť. ' +
        'Prečo vzrušuje: fyzická blízkosť, intenzívna klitorálna stimulácia, rôzne uhly a pohyby. ' +
        'Mýtus: „Scissoring je vymyslený pre porno." — Realita: ženy ho reálne robia; častejšie však v uvoľnenejších polohách (jedna leží, druhá sa o ňu trie), nie v dokonalých „nožniciach".',
    },
    p('tri_postoj', g(
      'Predstav si pohľad na dve telá, ktoré sa o seba zmyselne trú. Láka ťa predstava sledovať partnerku pri scissoringu s inou ženou?',
      'Chcela by si skúsiť trenie vuliev o seba (scissoring)?',
    )),
    { druh: 'otazka', id: 'tri_postoj_ine', typ: 'text', text: 'Vlastná odpoveď — scissoring (voliteľné):' },

    {
      druh: 'otazka', id: 'tri_na_com', typ: 'viac',
      text: 'Trenie vulvy o',
      moznosti: [
        { v: 'stehno', label: g('Stehno partnerky', 'Stehno partnera') },
        { v: 'zadok', label: 'Zadok' },
        { v: 'cele_telo', label: g('Celé telo partnerky', 'Celé telo partnera') },
      ],
    },
    { druh: 'otazka', id: 'tri_variacie', typ: 'text', text: g('Uhly a polohy nôh, ktoré by som chcel skúšať:', 'Uhly a polohy nôh, ktoré by som chcela skúšať:') },
    p('tri_sledovanie', 'Predstava, že ma pri tom partner sleduje (vojeurský prvok), ma vzrušuje'),
  ],
}

// ── Mammary intercourse (titjob) ────────────────────────────────────
const TITJOB: Blok = {
  druh: 'skupina', id: 'titjob', nadpis: 'Mammary intercourse (titjob)',
  bloky: [
    { doplnenieId: 'tit_prijimam_ine', inePovolene: true,
      druh: 'otazka', id: 'tit_prijimam', typ: 'jeden',
      text: g(
        'Predstav si, že jej prsia obopínajú tvoj penis a ona sa dotýka špičkou jazyka. Chcel by si, aby ti partnerka poskytla titjob?',
        'Chcela by si, aby ťa partner dráždil penisom medzi tvojimi prsiami (titjob)?',
      ),
      moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
    },


    {
      druh: 'otazka', id: 'tit_poskytujem', typ: 'jeden',
      text: 'Poskytnúť partnerovi titjob',
      moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
    },
    p('tit_kombinacia_oral', 'Kombinácia titjobu s orálnou stimuláciou (striedavo/súčasne) ma láka'),
    {
      druh: 'text', id: 'tit_info', nadpis: 'Prečo a ako', ton: 'info',
      telo:
        'Prečo vzrušuje: prsia ako erotogénna zóna, silný vizuálny zážitok, dá sa kombinovať s orálom. ' +
        'Mýtus: „Na titjob treba veľké prsia." — Realita: stačí ich pritlačiť rukami k sebe, alebo penis kĺže po hrudi a medzi prsiami s olejom; pri menších prsiach je bonus viac očného kontaktu. ' +
        'Tipy: olej alebo lubrikant, ona kľačí a on stojí, alebo on leží a ona je nad ním; špička jazyka na žaluďi pri každom pohybe hore.',
    },
  ],
}

// ── Grinding ───────────────────────────────────────────────────────
const GRINDING: Blok = {
  druh: 'skupina', id: 'grinding', nadpis: 'Grinding',
  bloky: [
    {
      druh: 'otazka', id: 'gri_kde', typ: 'viac',
      text: 'Rytmické trenie',
      moznosti: [
        { v: 'stehno_koleno', label: 'Sedieť na stehne/kolene' },
        { v: 'tvar', label: 'Na tvári (face-sitting bez orálu)' },
        { v: 'penetracne', label: 'Ako rytmické trenie smerujúce k orgazmu bez penetrácie' },
      ],
    },
  ],
}

// ── Ďalšie outercourse praktiky (doplnené) ─────────────────────────
const OUTERCOURSE: Blok = {
  druh: 'skupina', id: 'outercourse', nadpis: 'Outercourse — čo mi sedí',
  bloky: [
    p('out_hotdogging', 'Penis medzi polovicami zadku (hotdogging)'),
    p('out_hlavicka', 'Trenie hlavičky penisu o klitoris a pysky bez vniknutia'),
    p('out_klzanie', 'Vulva kĺže po penise ležiacom na bruchu (ona hore)'),
    p('out_ruky_nohy', 'Penis v jej rukách spojených s trením o telo, stehná, chodidlá'),
    p('out_vibrator_medzi', 'Vibrátor vložený medzi nás počas trenia'),
    {
      druh: 'otazka', id: 'out_dokoncit', typ: 'viac', inePovolene: true,
      text: 'Ako chcem, aby sa outercourse skončil',
      moznosti: [
        { v: 'orgazmus_trenim', label: 'Orgazmus priamo z trenia' },
        { v: 'na_brucho', label: 'Ejakulácia na brucho / hruď' },
        { v: 'na_prsia', label: 'Ejakulácia na prsia' },
        { v: 'na_zadok', label: 'Ejakulácia na zadok / chrbát' },
        { v: 'prechod', label: 'Prechod do penetrácie alebo orálu' },
        { v: 'bez_konca', label: 'Bez cieľa — len vzrušenie' },
      ],
    },
    {
      druh: 'otazka', id: 'out_castejsie', typ: 'text',
      text: 'Ktoré dotyky chcem častejšie:',
    },
    { zbalitelny: true,
      druh: 'text', id: 'out_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Bez penetrácie to nie je skutočný sex." — Realita: pre veľkú časť žien je trenie klitorisu spoľahlivejšia cesta k orgazmu ako penetrácia. ' +
        'Mýtus: „Dry humping je pre tínedžerov." — Realita: páry, ktoré sa k nemu vrátia, opisujú návrat napätia z prvých rokov — oblečenie robí z dotyku hru. ' +
        'Mýtus: „Keď sa nedokončí dovnútra, muž nie je uspokojený." — Realita: pre mnohých mužov je ejakulácia na telo partnerky vizuálne ešte silnejšia.',
    },
  ],
}

// ── Rámec: bez cieľa, bezpečnosť ──────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Kedy a ako často',
  bloky: [
    {
      druh: 'text', id: 'ram_info',
      telo:
        'Nepenetratívne aktivity nie sú „len predohra" — môžu byť plnohodnotnou formou intimity, ' +
        'najmä keď je penetrácia dočasne nedostupná alebo nechcená. Rozšírenú „no-goal" filozofiu ' +
        '(sex bez cieľa orgazmu) má vlastná téma „Tantra, slow sex a spiritualita".',
    },
    {
      druh: 'otazka', id: 'ram_kontext', typ: 'viac',
      text: 'Kedy tieto aktivity najviac chcem',
      moznosti: [
        { v: 'predohra', label: 'Ako predohru' },
        { v: 'hlavny_akt', label: 'Ako hlavný akt' },
        { v: 'po_pauze', label: 'Po pauze/rekonvalescencii, keď penetrácia nie je vhodná' },
      ],
    },
    {
      druh: 'otazka', id: 'ram_nogoal_frekvencia', typ: 'jeden',
      text: g('Ako často by som chcel „no goal" večer — len dotyky bez cieľa', 'Ako často by som chcela „no goal" večer — len dotyky bez cieľa'),
      moznosti: [
        { v: 'nikdy', label: 'Nechcem' },
        { v: 'obcas', label: 'Občas, keď sme unavení' },
        { v: 'mesacne', label: 'Raz za mesiac' },
        { v: 'tyzdenne', label: 'Každý týždeň' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela o mojej túžbe po nepenetračnej hre:', 'Čo chcem, aby partner vedel o mojej túžbe po nepenetračnej hre:') },
  ],
}

const HLBKOVA_MAPA: Blok = {
  druh: 'skupina', id: 'hlbkova_mapa', nadpis: 'Viac než náhrada penetrácie',
  uvod: 'Trenie môže byť pomalé a intímne, hravé cez oblečenie aj dravé a úplne telesné. Dôležité je, ktorá vrstva z neho robí hlavný zážitok.',
  bloky: [
    {
      druh: 'otazka', id: 'nt_jadro', typ: 'viac', inePovolene: true,
      text: 'Čo ma na nepenetračnom trení priťahuje najviac',
      moznosti: [
        { v: 'cele_telo', label: 'Kontakt veľkej plochy tela a kože' },
        { v: 'napatie', label: 'Napätie z toho, že telá sú tesne pri sebe bez preniknutia' },
        { v: 'oblecenie', label: 'Trenie cez oblečenie a postupné odhaľovanie' },
        { v: 'rytmus', label: 'Spoločný rytmus panvy' },
        { v: 'pohlad', label: 'Pohľad na partnerovu rastúcu reakciu' },
        { v: 'kontrola', label: 'Možnosť presne viesť tlak, uhol a tempo' },
        { v: 'hlavny_akt', label: 'Pocit, že to nemusí byť iba cesta k inej aktivite' },
      ],
    },
    {
      druh: 'otazka', id: 'nt_rola', typ: 'viac', inePovolene: true,
      text: 'Ktoré roly ma pri trení lákajú',
      moznosti: [
        { v: 'prijimam', label: 'Ležať alebo sedieť a nechať partnera viesť pohyb' },
        { v: 'poskytujem', label: 'Viesť rytmus vlastnou panvou a sledovať partnerovu reakciu' },
        { v: 'rovnocenne', label: 'Hýbať sa proti sebe rovnocenne' },
        { v: 'drzim', label: 'Pevne partnera držať na mieste' },
        { v: 'striedat', label: 'Počas jednej scény si vedenie vymeniť' },
      ],
    },
    {
      druh: 'otazka', id: 'nt_partner_tuzba', typ: 'jeden', inePovolene: true,
      text: g('Ako na mňa pôsobí, keď partnerka túži po trení bez penetrácie', 'Ako na mňa pôsobí, keď partner túži po trení bez penetrácie'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej chuť cítiť moje telo ma vzrušuje', 'Jeho chuť cítiť moje telo ma vzrušuje') },
        { v: 'uvolnuje', label: 'Uvoľňuje ma, že zážitok nemusí smerovať k penetrácii' },
        { v: 'chcem_viest', label: 'Chcem prevziať vedenie a ukázať svoj ideálny tlak a rytmus' },
        { v: 'chcem_dat', label: g('Chcem jej dopriať presne tú podobu, po ktorej túži', 'Chcem mu dopriať presne tú podobu, po ktorej túži') },
        { v: 'fantazia', label: 'Láka ma to skôr ako fantázia alebo krátka časť hry' },
        { v: 'nie', label: 'Tento typ kontaktu ma eroticky neťahá' },
      ],
    },
    {
      druh: 'otazka', id: 'nt_nalada', typ: 'viac', inePovolene: true,
      text: 'V akej nálade ma trenie láka',
      moznosti: [
        { v: 'jemne', label: 'Pomaly, nahí, s dlhým objatím' },
        { v: 'oblecenie', label: 'Nedočkavo cez nohavičky, boxerky alebo džínsy' },
        { v: 'mokre', label: 'Mokré a klzké, s dôrazom na telesný pocit' },
        { v: 'drave', label: 'Pevný stisk, silný tlak a dravý rytmus' },
        { v: 'pred_zrkadlom', label: 'Pred zrkadlom alebo s dôrazom na pohľad' },
        { v: 'bez_orgazmu', label: 'Ako dlhé dráždenie bez potreby vyvrcholenia' },
      ],
    },
    {
      druh: 'otazka', id: 'nt_fantazia_realita', typ: 'jeden',
      text: 'Ako chcem túto tému preskúmať ďalej',
      moznosti: [
        { v: 'oblubene', label: 'Vrátiť sa k našej obľúbenej forme a prehĺbiť ju' },
        { v: 'nova_forma', label: 'Vyskúšať nový typ trenia alebo novú rolu' },
        { v: 'hlavny_akt', label: 'Prvýkrát ho nechať ako hlavný akt' },
        { v: 'fantazia', label: 'Zatiaľ ho rozvíjať iba vo fantázii alebo slovách' },
        { v: 'nie', label: 'Nechcem túto tému ďalej rozvíjať' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'nt_myty', nadpis: 'Mýty a tabu', ton: 'info',
      telo: 'Mýtus: trenie je iba tínedžerská predohra alebo náhradný sex. Realita: môže ponúknuť plný telesný rytmus, intenzívnu stimuláciu aj orgazmus a pre mnohých je cieľom samo osebe.\n\nMýtus: keď pár nepenetratuje, niečo mu chýba. Realita: frottage, tribbing, interkrurálna hra či trenie genitálií prinášajú iné vnemy a inú psychológiu než penetrácia — nie slabšiu verziu toho istého.',
    },
  ],
}

export const NEPENETRATIVNE_TRENIE: TemaObsah = {
  slug: 'nepenetrativne-trenie/nepenetrativne-trenie',
  nadpis: 'Nepenetratívne trenie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Vzrušenie, ktoré nemusí ísť „dovnútra"',
      telo:
        'Frottage, tribbing, interkrurálny sex a mammary intercourse ponúkajú intenzívnu stimuláciu ' +
        'a blízkosť bez penetrácie — ako predohru, ako samostatnú aktivitu, alebo keď penetrácia dočasne nie je vhodná.',
    },
  ],
  telo: [
    PETTING,
    FROTTAGE,
    INTERKRURALNY,
    TRIBBING,
    TITJOB,
    GRINDING,
    OUTERCOURSE,
    HLBKOVA_MAPA,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
