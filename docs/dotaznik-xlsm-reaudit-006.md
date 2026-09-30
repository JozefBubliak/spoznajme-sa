# Audit XLSM-006 — Face sitting, bod po bode

Dátum: 2026-09-30. Zdrojová príloha bola prečítaná celá od „ČASŤ II“ po záverečné motto. Keďže vložený text nemá pôvodné hranice buniek, nižšie sú logické bunky/odseky v poradí prílohy. Každý bod bol porovnaný s konkrétnou otázkou, možnosťou alebo textom v `face-sitting.ts`.

| Bunka | Zdrojový bod | Výsledok | Cieľ |
|---|---|---|---|
| D01 | Screening, či tému otvoriť | rieši spoločný témový screening; súbor ostáva registrovanou témou | systém témy |
| D02 | Áno / ešte nie / nie | zachované cez témový screening a vetvu bez skúsenosti | systém témy, `este_nie` |
| D03 | Zdieľanie dôvodu zamknutia | už zapnuté atribútom témy | `zdielanieDovod: true` |
| D04 | Skúsenosť ženy hore | existujúca voľba + podmienená skupina hore | `skusenost`, `hore` |
| D05 | Skúsenosť muža dole | existujúca voľba + podmienená skupina dole | `skusenost`, `dole` |
| D06 | Miera vzrušenia po skúsenosti | päť presných úrovní pre obe roly | `hore_miera`, `dole_miera` |
| D07 | Čo by zlepšilo slabšiu skúsenosť | podmienená textová otázka pre obe roly | `*_miera_zlepsit` |
| D08 | Frekvencia pravidelne / nálada / sporadicky / prispôsobenie | všetky možnosti zachované | `*_frekvencia` |
| D09 | Čo fungovalo a čo zmeniť | nové osobitne pre obe roly | `hore_fungovalo`, `dole_fungovalo` |
| D10 | Fantázia bez ohľadu na skúsenosť | nová spoločná skupina; už nie iba vetva bez skúsenosti | `fantazia_spolocna` |
| D11 | Frekvencia fantázie | nová päťstupňová otázka | `fant_frekvencia` |
| D12 | Sila vzrušenia z predstavy | nová štvorstupňová otázka | `fant_vzrusenie` |
| D13 | Fantázia verzus realita | nový normalizačný text a opravené staré texty bez safety poučky | `fant_normalizacia`, `en_*_pozn` |
| D14 | Ochota: túžim skúsiť | zachované pre obe roly | `en_ochota_*` |
| D15 | Ochota: skúsim pre partnera | zachované | `en_ochota_*` |
| D16 | Možno za podmienok | zachované s textovým doplnením | `en_ochota_*_podmienky` |
| D17 | Iba fantázia | zachované ako samostatná odpoveď | `en_ochota_*` |
| D18 | Nechcem teraz realitu | zachované ako nekomfort | `en_ochota_*` |
| D19 | Otvorená poznámka partnerovi | zachovaná a rodovo zrkadlená | `poznamky_vediet` |
| D20 | Čo komplikuje uvoľnenie | starý hranicový text prepísaný na konkrétnu potrebu | `poznamky_bojim` |
| D21 | Ako začať jednou vetou/gestom | nová otázka | `poznamky_zaciatok` |
| D22 | Hore: moc a kontrola | explicitné lákadlo | `hore_lakadlo.moc` |
| D23 | Hore: intenzita | explicitné lákadlo | `hore_lakadlo.intenzita` |
| D24 | Hore: vôňa | explicitné lákadlo | `hore_lakadlo.vona` |
| D25 | Hore: tabu | samostatná nová otvorená otázka | `hore_tabu` |
| D26 | Hore: uctievanie | explicitná možnosť | `hore_lakadlo.uctievany` |
| D27 | Hore: pohodlie/pasivita | explicitná možnosť | `hore_lakadlo.pasivita` |
| D28 | Vibe dominantný/hravý/jemný | všetky tri možnosti pre obe roly | `*_atmosfera` |
| D29 | Čo zvýši chuť o +2 | nová otvorená otázka | `hore_plus_dva` |
| D30 | Hore: tlak/pohyb/jazyk/ruky/rytmus/pauzy | nová mapa vnemov s limitom troch | `hore_pocity` |
| D31 | Hore: partner prosí | opravené nesprávne znenie existujúcej možnosti | `hore_lakadlo.prosim` |
| D32 | Hore: partner poslúcha | nová samostatná možnosť | `hore_lakadlo.poslucha` |
| D33 | Hore: partner aktívny a sebavedomý | opravený subjekt existujúcej možnosti | `hore_lakadlo.sebavedomy` |
| D34 | Kto vedie tempo/tlak | nová rolová otázka | `hore_vedenie` |
| D35 | Slová a frázy pre rolu hore | nová otvorená otázka | `hore_frazy` |
| D36 | Čo odrádza v role hore | stará všeobecná hranica prepísaná na tematický turn-off | `hore_hranice` |
| D37 | Jednovetové zhrnutie hore | nová otázka | `hore_zhrnutie` |
| D38 | Dole: servis/služba | explicitná možnosť | `dole_priahuje.sluzba` |
| D39 | Dole: uctievanie | pokryté lákadlom a worship dynamikou | `dole_lakadlo.uctievanie`, `dole_worship` |
| D40 | Dole: submisivita | explicitná možnosť | `dole_priahuje.submisia` |
| D41 | Dole: vôňa/chuť | explicitná rodová možnosť | `dole_priahuje.vona` |
| D42 | Dole: váha | explicitná možnosť | `dole_priahuje.vaha` |
| D43 | Dole: partner vedie | explicitná možnosť | `dole_priahuje.vedenie` |
| D44 | Byť použitý verzus ocenený | presná dvojvoľba | `dole_dolezitejsie` |
| D45 | Signál: zvuky | explicitná možnosť | `dole_signal.zvuky` |
| D46 | Signál: pohyb tela | explicitná možnosť | `dole_signal.pohyby` |
| D47 | Signál: slovné potvrdenie | explicitná možnosť | `dole_signal.slova` |
| D48 | Signál: tlak/pohyb | nová samostatná možnosť | `dole_signal.tlak` |
| D49 | Mentálny blok: výkon | nová možnosť | `dole_obavy.vykon` |
| D50 | Mentálny blok: dych | existujúca možnosť | `dole_obavy.vzduch` |
| D51 | Mentálny blok: hanba/trápnosť | rozdelené na dve konkrétne možnosti | `dole_obavy.hanba`, `.trapnost` |
| D52 | Mentálny blok: vôňa/chuť | existujúca možnosť bez všeobecnej hygienickej poučky | `dole_obavy.vona` |
| D53 | Mentálny blok: krk/čeľusť | existujúca možnosť | `dole_obavy.nepohodlie` |
| D54 | Čo pomôže uvoľniť sa | konkrétne pauzy, inštrukcie, výkon a dĺžka vĺn | `dole_pomoc` |
| D55 | Dole: pasívna/aktívna/striedaná rola | nová otázka | `dole_rola` |
| D56 | Čo chce osoba dole počuť | nová otvorená otázka | `dole_pocut` |
| D57 | O čom sa ťažko hovorí | nová otvorená otázka bez moralizovania | `dole_nevyslovene` |
| D58 | Ideálne prvé/nové skúšanie | nová otvorená otázka | `dole_prvykrat` |
| D59 | Jednovetové zhrnutie dole | nová otázka | `dole_zhrnutie` |
| D60 | Spoločný tlak ľahký/stredný/silný | zachované tri úrovne | `spol_tlak` |
| D61 | Tempo pomalé/striedané/rýchle | zachované a rozšírené o návaly s pauzami | `spol_tempo`, `TEMPO_MOZNOSTI` |
| D62 | Komunikácia ticho/zvuky/príkazy/pochvaly/dirty talk | všetkých päť možností | `spol_komunikacia` |
| D63 | Worship: „urob mi dobre“ | nová explicitná možnosť | `spol_worship.urob_dobre` |
| D64 | Worship: pochvala | nová explicitná možnosť | `spol_worship.pochvala` |
| D65 | Worship: prosby/príkazy/ponižovanie | existujúce; ponižovanie spresnené na jemné | `spol_worship` |
| D66 | Worship: žiadne slovné prvky | nová možnosť | `spol_worship.ziadne` |
| D67 | Čo ruší v reči | nová tematická turn-off otázka | `spol_rec_turnoff` |
| D68 | Prirodzená vôňa/chuť ako spínač až blok | nová štvorstupňová otázka | `spol_vona_postoj` |
| D69 | Čo pomôže uvoľniť sa pri vôni | nová otvorená otázka | `spol_vona_uvolnenie` |
| D70 | Hanba za prirodzenosť | nový mýtus a normalizácia | `spol_vona_mytus`, `tech_myty` |
| D71 | Dych: iba váha/blízkosť | nová presná voľba | `dych_zaujem.vaha` |
| D72 | Dych: fantázia pohltenia | nová presná voľba | `dych_zaujem.fantazia` |
| D73 | Dych: iba fantázia/symbolika/intenzívna váha/nie | nová štvorvoľba | `dych_podoba` |
| D74 | Čo je na dychovej predstave erotické | nová otvorená otázka | `dych_vzrusenie` |
| D75 | Hore: symbolika/jemný tlak/pohyb/neviem | nová otázka | `dych_hore_forma` |
| D76 | Hore: prečo láka mocenská vrstva | nová otvorená otázka | `dych_hore_preco` |
| D77 | Zdrojové stop-signály a všeobecné hranice | neprenesené; staré safety bloky premenené na obsahové preferencie pri zachovaní ID | — |
| D78 | Spoločný cieľ: orgazmus/moc/zmysly/objavovanie | nová mapa, doplnené uctievanie | `disk_ciel` |
| D79 | Úspech aj pri krátkom zážitku | nová otvorená otázka | `disk_uspech` |
| D80 | Kľúčový detail: slová/tlak/pohľad/vôňa/kontrola/tabu | nová mapa | `disk_detail` |
| D81 | Čo má partner pochopiť | nová otvorená otázka | `disk_pochopit` |
| D82 | Obava a potreba | nová otvorená otázka zameraná na uvoľnenie | `disk_obava` |
| D83 | Jemná/stredná/dominantná verzia | nová otázka s konkrétnym opisom | `disk_verzia` |
| D84 | Spontánne/plánované/rituál/bonus | už pokryté osobitne v oboch rolách | `hore_styl`, `dole_styl` |
| D85 | Túžba byť hore alebo dole a prečo | nová otvorená otázka | `disk_rola_preco` |
| D86 | Tajný spoločný rituál | nová otvorená otázka | `disk_tajny_ritual` |
| D87 | Jedna veta pre partnera | nová otvorená otázka | `disk_veta` |
| D88 | Rebrík krok 1: rozhovor | prenesený ako konkrétny prvý krok | `rebrik_experimentov` |
| D89 | Krok 2: poloha bez tlaku na výkon | prenesený ako geometria tiel bez orálu | `rebrik_experimentov` |
| D90 | Krok 3: jemná verzia a pauzy | prenesený ako kľačanie, ľahký jazyk a približovanie | `rebrik_experimentov` |
| D91 | Krok 4: zmyslový upgrade | hudba, svetlo, vôňa, bielizeň a zrkadlo | `rebrik_experimentov` |
| D92 | Krok 5: hra rolí | uctievanie verzus sebavedomé vedenie | `rebrik_experimentov` |
| D93 | Krok 6: intenzívnejšia verzia | porovnanie stabilného rytmu a vĺn tlaku/pohybu | `rebrik_experimentov` |
| D94 | Krok 7: fantasy prvky | prosba, pochvala, príkaz, poníženie a rituál | `rebrik_experimentov` |
| D95 | Záver: neexistuje jediná správna odpoveď | prepísaný na konkrétnu normalizáciu rozdielnych rolí a motívov bez všeobecnej safety prednášky | `ukoncenie` |
| D96 | Pôvodné mýty o váhe, ponižovaní a vôni | zachované a rozšírené; odstránený hygienický/safety tip | `tech_myty` |
| D97 | Techniky pre ženu hore | overené klitoris, fúkanie, prsty/G-bod, sanie, jazyk, dlhé ťahy, anilingus | `tech_hore_z` |
| D98 | Techniky pre muža hore | overené anilingus, prostata, penis, semenníky a hrádza | `tech_hore_m` |
| D99 | Polohy a kombinácie | overené kľačanie/sed/reverse/kinging, ruky, vibrátor, masturbácia a zadok | `techniky` |
| D100 | Duplicitný text `smother_uvod` | opravený: pôvodné ID ostalo raz, druhá rola má nové unikátne textové ID | `smother_uvod`, `hore_smother_uvod` |

## Autorské rozšírenie nad zdroj

- Face sitting je rozlíšený ako orálna poloha, uctievanie, služba, hra váhy, zmyslovosť aj mocenská fantázia.
- Pribudli intenzívne aj jemné opaky, vôňa/chuť bez hanby, konkrétne techniky, role, scenáre a mýty.
- Rebrík nie je iba všeobecná rada: každý stupeň prináša inú skúsenosť a dá sa použiť ako hotový experiment.
- Všeobecné poučky o súhlase, hygiene, stop-signáloch a bezpečnosti boli odstránené alebo obsahovo premenené; patria do vlastných tém.
