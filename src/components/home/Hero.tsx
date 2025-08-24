"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/IntlProvider"

export default function Hero({ lang }: { lang: string }) {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm mb-4">
          {t("hero.badge","Novinka")}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t("hero.title","Rozhovory, ktoré spájajú.")}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          {t("hero.lead","Praktické vety, minipostupy a konverzačné hry. Pre páry, rodičov a deti, kamarátov aj rodiny.")}
        </p>
        <div className="flex gap-3">
          <Link href={`/${lang}/kompas`}><Button size="lg">{t("hero.ctaStart","Otvoriť kompas")}</Button></Link>
          <Link href={`/${lang}/apps/spoznajme-sa/play`}><Button size="lg" variant="outline">{t("hero.ctaTry","Spustiť hru")}</Button></Link>
        </div>
      </div>
      <div className="rounded-xl border p-5 shadow-sm bg-background">
        <div className="text-sm text-muted-foreground mb-2">{t("hero.sample.label","Ukážka otázky")}</div>
        <div className="rounded-lg border p-4 text-lg mb-3 bg-card">
          {t("hero.sample.question","Ktorá spomienka z posledného roka ťa urobila naozaj šťastným/šťastnou a prečo?")}
        </div>
        <div className="flex gap-3">
          <Button>{t("hero.sample.next","Ďalšia otázka")}</Button>
          <Button variant="outline">{t("hero.sample.save","Uložiť obľúbené")}</Button>
        </div>
      </div>
    </section>
  )
}