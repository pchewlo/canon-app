import type { ReactNode } from "react"
import Link from "next/link"
import { DemoLink } from "@/components/landing/DemoLink"
import { Heading } from "@/components/marketing/typography"

type Tone = "navy" | "cream" | "white" | "green"

const TONE_BG: Record<Tone, string> = {
  navy: "bg-canon-navy text-white",
  cream: "bg-canon-cream",
  white: "bg-canon-paper",
  green: "bg-canon-green text-white",
}

type CTA = { label: string; href: string }

export function CalloutBanner({
  title,
  body,
  primaryCta = { label: "Book a call", href: "/book-call" },
  secondaryCta,
  tone = "green",
}: {
  title: ReactNode
  body?: ReactNode
  primaryCta?: CTA
  secondaryCta?: CTA
  tone?: Tone
}) {
  const isDark = tone === "navy" || tone === "green"

  const primaryClass = isDark
    ? "inline-flex items-center rounded-[4px] bg-canon-cream h-11 px-5 text-[14px] font-semibold text-canon-ink hover:bg-canon-cream/90 transition-colors"
    : "inline-flex items-center rounded-[4px] bg-canon-navy h-11 px-5 text-[14px] font-semibold text-white hover:bg-canon-navy/90 transition-colors"

  const secondaryClass = isDark
    ? "inline-flex items-center text-[14px] font-medium hover:text-white transition-colors"
    : "inline-flex items-center text-[14px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"

  const titleClass = isDark
    ? tone === "green"
      ? "text-canon-cream"
      : "text-white"
    : ""

  return (
    <section className={`relative overflow-hidden ${TONE_BG[tone]}`}>
      {tone === "green" && (
        <>
          <Bracket position="tl" />
          <Bracket position="tr" />
          <Bracket position="bl" />
          <Bracket position="br" />
        </>
      )}
      <div className="relative z-[1] mx-auto max-w-3xl px-6 py-16 sm:py-20 lg:py-24 text-center">
        <Heading size="lg" className={`mx-auto ${titleClass}`}>
          {title}
        </Heading>
        {body && (
          <p
            className={`mt-6 mx-auto max-w-xl text-[16px] leading-relaxed ${
              tone === "navy" ? "text-white/65" : ""
            } ${tone === "cream" || tone === "white" ? "text-quest-ink-muted" : ""}`}
            style={
              tone === "green"
                ? { color: "rgba(243, 239, 230, 0.7)" }
                : undefined
            }
          >
            {body}
          </p>
        )}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {renderCta(primaryCta, primaryClass)}
          {secondaryCta && (
            <span
              style={
                isDark ? { color: "rgba(243, 239, 230, 0.7)" } : undefined
              }
            >
              {renderCta(secondaryCta, secondaryClass)}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

function renderCta(cta: CTA, className: string) {
  const isDemoHash = cta.href.startsWith("#demo")
  const isHash = cta.href.startsWith("#")
  const isExternal = /^https?:\/\//.test(cta.href)

  if (isDemoHash) {
    return <DemoLink className={className}>{cta.label}</DemoLink>
  }
  if (isHash || isExternal) {
    return (
      <a href={cta.href} className={className}>
        {cta.label}
      </a>
    )
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
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
