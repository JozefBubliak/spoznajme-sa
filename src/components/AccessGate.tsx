'use client'
/**
 * AccessGate — wraps any page/section that requires auth + product access.
 *
 * Behaviour:
 *  loading     → spinner
 *  no-auth     → redirect to /auth?next=<current path>
 *  no-access   → redirect to /<lang>/<hub>/upgrade
 *  granted     → render children
 */
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAccess } from '@/hooks/useAccess'
import { type ProductSlug, PRODUCTS } from '@/lib/access'

interface Props {
  productSlug: ProductSlug
  lang: string
  children: React.ReactNode
}

export default function AccessGate({ productSlug, lang, children }: Props) {
  const { result, loading } = useAccess(productSlug)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading || result === null) return

    if (result === 'no-auth') {
      const next = encodeURIComponent(pathname ?? `/${lang}${PRODUCTS[productSlug].hubPath}`)
      router.replace(`/auth?next=${next}`)
      return
    }

    if (result === 'no-access') {
      router.replace(`/${lang}${PRODUCTS[productSlug].upgradePath}`)
    }
  }, [result, loading, router, pathname, lang, productSlug])

  if (loading || result !== 'granted') {
    return (
      <div className="hv-bg flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
