#!/usr/bin/env node
// Classification script for tasks_chunk_2.json
// Classifies intimate game tasks and updates Supabase

const fs = require('fs');
const https = require('https');
const http = require('http');

const SUPABASE_URL = 'https://uoochdvpvjlcuxwlyhnb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvb2NoZHZwdmpsY3V4d2x5aG5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMxOTQ1MSwiZXhwIjoyMDY5ODk1NDUxfQ.ounpGBTdnpzrcmY9BGaS9MVcpwzz4ksJh4ChXgT_fTk';
const CHUNK_FILE = 'E:/Projekty/spoznajme-sa/tasks_chunk_2.json';

// ─── Classification logic ────────────────────────────────────────────────────

function classify(task) {
  const text = ((task.description || task.text || task.task || task.name || '') + ' ' + (task.title || '')).toLowerCase();

  // Helper: keyword presence
  const has = (...words) => words.some(w => text.includes(w));

  // ── category ────────────────────────────────────────────────────────────────
  let category;
  if (has('penetr', 'zasunúť', 'zasunu', 'vnikni', 'vniknut', 'prstom dovnútra', 'prst dovnútra', 'prst do pošvy', 'prst do análn', 'prst do rit', 'do nej', 'do teba', 'do vagin', 'do análu', 'análny', 'análne', 'do pičky', 'do p****', 'styku', 'súlož', 'sex', 'fučiť', 'jebať', 'jebeš', 'pichat', 'pichaj', 'skúšaj dovnútra', 'vstúpiť dovnútra', 'preniknúť', 'prenikni', 'dilda', 'dildo', 'fingering', 'fprstiť', 'prst do', 'prsti do')) {
    category = 'penetracia';
  } else if (has('vibrátor', 'vibrator', 'hračk', 'pomôck', 'pomůck', 'jedlo na tele', 'šľahačk', 'sladkost', 'med na', 'čokoláda na', 'ovocie na', 'jahod', 'zmrzlin')) {
    category = 'pomucky';
  } else if (has('zviazať', 'zviaz', 'putá', 'puta ', 'retiazk', 'lano na', 'priviazať', 'priviaz', 'bondage', 'obmedzenie pohybu', 'spúta', 'spút')) {
    category = 'bondage';
  } else if (has('šľapnut', 'plácnut', 'plácni', 'spank', 'udri', 'udier', 'pohlavk', 'plácnut', 'plácnuť', 'plesk', 'bič', 'paddle', 'potrest')) {
    category = 'spanking';
  } else if (has('striptíz', 'striptiez', 'zvliekaj', 'zvliek sa', 'vyzleč', 'vyzliekaj', 'tancuj', 'tanec', 'sexi tanec', 'erotický tanec', 'pomaly si vyzlek', 'odhal', 'striptease')) {
    category = 'striptiez';
  } else if (has('orál', 'oral', 'peeling jazykom', 'jazyk na', 'lízať', 'lízaj', 'lízni', 'cucat', 'cucaj', 'sať', 'saj ', 'saním', 'blowjob', 'felatio', 'felácia', 'cunnilingus', 'cunnilingus', 'vyliž', 'vyližuj', 'oblíž', 'olíž', 'jazykom na', 'jazykom po intím', 'jazykom medzi')) {
    category = 'oral';
  } else if (has('masáž', 'masaz', 'masíruj', 'masir', 'hnetie', 'hneť', 'uvoľni svaly', 'uhniet')) {
    category = 'masaz';
  } else if (has('bozk', 'pobozk', 'pobozkaj', 'pobozkávaj', 'pusu', 'pusa', 'kiss', 'ciuck', 'cmúľaj pery', 'hryz', 'hryzni', 'hrýz', 'uštipni pier')) {
    category = 'bozky';
  } else if (has('šatka', 'šatkou', 'zaviazané oči', 'naslepačky', 'poslepiačky', 'poslepo', 'ľad', 'ľadom', 'perím', 'perie', 'pierko', 'šepk', 'šepot', 'fantasy', 'scénar', 'hra na', 'roleplay', 'predstav si', 'fantasy', 'zmyslov', 'dych na', 'fúkaj', 'fúk ', 'fúkni')) {
    category = 'zmysly';
  } else if (has('roleplay', 'hranie roli', 'hraj sa', 'hraj rolu', 'predstav si že', 'slovná hra', 'fantázia', 'príbeh', 'scenár', 'hra na doktorov', 'hra na učiteľa', 'hra na šéfa', 'policajt', 'sluha', 'pán', 'pani', 'otrok')) {
    category = 'hranie_rolik';
  } else if (has('dotýkaj', 'dotyk', 'hlaď', 'hladkaj', 'pohladkaj', 'pohlaď', 'jemne sa', 'prejedz prstami', 'prstami po', 'končekmi prstov', 'necht', 'nechtami')) {
    category = 'dotyk';
  } else {
    // Default fallback: guess from intensity markers
    category = 'dotyk';
  }

  // ── body_zone ────────────────────────────────────────────────────────────────
  let body_zone;
  const intimateZone = has('vagin', 'pošv', 'klitor', 'klít', 'péro', 'penis', 'análn', 'análu', 'riť', 'intímn', 'rozkrok', 'pipína', 'pička', 'piča', 'pyj', 'semenník', 'vnútorn stehno', 'vnútorné stehn');
  const faceNeck = has('pier', 'pery', 'ucho', 'ušn', 'krk', 'šij', 'tvár', 'líc', 'nos', 'čelo', 'brada');
  const chestBack = has('prsia', 'prsník', 'bradavk', 'chrbát', 'plec', 'rameno', 'podpaz', 'hruď');
  const buttocks = has('zadok', 'zadoček', 'posadz', 'priťah', 'spodná časť chrbta', 'krížov', 'sedaci');
  const legsFF = has('noha', 'nohy', 'stehno', 'stehná', 'lýtko', 'koleno', 'chodidlo', 'chodidlá', 'prst na noh', 'päta');
  const wholeBody = has('celé telo', 'po celom', 'po tele', 'všade', 'od hlavy');

  if (wholeBody) {
    body_zone = 'celé_telo';
  } else if (intimateZone) {
    body_zone = 'intímna_zóna';
  } else if (buttocks) {
    body_zone = 'zadok';
  } else if (chestBack) {
    body_zone = 'hruď_chrbát';
  } else if (faceNeck) {
    body_zone = 'tvár_šija';
  } else if (legsFF) {
    body_zone = 'nohy_chodidlá';
  } else {
    body_zone = 'celé_telo';
  }

  // ── intensity ────────────────────────────────────────────────────────────────
  let intensity;
  if (has('penetr', 'súlož', 'sex', 'orgaz', 'výron', 'ejakulá', 'skončiť dovnútra', 'vstrekni', 'skončiť na', 'orgazmus', 'výstrek')) {
    intensity = 5;
  } else if (has('orál', 'oral', 'lízaj', 'lízať', 'cunnilingus', 'blowjob', 'feláci', 'vyliž', 'oblíž', 'vibrátor', 'vibrator', 'fingering', 'prst dovnútra', 'prstom dovnútra', 'prst do pošvy')) {
    intensity = 4;
  } else if (has('bondage', 'zviazať', 'zviaz', 'putá', 'hryz', 'hryzni', 'spank', 'udri', 'plácni', 'pohlavk', 'análn', 'klitor', 'klít', 'bradavk', 'intímna zóna', 'penis', 'péro', 'pička', 'piča')) {
    intensity = 3;
  } else if (has('striptíz', 'striptiez', 'vyzliek', 'vyzleč', 'svliek', 'nahý', 'nahá', 'odhal', 'hladkaj intím', 'prsia', 'prsník', 'zadok', 'bozk na krk', 'bozk na', 'celý krk', 'hlboký bozk', 'vášnivý bozk')) {
    intensity = 2;
  } else {
    intensity = 1;
  }

  // ── level ────────────────────────────────────────────────────────────────────
  let level;
  if (intensity === 5) {
    level = has('orgaz', 'výron', 'ejakulá', 'skončiť', 'výstrek') ? 6 : 5;
  } else if (intensity === 4) {
    level = has('orgazmus', 'orgazm', 'klitoris', 'klítor', 'vibrátor') ? 5 : 4;
  } else if (intensity === 3) {
    level = 3;
  } else if (intensity === 2) {
    level = 2;
  } else {
    level = 1;
  }

  // ── tags ─────────────────────────────────────────────────────────────────────
  const tags = [];

  // Quality flags
  const slovakChars = /[áäčďéíľĺňóôŕšťúýžÁÄČĎÉÍĽĹŇÓÔŔŠŤÚÝŽ]/;
  const fullText = task.description || task.text || task.task || task.name || task.title || '';
  if (!slovakChars.test(fullText) && fullText.length > 10) {
    tags.push('quality:not_slovak');
  } else if (fullText.length < 15) {
    tags.push('quality:vague');
  } else {
    tags.push('quality:ok');
  }

  // Descriptive tags
  if (category === 'bozky') tags.push('kissing');
  if (category === 'masaz') tags.push('massage');
  if (category === 'dotyk') tags.push('touch');
  if (category === 'oral') tags.push('oral');
  if (category === 'penetracia') tags.push('penetration');
  if (category === 'striptiez') tags.push('striptease');
  if (category === 'bondage') tags.push('bondage');
  if (category === 'pomucky') tags.push('toys');
  if (category === 'spanking') tags.push('spanking');
  if (category === 'zmysly') tags.push('sensory');
  if (category === 'hranie_rolik') tags.push('roleplay');

  return { category, body_zone, intensity, level, tags };
}

