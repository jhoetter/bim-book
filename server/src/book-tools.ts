import type { Tool } from '@anthropic-ai/sdk/resources/messages.js'
import { PARTS, ALL_CHAPTERS, findChapter, readChapter, getImageManifest, getImagesForChapter } from './book-index.js'
import type { ImageMeta } from './book-index.js'
import { calcUValue, calcDewpoint, calcSound, calcHoai } from './calculators.js'
import type { ULayer, SoundLayer } from './calculators.js'

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
    description: 'Gibt Metadaten zu Kapiteln zurück (Titel, Teil, Überschriften, Wortzahl, Zusammenfassung, Abbildungen).',
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
  {
    name: 'calc_u_value',
    description: 'Berechnet den U-Wert (Wärmedurchgangskoeffizient) eines mehrschichtigen Bauteils nach DIN EN ISO 6946. Vergleicht mit GEG 2024 Grenzwerten.',
    input_schema: {
      type: 'object',
      properties: {
        layers: {
          type: 'array',
          description: 'Schichten von innen nach außen',
          items: {
            type: 'object',
            properties: {
              name:   { type: 'string', description: 'Bezeichnung der Schicht' },
              d_mm:   { type: 'number', description: 'Dicke in mm' },
              lambda: { type: 'number', description: 'Wärmeleitfähigkeit in W/(mK)' },
            },
            required: ['name', 'd_mm', 'lambda'],
          },
        },
        component: {
          type: 'string',
          enum: ['wall', 'roof', 'floor', 'window'],
          description: 'Bauteiltyp für GEG-Vergleich',
        },
      },
      required: ['layers'],
    },
  },
  {
    name: 'calc_dewpoint',
    description: 'Berechnet den Taupunkt und bewertet Schimmelrisiko nach DIN 4108-2 (fRsi-Methode).',
    input_schema: {
      type: 'object',
      properties: {
        temp_indoor:     { type: 'number', description: 'Raumtemperatur in °C (z.B. 20)' },
        humidity_indoor: { type: 'number', description: 'Relative Luftfeuchte in % (z.B. 50)' },
        temp_outdoor:    { type: 'number', description: 'Außentemperatur in °C (z.B. -10)' },
        f_Rsi:           { type: 'number', description: 'Temperaturfaktor (Standard: 0.70)' },
      },
      required: ['temp_indoor', 'humidity_indoor', 'temp_outdoor'],
    },
  },
  {
    name: 'calc_sound',
    description: 'Schätzt das bewertete Schalldämmmaß R\'w eines einschaligen Bauteils nach dem Massengesetz. Vergleicht mit DIN 4109.',
    input_schema: {
      type: 'object',
      properties: {
        layers: {
          type: 'array',
          description: 'Schichten des Bauteils',
          items: {
            type: 'object',
            properties: {
              name:  { type: 'string', description: 'Materialbezeichnung' },
              d_mm:  { type: 'number', description: 'Dicke in mm' },
              rho:   { type: 'number', description: 'Rohdichte in kg/m³' },
            },
            required: ['name', 'd_mm', 'rho'],
          },
        },
      },
      required: ['layers'],
    },
  },
  {
    name: 'calc_hoai',
    description: 'Berechnet das HOAI-Honorar (2021) für Objektplanung Gebäude nach anrechenbaren Kosten, Honorarzone und Leistungsphasen.',
    input_schema: {
      type: 'object',
      properties: {
        kosten:    { type: 'number', description: 'Anrechenbare Kosten in € (KG 300+400)' },
        zone:      { type: 'number', enum: [1, 2, 3], description: '1=HZ I einfach, 2=HZ III mittel, 3=HZ V sehr komplex' },
        lps:       { type: 'array', items: { type: 'number' }, description: 'Gewählte Leistungsphasen (1–9)' },
      },
      required: ['kosten', 'zone', 'lps'],
    },
  },
  {
    name: 'book_image',
    description: 'Fragt Abbildungen/Bilder aus dem Buch ab. Ohne Argument: alle Abbildungen. Mit chapter_id: Bilder eines Kapitels. Mit image_key: Detail einer Abbildung.',
    input_schema: {
      type: 'object',
      properties: {
        chapter_id: {
          type: 'string',
          description: 'Optionale Kapitel-ID um nur Bilder dieses Kapitels zu sehen',
        },
        image_key: {
          type: 'string',
          description: 'Optionaler Bildschlüssel (z.B. "kap01_schichtenmodell") für Details einer Abbildung',
        },
        search: {
          type: 'string',
          description: 'Optionaler Suchbegriff um Abbildungen nach Beschreibung/Stichwörtern zu filtern',
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
      case 'book_image':   return bookImage(input.chapter_id as string | undefined, input.image_key as string | undefined, input.search as string | undefined)
      case 'calc_u_value': return calcUValue(input.layers as ULayer[], input.component as string | undefined)
      case 'calc_dewpoint':return calcDewpoint(input.temp_indoor as number, input.humidity_indoor as number, input.temp_outdoor as number, input.f_Rsi as number | undefined)
      case 'calc_sound':   return calcSound(input.layers as SoundLayer[])
      case 'calc_hoai':    return calcHoai(input.kosten as number, input.zone as 1|2|3, input.lps as number[])
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

function inlineImageDescriptions(content: string, chapterId: string): string {
  const images = getImagesForChapter(chapterId)
  if (images.length === 0) return content

  const imageMap = new Map(images.map(img => [img.file, img]))

  // Replace: ![alt](../assets/illustrations/NAME.png) → description block
  return content.replace(
    /!\[([^\]]*)\]\([^)]*\/([^/)]+\.png)\)/g,
    (_match, alt, filename) => {
      const img = imageMap.get(filename)
      if (!img) return _match
      const figLabel = img.figureNum ? `**${img.figureNum}**` : '**[Abbildung]**'
      return [
        `${figLabel} ${img.caption}`,
        `> *Bildinhalt:* ${img.description}`,
        img.keywords.length ? `> *Stichwörter:* ${img.keywords.join(', ')}` : '',
      ].filter(Boolean).join('\n')
    }
  )
}

function bookCat(chapterId: string, section?: string): string {
  const chapter = findChapter(chapterId)
  if (!chapter) {
    return `Kapitel '${chapterId}' nicht gefunden.\n\nVerfügbare IDs:\n${ALL_CHAPTERS.map(c => `  ${c.id}`).join('\n')}`
  }

  const rawContent = readChapter(chapter)
  // Inline image descriptions so agents get full textual content
  const content = inlineImageDescriptions(rawContent, chapter.id)

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

  type Result = { chapter: string; chapterId: string; heading: string; excerpt: string; score: number; isImage: boolean }
  const results: Result[] = []

  // Text search across chapters
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
      // Skip bare image references without description — they'll show up as image results
      if (trimmed.match(/^!\[/)) continue

      const lower = trimmed.toLowerCase()
      const matchCount = terms.filter(t => lower.includes(t)).length
      if (matchCount === 0) continue

      const titleBoost = chapter.title.toLowerCase().includes(terms[0]) ? 2 : 0
      const score = matchCount + titleBoost

      const excerpt = trimmed.replace(/\n/g, ' ').replace(/[*_`#![\]()]/g, '').slice(0, 250)
      results.push({
        chapter: chapter.title,
        chapterId: chapter.id,
        heading: currentHeading,
        excerpt: excerpt.length === 250 ? excerpt + '…' : excerpt,
        score,
        isImage: false,
      })
    }
  }

  // Image search: search in descriptions and keywords
  const manifest = getImageManifest()
  for (const [key, img] of Object.entries(manifest)) {
    const searchText = [img.description, img.caption, ...img.keywords].join(' ').toLowerCase()
    const matchCount = terms.filter(t => searchText.includes(t)).length
    if (matchCount === 0) continue

    const chapterTitle = ALL_CHAPTERS.find(c => c.id === img.chapterId)?.title ?? img.chapterId
    results.push({
      chapter: chapterTitle,
      chapterId: img.chapterId,
      heading: img.figureNum ? `${img.figureNum}: ${img.caption}` : img.caption,
      excerpt: img.description.slice(0, 250) + (img.description.length > 250 ? '…' : ''),
      score: matchCount + 1, // slight boost for image matches (intentionally illustrated)
      isImage: true,
    })
  }

  results.sort((a, b) => b.score - a.score)
  const top = results.slice(0, limit)

  if (top.length === 0) return `Keine Treffer für "${query}".`

  const header = `${top.length} Treffer für "${query}":\n\n`
  return header + top.map((r, i) =>
    r.isImage
      ? `[${i + 1}] 🖼 Abbildung — ${r.chapter} (${r.chapterId})\n    ${r.heading}\n    ${r.excerpt}`
      : `[${i + 1}] ${r.chapter} (${r.chapterId})\n    Abschnitt: ${r.heading}\n    ${r.excerpt}`
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
    const imageList = c.images.length > 0
      ? `\nAbbildungen (${c.images.length}):\n${c.images.map(img => `  ${img.figureNum || '–'}: ${img.caption} [${img.key}]`).join('\n')}`
      : '\nAbbildungen: keine'
    return [
      `Titel: ${c.title}`,
      `ID: ${c.id}`,
      `Pfad: ${c.path}`,
      `Teil: ${c.part}`,
      `Kapitel-Nr: ${c.num || '(kein)'}`,
      `Wortzahl: ~${c.wordCount}`,
      `Zusammenfassung: ${c.summary}`,
      `Abschnitte:\n${c.headings.map(h => `  ${h}`).join('\n')}`,
      imageList,
    ].join('\n')
  }

  return ALL_CHAPTERS.map(c => {
    const imgNote = c.images.length > 0 ? ` | ${c.images.length} Abb.` : ''
    return `${c.num ? c.num + '.' : ' '} ${c.title} [${c.id}]\n   Teil: ${c.part} | ~${c.wordCount} Wörter${imgNote}\n   ${c.summary.slice(0, 120)}${c.summary.length > 120 ? '…' : ''}`
  }).join('\n\n')
}

function bookImage(chapterId?: string, imageKey?: string, search?: string): string {
  const manifest = getImageManifest()
  const allImages = Object.values(manifest)

  if (allImages.length === 0) {
    return 'Kein Bildmanifest gefunden. Generieren mit: python3 skills/imagedesc/describe.py'
  }

  // Detail for one image
  if (imageKey) {
    const img = manifest[imageKey]
    if (!img) {
      return `Abbildung '${imageKey}' nicht gefunden.\n\nVerfügbare Schlüssel:\n${allImages.map(i => `  ${i.key}`).join('\n')}`
    }
    const chapterTitle = ALL_CHAPTERS.find(c => c.id === img.chapterId)?.title ?? img.chapterId
    return [
      `Abbildung: ${img.key}`,
      `Datei: ${img.file}`,
      `Kapitel: ${chapterTitle} (${img.chapterId})`,
      img.figureNum ? `Abbildungsnummer: ${img.figureNum}` : '',
      `Typ: ${img.type || '–'}`,
      `Bildunterschrift: ${img.caption}`,
      `\nBeschreibung:\n${img.description}`,
      `\nStichwörter: ${img.keywords.join(', ')}`,
    ].filter(Boolean).join('\n')
  }

  let images = chapterId
    ? allImages.filter(img => img.chapterId === chapterId || img.chapterId.includes(chapterId))
    : allImages

  // Text search over descriptions and keywords
  if (search) {
    const terms = search.toLowerCase().split(/\s+/).filter(t => t.length > 1)
    images = images.filter(img => {
      const text = [img.description, img.caption, ...img.keywords].join(' ').toLowerCase()
      return terms.some(t => text.includes(t))
    })
  }

  if (images.length === 0) return `Keine Abbildungen gefunden${search ? ` für "${search}"` : ''}.`

  const chapterFilter = chapterId ? ` (${chapterId})` : ''
  return `${images.length} Abbildung(en)${chapterFilter}:\n\n` + images.map(img => {
    const chTitle = ALL_CHAPTERS.find(c => c.id === img.chapterId)?.title ?? img.chapterId
    return [
      `[${img.key}] ${img.figureNum ? img.figureNum + ' – ' : ''}${img.caption}`,
      `  Kapitel: ${chTitle}`,
      `  ${img.description.slice(0, 180)}${img.description.length > 180 ? '…' : ''}`,
      `  Stichwörter: ${img.keywords.slice(0, 6).join(', ')}`,
    ].join('\n')
  }).join('\n\n')
}
