# Kapitel 10 – Heizung & Wärmeversorgung

*Teil IV – TGA*

---

Ein warmer Raum entsteht nicht im Heizkörper. Er entsteht aus einer Kette von Entscheidungen: Hülle, Heizlast, Erzeuger, Verteilung, Regelung und Nutzerverhalten. Wenn eine dieser Entscheidungen nicht passt, wird aus Technik Komfortverlust.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Wärmeerzeuger und Wärmeverteilung als System erklären
    - Fußbodenheizung, Vorlauftemperatur und hydraulischen Abgleich einordnen
    - Heizlast als Verbindung zwischen Gebäudehülle und TGA verstehen

## 10.1 Warum TGA Systemdenken braucht

Heizung gehört zur ::TGA:: und damit zur veränderlichen technischen Schicht des Gebäudes. Sie beeinflusst aber dauerhafte Entscheidungen: Schachtgrößen, Technikräume, Deckenaufbauten, Dachflächen und Fassadenöffnungen. Ein Architekt muss nicht jede Pumpe auslegen, aber er muss früh fragen: Wo steht der Erzeuger? Wo laufen Leitungen? Welche Temperaturen braucht das System? Wie wird gewartet?

In modernen Gebäuden verschiebt sich die Frage. Früher stand oft der Kessel im Mittelpunkt. Heute ist der Wärmeerzeuger nur ein Teil eines Gesamtsystems aus guter Hülle, niedriger Heizlast, niedrigen Vorlauftemperaturen und intelligenter Regelung. Ein schlecht gedämmtes Gebäude zwingt die Technik zu hohen Temperaturen; ein gutes Gebäude ermöglicht effiziente Systeme.

## 10.2 Wärmeerzeuger im Vergleich

Gas- und Ölkessel waren lange Standard, verlieren aber durch Klimaziele und GEG-Anforderungen an Zukunftsfähigkeit. Wärmepumpen nutzen Umweltwärme aus Luft, Erdreich oder Wasser. Eine Luft-Wasser-Wärmepumpe erreicht grob COP 3-4, eine Sole-Wasser-Wärmepumpe oft COP 4-5. Entscheidend ist die Jahresarbeitszahl, also die reale Effizienz über ein Jahr.

Fernwärme liefert Wärme aus einem Netz. Im Gebäude steht keine Verbrennung, sondern eine Übergabestation mit Wärmetauscher. Die ökologische Qualität hängt stark vom Netz und seinem ::Primärenergiefaktor:: ab. Biomasse und Pellets können sinnvoll sein, brauchen aber Lager, Anlieferung, Wartung und Emissionsbetrachtung. Solarthermie ergänzt Warmwasser, konkurriert aber mit PV um Dachfläche.

| System | Investition | Betrieb | CO₂-Tendenz | GEG-Eignung |
|---|---|---|---|---|
| Gas | niedrig bis mittel | abhängig vom Preis | ungünstig | nur eingeschränkt |
| Luft-Wasser-Wärmepumpe | mittel | gut bei niedriger Temperatur | gut bei sauberem Strom | gut |
| Sole-Wasser-Wärmepumpe | hoch | sehr effizient | gut | sehr gut |
| Fernwärme | niedrig bis mittel | netzabhängig | netzabhängig | gut bei gutem Netz |
| Pellets | mittel | Wartung/Lager | biogen, aber Emissionen | fallweise |

<!-- IMAGE
name: kap10_waermeerzeuger_vergleich
type: infographic
size: landscape
desc: Vergleichstabelle der Wärmeerzeuger Gas, Wärmepumpe Luft, Wärmepumpe Sole, Fernwärme, Pellets und Solarthermie. Balken für Investition, Betriebskosten, CO2 und GEG-Eignung. Weißer Hintergrund, deutsche Beschriftungen, technisch-clean.
caption: Wärmeerzeuger unterscheiden sich in Effizienz, Platzbedarf und Zukunftsfähigkeit
tags: heizung, wärmeerzeuger, fernwärme, wärmepumpe
-->
![Wärmeerzeuger im Vergleich](../assets/illustrations/kap10_waermeerzeuger_vergleich.png)

