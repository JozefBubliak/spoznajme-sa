import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Swinging / výmena partnerov — modul „Otvorenosť".
// Zdroj: „25_Swingers_a_vymena_partnerov" (mišmaš mnohých návrhov; do tejto témy
// ide swingers-špecifický obsah — soft/full swap, klub, prostredie, pravidlá,
// matice aktivít, voyeuristic full swap, štvorka, asymetrická výmena).
// Gangbang/bukkake/skupinový sex → téma „Trojky a skupiny";
// hotwife/cuckold/kandalizmus → téma „Zdieľanie partnera".
// z-verzia = ženský pohľad, m-verzia = mužský; rovnaké id + hodnoty (Double-Blind).
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
  { v: 'ak_chce', label: g('Rád to spravím, ak po tom druhý túži', 'Rada to spravím, ak po tom druhý túži') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]
const postojOt = (id: string, text: TemaObsah['nadpis'], napoveda?: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, napoveda, moznosti: POSTOJ, inePovolene: true,
})

const AKT_MUZ_PRIJAT: Moznost[] = [
  { v: 'bozk', label: 'Bozkávanie' },
  { v: 'maznanie', label: 'Maznanie, dotyky, hladkanie tela' },
  { v: 'oral', label: 'Orálny sex od iného muža' },
  { v: 'penetracia', label: 'Penetrácia iným mužom' },
  { v: 'ds', label: 'Dominantno-submisívne prvky (zviazanie, škrtenie, spanking…)' },
]
const AKT_MUZ_POSKYTNUT: Moznost[] = [
  { v: 'bozk', label: 'Bozkávanie' },
  { v: 'maznanie', label: 'Maznanie, dotyky, hladkanie tela' },
  { v: 'oral', label: 'Poskytovanie orálneho sexu inému mužovi' },
  { v: 'pomocky', label: 'Erotické pomôcky na jeho stimuláciu' },
  { v: 'dom', label: 'Dominantná úloha voči inému mužovi (zväzovanie, spanking, príkazy…)' },
  { v: 'sub', label: 'Submisívna úloha voči inému mužovi (nechať sa viesť, poslúchať…)' },
]
const AKT_ZENA_PRIJAT: Moznost[] = [
  { v: 'bozk', label: 'Bozkávanie s inou ženou' },
  { v: 'maznanie', label: 'Maznanie, dotyky, hladkanie tela' },
  { v: 'oral', label: 'Orálny sex, ktorý mi poskytuje iná žena' },
  { v: 'penetracia', label: 'Prstovanie alebo penetrácia erotickou pomôckou od inej ženy' },
  { v: 'ds', label: 'Dominantno-submisívne prvky' },
  { v: 'pred_partnerom', label: 'Sex s inou ženou za prítomnosti partnera' },
]
const AKT_ZENA_POSKYTNUT: Moznost[] = [
  { v: 'bozk', label: 'Bozkávanie s inou ženou' },
  { v: 'maznanie', label: 'Maznanie, dotyky, hladkanie tela' },
  { v: 'oral', label: 'Poskytovanie orálneho sexu inej žene' },
  { v: 'pomocky', label: 'Použitie erotických pomôcok na jej stimuláciu' },
  { v: 'dom', label: 'Dominantná úloha voči inej žene' },
  { v: 'sub', label: 'Submisívna úloha voči inej žene' },
]
const PARTNER_AKT = (koho: string): Moznost[] => [
  { v: 'bozk', label: `Bozkáva ${koho}` },
  { v: 'maznanie', label: 'Mazná sa, dotýka sa, hladká' },
  { v: 'oral_dava', label: `Poskytuje orálny sex ${koho}` },
  { v: 'oral_prijima', label: `Prijíma orálny sex` },
  { v: 'penetracia', label: 'Penetrácia' },
  { v: 'dom', label: 'Dominuje v rámci BDSM' },
  { v: 'sub', label: 'Je submisívny' },
]

