# Zdroj P681–728 — obsahové spracovanie

Súvisle prečítané a zapracované. 48 odsekov; checkpoint P729. P729–740 iba čítaný kontext, ešte nespracovaný. Téma BDSM nie je globálne uzavretá.

| Odseky | Ciele | Rozhodnutie |
|---|---|---|
| 681–687 | bdsm:rola_dynamika_info, bdsm:bond_vyznam_info | Vedenie/odovzdanie od jemného po autoritatívne; viazanie/držanie/polohy, disciplína, vnímanie dotykov a slov, dôvera a súhlas. Nezaručujeme istotu ani zvýšenú citlivosť. |
| 688–693 | bdsm:bond_obmedzenie_zaujem, bdsm:bond_obmedzenie_zaujem_ine | Tri postoje k vyskúšaniu obmedzenia pohybu a Iné; nie iba už existujúci postoj k prijímaniu či poskytovaniu viazania. |
| 694–699 | bdsm:bond_viazanie_postoj, bdsm:bond_viazanie_postoj_ine | Štyri významy milujem/jemné/pevnejšie/nie, vrátane šatiek a ľahkých pút, Iné. Zdrojové nekompromisné redakčne neznamená neodvolateľnosť súhlasu. Pôvodná bond_intenzita nemá postoj milujem ani odmietnutie; jej hodnoty nemigrované. |
| 700–705 | bdsm:bond_kombinacia_zaujem, bdsm:bond_kombinacia_zaujem_ine | Tri postoje ku kombinácii viazania s orálnym sexom, hračkami či výpraskom; zachované odmietnutie s preferenciou slobodnejšieho pohybu, Iné. Všeobecný záujem neznamená súhlas so všetkými príkladmi. |
| 706–709 | bdsm:rola_dynamika_info | Jemné vedenie aj priama autorita, psychologická intenzita, príkazy/očakávania, komunikácia, hranice a bezpečné slová. Bez návodu či tvrdenia, že intenzívnejšia hra automaticky vytvára dôveru. |
| 710–715 | bdsm:rola_dynamika_postoj, bdsm:rola_dynamika_postoj_ine | Štyri postoje intenzívne/mierne/situácia/rovnováha a Iné. Čím intenzívnejšie tým lepšie upravené na obľubu intenzity v hraniciach, bez neobmedzeného stupňovania. |
| 716–721 | bdsm:rola_autoritativne_vedenie, bdsm:rola_autoritativne_vedenie_ine | Prijímanie priamych autoritatívnych príkazov: áno/mierne s rešpektom/nie a Iné. Nie to isté ako všeobecná rola alebo škála verb_prikazy. |
| 722–728 | bdsm:rola_intenzivna_disciplina, bdsm:rola_intenzivna_disciplina_ine | Intenzívne scény: výprasky, tresty v dohodnutej hre, znehybnenie; tri postoje a Iné. Nie iba intenzita samotného výprasku. |

40 explicitných volieb a 12 polí Iné, vrátane rodových opakovaní. Každé Iné má samostatný textový vstup. JSON zachováva celé pôvodné znenie a jednotlivé možnosti. Existujúce otázky na rolu/intenzitu/všeobecný postoj nezachytávali všetky tieto významy. Šesť zdrojových otázok doplnených pod novými ID; staré odpovede bez migrácie. Vedľajšia konkrétna oprava rola_ktora: tri ženské formulácie boli zobrazované aj mužom, teraz m/z, rovnaké hodnoty.

## Externý podklad a redakčné zmeny

[RAINN: Consent 101](https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust/), priamo načítané 2026-09-18: dohoda konkrétna, priebežná a odvolateľná. Použité na rámcovanie vedenia, kombinácií a autority. Zdrojové nekompromisné a čím intenzívnejšie tým lepšie zostávajú doslova v JSON, v produkte vyjadrujú preferenciu pevnejšieho/intenzívnejšieho priebehu v hraniciach. Nepreberáme ich ako bezlimitný súhlas. Subjektívne účinky oddelené od záruky výsledku. Nepridané technické návody na viazanie ani zdravotné tvrdenia.

## Kontrola

verify-dotaznik-681-728.cjs overuje 48 odsekov, všetky možnosti a Iné, platnosť cieľov a rodové texty. Významový audit nenahrádzajú počty. Finálny typecheck/regresie v progress dokumente; bez browser QA.
