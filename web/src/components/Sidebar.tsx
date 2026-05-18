import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import React from 'react'
import { WallHifi, HomeIcon } from 'bim-icons'
import { PARTS, GALLERY_ICON, TOP_PAGES } from '../chapters'
import { bookmarkHref, useBookmarks } from '../lib/bookmarks'
import { useSelfTestResults } from '../lib/selftests'
import { getSelfTestForChapter } from '../data/selftests'
import { search } from '../lib/search'
import { useTheme, type Theme } from '../lib/theme'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <circle cx="8" cy="8" r="3" />
    <line x1="8" y1="1" x2="8" y2="2.5" />
    <line x1="8" y1="13.5" x2="8" y2="15" />
    <line x1="1" y1="8" x2="2.5" y2="8" />
    <line x1="13.5" y1="8" x2="15" y2="8" />
    <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" />
    <line x1="11.9" y1="11.9" x2="12.95" y2="12.95" />
    <line x1="12.95" y1="3.05" x2="11.9" y2="4.1" />
    <line x1="4.1" y1="11.9" x2="3.05" y2="12.95" />
  </svg>
)

const MonitorIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="2" width="14" height="10" rx="1.5" />
    <line x1="5.5" y1="14" x2="10.5" y2="14" />
    <line x1="8" y1="12" x2="8" y2="14" />
  </svg>
)

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8Z" />
  </svg>
)

const THEME_OPTIONS: { value: Theme; label: string; Icon: () => React.ReactElement }[] = [
  { value: 'light',  label: 'Hell',   Icon: SunIcon },
  { value: 'system', label: 'System', Icon: MonitorIcon },
  { value: 'dark',   label: 'Dunkel', Icon: MoonIcon },
]

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4.5" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" />
  </svg>
)

const BmIcon = ({ filled }: { filled: boolean }) => (
  <svg width="11" height="11" viewBox="0 0 14 14" aria-hidden="true"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 1.5A1 1 0 0 1 3.5.5h7a1 1 0 0 1 1 1v11.25a.25.25 0 0 1-.388.208L7 10.25l-4.112 2.708A.25.25 0 0 1 2.5 12.75V1.5Z" />
  </svg>
)

const DoneIcon = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 7.5 5.4 10.8 12 3.5" />
  </svg>
)

