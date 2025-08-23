import type { NextConfig } from "next"

const SUP = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const r: { source: string; destination: string; permanent: boolean }[] = []
    for (const l of SUP) {
      r.push({ source: `/${l}/pomocky`, destination: `/${l}/kompas`, permanent: true })

      const AUD = ["rodic-dieta", "pary", "kamarati-party", "rodina"]
      for (const a of AUD) {
        r.push({ source: `/${l}/pomocky/${a}`, destination: `/${l}/kompas/publikum/${a}`, permanent: true })
        r.push({ source: `/${l}/pomocky/${a}/:topic`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
        r.push({ source: `/${l}/pomocky/${a}/:topic/:tech`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
      }

      r.push({ source: `/${l}/pomocky/audience/:aud`, destination: `/${l}/kompas/publikum/:aud`, permanent: true })
      r.push({ source: `/${l}/pomocky/audience/:aud/tema/:topic`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
      r.push({ source: `/${l}/pomocky/audience/:aud/tema/:topic/:tech`, destination: `/${l}/kompas/tema/:topic`, permanent: true })

      r.push({ source: `/${l}/pomocky/:topic`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
      r.push({ source: `/${l}/pomocky/:topic/:tech`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
      r.push({ source: `/${l}/pomocky/tema/:topic`, destination: `/${l}/kompas/tema/:topic`, permanent: true })
      r.push({ source: `/${l}/pomocky/tema/:topic/:tech`, destination: `/${l}/kompas/tema/:topic`, permanent: true })

      r.push({ source: `/${l}/pomocky/rodic-dieta/indexy`, destination: `/${l}/indexy`, permanent: true })
      r.push({ source: `/${l}/pomocky/rodic-dieta/indexy/co-trapi-rodicov`, destination: `/${l}/indexy/co-trapi-rodicov`, permanent: true })
      r.push({ source: `/${l}/pomocky/rodic-dieta/indexy/co-trapi-deti`, destination: `/${l}/indexy/co-trapi-deti`, permanent: true })
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
