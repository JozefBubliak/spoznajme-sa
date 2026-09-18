import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Zmyslová hra — modul B4 „Zmyslová hra".
// Zdroj: „11_Senzoricke_hranenie.docx" bol prázdny (len názov, žiadny
// obsah); ďalšie podklady sú v zdroj.docx P344–540 (GLOBAL-002/003).
// Autorský základ vychádza z existujúceho L4
// seedu modulu (zrak, sluch, čuch, chuť, hmat/teplota/textúra, layering
// a deprivácia). z/m verzia zrkadlová.
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

// ── Zrak ─────────────────────────────────────────────────────────────
const ZRAK: Blok = {
  druh: 'skupina', id: 'zrak', nadpis: 'Zrak — vizuál a jeho odopretie',
  bloky: [
    {
      druh: 'text', id: 'zra_info',
      telo:
        'Zrak dokáže atmosféru posilniť aj úplne vypnúť — a oba smery fungujú ako vzrušenie. Zrkadlo mení uhol pohľadu na seba aj na partnera; ' +
        'zaviazané oči nechajú vidieť len jedného z dvoch; úplná tma odoberie zrak obom naraz a preloží pozornosť na dotyk, dych a vôňu.',
    },
    {
      druh: 'otazka',
      id: 'zra_co',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'zaviazane_oci', label: 'Zaviazané oči — jeden z nás nevidí, druhý áno (napätie z neistoty, čo príde)' },
        { v: 'tma', label: 'Úplná tma — nevidí ani jeden z nás (zrak odpadá obom, zbystrí sa dotyk aj sluch)' },
        { v: 'striptiz', label: 'Striptíz / pomalé vyzliekanie' },
        { v: 'zrkadlo', label: 'Sledovanie seba/partnera v zrkadle (nový uhol na to, čo sa práve deje)' },
        { v: 'vizualne_podnety', label: 'Vizuálne podnety (tlmené svetlo, farebné LED, sviečky)' },
        { v: 'oblecenie', label: 'Oblečenie, ktoré odhaľuje alebo zahaľuje — erotický odev či kostým' },
        { v: 'maska', label: 'Maska (anonymita/estetika — iné než zaviazané oči, vidím ja, nevidí sa moja tvár)' },
        { v: 'ocny_kontakt', label: '„Pozeraj sa mi do očí" počas intimity' },
        { v: 'zatvorene_oci', label: 'Radšej zatvorené oči — sústredím sa na pocity, nie na pohľad' },
      ],
    },
    p('zra_odopretie', 'Odopretie zraku (tma, páska) mi pomáha uvoľniť sa a viac cítiť'),
  ],
}

