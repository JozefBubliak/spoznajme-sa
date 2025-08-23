import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

function readMDXFrontmatter(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)
      return data as Record<string, unknown>
    }
  } catch (e) {
    console.error('MDX read error:', e)
  }
  return null
}

export interface AgeMapFrontmatter {
  title?: string
  description?: string
  seoDescription?: string
}

export function getTopicFrontmatter(lang: string, tema: string) {
  const p = path.join(process.cwd(), 'content', lang, 'topics', tema, 'index.mdx')
  return readMDXFrontmatter(p)
}

export function getToolFrontmatter(lang: string, tema: string, technika: string) {
  const p = path.join(process.cwd(), 'content', lang, 'tools', tema, `${technika}.mdx`)
  return readMDXFrontmatter(p)
}

export function getAgeMapFrontmatter(lang: string, range: string): AgeMapFrontmatter | null {
  const p = path.join(process.cwd(), 'content', lang, 'age-maps', `${range}.mdx`)
  return readMDXFrontmatter(p) as AgeMapFrontmatter | null
}

export function getIndexFrontmatter(lang: string, indexKey: string) {
  const p = path.join(process.cwd(), 'content', lang, 'indexes', `${indexKey}.mdx`)
  return readMDXFrontmatter(p)
}
