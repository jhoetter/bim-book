# Buch-Tracker: Vom Entwurf zum Modell

Last updated: 2026-05-18 (Review-Update: Aufzug, MVD, CRS, BAP-Inhalt, Raumakustik, IFC-Validierung, LCA-BIM-Kopplung, Datenpipeline)

Zweck: Master-Planungsdokument für alle 24 Kapitel. Kein Prosatext — nur Skizze: was muss rein, welche Bilder, welche Begriffe, welche Quellen. Writing Agents lesen diesen Tracker vor dem Schreiben eines Kapitels.

**Zielgruppe (maßgeblich für Ton, Tiefe und Beispielwahl):**
- **Primär:** Technisch versierte Einsteiger ohne Baugrundlage (Informatiker, Softwareentwickler, Ingenieure aus anderen Disziplinen) **und** Architekturstudenten im frühen Studium, denen die digitale Systematik fehlt. Beiden Gruppen fehlt jeweils eine Seite des Ganzen — das Buch schließt diese Lücke.
- **Sekundär:** Architekten und Fachplaner in der Praxis, die BIM-Methodik systematisch durchdringen wollen — und BIM-Software-Entwickler, die ihre Werkzeuge besser auf den Berufsalltag der Planer abstimmen möchten. Diese Gruppe liest mit, um festzustellen: der Autor kennt das Handwerk. Das schafft Vertrauen und Glaubwürdigkeit für die begleitende Software.

**Konsequenz für Kapiteltiefe:** Architektonische Grundlagen (Baustoffe, Konstruktion, TGA, Statik, Bauphysik) müssen vollständig und präzise erklärt werden — nicht als Zusammenfassung für Experten, sondern als solides Fundament für Einsteiger, das Architekten als fachlich korrekt erkennen.

Leitbeispiel: **Kastanienallee 7** — viergeschossiges MFH, 12 Wohneinheiten, Stahlbeton-Skelett, Fernwärme + KWL, Flachdach mit PV, Vierspänner, GRZ 0,6, GFZ 2,4, Gebäudeklasse 4 nach MBO, **aufzugspflichtig nach Art. 37 BayBO** (4 Vollgeschosse; 1 Aufzug im Treppenhauskern, Kabine 1,10 × 1,40 m lichte Maße nach DIN 18040-2, maschinenraumlos).

---

## Status-Legende

- `Open` — noch nicht geschrieben
- `Entwurf` — erste Version vorhanden, noch kein Review
- `Review` — User-Feedback ausstehend
- `Done` — freigegeben

Priorität:
- `P0` — Teil I: ohne diese Kapitel funktioniert das Buch nicht als Einheit
- `P1` — Teile II–VI: Kerninhalt
- `P2` — Teil VII + Anhang: Vertiefung/Ausblick

---

## Quellenverzeichnis

Alle PDFs liegen unter `~/Desktop/architecture books/`.

| Kürzel | Datei | Relevant für |
|--------|-------|-------------|
| Neufert | `01_Grundlagen-und-Entwurf/Bauentwurfslehre (Neufert).pdf` | Kap. 2, 8, 12 — Normmaße, Wendeflächen, Sanitär |
| Ching | `01_Grundlagen-und-Entwurf/Architecture Form Space and Order – Ching.pdf` | Kap. 1, 2 — Proportionen, Raumordnung |
| Baubuch | `01_Grundlagen-und-Entwurf/Das Baubuch – Xella.pdf` | Kap. 3, 5, 7 — Mauerwerk, Aufbauten |
| FK1 | `02_Baukonstruktion/Baukonstruktionslehre 1 – Frick & Knoell.pdf` | Kap. 3, 4, 5 — Gründung, Wand, Decke, Dach |
| FK2 | `02_Baukonstruktion/Baukonstruktionslehre 2 – Frick & Knoell.pdf` | Kap. 5 — Details, Anschlüsse |
| Haustechnik | `04_Gebaeudetechnik/Haustechnik.pdf` (Laasch) | Kap. 10, 11, 12, 13 |
| NachhaltigeGT | `04_Gebaeudetechnik/Nachhaltige Gebaeudetechnik.pdf` | Kap. 10, 22 |
| Villmann | `10_Bauphysik/Grundlagen der Bauphysik – Villmann.pdf` | Kap. 6, 7, 8 |
| Zürcher | `10_Bauphysik/Bauphysik Bau und Energie – Zuercher & Frank.pdf` | Kap. 6, 7 |
| EnergieAtlas | `00_Atlas-Reihe/Energie Atlas (Detail).pdf` | Kap. 6, 22 |
| FassadenAtlas | `00_Atlas-Reihe/Fassaden Atlas (Detail).pdf` | Kap. 5, 6 |
| FlachdachAtlas | `00_Atlas-Reihe/Atlas Flachdach (Detail).pdf` | Kap. 5 |
| AtlasBaustoff | `00_Atlas-Reihe/Atlas Baustoff (Detail).pdf` | Kap. 3 |
| AtlasSanierung | `00_Atlas-Reihe/Atlas Sanierung (Detail).pdf` | Kap. 23 |
| AtlasRecycling | `00_Atlas-Reihe/Atlas Recycling (Detail).pdf` | Kap. 22 |
| Ridder | `09_Digital-und-BIM/Autodesk Revit 2026 – Ridder.pdf` | Kap. 21 |
| ISO19650 | `09_Digital-und-BIM/Common Data Environment – ISO 19650 (DE).pdf` | Kap. 20 |
| DINSPEC | `09_Digital-und-BIM/DIN SPEC 91391-1 2019 (DE).pdf` | Kap. 20 |
| Bildwörterbuch | `01_Grundlagen-und-Entwurf/Bildwoerterbuch der Architektur – Koepf & Binding.pdf` | Kap. 1, 3, 4 |

---

## Strukturelle Lücken & Review-Notizen

Erkannte Schwachstellen nach Gliederungsanalyse (2026-05-18). Jede Lücke ist mit einer offenen Entscheidung (OE) verknüpft.

| Lücke | Schwere | Betrifft | OE |
|-------|---------|----------|----|
| Pläne lesen (Grundriss/Schnitt/Ansicht/Detail) fehlt komplett — für IT-Einsteiger kritisch | **hoch** | Kap. 2 | OE-06 |
| Holzbau fragmentiert über Kap. 3, 5, 8, 23 — kein kohärentes Bild | **hoch** | Kap. 5 | OE-08 |
| Bauablauf / Gewerkekoordination zu dünn (~10% von Kap. 16) | **mittel** | Kap. 16 | — |
| Kap. 18 (IFC) zu kurz für Zielgruppe — Kernkapitel für Entwickler | **hoch** | Kap. 18 | — |
| Kap. 4 (Tragwerk) ohne durchgerechnetes Zahlenbeispiel | **mittel** | Kap. 4 | — |
| Kap. 6 (Wärmeschutz) nutzt digitales Format nicht — interaktive Tabelle fehlt | **niedrig** | Kap. 6 | — |
| Kap. 24 in 2 Jahren schon veraltet — Scope zu ambitioniert | **mittel** | Kap. 24 | OE-07 |
| Kap. 19 (Klassifikation) riskiert zu abstrakt zu werden — DE-Fokus fehlt | **mittel** | Kap. 19 | — |
| Aufzug fehlt komplett — GK 4 nach Art. 37 BayBO macht ihn für K7 obligatorisch; nicht in K02-Box, K05, K12, K13 | **hoch** | Kap. 2, 5, 12, 13 | — |
| Georeferenzierung / CRS fehlt in K18 — für Entwickler kritisch: IfcGeometricRepresentationContext, IfcMapConversion, EPSG:25832 | **hoch** | Kap. 18 | — |
| MVD (Model View Definition) fehlt in K18 — erklärt nicht, warum IFC-Export zwischen Tools so stark variiert | **hoch** | Kap. 18 | — |
| BAP-Inhalt nicht erklärt — Begriff in K15 eingeführt, aber Kapitelgliederung und Erstellungsprozess fehlen | **mittel** | Kap. 15 | — |
| Innenausbau nicht systematisch — Trockenbau, Deckenraster, Unterdecken, Bodenbeläge (jenseits Estrich) fehlen | **mittel** | Kap. 5 | OE-09 |
| Stellplatznachweis / Außenanlagen fehlen — Versickerung, Pkw-Zufahrt, Stellplatzsatzung Bayern | **niedrig** | Kap. 2, 14 | OE-10 |

---

## Kapitel-Übersicht

| # | Titel | Teil | Status | Prio | Wörter (Ziel) |
|---|-------|------|--------|------|----------------|
| 1 | Architektur als System | I | `Open` | P0 | 2,800–3,200 |
| 2 | Entwurf, Raum und Funktion | I | `Open` | P0 | 3,000–3,800 ↑ |
| 3 | Baustoffe | II | `Open` | P1 | 3,000–3,500 |
| 4 | Tragwerk: Lasten, Kräfte, Systeme | II | `Open` | P1 | 3,200–3,800 ↑ |
| 5 | Konstruktion: Gründung, Wand, Decke, Dach | II | `Open` | P1 | 3,800–4,500 ↑ |
| 6 | Wärmeschutz & GEG | III | `Open` | P1 | 2,800–3,200 |
| 7 | Feuchteschutz | III | `Open` | P1 | 2,200–2,800 |
| 8 | Schallschutz | III | `Open` | P1 | 2,000–2,500 |
| 9 | Brandschutz | III | `Open` | P1 | 2,000–2,500 |
| 10 | Heizung & Wärmeversorgung | IV | `Open` | P1 | 2,800–3,200 |
| 11 | Lüftung & Raumluftqualität | IV | `Open` | P1 | 2,500–3,000 |
| 12 | Sanitär & Entwässerung | IV | `Open` | P1 | 2,200–2,800 |
| 13 | Elektro & Gebäudeautomation | IV | `Open` | P1 | 2,500–3,000 |
| 14 | Planungsrecht | V | `Open` | P1 | 2,500–3,000 |
| 15 | HOAI: Phasen, Leistungen, Honorar | V | `Open` | P1 | 2,800–3,200 |
| 16 | Kosten & Ausschreibung | V | `Open` | P1 | 2,800–3,200 ↑ |
| 17 | Was BIM wirklich ist | VI | `Open` | P1 | 2,200–2,800 |
| 18 | IFC: Die Sprache des digitalen Gebäudes | VI | `Open` | P1 | 4,000–5,000 ↑↑ |
| 19 | Klassifikation | VI | `Open` | P1 | 2,000–2,500 ↓ |
| 20 | Prozess & Kollaboration: CDE, ISO 19650 | VI | `Open` | P1 | 2,500–3,000 |
| 21 | BIM in der Praxis | VI | `Open` | P1 | 2,200–2,800 |
| 22 | Nachhaltigkeit & Kreislaufwirtschaft | VII | `Open` | P2 | 2,500–3,000 |
| 23 | Sanierung | VII | `Open` | P2 | 2,500–3,000 |
| 24 | Digitaler Zwilling & KI | VII | `Open` | P2 | 1,200–1,800 ↓↓ |

---

## Detaillierte Kapitel-Specs

---

### K01 — Architektur als System

- **Status:** `Open`
- **Zielwörter:** 2,800–3,200
- **Kernfragen:**
  - Was macht ein Gebäude zu mehr als einem Haufen Steine?
  - Warum wurde Bauen im Laufe der Geschichte komplexer?
  - Was ist das Schichtenmodell und warum ist es nützlich?
  - Wie hängen die vier Schichten voneinander ab?

- **Pflichtabschnitte (H2):**
  - 1.1 Wie Bauen komplex wurde — historischer Bogen: mittelalterlicher Baumeister → Industrialisierung (Stahl, Beton) → TGA als 40–60% der Baukosten; endet mit: Konsequenz = gemeinsame Sprache braucht man
  - 1.2 Das Schichtenmodell — Frank Duffy / Stewart Brand "Shearing Layers"; vier Schichten mit je eigenem H3: Tragstruktur (80–200 J.), Gebäudehülle (30–50 J.), TGA (15–25 J.), Innenausbau (5–15 J.); je: Lebensdauer, Materialien, Entwurfskonsequenz
  - 1.3 Interdependenzen — mind. 2 Beispiele zeigen wie Entscheidung in Schicht A alle anderen betrifft: (1) Fußbodenheizung-Entscheidung → Auflast, Vorlauftemp, Estrich-Einschränkung; (2) Installationsschacht-Lage → Grundrissfreiheit
  - 1.4 Wie dieses Buch aufgebaut ist — Buchstruktur als Schichtenmodell-Logik; alle 7 Teile + je ein Kapitel-Link pro Teil; kein Anhang hier

- **Einzuführende Begriffe:** `schichtenmodell`, `tga` (beide hier — terms-registry bereits gesetzt)

- **Bilder (min. 2):**
  - `kap01_schichtenmodell` — isometrisch, landscape — Explosionsdarstellung K7, vier farbkodierte Schichten vertikal auseinander, Lebensdauer-Labels, weißer Hintergrund
  - `kap01_interdependenzen` — Diagramm, landscape — vier Rechtecke vertikal, Pfeile zwischen Schichten mit Beispiel-Labels (FBH-Estrich, Schachtlage), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 1.1: 7 Planungsbüros, BIM als gemeinsame Basis → Kap. 17, 18
  - nach 1.2: Konkrete Schichteninhalte K7 (Skelettrahmen 6×6 m, Dachabdichtung, Fernwärme-Station, Trockenbau)

- **BIM-Brücke:** Schichtenmodell = IFC-Modellstruktur; Tragstruktur → `IfcColumn`, `IfcSlab`; TGA → `IfcDistributionSystem`; Innenausbau → `IfcCovering`; Verbindung zu Kap. 17–18
  ⚠️ **Vorausverweise-Hinweis (didaktisch wichtig):** Die BIM-Brücken in K01–K16 verwenden IFC-Notation, bevor IFC in K17/18 eingeführt wird. K01 muss explizit sagen: „Diese Boxen sind Vorausgriffe — wer IFC noch nicht kennt, kann sie zunächst überfliegen und nach Kap. 18 zurückkehren." Diesen Satz in K01 setzen, damit sequenziell lesende Einsteiger nicht stolpern.

