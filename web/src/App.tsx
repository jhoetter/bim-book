import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate, NavLink } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef, type PointerEvent } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { TableOfContents } from './components/TableOfContents'
import { MarkdownPage } from './components/MarkdownPage'
import { Gallery } from './components/Gallery'
import { Overview } from './components/Overview'
import { ChatPanel } from './components/ChatPanel'
import { CommandPalette } from './components/CommandPalette'
import { PdfPrintView } from './components/PdfPrintView'
import { getContent, getNavigation, ALL_CHAPTERS } from './chapters'

const SIDEBAR_MIN = 180
const SIDEBAR_MAX = 480
const SIDEBAR_HIDE_THRESHOLD = 32
const SIDEBAR_DEFAULT = 248

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

function Pagination({ id }: { id: string }) {
  const { prev, next } = getNavigation(id)
  if (!prev && !next) return null
  return (
    <div className="pagination">
      <div className="pagination-prev">
        {prev && (
          <NavLink to={chapterHref(prev.path)}>
            <span className="pagination-arrow">←</span>
            <span className="pagination-label">
              {prev.num ? `Kapitel ${prev.num}` : prev.title}
            </span>
            <span className="pagination-chapter">{prev.title}</span>
          </NavLink>
        )}
      </div>
      <div className="pagination-next">
        {next && (
          <NavLink to={chapterHref(next.path)}>
            <span className="pagination-label">
              {next.num ? `Kapitel ${next.num}` : next.title}
            </span>
            <span className="pagination-chapter">{next.title}</span>
            <span className="pagination-arrow">→</span>
          </NavLink>
        )}
      </div>
    </div>
  )
}

function ChapterRoute() {
  const { '*': slug } = useParams()
  const location = useLocation()
  const path = location.pathname.replace(/^\//, '')
  const content = getContent(path)
  const chapter = ALL_CHAPTERS.find(c => c.path === path)
  const id = chapter?.id ?? (slug ?? '')
  const [imgFailed, setImgFailed] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => { setImgFailed(false) }, [path])

  // Instant-jump to hash on load (no animation — just land there)
  useEffect(() => {
    if (!location.hash) return
    const elId = location.hash.slice(1)
    const jump = () => document.getElementById(elId)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    const el = document.getElementById(elId)
    if (el) jump()
    else {
      const t = setTimeout(jump, 80)
      return () => clearTimeout(t)
    }
  }, [location.hash, path])

  // Mirror TOC's IntersectionObserver to keep URL hash in sync while scrolling
  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>('.content-area')
    if (!scrollRoot) return

    const t = setTimeout(() => {
      observerRef.current?.disconnect()
      observerRef.current = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (!visible.length) return
          const newId = visible[0].target.id
          const target = window.location.pathname + '#' + newId
          if (window.location.pathname + window.location.hash !== target) {
            history.replaceState(null, '', target)
          }
        },
        { root: scrollRoot, rootMargin: '-80px 0px -70% 0px', threshold: 0 }
      )
      document.querySelectorAll<HTMLElement>('.prose h1[id], .prose h2[id], .prose h3[id]')
        .forEach(el => observerRef.current!.observe(el))
    }, 80)

    return () => {
      clearTimeout(t)
      observerRef.current?.disconnect()
    }
  }, [path])

  const cover = chapter?.coverImage
  const hasImage = !!cover && !imgFailed
  const PageIcon = chapter?.pageIcon
  return (
    <>
      <div className="page-cover-wrap">
        {hasImage
          ? <img className="page-cover" src={cover} alt="" aria-hidden="true" onError={() => setImgFailed(true)} />
          : <div className="page-cover page-cover--placeholder" aria-hidden="true" />
        }
        {PageIcon && (
          <div className="page-icon-float" aria-hidden="true">
            <PageIcon size={58} />
          </div>
        )}
      </div>
      <main className="content content--has-cover">
        <MarkdownPage content={content} />
        <Pagination id={id} />
      </main>
    </>
  )
}


function AppLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null)

  const toggle = useCallback(() => setSidebarOpen(v => !v), [])

  // Auto-collapse on narrow viewports
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false)
  }, [location.pathname])

  // `[` key + ⌘K shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
        e.preventDefault()
        setPaletteOpen(v => !v)
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if (e.key === '[') { e.preventDefault(); setSidebarOpen(v => !v) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // PDF export trigger
  useEffect(() => {
    const handler = () => setIsPrinting(true)
    document.addEventListener('bim:export-pdf', handler)
    return () => document.removeEventListener('bim:export-pdf', handler)
  }, [])

  const handleResizeStart = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    resizeRef.current = { startX: e.clientX, startWidth: sidebarWidth }

    const doc = e.currentTarget.ownerDocument
    doc.body.style.cursor = 'col-resize'
    doc.body.style.userSelect = 'none'

    const onMove = (ev: globalThis.PointerEvent) => {
      const state = resizeRef.current
      if (!state) return
      const next = state.startWidth + ev.clientX - state.startX
      if (next <= SIDEBAR_HIDE_THRESHOLD) {
        setSidebarOpen(false)
      } else {
        const clamped = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, next))
        setSidebarWidth(clamped)
        setSidebarOpen(true)
      }
    }
    const onUp = () => {
      resizeRef.current = null
      doc.body.style.cursor = ''
      doc.body.style.userSelect = ''
      doc.removeEventListener('pointermove', onMove)
      doc.removeEventListener('pointerup', onUp)
    }
    doc.addEventListener('pointermove', onMove)
    doc.addEventListener('pointerup', onUp)
  }, [sidebarWidth])

  return (
    <>
      <div
        className={`layout${sidebarOpen ? '' : ' layout--collapsed'}`}
        style={{ '--sidebar-w': `${sidebarWidth}px` } as React.CSSProperties}
      >
        <Sidebar />
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        {sidebarOpen && (
          <div
            className="sidebar-resize-handle"
            onPointerDown={handleResizeStart}
            role="separator"
            aria-label="Sidebar vergrößern"
            aria-orientation="vertical"
          />
        )}
        <TableOfContents />
        <div className="main-area">
          <Topbar sidebarOpen={sidebarOpen} onToggle={toggle} onOpenPalette={() => setPaletteOpen(true)} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/chapters/*" element={<ChapterRoute />} />
              <Route path="/appendix/*" element={<ChapterRoute />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            onToggleSidebar={toggle}
          />
        )}
        {isPrinting && (
          <div className="pdf-preparing-overlay" aria-live="polite">
            <div className="pdf-preparing-msg">
              <div className="pdf-preparing-spinner" aria-hidden="true" />
              PDF wird vorbereitet…
            </div>
          </div>
        )}
      </div>
      {isPrinting && <PdfPrintView onDone={() => setIsPrinting(false)} />}
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout />
      <ChatPanel />
    </BrowserRouter>
  )
}
