import { ALL_CHAPTERS, PARTS, getContent } from '../chapters'

export interface SearchEntry {
  path: string
  title: string
  part: string
  num: string
}

function norm(s: string): string {
  return s.toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/^\s*[|>]\s*/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

interface IndexEntry extends SearchEntry {
  haystack: string
}

let _index: IndexEntry[] | null = null

function buildIndex(): IndexEntry[] {
  const partByChapterId = new Map<string, string>()
  for (const part of PARTS) {
    for (const ch of part.chapters) {
      partByChapterId.set(ch.id, part.title)
    }
  }

  return ALL_CHAPTERS.map(ch => {
    const raw = getContent(ch.path)
    const plain = stripMarkdown(raw)
    const haystack = norm(ch.title + ' ' + ch.title + ' ' + plain) // title twice for ranking
    return {
      path: ch.path,
      title: ch.title,
      part: partByChapterId.get(ch.id) ?? '',
      num: (ch as { num?: string }).num ?? '',
      haystack,
    }
  })
}

function getIndex(): IndexEntry[] {
  if (!_index) _index = buildIndex()
  return _index
}

export function search(query: string): Set<string> {
  const trimmed = query.trim()
  if (!trimmed) return new Set()
  const tokens = norm(trimmed).split(' ').filter(t => t.length > 1)
  if (tokens.length === 0) return new Set()
  const index = getIndex()
  const results = new Set<string>()
  for (const entry of index) {
    if (tokens.every(t => entry.haystack.includes(t))) {
      results.add(entry.path)
    }
  }
  return results
}
