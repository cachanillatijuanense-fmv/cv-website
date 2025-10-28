import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
  description:
    "Solutions & Operations Leader — Strategy, Process, and Delivery. Experienced with U.S.-based companies across BPO and software; recent years accelerating delivery through AI-assisted development.",
  openGraph: {
    title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
    description:
      "Operations & technology leadership; end-to-end implementations and AI-assisted delivery.",
    type: "profile",
    locale: "en_US",
    url: "https://fmv-cv-website.netlify.app/",
    siteName: "Fabián Matamoros Vindiola CV",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
    description:
      "Operations & technology leadership; end-to-end implementations and AI-assisted delivery.",
    images: ["/og-image.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Default to light theme on first visit; only enable dark if explicitly set
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
