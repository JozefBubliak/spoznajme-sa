import { redirect } from 'next/navigation'

export default function Page({ searchParams }: { searchParams: { next?: string } }) {
  const next = searchParams?.next
  redirect(`/auth${next ? `?next=${encodeURIComponent(next)}` : ''}`)
}
