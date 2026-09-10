import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Orálna intimita — modul C1 „Orál na vulvu a klitoris" (celá orál doména).
// Zdroj: „14_Oralna_intimita". Cunnilingus + felácia + anilingus + polohy +
// kombinácie + rámec, všetko s rolou prijímam / poskytujem.
// z/m verzia zrkadlová (rovnaké id + hodnoty).
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

// ── Cunnilingus ────────────────────────────────────────────────────────
const CUNNILINGUS: Blok = {
  druh: 'skupina', id: 'cunnilingus', nadpis: 'Cunnilingus (orál na vulvu a klitoris)',
  bloky: [
    p('cun_prijimam', 'Prijímať cunnilingus'),
    p('cun_poskytujem', 'Poskytovať cunnilingus'),
    {
      druh: 'otazka', id: 'cun_techniky', typ: 'viac', inePovolene: true,
      text: 'Techniky jazyka a pier — čo ma láka',
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie okolo klitorisu' },
        { v: 'tukance', label: 'Ťukance špičkou jazyka' },
        { v: 'plochy', label: '„Plochý jazyk" — široké olizovanie' },
        { v: 'sanie', label: 'Jemné sanie klitorisu' },
        { v: 'pery', label: 'Kombinácia jazyka a pier' },
        { v: 'hryznutie', label: 'Občasné jemné hryznutie' },
        { v: 'rychle', label: 'Rýchle jemné pohyby jazykom' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_kapucna', typ: 'jeden',
      text: 'Kontakt s klitorisom',
      moznosti: [
        { v: 'priamy', label: 'Priamy kontakt' },
        { v: 'kapucna', label: 'Cez kapucňu (nepriamo)' },
        { v: 'striedat', label: 'Striedať' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_prsty', typ: 'jeden',
      text: 'Koordinácia s prstami',
      moznosti: [
        { v: 'bez', label: 'Bez prstov' },
        { v: '1', label: '1 prst' },
        { v: '2', label: '2 prsty' },
        { v: 'g_bod', label: 'Klitoris + G-bod („come-hither", tlak dlane nad lonovou kosťou)' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_tempo', typ: 'jeden',
      text: 'Tempo a rytmus',
      moznosti: [
        { v: 'budovanie', label: 'Pomalé budovanie → rýchlejší záver' },
        { v: 'staly', label: 'Stály rytmus (nemeniť tesne pred orgazmom)' },
        { v: 'vlny', label: 'Vlny (pomalé ↔ rýchle)' },
        { v: 'signaly', label: 'Podľa signálov rukou' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_pauzy', typ: 'jeden',
      text: 'Pauzy na edging',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'mozno', label: 'Možno' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_poorgazmicka', typ: 'jeden',
      text: 'Po orgazme',
      moznosti: [
        { v: 'prestat', label: 'Prestať (precitlivenosť)' },
        { v: 'dobehnut', label: 'Dobehnúť jemnými dotykmi / bozkami' },
        { v: 'overstim', label: 'Pokračovať (overstim)' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_polohy', typ: 'viac',
      text: 'Komfortné polohy',
      moznosti: [
        { v: 'chrbat', label: 'Na chrbte s vankúšom pod bokmi' },
        { v: 'bok', label: 'Na boku' },
        { v: 'hrana', label: 'Na hrane postele' },
        { v: '69', label: '69' },
        { v: 'facesitting', label: 'Face-sitting' },
        { v: 'sprcha', label: 'V sprche' },
      ],
    },
  ],
}

// ── Felácia ───────────────────────────────────────────────────────────
const FELACIA: Blok = {
  druh: 'skupina', id: 'felacia', nadpis: 'Felácia (orál na penis)',
  bloky: [
    p('fel_prijimam', 'Prijímať feláciu'),
    p('fel_poskytujem', 'Poskytovať feláciu'),
    {
      druh: 'otazka', id: 'fel_techniky', typ: 'viac', inePovolene: true,
      text: 'Techniky pier a jazyka — čo ma láka',
      moznosti: [
        { v: 'sanie_zalud', label: 'Sanie žaluďa so zameraním na uzdičku (frenulum)' },
        { v: 'jazyk_koruna', label: 'Jazyk po korune' },
        { v: 'dlzka', label: 'Lízanie po celej dĺžke' },
        { v: 'tulip', label: '„Tulip / O" pery' },
        { v: 'kruzenie', label: 'Krúženie jazykom' },
        { v: 'striedanie', label: 'Striedanie sania a lízania' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_ruka', typ: 'viac',
      text: 'Ruka + ústa',
      moznosti: [
        { v: 'base_squeeze', label: 'Jedna ruka pri koreni („base-squeeze")' },
        { v: 'dve_ruky', label: 'Dve ruky' },
        { v: 'twist', label: '„Twist-and-slide"' },
        { v: 'synchron', label: 'Synchronizované pohyby ruky a úst' },
        { v: 'iluzia_hlbky', label: 'Ilúzia hĺbky cez ruku pri koreni' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_tlak_pier', typ: 'jeden',
      text: 'Tlak pier',
      moznosti: [
        { v: 'jemny', label: 'Jemné obopnutie' },
        { v: 'stredny', label: 'Stredne pevný tlak' },
        { v: 'silny', label: 'Silný tlak' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_tempo', typ: 'jeden',
      text: 'Tempo',
      moznosti: [
        { v: 'rovnomerne', label: 'Rovnomerné' },
        { v: 'vlny', label: 'Vlny (pomalé ↔ rýchle)' },
        { v: 'edging', label: 'Edging s pauzami' },
        { v: 'nalada', label: 'Podľa nálady' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_hlbka', typ: 'jeden',
      text: 'Hĺbka',
      moznosti: [
        { v: 'plytko', label: 'Plytko' },
        { v: 'stredne', label: 'Stredne' },
        { v: 'deep', label: 'Hlboké hrdlo (deep throat) — len so signálmi' },
        { v: 'iluzia', label: 'Radšej ilúzia hĺbky rukou' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_deepthroat', typ: 'jeden',
      text: 'Deep throat',
      moznosti: [
        { v: 'skusam', label: 'Chcem skúšať' },
        { v: 'intervaly', label: 'Len krátke intervaly so signálmi na pauzu' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_semenniky', typ: 'viac',
      text: 'Semenníky',
      moznosti: [
        { v: 'bozky', label: 'Bozky' },
        { v: 'lizanie', label: 'Lízanie švu' },
        { v: 'sanie', label: 'Jemné sanie jedného alebo oboch' },
        { v: 'tahanie', label: 'Jemné ťahanie' },
        { v: 'nezapajat', label: 'Nezapájať' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_perineum', typ: 'jeden',
      text: 'Hrádza (perineum)',
      moznosti: [
        { v: 'ano', label: 'Tlak / masáž — áno' },
        { v: 'jemne', label: 'Len jemne' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_teplota', typ: 'viac',
      text: 'Teplotné prvky',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'teply_dych', label: 'Teplý dych' },
        { v: 'nahriate', label: 'Nahriate ústa' },
        { v: 'striedanie', label: 'Striedanie vlnami' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'lezi', label: 'Partner leží' },
        { v: 'bok', label: 'Na boku' },
        { v: 'okraj', label: 'Cez okraj postele (odľahčenie krku)' },
        { v: 'kľaci', label: 'Kľačí' },
        { v: 'stolicka', label: 'Na gauči / stoličke' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_lub', typ: 'jeden',
      text: 'Sliny vs. lubrikant',
      moznosti: [
        { v: 'sliny', label: 'Sliny stačia' },
        { v: 'lub', label: 'Pridať lubrikant' },
        { v: 'ochuteny', label: 'Ochutený lubrikant' },
      ],
    },
  ],
}

// ── Finále ────────────────────────────────────────────────────────────
const FINALE: Blok = {
  druh: 'skupina', id: 'finale', nadpis: 'Finále a „kam s ejakulátom"',
  bloky: [
    {
      druh: 'otazka', id: 'fin_kam', typ: 'viac', inePovolene: true,
      text: 'Kam s ejakulátom (bez tlaku — dá sa rozhodnúť aj v momente)',
      moznosti: [
        { v: 'usta_prehltnut', label: 'Do úst a prehltnúť' },
        { v: 'usta_vypluť', label: 'Do úst a vypľuť' },
        { v: 'telo', label: 'Na telo' },
        { v: 'tvar', label: 'Na tvár' },
        { v: 'prsia', label: 'Na prsia' },
        { v: 'uterak', label: 'Do uteráka' },
        { v: 'rukou', label: 'Dokončiť rukou' },
        { v: 'v_momente', label: 'Rozhodnem sa v momente' },
      ],
    },
    {
      druh: 'otazka', id: 'fin_bozk_po', typ: 'jeden',
      text: 'Bozk po orále',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'po_oplachnuti', label: 'Až po opláchnutí úst' },
        { v: 'snowballing', label: 'Aj „snowballing" (voliteľne)' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'fin_starostlivost', typ: 'viac',
      text: 'Starostlivosť o telo pri/po oráli',
      moznosti: [
        { v: 'voda', label: 'Voda poruke' },
        { v: 'balzam', label: 'Balzam na pery' },
        { v: 'mikropauzy', label: 'Mikropauzy pre čeľusť a krk' },
        { v: 'druhe_kolo', label: 'Druhé kolo: áno' },
        { v: 'druhe_pauza', label: 'Druhé kolo: len po pauze' },
      ],
    },
  ],
}

// ── Anilingus ─────────────────────────────────────────────────────────
const ANILINGUS: Blok = {
  druh: 'skupina', id: 'anilingus', nadpis: 'Anilingus (rimming)',
  bloky: [
    p('ani_prijimam', 'Prijímať anilingus'),
    p('ani_poskytujem', 'Poskytovať anilingus'),
    {
      druh: 'otazka', id: 'ani_techniky', typ: 'viac', inePovolene: true,
      text: 'Techniky',
      moznosti: [
        { v: 'kruhy', label: 'Kruhy okolo otvoru' },
        { v: 'up_down', label: '„Up & down"' },
        { v: 'sanie', label: 'Jemné sanie okraja' },
        { v: 'bozk', label: 'Bozk + jazyk' },
        { v: 'penetracia', label: 'Penetrácia jazykom' },
        { v: 'prst', label: 'Jazyk + prst externe' },
        { v: 'hradza', label: 'Jazyk + tlak na hrádzu' },
      ],
    },
    {
      druh: 'otazka', id: 'ani_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'styri', label: 'Na štyroch' },
        { v: 'bok', label: 'Na boku' },
        { v: 'stoj', label: 'V stoji s oporou' },
        { v: 'okraj', label: 'Okraj postele' },
      ],
    },
    {
      druh: 'otazka', id: 'ani_hygiena', typ: 'viac',
      text: 'Hygiena a bariéry',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'utierky', label: 'Utierky' },
        { v: 'blana', label: 'Dentálna blana' },
        { v: 'lub', label: 'Veľa lubrikantu' },
        { v: 'cross', label: 'Anus → vagína nikdy bez výmeny ochrany' },
      ],
    },
    {
      druh: 'otazka', id: 'ani_prechod', typ: 'jeden',
      text: 'Prechod k prstu / plugu',
      moznosti: [
        { v: 'navonok', label: 'Len navonok' },
        { v: 'po_dohode', label: 'Prechod k prstu alebo plugu po dohode' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Kombinácie ────────────────────────────────────────────────────────
const KOMBINACIE: Blok = {
  druh: 'skupina', id: 'kombinacie', nadpis: 'Kombinácie (layering)',
  bloky: [
    p('komb_oral_ruka', 'Orál + ruka („glide & twist" — ústa na špičke, ruka pri koreni)'),
    {
      druh: 'otazka', id: 'komb_hracky', typ: 'viac',
      text: 'Orál + hračky',
      moznosti: [
        { v: 'vibr_klitoris', label: 'Mini-vibrátor na klitoris' },
        { v: 'vibr_bradavky', label: 'Vibrátor na bradavky' },
        { v: 'plug', label: 'Plug + orál' },
        { v: 'dialkove', label: 'Diaľkové / nositeľné (so signálmi)' },
        { v: 'parovy', label: 'Párový vibrátor pri felácii' },
        { v: 'kruzok', label: 'Krúžok' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_senzorika', typ: 'viac',
      text: 'Orál + senzorika',
      moznosti: [
        { v: 'paska', label: 'Páska na oči' },
        { v: 'teplota', label: 'Teplé / ľadové dotyky' },
        { v: 'hudba', label: 'Hudba' },
        { v: 'textury', label: 'Jemné textúry' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_anal', typ: 'jeden',
      text: 'Orál + anál / perineum',
      moznosti: [
        { v: 'externe', label: 'Externé dotyky hrádze / prostaty počas orálu' },
        { v: 'plug', label: '+ malý plug' },
        { v: 'bez', label: 'Len orál bez análnych prvkov' },
      ],
    },
  ],
}

// ── Chuť, vôňa, feel ─────────────────────────────────────────────────
const FEEL: Blok = {
  druh: 'skupina', id: 'feel', nadpis: 'Chuť, vôňa a „feel"',
  bloky: [
    {
      druh: 'otazka', id: 'feel_vona', typ: 'jeden',
      text: 'Vôňa a chuť',
      moznosti: [
        { v: 'po_sprche', label: '„Tesne po sprche"' },
        { v: 'prirodzena', label: 'Prirodzená vôňa je OK' },
        { v: 'situacia', label: 'Záleží na situácii' },
      ],
    },
    { druh: 'otazka', id: 'feel_kozmetika', typ: 'text', text: 'Kozmetika / parfum áno-nie; brada / fúzy — komfort:' },
    {
      druh: 'otazka', id: 'feel_sliny', typ: 'jeden',
      text: 'Sliny a „wet look"',
      moznosti: [
        { v: 'vzrusuje', label: 'Vzrušuje ma' },
        { v: 'stredne', label: 'Stredne' },
        { v: 'menej', label: 'Radšej menej slín' },
      ],
    },
    {
      druh: 'otazka', id: 'feel_bariery', typ: 'jeden',
      text: 'Bariéry (kondóm / dentálna blana)',
      moznosti: [
        { v: 'ochotny', label: 'Ochotný/á používať' },
        { v: 'niektore', label: 'Len pri niektorých aktivitách' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── 69 a face-sitting ───────────────────────────────────────────────
const SF: Blok = {
  druh: 'skupina', id: 'sf', nadpis: '69 a face-sitting',
  bloky: [
    {
      druh: 'otazka', id: 'sf_69', typ: 'jeden',
      text: '69',
      moznosti: [
        { v: 'horizontal', label: 'Áno — horizontálne (bok / ležmo)' },
        { v: 'vertikal', label: 'Áno — vertikálne (jeden hore)' },
        { v: 'ak_stabilita', label: 'Len keď je stabilita a dych v pohode' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'sf_69_rola', typ: 'jeden',
      text: '69 — rozdelenie pozornosti',
      moznosti: [
        { v: 'striedat', label: 'Striedať rolu „hore / dole"' },
        { v: 'nerovnaka', label: 'Nerovnaká pozornosť je OK' },
        { v: 'rovnako', label: 'Vždy rovnako' },
      ],
    },
    p('sf_facesitting', 'Face-sitting ako poloha pri oráli (samostatná téma má vlastný sprievodca)'),
  ],
}

// ── Špeciálne kontexty ─────────────────────────────────────────────
const KONTEXTY: Blok = {
  druh: 'skupina', id: 'kontexty', nadpis: 'Špeciálne kontexty (voliteľné)',
  bloky: [
    {
      druh: 'otazka', id: 'sk_bi', typ: 'jeden',
      text: 'Orál s osobou rovnakého pohlavia',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'mozno', label: 'Možno' },
        { v: 'nikdy', label: 'Nikdy' },
      ],
    },
    {
      druh: 'otazka', id: 'sk_klub', typ: 'jeden',
      text: 'Orál v klube / swingers prostredí',
      moznosti: [
        { v: 'watch', label: 'Watch-only' },
        { v: 'soft', label: 'Len s vlastným partnerom' },
        { v: 'poskytujem', label: 'Poskytujem / prijímam aj s inými' },
        { v: 'tabu', label: 'Tabu' },
      ],
    },
    {
      druh: 'otazka', id: 'sk_foto', typ: 'jeden',
      text: 'Foto / video z orálu',
      moznosti: [
        { v: 'nie', label: 'Nie' },
        { v: 'suhlas', label: 'Len s výslovným súhlasom' },
        { v: 'pravidla', label: 'Áno, s pravidlami (vlastníctvo / mazanie)' },
      ],
    },
  ],
}

// ── Rámec & poznámky ──────────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec, komfort a poznámky',
  bloky: [
    {
      druh: 'otazka', id: 'ram_signaly', typ: 'viac',
      text: 'Signály a stop-mechanizmy',
      moznosti: [
        { v: 'pridaj', label: '„Pridaj / uber / stop"' },
        { v: 'poklepanie', label: 'Jemné poklepanie rukou (gag reflex)' },
        { v: 'semafor', label: 'Semafor (žltá / červená)' },
        { v: 'slova', label: 'Kľúčové slová' },
      ],
    },
    {
      druh: 'otazka', id: 'ram_komfort_hrdla', typ: 'jeden',
      text: 'Komfort hrdla (pri poskytovaní felácie)',
      moznosti: [
        { v: 'pohodovy', label: 'Pohodový' },
        { v: 'stredny', label: 'Stredný' },
        { v: 'citlivy', label: 'Citlivý gag reflex' },
        { v: 'ziadny_deep', label: 'Žiadny deep' },
      ],
    },
    { druh: 'otazka', id: 'ram_aftercare', typ: 'text', text: 'Čo potrebujem po (voda, prikrytie, ticho, debrief „2+2"):' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const ORALNA_INTIMITA: TemaObsah = {
  slug: 'oral-vulva-klitoris/oral-vulva-klitoris',
  nadpis: 'Orálna intimita',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Prečo orál funguje',
      telo:
        'Jemná kontrola intenzity, vysoká variabilita a možnosť vrstviť dotyky, dych, teplotu a hračky. ' +
        'Tento sprievodca pokrýva cunnilingus, feláciu, anilingus, polohy a kombinácie — všetko s rolou prijímam / poskytujem.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec, komfort a bezpečnosť', ton: 'vystraha',
      telo:
        'Gag reflex a STOP signály (ťuknutie, stisk ruky, „žltá / červená"), dohoda na pauzách a dýchaní (nosom, pomalý návrat). ' +
        'Hygiena pred orálom; kondóm pri felácii, dentálna blana pri cunnilinguse / anilinguse. ' +
        'Sliny vs. lubrikant — kedy a ako. Pri análnych prvkoch vždy lubrikant a jasné „cross-clean" pravidlá.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo z orálnej intimity chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'cun_prijimam', label: 'Cunnilingus — prijímam' },
        { v: 'cun_poskytujem', label: 'Cunnilingus — poskytujem' },
        { v: 'fel_prijimam', label: 'Felácia — prijímam' },
        { v: 'fel_poskytujem', label: 'Felácia — poskytujem' },
        { v: 'anilingus', label: 'Anilingus' },
        { v: '69', label: '69 a face-sitting' },
        { v: 'kombinacie', label: 'Kombinácie s hračkami a senzorikou' },
      ],
    },
    CUNNILINGUS,
    FELACIA,
    FINALE,
    ANILINGUS,
    SF,
    KOMBINACIE,
    FEEL,
    KONTEXTY,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'aftercare', nadpis: 'Aftercare', ton: 'info',
      telo: 'Krátky check-in, nápoj, prikrytie; „2+2" — dve veci super, dve na úpravu. Pri citlivosti po vyvrcholení šetrne dobehnúť dotykmi a bozkami.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
