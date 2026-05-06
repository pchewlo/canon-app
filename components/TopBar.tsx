'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Bell, Plus, User, Settings, HelpCircle, LogOut, Menu } from "lucide-react"
import Link from "next/link"

type Props = {
  onMenu?: () => void
}

export function TopBar({ onMenu }: Props) {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-card px-3 sm:px-5">
      {/* Mobile: hamburger + wordmark on the left. Hidden on lg+. */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted active:bg-quest-surface-muted"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
        <span
          className="text-quest-accent uppercase"
          style={{
            fontFamily:
              'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.26em",
            lineHeight: 1,
          }}
        >
          Canon
        </span>
      </div>

      {/* Spacer pushes the actions right on lg+ where the sidebar already
          shows the brand. */}
      <div className="hidden lg:block lg:flex-1" />

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link href="/app/strategies/new">
          <Button
            size="sm"
            className="h-9 gap-1.5 bg-quest-accent text-white hover:bg-quest-accent/90 text-[13px] sm:h-8"
            aria-label="Create strategy"
          >
            <Plus size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Create strategy</span>
          </Button>
        </Link>
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted transition-colors sm:h-8 sm:w-8"
        >
          <Search size={16} strokeWidth={1.5} />
        </button>
        <button
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted transition-colors sm:h-8 sm:w-8"
        >
          <Bell size={16} strokeWidth={1.5} />
        </button>

        {/* Avatar dropdown */}
        <div ref={avatarRef} className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            aria-label="Account menu"
            aria-expanded={avatarOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-quest-surface-muted text-quest-ink-faint sm:h-8 sm:w-8"
          >
            <User size={14} strokeWidth={1.5} />
          </button>
          {avatarOpen && (
            <div className="absolute top-full right-0 z-50 mt-1 w-[200px] rounded-lg border border-border bg-card py-1 shadow-sm">
              <div className="px-3 py-2">
                <span className="text-[13px] font-bold text-quest-ink">Parlour</span>
              </div>
              <div className="mx-2 border-t border-border" />
              <Link
                href="/app/settings"
                onClick={() => setAvatarOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-quest-ink-muted hover:bg-quest-surface-muted transition-colors"
              >
                <Settings size={14} strokeWidth={1.5} />
                Settings
              </Link>
              <button
                className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-quest-ink-muted hover:bg-quest-surface-muted transition-colors"
              >
                <HelpCircle size={14} strokeWidth={1.5} />
                Help & support
              </button>
              <button
                className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-quest-ink-muted hover:bg-quest-surface-muted transition-colors"
              >
                <LogOut size={14} strokeWidth={1.5} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
