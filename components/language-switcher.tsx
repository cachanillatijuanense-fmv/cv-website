"use client"

import { useState, useEffect } from "react"
import { type Language, getLanguage, setLanguage } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  useEffect(() => {
    setCurrentLang(getLanguage())
  }, [])

  const toggleLanguage = () => {
    const newLang: Language = currentLang === "en" ? "es" : "en"
    setCurrentLang(newLang)
    setLanguage(newLang)
    onLanguageChange(newLang)
  }

  // Show the language the button will switch to, not the current one
  const targetLabel = currentLang === "en" ? "ESPAÑOL" : "ENGLISH"

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2" aria-label="Toggle language">
      <Globe className="h-4 w-4" />
      <span className="font-medium">{targetLabel}</span>
    </Button>
  )
}
