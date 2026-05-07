import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { Eyebrow, Heading } from "@/components/marketing/typography"

export function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets,
  media,
  reverse,
  tone = "white",
}: {
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  bullets?: string[]
  media: ReactNode
  reverse?: boolean
  tone?: "white" | "cream" | "navy"
}) {
  const isDark = tone === "navy"
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="lg:col-span-6">
        {eyebrow && <Eyebrow dark={isDark}>{eyebrow}</Eyebrow>}
        <Heading size="lg" className={isDark ? "text-white" : ""}>
          {title}
        </Heading>
        {body && (
          <div
            className={`mt-6 text-[16px] leading-relaxed ${
              isDark ? "text-white/70" : "text-quest-ink-muted"
            }`}
          >
            {body}
          </div>
        )}
        {bullets && bullets.length > 0 && (
          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className={`flex items-start gap-3 text-[15px] ${
                  isDark ? "text-white/85" : "text-quest-ink"
                }`}
              >
                <Check
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    isDark ? "text-white/70" : "text-canon-green"
                  }`}
                  strokeWidth={2.2}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="lg:col-span-6">{media}</div>
    </div>
  )
}
