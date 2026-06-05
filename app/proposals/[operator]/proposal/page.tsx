import Link from "next/link"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cookieNameFor, verifyCookieValue } from "@/lib/appendix/auth"
import {
  getOperatorConfig,
  listOperatorSlugs,
  type OperatorConfig,
} from "@/lib/appendix/operators"
import { GamblrProposal } from "@/components/appendix/proposals/GamblrProposal"
import { MansionGroupProposal } from "@/components/appendix/proposals/MansionGroupProposal"
import { PasswordGate } from "@/components/appendix/PasswordGate"

export const dynamic = "force-dynamic"

type Params = { operator: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}) {
  const { operator } = await params
  const config = getOperatorConfig(operator)
  if (!config) return { title: "Not found" }
  return {
    title: `${config.name} · design partner proposal`,
    description: `Confidential 1-pager design partner proposal prepared for ${config.name}.`,
    robots: { index: false, follow: false },
  }
}

export default async function OperatorProposalPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { operator } = await params

  if (!listOperatorSlugs().includes(operator)) {
    notFound()
  }
  const config = getOperatorConfig(operator)
  if (!config) notFound()

  // Same gate + cookie as the appendix.
  const bypass = process.env.APPENDIX_BYPASS_GATE === "1"
  let authed = bypass
  if (!authed) {
    const jar = await cookies()
    const cookieValue = jar.get(cookieNameFor(operator))?.value
    authed = verifyCookieValue(operator, cookieValue)
  }

  return (
    <div className="bg-canon-cream">
      <ProposalHeader config={config} />
      {authed ? (
        renderProposalFor(operator)
      ) : (
        <PasswordGate slug={operator} operatorName={config.name} />
      )}
    </div>
  )
}

function renderProposalFor(operator: string) {
  if (operator === "gamblr") return <GamblrProposal />
  if (operator === "mansion-group") return <MansionGroupProposal />
  // No 1-pager registered for this operator yet.
  notFound()
}

function ProposalHeader({ config }: { config: OperatorConfig }) {
  return (
    <header
      className="grid grid-cols-3 items-center border-b border-canon-line bg-canon-cream px-5 py-3 text-[12px] sm:px-8"
      style={{ color: "rgba(55,53,47,0.7)" }}
    >
      <Link
        href="/"
        className="justify-self-start hover:opacity-80"
        style={{
          fontFamily:
            '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
          letterSpacing: "0.32em",
          fontSize: 13,
          color: "#1A2332",
        }}
      >
        CANON
      </Link>

      <div className="hidden justify-self-center font-mono text-[11px] uppercase tracking-[0.14em] text-quest-ink-faint sm:block">
        Proposal · {config.name}
      </div>

      <nav className="justify-self-end flex items-center gap-5">
        <Link
          href="/"
          className="text-canon-ink/70 transition-colors hover:text-canon-ink"
        >
          Site
        </Link>
        <Link
          href="/app"
          className="text-canon-ink/70 transition-colors hover:text-canon-ink"
        >
          Product demo
        </Link>
      </nav>
    </header>
  )
}
