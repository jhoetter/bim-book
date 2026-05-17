# Writing Guide — BIM Buch

Dieses Dokument beschreibt den verbindlichen Prozess für das Schreiben von Buchkapiteln.
Jeder schreibende Agent muss es vollständig lesen, bevor er ein Kapitel erstellt oder bearbeitet.

---

## Das Leitbeispiel: Kastanienallee 7

Alle Kapitel verwenden **dasselbe fiktive Referenzgebäude** als durchgehendes Beispiel:

> **Kastanienallee 7** — Mehrfamilienhaus, Bayern, Baujahr 2025 (fiktiv)
> 4 Vollgeschosse + Keller + DG · 12 Wohneinheiten · ~1.800 m² BGF
> Stahlbeton-Skelett mit Ziegelausfachung · Flachdach extensiv begrünt + PV 30 kWp
> Primärenergiebedarf: 45 kWh/(m²a) nach GEG

Die vollständigen Kenndaten findest du in `docs/appendix/kastanienallee7.md`.
Verwende dieses Gebäude bei konkreten Beispielen, Berechnungen und Illustrationen.

---

## Glossarbegriffe und Terminologie

### Glossar-Datei

Alle Fachbegriffe mit ihren Definitionen sind in `web/src/data/glossar.ts` als strukturierte
Daten gespeichert. Lies diese Datei, um zu wissen, welche Begriffe im Buch definiert sind
(IDs, Abkürzungen, Definitionen).

### Terms Registry

Die Datei `docs/terms-registry.yaml` protokolliert, in welchem Kapitel jeder Begriff
**zum ersten Mal vollständig eingeführt** wurde.

**VOR dem Schreiben eines Kapitels:**
1. Lies `docs/terms-registry.yaml`
2. Ermittle die bereits eingeführten Begriffe (alle mit `introduced_in` gesetzt UND deren
   Kapitel-ID im Chapter-Order vor deinem Kapitel liegt)
3. Diese Begriffe kannst du direkt mit `::ABKÜRZUNG::` verwenden, ohne sie nochmals zu erklären

**NACH dem Schreiben eines Kapitels:**
1. Ergänze in `docs/terms-registry.yaml` alle Begriffe, die du in diesem Kapitel
   neu eingeführt hast, mit `introduced_in: "<deine-kapitel-id>"`

---

## Markup-Konventionen

### Glossar-Hovering: `::TERM::`

Jeder Fachbegriff, der im Buch vorkommt und im Glossar eingetragen ist, wird mit der
`::TERM::`-Syntax markiert. Dadurch erscheint beim Lesen ein Hover-Popover mit der Definition.

**Ersteinführung eines Begriffs** (introduced_in ist null oder dieses Kapitel):
```
Die **Technische Gebäudeausrüstung** (::TGA::) umfasst alle haustechnischen Systeme...
```
→ Vollständiger Name in Fett, Abkürzung in Klammern mit `::...::` markiert.

**Weitere Verwendungen** (Begriff bereits eingeführt):
```
Die ::TGA:: bestimmt die Schachtgrößen...
```
→ Nur die Abkürzung mit `::...::`, kein Fettdruck.

**Begriffe ohne Abkürzung** (z.B. Wärmebrücke, Eurocode):
```
Eine ::Wärmebrücke:: entsteht, wenn...
```
→ Vollständiger Terminus mit `::...::`. Bei Ersteinführung in Fett:
```
Eine **::Wärmebrücke::** entsteht, wenn...
```

**Wichtig:** Der Text innerhalb `::...::` muss exakt (case-insensitive) mit einer Term-ID
aus dem Glossar übereinstimmen. Verfügbare IDs findest du in `web/src/data/glossar.ts`.

**Niemals `**fett**` als Ersatz für einen fehlenden Glossareintrag verwenden.**
`**fett**` ist ausschließlich für:
- Labels in Listen (`**Wärmeversorgung:** Fernwärme …`)
- Leit- oder Zusammenfassungssätze (`**Tragwerk begrenzt Hülle und Innenausbau.**`)
- Nicht-terminologische Hervorhebungen

Wenn ein Fachbegriff hervorgehoben werden soll, der noch nicht im Glossar steht:
1. Eintrag in `web/src/data/glossar.ts` anlegen (id, term, definition, thema, typ)
2. Dann `::Begriff::` im Markdown verwenden

### Häufige Term-IDs (Kurzreferenz)

| Schreibweise im Text | Term-ID |
|---|---|
| `::TGA::` | tga |
| `::BIM::` | bim |
| `::IFC::` | ifc |
| `::HOAI::` | hoai |
| `::GEG::` | geg |
| `::WDVS::` | wdvs |
| `::U-Wert::` | u-wert |
| `::R-Wert::` | r-wert |
| `::LOD::` | lod |
| `::BCF::` | bcf |
| `::BAP::` | bap |
| `::GFZ::` | gfz |
| `::GRZ::` | grz |
| `::MBO::` | mbo |
| `::VOB::` | vob |
| `::KWL::` | kwl |
| `::FBH::` | fbh |
| `::REI::` | rei |
| `::WLG::` | wlg |
| `::EPD::` | epd |
| `::STEP::` | step |
| `::Wärmebrücke::` | wärmebrücke |
| `::Eurocode::` | eurocode |
| `::Mineralwolle::` | mineralwolle |
| `::Dampfbremse::` | dampfbremse |
| `::Dampfsperre::` | dampfsperre |
| `::Glaser-Verfahren::` | glaser-verfahren |
| `::Lastfall::` | lastfall |
| `::Embodied Carbon::` | embodied-carbon |
| `::Schichtenmodell::` | schichtenmodell |

