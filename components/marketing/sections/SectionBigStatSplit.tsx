// HANDOFF Variant 4C — Big number + quote split on cream.
// Use for: any "why now" / proof-point section that has one hero stat and one
// quote. Optional `supportingStats` row preserves any extra numbers from the
// original section (so we don't drop content when consolidating).

type SupportingStat = { value: string; label: string }

type Props = {
  eyebrow: string
  statValue: string
  statCaption: string
  quote: { body: string; author: string; role: string }
  supportingStats?: SupportingStat[]
  tone?: "cream" | "paper"
  id?: string
}

export function SectionBigStatSplit({
  eyebrow,
  statValue,
  statCaption,
  quote,
  supportingStats,
  tone = "cream",
  id,
}: Props) {
  const surface = tone === "cream" ? "bg-canon-cream" : "bg-canon-paper"
  return (
    <section id={id} className={`${surface} px-6 py-24 lg:px-[88px] lg:py-32`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
              {eyebrow}
            </div>
            <div className="mt-3 text-[96px] sm:text-[128px] font-semibold leading-[0.95] tracking-[-0.04em] text-canon-green tabular-nums">
              {statValue}
            </div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-quest-ink-faint">
              {statCaption}
            </div>
          </div>
          <blockquote className="m-0">
            <p className="m-0 mb-4 max-w-[38ch] font-brand text-[22px] italic leading-[1.4] text-canon-ink">
              &ldquo;{quote.body}&rdquo;
            </p>
            <footer className="font-mono text-[12px] text-quest-ink-faint not-italic">
              — {quote.author}, {quote.role}
            </footer>
          </blockquote>
        </div>

        {supportingStats && supportingStats.length > 0 && (
          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-canon-line pt-8 sm:grid-cols-3">
            {supportingStats.map((s) => (
              <div key={s.label}>
                <div className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-canon-green tabular-nums">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-quest-ink-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
