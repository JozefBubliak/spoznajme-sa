// PATH: src/app/[lang]/kompas/publikum/[aud]/page.tsx
type P = { params: Promise<{ lang: string; aud: string }> }

export default async function Page({ params }: P) {
  const { lang, aud } = await params

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Publikum: {aud}</h1>
      <p className="text-muted-foreground mt-3">
        Obsah a techniky pre toto publikum budú čoskoro.
      </p>
    </div>
  )
}
