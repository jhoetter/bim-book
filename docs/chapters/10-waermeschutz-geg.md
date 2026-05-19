# Kapitel 10 – Wärmeschutz & GEG

*Teil III – Bauphysik*

---

Ein gut gedämmtes Gebäude merkt man nicht daran, dass die Wand dick aussieht. Man merkt es an warmen Innenoberflächen, kleinen Heizkörpern, niedrigen Vorlauftemperaturen und daran, dass Räume auch an kalten Tagen ruhig bleiben. Wärmeschutz ist unsichtbar, aber er bestimmt Komfort, Energiebedarf und Technik.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Wärmeverluste über Bauteile, Lüftung und Wärmebrücken unterscheiden
    - den U-Wert eines mehrschichtigen Bauteils mit R-Werten berechnen
    - die Grundlogik des GEG-Nachweises einordnen

## 10.1 Wärmetransport

Wärme verlässt ein Gebäude auf drei Hauptwegen. Transmission ist Wärmefluss durch Bauteile: Wand, Dach, Boden, Fenster. Lüftungswärmeverluste entstehen, wenn warme Innenluft gegen kalte Außenluft ausgetauscht wird. Wärmebrücken sind lokale Schwachstellen, an denen mehr Wärme abfließt als in der umgebenden Fläche.

Das A/V-Verhältnis aus [Kapitel 6](/chapters/06-plaene-raum-funktion-entwurfslogik) wirkt direkt auf Transmission. Ein kompakter Baukörper hat weniger Hüllfläche pro Volumen und damit weniger Verlustfläche. Dämmung verbessert jede Fläche, aber sie kann eine ungünstige Geometrie nicht vollständig wegzaubern.

Der zentrale Kennwert ist der **::U-Wert::**. Er beschreibt, wie viel Wärmeleistung pro Quadratmeter Bauteilfläche und Kelvin Temperaturdifferenz hindurchgeht. Je kleiner der ::U-Wert::, desto besser. Fenster mit U = 0,90 W/(m²K) verlieren bei gleicher Fläche mehr Wärme als eine ::Außenwand:: mit U = 0,19 W/(m²K).

## 10.2 U-Wert: Berechnung

Der ::U-Wert:: wird über Widerstände berechnet. Jede Schicht hat einen **::R-Wert::**, also einen Wärmedurchgangswiderstand. Er ergibt sich aus Dicke geteilt durch Wärmeleitfähigkeit: ^^r-wert^^. Die Widerstände aller Schichten werden addiert, dazu kommen innere und äußere Wärmeübergangswiderstände. Der ::U-Wert:: ist der Kehrwert der Summe: ^^u-wert^^.

Eine dickere Dämmung erhöht den Widerstand, aber nicht linear den Nutzen. Die ersten Zentimeter sparen viel, spätere Zentimeter weniger. Das ist kein Argument gegen gute Dämmung, sondern ein Hinweis auf Optimierung: Material, Fläche, Kosten, CO₂ und Heizsystem müssen gemeinsam betrachtet werden.

| Dämmstärke WLG 035 | R Dämmung | Überschlägiger U-Wert Wand | Wirkung |
|---:|---:|---:|---|
| 100 mm | 2,86 m²K/W | ca. 0,31 W/(m²K) | Mindestniveau kaum robust |
| 150 mm | 4,29 m²K/W | ca. 0,21 W/(m²K) | guter Neubauwert |
| 200 mm | 5,71 m²K/W | ca. 0,16 W/(m²K) | sehr gute Hülle |
| 250 mm | 7,14 m²K/W | ca. 0,13 W/(m²K) | sinkender Zusatznutzen |

<!-- IMAGE
name: kap06_u_wert_berechnung
type: diagram
size: landscape
desc: Schichtdiagramm einer K7-Außenwand mit Innenputz, Stahlbeton 200 mm, Mineralwolle WLG 035 160 mm und Putzsystem. Rechts daneben tabellarischer Rechenweg d/Lambda je Schicht, Summe R und U-Wert. Deutsche Beschriftungen, weißer Hintergrund, technisch-clean.
caption: U-Wert-Berechnung einer mehrschichtigen Außenwand
tags: u-wert, r-wert, mineralwolle, wärmeschutz
-->
![U-Wert-Berechnung](../assets/illustrations/kap06_u_wert_berechnung.png)

