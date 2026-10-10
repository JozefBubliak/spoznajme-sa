import { CHUT, DOLEZITOST, SCHOPNOST } from './skaly'
import type { TemaObsah, Blok, Moznost, OtazkaBlok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Predohra a naladenie — modul A4 „Predohra a stupňovanie".
// Zdroj: „09_Predohra_a_naladenie". Fyzická príprava a starostlivosť o telo,
// výber oblečenia, signály pripravenosti a očný kontakt, sexting/erotická
// komunikácia počas dňa, vedome dohodnutá iniciácia, polohy mimo spálne,
// dĺžka/tempo/poradie predohry, naladenie po konflikte a špeciálne kontexty.
// Zmyslová hra (zrak/sluch/čuch/chuť/hmat) má vlastný modul B4 „zmyslova-hra" —
// tu len stručný odkaz, nie duplikát. Iniciácia a signalizácia má vlastný
// modul A2 — tu len doplnok (nepriame prejavy, očný kontakt). Prostredie má
// vlastný modul A3 — tu nerozvádzané. Rituály a antirutina sú v „Dlhodobej
// intimite" (A1) — tu nerozvádzané. z/m verzia zrkadlová.
// Doplnené 2026-10-01 podľa XLSM P37396: fantázia, spomienky, erotické
// príbehy, všímavosť, pomalé budovanie očakávania, zraniteľnosť a pochvala.
// Výskumné opory: Brotto et al. (mindfulness a túžba/vzrušenie),
// https://pubmed.ncbi.nlm.nih.gov/34383535/ ; Birnbaum et al. (partnerské
// fantázie a túžba), https://pubmed.ncbi.nlm.nih.gov/30122104/
// Reaudit XLSM riadky 12909–13158 (P35262–P35877): hlas, telefonát,
// list/lístok, rozdiel medzi používanou a želanou formou a partnerova túžba.
// Výskumné opory k digitálnej erotickej komunikácii dospelých:
// https://pubmed.ncbi.nlm.nih.gov/31502070/ a párové dáta
// https://pubmed.ncbi.nlm.nih.gov/26484980/.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POVODNY_POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis'], moznosti: Moznost[] = CHUT): OtazkaBlok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti, predosleMoznosti: POVODNY_POSTOJ,
})

