"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"
import { TopBar } from "@/components/TopBar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  // Close on Escape.
  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [navOpen])

  return (
    <div className="flex h-full">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenu={() => setNavOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-quest-bg p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
