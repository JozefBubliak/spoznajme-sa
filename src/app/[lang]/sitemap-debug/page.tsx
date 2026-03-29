// PATH: src/app/[lang]/sitemap-debug/page.tsx
import Link from "next/link"
import fs from "fs"
import path from "path"

function getAppRoutes(dir: string, base = ""): string[] {
  const routes: string[] = []
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return routes
  }
  for (const entry of entries) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue
    if (entry.name === "api" || entry.name === "node_modules") continue
    const fullPath = path.join(dir, entry.name)
    const segment = entry.name
    if (entry.isDirectory()) {
      // Check if this directory has a page file
      const hasPage = ["page.tsx", "page.ts", "page.jsx", "page.js"].some((f) =>
        fs.existsSync(path.join(fullPath, f))
      )
      const routePath = segment.startsWith("(")
        ? base // route groups don't add to URL
        : `${base}/${segment}`
      if (hasPage) routes.push(routePath || "/")
      routes.push(...getAppRoutes(fullPath, routePath))
    }
  }
  return routes
}

export default async function SitemapDebugPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const appDir = path.join(process.cwd(), "src/app")
  const allRoutes = Array.from(new Set(getAppRoutes(appDir))).sort()

  // Group routes
  const langRoutes = allRoutes.filter((r) => r.startsWith("/[lang]"))
  const otherRoutes = allRoutes.filter((r) => !r.startsWith("/[lang]"))

  const resolveRoute = (r: string) => r.replace("[lang]", lang)

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">🗺️ Mapa webu (debug)</h1>
          <p className="text-muted-foreground text-sm">
            Celkovo <strong>{allRoutes.length}</strong> stránok. Jazyk: <strong>{lang}</strong>
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground border-b border-border/40 pb-2">
            Jazykové stránky ({langRoutes.length})
          </h2>
          <div className="grid gap-1">
            {langRoutes.map((r) => {
              const resolved = resolveRoute(r)
              return (
                <Link
                  key={r}
                  href={resolved}
                  className="group flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-card/60 transition-colors"
                >
                  <code className="text-xs text-muted-foreground font-mono flex-shrink-0 w-8">→</code>
                  <code className="text-sm text-primary group-hover:underline">{resolved}</code>
                  <span className="text-xs text-muted-foreground/50 ml-auto font-mono">{r}</span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground border-b border-border/40 pb-2">
            Ostatné stránky ({otherRoutes.length})
          </h2>
          <div className="grid gap-1">
            {otherRoutes.map((r) => (
              <Link
                key={r}
                href={r}
                className="group flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-card/60 transition-colors"
              >
                <code className="text-xs text-muted-foreground font-mono flex-shrink-0 w-8">→</code>
                <code className="text-sm text-primary group-hover:underline">{r}</code>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
