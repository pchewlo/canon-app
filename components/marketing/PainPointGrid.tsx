type Pain = { title: string; body: string }

export function PainPointGrid({
  items,
  tone = "cream",
}: {
  items: Pain[]
  tone?: "white" | "cream" | "navy"
}) {
  const isDark = tone === "navy"
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((p) => (
        <div
          key={p.title}
          className={`rounded-[4px] border p-6 ${
            isDark
              ? "border-white/10 bg-white/[0.03]"
              : "border-canon-line-soft bg-canon-paper"
          }`}
        >
          <div
            className={`mt-1 text-[15px] font-semibold tracking-[-0.005em] ${
              isDark ? "text-white" : "text-canon-ink"
            }`}
          >
            {p.title}
          </div>
          <p
            className={`mt-2 text-[13px] leading-[1.55] ${
              isDark ? "text-white/65" : "text-quest-ink-muted"
            }`}
          >
            {p.body}
          </p>
        </div>
      ))}
    </div>
  )
}
