'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Target,
  Bot,
  Lightbulb,
  FileText,
  Shield,
  X,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "Strategies", href: "/app/strategies", icon: Target },
  { label: "Agents", href: "/app/agents", icon: Bot },
  { label: "Insights", href: "/app/insights", icon: Lightbulb },
  { label: "Templates", href: "/app/templates", icon: FileText },
  { label: "Safety", href: "/app/safety", icon: Shield },
]

type Props = {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = false, onClose }: Props) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/app") return pathname === "/app"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Backdrop — mobile only, only when open */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border bg-card transition-transform duration-200 ease-out lg:static lg:w-[220px] lg:shrink-0 lg:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:shadow-none"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <span
            className="text-quest-accent uppercase"
            style={{
              fontFamily: 'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.26em',
              lineHeight: 1,
            }}
          >
            Canon
          </span>
          {/* Close button — mobile only */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="-mr-1.5 flex h-8 w-8 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted lg:hidden"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-quest-surface-muted text-quest-ink font-medium"
                    : "text-quest-ink-muted hover:bg-quest-surface-muted hover:text-quest-ink"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
