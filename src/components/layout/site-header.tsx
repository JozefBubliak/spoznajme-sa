"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">DeepTalks</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/sk/apps" && "text-foreground"
            )}
            href="/sk/apps"
          >
            Aplikácie
          </Link>
          <Link
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/o-nas" && "text-foreground"
            )}
            href="/o-nas"
          >
            O nás
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Prepínač témy"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
