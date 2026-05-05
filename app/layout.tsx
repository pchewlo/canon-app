import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const SITE_URL = "https://canon-app-seven.vercel.app"
const TITLE = "Canon — The agentic platform for player bonuses"
const DESCRIPTION =
  "Per-player AI agents that decide who gets a bonus, when, and how much — in real time. Built for regulated markets, priced on the lift we deliver."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: DESCRIPTION,
  applicationName: "Canon",
  keywords: [
    "iGaming CRM",
    "player engagement",
    "bonus optimisation",
    "responsible gaming",
    "real-time decisioning",
    "agentic CRM",
  ],
  authors: [{ name: "Canon" }],
  openGraph: {
    type: "website",
    siteName: "Canon",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  )
}
