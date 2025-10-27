import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fabián Matamoros Vindiola - VP of Solutions · Product Owner",
  description:
    "At the intersection of leadership, business processes, and technology. Designing processes, building systems, and coaching teams to execute better.",
  openGraph: {
    title: "Fabián Matamoros Vindiola - VP of Solutions",
    description:
      "Product Owner and Operations Leader specializing in CRM/ERP implementations and business process optimization.",
    type: "website",
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
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