!!! kastanienallee "Kastanienallee 7"
    Vereinfachte Rechnung ::Außenwand:: Innenübergang Rsi = 0,13 m²K/W, Außenübergang Rse = 0,04 m²K/W. ::Beton:: 200 mm mit λ = 2,10 W/(mK): R = 0,200 / 2,10 = 0,095 m²K/W. ::Mineralwolle:: WLG 035, 160 mm: R = 0,160 / 0,035 = 4,57 m²K/W. Putzschichten zusammen vereinfacht R = 0,03 m²K/W. Gesamt R = 0,13 + 0,095 + 4,57 + 0,03 + 0,04 = 4,865 m²K/W. U = 1 / 4,865 = 0,206 W/(m²K). Mit optimierten Produktwerten und Detailansatz liegt der Zielwert des Projekts bei rund 0,19 W/(m²K).

## 10.3 Wärmebrücken

Eine **::Wärmebrücke::** ist eine Stelle mit erhöhtem Wärmestrom. Geometrische Wärmebrücken entstehen an Ecken, weil außen mehr Fläche abkühlt als innen erwärmt wird. Konstruktive Wärmebrücken entstehen durch Materialwechsel oder Durchdringungen: Balkonplatten, Fensterlaibungen, Attiken, Sockel, Rollladenkästen.

Wärmebrücken haben zwei Folgen. Erstens erhöhen sie den Energieverlust. Zweitens senken sie die Innenoberflächentemperatur. Wird eine Oberfläche kalt, steigt dort die relative Luftfeuchte; ab einem kritischen Punkt drohen Schimmel und Tauwasser. Der lineare Wärmebrückenkoeffizient Ψ beschreibt den zusätzlichen Verlust je Meter Anschluss.

<!-- IMAGE
name: kap06_waermebruecken
type: comparison
size: landscape
desc: Drei Detailschnitte klassischer Wärmebrücken nebeneinander: Balkonplatte, Fensterlaibung und Außenwandecke. Wärmestrompfeile und kalte Innenoberflächen farblich markiert, deutsche Labels, weißer Hintergrund, technisch-clean.
caption: Wärmebrücken entstehen besonders an Anschlüssen und Durchdringungen
tags: wärmebrücke, balkon, fenster, außenwandecke
-->
![Typische Wärmebrücken](../assets/illustrations/kap06_waermebruecken.png)

## 10.4 GEG 2024 im Überblick

Das **Gebäudeenergiegesetz** (::GEG::) regelt energetische Anforderungen an Gebäude. Es betrachtet nicht nur einzelne Bauteile, sondern das Gesamtgebäude. Zwei Größen sind zentral: der Primärenergiebedarf und der Transmissionswärmeverlust.

Der **::Transmissionswärmeverlust::** beschreibt den Wärmeverlust über die Hüllflächen, vereinfacht als Summe aus U-Wert × Fläche × Korrekturfaktor. Der **::Primärenergiefaktor::** beschreibt, wie viel vorgelagerte Energie für einen Energieträger aufgewendet wird. Fernwärme, Strom, Gas und Biomasse haben unterschiedliche Faktoren. Deshalb kann ein Gebäude mit gleicher Hülle je nach Energieträger unterschiedlich bewertet werden.

Der GEG-Nachweis arbeitet mit einem Referenzgebäude. Das geplante Gebäude wird mit einem rechnerischen Standardgebäude gleicher Geometrie verglichen. Der Energieausweis kann als Bedarfsausweis oder Verbrauchsausweis erstellt werden; im Neubau zählt der Bedarf. Klassen von A+ bis H machen die Ergebnisse für Nutzer lesbar, ersetzen aber nicht die Berechnung.

