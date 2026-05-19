# Kapitel 36 – Prozess & Kollaboration: CDE, ISO 19650

*Teil VIII – BIM-Datenmethode*

---

In großen Projekten scheitert Information selten daran, dass niemand etwas weiß. Sie scheitert daran, dass zu viele Versionen an zu vielen Orten liegen. Kollaboration braucht deshalb nicht mehr E-Mails, sondern einen kontrollierten Informationsfluss.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - den Zweck einer ::CDE:: erklären
    - WIP, Shared, Published und Archived als ::Informationsstatus:: unterscheiden
    - BIM-Rollen und BCF-Koordination praktisch einordnen

## 36.1 Das Problem verteilter Information

Ohne zentrale Datenumgebung liegen Pläne in E-Mails, Dateiservern, Cloud-Ordnern und Chatverläufen. Niemand weiß sicher, welche Version gilt. Ein Fachplaner arbeitet mit altem Grundriss, die Baustelle druckt eine überholte PDF, und das Modell im Viewer hat andere Schächte als die Ausführungsplanung.

Eine ::CDE::, kurz ::CDE::, löst nicht alle Koordinationsprobleme, aber sie schafft einen Ort und einen Workflow. Dateien bekommen Status, Revision, Verantwortliche und Freigaben. Information wird damit prüfbar.

## 36.2 CDE und Informationsstatus

::ISO 19650:: unterscheidet Informationsbereiche. Work in Progress ist der interne Arbeitsbereich eines Teams. Shared ist für Koordination freigegeben, aber noch nicht vertraglich veröffentlicht. Published ist zur Verwendung freigegeben, etwa für Bau oder Vergabe. Archived bewahrt alte Stände nachvollziehbar auf.

Dateinamen folgen projektbezogenen Konventionen: Projektcode, Ursprung, Zone, Ebene, Typ, Rolle, Nummer, Revision und Status. Der genaue Aufbau wird im ::BAP:: festgelegt. Wichtig ist weniger das Schema selbst als seine konsequente Anwendung.

<!-- IMAGE
name: kap21_cde_workflow
type: diagram
size: landscape
desc: Flussdiagramm CDE-Workflow mit Bereichen Work in Progress, Shared, Published, Archived. Pfeile zeigen Prüfung, Freigabe, Revision und Archivierung. Beispiel-Dateinamen nach ISO 19650, deutsche Labels, weißer Hintergrund.
caption: Die CDE macht Informationsstatus sichtbar
tags: cde, iso19650, workflow, shared
-->
![CDE-Workflow](../assets/illustrations/kap21_cde_workflow.png)

!!! kastanienallee "Kastanienallee 7"
    Beispiel-Datei: `K7-ARC-ZZ-02-M3-A-0001-S2-P03.ifc`. K7 ist Projektcode, ARC Ursprung Architektur, 02 Geschoss, M3 Modelltyp, A Rolle Architektur, S2 Status Shared zur Koordination, P03 Revision. Tragwerk und TGA liefern eigene Modelle mit gleicher Logik; das Koordinationsmodell referenziert die Shared-Stände.

## 36.3 ISO 19650 im Überblick

::ISO 19650:: beschreibt Informationsmanagement über den Lebenszyklus. Teil 1 liefert Begriffe, Teil 2 den Lieferprozess. Die Rollenlogik unterscheidet Auftraggeber, Lead Appointed Party und Task Teams. Daraus entsteht eine Informationsanforderungskette: OIR, AIR, EIR/::AIA::, MIDP und TIDP.

Für die Praxis heißt das: Auftraggeber müssen sagen, welche Information sie brauchen. Planerteams müssen planen, wann sie diese liefern. BIM ist damit kein Zusatz zur Planung, sondern ein Lieferprozess mit Verantwortlichkeiten.

<!-- IMAGE
name: kap21_iso19650_struktur
type: diagram
size: portrait
desc: Organigramm ISO 19650 mit Auftraggeber, OIR/AIR/EIR, Lead Appointed Party mit MIDP und Task Teams mit TIDP. Informationsfluss als Pfeile, deutsche Labels, weißer Hintergrund.
caption: ISO 19650 ordnet Informationsanforderungen und Lieferteams
tags: iso19650, aia, midp, tidp
-->
![ISO-19650-Struktur](../assets/illustrations/kap21_iso19650_struktur.png)

## 36.4 BIM-Rollen

Der BIM-Manager arbeitet häufig auf Auftraggeberseite oder projektübergreifend: Ziele, ::AIA::, Standards, Prüfstrategie. Der BIM-Koordinator führt die Modellkoordination innerhalb des Planungsteams: Teilmodelle prüfen, Kollisionen verfolgen, Koordinationssitzungen leiten. BIM-Autoren erstellen Fachmodelle in Authoring-Software.

Diese Rollen ersetzen nicht Architekt, Tragwerksplaner oder TGA-Planer. Sie ergänzen deren Arbeit um Informationsmanagement. Ein guter BIM-Koordinator versteht deshalb Baupraxis und Datenstruktur.

