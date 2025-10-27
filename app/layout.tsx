import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
  description:
    "Solutions & Operations Leader — Strategy, Process, and Delivery. Experienced in designing processes, leading cross-functional teams, and turning business goals into executable systems.",
  openGraph: {
    title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
    description:
      "Strategy, Process, and Delivery — experienced in designing and executing systems that connect business strategy with operational excellence.",
    type: "profile",
    locale: "en_US",
    url: "https://fmv-cv-website.netlify.app/",
    siteName: "Fabián Matamoros Vindiola CV",
    images: ["/images/fabian.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabián Matamoros Vindiola — Solutions & Operations Leader",
    description:
      "Strategy, Process, and Delivery — bridging business goals with technical execution.",
    images: ["/images/fabian.jpg"],
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
