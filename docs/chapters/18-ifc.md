# Kapitel 18 – IFC: Die Sprache des digitalen Gebäudes

*Teil VI – BIM*

---

Eine IFC-Datei wirkt beim ersten Öffnen wie eine Wand aus Großbuchstaben, Zahlen und Klammern. Dahinter steckt kein Chaos, sondern ein Objektmodell für Gebäude. Wer es lesen kann, versteht, warum Modelle zwischen Programmen manchmal funktionieren und manchmal zerfallen.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - die IFC-Projektstruktur von Projekt bis Raum erklären
    - Objekte, Properties, Mengen und Beziehungen unterscheiden
    - STEP-Dateien und IfcOpenShell als Entwicklerzugang einordnen

## 18.1 Projektstruktur

::IFC:: organisiert ein Modell hierarchisch: `IfcProject` enthält `IfcSite`, das Grundstück. Darin liegt `IfcBuilding`, darunter `IfcBuildingStorey` und `IfcSpace`. Bauteile werden meist einem Geschoss über `IfcRelContainedInSpatialStructure` zugeordnet. Aggregation, etwa Gebäude zu Geschossen, läuft über `IfcRelAggregates`.

Dieser Unterschied ist wichtig. Aggregation beschreibt Teil-Ganzes-Strukturen; Containment beschreibt räumliche Einordnung. Eine Wand ist nicht Teil des Geschosses wie ein Kapitel Teil eines Buches, sondern im Geschoss enthalten. Viele fehlerhafte Exporte verlieren genau diese Beziehungen.

<!-- IMAGE
name: kap18_ifc_hierarchie
type: diagram
size: portrait
desc: Baumdiagramm IFC-Hierarchie für Kastanienallee 7: IfcProject, IfcSite, IfcBuilding, sechs IfcBuildingStorey, darunter IfcSpace und Bauteile. Beziehungen IfcRelAggregates und IfcRelContainedInSpatialStructure farblich unterschieden. Weißer Hintergrund.
caption: IFC trennt Projektstruktur und räumliches Containment
tags: ifc, ifcproject, ifcspace, hierarchy
-->
![IFC-Hierarchie](../assets/illustrations/kap18_ifc_hierarchie.png)

## 18.2 Die wichtigsten Entitäten

Architektur nutzt `IfcWall`, `IfcSlab`, `IfcRoof`, `IfcDoor`, `IfcWindow` und `IfcStair`. Tragwerk nutzt `IfcColumn`, `IfcBeam`, `IfcFooting`. TGA nutzt `IfcFlowSegment`, `IfcFlowTerminal`, `IfcDistributionSystem` und viele spezialisierte Untertypen.

Eine Entität sagt, was ein Objekt ist. Properties sagen, welche Eigenschaften es hat. Typische Exportfehler sind generische `IfcBuildingElementProxy` statt spezifischer Klassen, fehlende Raumzuordnung, leere PropertySets oder verlorene Materialschichten. Für Menschen sieht das Modell noch gut aus; für Software ist es kaum auswertbar.

<!-- IMAGE
name: kap18_entitaeten_uebersicht
type: infographic
size: landscape
desc: Mindmap wichtiger IFC-Entitäten gruppiert nach räumlicher Struktur, Architektur, Tragwerk, TGA und Material. Beispiele IfcWall, IfcSlab, IfcColumn, IfcPipeSegment, IfcMaterialLayerSet. Weißer Hintergrund, deutsche Labels.
caption: IFC-Entitäten geben Modellobjekten fachliche Bedeutung
tags: ifc, entitäten, architektur, tga
-->
![IFC-Entitäten Übersicht](../assets/illustrations/kap18_entitaeten_uebersicht.png)

## 18.3 Geometrierepräsentation

IFC speichert Geometrie unterschiedlich. `SweptSolid` beschreibt extrudierte Profile und ist für Wände, Stützen oder einfache Decken robust. Brep beschreibt komplexe Oberflächen über Begrenzungsflächen. CSG und Clipping nutzen Boolesche Operationen und Schnitte. In STEP erkennt man Extrusionen an Entitäten wie `IFCEXTRUDEDAREASOLID`.

Für Austausch ist einfache, semantische Geometrie besser als komplexe, triangulierte Form. Ein schönes Freiformmodell kann im Export schwer lesbar werden. Gute IFC-Modelle sind nicht maximal detailliert, sondern zweckgerecht repräsentiert.

## 18.4 Properties und PropertySets

