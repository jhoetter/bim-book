# Kapitel 37 – BIM in der Praxis

*Teil VIII – BIM-Datenmethode*

---

BIM klingt in Präsentationen sauberer als im Projektalltag. Dort treffen Modelle aus verschiedenen Programmen, unvollständige ::Properties::, Terminnot und echte Baustellenfragen aufeinander. Praxis heißt, aus dem Modell verlässliche Arbeit zu machen.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Softwarekategorien im BIM-Projekt unterscheiden
    - typische BIM-Fehler erkennen
    - IFC-Validierung und Open-Source-Werkzeuge einordnen

## 37.1 Authoring-Software

Authoring-Software erstellt Fachmodelle. Revit ist in Deutschland stark verbreitet, besonders wegen Familien, Parametern und MEP-Integration. Archicad, Vectorworks und Allplan sind ebenfalls relevant. Jedes System hat eigene Stärken, Datenlogiken und Exportprobleme.

Das Authoring-Modell ist nicht automatisch das Austauschmodell. Ein Revit-Projekt kann intern sauber funktionieren und trotzdem schlechte IFC liefern, wenn Kategorien, Phasen, Typen oder Export-Mappings nicht stimmen. Deshalb gehören Exporttests früh in den ::BAP::.

## 37.2 Koordinations- und Prüftools

Koordinationswerkzeuge wie Navisworks, Solibri oder BIMcollab führen Teilmodelle zusammen. Sie prüfen Kollisionen, Abstände, Klassifikationen und Regeln. Ein Koordinationsmodell ist kein neues Mastermodell, sondern ein Prüfstand.

Regelbasierte Prüfung kann einfache Fragen beantworten: Hat jede Tür einen Raumbezug? Sind Brandabschnittstüren klassifiziert? Schneiden sich TGA und Tragwerk? Ein Clash-Bericht ist nur nützlich, wenn er priorisiert, zuständig und nachverfolgt wird.

<!-- IMAGE
name: kap22_clash_beispiel
type: diagram
size: landscape
desc: Screenshot-ähnliche technische Darstellung eines 3D-Koordinationsmodells mit markierter roter Kollision zwischen Lüftungskanal und Betonunterzug, seitlich BCF-Panel mit Status, Verantwortlichem und Kommentar. Weißer Hintergrund.
caption: Kollisionsprüfung wird erst durch Zuständigkeit und Status wirksam
tags: clash, bcf, koordination, bim
-->
![Clash-Beispiel](../assets/illustrations/kap22_clash_beispiel.png)

## 37.3 Analysetools

Analysewerkzeuge nutzen Modellgeometrie und Daten für Fachfragen. Energieanalyse kann über gbXML oder IFC Flächen und Räume übernehmen. Statikprogramme wie RFEM oder andere Systeme brauchen analytische Strukturmodelle. Tageslichtsimulation arbeitet mit Geometrie, Materialien und Himmelsmodellen.

Die Schnittstelle ist oft der kritische Punkt. Ein Architekturmodell enthält nicht automatisch die analytischen Linien eines Tragwerks. Ein Energiemodell braucht geschlossene Zonen und plausible Bauteilwerte. BIM reduziert Eingabearbeit, ersetzt aber keine fachliche Modellaufbereitung.

## 37.4 Facility Management

Für den Betrieb zählen andere Daten als für die Planung: Wartungsintervalle, Seriennummern, Anlagenkennzeichen, Räume, Hersteller, Gewährleistungsfristen. COBie ist ein Austauschformat für solche Übergabedaten. CAFM-Systeme verwalten Assets, Wartung und Flächen.

Wenn FM-Daten erst am Projektende gesammelt werden, fehlen sie oft. Wartungsdaten müssen ab ::LP:: 5 mitgedacht werden, wenn Produkte, Anlagen und Räume konkret werden. Sonst entsteht ein schönes Modell ohne Betreiberwert.

