// HANDOFF Variant 4C — Big number + quote split on cream.
// Use for: any "why now" / proof-point section that has one hero stat and one
// quote.

type Props = {
  eyebrow: string
  statValue: string
  statCaption: string
  quote: { body: string; author: string; role: string }
  id?: string
}

export function SectionBigStatSplit({
  eyebrow,
  statValue,
  statCaption,
  quote,
  id,
}: Props) {
  return (
    <section id={id} className="bg-canon-cream px-[88px] py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
              {eyebrow}
            </div>
            <div className="mt-3 text-[128px] font-semibold leading-[0.95] tracking-[-0.04em] text-canon-green tabular-nums">
              {statValue}
            </div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-quest-ink-faint">
              {statCaption}
            </div>
          </div>
          <blockquote className="m-0">
            <p className="m-0 mb-4 max-w-[38ch] font-brand text-[22px] italic leading-[1.4] text-quest-ink">
              “{quote.body}”
            </p>
            <footer className="font-mono text-[12px] text-quest-ink-faint not-italic">
              — {quote.author}, {quote.role}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
