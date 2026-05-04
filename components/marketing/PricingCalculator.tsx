"use client"

import { useMemo, useState } from "react"

const MANAGED_BONUS_FEE = 0.05
const PERFORMANCE_FEE = 0.175
const PLATFORM_MIN_MONTHLY = 8_000
const ASSUMED_RETENTION_LIFT_PCT = 7.5

function fmtMoney(n: number) {
  return n.toLocaleString("en-GB", { maximumFractionDigits: 0 })
}

export function PricingCalculator() {
  const [annualBonus, setAnnualBonus] = useState(48_000_000)

  const breakdown = useMemo(() => {
    const managedFee = annualBonus * MANAGED_BONUS_FEE
    const retentionUpliftValue = annualBonus * (ASSUMED_RETENTION_LIFT_PCT / 100)
    const performanceFee = retentionUpliftValue * PERFORMANCE_FEE
    const platformMin = PLATFORM_MIN_MONTHLY * 12
    const acv = managedFee + performanceFee + platformMin
    return { managedFee, performanceFee, platformMin, retentionUpliftValue, acv }
  }, [annualBonus])

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white p-7">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Estimate your ACV
      </div>
      <div className="mt-1 text-[13px] text-quest-ink-muted">
        Assumes a {ASSUMED_RETENTION_LIFT_PCT}% retention-spend uplift after
        the calibration window. Real lift varies by operator.
      </div>

      <label className="mt-7 block">
        <span className="text-[13px] font-medium text-quest-ink">
          Annual bonus spend
        </span>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-quest-ink-muted text-[14px]">£</span>
          <input
            type="range"
            min={2_000_000}
            max={250_000_000}
            step={1_000_000}
            value={annualBonus}
            onChange={(e) => setAnnualBonus(Number(e.target.value))}
            className="flex-1 accent-quest-accent"
          />
          <span className="w-[120px] text-right tabular-nums text-[14px] font-medium text-quest-ink">
            £{fmtMoney(annualBonus)}
          </span>
        </div>
      </label>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-[14px]">
        <Row label="Managed bonus spend (5%)" value={`£${fmtMoney(breakdown.managedFee)}`} />
        <Row
          label={`Performance fee (17.5% × ${ASSUMED_RETENTION_LIFT_PCT}% lift)`}
          value={`£${fmtMoney(breakdown.performanceFee)}`}
        />
        <Row label="Platform minimum (£8K × 12)" value={`£${fmtMoney(breakdown.platformMin)}`} />
        <Row
          label="Total ACV to Canon"
          value={`£${fmtMoney(breakdown.acv)}`}
          emphasised
        />
      </div>

      <div className="mt-6 rounded-lg bg-quest-success-soft/60 px-4 py-3 text-[13px] text-quest-ink">
        At £{fmtMoney(breakdown.retentionUpliftValue)} of incremental retention
        revenue, Canon costs roughly{" "}
        <strong>
          {((breakdown.acv / breakdown.retentionUpliftValue) * 100).toFixed(0)}%
        </strong>{" "}
        of the value created.
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
        emphasised ? "border-t border-border pt-3" : ""
      }`}
    >
      <span className="text-quest-ink-muted">{label}</span>
      <span
        className={`tabular-nums ${
          emphasised
            ? "text-quest-ink text-[18px] font-semibold"
            : "text-quest-ink font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  )
}
