import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { RoadmapSection } from "@/components/marketing/RoadmapSection"
import { SectionShell } from "@/components/marketing/SectionShell"
import { WaitlistForm } from "@/components/marketing/WaitlistForm"

export const metadata = {
  title: "Prediction markets — Canon",
  description:
    "Prediction markets share iGaming's player-engagement DNA — and the same structural waste in incentive spend. Canon is building a prediction-markets variant of its decisioning engine.",
}

export default function PredictionMarketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries · Prediction markets"
        title="Prediction markets are sportsbook with cleaner attribution."
        subtitle="The engagement problem is the same: per-trader incentives, real-time signals, regulatory pressure. Canon is building the prediction-markets variant alongside crypto trading."
      />

      <SectionShell tone="white" maxWidth="3xl" padded={false}>
        <div className="rounded-2xl border border-quest-ink/15 bg-quest-warning-soft/40 px-6 py-5 text-center">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-warning">
            Early access · Q1 2027 target
          </div>
          <p className="mt-2 text-[14px] text-quest-ink">
            Tracking the regulatory window. Currently engaged with:{" "}
            <strong>0 prediction markets in production</strong>. Get on the list
            to talk before pilots open.
          </p>
          <div className="mt-5 flex justify-center">
            <WaitlistForm topic="Canon for prediction markets" />
          </div>
        </div>
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="Why prediction markets"
        title="Where iGaming's playbook compounds."
      >
        <CapabilityGrid
          items={[
            {
              title: "Per-trader engagement matters",
              body: "Prediction markets monetise depth and breadth of trading. Per-trader incentives — boosted markets, fee discounts, free first trades — are core.",
            },
            {
              title: "Signal density is high",
              body: "Every trade, every market visit, every cancelled order is a signal. The decisioning surface is denser than iGaming's.",
            },
            {
              title: "Risk and integrity overlap",
              body: "Information leakage, market-manipulation patterns, and bonus-cycling overlap with iGaming's bonus-abuse and RG telemetry.",
            },
            {
              title: "Regulation is forming",
              body: "US, UK, and EU frameworks are crystallising. Operators that ship compliance-by-decisioning early have an advantage.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="Roadmap" title="What we're building first.">
        <div className="max-w-2xl">
          <RoadmapSection
            items={[
              {
                quarter: "Q1 2027",
                title: "Architecture extension from crypto-trading variant",
                status: "next",
              },
              {
                quarter: "Q2 2027",
                title: "Closed pilots with two prediction markets",
                status: "later",
              },
              {
                quarter: "Q3 2027",
                title: "Public beta on a single prediction-market surface",
                status: "later",
              },
            ]}
          />
        </div>
      </SectionShell>

      <CalloutBanner
        title="Building a prediction market?"
        body="Talk to us early. Pilots open Q2 2027 — design-partner conversations starting now."
        primaryCta={{ label: "Contact the team", href: "/contact" }}
        secondaryCta={{ label: "How Canon works in iGaming", href: "/industries/igaming" }}
      />
    </>
  )
}