- **Quellen:** Ching (Systemdenken), Bildwörterbuch (hist. Bautechnik), FK1 (Schichtenaufbau)

- **Normen:** —

- **Querverweise:** → Kap. 4 (Tragwerk), Kap. 5 (Konstruktion), Kap. 10–13 (TGA), Kap. 17 (BIM), Kap. 18 (IFC), Kastanienallee-Appendix

---

### K02 — Entwurf, Raum und Funktion

- **Status:** `Open`
- **Zielwörter:** 3,000–3,800 ↑ (erhöht wegen Pläne-lesen-Block)
- **Kernfragen:**
  - Wie liest man einen Architekturplan — was ist Grundriss, Schnitt, Ansicht, Detail?
  - Wie entsteht ein Grundriss — welche Kräfte wirken auf ihn ein?
  - Was macht gute Raumplanung aus (Proportion, Orientierung, Erschließung)?
  - Was schreibt der Bebauungsplan vor, bevor der Stift ansetzt?
  - Was sind die Normmaße, die jeder kennen muss?
  - Was bedeutet Barrierefreiheit als Entwurfsprinzip?

- **Pflichtabschnitte (H2):**
  - 2.0 Architekturpläne lesen ⚠️ NEU — **für Einsteiger kritisch, für Architekten selbstverständlich**: was ist ein Grundriss (horizontaler Schnitt, ~1,00 m Schnitthöhe), was ist ein Schnitt (vertikaler Schnitt), was ist eine Ansicht (Außenansicht ohne Schnitt), was ist ein Detail (Maßstab 1:10/1:5); Maßstäbe und wann man welchen nutzt (1:100 Grundriss, 1:50 Schnitt, 1:20/1:10 Detail); was gestrichelt vs. durchgezogen bedeutet; Nordreil und Orientierung; Legende; — ohne dieses Verständnis ist der Rest des Buches für Quereinsteiger schwer lesbar
  - 2.1 Was der Bebauungsplan vorgibt — GRZ, GFZ (Formeln + Beispielrechnung), MBO Gebäudeklassen; Abstandsflächen kurz; B-Plan lesen als Kompetenz
  - 2.2 Raumplanung: Proportion und Maßstab — Neufert-Grundprinzipien: der Mensch als Maß; Mindest-Deckenhöhen (2,50 m WR, 2,75 m Büro); Türbreiten (0,875 m lichte Breite Standard, 0,90 m barrierefrei); Zimmerproportionen; Möblierbarkeit als Prüfkriterium
  - 2.3 Erschließungstypen — Zweispänner, Dreispänner, Vierspänner, Laubengang; Tabelle mit: Orientierung, Erschließungsflächenanteil, wirtschaftliche Eignung; DIN 18065 Treppenmaße kurz
  - 2.4 Barrierefreiheit als Entwurfsprinzip — DIN 18040-2 (Wohngebäude): Wendefläche ≥ 1,50 × 1,50 m, schwellenlose Zugänge, Aufzugmaße (min. 1,10 × 1,40 m Kabine), Türlichtes Maß 0,90 m; Barrierefreiheit als Qualitätsmerkmal, nicht Zusatz
  - 2.5 Kompaktheit und A/V-Verhältnis — Formel, Beispielrechnung K7, Vergleich EFH, Bedeutung für Energieeffizienz → Vorausgriff Kap. 6

- **Einzuführende Begriffe:** `grz`, `gfz`, `mbo` (bereits in terms-registry gesetzt)

- **Bilder (min. 4):**
  - `kap02_planarten` — Erklärungsdiagramm, landscape ⚠️ NEU — vier Darstellungen desselben K7-Ausschnitts: Grundriss, Schnitt, Ansicht, Detail; je mit Maßstab und Schnittlage-Annotation; weißer Hintergrund
  - `kap02_grundriss_eg` — Grundriss (bereits vorhanden als .png) — EG K7, Vierspänner, Maßketten, Wohnungsbezeichnungen
  - `kap02_erschliessungstypen` — Vergleichsdiagramm, landscape — Zwei-/Drei-/Vierspänner nebeneinander, schematisch, Erschließungsfläche farblich, weißer Hintergrund
  - `kap02_av_verhaeltnis` — Vergleich, landscape — kompakter vs. verzweigter Baukörper mit A/V-Kennwerten (bereits spezifiziert in alter Version), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 2.1: GRZ 0,60 / GFZ 2,4 / GK 4 nach MBO — Rechenweg vollständig
  - nach 2.3: Vierspänner, Windfang Südseite, drei Wohnungstypen je Geschoss
  - nach 2.4: Aufzugspflicht K7 — GK 4, 4 Vollgeschosse → Art. 37 BayBO: Aufzug zwingend; 1 Aufzug im Treppenhauskern; Kabine 1,10 × 1,40 m lichte Maße (DIN 18040-2 barrierefrei); Schacht ca. 1,80 × 2,20 m Außenmaß Stahlbeton; Grubenmaß 1,10 m → Kellergeschoss notwendig; maschinenraumlos (MRL) nach DIN EN 81-20
  - nach 2.5: A/V ≈ 0,38 m⁻¹, Berechnung, Vergleich mit EFH > 0,8 m⁻¹

- **BIM-Brücke:** `IfcSpace` (Raumfläche nach DIN 277); Raumprogramm als Datenanforderung; GFZ-Prüfung automatisierbar aus `IfcBuilding` + `IfcSite`; → Kap. 18, 19

- **Quellen:** Neufert (Normmaße, Erschließung, Barrierefreiheit), Ching (Proportion, Raum), FK1 (Grundrissorganisation)

- **Normen:** DIN 18065 (Treppen), DIN 18040-2 (Barrierefreiheit Wohngebäude), BauNVO §19 (GRZ-Anrechnung)

- **Querverweise:** → Kap. 6 (A/V und Wärmeschutz), Kap. 9 (Gebäudeklassen und Brandschutz), Kap. 14 (Planungsrecht), Kastanienallee-Appendix

---

### K03 — Baustoffe: Eigenschaften, Verhalten, Einsatz

- **Status:** `Open`
- **Zielwörter:** 3,000–3,500
- **Kernfragen:**
  - Warum baut man womit? Welches Material für welchen Zweck?
  - Was sind die wichtigsten Kennwerte und was sagen sie aus?
  - Wie unterscheiden sich die gängigen Materialien in Wärme, Schall, Tragfähigkeit, Nachhaltigkeit?

- **Pflichtabschnitte (H2):**
  - 3.1 Wie Architekten über Materialien denken — kurze Einführung: Material ist nicht Ästhetik, sondern Physik; Kennwerte als gemeinsame Sprache (Rohdichte, E-Modul, λ-Wert, Brandverhalten)
  - 3.2 Beton und Stahlbeton — Druckfestigkeit (C20/25 etc.), Zugfestigkeit → Bewehrungsprinzip; Sichtbeton als Sonderfall; Carbonbewehrung als Ausblick
  - 3.3 Mauerwerk — Ziegel, Kalksandstein, Porenbeton (Ytong); Vergleich λ-Wert, Druckfestigkeit, Schallschutz; Verbände; wann Mauerwerk, wann nicht
  - 3.4 Stahl — Profile (I, HEA, RHS), Verbindungen (Schweißen, Schrauben), Rostschutz; Vergleich Stahl vs. Beton: wann Stahl (große Spannweiten, Leichtbau, Rückbaubarkeit)
  - 3.5 Holz — Vollholz, BSH, CLT/Brettsperrholz; Vorteile (CO₂, Gewicht, Vorfertigung); Grenzen (Feuchte, Brandschutz, Schall); Holzrahmenbau vs. Massivholz
  - 3.6 Glas — Float, VSG, ESG; Wärmedämm-Isolierglas; Ug-Wert Erklärung; Dreifachverglasung wann sinnvoll
  - 3.7 Dämmstoffe — Mineralwolle (Glas/Stein), EPS, XPS, PUR, Holzfaser; Tabelle: λ-Wert (WLG), typische d für gleichen U-Wert, Anwendung, Nachhaltigkeit-Einschätzung

- **Einzuführende Begriffe:** `mineralwolle`, `wlg`, `eurocode` (hier erste Erwähnung im Kontext Lastannahmen)

- **Bilder (min. 3):**
  - `kap03_materialvergleich` — Tabelle/Infografik, landscape — visueller Vergleich der 6 Hauptmaterialien: Rohdichte, λ, E-Modul, Brandklasse als farbkodierte Balken, weißer Hintergrund
  - `kap03_daemmstoff_vergleich` — Balkendiagramm, portrait — Dämmstoffe vs. erforderliche Dicke für U = 0,20 W/m²K, weißer Hintergrund
  - `kap03_clt_vs_beton` — Schnittdarstellung, landscape — CLT-Decke vs. Betondecke im Schichtvergleich, Gewicht, CO₂, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 3.2: Warum Stahlbeton-Skelett für K7 gewählt — Spannweiten, Flexibilität Grundriss, Lebensdauer
  - nach 3.7: Außenwand K7: Tragbeton + Holzfaser-WDVS — λ-Werte, Materialentscheidung begründet

- **BIM-Brücke:** `IfcMaterial`, `IfcMaterialLayer`, `IfcMaterialLayerSet`; Kennwerte als Properties; OmniClass Table 41 (Materials); → Kap. 18, 19

- **Quellen:** AtlasBaustoff, FK1 (Kap. 5–7), Baubuch (Mauerwerk), Villmann (Dämmwerte)

- **Normen:** DIN EN 1992 (Beton-Eurocode), EN 338 (Holz-Festigkeitsklassen), DIN EN ISO 6946 (Wärmedurchgang)

- **Querverweise:** → Kap. 4 (Lasten), Kap. 5 (Konstruktionsaufbauten), Kap. 6 (U-Werte), Kap. 22 (Nachhaltigkeit/Embodied Carbon)

---

### K04 — Tragwerk: Lasten, Kräfte, Systeme

- **Status:** `Open`
- **Zielwörter:** 3,200–3,800 ↑
- **Kernfragen:**
  - Warum fällt ein Gebäude nicht um? Was ist Lastabtragung?
  - Welche Tragsysteme gibt es und wann macht welches Sinn?
  - Was muss ein Architekt von Statik verstehen (ohne selbst zu rechnen)?
  - Wie viel Last kommt tatsächlich am Fundament an — konkret in kN?

- **Pflichtabschnitte (H2):**
  - 4.1 Das Prinzip der Lastabtragung — jede Last muss einen Weg nach unten finden; Eigengewicht vs. Nutzlast vs. Wind/Schnee; Dreieck der Kräfte; visuelle Erklärung an einfachem Träger
  - 4.2 Lastarten im Überblick — ständige Lasten (Eigengewicht), veränderliche Lasten (Nutzlast nach Eurocode: 2,0 kN/m² Wohnen, 5,0 kN/m² Büro), Windlast (Windzone), Schneelast (Schneelastzone); kurze Erwähnung Erdbeben
  - 4.3 Durchgerechnetes Beispiel: Last am Fundament ⚠️ NEU — Kernstück für Ingenieure und Informatiker: K7-Stützenfeld 6,0 × 6,0 m, 4 Geschosse; Rechnung: Deckenfeld 36 m² × (Eigengewicht 5,0 kN/m² + Nutzlast 2,0 kN/m²) × 4 Geschosse = 1.008 kN je Stütze, dazu Eigengewicht Stütze + Dach → Gesamtlast ~1.100 kN; was das für die Fundamentbemessung bedeutet; zielt nicht auf Prüfungswissen sondern auf Größenordnungsgefühl
  - 4.4 Tragsysteme im Vergleich — Massivbau (tragende Wände): einfach, wirtschaftlich, eingeschränkte Flexibilität; Skelettbau (Stützen + Träger): flexibel, Büro/Gewerbe; Holztafelbau: vorgefertigt, bis ca. 7 Geschosse; Hybridkonstruktionen; Tabelle: System, Spannweite max., Flexibilität, Kosten-Tendenz
  - 4.5 Bauteile und ihre Aufgabe — Fundamente (Einzel-, Streifen-, Plattenfundament; Pfahlgründung), Stützen/Wände (Druck, Knicklänge als Konzept), Decken (Platte, Rippendecke; Deckendicke ≈ l/30 als Daumenregel), Träger (Biegung, Auflager)
  - 4.6 Vordimensionierung — Daumenregeln die jeder kennen sollte: Decke l/30, Stütze min. b = h/10, Wanddicke für Brandschutz; wann Ingenieur zwingend

- **Einzuführende Begriffe:** `lastfall`, `eurocode` (wenn nicht schon in Kap. 3 eingeführt)

- **Bilder (min. 3):**
  - `kap04_lastabtragung` — Schnittdiagramm, portrait — viergeschossiges Gebäude, Pfeile zeigen Lastweg von Dach → Decken → Stützen → Fundament, Lastgrößen beschriftet, weißer Hintergrund
  - `kap04_tragsysteme` — isometrisch, landscape — drei Baukörper nebeneinander: Massivbau, Skelettbau, Holztafel; Tragelemente farblich markiert, weißer Hintergrund
  - `kap04_deckentypen` — Querschnitt, landscape — Flachdecke, Rippendecke, Hohldielen nebeneinander mit Spannweite und Eigengewicht, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 4.3: K7 als Skelettbau — Stützenraster 6,0 × 6,0 m, Kellerdecke als Gründungsplatte, Treppenhaus als aussteifender Kern
  - nach 4.5: Vordimensionierung K7 — Deckendicke 22 cm für 6 m Spannweite; Stützenquerschnitt 30 × 30 cm

- **BIM-Brücke:** `IfcColumn`, `IfcBeam`, `IfcSlab`, `IfcFooting`; Property `loadBearing = true/false`; Strukturmodell separat vom Architekturmodell; → Kap. 18

- **Quellen:** FK1 (Kap. 2, 3, 4), Bildwörterbuch (Tragsysteme historisch), EnergieAtlas (Skelettbau)

- **Normen:** Eurocode 2 (Beton, DIN EN 1992), Eurocode 5 (Holz), Eurocode 1 (Lastannahmen)

