import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { StatStrip } from "@/components/marketing/StatStrip"
import { VIPLadderAnimation } from "@/components/marketing/animations/VIPLadderAnimation"

export const metadata = {
  title: "VIP management — Canon",
  description:
    "VIP managers handle 30 players each. Canon handles the next 3,000. Per-player decisions for the long tail of high-value players your team can't reach.",
}

export default function VIPPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · VIP management"
        title="Your VIP team handles 30 players. Canon handles the next 3,000."
        subtitle="Most operators have a long tail of high-value players that don't quite qualify for personal management — and get cohort treatment instead. Canon gives them per-player decisions without per-player headcount."
        media={<VIPLadderAnimation />}
      />

      <SectionShell tone="cream" eyebrow="Today" title="The VIP gap is structural.">
        <PainPointGrid
          items={[
            {
              title: "Manageable VIPs only",
              body: "Your team can manage 30–50 named VIPs. Players ranked 50–3000 are 'segment 2' — they get the cohort treatment.",
            },
            {
              title: "Same offers, different inboxes",
              body: "Sub-VIPs get the same 'high-value player' bonus the actual VIPs decline. The bonus isn't sized to them.",
            },
            {
              title: "Risk concentrated in long-tail",
              body: "Long-tail VIPs are where bonus abuse, RG escalations, and churn cluster — exactly the players cohort treatment misses.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="With Canon"
        title="Per-player VIP treatment, applied to your long tail."
      >
        <CapabilityGrid
          items={[
            {
              title: "Per-player offers",
              body: "Each long-tail VIP gets a decision shaped by their elasticity, lifecycle, and risk — not the cohort average.",
            },
            {
              title: "VIP-aware policies",
              body: "Pin policies for specific players, exclude others, set spend caps and frequency by VIP tier.",
            },
            {
              title: "RG-aware",
              body: "Long-tail VIPs are where RG risk concentrates. Canon flags loss-chasing, escalation, and session-length issues to your team.",
            },
            {
              title: "Hand-off to humans",
              body: "When a player crosses a threshold (revenue, risk, intent signal), Canon escalates to a named VIP manager rather than handling autonomously.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Outcomes" title="What the long tail looks like with Canon.">
        <StatStrip
          stats={[
            { value: "+22%", label: "Long-tail VIP retention", hint: "vs. cohort treatment" },
            { value: "3,000+", label: "Players given per-player treatment", hint: "without adding VIP headcount" },
            { value: "−18%", label: "RG escalations missed", hint: "vs. cohort baseline" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" maxWidth="4xl">
        <Quote
          quote="We always knew the long-tail VIPs were our biggest leak. Canon was the first thing that gave us per-player treatment without hiring a second VIP team."
          author="Director of CRM"
          role="iGaming operator"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <CalloutBanner
        title="See per-player VIP on a slice of your tail."
        body="A 60-day pilot on the 1,000 players your VIP team can't reach. Holdout-measured."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read about safety", href: "/product/safety" }}
      />
    </>
  )
}
