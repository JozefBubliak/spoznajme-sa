'use client'

export function FilterBar() {
  return (
    <div className="flex flex-wrap gap-3 items-center border rounded-md p-3 bg-background">
      <select className="h-9 rounded-md border bg-background px-2 text-sm"><option>Téma</option></select>
      <select className="h-9 rounded-md border bg-background px-2 text-sm"><option>Vek</option></select>
      <select className="h-9 rounded-md border bg-background px-2 text-sm"><option>Pre koho</option></select>
    </div>
  )
}
