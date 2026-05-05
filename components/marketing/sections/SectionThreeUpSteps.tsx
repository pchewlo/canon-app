// HANDOFF Variant 2A — Three-up steps on cream.
// Use for: how-it-works, process, three-step explainers.

type Step = { title: string; body: string }

type Props = {
  eyebrow: string
  title: string
  steps: [Step, Step, Step]
  id?: string
}

export function SectionThreeUpSteps({ eyebrow, title, steps, id }: Props) {
  return (
    <section id={id} className="bg-canon-cream px-[88px] py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </div>
        <h2 className="mt-4 mb-10 text-balance text-[32px] font-semibold leading-[1.18] tracking-[-0.018em] text-quest-ink max-w-[26ch]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <article
              key={i}
              className="rounded-[4px] border border-canon-line-soft bg-canon-paper p-6"
            >
              <div className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 text-[16px] font-semibold tracking-[-0.005em] text-quest-ink">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.55] text-quest-ink-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
