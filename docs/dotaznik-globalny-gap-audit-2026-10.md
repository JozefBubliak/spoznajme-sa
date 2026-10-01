# Globálny gap audit túžob, preferencií a praktík — 2026-10

Stav: **rozšírený viaczdrojový audit**, nie zoznam tém z jedného prieskumu a nie automatický implementačný príkaz. Porovnané s 9 doménami, 58 modulmi v `strom.ts`, 36 registrovanými obsahovými témami a Claudeho 201-položkovým radarom v `docs/dotaznik-gap-analyza.md`. Audit rozlišuje **skutočne chýba**, **je iba náznak/screening**, **už je spracované** a **zatiaľ iba komunitný kandidát**.

## Rozhodnutie používateľa a implementovaný rozsah — 2026-10-01

Používateľ schválil implementáciu **iba týchto 18 oblastí**; ostatné návrhy z auditu sa teraz nepridávajú:

1. Ace/gray/demi/aromantické spektrum — `libido-chut.ts`
2. Asymetria dávania a prijímania — `libido-chut.ts`
3. Sex z iných motívov než spontánna túžba — `libido-chut.ts`
4. Erotika po konflikte a emočné scenáre — `dlhodoba-intimita.ts`
5. Rough sex ako samostatná mapa — `bdsm.ts`
6. Kink: pozitívna moc, nielen ponižovanie — `bdsm.ts`
7. Bondage do hĺbky — `bdsm.ts`
8. Medical a transformačný roleplay — `roleplay.ts`
9. Reprodukčná erotika — `specificke-obdobia.ts`
10. Erotické médiá podľa formy — `digitalna-intimita.ts`
11. Špecifické praktiky — `fetise.ts`
12. Orgazmické scenáre — `orgazmus-kontrola.ts`
13. Tekutiny a wet-and-messy — `fetise.ts`
14. Profesionálna tretia osoba — `cnm-enm.ts`
15. Somnofília a intoxikačné fantázie — `tabu-mantinely.ts`
16. Vzťahové dohody do hĺbky — `cnm-enm.ts`
17. Zdravotné a životné prechody — `specificke-obdobia.ts`
18. Kultúra, náboženstvo a jazyk — `brzdy-spustace.ts`

Každá oblasť bola doplnená ako plnohodnotný obsah: text vzbudzujúci zvedavosť, konkrétne preferencie a scenáre, význam túžby, pohľad na túžbu partnera/partnerky a mýty alebo tabu tam, kde prinášajú hodnotu. **Všetky ostatné položky auditu zostávajú iba analytickým radarom bez súhlasu na implementáciu.**

## Ako bol audit robený

- **A — najsilnejšie:** populačné prieskumy, plné dotazníky a medzinárodne testované nástroje (WHO SHAPE, Natsal, NSSHB, GeSiD, národné vzorky);
- **B:** recenzované cielené štúdie a validované škály fantázií, túžby, queer/trans/intersex/ace, kink, CNM a disability skúseností;
- **C:** rozsiahle komunitné checklisty a worksheety (Scarleteen, Autostraddle, The Duchy, Temple Scarlet, Lascivity) ako taxonómia, nie prevalencia;
- **D — radar:** tematické fóra a subreddity ako zdroj reálnych obáv, jazyka a slepých miest, nikdy nie dôkaz „koľko ľudí to chce“;
- kontrola konkrétnych výrazov **aj významových blokov** v aktuálnych obsahových súboroch. Zhoda slova nie je dôkaz kvality a nulová zhoda ešte nemusí znamenať potrebu samostatného modulu.

„Celosvetový“ neznamená, že existuje jeden univerzálny zoznam. Kultúra mení jazyk, hanbu, prijateľnosť aj ochotu priznať skúsenosť. WHO testovanie v 19 krajinách potvrdilo, že citlivé otázky sú prijateľné, ale poradie, preambula a kultúrne prenosný jazyk rozhodujú.

