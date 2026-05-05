import Link from "next/link"
import type { ReactNode } from "react"
import { DashboardSnapshot } from "@/components/landing/DashboardSnapshot"
import { DemoLink } from "@/components/landing/DemoLink"
import { HeroShowcase } from "@/components/landing/HeroShowcase"
import { HowItWorksAnimated } from "@/components/landing/HowItWorksAnimated"
import { OutcomesPanel } from "@/components/landing/OutcomesPanel"
import { PlayerJourney } from "@/components/landing/PlayerJourney"

export const metadata = {
  title: "Canon — The agentic platform for player bonuses",
  description:
    "Per-player AI agents that decide who gets a bonus, when, and how much — in real time. Operators see an 80% lift in ROI on bonus spend.",
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <ProductPreview />
      <WhyNow />
      <Outcomes />
      <Compliance />
      <CTAFooter />
    </>
  )
}

// ============================================================================
// Local typography helpers — HANDOFF spec, scoped to this page so other pages
// keep using the existing Eyebrow/Heading components until Phase 2.
// ============================================================================

function SpecEyebrow({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${
        dark ? "" : "text-quest-ink-faint"
      } ${className}`.trim()}
      style={dark ? { color: "rgba(243, 239, 230, 0.55)" } : undefined}
    >
      {children}
    </div>
  )
}

function SpecH2({
  children,
  dark = false,
  size = "md",
  className = "",
}: {
  children: ReactNode
  dark?: boolean
  size?: "md" | "lg"
  className?: string
}) {
  const fontSize = size === "lg" ? "40px" : "32px"
  const maxW = size === "lg" ? "22ch" : "26ch"
  return (
    <h2
      className={`text-balance font-semibold leading-[1.18] tracking-[-0.018em] ${
        dark ? "text-canon-cream" : "text-canon-ink"
      } ${className}`.trim()}
      style={{ fontSize, maxWidth: maxW }}
    >
      {children}
    </h2>
  )
}

// ============================================================================
// Hero — Paper. Layout unchanged. Hero scale ignored by HANDOFF spec.
// ============================================================================

function Hero() {
  return (
    <section className="overflow-hidden bg-canon-paper">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SpecEyebrow className="mb-5">For iGaming operators</SpecEyebrow>
            <h1
              className="text-balance font-semibold leading-[1.05] tracking-[-0.028em] text-canon-ink"
              style={{ fontSize: "clamp(44px, 6vw, 76px)" }}
            >
              Stop wasting player bonuses.
            </h1>
            <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-quest-ink-muted">
              The agentic platform for player bonuses. Per-player AI agents that
              learn. Operators see an{" "}
              <span className="text-quest-ink font-semibold">80% lift in ROI</span>{" "}
              on bonus spend.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <DemoLink className="inline-flex items-center rounded-[4px] bg-canon-navy px-5 py-2.5 text-[14px] font-medium text-white hover:bg-canon-navy/90 transition-colors">
                Book a call
              </DemoLink>
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
// Problem — Navy. Page's single navy slab. Chart kept verbatim.
// ============================================================================

function Problem() {
  return (
    <section className="relative bg-canon-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SpecEyebrow dark className="mb-5">The problem</SpecEyebrow>
            <SpecH2 dark size="lg">
              Your current tools weren&apos;t built for an agentic world.
            </SpecH2>
            <p className="mt-6 text-[16px] leading-relaxed text-white/70 max-w-[42ch]">
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
  // Numbers expressed in £K so the breakdown sums to £600K (60% of £1M).
  const waste = [
    { label: "Poorly executed campaigns", value: 220 },
    { label: "Already-loyal players", value: 140 },
    { label: "Bonus / abuse hunters", value: 120 },
    { label: "Untargeted welcome bonuses", value: 80 },
    { label: "Other ROI-negative activity", value: 40 },
  ]
  const maxBar = waste[0].value

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:p-8">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
        If you&apos;re spending
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span
          className="text-white tabular-nums leading-none"
          style={{ fontFamily: "var(--font-sans)", fontSize: 56, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          £1M
        </span>
        <span className="text-[14px] text-white/60">a year on player bonuses</span>
      </div>

      <div className="mt-7 flex h-12 rounded-md overflow-hidden">
        <div
          className="flex items-center justify-end pr-3.5 bg-quest-success text-white"
          style={{ width: "40%" }}
        >
          <span className="text-[12px] font-semibold tabular-nums">£400K</span>
        </div>
        <div
          className="flex items-center pl-3.5 text-white"
          style={{ width: "60%", background: "#7A2E2E" }}
        >
          <span className="text-[12px] font-semibold tabular-nums">£600K</span>
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

      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 mb-4">
          Where the £600K waste goes
        </div>
        <div className="space-y-3.5">
          {waste.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-[13px] text-white/75">{row.label}</span>
                <span className="text-[13px] tabular-nums text-white font-medium">
                  £{row.value}K
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
// How it works — Cream. Animation kept.
// ============================================================================

function HowItWorks() {
  return (
    <section className="bg-canon-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-4xl">
          <SpecEyebrow className="mb-5">How it works</SpecEyebrow>
          <SpecH2 size="lg">
            <span className="whitespace-nowrap">You set the goal and the budget.</span>
            <br />
            <span className="whitespace-nowrap">The agents do the rest.</span>
          </SpecH2>
        </div>

        <div className="mt-14">
          <HowItWorksAnimated />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Product preview — Paper. Animations kept.
// ============================================================================

function ProductPreview() {
  return (
    <section className="bg-canon-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <SpecEyebrow className="mb-5">Live in product</SpecEyebrow>
          <SpecH2 size="lg">
            An army of agents,<br />optimising every player interaction.
          </SpecH2>
          <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted max-w-[42ch]">
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

// ============================================================================
// Why now — Cream. Chart kept verbatim.
// ============================================================================

function WhyNow() {
  return (
    <section className="bg-canon-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <SpecEyebrow className="mb-5">Why now</SpecEyebrow>
            <SpecH2 size="lg">
              Operators not running per-player agents are leaving lift on the table.
            </SpecH2>
            <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted max-w-[42ch]">
              An agent decision was 60× more expensive in 2023. Today it costs less
              than a penny — and the operators deploying them now are taking the
              retention lift you&apos;re not.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-[34px] font-semibold tabular-nums leading-none text-canon-green">
                  60×
                </div>
                <div className="mt-2 text-[13px] text-quest-ink-muted">
                  cheaper than 2023
                </div>
              </div>
              <div>
                <div className="text-[34px] font-semibold tabular-nums leading-none text-canon-green">
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
    <div className="rounded-[4px] border border-canon-line-soft bg-canon-paper p-6">
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint mb-1">
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
              <line x1={padX} x2={w - padX} y1={y} y2={y} stroke="rgba(0,0,0,0.06)" />
              <text x={padX - 6} y={y + 3} fontSize="10" textAnchor="end" fill="#9B9A97">
                {Math.round(max - f * max)}
              </text>
            </g>
          )
        })}

        <path d={path} fill="none" stroke="#1A2332" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#1A2332" />
        ))}

        {xs.map((x, i) => (
          <text key={i} x={x} y={h - 8} fontSize="11" textAnchor="middle" fill="#5F5E5B">
            {data[i].year}
          </text>
        ))}
      </svg>
    </div>
  )
}

// ============================================================================
// Outcomes — Paper. Animation kept.
// ============================================================================

function Outcomes() {
  return (
    <section className="bg-canon-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <SpecEyebrow className="mb-5">Outcomes</SpecEyebrow>
          <SpecH2 size="lg">What operators see in production.</SpecH2>
          <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted max-w-[42ch]">
            Across treated cohorts vs. a rules-based control group. Lifts hold
            after the calibration window and compound over the player lifetime.
          </p>
        </div>

        <div className="mt-12">
          <OutcomesPanel />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Compliance — Variant 3B (hairline grid + green numerals) for the four
// pillars. The body paragraph and stat strip ride above the grid as a header.
// ============================================================================

function Compliance() {
  const pillars = [
    {
      title: "Per-decision RG checks",
      body:
        "Every agent decision passes through responsible-gaming guardrails — loss-chasing, stake escalation, session duration, deposit decline. At-risk players get bonuses held or blocked, not nudged harder.",
    },
    {
      title: "Full audit trail",
      body:
        "Every decision is logged with the signals, model version, and policy that produced it. Regulators can trace exactly why a player got what — at a per-decision level.",
    },
    {
      title: "Jurisdictional rules engine",
      body:
        "Bonus rules, wagering requirements, age and identity checks, and spend caps adapt to each player's market. New rules ship as policy updates, not engineering work.",
    },
    {
      title: "Operator-controlled limits",
      body:
        "Set spending caps, frequency limits, cool-down windows, and exclusion lists. Canon optimises within them — never around them.",
    },
  ]

  return (
    <section className="relative bg-canon-cream">
      {/* Hairline grid background (HANDOFF B01 / part of Variant 3B) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,53,47,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,53,47,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-6 py-24 lg:py-32">
        {/* Header — body + stats preserved above the spec grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <SpecEyebrow className="mb-5">Safety &amp; compliance</SpecEyebrow>
            <SpecH2 size="lg">
              Built for regulated markets, not retrofitted for them.
            </SpecH2>
            <p className="mt-6 text-[16px] leading-relaxed text-quest-ink-muted max-w-[42ch]">
              Autonomous decisioning isn&apos;t deployable if it breaks
              compliance. Canon enforces responsible-gaming and jurisdictional
              rules as part of every decision — and produces a regulator-ready
              audit trail by default.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-4">
              <ComplianceStat value="100%" label="Decisions logged" />
              <ComplianceStat value="<50ms" label="RG check latency" />
              <ComplianceStat value="0" label="Untracked actions" />
            </div>
          </div>
        </div>

        {/* Spec grid — four pillars, HANDOFF Variant 3B */}
        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {pillars.map((p, i) => (
            <div key={p.title}>
              <div className="mb-1.5 flex items-baseline gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-canon-green tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] font-semibold tracking-[-0.005em] text-canon-ink">
                  {p.title}
                </span>
              </div>
              <p className="m-0 pl-[26px] text-[13px] leading-[1.55] text-quest-ink-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComplianceStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[24px] font-semibold tabular-nums leading-none text-canon-green">
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-quest-ink-faint">
        {label}
      </div>
    </div>
  )
}

// ============================================================================
// CTA Footer — Variant 7C-style green slab with brackets. The form sits where
// the plan card would sit; centred layout preserved otherwise.
// ============================================================================

function CTAFooter() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-canon-green text-white scroll-mt-14"
    >
      <Bracket position="tl" />
      <Bracket position="tr" />
      <Bracket position="bl" />
      <Bracket position="br" />

      <div className="relative z-[1] mx-auto max-w-3xl px-6 py-28 lg:py-32 text-center">
        <h2
          className="text-balance font-semibold leading-[1.18] tracking-[-0.018em] text-canon-cream mx-auto"
          style={{ fontSize: "40px", maxWidth: "22ch" }}
        >
          Ready to stop wasting bonuses?
        </h2>
        <p
          className="mt-6 mx-auto text-[16px] leading-relaxed max-w-xl"
          style={{ color: "rgba(243, 239, 230, 0.7)" }}
        >
          We&apos;re onboarding a small set of iGaming operators. Tell us what
          you want to lift — activation, retention, ARPU — and we&apos;ll show
          you Canon running on a sample of your players.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-call"
            className="inline-flex items-center rounded-[4px] bg-canon-cream px-5 py-2.5 text-[14px] font-semibold text-canon-ink transition-colors hover:bg-canon-cream/90"
          >
            Book a call
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center text-[14px] font-medium hover:text-white transition-colors"
            style={{ color: "rgba(243, 239, 230, 0.7)" }}
          >
            Explore the product →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Bracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop = position[0] === "t"
  const isLeft = position[1] === "l"
  const colour = "rgba(243,239,230,0.4)"
  return (
    <span
      aria-hidden="true"
      className="absolute h-6 w-6"
      style={{
        top: isTop ? 32 : undefined,
        bottom: isTop ? undefined : 32,
        left: isLeft ? 32 : undefined,
        right: isLeft ? undefined : 32,
        borderTop: isTop ? `1px solid ${colour}` : undefined,
        borderBottom: isTop ? undefined : `1px solid ${colour}`,
        borderLeft: isLeft ? `1px solid ${colour}` : undefined,
        borderRight: isLeft ? undefined : `1px solid ${colour}`,
      }}
    />
  )
}
