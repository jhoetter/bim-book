# BIM von Grund auf
## Architektur, Baukonstruktion und digitales Planen vollständig verstehen

> **Arbeitstitel:** BIM von Grund auf – Wie ein Gebäude entsteht und wie es digital abgebildet wird  
> **Autor:** Johannes Hötter  
> **Status:** Konzeptphase · Mai 2026  
> **Sprache:** Deutsch (Erstfassung)  

---

## Über dieses Buch

Dieses Buch entsteht an der Schnittstelle zweier Welten: Architektur und Softwareentwicklung. Es richtet sich an technisch versierte Einsteiger – Informatiker, Ingenieure, Quereinsteiger – die verstehen wollen, wie ein Gebäude wirklich funktioniert, und wie dieses Wissen im Building Information Modeling (BIM) digital abgebildet wird.

Es ist kein Lehrbuch für Architekten. Es ist ein Buch für Menschen, die Architektur als **System** begreifen wollen: von der ersten Entwurfsidee über Tragwerk, Bauphysik und Haustechnik bis hin zum vollständigen digitalen Gebäudemodell in IFC.

Jedes Kapitel endet mit einer **„BIM-Brücke"**: der konkreten Antwort auf die Frage – wie bildet sich das, was wir gerade gelernt haben, im Datenmodell ab?

---

## Bibliothek & Quellen

Dieses Buch stützt sich auf eine kuratierte Fachbibliothek, die lokal verfügbar ist:

```
/Users/jhoetter/Desktop/architecture books/
```

Die Bibliothek umfasst ~60 Ressourcen, gegliedert in:

| Ordner | Inhalt |
|--------|--------|
| `00_Atlas-Reihe/` | 13 Bände Edition DETAIL (Flachdach, Fassaden, Holzbau, Recycling …) |
| `01_Grundlagen-und-Entwurf/` | Ching, Neufert, Bildwörterbuch, Baubuch |
| `02_Baukonstruktion/` | Frick/Knöll Bd. 1+2, Dachkonstruktionen, Ingenieurbau |
| `03_Holzbau/` | Techn. Zeichnungen + Informationsdienst Holz Handbuch (11 Hefte) |
| `04_Gebaeudetechnik/` | Haustechnik, Nachhaltige Gebäudetechnik |
| `05_Sanierung-und-Denkmalpflege/` | Stahr, Denkmal und Energie |
| `06_Recht-und-Vertraege/` | HOAI 2021, HOAI Praxis, VOB, Basics Ausschreibung |
| `07_Bauausfuehrung/` | Baustelleneinrichtung, Standard Detailsammlung |
| `08_Zeichnen-und-Darstellung/` | Basics Technisches Zeichnen, Architectural Graphics (Ching) |
| `09_Digital-und-BIM/` | IFC 4.3, OmniClass (14 PDFs), Uniclass (13 CSVs), ISO 19650, Revit 2026 |
| `10_Bauphysik/` | Villmann Skript, Zürcher & Frank (ETH) |
| `11_Tragwerkslehre/` | TU Skript Statik, Staffa Leseprobe |
| `12_Normen-und-Gesetze/` | GEG 2024, MBO Stand 2024, Barrierefreies Bauen (3 Leitfäden), HOAI-Text |

---

## Das Leitbeispiel: „Kastanienallee 7"

Durch das gesamte Buch zieht sich ein konkretes Gebäude: ein **viergeschossiges Mehrfamilienhaus** mit 12 Wohneinheiten in einer deutschen Mittelstadt – **Kastanienallee 7**.

**Warum dieses Gebäude?**  
Es ist der häufigste Gebäudetyp in Deutschland. Es erfordert alle Disziplinen: Tragwerk, TGA, Bauphysik, Barrierefreiheit, GEG-Nachweis, HOAI-Prozess, BIM-Modell. Einfach genug um verständlich zu bleiben, komplex genug um nichts wegzulassen.

**Eckdaten:**
- Standort: Bayern (MBO/BayBO, GEG-Nachweis erforderlich)
- 4 Vollgeschosse + Keller + ausgebautes Dachgeschoss
- Massivbau: Stahlbeton-Skelett mit Ziegelausfachung
- Flachdach mit extensiver Begrünung
- Fernwärme + kontrollierte Wohnraumlüftung (KWL) je Wohnung
- Tiefgarage mit 10 Stellplätzen + E-Ladeinfrastruktur
- Aufzug (Barrierefreiheitspflicht GK 4)
- Photovoltaik auf Flachdach
- Bruttogrundfläche: ca. 1.800 m²