**Pravidlo zaradenia:** P0/P1 medzera má mať najmenej dva nezávislé typy opory (napr. populačný/odborný zdroj + komunitný zdroj) a zároveň musí byť kontrolou kódu potvrdené, že chýba alebo je plytká. Jedno fórum alebo jeden kinklist vytvára iba kandidáta na overenie.

## P0 — najväčšie slepé miesta

| Medzera | Stav dnes | Čo doplniť |
|---|---|---|
| **Trans muži / transmaskulínni ľudia** | Chýba samostatná téma; máme len úzko zameranú trans ženu | genitálne pomenovania, frontálny/vaginálny sex podľa vlastného jazyka, strap-on/packer/protéza, rast klitorisu po testosteróne, hrudník pred/po operácii, prijímanie vs. poskytovanie, dysfória aj rodová eufória, partnerova túžba |
| **Nebinárni a gender-fluid partneri** | Iba okrajové zmienky | meniace sa oslovenia a roly, dni/kontexty s odlišným rodovým prežívaním, ktoré časti tela sú v centre alebo mimo, dominantná/submisívna rola bez rodového skriptu |
| **Intersex telá a variácie anatómie** | Chýba | nepodsúvať jednu anatómiu; vlastné názvy, citlivé zóny, operované/neoperované telo, hormóny, komfort s pohľadom a dotykom |
| **Trans žena ako celá osoba, nie iba „žena s penisom“** | Téma existuje, ale je postavená prevažne ako fantázia cis páru o tretej osobe | trans žena ako aktuálna partnerka; pred/po operácii, penis bez erekcie alebo bez túžby používať ho, neovagína, rôzne orgazmické mapy, hormóny, eufória/dysfória, ne-fetišizujúci jazyk |
| **Anatómia oddelená od rodovej identity** | Architektúra predpokladá muž = penis, žena = vulva a heterosexuálny pár | vstupný profil „aké telo mám / aké telo má partner / ktoré názvy používame“; až potom vetviť praktiky. Je to podmienka pre skutočne inkluzívny dotazník |
| **Skutočné queer páry** | „Rovnaké pohlavie“ je najmä fantázia hetero páru | lesbické, gay, bi/pan a queer páry ako primárny vzťah: tribbing, frot, docking, strap-on/protézy, prepínanie top/bottom/vers, queer sexuálne skripty bez „mužskej“ a „ženskej“ povinnosti |

Výskum transmaskulínnych a nebinárnych ľudí ukazuje široké spektrum orálu, manuálnej stimulácie, hračiek/protéz, frontálnej a análnej stimulácie, pričom prijímacie roly a konkrétne časti tela bývajú silnejšie ovplyvnené dysfóriou než poskytovanie. Preto nestačí premenovať cis otázku.

## P1 — vysoká hodnota pre veľa párov

