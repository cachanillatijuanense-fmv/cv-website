"use client"

import { motion } from "framer-motion"

interface SkillsProps {
  data: { skills: Record<string, string[]> }
  translations: any
}

export function Skills({ data, translations }: SkillsProps) {
  const categories = Object.entries(data.skills)

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

        <div className="max-w-4xl mx-auto grid gap-x-12 gap-y-10 md:grid-cols-2">
          {categories.map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <h3 className="text-xl font-semibold mb-3">{category}</h3>
              <ul className="list-disc ml-5 space-y-1.5 marker:text-muted-foreground text-muted-foreground">
                {items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


