"use client"

// Welcome optimisation: new sign-up arrives at the top, Canon routes
// it to one of four sized welcome offers. Counters per lane tick.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Lane = {
  key: string
  label: string
  hint: string
  tone: "success" | "accent" | "warning" | "danger"
}

const LANES: Lane[] = [
  { key: "match", label: "£50 deposit match", hint: "high elasticity", tone: "success" },
  { key: "freeplay", label: "8 spins free-play", hint: "casino · tier 2", tone: "accent" },
  { key: "mission", label: "Activation mission", hint: "low elasticity", tone: "warning" },
  { key: "noaction", label: "No bonus", hint: "suspected hunter", tone: "danger" },
]

const TONE_BORDER: Record<Lane["tone"], string> = {
  success: "border-quest-success/40",
  accent: "border-quest-accent/40",
  warning: "border-quest-warning/40",
  danger: "border-quest-danger/40",
}

const TONE_DOT: Record<Lane["tone"], string> = {
  success: "bg-quest-success",
  accent: "bg-quest-accent",
  warning: "bg-quest-warning",
  danger: "bg-quest-danger",
}

const TONE_BG: Record<Lane["tone"], string> = {
  success: "bg-quest-success-soft",
  accent: "bg-quest-accent-soft",
  warning: "bg-quest-warning-soft",
  danger: "bg-quest-danger-soft",
}

const SIGNUPS = [
  { name: "paid · UK · iOS", laneIdx: 0 },
  { name: "organic · DE · Android", laneIdx: 1 },
  { name: "affiliate · ES · web", laneIdx: 2 },
  { name: "paid · IT · iOS", laneIdx: 0 },
  { name: "proxy IP · multi-account", laneIdx: 3 },
  { name: "organic · UK · Android", laneIdx: 1 },
  { name: "paid · NL · iOS", laneIdx: 0 },
  { name: "VPN · velocity spike", laneIdx: 3 },
]

export function WelcomeBranchAnimation() {
  const [tick, setTick] = useState(0)
  const [counts, setCounts] = useState([0, 0, 0, 0])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1300)
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

      {/* Incoming sign-up + Canon */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1 overflow-hidden">
          <motion.div
            key={tick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-quest-surface-muted px-3 py-1.5 text-[12px] text-quest-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-quest-accent" />
            Sign-up · {current.name}
          </motion.div>
        </div>
        <div className="rounded-full bg-[#1A2332] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2EBD3]">
          Canon routes
        </div>
      </div>

      {/* Lanes */}
      <div className="mt-4 space-y-2">
        {LANES.map((lane, i) => {
          const hit = current.laneIdx === i
          return (
            <motion.div
              key={lane.key}
              animate={{
                scale: hit ? 1.015 : 1,
                opacity: hit ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 ${TONE_BORDER[lane.tone]} ${hit ? TONE_BG[lane.tone] : "bg-white"}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[lane.tone]}`} />
                <span className="text-[12.5px] font-semibold text-quest-ink truncate">
                  {lane.label}
                </span>
                <span className="text-[11px] text-quest-ink-faint truncate">
                  {lane.hint}
                </span>
              </div>
              <span className="tabular-nums text-[11px] font-semibold text-quest-ink-muted shrink-0">
                {counts[i]}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
