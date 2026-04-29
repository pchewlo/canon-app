'use client'

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"

const STEP_MS = 5500

const STEPS = [
  {
    n: "01",
    title: "Set the metric",
    body: "Pick the outcome that matters — activation, retention, ARPU, referral. One strategy, one objective.",
  },
  {
    n: "02",
    title: "Set the budget",
    body: "Daily spend cap, per-player cap, control group size. Like Facebook Ads Manager, but for bonus economics.",
  },
  {
    n: "03",
    title: "Agents deploy",
    body: "An agent per player decides — second by second — whether to act, hold, or stand down. Tactics that work survive.",
  },
]

export function HowItWorksAnimated() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
      {/* Steps list */}
      <div className="col-span-12 lg:col-span-5 space-y-3">
        {STEPS.map((s, i) => {
          const isActive = active === i
          return (
            <button
              key={s.n}
              onClick={() => setActive(i)}
              className={`relative w-full text-left p-5 rounded-xl border transition-colors ${
                isActive
                  ? "bg-white border-border shadow-sm"
                  : "bg-transparent border-transparent hover:bg-white/40"
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
                    isActive ? "text-quest-accent" : "text-quest-ink-faint"
                  }`}
                >
                  Step {s.n}
                </span>
              </div>
              <h3
                className={`mt-2 text-[20px] font-semibold tracking-[-0.01em] ${
                  isActive ? "text-quest-ink" : "text-quest-ink-muted"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`mt-2 text-[14px] leading-relaxed ${
                  isActive ? "text-quest-ink-muted" : "text-quest-ink-faint"
                }`}
              >
                {s.body}
              </p>
              <div className="mt-3 h-[2px] rounded-full bg-quest-surface-muted overflow-hidden">
                {isActive && (
                  <motion.div
                    key={`progress-${i}-${active}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                    className="h-full bg-quest-accent"
                  />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Animated screen panel */}
      <div className="col-span-12 lg:col-span-7">
        <div className="relative h-[440px] rounded-xl border border-border bg-white shadow-[0_18px_60px_-20px_rgba(26,35,50,0.18)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span
              className="text-quest-accent uppercase"
              style={{
                fontFamily: 'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.26em",
                lineHeight: 1,
                paddingLeft: "0.26em",
              }}
            >
              Canon
            </span>
            <span className="text-[11px] uppercase tracking-wide text-quest-ink-faint">
              {active === 0 && "Strategies · New"}
              {active === 1 && "Strategies · New · Budget"}
              {active === 2 && "Overview · Real-time"}
            </span>
          </div>

          <div className="relative h-[392px] overflow-hidden">
            <AnimatePresence mode="wait">
              {active === 0 && (
                <Screen key="s1">
                  <Step1Screen />
                </Screen>
              )}
              {active === 1 && (
                <Screen key="s2">
                  <Step2Screen />
                </Screen>
              )}
              {active === 2 && (
                <Screen key="s3">
                  <Step3Screen />
                </Screen>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-0 p-6"
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Step 1 — pick the metric (Retention auto-selects after a beat)
// ---------------------------------------------------------------------------

const METRICS = [
  { id: "activation", label: "Activation", sub: "First-deposit conversion" },
  { id: "retention",  label: "Retention",  sub: "1-month return rate" },
  { id: "arpu",       label: "ARPU",       sub: "Revenue per active player" },
  { id: "referral",   label: "Referral",   sub: "Net new from existing" },
]

function Step1Screen() {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const id = setTimeout(() => setSelected("retention"), 900)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
          Step 01 of 03
        </div>
        <h4 className="mt-1.5 text-[18px] font-semibold tracking-[-0.01em] text-quest-ink">
          What outcome are you optimising for?
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {METRICS.map((m) => {
          const isSelected = selected === m.id
          return (
            <motion.button
              key={m.id}
              onClick={() => setSelected(m.id)}
              animate={{
                borderColor: isSelected ? "#1A2332" : "rgba(55,53,47,0.12)",
                backgroundColor: isSelected ? "rgba(26,35,50,0.04)" : "#ffffff",
              }}
              transition={{ duration: 0.25 }}
              className="relative text-left rounded-lg border p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[14px] font-semibold text-quest-ink">
                    {m.label}
                  </div>
                  <div className="mt-1 text-[12px] text-quest-ink-muted">
                    {m.sub}
                  </div>
                </div>
                <motion.div
                  animate={{
                    scale: isSelected ? 1 : 0.6,
                    opacity: isSelected ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-quest-accent text-white"
                >
                  <Check size={12} strokeWidth={2.5} />
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="pt-2 flex items-center justify-end">
        <motion.button
          animate={{ opacity: selected ? 1 : 0.5 }}
          className="rounded-md bg-quest-accent px-4 py-2 text-[13px] font-medium text-white"
          disabled={!selected}
        >
          Continue →
        </motion.button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 2 — set the budget (numbers tween up)
// ---------------------------------------------------------------------------

function Step2Screen() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
          Step 02 of 03
        </div>
        <h4 className="mt-1.5 text-[18px] font-semibold tracking-[-0.01em] text-quest-ink">
          Set the spend.
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <BudgetField label="Daily spend cap" target={62000} prefix="£" />
        <BudgetField label="Per-player daily cap" target={25} prefix="£" />
      </div>

      <BudgetField label="Control group" target={10} suffix="%" wide />

      <div className="rounded-lg border border-border bg-quest-surface-muted/40 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-quest-ink-muted">
            Estimated monthly reach
          </span>
          <ReachCounter target={1862000} />
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-white overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="h-full bg-quest-accent rounded-full"
          />
        </div>
      </div>

      <div className="pt-1 flex items-center justify-end">
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          className="rounded-md bg-quest-accent px-4 py-2 text-[13px] font-medium text-white"
        >
          Launch agents →
        </motion.button>
      </div>
    </div>
  )
}

function BudgetField({
  label,
  target,
  prefix,
  suffix,
  wide,
}: {
  label: string
  target: number
  prefix?: string
  suffix?: string
  wide?: boolean
}) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const dur = 1000
    let raf = 0
    const step = () => {
      const t = Math.min(1, (Date.now() - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return (
    <div className={`rounded-lg border border-border bg-white p-4 ${wide ? "col-span-2" : ""}`}>
      <div className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">
        {label}
      </div>
      <div className="mt-1.5 text-[24px] font-semibold tabular-nums text-quest-ink leading-none">
        {prefix}
        {val.toLocaleString("en-GB")}
        {suffix}
      </div>
    </div>
  )
}

function ReachCounter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const dur = 1400
    let raf = 0
    const step = () => {
      const t = Math.min(1, (Date.now() - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])

  return (
    <span className="text-[18px] font-semibold tabular-nums text-quest-ink">
      {val.toLocaleString("en-GB")} players
    </span>
  )
}

// ---------------------------------------------------------------------------
// Step 3 — agents deploy (decision feed ticking + counter)
// ---------------------------------------------------------------------------

const STEP3_DECISIONS = [
  { player: "P-91823", type: "Mission",   variant: "accent",  cost: "£2.50" },
  { player: "P-44721", type: "Bonus",     variant: "success", cost: "£5.00" },
  { player: "P-78342", type: "Cooldown",  variant: "muted",   cost: "—" },
  { player: "P-21097", type: "F2P",       variant: "neutral", cost: "—" },
  { player: "P-65812", type: "RG Hold",   variant: "danger",  cost: "—" },
  { player: "P-33458", type: "Mission",   variant: "accent",  cost: "£1.50" },
  { player: "P-89102", type: "No action", variant: "muted",   cost: "—" },
  { player: "P-55672", type: "Bonus",     variant: "success", cost: "£8.00" },
  { player: "P-11283", type: "Mission",   variant: "accent",  cost: "£3.00" },
] as const

const VARIANT_CLASS: Record<string, string> = {
  accent: "bg-quest-accent-soft text-quest-accent",
  success: "bg-quest-success-soft text-quest-success",
  neutral: "bg-quest-surface-muted text-quest-ink-muted",
  muted: "bg-quest-surface-muted text-quest-ink-muted opacity-60",
  danger: "bg-quest-danger-soft text-quest-danger",
}

function Step3Screen() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 850)
    return () => clearInterval(id)
  }, [])

  const visible = Array.from({ length: 4 }, (_, i) => {
    const d = STEP3_DECISIONS[(tick + i) % STEP3_DECISIONS.length]
    return { ...d, _key: `tick-${tick + i}` }
  })

  // Counter increments deterministically — start at 812304 and advance each tick.
  const counter = 812304 + tick * 47

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
          Step 03 of 03
        </div>
        <h4 className="mt-1.5 text-[18px] font-semibold tracking-[-0.01em] text-quest-ink">
          Agents deployed.
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MiniStat label="Active agents" value="182,491" />
        <MiniStat label="Decisions today" value={counter.toLocaleString("en-GB")} live />
        <MiniStat label="Retention lift" value="+14.3%" accent />
      </div>

      <div className="flex-1 rounded-lg border border-border bg-white overflow-hidden flex flex-col min-h-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2 shrink-0">
          <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">
            Decision feed
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-quest-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
            </span>
            LIVE
          </span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((d) => (
              <motion.div
                layout
                key={d._key}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex items-center gap-2 border-b border-border px-3 text-[12px] ${
                  d.variant === "danger" ? "bg-quest-danger-soft/40" : ""
                }`}
              >
                <div
                  className={`flex w-full items-center gap-2 py-2 ${
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
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  accent,
  live,
}: {
  label: string
  value: string
  accent?: boolean
  live?: boolean
}) {
  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2.5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-wide text-quest-ink-faint">
          {label}
        </div>
        {live && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
          </span>
        )}
      </div>
      <div
        className={`mt-1 text-[18px] font-semibold tabular-nums leading-none ${
          accent ? "text-quest-success" : "text-quest-ink"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
