import { type ReactNode } from 'react'

export function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

export function FilterPill({
  label,
  isActive,
  activeLabel,
  isOpen,
  onToggle,
  onClear,
  children,
}: {
  label: string
  isActive: boolean
  activeLabel: string
  isOpen: boolean
  onToggle: () => void
  onClear: () => void
  children: ReactNode
}) {
  return (
    <div className="filter-pill-wrap">
      <button
        className={[
          'filter-pill',
          isActive ? 'filter-pill--active' : '',
          isOpen   ? 'filter-pill--open'   : '',
        ].filter(Boolean).join(' ')}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{isActive ? activeLabel : label}</span>
        {isActive ? (
          <span
            className="filter-pill-x"
            role="button"
            aria-label={`${label} zurücksetzen`}
            onClick={e => { e.stopPropagation(); onClear() }}
          >×</span>
        ) : (
          <span className="filter-pill-chevron">▾</span>
        )}
      </button>
      {isOpen && (
        <div className="filter-popover">
          {children}
        </div>
      )}
    </div>
  )
}
