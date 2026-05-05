"use client"

// Reactivation visual: lapsed player on the left, Canon on the right.
// A signal pulses across the link, the bonus shows as a quiet card
// dropping into the player area, and the player flips to Active.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Scenario = {
  player: string
  lapseDays: number
  bonusType: string
  bonusValue: string
  resultArpu: string
}

const SCENARIOS: Scenario[] = [
  {
    player: "P-91823",
    lapseDays: 14,
    bonusType: "Lapse-prevention",
    bonusValue: "£5.00 bonus",
    resultArpu: "+£18.40",
  },
  {
    player: "P-44721",
    lapseDays: 28,
    bonusType: "Free-play",
    bonusValue: "8 free spins",
    resultArpu: "+£12.00",
  },
  {
    player: "P-65812",
    lapseDays: 7,
    bonusType: "Mission",
    bonusValue: "Streak 3",
    resultArpu: "+£9.20",
  },
]

export function ReactivationHookAnimation() {
  const [tick, setTick] = useState(0)
  const [phase, setPhase] = useState<"lapsed" | "ship" | "reactive">("lapsed")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("ship"), 700)
    const t2 = setTimeout(() => setPhase("reactive"), 1900)
    const t3 = setTimeout(() => {
      setTick((v) => v + 1)
      setPhase("lapsed")
    }, 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [tick])

  const sc = SCENARIOS[tick % SCENARIOS.length]
  const reactivated = phase === "reactive"
  const bonusVisible = phase === "ship" || phase === "reactive"

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Reactivation engine · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Lapsed player → sized bonus → re-engaged
      </div>

      <div className="relative mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Player card (left) */}
        <motion.div
          animate={{
            opacity: reactivated ? 1 : 0.7,
            filter: reactivated ? "saturate(1)" : "saturate(0.3)",
          }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-border bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-quest-accent-soft text-quest-accent text-[12px] font-semibold tabular-nums">
              {sc.player.slice(2, 4)}
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-quest-ink tabular-nums">
                #{sc.player}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
                {reactivated ? "Active" : `Lapsed ${sc.lapseDays}d`}
              </div>
            </div>
          </div>

          {/* Bonus card slides into the player area */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: bonusVisible ? 1 : 0,
              y: bonusVisible ? 0 : 8,
            }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex items-center justify-between gap-2 rounded-md border border-quest-success/30 bg-quest-success-soft/60 px-2.5 py-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-1.5 w-1.5 rounded-full bg-quest-success" />
              <span className="text-[11px] text-quest-success font-semibold truncate">
                {sc.bonusType}
              </span>
            </div>
            <span className="text-[11px] tabular-nums text-quest-success font-medium">
              {sc.bonusValue}
            </span>
          </motion.div>
        </motion.div>

        {/* Connector */}
        <div className="relative h-1 w-16 sm:w-24">
          <div className="absolute inset-0 rounded-full bg-quest-surface-muted" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: phase === "lapsed" ? 0 : "100%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-quest-accent"
          />
          {/* Travelling dot */}
          <motion.div
            initial={false}
            animate={{
              x: phase === "ship" ? "100%" : 0,
              opacity: phase === "ship" ? 1 : 0,
            }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute -top-[3px] h-2 w-2 rounded-full bg-quest-accent shadow-[0_0_0_3px_rgba(26,35,50,0.18)]"
          />
        </div>

        {/* Canon source (right) */}
        <div className="rounded-xl border border-quest-ink/10 bg-[#1A2332] p-4 text-white">
          <div
            style={{
              fontFamily:
                'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
              color: "#F2EBD3",
              letterSpacing: "0.28em",
              fontSize: 11,
            }}
          >
            CANON
          </div>
          <div className="mt-1.5 text-[11px] text-white/70 leading-tight">
            Picks size + moment, per player
          </div>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-quest-success" />
            shipping
          </div>
        </div>
      </div>

      {/* Outcome */}
      <motion.div
        animate={{ opacity: reactivated ? 1 : 0, y: reactivated ? 0 : 8 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-6 bottom-5 flex items-center justify-between rounded-md border border-border bg-white px-4 py-3 text-[13px]"
      >
        <span className="font-semibold text-quest-ink">Re-engaged</span>
        <span className="tabular-nums text-quest-success font-semibold">
          ARPU lift {sc.resultArpu}
        </span>
      </motion.div>
    </div>
  )
}
