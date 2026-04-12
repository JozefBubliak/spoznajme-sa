import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

function readMDXFrontmatter(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      return data as Record<string, any>
    }
  } catch (e) {
    console.error('MDX read error:', e)
  }
  return null
}

export function getTopicFrontmatter(lang: string, tema: string) {
  const p = path.join(process.cwd(), 'content', lang, 'topics', tema, 'index.mdx')
  return readMDXFrontmatter(p)
}

export function getToolFrontmatter(lang: string, tema: string, technika: string) {
  const p = path.join(process.cwd(), 'content', lang, 'tools', tema, `${technika}.mdx`)
  return readMDXFrontmatter(p)
}

export function getAgeMapFrontmatter(lang: string, range: string) {
  const p = path.join(process.cwd(), 'content', lang, 'age-maps', `${range}.mdx`)
  return readMDXFrontmatter(p)
}

export function getIndexFrontmatter(lang: string, indexKey: string) {
  const p = path.join(process.cwd(), 'content', lang, 'indexes', `${indexKey}.mdx`)
  return readMDXFrontmatter(p)
}

function readDirectoryEntries(directoryPath: string) {
  try {
    if (fs.existsSync(directoryPath)) {
      return fs.readdirSync(directoryPath, { withFileTypes: true })
    }
  } catch (e) {
    console.error('Directory read error:', e)
  }
  return []
}

export function getTopicFrontmatters(lang: string) {
  const topicsDir = path.join(process.cwd(), 'content', lang, 'topics')

  return readDirectoryEntries(topicsDir)
    .filter((entry) => entry.isDirectory())
    .map((entry) => getTopicFrontmatter(lang, entry.name))
    .filter(Boolean)
}

export function getToolFrontmatters(lang: string, tema?: string) {
  const toolsRoot = path.join(process.cwd(), 'content', lang, 'tools')
  const topicSlugs = tema
    ? [tema]
    : readDirectoryEntries(toolsRoot)
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)

  return topicSlugs.flatMap((topicSlug) => {
    const topicDir = path.join(toolsRoot, topicSlug)

    return readDirectoryEntries(topicDir)
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
      .map((entry) => {
        const frontmatter = getToolFrontmatter(lang, topicSlug, entry.name.replace(/\.mdx$/i, ''))
        if (!frontmatter) {
          return null
        }

        return {
          ...frontmatter,
          topicSlug,
        }
      })
      .filter(Boolean)
  })
}

export function findToolById(lang: string, id: string) {
  const needle = id.trim().toLocaleLowerCase()

  return (
    getToolFrontmatters(lang).find((tool) => {
      const toolId = String(tool.tool_id ?? '').toLocaleLowerCase()
      const slug = String(tool.slug ?? '').toLocaleLowerCase()
      return toolId === needle || slug === needle
    }) ?? null
  )
}
