# Produkty DeepTalks — inventár a roadmapa

> Čo máme, čo je rozpracované, čo pridať. Doplnok k `svetove-inspiracie.md` (odkiaľ berieme vzory)
> a k `DeepTalks_Master_Dokument.docx` ČASŤ 2.

## 1. Inventár (stav 2026-09-08)

### LIVE — funguje na webe
| Nástroj | Route | Čo to je |
|---|---|---|
| Konverzačné kartičky „Spoznajme sa" | `/[lang]/apps/spoznajme-sa` | otázky v úrovniach, online + fyzické |
| Herd Vote | `/[lang]/herd-vote` | skupinový kvíz moderátor + hráči cez kód |
| CoupleSync | `/[lang]/apps/couplesync` | partnerský dotazník, oddelené odpovede + mapa zhody |
| Hádačka | `/[lang]/apps/hadacka` | rýchla odhadovacia hra |
| Áno–Nie–Hm | `/[lang]/apps/ano-nie-hm` | tempová party hra |
| Komunikačný kompas | `/[lang]/kompas` | konkrétne vety pre 100+ situácií |

### ROZPRACOVANÉ / roadmap
- **Daily Connection** (`apps/daily-connection`) — denná otázka pre pár, answer-lock, streak. **Priorita č. 1** (Paired model).
- **Otázka dňa** (`apps/otazka-dna`) — 1 denný impulz zadarmo, lead magnet.
- **Legacy / Spomienky** (`produkty/legacy`) — týždenný e-mail starému rodičovi → kniha po roku (StoryWorth model). Najvyššia marža.
- **Dotazník intímnych preferencií** (`/[lang]/dotaznik`) — admin-only, rozostavané. Viď `dotaznik-*.md`.
- **Deep Talk Walk** — audio prechádzka pre dvoch (len roadmapa; vzor Pillow).
- **Nudge engine** (`apps/nudge`) — rozostavané. Viď `BUILD_nudge_engine.md`.
- **B2B icebreaker** — generátor otázok pre porady/teambuilding.

### OFFLINE MINI-NÁSTROJE (`apps/_offline-tools/tools.ts`) — hotové, len rozhádzané
`nezabudni` (generátor darčeka) · `misie` (denné mikro-misie pre neho/ňu) · `rande` (losovanie rande podľa rozpočtu) · **`rozbi-rutinu`** (viď §3) · `car-games` (hry do auta) · `kocky` (intímne kocky).
→ **Rýchla výhra: zjednotiť do jednej sekcie „Rýchle impulzy".**

### PRODUKTY (nákup)
Fyzické kartičky (edície) · Predplatné · Darčekový poukaz · Tričká/merch (`produkty/tricka`) · Legacy · Párový a rodič-dieťa balík.

### KOMUNITA
**Spontánky** (`komunita/spontanky`, + API) — rýchle lokálne stretnutia „ideme tam, pridajte sa" · Akcie · Organizuj vlastné stretnutie.

---

## 2. Čo pridať — po prioritách

### A. Rituály a denné návyky (retencia + predplatné)
1. **Daily Connection naplno** — web push + e-mail, answer-lock, streak, nedeľný kvíz, týždenný súhrn.
2. **Vedené série 7–30 dní** — „Znovu-objavenie", „Jazyky lásky", „Financie bez hádky", „Po dieťati", „Intimita nanovo". 1 mikro-aktivita denne. (Lasting model.)
3. **Rituál vďačnosti** — každý večer 1 veta „ďakujem ti, že…". Pár aj rodina, streak.
4. **Týždenný check-in páru** — „state of the union": čo fungovalo / čo ma trápi / čo potrebujem. (Gottman.)
5. **Ranný/večerný 2-min mikro-rituál** — očný kontakt + 1 otázka + 1 dotyk, notifikácia.

