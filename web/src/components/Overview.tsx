import { NavLink } from 'react-router-dom'
import { PARTS } from '../chapters'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

export function Overview() {
  return (
    <div className="overview-page">
      <div className="overview-header">
        <h1 className="overview-title">BIM von Grund auf</h1>
        <p className="overview-subtitle">
          Ein Kompendium für Architekten, Ingenieure und BIM-Koordinatoren
        </p>
      </div>

      {PARTS
        .filter(part => part.title !== 'Überblick')
        .map(part => (
          <section key={part.title} className="overview-part">
            <h2 className="overview-part-label">{part.title}</h2>
            <div className="overview-grid">
              {part.chapters.map(chapter => {
                const Icon = chapter.pageIcon
                return (
                  <NavLink
                    key={chapter.id}
                    to={chapterHref(chapter.path)}
                    className="overview-card"
                  >
                    <div className="overview-card-cover">
                      {chapter.coverImage
                        ? <img src={chapter.coverImage} alt="" aria-hidden="true" />
                        : <div className="overview-card-placeholder" />
                      }
                      {Icon && (
                        <span className="overview-card-icon" aria-hidden="true">
                          <Icon size={32} />
                        </span>
                      )}
                    </div>
                    <div className="overview-card-body">
                      {chapter.num && (
                        <span className="overview-card-num">Kap. {chapter.num}</span>
                      )}
                      <span className="overview-card-title">{chapter.title}</span>
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </section>
        ))
      }
    </div>
  )
}
