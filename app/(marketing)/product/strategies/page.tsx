import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionHairlineSpecGrid } from "@/components/marketing/sections"
import { StrategyBuilderAnimation } from "@/components/marketing/animations/StrategyBuilderAnimation"
import { StrategyPolicyShot } from "@/components/marketing/animations/StrategyPolicyShot"

export const metadata = {
  title: "Strategies — Canon",
  description:
    "Operators set the goal, the budget, and the guardrails. Canon's strategies translate intent into per-decision policy — without writing rules.",
}

export default function StrategiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Strategies"
        title="Set the goal. Set the budget. Canon does the rest."
        subtitle="A strategy is your declaration of intent: the metric to improve, the budget to spend, the guardrails to respect. Canon turns it into per-decision policy your agents follow."
        media={<StrategyBuilderAnimation />}
      />

      <SectionShell tone="white" maxWidth="6xl">
        <FeatureSplit
          eyebrow="One concept, four levers"
          title="A strategy is what every agent decision is judged against."
          body={
            <p>
              Strategies are how operators express the world they want — without
              ever writing a campaign condition. The CRM team picks the metric.
              The finance team sets the budget. The compliance team sets the
              guardrails. Canon finds the policy.
            </p>
          }
          bullets={[
            "Objective: activation, retention, ARPU, referral — or AI-optimised mix",
            "Budget: daily / weekly cap, allocated automatically across players",
            "Guardrails: spend limits, frequency, cool-downs, exclusion lists",
            "Holdout: 10% rules-based control, by default",
          ]}
          media={<StrategyPolicyShot />}
        />
      </SectionShell>

      <SectionHairlineSpecGrid
        eyebrow="What strategies do"
        title="From intent to policy in one screen."
        items={[
          {
            title: "Pick a metric",
            body: "Activation, retention, ARPU, referral, or AI-optimised. Each metric ships with a default control group and a measurement window.",
          },
          {
            title: "Allocate a budget",
            body: "Set the daily or weekly bonus budget. Canon spends within it, prioritising the players with the highest expected lift.",
          },
          {
            title: "Set the guardrails",
            body: "Spend caps, frequency limits, cool-down windows, and exclusion lists. Canon optimises within them — never around them.",
          },
          {
            title: "Templates by use case",
            body: "Welcome optimisation, lapsed-player reactivation, VIP retention, bonus-abuse defence — all available as starting templates.",
          },
          {
            title: "Multi-strategy operation",
            body: "Run multiple strategies side-by-side. Canon resolves overlaps and budget contention automatically.",
          },
          {
            title: "Always-on holdout",
            body: "Every strategy ships with a control group. Lift is measured monthly, exportable to your warehouse.",
          },
        ]}
      />

      <SectionShell tone="white" eyebrow="FAQ" title="Strategies, in detail.">
        <FAQAccordion
          items={[
            {
              q: "Can I run multiple strategies at once?",
              a: "Yes. Canon resolves contention automatically, prioritising the strategy with the higher expected per-player ROI when two compete.",
            },
            {
              q: "How is the budget allocated across players?",
              a: "Canon ranks players by expected lift, then spends top-down until the budget is exhausted. Low-elasticity players get cool-down or no-action decisions.",
            },
            {
              q: "Can the CRM team change strategies without engineering?",
              a: "Yes — strategies are config, not code. Changes take effect on the next decision and are logged in the audit trail.",
            },
            {
              q: "What happens if budget is hit mid-day?",
              a: "Decisions continue, but Canon switches to no-cost actions (missions, cooldowns, no action). The next budget window resumes paid decisions.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="See strategies on a live operator account."
        body="A 30-minute walkthrough on real data — yours or ours."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "Explore decisioning", href: "/product/decisioning" }}
      />
    </>
  )
}
