# Fabián Matamoros - Bilingual Resume Website

A modern, bilingual (English/Spanish) résumé website with role-based content tailoring, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Bilingual Support**: Seamless switching between English and Spanish
- 🎯 **Role-Based Tailoring**: Content automatically reorders based on selected role (Product Owner, Delivery Leader, Salesforce Expert, Restaurant Tech)
- 🤖 **AI Job Matching**: Paste a job description to automatically detect the best role match
- 🎨 **Modern Design**: Petroleum blue and teal green color scheme with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices with sticky mobile CTAs
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- 🚀 **Performance**: Built with Next.js App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Deployment**: Netlify-ready
- **Forms**: Netlify Forms with honeypot protection

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd fabian-resume
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── tailor/page.tsx    # Job description analyzer
│   ├── privacy/page.tsx   # Privacy policy
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── highlights.tsx
│   ├── experience.tsx
│   ├── skills-matrix.tsx
│   ├── contact-form.tsx
│   └── ...
├── content/              # Content and translations
│   ├── site.json        # Main content data
│   └── i18n/            # Translation files
│       ├── en.json
│       └── es.json
├── lib/                 # Utility functions
│   ├── i18n.ts         # Internationalization
│   ├── roles.ts        # Role detection and mapping
│   └── sort.ts         # Content sorting utilities
└── public/             # Static assets
    ├── images/
    └── video/
\`\`\`

## Customization

### Content

Edit `content/site.json` to update:
- Personal information
- Experience entries
- Skills and expertise
- Highlights and achievements

### Translations

Modify translation files in `content/i18n/`:
- `en.json` - English translations
- `es.json` - Spanish translations

### Styling

Update `app/globals.css` to customize:
- Color scheme (petroleum blue and teal green by default)
- Typography
- Spacing and layout

### Role Detection

Customize keyword mapping in `lib/roles.ts` to improve job description analysis.

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the configuration from `netlify.toml`
4. Deploy!

The site includes:
- Automatic form handling via Netlify Forms
- Optimized Next.js build configuration
- Proper redirects for client-side routing

## Assets

Replace placeholder assets in `/public`:
- `/images/fabian.jpg` - Professional headshot
- `/images/skyline.jpg` - Hero background image

## License

© 2025 Fabián Matamoros Vindiola. All rights reserved.

## Contact

- WhatsApp: +52 664 176 2105
- Email: matamoros.fab@gmail.com
- Location: Tijuana / San Diego
