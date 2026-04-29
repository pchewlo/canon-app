export function LegalHeader({ title }: { title: string }) {
  return (
    <header className="mb-12">
      <h1 className="text-[clamp(32px,4vw,48px)] font-semibold leading-tight tracking-[-0.02em]">
        {title}
      </h1>
    </header>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-[18px] font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-quest-ink-muted [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-quest-ink [&_a]:text-quest-ink [&_a]:underline">
        {children}
      </div>
    </section>
  )
}

export function LegalUpdated({ date }: { date: string }) {
  return (
    <p className="mt-16 text-[13px] text-quest-ink-faint">Last updated: {date}</p>
  )
}
