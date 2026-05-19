export type BookStatus = 'current' | 'planned' | 'idea'

export interface BookMeta {
  slug: string
  title: string
  subtitle: string
  description: string
  status: BookStatus
  lifecycle: string[]
  domains: string[]
  accent: string
  href: string
}

export const CURRENT_BOOK_SLUG = 'bim-von-grund-auf'
export const CURRENT_BOOK_BASE = `/books/${CURRENT_BOOK_SLUG}`

export const BOOKS: BookMeta[] = [
  {
    slug: CURRENT_BOOK_SLUG,
    title: 'BIM von Grund auf',
    subtitle: 'Architektur, Bauprozess und BIM-Modell verstehen',
    description: 'Das bestehende Buch: vom architektonischen Entwurf über Konstruktion, TGA, Bauphysik und Projektprozess bis IFC, CDE, Sanierung und Digitalem Zwilling.',
    status: 'current',
    lifecycle: ['Planung & Genehmigung', 'Bauausführung', 'Übergabe'],
    domains: ['Architektur', 'BIM', 'HOAI', 'IFC', 'Bauprozess'],
    accent: '#5271ff',
    href: CURRENT_BOOK_BASE,
  },
  {
    slug: 'bim-ki-praxis',
    title: 'BIM & KI in der Praxis',
    subtitle: 'Vom Datenmodell zur intelligenten Planungssoftware',
    description: 'Ein mögliches Folgebuch über Modellqualität, IFC-Pipelines, LLM-Workflows, regelbasierte Prüfungen, Agenten, Mengenermittlung, Variantenbewertung und KI-gestützte BIM-Anwendungen.',
    status: 'planned',
    lifecycle: ['Planung & Genehmigung', 'Bauausführung', 'Betrieb'],
    domains: ['BIM', 'KI', 'Software', 'Datenqualität', 'Automation'],
    accent: '#6d5bd0',
    href: '/books/bim-ki-praxis',
  },
  {
    slug: 'projektentwicklung-developer',
    title: 'Projektentwicklung & Developer',
    subtitle: 'Warum ein Bauprojekt überhaupt entsteht',
    description: 'Markt, Standort, Nutzungskonzept, Machbarkeit, Renditerechnung, Finanzierung, Risiko und die Auftraggeberperspektive vor dem architektonischen Entwurf.',
    status: 'idea',
    lifecycle: ['Grundstück & Entwicklung', 'Transaktion'],
    domains: ['Projektentwicklung', 'Standort', 'Rendite', 'Risiko'],
    accent: '#d18a2f',
    href: '/books/projektentwicklung-developer',
  },
  {
    slug: 'baubetrieb-fuer-entwickler',
    title: 'Baubetrieb für Entwickler',
    subtitle: 'Die Unternehmerperspektive auf Baustelle und Kalkulation',
    description: 'Kalkulation, Angebotsbildung, Baustellenorganisation, Lean Construction, Maschineneinsatz, Logistik, Taktplanung und operative Bauausführung.',
    status: 'idea',
    lifecycle: ['Bauausführung'],
    domains: ['Baubetrieb', 'Kalkulation', 'Lean', 'Logistik'],
    accent: '#bf4b39',
    href: '/books/baubetrieb-fuer-entwickler',
  },
  {
    slug: 'fm-digitaler-gebaeudebetrieb',
    title: 'FM & digitaler Gebäudebetrieb',
    subtitle: 'Was nach LP 8 mit Modell, Daten und Gebäude passiert',
    description: 'Facility Management, CAFM/IWMS, COBie, ISO 55000, Wartung, Instandhaltung, Betreiberpflichten, Sensorik und Digitaler Zwilling im Betrieb.',
    status: 'idea',
    lifecycle: ['Betrieb & Verwaltung', 'Umbau / Abbruch'],
    domains: ['Facility Management', 'CAFM', 'COBie', 'Betrieb', 'Digital Twin'],
    accent: '#3c9b62',
    href: '/books/fm-digitaler-gebaeudebetrieb',
  },
  {
    slug: 'immobilienwirtschaft-verwaltung',
    title: 'Immobilienwirtschaft & Verwaltung',
    subtitle: 'Bewertung, Finanzierung, WEG und Asset Management',
    description: 'Ein eigenes Wissensfeld nach der Fertigstellung: Verkehrswert, DCF, Finanzierung, WEG-Recht, Betriebskosten, Property Management, Capex und ESG.',
    status: 'idea',
    lifecycle: ['Betrieb & Verwaltung', 'Transaktion'],
    domains: ['Bewertung', 'Finanzierung', 'WEG', 'Property Management', 'ESG'],
    accent: '#9b3f6b',
    href: '/books/immobilienwirtschaft-verwaltung',
  },
]

export function getBook(slug: string | undefined): BookMeta | undefined {
  return BOOKS.find(book => book.slug === slug)
}

export function bookPath(path: string): string {
  if (path === 'index') return CURRENT_BOOK_BASE
  return `${CURRENT_BOOK_BASE}/${path}`
}

export function normalizeBookPath(pathname: string): string {
  const clean = pathname.replace(/^\/+/, '').split(/[?#]/)[0]
  if (!clean || clean === 'index') return 'index'
  if (clean === `books/${CURRENT_BOOK_SLUG}`) return 'index'

  const prefix = `books/${CURRENT_BOOK_SLUG}/`
  if (clean.startsWith(prefix)) {
    const stripped = clean.slice(prefix.length)
    return stripped || 'index'
  }

  return clean
}
