import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { StatStrip } from "@/components/marketing/StatStrip"
import { OutcomesPanel } from "@/components/landing/OutcomesPanel"

export const metadata = {
  title: "Insights — Canon",
  description:
    "Holdout-based attribution, cohort comparisons, and per-strategy lift reporting — wired straight to your warehouse. Measure what Canon actually moved.",
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Insights"
        title="Measure what Canon actually moved."
        subtitle="Every strategy ships with a 10% rules-based holdout. Every decision is logged with the signals that produced it. Insights stitches the two together so you can see lift, not just activity."
      />

      <SectionShell tone="white">
        <StatStrip
          stats={[
            { value: "100%", label: "Decisions logged", hint: "with signal trace" },
            { value: "10%", label: "Holdout, by default", hint: "rules-based control" },
            { value: "Daily", label: "Lift reporting", hint: "exported to warehouse" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream">
        <FeatureSplit
          eyebrow="Lift, not activity"
          title="Stop reporting on what you sent. Start reporting on what worked."
          body={
            <p>
              Most CRM dashboards report what you fired off — opens, clicks,
              redemptions. Canon reports what you actually moved — incremental
              retention, incremental revenue, incremental activation — against
              a holdout you can defend in a board meeting.
            </p>
          }
          bullets={[
            "Always-on holdout, ITT-style attribution",
            "Per-strategy and per-segment lift reports",
            "Confidence intervals on every reported number",
            "Exportable to BigQuery, Snowflake, Redshift, Postgres",
          ]}
          media={<OutcomesPanel />}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="What insights does"
        title="From per-decision logs to board-ready reports."
      >
        <CapabilityGrid
          items={[
            {
              title: "Holdout attribution",
              body: "Treated and control are matched on lifecycle, market, and risk. Lift is reported as the difference, with CIs.",
            },
            {
              title: "Cohort drilldown",
              body: "Slice lift by lifecycle stage, market, channel, vertical, or any custom dimension you ship from your CDP.",
            },
            {
              title: "Strategy comparison",
              body: "See which strategies produced lift and which didn't. Kill the losers.",
            },
            {
              title: "Signal-level reporting",
              body: "Which signals are predictive of which actions. Lets you spot data-quality issues upstream.",
            },
            {
              title: "Warehouse export",
              body: "Daily exports to BigQuery, Snowflake, Redshift, or Postgres. Operators query Canon data in their own BI stack.",
            },
            {
              title: "Audit-grade logs",
              body: "Per-decision logs include policy version, signals consumed, score, alternatives ranked, and shipped action — usable by regulators.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="FAQ" title="Insights, in detail.">
        <FAQAccordion
          items={[
            {
              q: "How do you handle short-window measurement noise?",
              a: "We report confidence intervals on every lift number. Reports under a minimum statistical power threshold are flagged rather than published as point estimates.",
            },
            {
              q: "Can I disable the holdout?",
              a: "Not on Scale. The holdout is the basis of your performance fee — without it we can't measure lift, and you can't audit ours. On Enterprise we offer alternative measurement designs (e.g. switchback) when a holdout isn't viable.",
            },
            {
              q: "Where does the data go?",
              a: "Daily exports to your warehouse via SFTP, S3, or direct connector. Per-decision logs available on request for audit.",
            },
            {
              q: "Can compliance pull a per-decision log for a specific player?",
              a: "Yes, in real time from the operator dashboard. Every decision is replayable from its original inputs.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Want to see the lift on your last quarter?"
        body="We can replay your historical event stream against a Canon policy and report counterfactual lift — no integration needed."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read about decisioning", href: "/product/decisioning" }}
      />
    </>
  )
}
