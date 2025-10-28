"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Language } from "@/lib/i18n"
import achievementsData from "@/content/achievements.json"
import { Button } from "@/components/ui/button"

interface AchievementsProps {
  language: Language
  translations: any
}

function toHtmlWithStrong(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
}

export function Achievements({ language, translations }: AchievementsProps) {
  const items: string[] =
    (achievementsData as any)?.achievements?.[language] ?? []
  const jsonTitle = (achievementsData as any)?.achievements?.title?.[language]
  const title = jsonTitle || (language === "es" ? "Algunos Logros Clave" : "Some Key Achievements")
  const [expanded, setExpanded] = useState(false)
  const visibleItems = expanded ? items : items.slice(0, 5)

  return (
    <section id="achievements" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <ul className="list-disc ml-5 space-y-4">
            {visibleItems.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="text-base leading-relaxed text-left"
              >
                <span
                  dangerouslySetInnerHTML={{ __html: toHtmlWithStrong(item) }}
                />
              </motion.li>
            ))}
          </ul>
          {items.length > 5 && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setExpanded((v) => !v)}>
                {expanded ? translations.skills.showLess : translations.skills.showAll}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


