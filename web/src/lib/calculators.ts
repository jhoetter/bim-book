// ── U-Wert ────────────────────────────────────────────────────────────────────

export interface Layer {
  name: string
  d_mm: number    // thickness mm
  lambda: number  // thermal conductivity W/(mK)
}

export interface UValueResult {
  R_T: number
  U: number
  layerContributions: Array<{ name: string; R: number; share: number }>
}

export const GEG_LIMITS: Record<string, number> = {
  wall:    0.28,
  roof:    0.20,
  window:  1.30,
  floor:   0.35,
}

export const MATERIAL_PRESETS: Array<{ name: string; lambda: number; rho?: number }> = [
  { name: 'Mineralwolle WLG 035',   lambda: 0.035, rho: 15  },
  { name: 'Mineralwolle WLG 040',   lambda: 0.040, rho: 15  },
  { name: 'EPS (Styropor) WLG 040', lambda: 0.040, rho: 20  },
  { name: 'EPS WLG 032',            lambda: 0.032, rho: 20  },
  { name: 'PUR/PIR WLG 025',        lambda: 0.025, rho: 30  },
  { name: 'Stahlbeton',             lambda: 2.30,  rho: 2400 },
  { name: 'Kalksandstein',          lambda: 0.79,  rho: 1800 },
  { name: 'Hochlochziegel',         lambda: 0.36,  rho: 1200 },
  { name: 'Holz (Nadelholz)',       lambda: 0.13,  rho: 500  },
  { name: 'Holzspanplatte',         lambda: 0.13,  rho: 700  },
  { name: 'Gipskarton',             lambda: 0.25,  rho: 900  },
  { name: 'Innenputz Kalk-Gips',    lambda: 0.87,  rho: 1200 },
  { name: 'Außenputz / Armierputz', lambda: 0.87,  rho: 1800 },
  { name: 'Luftschicht',            lambda: 0.17,  rho: 1.2  },
]

export function calcUValue(layers: Layer[], R_si = 0.13, R_se = 0.04): UValueResult {
  const contributions = layers.map(l => ({ name: l.name, R: (l.d_mm / 1000) / l.lambda, share: 0 }))
  const R_layers = contributions.reduce((s, l) => s + l.R, 0)
  const R_T = R_si + R_layers + R_se
  for (const c of contributions) c.share = (c.R / R_T) * 100
  return { R_T, U: 1 / R_T, layerContributions: contributions }
}

export const WDVS_EXAMPLE: Layer[] = [
  { name: 'Innenputz Kalk-Gips',    d_mm: 15,  lambda: 0.87  },
  { name: 'Stahlbeton',             d_mm: 200, lambda: 2.30  },
  { name: 'Mineralwolle WLG 035',   d_mm: 160, lambda: 0.035 },
  { name: 'Außenputz / Armierputz', d_mm: 8,   lambda: 0.87  },
]

// ── Taupunkt ──────────────────────────────────────────────────────────────────

export interface DewpointResult {
  T_dp: number        // dew point °C
  T_si_min: number    // min surface temp for fRsi=0.70
  mold_risk: boolean  // true = risk of mold
}

export function calcDewpoint(T_i: number, phi_i: number, T_e: number): DewpointResult {
  const a = 17.625, b = 243.04
  const alpha = (a * T_i) / (b + T_i) + Math.log(phi_i / 100)
  const T_dp = (b * alpha) / (a - alpha)
  const T_si_min = T_e + 0.70 * (T_i - T_e)  // fRsi = 0.70 (DIN 4108-2)
  return { T_dp, T_si_min, mold_risk: T_si_min < T_dp }
}

// ── Schallschutz ──────────────────────────────────────────────────────────────

export interface SoundLayer {
  name: string
  d_mm: number
  rho: number   // density kg/m³
}

export interface SoundResult {
  m_prime: number   // surface mass kg/m²
  Rw: number        // estimated sound reduction index dB
}

// DIN 4109 requirements dB (simplified subset)
export const DIN_4109: Record<string, { label: string; req: number }> = {
  trennwand:   { label: 'Trennwand Wohnungen',       req: 54 },
  geschossdecke: { label: 'Geschossdecke (Luftschall)', req: 54 },
  aussenlaerm: { label: 'Außenlärm (Wohngebiet)',     req: 30 },
  treppenhaus: { label: 'Treppenhaus',                req: 52 },
}

