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
