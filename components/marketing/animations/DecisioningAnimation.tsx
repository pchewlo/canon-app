"use client"

// Visualises the core decisioning loop:
//   incoming events → signal extraction → policy scoring → guardrails → decision
//
// Events stream in from the left, pass through three vertical lanes,
// and emit as a final action on the right. Loops continuously.

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const EVENTS = [
  "login",
  "deposit £20",
  "loss streak ×4",
  "session 38m",
  "stake ↑ 2.1×",
  "deposit decline",
  "win streak ×3",
  "first session",
  "logout",
  "cashout £45",
] as const

const ACTIONS = [
  { label: "Mission · £2.50", tone: "accent" },
  { label: "Bonus · £5.00", tone: "success" },
  { label: "Cooldown", tone: "muted" },
  { label: "Hold (RG)", tone: "danger" },
  { label: "No action", tone: "muted" },
  { label: "Cashback · £2.20", tone: "warning" },
] as const

const TONE_CLASS: Record<string, string> = {
  accent: "bg-quest-accent-soft text-quest-accent border-quest-accent/30",
  success: "bg-quest-success-soft text-quest-success border-quest-success/30",
  warning: "bg-quest-warning-soft text-quest-warning border-quest-warning/30",
  danger: "bg-quest-danger-soft text-quest-danger border-quest-danger/30",
  muted: "bg-quest-surface-muted text-quest-ink-muted border-border",
}

export function DecisioningAnimation() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  const currentEvent = EVENTS[tick % EVENTS.length]
  const currentAction = ACTIONS[tick % ACTIONS.length]

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* Left: incoming event stream */}
        <div className="relative flex flex-col gap-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Player events
          </div>
          <div className="relative h-[260px]">
            <AnimatePresence>
              <motion.div
                key={`in-${tick}`}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-x-0 top-0 inline-flex items-center gap-2 rounded-md border border-border bg-quest-surface-muted px-3 py-2 text-[12px] text-quest-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-quest-accent" />
                {currentEvent}
              </motion.div>
            </AnimatePresence>

            {/* "ghost" past events */}
            <div className="absolute inset-x-0 top-12 space-y-2 opacity-40">
              {[1, 2, 3].map((n) => {
                const e = EVENTS[(tick - n + EVENTS.length) % EVENTS.length]
                return (
                  <div
                    key={n}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-1.5 text-[11px] text-quest-ink-muted"
                    style={{ opacity: 0.5 - n * 0.12 }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-quest-ink-faint" />
                    {e}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Centre: pipeline */}
        <div className="flex h-full flex-col items-center justify-center">
          <Pipeline tick={tick} />
        </div>

        {/* Right: shipped decision */}
        <div className="relative flex flex-col items-end gap-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Shipped action
          </div>
          <div className="relative h-[260px] w-full">
            <AnimatePresence>
              <motion.div
                key={`out-${tick}`}
                initial={{ x: -40, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className={`absolute right-0 top-0 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[12.5px] font-medium ${TONE_CLASS[currentAction.tone]}`}
              >
                {currentAction.label}
                <span className="text-[10px] tabular-nums opacity-70">·14ms</span>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 top-12 flex flex-col items-end space-y-2 opacity-40">
              {[1, 2, 3].map((n) => {
                const a = ACTIONS[(tick - n + ACTIONS.length) % ACTIONS.length]
                return (
                  <div
                    key={n}
                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] ${TONE_CLASS[a.tone]}`}
                    style={{ opacity: 0.5 - n * 0.12 }}
                  >
                    {a.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-quest-ink-faint">
        Decision engine · live
      </div>
    </div>
  )
}

function Pipeline({ tick }: { tick: number }) {
  const lanes = [
    { name: "Signals", value: ["loss-chasing", "lifecycle-d3", "high-variance"][tick % 3] },
    { name: "Policy", value: "score 0.72" },
    { name: "Guardrails", value: ["passed", "passed", "RG flag"][tick % 3] },
  ]
  return (
    <div className="flex flex-col gap-3">
      {lanes.map((lane, i) => (
        <motion.div
          key={lane.name}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 0.6,
            delay: i * 0.18,
            repeat: Infinity,
            repeatDelay: 1.4,
          }}
          className="flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-2.5 text-[12px]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-quest-ink-faint w-[68px]">
            {lane.name}
          </span>
          <span className="text-quest-ink font-medium">{lane.value}</span>
        </motion.div>
      ))}
    </div>
  )
}
