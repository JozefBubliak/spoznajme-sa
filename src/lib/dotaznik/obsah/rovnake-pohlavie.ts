import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Interakcie s rovnakým pohlavím — modul H1 „Bi-zvedavosť / rovnaké pohlavie".
// Zdroj: „zdroj.docx" (sekcia Interakcie s rovnakým pohlavím) + xlsm
// P49395–49483 (soft × hard bi, prsty/strap-on, top/bottom, pomalý postup,
// preklik na Pomôcky, karty: škála zvedavosť ↔ prax, soft bi čo je OK,
// reálny rozsah, podmienky a červené línie, integrácia do vzťahu).
// z/m verzia zrkadlová — žena odpovedá o ženách, muž o mužoch.
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

const SKUSENOST: Blok = {
  druh: 'otazka', id: 'skusenost', typ: 'jeden',
  text: g('Máš už skúsenosť s intimitou s iným mužom?', 'Máš už skúsenosť s intimitou s inou ženou?'),
  moznosti: [
    { v: 'mam', label: g('Áno, mám', 'Áno, mám') },
    { v: 'nemam', label: g('Nie, ešte nemám', 'Nie, ešte nemám') },
  ],
}

const SO_SKUSENOSTOU: Blok = {
  druh: 'skupina', id: 'so_skusenostou', nadpis: 'Moja doterajšia skúsenosť',
  podmienka: { ot: 'skusenost', je: 'mam' },
  bloky: [
    {
      druh: 'otazka', id: 'skusenost_hodnotenie', typ: 'jeden',
      text: 'Ktoré tvrdenie najviac sedí na tvoju doterajšiu skúsenosť?',
      moznosti: [
        { v: 'velmi', label: 'Veľmi ma to vzrušovalo — chcem to opakovať alebo zaradiť' },
        { v: 'skor', label: g('Skôr ma to vzrušovalo — rád to zopakujem za vhodných podmienok', 'Skôr ma to vzrušovalo — rada to zopakujem za vhodných podmienok') },
        { v: 'neutral', label: 'Neutrálne — bolo to v poriadku, ale nie je to moja priorita' },
        { v: 'zlepsit', label: 'Skôr mi to nesedelo, ale mohlo by sa to zlepšiť iným človekom, tempom alebo podobou' },
        { v: 'neprijemne', label: 'Bolo mi to nepríjemné — nechcem to opakovať' },
      ],
    },
    { druh: 'otazka', id: 'skusenost_zlepsit', typ: 'text', text: 'Čo by mohlo túto skúsenosť zlepšiť?', podmienka: { ot: 'skusenost_hodnotenie', je: 'zlepsit' } },
    {
      druh: 'otazka', id: 'skusenost_frekvencia', typ: 'jeden', text: 'Aká frekvencia ti vyhovuje?',
      podmienka: { ot: 'skusenost_hodnotenie', nie: 'neprijemne' },
      moznosti: [
        { v: 'pravidelne', label: 'Pravidelne' },
        { v: 'nalada', label: 'Podľa nálady' },
        { v: 'obcas', label: 'Občas ako spestrenie' },
        { v: 'vynimocne', label: 'Len výnimočne' },
      ],
    },
    { druh: 'otazka', id: 'skusenost_fungovalo', typ: 'text', text: 'Čo fungovalo najlepšie a čo chceš nabudúce inak?', podmienka: { ot: 'skusenost_hodnotenie', nie: 'neprijemne' } },
  ],
}

