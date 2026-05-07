// Three-column architecture: Operator platform → Canon agents → Comms.
// Solid arrows = write paths. Dotted arrows = read paths.

export function ArchitectureDiagram() {
  return (
    <div className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-7">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Architecture
      </div>
      <svg
        viewBox="0 0 720 240"
        role="img"
        aria-label="Operator platform on the left, Canon agents in the middle, comms infrastructure on the right. Dotted arrows from operator to Canon for reads. Solid arrows from Canon to comms and back to operator for writes."
        className="mt-4 h-auto w-full"
      >
        {/* Columns */}
        <Column x={20} y={40} title="Operator platform" lines={["Player profile", "Sessions", "Bonus history", "Balances"]} />
        <Column x={280} y={40} title="Canon agents" lines={["Decision engine", "Policy + RG", "Audit log"]} highlight />
        <Column x={540} y={40} title="Comms + ledger" lines={["Push / email", "In-app", "Bonus issuance"]} />

        {/* Read arrow: operator → canon (dotted) */}
        <line
          x1={180}
          y1={100}
          x2={280}
          y2={100}
          stroke="rgba(55,53,47,0.45)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          markerEnd="url(#arrow-soft)"
        />
        <text x={230} y={92} textAnchor="middle" fontSize="10" fill="#5F5E5B" fontFamily="var(--font-mono, monospace)">
          reads
        </text>

        {/* Write arrow: canon → comms (solid) */}
        <line
          x1={440}
          y1={100}
          x2={540}
          y2={100}
          stroke="rgba(29,58,47,0.85)"
          strokeWidth="1.6"
          markerEnd="url(#arrow-solid)"
        />
        <text x={490} y={92} textAnchor="middle" fontSize="10" fill="#1D3A2F" fontFamily="var(--font-mono, monospace)">
          writes
        </text>

        {/* Write arrow: canon → operator (solid, lower) */}
        <line
          x1={280}
          y1={170}
          x2={180}
          y2={170}
          stroke="rgba(29,58,47,0.85)"
          strokeWidth="1.6"
          markerEnd="url(#arrow-solid)"
        />
        <text x={230} y={162} textAnchor="middle" fontSize="10" fill="#1D3A2F" fontFamily="var(--font-mono, monospace)">
          decisions
        </text>

        <defs>
          <marker
            id="arrow-soft"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="rgba(55,53,47,0.45)" />
          </marker>
          <marker
            id="arrow-solid"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 z" fill="rgba(29,58,47,0.85)" />
          </marker>
        </defs>
      </svg>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-quest-ink-faint">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-px w-6"
            style={{
              borderTop: "1px dashed rgba(55,53,47,0.45)",
            }}
          />
          Reads
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-[2px] w-6 bg-canon-green/85"
          />
          Writes
        </span>
      </div>
    </div>
  )
}

function Column({
  x,
  y,
  title,
  lines,
  highlight,
}: {
  x: number
  y: number
  title: string
  lines: string[]
  highlight?: boolean
}) {
  const w = 160
  const h = 160
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={highlight ? "var(--canon-cream)" : "transparent"}
        stroke={highlight ? "rgba(29,58,47,0.4)" : "rgba(55,53,47,0.15)"}
        strokeWidth={highlight ? "1.2" : "1"}
      />
      <text
        x={x + 14}
        y={y + 22}
        fontSize="11"
        fontWeight="600"
        fill={highlight ? "#1D3A2F" : "#1A2332"}
        fontFamily="var(--font-mono, monospace)"
        style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + 14}
          y={y + 50 + i * 22}
          fontSize="13"
          fill="#37352F"
          fontFamily="var(--font-sans, sans-serif)"
        >
          {line}
        </text>
      ))}
    </g>
  )
}