!!! kastanienallee "Kastanienallee 7"
    Der BIM-Workflow führt von ::LP:: 2 bis FM: Vorplanung als Raummodell, Entwurf als koordiniertes Architektur-/Tragwerk-/TGA-Modell, ::LP:: 5 als Kollisions- und Ausführungsmodell, Übergabe als Asset-Liste für Aufzug, Lüftungsgeräte, Wärmemengenzähler, PV-Wechselrichter und Brandschutzelemente. Der Betreiber braucht keine Bewehrungsstäbe, aber eindeutige wartbare Anlagen.

## 37.5 Häufige BIM-Fehler

Der häufigste Fehler ist ein Modell ohne Daten. Es sieht gut aus, enthält aber leere Psets. Zweitens fehlen Klassifikationen: Bauteile sind nicht Kosten, Gewerken oder FM-Assets zugeordnet. Drittens ist der IFC-Export schlecht: Schichten fehlen, Geometrie wird Proxy, Räume sind offen.

Weitere Fehler sind fehlende ::AIA::, zu späte Koordination, uneinheitliche Koordinaten und ungeprüfte Modellstände. BIM scheitert selten an einem großen technischen Problem; es scheitert an vielen kleinen unklaren Verantwortlichkeiten.

## 37.5a IFC-Validierungstools

IFC-Dateien sollten validiert werden, bevor sie Grundlage einer Entscheidung werden. Der buildingSMART Validation Service prüft Schema, ::MVD:: und normative Regeln. IDS-Dateien beschreiben maschinenlesbar, welche Objekte welche ::Properties:: haben müssen.

Solibri, BIMcollab ZOOM, xBIM Toolkit und ::IfcOpenShell:: können je nach Umfang prüfen, filtern oder eigene Regeln ausführen. Für Entwickler ist wichtig: Eigene IFC-Ausgaben werden nicht per Sichtprüfung validiert, sondern gegen Schema, ::MVD:: und projektspezifische ::IDS::.

## 37.6 Open-Source-Ökosystem

::IfcOpenShell:: bietet Python-Zugriff auf IFC. BlenderBIM beziehungsweise Bonsai erweitert Blender um BIM-Funktionalität. xBIM ist für .NET relevant, web-ifc für JavaScript und Browseranwendungen. FreeCAD bietet BIM-Funktionen im Open-Source-CAD-Kontext.

Open Source ist im BIM-Bereich besonders wertvoll, weil viele Probleme Datenprobleme sind. Wer IFC prüfen, transformieren oder visualisieren will, braucht Werkzeuge, die nicht nur eine Oberfläche, sondern programmatischen Zugriff geben.

<!-- IMAGE
name: kap22_bim_software_oekosystem
type: infographic
size: landscape
desc: Kategorisierte Übersicht des BIM-Software-Ökosystems: Authoring, Koordination, Analyse, Facility Management, Open Source. Je Kategorie Beispieltools als neutrale Textboxen, Funktion und Datenformate. Weißer Hintergrund.
caption: BIM-Projekte nutzen mehrere Softwarekategorien statt ein einziges Werkzeug
tags: bim, software, authoring, ifc, opensource
-->
![BIM-Software-Ökosystem](../assets/illustrations/kap22_bim_software_oekosystem.png)

## 37.7 Ein realistischer BIM-Projektablauf

Ein BIM-Projekt beginnt nicht mit Modellieren, sondern mit Anforderungen. Der Auftraggeber definiert, wofür BIM genutzt wird: Koordination, Mengen, Kosten, Energie, FM, Genehmigung, LCA oder Betrieb. Daraus entstehen ::AIA::, BAP, Modellstruktur, Prüfregeln und Liefertermine. Erst dann ist klar, welche Software und welche Detaillierung sinnvoll sind.

In der Vorplanung wird ein grobes Architekturmodell aufgebaut. Räume, Geschosse, Achsen, Baukörper und Hauptbauteile müssen stabil genug sein, damit Fachplaner anschließen können. Tragwerk entwickelt ein Strukturmodell, TGA reserviert Technikflächen und Schächte, Bauphysik prüft Hülle und Wärmebrücken. Diese Phase ist weniger detailreich, aber entscheidend für die spätere Koordination.

