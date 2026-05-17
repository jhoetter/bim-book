import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const DOCS_DIR = join(__dirname, '..', '..', 'docs')

export interface ChapterMeta {
  id: string
  num: string
  title: string
  path: string
  part: string
  filePath: string
  headings: string[]
  wordCount: number
  summary: string
}

export interface Part {
  title: string
  chapters: ChapterMeta[]
}

const RAW_PARTS: Array<{ title: string; chapters: Array<{ id: string; num: string; title: string; path: string }> }> = [
  {
    title: 'Überblick',
    chapters: [
      { id: 'index', num: '', title: 'Überblick', path: 'index' },
    ],
  },
  {
    title: 'Teil I – Fundament',
    chapters: [
      { id: '01-architektur-als-system', num: '1', title: 'Architektur als System', path: 'chapters/01-architektur-als-system' },
      { id: '02-entwurf-raum-funktion', num: '2', title: 'Entwurf, Raum und Funktion', path: 'chapters/02-entwurf-raum-funktion' },
    ],
  },
  {
    title: 'Teil II – Baukörper',
    chapters: [
      { id: '03-baustoffe', num: '3', title: 'Baustoffe', path: 'chapters/03-baustoffe' },
      { id: '04-tragwerk', num: '4', title: 'Tragwerk: Lasten, Kräfte, Systeme', path: 'chapters/04-tragwerk' },
      { id: '05-konstruktion', num: '5', title: 'Konstruktion: Gründung, Wand, Decke, Dach', path: 'chapters/05-konstruktion' },
    ],
  },
  {
    title: 'Teil III – Bauphysik',
    chapters: [
      { id: '06-waermeschutz-geg', num: '6', title: 'Wärmeschutz & GEG', path: 'chapters/06-waermeschutz-geg' },
      { id: '07-feuchteschutz', num: '7', title: 'Feuchteschutz', path: 'chapters/07-feuchteschutz' },
      { id: '08-schallschutz', num: '8', title: 'Schallschutz', path: 'chapters/08-schallschutz' },
      { id: '09-brandschutz', num: '9', title: 'Brandschutz', path: 'chapters/09-brandschutz' },
    ],
  },
  {
    title: 'Teil IV – TGA',
    chapters: [
      { id: '10-heizung-waermeversorgung', num: '10', title: 'Heizung & Wärmeversorgung', path: 'chapters/10-heizung-waermeversorgung' },
      { id: '11-lueftung', num: '11', title: 'Lüftung & Raumluftqualität', path: 'chapters/11-lueftung' },
      { id: '12-sanitaer', num: '12', title: 'Sanitär & Entwässerung', path: 'chapters/12-sanitaer' },
      { id: '13-elektro', num: '13', title: 'Elektro & Gebäudeautomation', path: 'chapters/13-elektro' },
    ],
  },
  {
    title: 'Teil V – Recht & Prozess',
    chapters: [
      { id: '14-planungsrecht', num: '14', title: 'Planungsrecht', path: 'chapters/14-planungsrecht' },
      { id: '15-hoai', num: '15', title: 'HOAI: Phasen, Leistungen, Koordination', path: 'chapters/15-hoai' },
      { id: '16-kosten-ausschreibung', num: '16', title: 'Kosten & Ausschreibung', path: 'chapters/16-kosten-ausschreibung' },
    ],
  },
  {
    title: 'Teil VI – BIM',
    chapters: [
      { id: '17-was-bim-wirklich-ist', num: '17', title: 'Was BIM wirklich ist', path: 'chapters/17-was-bim-wirklich-ist' },
      { id: '18-ifc', num: '18', title: 'IFC: Die Sprache des digitalen Gebäudes', path: 'chapters/18-ifc' },
      { id: '19-klassifikation', num: '19', title: 'Klassifikation', path: 'chapters/19-klassifikation' },
      { id: '20-prozess-kollaboration', num: '20', title: 'Prozess & Kollaboration', path: 'chapters/20-prozess-kollaboration' },
      { id: '21-bim-praxis', num: '21', title: 'BIM in der Praxis', path: 'chapters/21-bim-praxis' },
    ],
  },
  {
    title: 'Teil VII – Nachhaltigkeit',
    chapters: [
      { id: '22-nachhaltigkeit', num: '22', title: 'Nachhaltigkeit & Kreislaufwirtschaft', path: 'chapters/22-nachhaltigkeit' },
      { id: '23-sanierung', num: '23', title: 'Sanierung', path: 'chapters/23-sanierung' },
      { id: '24-digitaler-zwilling-ki', num: '24', title: 'Digitaler Zwilling & KI', path: 'chapters/24-digitaler-zwilling-ki' },
    ],
  },
  {
    title: 'Anhang',
    chapters: [
      { id: 'kastanienallee7', num: '', title: 'Kastanienallee 7', path: 'appendix/kastanienallee7' },
      { id: 'glossar', num: '', title: 'Glossar', path: 'appendix/glossar' },
      { id: 'ifc-referenz', num: '', title: 'IFC-Schnellreferenz', path: 'appendix/ifc-referenz' },
      { id: 'normen', num: '', title: 'Normen & Gesetze', path: 'appendix/normen' },
    ],
  },
]

function parseMarkdownMeta(content: string): { headings: string[]; wordCount: number; summary: string } {
  const lines = content.split('\n')
  const headings: string[] = []
  let summary = ''

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/)
    const h3 = line.match(/^###\s+(.+)/)
    if (h2) headings.push(h2[1].trim())
    else if (h3) headings.push('  ' + h3[1].trim())
  }

  // First non-empty, non-heading paragraph as summary
  const paragraphs = content.split(/\n\n+/)
  for (const para of paragraphs) {
    const stripped = para.trim()
    if (stripped && !stripped.startsWith('#') && !stripped.startsWith('!') && !stripped.startsWith('---')) {
      summary = stripped.replace(/\n/g, ' ').slice(0, 300)
      if (summary.length === 300) summary += '…'
      break
    }
  }

  const words = content.replace(/[#*`_\[\]()]/g, ' ').split(/\s+/).filter(Boolean)
  return { headings, wordCount: words.length, summary }
}

function buildMeta(raw: { id: string; num: string; title: string; path: string }, part: string): ChapterMeta {
  const filePath = join(DOCS_DIR, raw.path + '.md')
  let headings: string[] = []
  let wordCount = 0
  let summary = ''

  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf-8')
    const parsed = parseMarkdownMeta(content)
    headings = parsed.headings
    wordCount = parsed.wordCount
    summary = parsed.summary
  }

  return { ...raw, part, filePath, headings, wordCount, summary }
}

export const PARTS: Part[] = RAW_PARTS.map(p => ({
  title: p.title,
  chapters: p.chapters.map(c => buildMeta(c, p.title)),
}))

export const ALL_CHAPTERS: ChapterMeta[] = PARTS.flatMap(p => p.chapters)

export function findChapter(idOrPath: string): ChapterMeta | undefined {
  return ALL_CHAPTERS.find(c =>
    c.id === idOrPath ||
    c.path === idOrPath ||
    c.path.endsWith('/' + idOrPath) ||
    c.id === idOrPath.replace(/^(chapters|appendix)\//, '')
  )
}

export function readChapter(chapter: ChapterMeta): string {
  if (!existsSync(chapter.filePath)) return `# ${chapter.title}\n\n*(Noch nicht geschrieben)*`
  return readFileSync(chapter.filePath, 'utf-8')
}
