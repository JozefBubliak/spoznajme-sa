import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Rewrites pre “pekné” URL aliasy (audience) a kanonické témy.
  // Dôležité: poradie — najprv aliasy pre publikum, až potom generické /pomocky/:topic.
  async rewrites() {
    return [
      // ----- HUB PRE PUBLIKÁ -----
      { source: '/:lang/pomocky/rodic-dieta',     destination: '/:lang/pomocky/audience/rodic-dieta' },
      { source: '/:lang/pomocky/pary',            destination: '/:lang/pomocky/audience/pary' },
      { source: '/:lang/pomocky/kamarati-party',  destination: '/:lang/pomocky/audience/kamarati-party' },
      { source: '/:lang/pomocky/rodina',          destination: '/:lang/pomocky/audience/rodina' },

      // ----- TÉMA POD PUBLIKOM (index) -----
      { source: '/:lang/pomocky/rodic-dieta/:topic',     destination: '/:lang/pomocky/audience/rodic-dieta/tema/:topic' },
      { source: '/:lang/pomocky/pary/:topic',            destination: '/:lang/pomocky/audience/pary/tema/:topic' },
      { source: '/:lang/pomocky/kamarati-party/:topic',  destination: '/:lang/pomocky/audience/kamarati-party/tema/:topic' },
      { source: '/:lang/pomocky/rodina/:topic',          destination: '/:lang/pomocky/audience/rodina/tema/:topic' },

      // ----- DETAIL TECHNIKY POD PUBLIKOM -----
      { source: '/:lang/pomocky/rodic-dieta/:topic/:tech',     destination: '/:lang/pomocky/audience/rodic-dieta/tema/:topic/:tech' },
      { source: '/:lang/pomocky/pary/:topic/:tech',            destination: '/:lang/pomocky/audience/pary/tema/:topic/:tech' },
      { source: '/:lang/pomocky/kamarati-party/:topic/:tech',  destination: '/:lang/pomocky/audience/kamarati-party/tema/:topic/:tech' },
      { source: '/:lang/pomocky/rodina/:topic/:tech',          destination: '/:lang/pomocky/audience/rodina/tema/:topic/:tech' },

      // ----- TÉMY (kanonické indexy) -----
      // musí byť AŽ po “audience” pravidlách, aby sa nerozbili aliasy
      { source: '/:lang/pomocky/:topic', destination: '/:lang/pomocky/tema/:topic' },
    ]
  },
}

export default nextConfig
