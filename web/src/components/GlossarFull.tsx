import { useState, useRef, useEffect } from 'react'
import { GLOSSAR, type GlossThema, type GlossTyp } from '../data/glossar'
import { FilterPill, toggle } from './FilterPill'

type OpenFilter = 'thema' | 'typ' | null

const THEMA_ORDER: GlossThema[] = [
  'BIM', 'Wärmeschutz', 'Feuchteschutz', 'Schallschutz', 'Brandschutz',
  'TGA', 'Baurecht', 'Konstruktion', 'Energie', 'Nachhaltigkeit',
]
const TYP_ORDER: GlossTyp[] = ['Kennwert', 'Norm', 'Verfahren', 'Material', 'Begriff']

export function GlossarFull() {
  const [search, setSearch]           = useState('')
  const [activeThemen, setActiveThemen] = useState<Set<GlossThema>>(new Set())
  const [activeTypen, setActiveTypen]   = useState<Set<GlossTyp>>(new Set())
  const [openFilter, setOpenFilter]   = useState<OpenFilter>(null)
  const filterBarRef = useRef<HTMLDivElement>(null)

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

  function toggleOpen(key: NonNullable<OpenFilter>) {
    setOpenFilter(prev => prev === key ? null : key)
  }

  const filtered = GLOSSAR.filter(e => {
    if (activeThemen.size > 0 && !activeThemen.has(e.thema)) return false
    if (activeTypen.size > 0 && !activeTypen.has(e.typ)) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        e.term.toLowerCase().includes(q) ||
        (e.abbrev?.toLowerCase().includes(q)) ||
        e.definition.toLowerCase().includes(q)
      )
    }
    return true
  })

  const hasFilters = activeThemen.size > 0 || activeTypen.size > 0

  function resetFilters() {
    setActiveThemen(new Set())
    setActiveTypen(new Set())
    setOpenFilter(null)
  }

  const themaLabel = activeThemen.size === 1
    ? `Thema: ${[...activeThemen][0]}`
    : `Thema: ${activeThemen.size}`

  const typLabel = activeTypen.size === 1
    ? `Typ: ${[...activeTypen][0]}`
    : `Typ: ${activeTypen.size}`

  return (
    <div className="glossar-full">
      <div className="glossar-filter-bar" ref={filterBarRef}>
        <input
          className="glossar-search"
          type="search"
          placeholder="Begriff suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Glossar durchsuchen"
        />
        <FilterPill
          label="Thema"
          isActive={activeThemen.size > 0}
          activeLabel={themaLabel}
          isOpen={openFilter === 'thema'}
          onToggle={() => toggleOpen('thema')}
          onClear={() => setActiveThemen(new Set())}
        >
          {THEMA_ORDER.map(thema => (
            <label key={thema} className={`filter-option${activeThemen.has(thema) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeThemen.has(thema)}
                onChange={() => setActiveThemen(s => toggle(s, thema))}
              />
              {thema}
            </label>
          ))}
        </FilterPill>

        <FilterPill
          label="Typ"
          isActive={activeTypen.size > 0}
          activeLabel={typLabel}
          isOpen={openFilter === 'typ'}
          onToggle={() => toggleOpen('typ')}
          onClear={() => setActiveTypen(new Set())}
        >
          {TYP_ORDER.map(typ => (
            <label key={typ} className={`filter-option${activeTypen.has(typ) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeTypen.has(typ)}
                onChange={() => setActiveTypen(s => toggle(s, typ))}
              />
              {typ}
            </label>
          ))}
        </FilterPill>

        {hasFilters && (
          <button className="gallery-reset" onClick={resetFilters}>
            Alle zurücksetzen
          </button>
        )}
        <span className="glossar-count">{filtered.length} Einträge</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Einträge für diese Filterauswahl.</p>
      ) : (
        <div className="glossar-list">
          {filtered.map(entry => (
            <div key={entry.id} className="glossar-entry">
              {entry.image ? (
                <div className="glossar-entry-img-wrap">
                  <img
                    className="glossar-entry-img"
                    src={entry.image}
                    alt={entry.term}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="glossar-entry-img-placeholder" />
              )}
              <div className="glossar-entry-body">
                <div className="glossar-entry-head">
                  {entry.abbrev && (
                    <span className="glossar-entry-abbrev">{entry.abbrev}</span>
                  )}
                  <span className="glossar-entry-term">{entry.term}</span>
                  <div className="glossar-entry-tags">
                    <span className="glossar-tag glossar-tag--thema">{entry.thema}</span>
                    <span className="glossar-tag glossar-tag--typ">{entry.typ}</span>
                  </div>
                </div>
                <p className="glossar-entry-def">{entry.definition}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
