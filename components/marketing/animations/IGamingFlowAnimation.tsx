"use client"

// iGaming hero: Canon centred, four sub-vertical surfaces in the four
// corners. Decision packets stream out to each surface in colour-coded
// pulses. Counters tick.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const SURFACES = [
  { key: "sport", label: "Sportsbook", colour: "#1A2332", baseRate: 7 },
  { key: "casino", label: "Casino", colour: "#448361", baseRate: 12 },
  { key: "live", label: "Live", colour: "#D9730D", baseRate: 4 },
  { key: "poker", label: "Poker", colour: "#7C3AED", baseRate: 2 },
]

// Geometry — fixed positions relative to a 360x360 viewBox so spacing
// is deterministic and never overlaps.
const VB = 360
const C = VB / 2
const NODE_W = 120
const NODE_H = 38
const POSITIONS = [
  { x: C + 95, y: C - 90 },   // Sportsbook · NE
  { x: C + 95, y: C + 90 },   // Casino · SE
  { x: C - 95, y: C + 90 },   // Live · SW
  { x: C - 95, y: C - 90 },   // Poker · NW
]

export function IGamingFlowAnimation() {
  const [counts, setCounts] = useState(SURFACES.map((s) => s.baseRate * 1000))

  useEffect(() => {
    const id = setInterval(() => {
      setCounts((prev) =>
        prev.map((v, i) => v + Math.round(SURFACES[i].baseRate + Math.random() * 4)),
      )
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Canon → iGaming surfaces · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        One engine. Four sub-verticals.
      </div>

      <div className="mt-2 flex justify-center">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="h-[300px] w-[300px]">
          {/* Spokes */}
          {SURFACES.map((s, i) => (
            <line
              key={`spoke-${s.key}`}
              x1={C}
              y1={C}
              x2={POSITIONS[i].x}
              y2={POSITIONS[i].y}
              stroke="rgba(26,35,50,0.10)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          ))}

          {/* Animated decision packets */}
          {SURFACES.map((s, i) => (
            <motion.circle
              key={`packet-${s.key}`}
              r="4"
              fill={s.colour}
              initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{
                cx: [C, POSITIONS[i].x],
                cy: [C, POSITIONS[i].y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.32,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Canon node — centred */}
          <rect
            x={C - 50}
            y={C - 22}
            width={100}
            height={44}
            rx={8}
            fill="#1A2332"
          />
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

          {/* Surface nodes */}
          {SURFACES.map((s, i) => {
            const x = POSITIONS[i].x
            const y = POSITIONS[i].y
            return (
              <g key={`node-${s.key}`}>
                <rect
                  x={x - NODE_W / 2}
                  y={y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill="white"
                  stroke="rgba(26,35,50,0.18)"
                  strokeWidth="1"
                />
                <circle
                  cx={x - NODE_W / 2 + 10}
                  cy={y}
                  r="3"
                  fill={s.colour}
                />
                <text
                  x={x - NODE_W / 2 + 20}
                  y={y - 2}
                  fontSize="11"
                  fontWeight="600"
                  fill="#1A2332"
                >
                  {s.label}
                </text>
                <text
                  x={x - NODE_W / 2 + 20}
                  y={y + 10}
                  fontSize="9"
                  fill="#5F5E5B"
                >
                  {counts[i].toLocaleString("en-GB")} dec/d
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-quest-ink-faint">
        Per-vertical priors · same engine
      </div>
    </div>
  )
}
