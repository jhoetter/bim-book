// Pure calculation functions — mirrored from web/src/lib/calculators.ts
// Used by MCP tools and /api/chat tool calls

// ── U-Wert ────────────────────────────────────────────────────────────────────

export interface ULayer { name: string; d_mm: number; lambda: number }

export const GEG_LIMITS: Record<string, number> = {
  wall: 0.28, roof: 0.20, window: 1.30, floor: 0.35,
}
const GEG_LABELS: Record<string, string> = {
  wall: 'Außenwand', roof: 'Dach/Decke', window: 'Fenster', floor: 'Bodenplatte',
}

export function calcUValue(layers: ULayer[], component = 'wall', R_si = 0.13, R_se = 0.04): string {
  if (layers.length === 0) return 'Bitte mindestens eine Schicht angeben.'

  const contributions = layers.map(l => ({
    name: l.name,
    R: (l.d_mm / 1000) / l.lambda,
  }))
  const R_layers = contributions.reduce((s, c) => s + c.R, 0)
  const R_T = R_si + R_layers + R_se
  const U = 1 / R_T
  const limit = GEG_LIMITS[component] ?? GEG_LIMITS.wall
  const label = GEG_LABELS[component] ?? component
  const passes = U <= limit

  const rows = contributions.map(c =>
    `  ${c.name.padEnd(30)} R = ${c.R.toFixed(3)} m²K/W (${((c.R / R_T) * 100).toFixed(0)}%)`
  ).join('\n')

  return [
    `U-Wert Berechnung (${label}):`,
    '',
    `Schichtaufbau:`,
    `  Wärmeübergang innen (R_si)          R = ${R_si.toFixed(3)} m²K/W`,
    rows,
    `  Wärmeübergang außen (R_se)          R = ${R_se.toFixed(3)} m²K/W`,
    '',
    `Gesamtwiderstand R_T = ${R_T.toFixed(3)} m²K/W`,
    `U-Wert = 1 / ${R_T.toFixed(3)} = ${U.toFixed(3)} W/(m²K)`,
    '',
    `GEG 2024 Grenzwert (${label}): ${limit} W/(m²K)`,
    `Bewertung: ${passes ? `✓ bestanden (U ${U.toFixed(3)} ≤ ${limit})` : `✗ nicht bestanden (U ${U.toFixed(3)} > ${limit})`}`,
    '',
    `Dominante Schicht: ${contributions.sort((a, b) => b.R - a.R)[0]?.name ?? '–'}`,
  ].join('\n')
}

// ── Taupunkt ──────────────────────────────────────────────────────────────────

export function calcDewpoint(T_i: number, phi_i: number, T_e: number, fRsi = 0.70): string {
  if (phi_i <= 0 || phi_i > 100) return 'Relative Feuchte muss zwischen 1 und 100 % liegen.'

  const a = 17.27, b = 237.3
  const es = 6.1078 * Math.exp((a * T_i) / (T_i + b))
  const e = (phi_i / 100) * es
  const ln = Math.log(e / 6.1078)
  const T_dp = (b * ln) / (a - ln)
  const T_si = T_e + fRsi * (T_i - T_e)
  const risk = T_si < T_dp

  return [
    `Taupunkt & Schimmelrisiko:`,
    '',
    `Raumtemperatur:       T_i = ${T_i} °C`,
    `Relative Luftfeuchte: φ   = ${phi_i} %`,
    `Außentemperatur:      T_e = ${T_e} °C`,
    `Temperaturfaktor:     f_Rsi = ${fRsi} (DIN 4108-2 Mindestwert: 0,70)`,
    '',
    `Taupunkttemperatur:   T_d  = ${T_dp.toFixed(1)} °C`,
    `Innenwandoberfläche:  T_si = T_e + f_Rsi × (T_i − T_e) = ${T_si.toFixed(1)} °C`,
    '',
    risk
      ? `⚠ SCHIMMELRISIKO: T_si (${T_si.toFixed(1)}°C) < T_d (${T_dp.toFixed(1)}°C)`
      + `\n  → Oberflächentemperatur liegt unter dem Taupunkt → Kondensation möglich`
      + `\n  → Maßnahmen: bessere Dämmung (höheres f_Rsi), Lüftungsverhalten verbessern`
      : `✓ KEIN SCHIMMELRISIKO: T_si (${T_si.toFixed(1)}°C) > T_d (${T_dp.toFixed(1)}°C)`,
  ].join('\n')
}

// ── Schallschutz ──────────────────────────────────────────────────────────────

export interface SoundLayer { name: string; d_mm: number; rho: number }

const DIN_4109: Array<{ label: string; req: number }> = [
  { label: 'Wohnungstrennwand (Norm)',         req: 53 },
  { label: 'Wohnungstrennwand (erhöht, DIN A)', req: 58 },
  { label: 'Treppenhaus',                      req: 52 },
  { label: 'Bürotrennwand',                    req: 37 },
]

