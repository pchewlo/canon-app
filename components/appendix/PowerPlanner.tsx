"use client"

import { useMemo, useState } from "react"
import type { OperatorConfig } from "@/lib/appendix/operators"

// Two-sample t-test sample-size formula:
//   n_per_arm = 2 * (z_alpha + z_beta)^2 / delta^2
// where delta = (lift / sigma). With sigma assumed equal to the mean of
// bonus ROI (CV = 1, conservative for ROI distributions), delta ≈ lift.
const Z_ALPHA = 1.96 // two-sided 95% CI
const Z_BETA = 0.842 // 80% power
const NUMERATOR = 2 * Math.pow(Z_ALPHA + Z_BETA, 2) // ≈ 15.68

const ASSUMED_AVG_BONUS = 20 // £, used to convert spend → bonus issuance volume
const WEEKS_PER_MONTH = 4.345

const CURRENCY_SYMBOL: Record<OperatorConfig["currency"], string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
}

type Props = {
  config: OperatorConfig
}

export function PowerPlanner({ config }: Props) {
  const symbol = CURRENCY_SYMBOL[config.currency]

  const [liftPct, setLiftPct] = useState(15) // 5–30
  const [canonArmPct, setCanonArmPct] = useState(25) // 5–50
  const [monthlySpend, setMonthlySpend] = useState(
    config.defaultMonthlyBonusSpend,
  )

  const { weeks, perArmObservations, totalBonusesNeeded } = useMemo(() => {
    const lift = liftPct / 100
    const canonShare = canonArmPct / 100
    const minShare = Math.min(canonShare, 1 - canonShare)

    const nPerArm = NUMERATOR / Math.pow(lift, 2)
    const totalBonuses = nPerArm / minShare

    const weeklyBonuses = monthlySpend / ASSUMED_AVG_BONUS / WEEKS_PER_MONTH
    const weeksNeeded = weeklyBonuses > 0 ? totalBonuses / weeklyBonuses : 0

    return {
      weeks: weeksNeeded,
      perArmObservations: Math.ceil(nPerArm),
      totalBonusesNeeded: Math.ceil(totalBonuses),
    }
  }, [liftPct, canonArmPct, monthlySpend])

  return (
    <div className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-7">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Statistical power planner
      </div>
      <p className="mt-1 text-[13px] leading-[1.55] text-quest-ink-muted">
        Move the sliders to your numbers. Output assumes 95% confidence, 80%
        power, and a CV-of-one ROI distribution (conservative).
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <Slider
          label="Lift target"
          value={liftPct}
          min={5}
          max={30}
          step={1}
          format={(v) => `${v}%`}
          onChange={setLiftPct}
        />
        <Slider
          label="Canon arm"
          value={canonArmPct}
          min={5}
          max={50}
          step={5}
          format={(v) => `${v}% of bonuses`}
          onChange={setCanonArmPct}
        />
        <Slider
          label="Monthly bonus spend"
          value={monthlySpend}
          min={10_000}
          max={500_000}
          step={5_000}
          format={(v) => `${symbol}${v.toLocaleString("en-GB")}`}
          onChange={setMonthlySpend}
        />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3 border-t border-canon-line pt-6 sm:grid-cols-3">
        <Stat
          label="Time to significance"
          value={
            weeks > 0 && Number.isFinite(weeks)
              ? `~${formatWeeks(weeks)}`
              : "—"
          }
          emphasis
        />
        <Stat
          label="Per-arm observations"
          value={perArmObservations.toLocaleString("en-GB")}
        />
        <Stat
          label="Total bonuses needed"
          value={totalBonusesNeeded.toLocaleString("en-GB")}
        />
      </div>

      <p className="mt-6 text-[12px] leading-[1.55] text-quest-ink-faint">
        Assumes an average bonus value of {symbol}
        {ASSUMED_AVG_BONUS}. Real timing depends on your bonus distribution
        and the variance of the ROI curve. We&apos;ll re-run with your data
        before the pilot kicks off.
      </p>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-canon-ink">{label}</span>
        <span className="text-[14px] font-semibold tabular-nums text-canon-green">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: "rgba(55,53,47,0.12)",
          accentColor: "var(--canon-green)",
        }}
      />
    </label>
  )
}

function Stat({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        {label}
      </span>
      <span
        className={`tabular-nums ${
          emphasis
            ? "text-[24px] font-semibold leading-none text-canon-green"
            : "text-[16px] font-medium text-canon-ink"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function formatWeeks(weeks: number): string {
  if (weeks < 1) return "1 week"
  if (weeks < 8) return `${Math.ceil(weeks)} weeks`
  const months = weeks / WEEKS_PER_MONTH
  if (months < 12) return `${months.toFixed(1)} months`
  return `${(months / 12).toFixed(1)} years`
}
