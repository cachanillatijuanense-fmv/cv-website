"use client"

import { useState, useEffect } from "react"
import { type Language, getLanguage, loadTranslations } from "@/lib/i18n"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import siteData from "@/content/site.json"

export default function PrivacyPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<any>(null)

  useEffect(() => {
    const initLanguage = getLanguage()
    setLanguage(initLanguage)
    loadTranslations(initLanguage).then(setTranslations)
  }, [])

  const handleLanguageChange = async (lang: Language) => {
    setLanguage(lang)
    const newTranslations = await loadTranslations(lang)
    setTranslations(newTranslations)
  }

  if (!translations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        translations={translations}
        currentRole={null}
        onRoleChange={() => {}}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{translations.privacy.title}</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed">{translations.privacy.content}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer data={siteData} translations={translations} />
    </div>
  )
}
