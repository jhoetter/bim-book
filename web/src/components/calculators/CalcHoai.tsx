import { useState } from 'react'

// HOAI 2021 Anlage 10 – Gebäude und Innenräume
// Table: [eligible costs €, HZ I min, HZ III mid, HZ V max]
// HZ III mid ≈ average of HZ III min and HZ III max from the official table
const TABLE: [number, number, number, number][] = [
  [    25_000,  3_150,   5_560,   7_520],
  [    35_000,  4_054,   7_140,   9_680],
  [    50_000,  5_560,   9_610,  13_280],
  [    75_000,  7_700,  13_300,  18_350],
  [   100_000,  9_810,  16_570,  22_850],
  [   150_000, 13_600,  22_900,  31_600],
  [   200_000, 17_250,  29_040,  40_080],
  [   300_000, 23_600,  39_700,  54_800],
  [   500_000, 35_200,  59_200,  81_700],
  [   750_000, 49_800,  83_800, 115_500],
  [ 1_000_000, 63_700, 107_000, 147_700],
  [ 1_500_000, 89_800, 151_000, 208_400],
  [ 2_000_000,114_700, 192_500, 266_000],
  [ 3_000_000,161_800, 271_000, 374_700],
  [ 5_000_000,245_200, 411_000, 568_000],
  [10_000_000,408_000, 685_000, 946_000],
]

// HOAI LP percentages (§ 34 Abs. 3 HOAI 2021, Anlage 10)
const LP_PCTS: { lp: number; label: string; pct: number }[] = [
  { lp: 1, label: 'Grundlagenermittlung',   pct: 2  },
  { lp: 2, label: 'Vorplanung',             pct: 7  },
  { lp: 3, label: 'Entwurfsplanung',        pct: 15 },
  { lp: 4, label: 'Genehmigungsplanung',    pct: 3  },
  { lp: 5, label: 'Ausführungsplanung',     pct: 25 },
  { lp: 6, label: 'Vorbereitung Vergabe',   pct: 10 },
  { lp: 7, label: 'Mitwirkung Vergabe',     pct: 4  },
  { lp: 8, label: 'Objektüberwachung',      pct: 32 },
  { lp: 9, label: 'Objektbetreuung',        pct: 2  },
]

function interpolate(K: number, col: 1 | 2 | 3): number {
  if (K <= TABLE[0][0]) return TABLE[0][col]
  if (K >= TABLE[TABLE.length - 1][0]) return TABLE[TABLE.length - 1][col]
  for (let i = 0; i < TABLE.length - 1; i++) {
    const [k0, , , ] = TABLE[i]
    const [k1, , , ] = TABLE[i + 1]
    if (K >= k0 && K <= k1) {
      const t = (K - k0) / (k1 - k0)
      return TABLE[i][col] + t * (TABLE[i + 1][col] - TABLE[i][col])
    }
  }
  return 0
}

function fmt(n: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function CalcHoai() {
  const [costs, setCosts]   = useState(500_000)
  const [zone,  setZone]    = useState<1|2|3>(2) // 1=HZ I, 2=HZ III mid, 3=HZ V
  const [selectedLPs, setSelectedLPs] = useState<Set<number>>(new Set([1,2,3,4,5,6,7,8,9]))

  const totalHonorar = interpolate(costs, zone)
  const activePct    = LP_PCTS.filter(l => selectedLPs.has(l.lp)).reduce((s, l) => s + l.pct, 0)
  const fee          = totalHonorar * (activePct / 100)

  const toggleLP = (lp: number) => setSelectedLPs(prev => {
    const next = new Set(prev)
    next.has(lp) ? next.delete(lp) : next.add(lp)
    return next
  })

  return (
    <div className="calc-card">
      <div className="calc-header">HOAI-Honorar Rechner (2021)</div>

      <div className="calc-grid-2">
        <label className="calc-label" style={{ gridColumn: '1 / -1' }}>
          Anrechenbare Kosten (KG 300+400)
          <div className="calc-slider-row">
            <input type="range"
              min={25_000} max={5_000_000} step={25_000}
              value={costs}
              onChange={e => setCosts(+e.target.value)} />
            <span className="calc-val">{fmt(costs)}</span>
          </div>
        </label>

        <label className="calc-label" style={{ gridColumn: '1 / -1' }}>
          Honorarzone
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            {[
              { v: 1 as const, label: 'HZ I – einfach'    },
              { v: 2 as const, label: 'HZ III – mittel'   },
              { v: 3 as const, label: 'HZ V – sehr komplex'},
            ].map(({ v, label }) => (
              <button
                key={v}
                className={`calc-zone-btn ${zone === v ? 'calc-zone-btn--active' : ''}`}
                onClick={() => setZone(v)}
              >
                {label}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <div className="calc-sub-header">Leistungsphasen auswählen</div>
        <div className="calc-lp-grid">
          {LP_PCTS.map(l => (
            <label key={l.lp} className={`calc-lp-chip ${selectedLPs.has(l.lp) ? 'calc-lp-chip--on' : ''}`}>
              <input type="checkbox" checked={selectedLPs.has(l.lp)}
                onChange={() => toggleLP(l.lp)} style={{ display: 'none' }} />
              <span className="calc-lp-num">LP {l.lp}</span>
              <span className="calc-lp-label">{l.label}</span>
              <span className="calc-lp-pct">{l.pct} %</span>
            </label>
          ))}
        </div>
      </div>

      <div className="calc-result-row">
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
            Grundhonorar gesamt ({activePct} % von {fmt(totalHonorar)})
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
            {fmt(fee)}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div>= {(fee / costs * 100).toFixed(1)} % der Kosten</div>
          <div>{activePct} / 100 LP-Anteil</div>
        </div>
      </div>

      <p className="calc-note">
        Näherungswerte nach HOAI 2021 Anlage 10 (Gebäude). Seit dem EuGH-Urteil 2019 sind
        Mindest- und Höchstsätze nicht mehr verbindlich. Kein Ersatz für eine individuelle Honorarberechnung.
      </p>
    </div>
  )
}