// ── Sluch ─────────────────────────────────────────────────────────────
const SLUCH: Blok = {
  druh: 'skupina', id: 'sluch', nadpis: 'Sluch — zvuk a ticho',
  bloky: [
    {
      druh: 'otazka', id: 'slu_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'sepot', label: 'Šepot do ucha' },
        { v: 'dirty_talk_jemny', label: 'Jemný dirty talk' },
        { v: 'hudba', label: 'Hudba na pozadí' },
        { v: 'sluchova_deprivacia', label: 'Sluchová deprivácia (slúchadlá, biely šum)' },
        { v: 'ticho', label: 'Vedomé ticho — sústrediť sa len na dych a dotyk' },
      ],
    },
    p('slu_zvuky', 'Vlastné zvuky (dych, vzdychy) počas intimity si chcem vedome dovoliť, nepotláčať'),
    {
      druh: 'text',
      id: 'slu_hudba_info',
      telo: 'Hudba môže dotvoriť atmosféru a rytmus blízkosti: niekomu sedí jazz, inému klavír, rytmické skladby alebo ambientné zvuky. Rovnako platná je voľba ticha.',
    },
    {
      druh: 'otazka',
      id: 'slu_hudobny_zaner',
      typ: 'jeden',
      text: 'Hudobný žáner, ktorý mi počas intimity najviac sedí',
      moznosti: [
        { v: 'rnb_jazz', label: 'Zmyselné R&B alebo jazz' },
        { v: 'klavir', label: 'Jemné klavírne skladby' },
        { v: 'dynamicke', label: 'Dynamické, rytmické melódie' },
        { v: 'ambient', label: 'Ambientná hudba a relaxačné zvuky' },
        { v: 'ziadna', label: 'Nepreferujem hudbu počas intimity' },
      ],
    },
    {
      druh: 'otazka',
      id: 'slu_hudobny_zaner_ine',
      typ: 'text',
      text: 'Hudobný podklad — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'text',
      id: 'slu_hlas_info',
      telo: 'Šepkanie, príkazy či dohodnuté zákazy môžu byť súčasťou hry s vedením. Niekomu vyhovuje autoritatívny tón, inému jemné vedenie alebo žiadne príkazy. Dohodnite si slová a hranice vopred; príkaz v hre neobmedzuje možnosť povedať nie.',
    },
    {
      druh: 'otazka',
      id: 'slu_verbalne_prikazy',
      typ: 'jeden',
      text: 'Verbálne príkazy počas aktu (tón autority)',
      moznosti: [
        { v: 'tvrde', label: 'Milujem tvrdé, autoritatívne príkazy' },
        {
          v: 'jemne',
          label: { m: 'Mám rád jemné vedenie', z: 'Mám rada jemné vedenie' },
        },
        { v: 'mozno', label: 'Možno, ak to nebude príliš tvrdé' },
        { v: 'nie', label: 'Nie, necítim sa pri tom dobre' },
      ],
    },
    {
      druh: 'otazka',
      id: 'slu_verbalne_prikazy_ine',
      typ: 'text',
      text: 'Verbálne príkazy — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'slu_povzbudenie',
      typ: 'jeden',
      text: 'Chcem počas intimity počúvať povzbudenie a vzrušujúce frázy?',
      moznosti: [
        { v: 'ano', label: 'Áno, veľmi ma to vzrušuje' },
        { v: 'mozno', label: 'Možno, ak to bude prirodzené' },
        { v: 'nie', label: 'Nie, preferujem ticho' },
      ],
    },
    {
      druh: 'otazka',
      id: 'slu_povzbudenie_ine',
      typ: 'text',
      text: 'Povzbudenie — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'slu_pouzivat_slova',
      typ: 'jeden',
      text: 'Chcem počas intimity používať konkrétne slová, príkazy alebo oslovenia?',
      moznosti: [
        { v: 'ano', label: 'Áno, vzrušuje ma dirty talk a dominantné príkazy' },
        {
          v: 'mozno',
          label: { m: 'Možno, rád by som to skúšal', z: 'Možno, rada by som to skúšala' },
        },
        { v: 'nie', label: 'Nie, necítim sa pri tom dobre' },
      ],
    },
    {
      druh: 'otazka',
      id: 'slu_pouzivat_slova_ine',
      typ: 'text',
      text: 'Slová, príkazy alebo oslovenia — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka', id: 'slu_druhy_prejavov', typ: 'viac', inePovolene: true,
      text: 'Aké druhy verbálnych prejavov ma vzrušujú',
      moznosti: [
        { v: 'komplimenty', label: 'Nežné komplimenty ("Si nádherná/ý.")' },
        { v: 'dirty_talk', label: 'Priamy dirty talk (odvážne, explicitné slová)' },
        { v: 'opisovanie', label: 'Opisovanie toho, čo sa práve deje alebo bude nasledovať' },
        { v: 'roleplay_rec', label: 'Roleplay oslovenia ("môj pán", "zlý chlapec"...)' },
        { v: 'vulgarne', label: 'Vulgárne výrazové spojenia (v rámci dohodnutých hraníc)' },
        { v: 'ticho', label: 'Žiadne slová — preferujem ticho' },
      ],
    },
    {
      druh: 'otazka', id: 'slu_ton_hlasu', typ: 'jeden',
      text: 'Aký tón hlasu ma najviac vzrušuje (nie čo sa hovorí, ale ako to znie)',
      moznosti: [
        { v: 'jemny_lask', label: 'Jemné a láskavé šepkanie' },
        { v: 'dominantny', label: 'Dominantný a príkazový tón' },
        { v: 'hlboky', label: 'Hrubší, hlboký hlas' },
        { v: 'nezalezi', label: 'Nezáleží mi na tóne' },
      ],
    },
  ],
}