## 36.5 Kollisionsprüfung und BCF

Kollisionen können hart, weich oder organisatorisch sein. Hard Clash: ein Rohr schneidet einen Unterzug. Soft Clash: Wartungsabstand fehlt. Workflow Clash: zwei Fachmodelle nutzen unterschiedliche Geschosshöhen. ::Kollisionsprüfung:: erzeugt Aufgaben, keine fertige Lösung.

::BCF:: speichert solche Aufgaben mit Kameraposition, Kommentar, Verantwortlichem und Status. Dadurch muss nicht die ganze IFC-Datei kommentiert werden. Ein BCF-Ticket sagt: Hier ist das Problem, diese Objekte sind betroffen, diese Person klärt es.

!!! kastanienallee "Kastanienallee 7"
    BCF-Ticket: Im 2. OG schneidet ein Lüftungskanal 200 × 100 mm einen Stahlbetonunterzug. Status: offen. Zuständig: TGA-Koordination und Tragwerksplanung. Lösung: Kanalführung um 300 mm verschieben oder Unterzugslage prüfen. Das Ticket enthält Kameraposition, Objekt-GUIDs und Fälligkeitsdatum zur nächsten Koordinationsrunde.

## 36.6 Informationsstatus ernst nehmen

Ein ::CDE:: ist nicht einfach ein besserer Dateiordner. Der Wert entsteht durch Status. Work in Progress bedeutet: ein Team arbeitet intern, andere dürfen sich nicht darauf verlassen. Shared bedeutet: andere Teams dürfen koordinieren, aber es ist noch nicht freigegeben für Bau oder Vertrag. Published bedeutet: Information ist offiziell geliefert. Archived bedeutet: sie bleibt nachvollziehbar erhalten.

Wenn diese Status vermischt werden, entsteht Chaos trotz Plattform. Eine Datei im falschen Ordner kann zu früh verwendet werden. Ein Modell ohne Revisionshinweis kann alte Informationen enthalten. Ein PDF kann veröffentlicht sein, während das Modell noch WIP ist. Gute CDE-Prozesse verhindern nicht alle Fehler, aber sie machen den gültigen Informationsstand erkennbar.

Dateibenennung ist dabei kein Formalismus. Ein Name nach ISO-Logik enthält Projekt, Ursprung, Zone, Ebene, Dokumenttyp, Rolle, Nummer, Revision und Status. Das wirkt lang, spart aber Rückfragen. Software kann solche Namen prüfen, sortieren und filtern. Menschen können erkennen, ob sie gerade Architektur, Tragwerk oder TGA sehen und ob es sich um eine freigegebene Revision handelt.

BCF ergänzt den Dateistatus um Aufgabenstatus. Ein Clash ist kein Screenshot, sondern ein Vorgang: gefunden, zugewiesen, kommentiert, geändert, geprüft, geschlossen. Wenn BCF konsequent genutzt wird, bleibt die Koordination nachvollziehbar. Wenn Probleme nur in Besprechungsnotizen stehen, verschwinden sie leicht zwischen Modellständen.

Für Auftraggeber ist der Informationslieferplan entscheidend. Der MIDP beschreibt, welche Informationen wann geliefert werden. TIDPs brechen das auf Teams herunter. Ohne Lieferplan gibt es keine objektive Antwort auf die Frage, ob ein Modell "fertig" ist. Fertig ist es nicht, wenn es gut aussieht, sondern wenn es die vereinbarte Information in der vereinbarten Qualität liefert.

!!! kastanienallee "Kastanienallee 7"
    Für K7 wird festgelegt: Architekturmodell `K7-ARC-ZZ-XX-M3-A-0001-S2-P01`, Tragwerksmodell analog mit Rolle `S`, TGA mit Rolle `M`. S2 bedeutet geteilt zur Koordination, A1 später freigegeben. Ein BCF-Issue "Lüftungskanal kollidiert mit Unterzug 2. OG" bleibt offen, bis TGA die Trasse ändert und Tragwerk die Öffnung nicht mehr benötigt.

## 36.7 Prüffragen für die Praxis

Ein CDE-Prozess sollte vor Projektstart an einem einfachen Szenario getestet werden: Architektur lädt ein Modell hoch, Tragwerk referenziert es, TGA meldet eine Kollision, Architektur ändert den Schacht, alle erhalten die neue Version. Wenn dieser Ablauf nicht eindeutig ist, wird das Projekt im Alltag Probleme bekommen.

Wichtig ist auch die Trennung von Kommunikation und Entscheidung. Kommentare in einer Plattform sind hilfreich, ersetzen aber keine Freigabe. Ein Modell kann geteilt sein, aber nicht genehmigt. Ein Issue kann diskutiert sein, aber nicht geschlossen. Ein Plan kann veröffentlicht sein, aber durch eine spätere Revision ersetzt werden. Status muss eindeutig sichtbar sein.

