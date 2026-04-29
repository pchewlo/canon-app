// Server component — single player's full journey of agent decisions over
// their 14-day lifetime. Visualises the per-player narrative that the
// aggregate dashboard summarises in the chart on the left.

type Variant = "accent" | "success" | "neutral" | "muted" | "danger"

type Event = {
  day: number
  time: string
  type: string
  variant: Variant
  note: string
}

const EVENTS: Event[] = [
  { day: 14, time: "14:32", type: "Mission",   variant: "accent",  note: "Streak 3 · £2.50" },
  { day: 14, time: "09:14", type: "Bonus",     variant: "success", note: "Lapse-prevention · £5.00" },
  { day: 13, time: "22:08", type: "Cooldown",  variant: "muted",   note: "Loss streak detected" },
  { day: 12, time: "15:40", type: "F2P",       variant: "neutral", note: "Session greeting" },
  { day: 9,  time: "11:22", type: "Mission",   variant: "accent",  note: "Activation streak · £1.50" },
  { day: 7,  time: "19:12", type: "RG Hold",   variant: "danger",  note: "Session length signal" },
  { day: 5,  time: "14:08", type: "Bonus",     variant: "success", note: "Re-engagement · £4.00" },
  { day: 2,  time: "10:44", type: "F2P",       variant: "neutral", note: "First session" },
  { day: 1,  time: "09:10", type: "Sign-up",   variant: "neutral", note: "New player" },
]

const VARIANT_CLASS: Record<Variant, string> = {
  accent: "bg-quest-accent-soft text-quest-accent",
  success: "bg-quest-success-soft text-quest-success",
  neutral: "bg-quest-surface-muted text-quest-ink-muted",
  muted: "bg-quest-surface-muted text-quest-ink-muted opacity-60",
  danger: "bg-quest-danger-soft text-quest-danger",
}

const DOT_CLASS: Record<Variant, string> = {
  accent: "bg-quest-accent",
  success: "bg-quest-success",
  neutral: "bg-quest-ink-faint",
  muted: "bg-quest-ink-faint",
  danger: "bg-quest-danger",
}

export function PlayerJourney() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(26,35,50,0.12)] overflow-hidden flex flex-col h-full">
      {/* Header — player identity */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-quest-accent-soft text-quest-accent text-[12px] font-semibold tabular-nums">
              91
            </div>
            <div>
              <div className="text-[14px] font-semibold text-quest-ink tabular-nums">
                Player #P-91823
              </div>
              <div className="text-[11px] text-quest-ink-faint">
                Slots · Tier 2 · UK · 14-day lifetime
              </div>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full bg-quest-success-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-quest-success">
            Active
          </span>
        </div>
      </div>

      {/* Timeline of decisions */}
      <div className="flex-1 overflow-hidden px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint mb-3">
          Agent decision journey
        </div>
        <ol className="relative">
          {/* Vertical rule */}
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />

          {EVENTS.map((e, i) => (
            <li key={i} className="relative flex items-start gap-3 pb-3.5 last:pb-0">
              <span
                className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-card ${DOT_CLASS[e.variant]}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-medium tabular-nums text-quest-ink-faint">
                    Day {e.day} · {e.time}
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${VARIANT_CLASS[e.variant]}`}
                  >
                    {e.type}
                  </span>
                </div>
                <div
                  className={`mt-0.5 text-[12px] leading-snug ${
                    e.variant === "muted" ? "text-quest-ink-faint" : "text-quest-ink-muted"
                  }`}
                >
                  {e.note}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer — lifetime stats */}
      <div className="border-t border-border bg-quest-surface-muted/40 px-5 py-3">
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
