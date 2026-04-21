'use client'

import { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, ChevronDown, X } from "lucide-react"
import { getDB } from "@/lib/mock/db"
import { DataTable } from "@/components/DataTable"
import { StatusPill } from "@/components/StatusPill"
import type { Plan, PlanObjective } from "@/lib/types"

const objectiveLabels: Record<PlanObjective, string> = {
  activation: "Activation",
  retention: "Retention",
  revenue: "Revenue",
  referral: "Referral",
  ai_optimised: "AI optimised",
}

type MetricType = "Activation" | "Retention" | "Revenue" | "Referral" | "AI optimised"

const objectiveMetric: Record<PlanObjective, MetricType> = {
  activation: "Activation",
  retention: "Retention",
  revenue: "Revenue",
  referral: "Referral",
  ai_optimised: "AI optimised",
}

const metricBadgeStyles: Record<MetricType, string> = {
  Activation: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  Retention: "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  Revenue: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  Referral: "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
  "AI optimised": "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300",
}

const statusOrder: Record<Plan['status'], number> = {
  active: 0,
  calibrating: 1,
  paused: 2,
  draft: 3,
  ended: 4,
}

type PlanRow = {
  id: string
  name: string
  objective: PlanObjective
  objectiveLabel: string
  status: Plan['status']
  dailyBudget: number
  spendToday: number
  cpep: number
  retentionLift: number
  safetyFlags: number
  [key: string]: unknown
}

// ---- Filter chip dropdown ----

type FilterOption = { value: string; label: string; count?: number }

