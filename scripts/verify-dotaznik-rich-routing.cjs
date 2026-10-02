const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')
const obsahDir = path.join(root, 'src/lib/dotaznik/obsah')
const indexPath = path.join(obsahDir, 'index.ts')
const stromPath = path.join(root, 'src/lib/dotaznik/strom.ts')

function loadStrom() {
  const source = fs.readFileSync(stromPath, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = { exports: {} }
  new Function('exports', 'module', 'require', js)(module.exports, module, require)
  return module.exports
}

const exportsByName = new Map()
for (const file of fs.readdirSync(obsahDir).filter((name) => name.endsWith('.ts'))) {
  const source = fs.readFileSync(path.join(obsahDir, file), 'utf8')
  const re = /export const\s+(\w+)\s*:\s*TemaObsah\s*=\s*\{[\s\S]*?\bslug:\s*'([^']+)'/g
  for (const match of source.matchAll(re)) exportsByName.set(match[1], { slug: match[2], file })
}

const indexSource = fs.readFileSync(indexPath, 'utf8')
const registeredNames = new Set(
  [...indexSource.matchAll(/\[(\w+)\.slug\]\s*:\s*\1/g)].map((match) => match[1]),
)
const registeredSlugs = new Set(
  [...registeredNames].map((name) => exportsByName.get(name)?.slug).filter(Boolean),
)

const errors = []
for (const [name, meta] of exportsByName) {
  if (!registeredNames.has(name)) {
    errors.push(`Export ${name} (${meta.slug}, ${meta.file}) nie je zapojený v obsah/index.ts.`)
  }
}

// Témy, pri ktorých už v repozitári existuje plný obsah a generický L4 walker
// by bol stratou. Pri rozdelení ďalšieho širokého modulu sem doplň presné L3 route.
const REQUIRED_RICH_ROUTES = [
  'telesne-tekutiny/telesne-tekutiny',
  'telesne-tekutiny/prirodzenost',
  'telesne-tekutiny/semeno',
  'telesne-tekutiny/menstrualna-krv',
  'telesne-tekutiny/watersports',
  'dirty-talk-oslovenia/ton',
  'dirty-talk-oslovenia/obsah',
  'dirty-talk-oslovenia/oslovenia',
  'dirty-talk-oslovenia/jazyk-tela',
]
for (const slug of REQUIRED_RICH_ROUTES) {
  if (!registeredSlugs.has(slug)) errors.push(`Povinná detailná route ${slug} nie je registrovaná.`)
}

const { MODULY } = loadStrom()
const genericSiblings = []
for (const module of MODULY) {
  const routes = module.temy.map((tema) => `${module.slug}/${tema.slug}`)
  if (!routes.some((route) => registeredSlugs.has(route))) continue
  const generic = module.temy.filter((tema) => !registeredSlugs.has(`${module.slug}/${tema.slug}`))
  if (generic.length) genericSiblings.push({ module, generic })
}

if (process.argv.includes('--report')) {
  for (const { module, generic } of genericSiblings) {
    console.log(`${module.kod} ${module.nazov}: ${generic.map((tema) => tema.nazov).join('; ')}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(
  `PASS: ${registeredSlugs.size} detailných route je zapojených; ` +
  `${genericSiblings.length} modulov má ešte generických súrodencov na obsahový audit.`,
)
