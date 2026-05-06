import {
  Antenna,
  Network,
  Shield,
  ShieldAlert,
  Repeat2,
  GitCompare,
} from "lucide-react"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionStatCards } from "@/components/marketing/sections"
import { AgentReasoningAnimation } from "@/components/marketing/animations/AgentReasoningAnimation"
import { DecisioningAnimation } from "@/components/marketing/animations/DecisioningAnimation"

export const metadata = {
  title: "Decisioning",
  description:
    "The decisioning engine at the core of Canon. Per-player AI agents that evaluate every player event in real time and choose what to do — bonus, mission, cooldown, hold, or no action.",
}

export default function DecisioningPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Decisioning"
        title="Every player. Every event. A real-time decision."
        subtitle="Canon's decisioning engine evaluates each player event against your goal and budget — and chooses what to do, in under 50 ms, for every player you have."
        media={<DecisioningAnimation />}
      />

      <SectionStatCards
        tone="paper"
        stats={[
          { value: "<50ms", label: "Decision latency", body: "p95 end-to-end" },
          { value: "millions", label: "Decisions per day", body: "across all operators" },
          { value: "+14.3%", label: "Retention lift", body: "vs. rules-based control, median" },
        ]}
      />

      <SectionShell tone="cream">
        <FeatureSplit
          eyebrow="The unit of work"
          title="Decide on every event, not every campaign."
          body={
            <p>
              Cohort-based CRM groups players into segments and ships campaigns
              once a week. Canon listens to every event a player produces — a
              login, a deposit, a session start, a loss streak — and makes a
              fresh decision against your goal. The unit of work is the event,
              not the campaign.
            </p>
          }
          bullets={[
            "Streams events from your PAM / CDP in real time",
            "Picks one of: bonus, mission, cashback, cooldown, hold, no action",
            "Sized per player from elasticity, lifecycle, and risk",
            "Logs every signal that produced the decision",
          ]}
          media={<AgentReasoningAnimation />}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="Capabilities"
        title="What the engine actually does."
      >
        <CapabilityGrid
          items={[
            {
              title: "Signal ingestion",
              icon: Antenna,
              body: "Reads from your PAM, CDP, payments, and KYC systems. New signals plug in without engineering work.",
            },
            {
              title: "Per-player models",
              icon: Network,
              body: "A policy network evaluates every event against your objective, with a per-player elasticity prior trained on the cohort.",
            },
            {
              title: "Hard guardrails",
              icon: Shield,
              body: "Spend caps, frequency limits, cool-down windows, and exclusion lists are enforced before the model is consulted.",
            },
            {
              title: "Soft guardrails (RG)",
              icon: ShieldAlert,
              body: "Loss-chasing, stake escalation, session duration, and deposit-decline checks can downgrade or block decisions.",
            },
            {
              title: "Replay & debug",
              icon: Repeat2,
              body: "Every decision is replayable from its inputs. Operators can re-run what-if scenarios on yesterday's traffic.",
            },
            {
              title: "Holdout-based attribution",
              icon: GitCompare,
              body: "10% rules-based holdout by default. Lift is measured monthly, exportable to your warehouse.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" maxWidth="4xl">
        <Quote
          quote="The thing that surprised us was the speed of decisions. Our old setup ran reactivation campaigns weekly. Canon was running them per session — and we could see the lift inside a fortnight."
          author="Head of CRM"
          role="Tier-1 European sportsbook"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="FAQ" title="Decisioning, in detail.">
        <FAQAccordion
          items={[
            {
              q: "What latency can the engine guarantee?",
              a: "p50 around 18 ms, p95 under 50 ms, end-to-end including RG checks. Decisions that exceed the latency budget fall back to a deterministic safe default.",
            },
            {
              q: "How long does it take to start showing lift?",
              a: "Lift typically appears within 14–30 days. The first ~2 weeks are calibration — the engine builds per-player elasticity priors from your historical event stream.",
            },
            {
              q: "Can we override the engine for specific players or moments?",
              a: "Yes. Operator-controlled limits and exclusion lists run before the engine. You can also pin policies for VIPs or specific markets.",
            },
            {
              q: "Where is data processed?",
              a: "EU/UK by default, US and APAC on Enterprise. Single-tenant inference is available for Enterprise customers that need data isolation.",
            },
            {
              q: "How is this different from a rules engine?",
              a: "A rules engine fires when a player matches a static condition. Canon evaluates every event against a learned policy and a budget — so the same player can get a bonus on Tuesday and a cooldown on Friday, sized differently each time.",
            },
            {
              q: "What happens when a model misbehaves?",
              a: "Soft guardrails clamp decisions before they ship. Hard guardrails (caps, frequency, exclusion) override the model entirely. Every shipped decision is replayable, so a misbehaving model is identifiable by signal pattern, not by complaint.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="See decisioning on a slice of your players."
        body="A 60-day pilot with a 10% holdout will tell you what Canon's lift looks like on your data — not somebody else's case study."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "Explore pricing", href: "/pricing" }}
      />
    </>
  )
}
