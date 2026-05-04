"use client"

import { useState } from "react"

type FAQ = { q: string; a: string }

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-[15px] font-medium text-quest-ink">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-quest-ink-faint text-[20px] leading-none transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-5 text-[14px] leading-relaxed text-quest-ink-muted">
                {item.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
