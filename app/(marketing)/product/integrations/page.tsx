import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { LogoCloud } from "@/components/marketing/LogoCloud"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"
import { IntegrationsFlowAnimation } from "@/components/marketing/animations/IntegrationsFlowAnimation"

export const metadata = {
  title: "Integrations — Canon",
  description:
    "Canon plugs into the operator stack you already run — PAM, CDP, payments, KYC, data warehouse. Read events. Ship decisions. No replatforming.",
}

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product · Integrations"
        title="Plug into the operator stack you already run."
        subtitle="Canon reads from your PAM, CDP, payments, and KYC systems, and ships decisions back through your fulfilment pipeline. No replatforming, no green-field rebuild."
        media={<IntegrationsFlowAnimation />}
      />

      <SectionShell tone="white" maxWidth="6xl">
        <LogoCloud
          caption="Operator-stack categories Canon connects to today"
          logos={[
            { label: "PAM platforms" },
            { label: "CDPs" },
            { label: "Payments" },
            { label: "KYC providers" },
            { label: "Data warehouses" },
            { label: "Comms platforms" },
          ]}
        />
      </SectionShell>

      <SectionShell
        tone="cream"
        eyebrow="What we connect to"
        title="One side reads events. The other ships decisions."
      >
        <CapabilityGrid
          items={[
            {
              title: "Player Account Management",
              body: "Real-time event ingestion from your PAM. Canon reads logins, deposits, sessions, wagers, withdrawals — and writes bonuses, missions, and cooldowns back via the same channel.",
            },
            {
              title: "Customer Data Platforms",
              body: "Canon enriches its per-player profile with traits from your CDP, and emits decision-level events back so downstream channels stay in sync.",
            },
            {
              title: "Payments & wallets",
              body: "Reads deposit attempts, declines, and withdrawal requests for risk and elasticity signals. Writes bonus balances back through the same provider.",
            },
            {
              title: "KYC & identity",
              body: "Honours KYC status, age verification, and sanctions checks before any decision ships. Self-excluded players are atomically excluded.",
            },
            {
              title: "Data warehouse",
              body: "Daily exports of decisions, signals, and lift attribution to BigQuery, Snowflake, Redshift, or Postgres. Operators query Canon data in their own BI stack.",
            },
            {
              title: "Comms & fulfilment",
              body: "Canon decides the action; your fulfilment pipeline delivers it (email, in-app, SMS, push). We trigger; we don't replace your CRM channel orchestration.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="FAQ" title="Integrations, in detail.">
        <FAQAccordion
          items={[
            {
              q: "How long does integration take?",
              a: "A pilot integration takes 2–4 weeks: event-stream connection, fulfilment writeback, and warehouse export. Production rollout depends on your change-management process — typically 6–10 weeks end-to-end.",
            },
            {
              q: "Do you have prebuilt connectors?",
              a: "We have prebuilt event/decision adapters for most major PAM and CDP platforms. Where a connector doesn't exist, we ship one in roughly 2 weeks.",
            },
            {
              q: "What about real-time vs batch ingestion?",
              a: "Canon needs real-time event ingestion for the engine to make per-event decisions. Warehouse-level enrichment can be batch (nightly).",
            },
            {
              q: "Where does Canon run?",
              a: "EU and UK by default, US and APAC on Enterprise. Single-tenant inference is available for operators that need data isolation by jurisdiction.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Tell us your stack — we'll tell you the integration plan."
        body="Most operators are integrated in 2–4 weeks for a pilot. We'll come back with a written plan in 48 hours."
        primaryCta={{ label: "Request a demo", href: "#demo" }}
        secondaryCta={{ label: "Talk to engineering", href: "/contact" }}
      />
    </>
  )
}
