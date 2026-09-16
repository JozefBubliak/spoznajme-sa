import type { TemaObsah, Blok, Moznost } from './typ'

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

// ── Fyzická príprava a starostlivosť ───────────────────────────────────
const PRIPRAVA: Blok = {
  druh: 'skupina', id: 'priprava', nadpis: 'Fyzická príprava a starostlivosť o telo',
  bloky: [
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
      druh: 'otazka', id: 'pri_oblecenie', typ: 'viac', inePovolene: true,
      text: 'Aké oblečenie ma pri intímnych chvíľach najviac láka (nosiť aj vidieť na partnerovi)',
      moznosti: [
        { v: 'bielizen', label: 'Erotická spodná bielizeň' },
        { v: 'kostym', label: 'Kostýmy pre roleplay' },
        { v: 'pohodlne', label: 'Pohodlné domáce oblečenie' },
        { v: 'nahota', label: 'Nahota s dôrazom na prirodzenosť' },
      ],
    },
    p('pri_sebavedomie', 'Oblečenie / vlasy / detaily, ktoré mi dodávajú sebavedomie, sú pre mňa dôležité'),
    {
      druh: 'otazka', id: 'pri_doplnky', typ: 'viac',
      text: 'Doplnky, ktoré mi pri intímnych chvíľach pridávajú na sebavedomí',
      moznosti: [
        { v: 'podpatky', label: 'Podpätky' },
        { v: 'bosé', label: 'Bosé nohy / prirodzenosť' },
        { v: 'sperky', label: 'Šperky (náušnice, náhrdelník)' },
        { v: 'ziadne', label: 'Žiadne — bez doplnkov mi je najlepšie' },
      ],
    },
  ],
}

