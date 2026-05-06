'use client'

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Rocket, Save } from "lucide-react"
import { getDB } from "@/lib/mock/db"
import { PlanWizard } from "@/components/wizard/PlanWizard"
import { ObjectiveStep } from "@/components/wizard/steps/ObjectiveStep"
import { BudgetStep } from "@/components/wizard/steps/BudgetStep"
import { CohortStep } from "@/components/wizard/steps/CohortStep"
import { GuardrailsStep } from "@/components/wizard/steps/GuardrailsStep"
import type { PlanObjective, CohortFilter, Guardrails, Plan } from "@/lib/types"

const objectiveLabels: Record<PlanObjective, string> = {
  activation: "Activation",
  retention: "Retention",
  revenue: "Revenue",
  referral: "Referral",
  ai_optimised: "AI optimised",
}

function estimateCohortSize(filter: CohortFilter): number {
  let base = 12400
  if (filter.stakeBand?.length) base = Math.floor(base * (filter.stakeBand.length / 4))
  if (filter.lifecycle?.length) base = Math.floor(base * (filter.lifecycle.length / 5))
  if (filter.gamesPlayed?.length) base = Math.floor(base * (filter.gamesPlayed.length / 4))
  if (filter.stakeBand?.includes("vip")) base = Math.min(base, 340)
  if (filter.lifecycle?.includes("lapsed")) base = Math.min(base, 2100)
  if (filter.lifecycle?.includes("new")) base = Math.min(base, 1800)
  return base
}

