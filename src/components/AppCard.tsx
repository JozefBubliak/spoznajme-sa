import Link from 'next/link';

export function AppCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string | null;
}) {
  return (
    <div className="rounded-xl border p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {badge && (
          <span className="rounded-full border px-2 py-0.5 text-xs">{badge}</span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Link href={href} className="underline underline-offset-4 text-primary">
          Otvoriť
        </Link>
      </div>
    </div>
  );
}
