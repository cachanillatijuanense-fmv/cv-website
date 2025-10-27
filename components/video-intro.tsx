"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { Button } from "./ui/button"
import { Play } from "lucide-react"

interface VideoIntroProps {
  videoData: any
  language: Language
  translations: any
}

export function VideoIntro({ videoData, language, translations }: VideoIntroProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>(language)

  const currentVideo = videoData[activeLanguage]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Play className="h-4 w-4 text-accent" />
        <span className="text-sm font-medium">{translations.hero.watchVideo}</span>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant={activeLanguage === "es" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveLanguage("es")}
        >
          {translations.hero.videoES}
        </Button>
        <Button
          variant={activeLanguage === "en" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveLanguage("en")}
        >
          {translations.hero.videoEN}
        </Button>
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden border shadow-lg bg-muted">
        <video key={activeLanguage} controls muted playsInline poster={currentVideo.poster} className="w-full h-full">
          <source src={currentVideo.src} type="video/mp4" />
          <track
            kind="captions"
            src={currentVideo.captions}
            srcLang={activeLanguage}
            label={activeLanguage === "es" ? "Español" : "English"}
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