const BEZ_SKUSENOSTI: Blok = {
  druh: 'skupina', id: 'bez_skusenosti', nadpis: 'Zvedavosť, fantázia a možnosť reality',
  podmienka: { ot: 'skusenost', je: 'nemam' },
  bloky: [
    {
      druh: 'otazka', id: 'fantazia_vyskyt', typ: 'jeden',
      text: g('Objavuje sa ti intimita s iným mužom v myšlienkach alebo fantáziách?', 'Objavuje sa ti intimita s inou ženou v myšlienkach alebo fantáziách?'),
      moznosti: [
        { v: 'silna', label: 'Je to moja silná alebo opakujúca sa fantázia' },
        { v: 'obcas', label: 'Je to občasná predstava' },
        { v: 'zvedavost', label: 'Skôr zvedavosť než konkrétna fantázia' },
        { v: 'nie', label: 'Neobjavuje sa mi spontánne, ale chcem tému preskúmať' },
      ],
    },
    {
      druh: 'otazka', id: 'fantazia_pocit', typ: 'jeden', text: 'Aký pocit v tebe táto predstava vyvoláva?',
      moznosti: [
        { v: 'vzrusenie', label: 'Príjemný a výrazne vzrušujúci' },
        { v: 'zvedavost', label: 'Skôr zvedavý než vzrušujúci' },
        { v: 'zmiesane', label: 'Rozpačitý alebo zmiešaný' },
        { v: 'ziadny', label: 'Zatiaľ vo mne nevyvoláva túžbu' },
      ],
    },
    {
      druh: 'otazka', id: 'fantazia_realita', typ: 'jeden', text: 'Aký je tvoj súčasný vzťah k preneseniu tejto predstavy do reality?',
      moznosti: [
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'partner', label: g('Vyskúšal by som to, ak by to lákalo partnerku', 'Vyskúšala by som to, ak by to lákalo partnera') },
        { v: 'podmienky', label: 'Možno — iba za jasných podmienok' },
        { v: 'fantazia', label: 'Chcem, aby to zostalo iba fantáziou' },
        { v: 'nie', label: 'Nechcem to preniesť do reality' },
      ],
    },
    { druh: 'otazka', id: 'fantazia_podmienky', typ: 'text', text: 'Aké podmienky by si potreboval/a?', podmienka: { ot: 'fantazia_realita', je: 'podmienky' } },
    {
      druh: 'otazka', id: 'fantazia_bariery', typ: 'viac', inePovolene: true,
      text: 'Čo ti môže brániť cítiť sa pri tejto možnosti slobodne?',
      podmienka: { ot: 'fantazia_realita', jeNiektora: ['tuzim', 'partner', 'podmienky'] },
      moznosti: [
        { v: 'technika', label: 'Neistota, či by som vedel/a, čo robiť' },
        { v: 'telo', label: g('Porovnávanie tela alebo tlak na výkon', 'Porovnávanie môjho tela s jej telom') },
        { v: 'identita', label: 'Obava, čo to znamená pre moju orientáciu alebo identitu' },
        { v: 'partner', label: g('Strach z reakcie partnerky alebo zo straty jej príťažlivosti ku mne', 'Strach z reakcie partnera') },
        { v: 'okolie', label: 'Obava z odsúdenia okolia' },
        { v: 'nic', label: g('Nič — som otvorený preskúmaniu', 'Nič — som otvorená preskúmaniu') },
      ],
    },
  ],
}

const VYVOJ: Blok = {
  druh: 'otazka', id: 'skala_posun', typ: 'jeden', text: 'Ako sa tvoja zvedavosť alebo túžba vyvíja?',
  moznosti: [
    { v: 'rastie', label: 'Rastie' },
    { v: 'stabilne', label: 'Je dlhodobo podobná' },
    { v: 'vlny', label: 'Prichádza vo vlnách' },
    { v: 'slabne', label: 'Skôr slabne' },
  ],
}

const POCITY: Blok = {
  druh: 'skupina', id: 'pocity', nadpis: 'Psychológia a zmiešané pocity',
  bloky: [
    p('poc_vina', 'Vzrušenie premiešané s vinou alebo hanbou'),
    { druh: 'otazka', id: 'poc_identita', typ: 'text', text: 'Obavy z identity („čo to o mne hovorí?") — čo mi pomáha to zvládnuť:' },
    {
      druh: 'otazka', id: 'poc_rozdiel', typ: 'jeden',
      text: 'Romantická vs. telesná túžba',
      moznosti: [
        { v: 'len_telesna', label: 'Ide mi len o telesnú zvedavosť' },
        { v: 'aj_romanticka', label: 'Je v tom aj romantická rovina' },
        { v: 'nevieme', label: 'Ešte neviem' },
      ],
    },
  ],
}

