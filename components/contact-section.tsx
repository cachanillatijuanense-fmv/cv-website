"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { Button } from "./ui/button"
import { Mail, MessageCircle, FileDown } from "lucide-react"
import { generatePresentationLetterPdf, FILENAMES } from "@/lib/presentationLetterPdf"

interface ContactSectionProps {
  data: any
  language: Language
  translations: any
}

export function ContactSection({ data, language, translations }: ContactSectionProps) {
  const [exportingPdf, setExportingPdf] = useState(false)

  const handleExportPresentationLetter = async () => {
    setExportingPdf(true)
    try {
      const blob = await generatePresentationLetterPdf(language)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = FILENAMES[language]
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to generate PDF:", err)
    } finally {
      setExportingPdf(false)
    }
  }

  return (
    // Keeps the #contact anchor used by the hero Email button and existing links
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{translations.sections.getInTouch}</h2>
          <div className="pt-8 flex flex-wrap justify-center gap-3">
            {data.contact?.email && (
              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${data.contact.email}`}>
                  <Mail className="h-4 w-4" />
                  {data.hero?.[language === "es" ? "cta_secondary_es" : "cta_secondary_en"] || translations.cta.contact}
                </a>
              </Button>
            )}
            {data.hero?.whatsapp_number && (
              <Button asChild variant="outline" size="lg" className="bg-transparent">
                <a
                  href={`https://wa.me/${String(data.hero.whatsapp_number).replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {data.hero?.[language === "es" ? "cta_whatsapp_es" : "cta_whatsapp_en"] || translations.cta.whatsapp}
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent"
              onClick={handleExportPresentationLetter}
              disabled={exportingPdf}
            >
              <FileDown className="h-4 w-4" />
              {exportingPdf
                ? (language === "es" ? "Generando…" : "Generating…")
                : translations?.hero?.exportPresentationLetter}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
