// Operator-specific config for the pilot appendix page. Each operator gets a
// config file in ./operators/<slug>.ts and a password env var
// (OPERATOR_<SLUG>_PASSWORD). Adding a new operator = new file + env var.

import { gamblr } from "./operators/gamblr"

export type OperatorConfig = {
  /** URL slug, e.g. "gamblr" → /gamblr */
  slug: string
  /** Display name, e.g. "Gamblr" */
  name: string
  /** Public domain, e.g. "gamblr.io" */
  domain: string
  /** Date the proposal was prepared, e.g. "May 2026" */
  preparedDate: string
  /** Short positioning line shown on the header */
  positioning: string
  /** Tech stack to mention in the integration section */
  techStack: string[]
  /** Default monthly bonus spend used to seed the power planner */
  defaultMonthlyBonusSpend: number
  /** Currency for commercial detail */
  currency: "GBP" | "USD" | "EUR"
  /**
   * Optional notes to the team in the commercial section. Anything
   * operator-specific worth flagging.
   */
  commercialNotes?: string
}

const OPERATORS: Record<string, OperatorConfig> = {
  gamblr,
}

export function listOperatorSlugs(): string[] {
  return Object.keys(OPERATORS)
}

export function getOperatorConfig(slug: string): OperatorConfig | undefined {
  return OPERATORS[slug]
}
