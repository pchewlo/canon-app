"use client"

// Product-shot for /product/agents (paired opposite the per-player
// reasoning chain). Shows a grid of many agents simultaneously: each
// cell is a player, dots flash to show decisions firing across the
// fleet. Conveys "an agent per player" at scale.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const COLUMNS = 14
const ROWS = 8

export function AgentsGridShot() {
  const [tick, setTick] = useState(0)
  const [count, setCount] = useState(182_491)

  useEffect(() => {
    const id1 = setInterval(() => setTick((t) => t + 1), 250)
    const id2 = setInterval(() => setCount((c) => c + Math.round(Math.random() * 6) + 1), 900)
    return () => {
      clearInterval(id1)
      clearInterval(id2)
    }
  }, [])

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white p-5 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Agent fleet · live
          </div>
          <div className="mt-1 text-[15px] font-semibold text-quest-ink tabular-nums">
            {count.toLocaleString("en-GB")} agents
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-quest-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
          </span>
          deciding
        </span>
      </div>

      <div className="mt-4 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}>
        {Array.from({ length: COLUMNS * ROWS }).map((_, i) => {
          const phase = (i + tick) % 11
          const active = phase < 2
          const recent = phase < 5
          return (
            <motion.span
              key={i}
              animate={{
                backgroundColor: active
                  ? "#1A2332"
                  : recent
                    ? "rgba(26,35,50,0.55)"
                    : "rgba(26,35,50,0.10)",
                scale: active ? 1.15 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="aspect-square rounded-sm"
            />
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-[11px]">
        {[
          { label: "Decisions / sec", value: "342" },
          { label: "p95 latency", value: "42 ms" },
          { label: "RG holds", value: "0.3%" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2"
          >
            <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
              {s.label}
            </div>
            <div className="mt-0.5 text-[13px] font-semibold tabular-nums text-quest-ink">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
