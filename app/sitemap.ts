import type { MetadataRoute } from "next"

const BASE = "https://canon-app-seven.vercel.app"

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/customers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },

  { path: "/product/decisioning", changeFrequency: "monthly", priority: 0.9 },
  { path: "/product/strategies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/product/agents", changeFrequency: "monthly", priority: 0.8 },
  { path: "/product/insights", changeFrequency: "monthly", priority: 0.8 },
  { path: "/product/safety", changeFrequency: "monthly", priority: 0.8 },
  { path: "/product/integrations", changeFrequency: "monthly", priority: 0.7 },

  { path: "/solutions/retention", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions/reactivation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions/vip-management", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions/welcome-optimisation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/solutions/bonus-abuse-defence", changeFrequency: "monthly", priority: 0.8 },

  { path: "/industries/igaming", changeFrequency: "monthly", priority: 0.9 },
  { path: "/industries/crypto-trading", changeFrequency: "monthly", priority: 0.6 },
  { path: "/industries/prediction-markets", changeFrequency: "monthly", priority: 0.6 },

  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