export function Sidebar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { bookmarks, toggle, remove } = useBookmarks()
  const { results: selfTestResults } = useSelfTestResults()
  const [filterBookmarks, setFilterBookmarks] = useState(false)
  const [query, setQuery] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      el.classList.add('is-scrolling')
      clearTimeout(timer)
      timer = setTimeout(() => el.classList.remove('is-scrolling'), 900)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { el.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    if (bookmarks.length === 0) setFilterBookmarks(false)
  }, [bookmarks.length])

  const handleClear = useCallback(() => {
    setQuery('')
    inputRef.current?.focus()
  }, [])

  const bookmarkByPath = bookmarks.reduce((acc, bookmark) => {
    const existing = acc.get(bookmark.path)
    if (!existing || bookmark.savedAt >= existing.savedAt) acc.set(bookmark.path, bookmark)
    return acc
  }, new Map<string, (typeof bookmarks)[number]>())
  const bookmarkedPaths = new Set(bookmarkByPath.keys())
  const matchingPaths = query.trim().length > 1 ? search(query) : null

  const GalleryIcon = GALLERY_ICON

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-brand">
          <span className="sidebar-brand-mark" aria-hidden="true">
            <WallHifi size={16} />
          </span>
          <span className="sidebar-title">BIM von Grund auf</span>
        </NavLink>
      </div>

      <div className="sidebar-scroll" ref={scrollRef}>
        <div className="sidebar-nav-top">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              ['sidebar-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()
            }
          >
            <span className="sidebar-icon" aria-hidden="true">
              <HomeIcon size={14} strokeWidth={1.5} />
            </span>
            <span className="sidebar-link-title">Überblick</span>
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              ['sidebar-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()
            }
          >
            <span className="sidebar-icon" aria-hidden="true">
              <GalleryIcon size={14} strokeWidth={1.5} />
            </span>
            <span className="sidebar-link-title">Bildgalerie</span>
          </NavLink>
          {TOP_PAGES.map(chapter => {
            const Icon = chapter.icon
            return (
              <NavLink
                key={chapter.id}
                to={`/${chapter.path}`}
                className={({ isActive }) =>
                  ['sidebar-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()
                }
              >
                {Icon && (
                  <span className="sidebar-icon" aria-hidden="true">
                    <Icon size={14} strokeWidth={1.5} />
                  </span>
                )}
                <span className="sidebar-link-title">{chapter.title}</span>
              </NavLink>
            )
          })}
        </div>

        <div className="sidebar-search-wrap">
          <div className="sidebar-search-bar">
            <span className="sidebar-search-icon"><SearchIcon /></span>
            <input
              ref={inputRef}
              className="sidebar-search-input"
              placeholder="Kapitel durchsuchen…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Kapitel durchsuchen"
              spellCheck={false}
            />
            {query && (
              <button className="sidebar-search-clear" onClick={handleClear} aria-label="Suche leeren">
                ×
              </button>
            )}
            {bookmarks.length > 0 && (
              <button
                className={['sidebar-search-bm', filterBookmarks ? 'sidebar-search-bm--on' : ''].join(' ').trim()}
                onClick={() => setFilterBookmarks(f => !f)}
                title={filterBookmarks ? 'Alle Kapitel anzeigen' : 'Nur Lesezeichen anzeigen'}
                aria-label={filterBookmarks ? 'Lesezeichenfilter deaktivieren' : 'Nur Lesezeichen anzeigen'}
              >
                <BmIcon filled={filterBookmarks} />
              </button>
            )}
          </div>
        </div>

        <div className="sidebar-nav">
          {PARTS.filter(part => part.title !== 'Überblick' && part.title !== 'Nachschlagewerke').map(part => {
            const chapters = part.chapters.filter(ch => {
              if (filterBookmarks && !bookmarkedPaths.has(ch.path)) return false
              if (matchingPaths && !matchingPaths.has(ch.path)) return false
              return true
            })
            if (chapters.length === 0) return null
            return (
              <div key={part.title} className="sidebar-part">
                <span className="sidebar-part-title">{part.title}</span>
                <ul>
                  {chapters.map(chapter => {
                    const Icon = chapter.icon
                    const chapterBookmark = bookmarkByPath.get(chapter.path)
                    const isBookmarked = Boolean(chapterBookmark)
                    const selfTest = getSelfTestForChapter(chapter.id)
                    const isSelfTestDone = !!selfTest && !!selfTestResults[selfTest.id]
                    const markerLabel = chapterBookmark?.headingTitle ?? 'Seitenanfang'
                    return (
                      <li key={chapter.id} className="sidebar-chapter-item">
                        <NavLink
                          to={filterBookmarks && chapterBookmark ? bookmarkHref(chapterBookmark) : chapterHref(chapter.path)}
                          className={({ isActive }) =>
                            ['sidebar-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()
                          }
                          end={chapter.path === 'index'}
                        >
                          {Icon ? (
                            <span className="sidebar-icon" aria-hidden="true">
                              <Icon size={14} strokeWidth={1.5} />
                            </span>
                          ) : chapter.num ? (
                            <span className="sidebar-num">{chapter.num}</span>
                          ) : null}
                          <span className="sidebar-link-copy">
                            <span className="sidebar-link-title-row">
                              <span className="sidebar-link-title">{chapter.title}</span>
                              {isSelfTestDone && (
                                <span
                                  className="sidebar-selftest-done"
                                  aria-label="Selbsttest abgeschlossen"
                                  title="Selbsttest abgeschlossen"
                                >
                                  <DoneIcon />
                                </span>
                              )}
                            </span>
                            {filterBookmarks && chapterBookmark && (
                              <span className="sidebar-link-marker">{markerLabel}</span>
                            )}
                          </span>
                        </NavLink>
                        <button
                          className={['sidebar-bm-btn', isBookmarked ? 'sidebar-bm-btn--on' : ''].join(' ').trim()}
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (chapterBookmark) remove(chapter.path)
                            else toggle({ path: chapter.path, title: chapter.title, part: part.title })
                          }}
                          aria-label={isBookmarked ? 'Marker entfernen' : 'Seite merken'}
                          title={isBookmarked ? 'Marker entfernen' : 'Seite merken'}
                        >
                          <BmIcon filled={isBookmarked} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
          {(matchingPaths?.size === 0 || (filterBookmarks && bookmarks.length === 0)) && (
            <p className="sidebar-search-empty">Keine Treffer</p>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <span className="sidebar-footer-label">Darstellung</span>
        <div className="theme-toggle" role="group" aria-label="Farbschema wählen">
          {THEME_OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              className={['theme-toggle-btn', theme === value ? 'theme-toggle-btn--active' : ''].join(' ').trim()}
              onClick={() => setTheme(value)}
              title={label}
              aria-label={label}
              aria-pressed={theme === value}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
