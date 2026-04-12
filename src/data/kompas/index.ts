import {
  KOMPAS_AUDIENCE_GROUP_LABELS,
  KOMPAS_MOMENT_LABELS,
  KOMPAS_MOMENTS,
  KOMPAS_SCENARIOS,
} from './mvp-scenarios'
import type { LegacyKompasItem } from './types'

export * from './types'
export {
  KOMPAS_AUDIENCE_GROUP_LABELS,
  KOMPAS_MOMENT_LABELS,
  KOMPAS_MOMENTS,
  KOMPAS_SCENARIOS,
}

export const KOMPAS_DATA: LegacyKompasItem[] = KOMPAS_SCENARIOS.map((scenario) => ({
  ...scenario,
  group: KOMPAS_AUDIENCE_GROUP_LABELS[scenario.audienceSlug],
  topic: KOMPAS_MOMENT_LABELS[scenario.momentSlug],
  subtopic: scenario.title,
  phrases: [scenario.firstLine, scenario.softerVersion, scenario.directVersion].filter(Boolean),
}))
