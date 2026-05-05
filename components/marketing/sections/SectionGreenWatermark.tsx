// HANDOFF Variant 1B — Oxford green slab + watermark serif numeral.
// Use for: opening problem framing, manifesto moments, brand-tone breaks.

type Props = {
  eyebrow: string
  title: string
  body?: string
  watermark: string
  id?: string
}

export function SectionGreenWatermark({
  eyebrow,
  title,
  body,
  watermark,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-canon-green px-[88px] py-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-4 font-brand text-[340px] leading-[0.8] tracking-[-0.04em]"
        style={{ color: "rgba(243, 239, 230, 0.06)" }}
      >
        {watermark}
      </span>
      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <div className="max-w-[680px]">
          <div
            className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: "rgba(243, 239, 230, 0.55)" }}
          >
            {eyebrow}
          </div>
          <h2 className="mt-4 text-balance text-[40px] font-semibold leading-[1.18] tracking-[-0.018em] text-canon-cream max-w-[22ch]">
            {title}
          </h2>
          {body && (
            <p
              className="mt-5 text-[16px] leading-[1.55] max-w-[42ch]"
              style={{ color: "rgba(243, 239, 230, 0.7)" }}
            >
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
