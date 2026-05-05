// HANDOFF Variant 3B — Two-column hairline grid + green numerals on cream.
// Use for: dense spec list, optimisation system, "what's in it" feature grids
// (4–8 items).

type Item = { title: string; body: string }

type Props = {
  eyebrow: string
  title: string
  items: Item[]
  id?: string
}

export function SectionHairlineSpecGrid({
  eyebrow,
  title,
  items,
  id,
}: Props) {
  return (
    <section id={id} className="relative bg-canon-cream px-[88px] py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,53,47,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,53,47,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        <h2 className="mt-4 mb-8 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-quest-ink max-w-[26ch]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i}>
              <div className="mb-1.5 flex items-baseline gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-canon-green tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] font-semibold tracking-[-0.005em] text-quest-ink">
                  {item.title}
                </span>
              </div>
              <p className="m-0 pl-[26px] text-[13px] leading-[1.55] text-quest-ink-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
