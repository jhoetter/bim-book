# Skill: Buchillustration generieren

Dieser Skill erzeugt konsistente Illustrationen für das Buch **„BIM von Grund auf"** via OpenAI DALL-E 3.

## Voraussetzungen

1. `.env` Datei im Repo-Root mit `OPENAI_API_KEY=sk-...`
2. Python 3 (keine externen Abhängigkeiten – nur stdlib)

## Verwendung durch Claude

Wenn eine Illustration für das Buch benötigt wird, rufe das Skript so auf:

```bash
cd /Users/jhoetter/repos/bim-book
python3 skills/imagegen/generate.py \
  --type <TYP> \
  --desc "<BESCHREIBUNG AUF DEUTSCH>" \
  --name "<DATEINAME>" \
  [--context <KONTEXT>]      # generic (Standard) | kastanienallee
  [--caption "<TEXT>"]       # Kurzbeschreibung fürs Manifest (~100 Zeichen)
  [--tags "tag1,tag2,..."]   # Stichwörter fürs Manifest (kommagetrennt)
  [--size <GRÖSSE>]          # optional, sonst Typ-Standard
  [--skip-qa]                # QA überspringen (für schnelle Tests)
```

### Größen (--size)

| Kürzel | Pixel | Wann |
|--------|-------|------|
| `portrait` / `tall` | 1024×1536 | Schnitte, Wandaufbauten |
| `landscape` / `wide` | 1536×1024 | Diagramme, Grundrisse, Isometrien |
| `square` | 1024×1024 | Icons, quadratische Vergleiche |
| `auto` | vom Modell | Wenn Ausrichtung unklar |
| `1024x1536` | explizit | Direktangabe |

**Standard:** wird automatisch aus dem Typ abgeleitet (style_config.json).  
**Überschreiben:** `--size landscape` oder `--size auto` oder `--size 1024x1024`

### Illustrationstypen

| Typ | Wofür | Format | Besonderheiten |
|-----|-------|--------|----------------|
| `isometric` | Gebäudeschnitte, Bauteilaufbauten, Systemübersichten | Querformat | Weißer Hintergrund, mit Beschriftung |
| `diagram` | Schemata (Heizung, Lüftung, IFC-Hierarchie, Workflows) | Querformat | Weißer Hintergrund, mit Beschriftung |
| `section` | Wandquerschnitte, Dachaufbauten, Detailschnitte | Hochformat | Weißer Hintergrund, mit Beschriftung |
| `floorplan` | Grundrisse, Lagepläne | Querformat | Weißer Hintergrund, mit Beschriftung |
| `comparison` | Materialvergleiche, Systemalternativen | Querformat | Weißer Hintergrund, mit Beschriftung |
| `infographic` | Prozeßübersichten, HOAI-Phasen, Normenzusammenfassungen | Querformat | Weißer Hintergrund, mit Beschriftung |
| `cover` | Kapitel-Titelbanner | Querformat | **Weißer Hintergrund vor Freistellung, keine Beschriftung, automatisch → `assets/covers/`** |

#### Cover-Typ: Automatisches Verhalten
- Ausgabe automatisch in `assets/covers/` (kein `--output-dir` nötig)
- Hintergrundentfernung bleibt aktiv: weiße Flächen werden transparent, damit die Cover auf hellen und dunklen Karten funktionieren
- Kein Manifest-Eintrag (Cover erscheinen nicht in der Galerie)
- Cover-spezifische QA: prüft visuellen Impact, kein Text, zentrale Banner-Komposition, keine Grid-Layouts

