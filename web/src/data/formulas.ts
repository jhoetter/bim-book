export interface FormulaVariable {
  symbol: string
  description: string
  unit?: string
  example?: string
}

export interface FormulaEntry {
  id: string
  name: string
  inlineTex: string
  displayTex: string
  variables: FormulaVariable[]
  example?: {
    description: string
    result: string
    unit: string
  }
  norm?: string
}

export const FORMULAS: FormulaEntry[] = [
  {
    id: 'u-wert',
    name: 'U-Wert (Wärmedurchgangskoeffizient)',
    inlineTex: 'U = \\tfrac{1}{R_{si} + \\sum\\frac{d}{\\lambda} + R_{se}}',
    displayTex: 'U = \\frac{1}{R_{si} + \\displaystyle\\sum_{i}\\frac{d_i}{\\lambda_i} + R_{se}}',
    variables: [
      { symbol: 'R_{si}', description: 'innerer Wärmeübergangswiderstand', unit: 'm²K/W', example: '0,13' },
      { symbol: 'R_{se}', description: 'äußerer Wärmeübergangswiderstand', unit: 'm²K/W', example: '0,04' },
      { symbol: 'd_i', description: 'Dicke der Schicht i', unit: 'm' },
      { symbol: '\\lambda_i', description: 'Wärmeleitfähigkeit der Schicht i', unit: 'W/(mK)' },
    ],
    example: {
      description: 'Außenwand Kastanienallee 7 (Beton 200 mm + Mineralwolle WLG 035, 160 mm)',
      result: '0,19',
      unit: 'W/(m²K)',
    },
    norm: 'DIN EN ISO 6946',
  },
  {
    id: 'r-wert',
    name: 'R-Wert (Wärmedurchgangswiderstand)',
    inlineTex: 'R = \\tfrac{d}{\\lambda}',
    displayTex: 'R = \\frac{d}{\\lambda}',
    variables: [
      { symbol: 'd', description: 'Schichtdicke', unit: 'm' },
      { symbol: '\\lambda', description: 'Wärmeleitfähigkeit des Materials', unit: 'W/(mK)' },
    ],
    example: {
      description: 'Mineralwolle WLG 035, 160 mm Dicke',
      result: '4,57',
      unit: 'm²K/W',
    },
    norm: 'DIN EN ISO 6946',
  },
  {
    id: 'transmissionswaermeverlust',
    name: 'Transmissionswärmeverlust H_T',
    inlineTex: 'H_T = \\sum U_i A_i f_{x,i}',
    displayTex: 'H_T = \\sum_{i} U_i \\cdot A_i \\cdot f_{x,i}',
    variables: [
      { symbol: 'U_i', description: 'Wärmedurchgangskoeffizient Bauteil i', unit: 'W/(m²K)' },
      { symbol: 'A_i', description: 'Fläche des Bauteils i', unit: 'm²' },
      { symbol: 'f_{x,i}', description: 'Temperaturkorrekturfaktor (1,0 für Außenbauteile)', unit: '–' },
    ],
    example: {
      description: 'Vereinfacht für Kastanienallee 7 Außenwand (360 m²)',
      result: '68,4',
      unit: 'W/K',
    },
    norm: 'DIN EN 12831',
  },
  {
    id: 'gfz',
    name: 'Geschossflächenzahl (GFZ)',
    inlineTex: '\\text{GFZ} = \\tfrac{\\sum GF}{GS}',
    displayTex: '\\text{GFZ} = \\frac{\\text{Geschossfläche (gesamt)}}{\\text{Grundstücksfläche}}',
    variables: [
      { symbol: '\\sum GF', description: 'Summe aller Geschossflächen', unit: 'm²' },
      { symbol: 'GS', description: 'Grundstücksfläche', unit: 'm²' },
    ],
    example: {
      description: 'Kastanienallee 7: 4 × 360 m² = 1.440 m² GF auf 600 m² Grundstück',
      result: '2,4',
      unit: '–',
    },
    norm: '§ 20 BauNVO',
  },
  {
    id: 'grz',
    name: 'Grundflächenzahl (GRZ)',
    inlineTex: '\\text{GRZ} = \\tfrac{A_{bebaut}}{A_{Grundst.}}',
    displayTex: '\\text{GRZ} = \\frac{A_{\\text{bebaute Fläche}}}{A_{\\text{Grundstück}}}',
    variables: [
      { symbol: 'A_{bebaut}', description: 'bebaute Grundfläche des Gebäudes', unit: 'm²' },
      { symbol: 'A_{Grundst.}', description: 'Grundstücksfläche', unit: 'm²' },
    ],
    example: {
      description: 'Kastanienallee 7: 360 m² auf 600 m² Grundstück',
      result: '0,60',
      unit: '–',
    },
    norm: '§ 19 BauNVO',
  },
  {
    id: 'primaerenergiebedarf',
    name: 'Primärenergiebedarf Q_p',
    inlineTex: 'Q_p = Q_f \\cdot f_p',
    displayTex: 'Q_p = Q_f \\cdot f_p',
    variables: [
      { symbol: 'Q_f', description: 'Endenergiebedarf (Wärme/Strom)', unit: 'kWh/(m²a)' },
      { symbol: 'f_p', description: 'Primärenergiefaktor des Energieträgers', unit: '–', example: 'Gas: 1,1; Strom: 1,8; Wärmepumpe: 1,8/COP' },
    ],
    example: {
      description: 'Kastanienallee 7: Qf = 41 kWh/(m²a), fp = 1,1 (Gas)',
      result: '45',
      unit: 'kWh/(m²a)',
    },
    norm: 'GEG § 15, DIN V 18599',
  },
  {
    id: 'schalldaemmass',
    name: "Bewertetes Schalldämmmaß R'w",
    inlineTex: "R'_w = R_w - K",
    displayTex: "R'_w = R_w - K_{\\text{Flanke}}",
    variables: [
      { symbol: 'R_w', description: 'Laborwert des Bauteils (Prüfstand)', unit: 'dB' },
      { symbol: 'K', description: 'Korrekturwert für Flankenübertragung', unit: 'dB', example: 'typ. 2–5 dB' },
    ],
    example: {
      description: 'Wohnungstrennwand Kastanienallee 7: Rw = 57 dB, K = 3 dB',
      result: '54',
      unit: 'dB',
    },
    norm: 'DIN 4109',
  },
  {
    id: 'waermeleitung',
    name: 'Wärmeleitung (Fourier)',
    inlineTex: 'q = \\lambda \\cdot \\tfrac{\\Delta T}{d}',
    displayTex: 'q = \\lambda \\cdot \\frac{\\Delta T}{d}',
    variables: [
      { symbol: 'q', description: 'Wärmestromdichte', unit: 'W/m²' },
      { symbol: '\\lambda', description: 'Wärmeleitfähigkeit', unit: 'W/(mK)' },
      { symbol: '\\Delta T', description: 'Temperaturdifferenz', unit: 'K' },
      { symbol: 'd', description: 'Materialdicke', unit: 'm' },
    ],
    norm: 'DIN EN ISO 6946',
  },
]

export const FORMULA_MAP: Record<string, FormulaEntry> = Object.fromEntries(
  FORMULAS.map(f => [f.id, f])
)
