export interface GameEntry {
  name: string
  description: string
  cta: string
  link: string
  manual: string[]
  [key: string]: unknown
}

export interface GamesDictionary {
  hadacka: GameEntry
  ctaBack: string
  [key: string]: unknown
}

export interface AppsDictionary {
  games: GamesDictionary
  [key: string]: unknown
}

export interface Dictionary {
  apps: AppsDictionary
  [key: string]: unknown
}
