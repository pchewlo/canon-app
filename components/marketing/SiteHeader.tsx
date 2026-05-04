"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { DemoLink } from "@/components/landing/DemoLink"
import { Wordmark } from "@/components/marketing/typography"

type NavItem = {
  label: string
  href: string
  description?: string
}

type NavSection = {
  label: string
  href?: string
  items?: NavItem[]
}

const NAV: NavSection[] = [
  {
    label: "Product",
    items: [
      {
        label: "Decisioning",
        href: "/product/decisioning",
        description: "The core agent runtime",
      },
      {
        label: "Strategies",
        href: "/product/strategies",
        description: "Goals, budgets, guardrails",
      },
      {
        label: "Agents",
        href: "/product/agents",
        description: "Per-player agent surface",
      },
      {
        label: "Insights",
        href: "/product/insights",
        description: "Experimentation & lift measurement",
      },
      {
        label: "Safety",
        href: "/product/safety",
        description: "RG checks & audit trail",
      },
      {
        label: "Integrations",
        href: "/product/integrations",
        description: "PAM, CDP, payments, KYC",
      },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Retention", href: "/solutions/retention" },
      { label: "Reactivation", href: "/solutions/reactivation" },
      { label: "VIP management", href: "/solutions/vip-management" },
      { label: "Welcome optimisation", href: "/solutions/welcome-optimisation" },
      { label: "Bonus-abuse defence", href: "/solutions/bonus-abuse-defence" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "iGaming", href: "/industries/igaming" },
      { label: "Crypto trading", href: "/industries/crypto-trading" },
      { label: "Prediction markets", href: "/industries/prediction-markets" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Compare",
    items: [
      { label: "vs Optimove", href: "/compare/canon-vs-optimove" },
      { label: "vs Smartico", href: "/compare/canon-vs-smartico" },
      { label: "vs Solitics", href: "/compare/canon-vs-solitics" },
      { label: "vs xtremepush", href: "/compare/canon-vs-xtremepush" },
      { label: "vs OptiKPI", href: "/compare/canon-vs-optikpi" },
      { label: "vs in-house tools", href: "/compare/canon-vs-in-house" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/company/about" },
      { label: "Security", href: "/company/security" },
      { label: "Trust", href: "/company/trust" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)

  // Close menu on route change
  useEffect(() => {
    setOpenSection(null)
  }, [pathname])

  const open = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenSection(label)
  }

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenSection(null), 120)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="inline-flex items-center shrink-0">
          <Wordmark size={14} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((section) => {
            const isActive = section.href
              ? pathname === section.href
              : section.items?.some((i) => pathname.startsWith(i.href)) ?? false
            const isOpen = openSection === section.label

            if (!section.items) {
              return (
                <Link
                  key={section.label}
                  href={section.href ?? "#"}
                  className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "text-quest-ink"
                      : "text-quest-ink-muted hover:text-quest-ink"
                  }`}
                >
                  {section.label}
                </Link>
              )
            }

            return (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => open(section.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive || isOpen
                      ? "text-quest-ink"
                      : "text-quest-ink-muted hover:text-quest-ink"
                  }`}
                  onClick={() =>
                    setOpenSection(isOpen ? null : section.label)
                  }
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {section.label}
                </button>

                {isOpen && (
                  <div
                    className="absolute left-0 top-full pt-2"
                    onMouseEnter={() => open(section.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="w-[320px] rounded-lg border border-border bg-white p-2 shadow-[0_20px_50px_-20px_rgba(26,35,50,0.18)]">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-[13px] hover:bg-quest-surface-muted"
                        >
                          <div className="font-medium text-quest-ink">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="mt-0.5 text-[12px] text-quest-ink-muted">
                              {item.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="hidden md:inline text-[13px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            Sign in
          </Link>
          <DemoLink className="inline-flex items-center rounded-md bg-quest-accent px-3 py-1.5 text-[13px] font-medium text-white hover:bg-quest-accent/90 transition-colors">
            Request a demo
          </DemoLink>
        </div>
      </div>
    </header>
  )
}
