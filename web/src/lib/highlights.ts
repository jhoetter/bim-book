import { useEffect, useState } from 'react'

const STORAGE_KEY = 'bim-book-text-highlights'
const SYNC_EVENT = 'bim-text-highlight-change'
const CSS_HIGHLIGHT_NAME = 'bim-book-text-highlights'

export interface TextHighlight {
  id: string
  path: string
  title: string
  part: string | null
  headingId?: string
  headingTitle?: string
  headingLevel?: number
  text: string
  context: string
  prefix: string
  suffix: string
  pageOffset: number
  color: 'yellow'
  createdAt: number
}

export interface TextHighlightChangeDetail {
  action: 'added' | 'removed'
  highlight: TextHighlight
}

export interface RangeQuote {
  text: string
  prefix: string
  suffix: string
  pageOffset: number
}

interface TextEntry {
  node: Text
  start: number
  end: number
}

type CssHighlightRegistry = {
  set: (name: string, value: unknown) => void
  delete: (name: string) => void
}

export { SYNC_EVENT as TEXT_HIGHLIGHT_SYNC_EVENT }

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function normalize(value: unknown): TextHighlight[] {
  if (!Array.isArray(value)) return []

  return value
    .map(item => {
      if (!item || typeof item !== 'object') return null
      const raw = item as Partial<TextHighlight>
      if (typeof raw.id !== 'string' || typeof raw.path !== 'string' || typeof raw.text !== 'string') return null
      if (!raw.text.trim()) return null

      return {
        id: raw.id,
        path: raw.path,
        title: normalizeText(raw.title) || raw.path,
        part: typeof raw.part === 'string' ? raw.part : null,
        headingId: typeof raw.headingId === 'string' ? raw.headingId : undefined,
        headingTitle: typeof raw.headingTitle === 'string' ? raw.headingTitle : undefined,
        headingLevel: typeof raw.headingLevel === 'number' ? raw.headingLevel : undefined,
        text: raw.text,
        context: normalizeText(raw.context),
        prefix: normalizeText(raw.prefix),
        suffix: normalizeText(raw.suffix),
        pageOffset: typeof raw.pageOffset === 'number' ? raw.pageOffset : -1,
        color: 'yellow' as const,
        createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : 0,
      }
    })
    .filter((item): item is TextHighlight => item != null)
    .sort((a, b) => b.createdAt - a.createdAt)
}

function load(): TextHighlight[] {
  try { return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')) }
  catch { return [] }
}

function persist(highlights: TextHighlight[], detail?: TextHighlightChangeDetail) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights))
  window.dispatchEvent(new CustomEvent<TextHighlightChangeDetail | undefined>(SYNC_EVENT, { detail }))
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `hl-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isIgnoredTextNode(node: Text): boolean {
  const parent = node.parentElement
  if (!parent) return true
  if (!node.nodeValue) return true
  return Boolean(parent.closest('.prose-anchor, .prose-bookmark, button, script, style, svg'))
}

function buildTextIndex(root: HTMLElement): { entries: TextEntry[]; text: string } {
  const entries: TextEntry[] = []
  let text = ''
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return isIgnoredTextNode(node as Text) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    },
  })

  let node = walker.nextNode() as Text | null
  while (node) {
    const value = node.nodeValue ?? ''
    const start = text.length
    text += value
    entries.push({ node, start, end: text.length })
    node = walker.nextNode() as Text | null
  }

  return { entries, text }
}

function offsetForBoundary(entries: TextEntry[], container: Node, offset: number): number | null {
  if (container.nodeType === Node.TEXT_NODE) {
    const entry = entries.find(item => item.node === container)
    return entry ? Math.min(entry.end, entry.start + offset) : null
  }
  return null
}

export function getRangeQuote(root: HTMLElement, range: Range, selectedRaw: string): RangeQuote | null {
  const text = selectedRaw.trim()
  if (!text) return null

  const { entries, text: pageText } = buildTextIndex(root)
  const start = offsetForBoundary(entries, range.startContainer, range.startOffset)
  if (start == null) return null

  const leading = selectedRaw.length - selectedRaw.trimStart().length
  const pageOffset = start + leading
  const exactText = pageText.slice(pageOffset, pageOffset + text.length)
  const resolvedOffset = exactText === text ? pageOffset : pageText.indexOf(text)
  if (resolvedOffset < 0) return null

  return {
    text,
    pageOffset: resolvedOffset,
    prefix: pageText.slice(Math.max(0, resolvedOffset - 160), resolvedOffset),
    suffix: pageText.slice(resolvedOffset + text.length, resolvedOffset + text.length + 160),
  }
}

export function textHighlightHref(highlight: Pick<TextHighlight, 'path' | 'headingId'>): string {
  const path = highlight.path === 'index' ? '/' : `/${highlight.path}`
  return highlight.headingId ? `${path}#${highlight.headingId}` : path
}

