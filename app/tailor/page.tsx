"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type Language, getLanguage, loadTranslations } from "@/lib/i18n"
import { detectRole } from "@/lib/roles"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import siteData from "@/content/site.json"

export default function TailorPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<any>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const initLanguage = getLanguage()
    setLanguage(initLanguage)
    const translations = loadTranslations(initLanguage)
    setTranslations(translations)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    const newTranslations = loadTranslations(lang)
    setTranslations(newTranslations)
  }

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      const detectedRole = detectRole(jobDescription)
      router.push(`/?role=${detectedRole}`)
    }, 1000)
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
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{translations.tailor.title}</h1>
              <p className="text-lg text-muted-foreground text-pretty">{translations.tailor.subtitle}</p>
            </div>

            <div className="bg-background rounded-lg border p-8 shadow-sm space-y-6">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={translations.tailor.placeholder}
                rows={12}
                className="resize-none"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                size="lg"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {translations.tailor.detecting}
                  </>
                ) : (
                  translations.tailor.analyze
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer data={siteData} translations={translations} />
    </div>
  )
}
