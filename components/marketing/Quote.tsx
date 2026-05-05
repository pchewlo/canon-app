type QuoteProps = {
  quote: string
  author: string
  role: string
  company: string
  tone?: "white" | "cream" | "navy"
}

export function Quote({ quote, author, role, company, tone = "cream" }: QuoteProps) {
  const isDark = tone === "navy"
  const bg =
    tone === "navy"
      ? "bg-canon-navy text-white"
      : tone === "cream"
        ? "bg-canon-cream"
        : "bg-canon-paper border border-canon-line-soft"

  return (
    <figure className={`rounded-[4px] ${bg} p-8 lg:p-12`}>
      <blockquote
        className={`font-brand italic text-[22px] lg:text-[26px] leading-[1.4] ${
          isDark ? "text-white" : "text-canon-ink"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption
        className={`mt-6 font-mono text-[12px] ${
          isDark ? "text-white/65" : "text-quest-ink-faint"
        }`}
      >
        <span className={isDark ? "text-white" : "text-canon-ink font-medium"}>
          — {author}
        </span>
        , {role} · {company}
      </figcaption>
    </figure>
  )
}
