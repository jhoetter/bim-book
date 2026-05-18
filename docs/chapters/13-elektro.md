# Kapitel 13 – Elektro & Gebäudeautomation

*Teil IV – TGA*

---

Strom ist im Gebäude leise. Er liegt in Wänden, Schächten, Trassen und Verteilern, bis ein Licht angeht, ein Aufzug fährt oder eine Wärmepumpe startet. Je digitaler Gebäude werden, desto stärker wird Elektroplanung zur Infrastrukturplanung.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Hausanschluss, Zähleranlage und Unterverteilung als Grundsystem beschreiben
    - Leitungsführung, Beleuchtung, PV und Ladeinfrastruktur räumlich einordnen
    - Gebäudeautomation von bloßer Smart-Home-Ausstattung unterscheiden

## 13.1 Elektrische Grundversorgung

Die elektrische Versorgung beginnt am Hausanschlusskasten. Von dort geht sie zur Hauptverteilung und zur Zähleranlage. Im Mehrfamilienhaus gibt es Wohnungszähler, Allgemeinstromzähler und oft separate Messungen für Wärmeerzeugung, PV oder Ladeinfrastruktur. Jede Wohnung hat eine Unterverteilung mit Leitungsschutzschaltern und RCDs, also FI-Schutzschaltern.

Potentialausgleich verbindet leitfähige Teile und reduziert gefährliche Berührungsspannungen. Erdung, Blitzschutz und Überspannungsschutz sind keine dekorativen Zusatzthemen, sondern Sicherheitsinfrastruktur. DIN VDE 0100 bildet den Kern für Niederspannungsanlagen.

<!-- IMAGE
name: kap13_zaehleranlage
type: diagram
size: portrait
desc: Schematischer Elektroverteiler: Hausanschlusskasten, Hauptverteilung, 12 Wohnungszähler, Allgemeinstromzähler, PV-Zähler, Unterverteilungen, RCD und Leitungsschutzschalter. Deutsche Labels, weißer Hintergrund.
caption: Die Zähleranlage ordnet Versorgung und Abrechnung
tags: elektro, zähleranlage, hausanschluss, rcd
-->
![Zähleranlage im Mehrfamilienhaus](../assets/illustrations/kap13_zaehleranlage.png)

## 13.2 Leitungsführung

Leitungen können unter Putz, in Leerrohren, Kabelkanälen, Steigschächten oder Kabeltrassen geführt werden. Unterputz ist im Wohnungsbau üblich, aber später schwer änderbar. Leerrohre schaffen Reserven. Kabeltrassen brauchen Platz und Koordination mit Lüftung, Sprinkler, Heizung und Tragwerk.

Elektro wirkt im Grundriss klein, wird in Summe aber dicht: Steckdosen, Schalter, Daten, Türkommunikation, Rauchwarnmelder, Jalousien, Sensoren, PV, E-Mobilität, Aufzug. Gute Planung bündelt Trassen und hält Revisionsbereiche frei.

## 13.3 Beleuchtungsplanung

Beleuchtung ist Sehen, Sicherheit und Atmosphäre. DIN EN 12464 nennt für Arbeitsstätten Beleuchtungsstärken; Büroarbeitsplätze liegen typischerweise bei 500 lx. Wohnungen werden freier geplant, aber auch dort zählen Blendung, Lichtfarbe, Farbwiedergabe und Schaltbarkeit.

LED-Technik erlaubt effiziente und regelbare Beleuchtung. CCT beschreibt die Farbtemperatur, CRI die Farbwiedergabe. Notbeleuchtung und Rettungszeichen sind brandschutzrelevant, besonders in Treppenhäusern, Tiefgaragen und Fluren.

## 13.4 Schwachstromtechnik

Schwachstrom umfasst Daten, Kommunikation, Sicherheit und Steuerung. Glasfaser und LAN werden zur Grundinfrastruktur. Brandmeldeanlagen, Einbruchmeldeanlagen, Videosprechanlagen, Zutrittssysteme und Rauchwarnmelder brauchen Leitung, Strom, Daten und Wartung.