- **Querverweise:** → Kap. 3 (Baustoffe), Kap. 5 (Konstruktion Gründung), Kap. 9 (Brandschutz tragende Bauteile)

---

### K05 — Konstruktion: Gründung, Wand, Decke, Dach

- **Status:** `Open`
- **Zielwörter:** 3,800–4,500 ↑ (wegen neuem Holzbau-Abschnitt)
- **Kernfragen:**
  - Wie ist ein Gebäude tatsächlich Schicht für Schicht zusammengebaut?
  - Welche Reihenfolge der Schichten ist physikalisch zwingend und warum?
  - Wo sind die kritischen Details, wo alles schiefgehen kann?

- **Pflichtabschnitte (H2):**
  - 5.1 Gründung — Baugrundgutachten (warum Boden erkunden bevor planen); Frostfreiheit (≥ 80 cm in D); Keller vs. kein Keller; Weißer Trog vs. Schwarze Wanne; Perimeterdämmung; Plattendicke
  - 5.2 Außenwand — einschalig vs. zweischalig vs. WDVS (Wärmedämmverbundsystem); Schichtfolge von innen nach außen mit Begründung (Dampfdiffusion: dampfdicht → offen); Fensteranschluss als kritisches Detail (Wärmebrücke an Laibung); Rollladenkasten
  - 5.3 Deckenaufbau — Rohdecke (Beton/Holz); schwimmender Estrich mit Trittschalldämmung; Fußbodenheizung als integrierter Bestandteil; Bodenbelag; Aufbauhöhe gesamt (typisch 15–18 cm über Rohdecke); Deckenöffnung Aufzugsschacht als Koordinationsaufgabe
  - 5.3a Aufzugsschacht ⚠️ NEU — Stahlbeton-Aufzugsschacht als tragendes und aussteifendes Element; Lichtraum Kabine 1,10 × 1,40 m → Schacht ca. 1,80 × 2,20 m Außenmaß; Wanddicke ≥ 20 cm (Schallschutz!); Grubentiefe 1,10 m unter EG-Fertigfußboden; maschinenraumlos (MRL): Antrieb im Schachtkopf, kein separater Maschinenraum; Kopfraum mind. 3,50 m über oberstem Halt; DIN EN 81-20; Lage im Treppenhauskern (Koordination mit NTH-Anforderungen → Kap. 9); Aufzug ist kein Sonderfall: 4 Vollgeschosse in Bayern = Aufzugspflicht
  - 5.4 Flachdach — Aufbau: Tragschicht → Dampfbremse → Dämmung → Abdichtung → Schutzlage → Begrünung/PV; Warmdach vs. Umkehrdach; Gefällegebung (min. 2%); Attika; Entwässerung: Einläufe + Notüberlauf
  - 5.5 Geneigtes Dach (Vergleichsgebäude EFH) — Sparren, Pfetten, Kehlbalken; Aufsparren- vs. Zwischensparrendämmung; Dachdeckungen kurz
  - 5.6 Holzbau als System ⚠️ NEU — **konsolidiert Holzbau-Inhalte aus Kap. 3, 8, 23 hier an einem Ort**; Holzrahmenbau (Stiel + Riegel, vorgefertigt, bis 5 Geschosse gut), Brettsperrholz CLT (Plattenbauweise, bis 10+ Geschosse möglich, serielle Sanierung); Brandschutz Holz: Abbrandrate 0,65 mm/min, Kapselklasse K60; Schallschutz: Flankenübertragung das Hauptproblem, Lösungen; Feuchte: Holzfeuchte < 20% dauerhaft, Konstruktionsholz KD (kiln dried); CO₂-Bilanz: ca. 250 kg CO₂ gebunden je m³ BSH; wann Holz wirtschaftlich gegenüber Beton; Holzbau in Kap. 8 und 23 nur noch referenzieren, nicht mehr doppeln

- **Einzuführende Begriffe:** `wdvs`, `dampfbremse`, `dampfsperre`, `innenputz`, `armierungsputz`

- **Bilder (min. 5):**
  - `kap05_wandaufbau` — Exploded View, portrait — WDVS-Wandaufbau Schicht für Schicht mit Dicken und Materialbezeichnungen, von innen nach außen, weißer Hintergrund
  - `kap05_fensteranschluss` — Detailschnitt, portrait — Fensterlaibung mit Wärmebrücke-Indikation, Rollladenkasten oben, Perimeterdämmung unten, weißer Hintergrund
  - `kap05_deckenaufbau` — Querschnitt, landscape — Schichtenfolge Decke mit FBH: Rohdecke, Trittschall, FBH-Estrich, Belag; Maße, weißer Hintergrund
  - `kap05_flachdach` — Explosionsdarstellung, landscape — Flachdachaufbau alle Schichten + Attika + Notüberlauf, weißer Hintergrund
  - `kap05_holzbau_systeme` — Vergleich, landscape ⚠️ NEU — Holzrahmenbau vs. CLT nebeneinander: Wandaufbau, typische Geschosszahl, Brandschutzmaßnahme, CO₂-Bilanz; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 5.1: Gründung K7 — Bodenplatte auf verdichtetem Schotter, Weißer Trog, Perimeterdämmung XPS 12 cm
  - nach 5.2: Außenwand K7 — Tragbeton 25 cm + Holzfaser WDVS 20 cm + Putz; vollständige Schichtfolge mit U-Wert-Ergebnis → Vorausgriff Kap. 6
  - nach 5.4: Flachdach K7 — Aufbau: Beton-Tragschicht, Dampfbremse, PIR 18 cm, Abdichtung, Extensiv-Begrünung 10 cm + PV-Anlage 30 kWp

- **BIM-Brücke:** `IfcWall`, `IfcSlab`, `IfcRoof`; `IfcMaterialLayerSet` für Schichtaufbau; LOD 200 (Schichten) vs. LOD 400 (Details/Anschlüsse); → Kap. 18

- **Quellen:** FK1 (Kap. 5, 6), FK2 (Details), FassadenAtlas, FlachdachAtlas, Baubuch; Holzbau: `03_Holzbau/Atlas Mehrgeschossiger Holzbau – Kaufmann (Detail).pdf`, `03_Holzbau/R04_Holz-als-konstruktiver-Baustoff.pdf`

- **Normen:** DIN 18195 (Abdichtung), DIN 4108-3 (Feuchteschutz Schichtfolge), DIN 18202 (Maßtoleranzen), DIN EN 1995 Eurocode 5 (Holzbau), DIN 4102-4 (Brandschutz Holz)

- **Querverweise:** → Kap. 3 (Baustoffe), Kap. 6 (U-Wert der Aufbauten), Kap. 7 (Feuchteschutz Detail), Kap. 8 (Schallschutz Holzbau → verweist hierher zurück)

---

### K06 — Wärmeschutz & GEG

- **Status:** `Open`
- **Zielwörter:** 2,800–3,200
- **Kernfragen:**
  - Wie verliert ein Gebäude Wärme, und wie rechne ich das?
  - Was ist der U-Wert und wie berechnet man ihn Schicht für Schicht?
  - Was schreibt das GEG 2024 vor, und wie prüft man es?

- **Pflichtabschnitte (H2):**
  - 6.1 Wärmetransport — Transmission (Wärme durch Bauteile), Lüftungswärmeverluste (Infiltration), Wärmebrücken; A/V-Verhältnis und seine Konsequenz (Rückbezug Kap. 2)
  - 6.2 U-Wert: Berechnung — Formel: U = 1 / (Rsi + Σ(d/λ) + Rse); vollständiges Rechenbeispiel an K7-Außenwand Schicht für Schicht; ⚠️ **interaktive Vergleichstabelle** (digitales Potenzial nutzen!): Dämmdicke 10/15/20/25/30 cm vs. resultierender U-Wert vs. Heizenergieeinsparung vs. Mehrkosten — zeigt wie jeder cm Dämmung wirkt; statische Tabelle als Fallback
  - 6.3 Wärmebrücken — geometrische Wärmebrücken (Ecken) vs. konstruktive (Balkonplatte, Fensterlaibung); Ψ-Wert (Linearer Wärmebrückenkoeffizient); typische Problemstellen mit Kennwerten
  - 6.4 GEG 2024 im Überblick — Referenzgebäudeverfahren; Primärenergiebedarf (Qp) und Transmissionswärmeverlust (H'T); Primärenergiefaktor je Energieträger; Energieausweis: Bedarfs- vs. Verbrauchsausweis, Energieeffizienzklassen A+ bis H
  - 6.5 Sommerlicher Wärmeschutz — oft vergessen; Sonneneintragskennwert (Sc); Sonnenschutz, Speichermasse, Nachtlüftung; überarbeitete Anforderungen GEG 2024

- **Einzuführende Begriffe:** `u-wert`, `r-wert`, `geg`, `wärmebrücke`, `transmissionswärmeverlust`, `primärenergiefaktor`

- **Bilder (min. 3):**
  - `kap06_u_wert_berechnung` — Schichtdiagramm + Rechenweg, landscape — K7-Außenwand mit Schichten, daneben tabellarischer Rechenweg d/λ, weißer Hintergrund
  - `kap06_waermebruecken` — Detailschnitt-Collage, landscape — 3 klassische Wärmebrücken: Balkonplatte, Fensterlaibung, Außenwandecke; je mit Temperaturverlauf-Indikation, weißer Hintergrund
  - `kap06_geg_anforderungen` — Infografik, portrait — GEG-Anforderungsmatrix: Bauteil-Mindest-U-Werte + Gesamtnachweis, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 6.2: U-Wert-Berechnung K7-Außenwand vollständig; Ergebnis U = 0,17 W/m²K
  - nach 6.4: GEG-Nachweis K7: Primärenergiekennwert, wo nachgebessert wurde, Energieausweis-Klasse

- **BIM-Brücke:** `Pset_WallCommon.ThermalTransmittance`; gbXML-Export für Energiesimulation; GEG-Nachweis-Software (z.B. PHPP, IDA ICE) liest BIM-Geometrie; → Kap. 18, 21

- **Quellen:** Villmann (Kap. 2, 3), Zürcher & Frank (Kap. 1, 2), EnergieAtlas

- **Normen:** GEG 2024, DIN EN ISO 6946 (U-Wert), DIN 4108-2 (Mindestwärmeschutz)

- **Querverweise:** → Kap. 2 (A/V-Verhältnis), Kap. 5 (Wandaufbauten), Kap. 7 (Feuchteschutz), Kap. 10 (Heizung und Niedrigtemperatur)

---

### K07 — Feuchteschutz

- **Status:** `Open`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Wie bewegt sich Feuchtigkeit durch Bauteile?
  - Warum schimmelt es, und wie verhindert man das konstruktiv?
  - Wann braucht man Dampfbremse, wann Dampfsperre?

- **Pflichtabschnitte (H2):**
  - 7.1 Diffusion und Konvektion — Wasserdampftransport durch Bauteile (Diffusion); Feuchtigkeit durch Luftströmung (Konvektion — der gefährlichere Pfad); sd-Wert als Maß für Diffusionsdurchlässigkeit
  - 7.2 Glaser-Verfahren — Taupunktberechnung vereinfacht: Temperaturverlauf im Bauteil + Sättigungsdruck; wo kondensiert Wasser; Grenzwert: max. 500 g/m² zulässiges Kondensat je Winter (DIN 4108-3); Rechenbeispiel an einfacher Wand
  - 7.3 Dampfbremse vs. Dampfsperre — Dampfbremse (sd < 10 m): feuchteadaptiv, für Holzbau; Dampfsperre (sd ≥ 10 m): absolut dicht, für Flachdach; wann was, mit Begründung; intelligente Dampfbremse kurz
  - 7.4 Schimmelschutz — Oberflächentemperatur (mind. 12,6 °C für rel. Feuchte 50%); Raumklima (50–55% rel. F.); Lüftungsverhalten; kritische Stellen: Wärmebrücken, Rollladenkästen
  - 7.5 Abdichtung — Keller (WU-Beton / Weiße Wanne; Schwarze Wanne: Bitumenbahn), Flachdach, erdberührte Bauteile; DIN 18195 kurz

- **Einzuführende Begriffe:** `glaser-verfahren` (wenn nicht schon früher)

- **Bilder (min. 2):**
  - `kap07_glaser` — Diagramm, landscape — Temperatur- und Sättigungsdampfdruck-Verlauf durch Wandaufbau Winter; Kondensatzone markiert, weißer Hintergrund
  - `kap07_abdichtung_keller` — Schnittdetail, portrait — Kellerwand: WU-Beton + Perimeterdämmung + Drainage, Schichten beschriftet, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 7.2: Glaser-Nachweis K7-Außenwand — tauwasserfrei, weil Holzfaser außen dampfoffen
  - nach 7.5: Kellerwandaufbau K7 — Weißer Trog, WU-Beton C30/37 + Perimeterdämmung XPS

- **BIM-Brücke:** Dampfbremsenlage in `IfcMaterialLayerSet` → `IsVapourBarrier`; Feuchtesimulation braucht Geometrie + Materialkennwerte aus IFC; → Kap. 18

- **Quellen:** Villmann, Zürcher & Frank, FK1 (Kap. 6.2), Baubuch

- **Normen:** DIN 4108-3 (Tauwasserschutz), DIN 4108-2 (Mindestwärmeschutz / Schimmel), DIN 18195 (Abdichtung)

- **Querverweise:** → Kap. 5 (Konstruktionsaufbauten), Kap. 6 (U-Wert, Wärmebrücken)

---

### K08 — Schallschutz

- **Status:** `Open`
- **Zielwörter:** 2,000–2,500
- **Kernfragen:**
  - Was macht ein Gebäude leise?
  - Wie wird Schall gemessen, und was fordert die Norm?
  - Was sind die konstruktiven Stellschrauben?

- **Pflichtabschnitte (H2):**
  - 8.1 Schallarten — Luftschall (Stimmen, Musik → R'w), Trittschall (Schritte → L'n,w), Körperschall (Rohre, Maschinen); Flankenübertragung als oft unterschätzter Pfad
  - 8.2 Schalldämmmaß R'w — Was es bedeutet (Differenz in dB); Masse-Gesetz (Verdopplung Masse → +6 dB); DIN 4109: Mindestanforderungen (Trennwände MFH: R'w ≥ 53 dB; Decken: R'w ≥ 54 dB, L'n,w ≤ 53 dB); erhöhter Schallschutz (VDI 4100 Stufe II/III)
  - 8.3 Konstruktive Maßnahmen — Entkopplung (schwimmender Estrich + Trittschalldämmung, Gummilager für Anlagen); Masse (Betondecken); zweischalige Konstruktionen (Vorsatzschale mit Luftspalt); Installationsschächte schalltechnisch entkoppeln
  - 8.4 Schallschutz im Holzbau — Flankenübertragung besonders problematisch; kurzer Verweis auf Kap. 5 (dort vollständig); hier nur: warum Holz schwieriger ist als Beton (Masse-Gesetz benachteiligt leichte Bauteile), und welche Lösungsstrategie (Entkopplung + schwere Einlagen)
  - 8.5 Raumakustik ⚠️ NEU — von Luft- und Trittschall-Dämmung trennen: Raumakustik beschreibt die Klangqualität im Raum selbst, nicht das Schalldurchgang zwischen Räumen; Nachhallzeit T (RT60): Wohnung ≤ 0,5 s, Treppenhaus ≤ 1,2 s, Gemeinschaftsraum ≤ 0,8 s; vereinfacht: T = 0,163 × V/A (Sabine-Formel); Absorptionsfläche erhöhen durch: Teppich, Akustikdecken (Holzwolle-Platten, Mineralfaser), Vorhänge, Mobiliar; relevante Räume in MFH: Treppenhaus (Hall durch harte Oberflächen), Eingangszone, Tiefgarage; geregelt in DIN 18041 (primär Unterrichtsräume, aber als Orientierung für Gemeinschaftsflächen nutzbar); kurz halten — kein vollständiges Raumakustikkapitel

