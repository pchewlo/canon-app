import type { OperatorConfig } from "../operators"

export const gamblr: OperatorConfig = {
  slug: "gamblr",
  name: "Gamblr",
  domain: "gamblr.io",
  preparedDate: "May 2026",
  positioning: "VIP-led, crypto-native, $200M turnover",
  techStack: [
    "Altenar (sportsbook)",
    "iBankroll (bankroll)",
    "Anjouan license",
  ],
  defaultMonthlyBonusSpend: 100_000,
  currency: "GBP",
  underperformanceRefund: 25_000,
  commercialNotes:
    "Invoicing in GBP with USD reference available — Gamblr is crypto-native and likely operates primarily in USD.",
}
