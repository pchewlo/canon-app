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
      className={`text-quest-accent uppercase ${className ?? ""}`.trim()}
      style={{
        fontFamily:
          'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
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

const HEADING_SIZE: Record<HeadingSize, string> = {
  sm: "clamp(22px, 2.4vw, 28px)",
  md: "clamp(28px, 3.2vw, 38px)",
  lg: "clamp(36px, 4.6vw, 56px)",
  xl: "clamp(44px, 6vw, 76px)",
}

const HEADING_TRACKING: Record<HeadingSize, string> = {
  sm: "-0.012em",
  md: "-0.018em",
  lg: "-0.022em",
  xl: "-0.028em",
}

export type HeadingSize = "sm" | "md" | "lg" | "xl"

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
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: HEADING_SIZE[size],
        fontWeight: 600,
        lineHeight: 1.05,
        letterSpacing: HEADING_TRACKING[size],
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

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
      className={`text-[11px] font-medium uppercase tracking-[0.22em] mb-5 ${
        dark ? "text-white/55" : "text-quest-ink-faint"
      } ${className}`.trim()}
    >
      {children}
    </p>
  )
}