!!! kastanienallee "Kastanienallee 7"
    Kastanienallee 7 nutzt Fernwärme. Dadurch entfallen Kessel, Brennstofflager und Abgasführung; im Keller reicht eine Übergabestation mit Wärmetauscher, Regelung und Pumpengruppen. Verglichen mit einer Luft-Wasser-Wärmepumpe spart das Dach- oder Außenflächen für Außengeräte, macht das Projekt aber abhängig vom Netz. Für den GEG-Nachweis zählt der Primärenergiefaktor des Fernwärmenetzes.

## 10.3 Wärmeverteilung

Heizkörper arbeiten klassisch mit höheren Temperaturen, etwa 70/55 °C im Altbau. Flächenheizungen arbeiten mit niedrigerem Niveau, etwa 35/28 °C. Die **Fußbodenheizung** (::FBH::) verteilt Wärme über große Fläche und ermöglicht niedrige Vorlauftemperaturen. Das passt gut zu Wärmepumpen und gut gedämmten Gebäuden.

Leitungsnetze brauchen Vorlauf und Rücklauf. Je nach Gebäude werden Ring-, Steig- oder Sternsysteme geplant. Heizkreise mit unterschiedlicher Länge und Widerstand würden ohne Abgleich unterschiedlich viel Wasser bekommen. Der **::Hydraulische Abgleich::** stellt Volumenströme so ein, dass alle Räume die berechnete Wärme erhalten. Seit den jüngeren GEG-Anforderungen ist er im Neubau und bei vielen Modernisierungen Pflicht beziehungsweise Stand der Technik.

<!-- IMAGE
name: kap10_heizkreis_schema
type: diagram
size: landscape
desc: Schemadiagramm Fernwärme-Übergabestation im Keller, Pufferspeicher, Pumpengruppen, drei Heizkreisverteiler für Fußbodenheizung, Vorlauf rot und Rücklauf blau, Wärmemengenzähler und Regelventile. Weißer Hintergrund, deutsche Labels.
caption: Wärmeverteilung verbindet Erzeuger, Verteiler und Heizflächen
tags: fernwärme, fbh, hydraulischer-abgleich, heizkreis
-->
![Heizkreisschema](../assets/illustrations/kap10_heizkreis_schema.png)

Das Schema zeigt die Verteilung im Gebäude. Im Raum selbst wird daraus ein Bauteilaufbau: Die Heizrohre liegen im Bodenpaket und müssen mit Estrich, Trittschall, Belag und Raumhöhe koordiniert werden.

<!-- IMAGE
name: kap10_fbh_aufbau
type: section
size: portrait
desc: Querschnitt einer Fußbodenheizung mit Rohdecke, Trittschalldämmung, Systemplatte, Heizrohr, Estrich, Bodenbelag und Temperaturverlauf. Vorlauf und Rücklauf markiert, deutscher Text, weißer Hintergrund.
caption: Fußbodenheizung ist Teil des Decken- und Bodenaufbaus
tags: fbh, estrich, deckenaufbau, vorlauftemperatur
-->
![Aufbau einer Fußbodenheizung](../assets/illustrations/kap10_fbh_aufbau.png)

!!! kastanienallee "Kastanienallee 7"
    Das Heizkonzept hat eine Fernwärme-Übergabestation im Keller und 3 Heizkreise für ::FBH::. Je Wohnung werden Verteiler in Flur- oder Abstellbereichen angeordnet. Der hydraulische Abgleich erfolgt nach Methode B: Heizlast je Raum, Rohrlänge, Verlegeabstand und Volumenstrom werden berechnet. Bei 12 Wohnungen entstehen etwa 60 Heizkreise; schon kleine falsche Einstellungen würden sonst Komfortbeschwerden erzeugen.

## 10.4 Warmwasserbereitung

Warmwasser kann zentral oder dezentral erzeugt werden. Zentrale Speicher brauchen hohe Temperaturen, Zirkulation und Hygieneüberwachung. Legionellenrisiken werden durch Temperatur, Volumen, Stagnationsvermeidung und regelmäßigen Austausch beherrscht. Die 60-°C-Regel ist ein bekannter Orientierungswert für zentrale Systeme.

Dezentrale Frischwasserstationen oder Durchlauferhitzer reduzieren Speicher- und Stagnationsrisiken, brauchen aber Leistung und Platz. Im Geschosswohnungsbau ist die Entscheidung eng mit Schächten, Abrechnung, Wartung und Nutzerkomfort verbunden.