export const SOUND_MATERIALS: Array<{ name: string; rho: number }> = [
  { name: 'Stahlbeton',              rho: 2400 },
  { name: 'Kalksandstein',           rho: 1800 },
  { name: 'Hochlochziegel',          rho: 1200 },
  { name: 'Gipskarton 2× 12,5 mm',  rho: 900  },
  { name: 'Holz (Nadelholz)',        rho: 500  },
  { name: 'Zementestrich',           rho: 2000 },
  { name: 'Trockenestrich',          rho: 1000 },
]

export function calcSound(layers: SoundLayer[]): SoundResult {
  const m_prime = layers.reduce((s, l) => s + (l.d_mm / 1000) * l.rho, 0)
  // Mass law: Rw ≈ 20·log10(m') + 14 (ISO 12354-1 simplified)
  const Rw = Math.round(20 * Math.log10(Math.max(m_prime, 1)) + 14)
  return { m_prime, Rw }
}

// ── HOAI Honorar ──────────────────────────────────────────────────────────────

// HOAI 2021 Anlage 1 – Gebäude §35 — Zone III Mittelsatz table (key points)
// Values are approximate for educational use (not legally binding)
const HOAI_TABLE_Z3: Array<[number, number]> = [
  [25_000,     1_568],
  [50_000,     2_704],
  [100_000,    4_953],
  [150_000,    6_862],
  [200_000,    8_655],
  [300_000,    12_010],
  [500_000,    18_651],
  [750_000,    26_063],
  [1_000_000,  32_865],
  [1_500_000,  45_908],
  [2_000_000,  58_568],
  [3_000_000,  82_556],
  [5_000_000,  125_850],
  [7_500_000,  178_600],
  [10_000_000, 228_900],
  [15_000_000, 323_000],
  [25_000_000, 493_000],
]

// Zone multipliers relative to Zone III (1.00)
const ZONE_FACTORS = [0.78, 0.89, 1.00, 1.14, 1.32]

// LP percentages per phase (HOAI Anlage 1)
export const HOAI_LP_SHARES: Record<number, number> = {
  1: 2, 2: 7, 3: 15, 4: 3, 5: 25, 6: 10, 7: 4, 8: 32, 9: 2
}

export interface HoaiResult {
  grundhonorar: number
  selectedShare: number    // percent
  totalFee: number
  lpBreakdown: Array<{ lp: number; label: string; share: number; fee: number }>
}

const LP_LABELS: Record<number, string> = {
  1: 'Grundlagenermittlung', 2: 'Vorplanung', 3: 'Entwurfsplanung',
  4: 'Genehmigungsplanung',  5: 'Ausführungsplanung', 6: 'Vorbereitung Vergabe',
  7: 'Mitwirkung Vergabe',   8: 'Objektüberwachung',  9: 'Objektbetreuung'
}

function interpolateHoai(kosten: number): number {
  if (kosten <= HOAI_TABLE_Z3[0][0]) return HOAI_TABLE_Z3[0][1]
  if (kosten >= HOAI_TABLE_Z3[HOAI_TABLE_Z3.length - 1][0]) return HOAI_TABLE_Z3[HOAI_TABLE_Z3.length - 1][1]
  for (let i = 0; i < HOAI_TABLE_Z3.length - 1; i++) {
    const [k0, f0] = HOAI_TABLE_Z3[i]
    const [k1, f1] = HOAI_TABLE_Z3[i + 1]
    if (kosten >= k0 && kosten <= k1) {
      const t = (kosten - k0) / (k1 - k0)
      return f0 + t * (f1 - f0)
    }
  }
  return 0
}

export function calcHoai(kosten: number, zone: number, lps: number[]): HoaiResult {
  const z3fee = interpolateHoai(kosten)
  const grundhonorar = z3fee * ZONE_FACTORS[zone - 1]
  const selectedShare = lps.reduce((s, lp) => s + (HOAI_LP_SHARES[lp] ?? 0), 0)
  const totalFee = grundhonorar * selectedShare / 100
  const lpBreakdown = lps.map(lp => ({
    lp,
    label: LP_LABELS[lp] ?? `LP ${lp}`,
    share: HOAI_LP_SHARES[lp] ?? 0,
    fee: grundhonorar * (HOAI_LP_SHARES[lp] ?? 0) / 100,
  }))
  return { grundhonorar, selectedShare, totalFee, lpBreakdown }
}

export function fmtEur(n: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
