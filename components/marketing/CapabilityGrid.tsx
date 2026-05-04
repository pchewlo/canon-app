type Item = { title: string; body: string }

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
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`rounded-xl border p-6 ${
            isDark
              ? "border-white/10 bg-white/[0.03]"
              : "border-quest-ink/10 bg-white"
          }`}
        >
          <div
            className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
              isDark ? "text-white/55" : "text-quest-ink-faint"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div
            className={`mt-3 text-[16px] font-semibold ${
              isDark ? "text-white" : "text-quest-ink"
            }`}
          >
            {item.title}
          </div>
          <p
            className={`mt-2 text-[14px] leading-relaxed ${
              isDark ? "text-white/70" : "text-quest-ink-muted"
            }`}
          >
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}
