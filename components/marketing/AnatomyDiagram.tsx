import type { ReactNode } from "react"

type Hotspot = {
  /** position as percentages of container (0-100) */
  x: number
  y: number
  label: string
  body: string
}

export function AnatomyDiagram({
  children,
  hotspots,
  caption,
}: {
  children: ReactNode
  hotspots: Hotspot[]
  caption?: string
}) {
  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white p-3">
      <div className="relative overflow-hidden rounded-lg">
        {children}
        {hotspots.map((h, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <span className="relative flex h-6 w-6">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-quest-accent opacity-30" />
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-quest-accent text-white text-[11px] font-semibold tabular-nums shadow-md">
                {i + 1}
              </span>
            </span>
          </div>
        ))}
      </div>

      {hotspots.length > 0 && (
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 px-3 pb-3">
          {hotspots.map((h, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-quest-accent text-white text-[10px] font-semibold tabular-nums">
                {i + 1}
              </span>
              <div className="text-[13px]">
                <div className="font-medium text-quest-ink">{h.label}</div>
                <div className="text-quest-ink-muted leading-snug">{h.body}</div>
              </div>
            </li>
          ))}
        </ol>
      )}

      {caption && (
        <div className="px-3 pb-3 text-[11px] text-quest-ink-faint">{caption}</div>
      )}
    </div>
  )
}
