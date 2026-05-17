# Kapitel 18 – IFC: Die Sprache des digitalen Gebäudes

*Teil VI – BIM · ~25 Seiten*

---

Wenn zwei BIM-Softwaresysteme miteinander sprechen wollen, brauchen sie eine gemeinsame Sprache. Diese Sprache heißt IFC – Industry Foundation Classes. IFC ist kein Dateiformat im üblichen Sinne. Es ist ein vollständiges Datenmodell für Gebäude, das beschreibt, was ein Gebäude ist, aus was es besteht und wie seine Teile zusammenhängen.

## Was IFC ist – und wie es entstand

IFC wurde 1994 von buildingSMART International (damals IAI) entwickelt und ist seit 2005 ISO-Standard (ISO 16739). Die aktuell im Markt dominierende Version ist **IFC4** (ISO 16739-1:2018); **IFC4.3** ist der aktuelle Standard für Infrastrukturprojekte.

IFC ist ein **objektbasiertes Datenmodell**: Jedes Bauteil – eine Wand, eine Stütze, ein Raum – ist ein Objekt mit Eigenschaften, Geometrie und Beziehungen zu anderen Objekten. Das Modell ist vollständig unabhängig von einer bestimmten Software.

Das IFC-Schema ist in **EXPRESS** (ISO 10303-11) definiert und wird serialisiert als:
- `.ifc` – STEP-Physikalisches Dateiformat (Text, lesbar)
- `.ifcxml` – XML-Kodierung (größer, aber maschinenverarbeitbar)
- `.ifcJSON` – JSON-Kodierung (modern, für Web-APIs)

## Die Projektstruktur in IFC

Jedes IFC-Modell hat eine feste räumliche Hierarchie:

![IFC-Projekthierarchie: IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey → IfcSpace](/assets/illustrations/kap18_ifc_hierarchie.png)

Diese Hierarchie ist nicht optional – sie ist Pflicht. Jedes Bauteil muss über `IfcRelContainedInSpatialStructure` einem Geschoss oder Raum zugeordnet sein.

```
IfcProject
  └── IfcSite          (Grundstück)
        └── IfcBuilding       (Gebäude)
              ├── IfcBuildingStorey   (Erdgeschoss)
              │     ├── IfcWall
              │     ├── IfcSlab
              │     └── IfcSpace     (Wohnzimmer)
              └── IfcBuildingStorey   (Obergeschoss)
```

`IfcProject` enthält außerdem `IfcGeometricRepresentationContext` – die Definition des Koordinatensystems und der Maßeinheiten. Falsch gesetzte Koordinaten sind eine der häufigsten Ursachen für versetzte Modelle bei der Zusammenführung mehrerer Fachmodelle.

## Bauteile: Die Produkthierarchie

Gebäudekomponenten erben von `IfcProduct`. Die wichtigsten Unterklassen:

| IFC-Klasse | Bedeutung |
|---|---|
| `IfcWall` | Wand (tragend oder nicht-tragend) |
| `IfcSlab` | Decke, Bodenplatte, Dachfläche |
| `IfcColumn` | Stütze |
| `IfcBeam` | Unterzug, Träger |
| `IfcDoor` | Tür (mit Öffnungssymbolik) |
| `IfcWindow` | Fenster |
| `IfcRoof` | Dach |
| `IfcSpace` | Raum |
| `IfcOpeningElement` | Öffnung in Wand oder Decke |

Jedes Objekt hat drei Teile: **Identität** (GlobalId, Name, Typ), **Geometrie** (über `IfcProductRepresentation`) und **Eigenschaften** (über Property Sets).

## Properties und PropertySets

Eigenschaften werden nicht direkt am Objekt gespeichert, sondern in **Property Sets** (Psets). Das ist eine bewusste Designentscheidung: Psets können erweitert werden, ohne das Schema zu ändern.

Standardisierte Psets für `IfcWall`:
- `Pset_WallCommon`: `IsExternal`, `LoadBearing`, `ThermalTransmittance`, `FireRating`
- `Pset_ConcreteElementGeneral`: `StructuralClass`, `ExposureClass`

Benutzerdefinierte Psets beginnen per Konvention mit dem Firmenpräfix: `Meinbuero_WandDetails`.

Eine einzelne Eigenschaft (`IfcPropertySingleValue`) hat immer: **Name**, **Wert** und **Einheit**. Zum Beispiel:

```
Name: ThermalTransmittance
NominalValue: 0.19
Unit: W/(m²·K)
```

!!! note "GlobalId: Einmal vergeben, nie ändern"
    Jedes IFC-Objekt hat eine `GlobalId` – eine 22-stellige UUID. Sie darf sich über den gesamten Projektlebenszyklus nicht ändern. Software, die bei jedem Export neue IDs vergibt, macht BIM-basierte Änderungsverfolgung unmöglich.

## IFC-Versionen im Überblick

| Version | Jahr | Status |
|---|---|---|
| IFC2x3 | 2006 | Noch weit verbreitet (ältere Software) |
| IFC4 | 2013 | Aktueller ISO-Standard für Hochbau |
| IFC4.3 | 2023 | Erweiterung für Infrastruktur (Straße, Bahn, Brücke) |

Viele Softwaretools exportieren formal „IFC4", implementieren aber nur eine Teilmenge. Beim Datenaustausch immer prüfen: Welche IFC-Version und welches **Model View Definition (MVD)** sind vereinbart?

---

!!! tip "BIM-Brücke"
    IFC ist selbst das Thema dieses Kapitels – hier verbindet sich alles. Für Entwickler: `IfcOpenShell` ist die Open-Source-Python-Bibliothek für programmatischen IFC-Zugriff. Mit zehn Zeilen Code lassen sich alle Wände eines Modells auslesen, ihre Materialschichten prüfen und U-Werte berechnen. Das Kapitel endet mit einem vollständigen kommentierten IFC-Beispiel der Außenwand Kastanienallee 7 – als STEP-Datei und als Python-Auswertung mit IfcOpenShell.
