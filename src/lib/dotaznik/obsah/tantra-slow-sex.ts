import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Tantra, slow sex a spiritualita — nový modul A7 (doplnený nad rámec
// pôvodného návrhu, doména A „Naladenie a rámec").
// Zdroj: „dotaznik.xlsx" (list „20) Tantra / slow sex / spiritualita" —
// otvorená otázková banka M/Ž, prevedená do štruktúrovaných otázok v
// štýle zvyšku dotazníka). Nastavenie piliera (spirituálne vs praktické,
// „bez výkonu"), dych spolu, očný kontakt, pomalé dotyky, „no-goal" dotyk,
// meditácia pred intimitou, energia a flow, ukotvenie po (aftercare ako
// rituál), doplnkové mikrotémy (slow teasing, vedené vedenie, symbolika).
// z/m verzia zrkadlová.
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

// ── Nastavenie piliera ────────────────────────────────────────────────
const NASTAVENIE: Blok = {
  druh: 'skupina', id: 'nastavenie', nadpis: 'Nastavenie piliera — čo pre nás „tantra/slow sex" znamená',
  bloky: [
    {
      druh: 'otazka', id: 'nas_co_znamena', typ: 'viac',
      text: 'Keď poviem „tantra/slow sex", predstavím si',
      moznosti: [
        { v: 'dych', label: 'Dych' },
        { v: 'pritomnost', label: 'Prítomnosť' },
        { v: 'jemnost', label: 'Jemnosť' },
        { v: 'energia', label: 'Energiu' },
        { v: 'ritual', label: 'Rituál' },
        { v: 'spiritualita', label: 'Spiritualitu' },
        { v: 'bez_orgazmu', label: 'Sex bez cieľa orgazmu' },
        { v: 'dlhy_cas', label: 'Dlhý čas' },
      ],
    },
    {
      druh: 'otazka', id: 'nas_ramovanie', typ: 'jeden',
      text: 'Je to pre mňa skôr',
      moznosti: [
        { v: 'spiritualne', label: '„Spirituálne" (energia, rituál, posvätnosť)' },
        { v: 'prakticke', label: '„Praktické" (pomalšie tempo, viac vnímania)' },
        { v: 'oboje', label: 'Kombinácia oboch' },
      ],
    },
    { druh: 'otazka', id: 'nas_pritazlive_cringe', typ: 'text', text: 'Čo je pre mňa na tejto téme príťažlivé a čo je „cringe/NO":' },
    {
      druh: 'otazka', id: 'nas_ako_pouzivat', typ: 'viac',
      text: 'Chcel(a) by som to používať ako',
      moznosti: [
        { v: 'ritual', label: 'Občasný špeciálny rituál' },
        { v: 'liek_na_stres', label: '„Liek" na stres' },
        { v: 'prepojenie', label: 'Spôsob, ako sa viac prepojiť' },
        { v: 'trening_citlivosti', label: 'Tréning citlivosti' },
      ],
    },
    {
      druh: 'otazka', id: 'nas_realisticky_cas', typ: 'jeden',
      text: 'Koľko času je pre mňa „slow" realistické',
      moznosti: [
        { v: '10', label: '10 minút' },
        { v: '30', label: '30 minút' },
        { v: '60', label: '60 minút' },
        { v: '120', label: '120 minút a viac' },
      ],
    },
    {
      druh: 'otazka', id: 'nas_ziadny_vykon', typ: 'jeden',
      text: 'Pravidlo „žiadny výkon"',
      moznosti: [
        { v: 'nie_je_ciel', label: 'Orgazmus nie je cieľ' },
        { v: 'prirodzene', label: 'Môže prísť prirodzene, nič sa neplánuje' },
        { v: 'chcem_orgazmus', label: 'Chcem, aby orgazmus zostal súčasťou' },
      ],
    },
  ],
}

// ── Dych spolu ─────────────────────────────────────────────────────
const DYCH: Blok = {
  druh: 'skupina', id: 'dych', nadpis: 'Dych spolu',
  bloky: [
    p('dyc_sexy', 'Spoločný dych vnímam ako sexy (nie ako zvláštny)'),
    {
      druh: 'otazka', id: 'dyc_typ', typ: 'jeden',
      text: 'Aký typ dychu je pre mňa OK',
      moznosti: [
        { v: 'prirodzene', label: 'Len prirodzené dýchanie spolu' },
        { v: 'vedene', label: '„Vedené" — pomalšie, hlbšie' },
        { v: 'ticho', label: 'Radšej v tichu, bez vedenia' },
      ],
    },
    {
      druh: 'otazka', id: 'dyc_dlzka', typ: 'jeden',
      text: 'Preferovaná dĺžka',
      moznosti: [
        { v: 'kratky', label: 'Krátky „štart" (1–3 min)' },
        { v: 'dlhsi', label: 'Dlhší rituál (5–15 min)' },
      ],
    },
    {
      druh: 'otazka', id: 'dyc_kontakt', typ: 'jeden',
      text: 'Fyzický kontakt pri dychu',
      moznosti: [
        { v: 'ano', label: 'Áno (dlaň na hrudi, objatie, čelo na čelo)' },
        { v: 'nie', label: 'Radšej bez dotyku' },
      ],
    },
    { druh: 'otazka', id: 'dyc_limity', typ: 'text', text: 'Zdravotné limity, ktoré treba pri dychu rešpektovať (úzkosť, panika, astma):' },
  ],
}

// ── Očný kontakt ──────────────────────────────────────────────────
const OCNY_KONTAKT: Blok = {
  druh: 'skupina', id: 'ocny_kontakt', nadpis: 'Očný kontakt',
  bloky: [
    {
      druh: 'otazka', id: 'ock_intenzita', typ: 'jeden',
      text: 'Ako vnímam očný kontakt počas intimity',
      moznosti: [
        { v: 'extremne_silny', label: 'Extrémne silný' },
        { v: 'prijemny', label: 'Príjemný' },
        { v: 'neutral', label: 'Neutrálny' },
        { v: 'nepriejmny', label: 'Nepríjemný' },
      ],
    },
    {
      druh: 'otazka', id: 'ock_kedy', typ: 'viac',
      text: 'Kedy je pre mňa očný kontakt najviac sexy',
      moznosti: [
        { v: 'bozky', label: 'Pri bozkoch' },
        { v: 'pomaly_dotyk', label: 'Pri pomalom dotyku' },
        { v: 'penetracia', label: 'Pri penetrácii' },
      ],
    },
    {
      druh: 'otazka', id: 'ock_ritual', typ: 'jeden',
      text: 'Chcem ho ako',
      moznosti: [
        { v: 'ritual', label: '„Rituál" (napr. 30 sek pred začiatkom)' },
        { v: 'spontanne', label: 'Spontánne' },
      ],
    },
  ],
}

// ── Pomalé dotyky ───────────────────────────────────────────────────
const POMALE_DOTYKY: Blok = {
  druh: 'skupina', id: 'pomale_dotyky', nadpis: 'Pomalé dotyky (rituál)',
  bloky: [
    {
      druh: 'otazka', id: 'pom_styl', typ: 'jeden',
      text: 'Zapína ma viac',
      moznosti: [
        { v: 'hladkanie', label: 'Pomalé hladkanie kože' },
        { v: 'drzanie', label: 'Pomalé, statické držanie' },
      ],
    },
    {
      druh: 'otazka', id: 'pom_olej', typ: 'jeden',
      text: 'Olej pri pomalých dotykoch',
      moznosti: [
        { v: 'ano', label: 'Áno, s olejom' },
        { v: 'nie', label: 'Bez oleja' },
      ],
    },
    {
      druh: 'otazka', id: 'pom_teasing', typ: 'jeden',
      text: 'Vyhýbanie sa genitáliám na začiatku (teasing)',
      moznosti: [
        { v: 'dlhsie', label: 'Áno, dlhšie sa vyhýbať' },
        { v: 'od_zaciatku', label: 'OK ísť tam aj od začiatku' },
      ],
    },
    {
      druh: 'otazka', id: 'pom_mapovanie', typ: 'jeden',
      text: '„Mapovanie tela"',
      moznosti: [
        { v: 'pytat_sa', label: 'Mám rád(a), keď sa partner pýta, čo je príjemné' },
        { v: 'ticho', label: 'Radšej ticho a plynutie bez slov' },
      ],
    },
  ],
}

// ── Vedomé dotyky bez cieľa ────────────────────────────────────────
const NO_GOAL: Blok = {
  druh: 'skupina', id: 'no_goal', nadpis: '„No-goal" — vedomé dotyky bez cieľa',
  bloky: [
    {
      druh: 'text', id: 'nog_info',
      telo: 'Večer, kde je cieľom len blízkosť, bez povinnosti pokračovať do sexu.',
    },
    p('nog_predstava', 'Viem si predstaviť „no-goal" večer bez akejkoľvek povinnosti'),
    {
      druh: 'otazka', id: 'nog_uspech', typ: 'viac',
      text: 'Čo je pre mňa „úspech" v no-goal režime',
      moznosti: [
        { v: 'uvolnenie', label: 'Uvoľnenie' },
        { v: 'bezpecie', label: 'Bezpečie' },
        { v: 'vzrusenie', label: 'Vzrušenie (aj bez pokračovania)' },
        { v: 'zaspavanie', label: 'Zaspávanie spolu' },
        { v: 'prepojenie', label: 'Emocionálne prepojenie' },
      ],
    },
    { druh: 'otazka', id: 'nog_obavy', typ: 'text', text: 'Čoho sa v no-goal režime prípadne obávam (sklamanie partnera, „že sa to zase zlomí"):' },
    {
      druh: 'otazka', id: 'nog_top_aktivity', typ: 'viac',
      text: 'Top no-goal aktivity pre mňa',
      moznosti: [
        { v: 'objatie', label: 'Objatie' },
        { v: 'masaz', label: 'Masáž' },
        { v: 'bozkavanie', label: 'Bozkávanie' },
        { v: 'sprcha', label: 'Spoločná sprcha' },
        { v: 'masturbacia_bez_tlaku', label: 'Spoločná masturbácia bez tlaku' },
        { v: 'lezanie_nahi', label: 'Ležanie nahí' },
      ],
    },
    {
      druh: 'otazka', id: 'nog_prechod', typ: 'jeden',
      text: 'Prechod do sexu z no-goal večera',
      moznosti: [
        { v: 'opt_in', label: 'Len ak to chcem ja (opt-in)' },
        { v: 'ok_kedykolvek', label: 'OK, ak to príde prirodzene' },
        { v: 'nie', label: 'Nie, no-goal má zostať bez sexu' },
      ],
    },
    {
      druh: 'otazka', id: 'nog_hranica_genital', typ: 'jeden',
      text: 'Hranica „bez genitálií" v no-goal režime',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem túto hranicu' },
        { v: 'nie', label: 'Nie, je to OK aj tak' },
      ],
    },
  ],
}

