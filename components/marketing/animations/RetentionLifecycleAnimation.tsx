"use client"

// Retention lifecycle visual — players acquired with marketing spend,
// then split into "retained" (green, value) vs "churned" (red, spend
// wasted). Repeats with new arrivals so the totals tick.

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type PlayerOutcome = "retained" | "churned"
type PlayerCard = {
  id: number
  name: string
  spend: number
  outcome: PlayerOutcome
}

const PLAYER_NAMES = [
  "P-91823",
  "P-44721",
  "P-65812",
  "P-33458",
  "P-89102",
  "P-21097",
  "P-77110",
  "P-50221",
]

function makePlayer(i: number): PlayerCard {
  // Roughly 60% retained, 40% churned — matches the £40M / £60M split
  // story on the homepage Problem section.
  const outcome: PlayerOutcome = Math.random() > 0.4 ? "retained" : "churned"
  const spend = Math.round(2 + Math.random() * 7)
  return {
    id: i,
    name: PLAYER_NAMES[i % PLAYER_NAMES.length],
    spend,
    outcome,
  }
}

export function RetentionLifecycleAnimation() {
  const [players, setPlayers] = useState<PlayerCard[]>([])
  const [counter, setCounter] = useState(0)
  const [retainedSpend, setRetainedSpend] = useState(0)
  const [wastedSpend, setWastedSpend] = useState(0)

  useEffect(() => {
    let id = 0
    const interval = setInterval(() => {
      id += 1
      const next = makePlayer(id)
      setPlayers((prev) => [next, ...prev].slice(0, 4))
      setCounter((c) => c + 1)
      if (next.outcome === "retained") {
        setRetainedSpend((s) => s + next.spend)
      } else {
        setWastedSpend((s) => s + next.spend)
      }
    }, 1300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Retention lifecycle · live cohort
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Acquired → engaged → retained / churned
      </div>

      {/* Lane labels */}
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-[11px] uppercase tracking-wider text-quest-ink-faint">
        <span>Acquired</span>
        <span>·</span>
        <span className="text-right">Outcome (last 7d)</span>
      </div>

      {/* Animated player cards */}
      <div className="relative mt-3 h-[180px]">
        <AnimatePresence initial={false}>
          {players.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -40, y: 0 }}
              animate={{
                opacity: 1 - i * 0.18,
                x: 0,
                y: i * 42,
              }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-0 grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-md border border-border bg-white px-3 py-2 text-[12px]"
            >
              <span className="flex items-center gap-2 text-quest-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-quest-accent" />
                <span className="tabular-nums">{p.name}</span>
                <span className="text-quest-ink-faint text-[11px]">
                  spent £{p.spend}
                </span>
              </span>
              <span className="text-quest-ink-faint">→</span>
              <span
                className={`flex items-center justify-end gap-1.5 font-medium ${
                  p.outcome === "retained" ? "text-quest-success" : "text-quest-danger"
                }`}
              >
                {p.outcome === "retained" ? "Retained" : "Churned"}
                <span className="text-[11px] tabular-nums opacity-80">
                  {p.outcome === "retained" ? `+£${p.spend * 4}` : `-£${p.spend}`}
                </span>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Running totals */}
      <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-3">
        <Pill
          label="Cohort size"
          value={counter.toLocaleString("en-GB")}
        />
        <Pill
          label="Retained value"
          value={`£${(retainedSpend * 4).toLocaleString("en-GB")}`}
          tone="success"
        />
        <Pill
          label="Wasted spend"
          value={`£${wastedSpend.toLocaleString("en-GB")}`}
          tone="danger"
        />
      </div>
    </div>
  )
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: "success" | "danger"
}) {
  return (
    <div className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2 min-w-0">
      <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint truncate">
        {label}
      </div>
      <div
        className={`mt-0.5 text-[14px] font-semibold tabular-nums ${
          tone === "success"
            ? "text-quest-success"
            : tone === "danger"
              ? "text-quest-danger"
              : "text-quest-ink"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
