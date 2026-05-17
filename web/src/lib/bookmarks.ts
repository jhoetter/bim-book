import { useState, useEffect } from 'react'

const STORAGE_KEY = 'bim-book-bookmarks'
const SYNC_EVENT = 'bim-bookmark-change'

export interface Bookmark {
  path: string
  title: string
  part: string | null
  savedAt: number
}

function load(): Bookmark[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') }
  catch { return [] }
}

function persist(bm: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bm))
  window.dispatchEvent(new CustomEvent(SYNC_EVENT))
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
    const next = [{ ...bm, savedAt: Date.now() }, ...load().filter(b => b.path !== bm.path)]
    persist(next)
    setBookmarks(next)
  }

  const remove = (path: string) => {
    const next = load().filter(b => b.path !== path)
    persist(next)
    setBookmarks(next)
  }

  const toggle = (bm: Omit<Bookmark, 'savedAt'>) => {
    const isBookmarked = load().some(b => b.path === bm.path)
    if (isBookmarked) remove(bm.path)
    else add(bm)
  }

  return { bookmarks, add, remove, toggle }
}