Aufzugssteuerung ist ein eigenes Elektrothema. Der Aufzug braucht einen separaten Starkstromkreis, häufig 400 V, sowie Notruf nach EN 81-28. Beleuchtung und Notruf müssen bei Ausfall gesichert sein. In Gebäudeklasse 4 ist kein Feuerwehraufzug erforderlich, aber der normale Aufzug muss früh mit Schacht, Steuerung und Technik abgestimmt werden.

## 13.5 Photovoltaik

Photovoltaik erzeugt Strom aus Sonnenlicht. In Deutschland liefert 1 kWp grob 900 bis 1.100 kWh pro Jahr, je nach Standort, Ausrichtung und Verschattung. Wechselrichter wandeln Gleichstrom in Wechselstrom. Eigenverbrauch ist wirtschaftlich interessant, Einspeisung ergänzt.

Flachdächer brauchen Aufständerung, Ballast, Wartungsgänge, Brandschutzabstände und sichere Leitungsführung. PV ist kein nachträgliches Dachmöbel, sondern Last, Elektroanlage und Wartungsfläche. Landesrechtliche Solarpflichten und GEG-Anforderungen erhöhen die Relevanz.

<!-- IMAGE
name: kap13_pv_konzept
type: diagram
size: landscape
desc: Dachdraufsicht Kastanienallee 7 mit PV-Modulen auf Flachdach, Wechselrichter, Zähleranlage, Eigenverbrauch Allgemeinstrom, Einspeisung ins Netz und optional Batteriespeicher. Pfeile und deutsche Labels, weißer Hintergrund.
caption: PV verbindet Dachfläche, Elektroverteilung und Energiemanagement
tags: pv, elektro, flachdach, eigenverbrauch
-->
![PV-Konzept auf dem Flachdach](../assets/illustrations/kap13_pv_konzept.png)

## 13.6 Gebäudeautomation

Gebäudeautomation verbindet Sensoren, Aktoren und Regelungen. KNX ist im deutschen Wohn- und Zweckbau ein verbreiteter Busstandard. BACnet ist im Gewerbe und in der Gebäudeleittechnik wichtig. DALI steuert Beleuchtung. Smart Building bedeutet nicht App-Spielerei, sondern abgestimmte Regelung von Licht, Verschattung, Heizung, Lüftung, Zutritt und Energie.

Energiemanagement wird wichtiger. Smart Meter, PV, Ladepunkte und Wärmeerzeugung müssen Lastspitzen vermeiden. Ein Gebäude mit 10 Ladepunkten braucht nicht automatisch 10 × 22 kW gleichzeitig, sondern Lastmanagement.

!!! kastanienallee "Kastanienallee 7"
    Das elektrische Konzept umfasst 12 Wohnungszähler plus Allgemeinstrom, PV mit 30 kWp auf dem Flachdach, 10 Ladepunkte in der Tiefgarage mit 11 kW je Ladepunkt und Lastmanagement. KNX wird als Grundinstallation für Allgemeinbereiche, Verschattung und Energiezähler vorgesehen. Der Aufzug erhält eigene Einspeisung, Notruf und Schnittstelle zur Wartung.

## 13.7 Elektroplanung als Infrastruktur

Elektro wird im Entwurf oft unterschätzt, weil Leitungen dünn wirken. In Wirklichkeit ist Elektro die Infrastruktur für fast jede spätere Nutzung: Beleuchtung, Kommunikation, Aufzug, Brandschutztechnik, Lüftung, Heizungspumpen, PV, Ladepunkte, Türkommunikation und Gebäudeautomation. Wenn diese Infrastruktur zu spät geplant wird, entstehen sichtbare Kabelkanäle, überfüllte Schächte und teure Nachrüstungen.

Der Zählerplatz ist ein gutes Beispiel. Ein Mehrfamilienhaus mit 12 Wohnungen braucht Wohnungszähler, Allgemeinstrom, PV-Erzeugungszählung, gegebenenfalls Wärmepumpen- oder Ladeinfrastrukturzähler, Kommunikationsfelder und Reserve. Diese Anlage braucht Wandfläche, Brandschutzanforderungen, Zugänglichkeit und kurze Wege zum Hausanschluss. Sie ist kein Schrank, den man beliebig in den Keller stellt.

