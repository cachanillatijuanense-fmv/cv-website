import en from "@/content/i18n/en"
import es from "@/content/i18n/es"

export type Language = "en" | "es"

const translations = { en, es }

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const stored = localStorage.getItem("language")
  if (stored === "en" || stored === "es") return stored

  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith("es") ? "es" : "en"
}

export function setLanguage(lang: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang)
  }
}

export function loadTranslations(lang: Language) {
  return translations[lang]
}
