import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate, NavLink } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef, type PointerEvent } from 'react'
import { ThemeProvider } from './lib/theme'
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
  const [heroPhase, setHeroPhase] = useState<'hold' | 'contracting' | 'none'>('none')
  const isFirstMount = useRef(true)

  useEffect(() => { setImgFailed(false) }, [path])

  // Hero intro: only on SPA navigation, never on initial load / hard reload
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return }
    if (!chapter?.coverImage || chapter?.isReferencePage) return
    setHeroPhase('hold')
    const t = setTimeout(() => setHeroPhase('contracting'), 700)
    return () => clearTimeout(t)
  }, [path])

  // Reset scroll to top on chapter navigation (before hash jump below)
  useEffect(() => {
    document.querySelector<HTMLElement>('.content-area')?.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  // Jump to hash on load — decodeURIComponent handles percent-encoded umlauts etc.
  useEffect(() => {
    if (!location.hash) return
    const elId = decodeURIComponent(location.hash.slice(1))
    const jump = () => document.getElementById(elId)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    if (document.getElementById(elId)) jump()
    else {
      const t = setTimeout(jump, 80)
      return () => clearTimeout(t)
    }
  }, [location.hash, path])

  // Keep URL hash in sync as user scrolls so reloading lands at the right heading
  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>('.content-area')
    if (!scrollRoot) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        // Live rects — no stale cache, works even after lazy images shift layout
        const base = scrollRoot.getBoundingClientRect().top
        const threshold = base + 100
        let current: HTMLElement | undefined
        document.querySelectorAll<HTMLElement>('.prose h1[id], .prose h2[id], .prose h3[id]')
          .forEach(el => { if (el.getBoundingClientRect().top <= threshold) current = el })
        if (!current?.id) return
        const target = window.location.pathname + '#' + current.id
        if (window.location.pathname + decodeURIComponent(window.location.hash) !== target)
          history.replaceState(null, '', target)
      })
    }

    const t = setTimeout(() => {
      scrollRoot.addEventListener('scroll', onScroll, { passive: true })
    }, 80)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      scrollRoot.removeEventListener('scroll', onScroll)
    }
  }, [path])

  const cover = chapter?.coverImage
  const hasImage = !!cover && !imgFailed
  const PageIcon = chapter?.pageIcon
  const isRef = chapter?.isReferencePage

  if (isRef) {
    return (
      <main className="content">
        <MarkdownPage content={content} />
      </main>
    )
  }

  const heroActive = heroPhase !== 'none'
  const wrapClass = [
    'page-cover-wrap',
    heroActive ? 'page-cover-wrap--hero' : '',
    heroPhase === 'contracting' ? 'page-cover-wrap--contracting' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <div
        className={wrapClass}
        onTransitionEnd={(e) => {
          if (heroPhase === 'contracting' && e.propertyName === 'height' && e.target === e.currentTarget)
            setHeroPhase('none')
        }}
      >
        {heroActive && (
          <div aria-hidden="true" className={`cover-hero-intro${heroPhase === 'contracting' ? ' cover-hero-intro--out' : ''}`}>
            <div className="cover-hero-intro__overlay" />
            <div className="cover-hero-intro__content">
              {PageIcon && <div className="chapter-hero__icon"><PageIcon size={80} /></div>}
              {chapter?.num && <p className="chapter-hero__num">Kapitel {chapter.num}</p>}
              <p className="chapter-hero__title">{chapter?.title ?? ''}</p>
            </div>
          </div>
        )}
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
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.innerWidth < 768) return false
    const stored = localStorage.getItem('sidebar-open')
    return stored !== null ? stored === 'true' : true
  })
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window === 'undefined') return SIDEBAR_DEFAULT
    const parsed = parseInt(localStorage.getItem('sidebar-width') ?? '', 10)
    return isNaN(parsed) ? SIDEBAR_DEFAULT : Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, parsed))
  })
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null)

  const toggle = useCallback(() => setSidebarOpen(v => !v), [])

  // Persist open state (desktop only — don't overwrite with mobile auto-collapse)
  useEffect(() => {
    if (window.innerWidth >= 768)
      localStorage.setItem('sidebar-open', String(sidebarOpen))
  }, [sidebarOpen])

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

    let lastWidth = sidebarWidth
    const onMove = (ev: globalThis.PointerEvent) => {
      const state = resizeRef.current
      if (!state) return
      const next = state.startWidth + ev.clientX - state.startX
      if (next <= SIDEBAR_HIDE_THRESHOLD) {
        setSidebarOpen(false)
      } else {
        const clamped = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, next))
        lastWidth = clamped
        setSidebarWidth(clamped)
        setSidebarOpen(true)
      }
    }
    const onUp = () => {
      resizeRef.current = null
      doc.body.style.cursor = ''
      doc.body.style.userSelect = ''
      localStorage.setItem('sidebar-width', String(lastWidth))
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
              <Route path="/glossar" element={<ChapterRoute />} />
              <Route path="/markierungen" element={<ChapterRoute />} />
              <Route path="/formelsammlung" element={<ChapterRoute />} />
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
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
        <ChatPanel />
      </BrowserRouter>
    </ThemeProvider>
  )
}