- **Einzuführende Begriffe:** `schallschutz-rw`

- **Bilder (min. 2):**
  - `kap08_schallpfade` — Diagramm, landscape — Grundriss-Ausschnitt zweier Wohnungen, Schallpfade: direkt + Flanken eingezeichnet, weißer Hintergrund
  - `kap08_deckenaufbau_schall` — Querschnitt, portrait — Deckenaufbau mit Trittschalldämmung und schwimmendem Estrich, Entkopplungsschichten markiert, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 8.3: Deckenaufbau K7 schalltechnisch: Betondecke 22 cm + Trittschalldämmung 3 cm + FBH-Estrich 7 cm; resultierendes L'n,w ca. 48 dB (besser als Mindest)

- **BIM-Brücke:** `Pset_WallCommon.AcousticRating`; `IfcSpace`-Properties für Raumakustik-Anforderungen; → Kap. 18

- **Quellen:** Villmann (Kap. 5), FK1, Haustechnik (Installationsschächte)

- **Normen:** DIN 4109-1 (Anforderungen), DIN 4109-2 (Nachweise), VDI 4100 (erhöhter Schallschutz)

- **Querverweise:** → Kap. 5 (Deckenaufbau), Kap. 12 (Sanitär und Körperschall)

---

### K09 — Brandschutz

- **Status:** `Open`
- **Zielwörter:** 2,000–2,500
- **Kernfragen:**
  - Was schreibt die Bauordnung zum Brandschutz vor?
  - Was bedeuten die Klassen und Klassen-Kürzel?
  - Wie wird ein Rettungsweg geometrisch geplant?

- **Pflichtabschnitte (H2):**
  - 9.1 Baustoffklassen — Euroklassen A1, A2-s1d0, B, C, D, E, F; deutsche Entsprechung A1/A2, B1, B2, B3; was brennt wie (Entflammbarkeit, Rauchentwicklung, brennendes Abtropfen); Tabelle mit typischen Baustoffen je Klasse
  - 9.2 Feuerwiderstandsklassen — REI 30/60/90 (Tragfähigkeit R, Raumabschluss E, Wärmedämmung I); F30/F60/F90 als ältere Bezeichnung; was eine F90-Decke in der Praxis bedeutet (Betondecke ab 12 cm mit Mindestüberdeckung)
  - 9.3 Gebäudeklassen nach MBO — GK 1 (EFH, 2 WE) bis GK 5 (>7 Geschosse oder >22 m); Anforderungen je GK: Anforderungen tragende Bauteile, Treppenhaus, Rettungsweg; K7 = GK 4 (4 Vollgeschosse < 13 m)
  - 9.4 Brandabschnitte und Rettungswege — Brandwand (Anforderung REI 90-M), Brandabschnittslänge, notwendige Flure und Treppen; Fluchtweglänge max. 35 m (MBO); Treppenhaus als notwendiges Treppenhaus (NTH)
  - 9.5 Sonderfälle — Tiefgarage (CO-Abführung, Sprinkler wenn > 1.000 m²); Holzbau (Kapselung K60, Abbrandrate 0,65 mm/min); wann Brandschutzgutachter

- **Einzuführende Begriffe:** `rei`, `mbo` (schon in Kap. 2 eingeführt — hier nur nutzen)

- **Bilder (min. 2):**
  - `kap09_gebaeudeklassen` — Vergleichsinfografik, landscape — GK 1–5 als Gebäudesilhouetten mit Höhe, Anforderungen und typischem Beispiel, weißer Hintergrund
  - `kap09_rettungsweg` — Grundriss-Diagramm, portrait — Treppenhaus als NTH, Fluchtweglänge ≤ 35 m, Brandabschnittsgrenzen, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 9.3: K7 = GK 4 — Anforderungen: tragende Wände F90, NTH mit Rauchabzug, Brandwand zur Nachbarbebauung
  - nach 9.4: Rettungsweg K7 — max. Fluchtweglänge 18 m (gut unter Grenze), alle Wohnungen direkt an NTH

- **BIM-Brücke:** `Pset_WallCommon.FireRating`; Brandabschnittsmodell; Rettungswegprüfung als BIM-Use-Case (Navisworks/Solibri); → Kap. 21

- **Quellen:** FK1 (Kap. 1.5), MBO als Primärquelle

- **Normen:** MBO §26–§35 (Brandschutz), DIN 4102 (Baustoffklassen), EN 13501 (Euroklassen)

- **Querverweise:** → Kap. 2 (Gebäudeklasse und Grundriss), Kap. 4 (tragende Bauteile), Kap. 14 (Planungsrecht)

---

### K10 — Heizung & Wärmeversorgung

- **Status:** `Open`
- **Zielwörter:** 2,800–3,200
- **Kernfragen:**
  - Wie wird ein Gebäude warm — welche Systeme gibt es?
  - Warum ist der Wärmeerzeuger nicht mehr die entscheidende Frage?
  - Was bedeutet hydraulischer Abgleich, und warum ist er Pflicht?

- **Pflichtabschnitte (H2):**
  - 10.1 Warum TGA Systemdenken braucht — Einleitung mit Rückbezug Kap. 1 (Schicht TGA); 30–40% Baukosten, bestimmt Schachte und Deckenhöhen; Architekt muss die richtigen Fragen stellen
  - 10.2 Wärmeerzeuger im Vergleich — Gas/Öl (Auslaufperspektive GEG 2024), Wärmepumpe (Luft-Wasser: COP 3–4; Sole-Wasser: COP 4–5; JAZ), Fernwärme (Übergabestation, Primärenergiefaktor je Netz), Pellets/Biomasse, Solarthermie als Ergänzung; Tabelle: Investition, Betriebskosten, CO₂, GEG-Eignung
  - 10.3 Wärmeverteilung — Heizkörper (Vorlauf 70/55 °C) vs. Fußbodenheizung (Vorlauf 35/28 °C); Rohrnetz: Vor- und Rücklauf, Ringkreis vs. Sternverteilung; hydraulischer Abgleich: warum (alle Kreise gleich warm), Methode A/B nach DIN EN 1264; GEG-Pflicht seit 2023
  - 10.4 Warmwasserbereitung — zentral (Speicher, Zirkulation → Legionellenproblem, 60°C-Regel) vs. dezentral (Durchlauferhitzer, Kleinspeicher); Zirkulationsleitung und Dämmung nach GEG
  - 10.5 Dimensionierung als Konzept — Heizlastberechnung nach DIN EN 12831; was steckt dahinter (Transmissions- + Lüftungswärmeverlust); typische Kennzahlen: Neubau GEG ~25–35 W/m², Altbau 60–100 W/m²

- **Einzuführende Begriffe:** `fbh`, `hydraulischer-abgleich`

- **Bilder (min. 3):**
  - `kap10_waermeerzeuger_vergleich` — Infografik/Tabelle, landscape — Wärmeerzeuger im Vergleich: COP/JAZ, CO₂, GEG-Eignung, Investitionskosten-Tendenz, weißer Hintergrund
  - `kap10_heizkreis_schema` — Schemadiagramm, landscape — Fernwärme-Station → Puffer → Heizkreisverteiler → 3 FBH-Kreise mit Vor-/Rücklauf, Zähler, weißer Hintergrund
  - `kap10_fbh_aufbau` — Querschnitt, portrait — FBH-Systemaufbau: Systemträger, Rohr, Estrich; Temperaturverlauf Pfeile; → Bezug Kap. 5 Deckenaufbau, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 10.2: Fernwärme-Entscheidung K7 — Primärenergiefaktor des Netzes, Wirtschaftlichkeitsvergleich Wärmepumpe
  - nach 10.3: Heizungskonzept K7 — Fernwärme-Übergabestation Keller, 3 Heizkreise FBH, Schachtführung Treppenhauskern, hydraulischer Abgleich Methode B

- **BIM-Brücke:** `IfcBoiler`, `IfcPipeSegment`, `IfcFlowController`; MEP-Modell; Kollisionsprüfung Heizung vs. Deckenunterkante; `Pset_SpaceHeatingRequirements`; → Kap. 18, 21

- **Quellen:** Haustechnik (Laasch, Kap. 3–6), NachhaltigeGT

- **Normen:** GEG 2024, DIN EN 12831 (Heizlast), DIN EN 1264 (FBH + hydraulischer Abgleich)

- **Querverweise:** → Kap. 1 (TGA als Schicht), Kap. 5 (Deckenaufbau), Kap. 6 (Niedrigtemperatur setzt gute Dämmung voraus), Kap. 11 (Lüftung), Kap. 22 (Nachhaltigkeit Wärmeerzeuger)

---

### K11 — Lüftung & Raumluftqualität

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wann reicht Fensterlüftung nicht mehr?
  - Wie funktioniert eine KWL, und wie viel Platz braucht sie?
  - Was ist der Unterschied zwischen dezentraler und zentraler Anlage?

- **Pflichtabschnitte (H2):**
  - 11.1 Warum gut gedämmte Gebäude mechanisch lüften müssen — natürliche Lüftung: Thermik, Querlüftung; ab n50 < 1,5 h⁻¹ reicht Fensterlüftung hygienisch nicht; CO₂-Anstieg, VOC, Feuchteschutz
  - 11.2 Kontrollierte Wohnraumlüftung (KWL) — Funktionsprinzip: Zuluft (Schlaf/Wohn) ↔ Abluft (Küche/Bad); Wärmerückgewinnung η > 80%; Volumenstrom nach DIN 1946-6 (mind. 25 m³/h je Person); Filterklassen
  - 11.3 Zentral vs. dezentral — Zentralgerät + Kanalnetz: gleichmäßige Versorgung, Wartung an einem Punkt, viel Platz; dezentrale Einzelgeräte je Wohnung: kein gemeinsames Netz, Wohnungszugang für Wartung; K7 = dezentral
  - 11.4 Schächte und Grundrissplanung — wie viel Platz braucht Lüftung; Kanalquerschnitte: Rechteck 200×100 mm für 100 m³/h; Schacht 30×30 cm für ein dezentrales Gerät; Abstandsregeln zu Heizung
  - 11.5 RLT-Anlagen für Gewerbe — Vollklimaanlage: Kühlen, Heizen, Befeuchten, Filtern; Außenluftrate nach ASR A3.6; relevanter Planungsparameter für Büro/Gewerbe-Projekte

- **Einzuführende Begriffe:** `kwl`

- **Bilder (min. 2):**
  - `kap11_kwl_schema` — Schemadiagramm, landscape — Wohnungsschnitt mit KWL-Gerät, Zuluftkanäle (blau) → Wohnräume, Abluft (rot) ← Küche/Bad, Wärmetauscher im Gerät, weißer Hintergrund
  - `kap11_kanalquerschnitte` — Vergleichsdiagramm, portrait — Kanaltypen mit Querschnitten und Volumenströmen, Maße, Deckenhöhenbedarf, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 11.3: Dezentrale KWL K7 — ein Gerät je Wohnung (12 Stk.), Küche + Bad als Abluftbereiche, Zuluft Schlaf-/Wohnzimmer, Schacht nur für Außenluft/Fortluft

- **BIM-Brücke:** `IfcAirTerminal`, `IfcDuctSegment`, `IfcFan`; Kollisionsszenarien Lüftung/Tragwerk; Luftmengen als `IfcPropertySingleValue`; → Kap. 18

- **Quellen:** Haustechnik (Laasch, Kap. 7–9)

- **Normen:** DIN 1946-6 (Lüftungskonzept Wohngebäude), VDI 6022 (Hygiene RLT), ASR A3.6 (Büro Außenluft)

- **Querverweise:** → Kap. 7 (Feuchteschutz und Lüftung), Kap. 10 (Heizung und Lüftung kombiniert)

---

### K12 — Sanitär & Entwässerung

- **Status:** `Open`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Wie kommt Trinkwasser rein, wie geht Abwasser raus?
  - Was sind die Hygieneanforderungen, die den Planer zwingen?
  - Warum ist Leitungsführung eine Entwurfsaufgabe?

