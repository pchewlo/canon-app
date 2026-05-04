import type { ReactNode } from "react"
import { Eyebrow, Heading } from "@/components/marketing/typography"

type Tone = "white" | "cream" | "navy"

const TONE_BG: Record<Tone, string> = {
  white: "bg-white",
  cream: "bg-[#F3EFE6]",
  navy: "bg-[#1A2332] text-white",
}

const TONE_TEXT: Record<Tone, string | undefined> = {
  white: undefined,
  cream: undefined,
  navy: "text-white",
}

export function SectionShell({
  tone = "white",
  eyebrow,
  title,
  description,
  maxWidth = "6xl",
  padded = true,
  id,
  className = "",
  children,
}: {
  tone?: Tone
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
  padded?: boolean
  id?: string
  className?: string
  children?: ReactNode
}) {
  const widthClass = `max-w-${maxWidth}`

  return (
    <section id={id} className={`${TONE_BG[tone]} ${className}`.trim()}>
      <div
        className={`mx-auto ${widthClass} px-6 ${
          padded ? "py-24 lg:py-32" : "py-12"
        }`}
      >
        {(eyebrow || title || description) && (
          <div className="max-w-3xl mb-12">
            {eyebrow && (
              <Eyebrow dark={tone === "navy"}>{eyebrow}</Eyebrow>
            )}
            {title && (
              <Heading size="lg" className={TONE_TEXT[tone]}>
                {title}
              </Heading>
            )}
            {description && (
              <p
                className={`mt-6 text-[16px] leading-relaxed ${
                  tone === "navy" ? "text-white/70" : "text-quest-ink-muted"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
