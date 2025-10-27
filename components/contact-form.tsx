"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import Link from "next/link"

interface ContactFormProps {
  translations: any
}

export function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })

      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.contact.title}</h2>
            <p className="text-lg text-muted-foreground">{translations.contact.subtitle}</p>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6 bg-background rounded-lg border p-8 shadow-sm"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden">
              <Label htmlFor="bot-field">Don't fill this out if you're human:</Label>
              <Input id="bot-field" name="bot-field" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{translations.contact.name}</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{translations.contact.email}</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{translations.contact.message}</Label>
              <Textarea id="message" name="message" rows={6} required />
            </div>

            <div className="space-y-4">
              <Button type="submit" size="lg" className="w-full">
                {translations.contact.send}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {translations.contact.privacy}{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  {translations.nav.privacy}
                </Link>
              </p>
            </div>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-accent/10 border border-accent rounded-lg text-center"
              >
                <p className="text-sm font-medium">{translations.contact.success}</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive rounded-lg text-center"
              >
                <p className="text-sm font-medium text-destructive">{translations.contact.error}</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
