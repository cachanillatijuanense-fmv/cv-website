"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Language } from "@/lib/i18n"
import { VideoIntro } from "./video-intro"
import { Button } from "./ui/button"

interface HeroProps {
  data: any
  language: Language
  translations: any
}

export function Hero({ data, language, translations }: HeroProps) {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background sm:to-primary/5">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <Image src="/images/skyline.jpg" alt="" fill className="object-cover" priority />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                {data.hero?.name}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-pretty">
                {data.hero?.[language === "es" ? "title_es" : "title_en"] || data.identity?.title?.[language]}
              </h2>
              {(
                data.hero?.[language === "es" ? "subtitle_es" : "subtitle_en"]
              ) && (
                <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                  {data.hero[language === "es" ? "subtitle_es" : "subtitle_en"]}
                </p>
              )}
            </div>

            {/* No role-based bullets in static version */}

            <div className="pt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="/resume.pdf" target="_blank" rel="noopener">
                  {data.hero?.[language === "es" ? "cta_primary_es" : "cta_primary_en"] || translations.cta.contact}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">
                  {data.hero?.[language === "es" ? "cta_secondary_es" : "cta_secondary_en"] || translations.cta.contact}
                </a>
              </Button>
              {data.hero?.whatsapp_number && (
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <a
                    href={`https://wa.me/${String(data.hero.whatsapp_number).replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.hero?.[language === "es" ? "cta_whatsapp_es" : "cta_whatsapp_en"] || translations.cta.whatsapp}
                  </a>
                </Button>
              )}
              {data.hero?.phone_number && (
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <a href={`tel:${data.hero.phone_number}`}>
                    {data.hero?.[language === "es" ? "cta_call_es" : "cta_call_en"] || translations.cta.phone}
                  </a>
                </Button>
              )}
              {data.hero?.sms_number && (
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <a href={`sms:${data.hero.sms_number}`}>
                    {data.hero?.[language === "es" ? "cta_sms_es" : "cta_sms_en"] || "SMS"}
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Image & Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Headshot */}
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-20" />
              <Image
                src="/images/fabian.jpg"
                alt={data.hero?.name || "Profile"}
                fill
                className="object-cover rounded-full border-4 border-background shadow-2xl relative z-10"
                priority
              />
            </div>

            {/* Video Introduction */}
            {false && data.identity?.video && (
              <VideoIntro videoData={data.identity.video} language={language} translations={translations} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
