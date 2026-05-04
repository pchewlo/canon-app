import { Check, Minus, X } from "lucide-react"
import type { ReactNode } from "react"

export type Cell =
  | { kind: "yes"; note?: string }
  | { kind: "no"; note?: string }
  | { kind: "partial"; note?: string }
  | { kind: "text"; value: ReactNode }

export type ComparisonColumn = { name: string; highlighted?: boolean }
export type ComparisonRow = { label: string; cells: Cell[] }

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-[14px]">
        <thead className="bg-quest-surface-muted">
          <tr>
            <th className="px-5 py-4 font-medium text-quest-ink-muted">&nbsp;</th>
            {columns.map((col) => (
              <th
                key={col.name}
                className={`px-5 py-4 font-semibold ${
                  col.highlighted ? "text-quest-ink" : "text-quest-ink-muted"
                }`}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-5 py-4 align-top text-quest-ink-muted">
                {row.label}
              </td>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className={`px-5 py-4 align-top ${
                    columns[i]?.highlighted ? "bg-quest-success-soft/30" : ""
                  }`}
                >
                  <CellRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CellRender({ cell }: { cell: Cell }) {
  if (cell.kind === "yes") {
    return (
      <div className="flex items-start gap-2">
        <Check className="mt-0.5 h-4 w-4 text-quest-success shrink-0" />
        {cell.note && (
          <span className="text-quest-ink-muted text-[13px]">{cell.note}</span>
        )}
      </div>
    )
  }
  if (cell.kind === "no") {
    return (
      <div className="flex items-start gap-2">
        <X className="mt-0.5 h-4 w-4 text-quest-ink-faint shrink-0" />
        {cell.note && (
          <span className="text-quest-ink-muted text-[13px]">{cell.note}</span>
        )}
      </div>
    )
  }
  if (cell.kind === "partial") {
    return (
      <div className="flex items-start gap-2">
        <Minus className="mt-0.5 h-4 w-4 text-quest-warning shrink-0" />
        {cell.note && (
          <span className="text-quest-ink-muted text-[13px]">{cell.note}</span>
        )}
      </div>
    )
  }
  return <span className="text-quest-ink">{cell.value}</span>
}
