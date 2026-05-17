import { useState } from 'react'

interface Material { name: string; rho: number }

const MATERIALS: Material[] = [
  { name: 'Mauerwerk – Vollziegel',   rho: 1800 },
  { name: 'Mauerwerk – Lochziegel',   rho: 900  },
  { name: 'Kalksandstein',            rho: 1800 },
  { name: 'Stahlbeton',               rho: 2400 },
  { name: 'Gipskarton (einlagig)',     rho: 900  },
  { name: 'Holz – Brettsperrholz',    rho: 500  },
  { name: 'Stahl',                    rho: 7800 },
  { name: 'Glas',                     rho: 2500 },
]

// Simplified mass law at 500 Hz: R = 20·log10(m·f) − 47
// f = 500 Hz → R ≈ 20·log10(m) + 7
// Then a −5 dB correction for practical Rw (empirical)
function massLawRw(m: number): number {
  return Math.max(0, 20 * Math.log10(m * 500) - 47 - 5)
}

const REQUIREMENTS = [
  { label: 'Bürotrennwand (leicht)',          min: 37 },
  { label: 'Wohnungstrennwand – Norm',         min: 53 },
  { label: 'Wohnungstrennwand – erhöht',       min: 58 },
  { label: 'Treppenhaus (erhöhter Schallsch.)',min: 57 },
]

export function CalcSound() {
  const [matIdx, setMatIdx] = useState(0)
  const [d, setD] = useState(24)

  const mat = MATERIALS[matIdx]
  const m   = mat.rho * (d / 100)
  const Rw  = massLawRw(m)

  return (
    <div className="calc-card">
      <div className="calc-header">Schallschutz – bewertetes Schalldämmmaß R'<sub>w</sub></div>

      <div className="calc-grid-2">
        <label className="calc-label" style={{ gridColumn: '1 / -1' }}>
          Material
          <select className="calc-select" value={matIdx}
            onChange={e => setMatIdx(+e.target.value)}>
            {MATERIALS.map((m, i) => (
              <option key={i} value={i}>{m.name} ({m.rho} kg/m³)</option>
            ))}
          </select>
        </label>

        <label className="calc-label">
          Bauteildicke d
          <div className="calc-slider-row">
            <input type="range" min={5} max={50} step={1} value={d}
              onChange={e => setD(+e.target.value)} />
            <span className="calc-val">{d} cm</span>
          </div>
        </label>

        <div className="calc-label" style={{ justifyContent: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Flächenmasse m'</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {m.toFixed(0)} kg/m²
          </div>
        </div>
      </div>

      <div className="calc-result-row" style={{ marginBottom: '0.75rem' }}>
        <span>Massengesetz (Schätzwert)</span>
        <span style={{ fontSize: '1.15rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          R'<sub>w</sub> ≈ <strong>{Rw.toFixed(0)} dB</strong>
        </span>
      </div>

      <table className="calc-table">
        <thead>
          <tr>
            <th>Anforderung (DIN 4109)</th>
            <th style={{ textAlign: 'right' }}>Mindest-R'<sub>w</sub></th>
            <th style={{ textAlign: 'center' }}>Erfüllt?</th>
          </tr>
        </thead>
        <tbody>
          {REQUIREMENTS.map(r => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.min} dB</td>
              <td style={{ textAlign: 'center' }}>
                <span className={Rw >= r.min ? 'calc-good' : 'calc-bad'}>
                  {Rw >= r.min ? '✓' : '✗'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="calc-note">
        Schätzung nach dem Massengesetz für einschalige Bauteile. Reale R'<sub>w</sub>-Werte
        (mit Flankenübertragung) sind i.d.R. um 2–5 dB geringer. Zweischalige Konstruktionen
        und Vorsatzschalen werden hier nicht berücksichtigt.
      </p>
    </div>
  )
}