> An bestimmten Stellen ergänzen **Vergleichsgebäude** das Leitbeispiel:  
> ein Einfamilienhaus (Holzrahmenbau), eine Gewerbeimmobilie (Bürogebäude, Stahlbau) und ein Sanierungsfall (Gründerzeitgebäude).

---

## Struktur: 7 Teile, 24 Kapitel, ~500 Seiten

---

### TEIL I – Fundament: Was ist ein Gebäude?
*~40 Seiten | Quellen: Ching, Bildwörterbuch, Baubuch*

**Kapitel 1 – Architektur als System** (~15 S.)  
Vitruvius' drei Säulen, das Schichtenmodell des Gebäudes (Tragstruktur / Hülle / Technik / Ausbau), Lebenszyklus, historischer Bogen. Erste Vorstellung Kastanienallee 7.  
*BIM-Brücke: Das Schichtenmodell = Modellstruktur in IFC.*

**Kapitel 2 – Entwurf, Raum und Funktion** (~25 S.)  
Grundrissplanung, Erschließung, Normmaße (Neufert), Barrierefreiheit als Entwurfsprinzip (DIN 18040), Bebauungsplan lesen (GRZ, GFZ, Abstandsflächen).  
*BIM-Brücke: IfcSpace, Raumprogramm als Datenanforderung, Flächenberechnung nach DIN 277.*

---

### TEIL II – Der Baukörper: Struktur und Material
*~90 Seiten | Quellen: Atlas Baustoff, Frick/Knöll 1+2, Baubuch, Atlas Mauerwerk, Atlas Stahlbau, Atlas Holzbau*

**Kapitel 3 – Baustoffe** (~30 S.)  
Beton & Stahlbeton, Mauerwerk, Stahl, Holz (Vollholz/BSH/CLT), Glas, Dämmstoffe. Materialkennwerte: Rohdichte, E-Modul, λ-Wert, Brandklassen.  
*BIM-Brücke: IfcMaterial, MaterialLayerSet, MaterialProfile; OmniClass Table 41.*

**Kapitel 4 – Tragwerk: Lasten, Kräfte, Systeme** (~30 S.)  
Lastarten (Eigengewicht, Nutzlast, Wind, Schnee), Tragsysteme (Massivbau, Skelett, Holztafel, Hybrid), Bauteile und ihre Rolle, Vordimensionierung als Daumenregel, Eurocode kurz eingeordnet.  
*BIM-Brücke: isExternal / loadBearing in IFC; IfcStructuralAnalysisModel.*

**Kapitel 5 – Konstruktion: Gründung, Wand, Decke, Dach** (~30 S.)  
Bodenuntersuchung, Kellerabdichtung, Außenwand-Schichtaufbau (innen→außen), Deckenaufbau (Estrich, Trittschalldämmung, FBH), Flachdach (Warmdach/Umkehrdach, Entwässerung, Begrünung), Geneigtes Dach (EFH Vergleich), Fugen & Anschlüsse.  
*BIM-Brücke: IfcWall / IfcSlab / IfcRoof als MaterialLayerSet; LOD 200 vs. 400.*

---

### TEIL III – Die Gebäudehülle: Bauphysik
*~70 Seiten | Quellen: Villmann, Zürcher & Frank, Energie Atlas, Atlas Flachdach, Atlas Fassaden*

**Kapitel 6 – Wärmeschutz & GEG** (~25 S.)  
U-Wert Berechnung (mit Rechenbeispiel Kastanienallee 7), Wärmebrücken, GEG 2024 (Primärenergiebedarf, Referenzgebäudeverfahren, Energieausweis), sommerlicher Wärmeschutz.  
*BIM-Brücke: Pset_WallCommon (ThermalTransmittance); gbXML-Export für Energiesimulation.*

**Kapitel 7 – Feuchteschutz** (~15 S.)  
Dampfdiffusion, Taupunktberechnung (Glaser vereinfacht), Dampfbremse vs. -sperre, Schimmelschutz, Kellerabdichtung.  
*BIM-Brücke: Feuchteschutz-Layer in MaterialLayerSet.*

