"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface Article {
  title: string
  url: string
  description_en?: string
  description_es?: string
}

interface WritingProps {
  data: { articles: Article[] }
  language: Language
  translations: any
}

export function Writing({ data, language, translations }: WritingProps) {
  const articles = data.articles || []
  if (articles.length === 0) return null

  return (
    <section id="writing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.sections.writing}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((article, idx) => {
            const description = language === "es" ? article.description_es : article.description_en
            return (
              <motion.a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group block bg-background rounded-lg border p-5 transition-colors hover:bg-muted/50"
              >
                <h3 className="font-semibold flex items-start justify-between gap-3">
                  <span>{article.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                {description && <p className="mt-2 text-muted-foreground">{description}</p>}
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
