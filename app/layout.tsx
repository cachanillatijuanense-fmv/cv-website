import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fabián Matamoros Vindiola — Operations Leader | Process, Systems and Delivery",
  description: "Operations leader with 20+ years building the systems that make companies execute, across BPO, software delivery, restaurants, and public administration. Process design, performance systems, CRM implementation, and AI-assisted automation. Bilingual English and Spanish.",
  openGraph: {
    title: "Fabián Matamoros Vindiola — Operations Leader | Process, Systems and Delivery",
    description: "Operations leader with 20+ years building the systems that make companies execute, across BPO, software delivery, restaurants, and public administration. Process design, performance systems, CRM implementation, and AI-assisted automation. Bilingual English and Spanish.",
    type: "profile",
    locale: "en_US",
    url: "https://fmv-cv-website.netlify.app/",
    siteName: "Fabián Matamoros Vindiola CV",
    images: ["https://fmv-cv-website.netlify.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabián Matamoros Vindiola — Operations Leader | Process, Systems and Delivery",
    description: "Operations leader with 20+ years building the systems that make companies execute, across BPO, software delivery, restaurants, and public administration. Process design, performance systems, CRM implementation, and AI-assisted automation. Bilingual English and Spanish.",
    images: ["https://fmv-cv-website.netlify.app/og-image.jpg"],
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
