const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const root = path.resolve(__dirname, '..')
const stromPath = path.join(root, 'src/lib/dotaznik/strom.ts')
const vetveniePath = path.join(root, 'src/lib/dotaznik/obsah/vetvenie-skusenosti.ts')
const obsahDir = path.join(root, 'src/lib/dotaznik/obsah')
const outputPath = process.env.DOTAZNIK_PREHLAD_OUTPUT
  ? path.resolve(root, process.env.DOTAZNIK_PREHLAD_OUTPUT)
  : path.join(root, 'docs/dotaznik-kompletny-prehlad.md')

function loadStrom() {
  const source = fs.readFileSync(stromPath, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = { exports: {} }
  new Function('exports', 'module', 'require', js)(module.exports, module, require)
  return module.exports
}

function loadVetvenie() {
  const source = fs.readFileSync(vetveniePath, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const module = { exports: {} }
  new Function('exports', 'module', 'require', js)(module.exports, module, require)
  return module.exports.VETVENIE_SKUSENOSTI || {}
}

function property(object, name) {
  return object.properties.find((p) =>
    ts.isPropertyAssignment(p) &&
    ((ts.isIdentifier(p.name) && p.name.text === name) ||
      (ts.isStringLiteral(p.name) && p.name.text === name)),
  )
}

function textValue(node) {
  if (!node) return undefined
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'g') {
    const variants = node.arguments.map(textValue).filter(Boolean)
    return [...new Set(variants)].join(' / ')
  }
  return undefined
}

function readDetailedContents() {
  const detailed = new Map()
  const ignored = new Set(['index.ts', 'typ.ts', 'sumar.ts'])
  for (const file of fs.readdirSync(obsahDir).filter((f) => f.endsWith('.ts') && !ignored.has(f))) {
    const source = fs.readFileSync(path.join(obsahDir, file), 'utf8')
    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
    let slug
    let title
    const groups = []

    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const slugProp = property(node, 'slug')
        if (slugProp) {
          slug = textValue(slugProp.initializer) || slug
          const titleProp = property(node, 'nadpis')
          title = textValue(titleProp?.initializer) || title
        }

        const kindProp = property(node, 'druh')
        if (kindProp && textValue(kindProp.initializer) === 'skupina') {
          const idProp = property(node, 'id')
          const titleProp = property(node, 'nadpis')
          const id = textValue(idProp?.initializer)
          const groupTitle = textValue(titleProp?.initializer)
          if (id && groupTitle) groups.push({ id, title: groupTitle })
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(sf)

    if (slug) {
      const uniqueGroups = [...new Map(groups.map((g) => [g.id, g])).values()]
      detailed.set(slug, { file, title, groups: uniqueGroups })
    }
  }
  return detailed
}

const { DOMENY, MODULY } = loadStrom()
const vetvenie = loadVetvenie()
const detailed = readDetailedContents()
const themes = MODULY.flatMap((m) => m.temy)
const itemCount = themes.reduce((sum, t) => sum + (t.polozky?.length || 0), 0)
const linkedDetailed = new Set()
const moduleGatekeeperOverrides = new Map([
  ['anilingus', 'Anilingus má štyri praktické perspektívy: muž prijíma, muž poskytuje, žena prijíma, žena poskytuje. Pri každej vetva má skúsenosť / nemá skúsenosť.'],
])

const gatekeeperOverrides = new Map([
  ['trojky-skupiny/trojky-skupiny', 'Trojky nemajú mať jednu spoločnú vetvu. MMF a FMF samostatne; pri každej vetva má skúsenosť / nemá skúsenosť.'],
  ['cnm-enm/cnm-enm', 'Otvorené vzťahy a dohody mimo monogamie ľudskou rečou; pravdepodobne vetva má skúsenosť / nemá skúsenosť.'],
  ['telesne-tekutiny/telesne-tekutiny', 'TODO: používateľ sa má vyjadriť k vetveniu telesných tekutín.'],
  ['telesne-tekutiny/prirodzenost', 'TODO: rozhodnúť spolu s telesnými tekutinami.'],
  ['telesne-tekutiny/zenska-vlhkost', 'TODO: rozhodnúť spolu s telesnými tekutinami.'],
  ['telesne-tekutiny/semeno', 'TODO: rozhodnúť spolu s telesnými tekutinami.'],
  ['telesne-tekutiny/menstrualna-krv', 'TODO: rozhodnúť spolu s telesnými tekutinami.'],
  ['telesne-tekutiny/watersports', 'TODO: rozhodnúť spolu s telesnými tekutinami.'],
  ['dirty-talk-oslovenia/ton', 'Dirty talk ako jedna téma; dáva / prijíma, ďalej bez technických podvetiev.'],
  ['dirty-talk-oslovenia/obsah', 'Dirty talk ako jedna téma; dáva / prijíma, ďalej bez technických podvetiev.'],
  ['dirty-talk-oslovenia/oslovenia', 'Dirty talk ako jedna téma; dáva / prijíma, ďalej bez technických podvetiev.'],
  ['dirty-talk-oslovenia/jazyk-tela', 'Dirty talk ako jedna téma; dáva / prijíma, ďalej bez technických podvetiev.'],
  ['vaginalna-penetracia/vaginalna-penetracia', 'TODO: samostatná debata o plánovanom členení vaginálnej penetrácie.'],
  ['orgazmus-kontrola/orgazmus-kontrola', 'TODO: používateľ sa ešte vyjadrí, či deliť podľa dávam / prijímam.'],
  ['vibratory-stimulatory/vibratory-stimulatory', 'Bez skúsenostného členenia.'],
  ['oral-vulva-klitoris/oral-vulva-klitoris', 'Bez skúsenostného členenia; skúsenosť s orálom má de facto väčšina.'],
  ['anilingus/techniky', 'Riadi sa plánovaným členením C3: muž prijíma, muž poskytuje, žena prijíma, žena poskytuje.'],
  ['anilingus/roly', 'Riadi sa plánovaným členením C3: muž prijíma, muž poskytuje, žena prijíma, žena poskytuje.'],
  ['anilingus/ramce', 'Riadi sa plánovaným členením C3: muž prijíma, muž poskytuje, žena prijíma, žena poskytuje.'],
  ['nepenetrativne-trenie/nepenetrativne-trenie', 'Bez skúsenostného členenia.'],
  ['tantra-slow-sex-spiritualita/tantra-slow-sex-spiritualita', 'Bez skúsenostného členenia.'],
  ['predohra-stupnovanie/predohra-stupnovanie', 'Bez skúsenostného členenia.'],
  ['bozky/bozky', 'Bez skúsenostného členenia.'],
  ['prostredie-atmosfera/prostredie-atmosfera', 'Bez gatekeepera: prostredie je kontext, nie praktika.'],
  ['polohy/polohy', 'Bez gatekeepera: polohy majú ostať prehľadný zoznam preferencií.'],
  ['tabu-mantinely/tabu-mantinely', 'Bez gatekeepera: iba záverečné voľné doplnenie.'],
])

function moduleGatekeeperLine(module) {
  if (moduleGatekeeperOverrides.has(module.slug)) return moduleGatekeeperOverrides.get(module.slug)
  if (module.temy.length === 1) return gatekeeperLine(`${module.slug}/${module.temy[0].slug}`)
  return 'Členenie doplniť podľa konkrétnych podtém nižšie.'
}

function gatekeeperLine(slug) {
  if (gatekeeperOverrides.has(slug)) return gatekeeperOverrides.get(slug)
  const v = vetvenie[slug]
  if (!v) return 'TODO: doplniť plánované členenie.'
  if (v.rezim === 'nepouziva-sa') return `Bez gatekeepera: ${v.dovod}`
  if (v.rezim === 'hore-dole') return `HORE / DOLE; pri každej vetva má skúsenosť / nemá skúsenosť. Stav: ${v.stav}.`
  if (v.rezim === 'jedna-skusenost') return `Vetva má skúsenosť / nemá skúsenosť. Stav: ${v.stav}.`
  if (v.rezim === 'davam-prijimam') return `Prijímam / poskytujem; pri každej vetva má skúsenosť / nemá skúsenosť. Stav: ${v.stav}.`
  return `${v.rezim}; stav ${v.stav}.`
}

const lines = [
  '# Kompletný prehľad dotazníka',
  '',
  `Aktuálny stav generovaný z kódu: ${new Date().toISOString().slice(0, 10)}.`,
  '',
  '## Ako čítať hierarchiu',
  '',
  '- **Doména (L1)** — najvyššia obsahová oblasť.',
  '- **Modul (L2)** — samostatná téma v navigácii.',
  '- **Okruh/téma (L3)** — konkrétnejšia časť modulu.',
  '- **Položky (L4)** — praktiky, varianty alebo podtémy, z ktorých generický dotazník tvorí otázky.',
  '- **Hĺbkové bloky** — navyše existujú iba pri témach spracovaných režimom „kniha + dotazník“; sú to reálne vnútorné podtémy v obsahových súboroch.',
  '- **Členenie / gatekeeper** — aktuálne alebo plánované pravidlo podľa auditu skúsenostného vetvenia. Nie je to automatická šablóna; pri veľkých témach je to pracovné rozhodnutie, ktoré sa má ešte obsahovo dopracovať.',
  '',
  '## Súhrn',
  '',
  `- Domény: **${DOMENY.length}**`,
  `- Moduly: **${MODULY.length}**`,
  `- Okruhy/témy: **${themes.length}**`,
  `- Seed položky/podtémy: **${itemCount}**`,
  `- Detailne spracované témy „kniha + dotazník“: **${detailed.size}**`,
  '- Gatekeeper audit: prepojené z `src/lib/dotaznik/obsah/vetvenie-skusenosti.ts` a `docs/dotaznik-gatekeeper-audit-2026-10-04.md`.',
  '',
  '## Šablóna, ktorú chceme používať',
  '',
  '- Pri menej častých praktikách najprv zistiť, či človek chce tému preskúmať.',
  '- Ak je skúsenosť relevantná, vetviť celé bloky: so skúsenosťou / bez skúsenosti.',
  '- Pri rolových témach deliť podľa reálneho významu: niekde dávam/prijímam, pri face sittingu HORE/DOLE, pri trojkách v budúcnosti samostatne MMF a FMF.',
  '- Vetvu ukončí až výslovné „nechcem opakovať“ alebo „nechcem skúšať“; samotná nepríjemná skúsenosť môže pokračovať do otázok, čo by ju zlepšilo.',
  '- Nepoužívať gatekeeper pri kontextoch, bežných preferenciách, prostredí, polohách, zdraví, tempe, komunikácii a témach, kde je rozdiel fantázia/reality už jadrom celej témy.',
  '- Používateľské názvy musia byť ľudskou rečou, nie interné slugy ani skratky typu CNM/ENM bez vysvetlenia.',
  '',
]

for (const domain of DOMENY) {
  lines.push(`## ${domain.id}. ${domain.nazov}`, '', domain.popis, '')
  for (const module of MODULY.filter((m) => m.domena === domain.id)) {
    lines.push(`### ${module.kod} — ${module.nazov}`, '', module.popis, '', `Plánované členenie: ${moduleGatekeeperLine(module)}`, '')
    for (const theme of module.temy) {
      const fullSlug = `${module.slug}/${theme.slug}`
      const detail = detailed.get(fullSlug)
      if (detail) linkedDetailed.add(fullSlug)
      lines.push(`- **${theme.nazov}**${detail ? ' — detailne spracované' : ''}`)
      if (theme.polozky?.length) lines.push(`  - Položky/podtémy: ${theme.polozky.join('; ')}`)
      else lines.push('  - Položky/podtémy: zatiaľ bez samostatného L4 zoznamu')
      lines.push(`  - Plánované členenie: ${gatekeeperLine(fullSlug)}`)
      if (detail?.groups.length) {
        lines.push(`  - Hĺbkové bloky: ${detail.groups.map((g) => g.title).join('; ')}`)
      }
    }
    lines.push('')
  }
}

const unlinked = [...detailed.entries()].filter(([slug]) => !linkedDetailed.has(slug))
if (unlinked.length) {
  lines.push('## Detailné obsahy mimo aktuálneho stromového prepojenia', '')
  for (const [slug, detail] of unlinked) {
    lines.push(`- **${detail.title || slug}** (${slug}) — ${detail.groups.map((g) => g.title).join('; ')}`)
  }
  lines.push('')
}

lines.push(
  '## Poznámka k úplnosti',
  '',
  'Tento dokument ukazuje všetko, čo je dnes definované v navigačnom strome a v registrovaných obsahových témach. Existencia témy alebo položky ešte neznamená, že je spracovaná do rovnakej hĺbky ako face-sitting; označenie „detailne spracované“ znamená, že má vlastný data-driven obsah namiesto generického section walkera.',
  '',
)

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`Vytvorené: ${outputPath}`)
console.log(`${DOMENY.length} domén, ${MODULY.length} modulov, ${themes.length} tém, ${itemCount} položiek, ${detailed.size} detailných obsahov.`)
