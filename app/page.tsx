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
// Replaced the contact form with a final callout message for simplicity
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Tools } from "@/components/tools"
import { Achievements } from "@/components/achievements"
import VideoIntro from "@/components/VideoIntro"

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

        {/* Intro video placed right after Hero per request for high visibility */}
        <VideoIntro locale={language} />

        <About data={siteData} language={language} translations={translations} />

        <Achievements language={language} translations={translations} />

        <Skills data={skillsData} translations={translations} />

        <Experience data={experienceData} language={language} translations={translations} />

        <Tools data={toolsData} translations={translations} />

        {/* Final callout replacing the form; keeps #contact anchor for existing links */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let's work together
              </h2>
            </div>
          </div>
        </section>
      </main>

      <Footer data={siteData} translations={translations} />
    </div>
  )
}
