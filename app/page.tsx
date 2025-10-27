"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { type Language, getLanguage, loadTranslations } from "@/lib/i18n"
import type { Role } from "@/lib/roles"
import siteData from "@/content/site.json"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Experience } from "@/components/experience"
import { SkillsMatrix } from "@/components/skills-matrix"
import { ContactForm } from "@/components/contact-form"
import { StickyCTA } from "@/components/sticky-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<any>(null)
  const [currentRole, setCurrentRole] = useState<Role | null>(null)

  useEffect(() => {
    const initLanguage = getLanguage()
    setLanguage(initLanguage)
    setTranslations(loadTranslations(initLanguage))
  }, [])

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam && ["product-owner", "delivery", "salesforce", "restaurant-tech"].includes(roleParam)) {
      setCurrentRole(roleParam as Role)
    }
  }, [searchParams])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    const newTranslations = loadTranslations(lang)
    setTranslations(newTranslations)
  }

  const handleRoleChange = (role: Role | null) => {
    setCurrentRole(role)
    const url = new URL(window.location.href)
    if (role) {
      url.searchParams.set("role", role)
    } else {
      url.searchParams.delete("role")
    }
    window.history.pushState({}, "", url)
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
      <Navbar
        translations={translations}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onLanguageChange={handleLanguageChange}
      />

      <main>
        <Hero data={siteData} language={language} role={currentRole} translations={translations} />

        <Highlights data={siteData.highlights} language={language} role={currentRole} translations={translations} />

        <Experience data={siteData.experience} language={language} role={currentRole} translations={translations} />

        <SkillsMatrix data={siteData.skills} language={language} role={currentRole} translations={translations} />

        <ContactForm translations={translations} />
      </main>

      <StickyCTA contacts={siteData.identity.contacts} translations={translations} />

      <Footer data={siteData} translations={translations} />
    </div>
  )
}
