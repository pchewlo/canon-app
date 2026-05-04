import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "OptiKPI vs Canon — Comparison",
  description:
    "OptiKPI is an analytics-first CRM platform for iGaming. Canon is per-player decisioning. Different layers — sometimes used together.",
}

export default function VsOptiKPIPage() {
  return (
    <ComparisonPage
      competitor="OptiKPI"
      subtitle="OptiKPI is an analytics-first CRM platform for iGaming. Canon is per-player decisioning. They overlap on reporting; they diverge on what to do next."
      intro={
        <>
          <p>
            OptiKPI&apos;s strength is analytics — KPI dashboards, segment
            insights, retention reporting. Canon&apos;s strength is the
            decision itself — per-player, per-event, sized to elasticity.
            They overlap on the reporting layer; they diverge on the action.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            OptiKPI is the better choice when your immediate need is{" "}
            <em>understanding</em> rather than <em>doing</em>. Deep KPI
            dashboards, cohort comparisons, segment drilldowns are
            OptiKPI&apos;s home turf.
          </p>
          <p className="mt-3">
            If your CRM team wants to ship better dashboards before they ship
            better decisions, OptiKPI is a sensible first step.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon takes the next step. OptiKPI tells you which segment is
            churning. Canon decides what to do about it, per player, in real
            time. OptiKPI reports the lift; Canon produces it.
          </p>
          <p className="mt-3">
            Canon also reports holdout-measured lift natively, since the
            holdout is the basis of the performance fee. OptiKPI&apos;s
            attribution depends on what the operator chooses to A/B test.
          </p>
        </>
      }
      rows={[
        {
          label: "Analytics + dashboards",
          cells: [
            { kind: "yes", note: "category leader" },
            { kind: "partial", note: "decision-focused" },
          ],
        },
        {
          label: "Per-player decisioning",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Real-time decisions",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Per-player bonus sizing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "Holdout-based lift attribution",
          cells: [
            { kind: "partial", note: "operator-defined A/B" },
            { kind: "yes", note: "always-on" },
          ],
        },
        {
          label: "Performance-based pricing",
          cells: [{ kind: "no" }, { kind: "yes" }],
        },
        {
          label: "RG checks per decision",
          cells: [
            { kind: "partial", note: "rule-based" },
            { kind: "yes" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            Run them together: OptiKPI for the dashboards your CRM team lives
            in; Canon for the decisions your CRM team can&apos;t make at the
            per-player level. Canon emits decision events into your warehouse,
            so OptiKPI&apos;s reporting layer stays accurate.
          </p>
        </>
      }
    />
  )
}
