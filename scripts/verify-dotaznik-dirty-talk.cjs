const assert = require('node:assert/strict')
const path = require('node:path')
const fs = require('node:fs')
const cp = require('node:child_process')
const ts = require('typescript')
const load = require('./dotaznik-ts-loader.cjs')
const root = path.resolve(__dirname, '..')
const obsahDir = path.join(root, 'src/lib/dotaznik/obsah')
const { vsetkyObsahy } = load(path.join(obsahDir, 'index.ts'))
const { MODULY } = load(path.join(root, 'src/lib/dotaznik/strom.ts'))
const { temyPreStav, odpovedePreModul } = load(path.join(root, 'src/lib/dotaznik/temy-aliasy.ts'))
const flat = bs => bs.flatMap(b => b.druh === 'skupina' ? [b, ...flat(b.bloky)] : [b])
const questions = t => flat([...t.uvod, ...t.telo, ...(t.zaver || [])]).filter(b => b.druh === 'otazka')
const themes = vsetkyObsahy()
const dirty = themes.filter(t => t.slug.startsWith('dirty-talk-oslovenia/'))
assert.equal(dirty.length, 1)
assert.equal(MODULY.find(m => m.slug === 'dirty-talk-oslovenia').temy.length, 1)
const ids = questions(dirty[0]).map(q => q.id)
assert.equal(ids.length, new Set(ids).size)
// Compare with all former Dirty-talk pages; no question or option may disappear.
const oldSource = cp.execFileSync('git', ['show', '696db95:src/lib/dotaznik/obsah/fetise.ts'], { encoding: 'utf8' })
const exportsOld = {}
const compiled = ts.transpileModule(oldSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
new Function('exports', 'require', compiled)(exportsOld, name => load(path.join(obsahDir, name + '.ts')))
for (const theme of Object.values(exportsOld).filter(t => t.slug?.startsWith('dirty-talk-oslovenia/'))) {
  for (const q of questions(theme)) {
    const current = questions(dirty[0]).find(b => b.id === q.id)
    assert.ok(current, q.id)
    assert.equal(JSON.stringify(current.moznosti), JSON.stringify(q.moznosti), q.id)
  }
}
// Each Dirty-talk question belongs to exactly one registered topic.
for (const id of ids.filter(id => id.startsWith('dt_'))) {
  assert.equal(themes.flatMap(questions).filter(q => q.id === id).length, 1, id)
}
assert.deepEqual(Array.from(temyPreStav('dirty-talk-oslovenia', 'obsah')), ['obsah', 'ton', 'oslovenia', 'jazyk-tela'])
assert.deepEqual(Array.from(temyPreStav('other', 'obsah')), ['obsah'])
const rows = [
  { modul: 'dirty-talk-oslovenia', polozka: 'dt_ton', hodnota: 'new' },
  { modul: 'telesne-tekutiny', polozka: 'dt_ton', hodnota: 'old' },
  { modul: 'telesne-tekutiny', polozka: 'other', hodnota: 'unrelated' },
]
assert.deepEqual(Array.from(odpovedePreModul('dirty-talk-oslovenia', rows), r => r.hodnota), ['old', 'new'])
const stavExports = {}
const stavSource = ts.transpileModule(fs.readFileSync(path.join(root, 'src/app/[lang]/dotaznik/_stav.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText
new Function('exports', 'require', stavSource)(stavExports, name => name.startsWith('@/')
  ? load(path.join(root, 'src', name.slice(2) + '.ts')) : require(name))
const stavy = [
  { slot: 'b', modul: 'dirty-talk-oslovenia', tema: 'obsah', stav: 'ano' },
  { slot: 'b', modul: 'dirty-talk-oslovenia', tema: 'ton', stav: 'nie' },
]
assert.equal(stavExports.partnerZamok(stavy, { slot: 'a' }, 'dirty-talk-oslovenia', 'obsah'), 'trvaly')
assert.equal(stavExports.partnerZamok(stavy.map(s => ({ ...s, stav: 'ano' })), { slot: 'a' }, 'dirty-talk-oslovenia', 'obsah'), null)
const config = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8')
assert.ok(config.includes("['ton', 'oslovenia', 'jazyk-tela']"))
assert.ok(config.includes('/t/obsah/:path*'))
console.log(`PASS: one Dirty talk, ${ids.length} unique questions, original content/options, legacy answers and redirects.`)