const INTERAKCIE: Blok = {
  druh: 'skupina', id: 'interakcie', nadpis: 'Čo chcem prijímať a čo poskytovať',
  uvod: 'Obe strany sa vyberajú oddelene. Túžba prijímať automaticky neznamená túžbu robiť to isté druhému človeku.',
  bloky: [
    {
      druh: 'otazka', id: 'interakcie_prijimat', typ: 'viac', inePovolene: true, rola: 'prijimam',
      text: g('Aké interakcie by si bol ochotný prijímať od druhého muža?', 'Aké interakcie by si bola ochotná prijímať od druhej ženy?'),
      moznosti: [
        { v: 'nahota', label: 'Spoločná nahota — vnímať telo druhého človeka bez priameho dotyku' },
        { v: 'bozky', label: 'Bozkávanie — jemné, skúmavé alebo vášnivé' },
        { v: 'telo', label: g('Hladenie tela, hrude, stehien alebo krku — vnímať jeho dotyky', 'Hladenie tela, pŕs, stehien alebo krku — vnímať jej dotyky') },
        { v: 'ruka', label: g('Dráždenie rukou alebo erotickou pomôckou na penise, semenníkoch alebo anuse', 'Dráždenie rukou alebo erotickou pomôckou na vulve, klitorise alebo vo vagíne') },
        { v: 'oral', label: g('Orálna stimulácia penisu, semenníkov alebo anusu jeho ústami a jazykom', 'Orálna stimulácia vulvy a klitorisu jej ústami a jazykom') },
        { v: 'penetracia', label: g('Análna penetrácia prstami, hračkou alebo penisom — podľa mojej roly a túžby', 'Vaginálna alebo análna penetrácia prstami či strap-onom — podľa mojej roly a túžby') },
        { v: 'trenie', label: g('Vzájomné trenie tiel alebo penisov', 'Trenie vuliev alebo tiel — tribbing/scissoring') },
        { v: 'iba_poskytovat', label: g('Nechcem od neho nič prijímať — chcem sa venovať iba jemu', 'Nechcem od nej nič prijímať — chcem sa venovať iba jej') },
      ],
    },
    {
      druh: 'otazka', id: 'interakcie_poskytovat', typ: 'viac', inePovolene: true, rola: 'poskytujem',
      text: g('Aké interakcie by si bol ochotný poskytovať druhému mužovi?', 'Aké interakcie by si bola ochotná poskytovať druhej žene?'),
      moznosti: [
        { v: 'bozky', label: 'Bozkávanie — jemné, vášnivé alebo skúmavé' },
        { v: 'telo', label: g('Hladenie jeho tela, hrude, stehien alebo krku a sledovanie jeho reakcií', 'Hladenie jej tela, pŕs, stehien alebo krku a sledovanie jej reakcií') },
        { v: 'ruka', label: g('Dráždenie jeho penisu, semenníkov alebo anusu rukou či erotickou pomôckou', 'Dráždenie jej vulvy, klitorisu alebo vagíny rukou či erotickou pomôckou') },
        { v: 'oral', label: g('Orálna stimulácia jeho penisu, semenníkov alebo anusu', 'Orálna stimulácia jej vulvy a klitorisu — cítiť jej vzrušenie na perách a jazyku') },
        { v: 'penetracia', label: g('Penetrovať jeho anus prstami, hračkou alebo penisom', 'Penetrovať jej vagínu alebo anus prstami či strap-onom') },
        { v: 'trenie', label: g('Vzájomné trenie tiel alebo penisov', 'Trenie vuliev alebo tiel — tribbing/scissoring') },
        { v: 'iba_prijimat', label: g('Nechcem mu nič poskytovať — chcem iba prijímať', 'Nechcem jej nič poskytovať — chcem iba prijímať') },
      ],
    },
    {
      druh: 'otazka', id: 'hard_rola', typ: 'jeden',
      text: 'Ktorá rola ma láka',
      moznosti: [
        { v: 'top', label: 'Top — ja vediem / penetrujem' },
        { v: 'bottom', label: 'Bottom — prijímam' },
        { v: 'versatile', label: 'Obe (versatile)' },
        { v: 'nevie', label: 'Neviem, zistím to' },
        { v: 'ziadna', label: 'Bez rolí — len vzájomne' },
      ],
    },
    {
      druh: 'otazka', id: 'hard_postup', typ: 'jeden',
      text: g('Akým tempom by si chcel postupovať?', 'Akým tempom by si chcela postupovať?'),
      moznosti: [
        { v: 'krokmi', label: 'Pomaly, krok po kroku — najprv soft, potom viac' },
        { v: 'podla_situacie', label: 'Podľa toho, ako sa to rozbehne' },
        { v: 'naplno', label: 'Hneď naplno' },
      ],
    },
    {
      druh: 'text', id: 'hard_pomocky', ton: 'info',
      telo: 'Výber strap-onov, díld a análnych hračiek (tvary, veľkosti, postroje) je v téme „Erotické pomôcky a hračky".',
    },
    {
      druh: 'otazka', id: 'for_skupinovy', typ: 'viac',
      text: 'Skupinový kontext',
      moznosti: [
        { v: 'trojka', label: 'Pri trojke — dotyky medzi rovnakým pohlavím' },
        { v: 'soft_bi', label: 'Soft bi hry (maznanie, bozkávanie)' },
        { v: 'par_plus', label: 'Pár + rovnakopohlavná osoba' },
        { v: 'spolocne_partner', label: g('S druhým mužom sa striedať alebo sa súčasne venovať partnerke', 'S druhou ženou sa striedať alebo sa súčasne venovať partnerovi') },
        { v: 'dvojita_stimulacia', label: g('Dvojitá penetrácia alebo iná synchronizovaná stimulácia partnerky', 'Dvojitá alebo synchronizovaná stimulácia partnera') },
      ],
    },
  ],
}

