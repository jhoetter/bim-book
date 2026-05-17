export interface GlossEntry {
  id: string
  term: string
  abbrev?: string
  definition: string
  image?: string
}

export const GLOSSAR: GlossEntry[] = [
  {
    id: 'armierungsputz',
    term: 'Armierungsputz',
    definition: 'Zwischenschicht im WDVS: Klebemörtel mit eingebettetem Glasfasergewebe, schützt die Dämmung mechanisch.',
  },
  {
    id: 'bap',
    term: 'BIM-Abwicklungsplan',
    abbrev: 'BAP',
    definition: 'Projektdokument, das festlegt, wer welche BIM-Leistungen in welcher Phase mit welcher Software erbringt.',
  },
  {
    id: 'bcf',
    term: 'BIM Collaboration Format',
    abbrev: 'BCF',
    definition: 'Offenes Format für Koordinationsanmerkungen am Modell (Kameraposition, Beschreibung, Zuständigkeit).',
  },
  {
    id: 'bim',
    term: 'Building Information Modeling',
    abbrev: 'BIM',
    definition: 'Methode der vernetzten Planung, Ausführung und Bewirtschaftung von Gebäuden auf Basis digitaler Modelle.',
  },
  {
    id: 'dampfbremse',
    term: 'Dampfbremse',
    definition: 'Schicht mit definiertem sd-Wert (0,5–1500 m), die Dampfdiffusion verlangsamt, aber nicht vollständig verhindert.',
    image: '/assets/glossar/dampfbremse.png',
  },
  {
    id: 'dampfsperre',
    term: 'Dampfsperre',
    definition: 'Schicht mit sehr hohem sd-Wert (> 1500 m), die Dampfdiffusion praktisch verhindert.',
    image: '/assets/glossar/dampfsperre.png',
  },
  {
    id: 'dvgw',
    term: 'Deutscher Verein des Gas- und Wasserfaches',
    abbrev: 'DVGW',
    definition: 'Erstellt technische Regelwerke für Gas- und Wasserinstallationen.',
  },
  {
    id: 'embodied-carbon',
    term: 'Embodied Carbon',
    definition: 'CO₂-Emissionen, die bei Herstellung, Transport und Einbau von Baumaterialien entstehen (nicht im Betrieb).',
  },
  {
    id: 'epd',
    term: 'Environmental Product Declaration',
    abbrev: 'EPD',
    definition: 'Genormter Nachweis der Umweltauswirkungen eines Bauprodukts nach ISO 14025 (Umweltproduktdeklaration).',
  },
  {
    id: 'eurocode',
    term: 'Eurocode',
    definition: 'Europäische Normenreihe für die Tragwerksplanung (EN 1990–1999). Gilt in Deutschland als DIN EN mit nationalem Anhang.',
  },
  {
    id: 'fbh',
    term: 'Fußbodenheizung',
    abbrev: 'FBH',
    definition: 'Flächenheizung, die Wärme über die Bodenoberfläche abgibt. Betriebstemperatur 30–45 °C Vorlauf.',
    image: '/assets/glossar/fbh.png',
  },
  {
    id: 'geg',
    term: 'Gebäudeenergiegesetz',
    abbrev: 'GEG',
    definition: 'Deutsches Gesetz für energetische Anforderungen an Gebäude, seit 2020 in Kraft (Nachfolger der EnEV).',
  },
  {
    id: 'gfz',
    term: 'Geschossflächenzahl',
    abbrev: 'GFZ',
    definition: 'Verhältnis der Geschossfläche zur Grundstücksfläche; aus dem Bebauungsplan.',
  },
  {
    id: 'glaser-verfahren',
    term: 'Glaser-Verfahren',
    definition: 'Vereinfachtes Rechenverfahren zur Bestimmung von Tauwassermengen in Bauteilen (DIN 4108-3).',
    image: '/assets/glossar/glaser-verfahren.png',
  },
  {
    id: 'grz',
    term: 'Grundflächenzahl',
    abbrev: 'GRZ',
    definition: 'Verhältnis der bebauten Fläche zur Grundstücksfläche; aus dem Bebauungsplan.',
  },
  {
    id: 'hoai',
    term: 'Honorarordnung für Architekten und Ingenieure',
    abbrev: 'HOAI',
    definition: 'Regelt Leistungsbilder und Mindest-/Höchsthonorare für Architekten und Ingenieure in Deutschland.',
  },
  {
    id: 'hydraulischer-abgleich',
    term: 'Hydraulischer Abgleich',
    definition: 'Einstellung aller Heizkreise auf den berechneten Volumenstrom, um gleichmäßige Wärmeverteilung zu gewährleisten.',
  },
  {
    id: 'ifc',
    term: 'Industry Foundation Classes',
    abbrev: 'IFC',
    definition: 'Offener ISO-Standard (ISO 16739) für den herstellerneutralen Austausch von BIM-Daten.',
  },
  {
    id: 'innenputz',
    term: 'Innenputz',
    definition: 'Erste Schicht der Innenwandoberfläche. Kalk-Gips-Putz (λ ≈ 0,87 W/mK), 10–20 mm.',
  },
  {
    id: 'kwl',
    term: 'Kontrollierte Wohnraumlüftung',
    abbrev: 'KWL',
    definition: 'Mechanisches Lüftungssystem mit Wärmerückgewinnung (η ≥ 75 %).',
    image: '/assets/glossar/kwl.png',
  },
  {
    id: 'lastfall',
    term: 'Lastfall',
    definition: 'Definierte Belastungskombination für den Tragwerksnachweis (Eigengewicht + Nutzlast + Wind etc.).',
  },
  {
    id: 'lod',
    term: 'Level of Development',
    abbrev: 'LOD',
    definition: 'Definiert den Informationsgehalt eines BIM-Modellelements (LOD 100–500). Früher auch: Level of Detail.',
  },
  {
    id: 'mineralwolle',
    term: 'Mineralwolle',
    definition: 'Dämmstoff aus Glaswolle oder Steinwolle. Wärmeleitfähigkeit λ = 0,030–0,045 W/(mK), je nach WLG-Klasse.',
    image: '/assets/glossar/mineralwolle.png',
  },
  {
    id: 'mbo',
    term: 'Musterbauordnung',
    abbrev: 'MBO',
    definition: 'Nicht-rechtverbindliches Mustergesetz, das von den Bundesländern als Landesbauordnung (z.B. BayBO) übernommen wird.',
  },
  {
    id: 'primärenergiefaktor',
    term: 'Primärenergiefaktor',
    definition: 'fp. Gibt an, wieviel Primärenergie (inkl. Förderung, Transport) für 1 kWh Nutzenergie aufgewendet wird.',
  },
  {
    id: 'r-wert',
    term: 'R-Wert',
    definition: 'Wärmedurchgangswiderstand einer Schicht in m²K/W = d/λ. Je größer, desto besser die Dämmwirkung.',
  },
  {
    id: 'rei',
    term: 'REI',
    abbrev: 'REI',
    definition: 'Feuerwiderstandsklasse: R = Tragfähigkeit, E = Raumabschluss, I = Wärmedämmung. REI 60 = 60 Minuten Widerstand.',
  },
  {
    id: 'schallschutz-rw',
    term: "Schallschutz R'w",
    definition: "Bewertetes Schalldämmmaß in dB. Anforderung nach DIN 4109 für Wohnungstrennwände: R'w ≥ 53 dB.",
  },
  {
    id: 'step',
    term: 'STEP',
    abbrev: 'STEP',
    definition: 'Standard for the Exchange of Product model data (ISO 10303). Serialisierungsformat für IFC-Dateien (.ifc).',
  },
  {
    id: 'tga',
    term: 'Technische Gebäudeausrüstung',
    abbrev: 'TGA',
    definition: 'Oberbegriff für Heizung, Lüftung, Sanitär, Elektro und Gebäudeautomation im Gebäude.',
    image: '/assets/glossar/tga.png',
  },
  {
    id: 'transmissionswärmeverlust',
    term: 'Transmissionswärmeverlust',
    definition: 'Wärmeverlust durch Bauteile der Gebäudehülle (Wand, Dach, Fenster), berechnet über U-Wert und Fläche.',
    image: '/assets/glossar/transmissionswärmeverlust.png',
  },
  {
    id: 'u-wert',
    term: 'U-Wert',
    definition: 'Wärmedurchgangskoeffizient in W/(m²K). Je kleiner, desto besser die Wärmedämmung des Bauteils.',
    image: '/assets/glossar/u-wert.png',
  },
  {
    id: 'vob',
    term: 'Vergabe- und Vertragsordnung für Bauleistungen',
    abbrev: 'VOB',
    definition: 'Teil A: Vergaberegeln, Teil B: Allgemeine Vertragsbedingungen für die Ausführung von Bauleistungen.',
  },
  {
    id: 'wdvs',
    term: 'Wärmedämmverbundsystem',
    abbrev: 'WDVS',
    definition: 'Vorgehängte Dämmschicht (Mineralwolle oder EPS) mit Putzoberfläche, direkt auf der Wand verklebt.',
    image: '/assets/glossar/wdvs.png',
  },
  {
    id: 'wärmebrücke',
    term: 'Wärmebrücke',
    definition: 'Stelle in der Gebäudehülle mit erhöhtem Wärmestrom durch geometrische oder materialbezogene Unterbrechung der Dämmschicht.',
    image: '/assets/glossar/wärmebrücke.png',
  },
  {
    id: 'wlg',
    term: 'Wärmeleitfähigkeitsgruppe',
    abbrev: 'WLG',
    definition: 'Klassifiziert Dämmstoffe nach λ-Wert: WLG 030 = λ ≤ 0,030 W/(mK), WLG 035 = λ ≤ 0,035 W/(mK).',
    image: '/assets/glossar/wlg.png',
  },
]

// Build lookup map: id → entry (also indexes by lowercase abbrev and lowercase term)
export const GLOSSAR_MAP: Record<string, GlossEntry> = {}
for (const e of GLOSSAR) {
  GLOSSAR_MAP[e.id] = e
  if (e.abbrev) GLOSSAR_MAP[e.abbrev.toLowerCase()] = e
  GLOSSAR_MAP[e.term.toLowerCase()] = e
}
