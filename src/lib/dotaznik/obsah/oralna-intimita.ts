import { CHUT } from './skaly'
import type { TemaObsah, Blok, Moznost, OtazkaBlok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Orálna intimita — modul C1 „Orál na vulvu a klitoris" (celá orál doména).
// Zdroj: „14_Oralna_intimita". Cunnilingus + felácia + anilingus + polohy +
// kombinácie + rámec, všetko s rolou prijímam / poskytujem.
// z/m verzia zrkadlová (rovnaké id + hodnoty).
// Výskum a komunitné zdroje pre rozšírenie felácie (2026-09-30):
// https://pubmed.ncbi.nlm.nih.gov/35715453/
// https://pubmed.ncbi.nlm.nih.gov/29715727/
// https://pubmed.ncbi.nlm.nih.gov/35853798/
// https://www.reddit.com/r/askgaybros/comments/12byl14/
// https://www.reddit.com/r/askgaybros/comments/j30ilr/
// https://www.reddit.com/r/askgaybros/comments/j3u4hi/
// https://www.reddit.com/r/askgaybros/comments/125rnhc/
// https://www.reddit.com/r/askgaybros/comments/1frng3c/
// https://www.reddit.com/r/sex/comments/1b31vk2/
// Zdroje pre rozšírenie cunnilingusu (XLSM-014, 2026-09-30):
// https://pubmed.ncbi.nlm.nih.gov/26880506/
// https://pubmed.ncbi.nlm.nih.gov/29715727/
// https://pubmed.ncbi.nlm.nih.gov/27799078/
// https://pubmed.ncbi.nlm.nih.gov/40528136/
// https://www.reddit.com/r/sexadvise/comments/1kp1ztl/
// https://www.reddit.com/r/sexeducation/comments/kbudyt/
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POVODNY_POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis'], moznosti: Moznost[] = CHUT): OtazkaBlok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti, predosleMoznosti: POVODNY_POSTOJ,
})

