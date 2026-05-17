import { useRef, useState, useEffect } from 'react'
import katex from 'katex'
import { FORMULAS, type FormelThema } from '../data/formulas'
import type { FormulaEntry } from '../data/formulas'
import { FilterPill, toggle } from './FilterPill'
import { CalcUValue } from './calculators/CalcUValue'
import { CalcDewPoint } from './calculators/CalcDewPoint'
import { CalcSound } from './calculators/CalcSound'
import { CalcHoai } from './calculators/CalcHoai'
import { CalcHT } from './calculators/CalcHT'
import { CalcGeneric } from './calculators/CalcGeneric'

function tex(src: string, display = false) {
  return katex.renderToString(src, { throwOnError: false, displayMode: display, output: 'html', trust: false })
}

const DEDICATED_CALC: Record<string, React.ReactNode> = {
  'u-wert':                    <CalcUValue />,
  'schalldaemmass':             <CalcSound />,
  'glaser':                    <CalcDewPoint />,
  'transmissionswaermeverlust': <CalcHT />,
  'hoai':                      <CalcHoai />,
}

function getCalc(entry: FormulaEntry): React.ReactNode {
  if (entry.id in DEDICATED_CALC) return DEDICATED_CALC[entry.id]
  if (entry.calc) return <CalcGeneric entry={entry} />
  return null
}

function FormelDialog({ entry, dialogRef }: {
  entry: FormulaEntry
  dialogRef: React.RefObject<HTMLDialogElement | null>
}) {
  const close = () => dialogRef.current?.close()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close()
  }

  return (
    <dialog ref={dialogRef} className="formel-dialog" onClick={handleBackdropClick}>
      <div className="formel-dialog-inner">
        <div className="formel-dialog-header">
          <span className="formel-dialog-name">{entry.name}</span>
          <button className="formel-dialog-close" onClick={close} aria-label="Schließen">×</button>
        </div>

        <div
          className="formel-dialog-display"
          dangerouslySetInnerHTML={{ __html: tex(entry.displayTex, true) }}
        />

        {entry.variables.length > 0 && (
          <table className="formel-vars-table formel-dialog-vars">
            <tbody>
              {entry.variables.map(v => (
                <tr key={v.symbol} className="formel-var-row">
                  <td className="formel-var-sym" dangerouslySetInnerHTML={{ __html: tex(v.symbol) }} />
                  <td className="formel-var-desc">{v.description}</td>
                  <td className="formel-var-unit">{v.unit}</td>
                  {v.example && <td className="formel-var-example">z.B. {v.example}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {entry.example && (
          <div className="formel-card-example formel-dialog-example">
            <span className="formel-example-label">Beispiel · Kastanienallee 7:</span>
            <span className="formel-example-text"> {entry.example.description}</span>
            <span className="formel-example-result">
              {' → '}<strong>{entry.example.result} {entry.example.unit}</strong>
            </span>
          </div>
        )}

        {entry.norm && (
          <div className="formel-dialog-norm">
            <span className="formel-dialog-norm-label">Norm</span>
            {entry.norm}
          </div>
        )}
      </div>
    </dialog>
  )
}

function FormelCard({ entry }: { entry: FormulaEntry }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const calc = getCalc(entry)

  return (
    <div className="formel-card">
      <div className="formel-card-header">
        <h3 className="formel-card-name">{entry.name}</h3>
        <div className="formel-card-header-right">
          <span className="glossar-tag glossar-tag--thema">{entry.thema}</span>
          {calc != null && <span className="glossar-tag glossar-tag--typ">Rechner</span>}
          <button
            className="formel-info-btn"
            onClick={() => dialogRef.current?.showModal()}
            aria-label={`Formel anzeigen: ${entry.name}`}
            title="Formel &amp; Erklärung"
          >
            ƒ
          </button>
        </div>
      </div>

      {calc != null && (
        <div className="formel-card-calc-direct">
          {calc}
        </div>
      )}

      <FormelDialog entry={entry} dialogRef={dialogRef} />
    </div>
  )
}

const THEMA_ORDER: FormelThema[] = [
  'Wärmeschutz', 'Schallschutz', 'Feuchteschutz', 'Baurecht', 'Energie', 'Honorar',
]

export function FormelSammlung() {
  const [search, setSearch]             = useState('')
  const [activeThemen, setActiveThemen] = useState<Set<FormelThema>>(new Set())
  const [openFilter, setOpenFilter]     = useState(false)
  const filterBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openFilter) return
    const handleClick = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenFilter(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openFilter])

  const filtered = FORMULAS.filter(f => {
    if (activeThemen.size > 0 && !activeThemen.has(f.thema)) return false
    if (search.trim() && !f.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const hasFilters = activeThemen.size > 0

  const themaLabel = activeThemen.size === 1
    ? `Thema: ${[...activeThemen][0]}`
    : `Thema: ${activeThemen.size}`

  return (
    <div className="formel-page">
      <div className="glossar-filter-bar" ref={filterBarRef}>
        <input
          className="glossar-search"
          type="search"
          placeholder="Formel suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Formeln durchsuchen"
        />
        <FilterPill
          label="Thema"
          isActive={activeThemen.size > 0}
          activeLabel={themaLabel}
          isOpen={openFilter}
          onToggle={() => setOpenFilter(v => !v)}
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

        {hasFilters && (
          <button className="gallery-reset" onClick={() => { setActiveThemen(new Set()); setOpenFilter(false) }}>
            Alle zurücksetzen
          </button>
        )}
        <span className="glossar-count">{filtered.length} Formeln</span>
      </div>

      {filtered.length === 0 ? (
        <p className="gallery-empty">Keine Formeln für diese Filterauswahl.</p>
      ) : (
        <div className="formel-sammlung">
          {filtered.map(entry => (
            <FormelCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