### Neuen Glossareintrag anlegen

Wenn ein Begriff fehlt, zuerst in `web/src/data/glossar.ts` eintragen, dann erst im Markdown referenzieren:

```ts
{
  id: 'schichtenmodell',           // kebab-case, alphabetisch einsortieren
  term: 'Schichtenmodell',         // Anzeigename
  abbrev: 'SM',                    // nur wenn offiziell gebräuchliche Abkürzung existiert
  definition: 'Kurze, präzise Definition …',
  thema: 'Konstruktion',           // einer der GlossThema-Werte (siehe unten)
  typ: 'Begriff',                  // einer der GlossTyp-Werte (siehe unten)
}
```

**Erlaubte `thema`-Werte:** `BIM` · `Wärmeschutz` · `Feuchteschutz` · `Schallschutz` · `Brandschutz` · `TGA` · `Baurecht` · `Konstruktion` · `Energie` · `Nachhaltigkeit`

**Erlaubte `typ`-Werte:** `Begriff` · `Kennwert` · `Verfahren` · `Material` · `Norm`

Einträge alphabetisch nach `id` sortiert halten. `abbrev` nur setzen, wenn die Abkürzung offiziell und im Fachbereich gebräuchlich ist.

### Formel-Hover: `^^formel-id^^`

Formeln werden im Text mit `^^formel-id^^` eingebettet. Der Leser sieht eine inline-gerenderte
Kurzform der Formel (KaTeX) und beim Hover ein Popover mit vollständiger Formel, Variablen und
Beispielwerten aus der Kastanienallee 7.

```markdown
Der ::U-Wert:: berechnet sich als ^^u-wert^^, wobei alle Schichtwiderstände addiert werden.
```

Verfügbare Formel-IDs (aus `web/src/data/formulas.ts`):

| Formel-ID | Formel |
|---|---|
| `^^u-wert^^` | U-Wert nach DIN EN ISO 6946 |
| `^^r-wert^^` | Wärmedurchgangswiderstand R = d/λ |
| `^^transmissionswaermeverlust^^` | HT = Σ U·A·fx |
| `^^gfz^^` | Geschossflächenzahl GFZ |
| `^^grz^^` | Grundflächenzahl GRZ |
| `^^primaerenergiebedarf^^` | Primärenergiebedarf Qp = Qf · fp |
| `^^schalldaemmass^^` | Bewertetes Schalldämmmaß R'w |
| `^^waermeleitung^^` | Wärmeleitung nach Fourier |

Neue Formeln können in `web/src/data/formulas.ts` ergänzt werden.

### Bilder: Platzhalter mit Prompt

Jedes Bild wird als **Platzhalter-Block** gesetzt, der den Bildprompt für die spätere Generierung trägt.
Das Bild-Referenz-Tag (`![...]()`) folgt direkt darunter und zeigt auf den künftigen Dateinamen.
Das UI rendert den Block als Placeholder-Karte, solange die Bilddatei noch nicht existiert.
Sobald das Bild generiert wurde, erscheint automatisch das fertige Bild.

**Format:**

```
<!-- IMAGE
name: kap06_wandaufbau_wdvs
type: section
size: landscape
desc: Wandquerschnitt WDVS mit 5 Schichten von innen nach außen: Mauerwerk 240 mm (grau,
  Diagonalschraffur), Klebemortel 5 mm, Mineralwolle 120 mm (blau, Zickzack, WLG 035),
  Armierputz 8 mm, Silikonharzputz 3 mm. Maßketten rechts, Beschriftungen auf Deutsch,
  weiß Hintergrund, technisch-clean ohne Personen.
caption: Wandaufbau mit WDVS – Kastanienallee 7
tags: wdvs, wärmeschutz, wandquerschnitt
-->
![WDVS-Wandquerschnitt](../assets/illustrations/kap06_wandaufbau_wdvs.png)
```

**Pflichtfelder:**
| Feld | Bedeutung |
|---|---|
| `name` | Dateiname ohne `.png` — Schema: `kapNN_stichwort` |
| `type` | `section`, `diagram`, `isometric`, `floorplan`, `comparison`, `infographic`, `cover` |
| `size` | `landscape` (Standard), `square`, `portrait` |
| `desc` | Vollständige Bildbeschreibung für die KI — so präzise wie möglich |
| `caption` | Bildunterschrift (erscheint unter dem fertigen Bild) |
| `tags` | Kommagetrennte Stichwörter für das Manifest |

