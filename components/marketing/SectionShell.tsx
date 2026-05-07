import type { ReactNode } from "react"
import { Eyebrow, Heading } from "@/components/marketing/typography"

type Tone = "white" | "cream" | "navy" | "green"

const TONE_BG: Record<Tone, string> = {
  white: "bg-canon-paper",
  cream: "bg-canon-cream",
  navy: "bg-canon-navy text-white",
  green: "bg-canon-green text-white",
}

const TONE_TEXT: Record<Tone, string | undefined> = {
  white: undefined,
  cream: undefined,
  navy: "text-white",
  green: "text-canon-cream",
}

const TONE_BODY: Record<Tone, string> = {
  white: "text-quest-ink-muted",
  cream: "text-quest-ink-muted",
  navy: "text-white/70",
  green: "",
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
          padded ? "py-16 sm:py-20 lg:py-32" : "py-10 sm:py-12"
        }`}
      >
        {(eyebrow || title || description) && (
          <div className="max-w-3xl mb-10 sm:mb-12">
            {eyebrow && (
              <Eyebrow dark={tone === "navy" || tone === "green"}>
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <Heading size="lg" className={TONE_TEXT[tone]}>
                {title}
              </Heading>
            )}
            {description && (
              <p
                className={`mt-6 text-[16px] leading-relaxed max-w-[42ch] ${TONE_BODY[tone]}`}
                style={
                  tone === "green"
                    ? { color: "rgba(243, 239, 230, 0.7)" }
                    : undefined
                }
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
