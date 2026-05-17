import { NavLink } from 'react-router-dom'
import { PARTS } from '../chapters'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

export function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-title">
          BIM von Grund auf
        </NavLink>
        <span className="sidebar-subtitle">Johannes Hötter</span>
      </div>

      <div className="sidebar-nav">
        {PARTS.map(part => (
          <div key={part.title} className="sidebar-part">
            {part.title !== 'Überblick' && (
              <span className="sidebar-part-title">{part.title}</span>
            )}
            <ul>
              {part.chapters.map(chapter => (
                <li key={chapter.id}>
                  <NavLink
                    to={chapterHref(chapter.path)}
                    className={({ isActive }) =>
                      ['sidebar-link', isActive ? 'sidebar-link--active' : ''].join(' ').trim()
                    }
                    end={chapter.path === 'index'}
                  >
                    {chapter.num && (
                      <span className="sidebar-num">{chapter.num}</span>
                    )}
                    <span className="sidebar-link-title">{chapter.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
