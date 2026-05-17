# Kapitel 1 – Architektur als System

*Teil I – Fundament · ~15 Seiten*

---

Ein Gebäude ist kein Objekt. Es ist ein System.

## 1.1 Drei Jahrtausende in einem Satz

Der römische Ingenieur und Architekt Vitruv formulierte im ersten Jahrhundert v. Chr. drei Anforderungen, die jedes gute Gebäude erfüllen muss:

> *Firmitas, Utilitas, Venustas* – Standfestigkeit, Nützlichkeit, Schönheit.

Zwei Jahrtausende Architekturgeschichte haben daran nichts Wesentliches geändert. Was sich geändert hat: die Komplexität der Antworten.

Ein modernes Mehrfamilienhaus wie die Kastanienallee 7 muss standfest sein (Tragwerk), funktionieren (Grundriss, Erschließung, TGA), schön sein (Fassade, Proportion, Material) – und zusätzlich: energieeffizient, barrierefrei, brandgeschützt, schallisoliert, nachhaltig, digital dokumentiert und wirtschaftlich betreibbar. Das Tragwerk macht vielleicht 15 % der Baukosten aus. TGA, Hülle, Ausbau und Außenanlagen machen den Rest.

Wer ein Gebäude als System verstehen will, braucht eine Struktur, die diese Komplexität handhabbar macht.

---

## 1.2 Das Schichtenmodell

Gebäude lassen sich in vier konzeptionelle Schichten zerlegen – unabhängig von Bauweise, Größe oder Funktion:

![Schichtenmodell Kastanienallee 7](../assets/illustrations/kap01_schichtenmodell.png)
*Abb. 1.1: Die vier Schichten der Kastanienallee 7 in der isometrischen Explosionsdarstellung.*

### Schicht 1: Tragstruktur

Das Skelett. Fundamente, Stützen, Träger, Deckenplatten, tragende Wände. Die Tragstruktur ist das Langlebigste am Gebäude – in der Regel für 80–200 Jahre dimensioniert. Sie verändert sich kaum: kein Umbau ohne Statiker, keine Kernbohrung ohne Ausführungsplan.

Tragwerk ist unsichtbar, wenn es funktioniert – und existenziell, wenn es versagt.

### Schicht 2: Gebäudehülle

Die Grenze zwischen innen und außen. Außenwände, Dach, Fenster, Außentüren, Abdichtungen. Die Hülle schützt vor Witterung, Wärme- und Kälteverlust, Lärm und Feuchtigkeit. Sie ist weniger dauerhaft als das Tragwerk (Sanierungszyklen: 30–50 Jahre), aber für die Energiebilanz entscheidend: Über 70 % der Transmissionswärmeverluste gehen durch Außenwand, Dach und Fenster.

### Schicht 3: Technische Gebäudeausrüstung (TGA)

Alles, was Energie, Wasser, Luft und Information durch das Gebäude bewegt. Heizung, Lüftung, Sanitär, Elektro, Schwachstrom, Gebäudeautomation. TGA macht 30–40 % der Baukosten aus und hat den kürzesten Erneuerungszyklus: Pumpen werden nach 15 Jahren getauscht, Rohrleitungen nach 30–40 Jahren.

TGA bestimmt die Schachtgrößen, die Deckenhöhen und mitunter den Grundriss. Sie ist der häufigste Grund für Koordinationsprobleme auf der Baustelle – und für Kollisionsprüfungen im BIM-Modell.

### Schicht 4: Innenausbau

Trennwände, Bodenbeläge, Deckenverkleidungen, Einbauten, Küchen, Bäder. Der veränderlichste Teil – er passt sich Nutzern und Nutzungen an. Im Bürobau wird er alle 10–15 Jahre überarbeitet; im Wohnbau bei jedem Mieterwechsel zumindest teilweise.

---

**Die vier Schichten haben unterschiedliche Lebenszyklen, unterschiedliche Fachplaner und unterschiedliche Normen.** Das Schichtenmodell ist kein akademisches Konstrukt – es ist die Grundlage für die Organisation von Planung, Ausführung und Betrieb.

---

## 1.3 Das Leitbeispiel: Kastanienallee 7

Durch das gesamte Buch zieht sich ein konkretes Gebäude als roter Faden: ein **viergeschossiges Mehrfamilienhaus** mit 12 Wohneinheiten.

| Merkmal | Wert |
|---------|------|
| Standort | Bayern (MBO / BayBO) |
| Geschosse | 4 Vollgeschosse + Keller + Dachgeschoss |
| Bauweise | Stahlbeton-Skelett mit Ziegelausfachung |
| Dach | Flachdach, extensiv begrünt, PV-Anlage |
| Wärmeversorgung | Fernwärme |
| Lüftung | Kontrollierte Wohnraumlüftung (KWL) je Wohnung |
| Erschließung | Aufzug (Barrierefreiheit GK 4), 1 Treppenhaus |
| Stellplätze | Tiefgarage mit 10 Plätzen + E-Ladeinfrastruktur |
| Bruttogrundfläche | ca. 1.800 m² |

An bestimmten Stellen ergänzen Vergleichsgebäude das Leitbeispiel: ein Einfamilienhaus in Holzrahmenbauweise, ein Bürogebäude in Stahlbau und ein Gründerzeitgebäude als Sanierungsfall.

---

## 1.4 Der Lebenszyklus

Ein Gebäude wird einmal gebaut und Jahrzehnte genutzt:

| Phase | Dauer | Anteil Lebenszykluskosten |
|-------|-------|--------------------------|
| Planung (LP 1–4) | 1–3 Jahre | ~1 % |
| Errichtung (LP 5–8) | 1–3 Jahre | ~20 % |
| Nutzung & Betrieb | 50–80 Jahre | ~75 % |
| Rückbau / Transformation | 1–2 Jahre | ~4 % |

80–90 % der Lebenszykluskosten entstehen in der **Nutzungsphase** – durch Energie, Wartung, Instandhaltung und Teilsanierungen. Planungsentscheidungen in Leistungsphase 2 (Vorplanung) determinieren diese Kosten stärker als jede spätere Maßnahme.

Wer Architektur als System begreift, denkt vom Ende her.

---

!!! tip "BIM-Brücke: Das Schichtenmodell in IFC"
    Die vier konzeptionellen Schichten des Gebäudes haben direkte Entsprechungen im IFC-Datenmodell:

    | Schicht | IFC-Entitäten | Schlüssel-Property |
    |---------|--------------|-------------------|
    | Tragstruktur | `IfcColumn`, `IfcBeam`, `IfcSlab` | `LoadBearing = TRUE` |
    | Gebäudehülle | `IfcWall`, `IfcRoof`, `IfcWindow` | `IsExternal = TRUE` |
    | TGA | `IfcFlowSegment`, `IfcFlowTerminal` | `IfcDistributionSystem` |
    | Innenausbau | `IfcCovering`, `IfcFurnishingElement` | `IsExternal = FALSE` |

    Die räumliche Projektstruktur in IFC bildet den Rahmen:

    ```
    IfcProject
      └── IfcSite
            └── IfcBuilding
                  ├── IfcBuildingStorey (Keller)
                  ├── IfcBuildingStorey (Erdgeschoss)
                  │     └── IfcSpace (Wohnung 1, Wohnung 2, ...)
                  ├── IfcBuildingStorey (OG 1)
                  └── IfcBuildingStorey (OG 2)
    ```

    In diese Struktur werden alle Bauteile per `IfcRelContainedInSpatialStructure` eingehängt. Mehr dazu in [Kapitel 18 – IFC](18-ifc.md).
