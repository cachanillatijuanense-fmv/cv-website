"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Language } from "@/lib/i18n"
import type { Role } from "@/lib/roles"
import { sortByRole } from "@/lib/sort"
import { VideoIntro } from "./video-intro"
import { CTAButtons } from "./cta-buttons"

interface HeroProps {
  data: any
  language: Language
  role: Role | null
  translations: any
}

export function Hero({ data, language, role, translations }: HeroProps) {
  const sortedBullets = sortByRole(data.hero.bullets, role)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
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
                {data.identity.name}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-pretty">
                {data.identity.title[language]}
              </h2>
              {data.hero?.subtitle?.[language] && (
                <p className="text-lg md:text-xl text-muted-foreground text-pretty">{data.hero.subtitle[language]}</p>
              )}
            </div>

            {/* Value Bullets */}
            <motion.ul
              className="space-y-3 pt-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {sortedBullets.map((bullet: any, index: number) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-lg">{bullet.text[language]}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="pt-6">
              <CTAButtons contacts={data.identity.contacts} translations={translations} />
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
                src={data.identity.headshot || "/placeholder.svg"}
                alt={data.identity.name}
                fill
                className="object-cover rounded-full border-4 border-background shadow-2xl relative z-10"
                priority
              />
            </div>

            {/* Video Introduction */}
            <VideoIntro videoData={data.identity.video} language={language} translations={translations} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
