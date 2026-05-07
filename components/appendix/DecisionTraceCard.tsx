// One worked example of agent reasoning. Designed for a longform read,
// not for marketing — closer to a case-study format.

export type DecisionTrace = {
  player: string
  signal: string
  reasoning: string
  decision: string
  safetyCheck: string
  outcome: string
}

export function DecisionTraceCard({
  trace,
  index,
}: {
  trace: DecisionTrace
  index: number
}) {
  return (
    <article className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-6">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-semibold tabular-nums tracking-[0.14em] text-canon-green">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[14px] font-semibold tracking-[-0.005em] text-canon-ink">
          {trace.player}
        </span>
      </div>

      <Row label="Signal" body={trace.signal} />
      <Row label="Reasoning" body={trace.reasoning} />
      <Row label="Decision" body={trace.decision} emphasis />
      <Row label="Safety check" body={trace.safetyCheck} />
      <Row label="Outcome at +30 days" body={trace.outcome} />
    </article>
  )
}

function Row({
  label,
  body,
  emphasis,
}: {
  label: string
  body: string
  emphasis?: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-canon-line-soft py-3 first-of-type:border-t-0 first-of-type:pt-0 sm:grid-cols-[140px_1fr] sm:gap-4">
      <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        {label}
      </div>
      <p
        className={`text-[14px] leading-[1.55] ${
          emphasis ? "font-medium text-canon-ink" : "text-quest-ink-muted"
        }`}
      >
        {body}
      </p>
    </div>
  )
}
