import {
  Zap,
  Crosshair,
  Sparkles,
  ShieldAlert,
  FlaskConical,
  Shapes,
} from "lucide-react"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionProductFrame } from "@/components/marketing/sections"
import { OutcomesPanel } from "@/components/landing/OutcomesPanel"
import { RetentionLifecycleAnimation } from "@/components/marketing/animations/RetentionLifecycleAnimation"

export const metadata = {
  title: "Retention — Canon",
  description:
    "Stop losing the players you spent to acquire. Per-player agents shape the right intervention at the right moment — not next week's cohort blast.",
}

export default function RetentionPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · Retention"
        title="Stop losing the players you spent to acquire."
        subtitle="Most retention spend lands on players who would have stayed anyway, or arrives a week after they churned. Per-player agents fix the timing — and the size — of every retention decision."
        media={<RetentionLifecycleAnimation />}
      />

      <SectionShell tone="cream" eyebrow="Today" title="The retention problem isn't the campaign. It's the cadence.">
        <PainPointGrid
          items={[
            {
              title: "Cohort blasts",
              body: "Weekly campaigns mean a player can be 5 days into churn before they hear from you. By then the welcome-back bonus is sunk cost.",
            },
            {
              title: "Wrong size, wrong moment",
              body: "Bonuses are calibrated for the average — too small for high-elasticity players, too big for the low. Both leak ROI.",
            },
            {
              title: "Bonuses to already-loyal players",
              body: "Spend on players who would have come back anyway. The ones at real risk get a generic offer or nothing.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="With Canon"
        title="Per-player decisions, sized to elasticity, timed to the event."
      >
        <CapabilityGrid
          items={[
            {
              title: "Real-time intervention",
              icon: Zap,
              body: "An at-risk player triggers a decision on the next event — not on next Tuesday's batch.",
            },
            {
              title: "Sized to elasticity",
              icon: Crosshair,
              body: "Bonus size derived from the player's per-history elasticity prior. High-elasticity players get bigger; low don't get spend.",
            },
            {
              title: "Right action, not always a bonus",
              icon: Sparkles,
              body: "A mission, a cool-down, a lapse-prevention offer — Canon picks. Sometimes the right action is no action.",
            },
            {
              title: "RG-aware",
              icon: ShieldAlert,
              body: "At-risk players don't get retention spend that would harm them. Holds and cool-downs replace nudges.",
            },
            {
              title: "Holdout-measured",
              icon: FlaskConical,
              body: "10% rules-based holdout proves the lift. No counterfactual hand-waving.",
            },
            {
              title: "Cross-vertical",
              icon: Shapes,
              body: "Sportsbook, casino, live, poker — same engine. Different per-vertical priors.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Outcomes" title="What operators see in production.">
        <OutcomesPanel />
      </SectionShell>

      <SectionShell tone="white" maxWidth="4xl">
        <Quote
          quote="We were running weekly reactivation campaigns. Canon was running them per session. Lift showed up inside two weeks."
          author="Head of CRM"
          role="Tier-1 European sportsbook"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <SectionProductFrame
        eyebrow="Powered by"
        title="Two products, one strategy."
        products={[
          {
            name: "Decisioning",
            href: "/product/decisioning",
            body: "The runtime that picks the right action per player, per event.",
          },
          {
            name: "Safety",
            href: "/product/safety",
            body: "RG-aware retention. At-risk players never get nudged harder.",
          },
        ]}
      />

      <CalloutBanner
        title="See retention lift on a slice of your players."
        body="A 60-day pilot with a 10% holdout will tell you what Canon's retention lift looks like on your data."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  )
}