| Oblasť | Stav dnes | Zoznam na doplnenie |
|---|---|---|
| **Ace / gray / demi / aromantické spektrum** | Krátky blok v `libido-chut.ts` | oddeliť príťažlivosť, libido, vzrušenie, ochotu, partnerov záujem a romantickú väzbu; sex-positive/neutral/averse; romantický vs. aromantický vzťah; zmyselná intimita bez sexu. Výskum výslovne ukazuje rozdiel medzi „chcem“ a „som ochotný/á“ |
| **Asymetria dávania a prijímania** | Roztrúsené po témach | prijímať bez povinnosti oplatiť, poskytovať bez potreby prijímať, service sex, „pillow princess/prince“, vzájomnosť až inokedy, byť stredobodom, dar rozkoše partnerovi |
| **Sex z iných motívov než spontánna túžba** | Čiastočne responzívna túžba | maintenance/connection sex, hravá ochota, potešenie z partnerovho potešenia, plánovaný sex, „uvidím, či chuť príde“, rituál opätovného spojenia; nesmie sa miešať s predstieraním súhlasu |
| **Erotika po konflikte a emočné scenáre** | Len krátke zmienky | zmierovací sex, nežné znovunapojenie, dravý „make-up sex“, sex po odlúčení, výročie, oslava úspechu, útecha, nostalgické zopakovanie prvého rande |
| **Rough sex ako samostatná mapa** | Veľa prvkov je roztrúsených v BDSM/dotykoch | prijímať aj poskytovať: vlasy, hryzenie, facky na tvár, genitálne facky, jemný/tvrdý výprask, škrabanie, pritlačenie, nadávky, smothering; oddeliť „vášnivé/dravé“ od identity BDSM. Populačný výskum ukazuje vysokú rozšírenosť |
| **Kink: pozitívna moc, nielen ponižovanie** | Chvála a služba len v pár voľbách | praise kink, worship/uctievanie, service submission, pleasure dom, gentle dom, brat/brat-tamer, protokol počas dňa, vlastníctvo/označenie, objektifikácia, dollification, bimbofication/feminizácia/maskulinizácia |
| **Kink role a inštinkty** | Pet play má jednu otázku | primal play (lov/predátor–korisť), podrobnejší pet/pup/pony/kitten play, furry identita vs. sexuálny záujem, dospelý age-play/ABDL ako osobitný screening, nie zlúčenie s maloletosťou |
| **Bondage do hĺbky** | Pomôcky sú, psychológia plytká | rope/shibari ako estetika a pocit, predicament bondage, suspension iba screening, mummification/vak, spreader bar, poloha/bezmocnosť/vystavenie, viazanie ako starostlivosť vs. disciplína |
| **Medical a transformačný roleplay** | Lekár/pacient je iba položka | vyšetrenie, ordinácia, uniforma, speculum/rekvizity iba ako fantázia alebo pomôcka; makeover, cross-dressing, gender play, transformation, human furniture/statue, doll/mannequin |
| **Reprodukčná erotika** | Tehotenstvo/laktácia iba jedna fetišová položka | breeding/impregnation fantasy oddelená od reálneho cieľa otehotnieť, creampie fantasy, „riziko“ ako fantazijný motív, tehotenské telo, lactation/adult nursing, partnerov postoj; bez hodnotenia plodnosti |
| **Erotické médiá podľa formy** | Porno/literatúra/VR všeobecne | audio erotika, ASMR erotika, fanfiction, hentai/animácia, interaktívne hry, spoločné kurátorovanie, sólo súkromie, živé cam predstavenia, tvorba obsahu ako fantázia vs. realita |
| **AI a nové digisexuálne praktiky** | Chýba | AI erotické texty/obrázky, chatbot/companion, AI sexting alebo roleplay s partnerom, personalizované porno, hračky synchronizované s obsahom, VR avatary, sex dolls/robots a hranica nevery/súkromia. Nemecký národný prieskum 2024 už našiel aspoň jednu AI-sexuálnu aktivitu u 31,6 % vzorky |

## P2 — menšie skupiny, ale jasné a užitočné doplnenia

