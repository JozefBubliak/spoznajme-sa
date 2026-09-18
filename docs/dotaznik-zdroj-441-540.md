# Zdroj P441–P540 — obsahové spracovanie

Súvislé čítanie pôvodných odsekov bez dedupu, otázky a možnosti priradené podľa významu. Implementačný checkpoint P541; P541–580 už prečítané ako kontext, ešte nespracované. Témy ostávajú otvorené do konca globálneho priechodu.

| Odseky | Bloky zmyslova-hra.ts | Rozhodnutie |
|---|---|---|
| P441–449 | zmyslova-hra:cuc_ritual_info, zmyslova-hra:cuc_ritual_skusenost, zmyslova-hra:cuc_ritual_skusenost_ine, zmyslova-hra:cuc_vedome_privoniavanie | Vôňa krku/zápästí/vlasov, rituál a päť skúseností/postojov. Doplnená skúsenosť odlišná od pôvodnej všeobecnej škály záujmu. |
| P450–457 | zmyslova-hra:cuc_oleje_info, zmyslova-hra:cuc_oleje_pouzivanie, zmyslova-hra:cuc_oleje_pouzivanie_ine | Kokos/santal/pačuli; zachovaných päť odpovedí. Tvrdenie, že oleje určite zvýraznia a neprehlušia vôňu, nahradené osobným vnímaním. Zdravotný kontext je výskumný doplnok. |
| P458–467 | zmyslova-hra:cuc_aroma_info, zmyslova-hra:cuc_aroma_skusenost, zmyslova-hra:cuc_aroma_skusenost_ine | Aromaterapia: päť odpovedí vrátane neistoty o účinku a nedôležitosti. Žiadna záruka relaxácie či túžby. |
| P468–475 | zmyslova-hra:cuc_aroma_info, zmyslova-hra:cuc_vone_vyber, zmyslova-hra:cuc_preferovane_vone | Všetky štyri vône a žiadna obľúbená + Iné. Prívlastky zo zdroja zachované v nápovede ako subjektívne asociácie; odstránené stereotypné priraďovanie jazmínu ženám. Multi umožňuje viac vôní; žiadna sa má voliť samostatne. Pôvodná textová otázka zachovaná, dáta sa nemenia. |
| P476–483 | zmyslova-hra:cuc_masaz_info, zmyslova-hra:cuc_masaz_skusenost, zmyslova-hra:cuc_masaz_skusenost_ine | Spojenie tepla rúk, dotyku a vône; päť konkrétnych skúseností/postojov a vlastná odpoveď, nie iba záujem o masáž. |
| P484–491 | zmyslova-hra:cuc_prostredie_info, zmyslova-hra:cuc_prostredie_prvky | Tri prvky spoločného zmyslového prostredia a Iné; súvisí s osv_typ/osv_priprava_detaily v miesta-prostredie, ale tu zdroj zisťuje spoločný výber vrátane hudby, nie iba úpravu či význam poriadku. |
| P492–497 | zmyslova-hra:cuc_prostredie_frekvencia, zmyslova-hra:cuc_prostredie_frekvencia_ine | Denná pravidelnosť / špeciálne príležitosti / výnimočná nálada. Nie ekvivalent frekvencie nových miest alebo hotelových večerov. |
| P498–506 | zmyslova-hra:chut, zmyslova-hra:chu_jedlo_info, zmyslova-hra:chu_jedlo_postoj, zmyslova-hra:chu_jedlo_postoj_ine, zmyslova-hra:chu_co | Ovocie, šľahačka, čokoláda, kŕmenie/ochutnávanie na tele; neutralizované hodnotenie dokonalé spestrenie. Tri postoje a Iné. |
| P507–514 | zmyslova-hra:chu_prenos_info, zmyslova-hra:chu_prenos_skusenost, zmyslova-hra:chu_prenos_ochota, zmyslova-hra:chu_prenos_ine | Päť pôvodných možností rozdelených na skúsenosť a štvoricu aktuálnej ochoty. Rád/rada ak chceš aj ty zachované, možno nie je súhlas. Iná/žiadna skúsenosť sú redakčné doplnenia. |
| P515–522 | zmyslova-hra:chu_kombinacia_info, zmyslova-hra:chu_kombinacia_postoj, zmyslova-hra:chu_kombinacia_postoj_ine, zmyslova-hra:chu_kombinacia_tekutin | Zachované telesné tekutiny a všetky príklady chutí; neutrálne vysvetlenie a zdravotný doplnok. Tri zdrojové odpovede oddelené od starej šesťbodovej škály, ktorá ostáva bez migrácie uložených dát. |
| P523–530 | zmyslova-hra:chu_napoj_info, zmyslova-hra:chu_napoj_postoj, zmyslova-hra:chu_napoj_postoj_ine | Nápoj pri bozku: víno/džús, tri postoje vrátane pripravenosti m/z a Iné; nezlúčené s otázkou o telesných tekutinách. |
| P531–538 | zmyslova-hra:chu_alkohol_info, zmyslova-hra:chu_alkohol, zmyslova-hra:chu_alkohol_ine | Existujúca otázka už pokrýva tri významy; pridané Iné a likéry do vysvetlenia. Hodnoty zachované. Alkohol nie je podmienka ani nástroj presviedčania. |
| P539–540 | zmyslova-hra:chu_co, zmyslova-hra:chu_kde | Samostatný nadpis ochutnávania pokožky pokrytý existujúcou voľbou bozky_ochutnavanie a otázkou na miesta tela. Žiadna ďalšia otázka alebo opis v týchto odsekoch nie je. |

