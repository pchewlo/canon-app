"use client"

import { useMemo, useState } from "react"

// Two-sample sample-size formula:
//   n_per_arm = 2 * (z_α + z_β)^2 * σ^2 / δ^2
// where δ = lift * baseline_roi (absolute ROI difference).
const Z_ALPHA = 1.959964 // two-sided 95% CI
const Z_BETA = 0.841621 // 80% power
const BASELINE_ROI = 1.5 // £GGR per £bonus, assumed baseline
const SIGMA = 3 // ROI variability — set high to be honest about VIP-heavy books
const AVG_BONUS = 20 // £, assumed average bonus value (output is insensitive to this)
const WEEKS_PER_MONTH = 4.345
const MAX_PRACTICAL_WEEKS = 26
const AMBER = "#B86B3A"
const NAVY = "#1A2332"

type Result = {
  weeks: number
  nPerArm: number
  totalBonuses: number
  monthlySpend: number
  impractical: boolean
}

type CalculatorDefaults = {
  liftPct?: number
  canonSharePct?: number
  activePlayers?: number
  bonusesPerPlayer?: number
}

export function CanonPilotCalculator({
  defaults = {},
}: {
  defaults?: CalculatorDefaults
} = {}) {
  const [liftPct, setLiftPct] = useState(defaults.liftPct ?? 15)
  const [canonSharePct, setCanonSharePct] = useState(
    defaults.canonSharePct ?? 25,
  )
  const [activePlayers, setActivePlayers] = useState(
    defaults.activePlayers ?? 1250,
  )
  const [bonusesPerPlayer, setBonusesPerPlayer] = useState(
    defaults.bonusesPerPlayer ?? 4,
  )

  const result: Result = useMemo(() => {
    const lift = liftPct / 100
    const canonShare = canonSharePct / 100
    const delta = lift * BASELINE_ROI
    const safeDelta = delta > 0 ? delta : 1e-9

    const nPerArm = Math.ceil(
      (2 * Math.pow(Z_ALPHA + Z_BETA, 2) * Math.pow(SIGMA, 2)) /
        Math.pow(safeDelta, 2),
    )
    const bottleneckShare = Math.min(canonShare, 1 - canonShare)
    const totalBonuses = Math.ceil(nPerArm / bottleneckShare)
    const bonusesPerMonth = activePlayers * bonusesPerPlayer
    const monthlySpend = bonusesPerMonth * AVG_BONUS
    const months = bonusesPerMonth > 0 ? totalBonuses / bonusesPerMonth : Infinity
    const weeks = Number.isFinite(months) ? months * WEEKS_PER_MONTH : Infinity

    return {
      weeks,
      nPerArm,
      totalBonuses,
      monthlySpend,
      impractical: !Number.isFinite(weeks) || weeks > MAX_PRACTICAL_WEEKS,
    }
  }, [liftPct, canonSharePct, activePlayers, bonusesPerPlayer])

  return (
    <div className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-7">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Pilot sizing calculator
      </div>
      <p className="mt-1 text-[13px] leading-[1.55] text-quest-ink-muted">
        Drag the sliders or type values to plug in your own numbers. Outputs
        update live. 95% confidence, 80% power, baseline bonus ROI of 1.5×.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <Field
          label="ROI lift to detect"
          value={liftPct}
          min={5}
          max={40}
          step={1}
          unit="%"
          onChange={setLiftPct}
        />
        <Field
          label="Canon arm share"
          value={canonSharePct}
          min={5}
          max={50}
          step={5}
          unit="% of bonus spend"
          onChange={setCanonSharePct}
        />
        <Field
          label="Active players in test cohort"
          value={activePlayers}
          min={50}
          max={20_000}
          step={50}
          scale="log"
          onChange={setActivePlayers}
        />
        <Field
          label="Avg bonuses per player per month"
          value={bonusesPerPlayer}
          min={1}
          max={20}
          step={1}
          onChange={setBonusesPerPlayer}
        />
      </div>

      <div className="mt-8 border-t border-canon-line pt-6">
        <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          Time to significance
        </div>
        <div
          className="mt-2 font-brand leading-[1.02] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(44px, 7vw, 64px)",
            color: result.impractical ? AMBER : NAVY,
          }}
        >
          {result.impractical
            ? ">6 months"
            : `~${formatWeeks(result.weeks)}`}
        </div>
        {result.impractical && (
          <p
            className="mt-2 text-[14px] leading-[1.55]"
            style={{ color: AMBER }}
          >
            Consider a larger Canon arm, a higher lift target, or a longer
            window — beyond six months the pilot isn&apos;t practical.
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-canon-line pt-6 sm:grid-cols-3">
        <Stat
          label="Bonuses per arm"
          value={result.nPerArm.toLocaleString("en-GB")}
        />
        <Stat
          label="Total bonuses"
          value={result.totalBonuses.toLocaleString("en-GB")}
        />
        <Stat
          label="Monthly bonus spend"
          value={
            result.monthlySpend > 0
              ? `£${Math.round(result.monthlySpend).toLocaleString("en-GB")}`
              : "—"
          }
          sub="derived"
        />
      </div>

      <p className="mt-6 text-[12px] leading-[1.6] text-quest-ink-faint">
        This models the ideal case where each bonus is an independent
        observation. For VIP-heavy books where a small number of players
        receive many bonuses each, observations cluster and effective
        sample size is lower — meaning real timelines can be longer than
        shown. Raise the ROI variability (σ) slider to reflect this, and
        treat the output as a planning estimate. We re-run this with your
        real data before any pilot begins.
      </p>
    </div>
  )
}

