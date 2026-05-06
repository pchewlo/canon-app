import { BookCallForm } from "@/components/marketing/BookCallForm"

export const metadata = {
  title: "Book a call",
  description:
    "Tell us what you want to lift. We'll come back within one working day to schedule a 30-minute walkthrough on your data — yours or ours.",
}

const SOFT_CREAM = "rgba(243, 239, 230, 0.7)"
const FAINT_CREAM = "rgba(243, 239, 230, 0.55)"
const DIVIDER = "rgba(243, 239, 230, 0.2)"

export default function BookCallPage() {
  return (
    <section className="bg-canon-green text-canon-cream">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div
              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: FAINT_CREAM }}
            >
              Book a call
            </div>
            <h1
              className="mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.028em] text-canon-cream"
              style={{ fontSize: "clamp(40px, 5vw, 56px)", maxWidth: "20ch" }}
            >
              Tell us what you want to lift.
            </h1>
            <p
              className="mt-6 max-w-md text-[16px] leading-[1.55]"
              style={{ color: SOFT_CREAM }}
            >
              30 minutes on your bonus spend, your retention curves, and what
              Canon would do differently. Run on your data or ours.
            </p>

            <div
              className="mt-10 pt-8"
              style={{ borderTop: `1px solid ${DIVIDER}` }}
            >
              <div
                className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: FAINT_CREAM }}
              >
                What to expect
              </div>
              <ol className="mt-4 space-y-4">
                <Step
                  n="01"
                  title="A working call, not a deck"
                  body="Your CRM lead, your RG officer, our solutions engineer. We bring the dashboards live."
                />
                <Step
                  n="02"
                  title="Lift modelled on your numbers"
                  body="Send a slice of historical events ahead of time — we'll counterfactual-replay against a Canon policy."
                />
                <Step
                  n="03"
                  title="A pilot plan in 48 hours"
                  body="If it makes sense, we'll write up the holdout, the metric, and the timeline. No commitment to read it."
                />
              </ol>
            </div>
          </div>

          <div className="lg:col-span-7">
            <BookCallForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  n,
  title,
  body,
}: {
  n: string
  title: string
  body: string
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        className="font-mono text-[11px] font-semibold tracking-[0.14em] tabular-nums pt-0.5 text-canon-cream"
      >
        {n}
      </span>
      <div>
        <div className="text-[14px] font-semibold tracking-[-0.005em] text-canon-cream">
          {title}
        </div>
        <p
          className="mt-1 text-[13px] leading-[1.55]"
          style={{ color: SOFT_CREAM }}
        >
          {body}
        </p>
      </div>
    </li>
  )
}
