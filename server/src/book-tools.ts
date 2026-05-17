import type { Tool } from '@anthropic-ai/sdk/resources/messages.js'
import { PARTS, ALL_CHAPTERS, findChapter, readChapter } from './book-index.js'

export const BOOK_TOOLS: Tool[] = [
  {
    name: 'book_ls',
    description: 'Listet die Buchstruktur auf. Ohne Argument: alle Teile und Kapitel. Mit part-Argument: nur Kapitel eines Teils.',
    input_schema: {
      type: 'object',
      properties: {
        part: {
          type: 'string',
          description: 'Optionaler Teilname (z.B. "Teil I – Fundament") oder Teilnummer (z.B. "I")',
        },
      },
    },
  },
  {
    name: 'book_cat',
    description: 'Liest den Inhalt eines Buchkapitels. Gibt den vollständigen Markdown-Inhalt zurück.',
    input_schema: {
      type: 'object',
      properties: {
        chapter_id: {
          type: 'string',
          description: 'Kapitel-ID (z.B. "01-architektur-als-system") oder Pfad (z.B. "chapters/01-architektur-als-system")',
        },
        section: {
          type: 'string',
          description: 'Optional: Nur diesen H2-Abschnitt ausgeben (Überschriftstext)',
        },
      },
      required: ['chapter_id'],
    },
  },
  {
    name: 'book_search',
    description: 'Sucht nach Text in allen Buchkapiteln. Gibt passende Absätze mit Kontext zurück.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Suchbegriff oder -phrase',
        },
        limit: {
          type: 'number',
          description: 'Maximale Anzahl Treffer (Standard: 5)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'book_toc',
    description: 'Gibt das Inhaltsverzeichnis zurück. Ohne Argument: gesamtes Buch. Mit chapter_id: Abschnittsüberschriften dieses Kapitels.',
    input_schema: {
      type: 'object',
      properties: {
        chapter_id: {
          type: 'string',
          description: 'Optionale Kapitel-ID für kapitelinternes Inhaltsverzeichnis',
        },
      },
    },
  },
  {
    name: 'book_metadata',
    description: 'Gibt Metadaten zu Kapiteln zurück (Titel, Teil, Überschriften, Wortzahl, Zusammenfassung).',
    input_schema: {
      type: 'object',
      properties: {
        chapter_id: {
          type: 'string',
          description: 'Optionale Kapitel-ID für detaillierte Metadaten eines Kapitels',
        },
      },
    },
  },
]

export function executeTool(name: string, input: Record<string, unknown>): string {
  try {
    switch (name) {
      case 'book_ls':    return bookLs(input.part as string | undefined)
      case 'book_cat':   return bookCat(input.chapter_id as string, input.section as string | undefined)
      case 'book_search':return bookSearch(input.query as string, input.limit as number | undefined)
      case 'book_toc':   return bookToc(input.chapter_id as string | undefined)
      case 'book_metadata': return bookMetadata(input.chapter_id as string | undefined)
      default:           return `Unbekanntes Tool: ${name}`
    }
  } catch (e) {
    return `Fehler bei Tool ${name}: ${String(e)}`
  }
}

function bookLs(part?: string): string {
  if (part) {
    const found = PARTS.find(p =>
      p.title === part ||
      p.title.toLowerCase().includes(part.toLowerCase()) ||
      p.title.includes(part)
    )
    if (!found) {
      const list = PARTS.map(p => `  - ${p.title}`).join('\n')
      return `Teil '${part}' nicht gefunden. Verfügbare Teile:\n${list}`
    }
    return `${found.title}:\n${found.chapters.map(c =>
      `  ${c.num ? c.num.padStart(2) + '. ' : '    '}${c.title}  [${c.path}]`
    ).join('\n')}`
  }

  return PARTS.map(p =>
    `${p.title}:\n${p.chapters.map(c =>
      `  ${c.num ? c.num.padStart(2) + '. ' : '    '}${c.title}  [${c.path}]`
    ).join('\n')}`
  ).join('\n\n')
}