- **Pflichtabschnitte (H2):**
  - 12.1 Trinkwasserinstallation — Hauswasserstation, Druckzonenmanagement (>5 Etagen: Druckerhöhung); Rohrmaterial (Edelstahl, Kupfer, Kunststoff-PE-Xa); Stagnation vermeiden (kurze Stichleitungen ≤ 3 Liter); TRWI (DIN EN 806, DIN 1988)
  - 12.2 Warmwasserbereitung und Legionellen — Zentralspeicher ≥ 60 °C; Zirkulationsleitung mit Dämmung; Hygieneanforderungen TRWI; dezentrale Alternative
  - 12.3 Entwässerung — Schmutzwasser vs. Regenwasser (Trennsystem in D Pflicht); Fallleitungen (DN 100), Sammelleitung (Gefälle mind. 1:50), Reinigungsöffnungen; Rückstausicherung (Rückstauverschluss, Hebeanlage wenn unter Rückstauebene)
  - 12.4 Sanitärobjekte und Barrierefreiheit — Bodenablauf (barrierefreie Dusche ebenerdige Dusche), WC-Anschlussmaße, Handwaschbecken-Mindestabstände (Neufert), rollstuhlgerechte Dusche 1,50 × 1,50 m
  - 12.5 Leitungsführung als Entwurfsthema — Steigschächte: warum alle Nassräume übereinander; Kellerverrohrung; Dachentwässerung: Einläufe + Notüberlauf (DIN EN 12056); **Aufzugsschacht als Konkurrent:** keine TGA-Leitungen durch den Aufzugsschacht führen — eigener separater Schacht für Aufzug; Koordination von Steigschacht-Lage und Aufzugsschacht früh in LP 2 klären (→ Kap. 5 für Schachtdimensionen)

- **Einzuführende Begriffe:** `dvgw` (Regelwerk Trinkwasser)

- **Bilder (min. 2):**
  - `kap12_steigschacht` — Schnittschema, portrait — vier Geschosse übereinander, Steigschacht mit Kalt-/Warmwasser und Zirkulation, Anschlüsse je Wohnung, weißer Hintergrund
  - `kap12_entwasserungsschema` — Schemadiagramm, landscape — Fallleitung + Sammelleitung + Grundleitung + Kanalanschluss, Rückstauebene eingezeichnet, Hebeanlage, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 12.5: Sanitärschema K7 — 2 Steigschächte für je 2 Wohnungen pro Geschoss, Kellerverteilung, Dachentwässerung zu Zisterne 10.000 L

- **BIM-Brücke:** `IfcSanitaryTerminal`, `IfcPipeSegment`, `IfcValve`; Fallleitungsführung als häufige Kollisionsquelle; Trinkwasserhygiene-Properties; → Kap. 18

- **Quellen:** Haustechnik (Laasch, Kap. 10–13), Neufert (Sanitärmaße)

- **Normen:** DIN EN 806 (Trinkwasserinstallation), DIN 1988 (TRWI), DIN EN 12056 (Entwässerung), DIN 18040-2 (Barrierefreiheit Sanitär)

- **Querverweise:** → Kap. 1 (Schächte und Koordination), Kap. 8 (Körperschall Rohrleitungen)

---

### K13 — Elektro & Gebäudeautomation

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Was steckt hinter Schaltern und Steckdosen?
  - Was ist Smart Building wirklich — und was braucht es?
  - Warum ist PV seit GEG 2024 kein Exkurs mehr?

- **Pflichtabschnitte (H2):**
  - 13.1 Elektrische Grundversorgung — Hausanschluss (NS-Kabel vom Netz), Zähleranlage (getrennt je Wohnung + Allgemeinstrom), Unterverteilung; RCD (FI-Schutzschalter), Leitungsschutzschalter, Potentialausgleich
  - 13.2 Leitungsführung — Unterputz (UP) vs. Kabelkanal vs. Kabeltrasse; Mindestabstände zu anderen Gewerken; Leerrohre als Vorhaltung
  - 13.3 Beleuchtungsplanung — Beleuchtungsstärke nach DIN EN 12464 (Wohnen 100 lx, Büro 500 lx); LED-Technik (Lichtfarbe CCT, CRI); Notbeleuchtung (Rettungszeichen), Bewegungsmelder
  - 13.4 Schwachstromtechnik — Glasfaser/LAN (Gigabit-Pflicht Neubau ab 2023), Brandmeldeanlage, Einbruchmeldeanlage, Videosprechanlage, EV-Ladeinfrastruktur (GEG §72 Stellplatz-Pflicht Neubau); **Aufzugssteuerung** (DIN EN 81-20): separater Starkstromkreis 400 V, Aufzugsnotruf nach EN 81-28 (Pflicht), Notstromversorgung für Aufzugsbeleuchtung + Notruf; bei GK 4 kein Feuerwehraufzug erforderlich (erst GK 5 > 7 Geschosse); Aufzug rechtzeitig in Elektroplanung LP 2/3 integrieren
  - 13.5 Photovoltaik — Funktionsprinzip, Ertrag (900–1.100 kWh/kWp·a in D), Wechselrichter, Eigenverbrauch vs. Einspeisung; GEG 2024 und Solarenergiepflicht der Länder; K7 mit 30 kWp
  - 13.6 Gebäudeautomation — KNX (Bus-Standard DE), BACnet (Gewerbe), DALI (Licht); Visualisierung/Gebäudeleittechnik; Energiemanagement: Lastspitzen kappen, Smart Meter

- **Einzuführende Begriffe:** — (keine spezifischen Glossar-Terms geplant)

- **Bilder (min. 2):**
  - `kap13_zaehleranlage` — Schaltplan-Schematik, portrait — Hausanschlusskasten → Hauptverteiler → 12× Wohnungszähler + Allgemeinstrom, Symbole, weißer Hintergrund
  - `kap13_pv_konzept` — Dachdraufsicht + Systemdiagramm, landscape — PV-Anlage auf Flachdach K7, Wechselrichter, Eigenverbrauch/Einspeisung-Pfeile, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 13.6: Elektrisches Konzept K7 — 12 Wohnungszähler + Allgemeinstrom, PV 30 kWp Flachdach, KNX-Grundinstallation, 10 EV-Ladepunkte Tiefgarage (11 kW je)

- **BIM-Brücke:** `IfcElectricDistributionBoard`, `IfcLamp`, `IfcSensor`; Smart-Building-Datenmodelle und digitaler Zwilling → Kap. 24

- **Quellen:** Haustechnik (Laasch, Kap. 14–17)

- **Normen:** DIN VDE 0100 (Errichten von Niederspannungsanlagen), DIN EN 12464 (Beleuchtung), GEG 2024 §72 (EV-Ladeinfrastruktur)

- **Querverweise:** → Kap. 10 (Energiemanagement Heizung), Kap. 22 (PV und Nachhaltigkeit), Kap. 24 (Digitaler Zwilling)

---

### K14 — Planungsrecht

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wer darf wo was bauen — wie ist das Baurecht aufgebaut?
  - Wie liest man einen Bebauungsplan, bevor der Stift ansetzt?
  - Was passiert im Genehmigungsverfahren?
  - *(IT-Perspektive)* Wie ist Planungsrecht ein Constraint-System, das BIM-Modelle von außen beschränkt — und welche dieser Constraints sind heute schon automatisierbar prüfbar?

- **Pflichtabschnitte (H2):**
  - 14.1 Das Baurecht-System — dreistufig: BauGB (Bundesrecht) → LBO/MBO (Landesrecht) → örtliche Satzungen; BauNVO als Verordnung zum BauGB; **IT-Einstieg:** Planungsrecht als Constraint-System — der B-Plan definiert Parameter (GRZ, GFZ, Traufhöhe, Nutzungsart), das Modell muss diese einhalten; GFZ-Prüfung ist heute aus IFC-Flächen automatisierbar; vollautomatische Code-Compliance (alle Abstandsflächen, alle Brandschutzanforderungen aus Modell) ist ein offenes Forschungsfeld (→ Kap. 24 für Ausblick)
  - 14.2 Bebauungsplan lesen — Festsetzungen: Art der Nutzung (WA, WR, MI, GE, GI), GRZ, GFZ, Traufhöhe, Firsthöhe, Baugrenzen, Baulinien; was fehlt wenn kein B-Plan: §34 (Innenbereich, Einfügen), §35 (Außenbereich, Privilegierung)
  - 14.3 Genehmigungsverfahren — Beteiligte: Bauherr, Entwurfsverfasser (mit Bauvorlageberechtigung), Nachbarn (Abstandsflächen), TÖB; vereinfachtes vs. reguläres Verfahren; Zeitablauf 3–12 Monate; Baulast
  - 14.4 Abstandsflächen — Berechnung: Wandhöhe × Faktor (0,4 in WA, 1,0 bei Wandhöhe > 16 m); Mindestabstand 3 m; Zusammenrechnung bei Grundstücksgrenzen; Ausnahmen
  - 14.5 Sonderthemen — Denkmalschutz (Einschränkungen + Ausnahmen im GEG); Teilungsgenehmigung; Nachbarzustimmung; Bebauungsplanänderung; Befreiungen §31 BauGB

- **Einzuführende Begriffe:** `hoai` (kurze Einführung, Vertiefung in Kap. 15), `mbo` (schon eingeführt in Kap. 2), `vob` (hier erste kurze Erwähnung)

- **Bilder (min. 2):**
  - `kap14_baurecht_hierarchie` — Pyramidendiagramm, portrait — BauGB → LBO → örtliche Satzungen, mit Beispielen je Ebene, weißer Hintergrund
  - `kap14_bebauungsplan_legende` — Planausschnitt + Legende, landscape — schematischer B-Plan-Auszug mit allen gängigen Festsetzungen annotiert, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 14.2: B-Plan K7 — WA (allgemeines Wohngebiet), GRZ 0,6 (Ausnahmewert), GFZ 2,4; Traufhöhe 13 m als Grenze für GK 4
  - nach 14.3: Genehmigungsverfahren K7 — reguläres Verfahren (GK 4), Zeitablauf, Nachbarzustimmung wegen GRZ 0,6

- **BIM-Brücke:** Planungsrecht als Datenanforderung (GFZ-Prüfung automatisierbar); `IfcSite` und Geländemodell; GIS-Schnittstellen; Building Permits als BIM-Use-Case; → Kap. 18, 19

- **Quellen:** BauGB als Primärquelle, MBO, BauNVO

- **Normen:** BauGB, BauNVO, MBO/LBO (länderspezifisch)

- **Querverweise:** → Kap. 2 (GRZ/GFZ im Entwurf), Kap. 9 (Gebäudeklassen), Kap. 15 (HOAI Leistungsphasen)

---

### K15 — HOAI: Phasen, Leistungen, Koordination

- **Status:** `Open`
- **Zielwörter:** 2,800–3,200
- **Kernfragen:**
  - Wie ist ein Bauprojekt organisiert — wer macht was wann?
  - Was leisten die 9 HOAI-Phasen, und warum sind sie so aufgeteilt?
  - Wie passt BIM in die Leistungsphasen?

- **Pflichtabschnitte (H2):**
  - 15.1 Die neun Leistungsphasen — LP 1 (Grundlagenermittlung), LP 2 (Vorplanung, Kostenschätzung DIN 276), LP 3 (Entwurfsplanung, Kostenberechnung), LP 4 (Genehmigungsplanung, Bauantrag), LP 5 (Ausführungsplanung — die meiste Arbeit, Werkpläne), LP 6 (Vorbereitung Vergabe, LV), LP 7 (Mitwirkung Vergabe), LP 8 (Bauoberleitung — Baustelle), LP 9 (Objektbetreuung, Gewährleistung); je Phase: Ergebnis, beteiligte Fachplaner
  - 15.2 Honorarberechnung — anrechenbare Kosten (Bau + TGA, nicht Grundstück), Honorarzonen I–V, Mindestsatz; Beispielrechnung K7
  - 15.3 Fachplaner und ihre Rollen — Tragwerksplanung (LP 2–6), TGA (LP 2–8 je Gewerk), Brandschutz (LP 2–4 + 8), Bauphysik (LP 2–5); wer koordiniert wen (Objektplaner Architekt als Koordinator)
  - 15.4 BIM in den Leistungsphasen — LOD 100 (LP 1), LOD 200 (LP 2–3), LOD 300 (LP 5), LOD 400 (Ausführung/Vergabe), LOD 500 (as-built); AIA (Auftraggeber-Informations-Anforderungen) als Steuerungsinstrument; BIM-Manager als neue Rolle
  - 15.5 BIM-Ausführungsplan (BAP/BEP): Inhalt und Struktur ⚠️ NEU — der BAP ist das zentrale Steuerungsdokument eines BIM-Projekts; typische Kapitelstruktur: (1) Projektziele und BIM-Anwendungsfälle, (2) Modellstruktur und Namenskonventionen (Koordinatenursprung, Dateibenennungsschema), (3) LOD-Matrix je Disziplin und Leistungsphase, (4) Software und Dateiformate (IFC-Version, MVD, Exporteinstellungen), (5) CDE-Nutzungsvereinbarungen (Statusworkflow, Benennung nach ISO 19650), (6) Qualitätssicherung (wer prüft was wann — Kollisionsrunde, Modellkoordination), (7) Rollen und Verantwortlichkeiten (BIM-Manager, BIM-Koordinator je Gewerk, BIM-Autoren); Erstellung: AG-seitig AIA → AN-seitig BAP als Antwort darauf; Zeitpunkt: BAP fertig vor LP 3-Start; Praxisproblem: BAP-Vorlage oft copy-paste aus Vorprojekt ohne Anpassung

- **Einzuführende Begriffe:** `hoai`, `lod`, `bap`

- **Bilder (min. 2):**
  - `kap15_leistungsphasen` — Zeitstrahl, landscape — LP 1–9 als Balken mit Ergebnis je Phase, Fachplaner-Beteiligung als farbige Linien darunter, weißer Hintergrund
  - `kap15_bim_lod` — Progression, landscape — Gebäudemodell K7 in LOD 100/200/300/500 nebeneinander, zunehmender Detailgrad sichtbar, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 15.1: Projektzeitplan K7 — LP 1 (3 Monate), LP 2–3 (4 Monate), LP 4 (2 Monate Genehmigung + 8 Monate Wartezeit), LP 5 (6 Monate), LP 6–7 (3 Monate), LP 8 (14 Monate Bauzeit), LP 9 (5 Jahre)
  - nach 15.4: AIA K7 — welches Modell in welcher LP, LOD-Anforderungen je Disziplin

