# SDC a cleanup/reclaiming zdroje — úplný inventár a audit (2026-10-02)

Stav: zdrojový inventár pre ďalšie spracovanie. **Nie je to pokyn premeniť každé heslo na otázku.** SDC mieša sexuálne praktiky, identity, vzťahové modely, slang, názvy pomôcok, zdravotné pojmy, bezpečnostné heslá, skratky a prevádzkové výrazy klubov. Pred implementáciou sa každé heslo významovo porovnáva s existujúcim obsahom a s pravidlami v `docs/AI-COLLAB.md`.

## Krátka odpoveď

Nie, pred týmto auditom sme nemali „všetko zo SDC“. Mali sme väčšinu veľkých rodín praktík, ale nie celý slovník a nie všetky jemné dynamiky. Stránka SDC obsahovala pri kontrole **289 hesiel**. Mnohé sú synonymá alebo organizačný slang a do párového dotazníka nepatria. Nové užitočné vrstvy pre aktuálnu tému boli najmä cleanup ako samostatný rituál, reclaiming, služba cuckolda počas stretnutia, obmedzenie jeho rozkoše, soft cuckolding, cuck drop, NRE s treťou osobou a zrkadlová cuckquean dynamika.

## Zdroje pre cleanup, návrat a cuckold službu

| Zdroj | Jedinečný prínos | Stav v dotazníku |
|---|---|---|
| SDC glossary | cleanup ako záverečný orálny rituál; reclaiming; sloppy seconds; cuck drop; cuckquean/cuckcake; soft cuckolding; stag/vixen; sperm competition; chastity/keyholder; NRE | cleanup, reclaiming, sloppy seconds, hotwife/cuckold, chastity a orgazmická kontrola sú zapísané; cuck drop, plná cuckquean vetva a NRE ostávajú pomenovaný backlog |
| JOYclub, nemecké fórum | obliekanie a šperk hotwife; čakanie mimo miestnosti; podávanie nápojov; príprava ženy aj lovera; kľačanie a sledovanie; masáž chodidiel; fotografia/video; privolanie neskôr; cleanup; orgazmus iba na príkaz alebo úplné odopretie; domáca služba | sexuálne a situačné úlohy doplnené do `ck_ulohy_pocas`, `ck_zakazy`, `ck_orgazmus_partner`; všeobecné domáce povinnosti nie sú automaticky sexuálnou preferenciou a zostávajú iba v audite |
| Cuckold.com.ar, španielske fórum | cleanup ako rešpekt, oddanosť, uctievanie ženy a prijatie stôp iného muža; nie iba technické „upratanie“ | zahrnuté v `cleanup_jadro`, `cleanup_ton` a texte `cleanup_myty` |
| The Kink Academy | power exchange + fluid play + service submission; oddanosť verzus poníženie; okamžité alebo odložené očistenie; príkaz, žiadosť alebo dobrovoľné ponúknutie; pravidelný alebo výnimočný rituál; prepojenie s chastity a orgasm denial | zahrnuté v `cleanup_jadro`, `cleanup_prikazy`, `cleanup_ton`, `cleanup_ritual` a `cleanup_partner_tuzi`; všeobecné bezpečnostné poučky patria do centrálnej zdravotnej témy, nie do erotických preferencií |
| Vixen-Games | reclaiming môže byť drsný/vlastnícky, pomalý/zmyselný, iba maznanie či spoločné jedlo; môže byť okamžitý, odložený alebo vôbec nepotrebný | zahrnuté v `navrat_kedy`, `navrat_podoba_spojenia` a `navrat_pokracovanie` |
| VXN Lifestyle | návrat po sólo stretnutí; sex v tú noc alebo na ďalší deň; rozprávanie detailov hneď verzus ich odloženie | zahrnuté v `navrat_kedy`, `navrat_sposob`, `navrat_detaily` a `navrat_pravdivost` |

Presné URL:

