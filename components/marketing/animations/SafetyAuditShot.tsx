"use client"

// Product-shot for /product/safety (paired opposite the RG check trace).
// A scrolling audit log of decisions with their RG-check outcomes —
// "regulator-ready audit" made tangible.

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type LogRow = {
  id: number
  ts: string
  player: string
  action: string
  outcome: "approved" | "held" | "blocked"
  reason?: string
}

const TEMPLATES: Omit<LogRow, "id" | "ts">[] = [
  { player: "P-91823", action: "Bonus £5.00", outcome: "approved" },
  { player: "P-44721", action: "Mission · Streak 3", outcome: "approved" },
  { player: "P-65812", action: "Bonus £8.00", outcome: "held", reason: "loss-chasing" },
  { player: "P-33458", action: "Cashback £2.20", outcome: "approved" },
  { player: "P-89102", action: "Bonus £12.00", outcome: "blocked", reason: "self-exclusion" },
  { player: "P-21097", action: "Free-play 8 spins", outcome: "approved" },
  { player: "P-77110", action: "Bonus £4.00", outcome: "held", reason: "session > 60min" },
  { player: "P-50221", action: "Mission · Activation", outcome: "approved" },
]

const OUTCOME_CLASS: Record<LogRow["outcome"], string> = {
  approved: "bg-quest-success-soft text-quest-success",
  held: "bg-quest-warning-soft text-quest-warning",
  blocked: "bg-quest-danger-soft text-quest-danger",
}

function nowFormatted() {
  const d = new Date()
  return d.toLocaleTimeString("en-GB", { hour12: false })
}

export function SafetyAuditShot() {
  const [rows, setRows] = useState<LogRow[]>([])

  useEffect(() => {
    let id = 0
    const push = () => {
      id += 1
      const t = TEMPLATES[id % TEMPLATES.length]
      setRows((prev) => [{ ...t, id, ts: nowFormatted() }, ...prev].slice(0, 6))
    }
    push()
    const i = setInterval(push, 1500)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-quest-surface-muted/30 px-5 py-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Audit log · last 24h
          </div>
          <div className="text-[14px] font-semibold text-quest-ink">
            Every decision · regulator-ready
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-quest-ink-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-accent opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-accent" />
          </span>
          appending
        </span>
      </div>

      <div className="px-5 py-2 grid grid-cols-[64px_72px_1.4fr_auto_auto] gap-3 border-b border-border text-[10px] uppercase tracking-wider text-quest-ink-faint">
        <span>Time</span>
        <span>Player</span>
        <span>Action</span>
        <span>Reason</span>
        <span>Outcome</span>
      </div>

      <div className="relative h-[260px] overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: -16 }}
              animate={{
                opacity: 1 - i * 0.12,
                y: i * 42,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-x-0 grid grid-cols-[64px_72px_1.4fr_auto_auto] items-center gap-3 border-b border-border px-5 py-2.5 text-[12px]"
            >
              <span className="tabular-nums text-quest-ink-faint">{r.ts}</span>
              <span className="tabular-nums text-quest-ink-muted">{r.player}</span>
              <span className="text-quest-ink truncate">{r.action}</span>
              <span className="text-quest-ink-faint text-[11px] text-right">
                {r.reason ?? "—"}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${OUTCOME_CLASS[r.outcome]}`}
              >
                {r.outcome}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
