/**
 * Presentation Letter (Cover Letter) PDF Generator
 * Premium 1-page layout with circular photo, y-cursor flow, zero overlap.
 * Word count enforced at <= 200 words per language.
 */

import {
  PDFDocument,
  StandardFonts,
  PageSizes,
  rgb,
  pushGraphicsState,
  popGraphicsState,
  moveTo,
  appendBezierCurve,
  closePath,
  clipEvenOdd,
  endPath,
  stroke,
  setLineWidth,
  setStrokingColor,
  type PDFFont,
  type PDFPage,
  type PDFImage,
  type RGB,
} from "pdf-lib"

const MAX_WORDS = 200

// Kappa constant for circle approximation (4/3 * (sqrt(2)-1))
const KAPPA = 0.552284749831

export const LETTER_TEXT = {
  en: `Hello,

I'm Fabián Matamoros Vindiola, an operations and technology leader with 15+ years of experience turning complex business challenges into clear processes and working software. In my current role as VP of Solutions at ArkusNexus, I lead cross-functional delivery as a PM/PO across Salesforce implementations, internal management platforms, and enterprise AI initiatives—ensuring measurable outcomes, predictable execution, and strong stakeholder alignment.

I specialize in applying AI and low-code tools (v0, Cursor, Bolt.new) to accelerate prototyping and delivery, while pairing them with disciplined process design, QA, training systems, and automation (Zapier, n8n). I'm comfortable across cloud deployment (Netlify/Vercel) and data stacks (Neon/Postgres, Supabase), and I work fluently in English and Spanish with teams across North and Latin America.

I'd welcome the chance to help your organization scale execution capacity with practical AI adoption and operational rigor.

Sincerely,

Fabián Matamoros Vindiola`,

  es: `Hola:

Soy Fabián Matamoros Vindiola, líder en operaciones y tecnología con más de 15 años convirtiendo retos complejos en procesos claros y software funcional. Actualmente, como VP of Solutions en ArkusNexus, lidero la entrega como PM/PO en implementaciones de Salesforce, plataformas internas de gestión e iniciativas de IA a nivel empresa, asegurando resultados medibles, ejecución predecible y alineación con stakeholders.

Me especializo en aplicar IA y herramientas low-code (v0, Cursor, Bolt.new) para acelerar prototipos y entrega, combinándolas con diseño de procesos, QA, sistemas de capacitación y automatización (Zapier, n8n). También tengo experiencia en despliegue en la nube (Netlify/Vercel) y en stacks de datos (Neon/Postgres, Supabase). Trabajo fluidamente en español e inglés con equipos en Norte y Latinoamérica.

Me encantaría apoyar a su organización a escalar su capacidad de ejecución con adopción práctica de IA y rigor operativo.

Atentamente,

Fabián Matamoros Vindiola`,
} as const

export const FILENAMES = {
  en: "Fabian_Matamoros_Presentation_Letter_EN.pdf",
  es: "Fabian_Matamoros_Carta_Presentacion_ES.pdf",
} as const

/** Count words in text (simple split by whitespace). */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/** Dev guard: enforce max word count. */
function enforceWordLimit(text: string, lang: "en" | "es"): void {
  const count = countWords(text)
  if (count > MAX_WORDS) {
    throw new Error(
      `[Presentation Letter] Letter text exceeds ${MAX_WORDS} words (${count} words in ${lang}). Reduce content to meet the limit.`
    )
  }
}

// ─── Layout constants ─────────────────────────────────────────────────────
const MARGIN_X = 52
const MARGIN_TOP = 52
const MARGIN_BOTTOM = 56
const BAND_H = 26

// Design palette (muted, professional)
const ACCENT_COLOR: RGB = rgb(0.1, 0.16, 0.26)
const TEXT_COLOR: RGB = rgb(0.12, 0.14, 0.18)
const SUB_TEXT_COLOR: RGB = rgb(0.35, 0.38, 0.42)
const LINE_COLOR: RGB = rgb(0.86, 0.88, 0.9)

// Header block
const HEADER_TOP_OFFSET = 18
const HEADER_H = 160
const LEFT_ZONE_W = 170
const GAP = 22

// Circular photo
const PHOTO_INNER = 108
const PHOTO_CX_OFFSET = 70
const PHOTO_CY_OFFSET = 92
// Header text
const NAME_FONT_SIZE = 23
const TITLE_FONT_SIZE = 13
const CONTACT_FONT_SIZE = 11
const HEADER_LINE_SPACING = 16

// Body block
const BODY_FONT_SIZE = 12.5
const BODY_LEADING = 18
const DIVIDER_BELOW_HEADER = 10
const BODY_START_OFFSET = 28

// Signature block
const SIG_SPACING = 18
const SIG_FONT_SIZE = 11

