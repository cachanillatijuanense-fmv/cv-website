"use client"

import { motion } from "framer-motion"
import type { Language } from "@/lib/i18n"
import type { Role } from "@/lib/roles"
import { sortByRole } from "@/lib/sort"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle2 } from "lucide-react"

interface HighlightsProps {
  data: any[]
  language: Language
  role: Role | null
  translations: any
}

export function Highlights({ data, language, role, translations }: HighlightsProps) {
  const sortedHighlights = sortByRole(data, role)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.sections.highlights}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {sortedHighlights.map((highlight: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-balance">{highlight.title[language]}</span>
                  </CardTitle>
                  <CardDescription className="text-base pt-2">{highlight.detail[language]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-accent/10 p-4 border-l-4 border-accent">
                    <p className="text-sm font-medium">{highlight.proof[language]}</p>
                  </div>
                  {role && highlight.tags?.includes(role) && (
                    <Badge variant="secondary" className="mt-4">
                      {translations.role[role]}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
