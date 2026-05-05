import { Fingerprint, ShieldOff, Brain, Filter } from "lucide-react"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { PageHero } from "@/components/marketing/PageHero"
import { PainPointGrid } from "@/components/marketing/PainPointGrid"
import { SectionShell } from "@/components/marketing/SectionShell"
import { SectionBigStatSplit } from "@/components/marketing/sections"
import { BonusAbuseAnimation } from "@/components/marketing/animations/BonusAbuseAnimation"

export const metadata = {
  title: "Bonus-abuse defence — Canon",
  description:
    "Bonus-abuse hunters drain a meaningful slice of every operator's bonus budget. Canon detects them at decision time and routes them to no-action, not nudges.",
}

export default function BonusAbusePage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions · Bonus-abuse defence"
        title="Don't pay bonuses to players who only deposited for the bonus."
        subtitle="Bonus-abuse hunters take a real slice of every operator's bonus budget. Canon detects the pattern at decision time and routes hunters to cooldown or no-action — not to a bigger nudge."
        media={<BonusAbuseAnimation />}
      />

      <SectionShell tone="cream" eyebrow="Today" title="Detection comes after the bonus is paid.">
        <PainPointGrid
          items={[
            {
              title: "Post-hoc detection only",
              body: "Most operators detect bonus abuse in finance reconciliation, weeks after the bonus has been paid out and withdrawn.",
            },
            {
              title: "Block-list whack-a-mole",
              body: "Block one device or IP, the hunter spins up another. Account-level blocking is a treadmill that never wins.",
            },
            {
              title: "False positives hurt real players",
              body: "Aggressive abuse rules also block legitimate players with overlapping signal patterns — withdrawal-heavy, multi-account households, etc.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="With Canon"
        title="Detection at decision time, not post-hoc."
      >
        <CapabilityGrid
          items={[
            {
              title: "Pattern detection",
              icon: Fingerprint,
              body: "Canon scores every player on a hunter likelihood derived from deposit, wagering, withdrawal, and time-of-day patterns.",
            },
            {
              title: "Decision-time routing",
              icon: ShieldOff,
              body: "Suspected hunters get cooldown or no-action decisions — never a bonus. The cost of a wrong call is zero spend, not a payout.",
            },
            {
              title: "Continuous learning",
              icon: Brain,
              body: "Confirmed hunters feed the model. Detection improves operator-by-operator as the signal pattern library grows.",
            },
            {
              title: "Low false positives",
              icon: Filter,
              body: "Decisions are scored with confidence intervals; borderline players get held for review rather than blanket-blocked.",
            },
          ]}
        />
      </SectionShell>

      <SectionBigStatSplit
        eyebrow="Outcomes"
        statValue="−72%"
        statCaption="Bonuses paid to suspected hunters"
        quote={{
          body: "The hunters were a known leak. We never expected to recover this much without false-positive complaints.",
          author: "Head of Risk",
          role: "Tier-1 European sportsbook · anonymised pilot",
        }}
        supportingStats={[
          { value: "0.4%", label: "False-positive rate, vs. operator-confirmed legitimate cohort" },
          { value: "£11K", label: "Median monthly bonus saved, per million treated decisions" },
        ]}
      />

      <CalloutBanner
        title="Run hunter defence against your last quarter."
        body="We can replay your historical event stream and report how many suspected-hunter bonuses Canon would have caught — no integration needed."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Read about safety", href: "/product/safety" }}
      />
    </>
  )
}