<!-- IMAGE
name: kap06_geg_anforderungen
type: infographic
size: portrait
desc: Infografik GEG-Anforderungslogik mit Referenzgebäude, Primärenergiebedarf Qp, Transmissionswärmeverlust H'T, Bauteil-U-Werten und Energieausweis-Klassen A+ bis H. Weißer Hintergrund, deutsche Labels, klare Pfeile.
caption: Das GEG bewertet Hülle und Anlagentechnik gemeinsam
tags: geg, primärenergiefaktor, transmissionswärmeverlust, energieausweis
-->
![GEG-Anforderungslogik](../assets/illustrations/kap06_geg_anforderungen.png)

!!! kastanienallee "Kastanienallee 7"
    Das Leitbeispiel erreicht einen Primärenergiebedarf von 45 kWh/(m²a). Die Hülle kombiniert ::Außenwand:: U ≈ 0,19 W/(m²K), ::Flachdach:: U ≈ 0,17 W/(m²K), Fenster U ≈ 0,90 W/(m²K) und kompakte Geometrie mit A/V ≈ 0,38 m⁻¹. Nachgebessert wurde vor allem an Fensteranschlüssen, Dachrand und Schachtbereichen, weil dort Wärmebrücken den rechnerischen Vorteil guter Flächenbauteile sonst schwächen.

## 10.5 Sommerlicher Wärmeschutz

Wärmeschutz bedeutet nicht nur Heizen im Winter. Im Sommer soll ein Gebäude nicht überhitzen. Große Fensterflächen nach Süden und Westen können hohe solare Gewinne bringen. Ohne außenliegenden Sonnenschutz, Speichermasse und Nachtlüftung wird aus guter Belichtung schnell ein Komfortproblem.

Der Sonneneintragskennwert beschreibt vereinfacht, wie viel solare Wärme in einen Raum gelangt. Außenliegender Sonnenschutz ist wirksamer als innenliegender, weil Wärme gar nicht erst in den Raum kommt. Massive Bauteile können Wärme puffern, wenn sie nachts wieder abkühlen. Eine gut gedämmte Hülle hilft im Sommer nur dann, wenn solare Gewinne kontrolliert werden.

## 10.6 Was man im Entwurf früh prüfen muss

Der häufigste Fehler beim Wärmeschutz ist die späte Optimierung einzelner Bauteile. Dann wird eine ::Außenwand:: dicker, ein Fenster besser oder ein Wärmeerzeuger effizienter, aber die grundsätzlichen Verluste sind längst durch Geometrie, Orientierung und Anschlussdetails festgelegt. Früh wirksam sind andere Fragen: Wie kompakt ist der Baukörper? Wie groß ist der Fensteranteil je Orientierung? Wo liegen Balkone, Loggien, Attiken, Sockel und auskragende Bauteile? Wie viele Schächte und Durchdringungen schneiden die Hülle?

Fenster sind ein gutes Beispiel. Große Verglasungen liefern Tageslicht, Ausblick und solare Gewinne. Gleichzeitig haben sie deutlich höhere ::U-Wert::-Werte als opake Bauteile und sind im Sommer kritisch. Ein Fenster mit U = 0,90 W/(m²K) ist gut, verliert aber immer noch etwa das Vier- bis Fünffache einer sehr guten ::Außenwand::. Deshalb muss die Frage nicht lauten, ob Fenster gut oder schlecht sind, sondern ob Größe, Orientierung, Verschattung und Lüftbarkeit zusammenpassen.

Der Anschluss ist dabei oft wichtiger als der Produktwert. Ein Fenster kann auf dem Datenblatt gut sein und im Gebäude schlecht wirken, wenn es zu weit innen oder außen sitzt, die Laibung ungedämmt bleibt oder der Rollladenkasten die Dämmebene unterbricht. Ähnliches gilt für Attiken: Die Dachabdichtung, die Wärmedämmung und die Fassadendämmung müssen dort als durchgehendes System geplant werden. Ein pauschaler Flächen-U-Wert sagt über diese Punkte wenig aus.

