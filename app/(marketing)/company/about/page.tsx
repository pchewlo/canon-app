import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { PageHero } from "@/components/marketing/PageHero"
import { Quote } from "@/components/marketing/Quote"
import { SectionShell } from "@/components/marketing/SectionShell"
import { Eyebrow, Heading } from "@/components/marketing/typography"

export const metadata = {
  title: "About — Canon",
  description:
    "Canon is the agentic platform for player bonuses. Built by founders who've shipped consumer engagement and crypto-questing products to millions of users.",
}

const TEAM = [
  {
    name: "Tom Littler",
    role: "Co-founder & CEO",
    bio: "3x founder, 2x exits. Founded simpl.rent (identity and data verification for real estate), Lithium (crypto questing), and Medley (questing / link-in-bio for creators). Brings deep product intuition for gamified engagement.",
    initial: "T",
  },
  {
    name: "Aaron",
    role: "Co-founder & CTO",
    bio: "Built Apollo, an AI-powered app relied on by the Premier League. Worked with Tom on Lithium and Medley. The technical spine of Canon.",
    initial: "A",
  },
  {
    name: "Charles",
    role: "Advisor",
    bio: "Founder of Rarestone Ventures. $50M+ raised, multiple exits, Forbes 30 Under 30 Europe. Helping Canon land its first iGaming partners.",
    initial: "C",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Building the agentic engagement layer for regulated markets."
        subtitle="Canon was started in 2026 by founders who've spent the last decade building gamified, real-time engagement products. We think the next decade of CRM is per-player and agentic — starting with iGaming."
      />

      <SectionShell tone="cream" eyebrow="The thesis" title="One agent per player, every decision logged.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <p className="text-[16px] leading-relaxed text-quest-ink">
            Cohort campaigns served the era of expensive decisions. When a CRM team
            could afford to run a single weekly campaign, segment-by-segment was the
            best you could do. Inference cost has fallen sixty-fold since 2023.
            That arithmetic flips: per-player, per-event decisions are now
            cheaper than the alternative — and produce more lift.
          </p>
          <p className="text-[16px] leading-relaxed text-quest-ink-muted">
            The catch is that autonomous decisioning isn&apos;t deployable in
            regulated markets unless the audit and RG story is bulletproof.
            That&apos;s the work — the engine and the guardrails together. Canon
            was built for both from day one.
          </p>
        </div>
      </SectionShell>

      <SectionShell tone="white" eyebrow="Team" title="Three people. One thesis.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map((p) => (
            <div key={p.name}>
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-quest-accent/15 to-quest-accent/5 border border-quest-ink/10 flex items-center justify-center text-[22px] font-bold text-quest-accent">
                {p.initial}
              </div>
              <div className="mt-4 text-[16px] font-semibold text-quest-ink">
                {p.name}
              </div>
              <div className="text-[12px] uppercase tracking-wider text-quest-ink-faint mt-0.5">
                {p.role}
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-quest-ink-muted">
                {p.bio}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="cream" maxWidth="4xl">
        <Quote
          quote="The next decade of player engagement won't be won by better campaigns. It'll be won by per-player decisions, made in real time, by agents that learn."
          author="Tom Littler"
          role="Co-founder & CEO"
          company="Canon"
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="What we believe" title="Five principles that shape the product.">
        <ol className="space-y-6 max-w-3xl">
          {[
            ["Per-player beats per-cohort.", "Cohort campaigns are an artefact of expensive decisions. The arithmetic has changed."],
            ["Every decision is logged.", "If we can't show a regulator why a player got what, we shouldn't have shipped it."],
            ["RG is a hard constraint, not a feature.", "Soft guardrails clamp; hard guardrails override. Always."],
            ["Performance pricing aligns incentives.", "We don't get paid unless the operator gets lift."],
            ["Honesty earns trust pre-revenue.", "We don't fake logos, fake case studies, or fake roadmap."],
          ].map(([title, body]) => (
            <li key={title} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <Eyebrow>Principle</Eyebrow>
              <div className="lg:col-span-11">
                <Heading size="sm">{title}</Heading>
                <p className="mt-2 text-[14.5px] leading-relaxed text-quest-ink-muted">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionShell>

      <CalloutBanner
        title="Want to talk about per-player decisioning?"
        body="We're early. We respond to every well-written email."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  )
}