**Kapitel 8 – Schallschutz** (~15 S.)  
Luftschall / Trittschall / Körperschall, Schalldämmmaß R'w, DIN 4109, konstruktive Maßnahmen (schwimmender Estrich, Entkopplung, Vorsatzschale), Schallschutz im Holzbau.  
*BIM-Brücke: Pset_WallCommon (AcousticRating); IfcSpace Raumanforderungen.*

**Kapitel 9 – Brandschutz** (~15 S.)  
Baustoffklassen (A1–B2, Euroklassen), Feuerwiderstandsklassen (REI), Gebäudeklassen nach MBO (GK 1–5), Brandabschnitte, Rettungswege, Sonderfälle (Tiefgarage, Holzbau).  
*BIM-Brücke: Pset_WallCommon (FireRating); Brandabschnittsmodell; Rettungswegprüfung als BIM-Use-Case.*

---

### TEIL IV – Technische Gebäudeausrüstung (TGA)
*~80 Seiten | Quellen: Haustechnik, Nachhaltige Gebäudetechnik, Informationsdienst Holz*

> TGA macht 30–40% der Baukosten aus und bestimmt Schachtgrößen, Deckenhöhen und Grundrisse mit. Dieser Teil erklärt TGA so, dass Architekten und BIM-Entwickler die richtigen Fragen stellen können.

**Kapitel 10 – Heizung & Wärmeversorgung** (~20 S.)  
Wärmeerzeuger im Vergleich (Wärmepumpe, Fernwärme, Gas, Pellets, Solarthermie), Wärmeverteilung (FBH vs. Heizkörper, hydraulischer Abgleich), Warmwasserbereitung, Heizlastberechnung als Konzept.  
*BIM-Brücke: IfcBoiler, IfcPipeSegment; MEP-Kollisionsprüfung; Pset_SpaceHeatingRequirements.*

**Kapitel 11 – Lüftung & Raumluftqualität** (~20 S.)  
Natürliche Lüftung, KWL mit Wärmerückgewinnung, zentral vs. dezentral, RLT-Anlagen (Gewerbe), DIN 1946-6, Schächte im Grundriss.  
*BIM-Brücke: IfcAirTerminal, IfcDuctSegment; MEP-Koordination; typische Kollisionsszenarien.*

**Kapitel 12 – Sanitär, Entwässerung & Trinkwasser** (~20 S.)  
Trinkwasserinstallation (TRWI, Hygiene, Rohrmaterial), Schmutzwasser vs. Regenwasser (Trennsystem), Fallleitungen, Rückstausicherung, Dachentwässerung.  
*BIM-Brücke: IfcSanitaryTerminal, IfcPipeSegment; Fallleitungsführung als Kollisionsquelle.*

**Kapitel 13 – Elektro, Schwachstrom & Gebäudeautomation** (~20 S.)  
Grundversorgung (Hausanschluss, Verteilung, RCD), Beleuchtungsplanung (Lux, DIN EN 12464), Schwachstrom (LAN, BMA, ELA), EV-Laden, Photovoltaik, Gebäudeautomation (KNX, BACnet, DALI).  
*BIM-Brücke: IfcElectricDistributionBoard, IfcSensor; Smart-Building-Datenmodelle; Zählerstruktur.*

---

### TEIL V – Planung, Recht & Prozess
*~60 Seiten | Quellen: HOAI 2021, HOAI Praxis, VOB, MBO, GEG, Barrierefreiheitsleitfäden*

**Kapitel 14 – Planungsrecht: BauGB, MBO & Bebauungsplan** (~20 S.)  
Baurecht-System (BauGB → LBO → Satzungen), B-Plan lesen, §34/§35 BauGB, Genehmigungsverfahren, Abstandsflächen, Stellplatznachweis, Barrierefreiheitspflicht.  
*BIM-Brücke: GFZ-Prüfung automatisierbar; IfcSite und Geländemodell; GIS-Schnittstellen.*

**Kapitel 15 – HOAI: Phasen, Leistungen, Koordination** (~20 S.)  
Die 9 Leistungsphasen im Detail (LP1–LP9), Honorarberechnung, Fachplaner und ihre LP, Koordinationsaufgabe des Architekten.  
*BIM-Brücke: BIM in den LP (welches Modell in welcher Phase), LOD-Konzept 100–500, AIA, BIM-Manager.*