interface LayoutContext {
  page: PDFPage
  width: number
  height: number
  contentWidth: number
  helvetica: PDFFont
  helveticaBold: PDFFont
}

/** Wrap text into lines that fit within maxWidth. */
function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const lines: string[] = []
  const paragraphs = text.split(/\n\n+/)
  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push("")
      continue
    }
    let line = ""
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word
      const testWidth = font.widthOfTextAtSize(testLine, fontSize)
      if (testWidth > maxWidth && line) {
        lines.push(line)
        line = word
      } else {
        line = testLine
      }
    }
    if (line) lines.push(line)
    lines.push("") // paragraph spacing
  }
  return lines
}

/** Draw circle path operators for clipping (centered at cx, cy with radius r). */
function circlePathOperators(cx: number, cy: number, r: number) {
  const k = r * KAPPA
  return [
    moveTo(cx + r, cy),
    appendBezierCurve(cx + r, cy + k, cx + k, cy + r, cx, cy + r),
    appendBezierCurve(cx - k, cy + r, cx - r, cy + k, cx - r, cy),
    appendBezierCurve(cx - r, cy - k, cx - k, cy - r, cx, cy - r),
    appendBezierCurve(cx + k, cy - r, cx + r, cy - k, cx + r, cy),
    closePath(),
  ]
}

/** BLOCK 0 — Accent band at top */
function drawAccentBand(ctx: LayoutContext): void {
  const { page, width, height } = ctx
  page.drawRectangle({
    x: 0,
    y: height - BAND_H,
    width,
    height: BAND_H,
    color: ACCENT_COLOR,
  })
}

/** BLOCK 1 — Header with circular photo (left) and text (right). Returns headerBottomY. */
function drawHeaderWithCircularPhoto(
  ctx: LayoutContext,
  lang: "en" | "es",
  image: PDFImage
): number {
  const { page, width, height, contentWidth, helvetica, helveticaBold } = ctx
  const headerTopY = height - BAND_H - HEADER_TOP_OFFSET
  const headerBottomY = headerTopY - HEADER_H

  const rightColX = MARGIN_X + LEFT_ZONE_W + GAP

  // Photo center and radius
  const cx = MARGIN_X + PHOTO_CX_OFFSET
  const cy = headerBottomY + PHOTO_CY_OFFSET
  const r = PHOTO_INNER / 2
  const imgSize = PHOTO_INNER
  const imgX = cx - r
  const imgY = cy - r

  // 1. Circular photo: clip image to a perfect circle (no square corners)
  // Uses clipEvenOdd per pdf-lib maintainer (GitHub #160) for reliable circle clipping
  page.pushOperators(
    pushGraphicsState(),
    ...circlePathOperators(cx, cy, r),
    clipEvenOdd(),
    endPath()
  )
  page.drawImage(image, {
    x: imgX,
    y: imgY,
    width: imgSize,
    height: imgSize,
  })
  page.pushOperators(popGraphicsState())

  // 2. Thin ring border (outline only, no fill)
  page.pushOperators(
    pushGraphicsState(),
    ...circlePathOperators(cx, cy, r),
    setStrokingColor(LINE_COLOR),
    setLineWidth(1),
    stroke(),
    popGraphicsState()
  )

  // Right column text (vertical center of header)
  const name = "Fabián Matamoros Vindiola"
  const title =
    lang === "en"
      ? "VP of Solutions | Operations & Technology Leader"
      : "VP of Solutions | Líder en Operaciones y Tecnología"
  const phone = "+52 (664) 176-2105"
  const email = "matamoros.fab@gmail.com"
  const location = "Tijuana / San Diego Area"

  // Center text block vertically in header
  const textBlockHeight =
    4 * HEADER_LINE_SPACING + NAME_FONT_SIZE + TITLE_FONT_SIZE
  const textStartY = headerBottomY + (HEADER_H - textBlockHeight) / 2 + textBlockHeight - 4

  let textY = textStartY
  page.drawText(name, {
    x: rightColX,
    y: textY,
    size: NAME_FONT_SIZE,
    font: helveticaBold,
    color: TEXT_COLOR,
  })
  textY -= NAME_FONT_SIZE + 6

  page.drawText(title, {
    x: rightColX,
    y: textY,
    size: TITLE_FONT_SIZE,
    font: helvetica,
    color: SUB_TEXT_COLOR,
  })
  textY -= TITLE_FONT_SIZE + HEADER_LINE_SPACING

  page.drawText(phone, {
    x: rightColX,
    y: textY,
    size: CONTACT_FONT_SIZE,
    font: helvetica,
    color: SUB_TEXT_COLOR,
  })
  textY -= CONTACT_FONT_SIZE + 6

  page.drawText(email, {
    x: rightColX,
    y: textY,
    size: CONTACT_FONT_SIZE,
    font: helvetica,
    color: SUB_TEXT_COLOR,
  })
  textY -= CONTACT_FONT_SIZE + 6

  page.drawText(location, {
    x: rightColX,
    y: textY,
    size: CONTACT_FONT_SIZE,
    font: helvetica,
    color: SUB_TEXT_COLOR,
  })

  return headerBottomY
}