Leerrohre und Trassen sind strategische Reserven. Niemand weiß in LP 2 sicher, welche Daten-, Sicherheits- und Energiethemen in 15 Jahren relevant sind. Eine nachrüstbare Trasse vom Keller zum Dach und zu Technikflächen ist deshalb oft wertvoller als eine einzelne aktuelle Smart-Home-Funktion. Zukunftsfähigkeit entsteht durch Wege, nicht nur durch Geräte.

PV und Ladeinfrastruktur verbinden Dach, Keller, Tiefgarage und Netzanschluss. Eine 30-kWp-Anlage erzeugt an guten Tagen deutlich mehr Leistung, als der Allgemeinstrom gerade braucht. Wechselrichter, Batteriespeicher, Einspeisemanagement und Lastmanagement für Ladepunkte müssen zusammen gedacht werden. Ohne Lastmanagement können 10 Ladepunkte mit je 11 kW theoretisch 110 kW ziehen; praktisch wird die Leistung gesteuert, damit Netzanschluss und Hausverteilung nicht überdimensioniert werden müssen.

Gebäudeautomation sollte nicht mit Spielerei verwechselt werden. Sinnvoll ist Automation dort, wo sie Betrieb, Energie oder Sicherheit verbessert: Heizungsregelung, Lüftungsstufen, Sonnenschutz, Beleuchtung in Allgemeinflächen, Verbrauchserfassung, Störmeldungen. Je mehr Systeme gekoppelt werden, desto wichtiger werden klare Zuständigkeiten. Ein Bus-System ohne dokumentierte Topologie ist später schwer wartbar.

!!! kastanienallee "Kastanienallee 7"
    Für K7 bedeutet Elektro als Infrastruktur: 12 Wohnungszähler, Allgemeinstrom, PV mit 30 kWp, Aufzugsversorgung 400 V, Notruf, 10 Ladepunkte in der Tiefgarage, Datenanschluss und Reservewege vom Keller bis Dach. Bei 10 Ladepunkten wird nicht 10 × 11 kW als Dauerlast angesetzt, sondern ein dynamisches Lastmanagement geplant. Das muss im Elektroverteiler, im Zählerschrank und in der Datenanbindung abgebildet sein.

## 13.8 Prüffragen für die Praxis

Elektroplanung beginnt mit Lasten und Wegen. Welche Verbraucher haben hohe Leistung? Welche Anlagen sind sicherheitsrelevant? Welche Systeme brauchen Datenverbindungen? Wo liegen vertikale Trassen? Wie wird vom Hausanschluss bis zur letzten Wohnung verteilt? Ohne diese Grundstruktur werden spätere Smart-Building-Ideen nur Einzellösungen.

Sicherheitsstrom und Notfunktionen müssen gesondert betrachtet werden. Aufzugsnotruf, Sicherheitsbeleuchtung, Rauchabzug, Brandmeldekomponenten oder Türsteuerungen dürfen nicht einfach wie normale Steckdosen behandelt werden. Sie brauchen eigene Stromkreise, Überwachung, Batterien oder Redundanz je nach Anforderung. Die Planung muss zeigen, was im Störfall noch funktioniert.

Dateninfrastruktur ist heute Teil der Grundversorgung. Glasfaser bis ins Gebäude, strukturierte Verkabelung, WLAN-Planung in Allgemeinflächen, Zählerkommunikation, PV-Überwachung und Ladepunktmanagement brauchen Platz in Verteilern und Trassen. Funk ersetzt nicht jede Leitung, besonders nicht bei sicherheits- oder betriebsrelevanten Systemen.

Für BIM ist Elektro schwieriger als Architektur, weil viele Objekte klein, zahlreich und logisch verbunden sind. Ein Kabel einzeln zu modellieren ist oft nicht sinnvoll, aber Trassen, Verteiler, Verbraucher, Stromkreise und Assets müssen nachvollziehbar sein. Der Modellzweck entscheidet: Koordination braucht Raum und Trassen, Betrieb braucht Anlagenkennzeichen und Wartungsdaten, Kosten brauchen Mengen und Systeme.

## 13.9 Entwicklerperspektive

