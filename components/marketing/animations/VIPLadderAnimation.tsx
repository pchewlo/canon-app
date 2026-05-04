"use client"

// VIP ladder visual: a tier ladder with the top tier (named VIPs)
// human-managed, and the long tail (3,000+) Canon-managed. Activity dots
// blink across the long-tail tiers to suggest live coverage.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function VIPLadderAnimation() {
  const [count, setCount] = useState(2987)

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.round(Math.random() * 2)), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        VIP coverage · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Where the long-tail VIP gap closes.
      </div>

      {/* Tier 1 — human managed */}
      <div className="mt-6 rounded-xl border border-quest-accent/30 bg-quest-accent-soft p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-quest-accent">
            Tier 1 · Human-managed
          </span>
          <span className="text-[11px] text-quest-accent/70 tabular-nums">
            30 named VIPs
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {["A", "M", "T", "S", "K", "+25"].map((init, i) => (
            <div
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-quest-accent/40 text-[11px] font-semibold text-quest-accent"
            >
              {init}
            </div>
          ))}
        </div>
      </div>

      {/* Long tail — Canon managed */}
      <div className="mt-3 rounded-xl border border-quest-ink/10 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-quest-ink-muted">
            Long tail · Canon-managed
          </span>
          <motion.span
            key={count}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] font-semibold tabular-nums text-quest-ink"
          >
            {count.toLocaleString("en-GB")}+ players
          </motion.span>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-1.5">
          {Array.from({ length: 36 }).map((_, i) => {
            const active = (i + Math.floor(count / 3)) % 5 === 0
            return (
              <motion.span
                key={i}
                animate={{
                  backgroundColor: active ? "#1A2332" : "rgba(26,35,50,0.10)",
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="h-3 w-full rounded-sm"
              />
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
          {[
            { label: "Avg lifetime", value: "£412" },
            { label: "Decisions / week", value: "21K" },
            { label: "RG escalations", value: "−18%" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2"
            >
              <div className="text-quest-ink-faint uppercase tracking-wider text-[10px]">
                {s.label}
              </div>
              <div className="mt-0.5 text-[13px] font-semibold tabular-nums text-quest-ink">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        Per-player decisions, no extra headcount
      </div>
    </div>
  )
}
