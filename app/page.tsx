"use client"

import { useState, useEffect } from "react"
import { type Language, getLanguage, loadTranslations } from "@/lib/i18n"
import siteData from "@/content/site.json"
import experienceData from "@/content/experience.json"
import skillsData from "@/content/skills.json"
import toolsData from "@/content/tools.json"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Tools } from "@/components/tools"
import { Achievements } from "@/components/achievements"

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<any>(null)

  useEffect(() => {
    const initLanguage = getLanguage()
    setLanguage(initLanguage)
    setTranslations(loadTranslations(initLanguage))
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    const newTranslations = loadTranslations(lang)
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
    <div className="min-h-screen">
      <Navbar translations={translations} onLanguageChange={handleLanguageChange} />

      <main>
        <Hero data={siteData} language={language} translations={translations} />

        <About data={siteData} language={language} translations={translations} />

        <Achievements language={language} translations={translations} />

        <Skills data={skillsData} translations={translations} />

        <Experience data={experienceData} language={language} translations={translations} />

        <Tools data={toolsData} translations={translations} />

        <ContactForm translations={translations} />
      </main>

      <Footer data={siteData} translations={translations} />
    </div>
  )
}
