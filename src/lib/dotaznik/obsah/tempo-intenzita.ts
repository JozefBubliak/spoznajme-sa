import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Tempo, intenzita a orgazmus — modul D4 „Tempo, rytmus a choreografia".
// Zdroj: „19_Tempo_intenzita_a_orgazmus.docx". Spoločný slovník intenzity
// (tlak/tempo/hĺbka/plocha/trvanie), mechanika „vlnenia" (waving), stop-start
// a edging protokoly (sólový aj partnerský), denné teasing mosty, hotové
// scenáre vĺn (15/30/45 min) a dozvuk po intenzívnej hre. Konkrétne techniky
// podľa zóny (vulva/klitoris, penis, G-bod, prostata, bradavky, anál) majú
// vlastné podrobné témy — bozky-dotyky.ts, analna-penetracia.ts; hračky a ich
// vibračné programy — pomocky-hracky.ts; zmysly/teplota/zvuk počas vĺn —
// zmyslova-hra.ts. Tu je len rámec tempa a intenzity naprieč všetkými.
// z/m verzia zrkadlová.
// + xlsm kus pod ≤P47090: energia dotyku od takmer neviditeľného pohybu
// po pevný stisk a ťah; jednoduchá mapa spôsobov kontroly orgazmu.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})
const INTEN3: Moznost[] = [
  { v: 'jemna', label: 'Jemná' },
  { v: 'stredna', label: 'Stredná' },
  { v: 'silnejsia', label: 'Silnejšia' },
  { v: 'striedanie', label: 'Striedanie' },
]

// ── Parametre intenzity — spoločný slovník ────────────────────────────
const PARAMETRE: Blok = {
  druh: 'skupina', id: 'parametre', nadpis: 'Parametre intenzity — spoločný slovník',
  bloky: [
    {
      druh: 'text', id: 'ene_spektrum_info', nadpis: 'Od šepotu pokožky po energiu vášne', ton: 'info',
      telo:
        'Jemný dotyk môže byť sotva viditeľný: konček prsta, pierko, hodváb alebo dych tesne nad kožou. Intenzívny dotyk pracuje s pevným držaním, stiskom, tlakom, ťahom, škrabaním či výpraskom. ' +
        'Nie sú to protiklady, z ktorých si treba vybrať iba jeden. Mnohých ľudí najviac vzrušuje práve kontrast a rozdiel medzi tým, čo radi prijímajú a čo radi poskytujú.',
    },
    {
      druh: 'text', id: 'par_info', ton: 'info',
      telo:
        'Aby sme sa vedeli rýchlo dohodnúť, oplatí sa mať spoločné slová pre to, čo práve meníme: ' +
        'tlak, tempo, hĺbka, plocha dotyku (bodovo vs. plošne), trvanie a prestávky.',
    },
    { druh: 'otazka', id: 'par_default_ruky', typ: 'jeden', text: 'Moja defaultná intenzita pri rukách / ústach', moznosti: INTEN3 },
    { druh: 'otazka', id: 'par_default_hracky', typ: 'jeden', text: 'Moja defaultná intenzita pri hračkách', moznosti: INTEN3 },
    {
      druh: 'otazka', id: 'par_plocha', typ: 'jeden',
      text: 'Bodové vs. plošné dráždenie',
      moznosti: [
        { v: 'bodove', label: 'Radšej bodovo, presne na jedno miesto' },
        { v: 'plosne', label: 'Radšej plošne, širšia oblasť' },
        { v: 'kombinacia', label: 'Kombinácia / striedanie' },
      ],
    },
  ],
}

