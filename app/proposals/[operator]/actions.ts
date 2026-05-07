"use server"

import { cookies } from "next/headers"
import {
  COOKIE_TTL_DAYS,
  comparePassword,
  cookieNameFor,
  getOperatorPassword,
  signCookieValue,
} from "@/lib/appendix/auth"
import { getOperatorConfig } from "@/lib/appendix/operators"

export type SubmitResult = { ok: true } | { ok: false; error: string }

export async function submitPassword(
  slug: string,
  password: string,
): Promise<SubmitResult> {
  const config = getOperatorConfig(slug)
  if (!config) {
    return { ok: false, error: "Unknown operator." }
  }

  const stored = getOperatorPassword(slug)
  if (!stored) {
    // Mis-configured server. Don't leak that detail to the visitor.
    return { ok: false, error: "Access is currently unavailable." }
  }

  if (!password || !comparePassword(password.trim(), stored)) {
    return { ok: false, error: "That password isn't right. Try again." }
  }

  const { value, expiresAt } = signCookieValue(slug)
  const jar = await cookies()
  jar.set(cookieNameFor(slug), value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { ok: true }
}

export const COOKIE_TTL = COOKIE_TTL_DAYS
