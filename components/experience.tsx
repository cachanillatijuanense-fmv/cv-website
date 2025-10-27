"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Language } from "@/lib/i18n"
import { Expand } from "./ui/expand"
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react"

interface ExperienceProps {
  data: { recent: any[]; older_collapsed: any[] }
  language: Language
  translations: any
}

export function Experience({ data, language, translations }: ExperienceProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.sections.experience}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {data.recent.map((exp: any, index: number) => {
            const id = `recent-${index}`
            const isExpanded = expandedItems.has(id)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < data.recent.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                )}

                <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleItem(id)}
                    className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background shadow-sm">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{exp.company}</h3>
                            <p className="text-lg text-muted-foreground">{exp.role}</p>
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{isExpanded ? translations.experience.collapse : translations.experience.expand}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  </button>

                  <Expand isOpen={isExpanded}>
                    <div className="px-6 pb-6 pl-[88px]">
                      <ul className="space-y-2">
                        {(language === "es" ? exp.bullets_es : exp.bullets_en).map((bullet: string, bulletIndex: number) => (
                          <motion.li
                            key={bulletIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: bulletIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-muted-foreground">{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </Expand>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Older collapsed section */}
        {data.older_collapsed && data.older_collapsed.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10">
            <details className="group">
              <summary className="cursor-pointer text-center text-sm text-muted-foreground hover:text-foreground">
                {language === "es" ? "Ver experiencia anterior" : "Show older experience"}
              </summary>
              <div className="mt-6 space-y-6">
                {data.older_collapsed.map((exp: any, index: number) => {
                  const id = `older-${index}`
                  const isExpanded = expandedItems.has(id)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="relative"
                    >
                      <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative z-10 flex-shrink-0">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background shadow-sm">
                                <Briefcase className="h-6 w-6 text-primary" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <h3 className="text-xl font-bold">{exp.company}</h3>
                                  <p className="text-lg text-muted-foreground">{exp.role}</p>
                                </div>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{isExpanded ? translations.experience.collapse : translations.experience.expand}</span>
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </div>
                            </div>
                          </div>
                        </button>

                        <Expand isOpen={isExpanded}>
                          <div className="px-6 pb-6 pl-[88px]">
                            <ul className="space-y-2">
                              {(language === "es" ? exp.bullets_es : exp.bullets_en).map((bullet: string, bulletIndex: number) => (
                                <motion.li
                                  key={bulletIndex}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: bulletIndex * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                                  <span className="text-muted-foreground">{bullet}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </Expand>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  )
}
