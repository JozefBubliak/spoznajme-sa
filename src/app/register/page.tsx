import { redirect } from 'next/navigation'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  redirect(`/auth/register${next ? `?next=${encodeURIComponent(next)}` : ''}`)
}
