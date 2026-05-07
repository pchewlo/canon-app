"use client"

import { useEffect, useState } from "react"

const BASE_AGENTS = 182_491
const BASE_SPEND = 48_210
const BASE_LIFT = 14.3
const BUDGET = 62_000

// Subtle "live" feel — numbers drift up slowly. Tick once per second.
function useTickingStats() {
  const [agents, setAgents] = useState(BASE_AGENTS)
  const [spend, setSpend] = useState(BASE_SPEND)
  const [lift, setLift] = useState(BASE_LIFT)

  useEffect(() => {
    const id = setInterval(() => {
      setAgents((a) => a + Math.floor(Math.random() * 4) + 1)
      setSpend((s) => s + Math.floor(Math.random() * 7) + 2)
      // tiny breathing on lift, doesn't drift
      setLift(() => +(BASE_LIFT + (Math.random() - 0.5) * 0.2).toFixed(1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return { agents, spend, lift, progress: Math.min(100, (spend / BUDGET) * 100) }
}

export function DashboardSnapshot() {
  const { agents, spend, lift, progress } = useTickingStats()

  return (
    <div className="h-full rounded-xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(26,35,50,0.18)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-border bg-white px-5 py-2.5 shrink-0">
        <span
          className="text-quest-accent uppercase"
          style={{
            fontFamily:
              'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.26em",
            lineHeight: 1,
            paddingLeft: "0.26em",
          }}
        >
          Canon
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-quest-ink-faint">
          Overview · Real-time
          <span className="relative flex h-1.5 w-1.5 ml-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-success opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-quest-success" />
          </span>
        </span>
      </div>

      <div className="flex-1 bg-white p-3 space-y-4 sm:p-5 sm:space-y-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <PreviewKPI label="Active agents" value={agents.toLocaleString("en-GB")} />
          <PreviewKPI
            label="Today's spend"
            value={`£${spend.toLocaleString("en-GB")}`}
            subtitle={`of £${BUDGET.toLocaleString("en-GB")} budget`}
            progress={progress}
          />
          <PreviewKPI
            label="Retention lift"
            value={`+${lift.toFixed(1)}%`}
            subtitle="vs. 4.2% control"
            accent
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold text-quest-ink">
              Performance · last 7 days
            </span>
            <span className="text-[11px] text-quest-ink-faint">
              vs. rules-based control
            </span>
          </div>
          <PerformanceChart liftToday={lift} />
        </div>
      </div>
    </div>
  )
}

function PreviewKPI({
  label,
  value,
  subtitle,
  progress,
  accent,
}: {
  label: string
  value: string
  subtitle?: string
  progress?: number
  accent?: boolean
}) {
  return (
    <div className="relative flex flex-col gap-1 rounded-lg border border-border bg-card p-2.5 sm:p-3.5 sm:gap-1.5 overflow-hidden">
      <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-quest-ink-faint">
        {label}
      </span>
      <span
        className={`text-[16px] sm:text-[24px] font-semibold tabular-nums leading-none ${
          accent ? "text-quest-success" : "text-quest-ink"
        }`}
      >
        {value}
      </span>
      {subtitle && (
        <span className="text-[10px] sm:text-[11px] text-quest-ink-faint leading-tight">
          {subtitle}
        </span>
      )}
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-quest-surface-muted">
          <div
            className="h-full bg-quest-accent transition-[width] duration-700 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}

function PerformanceChart({ liftToday }: { liftToday: number }) {
  const w = 560
  const h = 180
  const pad = 16
  const canon = [4.2, 5.8, 7.4, 8.6, 10.2, 12.1, liftToday]
  const control = [4.2, 4.0, 4.3, 4.1, 4.2, 4.4, 4.2]
  const max = 16
  const xs = canon.map((_, i) => pad + (i * (w - 2 * pad)) / (canon.length - 1))
  const ys = (vals: number[]) =>
    vals.map((v) => h - pad - (v / max) * (h - 2 * pad))
  const canonYs = ys(canon)
  const controlYs = ys(control)
  const path = (yArr: number[]) =>
    yArr.map((y, i) => `${i === 0 ? "M" : "L"} ${xs[i]},${y}`).join(" ")
  const area =
    `M ${xs[0]},${canonYs[0]} ` +
    canonYs
      .slice(1)
      .map((y, i) => `L ${xs[i + 1]},${y}`)
      .join(" ") +
    ` L ${xs[xs.length - 1]},${h - pad} L ${xs[0]},${h - pad} Z`

  const lastX = xs[xs.length - 1]
  const lastY = canonYs[canonYs.length - 1]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={w - pad}
          y1={pad + f * (h - 2 * pad)}
          y2={pad + f * (h - 2 * pad)}
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1"
        />
      ))}

      <path d={area} fill="#1A2332" fillOpacity="0.07" />
      <path
        d={path(canonYs)}
        fill="none"
        stroke="#1A2332"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ transition: "d 0.7s ease-out" }}
      />
      <path
        d={path(controlYs)}
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <g transform={`translate(${pad}, ${pad - 4})`}>
        <circle cx="0" cy="0" r="3" fill="#1A2332" />
        <text x="8" y="3" fontSize="10" fill="#37352F">
          Canon
        </text>
        <circle cx="60" cy="0" r="3" fill="#9CA3AF" />
        <text x="68" y="3" fontSize="10" fill="#9CA3AF">
          Control
        </text>
      </g>

      {xs.map((x, i) => (
        <text
          key={i}
          x={x}
          y={h - 2}
          fontSize="9"
          textAnchor="middle"
          fill="#9B9A97"
        >
          Day {i + 1}
        </text>
      ))}

      {/* Pulsing live dot on the last point */}
      <circle cx={lastX} cy={lastY} r="6" fill="#1A2332" fillOpacity="0.18">
        <animate
          attributeName="r"
          values="3;9;3"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          values="0.25;0;0.25"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={lastX} cy={lastY} r="3" fill="#1A2332" />

      <text
        x={lastX - 4}
        y={lastY - 10}
        fontSize="11"
        fontWeight="500"
        textAnchor="end"
        fill="#1A2332"
      >
        +{liftToday.toFixed(1)}%
      </text>
    </svg>
  )
}
