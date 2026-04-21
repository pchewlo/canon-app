'use client'

import { cn } from "@/lib/utils"
import { Users, Shield, TrendingUp, Share2, Brain } from "lucide-react"
import type { PlanObjective } from "@/lib/types"

type ObjectiveOption = {
  id: PlanObjective
  title: string
  description: string
  icon: React.ElementType
  cpep: string
  recommended?: boolean
}

const objectives: ObjectiveOption[] = [
  {
    id: "activation",
    title: "Activation",
    description: "Convert new signups into active players",
    icon: Users,
    cpep: "Typical CPEP \u00A30.30\u20130.60",
  },
  {
    id: "retention",
    title: "Retention",
    description: "Keep existing players engaged and reduce churn",
    icon: Shield,
    cpep: "Typical CPEP \u00A30.40\u20130.80",
  },
  {
    id: "revenue",
    title: "Revenue",
    description: "Grow player lifetime value responsibly",
    icon: TrendingUp,
    cpep: "Typical CPEP \u00A30.60\u20131.20",
  },
  {
    id: "referral",
    title: "Referral",
    description: "Encourage players to invite others",
    icon: Share2,
    cpep: "Typical CPEP \u00A30.20\u20130.50",
  },
  {
    id: "ai_optimised",
    title: "AI optimised",
    description: "Let Canon choose the best objective and control group",
    icon: Brain,
    cpep: "Canon dynamically optimises across metrics",
    recommended: true,
  },
]

type ObjectiveStepProps = {
  selected?: PlanObjective
  onSelect: (objective: PlanObjective) => void
}

export function ObjectiveStep({ selected, onSelect }: ObjectiveStepProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="mb-1 text-[13px] text-quest-ink-muted">
        What should Canon optimize for?
      </p>

      {objectives.map((obj) => {
        const Icon = obj.icon
        const isSelected = selected === obj.id
        const isRecommended = obj.recommended
        return (
          <button
            key={obj.id}
            type="button"
            onClick={() => onSelect(obj.id)}
            className={cn(
              "relative flex items-start gap-3.5 rounded-lg border p-4 text-left transition-colors",
              isSelected
                ? "border-quest-accent bg-quest-accent-soft/40"
                : isRecommended
                  ? "border-quest-accent/30 bg-gradient-to-r from-quest-accent-soft/20 to-transparent hover:from-quest-accent-soft/30"
                  : "border-border bg-card hover:bg-quest-surface-muted/50",
            )}
          >
            {isRecommended && (
              <span className="absolute right-3 top-3 rounded-full bg-quest-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-quest-accent">
                Recommended
              </span>
            )}

            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                isSelected
                  ? "bg-quest-accent text-white"
                  : isRecommended
                    ? "bg-quest-accent/10 text-quest-accent"
                    : "bg-quest-surface-muted text-quest-ink-faint",
              )}
            >
              <Icon size={18} strokeWidth={1.5} />
            </div>

            <div className="flex flex-col gap-0.5">
              <span
                className={cn(
                  "text-[14px] font-medium",
                  isSelected ? "text-quest-accent" : "text-quest-ink",
                )}
              >
                {obj.title}
              </span>
              <span className="text-[13px] text-quest-ink-muted">
                {obj.description}
              </span>
              <span className="mt-1 text-[11px] text-quest-ink-faint">
                {obj.cpep}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
