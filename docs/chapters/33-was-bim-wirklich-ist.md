# Kapitel 33 – Was BIM wirklich ist

*Teil VIII – BIM-Datenmethode*

---

Viele Projekte sagen "BIM", wenn sie eigentlich ein 3D-Modell meinen. Andere sagen "BIM", wenn sie eine Software meinen. Beides greift zu kurz: Entscheidend ist, wer welche Information wann zuverlässig liefert.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - BIM als Methode, Datenmodell und Prozess unterscheiden
    - typische BIM-Anwendungsfälle realistisch einordnen
    - offenes BIM und proprietäre Ökosysteme vergleichen

## 33.1 Drei Dimensionen von BIM

**Building Information Modeling** (::BIM::) ist eine Methode der vernetzten Planung, Ausführung und Bewirtschaftung von Gebäuden auf Basis digitaler Modelle. Die erste Dimension ist Methode: Beteiligte arbeiten koordiniert, liefern definierte Informationen und prüfen Modelle gemeinsam. Die zweite Dimension ist das Datenmodell: Bauteile sind nicht nur Geometrie, sondern Objekte mit Eigenschaften. Die dritte Dimension ist der Prozess: Informationslieferungen haben Termine, Verantwortliche und Qualitätskriterien.

Ein BIM-Modell ist also nicht automatisch gut, weil es dreidimensional ist. Eine Wand muss wissen, dass sie Wand ist, aus welchen Schichten sie besteht, ob sie tragend ist, welche ::Feuerwiderstandsklasse:: sie hat und zu welchem Geschoss sie gehört. Ohne Semantik bleibt ein Modell eine Zeichnung mit Tiefe.

!!! kastanienallee "Kastanienallee 7"
    Für Kastanienallee 7 liefern Architektur, Tragwerk, Heizung/Lüftung/Sanitär, Elektro und Brandschutz eigene Fachmodelle. Das Koordinationsmodell führt sie zusammen. Prüfungen fragen dann: Schneidet ein Lüftungskanal einen Unterzug? Haben alle Wohnungen Räume mit Flächen? Sind Schächte durchgehend? Stimmen Türbreiten für Barrierefreiheit?

## 33.2 Was BIM löst

BIM hilft bei Kollisionsprüfung, Mengenermittlung, Energiesimulation, Terminplanung, Kostenkopplung und Facility Management. Eine harte Kollision ist eine geometrische Überschneidung, etwa Rohr durch Träger. Eine weiche Kollision verletzt Mindestabstände. Eine Workflow-Kollision ist ein Planungswiderspruch, etwa ein Schacht ohne Wartungszugang.

4D-BIM koppelt Modell und Zeitplan, ::5D-BIM:: koppelt Kosten, 6D/7D werden für Betrieb und Nachhaltigkeit verwendet. Diese Begriffe sind nützlich, aber nicht präzise normiert. Wichtig ist der Anwendungsfall: Welche Entscheidung wird durch Modellinformation besser?

BIM löst keine schlechte Planung. Ein falsch modellierter Schacht bleibt falsch, nur digital. Ein leerer Property-Satz hilft keiner Auswertung. Deshalb sind Informationsanforderungen, Prüfregeln und Koordination wichtiger als Softwaremarketing.

<!-- IMAGE
name: kap18_bim_dimensionen
type: infographic
size: landscape
desc: Infografik BIM-Dimensionen 3D Geometrie, 4D Zeit, 5D Kosten, 6D Betrieb, 7D Nachhaltigkeit mit je einem konkreten Beispiel am Mehrfamilienhaus. Weißer Hintergrund, deutsche Labels, technisch-clean.
caption: BIM-Anwendungsfälle koppeln Modellinformation mit Entscheidungen
tags: bim, 4d, 5d, facility-management
-->
![BIM-Dimensionen](../assets/illustrations/kap18_bim_dimensionen.png)

## 33.3 BIM-Reifegrade

Little BIM bedeutet: ein Büro arbeitet intern modellbasiert. Big BIM bedeutet: mehrere Beteiligte arbeiten modellbasiert über Organisationsgrenzen hinweg. Proprietäre BIM-Prozesse bleiben in einem Software-Ökosystem. Offenes BIM nutzt offene Standards, vor allem **Industry Foundation Classes** (::IFC::), um Daten unabhängig vom Hersteller auszutauschen.

Offenes BIM ist schwieriger, aber langfristig robuster. Gebäude leben länger als Softwareversionen. Ein Modell für Betrieb, Umbau oder Rückbau muss auch dann noch lesbar sein, wenn das ursprüngliche Authoring-Tool nicht mehr verwendet wird. ::IFC:: ist nicht perfekt, aber der wichtigste offene Standard für diese Aufgabe.

Das **BIM Collaboration Format** (::BCF::) ergänzt IFC für Koordination. Es speichert keine Geometrie, sondern Probleme: Kameraposition, betroffene Objekte, Kommentar, Status und Zuständigkeit. Damit wird Modellprüfung zu einem nachvollziehbaren Workflow.

