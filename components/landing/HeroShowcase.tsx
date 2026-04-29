'use client'

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// Sits in the right column of the hero. Three cards in a horizontal row
// with ~110px overlap between adjacent cards, the middle one slightly
// lower and in front. Mobile falls back to a vertical stack.
export function HeroShowcase() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:block lg:relative lg:h-[400px]">
      <div className="h-[320px] lg:absolute lg:top-0 lg:left-0 lg:w-[220px] lg:h-[320px] lg:rotate-[-2deg] lg:z-10">
        <RetentionShot />
      </div>
      <div className="h-[320px] lg:absolute lg:top-12 lg:left-[110px] lg:w-[220px] lg:h-[320px] lg:z-30">
        <RevenueShot />
      </div>
      <div className="h-[320px] lg:absolute lg:top-0 lg:left-[220px] lg:w-[220px] lg:h-[320px] lg:rotate-[2deg] lg:z-20">
        <DecisionsShot />
      </div>
    </div>
  )
}

function CardShell({
  tag,
  children,
}: {
  tag: string
  children: React.ReactNode
}) {
  return (
    <div className="h-full rounded-xl border border-border bg-card shadow-[0_18px_50px_-18px_rgba(26,35,50,0.18)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 shrink-0">
        <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">
          {tag}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-quest-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
          </span>
          LIVE
        </span>
      </div>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shot 1 — Retention uplift
// ---------------------------------------------------------------------------

function RetentionShot() {
  const data = [4.2, 5.8, 7.4, 8.6, 10.2, 12.1, 14.3]
  const w = 360
  const h = 110
  const pad = 8
  const max = 16
  const xs = data.map((_, i) => pad + (i * (w - 2 * pad)) / (data.length - 1))
  const ys = data.map((v) => h - pad - (v / max) * (h - 2 * pad))
  const path = data.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]},${ys[i]}`).join(" ")
  const area = `${path} L ${xs[xs.length - 1]},${h - pad} L ${xs[0]},${h - pad} Z`

  return (
    <CardShell tag="Retention · 7-day window">
      <div className="px-5 pt-5 pb-2">
        <div className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">
          Retention lift
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-[40px] font-semibold tabular-nums leading-none text-quest-success"
          >
            +14.3%
          </motion.span>
          <span className="text-[12px] text-quest-ink-muted">
            vs. <span className="line-through">4.2%</span> control
          </span>
        </div>
      </div>
      <div className="px-3 pb-2 flex-1 flex items-end">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
          <path d={area} fill="#448361" fillOpacity="0.12" />
          <path
            d={path}
            fill="none"
            stroke="#448361"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {xs.map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={ys[i]}
              r={i === xs.length - 1 ? 4 : 2}
              fill="#448361"
            />
          ))}
        </svg>
      </div>
      <div className="border-t border-border bg-quest-surface-muted/40 px-4 py-2.5 text-[11px] text-quest-ink-muted shrink-0">
        Across <span className="text-quest-ink font-medium">182,491</span> agents · CPEP £1.87
      </div>
    </CardShell>
  )
}

// ---------------------------------------------------------------------------
// Shot 2 — Revenue / ARPU report
// ---------------------------------------------------------------------------

function RevenueShot() {
  return (
    <CardShell tag="ARPU · This month">
      <div className="px-5 pt-5 pb-2">
        <div className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">
          ARPU
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-[40px] font-semibold tabular-nums leading-none text-quest-ink"
          >
            £15.20
          </motion.span>
          <span className="inline-flex items-center rounded bg-quest-success-soft px-1.5 py-0.5 text-[12px] font-medium text-quest-success">
            +24% MoM
          </span>
        </div>
      </div>
      <div className="flex-1 px-5 pb-2 flex flex-col justify-center">
        <div className="space-y-3.5">
          <BarRow label="Canon-treated" value="£15.20" pct={1.0} color="#1A2332" delay={0.2} />
          <BarRow label="Rules control"  value="£12.80" pct={0.84} color="#9CA3AF" delay={0.35} />
        </div>
        <div className="mt-5 text-[11px] text-quest-ink-faint leading-relaxed">
          ARPU lift{" "}
          <span className="text-quest-ink font-medium">+£2.40 per player</span>.
        </div>
      </div>
      <div className="border-t border-border bg-quest-surface-muted/40 px-4 py-2.5 text-[11px] text-quest-ink-muted shrink-0">
        91,245 treated · 10% holdout
      </div>
    </CardShell>
  )
}

function BarRow({
  label,
  value,
  pct,
  color,
  delay,
}: {
  label: string
  value: string
  pct: number
  color: string
  delay: number
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] text-quest-ink-muted">{label}</span>
        <span className="text-[12px] font-medium tabular-nums text-quest-ink">
          {value}
        </span>
      </div>
      <div className="h-2 rounded-full bg-quest-surface-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shot 3 — Live decision ticker
// ---------------------------------------------------------------------------

type DecisionRow = {
  player: string
  type: string
  variant: "accent" | "success" | "neutral" | "muted" | "danger"
  cost: string
}

const DECISIONS: DecisionRow[] = [
  { player: "P-91823", type: "Mission",   variant: "accent",  cost: "£2.50" },
  { player: "P-44721", type: "Bonus",     variant: "success", cost: "£5.00" },
  { player: "P-78342", type: "Cooldown",  variant: "muted",   cost: "—" },
  { player: "P-21097", type: "F2P",       variant: "neutral", cost: "—" },
  { player: "P-65812", type: "RG Hold",   variant: "danger",  cost: "—" },
  { player: "P-33458", type: "Mission",   variant: "accent",  cost: "£1.50" },
  { player: "P-89102", type: "No action", variant: "muted",   cost: "—" },
  { player: "P-55672", type: "Bonus",     variant: "success", cost: "£8.00" },
  { player: "P-11283", type: "Mission",   variant: "accent",  cost: "£3.00" },
  { player: "P-77110", type: "Cooldown",  variant: "muted",   cost: "—" },
  { player: "P-29384", type: "Bonus",     variant: "success", cost: "£4.00" },
  { player: "P-50221", type: "Mission",   variant: "accent",  cost: "£2.00" },
]

const VARIANT_CLASS: Record<DecisionRow["variant"], string> = {
  accent: "bg-quest-accent-soft text-quest-accent",
  success: "bg-quest-success-soft text-quest-success",
  neutral: "bg-quest-surface-muted text-quest-ink-muted",
  muted: "bg-quest-surface-muted text-quest-ink-muted opacity-60",
  danger: "bg-quest-danger-soft text-quest-danger",
}

function DecisionsShot() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])

  const visible = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const d = DECISIONS[(tick + i) % DECISIONS.length]
        return { ...d, _key: `tick-${tick + i}` }
      }),
    [tick]
  )

  return (
    <CardShell tag="Decision feed">
      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((d) => (
            <motion.div
              layout
              key={d._key}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex items-center gap-2 border-b border-border px-3 text-[12px] ${
                d.variant === "danger" ? "bg-quest-danger-soft/40" : ""
              }`}
            >
              <div
                className={`flex w-full items-center gap-2 py-2.5 ${
                  d.variant === "muted" ? "opacity-60" : ""
                }`}
              >
                <span className="w-[60px] tabular-nums text-quest-ink-muted truncate text-[11px]">
                  {d.player}
                </span>
                <span className="w-[68px] shrink-0">
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${VARIANT_CLASS[d.variant]}`}
                  >
                    {d.type}
                  </span>
                </span>
                <span className="ml-auto tabular-nums text-quest-ink-muted text-[11px] shrink-0">
                  {d.cost}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="border-t border-border bg-quest-surface-muted/40 px-4 py-2.5 text-[11px] text-quest-ink-muted shrink-0">
        <span className="text-quest-ink font-medium">812,304</span> decisions today
      </div>
    </CardShell>
  )
}
