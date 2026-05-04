"use client"

// Welcome optimisation visual: new sign-ups stream in from the left,
// each one is routed by Canon to a sized welcome offer based on
// elasticity / channel / device. Bonus-hunter signups get a no-action.

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Lane = {
  key: string
  label: string
  hint: string
  tone: "success" | "accent" | "warning" | "danger" | "muted"
}

const LANES: Lane[] = [
  { key: "match", label: "£50 deposit match", hint: "high-elasticity, organic", tone: "success" },
  { key: "freeplay", label: "8 spins free-play", hint: "casino, tier 2", tone: "accent" },
  { key: "mission", label: "Activation mission", hint: "low-elasticity / low channel", tone: "warning" },
  { key: "noaction", label: "No bonus", hint: "suspected hunter", tone: "danger" },
]

const TONE_CLASS: Record<Lane["tone"], string> = {
  success: "border-quest-success/30 bg-quest-success-soft text-quest-success",
  accent: "border-quest-accent/30 bg-quest-accent-soft text-quest-accent",
  warning: "border-quest-warning/30 bg-quest-warning-soft text-quest-warning",
  danger: "border-quest-danger/30 bg-quest-danger-soft text-quest-danger",
  muted: "border-border bg-quest-surface-muted text-quest-ink-muted",
}

const SIGNUPS = [
  { name: "Sign-up · paid · UK · iOS", laneIdx: 0 },
  { name: "Sign-up · organic · DE · Android", laneIdx: 1 },
  { name: "Sign-up · affiliate · ES · web", laneIdx: 2 },
  { name: "Sign-up · paid · IT · iOS", laneIdx: 0 },
  { name: "Sign-up · UNK · proxy IP", laneIdx: 3 },
  { name: "Sign-up · organic · UK · Android", laneIdx: 1 },
  { name: "Sign-up · paid · NL · iOS", laneIdx: 0 },
  { name: "Sign-up · UNK · multi-account", laneIdx: 3 },
]

export function WelcomeBranchAnimation() {
  const [tick, setTick] = useState(0)
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1)
    }, 1100)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const su = SIGNUPS[tick % SIGNUPS.length]
    setCounts((prev) => {
      const next = [...prev]
      next[su.laneIdx] += 1
      return next
    })
  }, [tick])

  const current = SIGNUPS[tick % SIGNUPS.length]

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Welcome routing · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Sign-up → routed to a sized welcome
      </div>

      <div className="mt-5 grid grid-cols-[180px_auto_1fr] items-center gap-4">
        {/* Incoming sign-ups */}
        <div className="space-y-2">
          <AnimatePresence>
            <motion.div
              key={tick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-md border border-border bg-quest-surface-muted px-3 py-2 text-[11.5px] text-quest-ink"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-quest-accent" />
                {current.name}
              </span>
            </motion.div>
          </AnimatePresence>
          {[1, 2, 3].map((n) => {
            const past = SIGNUPS[(tick - n + SIGNUPS.length) % SIGNUPS.length]
            return (
              <div
                key={n}
                className="rounded-md border border-border bg-white px-3 py-1.5 text-[11px] text-quest-ink-muted"
                style={{ opacity: 0.55 - n * 0.12 }}
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-quest-ink-faint" />
                  {past.name}
                </span>
              </div>
            )
          })}
        </div>

        {/* Canon routing badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-[#1A2332] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2EBD3]">
            Canon
          </div>
          <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
            routes
          </div>
        </div>

        {/* Lane targets */}
        <div className="space-y-2">
          {LANES.map((lane, i) => {
            const hit = current.laneIdx === i
            return (
              <motion.div
                key={lane.key}
                animate={{
                  scale: hit ? 1.03 : 1,
                  opacity: hit ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-[12px] ${TONE_CLASS[lane.tone]}`}
              >
                <span>
                  <span className="font-semibold">{lane.label}</span>
                  <span className="ml-2 opacity-70 text-[11px]">{lane.hint}</span>
                </span>
                <span className="tabular-nums text-[11px] opacity-80">
                  {counts[i]}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        10% holdout stays on uniform offer · lift measured monthly
      </div>
    </div>
  )
}
