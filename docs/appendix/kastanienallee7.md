# Kastanienallee 7

Das fiktive Mehrfamilienhaus in einer bayerischen Mittelstadt dient als Leitbeispiel durch das gesamte Buch. Es ist kein Sonderbau — sondern bewusst typisch: wirtschaftlicher Stahlbeton-Skelettbau, GEG-konform, mit vollständiger TGA und einem BIM-Modell das alle Gewerke verbindet.

![Grundriss Erdgeschoss, M 1:100](../assets/illustrations/kap02_grundriss_eg.png)

Je Geschoss vier Wohnungen (2-, 3- und 4-Zimmer) um ein zentrales Treppenhaus, auf 20 × 18 Metern Grundfläche nahezu quadratisch. Diese Kompaktheit minimiert das A/V-Verhältnis und damit den Transmissionswärmeverlust.

## Kenndaten

Der Gebäudetyp entspricht der häufigsten Neubauform im deutschen Wohnungsbau: freistehendes MFH, Gebäudeklasse 4, barrierefrei erschlossen.

| Merkmal | Wert |
|---------|------|
| Gebäudetyp | Mehrfamilienhaus (MFH) |
| Standort | Bayern, Mittelstadt (~50.000 EW) |
| Baujahr (fiktiv) | 2025 |
| Geschosse | 4 Vollgeschosse + Keller + Dachgeschoss |
| Wohneinheiten | 12 (je 4 pro Geschoss) |
| Bruttogrundfläche | ca. 1.800 m² |
| Bebaute Fläche | ca. 20 × 18 m = 360 m² |
| Bauweise | Stahlbeton-Skelett mit Ziegelausfachung |
| Dach | Flachdach, extensiv begrünt (80 mm), PV-Anlage 30 kWp |
| Erschließung | 1 Treppenhaus, 1 Aufzug (Barrierefreiheit GK 4) |

Grundlagen der Gebäudetypologie: [Kap. 1](/chapters/01-architektur-als-system) · Entwurf und Grundrissorganisation: [Kap. 2](/chapters/02-entwurf-raum-funktion)

## Wohnungsschlüssel

Vier Wohnungen pro Geschoss mit drei Typen — das ergibt über alle vier Vollgeschosse 12 Einheiten und eine ausgewogene Mischung für den Mietwohnungsmarkt.

| Typ | Anzahl | Fläche | Lage |
|-----|--------|--------|------|
| 2-Zimmer-Wohnung | 4 | je ca. 55 m² | Straßen- oder Hofseite |
| 3-Zimmer-Wohnung | 4 | je ca. 75 m² | Ecklage mit 2 Orientierungen |
| 4-Zimmer-Wohnung | 4 | je ca. 95 m² | Südausrichtung bevorzugt |

## Energetische Kennwerte

| Bauteil | U-Wert (W/m²K) | Aufbau |
|---------|---------------|--------|
| Außenwand WDVS | **0,19** | Beton 200 mm + Mineralwolle WLG 035, 160 mm |
| Flachdach | **0,17** | Stahlbetondecke + EPS 160 mm |
| Bodenplatte | 0,28 | Beton + EPS 120 mm |
| Fenster | 0,90 | 3-Scheiben-Wärmeschutzverglasung |
| Haustür | 1,10 | Gedämmte Aluminiumtür |

Primärenergiebedarf: **45 kWh/(m²a)** (Nachweis nach GEG, Referenzgebäudeverfahren).

U-Wert-Berechnung Schritt für Schritt: [Kap. 6](/chapters/06-waermeschutz-geg) · Feuchteschutz Glaser-Verfahren: [Kap. 7](/chapters/07-feuchteschutz)

## TGA-Übersicht

- **Wärmeversorgung:** Fernwärme, Übergabestation im Keller, 3 Heizkreise Fußbodenheizung
- **Lüftung:** KWL dezentral je Wohnung (Luftwechselrate 0,5 h⁻¹), Wärmerückgewinnung η = 85 %
- **Warmwasser:** Dezentrale Frischwasserstationen je Wohnung (kein Legionellenproblem durch < 3 L Inhalt)
- **Elektro:** Hausanschluss 3 × 63 A, 12 Wohnungszähler + Allgemeinstrom
- **E-Mobilität:** 10 Ladepunkte Tiefgarage (22 kW), KfW-433-gefördert
- **PV:** 30 kWp Flachdach, Eigenverbrauch Allgemeinstrom, Überschuss Einspeisung

Heizung und Fernwärme: [Kap. 10](/chapters/10-heizung-waermeversorgung) · Lüftung KWL: [Kap. 11](/chapters/11-lueftung) · Sanitär Frischwasser: [Kap. 12](/chapters/12-sanitaer) · Elektro: [Kap. 13](/chapters/13-elektro)

## BIM-Modell

Das IFC-Modell umfasst alle Gewerke in einer gemeinsamen räumlichen Struktur: 6 Geschosse, ~80 Räume, vollständige TGA-Objekte — Grundlage für Kollisionskoordination (BCF), Flächenauswertung (IfcSpace) und Kostenermittlung (DIN 276).

IFC-Grundlagen: [Kap. 19](/chapters/19-ifc) · Vollständige Entitätenreferenz: [IFC-Schnellreferenz](/appendix/ifc-referenz)
