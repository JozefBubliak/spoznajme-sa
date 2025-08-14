import type { NextConfig } from "next"

const SUP = ["en","sk","cs","pl","hu","fr","de","uk","ru","es"]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const r: { source: string; destination: string; permanent: boolean }[] = []
    for (const l of SUP) {
      r.push({ source: `/${l}/pomocky`,    destination: `/${l}/kompas`, permanent: true })
    }
    r.push({ source: `/pomocky`, destination: `/sk/kompas`, permanent: true })
    return r
  },
}
export default nextConfig