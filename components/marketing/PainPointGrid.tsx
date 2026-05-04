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
          className={`rounded-xl border p-6 ${
            isDark
              ? "border-white/10 bg-white/[0.03]"
              : "border-quest-ink/10 bg-white"
          }`}
        >
          <div
            className={`mt-1 text-[15px] font-semibold ${
              isDark ? "text-white" : "text-quest-ink"
            }`}
          >
            {p.title}
          </div>
          <p
            className={`mt-2 text-[13.5px] leading-relaxed ${
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
