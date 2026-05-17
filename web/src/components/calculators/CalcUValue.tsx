import { useState } from 'react'

interface Layer { id: number; name: string; d: number; lambda: number }

const R_SI = 0.13
const R_SE = 0.04

const DEFAULTS: Layer[] = [
  { id: 1, name: 'Innenputz',      d: 1.5, lambda: 0.87  },
  { id: 2, name: 'Mauerwerk',      d: 24,  lambda: 0.79  },
  { id: 3, name: 'Wärmedämmung',   d: 12,  lambda: 0.035 },
  { id: 4, name: 'Außenputz',      d: 1.5, lambda: 0.87  },
]

export function CalcUValue() {
  const [layers, setLayers] = useState<Layer[]>(DEFAULTS)
  const [nextId, setNextId] = useState(5)

  const update = (id: number, field: keyof Omit<Layer, 'id'>, raw: string) => {
    setLayers(ls => ls.map(l => {
      if (l.id !== id) return l
      if (field === 'name') return { ...l, name: raw }
      const num = parseFloat(raw)
      return { ...l, [field]: isNaN(num) ? l[field] : Math.max(0.001, num) }
    }))
  }

  const add = () => {
    setLayers(ls => [...ls, { id: nextId, name: 'Neue Schicht', d: 10, lambda: 0.5 }])
    setNextId(n => n + 1)
  }

  const remove = (id: number) => setLayers(ls => ls.filter(l => l.id !== id))

  const R_layers = layers.reduce((s, l) => s + (l.d / 100) / l.lambda, 0)
  const R_T = R_SI + R_layers + R_SE
  const U = 1 / R_T

  const ratingClass = U < 0.24 ? 'calc-good' : U < 0.45 ? 'calc-warn' : 'calc-bad'
  const ratingLabel = U < 0.24 ? 'sehr gut' : U < 0.45 ? 'ausreichend' : 'ungenügend'

  return (
    <div className="calc-card">
      <div className="calc-header">U-Wert Rechner</div>

      <table className="calc-table">
        <thead>
          <tr>
            <th>Schicht</th>
            <th>d (cm)</th>
            <th>λ (W/mK)</th>
            <th>R (m²K/W)</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr className="calc-row-fixed">
            <td>Wärmeübergang innen (R<sub>si</sub>)</td>
            <td>—</td><td>—</td><td>{R_SI.toFixed(2)}</td><td />
          </tr>

          {layers.map(l => (
            <tr key={l.id}>
              <td>
                <input
                  className="calc-input-text"
                  value={l.name}
                  onChange={e => update(l.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="calc-input-num"
                  type="number" min={0.1} step={0.5}
                  value={l.d}
                  onChange={e => update(l.id, 'd', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="calc-input-num"
                  type="number" min={0.001} step={0.001}
                  value={l.lambda}
                  onChange={e => update(l.id, 'lambda', e.target.value)}
                />
              </td>
              <td>{((l.d / 100) / l.lambda).toFixed(3)}</td>
              <td>
                <button className="calc-remove" onClick={() => remove(l.id)} aria-label="Entfernen">
                  ×
                </button>
              </td>
            </tr>
          ))}

          <tr className="calc-row-fixed">
            <td>Wärmeübergang außen (R<sub>se</sub>)</td>
            <td>—</td><td>—</td><td>{R_SE.toFixed(2)}</td><td />
          </tr>
        </tbody>
      </table>

      <button className="calc-add-btn" onClick={add}>+ Schicht hinzufügen</button>

      <div className="calc-result-row">
        <span>R<sub>T</sub> = <strong>{R_T.toFixed(3)}</strong> m²K/W</span>
        <span className={ratingClass}>
          U = <strong>{U.toFixed(3)}</strong> W/(m²K)
          <span className="calc-rating"> · {ratingLabel}</span>
        </span>
      </div>
    </div>
  )
}
