// HANDOFF Variant 6B — Bordered container + 2 px green top accent on cream.
// Use for: product / "what you get" sections with two adjacent items that are
// part of one system. Always two cells, never three.

type Product = { name: string; body: string; bullets: string[] }

type Props = {
  eyebrow: string
  title: string
  products: [Product, Product]
  id?: string
}

export function SectionProductFrame({
  eyebrow,
  title,
  products,
  id,
}: Props) {
  return (
    <section id={id} className="bg-canon-cream px-[88px] py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        <h2 className="mt-4 mb-10 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-quest-ink max-w-[26ch]">
          {title}
        </h2>
        <div
          className="grid grid-cols-1 rounded-[4px] border border-canon-line bg-canon-paper md:grid-cols-2"
          style={{ borderTop: "2px solid var(--canon-green)" }}
        >
          {products.map((product, i) => (
            <article
              key={i}
              className={`p-10 ${i === 1 ? "md:border-l md:border-canon-line" : ""}`}
            >
              <div className="mb-3 text-[18px] font-semibold tracking-[-0.005em] text-quest-ink">
                {product.name}
              </div>
              <p className="m-0 mb-4 text-[14px] leading-[1.55] text-quest-ink-muted">
                {product.body}
              </p>
              <ul className="m-0 list-disc pl-[18px] text-[13px] leading-[1.7] text-quest-ink-muted">
                {product.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
