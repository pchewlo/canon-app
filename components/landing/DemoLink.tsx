// All "Request a demo" / "Book a call" CTAs route to the dedicated
// /book-call page. This component is kept so existing imports keep working —
// it's now a thin wrapper around Next's Link.

import Link from "next/link"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export function DemoLink({ children, className }: Props) {
  return (
    <Link href="/book-call" className={className}>
      {children}
    </Link>
  )
}
