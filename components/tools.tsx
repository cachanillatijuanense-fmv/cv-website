"use client"

import { motion } from "framer-motion"

interface ToolsProps {
  data: { tools: Record<string, string[]> }
  translations: any
}

export function Tools({ data, translations }: ToolsProps) {
  const categories = Object.entries(data.tools || {})

  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.sections.tools}</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {categories.map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-background rounded-lg border p-5"
            >
              <h3 className="font-semibold mb-3">{category}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((tool) => (
                  <li key={tool} className="px-2.5 py-1 rounded-full bg-muted text-sm border">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