- **BIM-Brücke:** LOD-Konzept zentral; AIA/EIR als Informationsanforderungen; BIM-Manager vs. BIM-Koordinator; → Kap. 17, 20

- **Quellen:** HOAI 2021 als Primärquelle, ISO19650

- **Normen:** HOAI 2021, DIN 276 (Kosten)

- **Querverweise:** → Kap. 16 (Kosten und LV), Kap. 17 (Was BIM ist), Kap. 20 (CDE und ISO 19650)

---

### K16 — Kosten & Ausschreibung

- **Status:** `Open`
- **Zielwörter:** 2,800–3,200 ↑
- **Kernfragen:**
  - Was kostet ein Gebäude wirklich, und wie ermittelt man das?
  - Was ist ein Leistungsverzeichnis, und wie entsteht es?
  - Was regelt die VOB im Bauvertrag?
  - In welcher Reihenfolge bauen die Gewerke, und was passiert wenn einer im Verzug ist?

- **Pflichtabschnitte (H2):**
  - 16.1 Kostenermittlung nach DIN 276 — Kostengliederung KG 100–700; Kostenkennwerte in €/m² BGF für MFH (Rohbau ca. 600–900 €/m², Gesamtbau 2.500–4.000 €/m²); Schätzung (LP 2) → Berechnung (LP 3) → Anschlag (LP 6) → Feststellung (Abschluss)
  - 16.2 Leistungsverzeichnis und Ausschreibung — STLB-Bau: Standardtexte je Gewerk; LV-Aufbau: OZ, Menge, Einheit, Kurztext, Einheitspreis, Gesamtpreis; öffentliche Vergabe (UVgO, VgV) vs. freie Vergabe
  - 16.3 VOB/B Grundlagen — Vertragstypen: Einheitspreisvertrag (Mengen offen), Pauschalvertrag (Festpreis), GU-Vertrag; Nachträge (wann berechtigt: geänderte/zusätzliche Leistung §1/2 VOB/B); Abnahme (förmlich, fiktiv); Gewährleistung 4 vs. 5 Jahre
  - 16.4 Baustellenablauf und Gewerkekoordination ⚠️ AUSGEBAUT — was Quereinsteiger am meisten überrascht: Reihenfolge der Gewerke ist nicht flexibel; Rohbau → Dach/Dichtheit → Innenausbau-Reihenfolge (Estrich vor Trockenbau? oder umgekehrt?); was ein Bauzeitenplan (Balkenprogramm) ist und wer ihn macht; kritischer Pfad (was verzögert alles andere?); Behinderungsanzeige: wann und warum schriftlich; Abnahme je Gewerk vs. Gesamtabnahme; Mängelprotokoll und Beseitigungsfristen; Baustelleneinrichtungsplan: Kranstandort, Materiallager, Zufahrt

- **Einzuführende Begriffe:** `vob`

- **Bilder (min. 2):**
  - `kap16_din276_struktur` — Baumdiagramm, portrait — KG 100–700 mit typischen Kostenanteilen (% vom Gesamt), weißer Hintergrund
  - `kap16_lv_auszug` — Tabellendarstellung, landscape — LV-Ausschnitt 3–4 Positionen Mauerwerk mit OZ, Menge, Einheit, Kurztext; schematisch, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 16.1: Kostenschätzung K7 — BGF 1.800 m² × 3.200 €/m² = 5,76 Mio. €; Aufschlüsselung KG 300/400/500/700
  - nach 16.3: Vertragsstruktur K7 — Einheitspreisverträge Rohbau + TGA-Gewerke; GU-Option wurde geprüft aber verworfen

- **BIM-Brücke:** 5D-BIM (Kosten im Modell); Mengenermittlung aus `IfcQuantitySet`; LV-Positionen aus Modellobjekten; GAEB-Format DA86; → Kap. 18, 19

- **Quellen:** VOB/B als Primärquelle, DIN 276

- **Normen:** DIN 276 (Kosten), VOB/A+B+C, UVgO, VgV

- **Querverweise:** → Kap. 15 (HOAI Leistungsphasen und Kostenstufen), Kap. 19 (Klassifikation und STLB)

---

### K17 — Was BIM wirklich ist

- **Status:** `Open`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Was ist BIM — und was ist es nicht?
  - Was ändert sich wirklich im Planungsprozess?
  - Warum ist offenes BIM so schwer?

- **Pflichtabschnitte (H2):**
  - 17.1 Drei Dimensionen von BIM — (1) Methode (Prozess, nicht Software), (2) Datenmodell (semantisch angereichertes 3D), (3) Prozess (wer liefert wann welche Information); alle drei zusammen = BIM
  - 17.2 Was BIM löst — Kollisionsprüfung (hard/soft/workflow), Mengenermittlung, Energiesimulation, Terminplanung (4D), Kostenkopplung (5D), Facility Management (6D/7D); was BIM nicht löst (schlechte Planung automatisch)
  - 17.3 BIM-Reifegradstufen — Little BIM vs. Big BIM; BIM Level 1/2/3 (UK-Modell); offenes BIM (IFC) vs. proprietäre Ökosysteme (Revit-Only); warum Offenheit die bessere Langzeitstrategie ist
  - 17.4 BIM im deutschen Markt — Stufenplan Digitales Planen und Bauen (BMVI 2015); VDI 2552; öffentliche Auftraggeber (Bahn, Autobahn, BBSR); aktueller Stand: weit verbreitet im Infrastrukturbau, im Hochbau noch inhomogen

- **Einzuführende Begriffe:** `bim`, `ifc` (Einführung — Vertiefung in Kap. 18), `bcf`

- **Bilder (min. 2):**
  - `kap17_bim_dimensionen` — Infografik, landscape — 3D/4D/5D/6D/7D visuell erklärt, je mit konkretem Beispiel, weißer Hintergrund
  - `kap17_prozessvergleich` — Flussdiagramm, landscape — Planungsprozess klassisch vs. BIM: Informationsfluss, Koordinationspunkte, Kollisionszeitpunkte, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 17.1: BIM-Modell K7 — welche Disziplinen liefern welches Teilmodell; Koordinationsmodell als Zusammenführung

- **BIM-Brücke:** Kapitel IS die BIM-Brücke — Übergang zu Kap. 18 (IFC), 19 (Klassifikation), 20 (Prozess)

- **Quellen:** DINSPEC, ISO19650, Ridder (Kap. 1)

- **Normen:** VDI 2552 (BIM-Begriffe), ISO 19650-1/2, DIN SPEC 91391

- **Querverweise:** → Kap. 15 (HOAI + LOD), Kap. 18 (IFC), Kap. 20 (CDE), Kap. 21 (Software)

---

### K18 — IFC: Die Sprache des digitalen Gebäudes

- **Status:** `Open`
- **Zielwörter:** 4,000–5,000 ↑↑ — **Kernkapitel für Zielgruppe; lieber zu lang als zu kurz**
- **Kernfragen:**
  - Wie ist IFC aufgebaut — was ist die Projektstruktur?
  - Wie lese ich ein IFC-Modell als Entwickler — wie traversiere ich es programmatisch?
  - Wie werden Geometrie, Properties und Beziehungen kodiert?
  - Welche Fallstricke gibt es beim IFC-Export aus authoring tools?

- **Pflichtabschnitte (H2):**
  - 18.1 Projektstruktur — `IfcProject` → `IfcSite` → `IfcBuilding` → `IfcBuildingStorey` → `IfcSpace`; Objekthierarchie; wie Containment-Beziehungen (`IfcRelAggregates` vs. `IfcRelContainedInSpatialStructure`) funktionieren und wo der Unterschied liegt
  - 18.2 Die wichtigsten Entitäten — Architektur: `IfcWall`, `IfcSlab`, `IfcRoof`, `IfcDoor`, `IfcWindow`, `IfcStair`; Tragwerk: `IfcColumn`, `IfcBeam`, `IfcFooting`; TGA: `IfcFlowSegment`, `IfcFlowTerminal`, `IfcDistributionSystem`; je: wofür, wichtigste Properties, typische Fehler beim Export
  - 18.3 Geometrierepräsentation — SweptSolid (Extrusion: am häufigsten), Brep (Boundary Representation: für komplexe Formen), CSG (Boolean: selten in IFC direkt), Clipping; warum Revit standardmäßig SweptSolid exportiert; was dabei verloren geht; wie man Geometrietyp in STEP erkennt (`IFCEXTRUDEDAREASOLID`)
  - 18.4 Properties und PropertySets — standardisierte Psets (z.B. `Pset_WallCommon`: FireRating, ThermalTransmittance, LoadBearing); benutzerdefinierte Psets (wann sinnvoll, Naming-Konventionen); QuantitySets (Mengen formal: `Qto_WallBaseQuantities`); Properties als maschinenlesbare Semantik — warum das für Software wichtig ist
  - 18.5 Beziehungen in IFC — `IfcRelContainedInSpatialStructure`, `IfcRelAssociatesMaterial`, `IfcRelDefinesByType`, `IfcRelConnectsElements`; warum Beziehungen wichtiger sind als Objekte; wie man von einem Element zu seinem Material kommt (3 Schritte); IfcOwnerHistory als Metadaten-Container
  - 18.6 STEP-Format manuell lesen ⚠️ WICHTIG FÜR ENTWICKLER — vollständig annotiertes Beispiel: eine IfcWall von K7 in STEP-Text; Zeilennummern, Entitäts-IDs, Argumentlisten; wie man mit grep/Python erste Fragen stellt; häufige Fehlertypen (doppelte GUIDs, fehlende Containment, leere Geometrie)
  - 18.7 Programmatischer Zugriff mit IfcOpenShell ⚠️ NEU — Zielgruppe (Informatiker) direkt abholen; 10-Zeilen-Python: IFC laden, alle Wände ausgeben, Pset lesen; IfcOpenShell als de-facto Standard; Alternativen (.NET: xBIM; JS: web-ifc); was man damit bauen kann — genug um eigene Werkzeuge zu schreiben
  - 18.8 IFC-Versionen und MVD ⚠️ ERWEITERT — IFC2x3 (noch ca. 60% Marktanteil DE), IFC4 (aktuell, besser strukturiert), IFC4.3 (Infrastruktur + Brücken); was sich geändert hat; warum IFC2x3 trotzdem noch relevant ist; Empfehlung: für Neuprojekte IFC4; **MVD (Model View Definition):** warum IFC-Export zwischen Tools so stark variiert — eine MVD definiert den Sub-Schema-Subset, der für einen Anwendungsfall gültig ist; wichtigste MVDs: Coordination View 2.0 (IFC2x3, de-facto-Standard für Koordination DE), Reference View 1.2 (IFC4, read-only, für Datenübergabe), Design Transfer View (IFC4, bidirektional, voller Geometriezugriff); Revit exportiert primär CV 2.0 → deshalb gehen beim IFC4-Import oft Geometrietypen verloren; Empfehlung: MVD im BAP (Kap. 15) projektspezifisch vereinbaren und im IFC-Datei-Header prüfen
  - 18.9 Georeferenzierung und CRS ⚠️ NEU — für Entwickler die Modelle in GIS-Systeme integrieren oder mehrere Teilmodelle koordinieren; Problem: jedes Authoring-Tool platziert den lokalen Modellursprung woanders → bei CDE-Import passen Modelle nicht zusammen; `IfcGeometricRepresentationContext`: enthält `WorldCoordinateSystem` (lokales Ursprungskoordinatensystem) und `TrueNorth`; Lösung in IFC4: `IfcMapConversion` koppelt das lokale Koordinatensystem an ein geographisches CRS; EPSG-Codes: EPSG:25832 (ETRS89/UTM Zone 32N) ist Standard für Deutschland; IFC2x3-Limitation: `IfcSite.RefLatitude`/`RefLongitude` (Grad/Minuten/Sekunden, unzuverlässig, kein CRS-Link) — deshalb auch in IFC2x3-Projekten oft separate Georeferenzierungs-CSV nötig; GIS-Kopplung: Shapefile/WFS → Geländemodell → IFC-Modell georeferenziert; praktische Empfehlung: Koordinatenursprung projektbezogen definieren und im BAP festschreiben; ohne saubere Georeferenzierung scheitert Stadtmodell-Integration (CityGML, 3D-Stadtmodelle der Kommunen)

- **Einzuführende Begriffe:** `step`, `ifc` (wenn nicht schon in Kap. 17)

- **Bilder (min. 4):**
  - `kap18_ifc_hierarchie` — Baumdiagramm, portrait — IfcProject-Baum K7 vollständig: Site → Building → 4 Geschosse → je Räume und Elemente; weißer Hintergrund
  - `kap18_beziehungen` — Graphdiagramm, landscape ⚠️ NEU — ein IfcWall-Objekt als Zentrum, Pfeile zu: IfcMaterial (via IfcRelAssociatesMaterial), IfcSpace (via IfcRelSpaceBoundary), IfcWallType (via IfcRelDefinesByType), IfcBuildingStorey (via IfcRelContainedInSpatialStructure); zeigt warum Beziehungen das Kernsystem sind; weißer Hintergrund
  - `kap18_step_format` — Code-Darstellung, landscape — annotiertes STEP-Beispiel für eine IfcWall von K7 mit Geometrie + Psets; Zeilen farblich markiert und erklärt; weißer Hintergrund
  - `kap18_entitaeten_uebersicht` — Mindmap/Klassendiagramm, landscape — wichtigste IFC-Entitäten hierarchisch, Farbe nach Disziplin, weißer Hintergrund
  - `kap18_mvd_vergleich` — Vergleichstabelle, landscape ⚠️ NEU — Coordination View 2.0 vs. Reference View vs. Design Transfer View: IFC-Version, unterstützte Features (Geometrie, Properties, Mengen), Revit-Exportoption, typischer Use-Case; weißer Hintergrund
  - `kap18_georeferenzierung` — Systemdiagramm, landscape ⚠️ NEU — lokales Modellkoordinatensystem + IfcMapConversion-Pfeil → EPSG:25832 → GIS-Layer; daneben: Problem ohne Georeferenzierung (zwei Modelle passen nicht zusammen); weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 18.4: IFC-Auszug K7-Außenwand vollständig annotiert: `IfcWall` + `IfcMaterialLayerSet` + `Pset_WallCommon` + Geometrie
  - nach 18.6: Welche IFC-Version für K7 — IFC4 (weil öffentlicher Auftraggeber, ISO 19650)

