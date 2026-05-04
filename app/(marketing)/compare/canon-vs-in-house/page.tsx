import { ComparisonPage } from "@/components/marketing/ComparisonPage"

export const metadata = {
  title: "In-house tools vs Canon — Comparison",
  description:
    "Some operators have built per-player decisioning in-house. Here's an honest comparison: when an in-house build wins, when Canon wins, and what migration looks like.",
}

export default function VsInHousePage() {
  return (
    <ComparisonPage
      competitor="In-house tools"
      subtitle="A handful of Tier-1 operators have built per-player decisioning themselves. The honest version of when that wins — and when buying Canon does."
      intro={
        <>
          <p>
            A small number of operators — typically Tier-1, with 50+ engineers
            on the CRM and platform teams — have built per-player decisioning
            themselves. They&apos;re the closest functional comparison to
            Canon, and their build/buy reasoning is the most useful one to
            understand.
          </p>
          <p className="mt-4">
            Below is the honest version of when an in-house build wins, when
            Canon wins, and what hybrid models look like.
          </p>
        </>
      }
      whereCompetitorWins={
        <>
          <p>
            In-house wins when you have decisioning-specific differentiation
            that can&apos;t be expressed as policy. If your data science team
            has built a unique elasticity model on signals nobody else has — a
            proprietary game telemetry source, a non-public payment-risk
            signal — Canon&apos;s policy interface won&apos;t express it
            without bespoke work.
          </p>
          <p className="mt-3">
            In-house also wins on incremental cost once the team is built. If
            you already have 5 ML engineers and 2 platform engineers on
            decisioning, marginal feature cost is lower in-house.
          </p>
        </>
      }
      whereCanonWins={
        <>
          <p>
            Canon wins on time-to-lift and ongoing cost-of-ownership. A
            reasonable in-house decisioning rebuild is 18–24 months of work
            with a 5+ engineer team. Canon ships lift in 14–30 days from a
            pilot.
          </p>
          <p className="mt-3">
            Canon also wins on the regulator-grade audit and RG-by-design
            story. Most in-house tools were built for retention first and
            retro-fitted with RG; Canon was built with both as first-class.
          </p>
          <p className="mt-3">
            Performance-based pricing reframes the build/buy math. If Canon
            doesn&apos;t produce lift, you don&apos;t pay much. An in-house
            team costs the same whether the model works or not.
          </p>
        </>
      }
      rows={[
        {
          label: "Time to first measurable lift",
          cells: [
            { kind: "text", value: "12-24 months" },
            { kind: "text", value: "14-30 days" },
          ],
        },
        {
          label: "Ongoing engineering cost",
          cells: [
            { kind: "text", value: "5-10 FTE" },
            { kind: "text", value: "0 FTE" },
          ],
        },
        {
          label: "Cost predictability",
          cells: [
            { kind: "no", note: "fixed regardless of lift" },
            { kind: "yes", note: "scales with lift" },
          ],
        },
        {
          label: "Per-player decisioning",
          cells: [{ kind: "yes" }, { kind: "yes" }],
        },
        {
          label: "RG-by-design audit trail",
          cells: [
            { kind: "partial", note: "depends on build" },
            { kind: "yes", note: "first-class" },
          ],
        },
        {
          label: "Cross-operator learning",
          cells: [
            { kind: "no", note: "single-operator data only" },
            { kind: "yes", note: "policy improves across operator base" },
          ],
        },
        {
          label: "Lock-in risk",
          cells: [
            { kind: "no", note: "your code, your team" },
            { kind: "partial", note: "we publish exit specs" },
          ],
        },
        {
          label: "Differentiation potential",
          cells: [
            { kind: "yes", note: "can encode proprietary signals" },
            { kind: "partial", note: "via custom signal connectors" },
          ],
        },
      ]}
      migrationNote={
        <>
          <p>
            Most in-house teams that adopt Canon do so as a hybrid: Canon
            handles the long tail of strategies (welcome, reactivation, VIP,
            bonus-abuse), while the in-house team focuses on the one or two
            decisioning surfaces where their proprietary signals matter.
          </p>
          <p className="mt-3">
            The pattern frees the in-house team to focus on differentiation
            instead of upkeep — and gets the long-tail strategies live
            faster than the in-house roadmap would have allowed.
          </p>
        </>
      }
    />
  )
}
