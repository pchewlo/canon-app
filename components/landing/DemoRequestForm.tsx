"use client"

import { useState } from "react"

export function DemoRequestForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-md border border-white/15 bg-white/[0.04] px-6 py-5 text-[15px] text-white/85">
        Thanks — someone will be in touch about organising a demo.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@operator.com"
        aria-label="Work email"
        className="flex-1 rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[14px] text-white placeholder:text-white/40 outline-none transition focus:border-white/40 focus:bg-white/[0.08]"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-[14px] font-medium text-[#1A2332] hover:bg-white/90 transition-colors"
      >
        Request a demo
      </button>
    </form>
  )
}
