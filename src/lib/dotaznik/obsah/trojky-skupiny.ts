import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Trojky, skupiny a gangbang — modul „Otvorenosť a zapojenie iných".
// Zdroj: „24_Trojky_skupiny_a_gangbang" (mišmaš viacerých návrhov — zjednotené,
// exaktné duplikáty spojené, každá odlišná otázka zachovaná).
// Mužská (m) / ženská (z) verzia zrkadlová: rovnaké id + hodnoty.
// Rešerš 2026-09-30:
// - Scoats et al., žiarlivosť, pozornosť a pocit vylúčenia v zmiešaných trojkách:
//   https://pubmed.ncbi.nlm.nih.gov/30764748/
// - Lehmiller, fantázie o konsenzuálnej nemonogamii v monogamných vzťahoch:
//   https://pubmed.ncbi.nlm.nih.gov/32728869/
// - Thompson & Byers, záujem a skúsenosti mladých dospelých so zmiešanými trojkami:
//   https://pubmed.ncbi.nlm.nih.gov/26943139/
// - Compersion a pozitívne prežívanie partnerovej rozkoše:
//   https://pubmed.ncbi.nlm.nih.gov/38177605/ a https://pubmed.ncbi.nlm.nih.gov/38951409/
// - Komunitné opakujúce sa témy: tretie koleso, nerovnováha pozornosti, 2+1 namiesto trojky:
//   https://www.reddit.com/r/nonmonogamy/comments/1jstxb1/
//   https://www.reddit.com/r/nonmonogamy/comments/uqc9aa/
// Reaudit XLSM P36690–37389: pomocné „warm-up" roly, symbolické prijatie
// do skupiny a multisenzorická choreografia viacerých rúk a tiel.
// Cielená rešerš: skupinový sex ako hra s telesnými hranicami a rolami
// https://pubmed.ncbi.nlm.nih.gov/34729896/; striedanie stredobodu, okraja
// a podpornej roly v komunitnej praxi
// https://www.reddit.com/r/nonmonogamy/comments/t1bdo3/ a
// https://www.reddit.com/r/nonmonogamy/comments/zqxn3j/.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

// Postoj k CNM scenáru (opakovaná škála naprieč celým dokumentom).
const POSTOJ: Moznost[] = [
  { v: 'robime', label: g('Už to robíme a som spokojný', 'Už to robíme a som spokojná') },
  { v: 'tuzim', label: 'Túžim to zapojiť do našich hier' },
  { v: 'ak_chce', label: g('Rád to spravím, ak po tom túži moja partnerka', 'Rada to spravím, ak po tom túži môj partner') },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]

const ROLY_DYNAMIKA: Moznost[] = [
  { v: 'dominant', label: 'Jedna osoba je dominantná a vedie celú dynamiku' },
  { v: 'vyvazene', label: 'Role sú vyvážené, všetci na rovnakej úrovni' },
  { v: 'striedanie', label: 'Role sa striedajú (raz dominant, raz submisívny)' },
]

const POCIT_PRI_KONTAKTE: Moznost[] = [
  { v: 'vzrusuje', label: 'Vzrušuje ma to' },
  { v: 'mozno', label: 'Možno, potrebujem si to spolu prebrať' },
  { v: 'zmiesane', label: 'Cítim vzrušenie aj neistotu' },
  { v: 'neprijemne', label: 'Je mi to nepríjemné' },
  { v: 'nepredstavim', label: 'Neviem si to predstaviť' },
]

const postojOtazka = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka',
  id,
  typ: 'skala',
  text,
  moznosti: POSTOJ,
  inePovolene: true,
})

// ── MMF ───────────────────────────────────────────────────────────────────
const MMF: Blok = {
  druh: 'skupina',
  id: 'mmf',
  nadpis: g('Trojka s partnerkou a ďalším mužom (MMF)', 'Trojka s partnerom a ďalším mužom (MMF)'),
  uvod: g(
    'Predstav si, že si so svojou partnerkou a ďalším mužom — sleduješ, ako si užíva pozornosť, alebo vedieš tempo, prípadne sa staneš aktívnou súčasťou zážitku.',
    'Predstav si dvoch mužov, ktorí sa sústredia na teba — ich pohľady, dotyky, dych. Môžeš mať všetko pod kontrolou, alebo sa poddať a nechať sa unášať.',
  ),
  bloky: [
    postojOtazka('mmf_postoj', g(
      'Vzrušuje ťa predstava trojky s partnerkou a ďalším mužom?',
      'Vzrušuje ťa predstava trojky s tvojím partnerom a ďalším mužom?',
    )),
    {
      druh: 'otazka',
      id: 'mmf_rozdelenie',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké rozdelenie pozornosti preferuješ? (Vyber všetky, ktoré ťa vzrušujú.)',
      moznosti: [
        { v: 'len_jej', label: g('Ja a ďalší muž sa venujeme len partnerke, bez vzájomného kontaktu', 'Partner a ďalší muž sa venujú len mne, bez vzájomného kontaktu') },
        { v: 'aj_sebe', label: g('Ja a ďalší muž sa venujeme partnerke aj sebe navzájom', 'Partner a ďalší muž sa venujú mne aj sebe navzájom') },
        { v: 'jeden_asistuje', label: g('Ja sledujem, ako sa ďalší muž venuje partnerke, a potom sa zapojím', 'Partner sleduje, ako sa mi venuje ďalší muž, a potom sa zapojí') },
        { v: 'pozorovatel', label: g('Ja sledujem partnerku s ďalším mužom a zostanem len pozorovať', 'Partner sleduje mňa s ďalším mužom a zostane len pozorovať') },
        { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_prijat',
      typ: 'viac',
      inePovolene: true,
      text: g('Aké interakcie by si chcel prijať od druhého muža?', 'Aké interakcie by si chcela prijať od druhého muža?'),
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'hladenie', label: 'Hladenie tela, rúk, stehien, krku' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou' },
        { v: 'dvojita_penetracia', label: 'Dvojitá penetrácia' },
        { v: 'oral', label: 'Orálna stimulácia' },
        { v: 'ziadna', label: g('Nepreferujem interakciu s ďalším mužom — chcem sa sústrediť len na partnerku', 'Nepreferujem interakciu s ďalším mužom — chcem sa sústrediť len na partnera') },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_poskytnut',
      typ: 'viac',
      inePovolene: true,
      text: g('Aké interakcie by si chcel poskytnúť druhému mužovi?', 'Aké interakcie by si chcela poskytnúť druhému mužovi?'),
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'hladenie', label: 'Hladenie jeho tela, skúmanie jeho reakcií' },
        { v: 'oral', label: 'Poskytovanie orálnej stimulácie' },
        { v: 'drazdenie', label: 'Dráždenie rukou alebo erotickou pomôckou' },
        { v: 'ziadna', label: 'Nepreferujem interakciu s ďalším mužom' },
      ],
    },
    {
      druh: 'otazka',
      id: 'mmf_medzi_muzmi',
      typ: 'viac',
      inePovolene: true,
      text: 'Ako vnímaš interakciu medzi dvoma mužmi?',
      podmienka: { pohlavie: 'm' },
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie medzi mužmi (jemné alebo vášnivé)' },
        { v: 'hladenie', label: 'Hladenie tela druhého muža (hruď, ramená)' },
        { v: 'oral', label: 'Poskytovanie orálnej stimulácie druhému mužovi' },
        { v: 'analny_sex', label: 'Análny sex medzi mužmi — v aktívnej alebo prijímajúcej roli' },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhým mužom' },
      ],
    },
  ],
}

// ── FMF ───────────────────────────────────────────────────────────────────
const FMF: Blok = {
  druh: 'skupina',
  id: 'fmf',
  nadpis: g('Trojka s partnerkou a ďalšou ženou (FMF)', 'Trojka s partnerom a ďalšou ženou (FMF)'),
  uvod: g(
    'Predstav si, že si obklopený dvoma ženami — ich vzájomná chémia pridáva na intenzite. Môžeš si užívať ich pozornosť naplno, alebo sledovať, ako sa venujú aj sebe navzájom.',
    'Zapojenie ďalšej ženy môže byť cestou k objaveniu vlastnej zvedavosti a príťažlivosti v spoločnej fantázii. Pohľad na partnera, ako si to užíva, môže byť zdrojom tvojho vlastného vzrušenia.',
  ),
  bloky: [
    postojOtazka('fmf_postoj', g(
      'Vzrušuje ťa predstava trojky s partnerkou a ďalšou ženou?',
      'Vzrušuje ťa predstava trojky s partnerom a ďalšou ženou?',
    )),
    {
      druh: 'otazka',
      id: 'fmf_rozdelenie',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké rozdelenie pozornosti preferuješ? (Vyber všetky, ktoré ťa vzrušujú.)',
      moznosti: [
        { v: 'dve_aj_sebe', label: g('Partnerka a ďalšia žena sa venujú mne aj sebe navzájom', 'Ja a ďalšia žena sa venujeme partnerovi aj sebe navzájom') },
        { v: 'dve_len_jemu', label: g('Partnerka a ďalšia žena sa venujú len mne, bez vzájomného kontaktu', 'Ja a ďalšia žena sa venujeme len partnerovi, bez vzájomného kontaktu') },
        { v: 'ja_stredobod', label: g('Ja som stredobodom pozornosti oboch žien', 'Partner je stredobodom pozornosti oboch žien') },
        { v: 'druha_stredobod', label: g('Partnerka je stredobodom pozornosti', 'Ja som stredobodom pozornosti') },
        { v: 'tretia_stredobod', label: 'Ďalšia žena je stredobodom pozornosti' },
        { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
        { v: 'pozorovatel', label: g('Ja sledujem partnerku s ďalšou ženou a zostanem len pozorovať', 'Partner sleduje mňa s ďalšou ženou a zostane len pozorovať') },
        { v: 'jeden_asistuje', label: g('Ja sledujem, ako sa ďalšia žena venuje partnerke, a potom sa zapojím', 'Partner sleduje, ako sa mi venuje ďalšia žena, a potom sa zapojí') },
      ],
    },
    {
      druh: 'otazka',
      id: 'fmf_prijat_ona',
      typ: 'viac',
      inePovolene: true,
      text: g('Čo by si rád zažil s ďalšou ženou?', 'Čo by si si rada užila od druhej ženy?'),
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — jemné, vášnivé, skúmavé' },
        { v: 'hladenie', label: g('Hladenie tela a vnímanie jej dotykov', 'Hladenie pŕs, tela, vnímanie jej dotykov') },
        { v: 'oral', label: g('Orálna stimulácia od ďalšej ženy', 'Orálna stimulácia vulvy a klitorisu jej ústami a jazykom') },
        { v: 'drazdenie', label: g('Dráždenie rukou alebo erotickou pomôckou od ďalšej ženy', 'Dráždenie rukou alebo erotickou pomôckou na vulve, klitorise alebo vo vagíne') },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhou ženou' },
      ],
    },
    {
      druh: 'otazka',
      id: 'fmf_poskytnut_ona',
      typ: 'viac',
      inePovolene: true,
      text: g('A čo by si bol ochotný spraviť ty?', 'A čo by si bola ochotná spraviť ty?'),
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie — vášnivo, zvedavo, hravo' },
        { v: 'hladenie', label: g('Hladenie jej tela a sledovanie jej reakcií', 'Hladenie jej pŕs, tela, sledovanie jej reakcií') },
        { v: 'oral', label: g('Orálna stimulácia ďalšej ženy', 'Orálna stimulácia jej vulvy a klitorisu') },
        { v: 'drazdenie', label: g('Dráždenie ďalšej ženy rukou či erotickou pomôckou', 'Dráždenie jej vulvy, klitorisu alebo vagíny rukou či erotickou pomôckou') },
        { v: 'ziadna', label: 'Nepreferujem žiadnu interakciu s druhou ženou' },
      ],
    },
  ],
}

// ── Skupinový sex ─────────────────────────────────────────────────────────
const SKUPINY: Blok = {
  druh: 'skupina',
  id: 'skupiny',
  nadpis: 'Skupinový sex (group play)',
  uvod: 'Skupinová hra môže znamenať viacero párov v jednej miestnosti, rotujúcu výmenu, spoločný orál, orgiu „každý s každým" aj scénu, v ktorej niekto iba sleduje. Každá verzia má inú choreografiu pozornosti.',
  bloky: [
    {
      druh: 'otazka',
      id: 'skup_scenare',
      typ: 'viac',
      inePovolene: true,
      text: 'Aké scenáre v rámci skupinového sexu si vieš predstaviť?',
      moznosti: [
        { v: 'viacero_parov', label: 'Viacero párov v jednej miestnosti s voľnou výmenou partnerov' },
        { v: 'striedanie', label: 'Striedanie partnerov v rámci skupiny (rotujúca výmena)' },
        { v: 'oralny_gang', label: 'Skupinová hra s orálnym sexom' },
      ],
    },
    postojOtazka('orgie_postoj', g('Chcel by si byť súčasťou orgie, kde sa každý môže zapojiť s každým?', 'Chcela by si byť súčasťou orgie, kde sa každý môže zapojiť s každým?')),
    postojOtazka('kazdy_postoj', g('Chcel by si byť súčasťou aktivity, kde každý môže preskúmať interakcie s kýmkoľvek v miestnosti?', 'Chcela by si byť súčasťou aktivity, kde každý môže preskúmať interakcie s kýmkoľvek v miestnosti?')),
    postojOtazka('kazdy_kombinacia', 'Cítiš vzrušenie pri myšlienke na kombináciu dotykov, bozkov a viacnásobných interakcií počas jednej aktivity?'),
    postojOtazka('kazdy_sloboda', 'Túžiš slobodne objavovať nové interakcie vo väčšej skupine, pričom vieš, že tvoj partner je s tebou?'),
  ],
}

