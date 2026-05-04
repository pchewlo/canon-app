import type { ReactNode } from "react"
import Link from "next/link"
import { DemoLink } from "@/components/landing/DemoLink"
import { Eyebrow, Heading } from "@/components/marketing/typography"

type Tone = "white" | "cream" | "navy"

const TONE_BG: Record<Tone, string> = {
  white: "bg-white",
  cream: "bg-[#F3EFE6]",
  navy: "bg-[#1A2332] text-white",
}

type CTA = {
  label: string
  href: string
  /** When href is "#demo" or starts with "#", uses smooth-scroll DemoLink for demo */
  variant?: "primary" | "secondary"
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta = { label: "Request a demo", href: "#demo" },
  secondaryCta,
  media,
  tone = "white",
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  primaryCta?: CTA
  secondaryCta?: CTA
  media?: ReactNode
  tone?: Tone
}) {
  const isDark = tone === "navy"

  return (
    <section className={`${TONE_BG[tone]} overflow-hidden`}>
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-24">
        <div
          className={`grid grid-cols-1 ${
            media ? "lg:grid-cols-12" : ""
          } gap-12 items-center`}
        >
          <div className={media ? "lg:col-span-7" : "max-w-3xl"}>
            {eyebrow && <Eyebrow dark={isDark}>{eyebrow}</Eyebrow>}
            <Heading size="xl" as="h1" className={isDark ? "text-white" : ""}>
              {title}
            </Heading>
            {subtitle && (
              <p
                className={`mt-7 max-w-xl text-[18px] leading-relaxed ${
                  isDark ? "text-white/70" : "text-quest-ink-muted"
                }`}
              >
                {subtitle}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <CTAButton cta={primaryCta} primary tone={tone} />
              {secondaryCta && (
                <CTAButton cta={secondaryCta} tone={tone} />
              )}
            </div>
          </div>
          {media && <div className="lg:col-span-5">{media}</div>}
        </div>
      </div>
    </section>
  )
}

function CTAButton({
  cta,
  primary,
  tone,
}: {
  cta: CTA
  primary?: boolean
  tone: Tone
}) {
  const isDemoHash = cta.href.startsWith("#demo")
  const isHash = cta.href.startsWith("#")
  const isExternal = /^https?:\/\//.test(cta.href)
  const isDark = tone === "navy"

  const primaryClasses = isDark
    ? "inline-flex items-center rounded-md bg-white px-5 py-2.5 text-[14px] font-medium text-[#1A2332] hover:bg-white/90 transition-colors"
    : "inline-flex items-center rounded-md bg-quest-accent px-5 py-2.5 text-[14px] font-medium text-white hover:bg-quest-accent/90 transition-colors"

  const secondaryClasses = isDark
    ? "inline-flex items-center text-[14px] font-medium text-white/70 hover:text-white transition-colors"
    : "inline-flex items-center text-[14px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"

  const className = primary ? primaryClasses : secondaryClasses

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
