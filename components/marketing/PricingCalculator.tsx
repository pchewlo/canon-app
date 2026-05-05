"use client"

import { useMemo, useState } from "react"

const PERFORMANCE_FEE = 0.20
const ASSUMED_LIFT_PCT = 50

const MIN_BONUS = 500_000
const MAX_BONUS = 100_000_000
const STEP = 100_000
const DEFAULT_BONUS = 1_000_000

function fmtMoney(n: number) {
  return n.toLocaleString("en-GB", { maximumFractionDigits: 0 })
}

export function PricingCalculator() {
  const [annualBonus, setAnnualBonus] = useState(DEFAULT_BONUS)

  const breakdown = useMemo(() => {
    const incrementalValue = annualBonus * (ASSUMED_LIFT_PCT / 100)
    const performanceFee = incrementalValue * PERFORMANCE_FEE
    const operatorKeeps = incrementalValue - performanceFee
    return { incrementalValue, performanceFee, operatorKeeps }
  }, [annualBonus])

  return (
    <div className="rounded-[4px] border border-canon-line bg-canon-paper p-7">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Estimate your ACV
      </div>
      <div className="mt-1 text-[13px] leading-[1.55] text-quest-ink-muted">
        Assumes Canon delivers a {ASSUMED_LIFT_PCT}% return on your bonus
        spend after the calibration window. Real lift varies by operator.
      </div>

      <label className="mt-7 block">
        <span className="text-[13px] font-medium text-canon-ink">
          Annual bonus spend
        </span>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-quest-ink-muted text-[14px]">£</span>
          <input
            type="range"
            min={MIN_BONUS}
            max={MAX_BONUS}
            step={STEP}
            value={annualBonus}
            onChange={(e) => setAnnualBonus(Number(e.target.value))}
            className="flex-1 accent-canon-green"
          />
          <span className="w-[120px] text-right tabular-nums text-[14px] font-semibold text-canon-ink">
            £{fmtMoney(annualBonus)}
          </span>
        </div>
      </label>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
        <Row
          label={`Incremental value created (${ASSUMED_LIFT_PCT}% lift)`}
          value={`£${fmtMoney(breakdown.incrementalValue)}`}
        />
        <Row
          label="You keep (80%)"
          value={`£${fmtMoney(breakdown.operatorKeeps)}`}
        />
        <Row
          label={`Canon performance fee (${Math.round(PERFORMANCE_FEE * 100)}%)`}
          value={`£${fmtMoney(breakdown.performanceFee)}`}
        />
        <Row
          label="Total ACV to Canon"
          value={`£${fmtMoney(breakdown.performanceFee)}`}
          emphasised
        />
      </div>

      <div className="mt-6 rounded-[4px] border border-canon-green/20 bg-quest-success-soft/60 px-4 py-3 text-[13px] leading-[1.55] text-canon-ink">
        Canon takes <strong>{Math.round(PERFORMANCE_FEE * 100)}%</strong> of
        the value created. You keep the other{" "}
        <strong>{100 - Math.round(PERFORMANCE_FEE * 100)}%</strong> — at every
        scale.
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  emphasised,
}: {
  label: string
  value: string
  emphasised?: boolean
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 ${
        emphasised ? "border-t border-canon-line pt-3" : ""
      }`}
    >
      <span className="text-quest-ink-muted">{label}</span>
      <span
        className={`tabular-nums ${
          emphasised
            ? "text-canon-green text-[18px] font-semibold"
            : "text-canon-ink font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  )
}
