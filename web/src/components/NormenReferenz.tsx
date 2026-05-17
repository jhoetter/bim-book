import { useState, useRef, useEffect } from 'react'
import { NORMEN, type NormPhase, type NormBereich } from '../data/normen'
import { FilterPill, toggle } from './FilterPill'

type OpenFilter = 'phase' | 'bereich' | null

const PHASE_ORDER: NormPhase[] = ['Entwurf', 'Genehmigung', 'Ausführung', 'Betrieb', 'Alle']
const BEREICH_ORDER: NormBereich[] = ['Bauphysik', 'Brandschutz', 'TGA', 'Lüftung', 'Recht', 'BIM']

const PHASE_CLASS: Record<NormPhase, string> = {
  'Entwurf':      'norm-phase--entwurf',
  'Genehmigung':  'norm-phase--genehmigung',
  'Ausführung':   'norm-phase--ausfuehrung',
  'Betrieb':      'norm-phase--betrieb',
  'Alle':         'norm-phase--alle',
}

const BEREICH_CLASS: Record<NormBereich, string> = {
  'Bauphysik':  'norm-bereich--bauphysik',
  'Brandschutz':'norm-bereich--brandschutz',
  'TGA':        'norm-bereich--tga',
  'Lüftung':    'norm-bereich--lueftung',
  'Recht':      'norm-bereich--recht',
  'BIM':        'norm-bereich--bim',
}

export function NormenReferenz() {
  const [search, setSearch]           = useState('')
  const [activePhase, setActivePhase] = useState<Set<NormPhase>>(new Set())
  const [activeBereich, setActiveBereich] = useState<Set<NormBereich>>(new Set())
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

  const filtered = NORMEN.filter(e => {
    if (activePhase.size > 0 && !activePhase.has(e.phase)) return false
    if (activeBereich.size > 0 && !activeBereich.has(e.bereich)) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        e.norm.toLowerCase().includes(q) ||
        e.thema.toLowerCase().includes(q) ||
        e.ka7.toLowerCase().includes(q)
      )
    }
    return true
  })

  const hasFilters = activePhase.size > 0 || activeBereich.size > 0

  function resetFilters() {
    setActivePhase(new Set())
    setActiveBereich(new Set())
    setOpenFilter(null)
  }

  const phaseLabel = activePhase.size === 1
    ? `Phase: ${[...activePhase][0]}`
    : `Phase: ${activePhase.size}`

  const bereichLabel = activeBereich.size === 1
    ? `Bereich: ${[...activeBereich][0]}`
    : `Bereich: ${activeBereich.size}`

  return (
    <div className="normen-referenz">
      <div className="glossar-filter-bar" ref={filterBarRef}>
        <input
          className="glossar-search"
          type="search"
          placeholder="Norm oder Thema suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Normen durchsuchen"
        />
        <FilterPill
          label="Projektphase"
          isActive={activePhase.size > 0}
          activeLabel={phaseLabel}
          isOpen={openFilter === 'phase'}
          onToggle={() => toggleOpen('phase')}
          onClear={() => setActivePhase(new Set())}
        >
          {PHASE_ORDER.map(p => (
            <label key={p} className={`filter-option${activePhase.has(p) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activePhase.has(p)}
                onChange={() => setActivePhase(s => toggle(s, p))}
              />
              {p}
            </label>
          ))}
        </FilterPill>
        <FilterPill
          label="Bereich"
          isActive={activeBereich.size > 0}
          activeLabel={bereichLabel}
          isOpen={openFilter === 'bereich'}
          onToggle={() => toggleOpen('bereich')}
          onClear={() => setActiveBereich(new Set())}
        >
          {BEREICH_ORDER.map(b => (
            <label key={b} className={`filter-option${activeBereich.has(b) ? ' filter-option--active' : ''}`}>
              <input
                type="checkbox"
                checked={activeBereich.has(b)}
                onChange={() => setActiveBereich(s => toggle(s, b))}
              />
              {b}
            </label>
          ))}
        </FilterPill>
        {hasFilters && (
          <button className="gallery-reset" onClick={resetFilters}>Alle zurücksetzen</button>
        )}
        <span className="glossar-count">{filtered.length} Normen</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Einträge für diese Filterauswahl.</p>
      ) : (
        <div className="normen-list">
          {filtered.map(entry => (
            <div key={entry.id} className="normen-entry">
              <div className="normen-entry-head">
                <span className="normen-norm-name">{entry.norm}</span>
                <div className="normen-entry-tags">
                  <span className={`norm-phase ${PHASE_CLASS[entry.phase]}`}>{entry.phase}</span>
                  <span className={`norm-bereich ${BEREICH_CLASS[entry.bereich]}`}>{entry.bereich}</span>
                </div>
              </div>
              <p className="normen-entry-thema">{entry.thema}</p>
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
