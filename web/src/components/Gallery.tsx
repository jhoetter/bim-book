import { useState, useEffect, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'

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

export function Gallery() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [activeParts, setActiveParts]       = useState<Set<string>>(new Set())
  const [activeTypes, setActiveTypes]       = useState<Set<string>>(new Set())
  const [activeContext, setActiveContext]   = useState<'all' | 'kastanienallee' | 'generic'>('all')
  const [activeTags, setActiveTags]         = useState<Set<string>>(new Set())
  const [lightbox, setLightbox]             = useState<LightboxEntry | null>(null)

  useEffect(() => {
    fetch('/assets/image-manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(() => setManifest({ version: 1, images: [] }))
  }, [])

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

  const images = manifest.images
  const allParts  = [...new Set(images.map(i => i.part))].sort()
  const allTypes  = [...new Set(images.map(i => i.type))]
  const allTags   = [...new Set(images.flatMap(i => i.tags))].sort()

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
  }

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

      <div className="gallery-filters">
        <div className="gallery-filter-row">
          <span className="gallery-filter-label">Teil</span>
          {allParts.map(part => (
            <button
              key={part}
              className={`gallery-chip${activeParts.has(part) ? ' gallery-chip--active' : ''}`}
              onClick={() => setActiveParts(s => toggle(s, part))}
            >
              {part}
            </button>
          ))}
        </div>

        <div className="gallery-filter-row">
          <span className="gallery-filter-label">Typ</span>
          {allTypes.map(type => (
            <button
              key={type}
              className={`gallery-chip${activeTypes.has(type) ? ' gallery-chip--active' : ''}`}
              onClick={() => setActiveTypes(s => toggle(s, type))}
            >
              {TYPE_LABELS[type] ?? type}
            </button>
          ))}
        </div>

        <div className="gallery-filter-row">
          <span className="gallery-filter-label">Kontext</span>
          {(['all', 'kastanienallee', 'generic'] as const).map(ctx => (
            <button
              key={ctx}
              className={[
                'gallery-chip',
                activeContext === ctx ? 'gallery-chip--active' : '',
                ctx === 'kastanienallee' ? 'gallery-chip--kastanienallee' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveContext(ctx)}
            >
              {ctx === 'all' ? 'Alle' : ctx === 'kastanienallee' ? 'Kastanienallee 7' : 'Generisch'}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="gallery-filter-row gallery-filter-row--tags">
            <span className="gallery-filter-label">Tags</span>
            <div className="gallery-tags-scroll">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`gallery-chip gallery-chip--tag${activeTags.has(tag) ? ' gallery-chip--active' : ''}`}
                  onClick={() => setActiveTags(s => toggle(s, tag))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <div className="gallery-filter-row">
            <span className="gallery-filter-label" />
            <button className="gallery-reset" onClick={resetFilters}>Filter zurücksetzen</button>
          </div>
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
                to={`/${lightbox.chapterPath}`}
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
