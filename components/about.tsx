"use client"

import { motion } from "framer-motion"
import type { Language } from "@/lib/i18n"

interface AboutProps {
  data: any
  language: Language
  translations: any
}

export function About({ data, language, translations }: AboutProps) {
  const text = language === "es" ? data.about.es : data.about.en
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
          {/* Placement rationale: Add concise biographical line at the start of the About
             section so it stays with core biography content and remains easy to find/edit. */}
          {language === "es" ? (
            <p className="text-lg text-muted-foreground mb-3">
              Tengo 44 años y soy Ingeniero en Electrónica Médica por la Universidad Autónoma de Guadalajara (2000–2005).
            </p>
          ) : (
            <p className="text-lg text-muted-foreground mb-3">
              I’m 44 years old and hold a degree in Medical Electronics Engineering from Universidad Autónoma de Guadalajara (2000–2005).
            </p>
          )}
          <p className="text-lg text-muted-foreground whitespace-pre-line">{text}</p>
        </motion.div>
      </div>
    </section>
  )
}


