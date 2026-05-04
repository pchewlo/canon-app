"use client"

// Reactivation visual: a lapsed player sits on the left dimmed/grey.
// Canon ships a sized bonus → it travels across the panel → the player
// reactivates (colour returns, status flips to Active, ARPU ticks up).
// Loops with different lapse durations + bonus sizes.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Scenario = {
  player: string
  lapseDays: number
  bonusType: string
  bonusValue: string
  bonusTone: "success" | "warning" | "accent"
  resultArpu: string
}

const SCENARIOS: Scenario[] = [
  {
    player: "P-91823",
    lapseDays: 14,
    bonusType: "Lapse-prevention",
    bonusValue: "£5.00",
    bonusTone: "success",
    resultArpu: "+£18.40",
  },
  {
    player: "P-44721",
    lapseDays: 28,
    bonusType: "Free-play",
    bonusValue: "8 spins",
    bonusTone: "accent",
    resultArpu: "+£12.00",
  },
  {
    player: "P-65812",
    lapseDays: 7,
    bonusType: "Mission",
    bonusValue: "Streak 3",
    bonusTone: "warning",
    resultArpu: "+£9.20",
  },
]

const TONE_CLASS: Record<Scenario["bonusTone"], string> = {
  success: "bg-quest-success text-white",
  warning: "bg-quest-warning text-white",
  accent: "bg-quest-accent text-white",
}

export function ReactivationHookAnimation() {
  const [tick, setTick] = useState(0)
  const [phase, setPhase] = useState<"lapsed" | "ship" | "land" | "reactive">("lapsed")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("ship"), 700)
    const t2 = setTimeout(() => setPhase("land"), 1700)
    const t3 = setTimeout(() => setPhase("reactive"), 2300)
    const t4 = setTimeout(() => {
      setTick((v) => v + 1)
      setPhase("lapsed")
    }, 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [tick])

  const sc = SCENARIOS[tick % SCENARIOS.length]
  const reactivated = phase === "reactive"

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Reactivation engine · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Lapsed player → sized bonus → re-engaged
      </div>

      {/* Stage */}
      <div className="relative mt-8 flex h-[200px] items-center justify-between gap-4 px-2">
        {/* Lapsed player card */}
        <motion.div
          animate={{
            opacity: reactivated ? 1 : 0.55,
            filter: reactivated ? "saturate(1)" : "saturate(0.2)",
          }}
          transition={{ duration: 0.6 }}
          className="flex w-[180px] flex-col items-center gap-2 rounded-xl border border-border bg-white p-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-quest-accent-soft text-quest-accent text-[14px] font-semibold tabular-nums">
            {sc.player.slice(2, 4)}
          </div>
          <div className="text-[12px] font-semibold text-quest-ink tabular-nums">
            #{sc.player}
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              reactivated
                ? "bg-quest-success-soft text-quest-success"
                : "bg-quest-surface-muted text-quest-ink-faint"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {reactivated ? "Active" : `Lapsed ${sc.lapseDays}d`}
          </div>
        </motion.div>

        {/* Bonus packet */}
        <motion.div
          initial={false}
          animate={{
            opacity:
              phase === "ship" || phase === "land" ? 1 : 0,
            x: phase === "ship" ? 60 : phase === "land" ? -60 : 0,
            scale: phase === "land" ? 1.1 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl px-4 py-3 shadow-lg ${TONE_CLASS[sc.bonusTone]}`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider opacity-85">
            {sc.bonusType}
          </div>
          <div className="mt-0.5 text-[20px] font-semibold tabular-nums">
            {sc.bonusValue}
          </div>
        </motion.div>

        {/* Canon source */}
        <div className="flex w-[180px] flex-col items-center gap-2 rounded-xl border border-quest-ink/10 bg-[#1A2332] p-4 text-white">
          <div
            className="text-quest-ink uppercase"
            style={{
              fontFamily:
                'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
              color: "#F2EBD3",
              letterSpacing: "0.28em",
              fontSize: 12,
            }}
          >
            CANON
          </div>
          <div className="text-[11px] text-white/65 text-center leading-tight">
            Picks the size and the moment, per player
          </div>
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-quest-success" />
            shipping
          </div>
        </div>
      </div>

      {/* Outcome */}
      <motion.div
        animate={{ opacity: reactivated ? 1 : 0, y: reactivated ? 0 : 8 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-6 bottom-5 flex items-center justify-between rounded-md bg-quest-success-soft px-4 py-3 text-[13px]"
      >
        <span className="font-semibold text-quest-success">Re-engaged</span>
        <span className="tabular-nums text-quest-success/80">
          ARPU lift {sc.resultArpu}
        </span>
      </motion.div>
    </div>
  )
}
