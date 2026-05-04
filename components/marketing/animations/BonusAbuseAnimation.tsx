"use client"

// Bonus-abuse defence: a swarm of "bot" sign-ups appears, each labelled
// with a suspicious signal pattern. Canon's detector marks them, and
// the chosen action flips from "Bonus £50" to "No action / blocked".
// A running "saved" counter ticks up.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Bot = {
  id: number
  signal: string
  detected: boolean
  saved: number
}

const SIGNALS = [
  "proxy IP match",
  "device fingerprint reuse",
  "deposit + withdraw within 90s",
  "wagering pattern: minimum",
  "multi-account household",
  "account age < 5min",
  "VPN ASN flagged",
  "signup velocity spike",
]

function makeBot(i: number, detected: boolean): Bot {
  return {
    id: i,
    signal: SIGNALS[i % SIGNALS.length],
    detected,
    saved: 50, // £50 bonus saved per detection
  }
}

export function BonusAbuseAnimation() {
  const [bots, setBots] = useState<Bot[]>([])
  const [savedTotal, setSavedTotal] = useState(0)

  useEffect(() => {
    let id = 0
    const interval = setInterval(() => {
      id += 1
      // 80% of these are detected; the rest sneak through (legitimate
      // signups in a comparable signal pattern — false positives we don't fire on).
      const detected = Math.random() > 0.2
      const bot = makeBot(id, detected)
      setBots((prev) => [bot, ...prev].slice(0, 8))
      if (detected) setSavedTotal((s) => s + bot.saved)
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Hunter detection · live decision feed
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Bots claim. Canon catches. Bonus saved.
      </div>

      {/* Bot grid */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        {bots.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className={`flex items-center justify-between rounded-md border px-3 py-2 text-[11.5px] ${
              b.detected
                ? "border-quest-danger/30 bg-quest-danger-soft/60"
                : "border-quest-success/30 bg-quest-success-soft/40"
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[9px] font-bold uppercase ${
                  b.detected
                    ? "bg-quest-danger text-white"
                    : "bg-quest-success text-white"
                }`}
              >
                {b.detected ? "✕" : "✓"}
              </span>
              <span className="truncate text-quest-ink">{b.signal}</span>
            </span>
            <span
              className={`tabular-nums text-[10px] font-semibold uppercase tracking-wider ${
                b.detected ? "text-quest-danger" : "text-quest-success"
              }`}
            >
              {b.detected ? "Blocked" : "Allowed"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Counter footer */}
      <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-3">
        <Pill label="Suspected hunters" value={String(bots.filter((b) => b.detected).length)} tone="danger" />
        <Pill label="False positives" value={String(bots.filter((b) => !b.detected).length)} tone="warning" />
        <Pill
          label="Bonus saved"
          value={`£${savedTotal.toLocaleString("en-GB")}`}
          tone="success"
        />
      </div>
    </div>
  )
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "success" | "warning" | "danger"
}) {
  return (
    <div className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
        {label}
      </div>
      <div
        className={`mt-0.5 text-[14px] font-semibold tabular-nums ${
          tone === "success"
            ? "text-quest-success"
            : tone === "warning"
              ? "text-quest-warning"
              : "text-quest-danger"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
