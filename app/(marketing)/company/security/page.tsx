import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { CapabilityGrid } from "@/components/marketing/CapabilityGrid"
import { FAQAccordion } from "@/components/marketing/FAQAccordion"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"

export const metadata = {
  title: "Security — Canon",
  description:
    "How Canon handles operator data: encryption, access control, residency, sub-processors, and incident response. Honest about what we have and what's in flight.",
}

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Security"
        title="How Canon handles operator data."
        subtitle="Operators trust Canon with player and financial data. This page is a complete and honest summary of how we protect it — what we do today, what we're building, and what we don't yet do."
      />

      <SectionShell tone="white" eyebrow="Status" title="Where we are today.">
        <div className="rounded-2xl border border-quest-ink/10 bg-quest-warning-soft/40 p-6">
          <div className="text-[13px] text-quest-ink leading-relaxed">
            <strong>Honest disclosure:</strong> Canon is pre-SOC 2. We are
            scoping a SOC 2 Type I audit with a target completion in Q1 2027,
            and Type II reporting period to follow. ISO 27001 and PCI scoping is
            on the roadmap. Until those audits complete we publish our actual
            controls — see below — rather than a logo wall.
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="cream" eyebrow="Controls" title="What's in place today.">
        <CapabilityGrid
          items={[
            {
              title: "Encryption in transit and at rest",
              body: "TLS 1.2+ everywhere, AES-256 at rest. Customer data is encrypted with per-tenant keys.",
            },
            {
              title: "Least-privilege access",
              body: "Production access is scoped, time-bound, and audit-logged. No broad standing access; ad-hoc grants expire.",
            },
            {
              title: "EU/UK data residency by default",
              body: "Customer data lives in EU or UK regions by default. US and APAC available on Enterprise.",
            },
            {
              title: "Per-decision audit trail",
              body: "Every decision is logged with inputs, signals, policy version, score, and shipped action. Logs retained per your DPA.",
            },
            {
              title: "Vendor sub-processors disclosed",
              body: "Full sub-processor list available on request. We pre-notify customers of any material changes.",
            },
            {
              title: "Incident response playbook",
              body: "24-hour notification to affected operators on any confirmed data incident. Quarterly tabletop exercises.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="white" eyebrow="In flight" title="What we're building next.">
        <CapabilityGrid
          columns={2}
          items={[
            {
              title: "SOC 2 Type I",
              body: "Audit kickoff Q3 2026, Type I report targeted Q1 2027.",
            },
            {
              title: "SOC 2 Type II",
              body: "Six-month observation window starts on Type I completion. Type II report H2 2027.",
            },
            {
              title: "ISO 27001",
              body: "Scoping in parallel with SOC 2. Target certification H2 2027.",
            },
            {
              title: "Single-tenant inference (Enterprise)",
              body: "Available now for jurisdictionally-isolated deployments. Default offering on Enterprise plan.",
            },
          ]}
        />
      </SectionShell>

      <SectionShell tone="cream" eyebrow="FAQ" title="Procurement-grade questions.">
        <FAQAccordion
          items={[
            {
              q: "Can I see your sub-processor list?",
              a: "Yes — full list shared under NDA during procurement. We pre-notify customers of any material change with at least 30 days' notice.",
            },
            {
              q: "Where is data stored?",
              a: "EU and UK by default, with US and APAC regions available on Enterprise. Single-tenant inference is available for operators that need data isolation by jurisdiction.",
            },
            {
              q: "Do you sign a DPA?",
              a: "Yes. Standard DPA on Scale and Enterprise. Custom DPA on Enterprise.",
            },
            {
              q: "How do you handle data deletion requests?",
              a: "Operators can request bulk or per-player deletion via the dashboard or API. Deletions complete within 30 days, with confirmation and audit log.",
            },
            {
              q: "Are you SOC 2 / ISO 27001 / PCI certified?",
              a: "Not yet. SOC 2 Type I targeted Q1 2027, Type II H2 2027. ISO 27001 scoping in parallel. PCI is out of scope (we don't handle card data; payments flow through your provider).",
            },
            {
              q: "What's your incident response SLA?",
              a: "24-hour notification to affected operators on any confirmed data incident. Quarterly tabletop exercises.",
            },
          ]}
        />
      </SectionShell>

      <CalloutBanner
        title="Need a security review for procurement?"
        body="We have a procurement pack ready — security questionnaire responses, sub-processor list, DPA template — available on request."
        primaryCta={{ label: "Request the pack", href: "/contact" }}
        secondaryCta={{ label: "Read about safety in product", href: "/product/safety" }}
      />
    </>
  )
}
