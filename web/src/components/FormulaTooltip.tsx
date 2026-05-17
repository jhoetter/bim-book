import { useState, useRef, useCallback } from 'react'
import katex from 'katex'
import { FORMULA_MAP } from '../data/formulas'

interface Props {
  id: string
}

function tex(src: string, display = false) {
  return katex.renderToString(src, { throwOnError: false, displayMode: display, output: 'html', trust: false })
}

export function FormulaTooltip({ id }: Props) {
  const [open, setOpen] = useState(false)
  const [above, setAbove] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const entry = FORMULA_MAP[id]

  const show = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setAbove(rect.bottom > window.innerHeight / 2)
    }
    setOpen(true)
  }, [])

  const hide = useCallback(() => setOpen(false), [])

  if (!entry) {
    return <span className="formula formula--unknown">[?]</span>
  }

  return (
    <span
      ref={ref}
      className={`formula${open ? ' formula--open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      aria-label={`Formel: ${entry.name}`}
      aria-expanded={open}
    >
      <span className="formula-inline">
        <span className="formula-badge-icon">ƒ</span>
        <span className="formula-badge-label">{entry.badge}</span>
      </span>
      {open && (
        <span
          className={`formula-popover${above ? ' formula-popover--above' : ' formula-popover--below'}`}
          role="tooltip"
        >
          <span className="formula-popover-name">{entry.name}</span>
          <span
            className="formula-popover-display"
            dangerouslySetInnerHTML={{ __html: tex(entry.displayTex, true) }}
          />
          {entry.variables.length > 0 && (
            <span className="formula-popover-vars">
              {entry.variables.map(v => (
                <span key={v.symbol} className="formula-var-row">
                  <span
                    className="formula-var-sym"
                    dangerouslySetInnerHTML={{ __html: tex(v.symbol) }}
                  />
                  <span className="formula-var-desc">
                    {v.description}
                    {v.unit && <span className="formula-var-unit"> [{v.unit}]</span>}
                    {v.example && <span className="formula-var-example"> · z.B. {v.example}</span>}
                  </span>
                </span>
              ))}
            </span>
          )}
          {entry.example && (
            <span className="formula-popover-example">
              <span className="formula-example-label">Beispiel:</span>
              {' '}{entry.example.description}
              {' → '}<strong>{entry.example.result} {entry.example.unit}</strong>
            </span>
          )}
          {entry.norm && (
            <span className="formula-popover-norm">{entry.norm}</span>
          )}
        </span>
      )}
    </span>
  )
}
