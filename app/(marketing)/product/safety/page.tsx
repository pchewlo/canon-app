import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { StatStrip } from "@/components/marketing/StatStrip"

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
          media={<RGTracePreview />}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="What safety covers" title="Four pillars.">
        <CapabilityGrid
          columns={2}
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
      </SectionShell>

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
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read our trust page", href: "/company/trust" }}
      />
    </>
  )
}

function RGTracePreview() {
  const checks = [
    { label: "Self-exclusion list", status: "pass" },
    { label: "Jurisdictional spend cap", status: "pass" },
    { label: "Loss-chasing window", status: "fail", note: "ratio 0.84 > 0.6" },
    { label: "Stake escalation", status: "warn", note: "2.3× baseline" },
    { label: "Session duration", status: "pass" },
  ]
  return (
    <div className="rounded-2xl border border-quest-ink/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(26,35,50,0.18)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
        RG check trace · player #P-91823
      </div>
      <div className="mt-1 text-[16px] font-semibold text-quest-ink">
        Decision: <span className="text-quest-danger">Bonus held</span>
      </div>

      <ul className="mt-5 space-y-2">
        {checks.map((c) => (
          <li
            key={c.label}
            className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-[13px]"
          >
            <span className="text-quest-ink">{c.label}</span>
            <span className="flex items-center gap-2">
              {c.note && (
                <span className="text-[11px] text-quest-ink-muted">{c.note}</span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                  c.status === "pass"
                    ? "bg-quest-success-soft text-quest-success"
                    : c.status === "warn"
                      ? "bg-quest-warning-soft text-quest-warning"
                      : "bg-quest-danger-soft text-quest-danger"
                }`}
              >
                {c.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
