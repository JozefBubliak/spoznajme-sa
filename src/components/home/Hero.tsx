"use client"

import Link from "next/link"
import { Sparkles, ArrowRight, Gamepad2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/IntlProvider"

export default function Hero({ lang }: { lang: string }) {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      <div className="container-modern relative z-10 py-24 grid gap-16 md:grid-cols-2 items-center">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {t("hero.badge", "Novinka")}
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
            <span className="gradient-text">
              {t("hero.title", "Lepšie rozhovory, bližšie vzťahy")}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl">
            {t(
              "hero.lead",
              "Premyslené otázky a minipostupy, ktoré vás dostanú z obrazovky späť k sebe.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${lang}/kompas`}>
              <Button variant="hero" size="xl" className="group">
                {t("hero.ctaStart", "Otvoriť kompas")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={`/${lang}/apps/spoznajme-sa/play`}>
              <Button variant="glass" size="xl" className="group">
                <Gamepad2 className="mr-2 h-5 w-5" />
                {t("hero.ctaTry", "Spustiť hru")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative animate-slide-up">
          <div className="card-connection p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse-connection"></div>
              <span className="text-sm font-medium text-muted-foreground">
                {t("hero.sample.label", "Ukážka otázky")}
              </span>
            </div>
            <blockquote className="text-lg leading-relaxed text-foreground">
              {t(
                "hero.sample.question",
                "Ktorá spomienka z posledného roka ťa urobila naozaj šťastným/šťastnou a prečo?",
              )}
            </blockquote>
            <div className="flex gap-3">
              <Button variant="connection" className="flex-1">
                {t("hero.sample.next", "Ďalšia otázka")}
              </Button>
              <Button variant="outline" className="flex-1">
                {t("hero.sample.save", "Uložiť obľúbené")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

