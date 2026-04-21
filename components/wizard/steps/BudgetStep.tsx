'use client'

import { useMemo } from "react"

type BudgetStepProps = {
  dailyBudget: number
  perPlayerCap: number
  onDailyBudgetChange: (value: number) => void
  onPerPlayerCapChange: (value: number) => void
  controlGroupPct: number
  onControlGroupPctChange: (value: number) => void
}

const inputStyle: React.CSSProperties = {
  height: 36,
  width: '100%',
  borderRadius: 'var(--radius-md, 4px)',
  border: '1px solid rgba(55, 53, 47, 0.16)',
  background: '#F7F7F5',
  paddingLeft: 28,
  paddingRight: 12,
  fontSize: 14,
  fontFamily: 'var(--font-sans)',
  fontVariantNumeric: 'tabular-nums',
  color: '#37352F',
  outline: 'none',
  boxShadow: '0 1px 2px rgba(15, 15, 15, 0.04)',
  transition: 'border-color 120ms, box-shadow 120ms',
}

const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = '#1A2332'
  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(26, 35, 50, 0.15)'
}

const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(55, 53, 47, 0.16)'
  e.currentTarget.style.boxShadow = '0 1px 2px rgba(15, 15, 15, 0.04)'
}

export function BudgetStep({
  dailyBudget,
  perPlayerCap,
  onDailyBudgetChange,
  onPerPlayerCapChange,
  controlGroupPct,
  onControlGroupPctChange,
}: BudgetStepProps) {
  const projections = useMemo(() => {
    if (!dailyBudget || !perPlayerCap) {
      return { estimatedAgents: 0, calibrationDays: 0 }
    }
    const estimatedAgents = Math.floor(dailyBudget / perPlayerCap)
    const calibrationDays = Math.max(3, Math.ceil(14 - Math.log2(estimatedAgents + 1) * 2))
    return { estimatedAgents, calibrationDays }
  }, [dailyBudget, perPlayerCap])

  const heldOutPlayers = useMemo(() => {
    if (!dailyBudget || !perPlayerCap || !controlGroupPct) return 0
    const totalPlayers = Math.floor(dailyBudget / perPlayerCap)
    return Math.round(totalPlayers * controlGroupPct / 100)
  }, [dailyBudget, perPlayerCap, controlGroupPct])

  return (
    <div className="flex gap-6">
      {/* Inputs */}
      <div className="flex flex-1 flex-col gap-5">
        <p className="text-[13px] text-quest-ink-muted">
          Set your daily spend limits. Canon will allocate budget across active agents.
        </p>

        {/* Daily budget */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-quest-ink-muted" style={{ letterSpacing: '0.02em' }}>
            Daily total budget
          </label>
          <div className="relative">
            <span
              className="absolute top-1/2 -translate-y-1/2 text-quest-ink-faint"
              style={{ left: 10, fontSize: 13, pointerEvents: 'none' }}
            >
              {"\u00A3"}
            </span>
            <input
              type="number"
              min={0}
              step={10}
              value={dailyBudget || ''}
              onChange={(e) => onDailyBudgetChange(Number(e.target.value))}
              placeholder="500"
              style={inputStyle}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>
          <span className="text-[11px] text-quest-ink-faint">
            Total amount Canon can spend per day across all agents
          </span>
        </div>

        {/* Per-player cap */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-quest-ink-muted" style={{ letterSpacing: '0.02em' }}>
            Per-player daily cap
          </label>
          <div className="relative">
            <span
              className="absolute top-1/2 -translate-y-1/2 text-quest-ink-faint"
              style={{ left: 10, fontSize: 13, pointerEvents: 'none' }}
            >
              {"\u00A3"}
            </span>
            <input
              type="number"
              min={0}
              step={0.5}
              value={perPlayerCap || ''}
              onChange={(e) => onPerPlayerCapChange(Number(e.target.value))}
              placeholder="2.00"
              style={inputStyle}
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
            />
          </div>
          <span className="text-[11px] text-quest-ink-faint">
            Maximum spend on any single player per day
          </span>
        </div>

        {/* Control group slider */}
        <div className="flex flex-col gap-2 border-t pt-5" style={{ borderColor: 'rgba(55,53,47,0.09)' }}>
          <label className="text-[12px] font-medium text-quest-ink-muted" style={{ letterSpacing: '0.02em' }}>
            Control group size
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={25}
              step={1}
              value={controlGroupPct}
              onChange={(e) => onControlGroupPctChange(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={{
                background: 'rgba(55,53,47,0.12)',
                accentColor: '#1A2332',
              }}
            />
            <span className="w-10 text-right text-[14px] font-medium tabular-nums text-quest-ink">
              {controlGroupPct}%
            </span>
          </div>
          <span className="text-[12px] text-quest-ink-muted">
            {heldOutPlayers > 0
              ? `${heldOutPlayers.toLocaleString()} players held out and managed by rules-based baseline.`
              : "Players held out and managed by rules-based baseline."}
          </span>
          <span className="text-[11px] text-quest-ink-faint">
            We recommend 10&ndash;15% for reliable measurement.
          </span>
        </div>
      </div>

      {/* Projections panel */}
      <div
        className="flex w-[200px] shrink-0 flex-col gap-3 rounded-lg p-4"
        style={{
          background: '#FBFBFA',
          border: '1px solid rgba(55,53,47,0.09)',
        }}
      >
        <span className="text-[12px] font-medium text-quest-ink-muted" style={{ letterSpacing: '0.02em' }}>
          Projections
        </span>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-quest-ink-faint">Est. agents</span>
            <span className="text-[24px] font-medium tabular-nums text-quest-ink">
              {projections.estimatedAgents > 0 ? projections.estimatedAgents.toLocaleString() : "\u2014"}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-quest-ink-faint">Calibration time</span>
            <span className="text-[24px] font-medium tabular-nums text-quest-ink">
              {projections.calibrationDays > 0 ? `${projections.calibrationDays}d` : "\u2014"}
            </span>
            <span className="text-[11px] text-quest-ink-faint">
              Before full optimisation
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
