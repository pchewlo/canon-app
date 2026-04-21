import { cn } from "@/lib/utils"

type InsightCardProps = {
  headline: string
  explanation: string
  metric?: { label: string; value: string; delta: string; deltaType: 'positive' | 'negative' | 'neutral' }
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  accent?: boolean
}

export function InsightCard({
  headline,
  explanation,
  metric,
  actionLabel,
  onAction,
  icon,
  accent = false,
}: InsightCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-white dark:bg-card shadow-sm p-5",
      accent && "ring-1 ring-quest-danger/20"
    )}>
      <div className="flex gap-4">
        {icon && (
          <div className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            accent
              ? "bg-quest-danger-soft text-quest-danger"
              : "bg-quest-accent-soft text-quest-accent"
          )}>
            {icon}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-2.5">
          <h4 className="text-[15px] font-semibold text-quest-ink">{headline}</h4>
          <p className="text-[13px] leading-relaxed text-quest-ink-muted">{explanation}</p>

          {metric && (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-[12px] text-quest-ink-faint">{metric.label}</span>
              <span className="text-[20px] font-bold tabular-nums text-quest-ink">
                {metric.value}
              </span>
              <span
                className={cn(
                  "text-[12px] font-medium",
                  metric.deltaType === 'positive' && "text-quest-success",
                  metric.deltaType === 'negative' && "text-quest-danger",
                  metric.deltaType === 'neutral' && "text-quest-ink-faint",
                )}
              >
                {metric.delta}
              </span>
            </div>
          )}

          {actionLabel && onAction && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={onAction}
                className={cn(
                  "rounded-md px-4 py-1.5 text-[12px] font-medium transition-colors",
                  accent
                    ? "bg-quest-accent text-white hover:bg-quest-accent/90"
                    : "border border-border text-quest-ink-muted hover:bg-quest-surface-muted"
                )}
              >
                {actionLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
