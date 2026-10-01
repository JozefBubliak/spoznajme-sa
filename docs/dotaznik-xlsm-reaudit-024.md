# XLSM-024 — nový skrátený zošit, riadky 12659–12908

Zdroj: aktuálny `dotaznik-odseky-duplicity.xlsm`, iba hárok **Odseky (2)**. Dávka obsahuje 250 neprázdnych buniek, P34930–P35261. Každá bunka bola prečítaná v poradí a porovnaná s konkrétnym obsahom.

| Riadky / P | Obsah | Výsledok |
|---|---|---|
| R12659–12670 / P34930–P34941 | Sólo a partnerské vlny, teasing cez deň, polohy | **Prehĺbené** v `bozky-dotyky.ts`: kto vedie, počet a tvar vĺn, časovač/náhoda, denné očakávanie a poloha ako experiment. Sólo/partnerská masturbácia už zostáva podrobnejšie v `masturbacia.ts`. |
| R12671–12683 / P34942–P34954 | Zmysly, teplota, hudba, hlas a diaľkové pomôcky | **Zlúčené bez duplicity** so `zmyslova-hra.ts`, `pomocky-hracky.ts` a `digitalna-intimita.ts`; do tempa pribudlo použitie zmyslov ako spôsob udržania vlny. |
| R12684–12709 / P34955–P34980 | Análne/prostatické vlny, korálky, vibrácie a lubrikácia | **Už podrobnejšie pokryté** v `analna-penetracia.ts`, vrátane plnosti, pohybu, vibrácií, korálok, prostaty a remote hry. Generické hygienické/safety karty sa nepreniesli. |
| R12710–12728 / P34981–P35000 | 15/30/45-minútové scenáre, len teasing, kontrasty a debrief | **Prevedené na flexibilné inšpirácie**, nie pevný výkonový protokol: tri vlny, celotelové návraty, zmyslový kontrast a stretnutie bez povinného finále. Aftercare/debrief zostáva v samostatnej téme. |
| R12729–12759 / P35002–P35032 | Súhrn kariet a odkazy na centrálne moduly | **Porovnané po položkách.** Zónové techniky a hračky už boli bohatšie; do tempa pribudla paleta priebehov, signálov a partnerovej túžby. Centrálne consent/safety bloky sa vedome neduplikovali. |
| R12760–12777 / P35034–P35052 | Súhlas, stop signály, hygiena, tretie osoby a digitálny súhlas | **Vedome neprenesené do erotickej témy** podľa záväzného pravidla; samostatné moduly už existujú. |
| R12778–12797 / P35054–P35073 | Menštruácia, tehotenstvo, bolesť, mobilita, alergie a denník | **Už podrobnejšie pokryté** v `specificke-obdobia.ts`, vrátane zdravotných a životných prechodov. Nepravdivé univerzálne zákazy a lekárske skratky sa nepreniesli. |
| R12798–12814 / P35075–P35091 | Emócie, rutina, žiarlivosť, hanba, aftercare a pilot fantázie | **Už pokryté** v `dlhodoba-intimita.ts`, `cnm-enm.ts`, `trojky-skupiny.ts`, `komunikacia-pocas-po.ts` a témach fantázií. |
| R12815–12850 / P35115–P35202 | Slow sex, facesitting, edging, soft power, sliny, chodidlá, materiály a voyeurizmus | **Porovnané po jednotlivých možnostiach** s bohatšími samostatnými témami. Nová hodnota sa zlúčila do tempa; ostatné sa neduplikovali. |
| R12851–12887 / P35204–P35240 | Univerzálny checklist tretej osoby | **Už podrobnejšie pokryté** v `trojky-skupiny.ts`, `swinging.ts`, `zdielanie-partnera.ts` a centrálnych dohodách. |
| R12888–12908 / P35241–P35261 | Roleplay, medical, domáce/fantazijné svety, kostýmy, rekvizity a miesta | **Už podrobnejšie pokryté** v `roleplay.ts`, najmä po globálnom gap audite; bez druhej sady rovnakých otázok. |

## Cielená rešerš

- variabilita pohybu a kombinovania podnetov: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0249242
- start-stop ako skúmaná behaviorálna technika: https://pubmed.ncbi.nlm.nih.gov/31741252/

`bozky-dotyky.ts` dostal túžobný úvod, sedem podôb práce s napätím, vedenie tempa, obsah pauzy, počet vĺn, šesť experimentov, telesné signály, reakciu na partnerovu túžbu a dva mýty. `npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 151 statických ID je unikátnych; rodový diff-sken aj `git diff --check` PASS. Bez commitu a pushu.
