import type { ReactNode } from "react"
import Link from "next/link"
import { DemoLink } from "@/components/landing/DemoLink"
import { Heading } from "@/components/marketing/typography"

type Tone = "navy" | "cream" | "white"

const TONE_BG: Record<Tone, string> = {
  navy: "bg-[#1A2332] text-white",
  cream: "bg-[#F3EFE6]",
  white: "bg-white",
}

type CTA = { label: string; href: string }

export function CalloutBanner({
  title,
  body,
  primaryCta = { label: "Request a demo", href: "#demo" },
  secondaryCta,
  tone = "navy",
}: {
  title: ReactNode
  body?: ReactNode
  primaryCta?: CTA
  secondaryCta?: CTA
  tone?: Tone
}) {
  const isDark = tone === "navy"

  const primaryClass = isDark
    ? "inline-flex items-center rounded-md bg-white px-5 py-2.5 text-[14px] font-medium text-[#1A2332] hover:bg-white/90 transition-colors"
    : "inline-flex items-center rounded-md bg-quest-accent px-5 py-2.5 text-[14px] font-medium text-white hover:bg-quest-accent/90 transition-colors"

  const secondaryClass = isDark
    ? "inline-flex items-center text-[14px] font-medium text-white/70 hover:text-white transition-colors"
    : "inline-flex items-center text-[14px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"

  return (
    <section className={TONE_BG[tone]}>
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 text-center">
        <Heading size="lg" className={isDark ? "text-white" : ""}>
          {title}
        </Heading>
        {body && (
          <p
            className={`mt-6 mx-auto max-w-xl text-[16px] leading-relaxed ${
              isDark ? "text-white/65" : "text-quest-ink-muted"
            }`}
          >
            {body}
          </p>
        )}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {renderCta(primaryCta, primaryClass)}
          {secondaryCta && renderCta(secondaryCta, secondaryClass)}
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
