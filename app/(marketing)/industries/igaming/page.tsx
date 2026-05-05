import Link from "next/link"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { LogoCloud } from "@/components/marketing/LogoCloud"
import { PageHero } from "@/components/marketing/PageHero"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionStatCards } from "@/components/marketing/sections"
import { IGamingFlowAnimation } from "@/components/marketing/animations/IGamingFlowAnimation"

export const metadata = {
  title: "iGaming — Canon",
  description:
    "Canon was built for iGaming first. Sportsbook, casino, live, and poker — per-player decisioning, RG-aware, regulator-ready, integrated with your existing PAM and CDP.",
}

export default function IGamingPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · iGaming"
        title="Canon was built for iGaming first."
        subtitle="Sportsbook, casino, live, poker — same engine, different per-vertical priors. Real-time decisions. RG-aware by default. Regulator-ready audit trail."
        media={<IGamingFlowAnimation />}
      />

      <SectionStatCards
        tone="paper"
        stats={[
          { value: "+14.3%", label: "Median retention lift", body: "vs. rules-based control" },
          { value: "<50ms", label: "Decision latency", body: "p95 end-to-end" },
          { value: "6+", label: "Major regulators supported", body: "UKGC · MGA · Spelinspektionen · AGCO · MGCB · DGA" },
        ]}
      />

      <SectionShell
        tone="cream"
        eyebrow="Sub-verticals"
        title="One engine. Vertical-specific priors."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Sportsbook",
              body: "Pre-match and in-play. Boost markets and free-bets sized to player price-sensitivity, with stake-escalation guardrails.",
            },
            {
              name: "Casino",
              body: "Slots and table. Free-spin and missions calibrated to per-player game preference and recent loss patterns.",
            },
            {
              name: "Live casino",
              body: "Higher-stake, higher-variance. Per-table-style elasticity priors with extra-tight RG checks.",
            },
            {
              name: "Poker",
              body: "Tournament tickets, rake-back missions, and reactivation aligned to skill-tier and play-frequency.",
            },
          ].map((v) => (
            <div
              key={v.name}
              className="rounded-xl border border-quest-ink/10 bg-white p-6"
            >
              <div className="text-[15px] font-semibold text-quest-ink">{v.name}</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-quest-ink-muted">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="Regulatory coverage"
        title="Jurisdictional rules ship as policy."
      >
        <CapabilityGrid
          columns={3}
          items={[
            {
              title: "UKGC (United Kingdom)",
              body: "RG checks, source-of-funds prompts, deposit-limit reminders. Stake limits enforced per market.",
            },
            {
              title: "MGA (Malta)",
              body: "Player protection thresholds, bonus-rule transparency, and disclosure obligations enforced per decision.",
            },
            {
              title: "Spelinspektionen (Sweden)",
              body: "Bonus-frequency restrictions and self-exclusion (Spelpaus) integration honoured atomically.",
            },
            {
              title: "AGCO (Ontario)",
              body: "Bonus-advertising restrictions and RG-feature mandate respected at decision time.",
            },
            {
              title: "MGCB (Michigan)",
              body: "Geo-fencing, age verification, and bonus-disclosure rules enforced as hard guardrails.",
            },
            {
              title: "DGA (Denmark)",
              body: "ROFUS self-exclusion, deposit limits, and time-out enforcement as hard guardrails.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Operator stack" title="Plugs into what you already run.">
        <LogoCloud
          caption="Canon connects to the major operator-stack categories"
          logos={[
            { label: "PAM platforms" },
            { label: "CDPs" },
            { label: "Game studios" },
            { label: "Payments" },
            { label: "KYC providers" },
            { label: "Data warehouses" },
          ]}
        />
        <p className="mt-8 text-center text-[13px] text-quest-ink-muted">
          Don&apos;t see your platform?{" "}
          <Link
            href="/product/integrations"
            className="text-quest-ink underline hover:text-quest-accent"
          >
            See the full integrations page
          </Link>
          .
        </p>
      </SectionShell>

      <SectionShell tone="white" maxWidth="4xl">
        <Quote
          quote="The thing iGaming-specific tooling rarely gets right is being honest about RG. Canon's first 30 minutes of demo was about guardrails. We were sold."
          author="Compliance Director"
          role="Tier-1 European operator"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Solutions" title="Common iGaming jobs Canon does.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/solutions/welcome-optimisation", label: "Welcome optimisation" },
            { href: "/solutions/retention", label: "Retention" },
            { href: "/solutions/reactivation", label: "Reactivation" },
            { href: "/solutions/vip-management", label: "VIP management" },
            { href: "/solutions/bonus-abuse-defence", label: "Bonus-abuse defence" },
            { href: "/product/safety", label: "Responsible-gaming enforcement" },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border border-quest-ink/10 bg-white p-5 hover:border-quest-accent/40 transition-colors text-[14px] font-semibold text-quest-ink"
            >
              {s.label} →
            </Link>
          ))}
        </div>
      </SectionShell>

      <CalloutBanner
        title="See Canon running on iGaming data."
        body="A 30-minute walkthrough on a representative sportsbook or casino dataset — yours or ours."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  )
}
