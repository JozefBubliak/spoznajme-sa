# Prieskum zdrojov a kontrola pokrytia

Aktualizovane: 2026-05-29

## Co sme pokryli v databaze

- Spolocne zony od hlavy po prsty na nohach: pery, usta, usi, vlasy, tvar, krk, klucne kosti, plecia, chrbat, hrudnik, bradavky, ruky, pas, boky, brucho, zadok, stehna, kolena, lytka, chodidla a prsty.
- Zenske zony: prsia, vulva, klitoris, kapucna klitorisu, velke a male pysky, vstup do vaginy, oblast mocovej rury, predna stena vaginy, G-zona, A-spot, zenska hradza a zenska analna oblast.
- Muzske zony: penis, zalud, uzdicka, predkozka, spodna strana penisu, koren penisu, miesok, semenniky, muzska hradza, prostata a muzska analna oblast.
- Spolocne panvove zony doplnene navyse: hradza/perineum a analna oblast pre vsetkych, aby anal nebol viazany iba na jedno pohlavie.
- Flow engine: scenare pre dnes, tyzden a mesiac, kroky scenarov, generator kandidati, pomocky a samostatne BDSM/bondage karty.
- Druhe kolo gap analysis: doplnene jemne zony hlavy/tvare, predna cast krku ako rizikova zona, ruky/lakte/podpazusie, rebra/boky, lonova oblast, slabinove ryhy, dalsie casti stehien a chodidiel, jemnejsie delenie penisu a vnutorne/nepriame zenske genitalne struktury.

## Zakladne zdroje pouzite na kontrolu anatomie a stimulacie

- Planned Parenthood, female sexual anatomy: https://www.plannedparenthood.org/learn/health-and-wellness/sexual-and-reproductive-anatomy/what-are-parts-female-sexual-anatomy
- Planned Parenthood, male sexual anatomy: https://www.plannedparenthood.org/learn/health-and-wellness/sexual-and-reproductive-anatomy/what-are-parts-male-sexual-anatomy
- Cleveland Clinic, clitoris anatomy: https://my.clevelandclinic.org/health/body/22823-clitoris
- Cleveland Clinic, vulva anatomy: https://my.clevelandclinic.org/health/articles/4976-vulvar-care
- Cleveland Clinic, perineum anatomy: https://my.clevelandclinic.org/health/body/24381-perineum
- Cleveland Clinic, clitoris anatomy and internal structures: https://my.clevelandclinic.org/health/body/22823-clitoris
- Scarleteen, sexual anatomy and pleasure quickie: https://www.scarleteen.com/sites/default/files/quickies-sexualanatomy_0.PDF
- Healthline, anal sex safety: https://www.healthline.com/health/healthy-sex/anal-sex-safety
- Healthline, anal fingering: https://www.healthline.com/health/healthy-sex/anal-fingering
- Healthline, rimming safety: https://www.healthline.com/health/healthy-sex/what-is-rimming
- Healthline, butt plugs: https://www.healthline.com/health/healthy-sex/what-are-butt-plugs-used-for
- Healthline, cleaning sex toys: https://www.healthline.com/health/healthy-sex/how-to-clean-sex-toys
- Healthline, sex toys and STIs: https://www.healthline.com/health/healthy-sex/sex-toys-and-stis
- American Sexual Health Association, safer sex toolbox: https://www.ashasexualhealth.org/safer-sex-toolbox/
- WebMD, dildos and toy safety: https://www.webmd.com/sex/what-are-dildos
- Kink Checklist, BDSM safety guide: https://kinkchecklist.com/safety
- PubMed Central, The Erogenous Mirror: https://pmc.ncbi.nlm.nih.gov/articles/PMC7641941/
- PubMed, penile erogenous sensation study: https://pubmed.ncbi.nlm.nih.gov/36763960/
- PubMed, male genital sensation / penile subregions: https://pubmed.ncbi.nlm.nih.gov/36763960/

## Zavery pre nas engine

- Zony a techniky musia byt oddelene. To brani nezmyslom typu "lizanie vlasov 7 minut intenzivne".
- Kazda karta potrebuje ciel: prijimatel `all`, `female` alebo `male`, a vykonavatel `partner_to_receiver`, `receiver_self`, `mutual` alebo `either`.
- Genitalne, analne, intenzivne, BDSM a penetracne aktivity nemaju byt zakladny nahodny mix. Maju ist cez preferencie, rezim alebo planovanu aktivitu.
- Anal a perineum patria obom. Preto existuje spolocna zona `anal_area` / `perineum` a zaroven cielene zony `female_anal_area`, `male_anal_area`, `female_perineum`, `male_perineum`.
- Lubrikant, naladenie a planovanie su datove flagy, nie textova moralizacia v UI. Generator ich vie pouzit na filtrovanie.
- Spontanne karty maju ist cez view `rel.v_intimate_generator_candidates` a flag `is_spontaneous_candidate`.
- Planovane karty maju ist cez flow scenare, najma `month_bdsm_intro` a `month_anal_intro`.
- Pomocky sa nemaju losovat len podla nazvu. Treba ich parovat cez `rel.v_intimate_toy_zone_matrix`, kde je kompatibilna zona, ciel zony, lubrikant, cistenie a planovanie.
- Intenzita nie je jednorozmerna. Preto vznikla tabulka `rel.intimate_intensity_profiles`: tlak, rychlost, rytmus, bolest, dominancia a teplota.
- Niektore zony su zamerne `dice_enabled = false`: predna cast krku, podpazusie, pubicka/slabinova oblast, interne genitalne body, cervix, analne/prostaticke oblasti. Maju existovat v databaze, ale nie v slepom nahodnom mixe.

## Aktualny stav pokrytia

Lokalna textova kontrola migracii po batch 8:

- Pocet zon: 98
- Pocet zon s pravidlami: 98
- Zony bez pravidiel: 0
- Flow engine: doplneny v migracii `20260529_007_intimate_flow_toys_bondage_engine.sql`
- Gap expansion: doplneny v migracii `20260529_008_zone_action_intensity_gap_expansion.sql`

Presnu kontrolu po nahrati do Supabase spravi subor:

- `99_audit_pokrytie_zon.sql`
- `07_prehlad_flow_pomocky_bondage.sql`
- `08_prehlad_doplnene_zony_cinnosti_intenzity.sql`
