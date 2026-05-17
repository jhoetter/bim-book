export type IfcDisziplin =
  | 'Struktur'
  | 'Architektur'
  | 'TGA-Heizung'
  | 'TGA-Lüftung'
  | 'TGA-Elektro'
  | 'Material'

export type IfcTyp = 'Entität' | 'Property Set'

export interface IfcEntry {
  id: string
  entity: string
  bedeutung: string
  disziplin: IfcDisziplin
  typ: IfcTyp
  ka7: string
}

export const IFC_ENTRIES: IfcEntry[] = [
  // Räumliche Struktur
  {
    id: 'project',
    entity: 'IfcProject',
    bedeutung: 'Wurzelelement jedes IFC-Modells',
    disziplin: 'Struktur', typ: 'Entität',
    ka7: 'Enthält alle Fachmodelle: Architektur, Tragwerk, TGA — verknüpft über gemeinsames Koordinatensystem.',
  },
  {
    id: 'site',
    entity: 'IfcSite',
    bedeutung: 'Grundstück mit Geländemodell',
    disziplin: 'Struktur', typ: 'Entität',
    ka7: 'Grundstück in bayerischer Mittelstadt, Geländemodell mit leichtem West-Ost-Gefälle.',
  },
  {
    id: 'building',
    entity: 'IfcBuilding',
    bedeutung: 'Gebäude',
    disziplin: 'Struktur', typ: 'Entität',
    ka7: '1 Gebäude: 4 Vollgeschosse + Keller + Dachgeschoss, Grundfläche 20 × 18 m.',
  },
  {
    id: 'storey',
    entity: 'IfcBuildingStorey',
    bedeutung: 'Geschoss',
    disziplin: 'Struktur', typ: 'Entität',
    ka7: '6 Einträge: Keller (−3,0 m), EG (±0,0 m), 1. bis 3. OG, Dachgeschoss.',
  },
  {
    id: 'space',
    entity: 'IfcSpace',
    bedeutung: 'Raum / Zone',
    disziplin: 'Struktur', typ: 'Entität',
    ka7: 'Rund 80 Räume: 12 Wohnungen (je 4–7 Räume) + Erschließung + Keller.',
  },

  // Architektur
  {
    id: 'wall',
    entity: 'IfcWall',
    bedeutung: 'Wand (tragend oder nicht)',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Außenwände (WDVS-Aufbau 360 mm gesamt), Trennwände zwischen Wohnungen, Treppenhauskern.',
  },
  {
    id: 'wallstd',
    entity: 'IfcWallStandardCase',
    bedeutung: 'Wand mit definiertem Schichtaufbau',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Alle strukturierten Wände mit Schichtpaketen — ermöglicht automatische U-Wert-Auswertung im Modell.',
  },
  {
    id: 'slab',
    entity: 'IfcSlab',
    bedeutung: 'Decke / Bodenplatte / Dachfläche',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Stahlbetondecken d = 200 mm zwischen den Geschossen, Bodenplatte EPS 120 mm, Flachdachaufbau.',
  },
  {
    id: 'roof',
    entity: 'IfcRoof',
    bedeutung: 'Dach',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Extensiv begrüntes Flachdach (80 mm Substrat), darauf PV-Anlage 30 kWp.',
  },
  {
    id: 'column',
    entity: 'IfcColumn',
    bedeutung: 'Stütze',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Stahlbetonstützen im Skelett, sichtbar in Tiefgarage und Erdgeschoss-Foyer.',
  },
  {
    id: 'beam',
    entity: 'IfcBeam',
    bedeutung: 'Träger / Unterzug',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Stahlbetonunterzüge über großen Öffnungen (z. B. Einfahrt TG, Schaufenster EG).',
  },
  {
    id: 'door',
    entity: 'IfcDoor',
    bedeutung: 'Tür',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Wohnungseingangstüren (EI30 / T30), Keller- und Haustür, Tiefgaragentor.',
  },
  {
    id: 'window',
    entity: 'IfcWindow',
    bedeutung: 'Fenster',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: '3-Scheiben-WSV, U_w = 0,90 W/(m²K); Rahmen Holz-Alu — alle Fenster als IfcWindow modelliert.',
  },
  {
    id: 'stair',
    entity: 'IfcStair',
    bedeutung: 'Treppe',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: '1 notwendige Treppe, einläufig, Breite 1,25 m, inkl. Podeste modelliert.',
  },
  {
    id: 'ramp',
    entity: 'IfcRamp',
    bedeutung: 'Rampe',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Zufahrtsrampe zur Tiefgarage, Neigung 15 %, Breite 3,5 m.',
  },
  {
    id: 'covering',
    entity: 'IfcCovering',
    bedeutung: 'Bodenbelag, Deckenverkleidung, Wandverkleidung',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Parkett und Fliesen je Wohnungstyp, Außenputzsystem als abschließende Schicht.',
  },
  {
    id: 'furnishing',
    entity: 'IfcFurnishingElement',
    bedeutung: 'Möbel, Einbauten',
    disziplin: 'Architektur', typ: 'Entität',
    ka7: 'Küchenmöbel (optional im Modell hinterlegt), Einbauschränke Flur.',
  },

  // TGA – Heizung & Sanitär
  {
    id: 'boiler',
    entity: 'IfcBoiler',
    bedeutung: 'Heizkessel',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Nicht vorhanden: Fernwärme-Übergabestation (IfcHeatExchanger) ersetzt den Kessel.',
  },
  {
    id: 'heatexchanger',
    entity: 'IfcHeatExchanger',
    bedeutung: 'Wärmetauscher',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Fernwärme-Übergabestation im Keller + 12 Frischwasserstationen (eine je Wohneinheit).',
  },
  {
    id: 'pump',
    entity: 'IfcPump',
    bedeutung: 'Pumpe',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Heizkreispumpen (3 Heizkreise FBH) und Zirkulationspumpe Warmwasser.',
  },
  {
    id: 'pipeseg',
    entity: 'IfcPipeSegment',
    bedeutung: 'Rohrleitungsabschnitt',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Steigleitungen Fernwärme, horizontale FBH-Verteilung je Geschoss, WW-Verteilung.',
  },
  {
    id: 'pipefitting',
    entity: 'IfcPipeFitting',
    bedeutung: 'Rohrformstück (Bogen, T-Stück)',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Formstücke am Kellerverteiler und an Steigstrang-Abzweigungen.',
  },
  {
    id: 'valve',
    entity: 'IfcValve',
    bedeutung: 'Ventil, Absperrschieber',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Thermostatventile FBH je Raum, Absperrschieber am Kellerverteiler.',
  },
  {
    id: 'spaceheater',
    entity: 'IfcSpaceHeater',
    bedeutung: 'Heizkörper, Fußbodenheizungselement',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Fußbodenheizungskreise in allen Wohn- und Schlafräumen (ca. 60 Kreise gesamt).',
  },
  {
    id: 'sanitary',
    entity: 'IfcSanitaryTerminal',
    bedeutung: 'WC, Waschbecken, Dusche, Wanne',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: 'Je Wohneinheit: WC, WHB, Dusche oder Wanne — insgesamt ca. 48 Objekte.',
  },
  {
    id: 'flowmeter',
    entity: 'IfcFlowMeter',
    bedeutung: 'Wasserzähler, Wärmemengenzähler',
    disziplin: 'TGA-Heizung', typ: 'Entität',
    ka7: '12 Wärmemengenzähler + 12 Kaltwasserzähler (je WE) für die verbrauchsabhängige Abrechnung.',
  },

  // TGA – Lüftung
  {
    id: 'airterminal',
    entity: 'IfcAirTerminal',
    bedeutung: 'Luftauslass / Lufteinlass',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: 'Zuluft-Tellerventile in Wohn-/Schlafräumen, Abluft in Bad und Küche — ca. 80 Stück.',
  },
  {
    id: 'ductseg',
    entity: 'IfcDuctSegment',
    bedeutung: 'Kanalabschnitt',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: 'Vertikale Schächte (400×200 mm) + horizontale Flachkanäle unter Rohdecke je Wohnung.',
  },
  {
    id: 'ductfitting',
    entity: 'IfcDuctFitting',
    bedeutung: 'Kanalformstück',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: 'Bögen und T-Stücke an den Schachtübergängen, Übergang Flachkanal auf Rundrohr.',
  },
  {
    id: 'hrv',
    entity: 'IfcAirToAirHeatRecovery',
    bedeutung: 'Wärmerückgewinner',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: '12 dezentrale KWL-Geräte (1 je WE), Gegenstrom-WRG η = 85 %, im Abstellraum untergebracht.',
  },
  {
    id: 'fan',
    entity: 'IfcFan',
    bedeutung: 'Ventilator',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: 'Integriert in den KWL-Einheiten, EC-Motor mit Druckregelung.',
  },
  {
    id: 'filter',
    entity: 'IfcFilter',
    bedeutung: 'Luftfilter',
    disziplin: 'TGA-Lüftung', typ: 'Entität',
    ka7: 'F7-Filter in KWL-Einheiten, Wartungsintervall 6 Monate laut BAP hinterlegt.',
  },

  // TGA – Elektro
  {
    id: 'board',
    entity: 'IfcElectricDistributionBoard',
    bedeutung: 'Verteiler, Unterverteiler',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'HAK + Zählerfeld 3×63 A im Keller, 12 Wohnungsunterverteiler (je 16 LS-Schalter).',
  },
  {
    id: 'cable',
    entity: 'IfcCableSegment',
    bedeutung: 'Kabelabschnitt',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'NYM-J 3×2,5 mm² Steigtrassen, Wohnungsverteilung; EV-Ladekabel NYY 5×6 mm² TG.',
  },
  {
    id: 'light',
    entity: 'IfcLightFixture',
    bedeutung: 'Leuchte',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'Allgemeinstrom: Treppenhaus, Keller, Außenbeleuchtung — LED, Präsenzsteuerung.',
  },
  {
    id: 'sensor',
    entity: 'IfcSensor',
    bedeutung: 'Sensor (Temperatur, Präsenz, CO₂…)',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'CO₂-Sensoren für KWL-Regelung je WE, Rauchwarnmelder je Raum (VDE 0833).',
  },
  {
    id: 'actuator',
    entity: 'IfcActuator',
    bedeutung: 'Stellantrieb',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'FBH-Stellantriebe je Heizkreis (230 V, NC), Raumthermostate mit Busschnittstelle.',
  },
  {
    id: 'controller',
    entity: 'IfcController',
    bedeutung: 'Steuergerät, DDC',
    disziplin: 'TGA-Elektro', typ: 'Entität',
    ka7: 'DDC-Zentrale im Keller steuert FBH (3 Kreise) und KWL-Anlage; Fernzugriff via Webportal.',
  },

  // Material & Eigenschaften
  {
    id: 'material',
    entity: 'IfcMaterial',
    bedeutung: 'Einzelmaterial mit Name',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'Stahlbeton C25/30, Mineralwolle WLG 035, Ziegel HLz 0,5 — alle einmalig definiert, vielfach referenziert.',
  },
  {
    id: 'matlayer',
    entity: 'IfcMaterialLayer',
    bedeutung: 'Schicht mit Dicke und Material',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'Außenwand-Schichten: Beton 200 mm + MW 160 mm + Armierungsputz 8 mm + Edelputz 5 mm.',
  },
  {
    id: 'matlayerset',
    entity: 'IfcMaterialLayerSet',
    bedeutung: 'Geordnete Liste von Schichten (Wandaufbau)',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'Einmalig pro Wandtyp definiert — z. B. „AW_WDVS_373" — von allen gleichartigen Wänden referenziert.',
  },
  {
    id: 'pset',
    entity: 'IfcPropertySet',
    bedeutung: 'Benutzerdefinierter Satz von Eigenschaften',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'Pset_WallCommon auf Außenwänden: U = 0,19, LoadBearing = true, FireRating = REI 90.',
  },
  {
    id: 'propval',
    entity: 'IfcPropertySingleValue',
    bedeutung: 'Einzeleigenschaft (Name + Wert + Einheit)',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'Z. B. ThermalTransmittance = 0,19 W/(m²K) an IfcWall, GrossFloorArea = 75,3 m² an IfcSpace.',
  },
  {
    id: 'classref',
    entity: 'IfcClassificationReference',
    bedeutung: 'Verweis auf externe Klassifikation',
    disziplin: 'Material', typ: 'Entität',
    ka7: 'DIN 276 KG 330 auf Außenwänden, OmniClass 13-15 auf Räumen für Kostenauswertung.',
  },

  // Property Sets
  {
    id: 'pset-wall',
    entity: 'Pset_WallCommon',
    bedeutung: 'Standardeigenschaften für Wände',
    disziplin: 'Material', typ: 'Property Set',
    ka7: 'Außenwände: LoadBearing = true, IsExternal = true, ThermalTransmittance = 0,19, FireRating = REI 90.',
  },
  {
    id: 'pset-slab',
    entity: 'Pset_SlabCommon',
    bedeutung: 'Standardeigenschaften für Decken',
    disziplin: 'Material', typ: 'Property Set',
    ka7: 'Geschossdecken: LoadBearing = true; Flachdach-IfcSlab: ThermalTransmittance = 0,17.',
  },
  {
    id: 'pset-window',
    entity: 'Pset_WindowCommon',
    bedeutung: 'Standardeigenschaften für Fenster',
    disziplin: 'Material', typ: 'Property Set',
    ka7: 'ThermalTransmittance = 0,90 W/(m²K), SoundTransmission = 38 dB (Schallschutzklasse 2).',
  },
  {
    id: 'pset-space',
    entity: 'Pset_SpaceCommon',
    bedeutung: 'Standardeigenschaften für Räume',
    disziplin: 'Material', typ: 'Property Set',
    ka7: 'NetFloorArea je Raum hinterlegt, OccupancyType = Residential; Basis für Flächenauswertung.',
  },
  {
    id: 'pset-door',
    entity: 'Pset_DoorCommon',
    bedeutung: 'Standardeigenschaften für Türen',
    disziplin: 'Material', typ: 'Property Set',
    ka7: 'Wohnungseingangstüren: FireRating = EI30, IsExternal = false, ThermalTransmittance = 1,1.',
  },
]
