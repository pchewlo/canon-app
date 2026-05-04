import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "Smartico vs Canon — Comparison",
  description:
    "Smartico and Canon both serve iGaming operators, but they sit in different layers. Smartico is a gamification + CRM suite. Canon is per-player decisioning.",
}

export default function VsSmarticoPage() {
  return (
    <ComparisonPage
      competitor="Smartico"
      subtitle="Smartico is an iGaming gamification + CRM suite. Canon is per-player decisioning. The two can co-exist — Canon decides what to ship; Smartico delivers it."
      intro={
        <>
          <p>
            Smartico is a comprehensive gamification and CRM suite built
            specifically for iGaming. It covers missions, tournaments, bonuses,
            CRM journeys, and channel comms. Canon is narrower and deeper:
            per-player, per-event decisioning that picks{" "}
            <em>which</em> bonus, mission, or no-action ships to{" "}
            <em>which</em> player at <em>which</em> moment.
          </p>
          <p className="mt-4">
            Operators using Smartico typically use Canon to upgrade the
            decision layer — keeping the gamification and channel
            orchestration in Smartico, while Canon decides which player gets
            which intervention.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            Smartico wins on breadth. If you need missions, tournaments,
            jackpots, gamification mechanics, and journey orchestration in one
            tool, Smartico is hard to assemble from individual best-of-breed
            pieces.
          </p>
          <p className="mt-3">
            Smartico is also further along on iGaming-vendor maturity — broad
            integration coverage, established operator install base, and a
            services team.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon wins on per-decision intelligence. Smartico still relies on
            CRM-team-defined rules and segments. Canon makes the decision
            itself, per player, per event, sized to elasticity — and reports
            holdout-measured lift.
          </p>
          <p className="mt-3">
            Canon also wins on RG-by-design. Hard guardrails on every decision,
            replayable per-decision logs, and jurisdictional rules shipped as
            policy packs make the regulator conversation easier.
          </p>
        </>
      }
      rows={[
        {
          label: "Decision granularity",
          cells: [
            { kind: "text", value: "Rule + segment based" },
            { kind: "text", value: "Per-player, per-event" },
          ],
        },
        {
          label: "Per-player bonus sizing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Holdout-based lift attribution",
          cells: [{ kind: "partial", note: "limited" }, { kind: "yes" }],
        },
        {
          label: "Gamification mechanics (missions, tournaments)",
          cells: [
            { kind: "yes", note: "category leader" },
            { kind: "partial", note: "we decide; you fulfil" },
          ],
        },
        {
          label: "Channel orchestration",
          cells: [
            { kind: "yes" },
            { kind: "no", note: "trigger your existing comms" },
          ],
        },
        {
          label: "RG checks per decision",
          cells: [
            { kind: "partial", note: "rule-based" },
            { kind: "yes", note: "hard guardrails on every decision" },
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
          label: "Audit trail per decision",
          cells: [
            { kind: "partial" },
            { kind: "yes", note: "regulator-ready" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            You don&apos;t need to leave Smartico. The common pattern is{" "}
            <strong>Canon for decisioning, Smartico for fulfilment</strong>.
            Canon picks the player, the bonus, and the moment; Smartico
            delivers it through your gamification, journey, or channel layer.
          </p>
          <p className="mt-3">
            Integration takes 2–4 weeks. We&apos;ve done it before.
          </p>
        </>
      }
    />
  )
}