## 10.5 Dimensionierung als Konzept

Die Heizlastberechnung nach DIN EN 12831 ermittelt, welche Leistung ein Raum am kältesten Auslegungstag braucht. Sie setzt sich aus Transmissionswärmeverlusten und Lüftungswärmeverlusten zusammen. Ein Neubau nach heutigem Standard liegt oft bei 25-35 W/m², ein unsanierter Altbau bei 60-100 W/m² oder mehr.

Damit verbindet die Heizlast [Kapitel 6](/chapters/06-waermeschutz-geg) mit der Technik. Je besser Hülle, Luftdichtheit und Lüftung, desto kleiner werden Heizflächen, Leitungen und Erzeuger. Überdimensionierung ist kein Sicherheitsgewinn: Sie kostet Geld, verschlechtert Regelverhalten und kann Effizienz senken.

## 10.6 Planungsfragen vor der Gerätewahl

In frühen Projektbesprechungen wird häufig zu schnell über Geräte gesprochen: Wärmepumpe oder Fernwärme, Speichergröße, Hersteller, Regelung. Vorher müssen einfachere Fragen geklärt sein. Wie hoch ist die Heizlast? Welche Vorlauftemperatur ist realistisch? Gibt es genug Platz für Technik, Verteiler und Wartung? Wo laufen Steigleitungen? Wie wird Warmwasser hygienisch erzeugt? Wer betreibt die Anlage später?

Die Vorlauftemperatur ist dabei der Schlüssel. Eine Wärmepumpe kann technisch hohe Temperaturen liefern, aber ihre Effizienz fällt. Eine Fußbodenheizung mit niedriger Temperatur braucht eine gut gedämmte Hülle und ausreichend Verlegefläche. Ein Raum mit großer Glasfläche, wenig Bodenfläche und hohem Komfortanspruch kann zur Engstelle werden. Deshalb gehören Heizlast und Grundriss zusammen.

Wartung ist ebenfalls Entwurf. Eine Fernwärmestation braucht Zugang, Abstand vor Regelgruppen, Platz für Wärmemengenzähler und eine klare Leitungsführung. Verteiler in Wohnungen müssen erreichbar bleiben, dürfen aber den Wohnwert nicht stören. Schächte müssen so liegen, dass Vor- und Rücklauf nicht unnötig lang werden. Lange Leitungswege erhöhen Wärmeverluste, Kosten und Reaktionszeiten.

Warmwasser wird oft unterschätzt. Im Mehrfamilienhaus ist nicht nur die Energiemenge relevant, sondern Hygiene und Abrechnung. Zentrale Systeme brauchen Zirkulation, Dämmung, Temperaturhaltung und regelmäßige Kontrolle. Dezentrale Systeme reduzieren manche Hygienerisiken, verlagern aber Leistung und Wartung in die Wohnung. Die richtige Lösung hängt von Betreiber, Nutzerstruktur und Schachtkonzept ab.

Regelung entscheidet schließlich, ob ein gutes System gut funktioniert. Ein hydraulisch nicht abgeglichenes Netz kann einzelne Wohnungen überversorgen und andere unterversorgen. Nutzer drehen dann Thermostate hoch, Pumpen laufen stärker, Rücklauftemperaturen steigen und Effizienz sinkt. Die Technik wird nicht besser, weil sie größer ist; sie wird besser, wenn Volumenströme, Temperaturen und Regelstrategie zur berechneten Last passen.

!!! kastanienallee "Kastanienallee 7"
    Für K7 lautet die frühe Prüffolge: Heizlast je Raum berechnen, Fußbodenheizungsflächen prüfen, Verteilerstandorte je Wohnung festlegen, Steigleitungen im Kern bündeln, Fernwärmestation im Keller mit Wartungsfläche anordnen. Bei 60 Heizkreisen bedeutet ein Planungsfehler von nur 0,2 l/min je Kreis bereits 12 l/min falschen Gesamtvolumenstrom. Der hydraulische Abgleich ist deshalb kein Formular, sondern Betriebsqualität.

## 10.7 Prüffragen für die Praxis

