# Kapitel 2 – Entwurf, Raum und Funktion

*Teil I – Fundament · ~25 Seiten*

---

Grundrissplanung ist keine freie Kunst. Sie folgt Logik: der Logik menschlicher Bewegung, gesetzlicher Mindestmaße, bautechnischer Randbedingungen und wirtschaftlicher Grundstücksausnutzung. Wer verstehen will, warum ein Grundriss so aussieht wie er aussieht, muss diese Schichten kennen.

## Raum als Grundeinheit

Jedes Gebäude lässt sich auf seine Räume herunterbrechen. Ein Raum ist nicht nur eine umschlossene Fläche – er hat eine Funktion, eine Proportion, eine Belichtungsanforderung und eine Beziehung zu anderen Räumen.

Die **Raumtypologie** unterscheidet nach Nutzung:

| Raumtyp | Typische Tiefe | Belichtung | Normmaß |
|---|---|---|---|
| Wohnzimmer | 4,5–6,0 m | Süd/West | min. 12 m² |
| Schlafzimmer | 3,0–4,5 m | beliebig | min. 10 m² |
| Küche | 2,5–3,5 m | beliebig | min. 8 m² |
| Bad | 1,8–2,5 m | Dunkelküche möglich | min. 4 m² |
| Erschließung/Flur | 1,2–1,5 m | — | min. 1,0 m Breite |

Ernst Neufert hat diese Normmaße in den *Bauentwurfslehren* (seit 1936, heute 43. Auflage) systematisiert. Sie sind kein Gesetz, aber de-facto-Standard in deutschen Architekturbüros.

## Erschließung organisieren

Der Grundriss entscheidet, wie Menschen von A nach B gelangen. Man unterscheidet:

- **Horizontale Erschließung**: Flure, Dielen, Hallen – verbinden Räume auf einer Ebene
- **Vertikale Erschließung**: Treppen, Aufzüge – verbinden Geschosse
- **Außenerschließung**: Laubengänge, außenliegende Treppenhäuser

Ein guter Grundriss minimiert die Erschließungsfläche. Als Daumenmaß gilt: Erschließung sollte nicht mehr als 15–20 % der Brutto-Grundrissfläche ausmachen. Jeder Quadratmeter Flur kostet Geld und bringt keinen Nutzen.

!!! tip "Neufert-Regel"
    Treppen im Wohnungsbau: min. 80 cm Laufbreite, min. 17,5 cm Setzstufe, max. 26 cm Auftritt. Barrierefreie Treppen nach DIN 18040-1: min. 100 cm Laufbreite, Handlauf beidseitig, 17/29-Stufenverhältnis.

## Kastanienallee 7 – Erdgeschoss-Grundriss

Das Erdgeschoss von Kastanienallee 7 zeigt eine typische Mehrfamilienhaus-Struktur: zentrales Treppenhaus, drei Wohnungen je Geschoss, alle Wohnräume zur Straße oder zum Garten orientiert, Bäder und Küchen zur Mitte.

![Erdgeschoss-Grundriss Kastanienallee 7 mit drei Wohnungen und zentralem Treppenhaus](/assets/illustrations/kap02_grundriss_eg.png)

Die Tragwände (grau) folgen einem orthogonalen Raster von 4,80 m. Dieses Raster ist kein Zufall: Es entspricht der wirtschaftlichsten Spannweite für eine Stahlbetondecke ohne Unterzüge (Faustformel: Spannweite ≤ Deckendicke × 30).

## Flächen berechnen: DIN 277

Die Flächenberechnung nach DIN 277 ist verbindlich für Kostenermittlungen, Mietverträge und Förderprogramme. Die wichtigsten Begriffe:

**Brutto-Grundrissfläche (BGF)** = gesamte Grundrissfläche aller Geschosse, gemessen an der Außenkante der Außenwände. Enthält alle Konstruktionsflächen.

**Netto-Raumfläche (NRF)** = BGF minus Konstruktionsfläche (KF). Teilt sich auf in:
- **NUF** – Nutzungsfläche (tatsächlich nutzbare Fläche)
- **TF** – Technikfläche (Heizung, Lüftung, Aufzugsschacht)
- **VF** – Verkehrsfläche (Flure, Treppen, Aufzugsvorräume)

Der Verhältniswert **NUF/BGF** liegt im guten Wohnungsbau bei 0,75–0,80. Darunter ist der Grundriss unwirtschaftlich.

!!! note "Wohnfläche ≠ Nutzfläche"
    Die **Wohnfläche** nach Wohnflächenverordnung (WoFlV) ist kleiner als die NUF: Balkone zählen nur zu 25–50 %, Räume unter 1 m Höhe gar nicht. Für den Mietvertrag gilt die WoFlV, für Kostenermittlungen die DIN 277.

## Barrierefreiheit: DIN 18040

Neubauten müssen in Deutschland rollstuhlgerecht geplant werden, wenn sie öffentlich zugänglich sind oder dem Geschosswohnungsbau dienen (Landesbauordnungen regeln den genauen Geltungsbereich). DIN 18040-2 (Wohnungen) definiert Mindestmaße:

- Bewegungsfläche vor Sanitärobjekten: 120 × 120 cm
- Türöffnungsmaß: min. 90 cm lichtes Maß
- Stufenfreiheit im Eingangsbereich
- Aufzugsgrundfläche: min. 110 × 140 cm (Kabine)

---

!!! tip "BIM-Brücke"
    `IfcSpace` ist die IFC-Entität für einen Raum. Über `Pset_SpaceCommon` (Properties: `GrossFloorArea`, `NetFloorArea`, `OccupancyType`) lassen sich Raumflächen nach DIN 277 direkt aus dem Modell berechnen. Das **Raumprogramm** wird als `IfcSpaceType` modelliert und bildet die Grundlage für die frühzeitige Kostenschätzung nach DIN 276. Barrierefreiheits-Checks laufen als automatisierte Modellprüfung (Model Checker) gegen vordefinierte Regelwerke.
