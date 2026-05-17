# IFC-Schnellreferenz

Die 50 wichtigsten IFC-Entitäten und Property Sets.

## Räumliche Struktur

| Entität | Bedeutung |
|---------|-----------|
| `IfcProject` | Wurzelelement jedes IFC-Modells |
| `IfcSite` | Grundstück mit Geländemodell |
| `IfcBuilding` | Gebäude |
| `IfcBuildingStorey` | Geschoss |
| `IfcSpace` | Raum / Zone |

## Architektur

| Entität | Bedeutung |
|---------|-----------|
| `IfcWall` | Wand (tragend oder nicht) |
| `IfcWallStandardCase` | Wand mit definiertem Schichtaufbau |
| `IfcSlab` | Decke / Bodenplatte / Dachfläche |
| `IfcRoof` | Dach |
| `IfcColumn` | Stütze |
| `IfcBeam` | Träger / Unterzug |
| `IfcDoor` | Tür |
| `IfcWindow` | Fenster |
| `IfcStair` | Treppe |
| `IfcRamp` | Rampe |
| `IfcCovering` | Bodenbelag, Deckenverkleidung, Außenwandverkleidung |
| `IfcFurnishingElement` | Möbel, Einbauten |

## TGA – Heizung & Sanitär

| Entität | Bedeutung |
|---------|-----------|
| `IfcBoiler` | Heizkessel |
| `IfcHeatExchanger` | Wärmetauscher |
| `IfcPump` | Pumpe |
| `IfcPipeSegment` | Rohrleitungsabschnitt |
| `IfcPipeFitting` | Rohrformstück (Bogen, T-Stück) |
| `IfcValve` | Ventil, Absperrschieber |
| `IfcSpaceHeater` | Heizkörper, Fußbodenheizungselement |
| `IfcSanitaryTerminal` | WC, Waschbecken, Dusche, Wanne |
| `IfcFlowMeter` | Wasserzähler, Wärmemengenzähler |

## TGA – Lüftung

| Entität | Bedeutung |
|---------|-----------|
| `IfcAirTerminal` | Luftauslass / Lufteinlass |
| `IfcDuctSegment` | Kanalabschnitt |
| `IfcDuctFitting` | Kanalformstück |
| `IfcAirToAirHeatRecovery` | Wärmerückgewinner |
| `IfcFan` | Ventilator |
| `IfcFilter` | Luftfilter |

## TGA – Elektro

| Entität | Bedeutung |
|---------|-----------|
| `IfcElectricDistributionBoard` | Verteiler, Unterverteiler |
| `IfcCableSegment` | Kabelabschnitt |
| `IfcLightFixture` | Leuchte |
| `IfcSensor` | Sensor (Temperatur, Präsenz, CO₂ …) |
| `IfcActuator` | Stellantrieb |
| `IfcController` | Steuergerät, DDC |

## Material & Eigenschaften

| Entität / Konzept | Bedeutung |
|---------|-----------|
| `IfcMaterial` | Einzelmaterial mit Name |
| `IfcMaterialLayer` | Schicht mit Dicke und Material |
| `IfcMaterialLayerSet` | Geordnete Liste von Schichten (Wandaufbau) |
| `IfcPropertySet` | Benutzerdefinierter Satz von Eigenschaften |
| `IfcPropertySingleValue` | Einzeleigenschaft (Name + Wert + Einheit) |
| `IfcClassificationReference` | Verweis auf externe Klassifikation (OmniClass, DIN 276) |

## Häufige Property Sets

| Property Set | Entität | Wichtige Properties |
|-------------|---------|---------------------|
| `Pset_WallCommon` | `IfcWall` | `LoadBearing`, `IsExternal`, `ThermalTransmittance`, `FireRating`, `AcousticRating` |
| `Pset_SlabCommon` | `IfcSlab` | `LoadBearing`, `ThermalTransmittance` |
| `Pset_WindowCommon` | `IfcWindow` | `ThermalTransmittance`, `SoundTransmission` |
| `Pset_SpaceCommon` | `IfcSpace` | `GrossFloorArea`, `NetFloorArea`, `OccupancyType` |
| `Pset_DoorCommon` | `IfcDoor` | `FireRating`, `IsExternal`, `ThermalTransmittance` |