PropertySets machen IFC maschinenlesbar. `Pset_WallCommon` enthält Eigenschaften wie `FireRating`, `ThermalTransmittance` oder `LoadBearing`. QuantitySets wie `Qto_WallBaseQuantities` enthalten Mengen: Länge, Fläche, Volumen. Benutzerdefinierte Psets sind erlaubt, sollten aber sauber benannt und dokumentiert werden.

!!! kastanienallee "Kastanienallee 7"
    Eine Außenwand kann als `IfcWall` mit `IfcMaterialLayerSet` modelliert sein: Innenputz 15 mm, Stahlbeton 200 mm, Mineralwolle 160 mm, Armierungsputz, Außenputz. `Pset_WallCommon` enthält `LoadBearing = true`, `IsExternal = true`, `ThermalTransmittance = 0.19` und `FireRating = REI 90`. Mengen kommen aus `Qto_WallBaseQuantities`.

## 18.5 Beziehungen in IFC

Beziehungen sind der Kern von IFC. `IfcRelAssociatesMaterial` verbindet Elemente mit Materialien. `IfcRelDefinesByType` verbindet Instanzen mit Typen. `IfcRelConnectsElements` beschreibt Anschlüsse. `IfcRelSpaceBoundary` verbindet Räume mit umgebenden Bauteilen.

Um von einer Wand zum Material zu kommen, geht Software nicht über eine Textsuche, sondern über Relationen: Wand finden, Materialbeziehung suchen, MaterialLayerSet auslesen. Deshalb sind Beziehungen wichtiger als Objektlisten.

<!-- IMAGE
name: kap18_beziehungen
type: diagram
size: landscape
desc: Graphdiagramm mit IfcWall im Zentrum und Pfeilen zu IfcMaterial via IfcRelAssociatesMaterial, IfcSpace via IfcRelSpaceBoundary, IfcWallType via IfcRelDefinesByType und IfcBuildingStorey via IfcRelContainedInSpatialStructure. Weißer Hintergrund.
caption: IFC ist ein Beziehungsmodell, nicht nur eine Objektliste
tags: ifc, relationen, ifcwall, properties
-->
![IFC-Beziehungen](../assets/illustrations/kap18_beziehungen.png)

## 18.6 STEP-Format manuell lesen

**STEP** (::STEP::) ist das textuelle Serialisierungsformat, in dem viele IFC-Dateien gespeichert werden. Jede Zeile hat eine Nummer und eine Entität: `#123 = IFCWALL(...)`. Referenzen auf andere Zeilen beginnen mit `#`. Eine Wand verweist also auf Geometrie, OwnerHistory, Placement und Beziehungen über andere Einträge.

Ein minimaler Entwicklerzugang beginnt mit Textsuche: Wie viele `IFCWALL` gibt es? Gibt es `IFCSPACE`? Sind GUIDs doppelt? Fehlt `IFCRELCONTAINEDINSPATIALSTRUCTURE`? Das ersetzt keinen Parser, hilft aber beim Debuggen fehlerhafter Exporte.

<!-- IMAGE
name: kap18_step_format
type: infographic
size: landscape
desc: Annotiertes STEP-Beispiel einer IfcWall mit Zeilennummern, GUID, Name, Placement, Representation und Referenzen. Farbliche Markierung von Entität, Argumentliste und Referenzen. Weißer Hintergrund, monospaced Text.
caption: STEP-Dateien verketten IFC-Objekte über nummerierte Referenzen
tags: ifc, step, entwickler, ifcwall
-->
![STEP-Format annotiert](../assets/illustrations/kap18_step_format.png)

!!! kastanienallee "Kastanienallee 7"
    Für K7 wird IFC4 als Zielversion festgelegt, weil die Projektstruktur, PropertySets und Materialschichten sauberer nutzbar sind. Wenn ein Fachplaner nur IFC2x3 exportieren kann, wird im BAP festgelegt, welche MVD, welche Exporteinstellungen und welche Prüfschritte gelten.

## 18.7 Programmatischer Zugriff mit IfcOpenShell

IfcOpenShell ist der de-facto-Standard für IFC-Zugriff in Python. Ein typischer Einstieg lädt eine Datei, filtert Entitäten und liest Properties. Alternativen sind xBIM für .NET und web-ifc für JavaScript.

