import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Libido a chuť — okruh „libido-chut" v module A1 „Mentálna príprava,
// túžba a dlhodobá intimita".
// Zdroj: „05_Tuzba_a_libido.docx" bol prázdny (len názov, žiadny obsah) —
// táto téma je preto napísaná od základu podľa existujúceho L4 seedu modulu
// (úroveň túžby, rozdiel medzi nami, spontánna vs responzívna, čo chuť
// spúšťa/zabíja). Mechanika situačných spúšťačov a bŕzd (dual control model)
// má vlastnú tému „Brzdy a spúšťače vzrušenia" — tu je dôraz na úroveň
// a dlhodobú dynamiku túžby medzi partnermi, nie na jednotlivé situácie.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'silne_platia', label: 'Silne to na mňa platí' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'vobec', label: 'Vôbec' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Úroveň túžby ─────────────────────────────────────────────────────
const UROVEN: Blok = {
  druh: 'skupina', id: 'uroven', nadpis: 'Úroveň túžby',
  bloky: [
    {
      druh: 'otazka', id: 'uro_frekvencia', typ: 'jeden',
      text: 'Ako často by som si ideálne želal(a) intimitu (akéhokoľvek druhu)',
      moznosti: [
        { v: 'denne', label: 'Denne alebo takmer denne' },
        { v: 'niekolkokrat_tyzdenne', label: 'Niekoľkokrát týždenne' },
        { v: 'tyzdenne', label: 'Približne raz týždenne' },
        { v: 'mesacne', label: 'Niekoľkokrát mesačne' },
        { v: 'zriedka', label: 'Zriedka, nie je to pre mňa prioritou' },
      ],
    },
    {
      druh: 'otazka', id: 'uro_zmena', typ: 'jeden',
      text: 'Ako sa moja túžba mení v čase',
      moznosti: [
        { v: 'stabilna', label: 'Je pomerne stabilná' },
        { v: 'kolisa_kratkodobo', label: 'Kolíše v priebehu dní/týždňov (cyklus, nálada)' },
        { v: 'klesa_dlhodobo', label: 'Dlhodobo klesá' },
        { v: 'rastie_dlhodobo', label: 'Dlhodobo rastie' },
      ],
    },
    {
      druh: 'text', id: 'uro_synchronia', ton: 'info',
      telo:
        '30-dňový denníkový výskum 133 párov (Vowels, Mark a kol., 2018) zistil, že túžba u väčšiny ľudí ' +
        'kolíše pravidelne — zhruba raz až dvakrát mesačne — a je stabilná len na obdobia do 3 dní. U väčšiny ' +
        'párov toto kolísanie prebieha dokonca súbežne (synchrónne). Nesúlad v konkrétny deň je preto skôr ' +
        'štatistická náhoda než znak problému vo vzťahu.',
    },
    {
      druh: 'otazka', id: 'uro_styl', typ: 'viac', inePovolene: true,
      text: 'Aký štýl intimity mi najviac sedí (môžeš vybrať viac)',
      moznosti: [
        { v: 'romanticky', label: 'Romantický, pomalý' },
        { v: 'vasnivy', label: 'Vášnivý, naliehavý' },
        { v: 'hravy', label: 'Hravý, so smiechom' },
        { v: 'ritualizovany', label: 'Ritualizovaný — vždy podobný postup' },
        { v: 'spontanny', label: 'Spontánny, rôzny zakaždým' },
      ],
    },
  ],
}

// ── Asexuálne spektrum ────────────────────────────────────────────────
const ASEXUALITA: Blok = {
  druh: 'skupina', id: 'asexualita', nadpis: 'Ak sexuálna túžba chýba takmer úplne',
  uvod:
    'Pre časť ľudí nejde len o „nižšiu" chuť, ale o jej takmer úplnu neprítomnosť — to je legitímna súčasť ' +
    'ľudskej sexuality (asexuálne spektrum), nie porucha, ktorú treba opraviť.',
  bloky: [
    {
      druh: 'otazka', id: 'asex_identifikacia', typ: 'jeden',
      text: 'Ako by som opísal(a) svoju sexuálnu túžbu k druhým ľuďom',
      moznosti: [
        { v: 'bezna', label: 'Bežne ju cítim, sedí na mňa nič z tohto' },
        { v: 'len_vztah', label: '„Demisexuálne" — túžbu cítim len k ľuďom, s ktorými mám hlbokú citovú väzbu' },
        { v: 'zriedkava', label: '„Graysexuálne" — cítim ju len zriedka alebo veľmi slabo' },
        { v: 'takmer_nikdy', label: 'Takmer nikdy necítim sexuálnu príťažlivosť k nikomu (asexuálne)' },
      ],
    },
    {
      druh: 'text', id: 'asex_romanticka', ton: 'info',
      telo:
        'Sexuálna a romantická príťažlivosť sú dve oddelené veci. Človek môže byť asexuálny a zároveň túžiť ' +
        'po romantickom vzťahu, blízkosti, bozkoch a objatí — alebo naopak, sex si užívať bez potreby romantiky.',
    },
    {
      druh: 'otazka', id: 'asex_romanticka_tuzba', typ: 'jeden',
      text: 'Bez ohľadu na sex — po akej blízkosti túžim',
      moznosti: [
        { v: 'romanticka_aj_fyzicka', label: 'Romantická aj nesexuálna fyzická blízkosť (objatie, bozky)' },
        { v: 'len_romanticka', label: 'Len romantická/citová, fyzický kontakt ma neláka' },
        { v: 'len_priatelska', label: 'Skôr hlboké priateľstvo než romantika' },
      ],
    },
    { druh: 'otazka', id: 'asex_partnerovi', typ: 'text', text: 'Čo by som chcel(a), aby o tomto partner/ka vedel(a) alebo pochopil(a):' },
  ],
}

