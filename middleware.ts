import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Host-based rewrites for the two confidential subdomains. The original paths
// (www.getcanon.io/deck and www.getcanon.io/proposals/<slug>) keep working
// untouched — middleware only fires for the subdomain hosts.

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase()
  const url = req.nextUrl.clone()

  // proposals.getcanon.io/<slug>  →  /proposals/<slug>
  if (host.startsWith("proposals.")) {
    if (!url.pathname.startsWith("/proposals")) {
      url.pathname = `/proposals${url.pathname === "/" ? "" : url.pathname}`
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  // deck.getcanon.io/...  →  /deck  (single-page deck; ignore any path)
  if (host.startsWith("deck.")) {
    if (url.pathname !== "/deck") {
      url.pathname = "/deck"
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  // Skip Next internals, static files, image optimisation, sitemap/robots,
  // and any URL with a file extension.
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
}
