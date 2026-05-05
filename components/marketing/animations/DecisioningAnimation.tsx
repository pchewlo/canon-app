"use client"

// Visualises the core decisioning loop:
//   incoming events → signal extraction → policy scoring → guardrails → decision
// Events stream in from the left, pass through three vertical lanes,
// and emit as a final action on the right.

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

type ActionTone = "accent" | "success" | "warning" | "danger" | "muted"

const ACTIONS: { label: string; tone: ActionTone }[] = [
  { label: "Mission · £2.50", tone: "accent" },
  { label: "Bonus · £5.00", tone: "success" },
  { label: "Cooldown", tone: "muted" },
  { label: "Hold (RG)", tone: "danger" },
  { label: "No action", tone: "muted" },
  { label: "Cashback · £2.20", tone: "warning" },
]

const TONE_CLASS: Record<ActionTone, string> = {
  accent: "bg-quest-accent-soft text-quest-accent border-quest-accent/30",
  success: "bg-quest-success-soft text-quest-success border-quest-success/30",
  warning: "bg-quest-warning-soft text-quest-warning border-quest-warning/30",
  danger: "bg-quest-danger-soft text-quest-danger border-quest-danger/30",
  muted: "bg-quest-surface-muted text-quest-ink-muted border-border",
}

export function DecisioningAnimation() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  const currentEvent = EVENTS[tick % EVENTS.length]
  const currentAction = ACTIONS[tick % ACTIONS.length]

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-5">
        {/* Left: incoming event stream */}
        <div className="relative flex h-full flex-col gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Player events
          </div>
          <div className="relative flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`in-${tick}`}
                layout
                initial={{ x: -28, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex w-full items-center gap-2 truncate rounded-md border border-border bg-quest-surface-muted px-3 py-2 text-[12px] text-quest-ink"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-quest-accent" />
                <span className="truncate">{currentEvent}</span>
              </motion.div>
            </AnimatePresence>

            {/* Ghost past events */}
            <div className="mt-2 space-y-2">
              {[1, 2, 3].map((n) => {
                const e = EVENTS[(tick - n + EVENTS.length) % EVENTS.length]
                return (
                  <div
                    key={n}
                    className="flex w-full items-center gap-2 truncate rounded-md border border-border bg-white px-3 py-1.5 text-[11px] text-quest-ink-muted"
                    style={{ opacity: 0.55 - n * 0.13 }}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-quest-ink-faint" />
                    <span className="truncate">{e}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Centre: pipeline */}
        <Pipeline tick={tick} />

        {/* Right: shipped decision */}
        <div className="relative flex h-full flex-col gap-3">
          <div className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
            Shipped action
          </div>
          <div className="relative flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`out-${tick}`}
                layout
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                className={`flex w-full items-center justify-between gap-2 truncate rounded-md border px-3 py-2 text-[12px] font-medium ${TONE_CLASS[currentAction.tone]}`}
              >
                <span className="truncate">{currentAction.label}</span>
                <span className="shrink-0 text-[10px] tabular-nums opacity-70">
                  14ms
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Ghost past actions */}
            <div className="mt-2 space-y-2">
              {[1, 2, 3].map((n) => {
                const a = ACTIONS[(tick - n + ACTIONS.length) % ACTIONS.length]
                return (
                  <div
                    key={n}
                    className={`flex w-full items-center gap-2 truncate rounded-md border px-3 py-1.5 text-[11px] ${TONE_CLASS[a.tone]}`}
                    style={{ opacity: 0.55 - n * 0.13 }}
                  >
                    <span className="truncate">{a.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-quest-ink-faint">
        Decision engine · live
      </div>
    </div>
  )
}

function Pipeline({ tick }: { tick: number }) {
  const lanes = [
    { name: "Signals", value: ["loss-chasing", "lifecycle d3", "high-variance"][tick % 3] },
    { name: "Policy", value: "score 0.72" },
    { name: "Guardrails", value: ["passed", "passed", "RG flag"][tick % 3] },
  ]
  return (
    <div className="flex flex-col gap-3 w-[200px]">
      {lanes.map((lane, i) => (
        <motion.div
          key={lane.name}
          animate={{
            backgroundColor: ["#FFFFFF", "rgba(26,35,50,0.04)", "#FFFFFF"],
          }}
          transition={{
            duration: 0.7,
            delay: i * 0.22,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
          className="flex items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-2.5 text-[12px]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-quest-ink-faint">
            {lane.name}
          </span>
          <span className="truncate text-quest-ink font-medium">
            {lane.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
