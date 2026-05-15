import Link from "next/link"

// 1-pager design-partner proposal for Gamblr. Rendered at
// /proposals/gamblr/proposal, gated by the same password as the appendix.

export function GamblrProposal() {
  return (
    <main className="bg-canon-cream text-canon-ink">
      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-20">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          Canon &nbsp;·&nbsp; Gamblr &nbsp;·&nbsp; Design partner proposal
          &nbsp;·&nbsp; May 2026
        </p>

        <p className="mt-10 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-canon-green">
          Design partnership
        </p>
        <h1
          className="mt-4 text-balance font-semibold leading-[1.08] tracking-[-0.024em] text-canon-ink"
          style={{ fontSize: "clamp(32px, 6.5vw, 52px)", maxWidth: "20ch" }}
        >
          No spend. No commitment. Just build together.
        </h1>
        <p className="mt-6 font-brand text-[18px] italic leading-[1.55] text-quest-ink">
          We&apos;re a few months from a public launch and right now we are
          prioritising trusted design partners and feedback. You guys have
          very deep domain-specific knowledge and we want to work with you
          to build something people want. After the design partnership, you
          will have the option, but not the obligation, to direct bonus
          spend through Canon.
        </p>

        <Block heading="What this is">
          A working design partnership while Canon is in build. There is no
          cost and no spend gets redirected. No statistical test running.
          Just access, conversation, and feedback while we build something
          worth using.
        </Block>

        <Block heading="What we'd ask for">
          <ProposalList
            items={[
              {
                lead: "Read access to your player and bonus data.",
                body: "So we can understand how spend is actually being managed and shape the product around real signals.",
              },
              {
                lead: "Monthly working sessions with you and Clive.",
                body: "30–60 minutes. Show and tell where we go through what we’re building and you feed back.",
              },
              {
                lead: "Honest feedback as we go.",
                body: "If something we're building is obviously wrong for the industry, we want to hear it before we ship it.",
              },
              {
                lead: "First-look rights when we're ready to run a real pilot.",
                body: "If you want to direct spend through Canon once we have data, you get the first conversation.",
              },
            ]}
          />
        </Block>

        <Block heading="What Gamblr gets">
          <ProposalList
            items={[
              {
                lead: "Equity in Canon.",
                body: "Small slug (0.25–0.5%, exact number worth a conversation) as a thank-you for the early partnership.",
              },
              {
                lead: "Direct influence on the product.",
                body: "What we build is shaped by what you tell us.",
              },
              {
                lead: "No cost, commitment or exposure.",
                body: "Either side can walk away at any time, no obligation in either direction.",
              },
            ]}
          />
        </Block>

        <Block heading="Protecting both sides">
          Mutual NDA covers the work. You own your player data. We own what
          we build. Anything we learn from working with Gamblr that&apos;s
          specific to your business stays confidential. Anything that&apos;s
          general industry pattern is ours to apply elsewhere.
        </Block>

        <footer className="mt-14 border-t border-canon-line pt-8">
          <div className="text-[15px] font-semibold tracking-[-0.005em] text-canon-ink">
            Tom Littler
          </div>
          <div className="mt-1 text-[14px] text-quest-ink-muted">
            Founder, Canon ·{" "}
            <a
              href="mailto:tom@getcanon.io"
              className="text-canon-ink underline-offset-2 hover:text-canon-green hover:underline"
            >
              tom@getcanon.io
            </a>
          </div>

          <div className="mt-10 rounded-[4px] border border-canon-line bg-canon-paper p-5">
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
              Once we&apos;re past the partnership stage
            </div>
            <p className="mt-2 text-[14px] leading-[1.6] text-quest-ink-muted">
              The longer-form appendix lays out the methodology, integration,
              decision-trace examples and commercial detail we&apos;d use
              for a measured pilot. Worth a look if your team wants the
              technical and compliance picture.
            </p>
            <Link
              href="/proposals/gamblr"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-canon-green hover:text-canon-ink"
            >
              Read the appendix
              <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="mt-10 text-[12px] leading-[1.55] text-quest-ink-faint">
            Confidential. Prepared for Gamblr. Please do not share externally
            without permission.
          </p>
        </footer>
      </article>
    </main>
  )
}

function Block({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 border-t border-canon-line pt-8">
      <h2 className="text-[18px] font-semibold tracking-[-0.005em] text-canon-ink">
        {heading}
      </h2>
      <div className="mt-3 text-[16px] leading-[1.65] text-quest-ink-muted">
        {children}
      </div>
    </section>
  )
}

function ProposalList({
  items,
}: {
  items: Array<{ lead: string; body: string }>
}) {
  return (
    <ul className="m-0 flex flex-col gap-3.5 p-0">
      {items.map((item) => (
        <li
          key={item.lead}
          className="flex items-baseline gap-3 text-[16px] leading-[1.65] text-quest-ink-muted"
        >
          <span
            aria-hidden
            className="font-mono text-[14px] text-canon-green"
          >
            —
          </span>
          <span>
            <span className="font-semibold text-canon-ink">{item.lead}</span>{" "}
            {item.body}
          </span>
        </li>
      ))}
    </ul>
  )
}
