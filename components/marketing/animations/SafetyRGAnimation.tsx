"use client"

// RG check trace: 5 checks fire in sequence with pass/warn/fail outcomes,
// then a final decision badge appears (Hold or Approved depending on the
// scenario). Loops between two scenarios.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type CheckStatus = "pending" | "pass" | "warn" | "fail"

type CheckRow = {
  label: string
  status: CheckStatus
  note?: string
}

const SCENARIOS: { player: string; outcome: "hold" | "approved"; outcomeNote: string; checks: CheckRow[] }[] = [
  {
    player: "P-91823",
    outcome: "hold",
    outcomeNote: "Bonus held · loss-chasing flagged",
    checks: [
      { label: "Self-exclusion list", status: "pass" },
      { label: "Jurisdictional spend cap", status: "pass" },
      { label: "Loss-chasing window", status: "fail", note: "ratio 0.84 > 0.6" },
      { label: "Stake escalation", status: "warn", note: "2.3× baseline" },
      { label: "Session duration", status: "pass" },
    ],
  },
  {
    player: "P-44721",
    outcome: "approved",
    outcomeNote: "Bonus £5.00 approved",
    checks: [
      { label: "Self-exclusion list", status: "pass" },
      { label: "Jurisdictional spend cap", status: "pass" },
      { label: "Loss-chasing window", status: "pass" },
      { label: "Stake escalation", status: "pass" },
      { label: "Session duration", status: "pass" },
    ],
  },
]

const STATUS_CLASS: Record<CheckStatus, string> = {
  pending: "bg-quest-surface-muted text-quest-ink-faint",
  pass: "bg-quest-success-soft text-quest-success",
  warn: "bg-quest-warning-soft text-quest-warning",
  fail: "bg-quest-danger-soft text-quest-danger",
}

const STATUS_LABEL: Record<CheckStatus, string> = {
  pending: "…",
  pass: "Pass",
  warn: "Warn",
  fail: "Fail",
}

export function SafetyRGAnimation() {
  const [tick, setTick] = useState(0)
  const [revealed, setRevealed] = useState(0)

  const sc = SCENARIOS[tick % SCENARIOS.length]

  useEffect(() => {
    setRevealed(0)
    const timers: number[] = []
    sc.checks.forEach((_, i) => {
      timers.push(window.setTimeout(() => setRevealed(i + 1), 350 + i * 350))
    })
    timers.push(
      window.setTimeout(() => setTick((t) => t + 1), 350 + sc.checks.length * 350 + 1500),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [tick, sc.checks])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            RG check trace
          </div>
          <div className="mt-1 text-[14px] font-semibold text-quest-ink tabular-nums">
            Player #{sc.player}
          </div>
        </div>
        <span className="rounded-full bg-quest-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-ink-muted">
          live
        </span>
      </div>

      <ul className="mt-5 space-y-2">
        {sc.checks.map((c, i) => {
          const status: CheckStatus = i < revealed ? c.status : "pending"
          return (
            <motion.li
              key={`${tick}-${c.label}`}
              initial={false}
              animate={{ opacity: i < revealed ? 1 : 0.55 }}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-[12.5px]"
            >
              <span className="flex items-center gap-2.5">
                <StatusDot status={status} />
                <span className="text-quest-ink">{c.label}</span>
              </span>
              <span className="flex items-center gap-2">
                {c.note && i < revealed && (
                  <span className="text-[11px] text-quest-ink-faint">{c.note}</span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_CLASS[status]}`}
                >
                  {STATUS_LABEL[status]}
                </span>
              </span>
            </motion.li>
          )
        })}
      </ul>

      <motion.div
        key={`${tick}-outcome`}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: revealed >= sc.checks.length ? 1 : 0,
          y: revealed >= sc.checks.length ? 0 : 8,
        }}
        transition={{ duration: 0.4 }}
        className={`mt-5 rounded-md px-4 py-3 text-[13px] font-semibold flex items-center justify-between ${
          sc.outcome === "hold"
            ? "bg-quest-danger-soft text-quest-danger"
            : "bg-quest-success-soft text-quest-success"
        }`}
      >
        <span>{sc.outcomeNote}</span>
        <span className="tabular-nums text-[11px] opacity-75">42ms · audit-logged</span>
      </motion.div>
    </div>
  )
}

function StatusDot({ status }: { status: CheckStatus }) {
  const colour =
    status === "pass"
      ? "bg-quest-success"
      : status === "warn"
        ? "bg-quest-warning"
        : status === "fail"
          ? "bg-quest-danger"
          : "bg-quest-ink-faint"

  return (
    <span className="relative flex h-2 w-2">
      {status !== "pending" && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colour} opacity-50`}
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colour}`} />
    </span>
  )
}
