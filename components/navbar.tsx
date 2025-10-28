"use client"

import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import type { Language } from "@/lib/i18n"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  translations: any
  onLanguageChange: (lang: Language) => void
}

export function Navbar({ translations, onLanguageChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b bg-background md:bg-background/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            FM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {translations.nav.home}
            </Link>
            <LanguageSwitcher onLanguageChange={onLanguageChange} />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {translations.nav.home}
            </Link>
            <LanguageSwitcher onLanguageChange={onLanguageChange} />
          </div>
        )}
      </div>
    </nav>
  )
}
