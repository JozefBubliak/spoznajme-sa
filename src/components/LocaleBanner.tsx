'use client'

export function LocaleBanner({ message }: { message?: string }) {
  return (
    <div className="bg-muted text-muted-foreground border rounded-md p-3">
      {message || 'Táto stránka je zatiaľ len po slovensky.'}
    </div>
  )
}
