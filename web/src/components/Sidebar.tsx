import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { WallHifi, HomeIcon } from 'bim-icons'
import { PARTS, GALLERY_ICON } from '../chapters'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

export function Sidebar() {
  const scrollRef = useRef<HTMLDivElement>(null)

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

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-brand">
          <span className="sidebar-brand-mark" aria-hidden="true">
            <WallHifi size={18} />
          </span>
          <span className="sidebar-brand-info">
            <span className="sidebar-title">BIM von Grund auf</span>
            <span className="sidebar-subtitle">Johannes Hötter</span>
          </span>
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
        </div>

        <div className="sidebar-nav">
          {PARTS.filter(part => part.title !== 'Überblick').map(part => (
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