function FilterChip({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isActive = value !== "all"
  const selectedLabel = options.find((o) => o.value === value)?.label ?? label

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
          isActive
            ? "bg-quest-accent text-white"
            : "border border-border bg-card text-quest-ink-muted hover:bg-quest-surface-muted"
        }`}
      >
        {isActive ? selectedLabel : label}
        {isActive ? (
          <X
            size={12}
            strokeWidth={2}
            className="ml-0.5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onChange("all")
              setOpen(false)
            }}
          />
        ) : (
          <ChevronDown size={12} strokeWidth={2} />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-card py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value === value ? "all" : opt.value)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] transition-colors ${
                opt.value === value
                  ? "bg-quest-accent-soft text-quest-accent font-medium"
                  : "text-quest-ink-muted hover:bg-quest-surface-muted"
              }`}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span className="ml-2 tabular-nums text-[11px] text-quest-ink-faint">{opt.count}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PlansPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [objectiveFilter, setObjectiveFilter] = useState<string>("all")

  const db = getDB()

  const planRows: PlanRow[] = useMemo(() => {
    const plans = db.plans

    return plans
      .map((plan) => {
        const stats = db.getPlanStats(plan.id)
        // Generate realistic spend today (60-85% of budget for active, less for others)
        let spendPct: number
        if (plan.status === 'active') {
          spendPct = 0.60 + (Math.abs(plan.id.charCodeAt(5) % 25) / 100)
        } else if (plan.status === 'calibrating') {
          spendPct = 0.35 + (Math.abs(plan.id.charCodeAt(6) % 20) / 100)
        } else {
          spendPct = 0.02
        }
        const spendToday = Math.round(plan.dailyBudgetTotal * spendPct * 100) / 100

        return {
          id: plan.id,
          name: plan.name,
          objective: plan.objective,
          objectiveLabel: objectiveLabels[plan.objective],
          status: plan.status,
          dailyBudget: plan.dailyBudgetTotal,
          spendToday,
          cpep: stats.cpep,
          retentionLift: stats.retentionLift,
          safetyFlags: stats.totalSafetyEvents,
        }
      })
      .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
  }, [db])

  const filteredRows = useMemo(() => {
    let rows = planRows

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.objectiveLabel.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter)
    }

    if (objectiveFilter !== "all") {
      rows = rows.filter((r) => r.objective === objectiveFilter)
    }

    return rows
  }, [planRows, searchQuery, statusFilter, objectiveFilter])

  // Compute counts per status and objective for filter chips
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const row of planRows) {
      counts[row.status] = (counts[row.status] || 0) + 1
    }
    return counts
  }, [planRows])

  const objectiveCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const row of planRows) {
      counts[row.objective] = (counts[row.objective] || 0) + 1
    }
    return counts
  }, [planRows])

  const statusOptions: FilterOption[] = [
    { value: "active", label: "Active", count: statusCounts.active || 0 },
    { value: "calibrating", label: "Calibrating", count: statusCounts.calibrating || 0 },
    { value: "paused", label: "Paused", count: statusCounts.paused || 0 },
    { value: "ended", label: "Ended", count: statusCounts.ended || 0 },
    { value: "draft", label: "Draft", count: statusCounts.draft || 0 },
  ]

  const objectiveOptions: FilterOption[] = [
    { value: "activation", label: "Activation", count: objectiveCounts.activation || 0 },
    { value: "retention", label: "Retention", count: objectiveCounts.retention || 0 },
    { value: "revenue", label: "Revenue", count: objectiveCounts.revenue || 0 },
    { value: "referral", label: "Referral", count: objectiveCounts.referral || 0 },
    { value: "ai_optimised", label: "AI optimised", count: objectiveCounts.ai_optimised || 0 },
  ]

  const isFiltered = statusFilter !== "all" || objectiveFilter !== "all" || searchQuery.trim() !== ""

  const columns = [
    {
      key: "name",
      label: "Strategy",
      render: (row: PlanRow) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-medium text-quest-ink">{row.name}</span>
          <span className="text-[11px] text-quest-ink-faint">{row.objectiveLabel}</span>
        </div>
      ),
      width: "240px",
    },
    {
      key: "status",
      label: "Status",
      render: (row: PlanRow) => <StatusPill status={row.status} />,
      width: "120px",
    },
    {
      key: "metric",
      label: "Metric",
      render: (row: PlanRow) => {
        const metric = objectiveMetric[row.objective]
        return (
          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium ${metricBadgeStyles[metric]}`}>
            {metric}
          </span>
        )
      },
      width: "100px",
    },
    {
      key: "dailyBudget",
      label: "Daily budget",
      align: "right" as const,
      sortable: true,
      render: (row: PlanRow) => (
        <span className="tabular-nums">{"\u00A3"}{row.dailyBudget.toLocaleString()}</span>
      ),
      width: "120px",
    },
    {
      key: "spendToday",
      label: "Spend today",
      align: "right" as const,
      sortable: true,
      render: (row: PlanRow) => (
        <span className="tabular-nums">{"\u00A3"}{row.spendToday.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
      ),
      width: "120px",
    },
    {
      key: "cpep",
      label: "CPEP",
      align: "right" as const,
      sortable: true,
      render: (row: PlanRow) => (
        <span className="tabular-nums">{"\u00A3"}{row.cpep.toFixed(2)}</span>
      ),
      width: "90px",
    },
    {
      key: "retentionLift",
      label: "Retention lift",
      align: "right" as const,
      sortable: true,
      render: (row: PlanRow) => (
        <div className="flex flex-col items-end gap-0.5">
          <span className="tabular-nums text-quest-success font-medium">+{row.retentionLift.toFixed(1)}%</span>
          <span className="text-[10px] text-quest-ink-faint">vs. control</span>
        </div>
      ),
      width: "110px",
    },
    {
      key: "safetyFlags",
      label: "Safety",
      align: "right" as const,
      sortable: true,
      render: (row: PlanRow) => (
        <span className="tabular-nums">{row.safetyFlags}</span>
      ),
      width: "80px",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-medium text-quest-ink">Strategies</h1>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            strokeWidth={1.5}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-quest-ink-faint"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search strategies..."
            className="h-8 w-full rounded-md border border-border bg-quest-surface-muted pl-8 pr-3 text-[13px] text-quest-ink placeholder:text-quest-ink-faint outline-none focus:ring-1 focus:ring-quest-accent"
          />
        </div>

        <FilterChip
          label="Status"
          value={statusFilter}
          options={statusOptions}
          onChange={setStatusFilter}
        />

        <FilterChip
          label="Objective"
          value={objectiveFilter}
          options={objectiveOptions}
          onChange={setObjectiveFilter}
        />

        <span className="ml-auto text-[12px] text-quest-ink-faint tabular-nums">
          {isFiltered
            ? `Showing ${filteredRows.length} of ${planRows.length} strategies`
            : `Showing ${planRows.length} strategies`}
        </span>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredRows}
        columns={columns}
        rowKey={(row) => row.id}
        onRowClick={(row) => router.push(`/strategies/${row.id}`)}
        emptyMessage="No strategies match your filters"
      />
    </div>
  )
}
