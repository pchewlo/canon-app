"use client"

import type { MouseEvent, ReactNode } from "react"

const STICKY_HEADER_OFFSET = 56 // .h-14 sticky landing nav

type Props = {
  children: ReactNode
  className?: string
}

export function DemoLink({ children, className }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Honour modifier-clicks (open in new tab etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const target = document.getElementById("demo")
    if (!target) return
    e.preventDefault()
    const top =
      target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET
    window.scrollTo({ top, behavior: "smooth" })
    // Update the URL hash without forcing a jump
    history.replaceState(null, "", "#demo")
  }

  return (
    <a href="#demo" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