Vor der Festlegung des Heizsystems sollte ein Planungsteam die Heizlast, die gewünschte Vorlauftemperatur, den Warmwasserbedarf und die Betriebsstrategie getrennt prüfen. Ein System kann für Raumheizung sehr effizient sein und bei Warmwasser ungünstig werden. Eine Wärmepumpe kann zur Hülle passen, aber am Schall, am Platz für Außengeräte oder am Stromanschluss scheitern. Fernwärme kann technisch einfach sein, aber abhängig von Netzpreisen und Netzdekarbonisierung.

Die Rücklauftemperatur ist ein guter Qualitätsindikator. Niedrige Rückläufe verbessern Wärmepumpen, Fernwärmeauskühlung und Brennwertnutzung. Hohe Rückläufe zeigen oft falsche Volumenströme, zu kleine Heizflächen oder schlechte Regelung. Deshalb darf der hydraulische Abgleich nicht als einmalige Pflicht verstanden werden; er ist die Grundlage für stabile Betriebswerte.

Für die Planungspraxis gilt: Technikflächen brauchen Reserve. Ein Technikraum, der nur im Grundriss passt, aber keine Wartungsflächen, keine Türbreiten und keine Austauschwege hat, ist schlecht geplant. Geräte müssen in das Gebäude hineinkommen und später wieder heraus. Filter, Pumpen, Wärmetauscher, Speicher und Ventile müssen zugänglich bleiben. Diese banale Zugänglichkeit entscheidet im Betrieb über Kosten.

## 10.8 Entwicklerperspektive

Heizungsdaten sind ein gutes Beispiel für Systembeziehungen. Ein Rohrstück allein sagt wenig. Entscheidend ist, zu welchem System es gehört, welche Richtung der Volumenstrom hat, welche Temperatur angesetzt wird, welcher Raum versorgt wird und welches Gerät die Wärme liefert. Ein MEP-Modell muss daher Netze abbilden, nicht nur Bauteile.

Für Software ist die Verbindung zwischen Raum und Heizlast zentral. Räume aus dem Architekturmodell liefern Fläche, Volumen, Nutzung und Hüllflächenbezug. Daraus entsteht eine Heizlast. Diese Heizlast bestimmt Heizflächen und Volumenströme. Wenn Räume später geteilt, zusammengelegt oder anders genutzt werden, muss die Technikprüfung reagieren. Ohne stabile Raum-IDs bricht diese Kette.

Auch Betriebsdaten können zurückfließen. Soll-Vorlauf, Ist-Vorlauf, Rücklauf, Pumpenleistung, Ventilstellung und Raumtemperatur zeigen, ob das System wie geplant läuft. Im Neubau reicht ein as-planned-Modell; im Betrieb braucht man ein as-operated-Verständnis. Das ist der Übergang zum digitalen Zwilling in [Kapitel 24](/chapters/24-digitaler-zwilling-ki).

Ein gutes Prüfwerkzeug für Heizung meldet daher nicht nur Kollisionen. Es fragt: Hat jeder beheizte Raum eine Heizlast? Ist jeder Heizkreis einem Raum zugeordnet? Sind Verteiler zugänglich? Sind Leitungen im richtigen System? Stimmen Vor- und Rücklauf? Sind Dämmungen an Leitungen vorgesehen? Solche Prüfungen sparen spätere Sucharbeit.

## BIM-Brücke: Heizung als MEP-Modell

Im IFC-Modell werden Heizungsbauteile als technische Komponenten geführt, etwa `IfcPipeSegment`, `IfcValve`, `IfcPump` oder `IfcHeatExchanger`. Räume können Heizlasten als Properties tragen. Kollisionsprüfung zeigt, ob Heizleitungen, Verteiler und Schachtführungen mit Tragwerk und Ausbau zusammenpassen. Die IFC-Struktur wird in [Kapitel 18](/chapters/18-ifc) vertieft.

## Zusammenfassung

**Heizung funktioniert effizient, wenn Gebäudehülle, Erzeuger, Verteilung und Regelung gemeinsam geplant werden.**

Niedrige Vorlauftemperaturen, hydraulischer Abgleich und passende Heizlast sind wichtiger als die reine Gerätewahl. Gute Heizungsplanung beginnt im Entwurf, nicht erst im Technikraum.

Verwandte Kapitel: [Kap. 1](/chapters/01-architektur-als-system) · [Kap. 5](/chapters/05-konstruktion) · [Kap. 6](/chapters/06-waermeschutz-geg) · [Kap. 11](/chapters/11-lueftung)