Für die Kostenseite hilft eine Grenznutzenbetrachtung. Von 8 cm auf 16 cm Dämmung verbessert sich die Hülle stark. Von 24 cm auf 32 cm sinkt der zusätzliche Energiegewinn deutlich, während Material, Fensterlaibungen, Dachranddetails und Flächenverluste zunehmen. In einem Fachbuch über BIM ist genau diese Abwägung interessant: Ein Modell kann Varianten schnell vergleichen, wenn Geometrie, Bauteilschichten und Kennwerte sauber gepflegt sind.

Der GEG-Nachweis sollte daher nicht erst am Ende als Pflichtdokument entstehen. Schon in der Vorplanung kann eine einfache Bilanz zeigen, ob der Entwurf robust ist. Robust bedeutet: kleine Änderungen an Fenstern, Technik oder Wärmebrücken bringen das Projekt nicht sofort unter die Anforderung. Ein Entwurf, der nur mit optimistischen Annahmen besteht, wird in späteren Leistungsphasen anfällig für Nachträge und Umplanung.

!!! kastanienallee "Kastanienallee 7"
    Für Kastanienallee 7 ist der robuste Ansatz: kompakter Vierspänner, A/V ≈ 0,38 m⁻¹, außenliegende Dämmung ohne auskragende Balkonplatten, Fernwärme mit günstigem Primärenergiefaktor und kontrollierte Lüftung. Kritische Details bleiben Dachrand, Fensterlaibung, Sockel und Schachtbereiche. Wenn dort je 0,03 bis 0,05 W/(m²K) rechnerisch verloren gehen, kann der gute Flächenwert der Wand nicht einfach als Sicherheitsreserve betrachtet werden.

## 10.7 Prüffragen für die Praxis

Vor dem GEG-Nachweis sollten drei einfache Prüffragen beantwortet sein. Erstens: Sind alle Hüllflächen eindeutig erfasst, also ::Außenwand::, Dach, Kellerdecke, Bodenplatte, Fenster, Türen und Wärmebrücken? Zweitens: Sind die Flächenwerte plausibel, oder entstehen aus dem Modell doppelte oder fehlende Flächen? Drittens: Sind die technischen Systeme mit realistischen Temperaturen, Wirkungsgraden und Primärenergiefaktoren angesetzt?

Gerade für Softwareentwickler ist wichtig: Energetische Berechnung ist keine reine Geometrieaufgabe. Zwei Bauteile können gleich aussehen und thermisch verschieden sein, wenn Schichten, Feuchte, Anschlüsse oder Produktwerte unterschiedlich sind. Umgekehrt kann ein detailreiches Modell energetisch unbrauchbar sein, wenn die Bauteile keine thermischen Eigenschaften tragen. Die Datenqualität entscheidet, ob ein Export in Energieprogramme Zeit spart oder zusätzliche Fehler erzeugt.

## BIM-Brücke: Energetische Daten im Modell

Für energetische Auswertungen müssen Bauteile ihre thermischen Kennwerte tragen. `Pset_WallCommon.ThermalTransmittance` kann den ::U-Wert:: einer Wand speichern. gbXML-Exporte übertragen Geometrie und Räume in Energiesimulationssoftware. GEG-Programme nutzen heute oft noch bereinigte Eingaben statt direkter BIM-Übernahme, aber die Richtung ist klar: Je besser Räume, Flächen, Schichten und Materialien gepflegt sind, desto weniger manuelle Nacharbeit entsteht.

## Zusammenfassung

**Wärmeschutz ist das Zusammenspiel aus Hüllfläche, Schichtwiderständen, Wärmebrücken, Lüftung und Anlagentechnik.**

Der ::U-Wert:: erklärt die Fläche, die ::Wärmebrücke:: den Anschluss, das ::GEG:: das Gesamtgebäude. Gute Planung verbindet Konstruktion aus [Kapitel 9](/chapters/09-konstruktion), Feuchte aus [Kapitel 11](/chapters/11-feuchteschutz) und Heizung aus [Kapitel 14](/chapters/14-heizung-waermeversorgung).

Verwandte Kapitel: [Kap. 6](/chapters/06-plaene-raum-funktion-entwurfslogik) · [Kap. 9](/chapters/09-konstruktion) · [Kap. 11](/chapters/11-feuchteschutz) · [Kap. 14](/chapters/14-heizung-waermeversorgung)
