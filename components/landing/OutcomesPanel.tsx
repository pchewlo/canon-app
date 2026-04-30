"use client"

import { useEffect, useRef, useState } from "react"

type Outcome = {
  label: string
  liftLabel: string
  control: { label: string; value: number; display: string }
  canon: { label: string; value: number; display: string }
  /** absolute lift number, animates from 0 → final on view */
  finalLift: number
  /** prefix for the headline number */
  prefix?: string
  /** suffix for the headline number */
  suffix?: string
  /** decimal places */
  decimals?: number
}

const OUTCOMES: Outcome[] = [
  {
    label: "Activation rate lift",
    liftLabel: "Newly registered players who place a first bet",
    control: { label: "Control", value: 27, display: "27%" },
    canon: { label: "Canon", value: 39, display: "39%" },
    finalLift: 45,
    suffix: "%",
  },
  {
    label: "One-month retention lift",
    liftLabel: "Players still active 30 days after sign-up",
    control: { label: "Control", value: 22, display: "22%" },
    canon: { label: "Canon", value: 33, display: "33%" },
    finalLift: 52,
    suffix: "%",
  },
  {
    label: "ARPU lift per player",
    liftLabel: "Incremental monthly revenue per treated player",
    control: { label: "Control", value: 24, display: "£24.00" },
    canon: { label: "Canon", value: 36.5, display: "£36.50" },
    finalLift: 12.5,
    prefix: "£",
    decimals: 2,
  },
]

export function OutcomesPanel() {
  return (
    <div className="relative">
      {/* Subtle dot-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,35,50,0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, transparent 75%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
        {OUTCOMES.map((o) => (
          <OutcomeCard key={o.label} outcome={o} />
        ))}
      </div>
    </div>
  )
}

function OutcomeCard({ outcome }: { outcome: Outcome }) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const headline = useCountUp(outcome.finalLift, inView, outcome.decimals ?? 0)
  const controlPct = (outcome.control.value / outcome.canon.value) * 100

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(26,35,50,0.18)]"
    >
      {/* Top accent stripe */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(68,131,97,0) 0%, rgba(68,131,97,0.5) 50%, rgba(68,131,97,0) 100%)",
        }}
      />

      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        {outcome.label}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-quest-success text-[20px] font-semibold tabular-nums">
          +
        </span>
        <span
          className="tabular-nums leading-none text-quest-success"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 5.6vw, 72px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
          }}
        >
          {outcome.prefix ?? ""}
          {headline}
          {outcome.suffix ?? ""}
        </span>
      </div>

      <p className="mt-2 text-[13px] leading-snug text-quest-ink-muted">
        {outcome.liftLabel}
      </p>

      {/* Comparison bars */}
      <div className="mt-7 space-y-3">
        <BarRow
          label={outcome.canon.label}
          display={outcome.canon.display}
          pct={100}
          color="#1A2332"
          delayMs={inView ? 0 : 0}
          animate={inView}
        />
        <BarRow
          label={outcome.control.label}
          display={outcome.control.display}
          pct={controlPct}
          color="#9CA3AF"
          delayMs={inView ? 200 : 0}
          animate={inView}
        />
      </div>
    </div>
  )
}

function BarRow({
  label,
  display,
  pct,
  color,
  delayMs,
  animate,
}: {
  label: string
  display: string
  pct: number
  color: string
  delayMs: number
  animate: boolean
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[12px] text-quest-ink-muted">{label}</span>
        <span className="text-[12px] font-medium tabular-nums text-quest-ink">
          {display}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-quest-surface-muted">
        <div
          className="h-full rounded-full"
          style={{
            width: animate ? `${pct}%` : "0%",
            background: color,
            transition: `width 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
          }}
        />
      </div>
    </div>
  )
}

function useCountUp(target: number, start: boolean, decimals = 0): string {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    const duration = 1100
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4)
      setV(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target])
  return v.toFixed(decimals)
}
