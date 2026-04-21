'use client'

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { KPICard } from "@/components/KPICard"
import { LiveFeed } from "@/components/LiveFeed"
import { StatusPill } from "@/components/StatusPill"
import { DataTable } from "@/components/DataTable"
import { AreaChartComponent } from "@/components/charts/AreaChart"
import { useSimulator } from "@/lib/mock/simulator"
import { getDB } from "@/lib/mock/db"
import type { Plan, PlanObjective } from "@/lib/types"

// ---- Helpers ----

function formatNumber(n: number): string {
  return n.toLocaleString("en-GB")
}

function formatCurrency(n: number): string {
  return n.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const objectiveLabels: Record<PlanObjective, string> = {
  activation: "Activation",
  retention: "Retention",
  revenue: "Revenue",
  referral: "Referral",
  ai_optimised: "AI optimised",
}

// ---- Page ----

export default function OverviewPage() {
  const router = useRouter()
  const { kpis, liveFeed } = useSimulator()
  const db = getDB()

  const plans = db.plans
  const timeSeries = db.getAggregateTimeSeries()

  // Chart toggle state
  const [chartToggles, setChartToggles] = useState<Record<string, boolean>>({
    retentionLift: true,
    roiIndex: true,
    spend: false,
    activeAgents: false,
    safetyInterventions: false,
  })

  function toggleSeries(key: string) {
    setChartToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Last 7 days for the chart
  const chartData = useMemo(() => {
    const last7 = timeSeries.slice(-7)
    return last7.map((point) => ({
      date: point.date.slice(5), // "04-14" format
      spend: Math.round(point.spend),
      retentionLift: point.retentionLift,
      activeAgents: Math.round(point.activeAgents / 1000 * 10) / 10,
      safetyInterventions: point.safetyInterventions,
      roiIndex: point.spend > 0
        ? Math.round((point.retentionLift / point.spend) * 1000 * 10) / 10
        : 0,
    }))
  }, [timeSeries])

  // Build visible series list from toggle state
  const allSeriesDefs = [
    { key: "retentionLift", label: "Retention lift (%)", color: "#3B6D2E", type: "line" as const },
    { key: "roiIndex", label: "ROI index", color: "#7C3AED", type: "line" as const },
    { key: "spend", label: "Spend (\u00A3)", color: "#1A2332", type: "area" as const },
    { key: "activeAgents", label: "Active agents (k)", color: "#185FA5", type: "line" as const },
    { key: "safetyInterventions", label: "Safety interventions", color: "#854F0B", type: "line" as const },
  ]

  const visibleSeries = allSeriesDefs.filter((s) => chartToggles[s.key])

  // Plan table data — enrich with computed stats
  const planTableData = useMemo(() => {
    return plans.map((plan) => {
      const stats = db.getPlanStats(plan.id)
      return {
        ...plan,
        cpep: stats.cpep,
        retentionLift: stats.retentionLift,
      }
    })
  }, [plans, db])

  // Table columns
  const columns = useMemo(() => [
    {
      key: "name",
      label: "Strategy",
      render: (row: Plan & { cpep: number; retentionLift: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-quest-ink">{row.name}</span>
          <span className="text-[11px] text-quest-ink-faint">{objectiveLabels[row.objective]}</span>
        </div>
      ),
    },
    {
      key: "dailyBudgetTotal",
      label: "Daily budget",
      align: "right" as const,
      sortable: true,
      render: (row: Plan & { cpep: number; retentionLift: number }) => (
        <span className="tabular-nums">{"\u00A3"}{formatCurrency(row.dailyBudgetTotal)}</span>
      ),
    },
    {
      key: "cpep",
      label: "CPEP",
      align: "right" as const,
      sortable: true,
      render: (row: Plan & { cpep: number; retentionLift: number }) => (
        <span className="tabular-nums">{"\u00A3"}{row.cpep.toFixed(2)}</span>
      ),
    },
    {
      key: "retentionLift",
      label: "Retention lift",
      align: "right" as const,
      sortable: true,
      render: (row: Plan & { cpep: number; retentionLift: number }) => (
        <div className="flex flex-col items-end">
          <span className="tabular-nums">{row.retentionLift.toFixed(1)}%</span>
          <span className="text-[11px] text-quest-ink-faint">vs. control</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Plan & { cpep: number; retentionLift: number }) => {
        let supplementary: string | undefined
        if (row.status === "calibrating") {
          const daysSinceCreated = Math.max(1, Math.ceil(
            (Date.now() - new Date(row.createdAt).getTime()) / (1000 * 60 * 60 * 24)
          ))
          supplementary = `Day ${Math.min(daysSinceCreated, 3)} of 3`
        }
        return <StatusPill status={row.status} supplementary={supplementary} />
      },
    },
  ], [])

  const spendProgress = (kpis.todaySpend / kpis.todayBudget) * 100

  return (
    <div className="space-y-6">
      {/* Explanatory text */}
      <p className="text-[13px] text-quest-ink-faint">
        Real-time performance across all active strategies. Metrics update every 10 seconds.
      </p>

      {/* KPI Row */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          label="Active agents"
          value={formatNumber(kpis.activeAgents)}
        />
        <KPICard
          label="Today's spend"
          prefix={"\u00A3"}
          value={formatCurrency(kpis.todaySpend)}
          subtitle={`of \u00A3${formatCurrency(kpis.todayBudget)} budget`}
          progress={spendProgress}
        />
        <KPICard
          label="CPEP"
          prefix={"\u00A3"}
          value={kpis.cpep.toFixed(2)}
          subtitle="cost per engaged player"
        />

        {/* Double-width retention comparison card */}
        <div className="col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="px-4 pt-3 pb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-quest-ink-faint">A/B test results</span>
          </div>
          <div className="grid grid-cols-2">
            {/* CANON side */}
            <div className="border-r border-border px-4 pb-3">
              <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#1A2332" }}>CANON</span>
              <div className="mt-1">
                <span className="text-[32px] font-semibold tabular-nums leading-tight" style={{ color: "#1A2332" }}>+{kpis.retentionLift.toFixed(1)}%</span>
              </div>
              <span className="text-[11px] text-quest-ink-faint">7-day retention</span>
            </div>
            {/* Control side */}
            <div className="px-4 pb-3 bg-quest-surface-muted/40">
              <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Control</span>
              <div className="mt-1">
                <span className="text-[22px] font-medium tabular-nums text-quest-ink-faint leading-tight">+4.2%</span>
              </div>
              <span className="text-[11px] text-quest-ink-faint">rules-based holdout</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-quest-success/5">
            <span className="text-[14px] font-semibold tabular-nums text-quest-success">Lift: +{(kpis.retentionLift - 4.2).toFixed(1)}pp</span>
            <span className="text-[11px] text-quest-ink-faint">10% holdout</span>
          </div>
        </div>

        <KPICard
          label="Safety interventions"
          value={kpis.safetyToday}
          delta="0.18 per 1k decisions"
          deltaType="neutral"
          subtitle={`${kpis.safetyToday} today`}
        />
      </div>

      {/* Main content: Chart + Live Feed */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Performance chart */}
        <div className="col-span-2 rounded-lg border border-border bg-card p-4">
          <p className="mb-2 text-[12px] text-quest-ink-faint">
            Performance across all active strategies over the last 7 days.
          </p>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-medium text-quest-ink">
              Performance &middot; last 7 days
            </h2>
            <div className="flex items-center gap-1.5">
              {allSeriesDefs.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggleSeries(s.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    chartToggles[s.key]
                      ? "text-white"
                      : "border border-border bg-card text-quest-ink-muted hover:bg-quest-surface-muted"
                  }`}
                  style={chartToggles[s.key] ? { backgroundColor: s.color } : undefined}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: chartToggles[s.key] ? "#fff" : s.color }}
                  />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <AreaChartComponent
            data={chartData}
            xKey="date"
            series={visibleSeries}
            height={360}
            yAxisLeft="Retention lift (%)"
            yAxisRight="ROI index"
            referenceLine={{
              value: 4.2,
              label: "Control",
              color: "#9CA3AF",
              yAxisId: "left",
            }}
          />
        </div>

        {/* Right: Live feed */}
        <div className="col-span-1 flex flex-col [&>div]:flex-1 [&>div]:max-h-[440px]">
          <LiveFeed decisions={liveFeed} maxItems={20} />
        </div>
      </div>

      {/* Active plans table */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-medium text-quest-ink">Strategies</h2>
          <Link
            href="/strategies"
            className="text-[13px] font-medium text-quest-accent hover:text-quest-accent/80 transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <DataTable
          data={planTableData as unknown as Record<string, unknown>[]}
          columns={columns as unknown as { key: string; label: string; render?: (row: Record<string, unknown>) => React.ReactNode; sortable?: boolean; width?: string; align?: "left" | "right" }[]}
          rowKey={(row) => (row as unknown as Plan).id}
          onRowClick={(row) => router.push(`/strategies/${(row as unknown as Plan).id}`)}
          searchable
          searchPlaceholder="Search strategies..."
        />
      </div>
    </div>
  )
}
