"use client"

import { useState } from "react"

const LIFT_OPTIONS = [
  "Retention",
  "Reactivation",
  "Welcome / activation",
  "VIP long-tail",
  "Bonus-abuse defence",
  "Not sure yet",
] as const

const SPEND_OPTIONS = [
  "Under £1M",
  "£1M – £5M",
  "£5M – £25M",
  "£25M – £100M",
  "£100M+",
] as const

export function BookCallForm() {
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    // No backend wired yet — record the intent locally and show the thanks state.
    window.setTimeout(() => {
      setPending(false)
      setSubmitted(true)
    }, 300)
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[4px] border border-canon-green/30 bg-quest-success-soft/60 px-7 py-8 text-canon-ink"
      >
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-canon-green">
          Thanks
        </div>
        <p className="mt-3 text-[16px] leading-[1.55] text-canon-ink">
          Got it — someone from the Canon team will be in touch within one
          working day to book the call.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[4px] border border-canon-line bg-canon-paper p-5 sm:p-7"
    >
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-quest-ink-faint">
        Book a call
      </div>
      <div className="mt-1 text-[13px] leading-[1.55] text-quest-ink-muted">
        We&apos;ll come back within one working day to schedule.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          required
        />
        <Field
          label="Role"
          name="role"
          autoComplete="organization-title"
          placeholder="e.g. Head of CRM"
          required
        />
        <Select
          label="What you want to lift"
          name="lift"
          options={LIFT_OPTIONS}
          required
        />
        <Select
          label="Annual bonus spend"
          name="spend"
          options={SPEND_OPTIONS}
          required
        />
      </div>

      <Textarea
        label="Anything else"
        name="message"
        optional
        placeholder="The metric, the timeline, the constraint — whatever helps us prep."
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex w-full items-center justify-center rounded-[4px] bg-canon-navy px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-canon-navy/90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Request a call"}
      </button>

      <p className="mt-4 text-[12px] leading-[1.5] text-quest-ink-faint">
        We&apos;ll only use this to schedule the call. No newsletter, no
        third-party trackers.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-canon-ink">
        {label}
        {required ? null : (
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-quest-ink-faint">
            optional
          </span>
        )}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-[4px] border border-canon-line bg-canon-paper px-3 py-2.5 text-[14px] text-canon-ink placeholder:text-quest-ink-faint outline-none transition focus:border-canon-green focus:ring-2 focus:ring-canon-green/20"
      />
    </label>
  )
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string
  name: string
  options: readonly string[]
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-canon-ink">
        {label}
        {!required && (
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-quest-ink-faint">
            optional
          </span>
        )}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="rounded-[4px] border border-canon-line bg-canon-paper px-3 py-2.5 text-[14px] text-canon-ink outline-none transition focus:border-canon-green focus:ring-2 focus:ring-canon-green/20"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

function Textarea({
  label,
  name,
  placeholder,
  optional,
}: {
  label: string
  name: string
  placeholder?: string
  optional?: boolean
}) {
  return (
    <label className="mt-4 flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-canon-ink">
        {label}
        {optional && (
          <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-quest-ink-faint">
            optional
          </span>
        )}
      </span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="rounded-[4px] border border-canon-line bg-canon-paper px-3 py-2.5 text-[14px] leading-[1.55] text-canon-ink placeholder:text-quest-ink-faint outline-none transition focus:border-canon-green focus:ring-2 focus:ring-canon-green/20"
      />
    </label>
  )
}
