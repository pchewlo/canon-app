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
  const ctaClass = featured
    ? "mt-7 inline-flex w-full items-center justify-center rounded-md bg-white px-5 py-2.5 text-[14px] font-medium text-[#1A2332] hover:bg-white/90 transition-colors"
    : "mt-7 inline-flex w-full items-center justify-center rounded-md bg-quest-accent px-5 py-2.5 text-[14px] font-medium text-white hover:bg-quest-accent/90 transition-colors"

  return (
    <div
      className={`rounded-2xl p-7 ${
        featured
          ? "bg-[#1A2332] text-white shadow-[0_30px_60px_-25px_rgba(26,35,50,0.4)]"
          : "border border-quest-ink/10 bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[16px] font-semibold">{name}</div>
        {featured && (
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider">
            Most chosen
          </span>
        )}
      </div>
      <p
        className={`mt-2 text-[13px] ${
          featured ? "text-white/70" : "text-quest-ink-muted"
        }`}
      >
        {summary}
      </p>

      <div className="mt-6">
        <div
          className={`tabular-nums ${
            featured ? "text-white" : "text-quest-ink"
          }`}
          style={{
            fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {price}
        </div>
        {formula && (
          <div
            className={`mt-1 text-[12px] ${
              featured ? "text-white/55" : "text-quest-ink-faint"
            }`}
          >
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
            className={`flex items-start gap-3 text-[13px] ${
              featured ? "text-white/85" : "text-quest-ink"
            }`}
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                featured ? "text-white/70" : "text-quest-success"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