function bookCat(chapterId: string, section?: string): string {
  const chapter = findChapter(chapterId)
  if (!chapter) {
    return `Kapitel '${chapterId}' nicht gefunden.\n\nVerfügbare IDs:\n${ALL_CHAPTERS.map(c => `  ${c.id}`).join('\n')}`
  }

  const content = readChapter(chapter)

  if (!section) return content

  const lines = content.split('\n')
  const startIdx = lines.findIndex(l =>
    l.match(/^##\s+/) && l.toLowerCase().includes(section.toLowerCase())
  )

  if (startIdx === -1) {
    return `Abschnitt '${section}' nicht gefunden in "${chapter.title}".\n\nVorhandene Abschnitte:\n${chapter.headings.map(h => `  - ${h}`).join('\n')}`
  }

  const endIdx = lines.findIndex((l, i) => i > startIdx && l.match(/^##\s+/))
  const slice = endIdx === -1 ? lines.slice(startIdx) : lines.slice(startIdx, endIdx)
  return slice.join('\n')
}

function bookSearch(query: string, limit = 5): string {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1)
  if (terms.length === 0) return 'Bitte einen Suchbegriff angeben.'

  const results: { chapter: string; chapterId: string; heading: string; excerpt: string; score: number }[] = []

  for (const chapter of ALL_CHAPTERS) {
    const content = readChapter(chapter)
    const blocks = content.split(/\n\n+/)
    let currentHeading = chapter.title

    for (const block of blocks) {
      const trimmed = block.trim()
      if (!trimmed) continue

      const headingMatch = trimmed.match(/^#{1,4}\s+(.+)/)
      if (headingMatch) {
        currentHeading = headingMatch[1].trim()
        continue
      }

      const lower = trimmed.toLowerCase()
      const matchCount = terms.filter(t => lower.includes(t)).length
      if (matchCount === 0) continue

      // Score: matches × relevance boost for title match
      const titleBoost = chapter.title.toLowerCase().includes(terms[0]) ? 2 : 0
      const score = matchCount + titleBoost

      const excerpt = trimmed.replace(/\n/g, ' ').replace(/[*_`#]/g, '').slice(0, 250)
      results.push({
        chapter: chapter.title,
        chapterId: chapter.id,
        heading: currentHeading,
        excerpt: excerpt.length === 250 ? excerpt + '…' : excerpt,
        score,
      })
    }
  }

  results.sort((a, b) => b.score - a.score)
  const top = results.slice(0, limit)

  if (top.length === 0) return `Keine Treffer für "${query}".`

  const header = `${top.length} Treffer für "${query}":\n\n`
  return header + top.map((r, i) =>
    `[${i + 1}] ${r.chapter} (${r.chapterId})\n    Abschnitt: ${r.heading}\n    ${r.excerpt}`
  ).join('\n\n')
}

function bookToc(chapterId?: string): string {
  if (chapterId) {
    const chapter = findChapter(chapterId)
    if (!chapter) return `Kapitel '${chapterId}' nicht gefunden.`

    const content = readChapter(chapter)
    const headings: string[] = []
    for (const line of content.split('\n')) {
      const h1 = line.match(/^#\s+(.+)/)
      const h2 = line.match(/^##\s+(.+)/)
      const h3 = line.match(/^###\s+(.+)/)
      if (h1) headings.push(`${h1[1]}`)
      else if (h2) headings.push(`  ${h2[1]}`)
      else if (h3) headings.push(`    ${h3[1]}`)
    }
    return `Inhaltsverzeichnis: ${chapter.title}\n\n${headings.join('\n')}`
  }

  const lines: string[] = ['Inhaltsverzeichnis – BIM von Grund auf', '']
  for (const part of PARTS) {
    lines.push(part.title)
    for (const c of part.chapters) {
      lines.push(`  ${c.num ? c.num.padStart(2) + '. ' : '    '}${c.title}`)
    }
    lines.push('')
  }
  return lines.join('\n')
}

function bookMetadata(chapterId?: string): string {
  if (chapterId) {
    const c = findChapter(chapterId)
    if (!c) return `Kapitel '${chapterId}' nicht gefunden.`
    return [
      `Titel: ${c.title}`,
      `ID: ${c.id}`,
      `Pfad: ${c.path}`,
      `Teil: ${c.part}`,
      `Kapitel-Nr: ${c.num || '(kein)'}`,
      `Wortzahl: ~${c.wordCount}`,
      `Zusammenfassung: ${c.summary}`,
      `Abschnitte:\n${c.headings.map(h => `  ${h}`).join('\n')}`,
    ].join('\n')
  }

  return ALL_CHAPTERS.map(c =>
    `${c.num ? c.num + '.' : ' '} ${c.title} [${c.id}]\n   Teil: ${c.part} | ~${c.wordCount} Wörter\n   ${c.summary.slice(0, 120)}${c.summary.length > 120 ? '…' : ''}`
  ).join('\n\n')
}