// ── Pomocné roly, rituály a viac tiel ─────────────────────────────────────
const CHOREOGRAFIA_SKUPINY: Blok = {
  druh: 'skupina',
  id: 'choreografia_skupiny',
  nadpis: 'Pomocné roly, prijímacie rituály a viac tiel',
  uvod:
    'Skupinová scéna nemusí byť iba séria penetrácií. Niekedy je najerotickejší človek, ktorý pripravuje telá a atmosféru, ' +
    'udržiava vzrušenie dotykom či slovami alebo plynulo odovzdáva stredobod ďalším rukám. Výraz „fluffer" pochádza zo sveta ' +
    'pornografickej produkcie; v spoločnej fantázii môže pomenovať dobrovoľnú warm-up rolu bez toho, aby z človeka robil iba pomôcku.',
  bloky: [
    {
      druh: 'otazka', id: 'skup_pomocne_roly', typ: 'viac', inePovolene: true,
      text: 'Ktoré pomocné alebo podporné roly ma v skupinovej scéne priťahujú',
      moznosti: [
        { v: 'warmup', label: 'Warm-up osoba, ktorá bozkami, rukami alebo orálom pripravuje ostatných' },
        { v: 'udrziava', label: 'Osoba, ktorá udržiava niekoho vzrušeného, kým sa pozornosť presunie inde' },
        { v: 'hracky', label: 'Ovládať pomôcky a pridávať ďalšiu vrstvu stimulácie' },
        { v: 'slova', label: 'Povzbudzovať, chváliť alebo viesť scénu hlasom' },
        { v: 'reziser', label: 'Režírovať rytmus, striedanie a to, kto je práve stredobodom' },
        { v: 'servis', label: 'Podávať pomôcky, olej alebo nápoj ako erotickú službu' },
        { v: 'pozorovatel', label: 'Pozorovať zblízka a vstúpiť až vo vybranom momente' },
        { v: 'bez_role', label: 'Nechcem pomocnú rolu, láka ma priame zapojenie' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_ritual_prijatia', typ: 'viac', inePovolene: true,
      text: 'Aký symbolický rituál prijatia do skupiny by ma eroticky naladil',
      moznosti: [
        { v: 'vyzliekanie', label: 'Skupina ma pomaly vyzlieka, každý odhalí inú časť tela' },
        { v: 'kruh_dotykov', label: 'Stojím alebo ležím uprostred kruhu a každý pridá prvý dotyk' },
        { v: 'predstavenie', label: 'Partner ma skupine slovami predstaví ako dnešný stredobod' },
        { v: 'symbol', label: 'Dostanem symbolickú stuhu, obojok, značku farbou alebo iný znak roly' },
        { v: 'bozky', label: 'Privítanie postupnými bozkami alebo dotykom pier a rúk' },
        { v: 'zaviazane_oci', label: 'So zaviazanými očami postupne spoznávam jednotlivé dotyky a hlasy' },
        { v: 'uctievanie', label: 'Krátky rituál chvály, obdivu alebo uctievania tela' },
        { v: 'bez_ritualu', label: 'Rituál ma neláka, preferujem spontánny začiatok' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_multisenzorika', typ: 'viac', inePovolene: true,
      text: 'Ktorá choreografia viacerých rúk, úst a tiel ma vzrušuje',
      moznosti: [
        { v: 'cele_telo', label: 'Viac rúk sa súčasne venuje rôznym miestam celého tela' },
        { v: 'oral_manual', label: 'Ústa na jednom mieste, ruky na ďalších a telo pritlačené z druhej strany' },
        { v: 'obklopenie', label: g('Byť tesne obklopený telami, dychom, vôňou a teplom', 'Byť tesne obklopená telami, dychom, vôňou a teplom') },
        { v: 'masaz', label: 'Pomalá masáž štyrmi alebo šiestimi rukami, ktorá sa mení na erotickú hru' },
        { v: 'kontrast', label: 'Jemné a intenzívne dotyky prichádzajú naraz z rôznych strán' },
        { v: 'neviem_kto', label: 'Nevedieť, čie ruky alebo ústa sa ma práve dotýkajú' },
        { v: 'rotacia', label: 'Stredobod sa po čase presunie na ďalšiu osobu' },
        { v: 'jedna_vedie', label: 'Jedna osoba diriguje ostatných a skladá podnety do jedného rytmu' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_pomocna_rola_ja', typ: 'jeden',
      text: g('Ako na mňa pôsobí predstava, že budem pomocnou warm-up osobou pre partnerku a skupinu', 'Ako na mňa pôsobí predstava, že budem pomocnou warm-up osobou pre partnera a skupinu'),
      moznosti: [
        { v: 'silno', label: 'Silno ma vzrušuje byť užitočnou súčasťou cudzej rozkoše' },
        { v: 'vedenie', label: 'Láka ma to iba vtedy, keď zároveň scénu vediem' },
        { v: 'striedat', label: 'Chcem túto rolu striedať s pozíciou stredobodu' },
        { v: 'fantazia', label: 'Láka ma skôr ako fantázia než reálna rola' },
        { v: 'nie', label: 'Táto rola ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_partner_pomocna_rola', typ: 'jeden',
      text: g('Keď partnerku vzrušuje pomocná alebo servisná rola v skupine', 'Keď partnera vzrušuje pomocná alebo servisná rola v skupine'),
      moznosti: [
        { v: 'vzrusuje', label: g('Jej služba a otvorenosť ma vzrušujú', 'Jeho služba a otvorenosť ma vzrušujú') },
        { v: 'spolu', label: 'Chcem byť pri tom a zdieľať s ňou alebo s ním rovnakú rolu' },
        { v: 'sledovat', label: g('Láka ma najmä sledovať ju pri tejto úlohe', 'Láka ma najmä sledovať ho pri tejto úlohe') },
        { v: 'stredobod', label: g('Je mi bližšie, keď je partnerka stredobodom, nie pomocníčkou', 'Je mi bližšie, keď je partner stredobodom, nie pomocníkom') },
        { v: 'fantazia', label: 'Môžeme o tom fantazírovať, no nechcem to uskutočniť' },
        { v: 'nie', label: 'Nie je to pre mňa erotické' },
      ],
    },
    {
      druh: 'text', id: 'skup_pomocne_myty', nadpis: 'Mýty a tabu', ton: 'info',
      telo:
        'Mýtus: v skupinovom sexe musí každý robiť všetko s každým. Realita: pozorovanie, slovné vedenie, masáž, práca s pomôckou ' +
        'alebo udržiavanie vzrušenia môžu byť plnohodnotné erotické roly. Mýtus: pomocná osoba je menejcenná. Realita: práve ona môže ' +
        'ovládať rytmus celej scény alebo vytvoriť pocit, že stredobod prijíma pozornosť zo všetkých strán.',
    },
  ],
}

// ── Gangbang & bukkake ────────────────────────────────────────────────────
const GANGBANG: Blok = {
  druh: 'skupina',
  id: 'gangbang',
  nadpis: 'Gangbang a bukkake',
  uvod: g(
    'Predstav si, že sleduješ partnerku ako stredobod pozornosti viacerých mužov — ako súčasť hry, alebo ako divák a opora.',
    'Predstav si, že si stredobodom pozornosti. Každý dotyk, každý pohľad patrí tebe, zatiaľ čo partner ťa podporuje — či ako súčasť hry, alebo ako divák.',
  ),
  bloky: [
    {
      druh: 'text', id: 'gb_bk_rozdiel', nadpis: 'Gangbang a bukkake nie sú to isté', ton: 'info',
      telo:
        'Pri gangbangu je jadrom telesná a sexuálna pozornosť viacerých mužov venovaná jednej osobe; môže zahŕňať dotyky, orál aj penetráciu. ' +
        'Bukkake je najmä vizuálne finále s viacerými ejakuláciami na telo alebo tvár a nemusí zahŕňať penetráciu. Jedného človeka môže lákať iba jeden z týchto scenárov.',
    },
    postojOtazka('gb_postoj', g(
      'Chcel by si vidieť partnerku v dynamike gangbang, kde je stredobodom pozornosti viacerých mužov?',
      'Chcela by si zažiť gangbang, kde sa viacerí muži zamerajú na tvoje potešenie a ty budeš stredobodom pozornosti?',
    )),
    postojOtazka('gb_partner_pritomnost', g(
      'Chcel by si byť súčasťou gangbang aktivity partnerky — ako zapojený účastník alebo podporný pozorovateľ?',
      'Chcela by si, aby bol partner prítomný — ako pozorovateľ alebo zapojený účastník — keď si užívaš s viacerými mužmi?',
    )),
    {
      druh: 'otazka',
      id: 'gb_partner_rola',
      typ: 'jeden',
      text: g('Akú rolu chcem mať ja pri gangbangu partnerky?', 'Akú rolu chcem pre partnera pri svojom gangbangu?'),
      moznosti: [
        { v: 'ucastnik', label: 'Zapojený účastník' },
        { v: 'pozorovatel', label: 'Pasívny pozorovateľ' },
        { v: 'opora', label: 'Podpora v pozadí' },
      ],
    },
    {
      druh: 'otazka',
      id: 'gb_aktivity',
      typ: 'viac',
      inePovolene: true,
      text: 'Ktoré aktivity ma v gangbang predstave lákajú?',
      moznosti: [
        { v: 'bozk', label: 'Bozkávanie' },
        { v: 'dotyky', label: 'Dotyky' },
        { v: 'oral', label: 'Orálny sex' },
        { v: 'penetracia', label: 'Penetrácia' },
        { v: 'pomocky', label: 'Pomôcky a spoločné dráždenie' },
        { v: 'dvojita', label: 'Dvojitá penetrácia alebo jej simulácia' },
      ],
    },
    {
      druh: 'otazka', id: 'gb_motivacia', typ: 'viac', inePovolene: true,
      text: 'Čo ma na gangbangu psychologicky vzrušuje',
      moznosti: [
        { v: 'stredobod', label: g('Sledovať partnerku ako stredobod pozornosti', 'Byť stredobodom pozornosti') },
        { v: 'rozmaznavanie', label: g('Vidieť, ako ju viacerí muži rozmaznávajú', 'Pocit rozmaznávania viacerými mužmi') },
        { v: 'intenzita', label: 'Fyzická intenzita a množstvo podnetov' },
        { v: 'objektivizacia', label: 'Erotická objektivizácia a „použitie"' },
        { v: 'voyeur', label: g('Sledovať partnerku a jej reakcie', 'Vnímať, že ma partner sleduje') },
        { v: 'tabu', label: 'Tabu, odvážnosť a prekročenie bežného scenára' },
      ],
    },
    postojOtazka('bk_postoj', g(
      'Chcel by si sledovať, ako si partnerka užíva bukkake — ako divák alebo aktívny účastník?',
      'Chcela by si zažiť bukkake — byť centrom pozornosti, keď viacerí muži ukončia svoje vzrušenie na tvojom tele?',
    )),
    {
      druh: 'otazka',
      id: 'bk_miesta',
      typ: 'viac',
      inePovolene: true,
      text: 'Ktoré miesta ma pri bukkake alebo skupinovom cumshote lákajú',
      moznosti: [
        { v: 'telo', label: 'Telo' },
        { v: 'prsia', label: 'Prsia' },
        { v: 'tvar', label: 'Tvár' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'vlasy', label: 'Vlasy' },
        { v: 'nie_tvar', label: 'Kamkoľvek okrem tváre' },
      ],
    },
    {
      druh: 'otazka', id: 'bk_vizual', typ: 'viac', inePovolene: true,
      text: 'Čo ma na bukkake vzrušuje',
      moznosti: [
        { v: 'vizual', label: 'Vizuál semena na tele' },
        { v: 'ocakavanie', label: 'Očakávanie spoločného finále' },
        { v: 'moc', label: 'Moc, odovzdanie alebo submisivita' },
        { v: 'exhibicia', label: g('Exhibicionizmus a byť sledovaný', 'Exhibicionizmus a byť sledovaná') },
        { v: 'uctievanie', label: 'Pocit, že všetka túžba smeruje na jednu osobu' },
        { v: 'messy', label: 'Messy estetika, vlhkosť a neporiadok' },
      ],
    },
    {
      druh: 'otazka', id: 'bk_zaznam', typ: 'jeden', text: 'Foto alebo video ako súčasť tejto fantázie',
      moznosti: [
        { v: 'nie', label: 'Neláka ma to' },
        { v: 'fantazia', label: 'Láka ma to iba ako fantázia' },
        { v: 'bez_tvare', label: 'Láka ma anonymný záber bez tváre' },
        { v: 'cely', label: 'Láka ma záznam celej scény' },
      ],
    },
    {
      druh: 'text', id: 'gb_bk_myty', nadpis: 'Mýty a realita', ton: 'info',
      telo:
        'Mýtus: gangbang musí byť chaotický alebo ponižujúci. Realita: môže byť pomalý, pozorne choreografovaný a zameraný na rozmaznávanie jednej osoby. ' +
        'Mýtus: bukkake automaticky znamená penetráciu. Realita: pre mnohých je to samostatná vizuálna fantázia alebo finále po orálnej a manuálnej hre. ' +
        'Fantázia o viacerých ľuďoch nie je dôvodom na hanbu a nemusí znamenať nespokojnosť s partnerom.',
    },
  ],
}

// ── Pozorovanie ───────────────────────────────────────────────────────────
const POZOROVANIE: Blok = {
  druh: 'skupina',
  id: 'pozorovanie',
  nadpis: 'Pozorovanie',
  uvod: 'Byť len pozorovateľom je jemný vstup do skupinových aktivít — zažiť atmosféru bez nutnosti aktívneho zapojenia.',
  bloky: [
    postojOtazka('voyeur_postoj', g('Chcel by si byť pasívnym pozorovateľom počas skupinových aktivít — len sledovať bez aktívneho zapojenia?', 'Chcela by si byť pasívnou pozorovateľkou počas skupinových aktivít — len sledovať bez aktívneho zapojenia?')),
    postojOtazka('watch_partner_postoj', g('Chcel by si sledovať partnerku pri intímnej aktivite s inou osobou?', 'Chcela by si sledovať partnera pri intímnej aktivite s inou osobou?')),
  ],
}

// ── Scenár, tretia osoba a dozvuk ─────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina',
  id: 'ramec',
  nadpis: 'Scenár, tretia osoba a dozvuk',
  uvod: g(
    'Erotický charakter skupinovej skúsenosti neurčujú iba telá. Mení ho spôsob pozvania, známosť tretej osoby, miesto, rola partnerky aj to, ako sa pár po zážitku znovu spojí.',
    'Erotický charakter skupinovej skúsenosti neurčujú iba telá. Mení ho spôsob pozvania, známosť tretej osoby, miesto, rola partnera aj to, ako sa pár po zážitku znovu spojí.',
  ),
  bloky: [
    {
      druh: 'otazka',
      id: 'ramec_pravidla',
      typ: 'viac',
      text: 'Ktoré prvky chceme mať v scenári jasne pomenované?',
      moznosti: [
        { v: 'ano_mozno_nikdy', label: 'Kto je stredobodom a ako sa pozornosť strieda' },
        { v: 'stop', label: 'Či sa roly počas scény menia alebo ostávajú stabilné' },
        { v: 'len_pozorujem', label: 'Či niekto začína iba ako pozorovateľ' },
        { v: 'komunikacia', label: 'Aké slová, príkazy alebo pochvaly patria do atmosféry' },
        { v: 'exit', label: 'Ako sa scéna prirodzene uzavrie' },
        { v: 'aftercare', label: 'Ako sa pár po zážitku znovu spojí' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_ochrana',
      typ: 'viac',
      text: 'Praktická choreografia večera',
      moznosti: [
        { v: 'kondomy', label: 'Spoločný príchod a odchod páru' },
        { v: 'bariery', label: 'Najprv rozhovor alebo drink, potom presun do intimity' },
        { v: 'test', label: 'Vopred vybraná hudba, svetlo a atmosféra' },
        { v: 'vymena', label: 'Striedanie stredobodu v jednotlivých kolách' },
        { v: 'prestavky', label: 'Prestávky na rozhovor, pozorovanie alebo maznanie' },
        { v: 'poradie', label: 'Vopred predstavený sled aktivít' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_latky',
      typ: 'jeden',
      text: 'Ako plánovaná má byť táto skúsenosť',
      moznosti: [
        { v: 'bez', label: 'Detailne naplánovaná vrátane rolí a poradia' },
        { v: 'jeden', label: 'Pár pevných bodov, zvyšok spontánne' },
        { v: 'nezalezi', label: 'Čo najspontánnejšia podľa energie v miestnosti' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_aftercare',
      typ: 'viac',
      text: 'Dozvuk a spoločná reflexia',
      moznosti: [
        { v: 'zaklad', label: 'Nápoj, objatie a chvíľa páru osamote' },
        { v: 'dva_dva', label: '„2+2" — dve veci super, dve na úpravu' },
        { v: 'checkin', label: 'Check-in po 24 hodinách (pocity, žiarlivosť, čo nabudúce)' },
        { v: 'samostatne', label: g('Reflexia osamote len s partnerkou', 'Reflexia osamote len s partnerom') },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_foto',
      typ: 'jeden',
      text: 'Foto / video',
      moznosti: [
        { v: 'nie', label: 'Záznam ma eroticky neláka' },
        { v: 'bez_tvari', label: 'Anonymný detail alebo záber bez tvárí' },
        { v: 'ano_pravidla', label: 'Celá scéna ako súčasť exhibicionistickej fantázie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'ramec_vyber_osoby',
      typ: 'viac',
      inePovolene: true,
      text: 'Výber tretej osoby — čo je pre nás dôležité',
      moznosti: [
        { v: 'dovera', label: 'Silná osobná chémia s oboma' },
        { v: 'plus18', label: 'Sebavedomá a iniciatívna energia' },
        { v: 'pravidla', label: 'Skôr jemná, vnímavá a nenápadná energia' },
        { v: 'hygiena', label: 'Konkrétny vzhľad, štýl alebo telesný typ' },
        { v: 'znamy', label: 'Človek, ktorého už obaja poznáme' },
        { v: 'novy', label: 'Úplne nový človek bez ďalšieho príbehu' },
        { v: 'klub', label: 'Niekto zo swinger/sex-positive prostredia' },
        { v: 'pozorovanim', label: 'Najprv tú osobu iba sledovať v skupine' },
      ],
    },
    { druh: 'otazka', id: 'ramec_preco_osoba', typ: 'text', text: 'Koho si predstavujem ako tretiu osobu — a čo konkrétne ma na nej vzrušuje?' },
    {
      druh: 'otazka',
      id: 'ramec_miesto',
      typ: 'viac',
      inePovolene: true,
      text: 'Ktoré miesto má pre nás správnu erotickú atmosféru',
      moznosti: [
        { v: 'doma', label: 'Doma' },
        { v: 'hotel', label: 'Hotel alebo prenajatý priestor' },
        { v: 'klub', label: 'Klub (s možnosťou „len pozorovať")' },
        { v: 'diskretne', label: 'Diskrétne mimo domova' },
      ],
    },
    { druh: 'otazka', id: 'ramec_nudzovy_plan', typ: 'text', text: 'Ako chceme po skupinovej scéne prejsť späť do párovej intimity?' },
  ],
}

// ── Emócie & žiarlivosť ───────────────────────────────────────────────────
const EMOCIE: Blok = {
  druh: 'skupina',
  id: 'emocie',
  nadpis: 'Emócie, žiarlivosť, zdieľanie',
  bloky: [
    { druh: 'otazka', id: 'emo_ocakavanie', typ: 'text', text: 'Čo očakávam od svojich emócií (vzrušenie × zraniteľnosť, zmiešané pocity sú normálne):' },
    { druh: 'otazka', id: 'emo_ziarlivost', typ: 'text', text: g('Čo u mňa spúšťa žiarlivosť a aký druh pozornosti by som vtedy chcel od partnerky:', 'Čo u mňa spúšťa žiarlivosť a aký druh pozornosti by som vtedy chcela od partnera:') },
    {
      druh: 'otazka', id: 'emo_spustace', typ: 'viac', inePovolene: true,
      text: 'Ktoré momenty by vo mne mohli miešať vzrušenie so žiarlivosťou',
      moznosti: [
        { v: 'bozk', label: g('Dlhé alebo romantické bozkávanie partnerky s treťou osobou', 'Dlhé alebo romantické bozkávanie partnera s treťou osobou') },
        { v: 'orgazmus', label: g('Orgazmus partnerky spôsobený treťou osobou', 'Orgazmus partnera spôsobený treťou osobou') },
        { v: 'pozornost', label: 'Keď tretia osoba dostáva dlhšie viac pozornosti než ja' },
        { v: 'pohlad', label: g('Intenzívny očný kontakt medzi partnerkou a treťou osobou', 'Intenzívny očný kontakt medzi partnerom a treťou osobou') },
        { v: 'rovnake', label: g('Interakcia partnerky so ženou', 'Interakcia partnera s mužom') },
        { v: 'po', label: 'Neha, maznanie alebo ďalší kontakt po sexe' },
        { v: 'bokom', label: g('Pocit, že som sa ocitol bokom', 'Pocit, že som sa ocitla bokom') },
      ],
    },
    { druh: 'otazka', id: 'emo_hinty', typ: 'text', text: g('Ktoré gesto, pohľad alebo dotyk ma počas scény znovu eroticky prepojí s partnerkou?', 'Ktoré gesto, pohľad alebo dotyk ma počas scény znovu eroticky prepojí s partnerom?') },
    {
      druh: 'otazka', id: 'emo_compersion', typ: 'jeden', text: g('Ako na mňa pôsobí predstava partnerkinej rozkoše s treťou osobou', 'Ako na mňa pôsobí predstava partnerovej rozkoše s treťou osobou'),
      moznosti: [
        { v: 'silno', label: 'Je to silný zdroj môjho vlastného vzrušenia' },
        { v: 'mix', label: 'Vzrušuje ma a zároveň vo mne vyvoláva žiarlivosť' },
        { v: 'neutral', label: g('Som skôr neutrálny a zvedavý', 'Som skôr neutrálna a zvedavá') },
        { v: 'blok', label: 'Skôr ma to eroticky blokuje' },
      ],
    },
    {
      druh: 'otazka',
      id: 'emo_zdielanie',
      typ: 'jeden',
      text: 'Zdieľanie detailov po akcii',
      moznosti: [
        { v: 'ano', label: 'Áno, vzrušuje ma to' },
        { v: 'ak_chce', label: g('Len ak to chce počuť aj partnerka', 'Len ak to chce počuť aj partner') },
        { v: 'nie', label: 'Nie, nechcem detaily' },
      ],
    },
  ],
}

// ── DP/DAP „edge" screening ───────────────────────────────────────────────
const EDGE: Blok = {
  druh: 'skupina',
  id: 'edge',
  nadpis: 'Dvojitá penetrácia (DP/DAP) — samostatná karta',
  uvod: 'Skratky DP a DAP môžu znamenať rôzne fantázie: dve penetrácie naraz, kombináciu tela a pomôcky alebo iba vizuálnu simuláciu. Preto sa oplatí pomenovať konkrétnu predstavu.',
  bloky: [
    {
      druh: 'otazka',
      id: 'edge_dp',
      typ: 'jeden',
      text: 'Dvojitá penetrácia — kde som?',
      moznosti: [
        { v: 'fantazia', label: 'Len fantázia' },
        { v: 'mozno', label: 'Možno — najviac ma láka simulácia alebo jemnejšia verzia' },
        { v: 'ano', label: 'Áno — chcem ju ako súčasť skupinovej scény' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka',
      id: 'edge_dp_podmienky',
      typ: 'text',
      text: 'Aké zloženie osôb, pomôcok a polôh si pri tejto predstave predstavujem:',
      podmienka: { ot: 'edge_dp', jeNiektora: ['mozno', 'ano'] },
    },
    {
      druh: 'otazka', id: 'edge_typy', typ: 'viac', inePovolene: true,
      text: 'Ktoré varianty ma lákajú aspoň vo fantázii',
      moznosti: [
        { v: 'dp_va', label: 'Vaginálna a análna penetrácia súčasne (DP)' },
        { v: 'dvp', label: 'Dvojitá vaginálna penetrácia (DVP)' },
        { v: 'dap', label: 'Dvojitá análna penetrácia (DAP)' },
        { v: 'pomocka', label: 'Jedna osoba a jedna pomôcka' },
        { v: 'dve_pomocky', label: 'Simulácia s dvomi pomôckami' },
        { v: 'oral_pen', label: 'Orálna stimulácia súčasne s penetráciou' },
      ],
    },
    {
      druh: 'text', id: 'edge_mytus', nadpis: 'Fantázia nemusí byť technický plán', ton: 'info',
      telo: 'Dvojitá penetrácia vo fantázii často predstavuje najmä pocit plnosti, množstvo pozornosti alebo úplné odovzdanie. Rovnakú psychologickú vrstvu môže niesť kombinácia prstov, jazyka a pomôcky bez kopírovania pornografického obrazu.',
    },
  ],
}

const POVODNY_OBSAH: TemaObsah = {
  slug: 'trojky-skupiny/trojky-skupiny',
  nadpis: 'Trojky, skupiny a gangbang',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text',
      id: 'preco_trojka',
      nadpis: 'Prečo práve trojka?',
      telo:
        'Novosť a vzrušenie — zapojenie tretej osoby pridáva nový rozmer k známej dynamike.\n\n' +
        'Sústredenie pozornosti — byť stredobodom dvoch osôb posilňuje sebavedomie.\n\n' +
        'Pozorovanie partnerovej rozkoše — môže vzrušovať samotný pohľad, radosť z potešenia druhého aj príjemná dávka žiarlivosti.\n\n' +
        'Objavenie nových túžob — roly, príťažlivosť k rovnakému pohlaviu, služba, dominancia alebo pasívne sledovanie.\n\n' +
        'Trojka nie je test kvality vzťahu. Môže zostať fantáziou, jednorazovou skúsenosťou alebo obľúbenou formou spoločnej sexuality.',
    },
    {
      druh: 'text',
      id: 'konfiguracie',
      nadpis: 'Možné dynamiky a konfigurácie',
      telo:
        'V trojke ste vždy traja vrátane teba. MMF znamená dvoch mužov a jednu ženu, FMF dve ženy a jedného muža. ' +
        'Niekedy je stredobodom jedna osoba, inokedy sa vášeň delí rovnomerne. Rovnaké zloženie môže pôsobiť úplne inak podľa toho, kto vedie, kto pozoruje a či sa osoby rovnakého pohlavia navzájom dotýkajú.',
    },
    {
      druh: 'text', id: 'tuzba_trojka', nadpis: 'Čo je na trojke také príťažlivé', ton: 'citat',
      telo: g(
        'Predstav si, že známu partnerkinu rozkoš zrazu vidíš novými očami. Niekto ďalší obdivuje jej telo, ty sleduješ reakcie, ktoré poznáš, a zároveň objavuješ nové. Alebo si medzi dvomi ženami a každý dotyk prichádza z iného smeru — jedna ťa bozkáva, druhá vedie rukou po tele a ich vzájomná chémia sa stáva súčasťou tvojho vzrušenia. Trojka môže byť o hojnosti pozornosti, pozorovaní, spolupráci aj o príjemnom napätí z toho, že nevieš, kto sa ťa dotkne ďalší.',
        'Predstav si, že sa na tvoje telo sústredia dve osoby naraz: jedny pery na krku, druhé medzi stehnami, ruky, ktoré sa striedajú a učia sa z tvojich reakcií. Alebo sleduješ partnera s druhou ženou a zisťuješ, že jeho vzrušenie zvyšuje aj tvoje. Trojka môže byť o rozmaznávaní, objavovaní vlastnej príťažlivosti k žene, o moci byť stredobodom aj o vzrušujúcej zmesi zvedavosti a žiarlivosti.',
      ),
    },
    {
      druh: 'text', id: 'myty_trojka', nadpis: 'Mýty, ktoré zbytočne brzdia túžbu', ton: 'info',
      telo:
        'Mýtus: fantázia o trojke znamená, že partner nestačí. Realita: často ide o novosť, množstvo pozornosti, sledovanie partnerovej rozkoše alebo objavenie inej stránky vlastnej sexuality.\n\n' +
        'Mýtus: v dobrej trojke musí každý robiť všetko s každým. Realita: niekoho vzrušuje stredobod, iného pozorovanie a ďalšieho kontakt iba s jednou osobou. Choreografia môže byť „dvaja pre jedného", striedanie aj erotické 2+1.\n\n' +
        'Mýtus: žiarlivosť znamená, že človek trojku nechce. Realita: vzrušenie, zraniteľnosť, radosť z partnerovho potešenia aj žiarlivosť sa môžu objaviť naraz.\n\n' +
        'Mýtus: dotyk osoby rovnakého pohlavia automaticky určuje sexuálnu orientáciu. Realita: konkrétna fantázia, zvedavosť alebo skupinová skúsenosť nemusí byť novou identitou.\n\n' +
        'Trojky patria medzi rozšírené sexuálne fantázie. Túžba po nich nie je dôvodom na hanbu a rovnako nie je zlyhaním, ak človeka lákajú iba v predstavách.',
    },
    {
      druh: 'text',
      id: 'ako_prijemne',
      nadpis: 'Čo robí trojku eroticky živou',
      ton: 'info',
      telo:
        'Najsilnejší zážitok často nevytvorí počet aktivít, ale choreografia pozornosti: dve osoby sa chvíľu venujú jednej, potom sa stredobod zmení; partneri sa počas scény vyhľadajú pohľadom; pozorovateľ sa neskôr stane aktívnym. ' +
        'Tretia osoba môže priniesť inú energiu, telo, vôňu, techniku alebo rolu. Po zážitku môže páru vyhovovať maznanie, erotické rozprávanie detailov alebo pokojný návrat k intimite vo dvojici.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'troj_konfiguracie', typ: 'viac', inePovolene: true,
      text: 'Ktoré podoby trojky ma vzrušujú aspoň vo fantázii?',
      moznosti: [
        { v: 'mmf', label: g('MMF — ja, partnerka a ďalší muž', 'MMF — ja, partner a ďalší muž') },
        { v: 'fmf', label: g('FMF — ja, partnerka a ďalšia žena', 'FMF — ja, partner a ďalšia žena') },
        { v: 'stvorka', label: 'Štvorica alebo viac ľudí' },
        { v: 'nezalezi', label: 'Zloženie nie je rozhodujúce, dôležitá je chémia' },
      ],
    },
    {
      druh: 'otazka',
      id: 'troj_dynamika',
      typ: 'viac',
      inePovolene: true,
      text: 'Aký typ dynamiky preferuješ pri trojke? (Vyber všetky, ktoré ťa oslovujú.)',
      moznosti: [
        { v: 'jedna_stredobod', label: 'Jedna osoba ako stredobod pozornosti (všetci sa venujú jednej)' },
        { v: 'rovnaka', label: 'Rovnaká pozornosť venovaná všetkým (každý sa venuje každému)' },
        { v: 'dve_tretej', label: 'Dve osoby sa venujú tretej bez interakcie medzi sebou' },
        { v: 'jedna_pasivna', label: 'Jedna osoba má pasívnu rolu (pozorovateľ), zvyšné dve interagujú' },
      ],
    },
    {
      druh: 'otazka',
      id: 'troj_aktivita',
      typ: 'jeden',
      text: g('Chceš byť počas trojky aktívny alebo skôr pasívny?', 'Chceš byť počas trojky aktívna alebo skôr pasívna?'),
      moznosti: [
        { v: 'aktivny', label: g('Chcem byť aktívny a zapojiť sa naplno', 'Chcem byť aktívna a zapojiť sa naplno') },
        { v: 'pasivny', label: g('Rád by som bol v pasívnej úlohe — sledovanie alebo jemné zapojenie', 'Rada by som bola v pasívnej úlohe — sledovanie alebo jemné zapojenie') },
        { v: 'diskusia', label: g('Nie som si istý — chcem si najprv predstaviť konkrétny scenár', 'Nie som si istá — chcem si najprv predstaviť konkrétny scenár') },
      ],
    },
    MMF,
    FMF,
    {
      druh: 'otazka',
      id: 'troj_roly',
      typ: 'viac',
      text: 'Chceš skúsiť situáciu, kde…',
      moznosti: ROLY_DYNAMIKA,
    },
    {
      druh: 'skupina', id: 'matica_interakcii', nadpis: 'Matica interakcií — kto s kým a ako',
      uvod: g(
        'Trojka nemusí znamenať, že každý robí všetko s každým. Táto časť ukáže, čo ťa láka sledovať medzi partnerkou a treťou osobou a čo chceš zažiť spoločne vo trojici.',
        'Trojka nemusí znamenať, že každý robí všetko s každým. Táto časť ukáže, čo ťa láka sledovať medzi partnerom a treťou osobou a čo chceš zažiť spoločne vo trojici.',
      ),
      bloky: [
        {
          druh: 'otazka', id: 'mat_partner_tretia', typ: 'viac', inePovolene: true, text: g('Čo ma vzrušuje sledovať medzi partnerkou a treťou osobou', 'Čo ma vzrušuje sledovať medzi partnerom a treťou osobou'),
          moznosti: [
            { v: 'pohlad', label: 'Flirt a očný kontakt' }, { v: 'bozk', label: 'Bozkávanie' },
            { v: 'dotyky', label: 'Dotyky a manuálna stimulácia' }, { v: 'oral', label: 'Orálna stimulácia' },
            { v: 'penetracia', label: 'Penetrácia' }, { v: 'orgazmus', label: g('Orgazmus partnerky', 'Orgazmus partnera') },
            { v: 'nic', label: g('Nechcem, aby partnerka mala interakciu s treťou osobou — chcem, aby sa venovala iba mne', 'Nechcem, aby partner mal interakciu s treťou osobou — chcem, aby sa venoval iba mne') },
          ],
        },
        {
          druh: 'otazka', id: 'mat_vsetci', typ: 'viac', inePovolene: true, text: 'Ktoré spoločné aktivity všetkých troch ma lákajú',
          moznosti: [
            { v: 'bozky', label: 'Striedané bozky a dotyky v kruhu' },
            { v: 'jedna_osoba', label: 'Dvaja sa súčasne venujú jednej osobe' },
            { v: 'oral_manual', label: 'Kombinácia orálu a manuálnej stimulácie' },
            { v: 'pomocka', label: 'Jedna pomôcka používaná viacerými rukami' },
            { v: 'pozorovanie', label: 'Dvaja sa milujú a tretí sleduje alebo masturbuje' },
            { v: 'striedanie', label: 'Postupné striedanie stredobodu' },
          ],
        },
      ],
    },
    {
      druh: 'skupina',
      id: 'hranice',
      nadpis: 'Turn-offy pri trojke',
      uvod: 'Táto časť zachytáva prvky, ktoré predstavu trojky vypínajú, aj keď samotné zloženie alebo dynamika môžu byť príťažlivé.',
      bloky: [
        {
          druh: 'otazka',
          id: 'hr_tabu',
          typ: 'viac',
          inePovolene: true,
          text: 'Ktoré prvky ma pri predstave trojky eroticky vypínajú?',
          moznosti: [
            { v: 'bozk', label: 'Partner bozkáva tretiu osobu' },
            { v: 'oral_dava', label: 'Partner poskytuje orál tretej osobe' },
            { v: 'oral_prijima', label: 'Partner prijíma orál od tretej osoby' },
            { v: 'penetracia', label: g('Penetrácia medzi partnerkou a treťou osobou', 'Penetrácia medzi partnerom a treťou osobou') },
            { v: 'viac_kontaktu', label: 'Partner má viac fyzického kontaktu s treťou osobou ako so mnou' },
            { v: 'rovnake_pohlavie', label: 'Akákoľvek interakcia medzi rovnakým pohlavím' },
            { v: 'bdsm', label: 'Akékoľvek BDSM prvky (zväzovanie, škrtenie, facky)' },
          ],
        },
        {
          druh: 'otazka',
          id: 'hr_vidiet_partnera',
          typ: 'jeden',
          text: g('Ako by si sa cítil, keby si videl partnerku v akcii s treťou osobou?', 'Ako by si sa cítila, keby si videla partnera v akcii s treťou osobou?'),
          moznosti: [
            { v: 'vzrusuje', label: 'Vzrušuje ma to, chcem to skúsiť' },
            { v: 'mozno', label: g('Možno, musel by som to vidieť a vnímať svoju reakciu', 'Možno, musela by som to vidieť a vnímať svoju reakciu') },
            { v: 'nie', label: 'Nie, neviem si to predstaviť' },
          ],
        },
      ],
    },
    SKUPINY,
    CHOREOGRAFIA_SKUPINY,
    GANGBANG,
    POZOROVANIE,
    RAMEC,
    EMOCIE,
    EDGE,
  ],
  zaver: [
    {
      druh: 'text',
      id: 'zaver',
      nadpis: 'Záver sekcie — trojka ako cesta k novým zážitkom',
      telo:
        'Trojka môže odhaliť, že vás oboch vzrušuje rovnaké zloženie, no odlišná rola — jeden chce byť stredobodom, druhý pozorovať alebo viesť. ' +
        'Rovnako hodnotný výsledok je zistenie, že vás viac vzrušuje rozprávanie fantázie, spoločné sledovanie, hra s pomôckami alebo pozorovanie partnera než samotné zapojenie tretej osoby.',
    },
  ],
}

// Každý formát má vlastnú route a vlastnú skúsenosť. Spoločné otázky nie sú
// bránou k ostatným témam: MMF, FMF, skupina, gangbang a bukkake sa neodvodzujú
// jedna z druhej. Pôvodné ID otázok ostávajú v príslušnej téme.
const bloky = (skupina: Blok): Blok[] => skupina.druh === 'skupina' ? skupina.bloky : []
const staryOkruh = (blok: Blok, okruh: string): Blok => blok.druh === 'otazka'
  ? { ...blok, povodnyOkruh: okruh }
  : blok
const povodny = (id: string): Blok => {
  const blok = POVODNY_OBSAH.telo.find(b => b.id === id)
  if (!blok) throw new Error(`Chýba pôvodný blok ${id}`)
  return blok
}

function temaSoSkusenostou({ slug, nadpis, prefix, skusenostText, uvod, zaujem, detaily, partner }: {
  slug: string; nadpis: string; prefix: string; skusenostText: TemaObsah['nadpis']; uvod: Blok[]; zaujem: Blok;
  detaily: Blok[]; partner: TemaObsah['nadpis']
}): TemaObsah {
  const skusenost = `${prefix}_skusenost`
  const hodnotenie = `${prefix}_hodnotenie`
  const realita = `${prefix}_realita`
  return {
    slug: `trojky-skupiny/${slug}`,
    nadpis,
    zdielanieDovod: true,
    uvod,
    telo: [
      {
        druh: 'otazka', id: skusenost, typ: 'jeden',
        text: skusenostText,
        napoveda: 'Skúsenosť v inom formáte sa sem nepočíta.',
        moznosti: [
          { v: 'ano', label: g('Áno, zažil som tento konkrétny formát', 'Áno, zažila som tento konkrétny formát') },
          { v: 'ziadna', label: 'Nie, s týmto formátom nemám skúsenosť' },
        ],
      },
      {
        druh: 'skupina', id: `${prefix}_so_skusenostou`, nadpis: 'Moja skutočná skúsenosť',
        podmienka: { ot: skusenost, je: 'ano' },
        bloky: [
          {
            druh: 'otazka', id: hodnotenie, typ: 'jeden',
            text: 'Ako na mňa tento zážitok pôsobil?',
            moznosti: [
              { v: 'velmi', label: 'Veľmi ma vzrušoval — chcem ho opakovať' },
              { v: 'skor', label: g('Páčil sa mi, ale niečo by som zmenil', 'Páčil sa mi, ale niečo by som zmenila') },
              { v: 'neutral', label: 'Bol v poriadku, nie je mojou prioritou' },
              { v: 'zlepsit', label: 'Nesadol mi, no iná podoba by ma mohla zaujať' },
              { v: 'nechcem_opakovat', label: 'Bol nepríjemný — nechcem ho opakovať' },
            ],
          },
          { druh: 'otazka', id: `${prefix}_zmenit`, typ: 'text', text: g('Čo by som pri inom pokuse zmenil?', 'Čo by som pri inom pokuse zmenila?'),
            podmienka: { ot: hodnotenie, jeNiektora: ['skor', 'zlepsit'] } },
          { druh: 'otazka', id: `${prefix}_fungovalo`, typ: 'text', text: 'Čo konkrétne fungovalo a chcem zažiť znova?',
            podmienka: { ot: hodnotenie, jeNiektora: ['velmi', 'skor', 'neutral'] } },
          { druh: 'otazka', id: `${prefix}_frekvencia`, typ: 'jeden', text: g('Ako často by som to chcel zažívať?', 'Ako často by som to chcela zažívať?'),
            podmienka: { ot: hodnotenie, jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] },
            moznosti: [
              { v: 'casto', label: 'Častejšie' }, { v: 'obcas', label: 'Občas' },
              { v: 'vynimocne', label: 'Len výnimočne' }, { v: 'neviem', label: 'Zatiaľ neviem' },
            ] },
        ],
      },
      {
        druh: 'skupina', id: `${prefix}_bez_skusenosti`, nadpis: 'Zatiaľ bez skúsenosti',
        podmienka: { ot: skusenost, je: 'ziadna' },
        bloky: [
          { druh: 'text', id: `${prefix}_fantazia_info`, ton: 'info',
            telo: g('Fantázia môže zostať fantáziou. Táto časť sa pýta na predstavu, nie na zážitok, ktorý si nemal.',
              'Fantázia môže zostať fantáziou. Táto časť sa pýta na predstavu, nie na zážitok, ktorý si nemala.') },
          { druh: 'otazka', id: `${prefix}_fantazia`, typ: 'jeden', text: 'Ako často sa mi táto predstava objavuje?',
            moznosti: [
              { v: 'silna', label: 'Je to silná alebo opakujúca sa fantázia' },
              { v: 'obcas', label: 'Objaví sa občas' },
              { v: 'zvedavost', label: g('Skôr som zvedavý než vzrušený', 'Skôr som zvedavá než vzrušená') },
              { v: 'nelaka', label: 'Neláka ma' },
            ] },
          { druh: 'otazka', id: realita, typ: 'jeden', text: 'Chcem túto predstavu niekedy preniesť do reality?',
            moznosti: [
              { v: 'chcem', label: 'Áno, chcem to skúsiť' },
              { v: 'mozno', label: 'Možno, záleží na konkrétnej podobe' },
              { v: 'fantazia', label: 'Vzrušuje ma iba ako fantázia' },
              { v: 'nie', label: 'Nie, nechcem to skúšať' },
            ] },
        ],
      },
      zaujem,
      { druh: 'otazka', id: `${prefix}_partner_tuzi`, typ: 'jeden', inePovolene: true,
        text: partner,
        moznosti: [
          { v: 'spolu', label: 'Vzrušuje ma to tiež' },
          { v: 'ochota', label: g('Rád sa zapojím pre jej potešenie', 'Rada sa zapojím pre jeho potešenie') },
          { v: 'fantazia', label: 'Chcem o tom len fantazírovať spolu' },
          { v: 'neistota', label: 'Potrebujem rozlíšiť konkrétne roly a hranice' },
          { v: 'nie', label: 'Nechcem sa do toho zapojiť' },
        ] },
      {
        druh: 'skupina', id: `${prefix}_podoby`, nadpis: 'Konkrétna podoba, ktorá ma láka',
        podmienka: {
          vsetky: [
            { ot: zaujem.id, jeNiektora: ['robime', 'tuzim', 'ak_chce', 'mozno', 'fantazia', 'ano'] },
            { asponJedna: [
              { vsetky: [{ ot: skusenost, je: 'ano' }, { ot: hodnotenie, nie: 'nechcem_opakovat' }] },
              { vsetky: [{ ot: skusenost, je: 'ziadna' }, { ot: realita, jeNiektora: ['chcem', 'mozno', 'fantazia'] }] },
            ] },
          ],
        },
        bloky: detaily,
      },
    ],
    zaver: [{ druh: 'otazka', id: `${prefix}_sumar`, typ: 'text',
      text: g('Čo z tejto konkrétnej témy chcem s partnerkou preskúmať?', 'Čo z tejto konkrétnej témy chcem s partnerom preskúmať?') }],
  }
}

export const TROJKY_SKUPINY: TemaObsah = {
  slug: POVODNY_OBSAH.slug,
  nadpis: 'Trojky',
  zdielanieDovod: true,
  uvod: [{ druh: 'text', id: 'troj_uvod', nadpis: 'Trojky',
    telo: 'Trojka znamená spoločnú intímnu situáciu troch dospelých ľudí. Najprv sa rozhodneš, či chceš túto tému preskúmať. Fantázia ani zvedavosť nie sú súhlasom uskutočniť ju. MMF a FMF sú dve samostatné podtémy s vlastnou skúsenosťou a hranicami.' },
    ...POVODNY_OBSAH.uvod.slice(0, 2)],
  telo: [
    { druh: 'otazka', id: 'troj_skusenost', typ: 'jeden',
      text: 'Máš osobnú skúsenosť s trojkou?',
      moznosti: [
        { v: 'mmf', label: g('Áno, bol som v trojke so ženou a ďalším mužom (MMF)', 'Áno, bola som v trojke s dvoma mužmi (MMF)') },
        { v: 'fmf', label: g('Áno, bol som v trojke s dvoma ženami (FMF)', 'Áno, bola som v trojke s mužom a ďalšou ženou (FMF)') },
        { v: 'obe', label: g('Áno, zažil som obe podoby', 'Áno, zažila som obe podoby') },
        { v: 'ziadna', label: g('Nie, zatiaľ som trojku nezažil', 'Nie, zatiaľ som trojku nezažila') },
      ] },
    { druh: 'skupina', id: 'troj_mam_skusenost', nadpis: 'Mám skúsenosť',
      podmienka: { ot: 'troj_skusenost', jeNiektora: ['mmf', 'fmf', 'obe'] },
      bloky: [
        trojkaPodtema('mmf', MMF, g('Moja skúsenosť: ja, žena a ďalší muž (MMF)', 'Moja skúsenosť: ja a dvaja muži (MMF)')),
        trojkaPodtema('fmf', FMF, g('Moja skúsenosť: ja a dve ženy (FMF)', 'Moja skúsenosť: ja, muž a ďalšia žena (FMF)')),
      ] },
    { druh: 'skupina', id: 'troj_nemam_skusenost', nadpis: 'Nemám skúsenosť',
      podmienka: { ot: 'troj_skusenost', jeNiektora: ['mmf', 'fmf', 'ziadna'] },
      bloky: [trojkaBezSkusenosti('mmf'), trojkaBezSkusenosti('fmf')] },
  ],
}

// Skúsená vetva je jeden súvislý blok. Obe podoby trojky sú v ňom podtémami.
// Pôvodné ID otázok v detailoch ostávajú zachované kvôli uloženým odpovediam.
function trojkaPodtema(prefix: 'mmf' | 'fmf', povodna: Blok, nazov: TemaObsah['nadpis']): Blok {
  const vstup = `${prefix}_vstup`
  // Nové ID: staré „ako spomínaš“ neznamená mieru vzrušenia.
  const hodnotenie = `${prefix}_miera_vzrusenia`
  const otvorena = { ot: vstup, je: 'ano' }
  const maSkusenost = { ot: 'troj_skusenost', jeNiektora: [prefix, 'obe'] }
  const pokracuje = { ot: hodnotenie, jeNiektora: ['velmi', 'skor', 'neutral', 'zlepsit'] }
  // Pôvodné hodnoty „ja som stredobodom“ nemali rovnaký význam pre oboch.
  // Nové ID zabráni, aby sa stará odpoveď interpretovala ako iná osoba.
  const detail = bloky(povodna).slice(1, 2).map(b => b.druh === 'otazka'
    ? { ...b, id: `${prefix}_rozdelenie_zrkadlo`, povodnyOkruh: prefix }
    : b)
  const rovnakeKontakty: Moznost[] = prefix === 'mmf' ? [
    { v: 'bozk', label: g('Bozkávam sa s ďalším mužom', 'Partner sa bozkáva s ďalším mužom') },
    { v: 'dotyky', label: g('Dotýkame sa s ďalším mužom', 'Partner sa dotýka s ďalším mužom') },
    { v: 'rucne_prijima', label: g('Ďalší muž ma dráždi rukou', 'Ďalší muž dráždi partnera rukou') },
    { v: 'rucne_poskytuje', label: g('Dráždim ďalšieho muža rukou', 'Partner dráždi ďalšieho muža rukou') },
    { v: 'oral_prijima', label: g('Prijímam orál od ďalšieho muža', 'Partner prijíma orál od ďalšieho muža') },
    { v: 'oral_poskytuje', label: g('Poskytujem orál ďalšiemu mužovi', 'Partner poskytuje orál ďalšiemu mužovi') },
  ] : [
    { v: 'bozk', label: g('Partnerka sa bozkáva s ďalšou ženou', 'Bozkávam sa s ďalšou ženou') },
    { v: 'dotyky', label: g('Partnerka a ďalšia žena sa dotýkajú', 'Dotýkame sa s ďalšou ženou') },
    { v: 'rucne_prijima', label: g('Ďalšia žena dráždi partnerku rukou', 'Ďalšia žena ma dráždi rukou') },
    { v: 'rucne_poskytuje', label: g('Partnerka dráždi ďalšiu ženu rukou', 'Dráždim ďalšiu ženu rukou') },
    { v: 'oral_prijima', label: g('Partnerka prijíma orál od ďalšej ženy', 'Prijímam orál od ďalšej ženy') },
    { v: 'oral_poskytuje', label: g('Partnerka poskytuje orál ďalšej žene', 'Poskytujem orál ďalšej žene') },
    { v: 'pomocka', label: g('Partnerka a ďalšia žena používajú pomôcku jedna na druhej', 'Používame s ďalšou ženou pomôcku jedna na druhej') },
  ]
  const stareOtazky = bloky(povodna).filter((b): b is Extract<Blok, { druh: 'otazka' }> => b.druh === 'otazka')
  const staraOdpoved = (id: string) => ({ ot: id, nie: '__neexistujuca_hodnota__' })
  return {
    druh: 'skupina', id: `${prefix}_podtema`, nadpis: nazov,
    podmienka: maSkusenost,
    bloky: [
      { druh: 'otazka', id: vstup, typ: 'jeden',
        text: `Chceš preskúmať podobu ${prefix.toUpperCase()}?`,
        moznosti: [
          { v: 'ano', label: 'Áno, chcem ju preskúmať' },
          { v: 'neskor', label: 'Ešte nie — vrátim sa k nej neskôr' },
          { v: 'nie', label: 'Nie, túto podobu nechcem skúmať' },
        ] },
          { druh: 'text', id: `${prefix}_miera_vzrusenia_uvod`, nadpis: g('Ako som to prežíval', 'Ako som to prežívala'),
            podmienka: otvorena,
            telo: g('Ako si prežíval túto podobu trojky? Nezáleží na tom, s kým si ju zažil.', 'Ako si prežívala túto podobu trojky? Nezáleží na tom, s kým si ju zažila.') },
          { druh: 'otazka', id: hodnotenie, typ: 'jeden', text: 'Ktoré tvrdenie najviac sedí?',
            podmienka: otvorena,
            moznosti: [
              { v: 'velmi', label: 'Veľmi ma to vzrušovalo – chcem to opakovať / zaradiť' },
              { v: 'skor', label: g('Skôr ma to vzrušovalo – rád to zopakujem, ak budú vhodné podmienky', 'Skôr ma to vzrušovalo – rada to zopakujem, ak budú vhodné podmienky') },
              { v: 'neutral', label: 'Neutrálne – je to v poriadku, ale nie je to moja priorita' },
              { v: 'zlepsit', label: 'Skôr mi to nesedelo, ale môže sa to zlepšiť – ak upravíme osobu / techniku / komunikáciu' },
              { v: 'nechcem_opakovat', label: 'Bolo mi to nepríjemné / mimo mojich hraníc – nechcem to opakovať' },
            ] },
          { druh: 'otazka', id: `${prefix}_mozne_zlepsenie`, typ: 'viac', inePovolene: true,
            text: 'Čo by to podľa teba mohlo zlepšiť?',
            podmienka: { vsetky: [otvorena, { ot: hodnotenie, je: 'zlepsit' }] },
            moznosti: [
              { v: 'osoba', label: prefix === 'mmf' ? 'Iný ďalší muž' : 'Iná ďalšia žena' },
              { v: 'priebeh', label: 'Iný priebeh alebo tempo' },
              { v: 'pozornost', label: 'Iné rozdelenie pozornosti' },
              { v: 'rola', label: 'Iná moja rola' },
              { v: 'komunikacia', label: 'Lepšia komunikácia' },
              { v: 'hranice', label: 'Jasnejšie hranice' },
            ] },
      { druh: 'text', id: `${prefix}_naladenie`, ton: 'citat',
        podmienka: otvorena,
        telo: prefix === 'mmf'
          ? g('Teraz premýšľaj o vás dvoch. V trojke s partnerkou a ďalším mužom môže byť ona stredobodom vašej pozornosti, alebo sa môžete striedať v tom, kto vedie a kto sleduje. Kontakt medzi mužmi je vlastná voľba — nič sa nepredpokladá.',
            'Teraz premýšľaj o vás dvoch. V trojke s partnerom a ďalším mužom môžeš prijímať pozornosť oboch, viesť ich alebo niektorého chvíľu len sledovať. Ich vzájomný kontakt je samostatná voľba. Rozhodujú aj tvoje vlastné hranice a pocity pri partnerovi s ďalším mužom.')
          : g('Teraz premýšľaj o vás dvoch. V trojke s partnerkou a ďalšou ženou môžeš byť stredobodom ich pozornosti, sledovať ich vzájomnú blízkosť alebo sa zapájať striedavo. Kontakt medzi ženami je ich vlastná voľba.',
            'Teraz premýšľaj o vás dvoch. V trojke s partnerom a ďalšou ženou môžeš skúmať blízkosť s ňou, sledovať partnera alebo byť stredobodom pozornosti. Kontakt s ďalšou ženou aj kontakt partnera s ňou sú dve odlišné rozhodnutia.') },
      { druh: 'text', id: `${prefix}_povodny_intimny_pohlad`, nadpis: 'Intímny pohľad', ton: 'citat', zbalitelny: true,
        podmienka: otvorena,
        telo: povodna.druh === 'skupina' ? povodna.uvod ?? '' : '' },
      { druh: 'skupina', id: `${prefix}_postoj_a_hranice`, nadpis: 'Vlastný postoj a partnerova túžba',
        podmienka: otvorena, bloky: [
          { druh: 'otazka', id: `${prefix}_partner_tuzi_nove`, typ: 'jeden',
            text: prefix === 'mmf'
              ? g('Ako by si vnímal, keby partnerka túžila po trojke s ďalším mužom?', 'Ako by si vnímala, keby partner túžil po trojke s ďalším mužom?')
              : g('Ako by si vnímal, keby partnerka túžila po trojke s ďalšou ženou?', 'Ako by si vnímala, keby partner túžil po trojke s ďalšou ženou?'),
            moznosti: [
              { v: 'spolu', label: g('Chcel by som to preskúmať spolu', 'Chcela by som to preskúmať spolu') },
              { v: 'rozhovor', label: g('Vedel by som o tom hovoriť, ale nechcem to zažiť', 'Vedela by som o tom hovoriť, ale nechcem to zažiť') },
              { v: 'zmiesane', label: g('Mal by som zmiešané pocity', 'Mala by som zmiešané pocity') },
              { v: 'hranica', label: 'Je to moja hranica' },
            ] },
          { druh: 'skupina', id: `${prefix}_preferencie_spolocne`, nadpis: 'Ako si predstavujem túto trojku',
            podmienka: pokracuje, bloky: [
          { druh: 'otazka', id: `${prefix}_vlastny_postoj`, typ: 'jeden',
            text: prefix === 'mmf'
              ? g('Ako na teba pôsobí predstava trojky s partnerkou a ďalším mužom?', 'Ako na teba pôsobí predstava trojky s partnerom a ďalším mužom?')
              : g('Ako na teba pôsobí predstava trojky s partnerkou a ďalšou ženou?', 'Ako na teba pôsobí predstava trojky s partnerom a ďalšou ženou?'),
            moznosti: [
              { v: 'pritahuje', label: 'Vzrušuje ma' }, { v: 'zvedavost', label: g('Som zvedavý', 'Som zvedavá') },
              { v: 'zmiesane', label: 'Mám zmiešané pocity' }, { v: 'neutralne', label: 'Je mi neutrálna' },
            ] },
          { druh: 'otazka', id: `${prefix}_miera_zapojenia`, typ: 'jeden',
            text: 'Ako sa chceš do tejto trojky zapojiť?',
            moznosti: [
              { v: 'aktivne', label: 'Aktívne, chcem byť jej súčasťou' },
              { v: 'striedavo', label: 'Striedať zapojenie a pozorovanie' },
              { v: 'pozorovat', label: 'Najmä pozorovať, s možnosťou jemného zapojenia' },
              { v: 'len_pozorovat', label: 'Len pozorovať, bez zapojenia' },
              { v: 'neviem', label: 'Zatiaľ neviem, potrebujem o tom hovoriť' },
            ] },
          ...detail,
          { druh: 'otazka', id: `${prefix}_pocit_stredobod`, typ: 'jeden',
            text: prefix === 'mmf'
              ? g('Ako na teba pôsobí predstava, že sa ty a ďalší muž venujete partnerke?', 'Ako na teba pôsobí predstava, že sa ti venujú partner a ďalší muž?')
              : g('Ako na teba pôsobí predstava, že sa ty a ďalšia žena venujete partnerke?', 'Ako na teba pôsobí predstava, že sa ti venujú partner a ďalšia žena?'),
            podmienka: { ot: `${prefix}_rozdelenie_zrkadlo`, obsahuje: prefix === 'mmf' ? 'len_jej' : 'druha_stredobod' },
            moznosti: [
              { v: 'silno', label: 'Veľmi ma to vzrušuje' },
              { v: 'mozno', label: g('Láka ma to, ale chcel by som si zachovať možnosť striedania', 'Láka ma to, ale chcela by som si zachovať možnosť striedania') },
              { v: 'nie', label: 'Viac mi sedí rovnomernejšia pozornosť' },
              { v: 'neviem', label: 'Zatiaľ neviem' },
            ] },
          { druh: 'skupina', id: `${prefix}_roly_a_pozornost`, nadpis: 'Roly a rozdelenie pozornosti', bloky: [
            { druh: 'otazka', id: `${prefix}_vedenie`, typ: 'viac', inePovolene: true,
              text: 'Kto môže viesť tempo a rozhodovať o striedaní pozornosti?',
              moznosti: [
                { v: 'muz_paru', label: g('Ja', 'Môj partner') },
                { v: 'zena_paru', label: g('Moja partnerka', 'Ja') },
                { v: 'tretia', label: prefix === 'mmf' ? 'Ďalší muž' : 'Ďalšia žena' },
                { v: 'striedanie', label: 'Vedenie sa strieda' },
                { v: 'bez_vedenia', label: 'Nikto nevedie; deje sa to prirodzene' },
              ] },
            { druh: 'otazka', id: `${prefix}_styl_rol`, typ: 'viac', inePovolene: true,
              text: 'Aká dynamika rolí ťa láka?',
              vylucneMoznosti: ['bez_moci'],
              moznosti: [
                { v: 'jedna_vedie', label: 'Jedna osoba vedie, ostatní sa jej prispôsobujú' },
                { v: 'rovnocenne', label: 'Všetci sa zapájajú rovnocenne' },
                { v: 'striedanie', label: 'Vedenie a podriadenie sa môžu striedať' },
                { v: 'bez_moci', label: 'Nechcem v tom mocenskú hru' },
              ] },
            { druh: 'otazka', id: `${prefix}_pozorovatel`, typ: 'viac', inePovolene: true,
              text: 'Kto by mohol byť pozorovateľom, či už chvíľu alebo celý čas?',
              moznosti: [
                { v: 'muz_paru', label: prefix === 'mmf'
                  ? g('Ja sledujem partnerku s ďalším mužom', 'Partner sleduje mňa s ďalším mužom')
                  : g('Ja sledujem partnerku s ďalšou ženou', 'Partner sleduje mňa s ďalšou ženou') },
                { v: 'zena_paru', label: prefix === 'mmf'
                  ? g('Partnerka sleduje mňa s ďalším mužom', 'Ja sledujem partnera s ďalším mužom')
                  : g('Partnerka sleduje mňa s ďalšou ženou', 'Ja sledujem partnera s ďalšou ženou') },
                { v: 'tretia', label: prefix === 'mmf'
                  ? g('Ďalší muž chvíľu sleduje nás dvoch', 'Ďalší muž chvíľu sleduje nás dvoch')
                  : 'Ďalšia žena chvíľu sleduje nás dvoch' },
                { v: 'nikto', label: 'Nechcem, aby niekto zostal bokom' },
              ] },
          ] },
          { druh: 'skupina', id: `${prefix}_konkretne_kontakty`, nadpis: 'Kto s kým — konkrétne kontakty',
            uvod: 'Klikni na situácie, ktoré si vieš predstaviť. Neoznačená možnosť zostáva bez odpovede; svoje zákazy vyberieš osobitne pri hraniciach. Na oboch stranách páru každá možnosť opisuje tú istú situáciu.',
            bloky: [
              { druh: 'otazka', id: `${prefix}_par_treti_aktivity_vyber`, typ: 'viac', inePovolene: true,
                vylucneMoznosti: ['ziadne'],
                text: prefix === 'mmf'
                  ? 'Ktoré situácie si vieš predstaviť pri trojke s ďalším mužom?'
                  : 'Ktoré situácie si vieš predstaviť pri trojke s ďalšou ženou?',
                moznosti: prefix === 'mmf' ? [
                  { v: 'bozk', label: g('Partnerka sa bozkáva s ďalším mužom', 'Bozkávam sa s ďalším mužom') },
                  { v: 'dotyky', label: g('Ďalší muž sa dotýka partnerky', 'Ďalší muž sa ma dotýka') },
                  { v: 'rucne_prijima', label: g('Ďalší muž dráždi partnerku rukou', 'Ďalší muž ma dráždi rukou') },
                  { v: 'rucne_poskytuje', label: g('Partnerka dráždi ďalšieho muža rukou', 'Dráždim ďalšieho muža rukou') },
                  { v: 'oral_prijima', label: g('Partnerka prijíma orál od ďalšieho muža', 'Prijímam orál od ďalšieho muža') },
                  { v: 'oral_poskytuje', label: g('Partnerka poskytuje orál ďalšiemu mužovi', 'Poskytujem orál ďalšiemu mužovi') },
                  { v: 'penetracia', label: g('Partnerka má pohlavný styk s ďalším mužom', 'Mám pohlavný styk s ďalším mužom') },
                  { v: 'pomocka', label: g('Ďalší muž používa pomôcku na partnerke', 'Ďalší muž používa pomôcku na mne') },
                  { v: 'dvojita_penetracia', label: g('Partnerka prijíma dvojitú penetráciu od oboch mužov', 'Prijímam dvojitú penetráciu od oboch mužov') },
                  { v: 'partner_sleduje', label: g('Sledujem partnerku s ďalším mužom bez zapojenia', 'Partner sleduje mňa s ďalším mužom bez zapojenia') },
                  { v: 'partner_aktivne', label: g('Zapojím sa spolu s partnerkou a ďalším mužom', 'Partner sa zapojí spolu so mnou a ďalším mužom') },
                  { v: 'ziadne', label: 'Žiadna z uvedených situácií' },
                ] : [
                  { v: 'bozk', label: g('Bozkávam sa s ďalšou ženou', 'Partner sa bozkáva s ďalšou ženou') },
                  { v: 'dotyky', label: g('Ďalšia žena sa ma dotýka', 'Ďalšia žena sa dotýka partnera') },
                  { v: 'rucne_prijima', label: g('Ďalšia žena ma dráždi rukou', 'Ďalšia žena dráždi partnera rukou') },
                  { v: 'rucne_poskytuje', label: g('Dráždim ďalšiu ženu rukou', 'Partner dráždi ďalšiu ženu rukou') },
                  { v: 'oral_prijima', label: g('Prijímam orál od ďalšej ženy', 'Partner prijíma orál od ďalšej ženy') },
                  { v: 'oral_poskytuje', label: g('Poskytujem orál ďalšej žene', 'Partner poskytuje orál ďalšej žene') },
                  { v: 'penetracia', label: g('Mám pohlavný styk s ďalšou ženou', 'Partner má pohlavný styk s ďalšou ženou') },
                  { v: 'pomocka', label: g('Ďalšia žena používa pomôcku na mne', 'Ďalšia žena používa pomôcku na partnerovi') },
                  { v: 'partner_sleduje', label: g('Partnerka sleduje mňa s ďalšou ženou bez zapojenia', 'Sledujem partnera s ďalšou ženou bez zapojenia') },
                  { v: 'partner_aktivne', label: g('Partnerka sa zapojí spolu so mnou a ďalšou ženou', 'Zapojím sa spolu s partnerom a ďalšou ženou') },
                  { v: 'ziadne', label: 'Žiadna z uvedených situácií' },
                ],
              },
              { druh: 'otazka', id: `${prefix}_rovnake_pohlavie_vyber`, typ: 'viac', inePovolene: true,
                vylucneMoznosti: ['ziadne'],
                text: prefix === 'mmf'
                  ? 'Ktoré kontakty medzi oboma mužmi si vieš predstaviť?'
                  : 'Ktoré kontakty medzi oboma ženami si vieš predstaviť?',
                moznosti: [...rovnakeKontakty, { v: 'ziadne', label: 'Žiadny z uvedených kontaktov' }],
              },
            ] },
          { druh: 'skupina', id: `${prefix}_pocity_a_motivacie`, nadpis: 'Čo ma láka a čo by ma zasiahlo', bloky: [
            { druh: 'otazka', id: `${prefix}_co_laka`, typ: 'viac', inePovolene: true,
              text: 'Čo ťa na tejto podobe trojky vzrušuje alebo zaujíma?',
              moznosti: [
                { v: 'novost', label: 'Novosť spoločného zážitku' },
                { v: 'pozornost', label: 'Viac pozornosti od dvoch ľudí' },
                { v: 'partnerova_rozkos', label: g('Sledovať rozkoš partnerky', 'Sledovať rozkoš partnera') },
                { v: 'sledovanie', label: g('Byť chvíľu pozorovateľom', 'Byť chvíľu pozorovateľkou') },
                { v: 'rovnake_pohlavie', label: prefix === 'mmf' ? 'Možnosť kontaktu medzi mužmi' : 'Možnosť kontaktu medzi ženami' },
                { v: 'roly', label: 'Striedanie rolí a rozdelenia pozornosti' },
                { v: 'iba_rozhovor', label: 'Zatiaľ ma zaujíma len rozprávanie o fantázii' },
              ] },
            { druh: 'otazka', id: `${prefix}_pocit_par_treti`, typ: 'jeden',
              text: prefix === 'mmf'
                ? g('Ako by si sa cítil, keby si videl partnerku s ďalším mužom?', 'Ako by si sa cítila pri kontakte s ďalším mužom, keď je partner prítomný?')
                : g('Ako by si sa cítil pri kontakte s ďalšou ženou, keď je partnerka prítomná?', 'Ako by si sa cítila, keby si videla partnera s ďalšou ženou?'),
              moznosti: POCIT_PRI_KONTAKTE },
            { druh: 'otazka', id: `${prefix}_pocit_rovnake_pohlavie`, typ: 'jeden',
              text: prefix === 'mmf'
                ? g('Ako by si sa cítil pri kontakte s ďalším mužom, keď je partnerka prítomná?', 'Ako by si sa cítila, keby si videla partnera s ďalším mužom?')
                : g('Ako by si sa cítil, keby si videl partnerku s ďalšou ženou?', 'Ako by si sa cítila pri kontakte s ďalšou ženou, keď je partner prítomný?'),
              moznosti: POCIT_PRI_KONTAKTE },
            { druh: 'otazka', id: `${prefix}_obavy`, typ: 'viac', inePovolene: true,
              vylucneMoznosti: ['bez_obav'],
              text: 'Čo by v tebe mohlo vyvolať neistotu alebo žiarlivosť?',
              moznosti: [
                { v: 'pozornost', label: prefix === 'mmf'
                  ? g('Partnerka by venovala viac pozornosti ďalšiemu mužovi než mne', 'Partner by venoval viac pozornosti ďalšiemu mužovi než mne')
                  : g('Partnerka by venovala viac pozornosti ďalšej žene než mne', 'Partner by venoval viac pozornosti ďalšej žene než mne') },
                { v: 'bokom', label: g('Zostal by som bokom', 'Zostala by som bokom') },
                { v: 'blizkost', label: prefix === 'mmf'
                  ? g('Citová blízkosť partnerky s ďalším mužom', 'Citová blízkosť partnera s ďalším mužom')
                  : g('Citová blízkosť partnerky s ďalšou ženou', 'Citová blízkosť partnera s ďalšou ženou') },
                { v: 'porovnavanie', label: prefix === 'mmf' ? 'Porovnávanie s ďalším mužom' : 'Porovnávanie s ďalšou ženou' },
                { v: 'po', label: 'Pocity po skončení zážitku' },
                { v: 'bez_obav', label: 'Zatiaľ nevidím konkrétnu obavu' },
              ] },
            { druh: 'otazka', id: `${prefix}_co_pomoze`, typ: 'viac', inePovolene: true,
              podmienka: { ot: `${prefix}_obavy`, obsahujeNiektoru: ['pozornost', 'bokom', 'blizkost', 'porovnavanie', 'po'] },
              text: 'Čo by ti pomohlo cítiť sa pri ďalšej skúsenosti istejšie?',
              moznosti: [
                { v: 'pozornost', label: 'Vedieť, že si navzájom venujeme pozornosť' },
                { v: 'signal', label: 'Dohodnúť si, ako si dáme najavo, čo cítime' },
                { v: 'tempo', label: 'Mať možnosť spomaliť alebo sa zastaviť' },
                { v: 'hranice', label: 'Vopred si pomenovať konkrétne hranice' },
                { v: 'potom', label: 'Vedieť, ako sa po zážitku vrátime k sebe' },
                { v: 'neviem', label: 'Zatiaľ neviem, čo by mi pomohlo' },
              ] },
          ] },
          { druh: 'otazka', id: `${prefix}_hranice_vyber`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'],
            text: prefix === 'mmf' ? 'Čo je pre teba pri trojke s ďalším mužom tabu?' : 'Čo je pre teba pri trojke s ďalšou ženou tabu?',
            moznosti: [
              { v: 'bozk', label: prefix === 'mmf'
                ? g('Partnerka sa bozkáva s ďalším mužom', 'Bozkávam sa s ďalším mužom')
                : g('Bozkávam sa s ďalšou ženou', 'Partner sa bozkáva s ďalšou ženou') },
              { v: 'dotyky', label: prefix === 'mmf'
                ? g('Ďalší muž sa dotýka partnerky', 'Ďalší muž sa ma dotýka')
                : g('Ďalšia žena sa ma dotýka', 'Ďalšia žena sa dotýka partnera') },
              { v: 'rucne_prijima', label: prefix === 'mmf'
                ? g('Ďalší muž dráždi partnerku rukou', 'Ďalší muž ma dráždi rukou')
                : g('Ďalšia žena ma dráždi rukou', 'Ďalšia žena dráždi partnera rukou') },
              { v: 'rucne_poskytuje', label: prefix === 'mmf'
                ? g('Partnerka dráždi ďalšieho muža rukou', 'Dráždim ďalšieho muža rukou')
                : g('Dráždim ďalšiu ženu rukou', 'Partner dráždi ďalšiu ženu rukou') },
              { v: 'oral_prijima', label: prefix === 'mmf'
                ? g('Partnerka prijíma orál od ďalšieho muža', 'Prijímam orál od ďalšieho muža')
                : g('Prijímam orál od ďalšej ženy', 'Partner prijíma orál od ďalšej ženy') },
              { v: 'oral_poskytuje', label: prefix === 'mmf'
                ? g('Partnerka poskytuje orál ďalšiemu mužovi', 'Poskytujem orál ďalšiemu mužovi')
                : g('Poskytujem orál ďalšej žene', 'Partner poskytuje orál ďalšej žene') },
              { v: 'penetracia', label: prefix === 'mmf'
                ? g('Partnerka má pohlavný styk s ďalším mužom', 'Mám pohlavný styk s ďalším mužom')
                : g('Mám pohlavný styk s ďalšou ženou', 'Partner má pohlavný styk s ďalšou ženou') },
              { v: 'pomocky', label: prefix === 'mmf'
                ? g('Ďalší muž používa pomôcku na partnerke', 'Ďalší muž používa pomôcku na mne')
                : g('Ďalšia žena používa pomôcku na mne', 'Ďalšia žena používa pomôcku na partnerovi') },
              ...(prefix === 'mmf' ? [{ v: 'dvojita_penetracia', label: g('Partnerka prijíma dvojitú penetráciu od oboch mužov', 'Prijímam dvojitú penetráciu od oboch mužov') }] : []),
              { v: 'partner_sleduje', label: prefix === 'mmf'
                ? g('Sledujem partnerku s ďalším mužom bez zapojenia', 'Partner sleduje mňa s ďalším mužom bez zapojenia')
                : g('Partnerka sleduje mňa s ďalšou ženou bez zapojenia', 'Sledujem partnera s ďalšou ženou bez zapojenia') },
              { v: 'partner_aktivne', label: prefix === 'mmf'
                ? g('Zapojím sa spolu s partnerkou a ďalším mužom', 'Partner sa zapojí spolu so mnou a ďalším mužom')
                : g('Partnerka sa zapojí spolu so mnou a ďalšou ženou', 'Zapojím sa spolu s partnerom a ďalšou ženou') },
              { v: 'rovnake_pohlavie', label: prefix === 'mmf' ? 'Akýkoľvek kontakt medzi mužmi' : 'Akýkoľvek kontakt medzi ženami' },
              ...rovnakeKontakty.map(({ v, label }) => ({ v: `rovnake_${v}`, label })),
              { v: 'pozornost', label: prefix === 'mmf'
                ? g('Partnerka venuje ďalšiemu mužovi viac pozornosti než mne', 'Venujem ďalšiemu mužovi viac pozornosti než partnerovi')
                : g('Venujem ďalšej žene viac pozornosti než partnerke', 'Partner venuje ďalšej žene viac pozornosti než mne') },
              { v: 'dominancia', label: 'Mocenské alebo BDSM prvky' },
              { v: 'zaznam', label: 'Fotografie alebo video' },
              { v: 'ziadne', label: 'Nič z uvedeného pre mňa nie je tabu' },
            ] },
          { druh: 'text', id: `${prefix}_myty`, nadpis: 'Čo trojka nemusí znamenať', ton: 'info', zbalitelny: true,
            telo: 'Trojka nemusí znamenať, že sa každý dotýka každého. Pozorovanie môže byť plnohodnotná rola, nie povinný predstupeň. Fantázia môže zostať iba fantáziou a súhlas s jedným kontaktom neznamená súhlas s ďalšími.' },
          { druh: 'otazka', id: `${prefix}_podmienky_nove`, typ: 'viac', inePovolene: true,
            text: g('Čo by muselo byť vopred dohodnuté, aby si sa cítil bezpečne?', 'Čo by muselo byť vopred dohodnuté, aby si sa cítila bezpečne?'),
            podmienka: { ot: hodnotenie, jeNiektora: ['velmi', 'skor', 'zlepsit'] },
            moznosti: [
              { v: 'osoba', label: prefix === 'mmf' ? 'Kto bude ďalší muž' : 'Kto bude ďalšia žena' },
              { v: 'kontakt', label: 'Kto sa môže s kým intímne zapojiť' },
              { v: 'stop', label: 'Možnosť kedykoľvek skončiť' },
              { v: 'sukromie', label: 'Súkromie' },
              { v: 'potom', label: 'Ako sa k sebe vrátime po zážitku' },
            ] },
          { druh: 'skupina', id: `${prefix}_realny_ramec`, nadpis: prefix === 'mmf' ? 'Ďalší muž a návrat k sebe' : 'Ďalšia žena a návrat k sebe',
            podmienka: { ot: hodnotenie, jeNiektora: ['velmi', 'skor', 'zlepsit'] }, bloky: [
              { druh: 'otazka', id: `${prefix}_vyber_tretieho`, typ: 'viac', inePovolene: true,
                text: prefix === 'mmf' ? 'Aký ďalší muž by prichádzal do úvahy?' : 'Aká ďalšia žena by prichádzala do úvahy?',
                moznosti: [
                  { v: 'znamy', label: prefix === 'mmf' ? 'Muž, ktorého obaja poznáme' : 'Žena, ktorú obaja poznáme' },
                  { v: 'novy', label: prefix === 'mmf' ? 'Nový muž mimo nášho okruhu' : 'Nová žena mimo nášho okruhu' },
                  { v: 'klub', label: prefix === 'mmf' ? 'Muž spoznaný v klube alebo komunite' : 'Žena spoznaná v klube alebo komunite' },
                  { v: 'nerozhodnute', label: 'Zatiaľ si to neviem predstaviť konkrétne' },
                ] },
              { druh: 'otazka', id: `${prefix}_miesto`, typ: 'viac', inePovolene: true,
                vylucneMoznosti: ['neviem'],
                text: g('Kde by si si ďalšiu skúsenosť vedel predstaviť?', 'Kde by si si ďalšiu skúsenosť vedela predstaviť?'),
                moznosti: [
                  { v: 'doma', label: 'Doma' },
                  { v: 'mimo', label: 'Mimo nášho domova' },
                  { v: 'klub', label: 'V priestore určenom pre takúto spoločnú skúsenosť' },
                  { v: 'neviem', label: 'Zatiaľ neviem' },
                ] },
              { druh: 'otazka', id: `${prefix}_frekvencia_nova`, typ: 'jeden',
                text: g('Ako často by si si to chcel zopakovať?', 'Ako často by si si to chcela zopakovať?'),
                moznosti: [
                  { v: 'vynimocne', label: 'Len výnimočne' },
                  { v: 'obcas', label: 'Občas' },
                  { v: 'pravidelne', label: 'Viem si predstaviť pravidelné opakovanie' },
                  { v: 'neviem', label: 'Zatiaľ neviem' },
                ] },
              { druh: 'otazka', id: `${prefix}_po_zazitku`, typ: 'viac', inePovolene: true,
                text: g('Čo by si chcel po spoločnom zážitku zažiť s partnerkou?', 'Čo by si chcela po spoločnom zážitku zažiť s partnerom?'),
                moznosti: [
                  { v: 'blizkost', label: 'Byť chvíľu iba spolu a cítiť blízkosť' },
                  { v: 'rozhovor', label: 'Hovoriť o pocitoch a tom, čo fungovalo' },
                  { v: 'detaily', label: 'Rozprávať si detaily, ktoré nás vzrušili' },
                  { v: 'ticho', label: 'Najprv ticho a čas na spracovanie' },
                  { v: 'neskor', label: 'Vrátiť sa k tomu až neskôr' },
                ] },
            ] },
        ] },
        ] },
      { druh: 'skupina', id: `${prefix}_povodne_odpovede`, nadpis: 'Moje odpovede zo staršej verzie',
            uvod: g('Táto časť sa objaví iba vtedy, ak si predtým vyplnil staršie otázky. Odpovede zostávajú dostupné a môžeš ich zmeniť.',
              'Táto časť sa objaví iba vtedy, ak si predtým vyplnila staršie otázky. Odpovede zostávajú dostupné a môžeš ich zmeniť.'),
            podmienka: { vsetky: [otvorena, { asponJedna: stareOtazky.map(b => staraOdpoved(b.id)) }] },
            bloky: stareOtazky.map(b => ({ ...b, povodnyOkruh: prefix, zbalitelna: true,
              podmienka: { vsetky: [b.podmienka ?? {}, staraOdpoved(b.id)] } })),
      },
    ],
  }
}

// Samostatná vetva bez skúsenosti. Každá podoba má vlastné otázky a ID;
// spoločné hodnoty možností označujú rovnaký dej v mužskom a ženskom znení.
function trojkaBezSkusenosti(prefix: 'mmf' | 'fmf'): Blok {
  const realita = `${prefix}_realita_nova`
  const otvorena = { ot: realita, jeNiektora: ['chcem', 'mozno', 'fantazia'] }
  const uvazujem = { ot: realita, jeNiektora: ['chcem', 'mozno'] }
  const parTreti: Moznost[] = prefix === 'mmf' ? [
    { v: 'bozk', label: g('Partnerka sa bozkáva s ďalším mužom', 'Bozkávam sa s ďalším mužom') },
    { v: 'dotyky', label: g('Ďalší muž sa dotýka partnerky', 'Ďalší muž sa ma dotýka') },
    { v: 'rucne_prijima', label: g('Ďalší muž dráždi partnerku rukou', 'Ďalší muž ma dráždi rukou') },
    { v: 'rucne_poskytuje', label: g('Partnerka dráždi ďalšieho muža rukou', 'Dráždim ďalšieho muža rukou') },
    { v: 'oral_prijima', label: g('Partnerka prijíma orál od ďalšieho muža', 'Prijímam orál od ďalšieho muža') },
    { v: 'oral_poskytuje', label: g('Partnerka poskytuje orál ďalšiemu mužovi', 'Poskytujem orál ďalšiemu mužovi') },
    { v: 'penetracia', label: g('Partnerka má pohlavný styk s ďalším mužom', 'Mám pohlavný styk s ďalším mužom') },
    { v: 'pomocka', label: g('Ďalší muž používa pomôcku na partnerke', 'Ďalší muž používa pomôcku na mne') },
    { v: 'dvojita_penetracia', label: g('Partnerka prijíma dvojitú penetráciu od oboch mužov', 'Prijímam dvojitú penetráciu od oboch mužov') },
    { v: 'partner_sleduje', label: g('Sledujem partnerku s ďalším mužom bez zapojenia', 'Partner sleduje mňa s ďalším mužom bez zapojenia') },
    { v: 'partner_aktivne', label: g('Zapojím sa spolu s partnerkou a ďalším mužom', 'Partner sa zapojí spolu so mnou a ďalším mužom') },
  ] : [
    { v: 'bozk', label: g('Bozkávam sa s ďalšou ženou', 'Partner sa bozkáva s ďalšou ženou') },
    { v: 'dotyky', label: g('Ďalšia žena sa ma dotýka', 'Ďalšia žena sa dotýka partnera') },
    { v: 'rucne_prijima', label: g('Ďalšia žena ma dráždi rukou', 'Ďalšia žena dráždi partnera rukou') },
    { v: 'rucne_poskytuje', label: g('Dráždim ďalšiu ženu rukou', 'Partner dráždi ďalšiu ženu rukou') },
    { v: 'oral_prijima', label: g('Prijímam orál od ďalšej ženy', 'Partner prijíma orál od ďalšej ženy') },
    { v: 'oral_poskytuje', label: g('Poskytujem orál ďalšej žene', 'Partner poskytuje orál ďalšej žene') },
    { v: 'penetracia', label: g('Mám pohlavný styk s ďalšou ženou', 'Partner má pohlavný styk s ďalšou ženou') },
    { v: 'pomocka', label: g('Ďalšia žena používa pomôcku na mne', 'Ďalšia žena používa pomôcku na partnerovi') },
    { v: 'partner_sleduje', label: g('Partnerka sleduje mňa s ďalšou ženou bez zapojenia', 'Sledujem partnera s ďalšou ženou bez zapojenia') },
    { v: 'partner_aktivne', label: g('Partnerka sa zapojí spolu so mnou a ďalšou ženou', 'Zapojím sa spolu s partnerom a ďalšou ženou') },
  ]
  const rovnake: Moznost[] = prefix === 'mmf' ? [
    { v: 'bozk', label: g('Bozkávam sa s ďalším mužom', 'Partner sa bozkáva s ďalším mužom') },
    { v: 'dotyky', label: g('Dotýkame sa s ďalším mužom', 'Partner sa dotýka s ďalším mužom') },
    { v: 'rucne_prijima', label: g('Ďalší muž ma dráždi rukou', 'Ďalší muž dráždi partnera rukou') },
    { v: 'rucne_poskytuje', label: g('Dráždim ďalšieho muža rukou', 'Partner dráždi ďalšieho muža rukou') },
    { v: 'oral_prijima', label: g('Prijímam orál od ďalšieho muža', 'Partner prijíma orál od ďalšieho muža') },
    { v: 'oral_poskytuje', label: g('Poskytujem orál ďalšiemu mužovi', 'Partner poskytuje orál ďalšiemu mužovi') },
  ] : [
    { v: 'bozk', label: g('Partnerka sa bozkáva s ďalšou ženou', 'Bozkávam sa s ďalšou ženou') },
    { v: 'dotyky', label: g('Partnerka a ďalšia žena sa dotýkajú', 'Dotýkame sa s ďalšou ženou') },
    { v: 'rucne_prijima', label: g('Ďalšia žena dráždi partnerku rukou', 'Ďalšia žena ma dráždi rukou') },
    { v: 'rucne_poskytuje', label: g('Partnerka dráždi ďalšiu ženu rukou', 'Dráždim ďalšiu ženu rukou') },
    { v: 'oral_prijima', label: g('Partnerka prijíma orál od ďalšej ženy', 'Prijímam orál od ďalšej ženy') },
    { v: 'oral_poskytuje', label: g('Partnerka poskytuje orál ďalšej žene', 'Poskytujem orál ďalšej žene') },
    { v: 'pomocka', label: g('Partnerka a ďalšia žena používajú pomôcku jedna na druhej', 'Používame s ďalšou ženou pomôcku jedna na druhej') },
  ]
  return {
    druh: 'skupina', id: `${prefix}_bez_skusenosti_nove`,
    nadpis: prefix === 'mmf'
      ? g('Trojka s partnerkou a ďalším mužom (MMF)', 'Trojka s partnerom a ďalším mužom (MMF)')
      : g('Trojka s partnerkou a ďalšou ženou (FMF)', 'Trojka s partnerom a ďalšou ženou (FMF)'),
    podmienka: { ot: 'troj_skusenost', jeNiektora: ['ziadna', prefix === 'mmf' ? 'fmf' : 'mmf'] },
    bloky: [
      { druh: 'otazka', id: `${prefix}_fantazia_nova`, typ: 'jeden',
        text: 'Objavuje sa táto podoba trojky v tvojich predstavách?',
        moznosti: [
          { v: 'casto', label: 'Často' }, { v: 'obcas', label: 'Občas' },
          { v: 'zvedavost', label: g('Skôr som zvedavý, než že by som o nej fantazíroval', 'Skôr som zvedavá, než že by som o nej fantazírovala') },
          { v: 'nie', label: 'Nie' },
        ] },
      { druh: 'otazka', id: `${prefix}_pocit`, typ: 'jeden',
        text: 'Aký pocit v tebe táto predstava vyvoláva?',
        moznosti: [
          { v: 'prijemny', label: 'Príjemný' }, { v: 'zvedavost', label: 'Zvedavosť' },
          { v: 'zmiesany', label: 'Zmiešané pocity' },
          { v: 'neprijemny', label: 'Nepríjemný' }, { v: 'neviem', label: 'Zatiaľ neviem' },
        ] },
      { druh: 'otazka', id: `${prefix}_vzrusenie_bez`, typ: 'jeden',
        text: prefix === 'mmf' ? 'Ako veľmi ťa vzrušuje predstava trojky s ďalším mužom?' : 'Ako veľmi ťa vzrušuje predstava trojky s ďalšou ženou?',
        moznosti: [
          { v: 'velmi', label: 'Veľmi ma vzrušuje' },
          { v: 'skor', label: 'Skôr ma vzrušuje' },
          { v: 'zmiesane', label: 'Vzrušuje ma, ale mám aj neistotu' },
          { v: 'nevzrusuje', label: 'Nevzrušuje ma' },
          { v: 'neprijemne', label: 'Je mi nepríjemná' },
        ] },
      { druh: 'otazka', id: `${prefix}_realita_nova`, typ: 'jeden',
        text: 'Chceš, aby zostala iba predstavou, alebo si vieš predstaviť aj skutočnú skúsenosť?',
        moznosti: [
          { v: 'chcem', label: 'Chcem to skúsiť' },
          { v: 'mozno', label: 'Možno, za jasných podmienok' },
          { v: 'fantazia', label: 'Chcem o tom iba hovoriť alebo fantazírovať' },
          { v: 'nie', label: 'Nechcem to zažiť' },
        ] },
      { druh: 'otazka', id: `${prefix}_partner_tuzi_bez`, typ: 'jeden',
        text: prefix === 'mmf'
          ? g('Ako by si vnímal, keby partnerka chcela trojku s ďalším mužom?', 'Ako by si vnímala, keby partner chcel trojku s ďalším mužom?')
          : g('Ako by si vnímal, keby partnerka chcela trojku s ďalšou ženou?', 'Ako by si vnímala, keby partner chcel trojku s ďalšou ženou?'),
        moznosti: [
          { v: 'spolu', label: g('Chcel by som o tom hovoriť spolu', 'Chcela by som o tom hovoriť spolu') },
          { v: 'fantazia', label: g('Rád o tom fantazírujem, ale nechcem to zažiť', 'Rada o tom fantazírujem, ale nechcem to zažiť') },
          { v: 'zmiesane', label: 'Mám zmiešané pocity' },
          { v: 'hranica', label: 'Nechcem ani túto spoločnú predstavu' },
        ] },
      { druh: 'skupina', id: `${prefix}_predstava_bez`, nadpis: 'Čo ma na tejto predstave vzrušuje',
        podmienka: otvorena,
        uvod: 'Nasledujúce voľby opisujú tvoju predstavu, aj keď má zostať iba fantáziou. Ich označenie nie je súhlasom s uskutočnením.',
        bloky: [
          { druh: 'otazka', id: `${prefix}_co_vzrusuje_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['nic'], text: 'Čo ťa na tejto podobe trojky vzrušuje alebo zaujíma?',
            moznosti: [
              { v: 'novost', label: 'Novosť spoločného zážitku' },
              { v: 'pozornost', label: 'Viac pozornosti od dvoch ľudí' },
              { v: 'partnerova_rozkos', label: g('Sledovať rozkoš partnerky', 'Sledovať rozkoš partnera') },
              { v: 'pozorovanie', label: g('Byť pozorovateľom', 'Byť pozorovateľkou') },
              { v: 'rovnake_pohlavie', label: prefix === 'mmf' ? 'Možnosť kontaktu medzi mužmi' : 'Možnosť kontaktu medzi ženami' },
              { v: 'roly', label: 'Striedanie rolí a pozornosti' },
              { v: 'iba_rozhovor', label: 'Vzrušuje ma len rozprávanie o fantázii' },
              { v: 'nic', label: 'Nič z uvedeného ma nevzrušuje' },
            ] },
          { druh: 'otazka', id: `${prefix}_rozdelenie_bez`, typ: 'viac', inePovolene: true,
            text: 'Ktoré rozdelenie pozornosti si vieš predstaviť?',
            moznosti: prefix === 'mmf' ? [
              { v: 'len_jej', label: g('Ja a ďalší muž sa venujeme len partnerke, bez vzájomného kontaktu', 'Partner a ďalší muž sa venujú len mne, bez vzájomného kontaktu') },
              { v: 'aj_sebe', label: g('Ja a ďalší muž sa venujeme partnerke aj sebe navzájom', 'Partner a ďalší muž sa venujú mne aj sebe navzájom') },
              { v: 'pozorovatel', label: g('Ja zostanem len pozorovať partnerku s ďalším mužom', 'Partner zostane len pozorovať mňa s ďalším mužom') },
              { v: 'jeden_asistuje', label: g('Ja sa po chvíli zapojím k partnerke a ďalšiemu mužovi', 'Partner sa po chvíli zapojí ku mne a ďalšiemu mužovi') },
              { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
            ] : [
              { v: 'dve_aj_sebe', label: g('Partnerka a ďalšia žena sa venujú mne aj sebe navzájom', 'Ja a ďalšia žena sa venujeme partnerovi aj sebe navzájom') },
              { v: 'dve_len_jemu', label: g('Partnerka a ďalšia žena sa venujú len mne', 'Ja a ďalšia žena sa venujeme len partnerovi') },
              { v: 'ja_stredobod', label: g('Ja som stredobodom pozornosti oboch žien', 'Partner je stredobodom pozornosti oboch žien') },
              { v: 'druha_stredobod', label: g('Partnerka je stredobodom pozornosti', 'Ja som stredobodom pozornosti') },
              { v: 'tretia_stredobod', label: 'Ďalšia žena je stredobodom pozornosti' },
              { v: 'pozorovatel', label: g('Ja zostanem len pozorovať partnerku s ďalšou ženou', 'Partner zostane len pozorovať mňa s ďalšou ženou') },
              { v: 'jeden_asistuje', label: g('Ja sa po chvíli zapojím k partnerke a ďalšej žene', 'Partner sa po chvíli zapojí ku mne a ďalšej žene') },
              { v: 'kazdy_kazdemu', label: 'Každý sa venuje každému rovnocenne' },
            ] },
          { druh: 'otazka', id: `${prefix}_zapojenie_bez`, typ: 'jeden',
            text: g('Ako by si sa chcel do tejto predstavy zapojiť?', 'Ako by si sa chcela do tejto predstavy zapojiť?'),
            moznosti: [
              { v: 'aktivne', label: 'Byť aktívnou súčasťou' },
              { v: 'striedavo', label: 'Striedať zapojenie a pozorovanie' },
              { v: 'pozorovat', label: 'Len pozorovať, bez zapojenia' },
              { v: 'neviem', label: 'Zatiaľ neviem' },
            ] },
          { druh: 'otazka', id: `${prefix}_vedenie_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['bez_vedenia', 'neviem'],
            text: 'Kto by mohol viesť tempo a striedanie pozornosti?',
            moznosti: [
              { v: 'muz_paru', label: g('Ja', 'Môj partner') },
              { v: 'zena_paru', label: g('Moja partnerka', 'Ja') },
              { v: 'tretia', label: prefix === 'mmf' ? 'Ďalší muž' : 'Ďalšia žena' },
              { v: 'striedanie', label: 'Vedenie sa strieda' },
              { v: 'bez_vedenia', label: 'Nikto nemusí viesť' },
              { v: 'neviem', label: 'Zatiaľ neviem' },
            ] },
          { druh: 'otazka', id: `${prefix}_par_treti_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'],
            text: prefix === 'mmf' ? 'Ktoré situácie s ďalším mužom si vieš predstaviť?' : 'Ktoré situácie s ďalšou ženou si vieš predstaviť?',
            moznosti: [...parTreti, { v: 'ziadne', label: 'Žiadna z uvedených situácií' }],
          },
          { druh: 'otazka', id: `${prefix}_rovnake_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'],
            text: prefix === 'mmf' ? 'Ktoré kontakty medzi oboma mužmi si vieš predstaviť?' : 'Ktoré kontakty medzi oboma ženami si vieš predstaviť?',
            moznosti: [...rovnake, { v: 'ziadne', label: 'Žiadny z uvedených kontaktov' }],
          },
          { druh: 'otazka', id: `${prefix}_pocit_partner_bez`, typ: 'jeden',
            text: prefix === 'mmf'
              ? g('Ako by si sa cítil, keby si videl partnerku s ďalším mužom?', 'Ako by si sa cítila pri kontakte s ďalším mužom, keď je partner prítomný?')
              : g('Ako by si sa cítil pri kontakte s ďalšou ženou, keď je partnerka prítomná?', 'Ako by si sa cítila, keby si videla partnera s ďalšou ženou?'),
            moznosti: POCIT_PRI_KONTAKTE },
          { druh: 'otazka', id: `${prefix}_pocit_rovnake_bez`, typ: 'jeden',
            text: prefix === 'mmf'
              ? g('Ako by si sa cítil pri kontakte s ďalším mužom, keď je partnerka prítomná?', 'Ako by si sa cítila, keby si videla partnera s ďalším mužom?')
              : g('Ako by si sa cítil, keby si videl partnerku s ďalšou ženou?', 'Ako by si sa cítila pri kontakte s ďalšou ženou, keď je partner prítomný?'),
            moznosti: POCIT_PRI_KONTAKTE },
        ] },
      { druh: 'skupina', id: `${prefix}_obavy_a_hranice_bez`, nadpis: 'Obavy a hranice',
        podmienka: otvorena, bloky: [
          { druh: 'otazka', id: `${prefix}_obavy_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['bez_obav'], text: 'Čo by v tebe mohlo vyvolať neistotu?',
            moznosti: [
              { v: 'pozornost', label: prefix === 'mmf'
                ? g('Partnerka by venovala viac pozornosti ďalšiemu mužovi než mne', 'Partner by venoval viac pozornosti ďalšiemu mužovi než mne')
                : g('Partnerka by venovala viac pozornosti ďalšej žene než mne', 'Partner by venoval viac pozornosti ďalšej žene než mne') },
              { v: 'bokom', label: g('Zostal by som bokom', 'Zostala by som bokom') },
              { v: 'blizkost', label: prefix === 'mmf'
                ? g('Citová blízkosť partnerky s ďalším mužom', 'Citová blízkosť partnera s ďalším mužom')
                : g('Citová blízkosť partnerky s ďalšou ženou', 'Citová blízkosť partnera s ďalšou ženou') },
              { v: 'porovnavanie', label: prefix === 'mmf' ? 'Porovnávanie s ďalším mužom' : 'Porovnávanie s ďalšou ženou' },
              { v: 'po', label: 'Naše pocity po zážitku' },
              { v: 'bez_obav', label: 'Zatiaľ nevidím konkrétnu obavu' },
            ] },
          { druh: 'otazka', id: `${prefix}_co_pomoze_bez`, typ: 'viac', inePovolene: true,
            podmienka: { ot: `${prefix}_obavy_bez`, obsahujeNiektoru: ['pozornost', 'bokom', 'blizkost', 'porovnavanie', 'po'] },
            text: 'Čo by ti pomohlo cítiť sa pri tejto predstave istejšie?',
            moznosti: [
              { v: 'pozornost', label: 'Vedieť, že si navzájom venujeme pozornosť' },
              { v: 'signal', label: 'Dohodnúť si, ako si dáme najavo, čo cítime' },
              { v: 'tempo', label: 'Mať možnosť spomaliť alebo sa zastaviť' },
              { v: 'hranice', label: 'Vopred si pomenovať konkrétne hranice' },
              { v: 'potom', label: 'Vedieť, ako sa po zážitku vrátime k sebe' },
              { v: 'neviem', label: 'Zatiaľ neviem, čo by mi pomohlo' },
            ] },
          { druh: 'otazka', id: `${prefix}_tabu_par_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'],
            text: prefix === 'mmf'
              ? g('Ktoré situácie s ďalším mužom by si v skutočnosti nechcel zažiť?', 'Ktoré situácie s ďalším mužom by si v skutočnosti nechcela zažiť?')
              : g('Ktoré situácie s ďalšou ženou by si v skutočnosti nechcel zažiť?', 'Ktoré situácie s ďalšou ženou by si v skutočnosti nechcela zažiť?'),
            napoveda: 'Aj predstava, ktorá ťa vzrušuje, môže v realite zostať tvojou hranicou.',
            moznosti: [...parTreti.map(({ v, label }) => ({ v, label })), { v: 'ziadne', label: 'Žiadna z uvedených situácií nie je tabu' }],
          },
          { druh: 'otazka', id: `${prefix}_tabu_rovnake_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'],
            text: prefix === 'mmf' ? 'Ktoré kontakty medzi oboma mužmi by boli v skutočnosti tabu?' : 'Ktoré kontakty medzi oboma ženami by boli v skutočnosti tabu?',
            moznosti: [...rovnake.map(({ v, label }) => ({ v, label })), { v: 'ziadne', label: 'Žiadny z uvedených kontaktov nie je tabu' }],
          },
          { druh: 'otazka', id: `${prefix}_tabu_vztah_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['ziadne'], text: 'Čo by bolo voči nášmu vzťahu za čiarou?',
            moznosti: [
              { v: 'bokom', label: g('Zostať bokom bez signálu od partnerky', 'Zostať bokom bez signálu od partnera') },
              { v: 'porovnavanie', label: prefix === 'mmf' ? 'Porovnávanie s ďalším mužom' : 'Porovnávanie s ďalšou ženou' },
              { v: 'tajomstvo', label: 'Tajnosti alebo pokračovanie bez dohody' },
              { v: 'zaznam', label: 'Fotografie alebo video' },
              { v: 'ziadne', label: 'Nič z uvedeného' },
            ] },
        ] },
      { druh: 'skupina', id: `${prefix}_okolnosti_bez`, nadpis: 'Ak by to mohlo byť skutočné',
        podmienka: uvazujem, bloky: [
          { druh: 'otazka', id: `${prefix}_podmienky_bez`, typ: 'viac', inePovolene: true,
            text: g('Za akých okolností by si si túto skúsenosť vedel predstaviť?', 'Za akých okolností by si si túto skúsenosť vedela predstaviť?'),
            moznosti: [
              { v: 'spolocna_tuzba', label: 'Obaja by sme to chceli sami za seba' },
              { v: 'hranice', label: 'Vedeli by sme pomenovať a rešpektovať svoje hranice' },
              { v: 'tretia_osoba', label: prefix === 'mmf' ? 'Aj ďalší muž by poznal a prijal dohody' : 'Aj ďalšia žena by poznala a prijala dohody' },
              { v: 'stop', label: 'Každý by mohol kedykoľvek zastaviť alebo zmeniť názor' },
              { v: 'cas', label: 'Mali by sme dosť času a bez tlaku' },
              { v: 'neviem', label: g('Zatiaľ neviem, čo by som potreboval', 'Zatiaľ neviem, čo by som potrebovala') },
            ] },
          { druh: 'otazka', id: `${prefix}_kto_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['neviem'],
            text: prefix === 'mmf' ? 'Aký ďalší muž by prichádzal do úvahy?' : 'Aká ďalšia žena by prichádzala do úvahy?',
            moznosti: [
              { v: 'znamy', label: prefix === 'mmf' ? 'Muž, ktorého obaja poznáme' : 'Žena, ktorú obaja poznáme' },
              { v: 'novy', label: prefix === 'mmf' ? 'Nový muž mimo nášho okruhu' : 'Nová žena mimo nášho okruhu' },
              { v: 'komunita', label: prefix === 'mmf' ? 'Muž spoznaný v komunite' : 'Žena spoznaná v komunite' },
              { v: 'neviem', label: 'Zatiaľ si to neviem predstaviť konkrétne' },
            ] },
          { druh: 'otazka', id: `${prefix}_miesto_bez`, typ: 'viac', inePovolene: true,
            vylucneMoznosti: ['neviem'], text: g('Kde by si si to vedel predstaviť?', 'Kde by si si to vedela predstaviť?'),
            moznosti: [
              { v: 'doma', label: 'Doma' },
              { v: 'mimo', label: 'Mimo nášho domova' },
              { v: 'klub', label: 'V priestore určenom pre takúto spoločnú skúsenosť' },
              { v: 'neviem', label: 'Zatiaľ neviem' },
            ] },
          { druh: 'otazka', id: `${prefix}_opakovat_bez`, typ: 'jeden',
            text: 'Ako si dnes predstavuješ prípadnú skúsenosť?',
            napoveda: 'Je to len dnešná predstava, nie záväzok do budúcnosti.',
            moznosti: [
              { v: 'jednorazovo', label: 'Ako jednorazové preskúmanie' },
              { v: 'mozno_opakovat', label: 'Ako niečo, čo by sme možno chceli zopakovať' },
              { v: 'pravidelne', label: 'Ak by nám to vyhovovalo, viem si predstaviť aj pravidelné opakovanie' },
              { v: 'neviem', label: 'To zistíme až podľa toho, ako sa budeme cítiť' },
            ] },
          { druh: 'otazka', id: `${prefix}_po_bez`, typ: 'viac', inePovolene: true,
            text: g('Čo by si po prípadnom zážitku potreboval od partnerky?', 'Čo by si po prípadnom zážitku potrebovala od partnera?'),
            moznosti: [
              { v: 'blizkost', label: 'Byť chvíľu iba spolu a cítiť blízkosť' },
              { v: 'rozhovor', label: 'Hovoriť o pocitoch' },
              { v: 'ticho', label: 'Najprv ticho a čas na spracovanie' },
              { v: 'neskor', label: 'Vrátiť sa k tomu neskôr' },
            ] },
        ] },
    ],
  }
}

export const SKUPINOVY_SEX = temaSoSkusenostou({
  slug: 'skupinovy-sex', nadpis: 'Skupinový sex', prefix: 'skup',
  skusenostText: 'Máš skúsenosť so sexom vo väčšej skupine než trojica?',
  uvod: [{ druh: 'text', id: 'skup_uvod', nadpis: 'Viac než trojica',
    telo: 'Pri väčšej skupine sa mení počet ľudí, rozdelenie pozornosti aj rola páru. Skúsenosť s trojkou preto neznamená skúsenosť so skupinou.' }],
  zaujem: postojOtazka('skup_postoj', g('Chcel by si zažiť skupinový sex s partnerkou?', 'Chcela by si zažiť skupinový sex s partnerom?')),
  detaily: [SKUPINY, CHOREOGRAFIA_SKUPINY],
  partner: g('Ak po skupinovom sexe túži partnerka, aký mám postoj?', 'Ak po skupinovom sexe túži partner, aký mám postoj?'),
})

export const GANGBANG_TEMA = temaSoSkusenostou({
  slug: 'gangbang', nadpis: 'Gangbang', prefix: 'gb',
  skusenostText: g('Máš skúsenosť s gangbangom, v ktorom bola partnerka stredobodom?', 'Máš skúsenosť s gangbangom, v ktorom si bola stredobodom?'),
  uvod: bloky(GANGBANG).filter(b => b.id === 'gb_bk_rozdiel'),
  zaujem: staryOkruh(bloky(GANGBANG).find(b => b.id === 'gb_postoj')!, 'gangbang'),
  detaily: bloky(GANGBANG).filter(b => b.id.startsWith('gb_') && !['gb_postoj', 'gb_bk_rozdiel', 'gb_bk_myty'].includes(b.id)).map(b => staryOkruh(b, 'gangbang')),
  partner: g('Ak po gangbangu túži partnerka, aký mám postoj k jej zapojeniu?', 'Ak po gangbangu túži partner, aký mám postoj k jeho zapojeniu?'),
})

export const BUKKAKE_TEMA = temaSoSkusenostou({
  slug: 'bukkake', nadpis: 'Bukkake', prefix: 'bk',
  skusenostText: g('Máš skúsenosť s bukkake, pri ktorom bola partnerka stredobodom?', 'Máš skúsenosť s bukkake, pri ktorom si bola stredobodom?'),
  uvod: bloky(GANGBANG).filter(b => b.id === 'gb_bk_rozdiel'),
  zaujem: staryOkruh(bloky(GANGBANG).find(b => b.id === 'bk_postoj')!, 'gangbang'),
  detaily: bloky(GANGBANG).filter(b => b.id.startsWith('bk_') && b.id !== 'bk_postoj').map(b => staryOkruh(b, 'gangbang')),
  partner: g('Ak po bukkake túži partnerka, aký mám postoj k jej zapojeniu?', 'Ak po bukkake túži partner, aký mám postoj k jeho zapojeniu?'),
})

export const TRETIA_OSOBA: TemaObsah = {
  slug: 'trojky-skupiny/treti-clovek', nadpis: 'Tretí človek, emócie a dozvuk',
  uvod: [{ druh: 'text', id: 'treti_uvod',
    telo: 'Táto časť platí naprieč formátmi s ďalšou osobou. Nehodnotí zážitok za teba; pomáha pomenovať, čo ťa pri ďalšom človeku vzrušuje a čo ťa zraňuje.' }],
  telo: [povodny('matica_interakcii'), povodny('hranice'), RAMEC, EMOCIE],
}

export const DVOJITA_PENETRACIA = temaSoSkusenostou({
  slug: 'dvojita-penetracia', nadpis: 'Dvojitá penetrácia', prefix: 'dp',
  skusenostText: 'Máš osobnú skúsenosť s dvojitou penetráciou alebo jej simuláciou?',
  uvod: [{ druh: 'text', id: 'dp_uvod',
    telo: 'Dvojitá penetrácia môže byť samostatná fantázia bez trojky a bez skupiny. Preto má vlastné otázky.' }],
  zaujem: staryOkruh(bloky(EDGE)[0], 'edge'),
  detaily: bloky(EDGE).slice(1).map(b => staryOkruh(b, 'edge')),
  partner: g('Ak po dvojitej penetrácii túži partnerka, aký mám postoj?', 'Ak po dvojitej penetrácii túži partner, aký mám postoj?'),
})
