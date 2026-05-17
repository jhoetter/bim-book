export interface CalcResult {
  value: number
  unit: string
  precision?: number
  status?: 'good' | 'warn' | 'bad'
  note?: string
}

export interface FormulaVariable {
  symbol: string
  description: string
  unit?: string
  example?: string
  inputKey?: string
  defaultValue?: number
}

export type FormelThema =
  | 'Wärmeschutz'
  | 'Schallschutz'
  | 'Feuchteschutz'
  | 'Baurecht'
  | 'Energie'
  | 'Honorar'

export interface FormulaEntry {
  id: string
  name: string
  badge: string
  inlineTex: string
  displayTex: string
  variables: FormulaVariable[]
  example?: {
    description: string
    result: string
    unit: string
  }
  norm?: string
  thema: FormelThema
  calc?: (inputs: Record<string, number>) => CalcResult
}

export const FORMULAS: FormulaEntry[] = [
  {
    id: 'u-wert',
    name: 'U-Wert (Wärmedurchgangskoeffizient)',
    badge: 'U = …',
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
    thema: 'Wärmeschutz',
  },
  {
    id: 'r-wert',
    name: 'R-Wert (Wärmedurchgangswiderstand)',
    badge: 'R = d/λ',
    inlineTex: 'R = \\tfrac{d}{\\lambda}',
    displayTex: 'R = \\frac{d}{\\lambda}',
    variables: [
      { symbol: 'd', description: 'Schichtdicke', unit: 'm', inputKey: 'd', defaultValue: 0.16 },
      { symbol: '\\lambda', description: 'Wärmeleitfähigkeit des Materials', unit: 'W/(mK)', inputKey: 'lambda', defaultValue: 0.035 },
    ],
    example: {
      description: 'Mineralwolle WLG 035, 160 mm Dicke',
      result: '4,57',
      unit: 'm²K/W',
    },
    norm: 'DIN EN ISO 6946',
    thema: 'Wärmeschutz',
    calc: ({ d, lambda }) => ({ value: d / lambda, unit: 'm²K/W', precision: 3 }),
  },
  {
    id: 'transmissionswaermeverlust',
    name: 'Transmissionswärmeverlust H_T',
    badge: 'H_T = ΣU·A·f',
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
    thema: 'Wärmeschutz',
  },
  {
    id: 'gfz',
    name: 'Geschossflächenzahl (GFZ)',
    badge: 'GFZ = ΣGF / GS',
    inlineTex: '\\text{GFZ} = \\tfrac{\\sum GF}{GS}',
    displayTex: '\\text{GFZ} = \\frac{\\text{Geschossfläche (gesamt)}}{\\text{Grundstücksfläche}}',
    variables: [
      { symbol: '\\sum GF', description: 'Summe aller Geschossflächen', unit: 'm²', inputKey: 'gf', defaultValue: 1440 },
      { symbol: 'GS', description: 'Grundstücksfläche', unit: 'm²', inputKey: 'gs', defaultValue: 600 },
    ],
    example: {
      description: 'Kastanienallee 7: 4 × 360 m² = 1.440 m² GF auf 600 m² Grundstück',
      result: '2,4',
      unit: '–',
    },
    norm: '§ 20 BauNVO',
    thema: 'Baurecht',
    calc: ({ gf, gs }) => ({ value: gf / gs, unit: '–', precision: 2 }),
  },
  {
    id: 'grz',
    name: 'Grundflächenzahl (GRZ)',
    badge: 'GRZ = A_beb / A_GS',
    inlineTex: '\\text{GRZ} = \\tfrac{A_{bebaut}}{A_{Grundst.}}',
    displayTex: '\\text{GRZ} = \\frac{A_{\\text{bebaute Fläche}}}{A_{\\text{Grundstück}}}',
    variables: [
      { symbol: 'A_{bebaut}', description: 'bebaute Grundfläche des Gebäudes', unit: 'm²', inputKey: 'a_beb', defaultValue: 360 },
      { symbol: 'A_{Grundst.}', description: 'Grundstücksfläche', unit: 'm²', inputKey: 'a_gs', defaultValue: 600 },
    ],
    example: {
      description: 'Kastanienallee 7: 360 m² auf 600 m² Grundstück',
      result: '0,60',
      unit: '–',
    },
    norm: '§ 19 BauNVO',
    thema: 'Baurecht',
    calc: ({ a_beb, a_gs }) => {
      const val = a_beb / a_gs
      return {
        value: val,
        unit: '–',
        precision: 2,
        status: val <= 0.4 ? 'good' : val <= 0.6 ? 'warn' : 'bad',
        note: 'Richtwert: GRZ ≤ 0,4 für Wohngebiete (§ 17 BauNVO)',
      }
    },
  },
  {
    id: 'primaerenergiebedarf',
    name: 'Primärenergiebedarf Q_p',
    badge: 'Q_p = Q_f · f_p',
    inlineTex: 'Q_p = Q_f \\cdot f_p',
    displayTex: 'Q_p = Q_f \\cdot f_p',
    variables: [
      { symbol: 'Q_f', description: 'Endenergiebedarf (Wärme/Strom)', unit: 'kWh/(m²a)', inputKey: 'qf', defaultValue: 41 },
      { symbol: 'f_p', description: 'Primärenergiefaktor des Energieträgers', unit: '–', example: 'Gas: 1,1; Strom: 1,8; Wärmepumpe: 1,8/COP', inputKey: 'fp', defaultValue: 1.1 },
    ],
    example: {
      description: 'Kastanienallee 7: Qf = 41 kWh/(m²a), fp = 1,1 (Gas)',
      result: '45',
      unit: 'kWh/(m²a)',
    },
    norm: 'GEG § 15, DIN V 18599',
    thema: 'Energie',
    calc: ({ qf, fp }) => {
      const val = qf * fp
      return {
        value: val,
        unit: 'kWh/(m²a)',
        precision: 1,
        status: val <= 75 ? 'good' : val <= 100 ? 'warn' : 'bad',
        note: 'GEG 2023: Neubau ≤ 75 kWh/(m²a) Primärenergiebedarf',
      }
    },
  },
  {
    id: 'schalldaemmass',
    name: "Bewertetes Schalldämmmaß R'w",
    badge: "R'w = Rw − K",
    inlineTex: "R'_w = R_w - K",
    displayTex: "R'_w = R_w - K_{\\text{Flanke}}",
    variables: [
      { symbol: 'R_w', description: 'Laborwert des Bauteils (Prüfstand)', unit: 'dB', inputKey: 'rw', defaultValue: 57 },
      { symbol: 'K', description: 'Korrekturwert für Flankenübertragung', unit: 'dB', example: 'typ. 2–5 dB', inputKey: 'k', defaultValue: 3 },
    ],
    example: {
      description: 'Wohnungstrennwand Kastanienallee 7: Rw = 57 dB, K = 3 dB',
      result: '54',
      unit: 'dB',
    },
    norm: 'DIN 4109',
    thema: 'Schallschutz',
    calc: ({ rw, k }) => {
      const val = rw - k
      return {
        value: val,
        unit: 'dB',
        precision: 0,
        status: val >= 54 ? 'good' : val >= 47 ? 'warn' : 'bad',
        note: 'DIN 4109: Wohnungstrennwand ≥ 54 dB, erhöhter Schallschutz ≥ 58 dB',
      }
    },
  },
  {
    id: 'waermeleitung',
    name: 'Wärmeleitung (Fourier)',
    badge: 'q = λ · ΔT/d',
    inlineTex: 'q = \\lambda \\cdot \\tfrac{\\Delta T}{d}',
    displayTex: 'q = \\lambda \\cdot \\frac{\\Delta T}{d}',
    variables: [
      { symbol: 'q', description: 'Wärmestromdichte', unit: 'W/m²' },
      { symbol: '\\lambda', description: 'Wärmeleitfähigkeit', unit: 'W/(mK)', inputKey: 'lambda', defaultValue: 0.035 },
      { symbol: '\\Delta T', description: 'Temperaturdifferenz', unit: 'K', inputKey: 'dT', defaultValue: 30 },
      { symbol: 'd', description: 'Materialdicke', unit: 'm', inputKey: 'd', defaultValue: 0.16 },
    ],
    norm: 'DIN EN ISO 6946',
    thema: 'Wärmeschutz',
    calc: ({ lambda, dT, d }) => ({ value: lambda * dT / d, unit: 'W/m²', precision: 2 }),
  },
  {
    id: 'glaser',
    name: 'Taupunkttemperatur (Magnus-Formel)',
    badge: 'T_d = …',
    inlineTex: 'T_d = \\tfrac{b \\cdot \\alpha}{a - \\alpha}',
    displayTex: 'T_d = \\frac{b \\cdot \\alpha}{a - \\alpha}, \\quad \\alpha = \\frac{a \\cdot T_i}{b + T_i} + \\ln\\!\\frac{\\varphi_i}{100}',
    variables: [
      { symbol: 'T_i', description: 'Innenraumtemperatur', unit: '°C', example: '20' },
      { symbol: '\\varphi_i', description: 'Relative Luftfeuchte innen', unit: '%', example: '50' },
      { symbol: 'T_e', description: 'Außentemperatur', unit: '°C', example: '−10' },
      { symbol: 'f_{Rsi}', description: 'Temperaturfaktor des Bauteils', unit: '–', example: 'min. 0,70 nach DIN 4108-2' },
    ],
    norm: 'DIN 4108-2',
    thema: 'Feuchteschutz',
  },
  {
    id: 'hoai',
    name: 'HOAI-Grundhonorar (Gebäude)',
    badge: 'H = G(K) · s',
    inlineTex: 'H = G(K,\\,\\mathrm{HZ}) \\cdot \\tfrac{s}{100}',
    displayTex: 'H = G(K,\\,\\mathrm{HZ}) \\cdot \\frac{s}{100\\%}',
    variables: [
      { symbol: 'K', description: 'anrechenbare Kosten (KG 300+400)', unit: '€' },
      { symbol: '\\mathrm{HZ}', description: 'Honorarzone I–V', unit: '–' },
      { symbol: 's', description: 'Leistungsanteil der gewählten LP', unit: '%' },
      { symbol: 'G(K, \\mathrm{HZ})', description: 'Grundhonorar aus HOAI-Tabelle', unit: '€' },
    ],
    norm: 'HOAI 2021 Anlage 10',
    thema: 'Honorar',
  },
]

export const FORMULA_MAP: Record<string, FormulaEntry> = Object.fromEntries(
  FORMULAS.map(f => [f.id, f])
)