In der Entwurfs- und Genehmigungsplanung wird das Modell belastbarer. Räume erhalten Flächen, Bauteile bekommen Typen, Anforderungen werden eingetragen. ::Kollisionsprüfung:: sollte hier bereits laufen, auch wenn noch nicht jede Leitung modelliert ist. Je früher ein Schachtproblem sichtbar wird, desto weniger teuer ist die Korrektur.

In der Ausführungsplanung steigt die Detaillierung. TGA-Trassen, Deckenöffnungen, Brandschutzanforderungen, Schallschutzdetails, Türlisten, Materialschichten und Mengen werden konkret. Hier entscheidet sich, ob BIM ein Koordinationswerkzeug oder nur ein schönes 3D-Modell war. Ein Modell ohne gepflegte ::Properties:: produziert in ::LP:: 5 viel manuelle Nacharbeit.

Nach Übergabe endet BIM nicht automatisch. Für FM braucht der Betreiber andere Informationen als die Planung: Hersteller, Wartungsintervalle, Seriennummern, Räume, Anlagen, Garantien, Ersatzteile. Diese Informationen müssen früh als Lieferanforderung definiert werden. Sonst bekommt der Betreiber ein großes Modell, aber keine brauchbare Asset-Datenbank.

!!! kastanienallee "Kastanienallee 7"
    K7 nutzt Revit oder Archicad für Architektur, ein Tragwerkswerkzeug mit IFC-Export, TGA-Authoring für MEP, Solibri oder BIMcollab für Prüfung und BCF für Aufgaben. In ::LP:: 3 werden Schächte, Kerne, Räume und Hauptbauteile koordiniert. In ::LP:: 5 werden Trassen und Durchbrüche freigegeben. Für Betrieb werden Aufzug, KWL-Geräte, Zähler, PV-Wechselrichter und Fernwärmestation als Assets übergeben.

## 37.8 Prüffragen für die Praxis

Bei der Softwareauswahl sollte nicht die Funktionsliste entscheiden, sondern der Arbeitsfluss. Kann das Authoring-Tool die benötigten Bauteile und ::Properties:: sauber erzeugen? Kann es IFC in der vereinbarten Version exportieren? Kann das Koordinationstool BCF zuverlässig austauschen? Kann das Prüfwerkzeug Regeln so formulieren, dass Planer sie verstehen?

Die zweite Frage ist Datenhoheit. Proprietäre Plattformen können produktiv sein, binden aber Projektwissen an ein Ökosystem. Offene Formate wie IFC, BCF, ::IDS:: und ::GAEB:: sind nicht perfekt, schaffen aber Exit-Möglichkeiten. Eine pragmatische BIM-Strategie nutzt gute Werkzeuge, ohne die Langzeitverfügbarkeit der Daten zu verlieren.

Die dritte Frage betrifft Modellierungsdisziplin. Zu viel Detaillierung erzeugt große, langsame Modelle und Scheingenauigkeit. Zu wenig Detaillierung verhindert Prüfung. Ein Türgriff muss selten modelliert werden; Türbreite, Öffnungsrichtung, Brandschutz und Raumbezug sind dagegen wichtig. Modellqualität entsteht durch Zweckbindung.

Schließlich braucht jedes Projekt eine Fehlerkultur. Clash-Reports sind kein Schuldprotokoll, sondern ein Koordinationswerkzeug. Viele Kollisionen bedeuten am Anfang nicht automatisch schlechte Planung; sie zeigen, dass Systeme sichtbar werden. Schlecht ist, wenn Kollisionen wiederkehren, nicht entschieden oder ohne Verantwortlichen geschlossen werden.

## 37.9 Entwicklerperspektive

