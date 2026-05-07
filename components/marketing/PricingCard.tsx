import Link from "next/link"
import { Check } from "lucide-react"
import { DemoLink } from "@/components/landing/DemoLink"

export type PricingCardProps = {
  name: string
  summary: string
  price: string
  formula?: string
  includes: string[]
  cta: { label: string; href: string }
  featured?: boolean
}

export function PricingCard({
  name,
  summary,
  price,
  formula,
  includes,
  cta,
  featured,
}: PricingCardProps) {
  const isDemo = cta.href.startsWith("#demo")
  const ctaClass =
    "mt-7 inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-canon-navy px-5 text-[14px] font-semibold text-white hover:bg-canon-navy/90 transition-colors"

  return (
    <div
      className="rounded-[4px] border border-canon-line bg-canon-paper p-6 sm:p-7"
      style={
        featured ? { borderTop: "2px solid var(--canon-green)" } : undefined
      }
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[16px] font-semibold tracking-[-0.005em] text-canon-ink">
          {name}
        </div>
        {featured && (
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-canon-green">
            Most chosen
          </span>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-[1.55] text-quest-ink-muted">
        {summary}
      </p>

      <div className="mt-6">
        <div
          className="tabular-nums text-canon-green"
          style={{
            fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {price}
        </div>
        {formula && (
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-quest-ink-faint">
            {formula}
          </div>
        )}
      </div>

      {isDemo ? (
        <DemoLink className={ctaClass}>{cta.label}</DemoLink>
      ) : (
        <Link href={cta.href} className={ctaClass}>
          {cta.label}
        </Link>
      )}

      <ul className="mt-7 space-y-3">
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[13px] leading-[1.55] text-canon-ink"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-canon-green"
              strokeWidth={2.2}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
