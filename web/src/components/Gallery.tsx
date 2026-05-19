import { useState, useEffect, useCallback, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { bookPath } from '../books'

interface ImageEntry {
  file: string
  chapter: number | null
  part: string
  partTitle: string
  chapterTitle: string
  type: string
  context: 'kastanienallee' | 'generic'
  caption: string
  tags: string[]
  chapterPath: string
  generated: string
}

interface Manifest {
  version: number
  images: ImageEntry[]
}

const TYPE_LABELS: Record<string, string> = {
  isometric:   'Isometrie',
  diagram:     'Diagramm',
  section:     'Schnitt',
  floorplan:   'Grundriss',
  comparison:  'Vergleich',
  infographic: 'Infografik',
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

interface LightboxEntry extends ImageEntry {}

type OpenFilter = 'part' | 'type' | 'context' | 'tags' | null

function FilterPill({
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
  children: React.ReactNode
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

export function Gallery() {
  const [manifest, setManifest]       = useState<Manifest | null>(null)
  const [activeParts, setActiveParts] = useState<Set<string>>(new Set())
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set())
  const [activeContext, setActiveContext] = useState<'all' | 'kastanienallee' | 'generic'>('all')
  const [activeTags, setActiveTags]   = useState<Set<string>>(new Set())
  const [lightbox, setLightbox]       = useState<LightboxEntry | null>(null)
  const [openFilter, setOpenFilter]   = useState<OpenFilter>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/assets/image-manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(() => setManifest({ version: 1, images: [] }))
  }, [])

  useEffect(() => {
    if (!openFilter) return
    const handleClick = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenFilter(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openFilter])

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox])

  if (!manifest) {
    return <div className="gallery-page"><p className="gallery-empty">Lade Bilder…</p></div>
  }

  const images   = manifest.images
  const allParts = [...new Set(images.map(i => i.part))].sort()
  const allTypes = [...new Set(images.map(i => i.type))]
  const allTags  = [...new Set(images.flatMap(i => i.tags))].sort()

  const filtered = images.filter(img => {
    if (activeParts.size > 0 && !activeParts.has(img.part)) return false
    if (activeTypes.size > 0 && !activeTypes.has(img.type)) return false
    if (activeContext !== 'all' && img.context !== activeContext) return false
    if (activeTags.size > 0 && !img.tags.some(t => activeTags.has(t))) return false
    return true
  })

  const hasFilters = activeParts.size > 0 || activeTypes.size > 0 || activeContext !== 'all' || activeTags.size > 0

  function resetFilters() {
    setActiveParts(new Set())
    setActiveTypes(new Set())
    setActiveContext('all')
    setActiveTags(new Set())
    setOpenFilter(null)
  }

  function toggleOpen(key: NonNullable<OpenFilter>) {
    setOpenFilter(prev => prev === key ? null : key)
  }

  const partLabel = activeParts.size === 1
    ? `Teil: ${[...activeParts][0]}`
    : `Teil: ${activeParts.size}`

  const typeLabel = activeTypes.size === 1
    ? `Typ: ${TYPE_LABELS[[...activeTypes][0]] ?? [...activeTypes][0]}`
    : `Typ: ${activeTypes.size}`

  const ctxLabel = activeContext === 'kastanienallee'
    ? 'Kontext: Kastanienallee 7'
    : 'Kontext: Generisch'

  const tagLabel = activeTags.size === 1
    ? `Tags: ${[...activeTags][0]}`
    : `Tags: ${activeTags.size}`

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1 className="gallery-title">Bildgalerie</h1>
        <p className="gallery-count">
          {filtered.length === images.length
            ? `${images.length} Abbildungen`
            : `${filtered.length} von ${images.length} Abbildungen`}
        </p>
      </div>

      <div className="gallery-filter-bar" ref={filterBarRef}>
        <FilterPill
          label="Teil"
          isActive={activeParts.size > 0}
          activeLabel={partLabel}
          isOpen={openFilter === 'part'}
          onToggle={() => toggleOpen('part')}
          onClear={() => setActiveParts(new Set())}
        >
          {allParts.map(part => (
            <label key={part} className={`filter-option${activeParts.has(part) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeParts.has(part)}
                onChange={() => setActiveParts(s => toggle(s, part))}
              />
              {part}
            </label>
          ))}
        </FilterPill>

        <FilterPill
          label="Typ"
          isActive={activeTypes.size > 0}
          activeLabel={typeLabel}
          isOpen={openFilter === 'type'}
          onToggle={() => toggleOpen('type')}
          onClear={() => setActiveTypes(new Set())}
        >
          {allTypes.map(type => (
            <label key={type} className={`filter-option${activeTypes.has(type) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeTypes.has(type)}
                onChange={() => setActiveTypes(s => toggle(s, type))}
              />
              {TYPE_LABELS[type] ?? type}
            </label>
          ))}
        </FilterPill>

        <FilterPill
          label="Kontext"
          isActive={activeContext !== 'all'}
          activeLabel={ctxLabel}
          isOpen={openFilter === 'context'}
          onToggle={() => toggleOpen('context')}
          onClear={() => setActiveContext('all')}
        >
          {(['all', 'kastanienallee', 'generic'] as const).map(ctx => (
            <label key={ctx} className={`filter-option${activeContext === ctx ? ' filter-option--active' : ''}`}>
              <input
                type="radio"
                name="gallery-context"
                checked={activeContext === ctx}
                onChange={() => setActiveContext(ctx)}
              />
              {ctx === 'all' ? 'Alle' : ctx === 'kastanienallee' ? 'Kastanienallee 7' : 'Generisch'}
            </label>
          ))}
        </FilterPill>

        {allTags.length > 0 && (
          <FilterPill
            label="Tags"
            isActive={activeTags.size > 0}
            activeLabel={tagLabel}
            isOpen={openFilter === 'tags'}
            onToggle={() => toggleOpen('tags')}
            onClear={() => setActiveTags(new Set())}
          >
            {allTags.map(tag => (
              <label key={tag} className={`filter-option filter-option--mono${activeTags.has(tag) ? ' filter-option--active' : ''}`}>
                <input
                  type="checkbox"
                  checked={activeTags.has(tag)}
                  onChange={() => setActiveTags(s => toggle(s, tag))}
                />
                {tag}
              </label>
            ))}
          </FilterPill>
        )}

        {hasFilters && (
          <button className="gallery-reset" onClick={resetFilters}>
            Alle zurücksetzen
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Abbildungen für diese Filterauswahl.</p>
      ) : (
        <div className="gallery-grid">
          {filtered.map(img => (
            <div
              key={img.file}
              className="gallery-card"
              onClick={() => setLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setLightbox(img)}
            >
              <img
                className="gallery-card-img"
                src={`/assets/illustrations/${img.file}`}
                alt={img.caption}
                loading="lazy"
              />
              <div className="gallery-card-body">
                <p className="gallery-card-caption">{img.caption}</p>
                <div className="gallery-card-meta">
                  {img.chapter && (
                    <span className="gallery-badge gallery-badge--chapter">
                      Kap.&nbsp;{img.chapter}
                    </span>
                  )}
                  <span className="gallery-badge gallery-badge--type">
                    {TYPE_LABELS[img.type] ?? img.type}
                  </span>
                  <span className={`gallery-badge gallery-badge--${img.context}`}>
                    {img.context === 'kastanienallee' ? 'Kastanienallee 7' : 'Generisch'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && createPortal(
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Schließen">✕</button>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <img className="lightbox-img" src={`/assets/illustrations/${lightbox.file}`} alt={lightbox.caption} />
            {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
            <div className="gallery-lightbox-meta">
              {lightbox.chapter && (
                <span className="gallery-badge gallery-badge--chapter">
                  {lightbox.partTitle} · Kapitel {lightbox.chapter}
                </span>
              )}
              <span className="gallery-badge gallery-badge--type">
                {TYPE_LABELS[lightbox.type] ?? lightbox.type}
              </span>
              <span className={`gallery-badge gallery-badge--${lightbox.context}`}>
                {lightbox.context === 'kastanienallee' ? 'Kastanienallee 7' : 'Generisch'}
              </span>
            </div>
            {lightbox.chapterPath && (
              <NavLink
                to={`${bookPath(lightbox.chapterPath)}#img-${lightbox.file.replace(/\.[^.]+$/, '')}`}
                className="gallery-lightbox-link"
                onClick={closeLightbox}
              >
                {lightbox.chapterTitle || 'Zum Kapitel'} →
              </NavLink>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
