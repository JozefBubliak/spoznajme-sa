/**
 * classify_tasks.js  v2
 * Context-aware Slovak intimate task classifier.
 * Run: node scripts/classify_tasks.js
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const envRaw  = fs.readFileSync(path.join(__dirname,'../.env.local'),'utf8');
const SUPA_URL = envRaw.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)[1].trim();
const SUPA_KEY = envRaw.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)[1].trim();
const CONCURRENCY = 25;

// ═══════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════
function test(text, ...patterns) {
  return patterns.some(p => p.test(text));
}

// ═══════════════════════════════════════════════════════
//  QUALITY
// ═══════════════════════════════════════════════════════
function detectQuality(text) {
  if (!text || text.length < 12) return 'quality:vague';
  // Non-Slovak: has common English words AND no Slovak diacritics
  const hasDiacritics = /[šščžžáéíóúýäôľĺŕ]/i.test(text);
  const hasEnglish    = /\b(the|and|with|your|you|her|his|she|he|they|we|are|is|was|have|will)\b/i.test(text);
  if (hasEnglish && !hasDiacritics) return 'quality:not_slovak';
  if (/(.)\1{5,}/.test(text))        return 'quality:poorly_written';
  if (text.length < 25)              return 'quality:vague';
  return 'quality:ok';
}

// ═══════════════════════════════════════════════════════
//  BODY ZONE — priority: most intimate wins
// ═══════════════════════════════════════════════════════
function detectZone(text) {
  // intímna_zóna — highest priority
  if (test(text,
    /vagín|kundičk|klitoris|klitor|penis|člen|varlat|análu|análny|análne|ritku|ritka|rozkrok|genitál|pohlavné orgán|intímne miesta|intímna oblasť/i
  )) return 'intímna_zóna';

  // vnútorná strana / vnútorné stehná → intimate zone (leads to genitals)
  if (test(text, /vnútorn.{0,5}stran.{0,10}steh|vnútorn.{0,5}steh/i))
    return 'intímna_zóna';

  // between legs → intimate zone
  if (test(text, /medzi (jej|jeho|tvoje|tvoj|moje|naše|vaše)?.{0,5}noh/i))
    return 'intímna_zóna';

  // glans / frenulum
  if (test(text, /frenulum|žaluď|žalude/i))
    return 'intímna_zóna';

  // lower abdomen leading to genitals
  if (test(text, /podbrušk|spodok brucha|podbrusok/i))
    return 'intímna_zóna';

  if (test(text, /pysky|malé pysky|veľké pysky/i))
    return 'intímna_zóna';

  if (test(text, /zadok|zadočk|zadník|polky|ritk/i))
    return 'zadok';

  if (test(text, /stehno|stehná|noha|nohy|koleno|lýtko|chodidl|prst(y)? na noh|prsty nôh/i))
    return 'nohy_chodidlá';

  if (test(text, /hruď|prsia|bradavk|brucho|bruška|pupok|rebrá|boky|bedro|chrbát|chrbtica|lopatk|rameno|pazucha/i))
    return 'hruď_chrbát';

  if (test(text, /tvár|líca|líco|čelo|sánka|brada|šija|krk|zátylok|ucho|lalôčik|zuby|pery|pier|viečk|obočie/i))
    return 'tvár_šija';

  return 'celé_telo';
}

// ═══════════════════════════════════════════════════════
//  CATEGORY — ordered by specificity
// ═══════════════════════════════════════════════════════
function detectCategory(text) {
  // penetracia
  if (test(text,
    /zasúva|zasunut|preniká|prenikni|prenikneš|prenikáš|prenikne|preniknúť|penetrác|análny sex|análne sex|vnikni do|vnikáš|vniknúť/i,
    /penis(om)?.{0,15}(vo|v|do) vagín|vagína.*penis/i,
    /šukaj|šukáme|šukáš|kurva[ťj]|kurv[ie]|fucknúť|fuknúť/i,
    /prstami?.{0,20}(do|vo) (vagín|kundičk|análu|ritku|zadku|pysk)|prst(om)?.{0,15}(zasuň|zasúvaj|zasunut)/i,
    /zasuň.{0,20}(prst|penis|dildo|vibrátor)|preniknúť.{0,20}(prst|penis)/i,
    /do jej.{0,10}(vagín|kundičk|análu)|do jeho.{0,10}(análu|zadku|ritku)/i,
    /polož.{0,10}na bok.{0,20}prenikni|prenikni do (nej|neho|jej|jeho)/i
  )) return 'penetracia';

  // oral na intímnej zóne
  if (test(text,
    /cunnilingus|fellatio|blowjob|frenulum|žaluď/i,
    /jazyk(om)?.{0,30}(vagín|kundičk|klitoris|análu|ritku|penis|člen|rozkrok|pysk)/i,
    /(klitoris|vagín|kundičk|pysky|penis|člen|análu|ritku).{0,30}(jazyk|ústami|perami|cucaj|oblizuj|liz|nasávaj)/i,
    /lízaj.{0,20}(kundičk|vagín|klitoris|análu|penis|pysk)/i,
    /cucaj.{0,20}(klitoris|vagín|penis|člen|pysk)/i,
    /nasávaj.{0,20}(klitoris|vagín|pysk|penis|člen)/i,
    /(klitoris|pysky).{0,30}(nasávaj|saj|cmúľ)/i,
    /ústami.{0,20}(klitoris|vagín|penis|rozkrok|pysk)/i,
    /orálne.{0,20}(vagín|penis|klitoris|análu)/i
  )) return 'oral';

  // spanking
  if (test(text,
    /capni|capnúť|plácni|plácnuť|paddle|výpras/i,
    /bičuj|bičovanie|bič(om)|prúty|prút|metla|treskni/i,
    /opask(om)?.{0,15}(bit|ud)|remenn.{0,15}(bit|ud)/i,
    /\búder(y)?\b.{0,20}(zadok|zadočk|ritku|spodok)/i
  )) return 'spanking';

  // bondage
  if (test(text,
    /spútaj|spútanie|pripútaj|pripútanie|putá|putami|viazanie|zaviazat|handcuf/i,
    /zviaž|zviazal|zviazaná?|zviazan|zaviaže|zaviazal/i,
    /reťaz(ami)?|lano(m)?.{0,15}viaz|šnúr(ou|a|y)?.{0,15}viaz/i,
    /obmedzovanie pohybu|dominanci[ae]|submisívn|podriadení|BDSM/i
  )) return 'bondage';

  // pomucky — toys + food play
  if (test(text,
    /vibrátor|dildo|análny kolík|kolík(om)?|klystír/i,
    /šľahačk(a|ou|y)|med.{0,15}telo|čokolád.{0,20}(telo|prsia|bradavk)|jahod.{0,20}(telo|prsia)|ovocie.{0,20}telo/i,
    /sviečk.{0,15}telo|horúci.{0,20}(vosk|olej).{0,20}telo/i,
    /ľad(om)?.{0,20}(intímn|vagín|penis|klitoris|rozkrok)/i
  )) return 'pomucky';

  // zmysly — sensory (non-genital focus)
  if (test(text,
    /šatk(ou|a)?.{0,20}(oči|viečk|zakryt)|zakry.{0,20}oči|oviazat.{0,20}oči/i,
    /pierko|pierkom|pero(m)?.{0,20}(hladkaj|škrabi|telo)/i,
    /ľad(om)?.{0,20}(chrbát|brucho|rameno|krk|šija|telo)/i,
    /teplý olej.{0,20}telo|masážny olej.{0,20}(hladkaj|nanáš|rozotier)/i,
    /šepk(aj|anie|ot)|šepot(om)?.{0,20}(ucho|najdivokej|fantázi|plány)/i
  )) return 'zmysly';

  // striptiez
  if (test(text,
    /striptíz|striptiez/i,
    /pomaly.{0,20}(si vyzleč|sa zvliekaj|odhaľ.{0,20}telo|sa odhál)|svliekaj sa|zvliekaj sa/i,
    /odhalenie tela.{0,20}pomalo|odhaľuj.{0,20}telo|tantalizuj.{0,20}pohybmi/i,
    /pomaly.{0,20}rozopínaj|rozopni.{0,20}(gombík|zips).{0,30}pomalo/i,
    /tancuj.{0,20}(erotick|zmyseln)/i
  )) return 'striptiez';

  // hranie_rolik — roleplay / verbal
  if (test(text,
    /hra(j)?.{0,15}rolu|roleplay|predstieraj|scénár/i,
    /tajné slovíčko|zakončuj každú vetu|hovor.{0,20}(po celý čas|iba|len).{0,20}(hodinu|minút)/i,
    /najdivokejší.{0,15}(plán|sen|túžb|fantázi)|vymysli.{0,15}(príbeh|scénar|situáci)/i,
    /rozprávaj o.{0,20}(túžb|fantázi|sen)|zdieľaj.{0,20}fantázi/i,
    /hádaj.{0,20}(čo|kde|kto).{0,20}dotkn/i
  )) return 'hranie_rolik';

  // oral na tele (non-genital — lower intensity)
  if (test(text,
    /jazyk(om)?.{0,30}(bradavk|hruď|prsia|chrbát|brucho|pupok|rebrá|boky|rameno|stehno)/i,
    /bozkávaj.{0,20}bradavk|cucaj.{0,20}bradavk/i,
    /oblizuj.{0,20}(bradavk|hruď|brucho|chrbát|stehno)/i,
    /napíš.{0,15}jazyk(om)?.{0,20}(brucho|chrbát|telo|stehno)/i,
    /lízaj.{0,20}(nohu|stehno|chodidl|prsty.{0,10}noh)/i,
    /cucaj.{0,20}(prsty.{0,10}noh|chodidl|palec.{0,10}noh)/i
  )) return 'oral';

  // masaz
  if (test(text,
    /masíruj|masáž(e|ou|ného)?/i,
    /uhniet|jemné kruhy.{0,15}(palcami|rukami) na/i,
    /tlačí na (svaly|ramená|chrbát|krk)|tlak na (svaly|ramená)/i
  )) return 'masaz';

  // bozky
  if (test(text,
    /bozkáva(j|jte|nia)|bozk(y|om|u)|pobozkaj|bozknúť|perami sa dotýk|dotyk pier/i
  )) return 'bozky';

  // dotyk — default touch
  if (test(text,
    /hladkaj|hladkanie|dotýkaj sa|jemne sa dotýk|jemný dotyk/i,
    /prst(ami|om).{0,20}(hladkaj|prechádzaj|pohybuj)|pohybuj prstami/i,
    /jemne prechádzaj rukou|jemné dotyky/i
  )) return 'dotyk';

  return 'dotyk'; // fallback
}

// ═══════════════════════════════════════════════════════
//  INTENSITY — read context carefully
// ═══════════════════════════════════════════════════════
function detectIntensity(text, category, zone) {
  let base = 1;

  // Start with category base
  const catBase = {
    bozky: 1, dotyk: 1, masaz: 1, zmysly: 2, striptiez: 2,
    hranie_rolik: 2, bondage: 3, oral: 3, spanking: 4,
    pomucky: 4, penetracia: 4,
  };
  base = catBase[category] ?? 1;

  // Zone bump: intímna_zóna adds +1 to most categories
  if (zone === 'intímna_zóna') {
    if (['bozky','dotyk','masaz','oral'].includes(category)) base = Math.max(base, 3);
  }
  if (zone === 'zadok' && ['dotyk','bozky'].includes(category)) base = Math.max(base, 2);

  // Explicit content signals — bump up
  if (test(text, /orgazm|výron|ejakuláci|vstreknúť|výstriek/i))      base = Math.max(base, 5);
  if (test(text, /klitoris|klitor/i))                                 base = Math.max(base, 4);
  if (test(text, /vagín|kundičk|penis|člen|análu|ritku|pysky/i))     base = Math.max(base, 4);
  if (test(text, /rozkrok|podbrušk|žaluď|frenulum/i))               base = Math.max(base, 3);
  if (test(text, /bradavk/i) && zone !== 'tvár_šija')                base = Math.max(base, 3);
  if (test(text, /postupuj nižšie|smerom nižšie|posúvaj.*nižšie/i))  base = Math.max(base, 3);
  if (test(text, /pod oblečen|pod tričk|pod tielk/i))                base = Math.max(base, 2);
  if (test(text, /\bprsia\b|\bprsiami\b/i))                          base = Math.max(base, 3); // explicit breasts → always bump
  if (test(text, /hruď(ou)?/i) && category !== 'masaz')             base = Math.max(base, 2);
  if (test(text, /boky tlač|tlač.*boky|boky.*rozkrok|grindin/i))     base = Math.max(base, 3);
  if (test(text, /vibruj|vibrovanie|vibrátor/i))                      base = Math.max(base, 4);
  if (test(text, /silno|prudko|intenzívne.{0,15}(dotyk|pohyb)|náruživost/i)) base += 1;

  // Gentleness signals — pull down (but not below category minimum)
  if (test(text, /\bjemne\b|\bjemný\b|\bjemná\b/i) && base > 2)     base -= 1;
  if (test(text, /romanticky|nežne|neha|romantické?/i) && base > 1) base -= 1;

  return Math.max(1, Math.min(5, base));
}

// ═══════════════════════════════════════════════════════
//  LEVEL — logical game progression toward male orgasm
// ═══════════════════════════════════════════════════════
function assignLevel(cat, intensity, zone, text) {
  // Level 6: male orgasm finale
  if (test(text, /mužský orgazm|výron|ejakuláci|vstreknúť|výstriek|sperma|dovedieš ho na vrchol|priveď ho na vrchol|spôsob mu výron/i)) return 6;
  if (cat === 'penetracia' && intensity >= 5) return 6;

  // Level 5: intense combined stimulation / female orgasm
  if (test(text, /ženský orgazm|orgazmus|priveď (ju|ho) na vrchol|dovedieš (ju|ho) na orgazm|doviedol.{0,10}na orgazm|orgazmus.{0,20}(dosahuj|dosiah|priveď)|privedieš na orgazm/i)) return 5;
  if (cat === 'penetracia' && intensity >= 4) return 5;
  // all penetracia is at least level 4
  if (cat === 'penetracia') return 4;
  if (intensity === 5) return 5;

  // Level 4: explicit play (oral on genitals, toys, penetration start)
  if (intensity === 4) return 4;
  if (cat === 'oral' && zone === 'intímna_zóna') return 4;
  if (cat === 'pomucky') return 4;
  if (cat === 'spanking') return 4;

  // Level 3: getting hot (oral on body, bondage, explicit roleplay)
  if (intensity === 3) return 3;
  if (cat === 'bondage') return 3;
  if (cat === 'oral' && zone !== 'intímna_zóna') return 3;

  // Level 2: building tension (striptease, sensory, more intimate touch)
  if (intensity === 2) return 2;
  if (['striptiez','zmysly','hranie_rolik'].includes(cat)) return 2;

  // Level 1: warming up
  return 1;
}

// ═══════════════════════════════════════════════════════
//  CONTENT TAGS
// ═══════════════════════════════════════════════════════
function detectTags(text, qualityFlag) {
  const tags = [qualityFlag];
  if (test(text, /vibrátor/i))                             tags.push('vibrátor');
  if (test(text, /putá|spútaj|pripútaj|reťaz/i))          tags.push('putá');
  if (test(text, /jazyk/i))                                tags.push('jazyk');
  if (test(text, /orgazm/i))                               tags.push('orgazmus');
  if (test(text, /análn|análu|ritku/i))                    tags.push('análne');
  if (test(text, /masážny olej|masáž/i))                   tags.push('masáž');
  if (test(text, /šľahačk|ovocie|čokolád|jahod|med\b/i))  tags.push('jedlo');
  if (test(text, /šatkou.*oči|zakryt.*oči|oviazat.*oči/i))tags.push('blindfold');
  if (test(text, /šepk/i))                                 tags.push('šepot');
  if (test(text, /bičuj|capni|paddle|prúty/i))             tags.push('impact');
  if (test(text, /bradavk/i))                              tags.push('bradavky');
  if (test(text, /ľad\b/i))                                tags.push('ľad');
  if (test(text, /rozkrok/i))                              tags.push('rozkrok');
  return tags;
}

// ═══════════════════════════════════════════════════════
//  MAIN CLASSIFIER
// ═══════════════════════════════════════════════════════
function classify(task) {
  const text = (task.description || '').trim();
  const quality  = detectQuality(text);
  const category = detectCategory(text);
  const body_zone = detectZone(text);
  const intensity = detectIntensity(text, category, body_zone);
  const level    = assignLevel(category, intensity, body_zone, text);
  const tags     = detectTags(text, quality);
  return { category, body_zone, intensity, level, tags };
}

// ═══════════════════════════════════════════════════════
//  SUPABASE PATCH
// ═══════════════════════════════════════════════════════
async function patchTask(id, fields) {
  const res = await fetch(`${SUPA_URL}/rest/v1/tasks?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`PATCH ${id} → ${res.status}: ${(await res.text()).slice(0,80)}`);
}

async function processBatch(tasks) {
  return Promise.allSettled(tasks.map(t => patchTask(t.id, classify(t))));
}

// ═══════════════════════════════════════════════════════
//  FETCH ALL TASKS
// ═══════════════════════════════════════════════════════
async function fetchAll() {
  let all = [], offset = 0;
  while (true) {
    const r = await fetch(
      `${SUPA_URL}/rest/v1/tasks?select=id,description,action_type,level&order=id.asc&limit=1000&offset=${offset}`,
      { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` } }
    );
    const batch = await r.json();
    all.push(...batch);
    if (batch.length < 1000) break;
    offset += 1000;
  }
  return all;
}

// ═══════════════════════════════════════════════════════
//  RUN
// ═══════════════════════════════════════════════════════
(async () => {
  console.log('Fetching all tasks...');
  const tasks = await fetchAll();
  console.log(`Total: ${tasks.length}`);

  let processed = 0, errors = 0;
  const catStats = {}, levelStats = {}, intensityStats = {};

  for (let i = 0; i < tasks.length; i += CONCURRENCY) {
    const batch = tasks.slice(i, i + CONCURRENCY);
    const results = await processBatch(batch);
    results.forEach((r, idx) => {
      if (r.status === 'rejected') {
        errors++;
        console.error('ERR', batch[idx].id, r.reason?.message);
      } else {
        const f = classify(batch[idx]);
        catStats[f.category]  = (catStats[f.category]  || 0) + 1;
        levelStats[f.level]   = (levelStats[f.level]   || 0) + 1;
        intensityStats[f.intensity] = (intensityStats[f.intensity] || 0) + 1;
      }
    });
    processed += batch.length;
    if (processed % 500 === 0 || processed >= tasks.length) {
      process.stdout.write(`\r${processed}/${tasks.length} (err: ${errors})`);
    }
  }

  console.log('\n\n=== VÝSLEDKY ===');
  console.log('Kategórie:',   JSON.stringify(catStats));
  console.log('Levely:',      JSON.stringify(levelStats));
  console.log('Intenzita:',   JSON.stringify(intensityStats));
  console.log('Chyby:',       errors);
})();
