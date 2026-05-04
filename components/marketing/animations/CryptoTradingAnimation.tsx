"use client"

// Crypto trading hero: a candlestick-ish price strip animates left-to-right
// while bonus pills (maker rebate, fee discount, free first trade) float
// up next to specific traders. Suggests per-trader incentives layered onto
// trading flow.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CANDLES = 28

function makeCandles(seed: number) {
  // Pseudo-random but deterministic per seed so the chart is stable.
  let s = seed
  const rng = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const out: { open: number; close: number; high: number; low: number }[] = []
  let last = 50
  for (let i = 0; i < CANDLES; i++) {
    const move = (rng() - 0.5) * 14
    const open = last
    const close = Math.max(8, Math.min(92, open + move))
    const high = Math.max(open, close) + rng() * 4
    const low = Math.min(open, close) - rng() * 4
    out.push({ open, close, high, low })
    last = close
  }
  return out
}

const TRADER_BONUSES = [
  { label: "Maker rebate +0.02%", tone: "success" },
  { label: "Free first trade", tone: "accent" },
  { label: "Fee discount 25%", tone: "warning" },
  { label: "Volume bonus", tone: "success" },
] as const

const TONE_CLASS: Record<string, string> = {
  success: "bg-quest-success-soft text-quest-success border-quest-success/30",
  accent: "bg-quest-accent-soft text-quest-accent border-quest-accent/30",
  warning: "bg-quest-warning-soft text-quest-warning border-quest-warning/30",
}

export function CryptoTradingAnimation() {
  const [seed, setSeed] = useState(7)
  const [bonusTick, setBonusTick] = useState(0)

  useEffect(() => {
    const id1 = setInterval(() => setSeed((s) => s + 1), 7000)
    const id2 = setInterval(() => setBonusTick((t) => t + 1), 1600)
    return () => {
      clearInterval(id1)
      clearInterval(id2)
    }
  }, [])

  const candles = makeCandles(seed)
  const W = 360
  const H = 200
  const pad = 10
  const cw = (W - 2 * pad) / CANDLES

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Trader incentives · per-decision
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Bonuses sized to each trader, not the market
      </div>

      {/* Chart */}
      <div className="mt-5 rounded-lg border border-border bg-quest-surface-muted/30 p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={pad}
              x2={W - pad}
              y1={pad + f * (H - 2 * pad)}
              y2={pad + f * (H - 2 * pad)}
              stroke="rgba(0,0,0,0.05)"
            />
          ))}

          {candles.map((c, i) => {
            const up = c.close >= c.open
            const colour = up ? "#448361" : "#D44C47"
            const x = pad + i * cw + cw / 2
            const yHigh = pad + ((100 - c.high) / 100) * (H - 2 * pad)
            const yLow = pad + ((100 - c.low) / 100) * (H - 2 * pad)
            const yOpen = pad + ((100 - c.open) / 100) * (H - 2 * pad)
            const yClose = pad + ((100 - c.close) / 100) * (H - 2 * pad)
            const yTop = Math.min(yOpen, yClose)
            const yBot = Math.max(yOpen, yClose)
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={yHigh} y2={yLow} stroke={colour} strokeWidth="1" />
                <rect
                  x={x - cw * 0.32}
                  y={yTop}
                  width={cw * 0.64}
                  height={Math.max(1, yBot - yTop)}
                  fill={colour}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Floating per-trader bonus */}
      <div className="absolute inset-x-6 bottom-16 flex justify-center">
        {[0, 1, 2].map((slot) => {
          const idx = (bonusTick + slot) % TRADER_BONUSES.length
          const b = TRADER_BONUSES[idx]
          return (
            <motion.div
              key={`${bonusTick}-${slot}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: slot * 0.18, ease: "easeOut" }}
              className={`mx-1 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${TONE_CLASS[b.tone]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {b.label}
            </motion.div>
          )
        })}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        Same engine. Different ledger.
      </div>
    </div>
  )
}
