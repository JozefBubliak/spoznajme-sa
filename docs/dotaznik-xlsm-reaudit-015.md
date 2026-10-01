# XLSM-015 — análne hračky a kontrola opakovaných vulválnych tém

Dátum: 2026-10-01  
Vstup: príloha „Análne hračky – preferencie a túžby…“  
Rozsah: **305 riadkov**, prečítaných súvislo od začiatku do konca. Presné P-ID čaká na spárovanie so zdrojovým XLSM.

## Súvislá mapa zdroja

| Riadky | Obsah | Výsledok |
|---:|---|---|
| 1–19 | Análny kolík: žena prijíma, muž prijíma od partnerky | Pokryté postojom prijímania; rozšírené aj o poskytovanie, sólo a reakciu na partnerovu túžbu |
| 20–36 | Vibračný kolík pre ženu a muža | Zachovaný samostatný typ; doplnené pocity vibrácií, pulzovania, pohybu a rozdielna prostata/predná stena |
| 37–53 | Diaľkovo ovládaný análny vibrátor v oboch smeroch | Rozšírené o ovládača, automatický/hudobný režim, domácu, verejnú a geograficky vzdialenú hru |
| 54–70 | Análne korálky pre ženu a muža | Rozšírené o rytmus pred orgazmom, pri orgazme, po jednej aj pohyb dnu–von počas stimulácie |
| 71–87 | Análne dildo: sólo a partnerská stimulácia | Zachované ako typ; doplnené tvary, textúry, zakrivenie a vnútorné pocity |
| 88–104 | Súčasná vaginálna/análna alebo penisová/análna stimulácia | Premietnuté do kontextov hračiek a existujúcej kombinácie dvojitej stimulácie |
| 105–121 | Prostatický vibrátor a poskytovanie partnerovi | Pokryté v samostatnej prostatickej vetve; ponuka hračiek rozšírená o vibračný, rotačný a hands-free stimulátor |
| 122–172 | Detailný úvod; kolík prijíma/poskytuje/užíva sólo žena aj muž | Všetkých šesť perspektív zlúčených bez opakovania do prijímania, poskytovania a sólo používania s plným m/ž znením |
| 173–204 | Vibračné a diaľkovo ovládané kolíky; fantázie doma aj mimo domu | Zachované túžobné obrazy; doplnené tajomstvo pod oblečením, sledovanie reakcie, úlohy a odmena |
| 205–220 | Korálky pri orgazme a vlastnej stimulácii | Zachované a rozšírené o viac než jediný „orgazmický“ scenár |
| 221–226 | Diskrétne pomôcky, netradičné miesta a navigačné karty | Diskrétne nosenie prenesené do hračiek; všeobecné odkazy a bezpečnostný katalóg sa neduplikovali |
| 227–250 | Opak: vulva/klitoris, tlak, pohyb a dynamika | Porovnané s XLSM-014; konkrétne voľby už pokrýva podrobnejšia mapa v `bozky-dotyky.ts` |
| 251–272 | Opak: vaginálne prstovanie, počet prstov, pohyby a vlhkosť | Porovnané po možnostiach s XLSM-014; bez druhej kópie otázok |
| 273–287 | Opak: cunnilingus a kombinácia s rukou | Porovnané s rozšírenou témou v `oralna-intimita.ts`; bez duplicít |
| 288–305 | Opak: klitorisové hračky, komentár a všeobecné partnerove tipy | Hračky aj vlastný opis už pokryté; generické rady sa neprenášali |

## Proaktívne doplnenia

- **Typy:** malé/stredné/veľké kolíky, nositeľné, vibračné, diaľkové/app, rotačné/pulzujúce, nafukovacie, stupňované sady, korálky, dildo, prostatický stimulátor, presný prútik, kov/sklo a ozdobný alebo chvostový kolík.
- **Pocity:** pokojná plnosť, tlak pri otvore, hĺbka, vibrácie, pulzy, rotácia, prostata/predná stena, hmotnosť a teplotný kontrast.
- **Tvar a materiál:** mäkký verzus pevný, hladký verzus textúrovaný, plné telo s úzkym krkom, stupňovanie, zakrivenie a vyššia hmotnosť.
- **Kontexty:** sólo, partner zavádza, respondent zavádza, orál, manuálna stimulácia, vaginálna alebo penisová stimulácia, orgazmus, nosenie a hra s mocou.
- **Druhá dimenzia:** samostatná otázka na to, ako respondent prežíva túžbu partnera používať hračku na sebe alebo na respondentovi.
- **Mýty a tabu:** kolík nie je iba „príprava“, väčšie nie je automaticky lepšie, vibrácia negarantuje prostatický orgazmus, korálky nemajú jediný správny okamih a mužská análna túžba neurčuje orientáciu ani mužnosť.

## Rešerš a pravidlá

Akademické zdroje o technikách anal surfacing/shallowing/pairing, erogénnych mapách a ženskej análnej slasti spolu s komunitnými skúsenosťami o plnosti, korálkach, prostatických pomôckach a diaľkovom ovládaní sú zapísané v hlavičke `src/lib/dotaznik/obsah/analna-penetracia.ts`.

Pri dotknutej téme boli staré všeobecné safety/hygienické/semaforové bloky premenené na konkrétne erotické preferencie, atmosféru, kontrasty, vedenie a doznievanie. Existujúce ID odpovedí zostali zachované.

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 93 statických ID v `analna-penetracia.ts` je unikátnych; rodový sken aj `git diff --check` PASS. Bežný `npm run typecheck` bol blokovaný iba cudzím zámkom/ochranou súboru `tsconfig.tsbuildinfo`.
