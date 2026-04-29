import Link from "next/link"
import { HeroShowcase } from "@/components/landing/HeroShowcase"
import { HowItWorksAnimated } from "@/components/landing/HowItWorksAnimated"
import { PlayerJourney } from "@/components/landing/PlayerJourney"

// Replace this with the booking link when ready.
const DEMO_URL = "#demo"

export const metadata = {
  title: "Canon — The agentic platform for player bonuses",
  description:
    "Per-player AI agents that decide who gets a bonus, when, and how much — in real time. Operators see an 80% lift in ROI on bonus spend.",
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-quest-ink">
      <LandingNav />
      <Hero />
      <Problem />
      <HowItWorks />
      <ProductPreview />
      <WhyNow />
      <Outcomes />
      <CTAFooter />
      <SiteFooter />
    </div>
  )
}

// ============================================================================
// Reusable bits
// ============================================================================

function Wordmark({ size = 14 }: { size?: number }) {
  return (
    <span
      className="text-quest-accent uppercase"
      style={{
        fontFamily: 'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
        fontSize: size,
        fontWeight: 400,
        letterSpacing: "0.26em",
        lineHeight: 1,
        paddingLeft: "0.26em",
      }}
    >
      Canon
    </span>
  )
}

function Heading({
  children,
  size = "lg",
  className = "",
  style,
}: {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  style?: React.CSSProperties
}) {
  const sizes = {
    sm: "clamp(22px, 2.4vw, 28px)",
    md: "clamp(28px, 3.2vw, 38px)",
    lg: "clamp(36px, 4.6vw, 56px)",
    xl: "clamp(44px, 6vw, 76px)",
  }
  const tracking = {
    sm: "-0.012em",
    md: "-0.018em",
    lg: "-0.022em",
    xl: "-0.028em",
  }
  return (
    <h2
      className={className}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: sizes[size],
        fontWeight: 600,
        lineHeight: 1.05,
        letterSpacing: tracking[size],
        ...style,
      }}
    >
      {children}
    </h2>
  )
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.22em] mb-5 ${
        dark ? "text-white/55" : "text-quest-ink-faint"
      }`}
    >
      {children}
    </p>
  )
}

// ============================================================================
// Top nav
// ============================================================================

function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="inline-flex items-center">
          <Wordmark size={14} />
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/app"
            className="text-[13px] text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            Sign in
          </Link>
          <Link
            href={DEMO_URL}
            className="inline-flex items-center rounded-md bg-quest-accent px-3 py-1.5 text-[13px] font-medium text-white hover:bg-quest-accent/90 transition-colors"
          >
            Request a demo
          </Link>
        </div>
      </div>
    </header>
  )
}

// ============================================================================
// Hero
// ============================================================================

function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>For iGaming operators</Eyebrow>
            <Heading size="xl">Stop wasting player bonuses.</Heading>
            <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-quest-ink-muted">
              The agentic platform for player bonuses. Per-player AI agents that
              learn. Operators see an{" "}
              <span className="text-quest-ink font-semibold">80% lift in ROI</span>{" "}
              on bonus spend.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={DEMO_URL}
                className="inline-flex items-center rounded-md bg-quest-accent px-5 py-2.5 text-[14px] font-medium text-white hover:bg-quest-accent/90 transition-colors"
              >
                Request a demo
              </Link>
              <Link
                href="/app"
                className="inline-flex items-center text-[14px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"
              >
                Explore the product →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Problem — personalised per-operator £100M breakdown
// ============================================================================

function Problem() {
  return (
    <section className="relative bg-[#1A2332] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow dark>The problem</Eyebrow>
            <Heading size="lg" className="text-white">
              Your current tools weren&apos;t built for an agentic world.
            </Heading>
            <p className="mt-6 text-[16px] leading-relaxed text-white/70">
              Operators waste{" "}
              <span className="text-white font-semibold">60%</span> of their bonus
              spend on the wrong players, at the wrong moments, in the wrong sizes —
              because cohort-based campaigns can&apos;t see individual elasticity,
              lifecycle, or risk.
            </p>
          </div>

          <div className="lg:col-span-7">
            <OperatorBreakdown />
          </div>
        </div>
      </div>
    </section>
  )
}

function OperatorBreakdown() {
  const waste = [
    { label: "Poorly executed campaigns", value: 22 },
    { label: "Already-loyal players", value: 14 },
    { label: "Bonus / abuse hunters", value: 12 },
    { label: "Untargeted welcome bonuses", value: 8 },
    { label: "Other ROI-negative activity", value: 4 },
  ]
  const maxBar = waste[0].value

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:p-8">
      <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
        If you&apos;re spending
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span
          className="text-white tabular-nums leading-none"
          style={{ fontFamily: "var(--font-sans)", fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          £100M
        </span>
        <span className="text-[14px] text-white/60">a year on player bonuses</span>
      </div>

      {/* Stacked split bar */}
      <div className="mt-7 flex h-12 rounded-md overflow-hidden">
        <div
          className="flex items-center justify-end pr-3.5 bg-quest-success text-white"
          style={{ width: "40%" }}
        >
          <span className="text-[12px] font-semibold tabular-nums">£40M</span>
        </div>
        <div
          className="flex items-center pl-3.5 text-white"
          style={{ width: "60%", background: "#7A2E2E" }}
        >
          <span className="text-[12px] font-semibold tabular-nums">£60M</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
        <span className="flex items-center gap-2 text-white/75">
          <span className="inline-block h-2 w-2 rounded-full bg-quest-success" />
          Working — reaching the right players
        </span>
        <span className="flex items-center gap-2 text-white/75">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "#A04A4A" }}
          />
          Wasted — ROI-negative spend
        </span>
      </div>

      {/* Breakdown of the waste */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55 mb-4">
          Where the £60M waste goes
        </div>
        <div className="space-y-3.5">
          {waste.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[13px] text-white/75">{row.label}</span>
                <span className="text-[13px] tabular-nums text-white font-medium">
                  £{row.value}M
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(row.value / maxBar) * 100}%`,
                    background: "#A04A4A",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// How it works (animated)
