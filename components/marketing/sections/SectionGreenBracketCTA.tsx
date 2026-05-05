// HANDOFF Variant 7C — Oxford green slab + bracket frame + plan card.
// Use for: closing CTA when you need more than a button — a plan, timeline, or
// next-step block.

import Link from "next/link"

type Props = {
  eyebrow: string
  title: string
  body: string
  cta: { label: string; href: string }
  plan: { title: string; steps: string[] }
  id?: string
}

export function SectionGreenBracketCTA({
  eyebrow,
  title,
  body,
  cta,
  plan,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="relative bg-canon-green px-[88px] py-28"
    >
      {/* Corner brackets */}
      <Bracket position="tl" />
      <Bracket position="tr" />
      <Bracket position="bl" />
      <Bracket position="br" />

      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div
              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "rgba(243, 239, 230, 0.55)" }}
            >
              {eyebrow}
            </div>
            <h2 className="mt-4 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-canon-cream max-w-[26ch]">
              {title}
            </h2>
            <p
              className="mt-4 text-[15px] leading-[1.55] max-w-[42ch]"
              style={{ color: "rgba(243, 239, 230, 0.7)" }}
            >
              {body}
            </p>
            <Link
              href={cta.href}
              className="mt-7 inline-block rounded-[4px] bg-canon-cream px-[22px] py-3 text-[14px] font-semibold text-canon-ink no-underline transition-colors hover:bg-canon-cream/90"
            >
              {cta.label}
            </Link>
          </div>
          <aside
            className="rounded-[4px] px-8 py-7"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(243,239,230,0.18)",
              color: "var(--canon-cream-brand)",
            }}
          >
            <div
              className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "rgba(243,239,230,0.65)" }}
            >
              {plan.title}
            </div>
            <ol className="m-0 list-decimal pl-[18px] text-[14px] leading-[1.7]">
              {plan.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Bracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position[0] === "t"
  const isLeft = position[1] === "l"
  const colour = "rgba(243,239,230,0.4)"
  return (
    <span
      aria-hidden="true"
      className="absolute h-6 w-6"
      style={{
        top: isTop ? 32 : undefined,
        bottom: isTop ? undefined : 32,
        left: isLeft ? 32 : undefined,
        right: isLeft ? undefined : 32,
        borderTop: isTop ? `1px solid ${colour}` : undefined,
        borderBottom: isTop ? undefined : `1px solid ${colour}`,
        borderLeft: isLeft ? `1px solid ${colour}` : undefined,
        borderRight: isLeft ? undefined : `1px solid ${colour}`,
      }}
    />
  )
}
