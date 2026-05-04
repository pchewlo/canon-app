import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "xtremepush vs Canon — Comparison",
  description:
    "xtremepush is a multi-channel CRM and engagement platform. Canon is per-player decisioning. The two are complementary — Canon decides; xtremepush delivers.",
}

export default function VsXtremepushPage() {
  return (
    <ComparisonPage
      competitor="xtremepush"
      subtitle="xtremepush is a multi-channel CRM and engagement platform. Canon is per-player decisioning. Different layers — same operator stack."
      intro={
        <>
          <p>
            xtremepush is a strong multi-channel CRM and engagement platform
            for iGaming and broader consumer verticals. Push, email, SMS,
            in-app, web — all in one orchestration layer. Canon doesn&apos;t
            do channel orchestration. Canon decides{" "}
            <em>which</em> player gets <em>which</em> intervention; xtremepush
            decides which channel to deliver it through.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            xtremepush wins on channel breadth and orchestration. If your CRM
            team needs to coordinate push, email, SMS, in-app, and web from a
            single tool, xtremepush is one of the best in the category.
          </p>
          <p className="mt-3">
            xtremepush is also broader than iGaming — used in fintech, retail,
            and travel. If you&apos;re a multi-vertical operator, the cross-
            vertical maturity matters.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon wins on per-player decisioning. xtremepush helps you ship
            campaigns faster; Canon decides what those campaigns should
            actually contain, per player, per moment.
          </p>
          <p className="mt-3">
            Canon also wins on bonus economics. Per-player bonus sizing,
            holdout-measured lift, and performance-based pricing align with
            CFO-level scrutiny. xtremepush charges a SaaS fee whether the
            bonus worked or not.
          </p>
        </>
      }
      rows={[
        {
          label: "Channel orchestration (email/push/SMS/in-app/web)",
          cells: [
            { kind: "yes", note: "category leader" },
            { kind: "no", note: "trigger; you orchestrate" },
          ],
        },
        {
          label: "Per-player decisioning",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Per-player bonus sizing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "RG checks per decision",
          cells: [
            { kind: "partial", note: "rule-based" },
            { kind: "yes", note: "hard guardrails" },
          ],
        },
        {
          label: "Real-time event ingestion",
          cells: [{ kind: "yes" }, { kind: "yes" }],
        },
        {
          label: "Holdout-based lift attribution",
          cells: [
            { kind: "partial", note: "campaign-level" },
            { kind: "yes", note: "always-on, ITT" },
          ],
        },
        {
          label: "Performance-based pricing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "iGaming jurisdictional rules",
          cells: [
            { kind: "partial" },
            { kind: "yes", note: "shipped as policy packs" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            xtremepush stays in your stack. Canon decides which player should
            get a bonus, mission, or no-action — and emits the decision into
            xtremepush, which delivers it across whatever channels make sense
            for that player.
          </p>
        </>
      }
    />
  )
}
