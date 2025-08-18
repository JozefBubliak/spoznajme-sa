import type { Metadata } from 'next';
import { AppCard } from '@/components/AppCard';
import { SK_APPS } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Aplikácie a hry – DeepTalks',
  description: 'Všetky interaktívne aplikácie a hry od DeepTalks.',
};

export default function AppsPageSK() {
  const items = SK_APPS.filter((app) => app.visible !== false);
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Aplikácie a hry</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((app) => (
          <AppCard
            key={app.slug}
            title={app.title}
            description={app.description}
            href={app.href}
            badge={app.badge}
          />
        ))}
      </div>
    </main>
  );
}