// ── Rozdiel medzi nami ────────────────────────────────────────────────
const ROZDIEL: Blok = {
  druh: 'skupina', id: 'rozdiel', nadpis: 'Rozdiel medzi nami',
  bloky: [
    {
      druh: 'text', id: 'rozdiel_info', ton: 'info',
      telo:
        'Rozdielna úroveň túžby medzi partnermi je bežná a sama osebe nie je problém — problémom sa stáva ' +
        'až vtedy, keď sa o nej mlčí alebo sa berie osobne.',
    },
    {
      druh: 'otazka', id: 'roz_kto_castejsie', typ: 'jeden',
      text: 'V našom páre obvykle',
      moznosti: [
        { v: 'ja_castejsie', label: 'Ja mám častejšie väčšiu chuť' },
        { v: 'partner_castejsie', label: 'Partner/ka má častejšie väčšiu chuť' },
        { v: 'strieda_sa', label: 'Strieda sa to podľa obdobia' },
        { v: 'podobne', label: 'Sme si celkom podobní/é' },
      ],
    },
    p('roz_osobne', 'Keď má partner/ka menšiu chuť, dokážem to nebrať osobne (nie je to o mojej príťažlivosti)'),
    {
      druh: 'text', id: 'roz_vyskum', ton: 'info',
      telo:
        'Výskum 229 dlhodobých párov (Vowels & Mark, 2020) ukázal 17 rôznych stratégií zvládania rozdielnej ' +
        'chuti — a stratégie, ktoré zapájajú OBOCH partnerov (komunikácia, spoločná iná aktivita, „mať sex aj tak"), ' +
        'vedú k vyššej spokojnosti než samotárske stratégie (masturbácia sólo) alebo úplné odpútanie sa („nič nerobiť").',
    },
    {
      druh: 'otazka', id: 'roz_riesenie', typ: 'viac',
      text: 'Čo nám pri rozdielnej chuti pomáha (vyber všetko, čo sedí)',
      moznosti: [
        { v: 'rozhovor', label: 'Pravidelný otvorený rozhovor o tom, bez obviňovania' },
        { v: 'planovanie', label: 'Naplánovanie konkrétneho termínu namiesto čakania na spontánnu chuť oboch naraz' },
        { v: 'iny_akt', label: 'Iná forma intimity namiesto plného sexu (orál, ruky, hračky)' },
        { v: 'blizkost_bez_sexu', label: 'Fyzická blízkosť bez sexu (masáž, spoločná sprcha, objatie)' },
        { v: 'spusobit_chut', label: 'Partner s väčšou chuťou sa snaží jemne „nadchnúť" toho druhého (dotyk, nálada), nie tlačiť' },
        { v: 'kompromis', label: 'Hľadanie strednej cesty (frekvencia aj forma)' },
        { v: 'solo_s_ohladom', label: 'Sólo aktivita (masturbácia) s ohľaduplným vysvetlením, nie ako odmietnutie partnera' },
        { v: 'pockat', label: 'Jednoducho počkať, kým chuť príde sama — a byť s tým v pohode' },
      ],
    },
  ],
}