```python
import ifcopenshell
import ifcopenshell.util.element

model = ifcopenshell.open("kastanienallee7.ifc")
for wall in model.by_type("IfcWall"):
    psets = ifcopenshell.util.element.get_psets(wall)
    print(wall.Name, psets.get("Pset_WallCommon", {}))
```

Damit lassen sich eigene Prüfer, Mengenexporte, Datenqualitätsberichte oder Viewer bauen. Entscheidend ist, nicht nur Geometrie zu lesen, sondern Beziehungen und Psets.

## 18.8 IFC-Versionen und MVD

IFC2x3 ist in Deutschland noch verbreitet, besonders für Koordination. IFC4 ist aktueller und für Neuprojekte empfehlenswert. IFC4.3 erweitert Infrastruktur und Brücken. Eine Model View Definition legt fest, welcher Ausschnitt des IFC-Schemas für einen Anwendungsfall gilt.

Coordination View 2.0 war lange Standard für IFC2x3-Koordination. Reference View in IFC4 ist eher für referenzierten Austausch gedacht, Design Transfer View für weiterbearbeitbare Übergaben. Die MVD muss im ::BAP:: vereinbart werden, sonst exportieren Beteiligte formal IFC, aber in praktisch unterschiedlichen Sprachen.

<!-- IMAGE
name: kap18_mvd_vergleich
type: infographic
size: landscape
desc: Vergleichstabelle Coordination View 2.0, Reference View und Design Transfer View mit IFC-Version, Geometrie, Properties, Mengen, typischem Use Case und Revit-Export-Hinweis. Weißer Hintergrund.
caption: MVDs erklären, warum IFC-Exporte je nach Anwendungsfall variieren
tags: ifc, mvd, reference-view, coordination-view
-->
![MVD-Vergleich](../assets/illustrations/kap18_mvd_vergleich.png)

## 18.9 Georeferenzierung und CRS

Mehrere Fachmodelle passen nur zusammen, wenn Koordinaten geklärt sind. `IfcGeometricRepresentationContext` beschreibt das lokale Koordinatensystem und True North. In IFC4 kann `IfcMapConversion` lokale Koordinaten an ein Koordinatenreferenzsystem koppeln. In Deutschland ist EPSG:25832, ETRS89/UTM Zone 32N, häufig relevant.

IFC2x3 speichert oft nur `RefLatitude` und `RefLongitude` an `IfcSite`, was ungenau und unvollständig ist. Für GIS-Kopplung, Stadtmodelle und CDE-Koordination muss der Koordinatenursprung im BAP festgelegt werden. Ohne saubere Georeferenzierung liegen Modelle sichtbar nebeneinander statt übereinander.

<!-- IMAGE
name: kap18_georeferenzierung
type: diagram
size: landscape
desc: Systemdiagramm lokales BIM-Modellkoordinatensystem, IfcMapConversion-Pfeil zu EPSG:25832 und GIS-Layer. Daneben Fehlerbild ohne Georeferenzierung mit zwei versetzten Fachmodellen. Weißer Hintergrund.
caption: Georeferenzierung koppelt lokales Modell und reale Koordinaten
tags: ifc, georeferenzierung, epsg25832, gis
-->
![IFC-Georeferenzierung](../assets/illustrations/kap18_georeferenzierung.png)

## 18.10 IFC-Qualität prüfen

Eine IFC-Datei ist nicht automatisch gut, weil sie sich öffnen lässt. Viele Viewer sind tolerant und zeigen Geometrie auch dann an, wenn Beziehungen, Properties oder Mengen fehlen. Für Koordination kann das kurzfristig reichen; für Auswertung, Kosten, Energie, Brandschutz oder Betrieb reicht es nicht. Qualität muss deshalb gegen den Zweck geprüft werden.

Die erste Prüfung ist strukturell. Gibt es genau ein `IfcProject`? Sind `IfcSite`, `IfcBuilding` und `IfcBuildingStorey` vorhanden? Sind Bauteile räumlich enthalten? Gibt es Räume? Haben Elemente eindeutige GlobalIds? Sind Gebäudegeschosse sinnvoll benannt? Diese Fragen wirken einfach, aber fehlerhafte Exporte scheitern oft schon hier.

Die zweite Prüfung ist semantisch. Sind Wände wirklich `IfcWall` und nicht `IfcBuildingElementProxy`? Sind Türen `IfcDoor` und Fenster `IfcWindow`? Sind TGA-Objekte dem passenden System zugeordnet? Gibt es Typen für wiederkehrende Elemente? Sind Materialschichten vorhanden, oder ist eine Wand nur ein Körper ohne Aufbau? Für Software entscheidet diese Semantik, ob sie Regeln anwenden kann.

