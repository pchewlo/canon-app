import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { RoadmapSection } from "@/components/marketing/RoadmapSection"
import { SectionShell } from "@/components/marketing/SectionShell"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"
import { CryptoTradingAnimation } from "@/components/marketing/animations/CryptoTradingAnimation"

export const metadata = {
  title: "Crypto trading — Canon",
  description:
    "Per-trader engagement is the next iGaming. Canon is building a crypto-trading version of its decisioning engine for exchanges and prediction markets.",
}

export default function CryptoTradingPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · Crypto trading"
        title="Per-trader agents are the next iGaming."
        subtitle="Canon's decisioning architecture works wherever bonuses meet attention. We're extending it to crypto exchanges and prediction markets — same engine, different interface."
        media={<CryptoTradingAnimation />}
      />

      <SectionShell tone="white" maxWidth="3xl" padded={false}>
        <div className="rounded-2xl border border-quest-ink/15 bg-quest-warning-soft/40 px-6 py-5 text-center">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-warning">
            Early access · Q4 2026 target
          </div>
          <p className="mt-2 text-[14px] text-quest-ink">
            We&apos;re piloting with a small set of design-partner exchanges.
            Currently engaged with: <strong>0 exchanges in production</strong>.
            Honest framing — get on the list to be among the first.
          </p>
          <div className="mt-5 flex justify-center">
            <WaitlistForm topic="Canon for crypto trading" />
          </div>
        </div>
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="Why crypto trading"
        title="The problem looks like iGaming, with a different ledger."
      >
        <CapabilityGrid
          items={[
            {
              title: "Trader bonuses are wasted",
              body: "Maker rebates, fee discounts, deposit-match programmes — paid uniformly across cohorts when they should be priced per-trader.",
            },
            {
              title: "Engagement decisions are weekly",
              body: "Exchanges run rebate campaigns the way iGaming ran retention five years ago — campaign-based, segment-by-segment.",
            },
            {
              title: "Risk is concentrated in a long tail",
              body: "Wash-traders, bonus-cyclers, and pre-listing sniper bots take a disproportionate slice of incentive spend.",
            },
            {
              title: "Regulatory window is opening",
              body: "MiCA in the EU and equivalent frameworks elsewhere are creating compliance regimes that look a lot like iGaming. Canon's RG architecture transfers.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="Roadmap" title="What we're building first.">
        <div className="max-w-2xl">
          <RoadmapSection
            items={[
              {
                quarter: "Q3 2026",
                title: "Closed design-partner pilots with two exchanges",
                status: "in-flight",
              },
              {
                quarter: "Q4 2026",
                title: "Public beta on a single exchange surface",
                status: "next",
              },
              {
                quarter: "Q1 2027",
                title: "Prediction-markets vertical added",
                status: "later",
              },
              {
                quarter: "Q2 2027",
                title: "General availability",
                status: "later",
              },
            ]}
          />
        </div>
      </SectionShell>

      <CalloutBanner
        title="Want to be a design partner?"
        body="If you run trader incentives at an exchange or prediction market, we'd like to talk. Closed pilots starting Q3."
        primaryCta={{ label: "Contact the team", href: "/contact" }}
        secondaryCta={{ label: "How Canon works in iGaming", href: "/industries/igaming" }}
      />
    </>
  )
}
