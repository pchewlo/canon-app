import type { LucideIcon } from "lucide-react"

type Item = { title: string; body: string; icon?: LucideIcon }

export function CapabilityGrid({
  items,
  columns = 3,
  tone = "white",
}: {
  items: Item[]
  columns?: 2 | 3 | 4
  tone?: "white" | "cream" | "navy"
}) {
  const isDark = tone === "navy"
  const colsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-4`}>
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={`rounded-[4px] border p-6 ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-canon-line-soft bg-canon-paper"
            }`}
          >
            <div className="flex items-center justify-between">
              {Icon ? (
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-[4px] ${
                    isDark
                      ? "bg-white/[0.06] text-white/80"
                      : "bg-canon-cream text-canon-green"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                </div>
              ) : (
                <div
                  className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] tabular-nums ${
                    isDark ? "text-white/55" : "text-canon-green"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              )}
            </div>
            <div
              className={`mt-3 text-[15px] font-semibold tracking-[-0.005em] ${
                isDark ? "text-white" : "text-canon-ink"
              }`}
            >
              {item.title}
            </div>
            <p
              className={`mt-2 text-[13px] leading-[1.55] ${
                isDark ? "text-white/70" : "text-quest-ink-muted"
              }`}
            >
              {item.body}
            </p>
          </div>
        )
      })}
    </div>
  )
}
