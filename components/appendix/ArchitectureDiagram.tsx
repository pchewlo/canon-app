// Three-column architecture: Operator platform → Canon agents → Comms.
// Solid arrows = write paths. Dotted arrows = read paths.

const PAPER = "#FFFFFF"
const CREAM = "#F3EFE6"
const INK = "#37352F"
const LINE = "#D5D2C8"
const GREEN = "#1D3A2F"
const MUTED = "#5F5E5B"

export function ArchitectureDiagram() {
  return (
    <div className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-7">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Architecture
      </div>

      <svg
        viewBox="0 0 760 320"
        role="img"
        aria-label="Operator platform on the left, Canon agents in the middle, comms infrastructure on the right. Dotted arrows from operator to Canon for reads. Solid arrows from Canon to comms and back to operator for writes."
        className="mt-4 h-auto w-full"
      >
        <defs>
          <marker
            id="arrow-soft"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
          <marker
            id="arrow-solid"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={GREEN} />
          </marker>
        </defs>

        {/* Columns */}
        <Column
          x={20}
          y={50}
          w={200}
          h={220}
          title="Operator platform"
          lines={[
            "Player profile",
            "Sessions",
            "Bonus history",
            "Balances",
          ]}
        />
        <Column
          x={280}
          y={50}
          w={200}
          h={220}
          title="Canon agents"
          highlight
          lines={[
            "Decision engine",
            "Policy + RG",
            "Audit log",
          ]}
        />
        <Column
          x={540}
          y={50}
          w={200}
          h={220}
          title="Comms + ledger"
          lines={[
            "Push / email",
            "In-app",
            "Bonus issuance",
          ]}
        />

        {/* Read arrow: operator → canon (dotted) */}
        <line
          x1={224}
          y1={130}
          x2={272}
          y2={130}
          stroke={MUTED}
          strokeWidth="1.4"
          strokeDasharray="4 4"
          markerEnd="url(#arrow-soft)"
        />
        <LabelChip x={224 + (272 - 224) / 2} y={114} text="reads" tone="muted" />

        {/* Write arrow: canon → comms (solid) */}
        <line
          x1={484}
          y1={130}
          x2={532}
          y2={130}
          stroke={GREEN}
          strokeWidth="1.6"
          markerEnd="url(#arrow-solid)"
        />
        <LabelChip
          x={484 + (532 - 484) / 2}
          y={114}
          text="writes"
          tone="green"
        />

        {/* Write arrow: canon → operator (decisions) */}
        <line
          x1={272}
          y1={210}
          x2={224}
          y2={210}
          stroke={GREEN}
          strokeWidth="1.6"
          markerEnd="url(#arrow-solid)"
        />
        <LabelChip
          x={272 - (272 - 224) / 2}
          y={194}
          text="decisions"
          tone="green"
        />
      </svg>

      <div className="mt-5 flex flex-wrap items-center gap-5 text-[12px] text-quest-ink-faint">
        <span className="inline-flex items-center gap-2">
          <svg width="28" height="6" viewBox="0 0 28 6" aria-hidden>
            <line
              x1="0"
              y1="3"
              x2="28"
              y2="3"
              stroke={MUTED}
              strokeWidth="1.4"
              strokeDasharray="4 4"
            />
          </svg>
          Reads
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="28" height="6" viewBox="0 0 28 6" aria-hidden>
            <line x1="0" y1="3" x2="28" y2="3" stroke={GREEN} strokeWidth="1.8" />
          </svg>
          Writes
        </span>
      </div>
    </div>
  )
}

function Column({
  x,
  y,
  w,
  h,
  title,
  lines,
  highlight,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  lines: string[]
  highlight?: boolean
}) {
  const fill = highlight ? CREAM : PAPER
  const stroke = highlight ? GREEN : LINE
  const strokeWidth = highlight ? 1.4 : 1
  const titleColor = highlight ? GREEN : INK
  const lineColor = INK

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x={x + 18}
        y={y + 30}
        fontSize="11"
        fontWeight={600}
        fill={titleColor}
        fontFamily="ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, monospace"
        style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + 18}
          y={y + 70 + i * 32}
          fontSize="14"
          fill={lineColor}
          fontFamily="var(--font-sans, Inter, system-ui, sans-serif)"
        >
          {line}
        </text>
      ))}
    </g>
  )
}

function LabelChip({
  x,
  y,
  text,
  tone,
}: {
  x: number
  y: number
  text: string
  tone: "muted" | "green"
}) {
  const fg = tone === "green" ? GREEN : MUTED
  // Render the label without a background — keeps the diagram quiet on cream.
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="11"
      fill={fg}
      fontFamily="ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, monospace"
      style={{ letterSpacing: "0.04em" }}
    >
      {text}
    </text>
  )
}