// ── Watch-only ────────────────────────────────────────────────────────────
const WATCH: Blok = {
  druh: 'skupina',
  id: 'watch',
  nadpis: 'Pozorovanie (watch-only)',
  uvod: 'Žiadna výmena, žiadne aktivity s inými — len atmosféra, nové podnety a pocit „vidieť a byť videný/á".',
  bloky: [
    {
      druh: 'otazka', id: 'wo_klub_pozorovatel', typ: 'jeden',
      text: 'Navštíviť swingers klub alebo párty len ako pozorovateľ/ka, bez fyzického kontaktu s inými?',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to ako forma preskúmania' },
        { v: 'mozno', label: 'Možno, závisí od prostredia a nálady' },
        { v: 'nie', label: 'Nie, nemám o to záujem' },
      ],
    },
    {
      druh: 'otazka', id: 'wo_aktivity', typ: 'viac',
      text: 'Aké aktivity si viem predstaviť pri pozorovaní?',
      moznosti: [
        { v: 'pozorovat', label: 'Pozorovať iných pri sexe, sám/sama sa nezapájať' },
        { v: 'byt_pozorovany', label: 'Nechať sa pozorovať ostatnými pri sexe s partnerom' },
        { v: 'flirt', label: 'Flirtovať a vnímať záujem iných, ale neprekračovať hranice' },
      ],
    },
    postojOt('wo_sledovat_inych', 'Sledovať iných pri sexe a zistiť, ako to na teba pôsobí?'),
    {
      druh: 'otazka', id: 'wo_byt_sledovany', typ: 'jeden',
      text: 'Ako by si sa cítil/a, keby vás pri sexe s partnerom sledovali iní?',
      moznosti: [
        { v: 'milujem', label: 'Milujem tú predstavu, vzrušuje ma to' },
        { v: 'postupne', label: 'Možno, rád/rada by som to skúmal/a postupne' },
        { v: 'podmienky', label: 'Za určitých podmienok by som to vyskúšal/a' },
        { v: 'nie', label: 'Nie, chcem si tie chvíle nechať len pre seba' },
      ],
    },
  ],
}

// ── Prostredie a pravidlá ─────────────────────────────────────────────────
const PROSTREDIE: Blok = {
  druh: 'skupina',
  id: 'prostredie',
  nadpis: 'Prostredie a pravidlá',
  bloky: [
    postojOt('sw_vstup', 'Chcel(a) by si vstúpiť do sveta swingers, hoci len na úrovni pozorovateľa?'),
    postojOt('sw_klub', 'Navštíviť swingers klub alebo párty?'),
    postojOt('sw_domaca', 'Domáca swingers párty (uvoľnenejšia atmosféra)?'),
    postojOt('sw_tematicky', 'Tematický večer s maskami alebo erotickými kostýmami (anonymita zvyšuje vzrušenie)?'),
    {
      druh: 'otazka', id: 'sw_prostredie_typ', typ: 'viac', inePovolene: true,
      text: 'Aké prostredie ma láka',
      moznosti: [
        { v: 'klub', label: 'Luxusný diskrétny klub s chill-out zónami a súkromnými izbami' },
        { v: 'domaca', label: 'Menšia domáca párty' },
        { v: 'masky', label: 'Tematický maskovaný večer' },
        { v: 'plaz', label: 'Nudistická pláž / semi-public' },
      ],
    },
    postojOt('sw_pravidla', 'Dohodnúť si spolu pravidlá pred zapojením do akýchkoľvek aktivít?'),
    postojOt('sw_zacat_pozorovanim', 'Začať len ako pozorovatelia a postupne skúmať ďalšie možnosti?'),
  ],
}

