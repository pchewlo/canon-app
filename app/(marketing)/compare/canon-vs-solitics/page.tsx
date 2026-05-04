import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "Solitics vs Canon — Comparison",
  description:
    "Solitics is a real-time CDP for iGaming. Canon is per-player decisioning. Both react in real time, but they're solving different problems.",
}

export default function VsSoliticsPage() {
  return (
    <ComparisonPage
      competitor="Solitics"
      subtitle="Solitics is a real-time CDP and journey orchestrator. Canon is the per-player decisioning layer that picks the action — sized to the player."
      intro={
        <>
          <p>
            Both Solitics and Canon emphasise real-time data. The difference is
            what each does with it. Solitics is a real-time CDP and journey
            engine: ingest events, segment players, fire pre-defined journeys.
            Canon is a real-time decisioning engine: ingest events, score the
            moment per player, ship the right action sized to that player.
          </p>
          <p className="mt-4">
            They&apos;re complementary — Solitics often handles the segmentation
            and channel triggering, Canon handles the per-player decision and
            sizing.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            Solitics wins on real-time CDP plumbing. Real-time event ingestion
            from PAM, payments, and game studios; real-time segment recompute;
            real-time journey orchestration — all are core competencies.
          </p>
          <p className="mt-3">
            Solitics also has a deeper iGaming-vendor install base than Canon
            does today. If your priority is getting a real-time CDP into
            production fast, Solitics is the safer pick.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon wins on the actual decision. Solitics knows when to fire a
            journey for a segment. Canon knows what to ship to a specific
            player given everything it&apos;s ever observed about them.
          </p>
          <p className="mt-3">
            Per-player bonus sizing, holdout-measured lift, and the
            performance-based pricing are differentiators. If you&apos;re
            paying Solitics a SaaS fee for real-time orchestration, you&apos;re
            still on the hook for whether the bonus actually worked. Canon
            isn&apos;t.
          </p>
        </>
      }
      rows={[
        {
          label: "Real-time event ingestion",
          cells: [
            { kind: "yes", note: "core competency" },
            { kind: "yes", note: "via your CDP" },
          ],
        },
        {
          label: "Real-time segment recompute",
          cells: [{ kind: "yes" }, { kind: "no", note: "we don't segment" }],
        },
        {
          label: "Per-player decision-time scoring",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Per-player bonus sizing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Real-time journey orchestration",
          cells: [
            { kind: "yes", note: "category leader" },
            { kind: "no", note: "trigger; you orchestrate" },
          ],
        },
        {
          label: "Holdout-based lift measurement",
          cells: [{ kind: "partial" }, { kind: "yes", note: "always-on" }],
        },
        {
          label: "Performance-based pricing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Per-decision audit trail",
          cells: [
            { kind: "partial" },
            { kind: "yes", note: "regulator-ready" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            Most operators run them together. Solitics handles real-time CDP +
            journey orchestration. Canon handles per-player decisions and
            sizing. Canon emits decision events back into Solitics so journeys
            stay in sync.
          </p>
          <p className="mt-3">
            Integration is incremental: start by routing one strategy
            (reactivation or welcome) through Canon, leave the rest in Solitics.
          </p>
        </>
      }
    />
  )
}
