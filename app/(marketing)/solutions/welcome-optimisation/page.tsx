import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { StatStrip } from "@/components/marketing/StatStrip"

export const metadata = {
  title: "Welcome optimisation — Canon",
  description:
    "Welcome bonuses are the biggest single line item in iGaming acquisition spend. Canon prices each one to the player, not the cohort.",
}

export default function WelcomePage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · Welcome optimisation"
        title="Stop paying every new sign-up the same welcome bonus."
        subtitle="The £50 first-deposit match is wasted on the player who'd have deposited £200 anyway, and not enough for the player who needs £80 to convert. Canon prices each welcome to the player."
      />

      <SectionShell tone="cream" eyebrow="Today" title="Welcome bonuses are the biggest line item in acquisition spend.">
        <PainPointGrid
          items={[
            {
              title: "Uniform offers, mixed elasticity",
              body: "A £50 match works for the median player and is wasteful for two-thirds of the rest. The cohort average is the worst possible compromise.",
            },
            {
              title: "Bonus hunters built in",
              body: "Bonus-hunters detect uniform offers within hours. Your welcome budget is funding their next withdrawal.",
            },
            {
              title: "No real attribution",
              body: "Acquisition reports activation rates, not lift over a no-bonus control. You don't know which welcome bonuses worked.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="With Canon"
        title="Welcome bonuses, sized per signup."
      >
        <CapabilityGrid
          items={[
            {
              title: "Per-signup pricing",
              body: "Welcome bonus size derived from acquisition channel, market, device, time-of-signup, and early-event signals.",
            },
            {
              title: "Free-play vs. cash split",
              body: "Canon picks the format — free-play, deposit match, no-deposit, mission — based on the player's expected response.",
            },
            {
              title: "Bonus-hunter defence",
              body: "Suspected hunters get cooldown or no-action, not a bonus. The detection model improves with every confirmed pattern.",
            },
            {
              title: "Holdout-measured",
              body: "10% of new signups stay on a uniform-offer baseline. Lift is reported against that, not against historical activation rates.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Outcomes" title="What welcome optimisation looks like.">
        <StatStrip
          stats={[
            { value: "+45%", label: "Activation rate lift", hint: "vs. uniform-offer control" },
            { value: "−28%", label: "Welcome bonus spend", hint: "with same-or-better activation" },
            { value: "+£3.20", label: "Cohort ARPU lift", hint: "month 1, treated cohort" },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" maxWidth="4xl">
        <Quote
          quote="The welcome budget cut paid for the platform inside three months."
          author="Head of Acquisition"
          role="Tier-2 European operator"
          company="Anonymised pilot operator"
        />
      </SectionShell>

      <CalloutBanner
        title="Run welcome optimisation on a slice of your sign-ups."
        body="Pilot on a 10% slice of new sign-ups against a uniform-offer holdout. We report lift in 30 days."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  )
}
