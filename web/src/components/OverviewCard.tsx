import { useState, type CSSProperties, type FocusEventHandler, type MouseEventHandler } from 'react'
import { NavLink } from 'react-router-dom'
import { getChapterDescription, type Chapter } from '../chapters'
import { bookPath } from '../books'

interface OverviewCardProps {
  chapter: Chapter
  className?: string
  showDescription?: boolean
  badge?: string
  style?: CSSProperties
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>
  onFocus?: FocusEventHandler<HTMLAnchorElement>
}

export function OverviewCard({
  chapter,
  className = '',
  showDescription = true,
  badge,
  style,
  onMouseEnter,
  onFocus,
}: OverviewCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const Icon = chapter.pageIcon
  const hasImage = !!chapter.coverImage && !imgFailed
  const description = showDescription && chapter.num ? getChapterDescription(chapter.path) : ''

  return (
    <NavLink
      to={bookPath(chapter.path)}
      className={`overview-card${className ? ` ${className}` : ''}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
    >
      <div className="overview-card-cover">
        {hasImage
          ? <img src={chapter.coverImage} alt="" aria-hidden="true" onError={() => setImgFailed(true)} />
          : <div className="overview-card-placeholder" />
        }
        {badge && <span className="overview-card-badge">{badge}</span>}
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
        {description && (
          <p className="overview-card-desc">{description}</p>
        )}
      </div>
    </NavLink>
  )
}