// ============================================================================

function HowItWorks() {
  return (
    <section className="bg-[#F3EFE6]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <Heading size="lg">
            You set the goal and the budget.<br />The agents do the rest.
          </Heading>
        </div>

        <div className="mt-14">
          <HowItWorksAnimated />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Product preview — full dashboard snapshot
// ============================================================================

function ProductPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow>Live in product</Eyebrow>
          <Heading size="lg">
            An army of agents,<br />optimising every player interaction.
          </Heading>
          <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted">
            What you see. What every player feels. The dashboard summarises millions
            of decisions; each player gets a journey shaped to their elasticity,
            lifecycle, and risk profile.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <DashboardSnapshot />
          </div>
          <div className="lg:col-span-5">
            <PlayerJourney />
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardSnapshot() {
  return (
    <div className="h-full rounded-xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(26,35,50,0.18)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-border bg-white px-5 py-2.5 shrink-0">
        <Wordmark size={13} />
        <span className="text-[11px] uppercase tracking-wide text-quest-ink-faint">
          Overview · Real-time
        </span>
      </div>

      <div className="flex-1 bg-white p-5 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <PreviewKPI label="Active agents" value="182,491" />
          <PreviewKPI
            label="Today's spend"
            value="£48,210"
            subtitle="of £62,000 budget"
            progress={78}
          />
          <PreviewKPI
            label="Retention lift"
            value="+14.3%"
            subtitle="vs. 4.2% control"
            accent
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold text-quest-ink">
              Performance · last 7 days
            </span>
            <span className="text-[11px] text-quest-ink-faint">
              vs. rules-based control
            </span>
          </div>
          <PerformanceChart />
        </div>
      </div>
    </div>
  )
}

function PreviewKPI({
  label,
  value,
  subtitle,
  progress,
  accent,
}: {
  label: string
  value: string
  subtitle?: string
  progress?: number
  accent?: boolean
}) {
  return (
    <div className="relative flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3.5 overflow-hidden">
      <span className="text-[10px] font-medium uppercase tracking-wide text-quest-ink-faint">
        {label}
      </span>
      <span
        className={`text-[24px] font-semibold tabular-nums leading-none ${
          accent ? "text-quest-success" : "text-quest-ink"
        }`}
      >
        {value}
      </span>
      {subtitle && <span className="text-[11px] text-quest-ink-faint">{subtitle}</span>}
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-quest-surface-muted">
          <div
            className="h-full bg-quest-accent"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}

function PerformanceChart() {
  const w = 560
  const h = 180
  const pad = 16
  const canon = [4.2, 5.8, 7.4, 8.6, 10.2, 12.1, 14.3]
  const control = [4.2, 4.0, 4.3, 4.1, 4.2, 4.4, 4.2]
  const max = 16
  const xs = canon.map((_, i) => pad + (i * (w - 2 * pad)) / (canon.length - 1))
  const ys = (vals: number[]) =>
    vals.map((v) => h - pad - (v / max) * (h - 2 * pad))
  const canonYs = ys(canon)
  const controlYs = ys(control)
  const path = (yArr: number[]) =>
    yArr.map((y, i) => `${i === 0 ? "M" : "L"} ${xs[i]},${y}`).join(" ")
  const area =
    `M ${xs[0]},${canonYs[0]} ` +
    canonYs
      .slice(1)
      .map((y, i) => `L ${xs[i + 1]},${y}`)
      .join(" ") +
    ` L ${xs[xs.length - 1]},${h - pad} L ${xs[0]},${h - pad} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={w - pad}
          y1={pad + f * (h - 2 * pad)}
          y2={pad + f * (h - 2 * pad)}
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="1"
        />
      ))}

      <path d={area} fill="#1A2332" fillOpacity="0.07" />
      <path
        d={path(canonYs)}
        fill="none"
        stroke="#1A2332"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={path(controlYs)}
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      <g transform={`translate(${pad}, ${pad - 4})`}>
        <circle cx="0" cy="0" r="3" fill="#1A2332" />
        <text x="8" y="3" fontSize="10" fill="#37352F">
          Canon
        </text>
        <circle cx="60" cy="0" r="3" fill="#9CA3AF" />
        <text x="68" y="3" fontSize="10" fill="#9CA3AF">
          Control
        </text>
      </g>

      {xs.map((x, i) => (
        <text key={i} x={x} y={h - 2} fontSize="9" textAnchor="middle" fill="#9B9A97">
          Day {i + 1}
        </text>
      ))}

      <text
        x={xs[xs.length - 1] - 4}
        y={canonYs[canonYs.length - 1] - 8}
        fontSize="11"
        fontWeight="500"
        textAnchor="end"
        fill="#1A2332"
      >
        +14.3%
      </text>
    </svg>
  )
}

// ============================================================================
// Why now
// ============================================================================

function WhyNow() {
  return (
    <section className="bg-[#F3EFE6]">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>Why now</Eyebrow>
            <Heading size="lg">
              Operators not running per-player agents are leaving lift on the table.
            </Heading>
            <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted">
              An agent decision was 60× more expensive in 2023. Today it costs less
              than a penny — and the operators deploying them now are taking the
              retention lift you&apos;re not.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-[34px] font-semibold tabular-nums leading-none text-quest-ink">
                  60×
                </div>
                <div className="mt-2 text-[13px] text-quest-ink-muted">
                  cheaper than 2023
                </div>
              </div>
              <div>
                <div className="text-[34px] font-semibold tabular-nums leading-none text-quest-ink">
                  &lt;£0.001
                </div>
                <div className="mt-2 text-[13px] text-quest-ink-muted">
                  per agent decision
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <InferenceCostChart />
          </div>
        </div>
      </div>
    </section>
  )
}

function InferenceCostChart() {
  const data = [
    { year: "2023", cost: 100 },
    { year: "2024", cost: 35 },
    { year: "2025", cost: 12 },
    { year: "2026", cost: 4 },
    { year: "2027", cost: 1.7 },
  ]
  const w = 520
  const h = 240
  const padX = 36
  const padY = 32
  const max = 100
  const xs = data.map((_, i) => padX + (i * (w - 2 * padX)) / (data.length - 1))
  const ys = data.map((d) => h - padY - (d.cost / max) * (h - 2 * padY))
  // Smooth curve through points using cubic Bézier with horizontal tangents
  // — control points sit halfway along the x-gap at each endpoint's y, which
  // gives the soft "ease" between data points without overshooting.
  let path = `M ${xs[0]},${ys[0]}`
  for (let i = 1; i < data.length; i++) {
    const prevX = xs[i - 1]
    const prevY = ys[i - 1]
    const currX = xs[i]
    const currY = ys[i]
    const cpDx = (currX - prevX) / 2
    path += ` C ${prevX + cpDx},${prevY} ${currX - cpDx},${currY} ${currX},${currY}`
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint mb-1">
        Cost per agent decision
      </div>
      <div className="text-[12px] text-quest-ink-muted mb-4">
        Indexed to 2023 = 100. Source: Anthropic & OpenAI public pricing.
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = padY + f * (h - 2 * padY)
          return (
            <g key={f}>
              <line
                x1={padX}
                x2={w - padX}
                y1={y}
                y2={y}
                stroke="rgba(0,0,0,0.06)"
              />
              <text
                x={padX - 6}
                y={y + 3}
                fontSize="10"
                textAnchor="end"
                fill="#9B9A97"
              >
                {Math.round(max - f * max)}
              </text>
            </g>
          )
        })}

        <path
          d={path}
          fill="none"
          stroke="#1A2332"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#1A2332" />
        ))}

        {xs.map((x, i) => (
          <text
            key={i}
            x={x}
            y={h - 8}
            fontSize="11"
            textAnchor="middle"
            fill="#5F5E5B"
          >
            {data[i].year}
          </text>
        ))}
      </svg>
    </div>
  )
}

// ============================================================================
// Outcomes
// ============================================================================

function Outcomes() {
  const stats = [
    { value: "45%", label: "Activation rate", sub: "of newly registered players" },
    { value: "52%", label: "One-month retention", sub: "vs. rules-based control" },
    { value: "£12.50", label: "Average revenue per user", sub: "across treated cohorts" },
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow>Outcomes</Eyebrow>
          <Heading size="lg">What operators see in production.</Heading>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-7"
            >
              <div className="text-[48px] font-semibold tabular-nums leading-none text-quest-ink">
                {s.value}
              </div>
              <div className="mt-4 text-[14px] font-semibold text-quest-ink">
                {s.label}
              </div>
              <div className="mt-1.5 text-[13px] text-quest-ink-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA Footer
// ============================================================================

function CTAFooter() {
  return (
    <section id="demo" className="relative overflow-hidden bg-[#1A2332] text-white">
      <div className="mx-auto max-w-3xl px-6 py-28 lg:py-32 text-center">
        <Heading size="lg" className="text-white">
          Ready to stop wasting bonuses?
        </Heading>
        <p className="mt-6 mx-auto max-w-xl text-[16px] leading-relaxed text-white/65">
          We&apos;re onboarding a small set of iGaming operators. Tell us what
          you want to lift — activation, retention, ARPU — and we&apos;ll show
          you Canon running on a sample of your players.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={DEMO_URL}
            className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-[14px] font-medium text-[#1A2332] hover:bg-white/90 transition-colors"
          >
            Request a demo
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center text-[14px] font-medium text-white/70 hover:text-white transition-colors"
          >
            Explore the product →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Site footer
// ============================================================================

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <Wordmark size={13} />
        <span className="text-[12px] text-quest-ink-faint">
          The agentic platform for player bonuses
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/app"
            className="text-[12px] text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            Sign in
          </Link>
          <Link
            href={DEMO_URL}
            className="text-[12px] text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            Request a demo
          </Link>
        </div>
      </div>
    </footer>
  )
}
