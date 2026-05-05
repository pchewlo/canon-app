// HANDOFF Variant 6B — Bordered container + 2 px green top accent on cream.
// Use for: product / "what you get" sections with two adjacent items that are
// part of one system. Always two cells, never three. Each cell can optionally
// link to a deeper page (cell becomes a hover-linkable card).

import Link from "next/link"

type Product = {
  name: string
  body: string
  bullets?: string[]
  href?: string
}

type Props = {
  eyebrow: string
  title: string
  products: [Product, Product]
  tone?: "cream" | "paper"
  id?: string
}

export function SectionProductFrame({
  eyebrow,
  title,
  products,
  tone = "cream",
  id,
}: Props) {
  const surface = tone === "cream" ? "bg-canon-cream" : "bg-canon-paper"
  return (
    <section id={id} className={`${surface} px-6 py-24 lg:px-[88px] lg:py-32`}>
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        <h2 className="mt-4 mb-10 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-canon-ink max-w-[26ch]">
          {title}
        </h2>
        <div
          className="grid grid-cols-1 rounded-[4px] border border-canon-line bg-canon-paper md:grid-cols-2"
          style={{ borderTop: "2px solid var(--canon-green)" }}
        >
          {products.map((product, i) => {
            const cellClasses = `p-10 ${
              i === 1 ? "md:border-l md:border-canon-line" : ""
            } ${product.href ? "transition-colors hover:bg-canon-fog" : ""}`
            const inner = (
              <>
                <div className="mb-3 text-[18px] font-semibold tracking-[-0.005em] text-canon-ink">
                  {product.name}
                  {product.href ? (
                    <span aria-hidden="true" className="ml-1.5 text-canon-green">
                      →
                    </span>
                  ) : null}
                </div>
                <p className="m-0 mb-4 text-[14px] leading-[1.55] text-quest-ink-muted">
                  {product.body}
                </p>
                {product.bullets && product.bullets.length > 0 && (
                  <ul className="m-0 list-disc pl-[18px] text-[13px] leading-[1.7] text-quest-ink-muted">
                    {product.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </>
            )
            return product.href ? (
              <Link key={i} href={product.href} className={cellClasses}>
                {inner}
              </Link>
            ) : (
              <article key={i} className={cellClasses}>
                {inner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
