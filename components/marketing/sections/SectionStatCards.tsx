// HANDOFF Variant 5A — Three big stat cards on cream.
// Use for: outcomes / proof-of-value blocks with three stats.

type Stat = { value: string; label: string; body: string }

type Props = {
  eyebrow: string
  title: string
  stats: [Stat, Stat, Stat]
  id?: string
}

export function SectionStatCards({ eyebrow, title, stats, id }: Props) {
  return (
    <section id={id} className="bg-canon-cream px-[88px] py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        <h2 className="mt-4 mb-10 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-quest-ink max-w-[26ch]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <article
              key={i}
              className="rounded-[4px] border border-canon-line-soft bg-canon-paper px-7 py-8"
            >
              <div className="mb-4 text-[48px] font-semibold leading-none tracking-[-0.02em] text-canon-green tabular-nums">
                {stat.value}
              </div>
              <div className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
                {stat.label}
              </div>
              <p className="m-0 text-[13px] leading-[1.55] text-quest-ink-muted">
                {stat.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
