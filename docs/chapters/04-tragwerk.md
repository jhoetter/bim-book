# Kapitel 4 – Tragwerk: Lasten, Kräfte, Systeme

*Teil II – Baukörper · ~30 Seiten*

---

Das Tragwerk ist das Skelett eines Gebäudes. Es ist unsichtbar, wenn es funktioniert – und ein Thema für alle, wenn es versagt. Architekten müssen kein Tragwerk berechnen können. Aber sie müssen verstehen, wie Lasten fließen, welches System für welchen Gebäudetyp passt und wie früh im Entwurf die tragwerksrelevanten Entscheidungen fallen.

## Lasten: Was auf ein Gebäude wirkt

Der Eurocode (EN 1990 ff.) unterscheidet Lasten nach ihrer Wirkungsrichtung und Zeitlichkeit:

**Ständige Lasten (G)** – wirken dauerhaft:
- Eigengewicht der Bauteile (Beton ≈ 25 kN/m³, Holz ≈ 5 kN/m³, Stahl ≈ 78,5 kN/m³)
- Ausbaulasten (Estrich, Bodenbelag, abgehängte Decken): typisch 1,5–2,5 kN/m²

**Veränderliche Lasten (Q)** – wirken zeitweise:
- Nutzlast (EN 1991-1-1): Wohnräume 2,0 kN/m², Büro 3,0–5,0 kN/m², Parkhaus 2,5 kN/m²
- Schnee (EN 1991-1-3): abhängig von Schneelastzone und Höhe ü. NN
- Wind (EN 1991-1-4): abhängig von Windzone, Gebäudehöhe und Geländeform

**Außergewöhnliche Lasten (A)**: Erdbeben, Anprall, Explosion – in Deutschland nur für Sonderbauten relevant.

Alle Lasten werden mit Sicherheitsbeiwerten (γ) multipliziert und in Lastkombinationen überlagert. Das Ergebnis ist die **Bemessungslast**, gegen die jedes Bauteil standhalten muss.

## Die drei wichtigsten Tragsysteme

![Vergleich der drei häufigsten Tragsysteme: Massivbau, Skelettbau, Holztafelbau](/assets/illustrations/kap04_tragsysteme_vergleich.png)

Das Bild zeigt die drei dominierenden Systeme im deutschen Hochbau. Sie unterscheiden sich grundlegend in der Art, wie sie Lasten abtragen:

### Massivbau (Mauerwerksbau / Stahlbetonwandbau)

Tragende Wände nehmen Lasten direkt auf und leiten sie in den Boden. Kein separates Stützenraster nötig. Vorteil: einfache, robuste Konstruktion, guter Schallschutz, hohe Wärmespeicherung. Nachteil: wenig Flexibilität bei Grundrissänderungen – jede tragende Wand sitzt übereinander.

**Typische Anwendung**: Wohnungsbau bis ca. 6 Geschosse, Reihenhäuser, kleinere MFH.

### Skelettbau (Stahl- oder Stahlbeton-Skelett)

Stützen und Unterzüge bilden ein Raster; Außenwände und Innenwände sind rein nicht-tragend (Ausfachung). Vorteil: maximale Grundrissfreiheit, schneller Rohbau, große Spannweiten. Nachteil: aufwändige Stützen-Träger-Knoten, Schallschutz schwieriger.

**Typische Anwendung**: Bürogebäude, Gewerbebauten, Tiefgaragen.

### Holztafelbau

Vorgefertigte Wandtafeln aus Holzrahmen mit OSB-Beplankung werden auf der Baustelle montiert. Vorteil: kurze Bauzeit, geringes Gewicht, gute Wärmedämmwerte, nachwachsender Rohstoff. Nachteil: Schallschutz erfordert besondere Sorgfalt, Feuchteschutz kritisch.

**Typische Anwendung**: Einfamilienhäuser, mehrgeschossiger Holzbau (bis 7 Geschosse nach MBO).

## Vordimensionierung: Daumenmaße für den Entwurf

Der Statiker rechnet exakt. Der Architekt braucht Daumenmaße, um im frühen Entwurf realistische Querschnitte anzusetzen:

| Bauteil | Faustformel | Beispiel (5 m Spannweite) |
|---|---|---|
| Stahlbetondecke (einachsig) | l / 30 | ≈ 17 cm |
| Stahlbetonunterzug | l / 12 | ≈ 42 cm |
| Stahlbetonflachdecke | l / 25 | ≈ 20 cm |
| Stahlstütze HEA | l / 20–25 | HEA 200 |
| Holzbalkendecke | l / 20 + 5 cm | ≈ 30 cm |

Diese Werte gelten für übliche Deckenstützweiten bis ca. 7 m und normale Nutzlasten. Für größere Spannweiten, Schwingungsempfindlichkeit oder Erdbebenbemessung ist frühzeitig der Statiker einzubeziehen.

!!! note "Entwurfsregel"
    Tragende Wände und Stützen sollten im Entwurf von Geschoss zu Geschoss konsequent übereinander liegen. Versätze erzeugen Zwängungen und teure Sonderkonstruktionen. Diese Regel ist der häufigste Konfliktpunkt zwischen Architektur und Tragwerk.

---

!!! tip "BIM-Brücke"
    Tragende Bauteile werden in IFC über das Property `LoadBearing = TRUE` in `Pset_WallCommon`, `Pset_SlabCommon` oder `Pset_ColumnCommon` markiert. Das analytische Tragwerksmodell wird als `IfcStructuralAnalysisModel` exportiert und bildet die Grundlage für den Datenaustausch mit Statikprogrammen (Dlubal RFEM, Autodesk Robot) via IFC Structural. Schon in LP 2 sollte das BIM-Modell die Tragsystementscheidung dokumentieren – das spart spätere Nacharbeit.