### B. Konverzačné formáty
6. **Story-mód kartičky** (Esther Perel) — nedokončená veta + spôsob rozprávania.
7. **Záverečný rituál** ku každej sade — ručne písaný odkaz „otvor o mesiac".
8. **36 otázok, ktoré vedú k láske** (Aron) — hotový vedený formát + 4 min očný kontakt.
9. **Deep Talk Walk** — audio 20–30 min pre dvoch do slúchadiel.

### C. Generačné/rodinné
10. **Legacy dokončiť** (najvyššia marža, darček).
11. **Rodinný stôl** — 1 otázka k večeri, deti 6+.

### D. Offline / komunita (lacné, virálne — viď `svetove-inspiracie.md` §F–G)
12. **Empty Chair / „Mám 10 minút na tvoj príbeh"** — 2 stoličky na námestí, virálne video (Sidewalk Talk).
13. **Death-Over-Dinner generátor scenára** — web poskladá scenár večere na ťažkú tému.
14. **Phone Jail event** — platený phone-free večer (The Offline Club model).
15. **Before I Die stena** — mestská inštalácia + mapa na webe.
16. **Human Library večer** — „požičaj si človeka", SK/UA komunita.
17. **Odznak/tričko s QR → náhodná otázka** (Tube Chat model) — merch máme, doplniť QR.
18. **Spontánky ako klub** — zvážiť členský model za opakovanie (nie len bezplatná nástenka).

### E. Rýchle výhry z toho, čo už máme
- Zjednotiť offline mini-nástroje do „Rýchle impulzy".
- Otázka dňa ako verejná zdieľateľná stránka + dynamický OG obrázok.
- Kompas → hrateľný: „vytiahni situáciu → dostaneš 3 vety".

---

## 3. „Rozbi rutinu" — redizajn (hotové v `tools.ts`, 2026-09-08)

**Problém starého:** 8 náhodných útržkov bez oblúka („najhoršia selfie", „zbaľ ma v bare pod falošným menom") — trápne, žiadny dôvod vrátiť sa.

**Nový obsah (live):** ~55 konkrétnych výziev v 5 úrovniach:
- **⏱️ Mikro** (5–15 min): výmena telefónov na večer · večera bez slov (kto prehovorí, umýva riad) · telefóny do zásuvky, kľúč susedovi · 5 min len komplimenty · list partnerovi na „o rok"
- **🌙 Večer inak**: večer bez elektriny · vymenené roly · „reštaurácia doma" · 5 surovín naslepo · film bez zvuku (nadabujte si ho) · interview 20 min
- **🧭 Víkend**: mincový výlet · prvé rande 2.0 · deň bez peňazí · prst na mape · vlak nikam · výmena záľub · turisti vo vlastnom meste
- **🪂 Adrenalín**: skok do studenej vody na tri · východ slnka z vrchu · lezecká stena (jeden istí druhého) · les v noci bez baterky · rezervuj si termín na tandem/bungee · postav sa čomu sa jeden bojí · bivak pod hviezdami · kilometer naboso v tichu
- **🔥 Na hrane (odhaliť sa)**: 4 minúty do očí (Aronov experiment) · papierik do spálne · jedna nevypovedaná vec · „kedy si sa pri mne cítil/a sám/sama" · hodina o peniazoch úprimne

**Ďalší krok — séria s progresom** (habit-app / „adventure jar" model):
- Vyber trať (*7 večerov inak · 30 malých odbočiek · Víkend bez plánu · Rok striedania*) → 1 výzva denne, viditeľný oblúk „Deň X z N", eskalácia mierne → odvážne.
- **Streak + pár** (napojiť na pair-kód z dotazníka): obaja vidia rovnaký deň, po „Hotovo" krátka reflexná otázka.
- **Vlastná zásoba** — pridaj vlastné výzvy, appka ich mieša do losovania.
- **Strop intenzity** — používateľ nastaví, kam až chce ísť.
- Po dokončení série → ponuka Daily Connection / kartičky.