// ── Cunnilingus ────────────────────────────────────────────────────────
const CUNNILINGUS: Blok = {
  druh: 'skupina', id: 'cunnilingus', nadpis: 'Cunnilingus (orál na vulvu a klitoris)',
  bloky: [
    p('cun_prijimam', g('Keď partnerka prijíma cunnilingus odo mňa', 'Prijímať cunnilingus od partnera')),
    p('cun_poskytujem', g('Poskytovať cunnilingus partnerke', 'Keď mi partner poskytuje cunnilingus')),
    {
      druh: 'text', id: 'cun_paleta', nadpis: 'Jazyk nemusí naháňať orgazmus — môže prebúdzať celé telo', ton: 'info',
      telo: g(
        'Partnerkina vulva ponúka viac než jeden cieľ: široký jazyk môže zahriať pysky, pery objať klitoris cez jeho kapucňu a špička jazyka potom nájsť presný rytmus, pri ktorom sa jej panva začne hýbať proti tvojej tvári. Pre niekoho je vzrušujúce pomalé uctievanie, pre iného mokrá intenzita, sanie alebo súhra úst a prstov.',
        'Partnerove ústa môžu prebúdzať celú vulvu širokými ťahmi, bozkami a tlakom pier, kým sa pozornosť sústredí na presný rytmus pri klitorise. Môžem chcieť jemné nepriame dráždenie, mokrú intenzitu, stabilný jazyk, proti ktorému sa sama hýbem, alebo ústa spojené s prstami vo vagíne.',
      ),
    },
    {
      druh: 'otazka', id: 'cun_styl', typ: 'viac', inePovolene: true,
      text: 'Ktoré štýly cunnilingusu ma lákajú?',
      moznosti: [
        { v: 'uctievanie', label: 'Pomalé zmyselné uctievanie celej vulvy' },
        { v: 'presny', label: 'Presný rytmus sústredený na klitoris' },
        { v: 'siroky', label: 'Široké, dlhé a veľmi mokré ťahy' },
        { v: 'staly', label: 'Stabilný pohyb bez častého striedania' },
        { v: 'teasing', label: 'Dlhé dráždenie pyskov a okolia pred klitorisom' },
        { v: 'intenzivny', label: 'Silné sanie, pevný jazyk a intenzívny záver' },
        { v: 'tvar', label: g('Očný kontakt a pohľad na jej reakciu', 'Očný kontakt a vedomie, že partner sleduje moju reakciu') },
      ],
    },
    {
      druh: 'otazka', id: 'cun_techniky', typ: 'viac', inePovolene: true,
      text: g('Techniky jazyka a pier, ktoré ma láka partnerke poskytovať', 'Techniky jazyka a pier, ktoré chcem prijímať'),
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie okolo klitorisu' },
        { v: 'tukance', label: 'Ťukance špičkou jazyka' },
        { v: 'plochy', label: '„Plochý jazyk" — široké olizovanie' },
        { v: 'sanie', label: 'Jemné sanie klitorisu' },
        { v: 'pery', label: 'Kombinácia jazyka a pier' },
        { v: 'hryznutie', label: 'Občasné jemné hryznutie' },
        { v: 'rychle', label: 'Rýchle jemné pohyby jazykom' },
        { v: 'dlhy_tah', label: 'Dlhý ťah plochým jazykom od vstupu ku klitorisu' },
        { v: 'strany', label: 'Pohyb zo strany na stranu cez kapucňu klitorisu' },
        { v: 'drzanie', label: 'Pevný jazyk na jednom mieste bez pohybu' },
        { v: 'bozky', label: 'Bozky a jemné priťahovanie pyskov perami' },
        { v: 'jazyk_vstup', label: 'Jazyk pri vstupe alebo plytko vo vagíne' },
        { v: 'vibracie', label: 'Bručanie alebo stonanie — vibrácie úst' },
        { v: 'nos', label: 'Tlak alebo trenie nosom o lonový pahorok' },
        { v: 'palce', label: 'Palce roztiahnu pysky, jazyk zostane presný' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_kapucna', typ: 'jeden',
      text: g('Aký kontakt s partnerkiným klitorisom ma láka?', 'Aký kontakt s klitorisom mi vyhovuje?'),
      moznosti: [
        { v: 'priamy', label: 'Priamy kontakt' },
        { v: 'kapucna', label: 'Cez kapucňu (nepriamo)' },
        { v: 'striedat', label: 'Striedať' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_prsty', typ: 'jeden',
      text: g('Ako ma láka koordinovať ústa a prsty na partnerke?', 'Ako chcem, aby partner koordinoval ústa a prsty?'),
      moznosti: [
        { v: 'bez', label: 'Bez prstov' },
        { v: '1', label: '1 prst' },
        { v: '2', label: '2 prsty' },
        { v: 'g_bod', label: 'Klitoris + G-bod („come-hither", tlak dlane nad lonovou kosťou)' },
        { v: 'plytko', label: 'Konček prsta a krúženie tesne pri vstupe' },
        { v: 'staly_tlak', label: 'Zahnuté prsty držia stabilný tlak na prednej stene' },
        { v: 'pohyb', label: 'Prsty zostanú na mieste a panva sa hýbe proti nim' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_tempo', typ: 'jeden',
      text: g('Aké tempo a rytmus ma láka partnerke poskytovať?', 'Aké tempo a rytmus chcem prijímať?'),
      moznosti: [
        { v: 'budovanie', label: 'Pomalé budovanie → rýchlejší záver' },
        { v: 'staly', label: 'Stály rytmus (nemeniť tesne pred orgazmom)' },
        { v: 'vlny', label: 'Vlny (pomalé ↔ rýchle)' },
        { v: 'signaly', label: 'Podľa signálov rukou' },
        { v: 'telo', label: g('Jazyk zostane stabilný a partnerka vedie pohyb panvou', 'Jazyk zostane stabilný a ja vediem pohyb panvou') },
      ],
    },
    {
      druh: 'otazka', id: 'cun_pauzy', typ: 'jeden',
      text: g('Láka ma partnerku ústami privádzať k okraju a robiť pauzy?', 'Lákajú ma pri cunnilinguse pauzy a edging?'),
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'mozno', label: 'Možno' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_poorgazmicka', typ: 'jeden',
      text: g('Ako ma láka pokračovať po partnerkinom orgazme?', 'Ako chcem, aby partner pokračoval po mojom orgazme?'),
      moznosti: [
        { v: 'prestat', label: 'Prestať (precitlivenosť)' },
        { v: 'dobehnut', label: 'Dobehnúť jemnými dotykmi / bozkami' },
        { v: 'overstim', label: 'Pokračovať (overstim)' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_polohy', typ: 'viac',
      text: g('Polohy, v ktorých ma láka poskytovať cunnilingus partnerke', 'Polohy, v ktorých chcem cunnilingus prijímať'),
      moznosti: [
        { v: 'chrbat', label: 'Na chrbte s vankúšom pod bokmi' },
        { v: 'bok', label: 'Na boku' },
        { v: 'hrana', label: 'Na hrane postele' },
        { v: '69', label: '69' },
        { v: 'facesitting', label: 'Face-sitting' },
        { v: 'sprcha', label: 'V sprche' },
        { v: 'zozadu', label: 'Zo zadnej strany medzi stehnami' },
        { v: 'brucho', label: 'Na bruchu s tvárou medzi stehnami zozadu' },
      ],
    },
    {
      druh: 'otazka', id: 'cun_partner_tuzba', typ: 'jeden',
      text: g('Ako na mňa pôsobí, keď partnerka túži po cunnilinguse?', 'Ako na mňa pôsobí, keď partner túži poskytovať mi cunnilingus?'),
      moznosti: [
        { v: 'silno', label: g('Jej chuť cítiť moje ústa ma silno vzrušuje', 'Jeho chuť na moju vulvu ma silno vzrušuje') },
        { v: 'rad', label: g('Rád ho poskytujem a jej potešenie je pre mňa erotické', 'Rada ho prijímam a odovzdám sa jeho ústam') },
        { v: 'spolu', label: g('Láka ma, keď panvou ukáže rytmus, ktorý chce', 'Láka ma viesť jeho ústa pohybom panvy') },
        { v: 'obcas', label: 'Vyhovuje mi skôr občas alebo ako súčasť inej hry' },
        { v: 'neutral', label: g('Jej túžbu chápem, ale mňa osobne veľmi nevzrušuje', 'Jeho túžbu chápem, ale mňa osobne veľmi nevzrušuje') },
        { v: 'nie', label: 'Nechcem ho zaradiť medzi naše zhody' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'cun_myty', nadpis: 'Mýty o cunnilinguse', ton: 'info',
      telo:
        'Mýtus: existuje jeden pohyb jazyka, ktorý funguje na každú ženu. Realita: rozdiel môže byť medzi priamym a nepriamym dotykom, špičkou a plochou jazyka, saním, tlakom pier, stabilným rytmom a pohybom panvy.\n\n' +
        'Mýtus: treba neustále predvádzať nové techniky. Realita: keď telo nájde presný rytmus, jeho dlhé udržanie môže byť vzrušujúcejšie než ďalšia zmena.\n\n' +
        'Mýtus: prsty sú iba náhrada za lepší jazyk. Realita: ústa na klitorise a prsty na prednej stene vytvárajú dve odlišné vrstvy, ktoré niektoré ženy milujú; iné chcú iba ústa.\n\n' +
        'Mýtus: prijímať orál je sebecké alebo sa za vzhľad, vôňu či reakcie vulvy treba hanbiť. Realita: pre mnohých mužov je partnerkino odovzdanie a potešenie samo osebe silným zdrojom vzrušenia.',
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
      druh: 'text', id: 'fel_paleta', nadpis: 'Felácia nemá jediný „správny" štýl', ton: 'info',
      telo:
        'Pre niekoho je najsilnejšia presnosť na uzdičke a korune žaluďa, pre iného pocit mokrých úst po celej dĺžke, pomalé uctievanie bez rúk alebo súhra úst a dlane. ' +
        'Vzrušujúce môže byť aj to, kto vedie, očný kontakt, zvuk, pohľad na ústa či zapojenie semenníkov, hrádze, stehien a podbruška. Hĺbka je len jedna z mnohých možností — nie známka kvality. ' +
        'Otázky preto porovnávajú techniky, nie veľkosť či „typ" partnerovho penisu.',
    },
    {
      druh: 'otazka', id: 'fel_styl', typ: 'viac', inePovolene: true,
      text: 'Ktoré štýly felácie ma lákajú?',
      moznosti: [
        { v: 'uctievanie', label: 'Pomalé zmyselné „uctievanie" — bozky, pohľad a celé telo' },
        { v: 'presnost', label: 'Presná hra so špičkou, korunou a uzdičkou' },
        { v: 'mokry', label: 'Veľmi mokrý, hlučný a vizuálny štýl' },
        { v: 'rytmicky', label: 'Stabilný rytmus úst po dĺžke' },
        { v: 'bez_ruk', label: 'Iba ústa a jazyk, bez rúk' },
        { v: 'ruka_usta', label: 'Ústa ako plynulé pokračovanie ruky' },
        { v: 'teasing', label: 'Dlhé dráždenie a odďaľovanie vyvrcholenia' },
        { v: 'intenzivny', label: 'Intenzívny alebo dominantný náboj' },
      ],
    },
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
        { v: 'ustie', label: 'Špička jazyka na ústí močovej rúry' },
        { v: 'spodok', label: 'Jazyk po spodnej strane žaluďa až k uzdičke' },
        { v: 'plochy_jazyk', label: 'Plochý jazyk po hriadeli od koreňa nahor' },
        { v: 'bozky', label: 'Bozky a drobné olíznutia namiesto súvislého pohybu' },
        { v: 'boky', label: 'Voľné ústa pohybujúce sa zo strany na stranu' },
        { v: 'sanie_spicky', label: 'Sústredené sanie iba žaluďa' },
        { v: 'predkozka', label: 'Jazyk a pery pod okrajom predkožky' },
        { v: 'vibracie', label: 'Bručanie alebo stonanie — vibrácie úst' },
        { v: 'dych', label: 'Teplý dych alebo jemné fúknutie ako kontrast' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_zony', typ: 'viac', inePovolene: true,
      text: 'Na ktoré miesta sa má pozornosť sústrediť?',
      moznosti: [
        { v: 'ustie', label: 'Špička žaluďa a ústie močovej rúry' },
        { v: 'koruna', label: 'Koruna žaluďa po celom obvode' },
        { v: 'frenulum', label: 'Uzdička a spodný prechod žaluďa' },
        { v: 'predkozka', label: 'Predkožka a jej vnútorný okraj' },
        { v: 'hriadel', label: 'Celý hriadeľ' },
        { v: 'koren', label: 'Koreň penisu a miesto nad mieškom' },
        { v: 'semenniky', label: 'Semenníky a šev mieška' },
        { v: 'hradza', label: 'Hrádza' },
        { v: 'okolie', label: 'Vnútorné stehná a podbruško' },
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
        { v: 'opacny_smer', label: 'Ruka sa otáča opačným smerom než ústa' },
        { v: 'dlan_zalud', label: 'Ústa na žaluďi, dlaň rotuje po hriadeli' },
        { v: 'druha_okolie', label: 'Druhá ruka na semenníkoch, hrádzi alebo bradavkách' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_vedenie', typ: 'jeden',
      text: 'Kto má viesť rytmus a pohyb?',
      moznosti: [
        { v: 'poskytuje', label: g('Partnerka, ktorá feláciu poskytuje', 'Ja, keď feláciu poskytujem') },
        { v: 'prijima', label: g('Ja ako prijímajúci', 'Partner ako prijímajúci') },
        { v: 'striedat', label: 'Striedať vedenie podľa nálady' },
        { v: 'bez_vedenia', label: 'Nechať pohyb plynúť bez jednej vedúcej roly' },
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
        { v: 'deep', label: 'Hlboký orál (deep throat)' },
        { v: 'iluzia', label: 'Radšej ilúzia hĺbky rukou' },
      ],
    },
    {
      druh: 'otazka', id: 'fel_deepthroat', typ: 'jeden',
      text: 'Deep throat',
      moznosti: [
        { v: 'skusam', label: 'Chcem skúšať' },
        { v: 'intervaly', label: 'Len krátke intervaly' },
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
      druh: 'otazka', id: 'fel_semenniky_detail', typ: 'viac', inePovolene: true,
      text: 'Aký dotyk semenníkov a mieška ma láka?',
      moznosti: [
        { v: 'drzat', label: 'Držať alebo kolísať celý miešok v dlani' },
        { v: 'sev_spicka', label: 'Viesť špičku jazyka po šve mieška' },
        { v: 'plochy', label: 'Plochý jazyk cez celý miešok' },
        { v: 'jeden', label: 'Vziať do úst jeden semenník' },
        { v: 'oba', label: 'Vziať do úst oba semenníky' },
        { v: 'tah', label: 'Jemný ťah smerom od tela' },
        { v: 'bez', label: 'Nechať semenníky bez stimulácie' },
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
    {
      druh: 'otazka', id: 'fel_partner_tuzba', typ: 'jeden',
      text: g('Ako na mňa pôsobí, keď partnerka túži dať mi feláciu?', 'Ako na mňa pôsobí, keď partner túži, aby som mu dala feláciu?'),
      moznosti: [
        { v: 'silno', label: g('Jej chuť na mňa ma silno vzrušuje', 'Jeho túžba po mojich ústach ma silno vzrušuje') },
        { v: 'rad', label: g('Rád ju prijímam, aj keď nemusí byť stredom sexu', 'Rada ju poskytujem a baví ma jeho reakcia') },
        { v: 'obcas', label: 'Láka ma skôr občas alebo ako súčasť inej hry' },
        { v: 'zvedavy', label: g('Som zvedavý, čo by sa páčilo jej aj mne', 'Som zvedavá, ktorý štýl by bavil jeho aj mňa') },
        { v: 'neutral', label: g('Som k tomu neutrálny', 'Som k tomu neutrálna') },
        { v: 'nie', label: 'Neláka ma to' },
      ],
    },
    { zbalitelny: true,
      druh: 'text', id: 'fel_myty', nadpis: 'Mýty, ktoré z felácie zbytočne robia výkon', ton: 'info',
      telo:
        'Mýtus: čím hlbšie, tým lepšie. Realita: veľmi citlivé miesta sú na žaluďi, korune a najmä pri uzdičke; presná plytká hra môže byť intenzívnejšia než hĺbka.\n\n' +
        'Mýtus: dobrá felácia musí vyzerať ako porno. Realita: veľa ľudí miluje pomalé bozky, jazyk, ruky, sliny, očný kontakt či zvuk — každý z týchto prvkov môže byť hlavným zdrojom túžby.\n\n' +
        'Mýtus: väčší penis automaticky znamená lepší orálny zážitok. Realita: veľkosť neurčuje citlivosť ani potešenie; mení iba to, ktoré polohy a pohyby sú pohodlné.\n\n' +
        'Mýtus: ak nepríde orgazmus, felácia sa nevydarila. Realita: môže byť hlavným aktom, dráždením, prejavom túžby alebo jednou vrstvou bez potreby finále.',
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
      text: 'Aká atmosféra anilingusu ma láka?',
      moznosti: [
        { v: 'sprcha', label: 'Čistý, svieži a zmyselný rituál' },
        { v: 'utierky', label: 'Spontánny a telesný moment bez veľkého rámca' },
        { v: 'blana', label: 'Tabu a intenzita sú súčasťou vzrušenia' },
        { v: 'lub', label: 'Veľmi mokrý pocit so slinami alebo lubrikantom' },
        { v: 'cross', label: 'Striedanie anilingusu s hrádzou, zadkom a stehnami' },
      ],
    },
    {
      druh: 'otazka', id: 'ani_prechod', typ: 'jeden',
      text: 'Prechod k prstu / plugu',
      moznosti: [
        { v: 'navonok', label: 'Len navonok' },
        { v: 'po_dohode', label: 'Láka ma prechod k prstu alebo plugu' },
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
        { v: 'dialkove', label: 'Diaľkové / nositeľné hračky' },
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
      text: 'Aký pocit vlhkosti v ústach a na tele preferujem?',
      moznosti: [
        { v: 'ochotny', label: 'Veľmi mokrý, klzký a viditeľný' },
        { v: 'niektore', label: 'Stredne mokrý — podľa konkrétnej aktivity' },
        { v: 'nie', label: 'Skôr menej slín a presnejší kontakt' },
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
      text: 'Aký vizuálny prvok orálu ma láka?',
      moznosti: [
        { v: 'nie', label: 'Vizuálny prvok pre mňa nie je dôležitý' },
        { v: 'suhlas', label: 'Očný kontakt a sledovanie partnerovej reakcie' },
        { v: 'pravidla', label: 'Zrkadlo, pohľad zhora alebo výrazná poloha' },
      ],
    },
  ],
}

// ── Rámec & poznámky ──────────────────────────────────────────────
// ── Výkonový tlak a uvoľnenie ─────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „6) Orálna intimita" — všeobecný rámec
// (čo je celkovo vzrušujúce/vypínajúce), výkonová úzkosť pri poskytovaní
// a čo pred orálom pomáha uvoľniť sa.
const VYKON_UVOLNENIE: Blok = {
  druh: 'skupina', id: 'vykon_uvolnenie', nadpis: 'Výkonový tlak a uvoľnenie',
  bloky: [
    {
      druh: 'otazka', id: 'vyk_co_vzrusuje', typ: 'viac',
      text: 'Čo je na orále celkovo najviac vzrušujúce',
      moznosti: [
        { v: 'pocit', label: 'Fyzický pocit' },
        { v: 'pohlad', label: 'Pohľad na to' },
        { v: 'moc_odovzdanie', label: 'Moc alebo odovzdanie' },
        { v: 'intenzita', label: 'Intenzita' },
        { v: 'tabu', label: 'Nádych tabu' },
      ],
    },
    {
      druh: 'otazka', id: 'vyk_stres', typ: 'viac',
      text: 'Čo ma pri poskytovaní najviac stresuje (ak vôbec)',
      moznosti: [
        { v: 'vydrz', label: 'Výdrž' },
        { v: 'erekcia', label: 'Erekcia (u muža)' },
        { v: 'spravne', label: 'Že to robím „správne"' },
        { v: 'partner_trpi', label: g('Obava, že sa partnerka trápi', 'Obava, že sa partner trápi') },
        { v: 'ziadny_stres', label: 'Žiaden stres, som v pohode' },
      ],
    },
    {
      druh: 'otazka', id: 'vyk_bez_tlaku', typ: 'jeden',
      text: 'Dohoda „dnes bez tlaku na orgazmus"',
      moznosti: [
        { v: 'pomaha', label: 'Veľmi mi pomáha' },
        { v: 'niekedy', label: 'Niekedy sa hodí' },
        { v: 'nepotrebujem', label: 'Nepotrebujem to' },
      ],
    },
    {
      druh: 'otazka', id: 'vyk_uvolni', typ: 'viac',
      text: 'Čo ma pred orálom najviac uvoľní',
      moznosti: [
        { v: 'sprcha', label: 'Sprcha' },
        { v: 'ticho', label: 'Ticho' },
        { v: 'ocny_kontakt', label: 'Očný kontakt' },
        { v: 'masaz', label: 'Krátka masáž' },
        { v: 'teasing', label: 'Krátky teasing' },
      ],
    },
  ],
}

const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Vedenie zážitku a osobné želania',
  bloky: [
    {
      druh: 'otazka', id: 'ram_signaly', typ: 'viac',
      text: 'Ako ma láka viesť tempo a intenzitu?',
      moznosti: [
        { v: 'pridaj', label: 'Priamo slovami: „pridaj", „pomalšie", „takto"' },
        { v: 'poklepanie', label: 'Rukou viesť hlavu, boky alebo rytmus' },
        { v: 'semafor', label: 'Telom — pohybom panvy, stehnami a dychom' },
        { v: 'slova', label: 'Nechať poskytujúceho viesť a iba sa odovzdať' },
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
    { druh: 'otazka', id: 'ram_aftercare', typ: 'text', text: 'Ako chcem, aby orál doznel — orgazmom, bozkami, pokračovaním rukou alebo prechodom k inej hre:' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Čo ma na orále láka najviac:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: g('Na čo som zvedavý, ale ešte neviem, či sa mi to páči:', 'Na čo som zvedavá, ale ešte neviem, či sa mi to páči:') },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'Čo ma neláka a nechcem to zaradiť medzi naše zhody:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: g('Čo chcem, aby partnerka vedela o mojej túžbe po orále:', 'Čo chcem, aby partner vedel o mojej túžbe po orále:') },
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
      druh: 'text', id: 'oral_paleta_uvod', nadpis: 'Od presnosti po odovzdanie', ton: 'info',
      telo:
        'Orál môže byť presná stimulácia jedného citlivého miesta, veľmi mokrá telesná hra, pomalé uctievanie alebo intenzívne odovzdanie kontroly. ' +
        'Niekto miluje poskytovať a sledovať partnerovu reakciu, iný sa najviac vzruší prijímaním; ďalšieho láka striedanie rolí alebo 69. ' +
        'Rozdiel nerobí iba technika jazyka, ale aj pery, ruky, dych, zvuk, očný kontakt, poloha, tempo a to, ako orál prechádza do ďalšej aktivity.',
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
    VYKON_UVOLNENIE,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'aftercare', nadpis: 'Ako môže orál doznieť', ton: 'info',
      telo: 'Vyvrcholenie nemusí byť povinná bodka. Niekedy je najvzrušujúcejšie prestať tesne pred ním a pokračovať rukou, penetráciou alebo inou hrou; inokedy sa telo po orgazme chce ešte chvíľu kúpať v jemných bozkoch, teplom dychu či dotyku stehien.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
