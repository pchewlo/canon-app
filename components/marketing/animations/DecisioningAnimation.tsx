"use client"

// Visualises the core decisioning loop:
//   event in → signals → policy → guardrails → action out
// One event at a time. A wave sweeps through the three lanes, then the
// matching action emerges on the right. Cycle is intentionally slow so a
// reader can follow each step.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type ActionTone = "accent" | "success" | "warning" | "danger" | "muted"

type Cycle = {
  event: string
  signal: string
  policy: string
  guardrail: string
  action: string
  tone: ActionTone
}

const CYCLES: Cycle[] = [
  {
    event: "loss streak ×4",
    signal: "loss-chasing",
    policy: "score 0.81",
    guardrail: "RG flag",
    action: "Hold (RG)",
    tone: "danger",
  },
  {
    event: "session 38m",
    signal: "lifecycle d3",
    policy: "score 0.72",
    guardrail: "passed",
    action: "Mission · £2.50",
    tone: "accent",
  },
  {
    event: "stake ↑ 2.1×",
    signal: "high-variance",
    policy: "score 0.64",
    guardrail: "passed",
    action: "Cashback · £2.20",
    tone: "warning",
  },
  {
    event: "deposit £20",
    signal: "lifecycle d1",
    policy: "score 0.58",
    guardrail: "passed",
    action: "Bonus · £5.00",
    tone: "success",
  },
]

const TONE_CLASS: Record<ActionTone, string> = {
  accent: "bg-quest-accent-soft text-quest-accent border-quest-accent/30",
  success: "bg-quest-success-soft text-quest-success border-quest-success/30",
  warning: "bg-quest-warning-soft text-quest-warning border-quest-warning/30",
  danger: "bg-quest-danger-soft text-quest-danger border-quest-danger/30",
  muted: "bg-quest-surface-muted text-quest-ink-muted border-border",
}

// Total cycle in ms. Each step gets a slice so the read order is clear.
const CYCLE_MS = 4200
const STEP_EVENT = 0
const STEP_SIGNAL = 700
const STEP_POLICY = 1300
const STEP_GUARD = 1900
const STEP_ACTION = 2500

export function DecisioningAnimation() {
  const [tick, setTick] = useState(0)
  const [phase, setPhase] = useState(0) // 0 = event, 1 = signal, 2 = policy, 3 = guard, 4 = action

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), STEP_SIGNAL),
      setTimeout(() => setPhase(2), STEP_POLICY),
      setTimeout(() => setPhase(3), STEP_GUARD),
      setTimeout(() => setPhase(4), STEP_ACTION),
      setTimeout(() => {
        setPhase(0)
        setTick((t) => t + 1)
      }, CYCLE_MS),
    ]
    return () => timers.forEach(clearTimeout)
  }, [tick])

  const cycle = CYCLES[tick % CYCLES.length]

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="grid h-full grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)_minmax(0,0.95fr)] items-center gap-4">
        {/* Left: incoming event */}
        <div className="flex h-full flex-col">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Player event
          </div>
          <div className="mt-3 flex flex-1 items-center">
            <motion.div
              key={`evt-${tick}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex w-full items-center gap-2 rounded-md border border-border bg-quest-surface-muted px-3 py-2 text-[12px] text-quest-ink"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-quest-accent" />
              <span className="truncate">{cycle.event}</span>
            </motion.div>
          </div>
        </div>

        {/* Centre: pipeline lanes — pulse in sequence with the cycle */}
        <div className="flex h-full flex-col justify-center gap-2.5">
          <Lane name="Signals" value={cycle.signal} active={phase >= 1} />
          <Lane name="Policy" value={cycle.policy} active={phase >= 2} />
          <Lane name="Guardrails" value={cycle.guardrail} active={phase >= 3} />
        </div>

        {/* Right: shipped action */}
        <div className="flex h-full flex-col">
          <div className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Shipped action
          </div>
          <div className="mt-3 flex flex-1 items-center">
            <motion.div
              key={`act-${tick}`}
              initial={{ y: -6, opacity: 0 }}
              animate={{
                y: phase >= 4 ? 0 : -6,
                opacity: phase >= 4 ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-[12px] font-medium ${TONE_CLASS[cycle.tone]}`}
            >
              <span className="truncate">{cycle.action}</span>
              <span className="shrink-0 text-[10px] tabular-nums opacity-70">
                14ms
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-quest-ink-faint">
        Decision engine · live
      </div>
    </div>
  )
}

function Lane({
  name,
  value,
  active,
}: {
  name: string
  value: string
  active: boolean
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: active ? "rgba(26,35,50,0.06)" : "#FFFFFF",
        borderColor: active ? "rgba(26,35,50,0.25)" : "rgba(26,35,50,0.10)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2.5 text-[12px]"
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-quest-ink-faint">
        {name}
      </span>
      <motion.span
        animate={{
          color: active ? "#1A2332" : "#9B9A97",
          opacity: active ? 1 : 0.55,
        }}
        transition={{ duration: 0.35 }}
        className="truncate font-medium tabular-nums"
      >
        {value}
      </motion.span>
    </motion.div>
  )
}
