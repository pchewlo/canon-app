'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Bell, Plus, User, Settings, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"

export function TopBar() {
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
    <header className="flex h-14 shrink-0 items-center justify-end border-b border-border bg-card px-5">
      <div className="flex items-center gap-2">
        <Link href="/app/strategies/new">
          <Button
            size="sm"
            className="h-8 gap-1.5 bg-quest-accent text-white hover:bg-quest-accent/90 text-[13px]"
          >
            <Plus size={14} strokeWidth={2} />
            Create strategy
          </Button>
        </Link>
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted transition-colors">
          <Search size={16} strokeWidth={1.5} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-quest-ink-muted hover:bg-quest-surface-muted transition-colors">
          <Bell size={16} strokeWidth={1.5} />
        </button>

        {/* Avatar dropdown */}
        <div ref={avatarRef} className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-quest-surface-muted text-quest-ink-faint"
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
