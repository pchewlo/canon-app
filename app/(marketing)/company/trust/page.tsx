import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"

export const metadata = {
  title: "Trust — Canon",
  description:
    "Canon's responsible-gaming philosophy: hard guardrails, no nudges to at-risk players, regulator-grade audit. The principles behind every product decision.",
}

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Trust"
        title="The principles behind every Canon decision."
        subtitle="Autonomous decisioning is only deployable in regulated markets if the operator can vouch for it. This page is how we earn that vouching — and how we expect to be held to it."
      />

      <SectionShell tone="cream" eyebrow="Our position" title="At-risk players are never the lift target.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl">
          <p className="text-[16px] leading-relaxed text-quest-ink">
            Canon does not — and will not — optimise to extract more deposit
            from a player exhibiting at-risk behaviour. RG checks are hard
            constraints that override the model entirely. If the model and the
            guardrails disagree, the guardrails win.
          </p>
          <p className="text-[16px] leading-relaxed text-quest-ink-muted">
            We optimise the lift on healthy players. We surface at-risk players
            to your RG team. We don&apos;t pretend autonomous decisioning makes
            human compliance work obsolete — it amplifies it.
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="white" eyebrow="The five rules" title="What Canon will never do.">
        <ol className="space-y-5 max-w-3xl">
          {[
            {
              n: "01",
              title: "Never override a hard RG guardrail",
              body: "Self-exclusion, jurisdictional spend caps, age verification — these always win. Soft-guardrail signals can downgrade a decision; hard guardrails block it.",
            },
            {
              n: "02",
              title: "Never optimise on at-risk player segments",
              body: "Players exhibiting loss-chasing, escalation, or session-length risk patterns are excluded from lift optimisation. They get cool-downs, holds, or RG-team escalations — not bigger bonuses.",
            },
            {
              n: "03",
              title: "Never ship an unloggable decision",
              body: "Every decision Canon ships includes inputs, signals, policy version, and a replayable log. If it can't be logged, it doesn't ship.",
            },
            {
              n: "04",
              title: "Never trade compliance for lift",
              body: "When operator compliance teams override Canon, the override is honoured. Lift attribution adjusts. We don't fight the compliance team.",
            },
            {
              n: "05",
              title: "Never hide behind 'the model'",
              body: "Every shipped decision is a Canon decision. If the model produces the wrong outcome, we own it and we publish what changed.",
            },
          ].map((r) => (
            <li
              key={r.n}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 border-b border-border pb-5"
            >
              <div className="lg:col-span-2 text-[20px] font-semibold tabular-nums text-quest-accent">
                {r.n}
              </div>
              <div className="lg:col-span-10">
                <div className="text-[16px] font-semibold text-quest-ink">
                  {r.title}
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-quest-ink-muted">
                  {r.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell tone="cream" eyebrow="What we ask of operators" title="Trust is mutual.">
        <CapabilityGrid
          columns={2}
          items={[
            {
              title: "Tell us your RG escalation criteria",
              body: "Canon surfaces at-risk patterns. The operator's RG team decides what to do about them. We need your thresholds to escalate at the right moment.",
            },
            {
              title: "Don't disable holdouts",
              body: "Holdouts are the basis of measurement and of the performance fee. Disabling them removes the basis for paying us, and the basis for trusting our lift claims.",
            },
            {
              title: "Audit our decisions, regularly",
              body: "We publish per-decision logs. Sample them. Catch us if the model drifts. We'd rather you find a problem than a regulator does.",
            },
            {
              title: "Tell your regulator about us",
              body: "If you're being asked how autonomous decisioning fits your RG framework, we want to be in that conversation — not retro-fitted in afterwards.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Want a compliance-team walkthrough?"
        body="A demo focused on guardrails, audit, and jurisdictional rules — not retention lift."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read the security page", href: "/company/security" }}
      />
    </>
  )
}