- https://www.sdc.com/swingers-terms/
- https://www.joyclub.de/groups/cuckold/forum/t3421770.was_soll_und_darf_der_cucki.html
- https://www.cuckold.com.ar/foros/tema/24
- https://thekinkacademy.com/dictionary/creampie-cleanup/
- https://www.vixen-games.com/2024/07/19/reclaiming-after-watching-your-hotwife/
- https://vxnlifestyle.com/reclaim-sex/

## Čo je po spracovaní priamo v kóde

- `NAVRAT_A_ROZPRAVANIE`: reálny návrat, čas a forma rozprávania, konkrétne otázky, presné detaily, chuť na jazyku, vôňa, bielizeň, telesné stopy, miera pravdivosti a podoba opätovného spojenia.
- `CLEANUP_A_SLUZBA`: vlhké nohavičky so stopami cudzieho semena, vôňa a ochutnávanie, facesitting, očistenie vulvy/stehien/tela, bozk po očistení, príkazy, oddanosť, odmena, moc, poníženie, nálada, rituál a partnerova túžba.
- `CUCKOLDING`: obliekanie partnerky, šperk hotwife, odvoz, nápoje, príprava jej tela, príprava lovera, čakanie, sledovanie, masáž chodidiel, záznam, cleanup, zákaz dotyku/penetrácie/reči, klietka cudnosti a podrobná kontrola orgazmu.
- `face-sitting.ts`: iba kontextový preklik na cleanup rituál; podrobný obsah zostáva na jednom mieste bez duplicity.

## Dôležité medzery odhalené SDC — zapísané, nie automaticky implementované

1. **Cuckquean/cuckcake a hot husbandry:** ženské zrkadlo cuckolda nie je plnohodnotná vetva; jedna zmienka nestačí.
2. **Cuck drop a NRE s bullom/loverom:** emočný pokles po odznení vzrušenia a nové zaľúbenie/posadnutosť treťou osobou sú samostatné skúsenosti, nie iba žiarlivosť.
3. **Soft cuckolding:** flirt, dráždenie, rande a dotyky bez penetrácie máme rozptýlené, ale nie pomenované ako súvislá ľahšia verzia.
4. **Sperm competition:** vhodné iba ako opatrne formulovaný mýtus/hypotéza, nie biologická istota ani návod.
5. **Felching, gokkun a ďalšie fluid scenáre:** časť je pokrytá semenom, snowballingom a cleanupom; treba významový audit, nie ďalšie synonymické otázky.
6. **Swingerské priestory a formáty:** adult theater/arcade, bathhouse, hotel takeover, mat/group room, open-door/closed-door, party house. Časť máme ako klub, hotel a sauna; presná mapa prostredí ešte nie je úplná.
7. **Skupinová choreografia:** airtight, blow bang, spitroasting, tag team, train a moresome treba porovnať s `trojky-skupiny.ts`; názov DP nie je automaticky úplné pokrytie dynamiky.
8. **Menšie telesné a fetišové praktiky:** abrasion, ball stretching, boot worship, electric play/violet wand, Gates of Hell, nyotaimori/nantaimori, pearl necklace, pervertibles, road head, swaffling, teabagging a ticklers sú kandidáti na významový audit.

Predchádzajúci výslovný výber používateľa „ostatné nie“ v globálnom audite sa týmto dokumentom neruší. Tento zoznam uchováva zdroje a slepé miesta; implementuje sa iba to, čo používateľ výslovne vyberie alebo čo priamo patrí do práve spracovávanej témy.

## Úplný inventár SDC — 289 hesiel

Nasleduje úplný názvový snapshot zo stránky pri kontrole 2026-10-02. Definície zostávajú na zdrojovej stránke; pri implementácii sa musí čítať konkrétna definícia, nie iba názov.

