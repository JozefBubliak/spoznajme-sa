// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { COUPLESYNC_PREVIEW_COOKIE, isCoupleSyncPreviewUnlocked } from "@/lib/couplesync-preview";

const SUPPORTED = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"] as const;
type Lang = typeof SUPPORTED[number];
const FALLBACK: Lang = "en";

function normalizeLocale(code: string): Lang | null {
  const c = code.toLowerCase();
  if ((SUPPORTED as readonly string[]).includes(c)) return c as Lang;
  if (c.startsWith("cs") || c.startsWith("cz")) return "cs";
  if (c.startsWith("sk")) return "sk";
  if (c.startsWith("en")) return "en";
  if (c.startsWith("pl")) return "pl";
  if (c.startsWith("hu")) return "hu";
  if (c.startsWith("fr")) return "fr";
  if (c.startsWith("de")) return "de";
  if (c.startsWith("uk") || c.startsWith("ua")) return "uk";
  if (c.startsWith("ru")) return "ru";
  if (c.startsWith("es")) return "es";
  return null;
}

function negotiate(req: NextRequest, fallback: Lang = FALLBACK): Lang {
  const cookie = req.cookies.get("dl_lang")?.value as Lang | undefined;
  if (cookie && (SUPPORTED as readonly string[]).includes(cookie)) return cookie;

  const al = req.headers.get("accept-language") || "";
  for (const p of al.split(",").map((s) => s.trim())) {
    const code = (p.split(";")[0] || "").trim();
    const norm = normalizeLocale(code);
    if (norm) return norm;
  }
  return fallback;
}

function isBot(ua: string | null) {
  return !!ua && /(bot|crawler|spider|crawling)/i.test(ua);
}

function isProtectedCoupleSyncPath(pathname: string) {
  return (
    /^\/[a-z]{2}\/apps\/couplesync\/play(?:\/|$)/.test(pathname) ||
    /^\/[a-z]{2}\/apps\/couplesync\/intimity(?:\/|$)/.test(pathname) ||
    /^\/couplesync-intimity(?:\/|$)/.test(pathname) ||
    /^\/intimne-dobrodruzstvo(?:\/|$)/.test(pathname)
  )
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/assets")) {
    return NextResponse.next();
  }

  // ── Temporary CoupleSync preview protection ──────────────────
  if (isProtectedCoupleSyncPath(pathname)) {
    const cookie = req.cookies.get(COUPLESYNC_PREVIEW_COOKIE)
    if (!isCoupleSyncPreviewUnlocked(cookie?.value)) {
      const pathLocale = normalizeLocale(pathname.split('/')[1] ?? '')
      const lang = pathLocale ?? normalizeLocale(req.cookies.get('dl_lang')?.value ?? '') ?? 'sk'
      const unlockUrl = new URL(`/${lang}/apps/couplesync/unlock`, req.url)
      unlockUrl.searchParams.set('next', `${pathname}${req.nextUrl.search}`)
      return NextResponse.redirect(unlockUrl)
    }
  }

  // ── i18n root redirect ────────────────────────────────────────
  if (pathname === "/") {
    if (isBot(req.headers.get("user-agent"))) return NextResponse.next();
    const lang = negotiate(req, FALLBACK);
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}`;
    const res = NextResponse.redirect(url, 302);
    res.cookies.set("dl_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/:lang/apps/couplesync/play/:path*",
    "/:lang/apps/couplesync/intimity/:path*",
    "/couplesync-intimity/:path*",
    "/intimne-dobrodruzstvo/:path*",
  ],
};