// ── Fyzická príprava a starostlivosť ───────────────────────────────────
const PRIPRAVA: Blok = {
  druh: 'skupina', id: 'priprava', nadpis: 'Fyzická príprava a starostlivosť o telo',
  bloky: [
    {
      druh: 'text',
      id: 'pri_vzhlad_info',
      nadpis: 'Príprava a pocit zo seba',
      telo: 'Starostlivosť o telo, oblečenie, vlasy a drobné detaily môžu podporiť pohodlie a sebavedomie. Rozlíš, čo vyhovuje tebe a čo ťa priťahuje na druhom; nemusia to byť rovnaké veci.',
    },
    {
      druh: 'otazka', id: 'pri_telo', typ: 'viac',
      text: 'Starostlivosť o telo pred intímnymi chvíľami — čo je pre mňa dôležité',
      moznosti: [
        { v: 'kupel', label: 'Kúpeľ alebo sprcha' },
        { v: 'parfum', label: 'Parfum, oleje, krémy' },
        { v: 'vlasy', label: 'Úprava vlasov / brady / pokožky' },
        { v: 'intimne', label: 'Úprava intímnych partií (holenie, strihanie)' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom, som prirodzený/á' },
      ],
    },
    {
      druh: 'otazka', id: 'pri_spolocny_kupel', typ: 'jeden',
      text: 'Spoločný kúpeľ alebo sprcha ako rituál a spoločná chvíľa pred intimitou',
      moznosti: [
        { v: 'ano', label: 'Áno, je to pre mňa ideálny spôsob relaxu a prepojenia' },
        { v: 'mozno', label: 'Možno, záleží na nálade' },
        { v: 'nie', label: 'Nie, radšej sa pripravím sám/sama' },
      ],
    },
    {
      druh: 'otazka',
      id: 'pri_oblecenie_ja',
      typ: 'viac',
      text: 'Čo chcem mať pri intímnych chvíľach na sebe?',
      moznosti: [
        { v: 'bielizen', label: 'Erotická spodná bielizeň' },
        { v: 'kostym', label: 'Kostýmy pre roleplay a hravosť' },
        { v: 'pohodlne', label: 'Pohodlné oblečenie a prirodzenosť' },
        { v: 'nahota', label: 'Nahota s dôrazom na prirodzenosť' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'pri_oblecenie_partner',
      typ: 'viac',
      text: 'Čo ma láka vidieť na partnerovi alebo partnerke?',
      moznosti: [
        { v: 'bielizen', label: 'Erotická spodná bielizeň' },
        { v: 'kostym', label: 'Kostýmy pre roleplay a hravosť' },
        { v: 'pohodlne', label: 'Pohodlné oblečenie a prirodzenosť' },
        { v: 'nahota', label: 'Nahota s dôrazom na prirodzenosť' },
      ],
      inePovolene: true,
    },
    p('pri_sebavedomie', 'Oblečenie / vlasy / detaily, ktoré mi dodávajú sebavedomie, sú pre mňa dôležité', DOLEZITOST),
    {
      druh: 'otazka', id: 'pri_doplnky', typ: 'viac',
      text: 'Doplnky, ktoré mi pri intímnych chvíľach pridávajú na sebavedomí',
      moznosti: [
        { v: 'podpatky', label: 'Podpätky' },
        { v: 'cizmy', label: 'Erotické čižmy' },
        { v: 'bosé', label: 'Bosé nohy / prirodzenosť' },
        { v: 'sperky', label: 'Šperky (náušnice, náhrdelník)' },
        { v: 'ziadne', label: 'Žiadne — bez doplnkov mi je najlepšie' },
      ],
    },
  ],
}

// ── Mentálna príprava a budovanie očakávania ─────────────────────────
const MENTALNA_PRIPRAVA: Blok = {
  druh: 'skupina', id: 'mentalna_priprava', nadpis: 'Mentálna príprava a budovanie očakávania',
  bloky: [
    {
      druh: 'text', id: 'men_info',
      telo:
        'Intimita často nezačína dotykom, ale tým, čomu dovolíme rásť v hlave. Spomienka na silnú chvíľu, tajný scenár, ' +
        'pomalé správy počas dňa alebo vedomé sústredenie na telo môžu meniť obyčajný večer na niečo, na čo sa obaja tešia. ' +
        'Fantázia pritom nie je prísľub ani plán: môže zostať súkromným palivom, byť zdieľaná len sčasti alebo sa stať spoločnou hrou.',
    },
    {
      druh: 'otazka', id: 'men_priprava', typ: 'viac', inePovolene: true,
      text: 'Ako sa psychicky pripravujem na intímne chvíle',
      moznosti: [
        { v: 'fantazirujem', label: 'Nechám v hlave rozvinúť erotickú scénu alebo zakázanú predstavu' },
        { v: 'spomienka', label: g('Vrátim sa k spomienke, pri ktorej som sa cítil príťažlivo a žiadane', 'Vrátim sa k spomienke, pri ktorej som sa cítila príťažlivo a žiadane') },
        { v: 'pribeh', label: 'Vytváram si vlastný príbeh a postupne ho rozvíjam' },
        { v: 'zdielam', label: g('Naznačím partnerke svoju túžbu alebo očakávanie vopred', 'Naznačím partnerovi svoju túžbu alebo očakávanie vopred') },
        { v: 'relaxujem', label: 'Najprv vypnem pracovný režim a uvoľním napätie' },
        { v: 'vsimavost', label: 'Sústredím sa na dych, telo a prítomný okamih' },
        { v: 'bez_pripravy', label: 'Najviac mi vyhovuje spontánnosť bez vedomej prípravy' },
      ],
    },
    {
      druh: 'otazka', id: 'men_aktivity', typ: 'viac', inePovolene: true,
      text: 'Aké mentálne aktivity ma najviac vzrušujú',
      moznosti: [
        { v: 'scenar', label: 'Predstavovanie si konkrétnej scény krok za krokom' },
        { v: 'role_v_mysli', label: 'Hranie inej roly alebo osobnosti vo svojej mysli' },
        { v: 'partner', label: g('Predstava partnerky a toho, čo spolu radi robíme', 'Predstava partnera a toho, čo spolu radi robíme') },
        { v: 'spomienka', label: 'Návrat k skutočnému zážitku, ktorý vo mne stále žije' },
        { v: 'pribeh_media', label: 'Erotický príbeh, hlas, obraz alebo scéna z média' },
        { v: 'tabu', label: 'Predstava niečoho tabu, čo nemusím chcieť uskutočniť' },
        { v: 'tuzba_partner', label: g('Predstava, že ma partnerka silno chce a nevie na mňa prestať myslieť', 'Predstava, že ma partner silno chce a nevie na mňa prestať myslieť') },
      ],
    },
    {
      druh: 'otazka', id: 'men_ocakavanie', typ: 'viac', inePovolene: true,
      text: 'Ako sa u mňa najkrajšie buduje erotické očakávanie počas dňa',
      moznosti: [
        { v: 'blizkost', label: 'Emocionálna blízkosť, pozornosť a drobné prejavy náklonnosti' },
        { v: 'flirt', label: 'Pohľady, dvojsmysly a flirt, ktorému rozumieme len my dvaja' },
        { v: 'spravy', label: 'Krátke správy alebo hlasovky, ktoré nechajú pracovať predstavivosť' },
        { v: 'dotyky', label: 'Nenápadné dotyky bez okamžitého pokračovania' },
        { v: 'slub', label: 'Konkrétny prísľub toho, čo by sa mohlo stať neskôr' },
        { v: 'odklad', label: 'Vedome si blízkosť odkladať a nechať túžbu pomaly hustnúť' },
        { v: 'tajomstvo', label: g('Nevedieť presne, čo partnerka pripravuje', 'Nevedieť presne, čo partner pripravuje') },
      ],
    },
    {
      druh: 'text', id: 'men_sebavedomie_info', nadpis: 'Keď hlava dovolí telu byť žiadané',
      telo: g(
        'Pochvala nemusí byť zdvorilosť a zraniteľnosť nemusí byť slabosť. Môže byť veľmi erotické počuť konkrétne, čo na mne partnerka obdivuje, ukázať jej túžbu bez masky a cítiť, že odpoveďou nie je hodnotenie, ale záujem. Mentálne naladenie môže znamenať aj dovoliť si nebyť dokonalý a napriek tomu sa cítiť vybraný.',
        'Pochvala nemusí byť zdvorilosť a zraniteľnosť nemusí byť slabosť. Môže byť veľmi erotické počuť konkrétne, čo na mne partner obdivuje, ukázať mu túžbu bez masky a cítiť, že odpoveďou nie je hodnotenie, ale záujem. Mentálne naladenie môže znamenať aj dovoliť si nebyť dokonalá a napriek tomu sa cítiť vybraná.',
      ),
    },
    {
      druh: 'otazka', id: 'men_emocie', typ: 'viac', inePovolene: true,
      text: 'Čo mi pomáha cítiť sa odvážne, príťažlivo a otvorene',
      moznosti: [
        { v: 'konkretna_pochvala', label: 'Konkrétna pochvala môjho tela, energie alebo spôsobu dotyku' },
        { v: 'obdiv', label: g('Vidieť v partnerkinom pohľade obdiv a hlad', 'Vidieť v partnerovom pohľade obdiv a hlad') },
        { v: 'vyznanie', label: g('Počuť priamo, po čom na mne partnerka túži', 'Počuť priamo, po čom na mne partner túži') },
        { v: 'zranitelnost', label: 'Môcť priznať fantáziu, neistotu alebo silnú túžbu bez hanby' },
        { v: 'iniciativa', label: 'Urobiť prvý krok a cítiť, že je vítaný' },
        { v: 'prijatie', label: 'Pocit, že nemusím podávať výkon ani vyzerať dokonale' },
      ],
    },
    p('men_hanba', g('Dokážem si všimnúť myšlienku „nie som dosť dobrý" a nenechať ju rozhodovať za mňa', 'Dokážem si všimnúť myšlienku „nie som dosť dobrá" a nenechať ju rozhodovať za mňa'), SCHOPNOST),
    p('men_partner_tuzi', g('Vzrušuje ma, keď partnerka potrebuje dlhšie mentálne naladenie a dovolí mi ho s ňou budovať', 'Vzrušuje ma, keď partner potrebuje dlhšie mentálne naladenie a dovolí mi ho s ním budovať')),
    { zbalitelny: true,
      druh: 'text', id: 'men_myty', nadpis: 'Mýty, ktoré túžbu zbytočne brzdia', ton: 'info',
      telo:
        'Mýtus: skutočná túžba musí prísť sama a okamžite. Realita: u mnohých ľudí sa prebúdza až z blízkosti, predstavivosti, ' +
        'dotyku alebo očakávania. Mýtus: fantázia prezrádza, čo človek tajne chce urobiť. Realita: myseľ môže skúmať moc, ' +
        'novotu či tabu bez túžby preniesť scénu do života. A všímavosť nie je „neerotické cvičenie" — môže pomôcť vrátiť ' +
        'pozornosť z hodnotenia výkonu späť k tomu, čo telo práve cíti.',
    },
  ],
}

// ── Signály pripravenosti ────────────────────────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Signály pripravenosti a očný kontakt',
  bloky: [
    {
      druh: 'text',
      id: 'sig_info',
      telo: 'Dotyky, pohľady a gestá môžu vyjadrovať túžbu bez slov. Očný kontakt môže byť tichým dialógom počas blízkosti, no každému vyhovuje iná intenzita pohľadu, dychu a telesnej odozvy.',
    },
    {
      druh: 'otazka',
      id: 'sig_nepriame',
      typ: 'viac',
      text: 'Nepriame prejavy túžby, ktoré sú mi najpríjemnejšie',
      moznosti: [
        { v: 'dotyky', label: 'Nenápadné dotyky počas bežných aktivít' },
        { v: 'pohlady', label: 'Láskyplné pohľady a úsmevy' },
        { v: 'bozky', label: 'Bozky na ústa alebo iné časti tela' },
      ],
      inePovolene: true,
    },
    { doplnenieId: 'sig_reakcia_ine', inePovolene: true,
      druh: 'otazka',
      id: 'sig_reakcia',
      typ: 'jeden',
      text: 'Ako na teba pôsobia nepriame prejavy túžby, napríklad pohľady, dotyky alebo bozky?',
      napoveda: 'Príjemné gesto nemusí byť pozvaním pokračovať k sexu.',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich — prinášajú do vzťahu iskru' },
        { v: 'prijemne', label: 'Sú mi príjemné a prinášajú do vzťahu iskru' },
        { v: 'podla_nalady', label: 'Záleží na nálade a situácii' },
        { v: 'nepreferujem', label: 'Tieto prejavy nepreferujem' },
      ],
    },

    { doplnenieId: 'sig_frekvencia_ine', inePovolene: true, druh: 'otazka', id: 'sig_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) takéto gestá zažívať',
      moznosti: [
        { v: 'denne', label: 'Denne, ako súčasť každodenného života' },
        { v: 'obcas', label: 'Občas, podľa situácie' },
        { v: 'zriedka', label: 'Zriedka — uprednostňujem iné formy náklonnosti' },
      ],
    },

    { doplnenieId: 'sig_ocny_kontakt_ine', inePovolene: true,
      druh: 'otazka', id: 'sig_ocny_kontakt', typ: 'jeden',
      text: 'Význam očného kontaktu počas intímnych chvíľ',
      moznosti: [
        { v: 'velmi', label: 'Veľmi dôležitý — rád(a) sa pozerám do očí' },
        { v: 'obcas', label: 'Občas, záleží na situácii' },
        { v: 'nie', label: 'Nie, radšej mám oči zatvorené' },
      ],
    },

    {
      druh: 'otazka',
      id: 'sig_pozvanie_formy',
      typ: 'viac',
      text: 'Aké spôsoby pozvania k intimite mi vyhovujú?',
      moznosti: [
        { v: 'telesne', label: 'Telesné náznaky — pohľady, dotyky, priblíženie' },
        { v: 'verbalne', label: 'Slovné náznaky' },
        { v: 'priame', label: 'Priame pozvanie' },
        { v: 'hrave', label: 'Hravé pozvanie' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka', id: 'sig_prechod_penetracia', typ: 'jeden',
      text: 'Ako chcem, aby sme sa dohodli na chvíli prechodu z maznania/predohry k penetrácii',
      moznosti: [
        { v: 'nepriamy_signal', label: 'Nepriamy signál (zmena tempa/dychu, konkrétny dotyk)' },
        { v: 'slovo_otazka', label: 'Krátke slovo alebo otázka nahlas ("teraz?")' },
        { v: 'iniciativa_partnera', label: 'Nechám iniciatívu na partnerovi/ke, sledujem jeho/jej signál' },
        { v: 'plynule', label: 'Nepotrebujem dohodu — cítim, kedy je to prirodzené' },
      ],
    },
  ],
}

// ── Sexting a erotická komunikácia počas dňa ─────────────────────────
const SEXTING: Blok = {
  druh: 'skupina', id: 'sexting', nadpis: 'Sexting a erotická komunikácia počas dňa',
  bloky: [
    {
      druh: 'text',
      id: 'sexting_intro',
      telo: 'Komunikácia počas dňa môže prepájať fantáziu s blízkosťou: hravá správa o spoločných predstavách, krátka hlasovka, nenápadný pohľad či jemný dotyk môžu budovať očakávanie pred stretnutím. Večer sa dá nadviazať rovnakou vetou, vôňou, hudbou alebo gestom.',
    },
    { doplnenieId: 'sex_zaujem_ine', inePovolene: true,
      druh: 'otazka', id: 'sex_zaujem', typ: 'jeden',
      text: 'Záujem o výmenu erotických správ počas dňa',
      moznosti: [
        { v: 'ano', label: g('Áno, rád flirtujem a budujem vzrušenie cez texty', 'Áno, rada flirtujem a budujem vzrušenie cez texty') },
        { v: 'mozno', label: 'Možno, ak je správny kontext a nálada' },
        { v: 'nie', label: 'Nie, preferujem osobný kontakt' },
      ],
    },

    { doplnenieId: 'sex_intenzita_ine', inePovolene: true,
      druh: 'otazka', id: 'sex_intenzita', typ: 'jeden',
      text: 'Preferovaná intenzita správ',
      moznosti: [
        { v: 'naznaky', label: 'Náznaky a jemné flirtovanie' },
        { v: 'priame', label: 'Priame a detailné popisy fantázií' },
      ],
    },

    {
      druh: 'otazka',
      id: 'sex_formy_pouzivam',
      typ: 'viac',
      text: 'Aké formy intímnej komunikácie okrem textových správ už používam?',
      moznosti: [
        { v: 'hlasovka', label: 'Hlasové správy so zvodným tónom' },
        { v: 'telefonat', label: 'Telefonát, v ktorom počujem dych, pauzy a erotický podtón' },
        { v: 'video', label: 'Videohovory na zdieľanie fantázií' },
        { v: 'foto', label: 'Erotická fotografia' },
        { v: 'listocek', label: 'Skrytý odkaz / lístoček v taške' },
        { v: 'list', label: 'Dlhší osobný list s opisom túžby alebo spoločnej spomienky' },
        { v: 'len_text', label: 'Nie, preferujem iba textovú formu' },
        { v: 'ziadne', label: 'Žiadnu z týchto foriem zatiaľ nepoužívam' },
      ],
      inePovolene: true,
      napoveda: 'Tu sa pýtame na súčasnú skúsenosť. Budúca chuť môže byť odlišná.',
    },
    {
      druh: 'otazka', id: 'sex_formy_chcem', typ: 'viac', inePovolene: true,
      text: g('Ktoré formy by som chcel skúsiť alebo zažívať častejšie', 'Ktoré formy by som chcela skúsiť alebo zažívať častejšie'),
      moznosti: [
        { v: 'naznak', label: 'Jedna krátka veta alebo dvojsmysel, ktorý vo mne pracuje celý deň' },
        { v: 'hlasovka', label: 'Hlasovka s dychom, tónom hlasu alebo opisom predstavy' },
        { v: 'telefonat', label: 'Telefonát, pri ktorom sa vzájomne dráždime iba hlasom' },
        { v: 'pribeh', label: 'Správy písané na pokračovanie ako náš spoločný erotický príbeh' },
        { v: 'spomienka', label: 'Pripomenutie konkrétneho zážitku, ku ktorému sa chceme večer vrátiť' },
        { v: 'uloha', label: 'Malá úloha alebo pokyn, ktorý mám splniť pred stretnutím' },
        { v: 'list', label: 'Ručne napísaný list alebo lístok ukrytý tam, kde ho nájdem neskôr' },
        { v: 'foto_video', label: g('Fotografia alebo krátke video vytvorené iba pre partnerku', 'Fotografia alebo krátke video vytvorené iba pre partnera') },
      ],
    },
    {
      druh: 'otazka', id: 'sex_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerka túži po erotických správach, telefonátoch alebo hlasovkách častejšie než ja', 'Keď partner túži po erotických správach, telefonátoch alebo hlasovkách častejšie než ja'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej očakávanie ma vzrušuje a rád jej ho budujem', 'Jeho očakávanie ma vzrušuje a rada mu ho budujem') },
        { v: 'prijimam', label: g('Rád ich prijímam, no menej prirodzene sa mi tvoria vlastné', 'Rada ich prijímam, no menej prirodzene sa mi tvoria vlastné') },
        { v: 'jemne', label: 'Vyhovujú mi náznaky, nie explicitné opisy alebo obrazový obsah' },
        { v: 'obcas', label: 'Láka ma to iba občas, keď mám správne mentálne naladenie' },
        { v: 'osobne', label: g('Jej túžbu chápem, ale erotiku chcem nechať na osobné stretnutie', 'Jeho túžbu chápem, ale erotiku chcem nechať na osobné stretnutie') },
        { v: 'nie', label: 'Táto forma ma eroticky neláka' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'sex_myty', nadpis: 'Mýty o erotických správach', ton: 'info',
      telo:
        'Erotická komunikácia nemusí znamenať fotografie ani explicitné opisy. Pre mnoho párov je silnejšia jedna osobná veta, ' +
        'hlasová pauza alebo pripomenutie spoločného zážitku. A rozdiel medzi tým, kto rád správy prijíma a kto ich rád tvorí, ' +
        'nemusí znamenať rozdiel v túžbe — písanie, hlas a osobný dotyk sú odlišné erotické jazyky.',
    },
  ],
}

// ── Vedome dohodnutá iniciácia + polohy mimo spálne ──────────────────
const INICIACIA: Blok = {
  druh: 'skupina', id: 'iniciacia', nadpis: 'Vedome dohodnutá iniciácia',
  bloky: [
    {
      druh: 'text',
      id: 'ini_dohoda_info',
      telo: 'Môžete sa dohodnúť, kto začína, striedať vedenie alebo si vytvoriť spoločné znamenie, vetu či gesto. Dohoda o iniciovaní a dohoda o dominantnej či prijímajúcej role sú dve odlišné veci; obe možno kedykoľvek zmeniť.',
    },
    {
      druh: 'otazka', id: 'ini_dohoda', typ: 'viac',
      text: 'Formy vedome dohodnutej iniciácie, ktoré ma lákajú',
      moznosti: [
        { v: 'vzajomna', label: 'Vzájomná dohoda, kto dnes začína' },
        { v: 'striedanie', label: 'Striedanie rolí (dominantný / submisívny)' },
        { v: 'ritual', label: 'Spoločný rituál začiatku (znamenie, veta, gesto)' },
      ],
    },
    {
      druh: 'text',
      id: 'ini_mimo_info',
      telo: 'Miesto mimo spálne, hračky alebo podporné pomôcky môžu priniesť nové podoby blízkosti. Vyber si zvlášť miesto a zvlášť pomôcky; experimentovanie nie je povinnosť.',
    },
    {
      druh: 'otazka',
      id: 'ini_polohy_mimo',
      typ: 'viac',
      text: 'Ktoré miesta mimo spálne chcem vyskúšať?',
      moznosti: [
        { v: 'gauc', label: 'Na gauči' },
        { v: 'sprcha', label: 'V sprche alebo vani' },
        { v: 'auto', label: 'V aute' },
        { v: 'vonku', label: 'Vonku (diskrétne)' },
        { v: 'nie', label: 'Nie, radšej zostávam v spálni' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'ini_pomocky_polohy',
      typ: 'viac',
      text: 'Pomôcky pri polohách mimo spálne',
      moznosti: [
        { v: 'vibrator', label: 'Vibrátory na klitoris alebo G-bod' },
        { v: 'bondage', label: 'Bondage pomôcky' },
        { v: 'vankuse', label: 'Polohovacie vankúše' },
        { v: 'nie', label: 'Nie, radšej bez pomôcok' },
      ],
      inePovolene: true,
    },
  ],
}

// ── Dĺžka, tempo a poradie predohry ──────────────────────────────────
const DLZKA_TEMPO: Blok = {
  druh: 'skupina', id: 'dlzka_tempo', nadpis: 'Dĺžka, tempo a poradie predohry',
  bloky: [
    {
      druh: 'otazka', id: 'dt_dlzka', typ: 'jeden',
      text: 'Koľko predohry zvyčajne potrebujem / chcem',
      moznosti: [
        { v: 'quickie', label: 'Quickie — rýchlo k veci' },
        { v: 'stredna', label: 'Stredne dlhá' },
        { v: 'dlha', label: 'Dlhá, „slow" predohra' },
        { v: 'vlny', label: 'Viac krátkych vĺn rozložených počas dňa' },
      ],
    },
    p('dt_tease_denial', 'Vedomé spomalenie — tease & denial, odkladanie penetrácie'),
    p('dt_synchronizacia', 'Sústredenie na dych a synchronizáciu s partnerom'),
    {
      druh: 'text',
      id: 'dt_pauzy_info',
      telo: 'Pauzy pri predohre alebo počas ďalšej intimity môžu prinášať očakávanie, romantiku či hravú frustráciu; iného naopak vyrušia. Môžu byť chvíľou na bozky, hladenie, očný kontakt alebo úplné stíšenie pred návratom k pohybu.',
    },
    {
      druh: 'otazka',
      id: 'dt_pauzy_vnimanie',
      typ: 'jeden',
      text: 'Ako vnímam pauzy počas intímnych chvíľ (na bozky, hladenie, pohľad do očí)?',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich — pridávajú romantiku a očakávanie' },
        { v: 'zalezi', label: 'Záleží na nálade a situácii — občas sú príjemné' },
        {
          v: 'nemam_rad',
          label: { m: 'Nemám ich rád — preferujem plynulé tempo', z: 'Nemám ich rada — preferujem plynulé tempo' },
        },
      ],
    },
    {
      druh: 'otazka',
      id: 'dt_zdrzovanie_zaujem',
      typ: 'jeden',
      text: 'Chcem skúsiť techniky dráždenia a zdržovania?',
      moznosti: [
        { v: 'ano', label: 'Áno — veľmi ma to láka' },
        {
          v: 'mozno',
          label: { m: 'Možno — rád by som to preskúmal', z: 'Možno — rada by som to preskúmala' },
        },
        { v: 'nie', label: 'Nie — takéto hry ma nelákajú' },
      ],
    },
    {
      druh: 'otazka',
      id: 'dt_formy_drazdenia',
      typ: 'viac',
      text: 'Formy dráždenia a zdržovania, ktoré mi vyhovujú',
      moznosti: [
        { v: 'bez_priamej_stimulacie', label: 'Jemné dráždenie bez priamej stimulácie (okolo intímnych miest)' },
        { v: 'kratke_pauzy', label: 'Krátke pauzy počas aktu' },
        { v: 'verbalne_drazdenie', label: 'Verbálne dráždenie — opisovanie, čo príde ďalej' },
        { v: 'kombinacia', label: 'Kombinácia viacerých techník' },
      ],
      inePovolene: true,
    },
    { zbalitelny: true,
      druh: 'text',
      id: 'dt_tipy_zdrzovanie',
      nadpis: 'Tipy na vyskúšanie',
      ton: 'info',
      telo: 'Zdržovanie môže mať viac podôb. Jemné zdržovanie: striedanie dotykov a krátkych prestávok, prípadne vnímanie dychu na pokožke bez dotyku. Spontánna blízkosť: bozk na krk počas bežného večera a krátke odtiahnutie s úsmevom. Kombinovaná predohra: spoločný kúpeľ, masáž a prestávky pri hladení.\n\nĎalšou podobou sú bozky a hladenie mimo citlivých miest, krátke zastavenie počas aktu alebo slovné opisovanie možného pokračovania. Osobitnou preferenciou je prerušenie stimulácie tesne pred orgazmom (edging); nemusí vyhovovať tomu, kto má rád bežné pauzy. Podrobnejšie ho nájdeš v téme Tempo, intenzita a orgazmus.',
    },
    {
      druh: 'otazka', id: 'dt_poradie', typ: 'jeden',
      text: 'Preferované poradie predohry',
      moznosti: [
        { v: 'od_jemneho', label: 'Od jemného k dravému' },
        { v: 'striedanie', label: 'Striedanie intenzity' },
        { v: 'preskocit', label: '„Preskočiť rovno na…" — mám jasný obľúbený krok' },
      ],
    },
    { druh: 'otazka', id: 'dt_prve', typ: 'text', text: 'Čo pre mňa musí prísť ako prvé, aby predohra fungovala:' },
    {
      druh: 'otazka', id: 'dt_pocet_kol', typ: 'jeden',
      text: 'Počet kôl a pauzy',
      moznosti: [
        { v: 'jedno', label: 'Jedno súvislé kolo' },
        { v: 'viac', label: 'Viac kôl s pauzami' },
        { v: 'nezalezi', label: 'Nezáleží, podľa nálady' },
      ],
    },
  ],
}

// ── Mapa predohry ─────────────────────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „4) Predohra, maznanie, petting" —
// hĺbková revízia odhalila veľké množstvo mikro-scén a situačných uhlov,
// ktoré tu chýbali.
const MAPA_PREDOHRY: Blok = {
  druh: 'skupina', id: 'mapa_predohry', nadpis: 'Mapa predohry',
  bloky: [
    { druh: 'otazka', id: 'map_co_sa_pocita', typ: 'text', text: 'Čo pre mňa reálne znamená „predohra" (čo sa tam ráta a čo je už „hlavná časť"):' },
    {
      druh: 'text',
      id: 'map_fyzicka_info',
      telo: 'Predohra zahŕňa atmosféru, prejavy nehy aj telesný kontakt. Bozky na krk, uši, pery či ďalšie časti tela, jemná relaxačná alebo intímna masáž a dotyky na citlivých miestach môžu podporiť očakávanie a emocionálnu blízkosť. Rozlíš, čo chceš prijímať a čo poskytovať; nemusí to byť rovnaké.',
    },
    {
      druh: 'otazka',
      id: 'map_dotyky_prijimam',
      typ: 'viac',
      text: 'Aké dotyky alebo techniky najradšej prijímam počas predohry?',
      moznosti: [
        { v: 'bozky', label: 'Bozkávanie krku, uší a pier' },
        { v: 'masaz', label: 'Jemná masáž šije, chrbta alebo stehien' },
        { v: 'citlive_miesta', label: 'Dotyky na citlivých miestach, napríklad bradavkách alebo vnútorných stehnách' },
        { v: 'skrabkanie', label: 'Jemné škrabkanie nechtami alebo ľahký dotyk pierkom' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka',
      id: 'map_dotyky_poskytujem',
      typ: 'viac',
      text: 'Aké dotyky alebo techniky najradšej poskytujem počas predohry?',
      moznosti: [
        { v: 'bozky', label: 'Bozkávanie tela druhého' },
        { v: 'masaz_hladenie', label: 'Masírovanie a jemné hladenie' },
        { v: 'citlive_miesta', label: 'Dráždenie citlivých miest rukami' },
        { v: 'kombinacia', label: 'Kombinácia jemnosti a intenzívnejších dotykov' },
      ],
      inePovolene: true,
    },
    {
      druh: 'otazka', id: 'map_dlzka', typ: 'jeden',
      text: 'Ideálna dĺžka predohry',
      moznosti: [
        { v: 'kratka', label: 'Krátka' },
        { v: 'stredna', label: 'Stredná' },
        { v: 'dlha', label: 'Dlhá' },
        { v: 'zalezi', label: 'Veľmi závisí od chvíle' },
      ],
    },
    {
      druh: 'otazka', id: 'map_pomer', typ: 'jeden',
      text: 'Pomer „mentálne" (slová, očný kontakt, fantázia) vs. „telesné" (dotyk, trenie)',
      moznosti: [
        { v: 'mentalne', label: 'Viac mentálne' },
        { v: 'telesne', label: 'Viac telesné' },
        { v: 'vyvazene', label: 'Vyvážené' },
      ],
    },
    { druh: 'otazka', id: 'map_turn_off', typ: 'text', text: 'Čo je v predohre pre mňa „turn-off" (vytrhne ma, vypne):' },
  ],
}

// ── Telo na telo — mikro-scény ────────────────────────────────────────
const TELO_NA_TELO: Blok = {
  druh: 'skupina', id: 'telo_na_telo', nadpis: 'Telo na telo — mikro-scény',
  bloky: [
    {
      druh: 'otazka', id: 'tnt_lyzicky', typ: 'viac',
      text: 'Lyžičky (kontakt zozadu) — čo chcem cítiť',
      moznosti: [
        { v: 'pevne_objatie', label: 'Pevné objatie' },
        { v: 'ruky_hrudnik', label: 'Ruky na hrudi' },
        { v: 'ruky_brucho', label: 'Ruky na bruchu' },
        { v: 'ruky_genital', label: 'Ruky na stehnách/genitáliách' },
      ],
    },
    p('tnt_lezanie_na_mne', 'Váha partnera/ky na mne (telo na telo, tlak, dych) je pre mňa vzrušujúca'),
    {
      druh: 'otazka', id: 'tnt_brucho_brucho', typ: 'jeden',
      text: 'Trenie brucho-brucho',
      moznosti: [
        { v: 'cez_pradlo', label: 'Cez prádlo' },
        { v: 'nahi', label: 'Nahí' },
        { v: 'mix', label: 'Mix oboch' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'tnt_len_objatie', typ: 'jeden',
      text: '„Len objatie" ako predohra — viem sa z neho postupne rozbehnúť',
      moznosti: [
        { v: 'ano', label: 'Áno, prirodzene' },
        { v: 'niekedy', label: 'Niekedy, závisí od nálady' },
        { v: 'nie', label: 'Nie, objatie a sex sú pre mňa oddelené' },
      { v: 'dlhe_naladenie', label: 'Dlhšie objatie mi pomáha uvoľniť sa a postupne sa naladiť' },],
    },
    { druh: 'otazka', id: 'tnt_flow', typ: 'text', text: 'Môj ideálny sled krokov „cuddle → bozk → dotyk → …" (kde začať, kedy eskalovať):' },
  ],
}

// ── Masáž ────────────────────────────────────────────────────────────
const MASAZ: Blok = {
  druh: 'skupina', id: 'masaz', nadpis: 'Masáž',
  bloky: [
    {
      druh: 'text', id: 'mas_info', nadpis: 'Dotyková symfónia', ton: 'info',
      telo:
        'Masáž môže byť pokojný prechod z bežného dňa, zmyslová predohra aj intenzívny erotický zážitok. Dlhé ťahy uvoľňujú, presný tlak prebúdza citlivé body a zmena teploty či textúry dáva známemu dotyku nový charakter.',
    },
    { doplnenieId: 'mas_postoj_ine', inePovolene: true,
      druh: 'otazka', id: 'mas_postoj', typ: 'jeden',
      text: 'Ako vnímam masáž ako súčasť predohry',
      moznosti: [
        { v: 'milujem', label: 'Milujem ju — je dôležitou súčasťou intimity' },
        { v: 'obcas', label: 'Občas si ju užívam, ale nepotrebujem ju vždy' },
        { v: 'samostatne', label: 'Mám ju rád(a) skôr ako samostatnú aktivitu' },
        { v: 'nie', label: 'Masáž ma eroticky veľmi neláka' },
      ],
    },

    {
      druh: 'otazka', id: 'mas_typ', typ: 'viac', inePovolene: true,
      text: 'Aké formy masáže by ma oslovili? (Vyber všetky.)',
      moznosti: [
        { v: 'klasicka', label: 'Klasická relaxačná masáž (chrbát, krk, ramená)' },
        { v: 'eroticka', label: 'Erotická masáž zameraná na intímne partie' },
        { v: 'cele_telo', label: 'Pomalá masáž celého tela bez konkrétneho cieľa' },
        { v: 'zmyslova', label: 'Jemná zmyslová masáž s olejmi a textúrami' },
        { v: 'intenzivna', label: 'Intenzívna masáž s pevným tlakom a hnetením' },
        { v: 'pomocky', label: 'Masáž s vibrátorom alebo masážnou pomôckou' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_techniky', typ: 'viac', inePovolene: true,
      text: 'Konkrétne masážne techniky, ktoré ma lákajú',
      moznosti: [
        { v: 'palm_glide', label: 'Plynulé hladenie celou dlaňou (dlhé ťahy)' },
        { v: 'miesenie', label: 'Miesenie a hnetenie (ramená, stehná)' },
        { v: 'macacie_pazuriky', label: '„Mačacie pazúriky" — jemné škrabkanie nechtami' },
        { v: 'skalp', label: 'Masáž vlasovej pokožky/hlavy' },
        { v: 'palce', label: 'Bodový tlak palcami na kríže, bedrá a lopatky' },
        { v: 'predlaktie', label: 'Pomalý tlak predlaktím alebo váhou tela' },
        { v: 'striedanie', label: 'Striedanie jemných ťahov a intenzívneho stláčania' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_materialy', typ: 'viac', inePovolene: true,
      text: 'Aké materiály pri masáži preferujem',
      moznosti: [
        { v: 'hole_ruky', label: 'Holé ruky a maximálny kontakt kože' },
        { v: 'neutralny_olej', label: 'Neutrálny hladký olej' },
        { v: 'aromaticky_olej', label: 'Aromatický olej' },
        { v: 'teply_olej', label: 'Teplý olej' },
        { v: 'pierko', label: 'Pierko alebo jemný štetec' },
        { v: 'hodvab', label: 'Hodvábna šatka alebo jemná textília' },
        { v: 'sviecka', label: 'Masážna sviečka a teplý vosk určený na masáž' },
        { v: 'vibracia', label: 'Vibračná masážna pomôcka' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_oleje', typ: 'jeden',
      text: 'Masážne oleje',
      moznosti: [
        { v: 'oteplujuce', label: 'Otepľujúce' },
        { v: 'chladive', label: 'Chladivé' },
        { v: 'bez_efektu', label: 'Bez špeciálneho efektu, len na kĺzavosť' },
        { v: 'bez_oleja', label: 'Radšej bez oleja' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_kombinacia', typ: 'jeden',
      text: 'Chcem masáž kombinovať s ďalšími technikami (bozkávanie, jemné dotyky)?',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) kombinujem' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'nie', label: 'Nie, preferujem masáž samostatne' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_kombinacie_konkretne', typ: 'viac', inePovolene: true,
      text: 'S čím chcem masáž kombinovať',
      moznosti: [
        { v: 'bozky', label: 'Jemné alebo intenzívne bozky' },
        { v: 'teplota', label: 'Teplý olej, uterák alebo chladný kontrast' },
        { v: 'skrabanie', label: 'Škrabanie nechtami' },
        { v: 'oral', label: 'Orálna stimulácia' },
        { v: 'manualna', label: 'Manuálna stimulácia genitálií' },
        { v: 'bradavky', label: 'Stimulácia pŕs alebo bradaviek' },
        { v: 'vibracia', label: 'Vibrátor alebo masážna pomôcka' },
        { v: 'roleplay', label: 'Roleplay maséra/masérky a klienta/klientky' },
      ],
    },
    {
      druh: 'otazka', id: 'mas_zony', typ: 'viac', inePovolene: true,
      text: 'Ktoré časti tela chcem pri masáži preskúmať',
      moznosti: [
        { v: 'hlava_tvar', label: 'Hlava, tvár a vlasy' },
        { v: 'krk_us', label: 'Krk a uši' },
        { v: 'ramena_chrbat', label: 'Ramená, chrbát a kríže' },
        { v: 'ruky', label: 'Ruky, dlane a prsty' },
        { v: 'hrudnik', label: 'Hrudník, prsia a bradavky' },
        { v: 'brucho_bedra', label: 'Brucho, boky a bedrá' },
        { v: 'zadok_stehna', label: 'Zadok a stehná' },
        { v: 'nohy', label: 'Lýtka, chodidlá a prsty na nohách' },
      ],
    },
    { druh: 'otazka', id: 'mas_kto', typ: 'jeden',
      text: 'Kto zvyčajne masíruje',
      moznosti: [
        { v: 'striedame', label: 'Striedame sa' },
        { v: 'ja_davam', label: 'Radšej dávam ja' },
        { v: 'ja_prijimam', label: 'Radšej prijímam ja' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'mas_experiment', nadpis: 'Experiment: dotyková cesta', ton: 'info',
      telo:
        'Jeden leží so zatvorenými očami a druhý prejde po tele vopred zvoleným poradím: holá dlaň, olej, pierko alebo hodváb, jemný tlak a potom intenzívnejšie hnetenie. ' +
        'Po každom úseku stačí pomenovať pocit ako príjemný, neutrálny alebo rušivý a na konci vybrať tri najvzrušujúcejšie kombinácie.',
    },
    { zbalitelny: true,
      druh: 'text', id: 'mas_myty', nadpis: 'Mýty o masáži', ton: 'info',
      telo:
        'Mýtus: erotická masáž musí vždy smerovať k penetrácii alebo orgazmu. Realita: môže zostať celotelovým zážitkom a byť hlavným aktom sama osebe. ' +
        'Mýtus: masáž má byť iba jemná a relaxačná. Realita: niekoho vzrušuje pevný tlak, nechty, intenzívne hnetenie alebo prudké striedanie tepla a chladu.',
    },
  ],
}

// ── Hravé petting hry ──────────────────────────────────────────────
const HRAVE_HRY: Blok = {
  druh: 'skupina', id: 'hrave_hry', nadpis: 'Hravé petting hry',
  bloky: [
    {
      druh: 'otazka', id: 'hra_cez_oblecenie', typ: 'jeden',
      text: 'Dráždenie cez oblečenie („outercourse")',
      moznosti: [
        { v: 'ako_predohra', label: 'Skvelé ako predohra' },
        { v: 'ako_hlavna', label: 'Môže byť aj samostatná aktivita' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'hra_len_ruky', typ: 'jeden',
      text: '„Len ruky" (bez bozkov, bez úst) ako samostatná hra',
      moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
    },
    {
      druh: 'otazka', id: 'hra_len_usta', typ: 'jeden',
      text: '„Len ústa" (bez rúk) ako samostatná hra',
      moznosti: CHUT, predosleMoznosti: POVODNY_POSTOJ,
    },
    {
      druh: 'otazka', id: 'hra_zakazana_zona', typ: 'jeden',
      text: '„Zakázaná zóna" tease (priblíženie a stiahnutie sa)',
      moznosti: [
        { v: 'laka', label: 'Láka ma, mám rád(a) napätie' },
        { v: 'frustruje', label: 'Skôr ma to frustruje' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
  ],
}

// ── Kombinovaná stimulácia ────────────────────────────────────────
const KOMBINOVANA: Blok = {
  druh: 'skupina', id: 'kombinovana', nadpis: 'Kombinovaná stimulácia',
  bloky: [
    {
      druh: 'text', id: 'kom_info', ton: 'info',
      telo:
        'Kombinovaná stimulácia môže spájať dve ruky na rôznych miestach, ústa a ruku, trenie tiel s hladkaním alebo stabilný rytmus na jednej zóne s meniacim sa podnetom na druhej. ' +
        'Niekomu vrstvenie urýchli vzrušenie, inému vyhovuje postupné pridávanie po jednej vrstve.',
    },
    {
      druh: 'otazka', id: 'kom_konkretne_prijimam', typ: 'viac', inePovolene: true,
      text: 'Ktoré kombinácie chcem prijímať',
      moznosti: [
        { v: 'dve_ruky', label: 'Dve ruky na rôznych miestach tela' },
        { v: 'oral_bradavky', label: 'Orálna stimulácia + bradavky' },
        { v: 'genital_hradza', label: 'Genitálie + hrádza' },
        { v: 'trenie_hladenie', label: 'Trenie pohlavia alebo panvy + hladenie' },
        { v: 'penetracia_klitoris', label: 'Penetrácia + klitoris' },
        { v: 'oral_ruka', label: 'Orál + ruka' },
        { v: 'teplota_dotyk', label: 'Teplota alebo textúra + dotyk' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_konkretne_poskytujem', typ: 'viac', inePovolene: true,
      text: 'Ktoré kombinácie chcem poskytovať',
      moznosti: [
        { v: 'dve_ruky', label: 'Každou rukou stimulovať inú zónu' },
        { v: 'usta_ruka', label: 'Koordinovať ústa a ruku' },
        { v: 'genital_bradavky', label: 'Genitálie + bradavky' },
        { v: 'genital_hradza', label: 'Genitálie + hrádza' },
        { v: 'trenie_hladenie', label: 'Trenie tiel + hladenie' },
        { v: 'staly_plus_zmena', label: 'Na jednej zóne stály rytmus, na druhej meniť podnet' },
      ],
    },
    { druh: 'otazka', id: 'kom_top_prijimam', typ: 'text', text: 'Top kombinácie, ktoré chcem prijímať naraz (napr. genitál + bradavky, genitál + hrádza):' },
    { druh: 'otazka', id: 'kom_top_poskytujem', typ: 'text', text: 'Top kombinácie, ktoré rád(a) poskytujem naraz:' },
    {
      druh: 'otazka', id: 'kom_rytmus', typ: 'jeden',
      text: 'Pri kombinácii uprednostňujem',
      moznosti: [
        { v: 'staly', label: 'Stabilný rytmus na oboch miestach' },
        { v: 'striedanie', label: 'Striedanie — jedna ruka drží rytmus, druhá mení' },
        { v: 'synchron', label: 'Synchronizovať ruky, pery a pohyb tela do jedného rytmu' },
        { v: 'vrstvenie', label: 'Začať jedným podnetom a postupne pridávať ďalšie' },
      ],
    },
    { druh: 'otazka', id: 'kom_too_much', typ: 'text', text: 'Kedy je to pre mňa „too much" (preťaženie, necitlivosť) a ako to má partner/ka spoznať:' },
  ],
}

// ── Teasing cez deň ──────────────────────────────────────────────
const TEASING_DEN: Blok = {
  druh: 'skupina', id: 'teasing_den', nadpis: 'Teasing cez deň — rozšírené',
  bloky: [
    { druh: 'otazka', id: 'tea_priklady_viet', typ: 'text', text: 'Konkrétne príklady viet/správ, ktoré ma cez deň najviac zapnú:' },
    {
      druh: 'otazka', id: 'tea_smeruje_k_planu', typ: 'jeden',
      text: 'Majú správy smerovať k večernému plánu, alebo sú len flirt bez záväzku',
      moznosti: [
        { v: 'plan', label: 'Radšej smerujú k jasnému plánu' },
        { v: 'flirt', label: 'Len flirt, bez záväzku' },
      ],
    },
    {
      druh: 'otazka', id: 'tea_mikro_dotyky', typ: 'viac',
      text: 'Mikro-dotyky doma počas dňa, ktoré ma najviac zapnú',
      moznosti: [
        { v: 'prsty_telo', label: 'Prejdenie prstami po tele' },
        { v: 'stisk_zadku', label: 'Stisk zadku' },
        { v: 'bozk_krk', label: 'Bozk na krk' },
      ],
    },
    p('tea_nebrat_osobne', 'Keď na teaser rituál nereagujem, chcem, aby partner/ka to nebral(a) osobne', DOLEZITOST),
  ],
}

// ── Signály nálady ──────────────────────────────────────────────
const SIGNALY_NALADY: Blok = {
  druh: 'skupina', id: 'signaly_nalady', nadpis: 'Signály nálady',
  bloky: [
    {
      druh: 'text', id: 'sig_neverbalne_info', ton: 'info',
      telo:
        'Pohľad, dych, zvuk a pohyb tela tvoria vlastný jazyk. Spomalený dych môže predĺžiť napätie, zrýchlený dych dodať rytmus a pritiahnutie panvy ukázať, aký smer alebo tlak telo práve vyhľadáva.',
    },
    {
      druh: 'otazka', id: 'sig_neverbalne', typ: 'viac', inePovolene: true,
      text: 'Ktoré neverbálne prejavy ma počas predohry najviac vzrušujú',
      moznosti: [
        { v: 'oci', label: 'Dlhý pohľad do očí' },
        { v: 'pohlad_telo', label: 'Sledovanie partnerovho tela alebo pohlavia' },
        { v: 'pomaly_dych', label: 'Spomalený spoločný dych' },
        { v: 'vzdychy', label: 'Vzdychy, stonanie a zvuky vzrušenia' },
        { v: 'pritiahnutie', label: 'Pritiahnutie tela bližšie' },
        { v: 'pohyb_panvy', label: 'Pohyb panvy proti dotyku' },
        { v: 'vedenie_ruky', label: 'Vedenie partnerovej ruky vlastným telom' },
      ],
    },
    { druh: 'otazka', id: 'sig_chcem_ta', typ: 'text', text: 'Môj najlepší signál „chcem ťa" (konkrétne slovo/dotyk/pohľad):' },
    { druh: 'otazka', id: 'sig_dnes_jemne', typ: 'text', text: 'Ako mám dať najavo „dnes jemne" (a čo to pre mňa znamená v praxi):' },
    { druh: 'otazka', id: 'sig_dnes_rychlo', typ: 'text', text: 'Ako mám dať najavo „dnes rýchlo" (a čo aj tak musí zostať — bozk, slová, aftercare):' },
    { druh: 'otazka', id: 'sig_dnes_nie_objatie', typ: 'text', text: 'Čo chcem počuť, keď poviem „dnes nie, ale objatie áno", aby som to nebral(a) ako odmietnutie:' },
  ],
}

// ── Vyzliekanie a odhalenie ───────────────────────────────────────
const VYZLIEKANIE: Blok = {
  druh: 'skupina', id: 'vyzliekanie', nadpis: 'Vyzliekanie a odhalenie',
  bloky: [
    {
      druh: 'otazka', id: 'vyz_tempo', typ: 'jeden',
      text: 'Preferované tempo vyzliekania',
      moznosti: [
        { v: 'pomale', label: 'Pomalé, postupné, s bozkom na každú časť' },
        { v: 'rychle', label: 'Rýchlo, rovno k nahote' },
      ],
    },
    { druh: 'otazka', id: 'vyz_necha_obleceneho', typ: 'text', text: 'Čo by som chcel(a), aby partner/ka nechal(a) na sebe oblečené (prádlo, podpätky, tričko):' },
    p('vyz_striptease', 'Striptíz / predvedenie tela ma láka'),
  ],
}

// ── Naladenie po konflikte a špeciálne kontexty ──────────────────────
const KONFLIKT: Blok = {
  druh: 'skupina', id: 'konflikt', nadpis: 'Naladenie po konflikte a špeciálne kontexty',
  bloky: [
    {
      druh: 'text', id: 'kon_info', ton: 'info',
      telo:
        'Rovnaká predohra nemusí fungovať po konflikte, s novým partnerom, pri únave, zdravotnom obmedzení ani vo vzťahu s viacerými ľuďmi. Kontext mení tempo, mieru novosti aj to, či človek potrebuje najprv slová, ticho, humor, masáž alebo iba blízkosť.',
    },
    {
      druh: 'otazka', id: 'kon_zmierovaci', typ: 'jeden',
      text: '„Zmierovací" sex po hádke',
      moznosti: [
        { v: 'ano', label: 'Áno, pomáha nám to sa zblížiť' },
        { v: 'doriesit', label: 'Potrebujem najprv konflikt doriešiť' },
        { v: 'nie', label: 'Nie, po hádke nie som naladený/á' },
      ],
    },
    {
          druh: 'otazka', id: 'kon_prepnutie', typ: 'jeden',
          text: 'Ako mi vyhovuje dohodnutý signál alebo rituál návratu k blízkosti po hádke?',
          predosleMoznosti: POVODNY_POSTOJ,
          moznosti: [
            { v: 'pomohol', label: 'Pomohol by mi' },
            { v: 'otvoreny', label: g('Som tomu otvorený', 'Som tomu otvorená') },
            { v: 'nepotrebujem', label: 'Nepotrebujem ho, vieme prejsť plynule' },
            { v: 'umele', label: 'Znie mi to príliš umelo' },
          ],
        },
    {
      druh: 'otazka', id: 'kon_po_konflikte', typ: 'viac', inePovolene: true,
      text: 'Čo mi po konflikte pomáha prepnúť späť k blízkosti',
      moznosti: [
        { v: 'rozhovor', label: 'Najprv krátky rozhovor a pomenovanie napätia' },
        { v: 'objatie', label: 'Dlhé objatie bez ďalšieho cieľa' },
        { v: 'sprcha', label: 'Spoločná sprcha alebo kúpeľ ako zmena režimu' },
        { v: 'masaz', label: 'Masáž chrbta, rúk alebo chodidiel' },
        { v: 'humor', label: 'Humor a hravosť' },
        { v: 'priamost', label: 'Priama, vášnivá energia' },
        { v: 'odstup', label: 'Najprv čas a priestor pre seba' },
      ],
    },
    { povodnyJeden: true, inePovolene: true,
      druh: 'otazka', id: 'kon_zdravotne', typ: 'viac',
      text: 'Predohra pri zdravotnom obmedzení / únave — čo pomáha',
      moznosti: [
        { v: 'jemnejsie', label: 'Jemnejšie techniky, nižšie tempo' },
        { v: 'ine_polohy', label: 'Prispôsobenie polôh' },
        { v: 'opory', label: 'Vankúše, opora tela a menší rozsah pohybu' },
        { v: 'kratko', label: 'Kratší, ale intenzívny zážitok' },
        { v: 'bez_penetracie', label: 'Intimita bez penetrácie' },
        { v: 'nesexualne', label: 'Radšej nesexuálna blízkosť v takej chvíli' },
      ],
    },
    {
      druh: 'otazka', id: 'kon_novota', typ: 'jeden',
      text: 'Predohra v novom prostredí (hotel, roleplay)',
      moznosti: [
        { v: 'viac_experimentu', label: 'Chcem viac experimentu' },
        { v: 'bezpecny_default', label: 'Radšej známy a predvídateľný postup' },
      ],
    },
    {
          druh: 'otazka', id: 'kon_kontext', typ: 'viac', vylucneMoznosti: ['ziadne'],
          text: 'Ktoré ďalšie kontexty predohry chcem preskúmať?',
          moznosti: [
            { v: 'novy', label: 'Začiatok s novým človekom' },
            { v: 'viac', label: 'Intimita s viacerými ľuďmi' },
            { v: 'ziadne', label: 'Žiadne — zostávam pri nás dvoch' },
          ],
        },
        { podmienka: { ot: 'kon_kontext', obsahuje: 'novy' },
      druh: 'otazka', id: 'kon_novy_partner', typ: 'jeden',
      text: 'S novým partnerom/partnerkou mi pri predohre najviac vyhovuje',
      moznosti: [
        { v: 'pomaly', label: 'Pomalé objavovanie po jednej technike' },
        { v: 'priama_otvorenost', label: 'Priamo hovoriť a ukazovať, čo funguje' },
        { v: 'hravost', label: 'Hravosť, smiech a experimentovanie' },
        { v: 'znama_schema', label: 'Začať tým, čo už dobre poznám' },
        { v: 'spontanne', label: 'Spontánnosť bez pevného scenára' },
      ],
    },
    { podmienka: { ot: 'kon_kontext', obsahuje: 'viac' },
      druh: 'otazka', id: 'kon_viac_partnerov', typ: 'viac', inePovolene: true,
      text: 'Pri intimite s viacerými partnermi mi pomáha',
      moznosti: [
        { v: 'pozornost', label: 'Vedome deliť pozornosť medzi ľudí' },
        { v: 'jeden_stred', label: 'Mať chvíľu jedného človeka v centre' },
        { v: 'striedanie', label: 'Striedať dvojice a role' },
        { v: 'spolocny_rytmus', label: 'Nájsť spoločný rytmus celej skupiny' },
        { v: 'slova', label: 'Priebežne pomenúvať túžby a ďalší krok' },
        { v: 'pozorovanie', label: 'Chvíľu iba pozorovať a potom sa zapojiť' },
      ],
    },
    { povodnyText: true, inePovolene: true, moznosti: [
    { v: 'objatie', label: 'Objatie a ležanie blízko seba' },
    { v: 'bozky', label: 'Pomalé bozky' },
    { v: 'masaz', label: 'Krátka masáž chrbta, rúk alebo chodidiel' },
    { v: 'sprcha', label: 'Spoločná sprcha alebo kúpeľ' },
    { v: 'dotyky', label: 'Dotyky bez penetrácie' },
    { v: 'rozhovor', label: 'Rozhovor a chvíľa pozornosti' },
    { v: 'oddych', label: 'Radšej len oddych bez intímneho rituálu' },
  ], druh: 'otazka', id: 'kon_kratky_ritual', typ: 'viac', text: "Čo mi pri únave vyhovuje ako krátky intímny rituál?" },
    {
      druh: 'otazka', id: 'kon_reaktivny_start', typ: 'jeden',
      text: 'Keď chuť hneď nie je — aký začiatok mi sedí',
      moznosti: [
        { v: 'skusme_uvidime', label: '„Skúsme 5 minút a uvidíme"' },
        { v: 'jasne_nie', label: 'Radšej jasné „dnes nie" bez skúšania' },
      ],
    },
    { povodnyText: true, inePovolene: true, moznosti: [
    { v: 'objatie', label: 'Ležanie v objatí alebo lyžičky' },
    { v: 'ruka', label: 'Držanie za ruku, napríklad pri filme' },
    { v: 'masaz', label: 'Masáž bez sexuálneho pokračovania' },
    { v: 'kupel', label: 'Spoločný kúpeľ alebo sprcha' },
    { v: 'rozhovor', label: 'Hlboký rozhovor' },
    { v: 'maznanie', label: 'Nesexuálne hladkanie a maznanie' },
  ], druh: 'otazka', id: 'kon_len_blizkost', typ: 'viac', text: "Čo pre mňa znamená blízkosť bez sexu?" },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const PREDOHRA_NALADENIE: TemaObsah = {
  slug: 'predohra-stupnovanie/predohra-stupnovanie',
  nadpis: 'Predohra a naladenie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Naladenie ako súčasť zážitku',
      telo:
        'Predohra nezačína v posteli — začína starostlivosťou o telo, nepriamymi signálmi počas dňa a spoločným ' +
        'rituálom, ktorý oznámi „som pripravený/á". Táto téma sa venuje príprave, tempu a poradiu predohry.',
    },
    {
      druh: 'text', id: 'odkazy', nadpis: 'Súvisiace témy', ton: 'info',
      telo:
        'Zmyslová hra (zrak, sluch, čuch, chuť, hmat) má vlastnú tému „Zmyslová hra". Prostredie a atmosféra ' +
        'majú vlastnú tému „Prostredie a atmosféra". Denné rituály a antirutina sú v téme „Dlhodobá intimita vo vzťahu".',
    },
  ],
  telo: [
    PRIPRAVA,
    MENTALNA_PRIPRAVA,
    SIGNALY,
    MAPA_PREDOHRY,
    TELO_NA_TELO,
    MASAZ,
    HRAVE_HRY,
    KOMBINOVANA,
    SEXTING,
    TEASING_DEN,
    SIGNALY_NALADY,
    VYZLIEKANIE,
    INICIACIA,
    DLZKA_TEMPO,
    KONFLIKT,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