Elektro ist in BIM oft weniger sichtbar als Lüftung oder Sanitär, weil Leitungen klein sind und viele Verbindungen logisch statt geometrisch relevant sind. Für Koordination reichen Trassen, Verteiler und Hauptgeräte. Für Betrieb braucht man Stromkreise, Anlagenkennzeichen, Zähler, Wartungsdaten und Kommunikationsbeziehungen. Der Modellzweck entscheidet, wie tief modelliert wird.

Ein Stromkreis ist eine Beziehung. Er verbindet Sicherung, Leitung, Verbraucher und Schutzkonzept. In vielen Modellen wird diese Beziehung nicht vollständig abgebildet. Dann sieht man Leuchten und Steckdosen, kann aber nicht prüfen, welcher Verteiler sie versorgt oder ob Lasten plausibel verteilt sind. Für Smart Building und Betrieb wird diese Lücke größer.

PV, Ladeinfrastruktur und Energiemanagement erhöhen den Datenbedarf. Es reicht nicht zu wissen, dass Ladepunkte vorhanden sind. Man braucht Leistung, Steuerbarkeit, Zählerbezug, Lastmanagement, Netzanschlussgrenze und Nutzerlogik. Ein Gebäude wird dadurch zu einem kleinen Energiesystem.

Für Entwickler liegt der Nutzen in klaren Asset-Strukturen. Jeder relevante elektrische Verbraucher braucht eine ID, Systemzuordnung, Leistungsdaten und Standort. Dann kann ein späteres Dashboard Störungen, Verbräuche und Wartung sinnvoll anzeigen. Ohne diese Struktur bleibt Gebäudeautomation proprietäre Inseltechnik.

Elektroplanung ist zudem stark von Normen und Herstellerdaten geprägt. Ein BIM-Modell sollte deshalb nicht versuchen, jede Schutzberechnung selbst zu ersetzen. Nützlich ist es, die Voraussetzungen bereitzustellen: Leitungslängen, Verbraucherleistungen, Verteilstrukturen, Räume, Brandabschnitte und Anlagenkennzeichen. Die eigentliche elektrotechnische Berechnung bleibt im Fachwerkzeug, kann aber besser angebunden werden.

Ein praktischer Einstieg ist die Trennung von drei Ebenen: Energie, Information und Steuerung. Energie versorgt Verbraucher, Information verbindet Geräte mit Daten, Steuerung löst Aktionen aus. Ein Ladepunkt, ein Präsenzmelder oder ein Lüftungsgerät kann auf allen drei Ebenen vorkommen. Wenn diese Ebenen im Modell vermischt werden, werden spätere Fehlersuche und Betrieb unnötig schwer.

Diese Trennung hilft auch bei Ausschreibung und Betrieb. Energie gehört zum Elektrogewerk, Daten oft zu IT oder Gebäudeautomation, Steuerung zu Systemintegration. Ohne klare Zuordnung entstehen Lücken zwischen Gewerken. Elektroplanung ist daher ein gutes Beispiel dafür, dass technische Systeme organisatorische Schnittstellen erzeugen.

## BIM-Brücke: Elektro als Asset-Struktur

Elektroobjekte können als `IfcElectricDistributionBoard`, `IfcCableSegment`, `IfcLightFixture` oder `IfcSensor` modelliert werden. Für den Betrieb sind nicht nur Geometrie, sondern Stromkreis, Leistung, Wartung, Hersteller und Raumzuordnung relevant. Diese Daten bilden später eine Grundlage für digitale Zwillinge in [Kapitel 24](/chapters/24-digitaler-zwilling-ki).

## Zusammenfassung

**Elektroplanung ist die Infrastruktur für Energie, Sicherheit, Kommunikation und Automation.**

Hausanschluss, Zähler, Leitungen, Beleuchtung, PV, Ladepunkte und Gebäudeautomation greifen ineinander. Je früher die Trassen und Technikflächen geklärt sind, desto weniger Konflikte entstehen im Ausbau.

Verwandte Kapitel: [Kap. 10](/chapters/10-heizung-waermeversorgung) · [Kap. 22](/chapters/22-nachhaltigkeit) · [Kap. 24](/chapters/24-digitaler-zwilling-ki)
