import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { FeatureSplit } from "@/components/marketing/FeatureSplit"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { PlayerJourney } from "@/components/landing/PlayerJourney"

export const metadata = {
  title: "Agents — Canon",
  description:
    "An agent per player. Every decision is shaped by that player's elasticity, lifecycle, and risk — and every action is inspectable, replayable, and explainable.",
}

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Agents"
        title="An agent per player. Inspectable, replayable, explainable."
        subtitle="Cohort campaigns blur the player. Canon spins up an agent per player, with their own elasticity, lifecycle stage, and risk profile — and shows you exactly what it's doing, why, and what it would do next."
        media={<PlayerJourney />}
      />

      <SectionShell tone="white">
        <FeatureSplit
          eyebrow="What an agent sees"
          title="Every signal that produced every decision."
          body={
            <p>
              Open any player and Canon shows the full timeline — every event
              consumed, every signal extracted, every decision shipped. Hover a
              decision to see the policy that fired and the alternatives that
              were ranked beneath it.
            </p>
          }
          bullets={[
            "Per-player timeline of consumed events",
            "Signal trace: what the agent inferred from each event",
            "Decision log with shipped action + ranked alternatives",
            "RG check trace: which guardrails fired and why",
            "Lifetime value and lift vs. control",
          ]}
          media={<PlayerJourney />}
          reverse
        />
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="What agents do"
        title="Six things every agent does, every day."
      >
        <CapabilityGrid
          items={[
            {
              title: "Read the player",
              body: "Pull the player's full event history, lifecycle stage, and risk profile from your PAM and CDP.",
            },
            {
              title: "Score the moment",
              body: "Evaluate the current event against the active strategies, ranked by expected lift.",
            },
            {
              title: "Pick an action",
              body: "Bonus, mission, cashback, cooldown, hold, or no action — sized to the player and the moment.",
            },
            {
              title: "Pass the guardrails",
              body: "RG checks (loss-chasing, stake escalation, session, deposit decline) can downgrade or block the chosen action.",
            },
            {
              title: "Ship and log",
              body: "Send the decision to your fulfilment system. Log every signal, score, and override that produced it.",
            },
            {
              title: "Learn",
              body: "Update the per-player elasticity prior on the observed outcome. Carry it forward to the next decision.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="FAQ" title="Agents, in detail.">
        <FAQAccordion
          items={[
            {
              q: "Are these large language models?",
              a: "No. The decisioning policy is a compact bandit-style model trained on operator data. LLMs are not in the decision path — latency and cost rule them out at scale.",
            },
            {
              q: "Can I see what a specific agent decided for a specific player?",
              a: "Yes. Open the player and Canon shows the full decision timeline — every event consumed, every signal extracted, every decision shipped, with the ranked alternatives beneath each.",
            },
            {
              q: "Can agents be paused or overridden for individual players?",
              a: "Yes. Operators can exclude players, pin VIP policies, or hold all decisions for a specific cohort during incidents.",
            },
            {
              q: "How does an agent learn?",
              a: "Each agent updates its per-player elasticity prior on the observed outcome of every shipped decision. The aggregate model retrains on a rolling window of operator data.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="See an agent reason in real time."
        body="A demo on a synthetic player walks through 14 days of decisions, signal-by-signal."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read about decisioning", href: "/product/decisioning" }}
      />
    </>
  )
}