export function calcSound(layers: SoundLayer[]): string {
  if (layers.length === 0) return 'Bitte mindestens eine Schicht angeben.'

  const m_prime = layers.reduce((s, l) => s + (l.d_mm / 1000) * l.rho, 0)
  const Rw = Math.max(0, Math.round(20 * Math.log10(m_prime * 500) - 47 - 5))

  const reqs = DIN_4109.map(r =>
    `  ${r.label.padEnd(42)} ${r.req} dB  ${Rw >= r.req ? '✓' : '✗'}`
  ).join('\n')

  return [
    `Schallschutz – Massengesetz (einschalig):`,
    '',
    layers.map(l => `  ${l.name}: ${l.d_mm} mm × ${l.rho} kg/m³ = ${((l.d_mm / 1000) * l.rho).toFixed(0)} kg/m²`).join('\n'),
    '',
    `Flächenmasse m' = ${m_prime.toFixed(0)} kg/m²`,
    `Bewertetes Schalldämmmaß R'w ≈ ${Rw} dB`,
    `(Massengesetz: R'w ≈ 20·log₁₀(m'·500 Hz) − 47 − 5 dB Praxisabzug)`,
    '',
    `DIN 4109 Vergleich:`,
    reqs,
    '',
    `Hinweis: Schätzwert ohne Flankenübertragung. Zweischalige Konstruktionen`,
    `erreichen deutlich höhere Werte als das Massengesetz vorhersagt.`,
  ].join('\n')
}

// ── HOAI ──────────────────────────────────────────────────────────────────────

const TABLE: [number, number, number, number][] = [
  [25_000, 3_150, 5_560, 7_520],
  [50_000, 5_560, 9_610, 13_280],
  [100_000, 9_810, 16_570, 22_850],
  [200_000, 17_250, 29_040, 40_080],
  [300_000, 23_600, 39_700, 54_800],
  [500_000, 35_200, 59_200, 81_700],
  [750_000, 49_800, 83_800, 115_500],
  [1_000_000, 63_700, 107_000, 147_700],
  [2_000_000, 114_700, 192_500, 266_000],
  [3_000_000, 161_800, 271_000, 374_700],
  [5_000_000, 245_200, 411_000, 568_000],
  [10_000_000, 408_000, 685_000, 946_000],
]

const LP_INFO: Record<number, { label: string; pct: number }> = {
  1: { label: 'Grundlagenermittlung', pct: 2  },
  2: { label: 'Vorplanung',           pct: 7  },
  3: { label: 'Entwurfsplanung',      pct: 15 },
  4: { label: 'Genehmigungsplanung',  pct: 3  },
  5: { label: 'Ausführungsplanung',   pct: 25 },
  6: { label: 'Vorbereitung Vergabe', pct: 10 },
  7: { label: 'Mitwirkung Vergabe',   pct: 4  },
  8: { label: 'Objektüberwachung',    pct: 32 },
  9: { label: 'Objektbetreuung',      pct: 2  },
}

function interpolateHoai(K: number, col: 1 | 2 | 3): number {
  if (K <= TABLE[0][0]) return TABLE[0][col]
  if (K >= TABLE[TABLE.length - 1][0]) return TABLE[TABLE.length - 1][col]
  for (let i = 0; i < TABLE.length - 1; i++) {
    const [k0] = TABLE[i]; const [k1] = TABLE[i + 1]
    if (K >= k0 && K <= k1) {
      const t = (K - k0) / (k1 - k0)
      return TABLE[i][col] + t * (TABLE[i + 1][col] - TABLE[i][col])
    }
  }
  return 0
}

function eur(n: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function calcHoai(kosten: number, zone: 1 | 2 | 3, lps: number[]): string {
  const col = zone as 1 | 2 | 3
  const grundhonorar = interpolateHoai(kosten, col)
  const zoneLabel = ['HZ I (einfach)', 'HZ III (mittel)', 'HZ V (sehr komplex)'][zone - 1]

  const selectedPct = lps.reduce((s, lp) => s + (LP_INFO[lp]?.pct ?? 0), 0)
  const totalFee = grundhonorar * selectedPct / 100

  const rows = lps.map(lp => {
    const info = LP_INFO[lp]
    if (!info) return `  LP ${lp}: unbekannt`
    const fee = grundhonorar * info.pct / 100
    return `  LP ${lp} ${info.label.padEnd(25)} ${info.pct.toString().padStart(2)} %   ${eur(fee)}`
  }).join('\n')

  return [
    `HOAI 2021 Honorarrechner – Gebäude (§ 35):`,
    '',
    `Anrechenbare Kosten: ${eur(kosten)}`,
    `Honorarzone: ${zoneLabel}`,
    `Grundhonorar (LP 1–9 gesamt): ${eur(grundhonorar)}`,
    '',
    `Gewählte Leistungsphasen:`,
    rows,
    '',
    `Summe LP-Anteil: ${selectedPct} %`,
    `Teilhonorar: ${eur(totalFee)}`,
    `(= ${((totalFee / kosten) * 100).toFixed(1)} % der anrechenbaren Kosten)`,
    '',
    `Hinweis: Näherungswerte nach HOAI 2021 Anlage 10. Nicht rechtsverbindlich.`,
    `Seit EuGH-Urteil 2019 sind Mindest-/Höchstsätze nicht mehr zwingend.`,
  ].join('\n')
}