// ── Čuch ─────────────────────────────────────────────────────────────
const CUCH: Blok = {
  druh: 'skupina', id: 'cuch', nadpis: 'Čuch — vône',
  bloky: [
    {
      druh: 'text',
      id: 'cuc_info',
      telo: 'Vôňa pokožky, dychu či vlasov môže byť osobným podnetom blízkosti a autenticity. Niekto ju miluje, inému vyhovuje parfum a niekomu záleží na situácii. Vône ako jazmín, ylang-ylang, vanilka alebo santalové drevo vnímajte ako osobné preferencie, nie ako zaručené afrodiziaká. Môžete si zvoliť vôňu pre spoločné chvíle, ak je príjemná obom.',
    },
    {
      druh: 'otazka',
      id: 'cuc_prirodzena_postoj',
      typ: 'jeden',
      text: 'Ako vnímam prirodzenú vôňu partnera alebo partnerky?',
      moznosti: [
        { v: 'milujem', label: 'Milujem ju — je súčasťou našej intimity' },
        { v: 'vzrusuje', label: 'Je pre mňa vzrušujúca, vnímam ju ako afrodiziakum' },
        {
          v: 'parfum',
          label: { m: 'Mám ju rád, ale preferujem parfum', z: 'Mám ju rada, ale preferujem parfum' },
        },
        { v: 'situacia', label: 'Nie vždy mi je príjemná — záleží na situácii' },
        { v: 'nevsimam', label: 'Nevenujem tomu veľa pozornosti' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_prirodzena_postoj_ine',
      typ: 'text',
      text: 'Prirodzená vôňa — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'cuc_co',
      typ: 'viac',
      inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'prirodzena_vona', label: 'Prirodzená vôňa tela a pohlavia' },
        { v: 'parfum_olej', label: 'Parfum / vonný olej na koži' },
        { v: 'feromony', label: 'Predstava feromónov a prirodzeného „chemického" priťahovania' },
        { v: 'vona_po_sexe', label: '„Vôňa po sexe" — nesprchovať sa hneď' },
        { v: 'aromaterapia', label: 'Aromaterapia (sviečky, esenciálne oleje) ako súčasť atmosféry' },
        { v: 'masaz_s_olejom', label: 'Masáž s vonným olejom — spojenie tepla rúk a vône' },
      ],
    },
    p('cuc_vedome_privoniavanie', 'Vedomé privoniavanie ku krku, zápästiam alebo vlasom partnera počas predohry (ako rituál) ma láka'),
    { druh: 'otazka', id: 'cuc_preferovane_vone', typ: 'text', text: 'Konkrétne vône, ktoré ma najviac vzrušujú alebo upokojujú (napr. santalové drevo, ylang-ylang, vanilka, kokos, pačuli):' },
    {
      druh: 'text',
      id: 'cuc_ritual_info',
      telo: 'Vedomé vnímanie vône krku, zápästí či vlasov môže byť súčasťou spoločného rituálu. Záleží na tom, či je príjemné obom. Minulá skúsenosť neznamená súhlas teraz.',
    },
    {
      druh: 'otazka',
      id: 'cuc_ritual_skusenost',
      typ: 'jeden',
      text: 'Aká je moja skúsenosť a postoj k vedomému zapojeniu vône tela do intimity?',
      moznosti: [
        { v: 'ritual', label: 'Áno, je to súčasť nášho rituálu.' },
        { v: 'obcas', label: 'Občas sme to vyskúšali a bolo to vzrušujúce.' },
        {
          v: 'chcem',
          label: { m: 'Ešte nie, ale chcel by som.', z: 'Ešte nie, ale chcela by som.' },
        },
        {
          v: 'neistota',
          label: { m: 'Nie som si istý, ako by som to vnímal.', z: 'Nie som si istá, ako by som to vnímala.' },
        },
        { v: 'nezaujem', label: 'Nezaujíma ma to.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_ritual_skusenost_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Aká je moja skúsenosť a postoj k vedomému zapojeniu vône tela do intimity?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'cuc_oleje_info',
      telo: 'Kokos, santal alebo pačuli sú príklady vôní či zložiek telových prípravkov. To, či prirodzenú vôňu doplnia alebo prekryjú, je osobné vnímanie. Esenciálny olej nie je to isté ako hotový telový olej; pri použití na kožu sa používa zriedený prípravok podľa jeho určenia. Parfumované prípravky nepatria na genitálie. Olejové prípravky nepoužívajte s latexovými kondómami.',
    },
    {
      druh: 'otazka',
      id: 'cuc_oleje_pouzivanie',
      typ: 'jeden',
      text: 'Používam na tele prírodné oleje na doplnenie prirodzenej vône?',
      moznosti: [
        { v: 'pravidelne', label: 'Áno, pravidelne.' },
        { v: 'obcas', label: 'Občas to skúšam.' },
        {
          v: 'hladam',
          label: { m: 'Chcel by som, ale nenašiel som správnu vôňu.', z: 'Chcela by som, ale nenašla som správnu vôňu.' },
        },
        {
          v: 'neistota',
          label: { m: 'Nie som si istý, či by to malo efekt.', z: 'Nie som si istá, či by to malo efekt.' },
        },
        { v: 'parfum', label: 'Nie, dávam prednosť parfumom.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_oleje_pouzivanie_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Používam na tele prírodné oleje na doplnenie prirodzenej vône?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'cuc_aroma_info',
      telo: 'Aromaterapia môže pre niekoho znamenať príjemné prostredie. Ylang-ylang, jazmín či vanilka však nie sú zaručeným prostriedkom na uvoľnenie alebo zvýšenie túžby. Vôňu možno vnímať sladko, exoticky, kvetinovo či drevito; význam a emócie sa líšia medzi ľuďmi.',
    },
    {
      druh: 'otazka',
      id: 'cuc_aroma_skusenost',
      typ: 'jeden',
      text: 'Akú mám skúsenosť a postoj k aromaterapii počas intimity?',
      moznosti: [
        { v: 'pravidelne', label: 'Áno, používame pravidelne.' },
        { v: 'obcas', label: 'Občas to skúšame.' },
        {
          v: 'chcem',
          label: { m: 'Rád by som to vyskúšal.', z: 'Rada by som to vyskúšala.' },
        },
        {
          v: 'neistota',
          label: { m: 'Nie som si istý, či by to malo efekt.', z: 'Nie som si istá, či by to malo efekt.' },
        },
        { v: 'nedolezite', label: 'Nie, nevnímam to ako dôležité.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_aroma_skusenost_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Akú mám skúsenosť a postoj k aromaterapii počas intimity?“ (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'cuc_vone_vyber',
      typ: 'viac',
      text: 'Ktoré vône sú mi počas intimity príjemné?',
      moznosti: [
        { v: 'vanilka', label: 'Vanilka — sladká vôňa' },
        { v: 'ylang', label: 'Ylang-ylang — exotická vôňa' },
        { v: 'jazmin', label: 'Jazmín — kvetinová vôňa' },
        { v: 'santal', label: 'Santalové drevo — drevitá vôňa' },
        { v: 'ziadna', label: 'Nemám obľúbenú vôňu.' },
      ],
      inePovolene: true,
      napoveda: 'Vyber vône, ktoré ti osobne vyhovujú, alebo iba možnosť „Nemám obľúbenú vôňu“. Prívlastky upokojujúca, afrodiziakálna, ženská či tajomná sú osobné asociácie, nie zaručené účinky ani určenie podľa pohlavia.',
    },
    {
      druh: 'text',
      id: 'cuc_masaz_info',
      telo: 'Masáž s vonným olejom prepája teplo rúk, dotyk a čuch. Príjemnosť každej z týchto zložiek je individuálna; olej ani vôňa nie sú podmienkou masáže.',
    },
    {
      druh: 'otazka',
      id: 'cuc_masaz_skusenost',
      typ: 'jeden',
      text: 'Aká je moja skúsenosť a postoj k intímnej masáži s aromatickými olejmi?',
      moznosti: [
        { v: 'milujem', label: 'Áno, milujem to.' },
        { v: 'obcas', label: 'Občas to skúšame.' },
        {
          v: 'chcem',
          label: { m: 'Chcel by som, ale ešte sme to neskúsili.', z: 'Chcela by som, ale ešte sme to neskúsili.' },
        },
        {
          v: 'neistota',
          label: { m: 'Nie som si istý, či by sa mi to páčilo.', z: 'Nie som si istá, či by sa mi to páčilo.' },
        },
        { v: 'nezaujem', label: 'Nie, nemám záujem.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_masaz_skusenost_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Aká je moja skúsenosť a postoj k intímnej masáži s aromatickými olejmi?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'cuc_prostredie_info',
      telo: 'Vonné sviečky, jemné svetlo, hudba a upravený priestor môžu tvoriť spoločný rituál. Vyberte len prvky príjemné obom; bez vône či bez hudby je rovnako platná možnosť.',
    },
    {
      druh: 'otazka',
      id: 'cuc_prostredie_prvky',
      typ: 'viac',
      text: 'Ktoré prvky chcem zahrnúť do spoločného zmyslového prostredia?',
      moznosti: [
        { v: 'svetlo', label: 'Tlmené svetlo alebo sviečky.' },
        { v: 'hudba', label: 'Jemná hudba alebo ambientné zvuky.' },
        { v: 'dekoracie', label: 'Upravený priestor s dekoráciami.' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'cuc_prostredie_frekvencia',
      typ: 'jeden',
      text: 'Ako často chcem vytvárať takéto spoločné prostredie?',
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne – ako súčasť každodenného života.' },
        { v: 'obcas', label: 'Občas – pri špeciálnych príležitostiach.' },
        { v: 'zriedka', label: 'Zriedka – len keď je výnimočná nálada.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'cuc_prostredie_frekvencia_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Ako často chcem vytvárať takéto spoločné prostredie?“ (voliteľné):',
    },
  ],
}

// ── Chuť ─────────────────────────────────────────────────────────────
const CHUT: Blok = {
  druh: 'skupina', id: 'chut', nadpis: 'Chuť — ochutnávanie',
  bloky: [
    {
      druh: 'text',
      id: 'chu_jedlo_info',
      telo: 'Ovocie, šľahačka a čokoládová poleva na tele, vzájomné kŕmenie či ochutnávanie môžu byť osobnou preferenciou. Ide o preferenciu, nie o povinnú súčasť predohry. Táto otázka nie je návod na nanášanie potravín do genitálií.',
    },
    {
      druh: 'otazka',
      id: 'chu_jedlo_postoj',
      typ: 'jeden',
      text: 'Ako vnímam hranie s jedlom počas intimity?',
      moznosti: [
        { v: 'milujem', label: 'Milujem – je to vzrušujúce a zábavné.' },
        { v: 'obcas', label: 'Občas, podľa nálady.' },
        { v: 'nie', label: 'Nepreferujem jedlo v posteli.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_jedlo_postoj_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Ako vnímam hranie s jedlom počas intimity?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'chu_prenos_info',
      telo: 'Prenášanie nápoja alebo telesných tekutín pri bozkávaní sú rôzne preferencie. Záujem o nápoj neznamená záujem o telesné tekutiny. O konkrétnej variante sa treba dohodnúť; odmietnutie nevypovedá o dôvere vo vzťahu.',
    },
    {
      druh: 'otazka',
      id: 'chu_prenos_skusenost',
      typ: 'jeden',
      text: 'Aká je moja doterajšia skúsenosť s prenášaním tekutín z úst do úst?',
      moznosti: [
        {
          v: 'spokojnost',
          label: { m: 'Už to robíme a som spokojný', z: 'Už to robíme a som spokojná' },
        },
        { v: 'ina', label: 'Mám inú skúsenosť' },
        { v: 'ziadna', label: 'Zatiaľ žiadna' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_prenos_ochota',
      typ: 'jeden',
      text: 'Chcem zapojiť prenášanie tekutín z úst do úst do našej intimity?',
      moznosti: [
        { v: 'chcem', label: 'Chcem to zapojiť' },
        {
          v: 'ak_chces',
          label: { m: 'Rád to vyskúšam, ak chceš aj ty', z: 'Rada to vyskúšam, ak chceš aj ty' },
        },
        { v: 'mozno', label: 'Možno, podľa okolností — potrebujem rozhovor' },
        { v: 'nie', label: 'Nie, necítim sa komfortne' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_prenos_ine',
      typ: 'text',
      text: 'Prenášanie tekutín — vlastná odpoveď a konkrétna varianta (voliteľné):',
    },
    {
      druh: 'text',
      id: 'chu_kombinacia_info',
      telo: 'Ďalšia otázka sa týka predstavy kombinovať telesné tekutiny (semeno alebo vaginálny sekrét) s inou chuťou, napríklad medom, šľahačkou či sirupom. Zachytáva osobný postoj, nie odporúčanie na realizáciu. Pri orálnom sexuálnom kontakte sa môžu prenášať sexuálne prenosné infekcie aj bez príznakov; kondóm alebo orálna bariéra môže riziko znížiť.',
    },
    {
      druh: 'otazka',
      id: 'chu_kombinacia_postoj',
      typ: 'jeden',
      text: 'Ako sa staviam ku kombinácii telesných tekutín s inými chuťami?',
      moznosti: [
        { v: 'laka', label: 'Znie to veľmi vzrušujúco.' },
        { v: 'mozno', label: 'Možno, záleží na nálade.' },
        { v: 'nie', label: 'Nie, necítim sa na to.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_kombinacia_postoj_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Ako sa staviam ku kombinácii telesných tekutín s inými chuťami?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'chu_napoj_info',
      telo: 'Samostatne možno hovoriť o prenose chuti nápoja pri bozku, napríklad džúsu alebo vína. Nejde automaticky o rovnakú preferenciu ako pri telesných tekutinách.',
    },
    {
      druh: 'otazka',
      id: 'chu_napoj_postoj',
      typ: 'jeden',
      text: 'Ako vnímam prenášanie nápojov bozkami?',
      moznosti: [
        { v: 'laka', label: 'Veľmi vzrušujúce.' },
        {
          v: 'mozno',
          label: { m: 'Možno, ak budem pripravený.', z: 'Možno, ak budem pripravená.' },
        },
        { v: 'nie', label: 'Nie, radšej nie.' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_napoj_postoj_ine',
      typ: 'text',
      text: 'Vlastná odpoveď k otázke „Ako vnímam prenášanie nápojov bozkami?“ (voliteľné):',
    },
    {
      druh: 'text',
      id: 'chu_alkohol_info',
      telo: 'Víno, šampanské či likér sú príkladmi chutí; alkohol nie je podmienkou intimity. Možno zvoliť nealkoholický nápoj. Alkohol nesmie byť prostriedkom na presviedčanie; pri neschopnosti slobodne a jasne súhlasiť nepokračujte.',
    },
    {
      druh: 'otazka', id: 'chu_co', typ: 'viac', inePovolene: true,
      text: 'Čo ma na tejto zmyslovej rovine láka',
      moznosti: [
        { v: 'bozky_ochutnavanie', label: 'Bozky s vedomým „ochutnávaním"' },
        { v: 'jedlo', label: 'Jedlo na tele (ovocie, šľahačka, med, čokoláda)' },
        { v: 'napoj', label: 'Prenášanie dúšku nápoja bozkom' },
        { v: 'telesne_tekutiny', label: 'Telesné tekutiny (opt-in, podľa preferencie)' },
      ],
    },
    { druh: 'otazka', id: 'chu_kde', typ: 'text', text: 'Ktoré chute a na ktorých miestach tela sú pre mňa lákavé:' },
    p('chu_kombinacia_tekutin', 'Kombinácia telesných tekutín s inou chuťou (med, sladký sirup) ma láka'),
    {
      druh: 'otazka', id: 'chu_alkohol', typ: 'jeden',
      text: 'Alkohol (víno, šampanské) ako súčasť erotických hier',
      moznosti: [
        { v: 'ano', label: 'Áno, znie to vzrušujúco' },
        { v: 'mozno_jemne', label: 'Možno, ak to bude jemné a bezpečné' },
        { v: 'nie', label: 'Nie, nechcem miešať alkohol a intimitu' },
      ],
    },
    {
      druh: 'otazka',
      id: 'chu_alkohol_ine',
      typ: 'text',
      text: 'Alkohol a intimita — vlastná odpoveď (voliteľné):',
    },
  ],
}

// ── Hmat / teplota / textúra ──────────────────────────────────────────
const HMAT: Blok = {
  druh: 'skupina', id: 'hmat', nadpis: 'Hmat, teplota a textúra',
  bloky: [
    {
      druh: 'text',
      id: 'hma_dotyky_info',
      telo: 'Dotyk môže byť spôsobom blízkosti, no jeho príjemnosť závisí od miesta, intenzity a aktuálnej nálady. Jemné hladenie, tlak, stisk či škrabkanie sú odlišné podnety. To, čo vyhovuje jednému, nemusí vyhovovať druhému; dohodnite sa a reagujte na spätnú väzbu.',
    },
    {
      druh: 'otazka',
      id: 'hma_dotyky_preferencia',
      typ: 'jeden',
      text: 'Aké typy dotykov preferujem?',
      moznosti: [
        { v: 'jemne', label: 'Jemné hladkanie prstami alebo pierkom' },
        { v: 'intenzivne', label: 'Intenzívnejšie stláčanie, napríklad stehien alebo ramien' },
        { v: 'kombinacia', label: 'Kombinácia jemných a intenzívnych dotykov' },
      ],
    },
    {
      druh: 'otazka',
      id: 'hma_dotyky_preferencia_ine',
      typ: 'text',
      text: 'Preferované dotyky — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'otazka',
      id: 'hma_nove_dotyky',
      typ: 'jeden',
      text: 'Chcem skúšať nové druhy dotykov a objavovať citlivé miesta druhého?',
      moznosti: [
        {
          v: 'ano',
          label: { m: 'Áno, rád by som objavoval citlivé miesta druhého', z: 'Áno, rada by som objavovala citlivé miesta druhého' },
        },
        { v: 'mozno', label: 'Možno, chcem sa s tým najprv oboznámiť' },
        { v: 'nie', label: 'Nie, preferujem to, čo už poznám' },
      ],
    },
    {
      druh: 'otazka',
      id: 'hma_nove_dotyky_ine',
      typ: 'text',
      text: 'Nové druhy dotykov — vlastná odpoveď (voliteľné):',
    },
    {
      druh: 'text',
      id: 'hma_obklady_info',
      telo: 'Teplý obklad je ďalšou možnosťou vnímania teploty. Má byť príjemne teplý, nie horúci; medzi tepelný zdroj a kožu vložte ochrannú vrstvu a pravidelne kontrolujte pokožku. Pri zníženej citlivosti teplo nepoužívajte. Nejde o odporúčanie liečiť bolesť či poranenie.',
    },
    {
      druh: 'otazka',
      id: 'hma_teplota',
      typ: 'viac',
      text: 'Teplotné hry',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'teply_olej', label: 'Teplý olej' },
        { v: 'chladeny_kov', label: 'Chladené kovové predmety (iný pocit než ľad — pomalšie sa zohrievajú)' },
        { v: 'striedanie', label: 'Striedanie teplého a studeného' },
        { v: 'teply_obklad', label: 'Príjemne teplý obklad s ochrannou vrstvou' },
      ],
    },
    {
      druh: 'otazka', id: 'hma_textury', typ: 'viac',
      text: 'Materiály a textúry na koži',
      moznosti: [
        { v: 'hodvab', label: 'Hodváb' },
        { v: 'koza', label: 'Koža' },
        { v: 'latex', label: 'Latex' },
        { v: 'pierko', label: 'Pierko' },
      ],
    },
    p('hma_vibracia', 'Jemná vibrácia mimo genitálií (krk, chrbát) ako súčasť senzorickej hry ma láka'),
    { druh: 'otazka', id: 'hma_kde_teplota', typ: 'text', text: 'Kde na tele áno a kde určite nie (najmä pri teplote):' },
  ],
}

// ── Layering a deprivácia ──────────────────────────────────────────
const LAYERING: Blok = {
  druh: 'skupina', id: 'layering', nadpis: 'Layering a deprivácia',
  bloky: [
    {
      druh: 'text', id: 'layering_info',
      telo:
        'Kombinovanie zmyslov (napr. zaviazané oči + šepot + ľad) alebo postupné odoberanie jedného zmyslu ' +
        'zosilňuje vnímanie ostatných. Ide o jemnú formu hry, nie o silovú kontrolu — vždy s možnosťou kedykoľvek prestať.',
    },
    {
      druh: 'text', id: 'layering_ritual_tip', ton: 'info',
      telo:
        'Inšpirácia na vyskúšanie: naplánuj predohru ako malý rituál pre všetky zmysly naraz — zhasni svetlá, zapáľ sviečku, pusti jemnú hudbu ' +
        'a použi vonný olej. Partnerovi zaviaž oči a skúmaj jeho telo pierkom, teplým olejom a pomalými bozkami, intenzitu zvyšuj postupne a sleduj reakcie. ' +
        'Alebo skús opačný extrém — úplnú tmu a ticho, len dych a dotyk, bez akéhokoľvek plánu.',
    },
    {
      druh: 'otazka', id: 'lay_co', typ: 'viac',
      text: 'Čo by som chcel(a) skúsiť',
      moznosti: [
        { v: 'kombinacia', label: 'Kombinácia dvoch zmyslov naraz (napr. oči + dotyk)' },
        { v: 'postupne_odoberanie', label: 'Postupné odoberanie zmyslov v priebehu scény' },
        { v: 'jeden_zmysel', label: 'Radšej jeden zmysel naraz, bez kombinovania' },
      ],
    },
    p('lay_deprivacia_ok', 'Zmyslová deprivácia (páska, slúchadlá) mi je príjemná, pokiaľ viem, že môžem kedykoľvek prestať'),
  ],
}

// ── Rámec a bezpečie ───────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec a bezpečie',
  bloky: [
    { druh: 'otazka', id: 'ram_alergie', typ: 'text', text: 'Alergie alebo citlivosti na materiály/vône/oleje, ktoré treba zohľadniť:' },
    {
      druh: 'otazka', id: 'ram_signal', typ: 'jeden',
      text: 'Pri zmyslovom preťažení (príliš veľa naraz) preferujem',
      moznosti: [
        { v: 'slovo', label: 'Povedať to nahlas' },
        { v: 'gesto', label: 'Dohodnuté gesto (keď mám napr. zaviazané oči)' },
        { v: 'redukcia', label: 'Partner postupne uberá intenzitu bez toho, aby som musel(a) niečo hovoriť' },
      ],
    },
  ],
}

export const ZMYSLOVA_HRA: TemaObsah = {
  slug: 'zmyslova-hra/zmyslova-hra',
  nadpis: 'Zmyslová hra',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Päť brán k vzrušeniu',
      telo:
        'Zrak, sluch, čuch, chuť a hmat — každý zmysel je samostatná cesta k vzrušeniu a každý sa dá zosilniť, ' +
        'stlmiť alebo dočasne odobrať. Táto téma mapuje, ktoré zmyslové vrstvy ma najviac oslovujú.',
    },
    {
      druh: 'text', id: 'ramec_info', nadpis: 'Rámec', ton: 'info',
      telo: 'Akákoľvek forma dočasného odopretia zmyslu (páska, slúchadlá) je vždy opt-in a s možnosťou kedykoľvek prestať.',
    },
  ],
  telo: [
    ZRAK,
    SLUCH,
    CUCH,
    CHUT,
    HMAT,
    LAYERING,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
