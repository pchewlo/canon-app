import type { OperatorConfig } from "@/lib/appendix/operators"
import { PowerPlanner } from "./PowerPlanner"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { DecisionTraceCard, type DecisionTrace } from "./DecisionTraceCard"

const CURRENCY_SYMBOL: Record<OperatorConfig["currency"], string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
}

const TOC = [
  { id: "methodology", label: "Methodology" },
  { id: "integration", label: "Integration architecture" },
  { id: "security", label: "Data, security, RG" },
  { id: "decision-traces", label: "Decision trace examples" },
  { id: "commercial", label: "Commercial detail" },
] as const

export function Appendix({ config }: { config: OperatorConfig }) {
  const symbol = CURRENCY_SYMBOL[config.currency]
  const lastUpdated = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date())

  return (
    <main className="bg-canon-cream text-canon-ink">
      <Header config={config} />
      <Intro config={config} />
      <Methodology config={config} symbol={symbol} />
      <Integration config={config} />
      <Security />
      <DecisionTraces config={config} symbol={symbol} />
      <Commercial config={config} />
      <Footer config={config} lastUpdated={lastUpdated} />
    </main>
  )
}

// ============================================================================
// 1 — Header
// ============================================================================

function Header({ config }: { config: OperatorConfig }) {
  return (
    <section className="border-b border-canon-line">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8 sm:px-8 sm:py-10">
        <span
          className="text-canon-navy uppercase"
          style={{
            fontFamily:
              'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.26em",
            lineHeight: 1,
          }}
        >
          Canon
        </span>
        <span
          className="font-brand text-[18px] tracking-[-0.005em] text-canon-ink sm:text-[20px]"
        >
          {config.name}
        </span>
      </div>
    </section>
  )
}

// ============================================================================
// 2 — What this document is
// ============================================================================

