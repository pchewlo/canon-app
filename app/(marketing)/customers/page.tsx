import Link from "next/link"
import { CalloutBanner } from "@/components/marketing/CalloutBanner"
import { PageHero } from "@/components/marketing/PageHero"
import { SectionShell } from "@/components/marketing/SectionShell"

export const metadata = {
  title: "Customers — Canon",
  description:
    "Canon is currently piloting with a small set of iGaming operators. Real, named case studies will be published as pilots conclude.",
}

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Pilots running. Case studies in flight."
        subtitle="Canon is currently in pilot with a small set of iGaming operators. We don't publish customer logos or named case studies until the operator can attribute lift on their own data and is happy to be quoted."
      />

      <SectionShell tone="cream" maxWidth="4xl">
        <div className="rounded-2xl border border-quest-ink/10 bg-white p-7">
          <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-quest-ink-faint">
            Currently in pilot
          </div>
          <div className="mt-2 text-[15px] text-quest-ink leading-relaxed">
            <strong>Honest disclosure:</strong> we are in active pilot with{" "}
            <strong>under five operators</strong> as of mid-2026. Anonymised
            quotes from those pilots appear on the homepage and in product
            pages where relevant. Named case studies will publish here as
            pilots conclude and operators consent to attribution.
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/product/decisioning"
              className="text-[13px] font-medium text-quest-accent hover:text-quest-ink transition-colors"
            >
              See the product →
            </Link>
            <Link
              href="/pricing"
              className="text-[13px] font-medium text-quest-accent hover:text-quest-ink transition-colors"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </SectionShell>

      <CalloutBanner
        title="Want to be the case study?"
        body="We're onboarding a small number of operators on pilot terms. Tell us your bonus spend and the metric you want to lift."
        primaryCta={{ label: "Book a call", href: "/book-call" }}
        secondaryCta={{ label: "Read about the company", href: "/company/about" }}
      />
    </>
  )
}
