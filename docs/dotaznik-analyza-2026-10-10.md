# Implementácia analýzy dotazníka — 2026-10-10

Zdroj: `analýza dotazníka.docx` z priečinka používateľa. Úplný text bol prečítaný postupne; lokálny pracovný prepis všetkých 2600 odsekov (mimo Git) je v `analyza-dotaznika-source.txt`. Odporúčania dokumentu sú podklady na posúdenie, nie pokyny nadradené zadaniu používateľa a pravidlám projektu.

## Prijaté odporúčania

| Problém zo zdroja | Implementácia |
|---|---|
| Dlhá škála mieša vlastnú chuť, zvedavosť a ochotu | Štyri samostatné postoje podľa existujúceho PREF-2026-09-17: chcem, ochota pre partnera, rozhovor, nie. `obsah/skaly.ts`; aplikované na otázky aktivít v upravovaných témach. |
| Postojová škála nedáva zmysel pri vine, hanbe, dôležitosti či účinku | Samostatné škály frekvencie, dôležitosti, schopnosti, prijatia prejavu a účinku. Konflikt má vlastný výber signálov namiesto hodnotenia „páči sa mi“. |
| Duplicitné samostatné „Iné“ predlžujú formulár | 55 doplnení presunutých do karty pôvodnej otázky; `doplnenieId` umožňuje načítať starý text. |
| Prázdne textové polia nútia vymýšľať odpoveď | 8 konkrétnych viacnásobných výberov: mapy tela, vynechané zóny a krátke rituály/blízkosť. Vlastný text zostáva možný aj zachovaný. |
| Detailná anatomická a technická granularita unavuje | Vybrané spresnenia sú zbaliteľné; detaily stimulácie bradaviek sa zobrazia až po príslušnom základnom výbere. |
| Mýty a rady prerušujú odpovedanie alebo navádzajú | 41 existujúcich vysvetľujúcich blokov je zbaliteľných pod vlastným nadpisom. Obsah sa nestratil. |
| Otázky na ďalších partnerov predpokladajú ich relevantnosť | Vlastný kontextový výber otvára príslušné otázky; „žiadne“ je výlučná možnosť. |
| Dlhé objatie môže byť naladením, nielen náhradou sexu | Doplnená samostatná možnosť pri `tnt_len_objatie`. |
| Zdravotné alebo životné okolnosti sa môžu prekrývať | `kon_zdravotne` umožňuje viac odpovedí aj vlastné doplnenie. |
| Nezodpovedaná otázka nemá automaticky otvoriť vetvu „nie je NIE“ | `podmienky.ts` vyžaduje vyplnenú hodnotu pre podmienku `nie`. |
| Rozpracované doplnenie sa stratí pri kliknutí na možnosť | Inline text je riadený lokálnym stavom a existujúcim oneskoreným ukladaním; kliknutie zachová text. |

Obsahové úpravy sú v témach predohra/naladenie, bozky/dotyky, tantra, zmyslová hra, miesta, digitálna intimita, masturbácia, pomôcky, nepenetratívne trenie, tempo, orgazmus, polohy, vaginálna a orálna intimita, rovnaké pohlavie, trans partnerka a roleplay. Opakované návrhy a JSON bloky zo zdroja neboli druhýkrát vložené ako duplicitné otázky. Už prítomné vhodné rozdelenia oblastí a možností zostali zachované.

## Zachovanie odpovedí a rozhodnutia

- ID pôvodných základných otázok zostali zachované. Pôvodné samostatné doplnenia sa iba čítajú v novej karte, bez hromadnej migrácie dát.
- Staré neutrálne, zvedavé alebo odmietavé stupne sa neprekladajú potichu na ochotu. Pôvodný stupeň je viditeľný s výzvou zvoliť nový; bez vlastnej zmeny sa nič neuloží.
- Pôvodný voľný text sa zobrazí ako vlastné doplnenie. Pôvodná jednorazová voľba sa pri viacnásobnom výbere zachová.
- Perspektíva „po čom túži partner“, skúsenostné vetvy, zrkadlenie muža a ženy a existujúce hranice zostali. Zdrojové návrhy odstrániť tieto vrstvy alebo zaviesť univerzálny ženský dotazník odporujú záväznému kontraktu projektu.
- Neboli pridané bezpečnostné checklisty, plánovanie aktivít ani nové zdravotné či vedecké tvrdenia. Návrhy ukončení s automatickým Top 3 alebo garantovanými výsledkami nie sú podkladom na sprevádzkovanie vyhodnotenia.
- Párové vyhodnotenie zostáva vypnuté podľa NEXT-003. Tento audit nerieši jeho serverové overovanie; nepovažuje ho za hotovú funkciu. Ani všetky doterajšie kostry skúsenostných vetiev týmto nie sú dokončené.

## Overenie

`npm run typecheck`; všetky `scripts/verify-dotaznik-*.cjs`, vrátane testov zachovania starých dát, významu škál, vetvenia, výlučnej voľby, oboch pohlaví a skutočného serverového vykreslenia React knihy. Existujúce zdrojové validátory doplnené o načítanie relatívnych dátových importov a dohľadanie presunutých vlastných odpovedí; stále kontrolujú jedinečnosť ID a referencie pôvodných možností.

Test vykreslenia nenahrádza manuálny prechod v prihlásenom prehliadači ani test živého Supabase ukladania. Používateľ následne výslovne schválil priame produkčné nasadenie cez main.