// ── Meditácia pred intimitou ────────────────────────────────────────
const MEDITACIA: Blok = {
  druh: 'skupina', id: 'meditacia', nadpis: 'Meditácia/relax pred intimitou',
  bloky: [
    {
      druh: 'otazka', id: 'med_pomohla_by', typ: 'jeden',
      text: 'Krátka meditácia/relax pred intimitou',
      moznosti: [
        { v: 'pomohla_by', label: 'Pomohla by mi' },
        { v: 'nesexy', label: 'Pre mňa je to skôr nesexy' },
        { v: 'neviem', label: 'Neviem, neskúsil(a) som to' },
      ],
    },
    {
      druh: 'otazka', id: 'med_co_ok', typ: 'viac',
      text: 'Čo je pri tom OK',
      moznosti: [
        { v: 'dychanie', label: '1–3 min spoločné dýchanie' },
        { v: 'ticho', label: 'Ticho' },
        { v: 'hudba', label: 'Hudba' },
        { v: 'vedena_nahravka', label: 'Vedená nahrávka' },
      ],
    },
    {
      druh: 'otazka', id: 'med_spolu_sam', typ: 'jeden',
      text: 'Relax spolu alebo každý sám',
      moznosti: [
        { v: 'spolu', label: 'Spolu' },
        { v: 'sam', label: 'Každý sám a potom sa stretneme' },
      ],
    },
    p('med_odlozit_den', '„Odložiť deň" pred intimitou (telefón preč, sprcha, čaj) mi pomáha'),
  ],
}

