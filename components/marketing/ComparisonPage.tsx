import type { ReactNode } from "react"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import {
  ComparisonTable,
  type ComparisonRow,
} from "@/components/marketing/ComparisonTable"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { Heading } from "@/components/marketing/typography"

export type ComparisonPageProps = {
  competitor: string
  /** Short subtitle on the hero, e.g. "When each tool wins". */
  subtitle: string
  /** Paragraph that frames the comparison — fair to the competitor. */
  intro: ReactNode
  /** Where the competitor genuinely wins. Be honest. */
  whereCompetitorWins: ReactNode
  /** Where Canon wins. Be specific. */
  whereCanonWins: ReactNode
  /** Detailed comparison rows. Always 2 columns: competitor + Canon. */
  rows: ComparisonRow[]
  /** Migration paragraph: "If you're already on X, here's the path." */
  migrationNote: ReactNode
}

export function ComparisonPage({
  competitor,
  subtitle,
  intro,
  whereCompetitorWins,
  whereCanonWins,
  rows,
  migrationNote,
}: ComparisonPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={`${competitor} vs Canon: when each tool wins.`}
        subtitle={subtitle}
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{
          label: "See pricing",
          href: "/pricing",
        }}
      />

      <SectionShell tone="white" maxWidth="4xl">
        <div className="text-[16px] leading-relaxed text-quest-ink-muted">
          {intro}
        </div>
      </SectionShell>

      <SectionShell tone="cream" maxWidth="6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-quest-ink/10 bg-white p-7">
            <Heading size="sm">Where {competitor} wins</Heading>
            <div className="mt-3 text-[14.5px] leading-relaxed text-quest-ink-muted">
              {whereCompetitorWins}
            </div>
          </div>
          <div className="rounded-2xl border border-quest-accent/30 bg-white p-7">
            <Heading size="sm">Where Canon wins</Heading>
            <div className="mt-3 text-[14.5px] leading-relaxed text-quest-ink-muted">
              {whereCanonWins}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        tone="white"
        eyebrow="Side by side"
        title={`${competitor} vs Canon, in detail.`}
      >
        <ComparisonTable
          columns={[
            { name: competitor },
            { name: "Canon", highlighted: true },
          ]}
          rows={rows}
        />
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="Migration"
        title={`Already on ${competitor}? Here's the path.`}
        maxWidth="4xl"
      >
        <div className="text-[15.5px] leading-relaxed text-quest-ink">
          {migrationNote}
        </div>
      </SectionShell>

      <CalloutBanner
        title="Run a side-by-side on your own data."
        body={`We can replay your historical event stream against a Canon policy and report counterfactual lift vs your current ${competitor} setup.`}
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Explore Canon's product", href: "/product/decisioning" }}
      />
    </>
  )
}
