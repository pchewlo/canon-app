"use client"

// Visualises a CRM operator building a strategy:
// step 1 picks an objective, step 2 sets a budget, step 3 confirms guardrails,
// step 4 deploys. Loops with a 600ms hold at the "deployed" state.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const OBJECTIVES = ["Activation", "Retention", "Revenue", "Referral"]

export function StrategyBuilderAnimation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1700)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        New strategy builder
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        Retention lift · UK casino
      </div>

      {/* Step 1 — objective */}
      <div className="mt-5 space-y-2">
        {OBJECTIVES.map((o, i) => {
          const picked = i === 1 // retention
          const highlighted = step >= 1 && picked
          return (
            <motion.div
              key={o}
              initial={false}
              animate={{
                borderColor: highlighted ? "rgba(26,35,50,0.6)" : "rgba(55,53,47,0.12)",
                backgroundColor: highlighted ? "rgba(26,35,50,0.08)" : "rgba(255,255,255,1)",
              }}
              className="flex items-center justify-between rounded-md border px-4 py-2 text-[13px]"
            >
              <span className="text-quest-ink">{o}</span>
              {highlighted && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-full bg-quest-accent text-white text-[10px] px-2 py-0.5 uppercase tracking-wider"
                >
                  Selected
                </motion.span>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Step 2 — budget */}
      <motion.div
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0.25 }}
        className="mt-4 rounded-md border border-border p-3"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-quest-ink-faint">
            Daily budget
          </span>
          <span className="text-[18px] font-semibold tabular-nums text-quest-ink">
            <BudgetCounter active={step >= 2} />
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-quest-surface-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: step >= 2 ? "76%" : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full rounded-full bg-quest-accent"
          />
        </div>
      </motion.div>

      {/* Step 3 — guardrails */}
      <motion.div
        initial={false}
        animate={{ opacity: step >= 3 ? 1 : 0.25 }}
        className="mt-3 grid grid-cols-3 gap-2"
      >
        {[
          { k: "Cap", v: "£12 / 7d" },
          { k: "Holdout", v: "10%" },
          { k: "RG", v: "On" },
        ].map((g) => (
          <div
            key={g.k}
            className="rounded-md border border-border bg-quest-surface-muted/40 px-2.5 py-2 text-center"
          >
            <div className="text-[10px] uppercase tracking-wider text-quest-ink-faint">
              {g.k}
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-quest-ink tabular-nums">
              {g.v}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Step 4 — deployed badge */}
      <motion.div
        initial={false}
        animate={{
          opacity: step >= 4 ? 1 : 0,
          y: step >= 4 ? 0 : 10,
        }}
        transition={{ duration: 0.4 }}
        className="mt-5 flex items-center justify-center gap-2 rounded-md bg-quest-success-soft px-4 py-3 text-[13px] font-semibold text-quest-success"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-quest-success" />
        </span>
        Strategy live · agents deployed
      </motion.div>
    </div>
  )
}

function BudgetCounter({ active }: { active: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) {
      setN(0)
      return
    }
    const target = 62000
    const start = performance.now()
    const dur = 700
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 4)
      setN(Math.floor(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])
  return <>£{n.toLocaleString("en-GB")}</>
}
