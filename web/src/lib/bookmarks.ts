import { useState, useEffect } from 'react'
import { bookPath } from '../books'

const STORAGE_KEY = 'bim-book-bookmarks'
const SYNC_EVENT = 'bim-bookmark-change'

export interface Bookmark {
  path: string
  title: string
  part: string | null
  headingId?: string
  headingTitle?: string
  headingLevel?: number
  savedAt: number
}

export interface BookmarkChangeDetail {
  action: 'added' | 'updated' | 'removed'
  bookmark: Bookmark
  previous?: Bookmark
}

export { SYNC_EVENT as BOOKMARK_SYNC_EVENT }

function normalize(value: unknown): Bookmark[] {
  if (!Array.isArray(value)) return []

  const byPath = new Map<string, Bookmark>()
  for (const item of value) {
    if (!item || typeof item !== 'object') continue
    const bookmark = item as Partial<Bookmark>
    if (typeof bookmark.path !== 'string' || typeof bookmark.title !== 'string') continue

    const normalized: Bookmark = {
      path: bookmark.path,
      title: bookmark.title,
      part: typeof bookmark.part === 'string' ? bookmark.part : null,
      headingId: typeof bookmark.headingId === 'string' ? bookmark.headingId : undefined,
      headingTitle: typeof bookmark.headingTitle === 'string' ? bookmark.headingTitle : undefined,
      headingLevel: typeof bookmark.headingLevel === 'number' ? bookmark.headingLevel : undefined,
      savedAt: typeof bookmark.savedAt === 'number' ? bookmark.savedAt : 0,
    }
    const existing = byPath.get(normalized.path)
    if (!existing || normalized.savedAt >= existing.savedAt) byPath.set(normalized.path, normalized)
  }

  return Array.from(byPath.values()).sort((a, b) => b.savedAt - a.savedAt)
}

function load(): Bookmark[] {
  try { return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')) }
  catch { return [] }
}

export function bookmarkKey(bookmark: Pick<Bookmark, 'path' | 'headingId'>): string {
  return bookmark.headingId ? `${bookmark.path}#${bookmark.headingId}` : bookmark.path
}

export function bookmarkHref(bookmark: Pick<Bookmark, 'path' | 'headingId'>): string {
  const path = bookPath(bookmark.path)
  return bookmark.headingId ? `${path}#${bookmark.headingId}` : path
}

function persist(bm: Bookmark[], detail?: BookmarkChangeDetail) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm))
  window.dispatchEvent(new CustomEvent<BookmarkChangeDetail | undefined>(SYNC_EVENT, { detail }))
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(load)

  useEffect(() => {
    const sync = () => setBookmarks(load())
    window.addEventListener(SYNC_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(SYNC_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const add = (bm: Omit<Bookmark, 'savedAt'>) => {
    const current = load()
    const previous = current.find(b => b.path === bm.path)
    const bookmark = { ...bm, savedAt: Date.now() }
    const next = [bookmark, ...current.filter(b => b.path !== bm.path)]
    persist(next, { action: previous ? 'updated' : 'added', bookmark, previous })
    setBookmarks(next)
  }

  const remove = (path: string) => {
    const current = load()
    const bookmark = current.find(b => b.path === path)
    const next = current.filter(b => b.path !== path)
    persist(next, bookmark ? { action: 'removed', bookmark } : undefined)
    setBookmarks(next)
  }

  const toggle = (bm: Omit<Bookmark, 'savedAt'>) => {
    const current = load()
    const existing = current.find(b => b.path === bm.path)
    const key = bookmarkKey(bm)
    if (existing && bookmarkKey(existing) === key) remove(bm.path)
    else add(bm)
  }

  return { bookmarks, add, remove, toggle }
}
