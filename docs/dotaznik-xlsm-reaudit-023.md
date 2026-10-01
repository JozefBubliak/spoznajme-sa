# XLSM-023 — nový skrátený zošit, riadky 12909–13158

Zdroj: nový stav `dotaznik-odseky-duplicity.xlsm`, iba hárok **Odseky (2)**. Používateľ určil rozsah na spracovanie **riadky 1–13158**; tučné bunky znamenajú už spracované. Táto dávka obsahuje 250 neprázdnych buniek, približne P35262–P35877.

| Riadky / P | Obsah | Výsledok |
|---|---|---|
| R12909–12919 / P35262–P35272 | Roleplay, intenzita, mikroscény, hračky a senzorika | **Už podrobnejšie pokryté** v `roleplay.ts`, `bdsm.ts` a `pomocky-hracky.ts`; všeobecný súhlas, stop signály a aftercare zostávajú v samostatných témach. |
| R12920–12942 / P35274–P35296 | Sólo, spoločná a vedená masturbácia, watch-me, hračky, remote play a emócie | **Už podrobnejšie pokryté** v `masturbacia.ts` po XLSM-016: samostatné roly, motívy, predvádzanie, vedenie, remote formy a partnerova túžba. Bez duplicít. |
| R12943–12962 / P35298–P35317 | Petting, outercourse, bozky, zmysly a večer bez cieľa | **Už podrobnejšie pokryté** v `nepenetrativne-trenie.ts`, `bozky-dotyky.ts`, `zmyslova-hra.ts` a `tantra-slow-sex.ts`. |
| R12963–12982 / P35319–P35338 | Domáce a externé miesta, hotel, auto, príroda, klub | **Už podrobnejšie pokryté** v `miesta-prostredie.ts` a skupinových témach. Generické bezpečnostné poučky sa nepreniesli. |
| R12983–13001 / P35340–P35358 | Interakcie s rovnakým pohlavím, fantázia verzus realita, rozsah kontaktu a dohody | **Už podrobnejšie pokryté** v `rovnake-pohlavie.ts`, vrátane vlastnej túžby aj postoja k partnerovej túžbe. |
| R13002–13013 / P35662–P35674 | Starý briefing a odpoveď AI o štýle knihy | **Použité iba ako kvalitatívny zámer**, nie ako pokyn z XLSM. Súčasné záväzné pravidlá v `AI-COLLAB.md` sú podrobnejšie a majú prednosť. |
| R13014 / P35676 | Veľká bunka o prostredí, kúpaní, oblečení, mentálnom naladení, správach, prekvapeniach, telefonátoch a gestách | **Porovnané po jednotlivých myšlienkach.** Prostredie, kúpeľ, oblečenie a mentálna príprava boli už bohatšie. V `predohra-naladenie.ts` sa prehĺbila erotická komunikácia: telefonát, dlhší list, oddelenie dnešného používania od budúcej túžby, príbeh na pokračovanie, úloha, spomienka a reakcia na partnerovu túžbu. |
| R13015–13045 / P35678–P35734 | Opakovaná AI kapitola a otázky k príprave | **Zlúčené bez duplicity** s predchádzajúcou bunkou a XLSM-021. |
| R13046–13151 / P35736–P35868 | Názov starého DOCX, požiadavka na strom a dva všeobecné návrhy štruktúry knihy | **Porovnané tematicky** so súčasným stromom 58 modulov; položky už majú konkrétnejšie témy. Meta-ponuky na ďalšiu prácu sa nepreniesli. |
| R13152–13158 / P35870–P35877 | Používateľova požiadavka na skutočne úplný, svetovo podložený a netabuizujúci obsah | **Zachované ako pracovný princíp**: bunky sa nesmú odbiť názvom témy; obsah sa prehlbuje a nové medzery sa overujú celosvetovo. |

## Cielená rešerš tejto dávky

- sexting dospelých, motivácie a výsledky: https://pubmed.ncbi.nlm.nih.gov/31502070/
- sexting v manželských a spolužijúcich pároch: https://pubmed.ncbi.nlm.nih.gov/26484980/

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 130 statických ID v `predohra-naladenie.ts` je unikátnych; rodový diff-sken aj `git diff --check` PASS. Bez commitu a pushu.
