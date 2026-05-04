import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"

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
        media={<StrategyMockup />}
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
          media={<StrategyMockup />}
        />
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="What strategies do"
        title="From intent to policy in one screen."
      >
        <CapabilityGrid
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
      </SectionShell>

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
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Explore decisioning", href: "/product/decisioning" }}
      />
    </>
  )
}

function StrategyMockup() {
  const objectives = [
    { name: "Activation", cpep: "£0.30 – £1.50", picked: false },
    { name: "Retention", cpep: "£0.50 – £4.00", picked: true },
    { name: "Revenue", cpep: "£0.80 – £6.00", picked: false },
    { name: "Referral", cpep: "£0.20 – £1.20", picked: false },
  ]

  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        New strategy
      </div>
      <div className="mt-1 text-[16px] font-semibold text-quest-ink">
        What should Canon optimise for?
      </div>

      <div className="mt-5 space-y-2">
        {objectives.map((o) => (
          <div
            key={o.name}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
              o.picked
                ? "border-quest-accent bg-quest-accent-soft"
                : "border-border bg-white"
            }`}
          >
            <div>
              <div className="text-[13px] font-semibold text-quest-ink">
                {o.name}
              </div>
              <div className="text-[11px] text-quest-ink-faint">
                Typical CPEP {o.cpep}
              </div>
            </div>
            {o.picked && (
              <span className="rounded-full bg-quest-accent text-white text-[10px] px-2 py-0.5 uppercase tracking-wider">
                Selected
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-[12px]">
        <div className="rounded-lg border border-border p-3">
          <div className="text-quest-ink-faint">Daily budget</div>
          <div className="mt-1 text-quest-ink font-semibold tabular-nums">
            £62,000
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="text-quest-ink-faint">Holdout</div>
          <div className="mt-1 text-quest-ink font-semibold tabular-nums">
            10% rules
          </div>
        </div>
      </div>
    </div>
  )
}
