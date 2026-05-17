import { useLocation } from 'react-router-dom'
import { getBreadcrumb } from '../chapters'

interface TopbarProps {
  sidebarOpen: boolean
  onToggle: () => void
}

export function Topbar({ onToggle }: TopbarProps) {
  const location = useLocation()
  const { part, chapter } = getBreadcrumb(location.pathname)

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