// ─── Supabase PATCH ──────────────────────────────────────────────────────────

function patchTask(id, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const url = new URL(`${SUPABASE_URL}/rest/v1/tasks?id=eq.${id}`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
    };
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ id, success: true });
        } else {
          resolve({ id, success: false, status: res.statusCode, body: responseBody });
        }
      });
    });
    req.on('error', (err) => resolve({ id, success: false, error: err.message }));
    req.write(body);
    req.end();
  });
}

// ─── Batch processor ─────────────────────────────────────────────────────────

async function processBatch(tasks) {
  return Promise.all(tasks.map(task => {
    const classification = classify(task);
    return patchTask(task.id, classification);
  }));
}

async function main() {
  console.log('Reading chunk file...');
  const tasks = JSON.parse(fs.readFileSync(CHUNK_FILE, 'utf8'));
  console.log(`Loaded ${tasks.length} tasks.`);

  const BATCH_SIZE = 20;
  let processed = 0;
  let errors = 0;

  for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE);
    const results = await processBatch(batch);

    for (const r of results) {
      if (!r.success) {
        errors++;
        console.error(`  FAIL id=${r.id} status=${r.status} error=${r.error} body=${r.body}`);
      }
    }

    processed += batch.length;
    if (processed % 100 === 0 || processed === tasks.length) {
      console.log(`Progress: ${processed}/${tasks.length} (${errors} errors)`);
    }
  }

  console.log(`\nDone! Processed: ${processed}, Errors: ${errors}`);
}

main().catch(console.error);