function Intro({ config }: { config: OperatorConfig }) {
  return (
    <section className="border-b border-canon-line">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          Pilot proposal appendix · Confidential · {config.preparedDate}
        </p>
        <h1
          className="mt-4 text-balance font-semibold leading-[1.1] tracking-[-0.022em] text-canon-ink"
          style={{ fontSize: "clamp(32px, 6vw, 48px)" }}
        >
          The detail behind the 1-pager.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.65] text-quest-ink-muted">
          This appendix expands on the 1-page pilot proposal sent to{" "}
          {config.name}. It contains the operational, technical, and
          methodological detail your team will want to evaluate before
          agreeing to a pilot. Read it in full, or jump to the section
          relevant to your role using the table of contents below.
        </p>

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-canon-line pt-8 sm:grid-cols-2">
          {TOC.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-baseline justify-between gap-4 py-1.5 text-[15px] text-canon-ink transition-colors hover:text-canon-green"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-semibold tabular-nums tracking-[0.14em] text-quest-ink-faint group-hover:text-canon-green">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className="text-quest-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-canon-green"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ============================================================================
// 3 — Methodology
// ============================================================================

function Methodology({
  config,
  symbol,
}: {
  config: OperatorConfig
  symbol: string
}) {
  return (
    <Section id="methodology" eyebrow="03 · Methodology" title="How we measure lift.">
      <SubHeading>What we measure</SubHeading>
      <Body>
        <strong>Bonus ROI</strong> is the total GGR generated by players in
        the test cohort during the 30-day window following each bonus
        issuance, divided by the total bonus value issued. The arm-level ROI
        is the average across all per-bonus observations.
      </Body>
      <Body>
        <em>Worked example.</em> On day 7 of the pilot, the Canon arm issues{" "}
        {symbol}3,200 of bonuses across 160 players. Over the next 30 days,
        those 160 players generate {symbol}9,920 in GGR. The day-7 Canon ROI
        is {symbol}9,920 ÷ {symbol}3,200 = <strong>3.10×</strong>. That
        observation joins the running average for the Canon arm. The same
        calculation, on the same day, runs in parallel for the control arm.
      </Body>

      <SubHeading>How we measure significance</SubHeading>
      <Body>
        We compare the two arms with a two-sample t-test on per-bonus ROI
        observations, at a 95% confidence interval and 80% statistical
        power.
      </Body>
      <Body>
        <em>Plain-English version.</em> A 95% confidence interval means the
        result is unlikely (under 5%) to have arisen by chance. 80% power
        means that if Canon really is delivering a meaningful lift, this
        test design will detect it 80% of the time — we&apos;re unlikely to
        miss it.
      </Body>

      <SubHeading>Random assignment and locking</SubHeading>
      <Body>
        Every player is randomly assigned to Canon or control at the start
        of the pilot, using a deterministic hash of their player ID so the
        assignment is reproducible and auditable. Once assigned, players
        stay in their arm for the full pilot — no crossover. New players
        registering during the pilot are assigned at registration. Players
        cannot opt out of the test, but Canon honours all RG flags and
        self-exclusion regardless of arm.
      </Body>

      <SubHeading>Attribution window</SubHeading>
      <Body>
        Each bonus is attributed to a 30-day forward window from issuance.
        GGR generated by that player in those 30 days is divided by the
        bonus value to produce one ROI observation. The arm-level ROI is
        the average across observations.
      </Body>

      <div className="mt-8">
        <PowerPlanner config={config} />
      </div>
    </Section>
  )
}

// ============================================================================
// 4 — Integration architecture
// ============================================================================

function Integration({ config }: { config: OperatorConfig }) {
  return (
    <Section
      id="integration"
      eyebrow="04 · Integration"
      title="What Canon reads, what it writes, and where it lives."
    >
      <SubHeading>What Canon reads</SubHeading>
      <Body>
        Canon needs a real-time read on the player and the events around
        them. None of this leaves the operator&apos;s infrastructure as raw
        PII — it&apos;s referenced by anonymous IDs throughout.
      </Body>
      <ListWithBadge
        required={[
          "Player profile — anonymised ID, registration date, RG status, VIP tier",
          "Session events — login, logout, game played, stake size, win/loss",
          "Deposit and withdrawal events",
          "Bonus history",
          "Current account balance",
        ]}
        niceToHave={[
          "Device / channel signal (mobile vs. desktop, app vs. web)",
          "Promo-code provenance (organic vs. affiliate vs. paid)",
        ]}
      />

      <SubHeading>What Canon writes</SubHeading>
      <UnorderedList
        items={[
          "Bonus issuance commands",
          "Communication triggers (push, email, in-app)",
          "Session-level holds and cooldowns",
          "Escalations to manual review",
        ]}
      />

      <SubHeading>Where Canon lives</SubHeading>
      <Body>
        Canon runs on Anthropic Claude API behind Vercel infrastructure,
        with player data processed in EU regions by default. Canon does not
        store PII beyond the in-flight decision cycle; raw data stays in
        your systems. Decision logs are anonymised and retained for audit.
      </Body>

      <SubHeading>How Canon connects</SubHeading>
      <UnorderedList
        items={[
          "Direct API integration with the operator's player platform.",
          "Webhook-based integration with an existing CRM (e.g., Smartico-style triggers).",
          "Replica DB read access — for operators that prefer not to expose write-API access during the pilot.",
        ]}
      />
      <Body>
        The pilot uses whichever pattern is fastest to set up at{" "}
        {config.name}. Default is direct API.
      </Body>

      {config.techStack.length > 0 && (
        <>
          <SubHeading>Compatibility with your stack</SubHeading>
          <Body>
            Your stack as we understand it:
          </Body>
          <UnorderedList items={config.techStack} />
          <Body>
            Canon is integration-agnostic at the bonus-issuance layer — it
            issues decisions through whichever path your platform exposes.
            None of the components above require replacement.
          </Body>
        </>
      )}

      <div className="mt-8">
        <ArchitectureDiagram />
      </div>
    </Section>
  )
}

// ============================================================================
// 5 — Data handling, security, and RG
// ============================================================================

function Security() {
  return (
    <Section
      id="security"
      eyebrow="05 · Data, security, RG"
      title="What we hold, where it lives, and what we honour."
    >
      <DataGrid
        rows={[
          ["Data residency", "EU region by default. Other regions on request."],
          [
            "PII handling",
            "No personally identifiable information retained after a decision is made. Player identity is referenced by anonymous IDs throughout the pipeline. Names, emails, and contact details never leave the operator's infrastructure.",
          ],
          [
            "Data retention",
            "Decision logs (anonymised) retained for 12 months for audit. Raw operator data is read-through, not persisted.",
          ],
          [
            "Audit trail",
            "Every decision is logged with timestamp, player ID, signal inputs, decision rationale, and outcome. Operator has full access via API or dashboard.",
          ],
          [
            "Security",
            "SOC 2 Type II in progress (target: end of 2026). Independent penetration testing scheduled. Vulnerability disclosure: security@getcanon.io.",
          ],
        ]}
      />

      <SubHeading>Responsible Gambling</SubHeading>
      <Body>
        Canon respects every operator-set RG flag and every self-exclusion
        list. Specifically:
      </Body>
      <UnorderedList
        items={[
          "Self-excluded players never receive bonuses — regardless of arm assignment.",
          "Players flagged at risk receive cooling-off treatment, never re-engagement bonuses.",
          "Players hitting deposit or session limits are honoured before any Canon action.",
          "Canon's decision system can be overridden in real time by your RG team.",
        ]}
      />

      <SubHeading>Compliance posture</SubHeading>
      <Body>
        Canon is designed to operate in regulated markets and respects
        UKGC, MGA, and Anjouan licensing requirements where they apply. We
        support compliance audits and can provide our decision logs to
        regulators on request.
      </Body>
    </Section>
  )
}

// ============================================================================
// 6 — Decision trace examples
// ============================================================================

function DecisionTraces({
  config,
  symbol,
}: {
  config: OperatorConfig
  symbol: string
}) {
  const traces: DecisionTrace[] = [
    {
      player:
        "Player #4827 · VIP tier 3 · primary game blackjack · 18-month tenure",
      signal:
        "Session length declining 40% over 14 days; deposit cadence dropped from weekly to monthly; last login eight days ago.",
      reasoning:
        "Churn pattern consistent with mid-VIP fatigue. Historical playbook: stake-matched bonus on the player's preferred game has 38% retention success rate at this tier. The player accepted a similar offer 11 months ago.",
      decision: `Push ${symbol}200 stake-matched bonus, blackjack-specific, 7-day expiry, 5× rollover.`,
      safetyCheck:
        "RG tier green. No cooling-off period active. Within monthly bonus budget (Canon arm).",
      outcome: `Returned within 4 days. 23 sessions over 28 days. ${symbol}640 GGR. Bonus ROI ${symbol}3.20×.`,
    },
    {
      player:
        "Player #9013 · VIP tier 4 · primary product live casino · 26-month tenure",
      signal:
        "Q1 GGR up 22% YoY, but 14-day deposit volume slipped 8%. VIP manager's manual cashback queue is six weeks deep.",
      reasoning:
        "Player elasticity is low (VIP tier 4); a percentage cashback at the standard rate produces near-zero lift. Historical data favours a small fixed-amount goodwill credit timed to the next session start, with manager attribution preserved for relationship continuity.",
      decision: `${symbol}150 goodwill credit, 30-day expiry, 1× rollover, attributed to assigned VIP manager.`,
      safetyCheck:
        "RG tier green. Within VIP-tier monthly cashback envelope. Manager notified for sign-off — no auto-issue at this tier.",
      outcome: `Manager confirmed within 90 minutes. 17 sessions over the following month. ${symbol}2,140 GGR.`,
    },
    {
      player:
        "Player #2218 · standard tier · slots-only · 4-month tenure",
      signal:
        "Stake size up 3.4× in 48 hours. Session length 4h 12m. Loss-chasing pattern: 11 deposits in the same session, each smaller than the previous. Self-exclusion not active. RG flag: amber.",
      reasoning:
        "All re-engagement signals would normally fire here. They&#39;re overridden. The model identifies the cluster of features that match the loss-chasing playbook and routes the player to a no-action decision plus a soft RG nudge surfaced through the operator's existing comms channel.",
      decision:
        "No bonus. Trigger operator's RG comms playbook (deposit-limit reminder, optional cool-off prompt). Flag the player for review by the operator's RG team within 24 hours.",
      safetyCheck:
        "Override applied because of amber RG flag and loss-chasing detection. Decision logged with full signal trace for the audit.",
      outcome:
        "Player set a £200/day deposit limit themselves the next morning. Two-week session cadence returned to baseline. No further escalation.",
    },
    {
      player:
        "Player #6541 · standard tier · cold for 96 days · acquired via affiliate",
      signal:
        "Long-dormant cohort match. Canon's churn model puts revival likelihood at 11% with no intervention, 27% with a low-cost free-spin offer on the player's last-played game family.",
      reasoning:
        "Expected uplift: 16 percentage points on a base rate of 11% — material. Cost basis is bounded by free-spin rather than cash, which keeps the per-revival economics positive even at low success rates.",
      decision:
        "Free-spin pack (40 spins) on a last-played slot family, 7-day expiry, no cash redemption. No comms beyond a single push.",
      safetyCheck:
        "RG tier green. Player is outside any active self-exclusion cooldown. Within Canon-arm dormant-revival budget (capped at 2% of monthly spend).",
      outcome:
        "Player returned and used 28 of 40 spins. Two follow-on deposits in the next 18 days. Bonus ROI 4.10×.",
    },
  ]

  return (
    <Section
      id="decision-traces"
      eyebrow="06 · Decision traces"
      title="Four worked examples of agent reasoning."
    >
      <Body>
        Anonymised reasoning traces from production policy at peer operators.
        Real bonuses, real outcomes — names and IDs replaced with placeholders.
      </Body>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {traces.map((trace, i) => (
          <DecisionTraceCard key={i} trace={trace} index={i} />
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-[1.55] text-quest-ink-faint">
        The third example is deliberately included: an agent showing
        restraint is more important than an agent showing ambition.
      </p>
    </Section>
  )
}

// ============================================================================
// 7 — Commercial detail
// ============================================================================

function Commercial({ config }: { config: OperatorConfig }) {
  return (
    <Section
      id="commercial"
      eyebrow="07 · Commercial"
      title="What's in scope, and what's out."
    >
      <DataGrid
        rows={[
          [
            "In scope of the 10% fee",
            "Bonus spend issued through Canon during the pilot, and post-pilot, all bonus spend Canon manages. Defined as: any bonus, free spin, cashback, or promotional credit that Canon's agents trigger.",
          ],
          [
            "Out of scope",
            "Acquisition bonuses (sign-up offers, deposit-match welcome packages) — these stay on your existing acquisition flows. Affiliate-driven promotional spend. Manually-overridden VIP gestures issued by your team directly.",
          ],
          [
            "Termination",
            "You can terminate at any time during the pilot or post-pilot, with 30 days' notice. Canon retains the right to terminate if RG protocols are violated or if data access becomes restricted.",
          ],
        ]}
      />

      <SubHeading>Term sheet</SubHeading>
      <Body>
        Full commercial term sheet shared on request, once the pilot is
        verbally agreed.
      </Body>

      {config.commercialNotes && (
        <>
          <SubHeading>Note for {config.name}</SubHeading>
          <Body>{config.commercialNotes}</Body>
        </>
      )}
    </Section>
  )
}

// ============================================================================
// Footer
// ============================================================================

function Footer({
  config,
  lastUpdated,
}: {
  config: OperatorConfig
  lastUpdated: string
}) {
  return (
    <footer className="border-t border-canon-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-12 text-[12px] leading-[1.55] text-quest-ink-faint sm:px-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <a
            href="mailto:tom@getcanon.io"
            className="text-canon-ink hover:text-canon-green"
          >
            tom@getcanon.io
          </a>
          <a
            href="https://www.getcanon.io"
            className="hover:text-canon-ink"
          >
            getcanon.io
          </a>
          <span>Last updated: {lastUpdated}</span>
        </div>
        <p>
          This document is confidential and prepared for {config.name} only.
          Please do not share externally without permission.
        </p>
      </div>
    </footer>
  )
}

// ============================================================================
// Section + content primitives
// ============================================================================

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-b border-canon-line scroll-mt-6">
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
          {eyebrow}
        </p>
        <h2
          className="mt-3 text-balance font-semibold leading-[1.18] tracking-[-0.018em] text-canon-ink"
          style={{ fontSize: "clamp(26px, 4.5vw, 36px)", maxWidth: "26ch" }}
        >
          {title}
        </h2>
        <div className="mt-8 flex flex-col gap-4">{children}</div>
      </div>
    </section>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-[16px] font-semibold tracking-[-0.005em] text-canon-ink first-of-type:mt-0">
      {children}
    </h3>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] leading-[1.65] text-quest-ink-muted">
      {children}
    </p>
  )
}

function UnorderedList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2 text-[15px] leading-[1.6] text-quest-ink-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ListWithBadge({
  required,
  niceToHave,
}: {
  required: string[]
  niceToHave: string[]
}) {
  return (
    <div className="flex flex-col gap-3">
      {required.map((item) => (
        <div
          key={item}
          className="flex items-baseline gap-3 border-b border-canon-line-soft pb-3 last-of-type:border-b-0"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-canon-green">
            Required
          </span>
          <span className="text-[15px] leading-[1.55] text-canon-ink">
            {item}
          </span>
        </div>
      ))}
      {niceToHave.map((item) => (
        <div
          key={item}
          className="flex items-baseline gap-3 border-b border-canon-line-soft pb-3 last-of-type:border-b-0"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
            Nice to have
          </span>
          <span className="text-[15px] leading-[1.55] text-quest-ink-muted">
            {item}
          </span>
        </div>
      ))}
    </div>
  )
}

function DataGrid({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[180px_1fr] sm:gap-x-6">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="border-t border-canon-line pt-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
            {label}
          </dt>
          <dd className="border-t border-canon-line pt-3 text-[15px] leading-[1.6] text-quest-ink-muted">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