/** BLOCK 2 — Divider line. Returns y below divider (body start). */
function drawDivider(ctx: LayoutContext, headerBottomY: number): number {
  const { page, width } = ctx
  const dividerY = headerBottomY + DIVIDER_BELOW_HEADER
  page.drawLine({
    start: { x: MARGIN_X, y: dividerY },
    end: { x: width - MARGIN_X, y: dividerY },
    thickness: 1,
    color: LINE_COLOR,
  })
  return dividerY - BODY_START_OFFSET
}

/** Split full letter text into body and signature parts. */
function splitBodyAndSignature(
  fullText: string,
  lang: "en" | "es"
): { body: string; closing: string; name: string } {
  const closing = lang === "en" ? "Sincerely," : "Atentamente,"
  const name = "Fabián Matamoros Vindiola"
  const parts = fullText.split(/\n\n+/)
  const closingIdx = parts.findIndex((p) => p.trim() === closing)
  if (closingIdx >= 0) {
    const body = parts.slice(0, closingIdx).join("\n\n")
    return { body, closing, name }
  }
  const body = parts.slice(0, -2).join("\n\n")
  return { body, closing, name }
}

/** BLOCK 3 — Body text (flow layout). Returns y after last line. */
function drawBody(
  ctx: LayoutContext,
  bodyText: string,
  startY: number
): number {
  const { page, helvetica, contentWidth } = ctx
  let bodyFontSize = BODY_FONT_SIZE
  let leading = BODY_LEADING
  let wrapped = wrapText(bodyText, helvetica, bodyFontSize, contentWidth)

  // Fallback: if would overflow, reduce font and reflow once
  const minY = MARGIN_BOTTOM + 70
  const estimatedEndY = startY - wrapped.length * leading
  if (estimatedEndY < minY) {
    bodyFontSize = 12
    leading = 17
    wrapped = wrapText(bodyText, helvetica, bodyFontSize, contentWidth)
  }

  let y = startY
  for (const line of wrapped) {
    if (y < MARGIN_BOTTOM) break
    page.drawText(line, {
      x: MARGIN_X,
      y,
      size: bodyFontSize,
      font: helvetica,
      color: TEXT_COLOR,
    })
    y -= leading
  }
  return y
}

/** BLOCK 4 — Signature block (faint line, closing, name bold). */
function drawSignature(
  ctx: LayoutContext,
  closing: string,
  name: string,
  currentY: number
): void {
  const { page, width, helvetica, helveticaBold } = ctx
  const sigTopY = currentY - SIG_SPACING

  page.drawLine({
    start: { x: MARGIN_X, y: sigTopY },
    end: { x: width - MARGIN_X, y: sigTopY },
    thickness: 1,
    color: LINE_COLOR,
  })

  page.drawText(closing, {
    x: MARGIN_X,
    y: sigTopY - 18,
    size: SIG_FONT_SIZE,
    font: helvetica,
    color: TEXT_COLOR,
  })

  page.drawText(name, {
    x: MARGIN_X,
    y: sigTopY - 34,
    size: SIG_FONT_SIZE,
    font: helveticaBold,
    color: TEXT_COLOR,
  })
}

/**
 * Generates a Presentation Letter PDF as a Blob.
 * @param lang - 'en' or 'es' for language-specific content
 * @returns Blob of the PDF
 */
export async function generatePresentationLetterPdf(
  lang: "en" | "es"
): Promise<Blob> {
  const fullText = LETTER_TEXT[lang]
  enforceWordLimit(fullText, lang)

  const doc = await PDFDocument.create()
  const page = doc.addPage(PageSizes.A4)
  const width = page.getWidth()
  const height = page.getHeight()
  const contentWidth = width - 2 * MARGIN_X

  const helvetica = await doc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold)

  const imageBytes = await fetch("/images/fabian-new.png").then((r) =>
    r.arrayBuffer()
  )
  const image = await doc.embedPng(new Uint8Array(imageBytes))

  const ctx: LayoutContext = {
    page,
    width,
    height,
    contentWidth,
    helvetica,
    helveticaBold,
  }

  drawAccentBand(ctx)
  const headerBottomY = drawHeaderWithCircularPhoto(ctx, lang, image)
  let y = drawDivider(ctx, headerBottomY)
  const { body, closing, name } = splitBodyAndSignature(fullText, lang)
  y = drawBody(ctx, body, y)
  drawSignature(ctx, closing, name, y)

  const pdfBytes = await doc.save()
  return new Blob([pdfBytes], { type: "application/pdf" })
}
