import Link from "next/link"
import { Wordmark } from "@/components/marketing/typography"

type FooterLink = { label: string; href: string }
type FooterColumn = { title: string; links: FooterLink[] }

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Decisioning", href: "/product/decisioning" },
      { label: "Strategies", href: "/product/strategies" },
      { label: "Agents", href: "/product/agents" },
      { label: "Insights", href: "/product/insights" },
      { label: "Safety", href: "/product/safety" },
      { label: "Integrations", href: "/product/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Retention", href: "/solutions/retention" },
      { label: "Reactivation", href: "/solutions/reactivation" },
      { label: "VIP management", href: "/solutions/vip-management" },
      { label: "Welcome optimisation", href: "/solutions/welcome-optimisation" },
      { label: "Bonus-abuse defence", href: "/solutions/bonus-abuse-defence" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "iGaming", href: "/industries/igaming" },
      { label: "Crypto trading", href: "/industries/crypto-trading" },
      { label: "Prediction markets", href: "/industries/prediction-markets" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-x-8">
          <div className="col-span-2 md:col-span-1">
            <Wordmark size={13} />
            <p className="mt-3 max-w-[220px] text-[12px] leading-relaxed text-quest-ink-faint">
              The agentic platform for player bonuses.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-quest-ink-faint">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-quest-ink-muted hover:text-quest-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="text-[12px] text-quest-ink-faint">
            © {year} Canon. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-quest-ink-muted">
            <Link href="/privacy" className="hover:text-quest-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-quest-ink transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-quest-ink transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
