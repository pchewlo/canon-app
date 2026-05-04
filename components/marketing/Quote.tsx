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
    tone === "navy" ? "bg-[#1A2332] text-white" : tone === "cream" ? "bg-[#F3EFE6]" : "bg-white"

  return (
    <figure className={`rounded-2xl ${bg} p-8 lg:p-12`}>
      <blockquote
        className={`text-[20px] lg:text-[24px] leading-snug ${
          isDark ? "text-white" : "text-quest-ink"
        }`}
        style={{ letterSpacing: "-0.012em" }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption
        className={`mt-6 text-[13px] ${
          isDark ? "text-white/65" : "text-quest-ink-muted"
        }`}
      >
        <span className={isDark ? "text-white" : "text-quest-ink font-medium"}>
          {author}
        </span>
        , {role} · {company}
      </figcaption>
    </figure>
  )
}
