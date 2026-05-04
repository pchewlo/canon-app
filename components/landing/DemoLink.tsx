"use client"

import type { MouseEvent, ReactNode } from "react"

const STICKY_HEADER_OFFSET = 56 // .h-14 sticky landing nav

type Props = {
  children: ReactNode
  className?: string
}

export function DemoLink({ children, className }: Props) {
  // Cross-page: if no #demo on the current page, the browser will
  // follow the href "/#demo" — landing page picks it up on load.
  // Same-page: intercept click, smooth-scroll, focus the input.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

    const input = document.getElementById("demo-email") as HTMLInputElement | null
    const section = document.getElementById("demo")
    const target = input ?? section

    // No demo section on this page — let the browser navigate to /#demo.
    if (!target) return

    e.preventDefault()

    const VIEWPORT_HEADROOM = 180
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      STICKY_HEADER_OFFSET -
      (input ? VIEWPORT_HEADROOM : 0)
    window.scrollTo({ top, behavior: "smooth" })

    if (input) {
      window.setTimeout(() => input.focus({ preventScroll: true }), 600)
    }

    history.replaceState(null, "", "#demo")
  }

  return (
    <a href="/#demo" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