// ── Karta: Aký rozsah by som reálne chcel/a ──────────────────────────
const ROZSAH: Blok = {
  druh: 'skupina', id: 'rozsah', nadpis: g('Aký rozsah by si reálne chcel?', 'Aký rozsah by si reálne chcela?'),
  bloky: [
    {
      druh: 'otazka', id: 'rozsah_realny', typ: 'skala',
      text: g('Kam až by si reálne chcel zájsť?', 'Kam až by si reálne chcela zájsť?'),
      moznosti: [
        { v: 'nic', label: 'Nikam — ostane to v hlave' },
        { v: 'pozerat', label: 'Len sa pozerať' },
        { v: 'soft', label: 'Soft bi — dotyky a bozky' },
        { v: 'soft_ruky', label: 'Soft bi + ruky na genitáliách' },
        { v: 'oral', label: '+ orál' },
        { v: 'prsty_hracky', label: '+ prsty / hračky / strap-on' },
        { v: 'vsetko', label: g('Všetko vrátane penetrácie penisom', 'Všetko bez obmedzení') },
      ],
    },
    {
      druh: 'otazka', id: 'rozsah_kto', typ: 'viac', inePovolene: true,
      text: g('S kým by som si to vedel predstaviť', 'S kým by som si to vedela predstaviť'),
      moznosti: [
        { v: 'neznamy', label: 'Neznámy človek (klub, aplikácia)' },
        { v: 'znamy', label: 'Niekto, koho poznáme' },
        { v: 'par', label: 'Iný pár' },
        { v: 'typ', label: 'Len konkrétny typ človeka' },
      ],
    },
  ],
}

const PREDSTAVY: Blok = {
  druh: 'skupina', id: 'predstavy', nadpis: 'Vzrušujúce predstavy a kontext',
  bloky: [
    {
      druh: 'otazka', id: 'pred_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré predstavy ma lákajú',
      moznosti: [
        { v: 'bozkavanie', label: 'Bozkávanie rovnakého pohlavia' },
        { v: 'oral', label: 'Orálne praktiky' },
        { v: 'penetracia', label: 'Penetrácia / strap-on' },
        { v: 'zdielanie', label: 'Zdieľanie partnera s rovnakým pohlavím' },
      ],
    },
    {
      druh: 'otazka', id: 'pred_rovina', typ: 'jeden',
      text: 'Rovina',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia' },
        { v: 'talk', label: '„Talk" počas sexu' },
        { v: 'raz', label: 'Reálne — len raz na vyskúšanie' },
        { v: 'otvorene', label: 'Reálne — otvorene' },
      ],
    },
    {
      druh: 'otazka', id: 'pred_kontext', typ: 'jeden',
      text: 'Kontext',
      moznosti: [
        { v: 'trojka', label: 'Pri trojke' },
        { v: 'solo', label: 'Sólo (bez partnera, s dohodou)' },
        { v: 'pred_partnerom', label: 'Pred partnerom' },
      ],
    },
  ],
}

