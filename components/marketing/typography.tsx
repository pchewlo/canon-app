import type { CSSProperties, ReactNode } from "react"

export function Wordmark({
  size = 14,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <span
      className={`text-quest-accent uppercase font-brand ${className ?? ""}`.trim()}
      style={{
        fontSize: size,
        fontWeight: 400,
        letterSpacing: "0.26em",
        lineHeight: 1,
        paddingLeft: "0.26em",
      }}
    >
      Canon
    </span>
  )
}

export type HeadingSize = "sm" | "md" | "lg" | "xl"

// HANDOFF spec: h2 = 32 px Inter 600, line-height 1.18, tracking -0.018 em,
// max-width 22-26ch, text-balance. Hero h1 keeps responsive scale.
const HEADING_FONT_SIZE: Record<HeadingSize, string> = {
  sm: "24px",
  md: "32px",
  lg: "40px",
  xl: "clamp(44px, 6vw, 76px)",
}

const HEADING_MAX_WIDTH: Record<HeadingSize, string> = {
  sm: "30ch",
  md: "26ch",
  lg: "22ch",
  xl: "20ch",
}

const HEADING_TRACKING: Record<HeadingSize, string> = {
  sm: "-0.012em",
  md: "-0.018em",
  lg: "-0.018em",
  xl: "-0.028em",
}

const HEADING_LINE_HEIGHT: Record<HeadingSize, number> = {
  sm: 1.25,
  md: 1.18,
  lg: 1.18,
  xl: 1.05,
}

export function Heading({
  children,
  size = "lg",
  as: Tag = "h2",
  className = "",
  style,
}: {
  children: ReactNode
  size?: HeadingSize
  as?: "h1" | "h2" | "h3"
  className?: string
  style?: CSSProperties
}) {
  return (
    <Tag
      className={`text-balance font-semibold ${className}`.trim()}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: HEADING_FONT_SIZE[size],
        lineHeight: HEADING_LINE_HEIGHT[size],
        letterSpacing: HEADING_TRACKING[size],
        maxWidth: HEADING_MAX_WIDTH[size],
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

// HANDOFF spec: JetBrains Mono 500, 11 px, uppercase, 0.14 em tracking.
export function Eyebrow({
  children,
  dark,
  className = "",
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <p
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] mb-5 ${
        dark ? "" : "text-quest-ink-faint"
      } ${className}`.trim()}
      style={dark ? { color: "rgba(243, 239, 230, 0.55)" } : undefined}
    >
      {children}
    </p>
  )
}