100 odsekov, 96 explicitných možností a 24 polí Iné vrátane rodových opakovaní. JSON obsahuje celé pôvodné znenie a každú jednotlivú možnosť. Nové ID, pôvodné dáta bez migrácie. Pri jeden má Iné samostatné textové pole; pri viac podporovaný vlastný vstup. Mužské/ženské varianty alebo spoločné neutrálne znenie.

## Overené externé doplnky (2026-09-18)

- [NCCIH: Aromatherapy](https://www.nccih.nih.gov/health/aromatherapy): esenciálne oleje pri použití na kožu zriedené; stránka nepodkladá zaručené erotické účinky konkrétnych vôní. Nevyvodzujeme dôkaz neúčinnosti.
- [NHS: Condoms](https://www.nhs.uk/contraception/methods-of-contraception/condoms/): olejové prípravky nie s latexovými kondómami.
- [Devon Sexual Health: Genital hygiene](https://www.devonsexualhealth.nhs.uk/your-sexual-health/genital-hygiene/): parfumované prípravky môžu podráždiť genitálnu pokožku.
- [CDC: Oral sex and STIs](https://www.cdc.gov/sti/about/about-sti-risk-and-oral-sex.html): orálny sexuálny kontakt môže prenášať STI, aj bez príznakov; bariéry znižujú riziko. Neprehlasujeme všetky tekutiny či bozky za rovnaké riziko ani neuvádzame neoverenú mieru rizika.
- [RAINN: Consent 101](https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust/): dobrovoľný, konkrétny a priebežný súhlas; intoxikácia a neschopnosť rozhodovať.

Prvé štyri stránky overené cez oficiálne výsledky vyhľadávania s obsahom; RAINN priamo načítaný. Poetické tvrdenia zdroja sa nezamieňajú za klinické fakty. Zdravotné doplnky nie sú textom pôvodného DOCX. Nepridávané návody na aplikáciu jedla na sliznice ani tvrdenia o cukre a infekciách bez podkladu.

## Kontrola

verify-dotaznik-441-540.cjs overuje všetky referencie, možnosti, Iné a oba rodové texty. Automatická kontrola nenahrádza významové čítanie. Konečný výsledok typecheck a regresií je v progress dokumente. Vizuálna kontrola prehliadača nebola vykonaná.
