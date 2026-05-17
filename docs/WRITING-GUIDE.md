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

### Kapitelreferenzen

Verweise auf andere Kapitel:
```markdown
→ Kapitel 6 befasst sich ausführlich mit dem [Wärmeschutz](../chapters/06-waermeschutz-geg.md).
```

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
6. `docs/terms-registry.yaml` aktualisieren mit allen neu eingeführten Begriffen
