"use client"

// Player drill-down: a single player profile open with their full
// 14-day decision timeline. Designed to read like a screenshot of the
// in-product player page — distinct from the per-event reasoning chain.

import { useEffect, useState } from "react"

type Variant = "accent" | "success" | "neutral" | "muted" | "danger"

type Event = {
  day: number
  time: string
  type: string
  variant: Variant
  note: string
}

const EVENTS: Event[] = [
  { day: 14, time: "14:32", type: "Mission", variant: "accent", note: "Streak 3 · £2.50" },
  { day: 14, time: "09:14", type: "Bonus", variant: "success", note: "Lapse-prevention · £5.00" },
  { day: 13, time: "22:08", type: "Cooldown", variant: "muted", note: "Loss streak detected" },
  { day: 12, time: "15:40", type: "F2P", variant: "neutral", note: "Session greeting" },
  { day: 9, time: "11:22", type: "Mission", variant: "accent", note: "Activation streak · £1.50" },
  { day: 7, time: "19:12", type: "RG Hold", variant: "danger", note: "Session length signal" },
  { day: 5, time: "14:08", type: "Bonus", variant: "success", note: "Re-engagement · £4.00" },
  { day: 1, time: "09:10", type: "Sign-up", variant: "neutral", note: "New player" },
]

const BADGE_CLASS: Record<Variant, string> = {
  accent: "bg-quest-accent-soft text-quest-accent",
  success: "bg-quest-success-soft text-quest-success",
  neutral: "bg-quest-surface-muted text-quest-ink-muted",
  muted: "bg-quest-surface-muted text-quest-ink-muted opacity-70",
  danger: "bg-quest-danger-soft text-quest-danger",
}

const DOT_CLASS: Record<Variant, string> = {
  accent: "bg-quest-accent",
  success: "bg-quest-success",
  neutral: "bg-quest-ink-faint",
  muted: "bg-quest-ink-faint",
  danger: "bg-quest-danger",
}

export function AgentTimelineShot() {
  const [highlight, setHighlight] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setHighlight((h) => (h + 1) % EVENTS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-quest-ink/10 bg-white shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      {/* Header — player identity */}
      <div className="border-b border-border bg-quest-surface-muted/30 px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-quest-accent-soft text-quest-accent text-[11px] font-semibold tabular-nums">
              91
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-quest-ink tabular-nums truncate">
                Player #P-91823
              </div>
              <div className="text-[11px] text-quest-ink-faint truncate">
                Slots · Tier 2 · UK · 14-day lifetime
              </div>
            </div>
          </div>
          <span className="rounded-full bg-quest-success-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-success shrink-0">
            Active
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint mb-3">
          Decision timeline · 14 days
        </div>

        <ol className="relative">
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />

          {EVENTS.map((e, i) => {
            const isHighlighted = i === highlight
            return (
              <li
                key={i}
                className={`relative flex items-start gap-3 pb-3 last:pb-0 transition-colors ${
                  isHighlighted ? "" : ""
                }`}
              >
                <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0">
                  {isHighlighted && (
                    <span
                      className={`absolute inset-0 rounded-full ${DOT_CLASS[e.variant]} animate-ping opacity-60`}
                    />
                  )}
                  <span
                    className={`relative inline-block h-3.5 w-3.5 rounded-full ring-4 ring-white ${DOT_CLASS[e.variant]}`}
                  />
                </span>
                <div
                  className={`flex-1 min-w-0 rounded-md transition-colors ${
                    isHighlighted ? "bg-quest-surface-muted/60 -mx-2 px-2 py-1" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] font-medium tabular-nums text-quest-ink-faint">
                      Day {e.day} · {e.time}
                    </span>
                    <span
                      className={`shrink-0 inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${BADGE_CLASS[e.variant]}`}
                    >
                      {e.type}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[12px] leading-snug text-quest-ink-muted truncate">
                    {e.note}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Footer stats */}
      <div className="border-t border-border bg-quest-surface-muted/30 px-5 py-3">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Lifetime ARPU" value="£18.40" />
          <Stat label="Decisions" value="47" />
          <Stat label="vs. control" value="+£23" accent />
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wide text-quest-ink-faint">
        {label}
      </div>
      <div
        className={`mt-0.5 text-[14px] font-semibold tabular-nums ${
          accent ? "text-quest-success" : "text-quest-ink"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
