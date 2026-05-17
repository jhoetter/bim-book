import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { WallHifi, HomeIcon } from 'bim-icons'
import { PARTS, GALLERY_ICON, TOP_PAGES } from '../chapters'
import { useBookmarks } from '../lib/bookmarks'
import { search } from '../lib/search'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

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

export function Sidebar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { bookmarks, toggle } = useBookmarks()
  const [filterBookmarks, setFilterBookmarks] = useState(false)
  const [query, setQuery] = useState('')

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

  const bookmarkedPaths = new Set(bookmarks.map(b => b.path))
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
                    const isBookmarked = bookmarkedPaths.has(chapter.path)
                    return (
                      <li key={chapter.id} className="sidebar-chapter-item">
                        <NavLink
                          to={chapterHref(chapter.path)}
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
                          <span className="sidebar-link-title">{chapter.title}</span>
                        </NavLink>
                        <button
                          className={['sidebar-bm-btn', isBookmarked ? 'sidebar-bm-btn--on' : ''].join(' ').trim()}
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggle({ path: chapter.path, title: chapter.title, part: part.title })
                          }}
                          aria-label={isBookmarked ? 'Lesezeichen entfernen' : 'Lesezeichen setzen'}
                          title={isBookmarked ? 'Lesezeichen entfernen' : 'Lesezeichen setzen'}
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
    </nav>
  )
}
