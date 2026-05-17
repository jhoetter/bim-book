import { useState } from 'react'

interface Row { id: number; label: string; U: number; A: number; f: number }

const DEFAULTS: Row[] = [
  { id: 1, label: 'Außenwand',   U: 0.19, A: 180, f: 1.0 },
  { id: 2, label: 'Dach',        U: 0.14, A: 90,  f: 1.0 },
  { id: 3, label: 'Bodenplatte', U: 0.25, A: 90,  f: 0.6 },
  { id: 4, label: 'Fenster',     U: 1.10, A: 40,  f: 1.0 },
]

export function CalcHT() {
  const [rows, setRows] = useState<Row[]>(DEFAULTS)
  const [nextId, setNextId] = useState(DEFAULTS.length + 1)

  const update = (id: number, field: keyof Omit<Row, 'id'>, raw: string) => {
    setRows(rs => rs.map(r => {
      if (r.id !== id) return r
      if (field === 'label') return { ...r, label: raw }
      const n = parseFloat(raw)
      return { ...r, [field]: isNaN(n) ? r[field] : Math.max(0, n) }
    }))
  }

  const add = () => {
    setRows(rs => [...rs, { id: nextId, label: 'Bauteil', U: 0.28, A: 20, f: 1.0 }])
    setNextId(n => n + 1)
  }

  const remove = (id: number) => setRows(rs => rs.filter(r => r.id !== id))

  const HT = rows.reduce((s, r) => s + r.U * r.A * r.f, 0)

  return (
    <div className="calc-card">
      <div className="calc-header">
        Transmissionswärmeverlust H<sub>T</sub>
      </div>

      <table className="calc-table">
        <thead>
          <tr>
            <th>Bauteil</th>
            <th>U [W/(m²K)]</th>
            <th>A [m²]</th>
            <th>f<sub>x</sub> [–]</th>
            <th>U·A·f [W/K]</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>
                <input
                  className="calc-input-text"
                  value={r.label}
                  onChange={e => update(r.id, 'label', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="calc-input-num"
                  type="number" min={0} step={0.01}
                  value={r.U}
                  onChange={e => update(r.id, 'U', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="calc-input-num"
                  type="number" min={0} step={1}
                  value={r.A}
                  onChange={e => update(r.id, 'A', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="calc-input-num"
                  type="number" min={0} max={1} step={0.05}
                  value={r.f}
                  onChange={e => update(r.id, 'f', e.target.value)}
                />
              </td>
              <td style={{ fontVariantNumeric: 'tabular-nums' }}>
                {(r.U * r.A * r.f).toFixed(1)}
              </td>
              <td>
                <button
                  className="calc-remove"
                  onClick={() => remove(r.id)}
                  aria-label="Entfernen"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="calc-add-btn" onClick={add}>+ Bauteil hinzufügen</button>

      <div className="calc-result-row">
        <span>H<sub>T</sub> gesamt</span>
        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', fontSize: '1.1em' }}>
          {HT.toFixed(1)} W/K
        </span>
      </div>

      <p className="calc-note">
        f<sub>x</sub>: 1,0 für Außenbauteile, 0,6 für erdberührte Bauteile,
        0,5 für angrenzend beheizte Bereiche. Norm: DIN EN 12831.
      </p>
    </div>
  )
}
