"use client"

// Hub-and-spoke integration flow. Six external systems sit around a
// central Canon node. Data packets stream from sources INTO Canon; then
// decision packets stream OUT to fulfilment sinks. Loops continuously.

import { motion } from "framer-motion"

type Node = {
  id: string
  label: string
  /** angle in degrees from 12 o'clock */
  angle: number
  /** if true, packets flow OUT from Canon to here (decisions); else IN */
  direction: "in" | "out"
}

const NODES: Node[] = [
  { id: "pam", label: "PAM", angle: 0, direction: "in" },
  { id: "cdp", label: "CDP", angle: 60, direction: "in" },
  { id: "kyc", label: "KYC", angle: 120, direction: "in" },
  { id: "comms", label: "Comms", angle: 180, direction: "out" },
  { id: "warehouse", label: "Warehouse", angle: 240, direction: "out" },
  { id: "payments", label: "Payments", angle: 300, direction: "in" },
]

export function IntegrationsFlowAnimation() {
  // Canvas: 360x360 visual field; node ring radius ≈ 145
  const VB = 360
  const C = VB / 2
  const RADIUS = 145

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="px-6 pt-6">
        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
          Live integration flow
        </div>
        <div className="mt-1 text-[15px] font-semibold text-quest-ink">
          Reading events. Writing decisions.
        </div>
      </div>

      <div className="mt-4 flex justify-center px-6">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="h-[300px] w-[300px]">
          {/* Spokes */}
          {NODES.map((n) => {
            const pos = polar(n.angle, RADIUS, C)
            return (
              <line
                key={`spoke-${n.id}`}
                x1={C}
                y1={C}
                x2={pos.x}
                y2={pos.y}
                stroke="rgba(26,35,50,0.10)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            )
          })}

          {/* Animated packets */}
          {NODES.map((n, i) => {
            const pos = polar(n.angle, RADIUS, C)
            const from = n.direction === "in" ? pos : { x: C, y: C }
            const to = n.direction === "in" ? { x: C, y: C } : pos
            const colour = n.direction === "in" ? "#1A2332" : "#448361"
            return (
              <motion.circle
                key={`packet-${n.id}`}
                r="3.5"
                fill={colour}
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.27,
                  ease: "easeInOut",
                }}
              />
            )
          })}

          {/* Centre Canon node */}
          <circle cx={C} cy={C} r="38" fill="#1A2332" />
          <text
            x={C}
            y={C + 4}
            fontSize="13"
            fontWeight="600"
            textAnchor="middle"
            fill="#F2EBD3"
            style={{
              fontFamily:
                'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
              letterSpacing: "0.18em",
            }}
          >
            CANON
          </text>

          {/* Outer nodes */}
          {NODES.map((n) => {
            const pos = polar(n.angle, RADIUS, C)
            const w = 78
            const h = 32
            return (
              <g key={`node-${n.id}`}>
                <rect
                  x={pos.x - w / 2}
                  y={pos.y - h / 2}
                  width={w}
                  height={h}
                  rx={6}
                  fill="white"
                  stroke="rgba(26,35,50,0.18)"
                  strokeWidth="1"
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  fill="#1A2332"
                >
                  {n.label}
                </text>
                <circle
                  cx={pos.x + w / 2 - 6}
                  cy={pos.y - h / 2 + 6}
                  r="2.5"
                  fill={n.direction === "in" ? "#1A2332" : "#448361"}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 border-t border-quest-ink/10 bg-quest-surface-muted px-6 py-3 text-[11px] text-quest-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-quest-accent" />
          Reads (events)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-quest-success" />
          Writes (decisions)
        </span>
      </div>
    </div>
  )
}

function polar(angleDeg: number, radius: number, centre: number) {
  // 0° = top of circle (12 o'clock); rotate clockwise
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: centre + radius * Math.cos(rad),
    y: centre + radius * Math.sin(rad),
  }
}
