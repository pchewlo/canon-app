import Link from "next/link"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
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
              body: "An at-risk player triggers a decision on the next event — not on next Tuesday's batch.",
            },
            {
              title: "Sized to elasticity",
              body: "Bonus size derived from the player's per-history elasticity prior. High-elasticity players get bigger; low don't get spend.",
            },
            {
              title: "Right action, not always a bonus",
              body: "A mission, a cool-down, a lapse-prevention offer — Canon picks. Sometimes the right action is no action.",
            },
            {
              title: "RG-aware",
              body: "At-risk players don't get retention spend that would harm them. Holds and cool-downs replace nudges.",
            },
            {
              title: "Holdout-measured",
              body: "10% rules-based holdout proves the lift. No counterfactual hand-waving.",
            },
            {
              title: "Cross-vertical",
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

      <SectionShell tone="cream" eyebrow="Powered by" title="Two products, one strategy.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/product/decisioning"
            className="rounded-xl border border-quest-ink/10 bg-white p-6 hover:border-quest-accent/40 transition-colors"
          >
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
              Product
            </div>
            <div className="mt-2 text-[16px] font-semibold text-quest-ink">
              Decisioning →
            </div>
            <p className="mt-2 text-[14px] text-quest-ink-muted">
              The runtime that picks the right action per player, per event.
            </p>
          </Link>
          <Link
            href="/product/safety"
            className="rounded-xl border border-quest-ink/10 bg-white p-6 hover:border-quest-accent/40 transition-colors"
          >
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
              Product
            </div>
            <div className="mt-2 text-[16px] font-semibold text-quest-ink">
              Safety →
            </div>
            <p className="mt-2 text-[14px] text-quest-ink-muted">
              RG-aware retention. At-risk players never get nudged harder.
            </p>
          </Link>
        </div>
      </SectionShell>

      <CalloutBanner
        title="See retention lift on a slice of your players."
        body="A 60-day pilot with a 10% holdout will tell you what Canon's retention lift looks like on your data."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  )
}