- **BIM-Brücke:** Kapitel ist die IFC-Vertiefung; → Kap. 19 (Klassifikation in IFC), Kap. 20 (IFC in CDE), Kap. 21 (IFC-Tools)

- **Quellen:** IFC4.3 Spezifikation (im Ordner 09_Digital-und-BIM/IFC4_3)

- **Normen:** ISO 16739 (IFC), ISO 10303 (STEP)

- **Querverweise:** → Kap. 17 (Was BIM ist), Kap. 19 (Klassifikation), Kap. 20 (Prozess und CDE)

---

### K19 — Klassifikation

- **Status:** `Open`
- **Zielwörter:** 2,000–2,500 ↓ (gestrafft, DE-Fokus)
- **⚠️ Fokus-Warnung:** OmniClass und Uniclass nur als Überblick — für Einsteiger in DE wenig praxisrelevant. Schwerpunkt auf Deutsche Klassifikation (DIN 276, DIN 277, STLB-Bau) und die Verbindung zu IFC. Riskiert zu abstrakt zu werden wenn zu viel Systemtheorie.
- **Kernfragen:**
  - Warum reicht IFC alleine nicht — was leistet Klassifikation zusätzlich?
  - Welche Klassifikationssysteme sind in Deutschland wirklich relevant?
  - Wie verbindet man Klassifikation konkret mit IFC-Objekten?

- **Pflichtabschnitte (H2):**
  - 19.1 Das Problem — gleiche Objekte, unterschiedliche Namen in verschiedenen Modellen; Chaos bei automatischer Auswertung (Mengen, Kosten, FM); Lösung: externe Klassifikationssysteme; konkretes Beispiel: "Außenwand" in Revit vs. "Tragende Außenwand" in Ausschreibung vs. KG 331 in DIN 276
  - 19.2 Deutsche Klassifikation im Kern — **Schwerpunkt**: DIN 277 (Flächen und Rauminhalte: BGF, NUF, VF — die Basis aller Flächenberechnungen); DIN 276 (Kosten: KG 100–700, wie in Kap. 16); STLB-Bau (Leistungstexte für Ausschreibung); wie die drei zusammenspielen; was ein BIM-Entwickler kennen muss
  - 19.3 Internationale Systeme im Überblick — OmniClass (14 Tabellen, US): Table 21 (Elements) und Table 41 (Materials) als die für BIM relevantesten; Uniclass 2015 (UK): nur wenn internationale Projekte; ISO 12006-2 als gemeinsames Framework dahinter; Empfehlung: wer nur in DE arbeitet braucht OmniClass nicht zu kennen
  - 19.4 Verbindung IFC ↔ Klassifikation — `IfcClassificationReference`; wie man ein IFC-Objekt mit DIN 276 / STLB referenziert; Mapping-Tabellen; Mehrsprachigkeit als Dauerproblems; IDS (Information Delivery Specification) als modernerer Ansatz

- **Einzuführende Begriffe:** — (keine spezifischen Glossar-Terms)

- **Bilder (min. 2):**
  - `kap19_omniclass_tabellen` — Übersichtsinfografik, landscape — 14 OmniClass-Tabellen mit Nummern, kurzer Beschreibung und Anwendungsbeispiel, weißer Hintergrund
  - `kap19_mapping` — Flussdiagramm, landscape — IFC-Objekt → IfcClassificationReference → OmniClass-Code → STLB-Position → DIN276-KG; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 19.5: Klassifikation an K7-Außenwand — OmniClass Table 21 Code + Uniclass Pr-Code + DIN276 KG 331

- **BIM-Brücke:** `IfcClassificationReference`; Mengenermittlung aus klassifizierten Objekten; → Kap. 16 (Kosten aus Modell)

- **Quellen:** OmniClass-Tabellen (im Ordner 09_Digital-und-BIM/OmniClass), Uniclass-Dokumente

- **Normen:** DIN 277, DIN 276, ISO 12006-2 (Klassifikation von Bauwerken)

- **Querverweise:** → Kap. 16 (Kosten und STLB), Kap. 18 (IFC), Kap. 20 (CDE und Klassifikation)

---

### K20 — Prozess & Kollaboration: CDE, ISO 19650 & AIA

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wie arbeiten viele Planer zusammen ohne Datenchaos?
  - Was ist ein CDE, und wie sind die Informationsstatusworkflows aufgebaut?
  - Was ist ISO 19650, und was muss ich davon kennen?

- **Pflichtabschnitte (H2):**
  - 20.1 Das Problem der verteilten Information — ohne CDE: E-Mail, Dropbox, Versionschaos, wer hat welche Version; mit CDE: zentraler Speicher, definierter Workflow, Revisionssystem
  - 20.2 CDE und Informationsstatus — Work in Progress (WIP) → Shared (S) → Published (P) → Archived (A); Benennungskonvention nach ISO 19650-2 (Projektcode, Ursprung, Revisionsnummer, Status); Praxisbeispiele
  - 20.3 ISO 19650 im Überblick — Teil 1: Konzepte; Teil 2: Lieferprozess; Appointment-Struktur: Lead Appointed Party (LAP) und Task Teams; OIR → AIR → EIR → MIDP/TIDP als Informationsanforderungs-Kette
  - 20.4 BIM-Rollen — BIM-Manager (Auftraggeber-Seite, definiert EIR), BIM-Koordinator (Auftragnehmer-Seite, prüft Modelle), BIM-Autor (erstellt Fachmodell); wer macht was
  - 20.5 Kollisionsprüfung und BCF — Hard Collision (physische Überschneidung), Soft Collision (Mindestabstand unterschritten), Workflow Collision (Planungskonflikt); BCF-Format (Building Collaboration Format): Viewpoint + Kommentar + Status; Prüfzyklus in der Praxis

- **Einzuführende Begriffe:** `bcf` (wenn nicht schon Kap. 17)

- **Bilder (min. 2):**
  - `kap20_cde_workflow` — Flussdiagramm, landscape — Informationsstatus WIP→S→P→A mit Beispielaktionen je Status, Rollen-Icons, weißer Hintergrund
  - `kap20_iso19650_struktur` — Organigramm, portrait — Auftraggeber (OIR/AIR/EIR) → LAP (MIDP) → Task Teams (TIDP), Informationsfluss Pfeile, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 20.2: CDE-Struktur K7 — Dateibenennungsbeispiele nach ISO 19650, Shared-Modelle je Disziplin
  - nach 20.5: BCF-Mängelticket K7-Beispiel: Kollision Lüftungskanal/Betonunterzug im 2. OG

- **BIM-Brücke:** CDE-Produkte (BIMcollab, Autodesk Construction Cloud, Trimble Connect); BCF als offenes Format; IDS (Information Delivery Specification) als Validierungswerkzeug; → Kap. 21

- **Quellen:** ISO19650 (DE), DINSPEC

- **Normen:** ISO 19650-1/2, DIN SPEC 91391

- **Querverweise:** → Kap. 15 (HOAI und Informationslieferprozess), Kap. 17 (BIM-Grundlagen), Kap. 21 (Software-Ökosystem)

---

### K21 — BIM in der Praxis

- **Status:** `Open`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Was passiert in einem BIM-Projekt von Anfang bis Ende konkret?
  - Welche Software-Kategorien gibt es und für was?
  - Warum scheitert BIM so oft — und wie verhindert man das?

- **Pflichtabschnitte (H2):**
  - 21.1 Authoring-Software — Revit (dominant DE), ArchiCAD, Vectorworks, Allplan; Stärken/Schwächen; Revit: warum so verbreitet (Familien, Parameter, MEP-Integration); Probleme (proprietäre Datenbank, IFC-Export-Qualität)
  - 21.2 Koordinations- und Prüftools — Navisworks (Autodesk), Solibri (Nemetschek), BIMcollab; was ein Koordinationsmodell ist; Regelbasierte Prüfung (z.B. "jede Tür muss Raumzugang haben"); Clash-Bericht als Kommunikationsmittel
  - 21.3 Analysetools — Energieanalyse (IDA ICE, DesignBuilder, OpenStudio); Statik (RFEM, Dlubal); Tageslichtsimulation (Radiance, Velux Daylight); Schnittstelle IFC → gbXML → Analysesoftware
  - 21.4 Facility Management — COBie (Construction Operations Building Information Exchange) als Datenübergabe; CAFM-Systeme (IBM Maximo, Archibus, Nemetschek Crem); Wartungsdaten im Modell ab LP 5
  - 21.5 Häufige BIM-Fehler — Modell ohne Daten (nur 3D-Hülle); Psets leer; IFC-Export-Probleme (Schichten fehlen, Geometrie zerstört); fehlende EIR → niemand weiß was geliefert werden soll; zu späte Modellkoordination; fehlende Georeferenzierung → Teilmodelle passen nicht zusammen
  - 21.5a IFC-Validierungstools ⚠️ NEU — wie man prüft, ob eine IFC-Datei valide und spezifikationskonform ist: **buildingSMART Validation Service** (online, kostenlos, prüft IFC-Datei gegen Schema + MVD + Normative Rules); **IDS (Information Delivery Specification)**: maschinenlesbares XML-Format, das festlegt welche Objekte welche Properties in welchem Kontext haben müssen; IDS-Validatoren in Solibri (kommerziell), BIMcollab ZOOM (kostenlos für Grundfunktionen), xBIM Toolkit (.NET, open source); Bedeutung für Entwickler: eigene IFC-Ausgaben gegen IDS testen statt manuell in STEP-Datei debuggen; Praxistipp: jedes Projekt sollte eine projektspezifische IDS-Datei haben, die die EIR maschinenlesbar formalisiert
  - 21.6 Open-Source-Ökosystem — IfcOpenShell (Python), BlenderBIM, xBIM Toolkit (.NET), FreeCAD BIM; was die Community baut

- **Einzuführende Begriffe:** — (keine spezifischen neuen Terms)

- **Bilder (min. 2):**
  - `kap21_bim_software_oekosystem` — Kategorisierte Übersicht, landscape — Software-Ökosystem in Kategorien: Authoring, Koordination, Analyse, FM, Open Source; je mit Logo-Platzhalter und Funktion, weißer Hintergrund
  - `kap21_clash_beispiel` — Screenshot-ähnlich, landscape — 3D-Koordinationsmodell mit markierter Kollision (rot) zwischen Lüftungskanal und Unterzug, BCF-Panel seitlich, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 21.4: BIM-Workflow K7 von LP 2 bis FM — welche Software in welcher Phase, Informationsübergabe je Meilenstein

- **BIM-Brücke:** Kapitel ist praktische Zusammenfassung aller BIM-Kapitel; → Kap. 22 (LCA aus BIM), Kap. 24 (Digitaler Zwilling)

- **Quellen:** Ridder (Revit 2026), ISO19650, DINSPEC

- **Normen:** —

- **Querverweise:** → Kap. 17 (BIM-Grundlagen), Kap. 18 (IFC), Kap. 20 (CDE), Kap. 24 (Zukunft)

---

### K22 — Nachhaltigkeit & Kreislaufwirtschaft

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wie nachhaltig ist Bauen wirklich — was sind die Zahlen?
  - Was ist Embodied Carbon, und warum wird es wichtiger als Operational Carbon?
  - Was bedeutet Kreislaufwirtschaft für Materialien und Planung?

- **Pflichtabschnitte (H2):**
  - 22.1 Bauen und Klimakrise — 40% des globalen CO₂ stammt aus Gebäuden; Aufschlüsselung: Operational Carbon (Betrieb) vs. Embodied Carbon (Herstellung, Bau, Rückbau); Trend: Operational sinkt (GEG), Embodied steigt relativ
  - 22.2 Lebenszyklusanalyse (LCA) — System boundary (cradle-to-gate, cradle-to-grave, cradle-to-cradle); EPD (Environmental Product Declaration): wo und wie man sie findet (EPD-DAB, IBU); Berechnungstools (oneclick LCA, Tally)
  - 22.3 Zertifizierungssysteme — DGNB (DE-System, ganzheitlich, 6 Kriteriengruppen), LEED (US-System, verbreitet international), BREEAM (UK-System); Vergleich: was sie messen, was sie nicht messen; Kosten und Nutzen
  - 22.4 Kreislaufwirtschaft — Design for Disassembly (reversible Verbindungen statt Kleben/Schweißen), Urban Mining, Materialpass (welche Materialien wo verbaut, für spätere Trennung); Baustoffrecycling-Quoten heute
  - 22.5 Begrünung als bauphysikalische Maßnahme — Dachbegrünung (Speichermasse, Kühlungseffekt, Retentionswirkung Regenwasser); Fassadenbegrünung; EU-Biodiversitätsziel; GEG und Begrünung

- **Einzuführende Begriffe:** `embodied-carbon`, `epd`

- **Bilder (min. 2):**
  - `kap22_lca_phasen` — Flussdiagramm, landscape — Lebenszyklusphasen A1–A5, B1–B7, C1–C4, D; CO₂-Anteile je Phase als Balkendiagramm, weißer Hintergrund
  - `kap22_materialpass` — Tabellen-Infografik, portrait — schematischer Materialpass K7: Bauteil, Material, Menge, EPD-Referenz, Rückbaubarkeit (gut/mittel/schwer), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 22.2: LCA K7 — Embodied Carbon Berechnung für Tragstruktur (Beton CO₂-intensiv) vs. Alternative Holzskelett; Ergebnis: Unterschied ca. 180 vs. 60 kg CO₂eq/m²
  - nach 22.5: Dachbegrünung K7 — extensiv 400 m², Retentionswirkung 40 L/m², Temperaturreduktion Dachfläche 20°C

