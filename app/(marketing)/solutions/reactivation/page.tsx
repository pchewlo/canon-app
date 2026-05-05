import { Crosshair, Sparkles, Clock, FlaskConical } from "lucide-react"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { StatStrip } from "@/components/marketing/StatStrip"
import { ReactivationHookAnimation } from "@/components/marketing/animations/ReactivationHookAnimation"

export const metadata = {
  title: "Reactivation — Canon",
  description:
    "Win back lapsed players without spending the bonus budget on those who would have come back anyway. Per-player elasticity decides who gets what, when.",
}

export default function ReactivationPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · Reactivation"
        title="Win back the players who actually need a reason."
        subtitle="Canon decides which lapsed players are worth a reactivation bonus and how big — based on each player's history, not the segment's average."
        media={<ReactivationHookAnimation />}
      />

      <SectionShell tone="cream" eyebrow="Today" title="Reactivation campaigns spray, then pray.">
        <PainPointGrid
          items={[
            {
              title: "Lapsed-player blasts",
              body: "Everyone who hasn't logged in for 14 days gets the same offer. Half of them were coming back anyway; the other half were never going to.",
            },
            {
              title: "Bonus size by guesswork",
              body: "Either too small to motivate the high-elasticity player, or too big — and you've just paid for someone who'd have come back for free.",
            },
            {
              title: "No measurement of incrementality",
              body: "You see redemptions but not lift. The reactivation team is judged on activity, not on who actually came back because of you.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="With Canon"
        title="Per-player reactivation, sized to actual elasticity."
      >
        <CapabilityGrid
          items={[
            {
              title: "Elasticity-priced offers",
              icon: Crosshair,
              body: "Bonus size derived from each player's historical response to past reactivation attempts. High-elasticity players get worth-it offers; the rest get nothing.",
            },
            {
              title: "Right action, not always a bonus",
              icon: Sparkles,
              body: "A free-play, a mission, a no-cost greeting — Canon picks. The lowest-cost intervention that produces lift wins.",
            },
            {
              title: "Trigger on the right signal",
              icon: Clock,
              body: "Lapse window calibrated per player, not per cohort. Some players churn at 7 days; some at 60.",
            },
            {
              title: "Holdout-measured lift",
              icon: FlaskConical,
              body: "Always-on holdout proves how many of the reactivated cohort would have come back anyway. Lift is what you get over that baseline.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Outcomes" title="What operators see.">
        <StatStrip
          stats={[
            { value: "+34%", label: "Reactivation rate lift", hint: "vs. uniform-offer baseline" },
            { value: "−40%", label: "Wasted bonus spend", hint: "on already-returning players" },
            { value: "+£8.20", label: "Incremental ARPU", hint: "per reactivated player" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" maxWidth="4xl">
        <Quote
          quote="The number that surprised the CFO was how much we cut from the reactivation budget without losing a single returner."
          author="VP CRM"
          role="iGaming operator"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <CalloutBanner
        title="Run reactivation against a holdout."
        body="A 30-day pilot on your lapsed cohort, with a 10% control. We show the lift, you keep the budget cut."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read about agents", href: "/product/agents" }}
      />
    </>
  )
}