| Oblasť | Čo chýba alebo je len názov |
|---|---|
| **Špecifické praktiky** | uretrálny sounding/plug, docking, figging, erotický klystír, genitálne pumpy a vákuum podľa anatómie, nipple pumping, milking/prostatické dojenie, speculum, sex machine ako samostatná rola ovládajúci/prijímajúci, klon vlastného penisu/vulvy, sleeve/protézy |
| **Orgazmické scenáre** | forced orgasm, ruined orgasm ako samostatná túžba oboch rolí, overstimulation po orgazme, hands-free orgazmus, fantasy „bez dotyku“, ejakulácia bez orgazmu/orgazmus bez ejakulácie, squirting aj jeho partnerov postoj |
| **Tekutiny a wet-and-messy** | sliny/moč/semeno sú; doplniť pot, pach, slzy ako erotický signál, jedlo/krémy/sliz (WAM), cum-kiss/snowballing, felching iba ako explicitný screening, menštruačná erotika bez hanby |
| **Profesionálna tretia osoba** | chýba jasné rozlíšenie | erotická masáž, profesionálna domme/dom, sex worker, sexological bodyworker/surrogate v krajinách, kde existuje; fantázia vs. reálny záujem a postoj partnera |
| **Somnofília a intoxikačné fantázie** | chýba | iba dospelý fantasy/roleplay screening a vopred dohodnuté scenáre v centrálnej rizikovej téme; neponúkať ako spontánny návod |
| **Finančná a statusová moc** | chýba | findom/paypig, sugar relationship, darčeky/odmeny, platenie ako symbol moci; oddeliť fantáziu od reálneho finančného rozhodnutia |
| **Vzťahové dohody do hĺbky** | CNM základ už obsahuje relationship anarchy, solo poly, hierarchiu, metamour, kompersiu, DADT, čas a bývanie | doplniť mono-poly, queerplatonic, living-apart-together, comet partner, fluid bonding, súkromie detailov, nocovanie/domov, deti, peniaze, rušenie plánov, krízovú prioritu a revíziu dohôd |
| **Telesná dostupnosť a pomôcky** | blok už obsahuje fyzické obmedzenia, vankúše/kliny, pomalšie presuny a senzorickú citlivosť | doplniť sex na vozíku, ochrnutie a zmenené senzorické mapy, amputáciu/protézy, ostómiu/katéter, chronickú bolesť/únavu, „čo je dotykateľné dnes“, cenu aktivity na ďalší deň a oddelenie fyzickej od erotickej roly |
| **Zdravotné a životné prechody** | tehotenstvo, pôrod a menopauza existujú, ale plytko | snaženie o dieťa vs. sex pre potešenie, neplodnosť/IVF, potrat a strata tehotenstva, rakovina, mastektómia, hysterektómia, prostatektómia, endometrióza/vulvodýnia, panvové dno, zmena libida po liekoch, sexuálny život po operácii |
| **Kultúra, náboženstvo a jazyk** | chýba ako samostatná vrstva | hanba a „dobrý muž/žena“ skripty, sex bez lásky, panenstvo, skromnosť/nahota, náboženské rituály a zákazy, viacjazyčný dirty talk, kultúrne názvy tela; nie exotizovanie praktík podľa národa |

## Krížová kontrola Claudeho 201-položkového radaru

Claudeho `docs/dotaznik-gap-analyza.md` je užitočný široký radar, ale jeho automatická kontrola podľa slov vytvorila aj falošné medzery. Po významovej kontrole platí:

### Potvrdené alebo správne označené ako plytké

- trans muž, nebinárny a intersex partner; širšia rodová flexibilita a roly bez heterosexuálneho skriptu;
- breeding fantasy, free-use fantasy, cuckquean ako zrkadlová dynamika, hypnóza, WAM/sploshing, furry, sounding, mummification, interrogation/fear/knife roleplay a kontrola oblečenia — zväčša **P2 screening**, nie automaticky samostatný modul;
- pocit byť žiadaný/á a sex ako útecha či znovunapojenie — vysoká vzťahová hodnota;
- telefonický/hlasový sex, erotické audio, AI, roboty/sex dolls, hentai/animácia — patria do hlbšej mapy médií;
- trauma potrebuje citlivú voliteľnú vetvu a možnosť preskočiť, nie zaradiť medzi „fantázie“;
- predčasná ejakulácia je dnes zachytená iba nepriamo ako „tempo vyvrcholenia“ v `zdravie-ochrana-hygiena.ts`; potrebuje konkrétnejšie spracovanie a postoj partnera/partnerky.

### Falošné „úplne chýba“ alebo nesprávna priorita