BIM-Werkzeuge sollten zuerst reale Arbeitslast reduzieren. Ein Planer braucht nicht noch eine Plattform, die Daten doppelt abfragt. Er braucht Werkzeuge, die vorhandene Modellinformationen prüfen, verständlich melden und in den bestehenden Prozess zurückspielen. Integration ist deshalb wichtiger als isolierte Funktionsfülle.

Ein gutes Prüfwerkzeug priorisiert. Tausend Clash-Meldungen ohne Relevanzfilter sind schlechter als zwanzig sauber gruppierte Probleme. Kollisionen sollten nach ::Gewerk::, Geschoss, Kritikalität und Verantwortlichkeit sortiert werden. Wiederholte gleiche Probleme sollten als Muster erkannt werden: alle Durchbrüche fehlen, alle Schächte sind zu klein, alle Brandschutzproperties fehlen.

Auch Performance ist fachlich relevant. Große BIM-Modelle können mehrere hunderttausend Objekte enthalten. Wenn ein Viewer langsam ist, wird er nicht genutzt. Wenn ein Export Stunden dauert, wird er seltener gemacht. Wenn eine Prüfung nur nachts läuft, verpasst sie Entwurfsentscheidungen. Gute Software muss mit unvollständigen, großen und fehlerhaften Modellen robust umgehen.

Für Open-Source-Ökosysteme liegt die Chance in Transparenz. ::IfcOpenShell::, BlenderBIM, xBIM und web-ifc ermöglichen eigene Workflows und Prüfungen. Sie ersetzen nicht automatisch kommerzielle Authoring-Tools, aber sie geben Entwicklern die Möglichkeit, Datenqualität unabhängig zu analysieren.

Für Büros ist die Einführung von BIM deshalb weniger eine Softwareinstallation als Organisationsentwicklung. Vorlagen, Namenskonventionen, Modellierregeln, Prüfprozesse und Schulung sind wichtiger als eine einzelne Lizenz. Wer nur ein neues Werkzeug kauft, aber alte unkoordinierte Arbeitsweisen beibehält, bekommt digitale Unordnung. Wer Prozesse klärt, kann auch mit begrenztem Toolset verlässlich arbeiten.

Ein realistischer Start ist klein: ein Pilotprojekt, wenige Anwendungsfälle, klare Modellierregeln, regelmäßige Prüfungen und ein ehrlicher Abschlussbericht. Daraus entstehen Bürostandards. Große BIM-Programme ohne Lernschleifen überfordern Teams und produzieren Regelwerke, die im Alltag nicht getragen werden.

Auch Auftraggeber profitieren von dieser Nüchternheit. Sie sollten nicht "BIM" bestellen, sondern konkrete Ergebnisse: koordinierte Modelle, geprüfte Mengen, Assetdaten, Kollisionsberichte oder Nachhaltigkeitsauswertungen. Je klarer das Ziel, desto leichter lässt sich der Nutzen messen.

Für die Praxis ist das der entscheidende Reifegrad: Nicht wie beeindruckend das Modell aussieht, sondern welche wiederholbaren Entscheidungen es verbessert. Ein einfaches Modell mit belastbaren Daten ist oft wertvoller als ein detailreiches Modell ohne Zweck.

Das beste BIM-Setup ist das, das im Projektalltag tatsächlich genutzt, geprüft und verbessert wird, auch unter Zeitdruck und bei unvollständigen Daten.

## Zusammenfassung

**BIM-Praxis ist Datenqualität, Koordination und Validierung unter Projektbedingungen.**

Authoring, Prüfung, Analyse und Betrieb brauchen unterschiedliche Werkzeuge. Wer klare Anforderungen, frühe Exporttests und Validierung einplant, verhindert die meisten teuren BIM-Enttäuschungen.

Verwandte Kapitel: [Kap. 33](/chapters/33-was-bim-wirklich-ist) · [Kap. 34](/chapters/34-ifc) · [Kap. 36](/chapters/36-prozess-kollaboration) · [Kap. 41](/chapters/41-digitaler-zwilling-ki)
