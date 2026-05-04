import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "Optimove vs Canon — Comparison",
  description:
    "Optimove and Canon both target player engagement, but they're different categories. Optimove is a campaign-orchestration CDP. Canon is per-player decisioning.",
}

export default function VsOptimovePage() {
  return (
    <ComparisonPage
      competitor="Optimove"
      subtitle="Optimove is a campaign-orchestration CDP. Canon is per-player decisioning. The two can run together — until you're ready to graduate."
      intro={
        <>
          <p>
            Optimove and Canon are sometimes treated as alternatives, but
            they&apos;re different layers of the engagement stack. Optimove sits
            in the campaign-orchestration tier — segmentation, journey
            orchestration, channel coordination. Canon sits in the
            per-decision tier — for every event a player produces, what should
            we do, how big, sized to whom.
          </p>
          <p className="mt-4">
            Most operators using Optimove eventually hit the same ceiling: they
            can target the right cohort, but they can&apos;t price the bonus
            per-player or react in real time. That&apos;s where Canon picks up.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            Optimove is the better choice when your engagement model is still
            campaign-shaped. If your CRM team thinks in cohorts, ships weekly
            journeys, and reports on send/open/click, Optimove&apos;s
            orchestration depth and channel coverage is hard to beat.
          </p>
          <p className="mt-3">
            Optimove also has a deeper bench of out-of-the-box reporting and
            segment templates than Canon does today. If you need to ship
            CRM-team training in a week, that matters.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon wins when bonus spend is the dominant cost and per-player
            sizing matters more than channel orchestration. Per-player
            elasticity, per-event decisions, and a holdout-measured
            performance fee align our incentives with your CFO&apos;s.
          </p>
          <p className="mt-3">
            Canon also wins on regulator-facing audit. Every decision is
            replayable from inputs; RG checks are hard guardrails on every
            decision; jurisdictional rules are policy, not engineering tickets.
          </p>
        </>
      }
      rows={[
        {
          label: "Decision granularity",
          cells: [
            { kind: "text", value: "Cohort + segment journeys" },
            { kind: "text", value: "Per-player, per-event" },
          ],
        },
        {
          label: "Real-time decisioning",
          cells: [
            { kind: "partial", note: "trigger-based" },
            { kind: "yes" },
          ],
        },
        {
          label: "Per-player bonus sizing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "RG checks per decision",
          cells: [
            { kind: "partial", note: "via segments" },
            { kind: "yes", note: "hard guardrails" },
          ],
        },
        {
          label: "Holdout-based attribution",
          cells: [
            { kind: "partial", note: "per-campaign" },
            { kind: "yes", note: "always-on, ITT" },
          ],
        },
        {
          label: "Performance-based pricing",
          cells: [
            { kind: "no" },
            { kind: "yes", note: "5% + 17.5% lift fee" },
          ],
        },
        {
          label: "Channel orchestration depth",
          cells: [
            { kind: "yes", note: "category leader" },
            { kind: "no", note: "we trigger; you orchestrate" },
          ],
        },
        {
          label: "iGaming jurisdictional rules",
          cells: [
            { kind: "partial", note: "configurable" },
            { kind: "yes", note: "shipped as policy packs" },
          ],
        },
        {
          label: "Time to first measurable lift",
          cells: [
            { kind: "text", value: "1-3 months" },
            { kind: "text", value: "14-30 days" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            You don&apos;t have to rip Optimove out. The most common rollout is{" "}
            <strong>Canon for the bonus-decision layer</strong> while Optimove
            keeps doing what it does best (segmentation, journey orchestration,
            multi-channel comms). We trigger; Optimove orchestrates.
          </p>
          <p className="mt-3">
            If you eventually move bonus orchestration over too, the migration
            is incremental — strategy by strategy, never a flag day.
          </p>
        </>
      }
    />
  )
}