**Kapitel 16 – Kosten, Ausschreibung & VOB** (~20 S.)  
DIN 276 Kostenermittlung (KG 100–700), Kostenkennwerte, Leistungsverzeichnis, STLB-Bau, Vergabe (UVgO/VOB/A), VOB/B Grundlagen (Vertragstypen, Nachträge, Abnahme, Gewährleistung).  
*BIM-Brücke: 5D-BIM, Mengenermittlung aus Modell (IfcQuantitySet), GAEB-Format.*

---

### TEIL VI – BIM: Das digitale Gebäude
*~90 Seiten | Quellen: IFC 4.3.2.0, OmniClass, Uniclass 2015, ISO 19650, DIN SPEC 91391, Revit 2026*

> Alle vorherigen Teile haben BIM-Brücken eingebaut – hier kommen sie zusammen.

**Kapitel 17 – Was BIM wirklich ist** (~15 S.)  
BIM als Methode / Datenmodell / Prozess, Reifegradstufen, was BIM löst (und was nicht), offenes BIM vs. proprietäre Ökosysteme, aktueller Stand Deutschland.

**Kapitel 18 – IFC: Die Sprache des digitalen Gebäudes** (~25 S.)  
IFC-Architektur (Projektstruktur, Produkthierarchie, Geometrierepräsentation), wichtigste Entitäten (Architektur, Tragwerk, TGA), Properties und PropertySets, Beziehungen in IFC, IFC-Versionen (IFC2x3 → IFC4.3), IFC lesen als Entwickler.  
*Leitbeispiel: vollständig annotierter IFC-Auszug der Außenwand Kastanienallee 7.*

**Kapitel 19 – Klassifikation: OmniClass, Uniclass & STLB** (~15 S.)  
Das Klassifikationsproblem, OmniClass (14 Tabellen), Uniclass 2015, STLB-Bau/GAEB, DIN 276 als deutsche Klassifikation, Verbindung IFC ↔ Klassifikation (IfcClassificationReference), Mapping-Tabellen für Entwickler.

**Kapitel 20 – Prozess & Kollaboration: CDE & ISO 19650** (~20 S.)  
CDE-Zustände (WIP → Shared → Published → Archived), ISO 19650 (Konzepte, Lieferprozess, Appointment-Struktur), Informationsanforderungen (OIR / AIR / EIR / MIDP), BIM-Rollen, Koordinationsmodell, Kollisionsprüfung (Hard/Soft/Workflow), BCF-Format, Modellvalidierung (mvdXML, IDS).

**Kapitel 21 – BIM in der Praxis: Workflows & Software** (~15 S.)  
Authoring-Tools (Revit, ArchiCAD, Vectorworks, Allplan), Koordinationstools (Navisworks, Solibri, BIMCollab), Analysetools, Facility Management (COBie, CAFM), typischer BIM-Workflow LP 1–9, häufige Fehler, Open-Source-Ökosystem (IfcOpenShell, BlenderBIM, xBIM).

---

### TEIL VII – Nachhaltigkeit, Sanierung & Ausblick
*~60 Seiten | Quellen: Atlas Recycling, Denkmal und Energie, Bausanierung, Energie Atlas*

**Kapitel 22 – Nachhaltigkeit & Kreislaufwirtschaft** (~20 S.)  
Embodied Carbon vs. Operational Carbon, Lebenszyklusanalyse (LCA), EPD, Zertifizierungssysteme (DGNB, LEED, BREEAM), Kreislaufwirtschaft (Urban Mining, Materialpass, Design for Disassembly), Dach- und Fassadenbegrünung, EU-Taxonomie.  
*BIM-Brücke: Materialpass im Modell; LCA-Schnittstellen; DGNB-Dokumentation aus BIM.*

**Kapitel 23 – Sanierung: Bestand verstehen und ertüchtigen** (~20 S.)  
Baualtersphasen und ihre Konstruktionen (Gründerzeit, 50er, 70er, 90er), typische Bauschäden, energetische Sanierung im Bestand, Innendämmung als Herausforderung, Denkmalschutz & GEG-Ausnahmen.  
*BIM-Brücke: Scan-to-BIM, Punktwolken, as-built vs. as-designed.*

