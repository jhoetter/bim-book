import { useState, useRef, useEffect } from 'react'
import { IFC_ENTRIES, type IfcDisziplin, type IfcTyp } from '../data/ifc-entities'
import { FilterPill, toggle } from './FilterPill'

type OpenFilter = 'disziplin' | 'typ' | null

const DISZIPLIN_ORDER: IfcDisziplin[] = [
  'Struktur', 'Architektur', 'TGA-Heizung', 'TGA-Lüftung', 'TGA-Elektro', 'Material',
]
const TYP_ORDER: IfcTyp[] = ['Entität', 'Property Set']

const DISZIPLIN_COLOR: Record<IfcDisziplin, string> = {
  'Struktur':     'ifc-tag--struktur',
  'Architektur':  'ifc-tag--arch',
  'TGA-Heizung':  'ifc-tag--heizung',
  'TGA-Lüftung':  'ifc-tag--lueftung',
  'TGA-Elektro':  'ifc-tag--elektro',
  'Material':     'ifc-tag--material',
}

export function IfcReferenz() {
  const [search, setSearch]           = useState('')
  const [activeDisziplin, setActiveDisziplin] = useState<Set<IfcDisziplin>>(new Set())
  const [activeTyp, setActiveTyp]     = useState<Set<IfcTyp>>(new Set())
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

  const filtered = IFC_ENTRIES.filter(e => {
    if (activeDisziplin.size > 0 && !activeDisziplin.has(e.disziplin)) return false
    if (activeTyp.size > 0 && !activeTyp.has(e.typ)) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        e.entity.toLowerCase().includes(q) ||
        e.bedeutung.toLowerCase().includes(q) ||
        e.ka7.toLowerCase().includes(q)
      )
    }
    return true
  })

  const hasFilters = activeDisziplin.size > 0 || activeTyp.size > 0

  function resetFilters() {
    setActiveDisziplin(new Set())
    setActiveTyp(new Set())
    setOpenFilter(null)
  }

  const diszLabel = activeDisziplin.size === 1
    ? `Disziplin: ${[...activeDisziplin][0]}`
    : `Disziplin: ${activeDisziplin.size}`

  const typLabel = activeTyp.size === 1
    ? `Typ: ${[...activeTyp][0]}`
    : `Typ: ${activeTyp.size}`

  return (
    <div className="ifc-referenz">
      <div className="glossar-filter-bar" ref={filterBarRef}>
        <input
          className="glossar-search"
          type="search"
          placeholder="Entität oder Bedeutung suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="IFC-Referenz durchsuchen"
        />
        <FilterPill
          label="Disziplin"
          isActive={activeDisziplin.size > 0}
          activeLabel={diszLabel}
          isOpen={openFilter === 'disziplin'}
          onToggle={() => toggleOpen('disziplin')}
          onClear={() => setActiveDisziplin(new Set())}
        >
          {DISZIPLIN_ORDER.map(d => (
            <label key={d} className={`filter-option${activeDisziplin.has(d) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeDisziplin.has(d)}
                onChange={() => setActiveDisziplin(s => toggle(s, d))}
              />
              {d}
            </label>
          ))}
        </FilterPill>
        <FilterPill
          label="Typ"
          isActive={activeTyp.size > 0}
          activeLabel={typLabel}
          isOpen={openFilter === 'typ'}
          onToggle={() => toggleOpen('typ')}
          onClear={() => setActiveTyp(new Set())}
        >
          {TYP_ORDER.map(t => (
            <label key={t} className={`filter-option${activeTyp.has(t) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeTyp.has(t)}
                onChange={() => setActiveTyp(s => toggle(s, t))}
              />
              {t}
            </label>
          ))}
        </FilterPill>
        {hasFilters && (
          <button className="gallery-reset" onClick={resetFilters}>Alle zurücksetzen</button>
        )}
        <span className="glossar-count">{filtered.length} Einträge</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Einträge für diese Filterauswahl.</p>
      ) : (
        <div className="ifc-list">
          {filtered.map(entry => (
            <div key={entry.id} className="ifc-entry">
              <div className="ifc-entry-head">
                <code className="ifc-entity-name">{entry.entity}</code>
                <div className="ifc-entry-tags">
                  <span className={`ifc-tag ${DISZIPLIN_COLOR[entry.disziplin]}`}>{entry.disziplin}</span>
                  {entry.typ === 'Property Set' && (
                    <span className="ifc-tag ifc-tag--pset">Pset</span>
                  )}
                </div>
              </div>
              <p className="ifc-entry-bedeutung">{entry.bedeutung}</p>
              <div className="ifc-ka7-note">
                <span className="ifc-ka7-label">KA7</span>
                <span className="ifc-ka7-text">{entry.ka7}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
