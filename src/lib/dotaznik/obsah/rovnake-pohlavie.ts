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

// ── Karta: Kde som na škále zvedavosť ↔ prax ─────────────────────────
const SKALA: Blok = {
  druh: 'skupina', id: 'skala', nadpis: 'Kde som na škále zvedavosť ↔ prax',
  bloky: [
    {
      druh: 'otazka', id: 'skala_miesto', typ: 'skala',
      text: g('Kde som dnes na škále vo vzťahu k mužom', 'Kde som dnes na škále vo vzťahu k ženám'),
      moznosti: [
        { v: 'nic', label: 'Vôbec ma to neláka' },
        { v: 'myslienka', label: 'Občas mi to prebehne hlavou' },
        { v: 'fantazia', label: 'Je to moja fantázia (pri sexe, masturbácii)' },
        { v: 'chcem_skusit', label: 'Chcem to reálne skúsiť' },
        { v: 'skusil', label: g('Skúsil som to', 'Skúsila som to') },
        { v: 'prax', label: 'Je to súčasť môjho sexuálneho života' },
      ],
    },
    {
      druh: 'otazka', id: 'skala_posun', typ: 'jeden',
      text: 'Ako sa to u mňa vyvíja',
      moznosti: [
        { v: 'rastie', label: 'Zvedavosť rastie' },
        { v: 'stabilne', label: 'Je to dlhodobo rovnaké' },
        { v: 'vlny', label: 'Prichádza vo vlnách' },
        { v: 'slabne', label: 'Skôr slabne' },
      ],
    },
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

// ── Karta: Soft bi — čo je ešte OK ───────────────────────────────────
const SOFT_BI: Blok = {
  druh: 'skupina', id: 'soft_bi', nadpis: 'Soft bi — čo je ešte OK',
  uvod: 'Dotyky a bozky bez penetrácie. Pri každej položke zvlášť — kde je moja hranica.',
  bloky: [
    {
      druh: 'otazka', id: 'for_jemna', typ: 'viac',
      text: 'Jemná fyzická interakcia — čo si viem predstaviť',
      moznosti: [
        { v: 'nahota', label: 'Spoločná nahota (sprcha, sauna)' },
        { v: 'dotyky', label: 'Dotyky bez penetrácie' },
        { v: 'maznanie', label: 'Maznanie a bozkávanie' },
        { v: 'oral', label: 'Orálna stimulácia' },
      ],
    },
    p('soft_bozk', 'Bozk na ústa'),
    p('soft_bozk_hlboky', 'Hlboký, vášnivý bozk'),
    p('soft_telo', 'Hladkanie tela, masáž'),
    p('soft_prsia', g('Dotyky hrude a bradaviek', 'Dotyky pŕs a bradaviek')),
    p('soft_genitalie', 'Dotyky genitálií rukou'),
    p('soft_masturbacia', 'Vzájomná masturbácia'),
    p('soft_vedla', 'Masturbovať vedľa seba bez dotyku'),
    p('soft_trenie', g('Trenie tiel o seba', 'Trenie tiel o seba (tribbing)')),
    p('soft_tanec', 'Erotický tanec, obchytkávanie'),
  ],
}

// ── Hard bi — orál, prsty, strap-on, penetrácia, roly ────────────────
const HARD_BI: Blok = {
  druh: 'skupina', id: 'hard_bi', nadpis: 'Hard bi — orál a penetrácia',
  bloky: [
    {
      druh: 'otazka', id: 'for_penetracia', typ: 'viac',
      text: 'Penetrácia a hlbšie interakcie',
      moznosti: [
        { v: 'strap_prsty', label: g('Análna hra prstami', 'Hra prstami a strap-onom') },
        { v: 'top_bottom', label: '„Top" a „bottom" dynamika' },
        { v: 'ziadne', label: 'Žiadne' },
      ],
    },
    p('hard_oral_dat', g('Dávať orál mužovi', 'Dávať orál žene')),
    p('hard_oral_prijat', g('Prijímať orál od muža', 'Prijímať orál od ženy')),
    p('hard_prsty_dat', g('Prstovať iného muža (anál)', 'Prstovať inú ženu')),
    p('hard_prsty_prijat', g('Nechať sa prstovať iným mužom (anál)', 'Nechať sa prstovať inou ženou')),
    p('hard_strapon', g('Strap-on / dildo medzi mužmi', 'Strap-on — dávať alebo prijímať')),
    p('hard_penetracia', g('Análna penetrácia penisom', 'Penetrácia hračkou, ktorú drží ona')),
    p('hard_ejakulacia', g('Ejakulácia iného muža na mňa / do mňa', 'Priviesť ju k orgazmu / nechať sa ňou priviesť k orgazmu')),
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
      text: 'Akým tempom by som chcel(a) postupovať',
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
      ],
    },
  ],
}

// ── Karta: Aký rozsah by som reálne chcel(a) ─────────────────────────
const ROZSAH: Blok = {
  druh: 'skupina', id: 'rozsah', nadpis: 'Aký rozsah by som reálne chcel(a)',
  bloky: [
    {
      druh: 'otazka', id: 'rozsah_realny', typ: 'skala',
      text: 'Kam až by som reálne chcel(a) zájsť',
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
        { v: 'partner_pritomny', label: 'Partner/ka musí byť pri tom' },
        { v: 'partner_zapojeny', label: 'Partner/ka sa musí zapojiť' },
        { v: 'partner_nie', label: 'Radšej bez partnera/ky pri tom' },
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
      text: 'Ako by som sa cítil(a), keby to bolo len raz',
      moznosti: [
        { v: 'v_pohode', label: 'V pohode' },
        { v: 'debrief', label: 'Potreboval(a) by som debrief' },
        { v: 'nie', label: 'Nie, to nie je pre mňa' },
      ],
    },
    p('int_partner_bi', g('Vzrušuje ma predstava, že moja partnerka je s inou ženou', 'Vzrušuje ma predstava, že môj partner je s iným mužom')),
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
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
    {
      druh: 'otazka', id: 'skusenost', typ: 'jeden',
      text: 'Chcel(a) by si niekedy skúsiť dotyk / interakciu s rovnakým pohlavím?',
      moznosti: [
        { v: 'robime', label: 'Už sme to zažili a som spokojný/á' },
        { v: 'tuzim', label: 'Túžim to skúsiť' },
        { v: 'zvedavy', label: 'Som zvedavý/á, ale len ako fantázia' },
        { v: 'neutral', label: 'Neutrálne' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
    SKALA,
    POCITY,
    SOFT_BI,
    HARD_BI,
    ROZSAH,
    PREDSTAVY,
    HRANICE,
    INTEGRACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako NIKDY, sa nikde nezobrazí.',
    },
  ],
}