```text
420 FRIENDLY
ABRASION
AC/DC
ADULT
ADULT ARCADE
ADULT THEATERS
ADULTS-ONLY
AFTERCARE
AGE PLAY
AIRTIGHT
ANAL
ANAL BEADS
ANAL PLUG
ANAL TORTURE
ANAL TRAINING
ANILINGUS
ARTS
BALL GAG
BALL STRETCHING
BAREBACKING
BATHHOUSES
BBC
BBW
BDSM
BI-CURIOUS
BISEXUAL
BJ
BLACK SHEET PARTY
BLC
BLINDFOLD / BLINDFOLDING
BLOW BANG
BONDAGE
BOOT WORSHIP
BOTTOM
BRAT
BREATH PLAY
BREEDING KINK
BUKKAKE
BULL
BUTT PLUG
BWC
BYOB
BYOC
BYOL
CAN ENTERTAIN
CAN TRAVEL
CANDAULISM
CANING
CANNABIS
CASUAL SEX
CFNM
CHASTITY
CHEATING
CLEANUP (IN CUCKOLDING)
CLOSED DOOR / CLOSED SWINGING
CLOSET SWINGER
CMNF
COCK CAGE
COCK RING
COCK WORSHIP
COLLAR
COMPERSION
CONSENSUAL NON-CONSENT
CONSENSUAL NON-MONOGAMY / CNM
CONSENT
COUGAR
COUPLE / CPL
COUPLE PRIVILEGE / COUPLES PRIVILEGE
CREAMPIE
CROSS SWORDS / CROSSING SWORDS
CROSS-DRESSER / CROSS-DRESSING
CRUISING
CUCK / CUCKOLD / CUCKOLDING
CUCK DROP
CUCKCAKE
CUCKOLDRESS
CUCKQUEAN
CUFFS
CUM
CUM SLUT
CUNNILINGUS
DEMISEXUAL
DILDO
DISCIPLINARIAN
DISCIPLINE
DISCREET / DISCRETION
DOCILE
DOGGY-STYLE
DOMESTIC TRAINING
DOMINANT / DOM / DOMME
DOUBLE ANAL PENETRATION / DAP
DOUBLE PENETRATION / DP
DOUBLE VAGINAL PENETRATION / DVP
DRAG QUEEN / DRAG KING
DUNGEON
DUNGEON MASTER
ED
EDGE PLAY (AKA EDGEPLAY)
EDGING
ELECTRIC PLAY
ELECTROSEX
ELLIS
ENTERTAIN
ERECTILE DYSFUNCTION
EXHIBITIONISM / EXHIBITIONIST
F
FACE SLAPPING
FELCHING
FELLATIO
FEMDOM / FEMALE-LED RELATIONSHIP (FLR)
FEMINIZATION
FETISH
FFM / FMF
FIGGING
FISTING
FLAGELLATION
FLOGGER / FLOGGING
FLUID BONDING
FOREPLAY
FRIEND WITH BENEFITS / FWB
FUCK FRIEND
FULL / HARD SWAP
GAG
GANGBANG
GATES OF HELL
GAY
GENITORTURE
GILF
GLORYHOLE
GOKKUN
GROUP ROOM
GROUP SEX
HALL PASS
HANDLER
HARD LIMIT
HARDCORE
HEAD
HEDONIST
HETEROFLEXIBLE
HETEROSEXUAL
HOGTIE / HOGTYPING
HOMOSEXUAL
HORNY
HOT HUSBANDRY
HOTEL TAKEOVER
HOTWIFE
HOTWIFE ANKLET
HOTWIFING
HUMILIATION
HUNG
ICE PLAY
IMMOBILIZATION
IMPACT PLAY
IRL
ISO
KEYHOLDER
KINK
LEATHER
LEATHER DADDY / DOM / MOMMY / DOMME
LESBIAN
LIFESTYLE
LOVER
LTR
MANUAL STIMULATION
MASOCHISM / MASOCHIST
MASOCHISTIC CUCKOLD
MASTER
MASTURBATION
MAT ROOM
MEDICAL ROLEPLAY
MEET FOR PLEASURE
MENAGE A TROIS
MENTAL HEALTH
METAMOUR
MFM / MMF
MILF
MISTRESS
MONO POLY / MONO POLYAMORY
MORESOME
MUNCH
MUTUAL MASTURBATION
NANTAIMORI
NASCA
NEWBIE
NIPPLE CLAMPS
NIPPLE RINGS
NRE / NEW RELATIONSHIP ENERGY
NSA
NYOTAIMORI
OPEN
OPEN DOOR SWINGING
ORAL SEX
ORGASM
ORGASM CONTROL / DENIAL
ORGY
OTK
PADDLING
PARTY
PARTY HOUSE
PEARL NECKLACE
PEGGING
PERVERTIBLE
PET PLAY
PHYSICAL HEALTH
PLAY PARTNER
POLY / POLYAMORY / POLYAMOROUS
POWER EXCHANGE
PRIMAL
PRO
PUSSY WORSHIP
QUEEF / QUEEFING
RACK
RAVAGEMENT FANTASY
RECLAIMING
RESTRAINT
RIGGER
RIMMING
RISK AWARE SEX
ROAD HEAD
ROLEPLAY
ROPE BUNNY
ROPE BUNNY / BOTTOM
S&M
SADISM / SADIST
SAFE SEX
SAFE WORD
SAINT ANDREW'S CROSS
SAPIOSEXUAL
SENSATION PLAY
SEX CLUB
SEX TOYS
SEXUAL HEALTH
SHIBARI
SISSY
SLAVE
SLOPPY SECONDS
SLUT
SMALL PENIS HUMILIATION (SPH)
SNOWBALLING
SODOMY
SOFT CUCKOLDING
SOFT LIMIT
SOFT SWAP
SOFT SWINGERS
SOLO POLY / SOLO POLYAMORY
SPANKING
SPERM COMPETITION
SPITROASTING
SQUIRTING
STAG
STD
STEALTHING
STI
STRAIGHT
SUB DROP / DOM DROP
SUBMISSIVE
SWAFFLE / SWAFFLING
SWAPPING
SWF
SWINGER
SWINGER HOUSE PARTIES
SWINGERS CLUB
SWINGERS LIFESTYLE
SWINGING
TAG TEAM
TAINT
TANTRA / TANTRIC
TEABAGGING
THREESOME
TICKET
TICKLERS
TOP
TOPPING FROM THE BOTTOM
TOY
TRAIN
TRIAD
TROILISM
UNICORN
UNICORN HUNTING
VAGINISMUS
VAGINITIS
VALIDATION
VANILLA
VIBRATOR
VIOLET WAND
VIXEN
VOYEURISM
WATER SPORTS / WATERSPORTS
WIFE SHARING / WIFE SWAPPING / WIFE WATCHING
```