- **vynútený/forced orgazmus a overstimulation** už sú v `orgazmus-kontrola.ts`, `bdsm.ts`, `oralna-intimita.ts` aj `strom.ts`; treba audit hĺbky a súhlasu, nie nový modul;
- **brucho/pupok** už sú v `fetise.ts`, `bozky-dotyky.ts`, `predohra-naladenie.ts`, `dlhodoba-intimita.ts` a `strom.ts`;
- **cuckquean** je reálna zrkadlová medzera, ale patrí do rozšírenia `zdielanie-partnera.ts`, nie medzi úplne novú rodinu tém;
- **výmena vedenia muž ↔ žena** sa nemá formulovať ako „výmena rodu“; vedenie, penetrácia, prijímanie a dominancia sa majú oddeliť od rodovej identity;
- **interracial/BBC** nie je neutrálna „preferencia partnera“ na doplnenie. Ak sa spracuje, tak ako kultúrny/racializovaný erotický skript, exotizácia a hranice partnera — nie katalóg farby tela alebo mýtov o veľkosti;
- **postihnutie partnera/devotee** sa nesmie ponúkať ako hodnotiaci typ tela. Relevantná je túžba, afirmácia, dostupnosť a ochrana pred fetišizáciou človeka;
- **step roleplay, bad boy/zločinec, sex s kolegom či kamarátom** sú scenáre existujúceho `roleplay.ts`/fantázií; názov postavy sám osebe neodôvodňuje samostatnú tému;
- reklamný PR Lovehoney, Wikipedia parafílie a pornografické rebríčky sú nanajvýš radar C/D, nie odborný dôkaz priority.

### Nové systémové zistenie z porovnania

Najväčšiu hodnotu neprinesie 71 nových modulov, ale priečne osi použiteľné v každej téme:

1. **chcem prijímať / chcem poskytovať / ako reagujem na partnerovu túžbu**;
2. **fantázia / zvedavosť / reálny záujem / skúsenosť / tvrdá hranica / N/A pre moje telo**;
3. **dnes dostupné vs. všeobecná preferencia**;
4. **rola a dynamika oddelená od anatómie a rodovej identity**;
5. otvorené pole pre jazyk a prax, ktorú v taxonómii ešte nemáme.

## Veci, ktoré už máme široko a netreba znovu zakladať

- bozky, celé telo, prsia/bradavky, vulva/klitoris, penis/predkožka, prstovanie, handjob, cunnilingus, felácia, anilingus;
- vaginálna a análna penetrácia, fisting, prostata, polohy, tempo, edging, orgazmus, ejakulácia/dokončenie;
- masturbácia sólo aj spolu, sledovanie, vedená masturbácia;
- vibrátory, dildá, strap-on, análne hračky, krúžky, masturbátory, diaľkové hračky a sex machine aspoň ako položka;
- základ BDSM: D/s, bondage, impact, verbálne poníženie, kontrola orgazmu, chastity, vosk, elektro, pet play, CNC a edge screening;
- roleplay, oblečenie/materiály, časti tela, sliny a ďalšie tekutiny, voyeur/exhib, trojky, skupiny, swinging, hotwife/cuckold a CNM;
- sexting, fotky/video, porno, erotická literatúra, VR a app ovládanie;
- tehotenstvo/pôrod, cyklus, menopauza, chronické ochorenie, mobilita a neurodiverzita aspoň na úrovni screeningu.

## Odporúčané poradie implementácie

1. **Anatómia + rod + oslovenia** ako základné vetvenie; následne trans muži, širšia trans žena, nebinárni a intersex.
2. **Skutočné queer páry a ace spektrum**, aby dotazník nepredpokladal jediný typ páru ani jediný dôvod na intimitu.
3. **Asymetria dávania/prijímania, rough sex, praise/service/primal** — veľká praktická hodnota a relatívne malý počet nových blokov.
4. **Reprodukčná erotika, zdravotné prechody a dostupnosť**.
5. **AI/digisexualita a médiá**.
6. **P2 katalóg** po skupinách; nie ako jeden dlhý fetišový zoznam.