**Kapitel 24 – Digitaler Zwilling, KI & die Zukunft des Bauens** (~20 S.)  
Digitaler Zwilling: was ihn vom BIM-Modell unterscheidet (Echtzeit-Sensorik, kontinuierliche Aktualisierung, Betriebsdaten). KI im Bauwesen heute: Generative Design, automatische Grundrissgenerierung, KI-basierte Modellprüfung, Predictive Maintenance. Robotik & Vorfertigung: modulares Bauen, serielle Sanierung, 3D-Druck im Bauwesen. Rechtlicher Rahmen: EU BIM-Mandate, VDI 2552, e-Government.

> **Ausblick: Teil 2 – „BIM und KI"**  
> Das vorliegende Buch streift KI als Zukunftsthema. Ein geplanter zweiter Band widmet sich dem Thema vollständig: LLMs für Modellprüfung und -generierung, Computer Vision für Baustellen-Monitoring, automatisierte Ausschreibung, regelbasierte Compliance-Prüfung und die Architektur KI-gestützter BIM-Software. Der technische Hintergrund aus diesem Buch ist die Voraussetzung dafür.

---

### Anhang

| Anhang | Inhalt | ~Seiten |
|--------|--------|---------|
| A – Glossar | 150+ Fachbegriffe kurz erklärt | 6 |
| B – Normen & Gesetze | Welche Norm gilt wofür – Schnellreferenz | 3 |
| C – Weiterführende Literatur | Die Bibliothek als Ausgangspunkt | 2 |
| D – IFC-Schnellreferenz | Die 50 wichtigsten Entitäten mit Kurzbeschreibung | 5 |
| E – Kastanienallee 7 – Projektübersicht | Alle Kenndaten, Pläne, Modell-Screenshots | 5 |

---

## Gesamtumfang

| Teil | Kapitel | Seiten |
|------|---------|--------|
| I – Grundlagen | 1–2 | ~40 |
| II – Baukörper | 3–5 | ~90 |
| III – Bauphysik & Hülle | 6–9 | ~70 |
| IV – TGA | 10–13 | ~80 |
| V – Recht & Prozess | 14–16 | ~60 |
| VI – BIM | 17–21 | ~90 |
| VII – Nachhaltigkeit & Ausblick | 22–24 | ~60 |
| Anhang | – | ~21 |
| **Gesamt** | **24 Kapitel** | **~511 Seiten** |

---

## Illustrationen

Jedes Kapitel enthält **3–6 Abbildungen**, generiert mit ChatGPT/Gemini in einem konsistenten Stil:  
isometrische Schnitte, technische Diagramme, Schichtaufbauten, Systemschemata, Vergleichsdarstellungen.

Für jede Illustration wird im Kapiteltext ein detaillierter **Illustration-Prompt** hinterlegt, sodass die Erzeugung reproduzierbar und stilkonsistent bleibt. Geplanter Grafik-Stil: klare Linienführung, gedämpfte Farbpalette (3–4 Farben pro Bild), Beschriftungen auf Deutsch.

---

## Workflow

```
1. Kapitel schreiben (Claude, auf Basis der Bibliothek)
2. Review & Feedback (Johannes)
3. Illustration-Prompts → Bilder erzeugen (ChatGPT/Gemini Skill)
4. Kapitel finalisieren
5. Git commit
```

Jedes Kapitel lebt als eigene Markdown-Datei unter `chapters/`. Der Anhang, das Glossar und das Leitbeispiel-Dossier kommen in `appendix/`. Bilder in `assets/`.

```
bim-book/
├── README.md              ← dieses Dokument
├── chapters/
│   ├── 01-architektur-als-system.md
│   ├── 02-entwurf-raum-funktion.md
│   └── ...
├── appendix/
│   ├── glossar.md
│   ├── ifc-referenz.md
│   └── kastanienallee7.md
└── assets/
    ├── illustrations/
    └── diagrams/
```

---

## Nächste Schritte

- [ ] Ordnerstruktur anlegen (`chapters/`, `appendix/`, `assets/`)
- [ ] Leitbeispiel-Dossier ausarbeiten: Grundrisse, Kennzahlen, Modell-Konzept für Kastanienallee 7
- [ ] Illustration-Skill für ChatGPT-Bildgenerierung einrichten
- [ ] Kapitel 1 schreiben – als Pilot für Ton, Tiefe und Format

---

*Johannes Hötter × Claude · Mai 2026*  
*„Teil 2 – BIM und KI" ist in Planung.*