// ── Energia a flow ────────────────────────────────────────────────
const ENERGIA_FLOW: Blok = {
  druh: 'skupina', id: 'energia_flow', nadpis: 'Energia a „flow"',
  bloky: [
    {
      druh: 'otazka', id: 'ene_typ', typ: 'jeden',
      text: 'Zapína ma viac',
      moznosti: [
        { v: 'vlnovy', label: '„Vlnový" flow (pomaly → intenzívne → pomaly)' },
        { v: 'konzistentny', label: 'Konzistentné, rovnaké tempo' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_co_znamena_intenzivne', typ: 'viac',
      text: 'Čo pre mňa znamená „intenzívne" v slow sexe',
      moznosti: [
        { v: 'tempo', label: 'Rýchlejšie tempo' },
        { v: 'tlak', label: 'Väčší tlak' },
        { v: 'slova', label: 'Slová' },
        { v: 'hlbsi_kontakt', label: 'Hlbší telesný kontakt' },
        { v: 'dominancia', label: 'Dominantnejšie vedenie' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_kde', typ: 'jeden',
      text: 'Intenzitu chcem skôr',
      moznosti: [
        { v: 'dotyk', label: 'V dotyku' },
        { v: 'psychika', label: 'V psychike (očný kontakt, slová, role)' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_orgazmus', typ: 'jeden',
      text: 'Orgazmus vo flow',
      moznosti: [
        { v: 'zaradit', label: 'Chcem ho zaradiť' },
        { v: 'bez_ciela', label: 'Má ostať „bez cieľa"' },
      ],
    },
  ],
}

// ── Ukotvenie po (aftercare ako rituál) ────────────────────────────
const UKOTVENIE: Blok = {
  druh: 'skupina', id: 'ukotvenie', nadpis: 'Ukotvenie po (aftercare ako rituál)',
  bloky: [
    {
      druh: 'otazka', id: 'uko_potreby', typ: 'viac',
      text: 'Čo potrebujem po slow sexe, aby som sa cítil(a) ukotvený/á',
      moznosti: [
        { v: 'objatie', label: 'Objatie' },
        { v: 'slova', label: 'Slová' },
        { v: 'ticho', label: 'Ticho' },
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'voda', label: 'Voda na pitie' },
        { v: 'zaspat_spolu', label: 'Zaspať spolu' },
      ],
    },
    {
      druh: 'otazka', id: 'uko_debrief', typ: 'jeden',
      text: 'Krátky debrief po rituáli',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem (čo bolo top, čo upraviť)' },
        { v: 'nie', label: 'Radšej nič, nechať to doznieť' },
      ],
    },
    p('uko_closing_signal', 'Chcem mať jasný „closing" signál (veta, bozk, „ďakujem") na koniec'),
    { druh: 'otazka', id: 'uko_najkrajsie', typ: 'text', text: 'Moje najkrajšie ukončenie (spať v objatí, spoločná sprcha, jedlo, rozhovor, ticho):' },
  ],
}

// ── Doplnené mikrotémy ─────────────────────────────────────────────
const MIKROTEMY: Blok = {
  druh: 'skupina', id: 'mikrotemy', nadpis: 'Doplnkové mikrotémy',
  bloky: [
    p('mik_slow_teasing', '„Slow teasing" (dlho sa nedotýkať genitálií) ma láka'),
    p('mik_vedene_vedenie', '„Vedené vedenie" (partner hovorí presné inštrukcie: dýchaj, spomaľ, zostaň) ma láka'),
    p('mik_symbolika', 'Symbolika/rituál (sviečka, hudba, „posvätný čas", ďakovná veta) mi je príjemná, nie „príliš"'),
    { druh: 'otazka', id: 'mik_5_krokov', typ: 'text', text: 'Keby sme mali vytvoriť „náš slow rituál" v 5 krokoch, aké by boli moje kroky:' },
    {
      druh: 'otazka', id: 'mik_co_posilnit', typ: 'jeden',
      text: 'Keby mal slow sex posilniť jednu vec v našom vzťahu',
      moznosti: [
        { v: 'bezpecie', label: 'Bezpečie' },
        { v: 'tuzba', label: 'Túžbu' },
        { v: 'intimita', label: 'Intimitu' },
        { v: 'hravost', label: 'Hravosť' },
        { v: 'dovera', label: 'Dôveru' },
      ],
    },
  ],
}

export const TANTRA_SLOW_SEX: TemaObsah = {
  slug: 'tantra-slow-sex-spiritualita/tantra-slow-sex-spiritualita',
  nadpis: 'Tantra, slow sex a spiritualita',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Prítomnosť namiesto výkonu',
      telo:
        'Tantra a slow sex nie sú o technike — sú o spomalení, dychu a prítomnosti bez tlaku na výsledok. ' +
        'Pre niekoho je to spirituálna rovina, pre iného len praktický spôsob, ako viac cítiť. Oboje je v poriadku.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo: 'Nič tu nie je „musieť" — každý krok (dych, dotyk, ticho, rituál) je opt-in a dá sa kedykoľvek vynechať.',
    },
  ],
  telo: [
    NASTAVENIE,
    DYCH,
    OCNY_KONTAKT,
    POMALE_DOTYKY,
    NO_GOAL,
    MEDITACIA,
    ENERGIA_FLOW,
    UKOTVENIE,
    MIKROTEMY,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
