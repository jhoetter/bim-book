#!/usr/bin/env node
/**
 * BIM Book MCP Server (stdio transport)
 *
 * Exposes book content as MCP tools so any MCP-compatible agent
 * (Claude Code, Claude Desktop, etc.) can query the book directly.
 *
 * Registration in .claude/settings.json:
 *   "mcpServers": { "bim-book": { "command": "npx", "args": ["tsx", "server/src/mcp-server.ts"] } }
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { BOOK_TOOLS, executeTool } from './book-tools.js'
import { ALL_CHAPTERS, PARTS } from './book-index.js'

const server = new McpServer({
  name: 'bim-book',
  version: '0.1.0',
})

// Register each book tool as an MCP tool
server.tool(
  'book_ls',
  'Listet die Buchstruktur auf. Ohne part: alle Teile und Kapitel. Mit part: Kapitel eines Teils.',
  { part: z.string().optional().describe('Optionaler Teilname, z.B. "Teil I – Fundament"') },
  async ({ part }) => ({
    content: [{ type: 'text', text: executeTool('book_ls', { part }) }],
  })
)

server.tool(
  'book_cat',
  'Liest den Inhalt eines Buchkapitels (vollständiges Markdown).',
  {
    chapter_id: z.string().describe('Kapitel-ID z.B. "01-architektur-als-system" oder Pfad "chapters/01-architektur-als-system"'),
    section: z.string().optional().describe('Optional: nur diesen H2-Abschnitt ausgeben'),
  },
  async ({ chapter_id, section }) => ({
    content: [{ type: 'text', text: executeTool('book_cat', { chapter_id, section }) }],
  })
)

server.tool(
  'book_search',
  'Sucht nach Text in allen Buchkapiteln. Gibt passende Absätze mit Kontext zurück.',
  {
    query: z.string().describe('Suchbegriff oder -phrase'),
    limit: z.number().optional().describe('Maximale Trefferzahl (Standard: 5)'),
  },
  async ({ query, limit }) => ({
    content: [{ type: 'text', text: executeTool('book_search', { query, limit }) }],
  })
)

server.tool(
  'book_toc',
  'Inhaltsverzeichnis des Buchs oder eines Kapitels.',
  { chapter_id: z.string().optional().describe('Optionale Kapitel-ID für kapitelinternes ToC') },
  async ({ chapter_id }) => ({
    content: [{ type: 'text', text: executeTool('book_toc', { chapter_id }) }],
  })
)

server.tool(
  'book_metadata',
  'Metadaten zu Kapiteln: Titel, Teil, Abschnitte, Wortzahl, Zusammenfassung.',
  { chapter_id: z.string().optional().describe('Optionale Kapitel-ID; sonst Überblick aller Kapitel') },
  async ({ chapter_id }) => ({
    content: [{ type: 'text', text: executeTool('book_metadata', { chapter_id }) }],
  })
)

server.tool(
  'calc_u_value',
  'Berechnet U-Wert eines Bauteils (Schichten mit Dicke + Wärmeleitfähigkeit). Vergleich mit GEG 2024.',
  {
    layers: z.array(z.object({
      name:   z.string().describe('Schichtbezeichnung'),
      d_mm:   z.number().describe('Dicke in mm'),
      lambda: z.number().describe('Wärmeleitfähigkeit W/(mK)'),
    })).describe('Schichten von innen nach außen'),
    component: z.enum(['wall', 'roof', 'floor', 'window']).optional().describe('Bauteiltyp'),
  },
  async ({ layers, component }) => ({
    content: [{ type: 'text', text: executeTool('calc_u_value', { layers, component }) }],
  })
)

server.tool(
  'calc_dewpoint',
  'Taupunktberechnung und Schimmelrisiko nach DIN 4108-2 (fRsi-Methode).',
  {
    temp_indoor:     z.number().describe('Raumtemperatur °C'),
    humidity_indoor: z.number().describe('Relative Luftfeuchte %'),
    temp_outdoor:    z.number().describe('Außentemperatur °C'),
    f_Rsi:           z.number().optional().describe('Temperaturfaktor (Standard 0.70)'),
  },
  async ({ temp_indoor, humidity_indoor, temp_outdoor, f_Rsi }) => ({
    content: [{ type: 'text', text: executeTool('calc_dewpoint', { temp_indoor, humidity_indoor, temp_outdoor, f_Rsi }) }],
  })
)

server.tool(
  'calc_sound',
  'Schätzt Schalldämmmaß R\'w nach Massengesetz. Vergleich mit DIN 4109 Anforderungen.',
  {
    layers: z.array(z.object({
      name: z.string().describe('Material'),
      d_mm: z.number().describe('Dicke in mm'),
      rho:  z.number().describe('Rohdichte kg/m³'),
    })).describe('Schichten des Bauteils'),
  },
  async ({ layers }) => ({
    content: [{ type: 'text', text: executeTool('calc_sound', { layers }) }],
  })
)

server.tool(
  'calc_hoai',
  'HOAI 2021 Honorarberechnung für Objektplanung Gebäude nach anrechenbaren Kosten, Zone und LPs.',
  {
    kosten: z.number().describe('Anrechenbare Kosten in € (KG 300+400)'),
    zone:   z.union([z.literal(1), z.literal(2), z.literal(3)]).describe('1=HZ I, 2=HZ III, 3=HZ V'),
    lps:    z.array(z.number()).describe('Leistungsphasen 1–9'),
  },
  async ({ kosten, zone, lps }) => ({
    content: [{ type: 'text', text: executeTool('calc_hoai', { kosten, zone, lps }) }],
  })
)

server.tool(
  'book_image',
  'Fragt Abbildungen aus dem Buch ab. Ohne Argument: alle. Mit chapter_id: Bilder eines Kapitels. Mit image_key: Detail einer Abbildung. Mit search: Bildsuche.',
  {
    chapter_id: z.string().optional().describe('Kapitel-ID um nur Bilder dieses Kapitels zu sehen'),
    image_key: z.string().optional().describe('Bildschlüssel (z.B. "kap01_schichtenmodell") für Details'),
    search: z.string().optional().describe('Suchbegriff über Beschreibungen und Stichwörter'),
  },
  async ({ chapter_id, image_key, search }) => ({
    content: [{ type: 'text', text: executeTool('book_image', { chapter_id, image_key, search }) }],
  })
)

// Resource: image manifest
server.resource(
  'images',
  'bim-book://images',
  async () => {
    const { getImageManifest } = await import('./book-index.js')
    return {
      contents: [{
        uri: 'bim-book://images',
        mimeType: 'application/json',
        text: JSON.stringify(getImageManifest(), null, 2),
      }],
    }
  }
)

// Resource: chapter list
server.resource(
  'chapters',
  'bim-book://chapters',
  async () => ({
    contents: [{
      uri: 'bim-book://chapters',
      mimeType: 'application/json',
      text: JSON.stringify(
        ALL_CHAPTERS.map(c => ({ id: c.id, num: c.num, title: c.title, path: c.path, part: c.part })),
        null, 2
      ),
    }],
  })
)

// Resource: full book index with metadata
server.resource(
  'index',
  'bim-book://index',
  async () => ({
    contents: [{
      uri: 'bim-book://index',
      mimeType: 'application/json',
      text: JSON.stringify(
        PARTS.map(p => ({
          part: p.title,
          chapters: p.chapters.map(c => ({
            id: c.id,
            num: c.num,
            title: c.title,
            path: c.path,
            wordCount: c.wordCount,
            headings: c.headings,
            summary: c.summary,
          })),
        })),
        null, 2
      ),
    }],
  })
)

const transport = new StdioServerTransport()
await server.connect(transport)
