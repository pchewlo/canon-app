import type { MetadataRoute } from "next"

const BASE = "https://canon-app-seven.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/deck"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