Každý nový modul má zachovať dve osi: **čo túži respondent** a **ako reaguje na túžbu partnera**. Pri tabu témach treba oddeliť „vzrušuje ma vo fantázii“ od „chcem v realite“. Vrodené telesné črty partnera sa nemajú ponúkať ako hodnotiaci katalóg.

## Zdrojová matica

### Populačné, medzinárodné a plné dotazníky

- WHO SHAPE, plný 72-stranový dotazník: https://cdn.who.int/media/docs/default-source/reproductive-health/sexual-health/who-hrp-sexual-practices-questionnaire.pdf
- WHO SHAPE, vývoj a kognitívne testovanie so 645 ľuďmi v 19 krajinách: https://pubmed.ncbi.nlm.nih.gov/39611192/
- Natsal-3, 15 162 dospelých vo veku 16–74: https://www.natsal.ac.uk/researchers/natsal-3/
- Natsal-3, plný dotazník vrátane funkcie, menopauzy, liekov, neplodnosti a IVF: https://doc.ukdataservice.ac.uk/doc/8178/mrdoc/pdf/8178_natsal_3_questionnaire.pdf
- NSSHB, plný questionnaire supplement: https://www.stat.cmu.edu/~brian/303-2012-full/303-2011/0-survey%20examples/nsshb/Final%20JSM%20NSSHB%20Supplement.pdf
- UCSF National Sexual Health Survey, 118-stranový nástroj: https://prevention.ucsf.edu/research-project/national-sexual-health-survey-nshs
- Herbenick et al., Sexual Diversity in the United States, 50+ správaní: https://pubmed.ncbi.nlm.nih.gov/28727762/
- Herbenick et al., Sexual Repertoire, Pleasure and Orgasm: https://pubmed.ncbi.nlm.nih.gov/36151751/
- GeSiD, praktiky naprieč nemeckými generáciami: https://pubmed.ncbi.nlm.nih.gov/32289843/
- Rough sex, reprezentatívna vzorka USA: https://pubmed.ncbi.nlm.nih.gov/41188511/
- Rough sex, nemecká vzorka: https://pubmed.ncbi.nlm.nih.gov/38686462/
- International Sexual Desire Inventory, 42 krajín: https://pubmed.ncbi.nlm.nih.gov/39560207/
- Sexuálne normy v piatich krajinách: https://pubmed.ncbi.nlm.nih.gov/40385310/
- Motívy používania porna u žien v 42 krajinách: https://pubmed.ncbi.nlm.nih.gov/39945771/

### Fantázie, potešenie a kink — odborné zdroje

- Joyal et al., 55 fantázií: https://pubmed.ncbi.nlm.nih.gov/25359122/
- Wilson Sex Fantasy Questionnaire a štyri dimenzie: https://pmc.ncbi.nlm.nih.gov/articles/PMC6465618/
- Prehľad nástrojov merania sexuálnych fantázií: https://pmc.ncbi.nlm.nih.gov/articles/PMC10048620/
- Nemecký prehľad WSFQ/MSFQ/FSFQ a ďalších inventárov: https://pmc.ncbi.nlm.nih.gov/articles/PMC11176224/
- Korpus 250 000 anonymných erotických fantázií: https://pubmed.ncbi.nlm.nih.gov/30796633/
- Techniky vaginálneho potešenia: https://pubmed.ncbi.nlm.nih.gov/33852604/
- Techniky análneho potešenia žien: https://pubmed.ncbi.nlm.nih.gov/35767540/
- BDSM fantázie a 54 aktivít/14 fetišov v Belgicku: https://pubmed.ncbi.nlm.nih.gov/28781214/
- Medzinárodný BDSM prieskum: https://pubmed.ncbi.nlm.nih.gov/37647344/
- Nórsky výskum BDSM/roleplay a spokojnosti: https://pubmed.ncbi.nlm.nih.gov/34279153/
- Zmyslové, erotické a sexuálne správania žien v kink komunite: https://pmc.ncbi.nlm.nih.gov/articles/PMC4379392/
- Pup play community survey: https://pubmed.ncbi.nlm.nih.gov/35467172/
- UK pet play, adult age play/ABDL, furry a ďalšie fetiše: https://pubmed.ncbi.nlm.nih.gov/40334712/

