import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cookieNameFor, verifyCookieValue } from "@/lib/appendix/auth"
import {
  getOperatorConfig,
  listOperatorSlugs,
} from "@/lib/appendix/operators"
import { Appendix } from "@/components/appendix/Appendix"
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
    title: `${config.name} · pilot appendix`,
    description: `Confidential pilot proposal appendix prepared for ${config.name}.`,
    robots: { index: false, follow: false },
  }
}

export default async function OperatorAppendixPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { operator } = await params

  // Defensive: only known slugs reach this page. Unknown → 404 so the
  // dynamic route doesn't shadow real Next 404s.
  if (!listOperatorSlugs().includes(operator)) {
    notFound()
  }

  const config = getOperatorConfig(operator)
  if (!config) notFound()

  const jar = await cookies()
  const cookieValue = jar.get(cookieNameFor(operator))?.value
  const authed = verifyCookieValue(operator, cookieValue)

  if (!authed) {
    return <PasswordGate slug={operator} operatorName={config.name} />
  }

  return <Appendix config={config} />
}
