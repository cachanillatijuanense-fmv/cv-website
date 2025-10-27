"use client"

import { Button } from "./ui/button"
import { Phone, Mail, MessageCircle, MessageSquareText } from "lucide-react"

interface CTAButtonsProps {
  contacts: any
  translations: any
  variant?: "default" | "compact"
}

export function CTAButtons({ contacts, translations, variant = "default" }: CTAButtonsProps) {
  const isCompact = variant === "compact"

  return (
    <div className={`flex flex-wrap gap-3 ${isCompact ? "justify-center" : ""}`}>
      {contacts?.whatsapp && (
        <Button asChild size={isCompact ? "sm" : "lg"} className="gap-2">
          <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            {translations.cta.whatsapp}
          </a>
        </Button>
      )}
      {contacts?.phone && (
        <Button asChild variant="outline" size={isCompact ? "sm" : "lg"} className="gap-2 bg-transparent">
          <a href={contacts.phone}>
            <Phone className="h-4 w-4" />
            {translations.cta.phone}
          </a>
        </Button>
      )}
      {contacts?.email && (
        <Button asChild variant="outline" size={isCompact ? "sm" : "lg"} className="gap-2 bg-transparent">
          <a href={contacts.email}>
            <Mail className="h-4 w-4" />
            {translations.cta.email}
          </a>
        </Button>
      )}
      {contacts?.sms && (
        <Button asChild variant="outline" size={isCompact ? "sm" : "lg"} className="gap-2 bg-transparent">
          <a href={contacts.sms}>
            <MessageSquareText className="h-4 w-4" />
            {translations.cta.sms}
          </a>
        </Button>
      )}
    </div>
  )
}
