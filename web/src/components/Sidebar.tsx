import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { WallHifi, HomeIcon } from 'bim-icons'
import { PARTS, GALLERY_ICON, TOP_PAGES } from '../chapters'
import { useBookmarks } from '../lib/bookmarks'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

export function Sidebar() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { bookmarks, remove } = useBookmarks()

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

  const GalleryIcon = GALLERY_ICON
  const currentPath = location.pathname.replace(/^\//, '') || 'index'

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

        {bookmarks.length > 0 && (
          <div className="sidebar-bookmarks">
            <span className="sidebar-part-title">
              <svg className="sidebar-bookmarks-icon" width="9" height="9" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M2.5 1.5A1 1 0 0 1 3.5.5h7a1 1 0 0 1 1 1v11.25a.25.25 0 0 1-.388.208L7 10.25l-4.112 2.708A.25.25 0 0 1 2.5 12.75V1.5Z" />
              </svg>
              Lesezeichen
            </span>
            <ul>
              {bookmarks.map(bm => {
                const isActive = bm.path === currentPath
                return (
                  <li key={bm.path} className="sidebar-bookmark-item">
                    <NavLink
                      to={chapterHref(bm.path)}
                      className={['sidebar-link sidebar-bookmark-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()}
                      title={bm.part ? `${bm.part} · ${bm.title}` : bm.title}
                    >
                      <span className="sidebar-icon sidebar-bookmark-placeholder" aria-hidden="true" />
                      <span className="sidebar-link-title">{bm.title}</span>
                    </NavLink>
                    <button
                      className="sidebar-bookmark-remove"
                      onClick={() => remove(bm.path)}
                      aria-label={`${bm.title} entfernen`}
                      title="Entfernen"
                    >
                      ×
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div className="sidebar-nav">
          {PARTS.filter(part => part.title !== 'Überblick' && part.title !== 'Nachschlagewerke').map(part => (
            <div key={part.title} className="sidebar-part">
              <span className="sidebar-part-title">{part.title}</span>
              <ul>
                {part.chapters.map(chapter => {
                  const Icon = chapter.icon
                  return (
                    <li key={chapter.id}>
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
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
