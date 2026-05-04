"use client"

// Per-player agent reasoning chain: signals stream in, candidate actions
// score, the winning action gets highlighted, decision ships. Shows what
// "an agent per player" actually feels like.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const SCENARIOS = [
  {
    player: "P-91823",
    profile: "Slots · Tier 2 · UK · Day 14",
    signals: [
      { label: "Lifecycle: D14, retained", weight: 0.3 },
      { label: "Last loss streak: 3", weight: 0.4 },
      { label: "Avg session: 22m", weight: 0.2 },
      { label: "Elasticity prior: 0.71", weight: 0.5 },
    ],
    candidates: [
      { label: "Mission · streak 3", score: 0.81 },
      { label: "Bonus · £2.50", score: 0.62 },
      { label: "Cooldown", score: 0.18 },
      { label: "No action", score: 0.09 },
    ],
    pickedIdx: 0,
  },
  {
    player: "P-44721",
    profile: "Sportsbook · Tier 1 · DE · Day 6",
    signals: [
      { label: "Lifecycle: D6, at-risk", weight: 0.6 },
      { label: "Deposit decline ×2", weight: 0.45 },
      { label: "Login streak broken", weight: 0.5 },
      { label: "Elasticity prior: 0.83", weight: 0.6 },
    ],
    candidates: [
      { label: "Bonus · £5.00", score: 0.86 },
      { label: "Mission · cashback", score: 0.41 },
      { label: "No action", score: 0.20 },
      { label: "Hold (RG)", score: 0.10 },
    ],
    pickedIdx: 0,
  },
  {
    player: "P-65812",
    profile: "Live casino · Tier 1 · ES · Day 9",
    signals: [
      { label: "Stake escalation 2.1×", weight: 0.7 },
      { label: "Session 47m (limit 60)", weight: 0.6 },
      { label: "Loss-chasing detected", weight: 0.85 },
      { label: "Elasticity prior: 0.42", weight: 0.3 },
    ],
    candidates: [
      { label: "Hold (RG)", score: 0.92 },
      { label: "Cooldown", score: 0.74 },
      { label: "No action", score: 0.30 },
      { label: "Bonus · £0", score: 0.08 },
    ],
    pickedIdx: 0,
  },
]

export function AgentReasoningAnimation() {
  const [tick, setTick] = useState(0)
  const [phase, setPhase] = useState<"signals" | "score" | "ship">("signals")

  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase("signals")
      setTimeout(() => setPhase("score"), 1100)
      setTimeout(() => setPhase("ship"), 2200)
      setTimeout(() => setTick((t) => t + 1), 3500)
    }, 4000)
    return () => clearInterval(cycle)
  }, [])

  const sc = SCENARIOS[tick % SCENARIOS.length]

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      {/* Player header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-quest-accent-soft text-quest-accent text-[12px] font-semibold tabular-nums">
            {sc.player.slice(2, 4)}
          </div>
          <div>
            <div className="text-[14px] font-semibold text-quest-ink tabular-nums">
              Player #{sc.player}
            </div>
            <div className="text-[11px] text-quest-ink-faint">{sc.profile}</div>
          </div>
        </div>
        <span className="rounded-full bg-quest-success-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-success">
          Active
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Signals */}
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Signals consumed
          </div>
          <ul className="mt-2 space-y-1.5">
            {sc.signals.map((s, i) => (
              <motion.li
                key={`${tick}-${s.label}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.18, duration: 0.3 }}
                className="flex items-center justify-between rounded-md border border-border px-2.5 py-1.5 text-[11.5px]"
              >
                <span className="text-quest-ink truncate">{s.label}</span>
                <span className="text-quest-ink-faint tabular-nums text-[10px] ml-2">
                  w {s.weight.toFixed(2)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Candidate scoring */}
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Candidate actions
          </div>
          <ul className="mt-2 space-y-1.5">
            {sc.candidates.map((c, i) => {
              const isPicked = i === sc.pickedIdx && phase !== "signals"
              return (
                <motion.li
                  key={`${tick}-${c.label}`}
                  initial={false}
                  animate={{
                    backgroundColor: isPicked
                      ? "rgba(68,131,97,0.12)"
                      : "rgba(255,255,255,1)",
                    borderColor: isPicked
                      ? "rgba(68,131,97,0.4)"
                      : "rgba(55,53,47,0.12)",
                  }}
                  className="rounded-md border px-2.5 py-1.5 text-[11.5px]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        isPicked ? "text-quest-success font-medium" : "text-quest-ink"
                      }
                    >
                      {c.label}
                    </span>
                    <span className="tabular-nums text-[10px] text-quest-ink-faint">
                      {c.score.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-quest-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: phase === "signals" ? 0 : `${c.score * 100}%`,
                      }}
                      transition={{ delay: 0.05 * i, duration: 0.5 }}
                      className={`h-full rounded-full ${
                        isPicked ? "bg-quest-success" : "bg-quest-ink-faint"
                      }`}
                    />
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Ship */}
      <motion.div
        initial={false}
        animate={{
          opacity: phase === "ship" ? 1 : 0,
          y: phase === "ship" ? 0 : 8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-6 bottom-5 flex items-center justify-between rounded-md border border-quest-success/30 bg-quest-success-soft px-4 py-2.5 text-[12px]"
      >
        <span className="font-semibold text-quest-success">
          Decision shipped: {sc.candidates[sc.pickedIdx].label}
        </span>
        <span className="tabular-nums text-quest-success/80">14ms · logged</span>
      </motion.div>
    </div>
  )
}