## 33.4 BIM im deutschen Markt

In Deutschland wurde BIM zuerst im Infrastrukturbau stärker verpflichtend. Öffentliche Auftraggeber, Bahn, Autobahn und Bundesbau treiben standardisierte Modellanforderungen. Im Hochbau ist die Lage heterogen: große Projekte arbeiten zunehmend modellbasiert, kleinere Projekte oft noch zeichnungsorientiert.

VDI 2552, ISO 19650 und DIN SPEC 91391 liefern Begriffe und Prozessrahmen. Entscheidend bleibt die Praxis: Ein Auftraggeber muss Informationsanforderungen formulieren, das Planungsteam muss liefern können, und der Betreiber muss wissen, welche Daten später gebraucht werden.

<!-- IMAGE
name: kap18_prozessvergleich
type: diagram
size: landscape
desc: Flussdiagramm klassischer Planungsprozess versus BIM-Prozess. Klassisch: getrennte Pläne, späte Koordination, Kollision auf Baustelle. BIM: Fachmodelle, Koordinationsmodell, frühe Clash-Prüfung, BCF-Tickets. Weißer Hintergrund, deutsche Labels.
caption: BIM verschiebt Koordination nach vorn
tags: bim, prozess, koordination, bcf
-->
![Prozessvergleich klassisch und BIM](../assets/illustrations/kap18_prozessvergleich.png)

## 33.5 Was sich im Alltag wirklich ändert

Der größte BIM-Effekt ist nicht die dreidimensionale Darstellung. Dreidimensionale Modelle gab es lange vor BIM. Der Unterschied liegt darin, dass Bauteile Bedeutung, Beziehungen und Anforderungen tragen. Eine Wand ist nicht nur eine extrudierte Fläche, sondern ::Außenwand::, tragend oder nichttragend, mit Schichtaufbau, Brandschutz, U-Wert, Kostenbezug und Raumgrenze. Diese Bedeutung kann geprüft, gefiltert und weiterverwendet werden.

Das verändert Besprechungen. In klassischen Projekten werden Pläne nebeneinandergelegt und Widersprüche manuell gesucht. In BIM-Projekten werden Fachmodelle zusammengeführt, Kollisionen geprüft und Aufgaben als BCF-Issues verteilt. Das klingt mechanisch, ist aber nur dann nützlich, wenn die Beteiligten fachlich entscheiden: Ist die Kollision relevant? Wer ändert was? Bis wann? Welche Folge hat die Änderung auf Kosten, Termine und Genehmigung?

Auch Verantwortung wird klarer. Ein Modellobjekt hat Herkunft, Status und Zweck. Eine Wand aus dem Architekturmodell ist nicht automatisch ein geprüfter statischer Nachweis. Ein Lüftungskanal aus dem TGA-Modell ist nicht automatisch ausführungsreif. Ein Koordinationsmodell ist keine Wahrheit, sondern eine zusammengeführte Arbeitsgrundlage. BIM scheitert oft, wenn diese Statusunterschiede ignoriert werden.

Für Architekten bedeutet BIM mehr Vorentscheidung. Raumstruktur, Bauteiltypen, Achsen, Geschosse und Modellorganisation müssen früher sauber sein, weil andere Disziplinen darauf aufbauen. Für Entwickler bedeutet BIM, dass Geometrie allein nicht reicht. Ein Viewer, der IFC schön anzeigt, löst noch kein Bauproblem. Wert entsteht, wenn Software Beziehungen, Properties, Klassifikation, Status und Prüfregeln versteht.

Offenes BIM ist deshalb anspruchsvoll. Proprietäre Werkzeuge speichern intern viel mehr, als sie sauber exportieren. IFC zwingt zur Übersetzung in ein gemeinsames Schema. Dabei gehen Informationen verloren, wenn sie nicht standardisiert, nicht modelliert oder nicht im Export gemappt sind. Das ist kein Argument gegen IFC, sondern ein Grund, IFC bewusst zu planen: Version, MVD, PropertySets und Qualitätsprüfung gehören in den Projektprozess.

!!! kastanienallee "Kastanienallee 7"
    Im BIM-Prozess von K7 liefert Architektur das Raummodell und die Bauteilstruktur, Tragwerk das analytische Strukturmodell, TGA die MEP-Trassen und Technikkomponenten. Ein Koordinationsmodell prüft wöchentlich Schächte, Deckenöffnungen, Unterzüge und Installationen. BCF-Issues enthalten Ansicht, Kommentar, Verantwortlichen und Termin. Damit wird Koordination nachvollziehbar, statt in E-Mails zu verschwinden.

## 33.6 Prüffragen für die Praxis

Ein Projekt sollte vor dem Modellstart klären, welche BIM-Anwendungsfälle wirklich gebraucht werden. Kollisionsprüfung, Mengenermittlung, Kostenkopplung, Energieanalyse, 4D-Terminplanung und FM-Übergabe verlangen unterschiedliche Daten. Wer alles verspricht, ohne Datenanforderungen zu definieren, erzeugt ein überladenes Modell mit unklarer Qualität.

