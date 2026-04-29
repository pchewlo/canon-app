import Link from "next/link"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-quest-ink flex flex-col">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-quest-accent uppercase"
            style={{
              fontFamily:
                'var(--font-brand, "Iowan Old Style", Palatino, Georgia, serif)',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.26em",
              lineHeight: 1,
            }}
          >
            Canon
          </Link>
          <Link
            href="/"
            className="text-[13px] text-quest-ink-muted hover:text-quest-ink transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          {children}
        </article>
      </main>

      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6 text-[12px] text-quest-ink-faint">
          © {new Date().getFullYear()} Canon
        </div>
      </footer>
    </div>
  )
}
