export default function Page({ params }: any) {
  const { lang, slug } = params || {}
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Téma: {slug}</h1>
      <p className="text-muted-foreground mt-3">Detail techník k tejto téme pripravujeme.</p>
    </div>
  )
}