Die zweite Frage betrifft den Informationszeitpunkt. Ein Bauteil kann in ::LP:: 2 grob und in ::LP:: 5 detailliert sein. Das ist kein Fehler, sondern Prozess. Problematisch wird es, wenn jemand aus einem LOD-200-Modell Ausführungsdetails ableitet oder aus einem LOD-300-Modell FM-Daten erwartet, die nie gefordert wurden. BIM braucht deshalb Reifegrad und Status, nicht nur Detaillierung.

Die dritte Frage lautet: Was wird geprüft? Ein Modell kann nur dann zuverlässig sein, wenn es gegen Regeln getestet wird. Sind Räume geschlossen? Haben ::Außenwand:: U-Werte? Sind tragende Bauteile markiert? Haben Türen Brandschutzanforderungen? Sind Fachmodelle georeferenziert? Ohne solche Prüfungen bleibt BIM Vertrauenssache.

Schließlich muss geklärt werden, wie Änderungen laufen. Ein Modell ist lebendig. Wenn Tragwerk eine Stütze verschiebt, betrifft das Architektur, TGA, Kosten und eventuell Brandschutz. BCF, CDE und regelmäßige Koordinationsrunden machen diese Folgen sichtbar. BIM ist deshalb keine Datei, sondern ein Änderungsprozess mit Daten.

## 33.7 Entwicklerperspektive

Für Entwickler ist BIM ein Domänenproblem, kein Dateiformatproblem. Wer nur Dreiecke rendert, baut einen Viewer. Wer Räume, Bauteile, Systeme, Beziehungen, Versionen, Rollen und Anforderungen versteht, baut ein BIM-Werkzeug. Der Unterschied liegt in der Semantik.

Ein gutes BIM-Tool sollte daher immer fragen: Was ist dieses Objekt fachlich? Wo liegt es räumlich? Zu welchem System gehört es? Welche Anforderungen muss es erfüllen? Wer ist verantwortlich? In welchem Status befindet es sich? Welche anderen Objekte hängen davon ab? Diese Fragen sind näher an der Baupraxis als viele geometrische Spezialeffekte.

Auch Fehlerausgaben müssen fachlich sein. "Property missing" hilft wenig. Besser ist: "::Außenwand:: A-203 hat keinen U-Wert; erforderlich für GEG-Prüfung in ::LP:: 3." Ein solches System verbindet Datenprüfung mit Prozess und Zweck. Genau hier entsteht der Unterschied zwischen technischer Validierung und planungsrelevanter Qualität.

BIM ist deshalb kein einzelnes Produktversprechen. Es ist eine Vereinbarung über Informationsqualität. Wenn diese Vereinbarung fehlt, entstehen Modelle, die schön aussehen, aber für Kosten, Energie, FM oder Nachhaltigkeit nicht taugen. Wenn sie ernst genommen wird, kann dasselbe Modell viele Entscheidungen unterstützen, ohne dass Informationen ständig neu erfasst werden.

Der kulturelle Teil ist dabei nicht zu unterschätzen. BIM macht Fehler früher sichtbar und verteilt Informationen breiter. Das ist produktiv, kann aber auch Konflikte erzeugen, wenn Teams Prüfung als Kontrolle statt als gemeinsames Werkzeug verstehen. Gute BIM-Projekte vereinbaren deshalb nicht nur Dateiformate, sondern auch Kommunikationsregeln und Entscheidungswege.

Ein reifes BIM-Verständnis akzeptiert, dass Modelle nie neutral sind. Sie spiegeln Entscheidungen, Zuständigkeiten und Annahmen. Wer ein Modell liest, muss deshalb immer fragen: Für welchen Zweck wurde es erstellt, in welchem Status steht es, und welche Information ist ausdrücklich nicht enthalten?

Diese Frage schützt vor einem typischen Missverständnis: BIM ist nicht automatisch genauer als ein Plan. Ein frühes Modell kann bewusst grob sein, ein später Plan sehr präzise. Entscheidend ist nicht das Medium, sondern die vereinbarte Informationsreife.

So gelesen ist BIM vor allem ein Disziplinwechsel: weg vom Zeichnen einzelner Ansichten, hin zum Pflegen prüfbarer Gebäudedaten für Planung, Bau und Betrieb.

## Zusammenfassung

**BIM ist verlässliche Information im richtigen Modell zum richtigen Zeitpunkt.**

Es ist Methode, Datenmodell und Prozess zugleich. Der Nutzen entsteht nicht durch 3D, sondern durch Semantik, Koordination und überprüfbare Lieferstände.

Verwandte Kapitel: [Kap. 19](/chapters/19-hoai-rollen-projektorganisation) · [Kap. 34](/chapters/34-ifc) · [Kap. 36](/chapters/36-prozess-kollaboration) · [Kap. 37](/chapters/37-bim-praxis)
