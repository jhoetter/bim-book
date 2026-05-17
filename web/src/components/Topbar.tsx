import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { getBreadcrumb } from '../chapters'
import { useBookmarks } from '../lib/bookmarks'

interface TopbarProps {
  sidebarOpen: boolean
  onToggle: () => void
}

export function Topbar({ onToggle }: TopbarProps) {
  const location = useLocation()
  const { part, chapter } = getBreadcrumb(location.pathname)
  const path = location.pathname.replace(/^\//, '') || 'index'

  const { bookmarks, toggle } = useBookmarks()
  const isBookmarked = bookmarks.some(b => b.path === path)

  const [copied, setCopied] = useState(false)

  const handleBookmark = () => {
    toggle({ path, title: chapter ?? 'Überblick', part })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
        <button
          className={`topbar-toggle${isBookmarked ? ' topbar-btn--active' : ''}`}
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Lesezeichen entfernen' : 'Seite merken'}
          title={isBookmarked ? 'Lesezeichen entfernen' : 'Seite merken'}
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
      </div>

      {copied && (
        <div className="toast" role="status" aria-live="polite">
          <CheckIcon />
          Link kopiert
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

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 1.5 12.5 4.5l-3 3" />
      <path d="M12.5 4.5H5a3 3 0 0 0 0 6h1.5" />
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