const LOG_POSITION_STEPS = 1000

function Field({
  label,
  value,
  min,
  max,
  step,
  unit,
  prefix,
  helper,
  scale = "linear",
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  prefix?: string
  helper?: string
  scale?: "linear" | "log"
  onChange: (v: number) => void
}) {
  const clamp = (raw: number) => {
    if (!Number.isFinite(raw)) return value
    return Math.min(max, Math.max(min, raw))
  }

  const isLog = scale === "log"
  const toPosition = (v: number) =>
    isLog
      ? (Math.log(Math.max(v, min) / min) / Math.log(max / min)) *
        LOG_POSITION_STEPS
      : v
  const fromPosition = (p: number) => {
    if (!isLog) return p
    const raw = min * Math.pow(max / min, p / LOG_POSITION_STEPS)
    return clamp(Math.round(raw / step) * step)
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <label className="text-[13px] font-medium text-canon-ink">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5">
          {prefix && (
            <span className="text-[14px] tabular-nums text-canon-ink/70">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="w-24 rounded-[3px] border border-canon-line bg-canon-cream px-2 py-1 text-right text-[14px] font-semibold tabular-nums focus:outline-none"
            style={{ color: NAVY, borderColor: "rgba(26,35,50,0.18)" }}
          />
          {unit && (
            <span className="text-[13px] tabular-nums text-canon-ink/70">
              {unit}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={isLog ? 0 : min}
        max={isLog ? LOG_POSITION_STEPS : max}
        step={isLog ? 1 : step}
        value={toPosition(value)}
        onChange={(e) => onChange(fromPosition(Number(e.target.value)))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: "rgba(26,35,50,0.12)",
          accentColor: NAVY,
        }}
      />
      {helper && (
        <p className="mt-1.5 text-[12px] leading-[1.5] text-quest-ink-faint">
          {helper}
        </p>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        {label}
        {sub && (
          <span className="ml-1.5 normal-case tracking-normal text-quest-ink-faint/80">
            ({sub})
          </span>
        )}
      </span>
      <span
        className="text-[20px] font-semibold tabular-nums"
        style={{ color: NAVY }}
      >
        {value}
      </span>
    </div>
  )
}

function formatWeeks(weeks: number): string {
  if (weeks < 1) return "1 week"
  return `${Math.round(weeks)} weeks`
}
