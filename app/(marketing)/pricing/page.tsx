import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { ComparisonTable } from "@/components/marketing/ComparisonTable"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { PageHero } from "@/components/marketing/PageHero"
import { PricingCalculator } from "@/components/marketing/PricingCalculator"
import { PricingCard } from "@/components/marketing/PricingCard"
import { SectionShell } from "@/components/marketing/SectionShell"

export const metadata = {
  title: "Pricing — Canon",
  description:
    "Pay for the lift Canon delivers. 20% of the incremental value Canon creates — you keep the other 80%. Transparent unit economics.",
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced on the lift we deliver."
        subtitle="Three components, no surprises. The bigger the retention uplift Canon creates, the more you pay — and the more you keep."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Run the numbers", href: "#calculator" }}
      />

      <SectionShell tone="white" maxWidth="6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PricingCard
            name="Pilot"
            summary="A controlled rollout on a slice of your players, with a holdout."
            price="From £25K"
            formula="60-day calibration · capped at £25K"
            includes={[
              "One objective (activation, retention, ARPU, or referral)",
              "Up to 50,000 treated players",
              "10% rules-based holdout, ITT-style measurement",
              "Weekly readouts with your CRM team",
              "Compliance review with your RG officer",
            ]}
            cta={{ label: "Start a pilot", href: "#demo" }}
          />
          <PricingCard
            name="Scale"
            summary="Production deployment across all players for a single product line."
            price="20%"
            formula="of the incremental value Canon creates — you keep 80%"
            includes={[
              "Unlimited objectives across the chosen product line",
              "Per-decision audit trail and exportable logs",
              "Holdout-based monthly attribution reporting",
              "Operator-controlled limits, exclusion lists, RG policies",
              "Dedicated CSM, SLA-backed",
            ]}
            cta={{ label: "Talk to sales", href: "#demo" }}
            featured
          />
          <PricingCard
            name="Enterprise"
            summary="Multi-product, multi-jurisdiction deployments with custom commercials."
            price="Bespoke"
            formula="Custom commercials on the 20% performance fee · annual commit"
            includes={[
              "Multi-brand / multi-jurisdiction deployment",
              "Private model fine-tuning on your data",
              "Single-tenant inference for data residency",
              "Dedicated solutions architect + 24/7 incident response",
              "Procurement-friendly MSA + DPA",
            ]}
            cta={{ label: "Contact sales", href: "/contact" }}
          />
        </div>

        <p className="mt-6 text-[12px] text-quest-ink-faint text-center">
          One fee, one number. Canon only earns when Canon creates lift.
        </p>
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="Calculator"
        title="See what Canon would cost on your bonus spend."
        description="Drag to your annual bonus spend. We assume Canon delivers a 50% lift on that spend after the calibration window — your real lift may be higher or lower."
        id="calculator"
      >
        <PricingCalculator />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="What's included"
        title="Every plan ships with the same compliance guardrails."
      >
        <ComparisonTable
          columns={[
            { name: "Pilot" },
            { name: "Scale", highlighted: true },
            { name: "Enterprise" },
          ]}
          rows={[
            {
              label: "Per-decision audit trail",
              cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
            },
            {
              label: "RG check enforcement",
              cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
            },
            {
              label: "Operator-controlled limits & exclusion lists",
              cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
            },
            {
              label: "Multi-brand / multi-jurisdiction",
              cells: [
                { kind: "no" },
                { kind: "partial", note: "single brand" },
                { kind: "yes" },
              ],
            },
            {
              label: "Single-tenant inference",
              cells: [{ kind: "no" }, { kind: "no" }, { kind: "yes" }],
            },
            {
              label: "Holdout-based attribution",
              cells: [{ kind: "yes" }, { kind: "yes" }, { kind: "yes" }],
            },
            {
              label: "Dedicated solutions architect",
              cells: [{ kind: "no" }, { kind: "partial", note: "shared CSM" }, { kind: "yes" }],
            },
            {
              label: "24/7 incident response",
              cells: [{ kind: "no" }, { kind: "partial", note: "business hours" }, { kind: "yes" }],
            },
            {
              label: "Custom DPA / data residency",
              cells: [{ kind: "no" }, { kind: "partial" }, { kind: "yes" }],
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="FAQ" title="Pricing questions, answered.">
        <FAQAccordion
          items={[
            {
              q: "How is retention uplift measured?",
              a: "We hold out 10% of treated players as a rules-based control. The performance fee is calculated against the difference in retained-spend between treated and control cohorts, measured monthly.",
            },
            {
              q: "What counts as 'incremental value'?",
              a: "The retained-spend difference between treated players and the rules-based holdout, measured monthly. We only charge against value Canon demonstrably created — not on bonuses you'd have paid anyway.",
            },
            {
              q: "Are pilots refundable if Canon doesn't lift retention?",
              a: "We don't refund the pilot fee, but we do publish results — including the holdout — and only roll into a Scale contract if you see lift. Most pilots show measurable lift within 30 days.",
            },
            {
              q: "Where is data stored?",
              a: "EU and UK by default, with US and APAC regions available on Enterprise. Single-tenant inference is available for operators that need data isolation by jurisdiction or contract.",
            },
            {
              q: "Do you sign a DPA?",
              a: "Yes. Standard DPA included on Scale and Enterprise. Custom DPA on Enterprise.",
            },
            {
              q: "How do you handle bonus-abuse hunters?",
              a: "Detection is bundled. Hunters get cooldown or no-action decisions, not bonuses. Bonuses Canon prevents don't show up in the lift number, so they don't show up in the fee.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Want a number for your operator?"
        body="Send us your bonus spend and target lift — we'll model the ACV and a pilot in 24 hours."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Contact sales", href: "/contact" }}
      />
    </>
  )
}