// ── Spontánna vs responzívna túžba ────────────────────────────────────
const TYP_TUZBY: Blok = {
  druh: 'skupina', id: 'typ_tuzby', nadpis: 'Spontánna vs responzívna túžba',
  bloky: [
    {
      druh: 'text', id: 'typ_info',
      telo:
        'Spontánna túžba príde sama, „znenazdajky". Responzívna túžba príde až v reakcii na podnet alebo dotyk — ' +
        'nie je horšia ani menej „reálna", len má iné poradie (najprv aktivita, potom chuť).',
    },
    {
      druh: 'otazka', id: 'typ_moj', typ: 'jeden',
      text: 'Ktorý typ prevažne opisuje mňa',
      moznosti: [
        { v: 'spontanna', label: 'Prevažne spontánna' },
        { v: 'responzivna', label: 'Prevažne responzívna' },
        { v: 'oboje', label: 'Kombinácia, závisí od obdobia' },
      ],
    },
    p('typ_akceptacia', 'Chcem, aby sme obaja akceptovali, že „začať bez plnej chuti" a nechať ju prísť je v poriadku'),
  ],
}

// ── Čo chuť dlhodobo živí ──────────────────────────────────────────
const ZIVI: Blok = {
  druh: 'skupina', id: 'zivi', nadpis: 'Čo moju chuť dlhodobo živí',
  bloky: [
    {
      druh: 'otazka', id: 'ziv_co', typ: 'viac', inePovolene: true,
      text: 'Čo dlhodobo udržiava moju chuť na intimitu (nie jednorazový spúšťač, ale trvalejšia podmienka)',
      moznosti: [
        { v: 'kvalita_vztahu', label: 'Celková kvalita a pohoda vzťahu' },
        { v: 'ocenenie', label: 'Pocit, že som ocenený/á mimo postele' },
        { v: 'oddych', label: 'Dostatok odpočinku a spánku' },
        { v: 'spravodlivost', label: 'Pocit spravodlivo rozdelenej domácej/mentálnej záťaže' },
        { v: 'telo_pohoda', label: 'Pohoda vo vlastnom tele' },
        { v: 'novota_dlhodobo', label: 'Pravidelná novota a spoločné zážitky (nielen v posteli)' },
      ],
    },
  ],
}

// ── Čo ju spoľahlivo zabíja ─────────────────────────────────────────
const ZABIJA: Blok = {
  druh: 'skupina', id: 'zabija', nadpis: 'Čo moju chuť dlhodobo zabíja',
  bloky: [
    {
      druh: 'otazka', id: 'zab_co', typ: 'viac', inePovolene: true,
      text: 'Čo dlhodobo najviac tlmí moju túžbu',
      moznosti: [
        { v: 'chronicky_stres', label: 'Chronický stres alebo preťaženie' },
        { v: 'pocit_povinnosti', label: 'Pocit, že sex je „povinnosť" alebo úloha na zoznam' },
        { v: 'nespravodlivost', label: 'Dlhodobý pocit nespravodlivosti vo vzťahu' },
        { v: 'nedostatok_nezhodnutia', label: 'Nedostatok nesexuálnej blízkosti a pozornosti' },
        { v: 'rutina_dlhodobo', label: 'Dlhodobá rutina bez zmeny' },
        { v: 'zdravie', label: 'Zdravotné alebo hormonálne faktory' },
      ],
    },
    { druh: 'otazka', id: 'zab_najsilnejsie', typ: 'text', text: 'Ktorý jeden faktor je u mňa aktuálne najsilnejší:' },
  ],
}

// ── Komunikácia o rozdielnom libide ────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina', id: 'komunikacia', nadpis: 'Ako o tom hovoríme',
  bloky: [
    {
      druh: 'otazka', id: 'kom_kedy', typ: 'jeden',
      text: 'Kedy je najlepší čas hovoriť o rozdielnej chuti',
      moznosti: [
        { v: 'mimo_postele', label: 'Mimo spálne, v pokojnej chvíli — nie tesne po odmietnutí' },
        { v: 'pravidelne', label: 'Pravidelne, ako súčasť bežného „check-inu" o vzťahu' },
        { v: 'ked_treba', label: 'Len keď to začne byť problém' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) o mojej túžbe (1–3 vety):' },
  ],
}

export const LIBIDO_CHUT: TemaObsah = {
  slug: 'mentalna-priprava-tuzba/libido-chut',
  nadpis: 'Libido a chuť',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Rozdielna chuť je normálna',
      telo:
        'Takmer v každom páre má niekto väčšinou vyššiu a niekto nižšiu chuť na sex. Cieľom nie je ' +
        '„vyrovnať" sa, ale poznať vlastnú úroveň, pomenovať rozdiel a nájsť spoločnú reč.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Konkrétne situačné spúšťače a brzdy vzrušenia (dual control model) má vlastná téma „Brzdy a spúšťače vzrušenia".',
    },
  ],
  telo: [
    UROVEN,
    ASEXUALITA,
    ROZDIEL,
    TYP_TUZBY,
    ZIVI,
    ZABIJA,
    KOMUNIKACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — cieľom je porozumenie, nie porovnávanie „kto má väčšiu chuť".',
    },
  ],
}
