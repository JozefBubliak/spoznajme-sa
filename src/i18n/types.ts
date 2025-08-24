// Univerzálny „mapový“ typ pre hlboké mergovanie slovníkov
export type Dict = Record<string, unknown>

export interface GameEntry {
  name: string
  description: string
  cta: string
  link: string
  manual: string[]
  [key: string]: unknown
}

export interface GamesDictionary {
  quiz: GameEntry
  'spoznajme-sa': GameEntry
  hadacka: GameEntry
  couplesync: GameEntry
  ctaBack: string
  how: string
  [key: string]: unknown
}

export interface AppsDictionary {
  bannerTitle: string
  bannerSubtitle: string
  bannerCTA: string
  categories: Record<string, string>
  games: GamesDictionary
  [key: string]: unknown
}

export interface Dictionary {
  apps?: AppsDictionary
  [key: string]: unknown
}