**Regeln:**
- `name` muss mit dem Dateinamen im `![...](../assets/illustrations/<name>.png)` übereinstimmen
- `desc` trägt alle fachlichen Details: Schichten, Maße, Schraffurmuster, Beschriftungssprache
- Der Platzhalter zeigt `desc` im UI als Prompt-Vorschau — schreib ihn für die KI, nicht für den Leser
- Bilder werden mit `python3 skills/imagegen/generate-placeholders.py` batch-generiert

### Querverweise und Links

**Pflicht:** Jeder Verweis auf ein anderes Kapitel, einen Anhang oder eine externe Quelle muss ein echter Markdown-Link sein. Kein Pfeil (`→`) vor oder in Links.

#### Interne Kapitelverweise

Absolute Root-Pfade ohne `.md`-Extension verwenden:

```markdown
[Kap. 6](/chapters/06-waermeschutz-geg)
[Kap. 18](/chapters/18-ifc)
[IFC-Schnellreferenz](/appendix/ifc-referenz)
[Kastanienallee 7](/appendix/kastanienallee7)
[Glossar](/glossar)
[Formelsammlung](/formelsammlung)
```

**Inline-Verweis** (im Fließtext):
```markdown
…wie die Eurocode-Reihe zeigt (siehe [Kapitel 4](/chapters/04-tragwerk)).
```

**Standalone-Verweiszeile** (mehrere Ziele, z. B. am Abschnittsende):
```markdown
Wärmeschutz: [Kap. 6](/chapters/06-waermeschutz-geg) · Feuchteschutz: [Kap. 7](/chapters/07-feuchteschutz)
```

**Benannter Link** im Fließtext:
```markdown
Kapitel 6 befasst sich ausführlich mit dem [Wärmeschutz](/chapters/06-waermeschutz-geg).
```

#### Externe Weblinks

Standard-Markdown-Link — öffnet automatisch in neuem Tab:
```markdown
[Beuth Verlag](https://www.beuth.de)
[GEG 2023](https://www.gesetze-im-internet.de/geg/)
```

Niemals rohe URLs ohne Link-Text in den Fließtext schreiben.

#### Pfadübersicht (Kurzreferenz)

| Ziel | Pfad |
|---|---|
| Kapitel N | `/chapters/NN-slug` (z. B. `/chapters/04-tragwerk`) |
| IFC-Schnellreferenz | `/appendix/ifc-referenz` |
| Kastanienallee 7 | `/appendix/kastanienallee7` |
| Normen & Gesetze | `/appendix/normen` |
| Glossar | `/glossar` |
| Formelsammlung | `/formelsammlung` |

### Admonitions

Hinweise, Warnungen und Tipps:
```
!!! note "Hinweis"
    Kurzer erläuternder Text.

!!! tip "Praxistipp"
    Anwendungsbezogener Tipp.

!!! warning "Achtung"
    Wichtiger Hinweis auf Fehlerquelle.
```

---

## Stil und Struktur

- **Ton**: sachlich, direkt, ohne unnötige Füllwörter. Wie ein erfahrener Praktiker erklärt.
- **Satzlänge**: mittellang. Keine Schachtelsätze.
- **Abschnittsgröße**: ~3–6 Sätze pro Absatz.
- **Beispiele**: immer an der Kastanienallee 7 festmachen, wenn konkrete Zahlen gefragt sind.
- **Keine Wiederholung**: Was in früheren Kapiteln erklärt wurde, wird nicht nochmals erklärt,
  sondern nur referenziert.
- **Konsistenz**: Verwende die exakt gleichen Fachbegriffe wie in früheren Kapiteln.
  Synonyme vermeiden, wenn ein eingeführter Begriff existiert.

---

## Kapitel-Ablauf (Checkliste für den schreibenden Agent)

1. `docs/terms-registry.yaml` lesen → welche Begriffe sind bereits eingeführt?
2. `web/src/data/glossar.ts` lesen → welche Term-IDs stehen zur Verfügung?
3. `docs/appendix/kastanienallee7.md` lesen → aktuelle Kenndaten des Beispielgebäudes
4. Ggf. vorangehende Kapitel überfliegen → welche Beispiele wurden bereits gezeigt?
5. Kapitel schreiben nach obigen Konventionen
   - Bilder als Platzhalter-Blöcke setzen (siehe „Bilder: Platzhalter mit Prompt")
   - `desc` im Platzhalter vollständig und fachlich korrekt formulieren
6. `docs/terms-registry.yaml` aktualisieren mit allen neu eingeführten Begriffen

## Bilder generieren (nach dem Schreiben)

```bash
# Alle fehlenden Bilder generieren (liest alle <!-- IMAGE --> Blöcke):
python3 skills/imagegen/generate-placeholders.py

# Vorschau: zeigt welche Bilder fehlen ohne zu generieren:
python3 skills/imagegen/generate-placeholders.py --dry-run

# Nur ein bestimmtes Kapitel:
python3 skills/imagegen/generate-placeholders.py --chapter 06

# Alle Bilder neu generieren (auch vorhandene überschreiben):
python3 skills/imagegen/generate-placeholders.py --all
```
