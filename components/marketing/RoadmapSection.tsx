type RoadmapItem = {
  quarter: string
  title: string
  status: "shipped" | "in-flight" | "next" | "later"
}

const STATUS_LABEL: Record<RoadmapItem["status"], string> = {
  shipped: "Shipped",
  "in-flight": "In flight",
  next: "Up next",
  later: "Later",
}

const STATUS_CLASS: Record<RoadmapItem["status"], string> = {
  shipped: "bg-quest-success-soft text-quest-success",
  "in-flight": "bg-quest-info-soft text-quest-info",
  next: "bg-quest-warning-soft text-quest-warning",
  later: "bg-quest-surface-muted text-quest-ink-muted",
}

export function RoadmapSection({ items }: { items: RoadmapItem[] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-quest-accent ring-4 ring-white" />
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
              {item.quarter}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_CLASS[item.status]}`}>
              {STATUS_LABEL[item.status]}
            </span>
          </div>
          <div className="mt-1 text-[15px] font-medium text-quest-ink">
            {item.title}
          </div>
        </li>
      ))}
    </ol>
  )
}
