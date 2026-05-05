"use client"

// Crypto trading hero: a trader timeline that walks through the
// per-trader incentive flow — sign-up bonus → enters position → wins
// rebate points → exits position → another bonus. Loops continuously.

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Step = {
  id: number
  label: string
  detail: string
  tone: "accent" | "success" | "warning" | "muted"
}

const STEPS: Step[] = [
  {
    id: 0,
    label: "Sign-up bonus",
    detail: "$25 deposit credit",
    tone: "accent",
  },
  {
    id: 1,
    label: "Enter position",
    detail: "BTC long · 0.12 ETH",
    tone: "muted",
  },
  {
    id: 2,
    label: "Maker rebate",
    detail: "+12 points",
    tone: "success",
  },
  {
    id: 3,
    label: "Exit position",
    detail: "+£42 realised",
    tone: "muted",
  },
  {
    id: 4,
    label: "Volume bonus",
    detail: "Fee waived next 24h",
    tone: "warning",
  },
  {
    id: 5,
    label: "Enter position",
    detail: "ETH short · 1.4 ETH",
    tone: "muted",
  },
  {
    id: 6,
    label: "Maker rebate",
    detail: "+18 points",
    tone: "success",
  },
]

const TONE_CLASS: Record<Step["tone"], string> = {
  accent: "border-quest-accent/30 bg-quest-accent-soft text-quest-accent",
  success: "border-quest-success/30 bg-quest-success-soft text-quest-success",
  warning: "border-quest-warning/30 bg-quest-warning-soft text-quest-warning",
  muted: "border-border bg-white text-quest-ink",
}

const DOT_CLASS: Record<Step["tone"], string> = {
  accent: "bg-quest-accent",
  success: "bg-quest-success",
  warning: "bg-quest-warning",
  muted: "bg-quest-ink-faint",
}

export function CryptoTradingAnimation() {
  const [tick, setTick] = useState(0)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => {
        const next = t + 1
        const step = STEPS[next % STEPS.length]
        if (step.label === "Maker rebate") {
          const earned = parseInt(step.detail.replace(/\D/g, ""), 10) || 0
          setPoints((p) => p + earned)
        }
        return next
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  // Visible window: most recent step + 3 history items
  const visible = Array.from({ length: 4 }, (_, i) => {
    const idx = (tick - i + STEPS.length * 10) % STEPS.length
    return { ...STEPS[idx], _key: `${tick}-${i}` }
  })

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Trader timeline · live
          </div>
          <div className="mt-1 text-[15px] font-semibold text-quest-ink">
            Sign-up bonus → trade → reward → repeat
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
            Reward points
          </div>
          <motion.div
            key={points}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-[18px] font-semibold tabular-nums text-quest-success"
          >
            {points.toLocaleString("en-GB")}
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <ol className="relative mt-5">
        <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />
        <AnimatePresence initial={false}>
          {visible.map((s, i) => (
            <motion.li
              key={s._key}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1 - i * 0.18, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-start gap-3 pb-3"
            >
              <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0">
                {i === 0 && (
                  <span
                    className={`absolute inset-0 rounded-full ${DOT_CLASS[s.tone]} animate-ping opacity-60`}
                  />
                )}
                <span
                  className={`relative inline-block h-3.5 w-3.5 rounded-full ring-4 ring-white ${DOT_CLASS[s.tone]}`}
                />
              </span>
              <div
                className={`flex flex-1 items-center justify-between gap-2 rounded-md border px-3 py-2 text-[12.5px] ${TONE_CLASS[s.tone]}`}
              >
                <span className="font-medium">{s.label}</span>
                <span className="tabular-nums text-[11.5px] opacity-85">
                  {s.detail}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-3">
        <Pill label="Trader tier" value="Active" tone="accent" />
        <Pill label="Volume / 24h" value="$8.4K" />
        <Pill label="Fee tier" value="−25%" tone="success" />
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
  tone?: "success" | "accent"
}) {
  return (
    <div className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
        {label}
      </div>
      <div
        className={`mt-0.5 text-[13px] font-semibold tabular-nums ${
          tone === "success"
            ? "text-quest-success"
            : tone === "accent"
              ? "text-quest-accent"
              : "text-quest-ink"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
