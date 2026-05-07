// "Read next" interlinking row, dropped at the bottom of marketing pages
// just above the green CalloutBanner. Three icon-led cards, each linking
// to a related page. Curated per page so suggestions actually relate.

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

type Item = {
  href: string
  title: string
  body: string
  cta: string
  icon: LucideIcon
}

type Props = {
  eyebrow?: string
  title?: string
  items: [Item, Item, Item]
  tone?: "paper" | "cream"
  id?: string
}

export function RelatedPages({
  eyebrow = "Read next",
  title,
  items,
  tone = "paper",
  id,
}: Props) {
  const surface = tone === "cream" ? "bg-canon-cream" : "bg-canon-paper"
  return (
    <section
      id={id}
      className={`relative ${surface} border-t border-canon-line-soft`}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        {title && (
          <h2 className="mt-3 mb-10 text-balance text-[24px] font-semibold leading-[1.25] tracking-[-0.012em] text-canon-ink max-w-[30ch]">
            {title}
          </h2>
        )}
        <div className={`${title ? "" : "mt-8"} grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8`}>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group block"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-canon-cream text-canon-green transition-colors group-hover:bg-canon-green group-hover:text-canon-cream">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </div>
                <p className="mt-5 text-[14px] leading-[1.55] text-quest-ink-muted">
                  <span className="font-semibold text-canon-ink">
                    {item.title}.
                  </span>{" "}
                  {item.body}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-canon-green transition-colors group-hover:text-canon-ink">
                  {item.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
