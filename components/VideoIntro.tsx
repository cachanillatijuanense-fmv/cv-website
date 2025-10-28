"use client"

import site from "@/content/site.json"

export default function VideoIntro({ locale = "en" }: { locale?: "en" | "es" }) {
  const videoCfg: any = (site as any)?.video?.[locale] || null
  if (!videoCfg?.src) return null

  return (
    <section id="intro-video" className="mx-auto max-w-5xl px-4 py-10">
      {/* Design note: This video must preserve full aspect ratio and avoid any cropping.
         We rely on the media's intrinsic ratio using width:100% and height:auto, and
         avoid object-fit:cover to prevent trimming. See placement note in app/page.tsx. */}
      <h2 className="text-2xl font-semibold mb-4">
        {locale === "es" ? "Presentación" : "Introduction"}
      </h2>

      <div className="rounded-2xl overflow-hidden shadow border bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          poster={videoCfg.poster || undefined}
          aria-label={videoCfg.title || "Introduction video"}
          className="w-full h-auto object-contain block"
        >
          <source src={videoCfg.src} type="video/mp4" />
          {/* Optional: add WebM later
          <source src="/videos/intro-en.webm" type="video/webm" /> */}
          {locale === "es"
            ? "Tu navegador no soporta video HTML5."
            : "Your browser does not support the HTML5 video element."}
        </video>
      </div>

      {videoCfg.title && (
        <p className="mt-3 text-sm text-muted-foreground">{videoCfg.title}</p>
      )}
    </section>
  )
}


