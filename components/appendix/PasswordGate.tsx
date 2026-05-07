"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { submitPassword } from "@/app/proposals/[operator]/actions"

type Props = {
  slug: string
  operatorName: string
}

export function PasswordGate({ slug, operatorName }: Props) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await submitPassword(slug, password)
      if (result.ok) {
        router.refresh()
      } else {
        setError(result.error)
        setPassword("")
      }
    })
  }

  return (
    <div className="flex min-h-[calc(100svh-56px)] items-center justify-center bg-canon-cream px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
            Pilot proposal appendix
          </p>
          <h1 className="mt-3 text-balance text-[24px] font-semibold leading-[1.2] tracking-[-0.018em] text-canon-ink">
            Confidential — for {operatorName}
          </h1>
          <p className="mt-3 text-[14px] leading-[1.55] text-quest-ink-muted">
            Enter the password from your pilot proposal email to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-invalid={Boolean(error)}
            className="rounded-[4px] border border-canon-line bg-canon-paper px-3 py-3 text-[15px] text-canon-ink placeholder:text-quest-ink-faint outline-none transition focus:border-canon-green focus:ring-2 focus:ring-canon-green/20"
          />
          <button
            type="submit"
            disabled={pending || !password.trim()}
            className="inline-flex h-11 items-center justify-center rounded-[4px] bg-canon-navy px-5 text-[14px] font-semibold text-white transition-colors hover:bg-canon-navy/90 disabled:opacity-60"
          >
            {pending ? "Checking…" : "Continue"}
          </button>
          {error && (
            <p
              role="alert"
              className="text-[13px] leading-[1.5] text-quest-danger"
            >
              {error}
            </p>
          )}
        </form>

        <p className="mt-10 text-center text-[12px] leading-[1.5] text-quest-ink-faint">
          If you don&apos;t have the password, contact the Canon team via the
          email on your proposal.
        </p>
      </div>
    </div>
  )
}
