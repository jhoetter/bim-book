import { useState } from 'react'
import katex from 'katex'
import { FORMULAS } from '../data/formulas'
import { CalcUValue } from './calculators/CalcUValue'
import { CalcDewPoint } from './calculators/CalcDewPoint'
import { CalcSound } from './calculators/CalcSound'

function tex(src: string, display = false) {
  return katex.renderToString(src, { throwOnError: false, displayMode: display, output: 'html', trust: false })
}

const CALC_FOR: Record<string, React.ReactNode> = {
  'u-wert': <CalcUValue />,
  'schalldaemmass': <CalcSound />,
  'r-wert': null, // covered by u-wert calc
  'glaser': <CalcDewPoint />,
}

function FormelCard({ entry }: { entry: typeof FORMULAS[number] }) {
  const [calcOpen, setCalcOpen] = useState(false)
  const calc = CALC_FOR[entry.id]

  return (
    <div className="formel-card">
      <div className="formel-card-header">
        <h3 className="formel-card-name">{entry.name}</h3>
        {entry.norm && <span className="formel-card-norm">{entry.norm}</span>}
      </div>

      <div
        className="formel-card-display"
        dangerouslySetInnerHTML={{ __html: tex(entry.displayTex, true) }}
      />

      {entry.variables.length > 0 && (
        <table className="formel-vars-table">
          <tbody>
            {entry.variables.map(v => (
              <tr key={v.symbol} className="formel-var-row">
                <td
                  className="formel-var-sym"
                  dangerouslySetInnerHTML={{ __html: tex(v.symbol) }}
                />
                <td className="formel-var-desc">{v.description}</td>
                <td className="formel-var-unit">{v.unit}</td>
                {v.example && (
                  <td className="formel-var-example">z.B. {v.example}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {entry.example && (
        <div className="formel-card-example">
          <span className="formel-example-label">Beispiel · Kastanienallee 7:</span>
          <span className="formel-example-text"> {entry.example.description}</span>
          <span className="formel-example-result">
            {' → '}<strong>{entry.example.result} {entry.example.unit}</strong>
          </span>
        </div>
      )}

      {calc !== undefined && calc !== null && (
        <div className="formel-card-calc">
          <button
            className={`formel-calc-toggle${calcOpen ? ' formel-calc-toggle--open' : ''}`}
            onClick={() => setCalcOpen(v => !v)}
          >
            <span>{calcOpen ? 'Rechner schließen' : 'Interaktiver Rechner'}</span>
            <span className="formel-calc-chevron">{calcOpen ? '↑' : '↓'}</span>
          </button>
          {calcOpen && <div className="formel-calc-body">{calc}</div>}
        </div>
      )}
    </div>
  )
}

export function FormelSammlung() {
  return (
    <div className="formel-sammlung">
      {FORMULAS.map(entry => (
        <FormelCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
