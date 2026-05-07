// Server-only HMAC cookie sign/verify for the operator appendix page.
// The cookie is opaque to the client; the server is the only place that
// can mint or validate it. No external session library — this is a single
// purpose protected page.

import { createHmac, timingSafeEqual } from "node:crypto"

const COOKIE_PREFIX = "op_pilot_"
export const COOKIE_TTL_DAYS = 30
const TTL_MS = COOKIE_TTL_DAYS * 24 * 60 * 60 * 1000

function getSigningSecret(): string {
  const secret = process.env.APPENDIX_SIGNING_SECRET
  if (!secret || secret.length < 16) {
    // Fail closed in production. In dev, allow a dev-only fallback so the
    // page works locally without setting an env var.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "APPENDIX_SIGNING_SECRET is not configured (production requires a secret of >= 16 chars)",
      )
    }
    return "dev-only-secret-do-not-use-in-prod"
  }
  return secret
}

function hmac(payload: string): string {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex")
}

export function cookieNameFor(slug: string): string {
  return COOKIE_PREFIX + slug
}

/**
 * Sign a cookie value for an operator slug. Format: `<expiry>.<hmac>`.
 * Expiry is a unix timestamp (ms).
 */
export function signCookieValue(slug: string): {
  value: string
  expiresAt: Date
} {
  const expiry = Date.now() + TTL_MS
  const payload = `${slug}.${expiry}`
  const sig = hmac(payload)
  return {
    value: `${expiry}.${sig}`,
    expiresAt: new Date(expiry),
  }
}

/**
 * Verify a cookie value matches the slug and hasn't expired.
 * Constant-time comparison on the signature.
 */
export function verifyCookieValue(slug: string, value: string | undefined): boolean {
  if (!value) return false
  const parts = value.split(".")
  if (parts.length !== 2) return false
  const [expiryStr, sig] = parts
  const expiry = Number(expiryStr)
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false
  const expected = hmac(`${slug}.${expiry}`)
  if (sig.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
  } catch {
    return false
  }
}

/**
 * Look up an operator's password from `OPERATOR_<SLUG>_PASSWORD`.
 * The slug is uppercased and dashes replaced with underscores.
 */
export function getOperatorPassword(slug: string): string | undefined {
  const envKey = `OPERATOR_${slug.toUpperCase().replace(/-/g, "_")}_PASSWORD`
  return process.env[envKey]
}

/**
 * Constant-time password comparison.
 */
export function comparePassword(submitted: string, stored: string): boolean {
  const a = Buffer.from(submitted)
  const b = Buffer.from(stored)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