## Čo sa zo slovníka nesmie slepo prenášať

- **Rasové a telesné pornografické štítky** (`BBC`, `BLC`, `BWC`, `hung`) nie sú vhodný katalóg vrodených tiel partnera; platí pravidlo č. 7 v `AI-COLLAB.md`.
- **Klubová prevádzka a profilové skratky** (`BYOB`, `BYOC`, `BYOL`, `IRL`, `ISO`, `LTR`, `NASCA`, `SWF`, `ticket`, `can entertain/travel`) nie sú intímne preferencie.
- **Bezpečnostné a zdravotné heslá** sa nevkladajú medzi erotické otázky; patria do centrálneho zdravotného/súhlasového modulu.
- **Synonymá** nevytvárajú nové témy: BJ/head/fellatio, anal plug/butt plug, cuck/cuckold, threesome/ménage à trois, oral/anilingus/cunnilingus/fellatio a podobne sa mapujú na jeden obsah.
- **Identity a orientácie** nie sú automaticky praktiky. Majú význam pre vetvenie a sebapopis, nie ako zoznam „čo chceme skúsiť“.
- **Komunitná zmienka nie je údaj o prevalencii.** Fórum ukazuje jazyk, scenáre a slepé miesta; nehovorí, koľko ľudí ich chce.
