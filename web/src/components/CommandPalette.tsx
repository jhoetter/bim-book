import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PARTS } from '../chapters'
import { useBookmarks } from '../lib/bookmarks'

// ── Types ──────────────────────────────────────────────────────────────────────

interface AiItem {
  kind: 'ai'
  id: string
  query: string
  flatIdx: number
  action: () => void
}

interface RegularItem {
  kind: 'nav' | 'action'
  id: string
  label: string
  sublabel?: string
  icon: React.ReactNode
  shortcut?: string
  flatIdx: number
  action: () => void
}

type PaletteItem = AiItem | RegularItem

interface PaletteGroup {
  name: string
  items: PaletteItem[]
}

interface Props {
  onClose: () => void
  onToggleSidebar: () => void
}

// ── Text helpers ───────────────────────────────────────────────────────────────

function norm(s: string) {
  return s.toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ß/g, 'ss').replace(/[^a-z0-9\s]/g, '')
}

const QUESTION_STARTS = [
  'was ', 'wie ', 'warum ', 'wann ', 'wo ', 'wer ', 'welch',
  'erkl', 'zeig', 'vergleich', 'berechn', 'beschreib', 'nenn',
  'liste', 'gibt es', 'kann ich', 'was ist', 'was sind', 'was bedeutet',
]

function isLikelyQuestion(q: string): boolean {
  const n = norm(q.trim())
  return q.trim().endsWith('?') || n.length > 22 || QUESTION_STARTS.some(w => n.startsWith(w))
}

function matchScore(title: string, subtitle: string, q: string): number {
  const haystack = norm(title + ' ' + subtitle)
  const needle   = norm(q)
  if (haystack.includes(needle)) return 2
  const words = needle.split(/\s+/).filter(w => w.length > 1)
  if (!words.length) return 0
  return words.filter(w => haystack.includes(w)).length / words.length
}

