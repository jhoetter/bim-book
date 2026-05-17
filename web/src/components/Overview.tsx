import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PARTS, type Chapter } from '../chapters'

function chapterHref(path: string): string {
  if (path === 'index') return '/'
  return `/${path}`
}

function OverviewCard({ chapter }: { chapter: Chapter }) {
  const [imgFailed, setImgFailed] = useState(false)
  const Icon = chapter.pageIcon
  const hasImage = !!chapter.coverImage && !imgFailed

  return (
    <NavLink to={chapterHref(chapter.path)} className="overview-card">
      <div className="overview-card-cover">
        {hasImage
          ? <img src={chapter.coverImage} alt="" aria-hidden="true" onError={() => setImgFailed(true)} />
          : <div className="overview-card-placeholder" />
        }
        {Icon && (
          <span className={`overview-card-icon${hasImage ? '' : ' overview-card-icon--placeholder'}`} aria-hidden="true">
            <Icon size={28} />
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
              {part.chapters.map(chapter => (
                <OverviewCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </section>
        ))
      }
    </div>
  )
}
