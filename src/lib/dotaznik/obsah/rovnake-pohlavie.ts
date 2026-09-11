import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Interakcie s rovnakým pohlavím — modul H1 „Bi-zvedavosť / rovnaké pohlavie".
// Zdroj: „zdroj.docx" (sekcia Interakcie s rovnakým pohlavím). Psychológia
// (fantázia vs. realita, bi curiosity, zmiešané pocity), formáty interakcie,
// vzrušujúce predstavy, kontext, hranice, komunikácia, bezpečnosť.
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

const FORMATY: Blok = {
  druh: 'skupina', id: 'formaty', nadpis: 'Formáty interakcie',
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
    {
      druh: 'otazka', id: 'for_penetracia', typ: 'viac',
      text: 'Penetrácia a hlbšie interakcie',
      moznosti: [
        { v: 'strap_prsty', label: 'Hra s análnymi praktikami (strap-on, prsty)' },
        { v: 'top_bottom', label: '„Top" a „bottom" dynamika' },
        { v: 'ziadne', label: 'Žiadne' },
      ],
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

const HRANICE: Blok = {
  druh: 'skupina', id: 'hranice', nadpis: 'Hranice',
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
  ],
}

const KOMUNIKACIA: Blok = {
  druh: 'skupina', id: 'komunikacia', nadpis: 'Komunikácia a bezpečnosť',
  bloky: [
    {
      druh: 'otazka', id: 'kom_raz', typ: 'jeden',
      text: 'Ako by som sa cítil(a), keby to bolo len raz',
      moznosti: [
        { v: 'v_pohode', label: 'V pohode' },
        { v: 'debrief', label: 'Potreboval(a) by som debrief' },
        { v: 'nie', label: 'Nie, to nie je pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'kom_bezpecnost', typ: 'viac',
      text: 'Bezpečnostné zásady',
      moznosti: [
        { v: 'suhlas', label: 'Súhlas všetkých' },
        { v: 'ochrana', label: 'Ochrana pred infekciami' },
        { v: 'pravo_prestat', label: 'Právo kedykoľvek prestať' },
      ],
    },
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
        '„hard bi" — orál alebo penetrácia s rovnakým pohlavím. Netreba prechádzať od jedného k druhému — ' +
        'je v poriadku ostať natrvalo pri soft bi.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo:
        'Súhlas všetkých, ochrana pred infekciami, právo kedykoľvek prestať. ' +
        'Zápis „Áno – Možno – Nikdy" pre oboch a diskusia bez tlaku.',
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
    POCITY,
    FORMATY,
    PREDSTAVY,
    HRANICE,
    KOMUNIKACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako NIKDY, sa nikde nezobrazí.',
    },
  ],
}
