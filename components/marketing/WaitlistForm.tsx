"use client"

import { useState } from "react"

export function WaitlistForm({
  topic,
}: {
  /** Used in the confirmation message: "we'll be in touch about {topic}" */
  topic: string
}) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-md border border-quest-ink/15 bg-quest-success-soft/40 px-5 py-4 text-[14px] text-quest-ink">
        Thanks — we&apos;ll be in touch about {topic}.
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!email.trim()) return
        setSubmitted(true)
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@operator.com"
        aria-label="Work email"
        className="flex-1 rounded-md border border-quest-ink/15 bg-white px-4 py-3 text-[14px] text-quest-ink placeholder:text-quest-ink-faint outline-none transition focus:border-quest-accent/60"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-quest-accent px-5 py-3 text-[14px] font-medium text-white hover:bg-quest-accent/90 transition-colors"
      >
        Join waitlist
      </button>
    </form>
  )
}
