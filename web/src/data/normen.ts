export type NormPhase = 'Entwurf' | 'Genehmigung' | 'Ausführung' | 'Betrieb' | 'Alle'

export type NormBereich =
  | 'Bauphysik'
  | 'Brandschutz'
  | 'TGA'
  | 'Lüftung'
  | 'Recht'
  | 'BIM'

export interface NormEntry {
  id: string
  norm: string
  thema: string
  bereich: NormBereich
  phase: NormPhase
  ka7: string
}

export const NORMEN: NormEntry[] = [
  // Bauphysik
  {
    id: 'din4108-2',
    norm: 'DIN 4108-2',
    thema: 'Wärmeschutz – Mindestanforderungen',
    bereich: 'Bauphysik', phase: 'Entwurf',
    ka7: 'Alle Bauteil-U-Werte liegen deutlich unter dem Grenzwert: Außenwand 0,19 statt 0,28 W/(m²K).',
  },
  {
    id: 'din4108-3',
    norm: 'DIN 4108-3',
    thema: 'Klimabedingter Feuchteschutz (Glaser)',
    bereich: 'Bauphysik', phase: 'Entwurf',
    ka7: 'Glaser-Nachweis Außenwand: kein kondensatgefährdeter Punkt im Schichtaufbau Beton + MW + Putz.',
  },
  {
    id: 'din4108-6',
    norm: 'DIN 4108-6',
    thema: 'Berechnung Jahresheizwärmebedarf',
    bereich: 'Bauphysik', phase: 'Entwurf',
    ka7: 'Q_H = 42 kWh/(m²a) als Eingangsgröße für den GEG-Nachweis nach DIN V 18599.',
  },
  {
    id: 'iso6946',
    norm: 'DIN EN ISO 6946',
    thema: 'Wärmedurchgangswiderstand / U-Wert-Berechnung',
    bereich: 'Bauphysik', phase: 'Entwurf',
    ka7: 'Rechenbasis aller Bauteil-U-Werte: z. B. Außenwand R_T = 5,26 m²K/W → U = 0,19 W/(m²K).',
  },
  {
    id: 'din4109',
    norm: 'DIN 4109',
    thema: 'Schallschutz im Hochbau',
    bereich: 'Bauphysik', phase: 'Genehmigung',
    ka7: 'Mindestanforderung Trenndecken R\'_w ≥ 54 dB, Treppenhauswand ≥ 52 dB — beides durch SB-Decke 200 mm erfüllt.',
  },
  {
    id: 'din18005',
    norm: 'DIN 18005',
    thema: 'Schallschutz im Städtebau',
    bereich: 'Bauphysik', phase: 'Entwurf',
    ka7: 'Standortbewertung Verkehrslärm: Tagpegel ≤ 60 dB(A) → keine erhöhten Anforderungen an Straßenfassade.',
  },

  // Brandschutz
  {
    id: 'mbo',
    norm: 'MBO',
    thema: 'Musterbauordnung – Gebäudeklassen, Rettungswege',
    bereich: 'Brandschutz', phase: 'Genehmigung',
    ka7: 'GK 4 (OKFF > 7 m): notwendige Treppe, Aufzug, F90-Decken, Wohnungstüren T30 — alle Anforderungen erfüllt.',
  },
  {
    id: 'din4102',
    norm: 'DIN 4102',
    thema: 'Brandverhalten von Baustoffen (A1, A2, B1, B2)',
    bereich: 'Brandschutz', phase: 'Ausführung',
    ka7: 'WDVS-Dämmung Mineralwolle: A1 (nicht brennbar) — Voraussetzung für GK 4 ohne Brandriegel.',
  },
  {
    id: 'en13501',
    norm: 'EN 13501',
    thema: 'Europ. Brandklassen (A1, A2, B, C, D, E, F)',
    bereich: 'Brandschutz', phase: 'Ausführung',
    ka7: 'EU-Klassifizierung auf Bauprodukten: MW A1, Dampfsperre E — maßgebend für Ausschreibungsprüfung.',
  },
  {
    id: 'dinen1363',
    norm: 'DIN EN 1363',
    thema: 'Prüfverfahren Feuerwiderstand',
    bereich: 'Brandschutz', phase: 'Ausführung',
    ka7: 'Prüfgrundlage für F90-Nachweis der Stahlbetondecken (REI 90 nach Euronorm).',
  },

  // TGA – Heizung & Energie
  {
    id: 'geg',
    norm: 'GEG 2024',
    thema: 'Gebäudeenergiegesetz – Primärenergienachweis',
    bereich: 'TGA', phase: 'Genehmigung',
    ka7: 'Primärenergiebedarf 45 kWh/(m²a), EE-Pflicht erfüllt durch Fernwärme (≥ 65 % EE-Anteil) + 30 kWp PV.',
  },
  {
    id: 'din18599',
    norm: 'DIN V 18599',
    thema: 'Energetische Bewertung von Gebäuden',
    bereich: 'TGA', phase: 'Genehmigung',
    ka7: 'Referenzgebäudeverfahren, alle 9 Zonen zoniert, Nachweis mit zugelassener Berechnungssoftware.',
  },
  {
    id: 'dinen12831',
    norm: 'DIN EN 12831',
    thema: 'Heizlastberechnung',
    bereich: 'TGA', phase: 'Entwurf',
    ka7: 'Normheizlast Φ_HL ≈ 68 kW (Außentemperatur −16 °C) — Auslegungsgrundlage für Fernwärme-Übergabestation.',
  },
  {
    id: 'dvgw551',
    norm: 'DVGW W 551',
    thema: 'Trinkwasser-Erwärmungsanlagen (Legionellen)',
    bereich: 'TGA', phase: 'Ausführung',
    ka7: 'Frischwasserstationen je WE: WW-Bereitung < 3 L Inhalt → dezentral, keine Speicher > 400 L → kein hygienisches Risiko.',
  },

  // TGA – Lüftung
  {
    id: 'din1946-6',
    norm: 'DIN 1946-6',
    thema: 'Lüftung von Wohnungen',
    bereich: 'Lüftung', phase: 'Entwurf',
    ka7: 'Nennluftwechsel n = 0,5 h⁻¹ je WE mit dezentraler KWL erfüllt; Feuchteschutznachweis beigefügt.',
  },
  {
    id: 'dinen16798',
    norm: 'DIN EN 16798-1',
    thema: 'Raumluftqualität (CO₂-Grenzwerte)',
    bereich: 'Lüftung', phase: 'Betrieb',
    ka7: 'CO₂ < 1 000 ppm (Kat. II) als Regelgröße der KWL; CO₂-Sensor je WE steuert Volumenstrom.',
  },

  // Planung & Recht
  {
    id: 'baugb',
    norm: 'BauGB',
    thema: 'Baugesetzbuch (Bebauungsplan, §34, §35)',
    bereich: 'Recht', phase: 'Genehmigung',
    ka7: '§ 34 BauGB: Einfügen ins vorhandene Ortsinnere — kein Bebauungsplan erforderlich, Baugenehmigung.',
  },
  {
    id: 'hoai',
    norm: 'HOAI 2021',
    thema: 'Honorarordnung Architekten und Ingenieure',
    bereich: 'Recht', phase: 'Alle',
    ka7: 'LP 1–9 Objektplanung; anrechenbare Kosten KG 300+400 ca. 4,2 Mio. € → Honorarzone III.',
  },
  {
    id: 'vobb',
    norm: 'VOB/B',
    thema: 'Vergabe- und Vertragsordnung – Allgemeine Bedingungen',
    bereich: 'Recht', phase: 'Ausführung',
    ka7: 'Basis aller Werkverträge (Rohbau, TGA, Ausbau); Abnahme und Gewährleistung nach § 12 / § 13 VOB/B.',
  },
  {
    id: 'vobb-5-6-12',
    norm: 'VOB/B §§ 5, 6, 12, 14',
    thema: 'Ausführungsfristen, Behinderung, Abnahme und Abrechnung',
    bereich: 'Recht', phase: 'Ausführung',
    ka7: 'Bauzeitenplan, Behinderungsanzeige, Abnahmeprotokoll und Schlussrechnung werden in LP 8 daran gespiegelt.',
  },
  {
    id: 'din276',
    norm: 'DIN 276',
    thema: 'Kosten im Bauwesen (KG 100–700)',
    bereich: 'Recht', phase: 'Alle',
    ka7: 'KG 300 Rohbau ca. 1,8 Mio. €, KG 400 TGA ca. 680 T€, KG 500 Außenanlagen ca. 120 T€.',
  },
  {
    id: 'din277',
    norm: 'DIN 277',
    thema: 'Grundflächen und Rauminhalte (NUF, BGF etc.)',
    bereich: 'Recht', phase: 'Entwurf',
    ka7: 'BGF 1 800 m², NUF ca. 1 260 m², Keller BGF 360 m² — Grundlage für GFZ-Nachweis und Vergütung.',
  },
  {
    id: 'din18040',
    norm: 'DIN 18040',
    thema: 'Barrierefreies Bauen',
    bereich: 'Recht', phase: 'Genehmigung',
    ka7: 'GK 4: mindestens 1 barrierefrei zugängliche WE je Treppenhaus; Aufzug 110×140 cm mind. vorhanden.',
  },
  {
    id: 'bgb-555-559',
    norm: 'BGB §§ 555b-555f, § 559',
    thema: 'Modernisierung im Mietrecht',
    bereich: 'Recht', phase: 'Genehmigung',
    ka7: 'Für K7 als Neubau nicht zentral, aber für das Nachbarhaus aus Kap. 24 maßgeblich bei energetischer Modernisierung.',
  },
  {
    id: 'geg-48-52',
    norm: 'GEG §§ 48-52',
    thema: 'Anforderungen an Bestandsbauteile',
    bereich: 'Recht', phase: 'Entwurf',
    ka7: 'Bei Bestandsmaßnahmen am Nachbarhaus löst die Erneuerung größerer Bauteilflächen energetische Anforderungen aus.',
  },
  {
    id: 'geg-105',
    norm: 'GEG § 105',
    thema: 'Ausnahmen für Baudenkmäler',
    bereich: 'Recht', phase: 'Genehmigung',
    ka7: 'Bei denkmalgeschützten Bestandsprojekten kann Substanz- oder Erscheinungsschutz energetische Standardanforderungen begrenzen.',
  },
  {
    id: 'baydschg-art6',
    norm: 'BayDSchG Art. 6',
    thema: 'Erlaubnispflicht bei Baudenkmälern',
    bereich: 'Recht', phase: 'Genehmigung',
    ka7: 'Für K7 nicht einschlägig; bei Denkmalprojekten wäre die Untere Denkmalschutzbehörde früh einzubinden.',
  },

  // BIM & Digital
  {
    id: 'iso16739',
    norm: 'ISO 16739',
    thema: 'IFC (Industry Foundation Classes)',
    bereich: 'BIM', phase: 'Alle',
    ka7: 'IFC 4.3 als Pflicht-Übergabeformat lt. BAP — an Bauleitung, Gutachter und FM-System.',
  },
  {
    id: 'iso19650',
    norm: 'ISO 19650',
    thema: 'Informationsmanagement nach BIM (CDE, Lieferprozess)',
    bereich: 'BIM', phase: 'Alle',
    ka7: 'CDE mit drei Arbeitsbereichen (Entwurf, Genehmigung, Ausführung); Übergabe gemäß Liefermeilensteine.',
  },
  {
    id: 'dinspec91391',
    norm: 'DIN SPEC 91391',
    thema: 'Anforderungen an CDE-Systeme',
    bereich: 'BIM', phase: 'Alle',
    ka7: 'CDE-Plattform-Anforderungen im BAP definiert; Zugriffsrechte nach Rolle (Planer / AG / Baufirma).',
  },
  {
    id: 'vdi2552',
    norm: 'VDI 2552',
    thema: 'BIM in Deutschland (mehrteilige Richtlinienreihe)',
    bereich: 'BIM', phase: 'Alle',
    ka7: 'BIM-Stufe 2: native Fachmodelle + IFC-Austausch; Koordination über BCF-Markups im CDE.',
  },
]