- **BIM-Brücke:** Materialpass im BIM-Modell; LCA-Schnittstellen (`IfcMaterial` + EPD-Link via `IfcClassificationReference`); DGNB-Dokumentation aus BIM; Rückbauinformationen als Datenpflicht; → Kap. 18
  ⚠️ **Explizit erklären was sich ändert wenn LCA-Daten im Modell liegen** — das ist der Punkt wo K22 aufhört Nachhaltigkeitskapitel-mit-BIM-Fußnote zu sein: (1) Entwurfsvarianten sofort auf CO₂-Auswirkung vergleichen (Beton vs. Holz in Sekunden, nicht Stunden), (2) Mengenermittlung aus IFC-Modell direkt in LCA-Tool (kein manuelles CSV — `Qto_WallBaseQuantities` liefert Volumen, EPD liefert CO₂/m³), (3) Materialpass automatisch exportierbar als PDF + als maschinenlesbares JSON; der Workflow: IFC-Export → oneclick LCA / Tally → CO₂-Bericht; was heute noch fehlt: standardisierte EPD-ID in IFC (kein Pflicht-Pset dafür)

- **Quellen:** AtlasRecycling, NachhaltigeGT, EnergieAtlas

- **Normen:** DIN EN 15804 (EPD-Norm), ISO 14044 (LCA), EU-Taxonomie

- **Querverweise:** → Kap. 3 (Baustoffe und CO₂), Kap. 6 (GEG), Kap. 13 (PV), Kap. 24 (Zukunft Bauen)

---

### K23 — Sanierung

- **Status:** `Open`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Was ist anders bei Bestandsgebäuden — welche Unbekannten gibt es?
  - Wie geht man typische Bauschäden an?
  - Was bedeutet Scan-to-BIM in der Praxis?

- **Pflichtabschnitte (H2):**
  - 23.1 Baualtersphasen und typische Konstruktionen — Gründerzeit (1880–1920): Massivmauerwerk, Holzbalkendecken; Nachkrieg (1950er): Schwemmsteinmauerwerk, Betondecken ohne Dämmung; 1960–70er: Plattenbau, Montagebau; 1990er: erste Dämmung; was bedeutet das für die Sanierungsplanung
  - 23.2 Bestandsaufnahme — was man vorfindet vs. was im Plan steht (as-built vs. as-designed); typische Schocks: andere Deckenhöhen, Schächte falsch, Statik unbekannt; systematische Bestandsaufnahme
  - 23.3 Typische Bauschäden — Feuchtigkeit (aufsteigende, eindringende, kondensierende); Schimmel; Risse (statisch vs. nicht statisch); Schadstoffbelastung (Asbest bis 1993, PCB, Lindan); Schwermetalle in Farben
  - 23.4 Energetische Sanierung — Innendämmung vs. Außendämmung (Innendämmung: Taupunktproblem, sd-Wert, Phasenverschiebung); Fensteraustausch (Kältestrahlung altes Fenster → Schimmel an Laibung); Heizungstausch im Bestand; GEG-Anforderungen bei Sanierung (§48ff)
  - 23.5 Scan-to-BIM — Punktwolkenaufnahme (Laserscanner, 3–10 mm Genauigkeit); Punktwolke → BIM-Modell (manuell vs. KI-gestützt); as-built-Modell als Planungsgrundlage; Grenzen der Methode (Hohlräume, Bewehrung)

- **Einzuführende Begriffe:** — (keine neuen Terms)

- **Bilder (min. 2):**
  - `kap23_baualtersphasen` — Timeline-Infografik, landscape — 1880/1920/1950/1970/1990/2010 mit je typischem Wandaufbau und Schwachstellen, weißer Hintergrund
  - `kap23_scan_to_bim` — Prozessdiagramm, landscape — Laserscanner → Punktwolke → BIM-Modell in Phasen, mit Genauigkeitsangaben, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - Keine K7-Box (Neubau) → stattdessen Vergleichsgebäude: Gründerzeithaus Nachbargrundstück mit Sanierungsszenario; Innendämmung-Problem konkret durchrechnen

- **BIM-Brücke:** Scan-to-BIM als BIM-Use-Case; Punktwolken in Revit/Archicad; as-built-Modell für FM → Kap. 21, 24

- **Quellen:** AtlasSanierung, Zürcher & Frank (Innendämmung)

- **Normen:** GEG §48–§52 (Anforderungen Bestand), DIN 4108-3 (Innendämmung)

- **Querverweise:** → Kap. 5 (Konstruktionsaufbauten), Kap. 6 (Wärmeschutz), Kap. 7 (Feuchteschutz), Kap. 22 (Nachhaltigkeit Bestand)

---

### K24 — Digitaler Zwilling & KI

- **Status:** `Open`
- **Zielwörter:** 1,200–1,800 ↓↓ — bewusst kurz gehalten; in 2 Jahren schon veraltet; besser ehrlich und knapp als ambitioniert und falsch; siehe OE-07
- **⚠️ Scope-Warnung:** Kein vollständiges Kapitel über KI schreiben — das Thema dreht sich zu schnell. Stattdessen: was heute (2026) produktionsreif ist, was Hype ist, und wo die echten Lücken im BIM-Ökosystem liegen. Kein Futurismus.
- **Kernfragen:**
  - Was unterscheidet einen Digitalen Zwilling vom BIM-Modell — konkret, nicht theoretisch?
  - Was funktioniert von KI im Bauwesen heute wirklich (nicht: was wird versprochen)?
  - Wo sind die echten Lücken, die neue Software schließen kann?

- **Pflichtabschnitte (H2):**
  - 24.1 Digitaler Zwilling: Was heute wirklich funktioniert — Definition: BIM + Echtzeit-Sensorik + bidirektionale Kopplung; ehrliche Bestandsaufnahme: Infrastruktur (Brücken, Tunnel) schon produktionsreif; Hochbau: Insellösungen (Energiemonitoring, Aufzugswartung), aber kein echter Zwilling; was fehlt: durchgängige Datenpipeline von Sensor bis Modell; **Datenpipeline-Architektur skizzieren** (für IT-Zielgruppe wertvoll, kurz halten): typischer Stack: Sensor (MQTT / OPC-UA / Modbus) → Edge-Gateway → Zeitreihendatenbank (InfluxDB, TimescaleDB) → API (REST/GraphQL) → BIM-Viewer/Dashboard; das technische Kernproblem benennen: IFC ist ein statisches Snapshot-Format, kein Live-Datenmodell; bestehende Ansätze zur Kopplung: Property-Update via CDE-API, buildingSMART-Streaming-Prototypen (Forschungsphase), Asset-Information-Model nach ISO 19650-3; ohne Datenpipeline-Verständnis bleibt „Digitaler Zwilling" für IT-Leser eine Marketingfloskel
  - 24.2 KI im Bauwesen: Realitätscheck — was funktioniert heute: Bildanalyse auf Baustelle (Fortschritt, Sicherheit), Kostenprognose aus Vergleichsdaten, automatische Kollisionsprüfung; was ist Hype: vollautomatische Grundrissgenerierung, "natürlichsprachliche BIM-Abfrage" (rudimentär); was fehlt noch: semantisch korrekte IFC-Ausgabe, durchgehende Code-Compliance-Prüfung
  - 24.3 Wo neue Software den Unterschied macht — die echten Lücken: kein gutes offenes Authoring-Tool, IFC-Export-Qualität chronisch schlecht, LCA-Integration fehlt, Planungsrecht-Prüfung manuell; wer diese Lücken schließt, hat einen Markt

- **Einzuführende Begriffe:** — (keine neuen Terms)

- **Bilder (min. 2):**
  - `kap24_digitaler_zwilling` — Systemdiagramm, landscape — BIM-Modell + Sensor-Datenstrom + Analyse-Layer, Rückkopplungspfeile, Gebäudeschnitt K7 als Basis; was heute funktioniert (grün) vs. was noch fehlt (gestrichelt); weißer Hintergrund
  - `kap24_ki_reifegrad` — Reifegrad-Matrix, landscape — KI-Anwendungen im Bauwesen: x-Achse Reifegrad heute, y-Achse Potenzial; Blasen je Anwendungsfall; ehrlich, keine Marketing-Folie; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 24.1: K7 im Betrieb — Sensorik (Raumklima, Energiezähler) → Dashboard → automatische Wartungsplanung; was heute schon machbar ist

- **BIM-Brücke:** Digitaler Zwilling als Evolution des BIM-Modells; IFC als Backbone; Smart-Building-Schnittstellen (REST APIs, MQTT); → Kap. 13 (Gebäudeautomation), Kap. 21

- **Quellen:** Ridder (Kap. Zukunft), ISO 19650 (Asset Information)

- **Normen:** ISO 23247 (Digital Twin Manufacturing — als Referenz), EU BIM-Mandate

- **Querverweise:** → Kap. 13 (Gebäudeautomation), Kap. 17 (BIM-Grundlagen), Kap. 21 (Software), Kap. 22 (Nachhaltigkeit und Sensorik)

---

## Globale Schreibregeln (Zusammenfassung für Writing Agents)

Diese Regeln gelten für jedes Kapitel und werden hier nicht wiederholt — sie stehen vollständig in `docs/WRITING-GUIDE.md`:

1. Mindestens 2 Bilder pro Kapitel (IMAGE-Placeholder mit vollständiger Beschreibung)
2. Kastanienallee 7 immer in `!!! kastanienallee`-Box, nie nur im Fließtext
3. Begriffe nur einführen wenn in terms-registry für dieses Kapitel geplant — kein "vorgreifen"
4. Querverweise als einzelne Kapitel-Links, nie als Ranges ("Kapitel 14–16")
5. Zielwörter: Signalfarbe < 1.500 Wörter; 2.500–3.500 Wörter Normalbereich
6. Erster Abschnitt nach `!!! ziel`: historischer/konzeptueller Kontext — nicht direkt ins Fachvokabular
7. Zusammenfassung-Abschnitt am Ende: 2–4 Sätze + Querverweise als Linkzeile

### Erweiterbarkeit aller Referenzdateien

**Der bestehende Inhalt von Glossar, Formelsammlung, IFC-Referenz und Normen-Appendix ist kein Limit — er ist ein Ausgangspunkt.**

Beim Schreiben eines Kapitels sollen fehlende Einträge aktiv ergänzt werden:

| Datei | Wann ergänzen | Wie |
|-------|--------------|-----|
| `web/src/data/glossar.ts` | Immer wenn ein Fachbegriff gebraucht wird, der noch nicht als `::Term::` verfügbar ist | Neuen Eintrag anlegen (id, term, definition, thema, typ) — dann `::Term::` verwenden |
| `web/src/data/formulas.ts` | Immer wenn eine Formel im Text mit `^^formel-id^^` referenziert wird, die noch nicht existiert | Neuen Eintrag anlegen, dann `^^formel-id^^` verwenden |
| `docs/appendix/ifc-referenz.md` | Immer wenn eine IFC-Entität in der BIM-Brücke auftaucht, die noch nicht dokumentiert ist | Eintrag ergänzen: Entität, Beschreibung, wichtigste Properties, typische Fehler |
| `docs/appendix/normen.md` | Immer wenn eine Norm zitiert wird, die noch nicht im Anhang steht | Eintrag ergänzen: Nummer, Titel, Anwendungsbereich, Fundstelle im Buch |
| `docs/terms-registry.yaml` | Nach jedem geschriebenen Kapitel | Alle neu eingeführten Begriffe mit `introduced_in` eintragen |

**Reihenfolge beim Schreiben:** Erst prüfen ob der Eintrag existiert — wenn nicht, zuerst anlegen, dann im Kapitel verwenden. Nie `**fett**` als Ersatz für einen fehlenden Glossareintrag.

---

## Offene Entscheidungen

| ID | Frage | Betroffen | Empfehlung |
|----|-------|-----------|------------|
| OE-01 | Soll Kap. 9 (Brandschutz) die Gebäudeklasse detaillierter behandeln als Kap. 2? Oder nur referenzieren? | Kap. 2 + 9 | Kap. 9 vertieft, Kap. 2 referenziert |
| OE-02 | Kap. 23 (Sanierung) hat kein Kastanienallee-7-Beispiel (Neubau). Nachbarsgebäude als Dummy oder ganz ohne K7-Box? | Kap. 23 | Nachbarsgebäude-Dummy (Gründerzeit) |
| OE-03 | Sollen Kap. 3–5 (Baukörper) einen gemeinsamen Einstiegs-Interlude bekommen ("Warum Teil II so aufgebaut ist")? | Teil II | Ja, 1 Absatz als Teil-Intro im Kapitel 3 |
| OE-04 | Wie tief soll Kap. 24 auf bim-ai eingehen — Produkt erwähnen oder generisch bleiben? | Kap. 24 | Generisch; Produktnamen vermeiden |
| OE-05 | Formelsammlung: sollen Formeln aus Kapiteln automatisch dort auftauchen, oder manuell gepflegt? | Alle | Manuell — Automatisierung zu fehleranfällig |
| OE-06 | "Pläne lesen" (Grundriss/Schnitt/Ansicht/Detail): als eigenes Mini-Kapitel 2a oder als Block 2.0 in Kap. 2? | Kap. 2 | Block 2.0 in Kap. 2 — eigenes Kapitel übertreibt |
| OE-07 | Kap. 24 eigenständig oder als Ausblick-Abschnitt am Ende von Kap. 21 integrieren? | Kap. 21 + 24 | Eigenständig lassen, aber kürzer (→ 1,200–1,800 W) |
| OE-08 | Holzbau: eigenes Kapitel 5a (zwischen Kap. 5 und 6) oder stark ausgebauter Abschnitt 5.6 in Kap. 5? | Kap. 5 | Abschnitt 5.6 — eigenes Kapitel sprengt die Struktur |
| OE-09 | Innenausbau (Trockenbau-Systemwände, Deckenraster, Unterdecken, Bodenbeläge über Estrich) als eigener Abschnitt 5.7 in Kap. 5 oder in Kap. 16 (Ausschreibung)? Relevant für LOD 300–400 und 5D-BIM. | Kap. 5, 16 | Noch offen — bisher fehlt Trockenbau komplett im Tracker |
| OE-10 | Stellplatznachweis und Außenanlagen (Versickerung, Pkw-Zufahrtsquerschnitt, Stellplatzsatzung Bayern) als Ergänzung in Kap. 2.1 oder Kap. 14.5? K7 mit GRZ 0,6 braucht Vollständigkeit für die Genehmigungsfähigkeit. | Kap. 2, 14 | Noch offen — K7 ohne Stellplatznachweis ist formal unvollständig |
