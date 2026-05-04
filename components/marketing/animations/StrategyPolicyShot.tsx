"use client"

// Product-shot for /product/strategies (paired opposite the StrategyBuilder
// animation). Shows a "live strategies" panel — the operator-facing list
// view with a few rows, status pills, and budgets.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const ROWS = [
  {
    name: "UK casino · retention lift",
    objective: "Retention",
    cpep: 1.84,
    lift: 14.3,
    status: "live",
  },
  {
    name: "DE sportsbook · welcome",
    objective: "Activation",
    cpep: 0.92,
    lift: 21.1,
    status: "live",
  },
  {
    name: "ES live · VIP retention",
    objective: "Revenue",
    cpep: 4.20,
    lift: 9.6,
    status: "calibrating",
  },
  {
    name: "IT slots · bonus-abuse",
    objective: "Defence",
    cpep: 0.0,
    lift: -0.4,
    status: "live",
  },
]

const STATUS_CLASS: Record<string, string> = {
  live: "bg-quest-success-soft text-quest-success",
  calibrating: "bg-quest-warning-soft text-quest-warning",
}

export function StrategyPolicyShot() {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-quest-surface-muted/30 px-5 py-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Strategies
          </div>
          <div className="text-[14px] font-semibold text-quest-ink">
            4 active · 1 calibrating
          </div>
        </div>
        <button
          type="button"
          className="rounded-md bg-quest-accent px-3 py-1 text-[11px] font-medium text-white"
        >
          + New strategy
        </button>
      </div>

      {/* Column heads */}
      <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.6fr] gap-3 border-b border-border px-5 py-2 text-[10px] font-medium uppercase tracking-wider text-quest-ink-faint">
        <span>Strategy</span>
        <span>Objective</span>
        <span className="text-right">CPEP</span>
        <span className="text-right">Lift</span>
        <span className="text-right">Status</span>
      </div>

      {/* Rows */}
      <ul>
        {ROWS.map((r, i) => {
          const highlight = pulse % ROWS.length === i
          return (
            <motion.li
              key={r.name}
              animate={{
                backgroundColor: highlight
                  ? "rgba(26,35,50,0.04)"
                  : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.6fr] gap-3 border-b border-border px-5 py-3 text-[12px] last:border-b-0"
            >
              <span className="text-quest-ink font-medium">{r.name}</span>
              <span className="text-quest-ink-muted">{r.objective}</span>
              <span className="tabular-nums text-quest-ink text-right">
                £{r.cpep.toFixed(2)}
              </span>
              <span
                className={`tabular-nums text-right font-medium ${
                  r.lift >= 0 ? "text-quest-success" : "text-quest-danger"
                }`}
              >
                {r.lift >= 0 ? "+" : ""}
                {r.lift.toFixed(1)}%
              </span>
              <span className="text-right">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_CLASS[r.status]}`}
                >
                  {r.status === "live" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                  {r.status}
                </span>
              </span>
            </motion.li>
          )
        })}
      </ul>

      <div className="bg-quest-surface-muted/30 px-5 py-2.5 text-[11px] text-quest-ink-faint border-t border-border">
        Updated 2 sec ago · 91,245 players treated · 10% holdout
      </div>
    </div>
  )
}