export function compactContext(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

export function useTextHighlights() {
  const [highlights, setHighlights] = useState<TextHighlight[]>(load)

  useEffect(() => {
    const sync = () => setHighlights(load())
    window.addEventListener(SYNC_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SYNC_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const add = (highlight: Omit<TextHighlight, 'id' | 'createdAt' | 'color'>) => {
    const current = load()
    const nextHighlight: TextHighlight = {
      ...highlight,
      id: createId(),
      color: 'yellow',
      createdAt: Date.now(),
    }
    const next = [
      nextHighlight,
      ...current.filter(item =>
        !(item.path === nextHighlight.path &&
          item.pageOffset === nextHighlight.pageOffset &&
          item.text === nextHighlight.text)
      ),
    ]
    persist(next, { action: 'added', highlight: nextHighlight })
    setHighlights(next)
  }

  const remove = (id: string) => {
    const current = load()
    const highlight = current.find(item => item.id === id)
    const next = current.filter(item => item.id !== id)
    persist(next, highlight ? { action: 'removed', highlight } : undefined)
    setHighlights(next)
  }

  return { highlights, add, remove }
}

function occurrences(haystack: string, needle: string): number[] {
  const found: number[] = []
  if (!needle) return found
  let index = haystack.indexOf(needle)
  while (index >= 0) {
    found.push(index)
    index = haystack.indexOf(needle, index + Math.max(1, needle.length))
  }
  return found
}

function prefixScore(pageText: string, start: number, prefix: string): number {
  if (!prefix) return 0
  const local = pageText.slice(Math.max(0, start - prefix.length), start)
  if (local === prefix) return 1000
  const tail = prefix.slice(-48)
  return tail && local.endsWith(tail) ? 200 : 0
}

function suffixScore(pageText: string, end: number, suffix: string): number {
  if (!suffix) return 0
  const local = pageText.slice(end, end + suffix.length)
  if (local === suffix) return 1000
  const head = suffix.slice(0, 48)
  return head && local.startsWith(head) ? 200 : 0
}

function bestOccurrence(pageText: string, highlight: TextHighlight): number {
  const found = occurrences(pageText, highlight.text)
  if (found.length === 0) return -1
  return found
    .map(start => ({
      start,
      score:
        prefixScore(pageText, start, highlight.prefix) +
        suffixScore(pageText, start + highlight.text.length, highlight.suffix) -
        Math.abs(start - highlight.pageOffset) / 100,
    }))
    .sort((a, b) => b.score - a.score)[0].start
}

function positionAt(entries: TextEntry[], offset: number, preferNext: boolean): { node: Text; offset: number } | null {
  for (const entry of entries) {
    if (offset < entry.start || offset > entry.end) continue
    if (preferNext && offset === entry.end) continue
    return { node: entry.node, offset: Math.max(0, Math.min(entry.node.length, offset - entry.start)) }
  }
  const last = entries[entries.length - 1]
  return last && offset === last.end ? { node: last.node, offset: last.node.length } : null
}

export function applyTextHighlights(root: HTMLElement | null, highlights: TextHighlight[]): number {
  const registry = typeof CSS !== 'undefined'
    ? (CSS as unknown as { highlights?: CssHighlightRegistry }).highlights
    : undefined
  const HighlightCtor = (globalThis as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight

  registry?.delete(CSS_HIGHLIGHT_NAME)
  if (!root || !registry || !HighlightCtor || highlights.length === 0) return 0

  const { entries, text: pageText } = buildTextIndex(root)
  const ranges: Range[] = []

  for (const highlight of highlights) {
    const start = bestOccurrence(pageText, highlight)
    if (start < 0) continue
    const end = start + highlight.text.length
    const startPos = positionAt(entries, start, true)
    const endPos = positionAt(entries, end, false)
    if (!startPos || !endPos) continue

    const range = document.createRange()
    range.setStart(startPos.node, startPos.offset)
    range.setEnd(endPos.node, endPos.offset)
    ranges.push(range)
  }

  if (ranges.length > 0) registry.set(CSS_HIGHLIGHT_NAME, new HighlightCtor(...ranges))
  return ranges.length
}