### Queer, trans, intersex a ace

- Transmaskulínna/nebinárna dysfória a sexuálne akty: https://pubmed.ncbi.nlm.nih.gov/35449364/
- Používanie tela transmaskulínnymi/nebinárnymi ľuďmi počas sexu: https://pubmed.ncbi.nlm.nih.gov/38596469/
- Transmasculine Sexual Health Assessment: https://pubmed.ncbi.nlm.nih.gov/36930204/
- Rodovo rozmanité potešenie a heteronormatívne skripty: https://pubmed.ncbi.nlm.nih.gov/36810636/
- Fetišizácia trans a nebinárnych ľudí: https://pubmed.ncbi.nlm.nih.gov/33763803/
- Sexualita dospelých s DSD/intersex variáciami, dsd-LIFE: https://pubmed.ncbi.nlm.nih.gov/31034334/
- Intersex/DSD sexuálne potreby a jazyk, kvalitatívna štúdia: https://pmc.ncbi.nlm.nih.gov/articles/PMC10128427/
- Ace/gray/demi rozdiely: https://pubmed.ncbi.nlm.nih.gov/34919461/
- Wanting verzus willingness na ace spektre: https://pubmed.ncbi.nlm.nih.gov/31799860/
- Top/bottom ako identita a správanie: https://pubmed.ncbi.nlm.nih.gov/29220585/
- Zhoda ideálnej a reálnej roly u gay/bi párov: https://pubmed.ncbi.nlm.nih.gov/29858726/
- Empirická štúdia mužov identifikujúcich sa ako „side“: https://www.tandfonline.com/doi/pdf/10.1080/00918369.2023.2208250
- SWASH, lesbické, bi a queer ženy: https://www.researchgate.net/publication/345088979_Women_in_contact_with_the_Sydney_LGBTIQ_communities_Report_of_the_SWASH_Lesbian_Bisexual_and_Queer_Women%27s_Health_Survey_2016_2018_2020
- LGBT Women’s Survey 2023: https://lalgbtcenter.org/wp-content/uploads/2023/10/LGBT-Womens-Survey-Full-2023.pdf
- Hranice heteronormatívnych skriptov a lesbické sexuálne správanie: https://www.frontiersin.org/journals/sociology/articles/10.3389/fsoc.2016.00007/full

### CNM, dostupnosť, zdravie a technológie