// ── Karta: Moje podmienky a červené línie ────────────────────────────
const HRANICE: Blok = {
  druh: 'skupina', id: 'hranice', nadpis: 'Moje podmienky a červené línie',
  bloky: [
    {
      druh: 'otazka', id: 'hr_prepinace', typ: 'viac',
      text: 'Prepínače komfortu',
      moznosti: [
        { v: 'len_dotyk', label: '„Len dotyk"' },
        { v: 'len_pred_partnerom', label: '„Len pred partnerom"' },
        { v: 'bez_oralu', label: '„Bez vzájomného orálneho sexu"' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_podmienky', typ: 'viac', inePovolene: true,
      text: 'Moje podmienky',
      moznosti: [
        { v: 'partner_pritomny', label: g('Partnerka musí byť pri tom', 'Partner musí byť pri tom') },
        { v: 'partner_zapojeny', label: g('Partnerka sa musí zapojiť', 'Partner sa musí zapojiť') },
        { v: 'partner_nie', label: g('Radšej bez partnerky pri tom', 'Radšej bez partnera pri tom') },
        { v: 'mimo_okolia', label: 'Nikto z nášho okolia' },
        { v: 'najprv_stretnutie', label: 'Najprv stretnutie bez sexu' },
        { v: 'sympatia', label: 'Musí ma daný človek priťahovať' },
        { v: 'alkohol', label: 'Ľahšie sa uvoľním po poháriku' },
      ],
    },
    {
      druh: 'otazka', id: 'hr_tabu', typ: 'viac',
      text: 'Čo je pre mňa tabu / nekomfort',
      moznosti: [
        { v: 'plna_penetracia', label: 'Úplná penetrácia' },
        { v: 'uzky_kontakt', label: 'Úzky telesný kontakt' },
        { v: 'pasivny', label: 'Úloha pasívneho prijímateľa' },
        { v: 'emocne', label: 'Emocionálne zblíženie' },
      ],
    },
    { druh: 'otazka', id: 'hr_ano', typ: 'text', text: 'ÁNO — čo chcem:' },
    { druh: 'otazka', id: 'hr_mozno', typ: 'text', text: 'MOŽNO — za akých podmienok:' },
    { druh: 'otazka', id: 'hr_nikdy', typ: 'text', text: 'NIKDY — tvrdé limity:' },
    {
      druh: 'text', id: 'hr_zakazane_info', ton: 'info',
      telo: 'Časť príťažlivosti býva presne v tom, že je to „zakázané" — iný rytmus vzrušenia než to, čo je bežne dovolené. To je úplne normálne.',
    },
  ],
}

// ── Karta: Ako to integrujeme do nášho vzťahu ────────────────────────
const INTEGRACIA: Blok = {
  druh: 'skupina', id: 'integracia', nadpis: 'Ako to integrujeme do nášho vzťahu',
  bloky: [
    {
      druh: 'otazka', id: 'int_forma', typ: 'viac', inePovolene: true,
      text: 'Akú podobu by to u nás malo mať',
      moznosti: [
        { v: 'talk', label: 'Dirty talk a fantázie spolu v posteli' },
        { v: 'porno', label: 'Spoločné sledovanie bi porna' },
        { v: 'hracky', label: 'Hra s hračkami, ktoré to napodobňujú' },
        { v: 'obcas_trojka', label: 'Občasná trojka / stretnutie' },
        { v: 'pravidelne', label: 'Pravidelná súčasť nášho sexu' },
        { v: 'samostatne', label: 'Samostatne, s dohodou a zdieľaním zážitku' },
        { v: 'nie', label: 'Nechcem to do vzťahu zapájať' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_raz', typ: 'jeden',
      text: g('Ako by si sa cítil, keby to bolo len raz?', 'Ako by si sa cítila, keby to bolo len raz?'),
      moznosti: [
        { v: 'v_pohode', label: 'V pohode' },
        { v: 'debrief', label: g('Potreboval by som sa o tom potom porozprávať', 'Potrebovala by som sa o tom potom porozprávať') },
        { v: 'nie', label: 'Nie, to nie je pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'int_partner_bi', typ: 'jeden', inePovolene: true,
      text: g('Ako na teba pôsobí predstava, že partnerka túži po interakcii s inou ženou?', 'Ako na teba pôsobí predstava, že partner túži po interakcii s iným mužom?'),
      moznosti: [
        { v: 'vidiet_zapojit', label: g('Veľmi ma to vzrušuje — chcem to vidieť alebo sa zapojiť', 'Veľmi ma to vzrušuje — chcem to vidieť alebo sa zapojiť') },
        { v: 'solo', label: g('Vzrušuje ma aj jej samostatný zážitok a chcem o ňom počuť', 'Vzrušuje ma aj jeho samostatný zážitok a chcem o ňom počuť') },
        { v: 'fantazia', label: 'Láka ma to iba ako spoločná fantázia alebo dirty talk' },
        { v: 'doprajem', label: g('Nevzrušuje ma to, ale jej túžbu viem prijať', 'Nevzrušuje ma to, ale jeho túžbu viem prijať') },
        { v: 'ohrozenie', label: 'Vyvoláva to vo mne žiarlivosť alebo pocit ohrozenia' },
        { v: 'turnoff', label: g('Zmenilo by to môj pohľad na jej príťažlivosť', 'Zmenilo by to môj pohľad na jeho príťažlivosť') },
        { v: 'tabu', label: 'Je to pre mňa hranica — nechcem to prenášať do reality' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chceš, aby partnerka vedela?', 'Čo chceš, aby partner vedel?') },
  ],
}

const POKRACOVANIE_SO_SKUSENOSTOU: Blok = {
  druh: 'skupina', id: 'pokracovanie_so_skusenostou',
  podmienka: { vsetky: [
    { ot: 'skusenost', je: 'mam' },
    { ot: 'skusenost_hodnotenie', jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
  ] },
  bloky: [VYVOJ, POCITY, INTERAKCIE, ROZSAH, PREDSTAVY, HRANICE, INTEGRACIA],
}

const POKRACOVANIE_BEZ_SKUSENOSTI: Blok = {
  druh: 'skupina', id: 'pokracovanie_bez_skusenosti',
  podmienka: { vsetky: [
    { ot: 'skusenost', je: 'nemam' },
    { ot: 'fantazia_realita', jeNiektora: ['tuzim', 'partner', 'podmienky', 'fantazia'] },
  ] },
  bloky: [VYVOJ, POCITY, INTERAKCIE, ROZSAH, PREDSTAVY, HRANICE, INTEGRACIA],
}

export const ROVNAKE_POHLAVIE: TemaObsah = {
  slug: 'bi-zvedavost/bi-zvedavost',
  nadpis: 'Interakcie s rovnakým pohlavím',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'uvod', nadpis: 'Zvedavosť, fantázie a praktiky',
      telo:
        'Prečo niektorí ľudia fantazírujú o rovnakom pohlaví — „bisexual curiosity". ' +
        'Rozdiel medzi romantickou a telesnou túžbou. Fantázia nemusí meniť orientáciu.',
    },
    {
      druh: 'text', id: 'terminologia', nadpis: 'Soft bi vs. hard bi',
      telo:
        'Bežné rozlíšenie: „soft bi" — dotyky, bozkávanie, spoločná nahota, bez penetrácie; ' +
        '„hard bi" — orál alebo penetrácia s rovnakým pohlavím (prsty, strap-on, penis, roly top/bottom). ' +
        'Netreba prechádzať od jedného k druhému — je v poriadku ostať natrvalo pri soft bi.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Ako s tým pracovať', ton: 'info',
      telo: 'Zápis „Áno – Možno – Nikdy" pre oboch. Kto chce, postupuje pomaly — od predstavy cez soft bi k tomu, čo reálne láka.',
    },
  ],
  telo: [
    SKUSENOST,
    SO_SKUSENOSTOU,
    BEZ_SKUSENOSTI,
    POKRACOVANIE_SO_SKUSENOSTOU,
    POKRACOVANIE_BEZ_SKUSENOSTI,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako NIKDY, sa nikde nezobrazí.',
    },
  ],
}