// ── Vlny („waving") ────────────────────────────────────────────────────
const ENERGIA_DOTYKU: Blok = {
  druh: 'skupina', id: 'energia_dotyku', nadpis: 'Energia dotyku — jemnosť, tlak a ťah',
  uvod:
    'Rovnaký dotyk môže pôsobiť úplné inak podľa energie: takmer neviditeľný pohyb, pevný stisk, pritiahnutie tela alebo prudký kontrast medzi nimi.',
  bloky: [
    {
      druh: 'otazka', id: 'ene_jemnost', typ: 'jeden',
      text: 'Ako vnímam jemné pohyby počas intímnych chvíľ?',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich — pridávajú zmyselnosť a napätie' },
        { v: 'podla_nalady', label: 'Záleží na nálade, občas ich ocením' },
        { v: 'radsej_intenzivne', label: 'Skôr preferujem intenzívne a dôrazné pohyby' },
      ],
    },
    { druh: 'otazka', id: 'ene_jemnost_ine', typ: 'text', text: 'Jemnosť a energia dotyku — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'ene_jemne_prijimat', typ: 'jeden',
      text: 'Ako veľmi ma láka prijímať jemné dotyky',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich, jemnosť ma výrazne vzrušuje' },
        { v: 'podla_nalady', label: 'Mám ich rád(a), ale záleží na nálade' },
        { v: 'radsej_intenzivne', label: 'Radšej prijímam intenzívnejšie dotyky' },
      ],
    },
    { druh: 'otazka', id: 'ene_jemne_prijimat_ine', typ: 'text', text: 'Jemné dotyky pri prijímaní — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'ene_intenzivne_prijimat', typ: 'jeden',
      text: 'Ako veľmi ma láka prijímať intenzívne dotyky',
      moznosti: [
        { v: 'milujem', label: 'Milujem pevnú a dravú energiu' },
        { v: 'obcas', label: 'Občas, podľa situácie' },
        { v: 'radsej_jemne', label: 'Radšej prijímam jemné dotyky' },
      ],
    },
    { druh: 'otazka', id: 'ene_intenzivne_prijimat_ine', typ: 'text', text: 'Intenzívne dotyky pri prijímaní — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'ene_intenzivne_poskytovat', typ: 'jeden',
      text: 'Ako veľmi ma láka poskytovať partnerovi/ke intenzívne dotyky',
      moznosti: [
        { v: 'milujem', label: 'Rád/rada ich dávam a vzrušuje ma to' },
        { v: 'obcas', label: 'Občas, keď sa mi hodí taká energia' },
        { v: 'radsej_jemne', label: 'Radšej poskytujem jemné dotyky' },
      ],
    },
    { druh: 'otazka', id: 'ene_intenzivne_poskytovat_ine', typ: 'text', text: 'Intenzívne dotyky pri poskytovaní — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'ene_prijimam', typ: 'jeden',
      text: 'Keď dotyk prijímam, najviac mi vyhovuje',
      moznosti: [
        { v: 'jemne', label: 'Jemný a pomalý dotyk' },
        { v: 'stredne', label: 'Pevný, ale pokojný dotyk' },
        { v: 'intenzivne', label: 'Intenzívny stisk, tlak alebo ťah' },
        { v: 'striedanie', label: 'Striedanie všetkých úrovní' },
        { v: 'podla_nalady', label: 'Podľa nálady a situácie' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_poskytujem', typ: 'jeden',
      text: 'Keď dotyk poskytujem, prirodzene ma baví',
      moznosti: [
        { v: 'jemne', label: 'Jemné hladkanie a dráždenie' },
        { v: 'stredne', label: 'Pevný, súvislý tlak' },
        { v: 'intenzivne', label: 'Dôrazný stisk, tlak alebo ťah' },
        { v: 'striedanie', label: 'Striedanie jemnosti a intenzity' },
        { v: 'podla_partnerstva', label: 'Najmä reagovať na telo partnera/ky' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_druhy', typ: 'viac', inePovolene: true,
      text: 'Ktoré druhy energie dotyku chcem prijímať',
      moznosti: [
        { v: 'takmer_bez_dotyku', label: 'Takmer neviditeľné pohyby — končeky prstov, pierko alebo šatka' },
        { v: 'pevny_stisk_stehna', label: 'Pevné stláčanie stehien' },
        { v: 'pevny_stisk_zadok', label: 'Pevné stláčanie zadku' },
        { v: 'pevny_stisk_chrbat', label: 'Dôrazný tlak a stisk chrbta alebo ramien' },
        { v: 'tahanie_vlasov', label: 'Ťahanie za vlasy — jemné aj intenzívne' },
        { v: 'pritiahnutie_tela', label: 'Pritiahnutie partnerovho tela pevne k sebe' },
        { v: 'skrabanie_bozky', label: 'Škrabanie nechtami v kontraste s jemnými bozkami' },
        { v: 'intenzivna_masaz', label: 'Intenzívne masírovanie a hnetenie svalov' },
        { v: 'pevny_uchop', label: 'Pevný úchop hlavy, bokov alebo zápästí' },
        { v: 'vaha_tela', label: 'Tlak váhou tela a pritlačenie do podložky' },
        { v: 'pevne_drzanie', label: 'Pevné držanie tela alebo rúk' },
        { v: 'viazanie', label: 'Obmedzenie pohybu alebo viazanie' },
        { v: 'vyprask', label: 'Výprask a dôrazné údery' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_druhy_poskytujem', typ: 'viac', inePovolene: true,
      text: 'Ktoré druhy energie dotyku chcem poskytovať',
      moznosti: [
        { v: 'hladenie', label: 'Jemné hladkanie prstami alebo dlaňou' },
        { v: 'pierko_hodvab', label: 'Pierko, hodváb alebo šatka' },
        { v: 'masaz', label: 'Masážne a hnetacie pohyby' },
        { v: 'stlacanie', label: 'Intenzívne stláčanie stehien, zadku alebo bokov' },
        { v: 'tahanie', label: 'Ťahanie vlasov alebo pritiahnutie tela' },
        { v: 'skrabanie', label: 'Škrabanie nechtami' },
        { v: 'pevne_drzanie', label: 'Pevné držanie alebo pritlačenie' },
        { v: 'viazanie', label: 'Obmedzenie pohybu alebo viazanie' },
        { v: 'vyprask', label: 'Výprask a dôrazné údery' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_striedanie', typ: 'jeden',
      text: 'Ako chcem jemnosť a intenzitu skladať v jednom zážitku',
      moznosti: [
        { v: 'hlavne_jemne', label: 'Prevažne jemne, intenzitu iba občas' },
        { v: 'hlavne_intenzivne', label: 'Prevažne intenzívne, jemnosť ako krátky kontrast' },
        { v: 'vlny', label: 'Vo vlnách — jemne, silnejšie, uvoľniť a znovu vystupňovať' },
        { v: 'nahle_kontrasty', label: 'Náhle kontrasty a prekvapivé zmeny' },
        { v: 'podla_nalady', label: 'Podľa nálady, bez pevného vzorca' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_skrabanie_sila', typ: 'jeden',
      text: 'Ak ma láka škrabanie nechtami, aká intenzita mi sedí',
      moznosti: [
        { v: 'lahke', label: 'Ľahké prechádzanie nechtami bez stopy' },
        { v: 'stredne', label: 'Citeľné škrabanie a tlak' },
        { v: 'silne', label: 'Silné škrabanie, pri ktorom môže zostať stopa' },
        { v: 'stupnovanie', label: 'Postupné stupňovanie od jemného po silné' },
        { v: 'nie', label: 'Škrabanie ma neláka' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_skrabanie_miesta', typ: 'viac', inePovolene: true,
      text: 'Kde na tele ma škrabanie láka',
      moznosti: [
        { v: 'chrbat', label: 'Chrbát' },
        { v: 'ramena', label: 'Ramená a lopatky' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'stehna', label: 'Stehná' },
        { v: 'hrudnik', label: 'Hrudník' },
        { v: 'boky', label: 'Boky a pás' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_zmena_poloh', typ: 'jeden',
      text: 'Chcem meniť polohy aj preto, aby sa zmenila energia a dynamika',
      moznosti: [
        { v: 'ano', label: 'Áno, zmeny polôh ma výrazne vzrušujú' },
        { v: 'mozno', label: 'Možno, chcem to viac preskúmať' },
        { v: 'nie', label: 'Nie, radšej zostávam pri jednoduchšom priebehu' },
      ],
    },
    {
      druh: 'otazka', id: 'ene_polohy', typ: 'viac', inePovolene: true,
      text: 'Ktoré polohy najlepšie nesú energiu, ktorú chcem',
      moznosti: [
        { v: 'zozadu', label: 'Zozadu — dravosť, ťah a pevný stisk bokov' },
        { v: 'stoj', label: 'V stoji — spontánnosť a tlak tela' },
        { v: 'hore', label: 'Jeden hore — kontrola rytmu a intenzity' },
        { v: 'lyzicky', label: 'Lyžičky — pomalý tlak a dlhé dotyky' },
        { v: 'misionar', label: 'Misionárska — očný kontakt a vedenie telom' },
        { v: 'striedanie', label: 'Prechod medzi jemnou a dynamickou polohou' },
      ],
    },
    {
      druh: 'text', id: 'ene_tipy_myty', nadpis: 'Tipy a mýty', ton: 'info',
      telo:
        'Skús kontrast: pierko alebo končeky prstov, potom pevný stisk stehien či zadku a napokon pomalý bozk. Dynamiku mení aj poloha — zozadu a v stoji sa ľahšie pracuje s ťahom, lyžičky a misionárska poloha podporujú pomalý tlak a očný kontakt. ' +
        'Mýtus: jemnosť je automaticky romantická a intenzita automaticky drsná. Realita: jemný dotyk môže byť mučivo erotický a pevný stisk láskavý. Nie je nič zvláštne ani hanblivé na tom, ak ťa láka jeden extrém alebo ich striedanie.',
    },
  ],
}

const TEMPO_RYTMUS: Blok = {
  druh: 'skupina', id: 'tempo_rytmus', nadpis: 'Tempo, rytmus a prestávky',
  bloky: [
    {
      druh: 'text', id: 'tmp_psychofyz_info', nadpis: 'Tempo pôsobí na telo aj hlavu', ton: 'info',
      telo:
        'Pomalé tempo dáva priestor vnímať každý pohyb, pohľad a narastajúce očakávanie. Rýchle tempo prináša nápor energie a spontánnosť. ' +
        'Kombinované tempo využíva oboje: pomalý začiatok, eskaláciu, zmenu hĺbky, náhle prerušenie a návrat. Pauza nemusí znamenať koniec rytmu — môže ho vytvárať.',
    },
    {
      druh: 'otazka', id: 'tmp_penetracia', typ: 'jeden',
      text: 'Aké tempo mi najčastejšie vyhovuje pri penetrácii',
      moznosti: [
        { v: 'pomale', label: 'Pomalé a zmyselné' },
        { v: 'rychle', label: 'Rýchle a dynamické' },
        { v: 'kombinacia', label: 'Kombinácia a zmeny tempa' },
        { v: 'podla_nalady', label: 'Podľa nálady alebo polohy' },
      ],
    },
    {
      druh: 'otazka', id: 'tmp_predohra', typ: 'jeden',
      text: 'Aké tempo mi najčastejšie vyhovuje pri predohre',
      moznosti: [
        { v: 'pomale', label: 'Pomalé a postupné' },
        { v: 'rychle', label: 'Rýchle a spontánne' },
        { v: 'kombinacia', label: 'Začať pomaly a potom zrýchliť' },
        { v: 'podla_nalady', label: 'Podľa nálady a situácie' },
      ],
    },
    {
      druh: 'otazka', id: 'tmp_zmeny', typ: 'jeden',
      text: 'Ako vnímam zmeny tempa počas jedného zážitku',
      moznosti: [
        { v: 'milujem', label: 'Milujem ich — držia ma v napätí' },
        { v: 'postupne', label: 'Najviac mi sedí postupné zrýchľovanie' },
        { v: 'obcas', label: 'Občas áno, podľa situácie' },
        { v: 'stale', label: 'Radšej mám stabilný a predvídateľný rytmus' },
      ],
    },
    {
      druh: 'otazka', id: 'tmp_pauzy', typ: 'jeden',
      text: 'Čo so mnou robia krátke pauzy na bozky, dotyky alebo pohľad',
      moznosti: [
        { v: 'zvysuju', label: 'Zvyšujú napätie a vzrušenie' },
        { v: 'podla_nalady', label: 'Záleží na nálade' },
        { v: 'rusivo', label: 'Skôr ma vyrušia — mám rád(a) súvislé tempo' },
      ],
    },
    {
      druh: 'otazka', id: 'tmp_prvky', typ: 'viac', inePovolene: true,
      text: 'Ktoré prvky rytmu a psychologickej hry ma lákajú',
      moznosti: [
        { v: 'ocny_kontakt', label: 'Očný kontakt počas pomalých pohybov' },
        { v: 'postupne_budovanie', label: 'Postupné budovanie vzrušenia' },
        { v: 'pomale_hlboke', label: 'Pomalé a hlboké pohyby' },
        { v: 'rychle_energicke', label: 'Rýchle a energické pohyby' },
        { v: 'hlbka', label: 'Striedanie plytkých a hlbokých pohybov' },
        { v: 'necakana_pauza', label: 'Nečakané prerušenie a návrat' },
        { v: 'kontrola', label: 'Partner/ka prevezme kontrolu nad rytmom' },
      ],
    },
    {
      druh: 'otazka', id: 'tmp_psychologia', typ: 'viac', inePovolene: true,
      text: 'Ktoré psychologické prvky chcem prepájať s tempom',
      moznosti: [
        { v: 'komplimenty', label: 'Komplimenty a povzbudenie' },
        { v: 'ocny_kontakt', label: 'Dlhý očný kontakt' },
        { v: 'zvuky', label: 'Dych, vzdychy a zvuky vzrušenia' },
        { v: 'roleplay', label: 'Hranie rolí' },
        { v: 'dominancia', label: 'Dominantné vedenie tempa' },
        { v: 'submisivita', label: 'Odovzdanie kontroly nad rytmom' },
        { v: 'teasing', label: 'Pomalé trápenie, prerušenia a návraty' },
      ],
    },
    {
      druh: 'text', id: 'tmp_tipy_myty', nadpis: 'Tipy a mýty', ton: 'info',
      telo:
        'Skús jednu skladbu ako metronóm: prvú časť pomaly, v refréne zrýchliť a potom sa vrátiť k dlhým pohybom. Inokedy urob opak — začni prudko a zámerne spomaľ. ' +
        'Mýtus: rýchlejšie znamená lepšie a pomalé tempo je nudné. Realita: rozhoduje kontrast, presnosť a to, či rytmus sedí telu. Stabilný rytmus aj časté zmeny sú úplne bežné preferencie.',
    },
  ],
}

const VLNY: Blok = {
  druh: 'skupina', id: 'vlny', nadpis: 'Vlny — striedanie stupňovania a uvoľnenia',
  bloky: [
    {
      druh: 'text', id: 'vlny_info',
      telo:
        'Namiesto lineárneho stúpania k vrcholu: striedanie približne 60–120 sekúnd stupňovania a 15–30 sekúnd ' +
        'uvoľnenia, opakované v niekoľkých cykloch. Predlžuje zážitok a zosilňuje záverečný vrchol.',
    },
    {
      druh: 'otazka', id: 'vln_cykly', typ: 'jeden',
      text: 'Koľko cyklov vĺn zvyčajne chcem',
      moznosti: [
        { v: '1_2', label: '1–2 cykly' },
        { v: '3_5', label: '3–5 cyklov' },
        { v: 'viac', label: 'Viac, mám rád(a) dlhé stupňovanie' },
      ],
    },
    { druh: 'otazka', id: 'vln_dlzka', typ: 'text', text: 'Moja ideálna dĺžka jednej vlny (v sekundách/minútach):' },
  ],
}

// ── Stop-start a edging ────────────────────────────────────────────────
const EDGING: Blok = {
  druh: 'skupina', id: 'edging', nadpis: 'Stop-start a edging',
  bloky: [
    {
      druh: 'text', id: 'edg_info', ton: 'info',
      telo:
        'Edging vedome približuje vzrušenie k vrcholu a potom ho spomalí, presunie alebo na chvíľu uvoľní. Môže byť jemnou vlnou, hravou frustráciou aj intenzívnou hrou kontroly. ' +
        'Niekomu zosilní záver, inému viac vyhovuje plynulý priebeh bez prerušovania — obe reakcie sú bežné.',
    },
    {
      druh: 'otazka', id: 'edg_typ', typ: 'jeden',
      text: 'Aký typ edgingu mi vyhovuje',
      moznosti: [
        { v: 'soft', label: 'Soft — krátke, jemné prerušenia' },
        { v: 'hard', label: 'Hard — viacnásobné, výrazné „takmer-vrcholy"' },
        { v: 'nie', label: 'Radšej bez edgingu, priamo k vrcholu' },
      ],
    },
    {
      druh: 'otazka', id: 'edg_sposoby', typ: 'viac', inePovolene: true,
      text: 'Ako chcem pracovať so zadržiavaním a kontrolou orgazmu',
      moznosti: [
        { v: 'spomalenie', label: 'Spomaliť tesne pred vrcholom' },
        { v: 'uplna_pauza', label: 'Úplne zastaviť stimuláciu a znovu začať' },
        { v: 'zmena_zony', label: 'Presunúť dotyk na menej citlivú zónu' },
        { v: 'jemna_pomocka', label: 'Použiť pomôcku na jemnú, presnú stimuláciu' },
        { v: 'tempo_pomocka', label: 'Kombinovať zmenu tempa s pomôckou' },
        { v: 'partner_riadi', label: 'Nechať tempo a prestávky riadiť partnera/ku' },
      ],
    },
    {
      druh: 'otazka', id: 'edg_kto_rozhoduje', typ: 'jeden',
      text: 'Kto rozhoduje o pauze',
      moznosti: [
        { v: 'ja', label: 'Ja sám/sama' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'striedavo', label: 'Striedavo, podľa scény' },
      ],
    },
    p('edg_ruined', '„Ruined" orgazmus (prerušené vyvrcholenie bez plného uvoľnenia) ma zaujíma'),
    { druh: 'otazka', id: 'edg_max_pocet', typ: 'text', text: 'Maximálny počet „takmer-vrcholov", ktorý chcem (ak vôbec):' },
    {
      druh: 'otazka', id: 'edg_nasobne', typ: 'jeden',
      text: 'Láka ma skúmať viac orgazmov alebo orgazmických vĺn za sebou',
      moznosti: [
        { v: 'ano', label: 'Áno, chcem túto schopnosť alebo zážitok rozvíjať' },
        { v: 'mozno', label: 'Možno, potrebujem to najprv zažiť' },
        { v: 'jeden', label: 'Nie, preferujem jeden intenzívny vrchol' },
        { v: 'bez_ciela', label: 'Nechcem sa sústrediť na počet orgazmov' },
      ],
    },
    {
      druh: 'text', id: 'edg_myty', nadpis: 'Mýty o kontrole orgazmu', ton: 'info',
      telo:
        'Mýtus: edging musí skončiť „silnejším" orgazmom, inak zlyhal. Realita: pre niekoho je hlavnou odmenou samotné napätie, dlhší zážitok alebo pocit kontroly. ' +
        'Mýtus: viacnásobný orgazmus je výkon, ktorý by mal zvládnuť každý. Realita: telá majú rozdielnu citlivosť aj čas zotavenia a počet nič nevypovedá o kvalite sexu.',
    },
  ],
}

// ── Edging protokoly — sólový a partnerský ────────────────────────────
const PROTOKOLY: Blok = {
  druh: 'skupina', id: 'protokoly', nadpis: 'Edging protokoly',
  bloky: [
    {
      druh: 'otazka', id: 'pro_solovy', typ: 'viac',
      text: 'Sólový protokol — čo mi pomáha',
      moznosti: [
        { v: 'casovac', label: 'Časovač / počítanie takmer-vrcholov' },
        { v: 'dych', label: 'Dych ako metronóm tempa' },
        { v: 'reset_pauzy', label: '„Reset" pauzy medzi vlnami' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_partnersky', typ: 'viac',
      text: 'Partnerský protokol — čo ma láka',
      moznosti: [
        { v: 'riadi_tempo', label: 'Partner/ka riadi tempo, ja len prijímam' },
        { v: 'zakaz_dotyku', label: 'Zákaz dotyku pre prijímajúceho (ruky preč)' },
        { v: 'odmena', label: 'Odmena za trpezlivosť na konci' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_teasing_den', typ: 'viac',
      text: '„Mosty" počas dňa — teasing pred večerom',
      moznosti: [
        { v: 'sprava', label: 'Dráždivá správa' },
        { v: 'oblecenie', label: 'Čiastočné odhalenie / dráždenie cez bielizeň' },
        { v: 'nie', label: 'Nie, radšej bez toho počas dňa' },
      ],
    },
    { druh: 'otazka', id: 'pro_polohy', typ: 'text', text: 'Ktoré polohy nám najviac uľahčujú kontrolu tempa (napr. cowgirl, lyžičky, okraj postele):' },
  ],
}

// ── Signály počas vĺn ──────────────────────────────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Signály počas vĺn',
  bloky: [
    {
      druh: 'otazka', id: 'sig_system', typ: 'jeden',
      text: 'Ako mi partner/ka najrýchlejšie mení tempo alebo intenzitu',
      moznosti: [
        { v: 'slova', label: 'Priame slová — pridaj, uber, pomalšie, silnejšie' },
        { v: 'semafor', label: 'Číselná stupnica pre mieru intenzity' },
        { v: 'gesto', label: 'Gesto, stisk ruky alebo vedenie partnerovej ruky' },
        { v: 'telo', label: 'Pohyb tela, pritiahnutie alebo zmena rytmu dychu' },
      ],
    },
    p('sig_zmysly', 'Chcem si počas vĺn vedome (ne)vidieť / (ne)počuť — páska alebo slúchadlá zvýrazňujú dotyk'),
  ],
}

// ── Hotové scenáre vĺn ─────────────────────────────────────────────────
const SCENARE: Blok = {
  druh: 'skupina', id: 'scenare', nadpis: 'Hotové scenáre vĺn (session card)',
  bloky: [
    {
      druh: 'text', id: 'scenare_info',
      telo:
        'Tri rýchle šablóny na vyskúšanie — voliteľné, dajú sa upraviť podľa chuti.',
    },
    {
      druh: 'otazka', id: 'sce_kratka', typ: 'jeden',
      text: '„Krátka vlna" (~15 min): 3× (90 s stupňovanie → 20 s pauza), koniec pri cca 70 % bez vrcholu, 2 min aftercare',
      moznosti: [
        { v: 'chcem', label: 'Chcem to vyskúšať' },
        { v: 'mozno', label: 'Možno niekedy' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'sce_dvojita', typ: 'jeden',
      text: '„Dvojitá vlna" (~30 min): dve zóny striedavo + teplotný kontrast v druhej vlne, finále voliteľné',
      moznosti: [
        { v: 'chcem', label: 'Chcem to vyskúšať' },
        { v: 'mozno', label: 'Možno niekedy' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    { druh: 'otazka', id: 'sce_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) mať vyslovene „teasing deň" bez vrcholu',
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'obcas', label: 'Občas' },
        { v: 'nikdy', label: 'Nikdy' },
      ],
    },
    {
      druh: 'text', id: 'sce_tipy_stupnovane', nadpis: 'Tipy podľa skúsenosti', ton: 'info',
      telo:
        'Pre začiatok: začnite pomaly — očný kontakt, jemné dotyky; keď napätie stúpne, zrýchlite tempo a pridajte pevnejší dotyk. ' +
        'Pre pokročilých: skúste kontrolu orgazmu (pauzy pri odďaľovaní), použite hračku počas pomalého tempa a potom zmeňte rytmus, striedajte role. ' +
        'Pre zvedavých: kombinujte jemné hladkanie pierkom s pevnejšími dotykmi rúk.',
    },
  ],
}

const DOZVUK: Blok = {
  druh: 'skupina', id: 'bezpecnost', nadpis: 'Dozvuk po intenzívnej vlne',
  bloky: [
    {
      druh: 'otazka', id: 'bez_aftercare', typ: 'viac',
      text: 'Čo mi po intenzívnejšej vlne najviac sadne',
      moznosti: [
        { v: 'napoj', label: 'Nápoj' },
        { v: 'prikrytie', label: 'Prikrytie' },
        { v: 'dotyk', label: 'Krátky dotyk' },
        { v: 'debrief', label: '„2+2" debrief (2 veci super, 2 na úpravu)' },
      ],
    },
  ],
}

export const TEMPO_INTENZITA: TemaObsah = {
  slug: 'tempo-rytmus-choreografia/tempo-rytmus-choreografia',
  nadpis: 'Tempo, intenzita a orgazmus',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Spoločný jazyk pre intenzitu',
      telo:
        'Namiesto priameho stúpania k vrcholu je často vzrušujúcejšie vedome pracovať s vlnami — striedaním ' +
        'stupňovania a uvoľnenia. Táto téma dáva spoločný slovník a niekoľko hotových scenárov na vyskúšanie.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiace témy', ton: 'info',
      telo:
        'Konkrétne techniky podľa zóny (ruky, ústa, hračky) majú vlastné podrobné témy „Bozky, dotyky a manuálna ' +
        'stimulácia", „Anál a stimulácia zadku", „Vibrátory a stimulátory" a „Zmyslová hra".',
    },
  ],
  telo: [
    PARAMETRE,
    ENERGIA_DOTYKU,
    TEMPO_RYTMUS,
    VLNY,
    EDGING,
    PROTOKOLY,
    SIGNALY,
    SCENARE,
    DOZVUK,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zvýraznia, pri ktorom tempe, rytme a spôsobe stupňovania sa vaše preferencie stretávajú.',
    },
  ],
}
