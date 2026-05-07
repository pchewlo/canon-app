"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { DemoLink } from "@/components/landing/DemoLink"
import { Wordmark } from "@/components/marketing/typography"

type NavItem = {
  label: string
  href: string
  description?: string
  comingSoon?: boolean
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
      { label: "Prediction markets", href: "#", comingSoon: true },
    ],
  },
  { label: "Pricing", href: "/pricing" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)

  // Close menus on route change
  useEffect(() => {
    setOpenSection(null)
    setMobileOpen(false)
  }, [pathname])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  // Close on Escape (mobile menu)
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [mobileOpen])

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
                      {section.items.map((item) => {
                        if (item.comingSoon) {
                          return (
                            <div
                              key={item.label}
                              className="block rounded-md px-3 py-2 text-[13px] cursor-default"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-quest-ink-faint">
                                  {item.label}
                                </span>
                                <span className="rounded-full bg-quest-warning-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-quest-warning">
                                  Coming soon
                                </span>
                              </div>
                              {item.description && (
                                <div className="mt-0.5 text-[12px] text-quest-ink-faint">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          )
                        }
                        return (
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
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/app"
            className="hidden md:inline text-[13px] font-medium text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            Sign in
          </Link>
          <DemoLink className="inline-flex items-center rounded-[4px] bg-canon-navy px-3 py-1.5 text-[13px] font-medium text-white hover:bg-canon-navy/90 transition-colors">
            Book a call
          </DemoLink>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted lg:hidden"
          >
            <Menu size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />
      )}
    </header>
  )
}

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string
  onClose: () => void
}) {
  return (
    <div className="lg:hidden fixed inset-0 z-[60] bg-canon-paper">
      <div className="flex h-14 items-center justify-between border-b border-border px-6">
        <Link
          href="/"
          onClick={onClose}
          className="inline-flex items-center shrink-0"
        >
          <Wordmark size={14} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted"
        >
          <X size={18} strokeWidth={1.6} />
        </button>
      </div>

      <nav className="mx-auto h-[calc(100svh-56px)] max-w-2xl overflow-y-auto px-6 pb-24 pt-6">
        {NAV.map((section) => {
          if (!section.items) {
            const isActive = pathname === section.href
            return (
              <Link
                key={section.label}
                href={section.href ?? "#"}
                onClick={onClose}
                className={`flex items-center justify-between border-t border-canon-line py-4 text-[18px] font-semibold tracking-[-0.005em] ${
                  isActive ? "text-canon-green" : "text-canon-ink"
                }`}
              >
                {section.label}
                <span aria-hidden className="text-quest-ink-faint">
                  →
                </span>
              </Link>
            )
          }

          return (
            <div
              key={section.label}
              className="border-t border-canon-line py-5"
            >
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
                {section.label}
              </div>
              <div className="mt-3 flex flex-col">
                {section.items.map((item) => {
                  if (item.comingSoon) {
                    return (
                      <div
                        key={item.label}
                        className="flex items-baseline gap-2 py-2.5 text-[15px] text-quest-ink-faint"
                      >
                        {item.label}
                        <span className="rounded-full bg-quest-warning-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-quest-warning">
                          Coming soon
                        </span>
                      </div>
                    )
                  }
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between py-2.5 text-[15px] ${
                        isActive
                          ? "text-canon-green font-semibold"
                          : "text-canon-ink"
                      }`}
                    >
                      {item.label}
                      <span aria-hidden className="text-quest-ink-faint">
                        →
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className="mt-6 border-t border-canon-line pt-6">
          <Link
            href="/app"
            onClick={onClose}
            className="block py-2 text-[15px] font-medium text-canon-ink"
          >
            Sign in
          </Link>
          <Link
            href="/book-call"
            onClick={onClose}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-canon-navy px-5 text-[14px] font-semibold text-white"
          >
            Book a call
          </Link>
        </div>
      </nav>
    </div>
  )
}
