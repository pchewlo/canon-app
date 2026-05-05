import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionHairlineSpecGrid } from "@/components/marketing/sections"
import { StatStrip } from "@/components/marketing/StatStrip"
import { SafetyAuditShot } from "@/components/marketing/animations/SafetyAuditShot"
import { SafetyRGAnimation } from "@/components/marketing/animations/SafetyRGAnimation"

export const metadata = {
  title: "Safety — Canon",
  description:
    "Responsible-gaming guardrails enforced per decision. Audit trails by default. Jurisdictional rules engine. Operator-controlled limits Canon optimises within — never around.",
}

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Safety"
        title="Built for regulated markets, not retrofitted for them."
        subtitle="Autonomous decisioning isn't deployable if it breaks compliance. Canon enforces RG and jurisdictional rules as part of every decision — and produces a regulator-ready audit trail by default."
        tone="navy"
        media={<SafetyRGAnimation />}
      />

      <SectionShell tone="white">
        <StatStrip
          stats={[
            { value: "100%", label: "Decisions logged" },
            { value: "<50ms", label: "RG check latency" },
            { value: "0", label: "Untracked actions" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream">
        <FeatureSplit
          eyebrow="Per-decision RG"
          title="Every decision passes through responsible-gaming checks."
          body={
            <p>
              Loss-chasing patterns. Stake escalation. Session duration. Deposit
              decline. Late-night first-time-deposit anomalies. Each signal is
              evaluated before a decision ships — at-risk players get bonuses
              held or blocked, never nudged harder.
            </p>
          }
          bullets={[
            "Loss-chasing detection (rolling-window stake / loss ratio)",
            "Stake escalation detection (per-session and rolling)",
            "Session duration limits with cool-down",
            "Deposit-decline pattern flagging",
            "Late-night and rapid-deposit anomaly detection",
            "Operator-set self-exclusion lists, honoured atomically",
          ]}
          media={<SafetyAuditShot />}
        />
      </SectionShell>

      <SectionHairlineSpecGrid
        tone="paper"
        eyebrow="What safety covers"
        title="Four pillars."
        items={[
          {
            title: "Per-decision RG checks",
            body: "Every agent decision passes through responsible-gaming guardrails. At-risk players get bonuses held or blocked, not nudged harder.",
          },
          {
            title: "Full audit trail",
            body: "Every decision is logged with the signals, model version, and policy that produced it. Regulators can trace exactly why a player got what — at a per-decision level.",
          },
          {
            title: "Jurisdictional rules engine",
            body: "Bonus rules, wagering requirements, age and identity checks, and spend caps adapt to each player's market. New rules ship as policy updates, not engineering work.",
          },
          {
            title: "Operator-controlled limits",
            body: "Set spending caps, frequency limits, cool-down windows, and exclusion lists. Canon optimises within them — never around them.",
          },
        ]}
      />

      <SectionShell tone="cream" eyebrow="FAQ" title="Safety, in detail.">
        <FAQAccordion
          items={[
            {
              q: "Which jurisdictions are supported out of the box?",
              a: "UKGC, MGA, Spelinspektionen (Sweden), AGCO (Ontario), MGCB (Michigan), and most major EU regulators. New jurisdictional rule packs ship as policy updates.",
            },
            {
              q: "Are RG checks model-driven or rule-driven?",
              a: "Both. Hard guardrails (self-exclusion, jurisdictional caps) are deterministic and run before the model. Soft guardrails (loss-chasing, escalation) combine signal-based heuristics with model scores. Hard always wins.",
            },
            {
              q: "Can a regulator audit Canon's decisions?",
              a: "Yes. Per-decision logs include the inputs, signals, policy version, score, and shipped action. Logs are exportable to your warehouse and retained per your DPA.",
            },
            {
              q: "What happens if a player is on a self-exclusion list?",
              a: "Decisions return 'no action' atomically. The decision is still logged with a self-exclusion flag for audit purposes.",
            },
            {
              q: "Does Canon make RG-specific suggestions to operators?",
              a: "Yes. The Safety dashboard surfaces players exhibiting risk-pattern clusters, with suggested operator interventions (cool-downs, deposit-limit prompts, RG-team escalation). Suggestions are flagged, not autonomous.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Want a compliance-team walkthrough?"
        body="We do RG-officer-led demos that focus on guardrails, audit, and jurisdictional rules — not retention lift."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "Read about decisioning", href: "/product/decisioning" }}
      />
    </>
  )
}
