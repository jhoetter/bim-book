import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getBreadcrumb } from '../chapters'
import { BOOKMARK_SYNC_EVENT, bookmarkKey, useBookmarks, type BookmarkChangeDetail } from '../lib/bookmarks'
import { getCurrentHeadingInfo, scrollToHeading, type HeadingInfo } from '../lib/reading-position'

interface TopbarProps {
  sidebarOpen: boolean
  onToggle: () => void
  onOpenPalette: () => void
}

export function Topbar({ onToggle, onOpenPalette }: TopbarProps) {
  const location = useLocation()
  const { part, chapter } = getBreadcrumb(location.pathname)
  const path = location.pathname.replace(/^\//, '') || 'index'

  const { bookmarks, toggle } = useBookmarks()
  const [currentHeading, setCurrentHeading] = useState<HeadingInfo | null>(null)
  const pageTitle = chapter ?? 'Überblick'
  const currentTarget = currentHeading
    ? { path, title: pageTitle, part, headingId: currentHeading.id, headingTitle: currentHeading.text, headingLevel: currentHeading.level }
    : { path, title: pageTitle, part }
  const chapterBookmark = bookmarks.find(b => b.path === path)
  const isBookmarked = Boolean(chapterBookmark)
  const isCurrentTargetBookmarked = chapterBookmark ? bookmarkKey(chapterBookmark) === bookmarkKey(currentTarget) : false

  const [toast, setToast] = useState<string | null>(null)
  const toastTimerRef = useRef<number | null>(null)

  const showToast = (message: string) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    setToast(message)
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
      toastTimerRef.current = null
    }, 2000)
  }

  useEffect(() => () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
  }, [])

  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>('.content-area')
    let raf = 0
    const update = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const heading = getCurrentHeadingInfo()
        setCurrentHeading(prev => prev?.id === heading?.id ? prev : heading)
      })
    }

    const initial = window.setTimeout(update, 100)
    scrollRoot?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('hashchange', update)
    window.addEventListener('resize', update)

    return () => {
      window.clearTimeout(initial)
      cancelAnimationFrame(raf)
      scrollRoot?.removeEventListener('scroll', update)
      window.removeEventListener('hashchange', update)
      window.removeEventListener('resize', update)
    }
  }, [location.pathname])

  useEffect(() => {
    const onBookmarkChange = (event: Event) => {
      const detail = (event as CustomEvent<BookmarkChangeDetail | undefined>).detail
      if (!detail) return
      const label = detail.bookmark.headingTitle ?? detail.bookmark.title
      if (detail.action === 'removed') showToast('Marker entfernt')
      else if (detail.action === 'updated') showToast(`Marker verschoben: ${label}`)
      else showToast(`Marker gesetzt: ${label}`)
    }

    window.addEventListener(BOOKMARK_SYNC_EVENT, onBookmarkChange)
    return () => window.removeEventListener(BOOKMARK_SYNC_EVENT, onBookmarkChange)
  }, [])

  const handleBookmark = () => {
    const heading = getCurrentHeadingInfo()
    toggle(heading
      ? { path, title: pageTitle, part, headingId: heading.id, headingTitle: heading.text, headingLevel: heading.level }
      : { path, title: pageTitle, part }
    )
  }

  const handleJumpToBookmark = () => {
    if (!chapterBookmark?.headingId) return
    const ok = scrollToHeading(chapterBookmark.headingId)
    showToast(ok ? `Zum Marker: ${chapterBookmark.headingTitle ?? chapterBookmark.title}` : 'Marker nicht gefunden')
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link kopiert')
    } catch {
      // fallback: select the URL bar
    }
  }

  return (
    <div className="topbar">
      <button
        className="topbar-toggle"
        onClick={onToggle}
        aria-label="Sidebar umschalten"
        title="Sidebar ([)"
      >
        <SidebarIcon />
      </button>

      {(part || chapter) && (
        <nav className="breadcrumb" aria-label="Seitenposition">
          {part && <span className="breadcrumb-part">{part}</span>}
          {part && chapter && <span className="breadcrumb-sep" aria-hidden="true">/</span>}
          {chapter && <span className="breadcrumb-chapter">{chapter}</span>}
        </nav>
      )}

      <div className="topbar-end">
        {chapterBookmark?.headingId && (
          <button
            className="topbar-toggle"
            onClick={handleJumpToBookmark}
            aria-label="Zum Marker springen"
            title={`Zum Marker springen: ${chapterBookmark.headingTitle ?? chapterBookmark.title}`}
          >
            <JumpToBookmarkIcon />
          </button>
        )}

        <button
          className={`topbar-toggle${isBookmarked ? ' topbar-btn--active' : ''}`}
          onClick={handleBookmark}
          aria-label={isCurrentTargetBookmarked ? 'Marker entfernen' : isBookmarked ? 'Marker hierhin verschieben' : currentHeading ? 'Abschnitt merken' : 'Seite merken'}
          title={isCurrentTargetBookmarked ? 'Marker entfernen' : isBookmarked ? 'Marker hierhin verschieben' : currentHeading ? 'Abschnitt merken' : 'Seite merken'}
        >
          <BookmarkIcon filled={isBookmarked} />
        </button>

        <button
          className="topbar-toggle"
          onClick={handleShare}
          aria-label="Link kopieren"
          title="Link kopieren"
        >
          <ShareIcon />
        </button>

        <button
          className="topbar-palette-btn"
          onClick={onOpenPalette}
          aria-label="Befehlspalette öffnen (⌘K)"
          title="Befehlspalette (⌘K)"
        >
          <PaletteSearchIcon />
          <span className="topbar-palette-hint">
            <span className="topbar-palette-key">⌘</span>
            <span className="topbar-palette-key">K</span>
          </span>
        </button>
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          <CheckIcon />
          {toast}
        </div>
      )}
    </div>
  )
}

function SidebarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1.5" width="4.5" height="13" rx="1" opacity="0.35" />
      <rect x="7" y="1.5" width="8" height="3" rx="0.75" />
      <rect x="7" y="6.5" width="8" height="3" rx="0.75" />
      <rect x="7" y="11.5" width="8" height="3" rx="0.75" />
    </svg>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M2.5 1.5A1 1 0 0 1 3.5.5h7a1 1 0 0 1 1 1v11.25a.25.25 0 0 1-.388.208L7 10.25l-4.112 2.708A.25.25 0 0 1 2.5 12.75V1.5Z" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2.5 1.75A.75.75 0 0 1 3.25 1h7.5a.75.75 0 0 1 .75.75v10.5a.25.25 0 0 1-.388.208L7 9.75l-4.112 2.708A.25.25 0 0 1 2.5 12.25V1.75Z" strokeLinejoin="round" />
    </svg>
  )
}

function JumpToBookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.25 1.75h7.5a.75.75 0 0 1 .75.75v9.5a.25.25 0 0 1-.39.21L7 9.5l-4.11 2.71A.25.25 0 0 1 2.5 12V2.5a.75.75 0 0 1 .75-.75Z" />
      <path d="M7 4v4" />
      <path d="M5.25 6.25 7 8l1.75-1.75" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 1.5 12.5 4.5l-3 3" />
      <path d="M12.5 4.5H5a3 3 0 0 0 0 6h1.5" />
    </svg>
  )
}

function PaletteSearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M10.5 10.5l2.5 2.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7.5l3.5 3.5 6.5-7" />
    </svg>
  )
}