- CNM pravidlá — explicitné, implicitné a nezhodné: https://pubmed.ncbi.nlm.nih.gov/34031778/
- Sexuálne dohody trans/cis párov, fluid bonding a maintenance sex: https://pubmed.ncbi.nlm.nih.gov/35412930/
- Multiple Relationships Maintenance Scale, tri medzinárodné vzorky, N = 4 290: https://pubmed.ncbi.nlm.nih.gov/41840193/
- Prehľad výskumu CNM: https://pubmed.ncbi.nlm.nih.gov/36215906/
- Žiarlivosť, súhlas a kompersia: https://pubmed.ncbi.nlm.nih.gov/30607710/
- Sexualita párov po poranení miechy: https://pubmed.ncbi.nlm.nih.gov/35191794/
- Skúsenosť partnerov ľudí po poranení miechy: https://pubmed.ncbi.nlm.nih.gov/36576221/
- Ženy po poranení miechy, vnemy, kontinencia a prispôsobenie: https://pubmed.ncbi.nlm.nih.gov/30140048/
- Chronická bolesť chrbta a prispôsobenie praktík/polôh: https://pubmed.ncbi.nlm.nih.gov/40470001/
- Menopauza, masturbácia a hračky: https://pubmed.ncbi.nlm.nih.gov/40627719/
- AI-podporované sexuálne aktivity v Nemecku: https://pubmed.ncbi.nlm.nih.gov/42265505/
- Digisexualita v Nemecku: https://pubmed.ncbi.nlm.nih.gov/40459929/
- Flexibilita sexuálnych skriptov a sexuálna spokojnosť: https://pubmed.ncbi.nlm.nih.gov/37280188/
- Sexuálna komunikácia a spokojnosť, meta-analýza: https://pubmed.ncbi.nlm.nih.gov/34968095/
- Religiozita a sexuálne správanie v Natsal-3: https://pubmed.ncbi.nlm.nih.gov/36017991/
- Sexuálna posvätnosť, vina a spokojnosť: https://pubmed.ncbi.nlm.nih.gov/35642721/
- Somnofília ako spektrum fantázií a správania: https://pubmed.ncbi.nlm.nih.gov/31729926/
- Náboženské rodinné hranice a sexuálne skripty: https://pubmed.ncbi.nlm.nih.gov/33464432/
- Kultúrne rozdiely vo vzorcoch používania pornografie: https://pubmed.ncbi.nlm.nih.gov/41486650/
- Alkohol, situačné signály a vnímanie súhlasu: https://pubmed.ncbi.nlm.nih.gov/37606319/

### Komunitné checklisty a fóra

- Scarleteen Yes/No/Maybe, vrátane tela, súkromia, vzťahov a odpovede „fantasy/N/A“: https://www.scarleteen.com/read/relationships/yes-no-maybe-so-sexual-inventory-stocklist
- Autostraddle Sex Toy Exploration, plný 5-stranový PDF a giving/receiving: https://www.autostraddle.com/wp-content/uploads/2018/12/SexToyExplorationList-Autostraddle.pdf
- The Duchy, stovky BDSM položiek: https://www.theduchy.com/blogs/bdsm-checklist
- The Duchy, plný 7-stranový checklist: https://cdn.sanity.io/files/vedbawa9/production/7406bdab66aec8dbc368ca0e93efeacfe4dbfd52.pdf
- Temple Scarlet, BDSM aj queer-poly worksheety: https://www.templescarlet.com/printouts
- Lascivity, krátky negociačný a dlhý objavovací checklist: https://www.lascivity.co.uk/bdsm-checklists/
- r/ftm, packer/protéza ako afirmácia alebo dysfória: https://www.reddit.com/r/ftm/comments/1la97pg a https://www.reddit.com/r/ftm/comments/1rnvm1b/does_anyone_else_experience_increased_dysphoria/
- r/asexuality, sex-neutralita, nesexuálna intimita a iniciácia: https://www.reddit.com/r/asexuality/comments/16f4g7u a https://www.reddit.com/r/asexuality/comments/xqhpj8
- r/ChronicPain, fyzická blízkosť, podpora tela a verbálne vedenie: https://www.reddit.com/r/ChronicPain/comments/11zb46v/how_do_you_physically_connect_with_your_partner/ a https://www.reddit.com/r/ChronicPain/comments/da4xcj
- r/polyamory, dohoda verzus predpoklad a prevádzkové hranice: https://www.reddit.com/r/polyamory/comments/12dlsaz a https://www.reddit.com/r/polyamory/comments/1c735df
- r/actuallesbians, stone/pillow ako kompatibilita a hranica, nie automaticky „lenivosť“: https://www.reddit.com/r/actuallesbians/comments/1nbbnjj/who_told_straight_people_what_a_pillow_princess_is/

Komunitné zdroje vyššie sa používajú na formuláciu otázok a hľadanie slepých miest. Neudávajú prevalenciu. Pornografické rebríčky, vyhľadávania a fanfiction sú ešte slabší behaviorálny radar: kliknutie alebo čítaná fantázia neznamená túžbu urobiť to v realite.
