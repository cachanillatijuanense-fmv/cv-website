import Link from "next/link"
import { Linkedin } from "lucide-react"
import { CTAButtons } from "./cta-buttons"

interface FooterProps {
  data: any
  translations: any
}

export function Footer({ data, translations }: FooterProps) {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact CTAs */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{translations.sections.contact}</h3>
            <CTAButtons contacts={data.identity.contacts} translations={translations} />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Social</h3>
            <div className="flex gap-4">
              {data.identity.contacts.linkedin && (
                <a
                  href={data.identity.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                {translations.nav.home}
              </Link>
              <Link href="/tailor" className="text-muted-foreground hover:text-foreground transition-colors">
                {translations.nav.tailor}
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {translations.nav.privacy}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {data.identity.name}. {translations.footer.rights}
          </p>
          <p className="mt-2">{translations.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
