import type { NextConfig } from "next"

const SUP = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const r: { source: string; destination: string; permanent: boolean }[] = []
    for (const l of SUP) {
      r.push({ source: `/${l}/pomocky`, destination: `/${l}/kompas`, permanent: true })
    }
    r.push({ source: `/pomocky`, destination: `/sk/kompas`, permanent: true })

    // legacy app route redirects
    r.push({ source: `/app`, destination: `/sk/apps/spoznajme-sa/play`, permanent: true })
    r.push({ source: `/app/:path*`, destination: `/sk/apps/spoznajme-sa/play`, permanent: true })
    r.push({ source: `/apps`, destination: `/sk/apps`, permanent: true })
    r.push({ source: `/play`, destination: `/sk/apps/spoznajme-sa/play`, permanent: true })

    return r
  },
}

export default nextConfig
