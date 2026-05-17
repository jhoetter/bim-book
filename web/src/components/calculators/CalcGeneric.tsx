import { useState } from 'react'
import katex from 'katex'
import type { FormulaEntry } from '../../data/formulas'

interface Props { entry: FormulaEntry }

function tex(src: string) {
  return katex.renderToString(src, { throwOnError: false, output: 'html', trust: false })
}

export function CalcGeneric({ entry }: Props) {
  const vars = entry.variables.filter(v => v.inputKey != null)
  const [inputs, setInputs] = useState<Record<string, number>>(
    () => Object.fromEntries(vars.map(v => [v.inputKey!, v.defaultValue ?? 1]))
  )

  if (!entry.calc || vars.length === 0) return null

  const set = (key: string, raw: string) => {
    const n = parseFloat(raw)
    if (!isNaN(n)) setInputs(s => ({ ...s, [key]: n }))
  }

  let result
  try {
    result = entry.calc(inputs)
  } catch {
    result = null
  }

  const prec = result?.precision ?? 3
  const statusClass = result?.status ? ` calc-${result.status}` : ''

  return (
    <div className="calc-card">
      <div className="calc-header">{entry.name}</div>
      <div className="calc-grid-2">
        {vars.map(v => (
          <label key={v.inputKey} className="calc-label">
            <span>
              <span dangerouslySetInnerHTML={{ __html: tex(v.symbol) }} />
              {' '}– {v.description}
              {v.unit && (
                <span style={{ color: 'var(--text-muted)', marginLeft: '0.25em' }}>
                  [{v.unit}]
                </span>
              )}
            </span>
            <input
              className="calc-input-num"
              type="number"
              step="any"
              value={inputs[v.inputKey!]}
              onChange={e => set(v.inputKey!, e.target.value)}
            />
          </label>
        ))}
      </div>

      <div className={`calc-result-row${statusClass}`}>
        <span>Ergebnis</span>
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize: '1.1em' }}>
          {result != null && isFinite(result.value)
            ? `${result.value.toFixed(prec)} ${result.unit}`
            : '—'}
        </span>
      </div>

      {result?.note && <p className="calc-note">{result.note}</p>}
    </div>
  )
}
