"use client"

// Holdout-attribution visual: a treated cohort and a control cohort,
// with bars filling to their values, then a "lift" callout growing
// in. Loops every ~5s.

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const SCENARIOS = [
  {
    title: "30-day retention",
    treated: { label: "Canon", value: 33, display: "33%" },
    control: { label: "Control", value: 22, display: "22%" },
    lift: "+52%",
    suffix: "lift",
  },
  {
    title: "Activation rate",
    treated: { label: "Canon", value: 39, display: "39%" },
    control: { label: "Control", value: 27, display: "27%" },
    lift: "+45%",
    suffix: "lift",
  },
  {
    title: "ARPU per player",
    treated: { label: "Canon", value: 36.5, display: "£36.50" },
    control: { label: "Control", value: 24, display: "£24.00" },
    lift: "+£12.50",
    suffix: "incremental",
  },
]

export function InsightsLiftAnimation() {
  const [tick, setTick] = useState(0)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setReveal(false)
      setTimeout(() => setReveal(true), 80)
      setTimeout(() => setTick((t) => t + 1), 4500)
    }, 4500)
    setReveal(true)
    return () => clearInterval(id)
  }, [])

  const sc = SCENARIOS[tick % SCENARIOS.length]
  const max = Math.max(sc.treated.value, sc.control.value)
  const treatedPct = (sc.treated.value / max) * 100
  const controlPct = (sc.control.value / max) * 100

  return (
    <div
      ref={cardRef}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Holdout attribution · last 30d
          </div>
          <div className="mt-1 text-[15px] font-semibold text-quest-ink">
            {sc.title}
          </div>
        </div>
        <span className="rounded-full bg-quest-info-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-info">
          ITT
        </span>
      </div>

      {/* Bars */}
      <div className="mt-6 space-y-5">
        <BarRow
          label={sc.treated.label}
          display={sc.treated.display}
          pct={treatedPct}
          color="#1A2332"
          play={reveal}
          delayMs={150}
        />
        <BarRow
          label={sc.control.label}
          display={sc.control.display}
          pct={controlPct}
          color="#9CA3AF"
          play={reveal}
          delayMs={350}
        />
      </div>

      {/* Lift callout */}
      <motion.div
        key={tick}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: reveal ? 1 : 0, scale: reveal ? 1 : 0.8 }}
        transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        className="mt-8 flex items-baseline justify-center gap-3"
      >
        <span
          className="tabular-nums leading-none text-quest-success"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(56px, 6vw, 84px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
          }}
        >
          {sc.lift}
        </span>
        <span className="text-[14px] text-quest-ink-muted">{sc.suffix}</span>
      </motion.div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        91,245 treated · 10,138 control
      </div>
    </div>
  )
}

function BarRow({
  label,
  display,
  pct,
  color,
  play,
  delayMs,
}: {
  label: string
  display: string
  pct: number
  color: string
  play: boolean
  delayMs: number
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] text-quest-ink-muted">{label}</span>
        <span className="text-[13px] font-medium tabular-nums text-quest-ink">
          {display}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-quest-surface-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: play ? `${pct}%` : 0 }}
          transition={{ duration: 0.9, delay: delayMs / 1000, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
