import { useState } from 'react'

function dewPoint(T: number, RH: number): number {
  const a = 17.27, b = 237.3
  const es = 6.1078 * Math.exp((a * T) / (T + b))
  const e  = (RH / 100) * es
  const ln = Math.log(e / 6.1078)
  return (b * ln) / (a - ln)
}

export function CalcDewPoint() {
  const [Ti,   setTi]   = useState(20)
  const [RH,   setRH]   = useState(50)
  const [Te,   setTe]   = useState(-10)
  const [fRsi, setFRsi] = useState(0.70)

  const Td  = dewPoint(Ti, RH)
  // T_si = T_e + f_Rsi · (T_i − T_e)
  const Tsi = Te + fRsi * (Ti - Te)
  const risk = Tsi < Td

  return (
    <div className="calc-card">
      <div className="calc-header">Taupunkt &amp; Schimmelrisiko</div>

      <div className="calc-grid-2">
        <label className="calc-label">
          Raumtemperatur T<sub>i</sub>
          <div className="calc-slider-row">
            <input type="range" min={15} max={30} step={0.5} value={Ti}
              onChange={e => setTi(+e.target.value)} />
            <span className="calc-val">{Ti} °C</span>
          </div>
        </label>

        <label className="calc-label">
          Relative Luftfeuchte φ
          <div className="calc-slider-row">
            <input type="range" min={30} max={90} step={1} value={RH}
              onChange={e => setRH(+e.target.value)} />
            <span className="calc-val">{RH} %</span>
          </div>
        </label>

        <label className="calc-label">
          Außentemperatur T<sub>e</sub>
          <div className="calc-slider-row">
            <input type="range" min={-20} max={15} step={0.5} value={Te}
              onChange={e => setTe(+e.target.value)} />
            <span className="calc-val">{Te} °C</span>
          </div>
        </label>

        <label className="calc-label">
          Temperaturfaktor f<sub>Rsi</sub>
          <div className="calc-slider-row">
            <input type="range" min={0.50} max={1.00} step={0.01} value={fRsi}
              onChange={e => setFRsi(+e.target.value)} />
            <span className="calc-val">{fRsi.toFixed(2)}</span>
          </div>
        </label>
      </div>

      <div className="calc-result-row">
        <div>
          <div>Taupunkt T<sub>d</sub> = <strong>{Td.toFixed(1)} °C</strong></div>
          <div>Innenoberfläche T<sub>si</sub> = <strong>{Tsi.toFixed(1)} °C</strong></div>
        </div>
        <div className={risk ? 'calc-bad' : 'calc-good'} style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1em' }}>{risk ? '⚠ Schimmelrisiko' : '✓ Kein Risiko'}</div>
          <div className="calc-rating">
            {risk
              ? `T_si ${Tsi.toFixed(1)}°C < T_d ${Td.toFixed(1)}°C`
              : `T_si ${Tsi.toFixed(1)}°C > T_d ${Td.toFixed(1)}°C`}
          </div>
        </div>
      </div>

      <p className="calc-note">
        f<sub>Rsi</sub> = Temperaturfaktor nach DIN 4108-2. Anforderung: f<sub>Rsi</sub> ≥ 0,70.
        Eingabe entspricht dem Gesamtbauteil (ohne Wärmebrücken).
      </p>
    </div>
  )
}