// ── Signály pripravenosti ────────────────────────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Signály pripravenosti a očný kontakt',
  bloky: [
    {
      druh: 'otazka', id: 'sig_nepriame', typ: 'viac',
      text: 'Nepriame prejavy túžby, ktoré sú mi najpríjemnejšie',
      moznosti: [
        { v: 'dotyky', label: 'Nenápadné dotyky počas bežných aktivít' },
        { v: 'pohlady', label: 'Láskyplné pohľady a úsmevy' },
        { v: 'bozky', label: 'Bozky na ústa alebo iné časti tela' },
      ],
    },
    { druh: 'otazka', id: 'sig_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) takéto gestá zažívať',
      moznosti: [
        { v: 'denne', label: 'Denne, ako súčasť každodenného života' },
        { v: 'obcas', label: 'Občas, podľa situácie' },
        { v: 'zriedka', label: 'Zriedka — uprednostňujem iné formy náklonnosti' },
      ],
    },
    {
      druh: 'otazka', id: 'sig_ocny_kontakt', typ: 'jeden',
      text: 'Význam očného kontaktu počas intímnych chvíľ',
      moznosti: [
        { v: 'velmi', label: 'Veľmi dôležitý — rád(a) sa pozerám do očí' },
        { v: 'obcas', label: 'Občas, záleží na situácii' },
        { v: 'nie', label: 'Nie, radšej mám oči zatvorené' },
      ],
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
      druh: 'text', id: 'sexting_intro',
      telo:
        'Erotická komunikácia počas dňa je most medzi fantáziou a realitou — hravá správa, krátka hlasovka, ' +
        'nenápadný dotyk na verejnosti. Očakávanie sa stáva súčasťou predohry ešte predtým, než sa dotknete.',
    },
    {
      druh: 'otazka', id: 'sex_zaujem', typ: 'jeden',
      text: 'Záujem o výmenu erotických správ počas dňa',
      moznosti: [
        { v: 'ano', label: 'Áno, rád(a) flirtujem a budujem vzrušenie cez texty' },
        { v: 'mozno', label: 'Možno, ak je správny kontext a nálada' },
        { v: 'nie', label: 'Nie, preferujem osobný kontakt' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_intenzita', typ: 'jeden',
      text: 'Preferovaná intenzita správ',
      moznosti: [
        { v: 'naznaky', label: 'Náznaky a jemné flirtovanie' },
        { v: 'priame', label: 'Priame a detailné popisy fantázií' },
      ],
    },
    {
      druh: 'otazka', id: 'sex_formy', typ: 'viac',
      text: 'Iné formy erotickej komunikácie okrem textu',
      moznosti: [
        { v: 'hlasovka', label: 'Hlasové správy so zvodným tónom' },
        { v: 'video', label: 'Videohovory na zdieľanie fantázií' },
        { v: 'foto', label: 'Erotická fotografia' },
        { v: 'listocek', label: 'Skrytý odkaz / lístoček' },
        { v: 'len_text', label: 'Nie, len text' },
      ],
    },
  ],
}

// ── Vedome dohodnutá iniciácia + polohy mimo spálne ──────────────────
const INICIACIA: Blok = {
  druh: 'skupina', id: 'iniciacia', nadpis: 'Vedome dohodnutá iniciácia',
  bloky: [
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
      druh: 'otazka', id: 'ini_polohy_mimo', typ: 'viac',
      text: 'Polohy mimo spálne, ktoré by som chcel(a) vyskúšať',
      moznosti: [
        { v: 'gauc', label: 'Na gauči' },
        { v: 'sprcha', label: 'V sprche alebo vani' },
        { v: 'auto', label: 'V aute' },
        { v: 'vonku', label: 'Vonku (diskrétne)' },
        { v: 'nie', label: 'Nie, radšej zostávam v spálni' },
      ],
    },
    {
      druh: 'otazka', id: 'ini_pomocky_polohy', typ: 'viac',
      text: 'Pomôcky pri polohách mimo spálne',
      moznosti: [
        { v: 'vibrator', label: 'Vibrátory na klitoris alebo G-bod' },
        { v: 'bondage', label: 'Bondage pomôcky' },
        { v: 'vankuse', label: 'Polohovacie vankúše' },
        { v: 'nie', label: 'Nie, radšej bez pomôcok' },
      ],
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
      druh: 'otazka', id: 'dt_pauzy_vnimanie', typ: 'jeden',
      text: 'Ako vnímam pauzy počas predohry (na bozky, hladenie, pohľad do očí)',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich — pridávajú romantiku a očakávanie' },
        { v: 'zalezi', label: 'Záleží na situácii' },
        { v: 'nemam_rad', label: 'Nemám ich rád(a), preferujem plynulé tempo' },
      ],
    },
    {
      druh: 'otazka', id: 'dt_formy_drazdenia', typ: 'viac',
      text: 'Formy dráždenia a zdržovania, ktoré mi vyhovujú',
      moznosti: [
        { v: 'bez_priamej_stimulacie', label: 'Jemné dráždenie bez priamej stimulácie (okolo intímnych miest)' },
        { v: 'kratke_pauzy', label: 'Krátke pauzy počas aktu' },
        { v: 'verbalne_drazdenie', label: 'Verbálne dráždenie — opisovanie, čo príde ďalej' },
      ],
    },
    {
      druh: 'text', id: 'dt_tipy_zdrzovanie', nadpis: 'Tipy na vyskúšanie', ton: 'info',
      telo:
        '„Jemné zdržovanie" — jeden z vás strieda dotyky s náhlymi pauzami, kedy len dýcha na citlivé miesta bez dotyku. ' +
        '„Spontánne objatie" — počas bežného večera začnite bozkávať krk, odtiahnite sa s úsmevom a nechajte partnera v napätí. ' +
        '„Kombinovaná predohra" — začnite spoločným kúpeľom, pokračujte masážou a zakončite zdržovaním počas hladenia.',
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
      ],
    },
    { druh: 'otazka', id: 'tnt_flow', typ: 'text', text: 'Môj ideálny sled krokov „cuddle → bozk → dotyk → …" (kde začať, kedy eskalovať):' },
  ],
}

