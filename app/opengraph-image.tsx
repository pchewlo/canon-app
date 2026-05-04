import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#2A3A30",
          color: "#F2EBD3",
          fontFamily: "Inter, system-ui",
        }}
      >
        <div
          style={{
            fontFamily: "Iowan Old Style, Palatino, Georgia, serif",
            fontSize: 36,
            letterSpacing: 16,
            color: "#F2EBD3",
          }}
        >
          CANON
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            The agentic platform for player bonuses.
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.78,
              maxWidth: 880,
              lineHeight: 1.3,
            }}
          >
            Per-player AI agents. Real-time decisions. Built for regulated markets.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
