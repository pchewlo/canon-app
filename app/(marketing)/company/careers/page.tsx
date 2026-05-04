import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"

export const metadata = {
  title: "Careers — Canon",
  description:
    "Canon is hiring quietly. If you've shipped per-user decisioning, fraud / RG infra, or sat in a CRM team that hated its tools, get in touch.",
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Careers"
        title="Hiring quietly. Hire-zero-to-one engineers."
        subtitle="Canon is small and angel-backed. We don't post listings until we're sure of the role and the runway. The shortest path in is a well-aimed email."
      />

      <SectionShell tone="cream" eyebrow="Who we want to hear from" title="Three kinds of people.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              title: "Decisioning / ML engineers",
              body: "You've shipped per-user models in production — bandits, contextual recommenders, or RL — and you care about the engineering as much as the modelling.",
            },
            {
              title: "RG / fraud / compliance engineers",
              body: "You've worked inside an iGaming, fintech, or trading operator on RG, AML, or fraud. You know what 'audit-grade' actually has to look like.",
            },
            {
              title: "Ex-CRM operators",
              body: "You've sat in a CRM team and hated your tools. You can write product copy that operators believe because you used to be one.",
            },
          ].map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-quest-ink/10 bg-white p-6"
            >
              <div className="text-[15px] font-semibold text-quest-ink">
                {r.title}
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-quest-ink-muted">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="white" eyebrow="How we work" title="Small, in-person, async-by-default.">
        <ul className="space-y-3 max-w-2xl text-[15px] text-quest-ink leading-relaxed">
          <li>
            <strong>Founders technical and operational.</strong> No gap between
            who builds it and who sells it.
          </li>
          <li>
            <strong>Mostly in-person.</strong> London-based. Hybrid OK once
            you&apos;re past the first 90 days.
          </li>
          <li>
            <strong>High-leverage hires.</strong> Generalists who can ship a
            feature, take a sales call, and write a demo script.
          </li>
          <li>
            <strong>Equity-heavy compensation.</strong> Cash is a bridge to the
            equity story. We tell you the cap table.
          </li>
          <li>
            <strong>No fake roles.</strong> If a job exists on this page, the
            money is in the bank to hire for it.
          </li>
        </ul>
      </SectionShell>

      <CalloutBanner
        title="No open roles right now."
        body="If one of the three personas above is you, send an email and a one-paragraph pitch. We respond to every well-aimed message."
        primaryCta={{ label: "Email the team", href: "/contact" }}
        secondaryCta={{ label: "Read about the company", href: "/company/about" }}
      />
    </>
  )
}
