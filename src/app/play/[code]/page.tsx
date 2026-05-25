// Legacy route — redirect to the localized version
// Old: /play/[code]  →  New: /sk/play/[code]
import { redirect } from 'next/navigation'

export default async function LegacyPlayPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  redirect(`/sk/play/${code}`)
}
