# Audit prepojenia tém na plný obsah

Stav: 2026-10-02

## Potvrdená chyba a oprava

Samostatná téma `telesne-tekutiny/semeno` používala generický walker so štyrmi seed položkami, hoci v `fetise.ts` už existoval podrobný blok `SEMENO`. Preto používateľ videl orezanú otázku „Ejakulácia na telo — kam je to v poriadku“.

Opravené presným registrovaním samostatných detailných tém:

- `telesne-tekutiny/prirodzenost`
- `telesne-tekutiny/semeno`
- `telesne-tekutiny/menstrualna-krv`
- `telesne-tekutiny/watersports`
- `dirty-talk-oslovenia/ton`
- `dirty-talk-oslovenia/obsah`
- `dirty-talk-oslovenia/oslovenia`
- `dirty-talk-oslovenia/jazyk-tela`

Otázka miest ejakulácie teraz oddeľuje tvár, dve možnosti úst, vlasy, krk/ramená, prsia, hruď, brucho, podbruško, vulvu, penis/semenníky, hrádzu, stehná, zadok, chrbát, ruky, chodidlá, oblečenie, vagínu a anál. Každé významné miesto má aj samostatnú m/ž postojovú otázku.

Rovnaký mechanizmus orezával aj dirty talk: plný blok bol iba vo všeobecnom fetišovom sprievodcovi, kým štyri stránky F6 používali krátke seed položky, pri osloveniach najmä meno, „zlato“, „miláčik“ a titul. Teraz majú presné bohaté route: tón a načasovanie; obsah hovorenia; oslovenia od nehy cez role a vlastníctvo po erotickú degradáciu; jazyk tela a genitálií. Obsah zahŕňa prijímanie aj poskytovanie, reakciu na partnerovu túžbu, fantáziu verzus realitu a mýty.

## Prečo sa to stalo

Strom dotazníka a register bohatého obsahu sú dve samostatné vrstvy. Existencia podrobného bloku v širokej téme automaticky neprepojila rovnomennú L3 stránku. Bez presného `${modul}/${tema}` záznamu stránka spadla do generického walkera a zobrazila iba krátky zoznam z `strom.ts`.

## Automatická prevencia

- `npm run verify:dotaznik-routing` kontroluje, že každý exportovaný `TemaObsah` je registrovaný.
- Kontroluje povinné detailné route v module telesných tekutín.
- `node scripts/verify-dotaznik-rich-routing.cjs --report` vypíše moduly, kde sa bohatá téma nachádza vedľa generických súrodencov.
- Záväzné pravidlo presnej kontroly route je v `docs/AI-COLLAB.md`, bod 13.

## Zostávajúci radar na významový audit

Nasledujúce moduly majú aspoň jednu detailnú tému a zároveň samostatné generické súrodenecké stránky. Nie každá je chyba: niektoré sú úmyselné jednoduché zoznamy alebo prekrývajúce sa vstupy. Každú však treba pri ďalšom spracovaní otvoriť cez jej presnú route a rozhodnúť: samostatný plný obsah, zlúčenie do nadradenej témy alebo odstránenie duplicitného vstupu.

- A1 Mentálna príprava, túžba a dlhodobá intimita
- A3 Miesta a prostredie
- A4 Predohra a naladenie
- A5 Komunikácia počas a po
- B1 Bozky, dotyky a manuálna stimulácia
- B4 Zmyslová hra
- B6 Manuálna stimulácia a sólo aktivity
- B7 Nepenetratívne trenie
- C1 Orálna intimita
- C4 Kombinácie a polohy s dynamikou
- D1 Vaginálna penetrácia
- D2 Anál a stimulácia zadku
- D3 Polohy
- D4 Tempo, intenzita a orgazmus
- D5 Orgazmus a jeho kontrola
- E1 Erotické pomôcky a hračky
- F1 BDSM a mocenská dynamika
- F8 Roleplay a scenáre
- G3 Fetiše, tekutiny a prirodzenosť — zostáva ženská ejakulácia/squirting
- H1 Interakcie s rovnakým pohlavím
- H3 Trojky, skupiny a gangbang
- H7 CNM/ENM a vzťahové štruktúry
- H8 Digitálna a diaľková intimita
- I1 Súhlas, bezpečie a komunikácia
- I2 Zdravie, ochrana a hygiena
- I3 Telo, hanba a citlivé miesta

Tento radar sa nesmie riešiť mechanickým nakopírovaním celej nadradenej témy. Cieľom je odstrániť orezanie bez vytvárania duplicitných otázok.
