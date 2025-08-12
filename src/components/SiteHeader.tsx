// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/IntlProvider";

type Props = { lang: string };

export default function SiteHeader({ lang }: Props) {
  const { t } = useI18n();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => [
      { href: `/${lang}`, label: t("nav.home") },
      { href: `/${lang}/produkty`, label: t("nav.products") },
      { href: `/${lang}/pomocky`, label: t("nav.tools") },
      { href: `/${lang}/blog`, label: t("nav.blog") },
      { href: `/${lang}/downloady`, label: t("nav.downloads") },
    ],
    [lang, t]
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  function changeLang(newLang: string) {
    const parts = pathname.split("/");
    parts[1] = newLang;
    const next = parts.join("/") || `/${newLang}`;
    document.cookie = `dl_lang=${newLang};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.push(next);
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          <Link href={`/${lang}`} className="font-semibold text-2xl tracking-tight">
            {t("brand")}
          </Link>

          <nav className="ml-auto hidden md:flex gap-6 text-[15px]">
            {items.map((it) => (
              <Link key={it.href} href={it.href} className={isActive(it.href) ? "font-medium text-gray-900" : "text-gray-600 hover:text-gray-900"}>
                {it.label}
              </Link>
            ))}
          </nav>

          <div className="ml-4">
            <select aria-label="Language" className="border rounded-md px-2 py-1 bg-white" value={lang} onChange={(e) => changeLang(e.target.value)}>
              {["en","sk","cs","pl","hu","fr","de","uk","ru","es"].map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <button className="ml-2 md:hidden inline-flex items-center rounded-md border px-2 py-1" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col gap-3">
              {items.map((it) => (
                <Link key={it.href} href={it.href} className={isActive(it.href) ? "font-medium text-gray-900" : "text-gray-600 hover:text-gray-900"} onClick={() => setOpen(false)}>
                  {it.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
