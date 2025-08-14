export default function Page({ params }: any) {
  const { lang, aud } = params || {}
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Publikum: {aud}</h1>
      <p className="text-muted-foreground mt-3">Obsah a techniky pre toto publikum budú čoskoro.</p>
    </div>
  )
}