// ── Masáž ────────────────────────────────────────────────────────────
const MASAZ: Blok = {
  druh: 'skupina', id: 'masaz', nadpis: 'Masáž',
  bloky: [
    {
      druh: 'otazka', id: 'mas_typ', typ: 'viac',
      text: 'Aké formy masáže by ma oslovili? (Vyber všetky.)',
      moznosti: [
        { v: 'klasicka', label: 'Klasická relaxačná masáž (chrbát, krk, ramená)' },
        { v: 'eroticka', label: 'Erotická masáž zameraná na intímne partie' },
        { v: 'cele_telo', label: 'Pomalá masáž celého tela bez konkrétneho cieľa' },
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
    { druh: 'otazka', id: 'mas_kto', typ: 'jeden',
      text: 'Kto zvyčajne masíruje',
      moznosti: [
        { v: 'striedame', label: 'Striedame sa' },
        { v: 'ja_davam', label: 'Radšej dávam ja' },
        { v: 'ja_prijimam', label: 'Radšej prijímam ja' },
      ],
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
      moznosti: POSTOJ,
    },
    {
      druh: 'otazka', id: 'hra_len_usta', typ: 'jeden',
      text: '„Len ústa" (bez rúk) ako samostatná hra',
      moznosti: POSTOJ,
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
    { druh: 'otazka', id: 'kom_top_prijimam', typ: 'text', text: 'Top kombinácie, ktoré chcem prijímať naraz (napr. genitál + bradavky, genitál + hrádza):' },
    { druh: 'otazka', id: 'kom_top_poskytujem', typ: 'text', text: 'Top kombinácie, ktoré rád(a) poskytujem naraz:' },
    {
      druh: 'otazka', id: 'kom_rytmus', typ: 'jeden',
      text: 'Pri kombinácii uprednostňujem',
      moznosti: [
        { v: 'staly', label: 'Stabilný rytmus na oboch miestach' },
        { v: 'striedanie', label: 'Striedanie — jedna ruka drží rytmus, druhá mení' },
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
    p('tea_nebrat_osobne', 'Keď na teaser rituál nereagujem, chcem, aby partner/ka to nebral(a) osobne'),
  ],
}

// ── Signály nálady ──────────────────────────────────────────────
const SIGNALY_NALADY: Blok = {
  druh: 'skupina', id: 'signaly_nalady', nadpis: 'Signály nálady',
  bloky: [
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
      druh: 'otazka', id: 'kon_zmierovaci', typ: 'jeden',
      text: '„Zmierovací" sex po hádke',
      moznosti: [
        { v: 'ano', label: 'Áno, pomáha nám to sa zblížiť' },
        { v: 'doriesit', label: 'Potrebujem najprv konflikt doriešiť' },
        { v: 'nie', label: 'Nie, po hádke nie som naladený/á' },
      ],
    },
    p('kon_prepnutie', 'Vedomé prepnutie režimu — dohodnutý spôsob, ako z hádky prejsť späť k blízkosti'),
    {
      druh: 'otazka', id: 'kon_zdravotne', typ: 'jeden',
      text: 'Predohra pri zdravotnom obmedzení / únave — čo pomáha',
      moznosti: [
        { v: 'jemnejsie', label: 'Jemnejšie techniky, nižšie tempo' },
        { v: 'ine_polohy', label: 'Prispôsobenie polôh' },
        { v: 'nesexualne', label: 'Radšej nesexuálna blízkosť v takej chvíli' },
      ],
    },
    {
      druh: 'otazka', id: 'kon_novota', typ: 'jeden',
      text: 'Predohra v novom prostredí (hotel, roleplay)',
      moznosti: [
        { v: 'viac_experimentu', label: 'Chcem viac experimentu' },
        { v: 'bezpecny_default', label: 'Radšej bezpečný, známy postup' },
      ],
    },
    { druh: 'otazka', id: 'kon_kratky_ritual', typ: 'text', text: 'Pri únave — môj ideálny krátky rituál (5–20 min), ktorý stále môže byť sexi:' },
    {
      druh: 'otazka', id: 'kon_reaktivny_start', typ: 'jeden',
      text: 'Keď chuť hneď nie je — bezpečný štart',
      moznosti: [
        { v: 'skusme_uvidime', label: '„Skúsme 5 minút a uvidíme"' },
        { v: 'jasne_nie', label: 'Radšej jasné „dnes nie" bez skúšania' },
      ],
    },
    { druh: 'otazka', id: 'kon_len_blizkost', typ: 'text', text: 'Čo presne je pre mňa „blízkosť bez sexu" — čo sa deje, ako dlho, kde sa to končí:' },
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