Revisionssicherheit ist der dritte Kernpunkt. Wer hat wann welche Information geliefert? Welche Version war Grundlage einer Entscheidung? Welche Änderung wurde warum vorgenommen? Ohne diese Nachvollziehbarkeit wird BIM im Streitfall schwach. Ein ::CDE:: ist deshalb auch ein Beweissystem, nicht nur ein Arbeitsraum.

Für die Praxis gilt: Je einfacher die Regeln, desto wahrscheinlicher werden sie eingehalten. Ein Dateinamenstandard, den niemand versteht, wird umgangen. Ein Workflow mit zehn Freigabestufen wird zu langsam. Gute Informationsprozesse sind streng genug für Qualität und einfach genug für den Projektdruck.

## 36.8 Entwicklerperspektive

CDE-Software ist weniger ein Dateispeicher als ein Zustandsautomat. Ein Informationscontainer wechselt von WIP zu Shared, von Shared zu Published, von Published zu Archived. Jeder Wechsel braucht Berechtigung, Prüfung, Zeitstempel und Nachvollziehbarkeit. Wer diese Zustände sauber modelliert, versteht ::ISO 19650:: besser als jemand, der nur Ordnernamen nachbaut.

Metadaten sind dabei wichtiger als Dateiformate. Ein PDF, ein IFC-Modell, ein BCF-Issue und ein Prüfbericht müssen Projekt, Ursprung, Status, Revision, Disziplin und Bezug kennen. Ohne Metadaten kann eine Plattform Dateien speichern, aber nicht intelligent verwalten. Mit Metadaten kann sie filtern, warnen, verknüpfen und automatisieren.

BCF ist ein gutes Beispiel für offene Prozessdaten. Ein Issue enthält Viewpoint, betroffene Elemente, Kommentar, Status, Verantwortlichen und Verlauf. Das macht Koordination toolübergreifend möglich. Wenn ein Issue nur als Screenshot in einer E-Mail existiert, gehen Objektbezug und Nachverfolgung verloren.

Für Entwickler ist die schwierige Aufgabe, Fachlichkeit und Bedienbarkeit zu verbinden. Zu viele Pflichtfelder bremsen den Alltag. Zu wenige Felder zerstören Nachvollziehbarkeit. Gute CDE-Systeme machen die richtige Arbeitsweise zum einfachsten Weg: Vorlagen, Validierung, automatische Benennung, klare Statuswechsel und verständliche Fehler.

Ein weiterer technischer Kern ist Rechteverwaltung. Nicht jeder darf alles sehen, ändern oder freigeben. Externe Prüfer, Bauherr, Fachplaner, Unternehmer und Betreiber haben unterschiedliche Rollen. Diese Rechte müssen mit Status und Revision zusammenspielen. Eine veröffentlichte Datei darf nicht still überschrieben werden; eine alte Revision muss auffindbar bleiben; ein WIP-Modell darf nicht versehentlich Vertragsgrundlage werden.

Damit wird CDE-Arbeit zu einem Teil der Projektkultur. Teams müssen akzeptieren, dass "schnell per Mail schicken" zwar bequem ist, aber den gemeinsamen Informationsstand beschädigt. Die Plattform ist nur dann wirksam, wenn die relevanten Entscheidungen, Freigaben und Issues dort nachvollziehbar bleiben.

Für Projektleitungen ist das eine Führungsaufgabe. Sie müssen Regeln nicht nur definieren, sondern durchsetzen: Was nicht im ::CDE:: liegt, gilt nicht als geliefert; was keinen Status hat, ist nicht freigegeben; was kein Issue hat, wird nicht verfolgt. Erst dadurch wird die Plattform zum verlässlichen Arbeitsraum.

Gute Kollaboration entsteht also durch technische Plattform, klare Rollen und konsequente Anwendung. Fehlt einer dieser drei Teile, entstehen trotz BIM wieder parallele Dateistände und mündliche Schattenprozesse.

## BIM-Brücke: CDE als Betriebslogik

CDE-Produkte wie BIMcollab, Autodesk Construction Cloud oder Trimble Connect setzen diese Prinzipien unterschiedlich um. Wichtiger als das Produkt ist der Statusworkflow. ::IDS:: kann Informationsanforderungen maschinenlesbar machen und damit ::AIA::/BAP in Prüfregeln übersetzen.

## Zusammenfassung

**Kollaboration braucht kontrollierte Informationsstände, nicht mehr Dateianhänge.**

::CDE::, ::ISO 19650::, Rollen und BCF machen Modellarbeit nachvollziehbar. Gute Prozesse verhindern nicht alle Fehler, aber sie machen sie früh sichtbar und zuständig.

Verwandte Kapitel: [Kap. 19](/chapters/19-hoai-rollen-projektorganisation) · [Kap. 33](/chapters/33-was-bim-wirklich-ist) · [Kap. 37](/chapters/37-bim-praxis)