export default function CreatePlanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  // Wizard state
  const [selectedObjective, setSelectedObjective] = useState<PlanObjective | undefined>()
  const [dailyBudget, setDailyBudget] = useState(0)
  const [perPlayerCap, setPerPlayerCap] = useState(0)
  const [cohortFilter, setCohortFilter] = useState<CohortFilter>({})
  const [guardrails, setGuardrails] = useState<Guardrails>({
    maxMissionsPerPlayerPerDay: 4,
    maxBonusValuePerPlayerPerDay: 3,
    coolOffAfterLoss: true,
    respectSelfExclusion: true,
    complianceReviewRequired: false,
  })
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [controlGroupPct, setControlGroupPct] = useState(10)

  const cohortSize = useMemo(() => estimateCohortSize(cohortFilter), [cohortFilter])

  const estimatedAgents = useMemo(() => {
    if (!dailyBudget || !perPlayerCap) return 0
    return Math.floor(dailyBudget / perPlayerCap)
  }, [dailyBudget, perPlayerCap])

  // Handle objective selection - auto advance
  function handleObjectiveSelect(objective: PlanObjective) {
    setSelectedObjective(objective)
    setTimeout(() => setCurrentStep(1), 300)
  }

  // Handle budget filled - check if should advance
  function handleBudgetDailyChange(value: number) {
    setDailyBudget(value)
    if (value > 0 && perPlayerCap > 0) {
      setTimeout(() => setCurrentStep(2), 500)
    }
  }

  function handleBudgetCapChange(value: number) {
    setPerPlayerCap(value)
    if (dailyBudget > 0 && value > 0) {
      setTimeout(() => setCurrentStep(2), 500)
    }
  }

  // Step definitions
  const steps = [
    {
      title: "Objective",
      description: selectedObjective ? objectiveLabels[selectedObjective] : "What should Canon optimize for?",
      isComplete: !!selectedObjective,
      isActive: currentStep === 0,
    },
    {
      title: "Budget",
      description: dailyBudget > 0 ? `\u00A3${dailyBudget.toLocaleString()}/day` : "Set daily spend limits",
      isComplete: dailyBudget > 0 && perPlayerCap > 0,
      isActive: currentStep === 1,
    },
    {
      title: "Cohort",
      description: cohortFilter.stakeBand?.length || cohortFilter.lifecycle?.length
        ? `${cohortSize.toLocaleString()} players`
        : "Define target audience",
      isComplete: !!(cohortFilter.stakeBand?.length || cohortFilter.lifecycle?.length),
      isActive: currentStep === 2,
    },
    {
      title: "Guardrails & templates",
      description: selectedTemplates.length > 0 ? `${selectedTemplates.length} templates selected` : "Safety limits and missions",
      isComplete: selectedTemplates.length > 0,
      isActive: currentStep === 3,
    },
  ]

  function handleStepClick(index: number) {
    // Only allow clicking on completed steps or the next available step
    if (index <= currentStep || steps[index - 1]?.isComplete) {
      setCurrentStep(index)
    }
  }

  function handleLaunch() {
    if (!selectedObjective || dailyBudget <= 0 || perPlayerCap <= 0 || selectedTemplates.length === 0) {
      return
    }

    const db = getDB()
    const newId = `plan-${Date.now()}`
    const newPlan: Plan = {
      id: newId,
      operatorId: "parlour",
      name: generatePlanName(selectedObjective),
      objective: selectedObjective,
      status: "calibrating",
      createdAt: new Date().toISOString(),
      dailyBudgetTotal: dailyBudget,
      perPlayerDailyCap: perPlayerCap,
      cohortFilter: {
        ...cohortFilter,
        rgRiskTier: ["none", "monitored"],
        region: ["UK"],
      },
      guardrails,
      templatePoolIds: selectedTemplates,
      controlGroupPct,
    }

    db.addPlan(newPlan)
    router.push(`/app/strategies/${newId}`)
  }

  function handleSaveDraft() {
    const db = getDB()
    const newId = `plan-draft-${Date.now()}`
    const newPlan: Plan = {
      id: newId,
      operatorId: "parlour",
      name: selectedObjective ? generatePlanName(selectedObjective) : "Untitled strategy",
      objective: selectedObjective || "retention",
      status: "draft",
      createdAt: new Date().toISOString(),
      dailyBudgetTotal: dailyBudget || 0,
      perPlayerDailyCap: perPlayerCap || 0,
      cohortFilter: cohortFilter,
      guardrails,
      templatePoolIds: selectedTemplates,
      controlGroupPct,
    }

    db.addPlan(newPlan)
    router.push("/app/strategies")
  }

  const canLaunch = !!selectedObjective && dailyBudget > 0 && perPlayerCap > 0 && selectedTemplates.length > 0

  return (
    <div className="space-y-4 pb-28 sm:space-y-6 lg:pb-0">
      {/* Back link */}
      <button
        onClick={() => router.push("/app/strategies")}
        className="inline-flex items-center gap-1.5 text-[13px] text-quest-ink-muted hover:text-quest-ink transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Strategies
      </button>

      <h1
        className="font-medium text-quest-ink"
        style={{
          fontSize: "clamp(24px, 6vw, 32px)",
          letterSpacing: "-0.018em",
          lineHeight: 1.15,
        }}
      >
        Create strategy
      </h1>

      {/* Stacked on mobile, 2-col on lg+ */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Wizard column */}
        <div className="min-w-0 lg:flex-[3]">
          <PlanWizard steps={steps} onStepClick={handleStepClick}>
            {/* Step 1: Objective */}
            <ObjectiveStep
              selected={selectedObjective}
              onSelect={handleObjectiveSelect}
            />

            {/* Step 2: Budget */}
            <BudgetStep
              dailyBudget={dailyBudget}
              perPlayerCap={perPlayerCap}
              onDailyBudgetChange={handleBudgetDailyChange}
              onPerPlayerCapChange={handleBudgetCapChange}
              controlGroupPct={controlGroupPct}
              onControlGroupPctChange={setControlGroupPct}
            />

            {/* Step 3: Cohort */}
            <div>
              <CohortStep
                filter={cohortFilter}
                onChange={(filter) => {
                  setCohortFilter(filter)
                }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!cohortFilter.stakeBand?.length && !cohortFilter.lifecycle?.length}
                  className="w-full rounded-lg bg-quest-accent px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-quest-accent/90 disabled:opacity-40 disabled:cursor-not-allowed sm:w-auto sm:py-2"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Step 4: Guardrails */}
            <GuardrailsStep
              guardrails={guardrails}
              onChange={setGuardrails}
              selectedTemplates={selectedTemplates}
              onTemplatesChange={setSelectedTemplates}
            />
          </PlanWizard>

          {/* Desktop action bar (hidden on mobile \u2014 sticky bar takes over) */}
          <div className="mt-6 hidden items-center justify-end gap-3 border-t border-border pt-4 lg:flex">
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-[13px] font-medium text-quest-ink transition-colors hover:bg-quest-surface-muted"
            >
              <Save size={14} strokeWidth={1.5} />
              Save draft
            </button>
            <button
              onClick={handleLaunch}
              disabled={!canLaunch}
              className="inline-flex items-center gap-1.5 rounded-lg bg-quest-accent px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-quest-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Rocket size={14} strokeWidth={1.5} />
              Launch strategy
            </button>
          </div>
        </div>

        {/* Strategy preview \u2014 full-width on mobile, sticky right on lg+ */}
        <div className="lg:flex-[2]">
          <div className="rounded-lg border border-border bg-card p-5 lg:sticky lg:top-6">
            <h3 className="mb-4 text-[14px] font-medium text-quest-ink">Strategy preview</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-1">
              {/* Objective */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Objective</span>
                <span className="text-[14px] text-quest-ink">
                  {selectedObjective ? objectiveLabels[selectedObjective] : <span className="text-quest-ink-faint italic">Not selected</span>}
                </span>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Budget</span>
                {dailyBudget > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] tabular-nums text-quest-ink">{"\u00A3"}{dailyBudget.toLocaleString()}/day</span>
                    {perPlayerCap > 0 && (
                      <span className="text-[12px] text-quest-ink-faint">{"\u00A3"}{perPlayerCap.toFixed(2)} per-player cap</span>
                    )}
                  </div>
                ) : (
                  <span className="text-[14px] text-quest-ink-faint italic">Not configured</span>
                )}
              </div>

              {/* Control group */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Control group</span>
                <span className="text-[14px] tabular-nums text-quest-ink">{controlGroupPct}% held out</span>
              </div>

              {/* Cohort */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Cohort</span>
                {cohortFilter.stakeBand?.length || cohortFilter.lifecycle?.length ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] tabular-nums text-quest-ink">{cohortSize.toLocaleString()} players</span>
                    <span className="text-[12px] text-quest-ink-faint">
                      {[
                        cohortFilter.stakeBand?.join(", "),
                        cohortFilter.lifecycle?.join(", "),
                      ].filter(Boolean).join(" \u00B7 ")}
                    </span>
                  </div>
                ) : (
                  <span className="text-[14px] text-quest-ink-faint italic">Not defined</span>
                )}
              </div>

              {/* Guardrails \u2014 spans full preview row when stacked */}
              <div className="col-span-2 flex flex-col gap-1 sm:col-span-3 lg:col-span-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Guardrails</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] text-quest-ink-muted">
                    {guardrails.maxMissionsPerPlayerPerDay} missions/day max &middot; {"\u00A3"}{guardrails.maxBonusValuePerPlayerPerDay} bonus cap
                  </span>
                  <span className="text-[12px] text-quest-ink-muted">
                    {guardrails.coolOffAfterLoss ? "Loss cool-off on" : "No loss cool-off"} &middot; Self-exclusion always on
                  </span>
                </div>
              </div>

              {/* Templates */}
              {selectedTemplates.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Templates</span>
                  <span className="text-[14px] text-quest-ink">{selectedTemplates.length} selected</span>
                </div>
              )}

              {/* Estimated agents */}
              {estimatedAgents > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-quest-ink-faint">Estimated agents</span>
                  <span className="text-[14px] tabular-nums text-quest-ink">{estimatedAgents.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Calibration estimate */}
            <div className="mt-4 rounded-md border border-border bg-quest-surface-muted/50 px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] text-quest-ink-faint">Estimated calibration</span>
                <span className="text-[13px] font-medium tabular-nums text-quest-ink whitespace-nowrap">~72 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-2 border-t border-border bg-card/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:hidden">
        <button
          onClick={handleSaveDraft}
          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-card text-[13px] font-medium text-quest-ink transition-colors hover:bg-quest-surface-muted"
        >
          <Save size={14} strokeWidth={1.5} />
          Save draft
        </button>
        <button
          onClick={handleLaunch}
          disabled={!canLaunch}
          className="inline-flex h-11 flex-[1.4] items-center justify-center gap-1.5 rounded-lg bg-quest-accent text-[13px] font-semibold text-white transition-colors hover:bg-quest-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Rocket size={14} strokeWidth={1.5} />
          Launch
        </button>
      </div>
    </div>
  )
}

function generatePlanName(objective: PlanObjective): string {
  const names: Record<PlanObjective, string> = {
    activation: "Activation campaign",
    retention: "Retention campaign",
    revenue: "Revenue growth campaign",
    referral: "Referral programme",
    ai_optimised: "AI-optimised campaign",
  }
  return names[objective]
}
