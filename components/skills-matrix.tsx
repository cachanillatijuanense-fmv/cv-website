"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Language } from "@/lib/i18n"
import type { Role } from "@/lib/roles"
import { sortByRole } from "@/lib/sort"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface SkillsMatrixProps {
  data: any[]
  language: Language
  role: Role | null
  translations: any
}

export function SkillsMatrix({ data, language, role, translations }: SkillsMatrixProps) {
  const [showAll, setShowAll] = useState(false)
  const sortedSkills = sortByRole(data, role)
  const displayedSkills = showAll ? sortedSkills : sortedSkills.slice(0, 6)

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.sections.skills}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {displayedSkills.map((skill: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-background rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.name[language]}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}/5</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {sortedSkills.length > 6 && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setShowAll(!showAll)} className="gap-2">
                {showAll ? (
                  <>
                    {translations.skills.showLess}
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {translations.skills.showAll}
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
