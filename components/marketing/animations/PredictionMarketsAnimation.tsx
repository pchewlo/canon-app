"use client"

// Prediction markets hero: a grid of market tiles with binary YES/NO
// odds. Canon decisions appear as small chips floating above the
// markets — boosted YES, fee discount, free first trade — sized per
// trader. Tile probabilities tick subtly to feel live.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Market = {
  id: string
  title: string
  yes: number
}

const SEED_MARKETS: Market[] = [
  { id: "m1", title: "BTC > $120K by EOY", yes: 0.62 },
  { id: "m2", title: "Fed cuts in Q3", yes: 0.41 },
  { id: "m3", title: "AI bill passes", yes: 0.28 },
  { id: "m4", title: "AAPL beats on earnings", yes: 0.74 },
  { id: "m5", title: "ETH ETF approved", yes: 0.55 },
  { id: "m6", title: "Election ABC wins", yes: 0.49 },
]

const DECISIONS = [
  { label: "Boost · YES", tone: "success" },
  { label: "Free first trade", tone: "accent" },
  { label: "Fee waived", tone: "warning" },
  { label: "Volume mission", tone: "success" },
] as const

const TONE_CLASS: Record<string, string> = {
  success: "bg-quest-success-soft text-quest-success border-quest-success/30",
  accent: "bg-quest-accent-soft text-quest-accent border-quest-accent/30",
  warning: "bg-quest-warning-soft text-quest-warning border-quest-warning/30",
}

export function PredictionMarketsAnimation() {
  const [markets, setMarkets] = useState(SEED_MARKETS)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id1 = setInterval(() => {
      setMarkets((prev) =>
        prev.map((m) => ({
          ...m,
          yes: clamp(m.yes + (Math.random() - 0.5) * 0.04),
        })),
      )
    }, 1000)
    const id2 = setInterval(() => setTick((t) => t + 1), 1300)
    return () => {
      clearInterval(id1)
      clearInterval(id2)
    }
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Prediction markets · per-trader incentives
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Markets that price; Canon prices the trader
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {markets.map((m, i) => {
          const yesPct = Math.round(m.yes * 100)
          const showDecision = (tick + i) % 4 === 0
          const decision = DECISIONS[(tick + i) % DECISIONS.length]
          return (
            <div
              key={m.id}
              className="relative rounded-md border border-border bg-white px-3 py-2.5"
            >
              <div className="text-[12px] font-medium text-quest-ink truncate">
                {m.title}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[10.5px]">
                <Bar label="YES" pct={yesPct} colour="#448361" />
                <Bar label="NO" pct={100 - yesPct} colour="#9CA3AF" />
              </div>
              {showDecision && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute -top-2 right-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${TONE_CLASS[decision.tone]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {decision.label}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        Same architecture · denser signal surface
      </div>
    </div>
  )
}

function clamp(n: number) {
  return Math.max(0.04, Math.min(0.96, n))
}

function Bar({ label, pct, colour }: { label: string; pct: number; colour: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-[24px] text-quest-ink-faint">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-quest-surface-muted overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-full"
          style={{ background: colour }}
        />
      </div>
      <span className="w-[28px] text-right tabular-nums text-quest-ink">
        {pct}¢
      </span>
    </div>
  )
}