Die dritte Prüfung betrifft Properties und Mengen. Ein `FireRating` als freier Text ist weniger robust als ein abgestimmter Wert. Ein U-Wert muss an der richtigen Stelle stehen und zur Schichtlogik passen. Mengen sollten nachvollziehbar sein: Länge, Höhe, Fläche, Nettofläche, Volumen. Wenn Mengen fehlen, können sie teilweise aus Geometrie berechnet werden, aber dann entstehen andere Toleranzen als bei autoritativ exportierten QuantitySets.

Die vierte Prüfung ist georeferenziert. Teilmodelle müssen denselben Ursprung, dieselbe Nordrichtung und denselben Maßstab haben. Ein Modell, das im Viewer "irgendwo" erscheint, ist für Koordination gefährlich. Besonders bei Infrastruktur, Stadtmodellen und großen Grundstücken ist EPSG-Bezug nicht optional.

IDS macht diese Prüfungen maschinenlesbarer. Eine Information Delivery Specification kann festlegen: Jede Außenwand muss `IsExternal = true`, einen U-Wert, einen Feuerwiderstand und eine DIN-276-Klassifikation tragen. Validatoren prüfen dann nicht Geschmack, sondern Lieferanforderungen. Für Projekte ist das ein wichtiger Schritt vom PDF-BAP zu überprüfbaren Datenanforderungen.

!!! kastanienallee "Kastanienallee 7"
    Für K7 könnte eine einfache IDS-Regel lauten: Alle `IfcWall` mit `IsExternal = true` müssen `Pset_WallCommon.ThermalTransmittance`, `Pset_WallCommon.FireRating`, `LoadBearing`, ein `IfcMaterialLayerSet` und eine DIN-276-Referenz besitzen. Fehlt eine dieser Angaben, ist das Modell nicht lieferfähig, auch wenn es optisch korrekt aussieht.

## 18.11 Prüffragen für die Praxis

Beim Empfang einer IFC-Datei sollten Entwickler und Planer immer mit denselben Grundfragen beginnen. Welche IFC-Version liegt vor? Welche MVD wurde exportiert? Aus welchem Autorensystem stammt die Datei? Ist die Datei für Koordination, Auswertung, Übergabe oder Archiv gedacht? Ohne Zweck lässt sich Qualität nicht bewerten.

Danach folgt die technische Prüfung. Lässt sich die Datei mit einem Parser öffnen, nicht nur mit einem Viewer? Gibt es Schemafehler? Sind GlobalIds eindeutig? Sind Einheiten korrekt? Stimmen Modellursprung und Nordrichtung? Sind Geschosse und Räume vorhanden? Diese Punkte sind die Grundlage für jede weitere Automatisierung.

Die fachliche Prüfung fragt nach Mindestinformationen. Außenwände brauchen Materialschichten, U-Wert, Brandschutz und Klassifikation. Türen brauchen Maße, Öffnungsrichtung, Raumbezug und gegebenenfalls Feuer- oder Rauchschutz. TGA-Objekte brauchen Systemzuordnung und Typinformation. Räume brauchen Nummer, Name, Fläche und Nutzung. Welche dieser Anforderungen gelten, muss im BAP oder in einer IDS stehen.

Für Softwareentwicklung ist die wichtigste Regel: IFC nicht wie JSON mit festen Pfaden lesen. Dasselbe Konzept kann je nach Export über Typen, Instanzen, PropertySets oder Beziehungen kommen. Robuste Werkzeuge traversieren Relationen, behandeln fehlende Werte kontrolliert und geben verständliche Qualitätsmeldungen aus. Ein gutes IFC-Tool erklärt, warum es eine Information nicht findet.

## Zusammenfassung

**IFC ist ein offenes Beziehungsmodell für Gebäudeinformationen, nicht nur ein 3D-Austauschformat.**

Projektstruktur, Entitäten, Properties, Mengen, Beziehungen, STEP und Georeferenzierung bestimmen, ob Software ein Modell wirklich auswerten kann. Wer IFC versteht, kann BIM-Qualität prüfen statt nur Dateien weiterzureichen.

Verwandte Kapitel: [Kap. 17](/chapters/17-was-bim-wirklich-ist) · [Kap. 19](/chapters/19-klassifikation) · [Kap. 20](/chapters/20-prozess-kollaboration)
