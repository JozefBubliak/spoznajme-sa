import type { NextConfig } from "next"

const SUP = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
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

    // Herd Vote hub redirects — old /apps/herd-vote/* → /herd-vote/*
    for (const l of SUP) {
      r.push({ source: `/${l}/apps/herd-vote`, destination: `/${l}/herd-vote`, permanent: true })
      r.push({ source: `/${l}/apps/herd-vote/admin`, destination: `/${l}/herd-vote/lobby`, permanent: true })
      r.push({ source: `/${l}/apps/herd-vote/kategorie`, destination: `/${l}/herd-vote/kategorie`, permanent: true })
      r.push({ source: `/${l}/play/:code`, destination: `/${l}/herd-vote/play/:code`, permanent: false })
    }

    return r
  },
}

export default nextConfig