function chapterHref(path: string) {
  return path === 'index' ? '/' : `/${path}`
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function CommandPalette({ onClose, onToggleSidebar }: Props) {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { bookmarks, toggle: toggleBookmark } = useBookmarks()

  const [query,     setQuery]     = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef  = useRef<HTMLDivElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const path      = location.pathname.replace(/^\//, '') || 'index'
  const pageTitle = useMemo(() => {
    for (const p of PARTS) {
      const ch = p.chapters.find(c => c.path === path)
      if (ch) return ch.title
    }
    return 'Überblick'
  }, [path])
  const isBookmarked = bookmarks.some(b => b.path === path)

  const run = useCallback((fn: () => void) => { onClose(); fn() }, [onClose])

  const sendToChat = useCallback((msg: string) => {
    run(() => document.dispatchEvent(new CustomEvent('bim:chat-send', { detail: { message: msg } })))
  }, [run])

  const openChat = useCallback(() => {
    run(() => document.dispatchEvent(new CustomEvent('bim:open-chat')))
  }, [run])

  // ── Build flat item list + groups ──────────────────────────────────────────

  const { groups, flatItems } = useMemo<{ groups: PaletteGroup[]; flatItems: PaletteItem[] }>(() => {
    const q = query.trim()
    let idx = 0
    const mk = <T extends Omit<PaletteItem, 'flatIdx'>>(item: T): T & { flatIdx: number } =>
      ({ ...item, flatIdx: idx++ })

    // ── Action items ─────────────────────────────────────────────────────────

    const bookmark: RegularItem = mk({
      kind: 'action', id: 'bookmark',
      label: isBookmarked ? 'Lesezeichen entfernen' : 'Seite merken',
      sublabel: pageTitle,
      icon: <BookmarkIcon />,
      action: () => run(() => toggleBookmark({ path, title: pageTitle, part: null })),
    })
    const copyLink: RegularItem = mk({
      kind: 'action', id: 'copy',
      label: 'Link kopieren',
      icon: <CopyIcon />,
      shortcut: '⌘⇧C',
      action: () => run(() => navigator.clipboard.writeText(window.location.href).catch(() => {})),
    })
    const sidebar: RegularItem = mk({
      kind: 'action', id: 'sidebar',
      label: 'Sidebar ein-/ausblenden',
      icon: <SidebarIcon />,
      shortcut: '[',
      action: () => run(onToggleSidebar),
    })
    const exportPdf: RegularItem = mk({
      kind: 'action', id: 'export-pdf',
      label: 'Buch als PDF exportieren',
      icon: <PrintIcon />,
      action: () => run(() => document.dispatchEvent(new CustomEvent('bim:export-pdf'))),
    })

    // ── Nav items ─────────────────────────────────────────────────────────────

    const overview: RegularItem = mk({
      kind: 'nav', id: 'overview',
      label: 'Zur Übersicht',
      icon: <HomeIcon />,
      action: () => run(() => navigate('/')),
    })
    const gallery: RegularItem = mk({
      kind: 'nav', id: 'gallery',
      label: 'Bildgalerie',
      icon: <GalleryIcon />,
      action: () => run(() => navigate('/gallery')),
    })

    const allChapters: RegularItem[] = []
    for (const part of PARTS) {
      for (const ch of part.chapters) {
        if (ch.id === 'index') continue
        allChapters.push(mk({
          kind: 'nav', id: `ch-${ch.id}`,
          label: ch.num ? `${ch.num}. ${ch.title}` : ch.title,
          sublabel: part.title !== 'Überblick' ? part.title : undefined,
          icon: <PageIcon />,
          action: () => run(() => navigate(chapterHref(ch.path))),
        }))
      }
    }

    // ── Empty state ───────────────────────────────────────────────────────────

    if (!q) {
      const aiOpen: AiItem = mk({ kind: 'ai', id: 'ai-open', query: '' , action: openChat })
      const groups: PaletteGroup[] = [
        { name: 'Schnellzugriff', items: [aiOpen, overview, gallery] },
        { name: 'Aktionen',       items: [bookmark, copyLink, sidebar, exportPdf] },
      ]
      const flatItems = [aiOpen, overview, gallery, bookmark, copyLink, sidebar, exportPdf]
      return { groups, flatItems }
    }

    // ── Search state ──────────────────────────────────────────────────────────

    const aiAsk: AiItem = mk({ kind: 'ai', id: 'ai-ask', query: q, action: () => sendToChat(q) })

    const navMatches: RegularItem[] = []
    for (const item of [...[overview, gallery], ...allChapters]) {
      const score = matchScore(item.label, item.sublabel ?? '', q)
      if (score > 0) navMatches.push({ ...item, _score: score } as RegularItem & { _score: number })
    }
    navMatches.sort((a, b) => ((b as RegularItem & {_score:number})._score ?? 0) - ((a as RegularItem & {_score:number})._score ?? 0))

    const actionMatches: RegularItem[] = [bookmark, copyLink, sidebar, exportPdf].filter(item =>
      norm(item.label).includes(norm(q)) || norm(item.sublabel ?? '').includes(norm(q))
    )

    const likelyQ = isLikelyQuestion(q)

    const groups: PaletteGroup[] = []
    const flatItems: PaletteItem[] = []

    if (likelyQ) {
      groups.push({ name: 'KI-Assistent', items: [aiAsk] })
      flatItems.push(aiAsk)
      if (navMatches.length) {
        groups.push({ name: 'Navigation',   items: navMatches })
        flatItems.push(...navMatches)
      }
    } else {
      if (navMatches.length) {
        groups.push({ name: 'Navigation',   items: navMatches })
        flatItems.push(...navMatches)
      }
      groups.push({ name: 'KI-Assistent', items: [aiAsk] })
      flatItems.push(aiAsk)
    }

    if (actionMatches.length) {
      groups.push({ name: 'Aktionen', items: actionMatches })
      flatItems.push(...actionMatches)
    }

    if (!flatItems.length) {
      groups.push({ name: 'KI-Assistent', items: [aiAsk] })
      flatItems.push(aiAsk)
    }

    return { groups, flatItems }
  }, [query, isBookmarked, pageTitle, path, run, openChat, sendToChat, toggleBookmark, onToggleSidebar, navigate])

  useEffect(() => { setActiveIdx(0) }, [query])

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]') as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')    { e.preventDefault(); onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, flatItems.length - 1)); return }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return }
      if (e.key === 'Enter')     { e.preventDefault(); flatItems[activeIdx]?.action(); return }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [flatItems, activeIdx, onClose])

  return (
    <div className="palette-overlay" onMouseDown={onClose}>
      <div className="palette" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal aria-label="Befehlspalette">

        {/* Search row */}
        <div className="palette-search-row">
          <SearchPaletteIcon />
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Seite suchen oder KI fragen…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          {query && (
            <button className="palette-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Löschen">
              <ClearIcon />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="palette-results" ref={listRef} role="listbox">
          {groups.map(group => (
            <div key={group.name} className="palette-group">
              <div className="palette-group-label">{group.name}</div>
              {group.items.map(item =>
                item.kind === 'ai'
                  ? <AiQueryRow key={item.id} item={item} active={item.flatIdx === activeIdx} onHover={() => setActiveIdx(item.flatIdx)} />
                  : <RegularRow key={item.id} item={item} active={item.flatIdx === activeIdx} onHover={() => setActiveIdx(item.flatIdx)} />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="palette-footer">
          <span><KbdKey>↑</KbdKey><KbdKey>↓</KbdKey>navigieren</span>
          <span><KbdKey>↵</KbdKey>auswählen</span>
          <span><KbdKey>esc</KbdKey>schließen</span>
        </div>
      </div>
    </div>
  )
}

// ── Row components ─────────────────────────────────────────────────────────────

function AiQueryRow({ item, active, onHover }: { item: AiItem; active: boolean; onHover: () => void }) {
  return (
    <button
      className={`palette-item palette-item--ai${active ? ' palette-item--active' : ''}`}
      data-active={active ? 'true' : undefined}
      role="option" aria-selected={active}
      onMouseEnter={onHover}
      onClick={item.action}
    >
      <span className="palette-item-icon palette-item-icon--ai"><SparkleIcon /></span>
      <span className="palette-item-text">
        <span className="palette-item-label">
          {item.query ? `Frag den BIM-Assistent` : 'BIM-Assistent öffnen'}
        </span>
        {item.query && (
          <span className="palette-item-sub palette-item-sub--query">„{item.query}"</span>
        )}
      </span>
      <span className="palette-ai-arrow">→</span>
    </button>
  )
}

function RegularRow({ item, active, onHover }: { item: RegularItem; active: boolean; onHover: () => void }) {
  return (
    <button
      className={`palette-item${active ? ' palette-item--active' : ''}`}
      data-active={active ? 'true' : undefined}
      role="option" aria-selected={active}
      onMouseEnter={onHover}
      onClick={item.action}
    >
      <span className="palette-item-icon">{item.icon}</span>
      <span className="palette-item-text">
        <span className="palette-item-label">{item.label}</span>
        {item.sublabel && <span className="palette-item-sub">{item.sublabel}</span>}
      </span>
      {item.shortcut && <kbd className="palette-shortcut">{item.shortcut}</kbd>}
    </button>
  )
}

function KbdKey({ children }: { children: React.ReactNode }) {
  return <kbd className="palette-footer-key">{children}</kbd>
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function SearchPaletteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="palette-search-icon">
      <circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 11l3 3" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M2 2l8 8M10 2l-8 8" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1 9.2 6.2 14 7 9.2 8.8 8 14 6.8 8.8 2 7 6.8 6.2Z" opacity="0.9" />
    </svg>
  )
}

function PageIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="1" width="10" height="12" rx="1.5" /><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1.5 7 7 1.5 12.5 7" /><path d="M3 5.5v6.5a.5.5 0 0 0 .5.5H5.5V9h3v3.5H11a.5.5 0 0 0 .5-.5V5.5" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="1" width="5.5" height="5.5" rx="1" /><rect x="7.5" y="1" width="5.5" height="5.5" rx="1" />
      <rect x="1" y="7.5" width="5.5" height="5.5" rx="1" /><rect x="7.5" y="7.5" width="5.5" height="5.5" rx="1" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 1.75A.75.75 0 0 1 3.25 1h7.5a.75.75 0 0 1 .75.75v10.5a.25.25 0 0 1-.388.208L7 9.75l-4.112 2.708A.25.25 0 0 1 2.5 12.25V1.75Z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4.5" y="4.5" width="8" height="8" rx="1" /><path d="M4.5 9.5H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v2.5" />
    </svg>
  )
}

function SidebarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <rect x="1" y="1" width="4" height="12" rx="1" opacity="0.35" />
      <rect x="6.5" y="1" width="6.5" height="2.5" rx="0.7" /><rect x="6.5" y="5.5" width="6.5" height="2.5" rx="0.7" />
      <rect x="6.5" y="10" width="6.5" height="2.5" rx="0.7" />
    </svg>
  )
}

function PrintIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="1" width="8" height="4" rx="0.8" />
      <path d="M3 5H1.5A.5.5 0 0 0 1 5.5v5a.5.5 0 0 0 .5.5H3" />
      <path d="M11 5h1.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H11" />
      <rect x="3" y="8" width="8" height="5" rx="0.8" />
      <path d="M10.5 6.5h.5" />
    </svg>
  )
}
