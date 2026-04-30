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

    // Prefer scrolling to the email input itself so the form is in view.
    // Fall back to the section if the form isn't on the page.
    const input = document.getElementById("demo-email") as HTMLInputElement | null
    const section = document.getElementById("demo")
    const target = input ?? section
    if (!target) return

    e.preventDefault()

    // Aim a little above the input so the heading stays visible too.
    const VIEWPORT_HEADROOM = 180
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      STICKY_HEADER_OFFSET -
      (input ? VIEWPORT_HEADROOM : 0)
    window.scrollTo({ top, behavior: "smooth" })

    // Focus the email input once the smooth scroll settles.
    if (input) {
      window.setTimeout(() => input.focus({ preventScroll: true }), 600)
    }

    history.replaceState(null, "", "#demo")
  }

  return (
    <a href="#demo" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
