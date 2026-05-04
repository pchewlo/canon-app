type Stat = { value: string; label: string; hint?: string }

export function StatStrip({
  stats,
  tone = "white",
}: {
  stats: Stat[]
  tone?: "white" | "cream" | "navy"
}) {
  const isDark = tone === "navy"
  return (
    <div
      className={`grid gap-6 md:gap-10 ${
        stats.length === 4
          ? "grid-cols-2 md:grid-cols-4"
          : stats.length === 2
            ? "grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div
            className={`tabular-nums leading-none ${
              isDark ? "text-white" : "text-quest-ink"
            }`}
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {s.value}
          </div>
          <div
            className={`mt-3 text-[14px] font-semibold ${
              isDark ? "text-white" : "text-quest-ink"
            }`}
          >
            {s.label}
          </div>
          {s.hint && (
            <div
              className={`mt-1 text-[12px] ${
                isDark ? "text-white/60" : "text-quest-ink-muted"
              }`}
            >
              {s.hint}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