// ── Soft swap ─────────────────────────────────────────────────────────────
const SOFT: Blok = {
  druh: 'skupina',
  id: 'soft_swap',
  nadpis: 'Soft swap (bez penetrácie)',
  uvod:
    'Vstupná brána do otvorenosti bez úplnej výmeny — bozky, dotyky, orálny sex, spoločná masturbácia, pozorovanie. ' +
    'Pre niekoho je prijateľnejšia interakcia so ženami, pre iného s mužmi, niekto je otvorený obom.',
  bloky: [
    postojOt('ss_postoj', 'Zapojiť soft swap (bez penetrácie)?'),
    {
      druh: 'otazka', id: 'ss_muz_aktivity', typ: 'viac', inePovolene: true,
      text: 'Aké aktivity si viem predstaviť s mužom v rámci soft swapu?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — skúmavé, dominantné, submisívne' },
        { v: 'hladenie', label: 'Hladenie, dotyky, objatia' },
        { v: 'oral_prijem', label: 'Orálny sex — prijímanie' },
        { v: 'oral_davam', label: 'Orálny sex — poskytovanie' },
        { v: 'pomocky', label: 'Používanie erotických pomôcok na stimuláciu' },
        { v: 'masturbacia', label: 'Spoločná masturbácia — zdieľaná alebo vizuálna' },
        { v: 'zony', label: 'Masírovanie erotogénnych zón (krk, bradavky, stehná, penis)' },
        { v: 'simultanne', label: 'Simultánna stimulácia — venovať sa obom mužom naraz' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_muz_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba tabu pri interakcii s mužom?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'akykolvek', label: 'Akýkoľvek fyzický kontakt s iným mužom' },
        { v: 'oral_prijem', label: 'Orálny sex — prijímať' },
        { v: 'oral_davam', label: 'Orálny sex — poskytovať' },
        { v: 'intimne', label: 'Dotyky na intímnych miestach' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_zena_aktivity', typ: 'viac', inePovolene: true,
      text: 'Aké aktivity si viem predstaviť so ženou v rámci soft swapu?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — jemné, vášnivé, hlboké' },
        { v: 'hladenie', label: 'Hladenie, objatia, dotyky na rôznych častiach tela' },
        { v: 'oral_prijem', label: 'Orálny sex — prijímanie' },
        { v: 'oral_davam', label: 'Orálny sex — poskytovanie' },
        { v: 'masturbacia', label: 'Spoločná masturbácia — vzájomné dotyky, vizuálna stimulácia' },
        { v: 'zony', label: 'Masírovanie erotogénnych zón (prsia, bradavky, stehná, intímne partie)' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_zena_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba tabu pri interakcii so ženou?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'akykolvek', label: 'Akýkoľvek fyzický kontakt s inou ženou' },
        { v: 'oral', label: 'Orálny sex' },
        { v: 'intimne', label: 'Dotyky na intímnych miestach' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_par_aktivity', typ: 'viac', inePovolene: true,
      text: 'Aké aktivity si viem predstaviť v interakcii s inými pármi / skupinou (bez penetrácie)?',
      moznosti: [
        { v: 'bozk_pred', label: 'Bozkávanie s partnerom pred inými osobami' },
        { v: 'dotyky_pred', label: 'Hladenie a dotyky medzi partnermi v prítomnosti iných' },
        { v: 'masturbacia', label: 'Vzájomná masturbácia v skupine' },
        { v: 'oral_pred', label: 'Orálny sex medzi partnermi pred ostatnými' },
        { v: 'pomocky_pred', label: 'Používanie erotických pomôcok na partnerovi pred inými' },
        { v: 'dotyky_iny_par', label: 'Spoločné dotyky s inými pármi bez penetrácie' },
        { v: 'sucasne', label: 'Súčasné venovanie sa partnerovi aj inej osobe' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_par_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba tabu pri interakcii s inými pármi / skupinou?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie s inými osobami' },
        { v: 'dotyky', label: 'Vzájomné dotyky s inými pármi' },
        { v: 'oral', label: 'Orálny sex s inou osobou' },
        { v: 'pomocky', label: 'Hranie sa s erotickými pomôckami na inej osobe' },
        { v: 'sledovany', label: 'Byť sledovaný/á inými pri intímnej aktivite' },
        { v: 'muzi', label: 'Akákoľvek fyzická interakcia medzi mužmi v skupine' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_sledovat_partnera', typ: 'viac', inePovolene: true,
      text: 'Pri sledovaní partnera — s čím by som bol/a v poriadku, keď on/ona:',
      moznosti: [
        { v: 'bozk', label: 'Bozkáva inú osobu (muža / ženu)' },
        { v: 'oral_prijima', label: 'Prijíma orálnu stimuláciu od inej osoby' },
        { v: 'oral_dava', label: 'Poskytuje orálnu stimuláciu inej osobe' },
        { v: 'masturbuje', label: 'Masturbuje v prítomnosti iných' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_sledovat_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba tabu pri sledovaní partnera v soft swape?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie s inou osobou' },
        { v: 'oral_prijima', label: 'Partner prijíma orálny sex od inej osoby' },
        { v: 'oral_dava', label: 'Partner poskytuje orálny sex inej osobe' },
        { v: 'intimne', label: 'Dotyky na intímnych miestach inou osobou' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_ds_prvky', typ: 'viac', inePovolene: true,
      text: 'Aké dominantno-submisívne prvky si viem predstaviť v soft swape?',
      moznosti: [
        { v: 'vedie', label: 'Partner ma „vedie", zatiaľ čo ja sledujem a poslúcham' },
        { v: 'zviazana', label: 'Byť jemne zviazaný/á alebo obmedzený/á v pohybe' },
        { v: 'tresty', label: 'Dostať alebo dávať jemné tresty (plácnutia, hryzenie)' },
        { v: 'sledovana', label: 'Byť sledovaný/á, ako mi niekto iný poskytuje potešenie' },
        { v: 'kontrola', label: 'Mať kontrolu nad tým, čo robí partner s inou osobou' },
        { v: 'prikazy', label: 'Hranie sa s jemnými príkazmi a úlohami' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_ds_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre teba tabu v D/s hrách v soft swape?',
      moznosti: [
        { v: 'zviazana', label: 'Byť zviazaný/á alebo kontrolovaný/á' },
        { v: 'tresty', label: 'Dávať alebo prijímať fyzické tresty' },
        { v: 'stop', label: 'Mať obmedzenú možnosť zastaviť situáciu' },
        { v: 'bez_suhlasu', label: 'Partner sa správa dominantne s inou osobou bez môjho súhlasu' },
      ],
    },
    {
      druh: 'otazka', id: 'ss_scenar', typ: 'viac',
      text: 'Ktoré scenáre soft swapu si viem predstaviť?',
      moznosti: [
        { v: 'flirt', label: 'Bozkávanie a dotyky — flirt na párty, partner sleduje' },
        { v: 'oral_klub', label: 'Orálna stimulácia v súkromnej miestnosti klubu' },
        { v: 'masturbacia_par', label: 'Spoločná masturbácia s ďalším párom' },
      ],
    },
  ],
}

// ── Full swap ─────────────────────────────────────────────────────────────
const FULL: Blok = {
  druh: 'skupina',
  id: 'full_swap',
  nadpis: 'Full swap (úplná výmena partnerov)',
  uvod:
    'Najintenzívnejšia forma — plná penetrácia a ďalšie aktivity s inými osobami vo vopred dohodnutých hraniciach. ' +
    'Nie je pre žiarlivých; je pre tých, ktorých vzrušuje vidieť partnera s niekým iným.',
  bloky: [
    postojOt('fs_postoj', 'Zapojiť full swap (úplná výmena partnerov)?'),
    {
      druh: 'otazka', id: 'fs_formy', typ: 'viac', inePovolene: true,
      text: 'V akom formáte si viem predstaviť full swap?',
      moznosti: [
        { v: 'ta_ista', label: 'Sex s iným partnerom v tej istej miestnosti vedľa môjho partnera' },
        { v: 'oddelena', label: 'Sex v oddelenej miestnosti, bez priameho dohľadu partnera' },
        { v: 'stvorka', label: 'Sex v rámci štvorky — vzájomná interakcia medzi všetkými' },
        { v: 'bi_zena', label: 'Bisexuálna interakcia so ženou počas štvorky' },
        { v: 'bi_muzi', label: 'Muži sa zapájajú navzájom (ak sú na to otvorení)' },
        { v: 'viac_parov', label: 'Skupinový sex s viacerými pármi' },
        { v: 'mmf', label: 'Trojka s iným mužom (MMF)' },
        { v: 'ffm', label: 'Trojka s inou ženou (FFM)' },
        { v: 'rotujuca', label: 'Rotujúca výmena — viac partnerov počas jedného večera' },
        { v: 'gangbang', label: g('Gangbang (viacerí muži na partnerku)', 'Gangbang (viacerí muži na mňa)') },
        { v: 'bukkake', label: g('Bukkake (viacerí muži ejakulujú na partnerku)', 'Bukkake (viacerí muži ejakulujú na mňa)') },
        { v: 'sledovana_muz', label: 'Byť sledovaný/á partnerom pri sexe s iným mužom' },
        { v: 'sledovana_zena', label: 'Byť sledovaný/á partnerom pri sexe s inou ženou' },
        { v: 'sledovat_zena', label: 'Sledovať partnera pri sexe s inou ženou' },
        { v: 'sledovat_muz', label: 'Sledovať partnera pri sexe s iným mužom' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_klasicky_predstava', typ: 'jeden',
      text: 'Klasický full swap (jedna miestnosť) — aká predstava ťa najviac vzrušuje?',
      moznosti: [
        { v: 'obaja', label: 'Mať sex s iným a zároveň vidieť partnera s inou osobou' },
        { v: 'dotyk', label: 'Nechať sa milovať iným a pritom sa stále dotýkať svojho partnera' },
        { v: 'sledovanie', label: 'Nechať partnera sledovať, ako ma iný uspokojuje' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_klasicky_kontakt', typ: 'jeden',
      text: 'Kontakt s pôvodným partnerom počas aktu',
      moznosti: [
        { v: 'dotyky', label: 'Dotyky, bozky a očný kontakt počas aktu' },
        { v: 'bez', label: 'Bez kontaktu — plná koncentrácia na nové telo' },
        { v: 'nalada', label: 'Podľa nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_oddelene', typ: 'jeden',
      text: 'Oddelené miestnosti — ako by si to chcel/a?',
      moznosti: [
        { v: 'sukromie', label: 'Úplné súkromie, žiadny kontakt počas aktu' },
        { v: 'zvuky', label: 'Počuť zvuky — vedieť, že aj druhý si užíva' },
        { v: 'vyskusat', label: 'Najprv vyskúšať a potom rozhodnúť' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_navrat', typ: 'jeden',
      text: 'Full swap s návratom k partnerovi — ktorý variant ťa láka?',
      moznosti: [
        { v: 'vratit', label: 'Nechať sa pomilovať iným a potom sa vrátiť k partnerovi' },
        { v: 'rozkos', label: 'Nechať partnera pocítiť moju rozvášnenú rozkoš hneď po' },
        { v: 'tvrdy', label: 'Zakončiť to tvrdým sexom s mojím partnerom' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_stvorka', typ: 'viac',
      text: 'Ktoré formy štvorky si viem predstaviť?',
      moznosti: [
        { v: 'kazdy', label: 'Sex v rámci štvorky — každý s každým' },
        { v: 'bi_zeny', label: 'Bisexuálna interakcia medzi ženami' },
        { v: 'ds', label: 'Dominantno-submisívne prvky (zväzovanie, spanking, facky)' },
        { v: 'paralelne', label: 'Paralelný sex v jednom priestore (každý s iným, spolu v miestnosti)' },
      ],
    },
    {
      druh: 'otazka', id: 'fs_asymetria', typ: 'jeden',
      text: 'Asymetrická výmena (jeden má väčšiu slobodu, druhý je pozorovateľ / stimulátor)',
      moznosti: [
        { v: 'ano', label: 'Áno, láka ma to' },
        { v: 'zaciatok', label: 'Začíname takto a postupne sa zapájame viac' },
        { v: 'nie', label: 'Nie, chceme rovnocenné zapojenie' },
      ],
    },
  ],
}

// ── Voyeuristic full swap ─────────────────────────────────────────────────
const VOYEUR_FS: Blok = {
  druh: 'skupina',
  id: 'voyeur_fs',
  nadpis: 'Voyeuristický full swap — jeden sa pozerá, druhý si užíva',
  bloky: [
    {
      druh: 'otazka', id: 'vfs_predstava', typ: 'viac', inePovolene: true,
      text: 'Ako by si si to predstavoval/a?',
      moznosti: [
        { v: 'ma_sleduje', label: 'Chcem, aby ma partner sledoval, zatiaľ čo si užívam s iným' },
        { v: 'sledujem', label: 'Chcem sledovať svojho partnera, zatiaľ čo si užíva s inou' },
        { v: 'kombinacia', label: 'Kombinácia — najprv sa pozerám, potom sa zapájam' },
      ],
    },
    {
      druh: 'otazka', id: 'vfs_scenar', typ: 'viac', inePovolene: true,
      text: 'Ktorý scenár si viem predstaviť?',
      moznosti: [
        { v: 'ta_ista', label: 'Sex v tej istej miestnosti vedľa môjho partnera' },
        { v: 'oddelena', label: 'Sex v oddelenej miestnosti, každý súkromne' },
        { v: 'navrat', label: 'Po výmene partnerov návrat k partnerovi na spoločné vyvrcholenie' },
        { v: 'sleduje', label: 'Partner ma sleduje, kým si užívam s iným' },
      ],
    },
  ],
}

// ── Matice aktivít ───────────────────────────────────────────────────────
const AKTIVITY: Blok = {
  druh: 'skupina',
  id: 'aktivity',
  nadpis: 'Čo chcem prijať a čo poskytnúť',
  uvod: 'Swingers nie je o tom robiť všetko — len to, čo ťa vzrušuje. Čo tu nezvolíš, sa považuje za tabu.',
  bloky: [
    { druh: 'otazka', id: 'akt_prijat_muz', typ: 'viac', inePovolene: true, text: 'Ktoré aktivity chcem prijať od iného muža?', moznosti: AKT_MUZ_PRIJAT },
    { druh: 'otazka', id: 'akt_poskytnut_muz', typ: 'viac', inePovolene: true, text: 'Ktoré aktivity by som rád(a) poskytol(la) inému mužovi?', moznosti: AKT_MUZ_POSKYTNUT },
    { druh: 'otazka', id: 'akt_prijat_zena', typ: 'viac', inePovolene: true, text: 'Ktoré aktivity chcem prijať od inej ženy?', moznosti: AKT_ZENA_PRIJAT },
    { druh: 'otazka', id: 'akt_poskytnut_zena', typ: 'viac', inePovolene: true, text: 'Ktoré aktivity by som rád(a) poskytol(la) inej žene?', moznosti: AKT_ZENA_POSKYTNUT },
    {
      druh: 'otazka', id: 'akt_moje_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre mňa tabu — v žiadnom prípade by som neprijal(a) ani neposkytol(la)',
      moznosti: [
        { v: 'bozk_zena', label: 'Bozkávanie s inou ženou' },
        { v: 'oral_zena', label: 'Orálny sex s inou ženou' },
        { v: 'penetracia_zena', label: 'Penetrácia alebo pomôcky s inou ženou' },
        { v: 'bozk_muz', label: 'Bozkávanie s iným mužom' },
        { v: 'oral_muz', label: 'Orálny sex s iným mužom' },
        { v: 'penetracia_muz', label: 'Penetrácia iným mužom' },
        { v: 'bdsm', label: 'BDSM prvky (dominancia, submisivita, zväzovanie, facky…)' },
      ],
    },
  ],
}

// ── Partner s inými — hranice ────────────────────────────────────────────
const PARTNER_HRANICE: Blok = {
  druh: 'skupina',
  id: 'partner_hranice',
  nadpis: 'Partner s inými — moje hranice',
  bloky: [
    { druh: 'otazka', id: 'ph_zena_aktivity', typ: 'viac', inePovolene: true, text: 'Aktivity, ktoré si viem predstaviť medzi partnerom a inou ženou', moznosti: PARTNER_AKT('inú ženu') },
    {
      druh: 'otazka', id: 'ph_zena_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre mňa tabu v interakcii partnera s inou ženou',
      moznosti: [
        { v: 'bozk', label: 'Bozkáva inú ženu' },
        { v: 'maznanie', label: 'Dotýka sa jej a mazná sa s ňou' },
        { v: 'oral_dava', label: 'Poskytuje jej orálny sex' },
        { v: 'oral_prijima', label: 'Prijíma orálny sex od nej' },
        { v: 'penetracia', label: 'Má s ňou sex (penetrácia)' },
        { v: 'bdsm', label: 'Zapája BDSM prvky (zväzovanie, škrtenie, facky…)' },
      ],
    },
    { druh: 'otazka', id: 'ph_muz_aktivity', typ: 'viac', inePovolene: true, text: 'Aktivity, ktoré si viem predstaviť medzi partnerom a iným mužom', moznosti: PARTNER_AKT('iného muža') },
    {
      druh: 'otazka', id: 'ph_muz_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre mňa tabu v interakcii partnera s iným mužom',
      moznosti: [
        { v: 'bozk', label: 'Bozkáva iného muža' },
        { v: 'maznanie', label: 'Dotýka sa ho (maznanie, hladkanie)' },
        { v: 'oral_dava', label: 'Poskytuje mu orálny sex' },
        { v: 'oral_prijima', label: 'Prijíma orálny sex od neho' },
        { v: 'penetracia', label: 'Má s ním sex (penetrácia)' },
        { v: 'bdsm', label: 'Zapája BDSM prvky' },
      ],
    },
    {
      druh: 'otazka', id: 'ph_swingers_tabu', typ: 'viac', inePovolene: true,
      text: 'Čo je pre mňa tabu v swingers celkovo',
      moznosti: [
        { v: 'bozk', label: 'Partner bozkáva tretiu osobu' },
        { v: 'oral_dava', label: 'Partner poskytuje orál tretej osobe' },
        { v: 'oral_prijima', label: 'Partner prijíma orál od tretej osoby' },
        { v: 'penetracia', label: 'Penetrácia medzi partnerom a treťou osobou' },
        { v: 'rovnake_pohlavie', label: 'Akákoľvek interakcia medzi rovnakým pohlavím' },
        { v: 'bdsm', label: 'BDSM prvky (zväzovanie, škrtenie, facky…)' },
        { v: 'gangbang', label: 'Gangbang alebo bukkake' },
        { v: 'skupina', label: 'Skupinový sex s viacerými osobami naraz' },
      ],
    },
  ],
}

// ── Rámec / bezpečnosť ──────────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Rámec a bezpečnosť',
  bloky: [
    {
      druh: 'otazka', id: 'ra_stupnica', typ: 'jeden',
      text: 'Kam sa vieme reálne posunúť (stupnica zapojenia)',
      moznosti: [
        { v: 'watch', label: 'Watch-only — len pozorovanie' },
        { v: 'soft', label: 'Soft swap — bez penetrácie' },
        { v: 'full', label: 'Full swap — úplná výmena' },
        { v: 'trojky', label: 'Trojky a viac' },
      ],
    },
    {
      druh: 'otazka', id: 'ra_miesto', typ: 'viac', inePovolene: true,
      text: 'Kde by nám to bolo komfortné',
      moznosti: [
        { v: 'doma', label: 'Doma' },
        { v: 'hotel', label: 'Hotel alebo prenajatý priestor' },
        { v: 'klub', label: 'Klub (s možnosťou watch-only)' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    {
      druh: 'otazka', id: 'ra_pravidla', typ: 'viac',
      text: 'Čo si dohodnúť pred akoukoľvek aktivitou',
      moznosti: [
        { v: 'stop', label: 'Stop-slovo alebo gesto (semafor)' },
        { v: 'kondomy', label: 'Kondómy a bariéry, výmena medzi partnermi' },
        { v: 'testy', label: 'Test STI v dohodnutom limite' },
        { v: 'poradie', label: 'Jasné poradie aktivít, hygienické prestávky' },
        { v: 'len_pozorujem', label: '„Len pozorujem" je platná voľba' },
        { v: 'aftercare', label: 'Aftercare a check-in po 24 h' },
      ],
    },
    {
      druh: 'otazka', id: 'ra_latky', typ: 'jeden', text: 'Alkohol a látky',
      moznosti: [
        { v: 'bez', label: 'Radšej úplne bez' },
        { v: 'jeden', label: 'Maximálne jeden drink' },
        { v: 'nezalezi', label: 'Nezáleží mi na tom' },
      ],
    },
    {
      druh: 'otazka', id: 'ra_foto', typ: 'jeden', text: 'Foto / video',
      moznosti: [
        { v: 'nie', label: 'Striktne nie' },
        { v: 'bez_tvari', label: 'Len s výslovným súhlasom všetkých, bez tvárí' },
        { v: 'ano', label: 'Áno, s pravidlami (kto vlastní a maže)' },
      ],
    },
    { druh: 'otazka', id: 'ra_debrief', typ: 'text', text: 'Ako a kedy debrief (napr. „2+2" — dve super, dve na úpravu; čo nabudúce):' },
  ],
}

// ── Otvorené poznámky ───────────────────────────────────────────────────
const POZNAMKY: Blok = {
  druh: 'skupina',
  id: 'poznamky',
  nadpis: g('Otvorené poznámky pre partnerku', 'Otvorené poznámky pre partnera'),
  bloky: [
    { druh: 'otazka', id: 'pozn_hranice', typ: 'text', text: 'Moje jasné hranice (čo určite nie):' },
    { druh: 'otazka', id: 'pozn_cervena', typ: 'text', text: 'Čo je pre mňa „červená vlajka" (kedy chcem okamžite stop):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela (1–3 vety):', 'Čo chcem, aby partner vedel (1–3 vety):') },
    { druh: 'otazka', id: 'pozn_ziarlivost', typ: 'text', text: 'Čo u mňa spúšťa žiarlivosť a čo mi pomáha (reassurance):' },
  ],
}

export const SWINGING: TemaObsah = {
  slug: 'swinging/swinging',
  nadpis: 'Swinging a výmena partnerov',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'co_je',
      nadpis: 'Čo je swingers?',
      telo:
        'Forma intímneho objavovania, kde sa páry rozhodnú zdieľať svoje sexuálne zážitky s inými ľuďmi v bezpečnom, ' +
        'súhlasnom a diskrétnom prostredí — v kluboch, na párty alebo v súkromí. ' +
        'Nie je to len o fyzickom zážitku, ale aj o prepojení s komunitou, dôvere a komunikácii.',
    },
    {
      druh: 'text',
      id: 'podkategorie',
      nadpis: 'Podkategórie a stupnica zapojenia',
      telo:
        'Watch-only — len pozorovanie a socializácia, bez kontaktu s inými.\n\n' +
        'Soft swap — dotyky, bozky, orálny sex, spoločná masturbácia; bez penetrácie.\n\n' +
        'Full swap — úplná výmena partnerov vrátane penetrácie.\n\n' +
        'Stupnica: „watch-only → soft swap → full swap". Nič sa nedeje bez jasného „áno".',
    },
    {
      druh: 'text',
      id: 'prostredie',
      nadpis: 'Druhy prostredí',
      ton: 'info',
      telo:
        'Swingers kluby — luxusné diskrétne miesta s chill-out zónami, barmi a súkromnými izbami. ' +
        'Domáce párty — menšie uvoľnené stretnutia. ' +
        'Tematické večery — maskované párty a erotické hry, kde anonymita zvyšuje vzrušenie.',
    },
  ],
  telo: [PROSTREDIE, WATCH, SOFT, FULL, VOYEUR_FS, AKTIVITY, PARTNER_HRANICE, RAMEC, POZNAMKY],
  zaver: [
    {
      druh: 'text',
      id: 'zaver',
      nadpis: 'Záver',
      telo:
        'Full swap je najintenzívnejšia úroveň swingers zážitkov — nie je pre každého. ' +
        'Najdôležitejšie je poznať svoje hranice a otvorene komunikovať. ' +
        'Výsledky zohľadnia len zhody medzi tebou a partnerom; čo niekto striktne odmietne, sa nezobrazí.',
    },
  ],
}