#### Tipps für gute Cover-Beschreibungen
- **Zeig das Kapitelthema durch eine starke Bildkomposition**, kein Grid von gleich großen Feldern
- Die sichtbare Zone im Banner ist die **Bildmitte** (~25–60% von oben) — platziere die wichtigsten Elemente dort
- Nutze **1–3 dominante Elemente** in dynamischer Anordnung über die volle Breite
- Amber (#F59E0B), Blau (#93C5FD) oder Grau (#6B7280) als Akzentfarben einsetzen
- Detailreiche technische Banner erzeugen: Hatching, Gebäudebezug, Material-/Systemtiefe und klare perspektivische Tiefe statt abstrakter Vektor-Icons
- Kein Text, keine Maßketten, keine Beschriftungen

### Dry Run (Prompt prüfen ohne API-Aufruf)

```bash
python3 skills/imagegen/generate.py --dry-run \
  --type isometric \
  --desc "Explosionsdarstellung Kastanienallee 7: Tragstruktur grau, Dämmung blau, TGA amber" \
  --name "kap01_gebaeude_schichten"
```

## Dateinamen-Konvention

```
kap{NR}_{kürzel}.png

Beispiele:
  kap01_architektur_system.png
  kap05_flachdach_aufbau.png
  kap06_u_wert_berechnung.png
  kap10_heizkreis_schema.png
  kap18_ifc_hierarchie.png
```

Bilder werden in `assets/illustrations/` gespeichert.
Zu jedem Bild wird automatisch eine `.prompt.txt` gespeichert (für Reproduzierbarkeit).

## Bildkontext (`--context`)

| Wert | Wann verwenden |
|------|---------------|
| `generic` | Allgemeine Lehrillustration ohne Gebäudebezug (Standard) |
| `kastanienallee` | Bild bezieht sich auf das Leitbeispiel Kastanienallee 7 – injiziert automatisch die Gebäudebeschreibung in den Prompt |

## Manifest-Eintrag

Jedes erzeugte Bild wird automatisch in `assets/image-manifest.json` eingetragen. Pflichtfelder (`--type`, `--name`) werden automatisch ausgewertet. Optional:

- `--caption "Kurztext"` – erscheint in der Bildgalerie als Bildunterschrift
- `--tags "wand,daemmung,u-wert"` – Filter-Stichwörter in der Galerie

## Konsistenter Stil

Der Stil ist zentral in `skills/imagegen/style_config.json` definiert:

- **Farbsystem:** Stahlblau `#2C5F8A` (Primär), Warm-Grau `#4A5568` (Tragwerk), Amber `#E07A3A` (TGA/Akzent)
- **Hintergrund:** Immer weiß
- **Beschriftungen:** Deutsch
- **Kein Fotorealismus**, keine Personen, keine Dekoration
- Gleiche Farbe = gleiche Bedeutung in allen Kapiteln

## Beispielaufruf je Kapitel

```bash
# Kapitel 1 – Gebäude als System
python3 skills/imagegen/generate.py --type isometric \
  --desc "Isometrische Explosionsdarstellung eines viergeschossigen Mehrfamilienhauses. Vier Schichten sichtbar: 1. Tragstruktur (Stahlbeton, grau), 2. Gebäudehülle (Fassade + Dach, blau), 3. TGA-Installationen (Rohre und Leitungen, amber), 4. Innenausbau (Wände, Böden, hell). Beschriftung der vier Schichten rechts." \
  --name "kap01_schichtenmodell"

# Kapitel 6 – Wärmeschutz
python3 skills/imagegen/generate.py --type section \
  --desc "Wandquerschnitt von innen nach außen: Innenputz 15mm, Stahlbetonwand 200mm (diagonal schraffiert), Mineralwolle WLG035 160mm (Zickzack-Muster, blau), Armierungsputz 5mm, Silikonharzputz 3mm (weiß außen). Rechts U-Wert Angabe 0,19 W/m²K. Maßpfeile mit Millimeterangaben. Deutsche Beschriftungen." \
  --name "kap06_wandaufbau_wdvs"

# Kapitel 10 – Heizung
python3 skills/imagegen/generate.py --type diagram \
  --desc "Hydraulisches Schema einer Fernwärmeanlage: Übergabestation links (Wärmetauscher), Verteiler Mitte, drei Heizkreise rechts (Fußbodenheizung EG, FBH OG1, FBH OG2). Vorlauf rot gestrichelt, Rücklauf blau gestrichelt. Pumpen als Kreissymbole. Thermometer-Symbole an Vorlauf (70°C) und Rücklauf (50°C). Deutsche Beschriftungen." \
  --name "kap10_fernwaerme_schema"

# Kapitel 18 – IFC
python3 skills/imagegen/generate.py --type diagram \
  --desc "IFC-Projektstruktur als Baumdiagramm von oben nach unten: IfcProject → IfcSite → IfcBuilding → IfcBuildingStorey (4x: KG, EG, OG1, OG2) → IfcSpace (Wohnung, Treppe, Flur). Jede Ebene in anderem Blauton. Schriftart monospace für IFC-Klassen. Deutsche Erläuterungen in normaler Schrift daneben." \
  --name "kap18_ifc_projektstruktur"
```
