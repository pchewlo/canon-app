"use client"

// iGaming hero: Canon node feeds decisions into four iGaming surfaces
// (Sportsbook, Casino, Live, Poker). Each surface has a small live
// counter ticking. Decision packets stream out with sub-vertical-tinted
// colours.

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const SURFACES = [
  { key: "sport", label: "Sportsbook", colour: "#1A2332", baseRate: 7 },
  { key: "casino", label: "Casino", colour: "#448361", baseRate: 12 },
  { key: "live", label: "Live", colour: "#D9730D", baseRate: 4 },
  { key: "poker", label: "Poker", colour: "#7C3AED", baseRate: 2 },
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

  // Geometry
  const VB = 360
  const C = VB / 2
  const RADIUS = 130
  const positions = SURFACES.map((_, i) => {
    // Spread across the right semicircle: 0° = north, 180° = south.
    // Use angles 30°, 75°, 105°, 150° so they fan to the right of Canon.
    const angles = [-60, -20, 20, 60]
    const a = ((angles[i] + 90) * Math.PI) / 180
    return {
      x: C + RADIUS * Math.cos(a),
      y: C + RADIUS * Math.sin(a),
    }
  })

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        Canon → iGaming surfaces · live
      </div>
      <div className="mt-1 text-[15px] font-semibold text-quest-ink">
        One engine. Four sub-verticals.
      </div>

      <div className="mt-3 flex justify-center">
        <svg viewBox={`0 0 ${VB} ${VB}`} className="h-[280px] w-[280px]">
          {/* Spokes */}
          {SURFACES.map((s, i) => (
            <line
              key={`spoke-${s.key}`}
              x1={C - 30}
              y1={C}
              x2={positions[i].x}
              y2={positions[i].y}
              stroke="rgba(26,35,50,0.10)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          ))}

          {/* Animated decision packets */}
          {SURFACES.map((s, i) => (
            <motion.circle
              key={`packet-${s.key}`}
              r="3.5"
              fill={s.colour}
              initial={{ cx: C - 30, cy: C, opacity: 0 }}
              animate={{
                cx: [C - 30, positions[i].x],
                cy: [C, positions[i].y],
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

          {/* Canon node */}
          <rect
            x={C - 75}
            y={C - 22}
            width={90}
            height={44}
            rx={8}
            fill="#1A2332"
          />
          <text
            x={C - 30}
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
            const w = 110
            const h = 40
            return (
              <g key={`node-${s.key}`}>
                <rect
                  x={positions[i].x - w / 2}
                  y={positions[i].y - h / 2}
                  width={w}
                  height={h}
                  rx={6}
                  fill="white"
                  stroke="rgba(26,35,50,0.18)"
                  strokeWidth="1"
                />
                <circle
                  cx={positions[i].x - w / 2 + 8}
                  cy={positions[i].y}
                  r="3"
                  fill={s.colour}
                />
                <text
                  x={positions[i].x - w / 2 + 18}
                  y={positions[i].y - 2}
                  fontSize="11"
                  fontWeight="600"
                  fill="#1A2332"
                >
                  {s.label}
                </text>
                <text
                  x={positions[i].x - w / 2 + 18}
                  y={positions[i].y + 10}
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
