# Writing-Agent-Prompt: Bucherweiterung auf 26 Kapitel

**Zweck dieser Datei:** Vollständiger, kopierbarer Prompt für einen KI-Writing-Agent.
Direkt in ein neues Chat-Fenster einfügen — der Agent braucht keine weiteren Erklärungen.

> **Hinweis zu Kapitel 27:** Aktuell erweitern wir auf 26 Kapitel. Ein 27. entsteht durch
> Auflösung von OE-08 (Holzbau als eigenes K06, alle Folgekapitel +1). Separate Entscheidung.

---

## ► PROMPT ANFANG (alles ab hier kopieren) ◄

---

Du erweiterst das Buchprojekt **„Vom Entwurf zum Modell"** im Repository `~/repos/bim-book`.
Dein Auftrag umfasst drei Teilaufgaben, die du in dieser Reihenfolge erledigst:

1. Umnummerierung des Buches von 24 auf 26 Kapitel (alle Dateien + Tracker)
2. Neues Kapitel 16 schreiben: Bauprojektmanagement & Bauoberleitung
3. Kapitel 24 (Sanierung) um Abschnitt 24.0 erweitern
4. Neues Kapitel 25 schreiben: Projektarten — Neubau, Bestand, Denkmal

---

## SCHRITT 0: Lies zuerst diese Dateien

Bevor du irgendetwas schreibst oder änderst, lies:

- `specs/tracker.md` — Masterplan; Kapitelstruktur, Schreibregeln-Hinweis, Leitbeispiel
- `docs/WRITING-GUIDE.md` — alle Formatregeln, Callout-Syntax, Pflichtstruktur
- `docs/terms-registry.yaml` — welche Begriffe in welchem Kapitel eingeführt wurden
- `web/src/data/sources.ts` — Quellenreferenzen mit ihren IDs (für Fußnoten)
- `docs/chapters/k15.md` — direktes Vorgänger-Kapitel von K16
- `docs/chapters/k17.md` (= aktuell noch k16.md, nach Umbenennung k17.md) — direktes Nachfolger-Kapitel

---

## SCHRITT 1: Umnummerierung — 24 → 26 Kapitel

### Umbenennung der Kapitel-Dateien

| Alt | Neu | Titel |
|-----|-----|-------|
| (existiert nicht) | `k16.md` | Bauprojektmanagement & Bauoberleitung ← **NEU** |
| `k16.md` | `k17.md` | Kosten & Ausschreibung |
| `k17.md` | `k18.md` | Was BIM wirklich ist |
| `k18.md` | `k19.md` | IFC: Die Sprache des digitalen Gebäudes |
| `k19.md` | `k20.md` | Klassifikation |
| `k20.md` | `k21.md` | Prozess & Kollaboration: CDE, ISO 19650 |
| `k21.md` | `k22.md` | BIM in der Praxis |
| `k22.md` | `k23.md` | Nachhaltigkeit & Kreislaufwirtschaft |
| `k23.md` | `k24.md` | Sanierung ← **wird erweitert** |
| (existiert nicht) | `k25.md` | Projektarten: Neubau, Bestand, Denkmal ← **NEU** |
| `k24.md` | `k26.md` | Digitaler Zwilling & KI |

### Was du in jeder umbenannten Datei anpassen musst

In jeder verschobenen Kapitel-Datei:
- Die Kapitelüberschrift `# Kapitel 16 — ...` auf die neue Nummer aktualisieren
- Alle internen Querverweise (`→ Kap. 16`, `→ Kap. 18` etc.) auf die neue Nummerierung prüfen
- Den Frontmatter/Header-Block (falls vorhanden: `chapter: 16`) aktualisieren

### Was du im Tracker (`specs/tracker.md`) anpassen musst

- Alle `### K16` bis `### K24` Abschnittsüberschriften → neue Nummern
- Die Kapitel-Übersicht-Tabelle komplett neu nummerieren
- Alle `→ Kap. XX`-Querverweise in allen Kapitel-Specs auf neue Nummern umschreiben
- Die Abschnittsnummern **innerhalb** der betroffenen Kapitel-Specs anpassen:
  - `K16.1 / K16.2 / ...` → `16.1 / 16.2 / ...`
  - `16.1 / 16.2 / ...` → `17.1 / 17.2 / ...`
  - usw. für alle verschobenen Kapitel
  - `23.0 / 23.1 / ...` → `24.0 / 24.1 / ...`
  - `K25.1 / K25.2 / ...` → `25.1 / 25.2 / ...`
- Bildnamen in den Specs anpassen:
  - `kap16_` → `kap16_`
  - `kap16_` → `kap17_`
  - usw.
  - `kap25_` → `kap25_`

### Was du sonst noch anpassen musst

- `web/src/data/sources.ts`: Kapitel-Referenzen in Quelleneinträgen aktualisieren
- `docs/appendix/quellen.md`: Kapitelzuordnungen aktualisieren
- Alle anderen Markdown-Dateien im Repo, die `Kapitel 16`–`Kapitel 24` referenzieren
- Führe danach `grep -r "Kap\. 1[6-9]\|Kap\. 2[0-4]" docs/ web/src/` aus um verbleibende alte Referenzen zu finden

---

## SCHRITT 2: Kapitel 16 schreiben — Bauprojektmanagement & Bauoberleitung

**Ausgabedatei:** `docs/chapters/k16.md`

### Zielgruppe (für Ton und Tiefe maßgeblich)

**Primär:** Technisch versierte Einsteiger ohne Baubranchen-Hintergrund (Informatiker,
Softwareentwickler, Ingenieure anderer Disziplinen) UND Architekturstudenten im frühen
Studium, denen die digitale Systematik fehlt. Beiden Gruppen fehlt jeweils eine Seite —
das Kapitel schließt die Lücke.

**Sekundär:** Architekten und BIM-Softwareentwickler in der Praxis, die LP 8 systematisch
durchdringen wollen.

**Konsequenz für Tiefe:** Bauprojektmanagement-Grundlagen (Netzplan, kritischer Pfad,
Nachtragsrecht, Bautagebuch) vollständig und präzise erklären — als Fundament für
Einsteiger, das Bau-Profis als fachlich korrekt erkennen.

### Leitbeispiel Kastanienallee 7 (für alle K7-Boxen)

Viergeschossiges MFH, 12 Wohneinheiten, Stahlbeton-Skelett, Fernwärme + KWL, Flachdach
mit PV, Vierspänner, GRZ 0,60, GFZ 2,4, Gebäudeklasse 4 nach MBO, aufzugspflichtig nach
Art. 37 BayBO (4 Vollgeschosse), 1 Aufzug im Treppenhauskern, Kabine 1,10 × 1,40 m lichte
Maße (DIN 18040-2), maschinenraumlos (DIN EN 81-20).
Kostenschätzung: BGF 1.800 m² × 3.200 €/m² = 5,76 Mio. € (KG 200–700 gesamt).
Gesamtbauzeit LP 8: 14 Monate.

### Pflichtabschnitte

**16.1 Was Bauprojektmanagement bedeutet**

Abgrenzung: Projektmanagement (Terminplanung, Kostenkontrolle, Risikomanagement,
Kommunikation) vs. Objektplanung (fachliche Planungsleistung LP 1–7 nach HOAI). Wer
übernimmt was: Architekt als Objektplaner; Projektsteuerer als PM-Dienstleister
(§ 31 HOAI — besondere Leistungen); in kleineren Projekten oft dieselbe Person. Überblick:
was fällt unter LP 8 (Bauoberleitung = Überwachung der Ausführung), was unter LP 9
(Objektbetreuung = Gewährleistungsphase). Abgrenzung Bauleiter-Architekt vs. verantwortlicher
Bauleiter des Unternehmens (Art. 54 BayBO / § 59 MBO): letzterer ist strafrechtlich
verantwortlich für die ordnungsgemäße Ausführung auf der Baustelle.

**16.2 Terminplanung**

Instrumente im Überblick:

(1) Balkenplan / Gantt-Diagramm: Gewerke als Zeilen, Zeit als x-Achse; einfach ablesar,
universell kommunizierbar; Schwäche: zeigt keine Abhängigkeiten

(2) Netzplan (CPM — Critical Path Method): Vorgänge als Knoten, Pfeile als
Abhängigkeiten; je Knoten: frühester Anfang (FA), spätester Anfang (SA), frühestes Ende
(FE), spätestes Ende (SE), Gesamtpuffer (GP = SA − FA); kritischer Pfad = alle Vorgänge
mit GP = 0: jede Verzögerung hier verzögert den Gesamttermin um dieselbe Zeit; Leser muss
verstehen, wie man GP abliest und was er bedeutet

Soll-Ist-Vergleich: wöchentliches Update; Terminverzug früh erkennen und schriftlich
dokumentieren. Vertragsfristen: § 5 VOB/B — Ausführungsfristen sind verbindlich;
Verzugszinsen; Vertragsstrafe (wenn vereinbart, max. 5% der Auftragssumme üblich).

IMAGE-Placeholder: `<!-- IMAGE: kap16_bauzeitenplan | Gantt-Diagramm K7 Bauablauf: Rohbau
(6 Mo) → Dach (1 Mo) → TGA-Rohinstallation parallel zum Rohbau (4 Mo) → Estrich → Innen-
putz → KWL-Endmontage → Elektriker → Maler → Böden → Außenanlagen; Gewerke als farbige
Balken; kritischer Pfad hervorgehoben (Rohbau → Estrich → Innenputz → Fußbodenbelag);
Puffertage sichtbar; landscape, weißer Hintergrund -->`

IMAGE-Placeholder: `<!-- IMAGE: kap16_netzplan_prinzip | Netzplan-Schemadiagramm mit 7–8
Vorgängen; je Knoten: FA/FE oben, SA/SE unten, Puffer rechts; kritischer Pfad rot; 2–3
Nicht-kritische Pfade mit sichtbaren Puffern; landscape, weißer Hintergrund -->`

Kastanienallee-Box nach 16.2: Bauzeitenplan K7 — Rohbau 6 Monate, Dach/Dichtheit 1 Monat,
TGA-Rohinstallation (parallel zu Rohbau-Obergeschossen) 4 Monate, Innenausbau-Sequenz 5
Monate in fixer Reihenfolge: Estrich → Trocknungszeit (4 Wochen) → KWL-Endmontage →
Elektriker Unterputz → Innenputz/Trockenbau → Maler → Parkettleger/Fliesen; Gesamtbauzeit
14 Monate; kritischer Pfad läuft über Rohbau → Estrich → Innenputz → Fußbodenbelag —
ein Verzug im Estrich verzögert alle nachfolgenden Gewerke 1:1.

**16.3 Kostenkontrolle auf der Baustelle**

Soll-Ist-Vergleich nach DIN 276: Kostenanschlag (aus LP 6/7) ist die Soll-Linie;
Kostenentwicklung auf der Baustelle wird laufend dagegen gehalten. Nachtragsprüfung:
wann ist ein Nachtrag rechtlich berechtigt? § 1 Abs. 3 VOB/B: geänderte Leistung (AG hat
Ausführungsart geändert); § 2 Abs. 6 VOB/B: zusätzliche Leistung (war nicht Bestandteil
des Vertrags). Prüfpflicht des Architekten: vor Freigabe jedes Nachtrags prüfen —
(a) Massenprüfung: stimmen die angesetzten Mengen?, (b) Preisangemessenheit: sind die
Einheitspreise marktkonform?. Typische Kostenfallen: unerwartete Bodenverhältnisse
(Kontamination, Fels, Grundwasser), Planänderungen nach LP 5 (teuerste Ursache),
Koordinationsfehler TGA-Rohbau (Schlitze nachträglich, Deckendurchbrüche). Budget-Reserve:
üblich 5–10% der Bausumme als Risikobudget für Unvorhergesehenes — wann ist diese Reserve
ausgeschöpft, wann muss der Bauherr informiert werden.

IMAGE-Placeholder: `<!-- IMAGE: kap16_kostenkontrolle | Liniendiagramm: x-Achse = Zeit
(LP 6 bis LP 9), y-Achse = Kosten in €; drei Linien: Soll (Kostenanschlag, gerade),
Ist (kumuliert, mit Sprüngen bei Nachtragspaketen), Prognose Endkosten (ab Jetzt-Punkt);
Nachtragsvolumen als farbiger Flächenblock eingezeichnet; weißer Hintergrund -->`

Kastanienallee-Box nach 16.3: Nachtrag K7 in Woche 8 — beim Bodenaushub stößt der Bagger
auf Teereinschlüsse (Altlast, Verdacht auf ehem. Tankstelle). Entsorgungsnachtrag vom
Rohbauer: 320 m³ belasteter Boden × 85 €/t (Sonderentsorgung Deponie Klasse III) +
Mehraufwand Bodentransport = 68.000 € netto. Architekten-Prüfung: Massennachweis
(Aushubprotokoll + Wiegescheine), Preisvergleich mit aktuellem Marktpreis ✓, Freigabe mit
Auflagenprotokoll. Auswirkung auf Kostenkontrolle: Reserve von 10% = 576.000 € jetzt um
68.000 € reduziert; Bauherr informiert; keine Projektstörung.

**16.4 Bauoberleitung: die tägliche Arbeit (LP 8)**

Was der Architekt auf der Baustelle konkret tut: Überwachung der Ausführung auf
Übereinstimmung mit (a) Baugenehmigung, (b) Ausführungsplanung (LP 5), (c)
Leistungsverzeichnis. Wichtig für Einsteiger: der Architekt prüft stichprobenartig,
nicht kontinuierlich — er haftet trotzdem für erkennbare Mängel. Was das rechtlich bedeutet
(Haftung bei vorsätzlichem Wegsehen vs. übersehenen Mängeln).

Baubesprechungen: wöchentlich, alle Gewerke, Protokollpflicht; was ins Protokoll muss:
Datum, Teilnehmer, Beschlüsse, Fristen, nächste Schritte; Protokoll ist Beweisdokument
bei späteren Streitigkeiten.

Bautagebuch: tägliche Pflicht des Architekten; Inhalt: Datum, Wetter (Frost, Regen —
relevant für Schäden), Anzahl und Gewerke der Arbeiter, Leistungsstand, besondere
Vorkommnisse, Anordnungen des Architekten, Mängelrügen. Bautagebuch = wichtigstes
Beweismittel bei Gewährleistungsstreitigkeiten; elektronisch führen ist Stand der Praxis.

Behinderungsanzeige nach § 6 Abs. 1 VOB/B: schriftliche Erklärung des Unternehmers,
dass er an der Ausführung gehindert ist (z. B. durch Vorgewerk, fehlendes Material, schlechtes
Wetter, Planungsfehler); Inhalt: Hinderungsgrund + voraussichtliche Dauer; Konsequenz:
der Unternehmer ist damit von der Einhaltung der Ausführungsfrist befreit — der Architekt
muss prüfen, ob die Behinderung zu Recht angezeigt wurde.

Abnahme nach § 12 VOB/B: förmliche Abnahme auf Verlangen einer Vertragspartei; Verfahren:
gemeinsamer Begehung, Abnahmeprotokoll mit Mängelliste; wesentliche Mängel → Abnahme
verweigern; unwesentliche Mängel → Abnahme mit Vorbehalten; Bedeutung: ab Abnahme
beginnt Gewährleistungsfrist (4 Jahre nach VOB/B, 5 Jahre nach BGB). Teilabnahmen je
Gewerk sinnvoll für frühen Beginn der Gewährleistungsfrist bei abgeschlossenen Gewerken.

Kastanienallee-Box nach 16.4: Baubesprechungsprotokoll K7, Woche 14 — Rohbau meldet
3 Tage Rückstand wegen Kranausfalls (Hydraulik defekt). Rohbauer stellt Behinderungsanzeige:
Kran = betriebsnotwendig, Hydraulik = nicht planbar; Architekt prüft → bestätigt
Behinderung. Konsequenz im Terminplan: nachfolgende Gewerke (Dachdecker, TGA-Rohinstallation)
um 3 Tage nach hinten verschoben; kein kritischer-Pfad-Effekt da 4 Tage Puffer; Dokumentation
im Bautagebuch und Protokoll.

**16.5 BIM in der Bauphase**

4D-BIM: Vorgänge aus dem Terminplan werden mit Modellelementen verknüpft (`IfcTask`,
`IfcRelSequence` in IFC4); Bauteil erscheint im Viewer zum geplanten Einbauzeitpunkt —
sofort erkennbar ob Ist-Stand mit Soll-Stand übereinstimmt. Baufortschrittskontrolle mit
Punktwolken (wöchentlicher Scan) und Drohnenaufnahmen (Dachfläche, Außenhülle): Abweichung
Soll-Modell vs. Ist-Punktwolke algorithmisch erkennbar. Digitales Bautagebuch über CDE-
Plattform (→ Kap. 21): Fotos georeferenziert, direkt an Modellelement gehängt via BCF.
As-built-Dokumentation: nach LP 8 werden ausgeführte Abweichungen vom LP-5-Plan ins Modell
eingetragen (LOD 500: as-built); dieses Modell ist Grundlage für LP 9 und FM-Übergabe (→
Kap. 26 Digitaler Zwilling).

### Einzuführende Begriffe (terms-registry nach Schreiben ergänzen)

`bauoberleitung`, `oba`, `bauzeitenplan`, `kritischer-pfad`, `behinderungsanzeige`,
`bautagebuch`, `nachtrag`

### Quellen (IDs aus sources.ts verwenden)

- Kochendörfer/Liebchen/Viering — Bau-Projekt-Management (Kap. Terminplanung, Kostenkontrolle)
- Würfele/Bielefeld/Gralla — Bauobjektüberwachung (Kap. ÖBA, Dokumentation, Abnahme)

### Normen

VOB/B § 4 (Ausführungspflichten), § 5 (Ausführungsfristen), § 6 (Behinderung und Unterbrechung),
§ 12 (Abnahme), § 14 (Abrechnung); HOAI 2021 Anlage 10 (Grundleistungen LP 8 Objektplanung);
LBO Bayern Art. 54 / MBO § 59 (verantwortlicher Bauleiter)

### Querverweise

→ Kap. 15 (HOAI — LP 1–9 Überblick), → Kap. 17 (Kosten & Ausschreibung — VOB/B Vertragsrecht),
→ Kap. 18 (Was BIM ist), → Kap. 21 (CDE und Dokumentation in der Praxis), → Kap. 26 (Digitaler
Zwilling — as-built-Modell im Betrieb)

### BIM-Brücke

`IfcTask`, `IfcRelSequence` — Aufgaben und Abhängigkeiten in IFC4; BCF (BIM Collaboration
Format) für Mängelerfassung auf der Baustelle: Foto + Modell-Referenz + Zuständigkeit + Frist;
→ Kap. 18 (IFC), → Kap. 21 (CDE)

---

## SCHRITT 3: Kapitel 24 (Sanierung) — Abschnitt 24.0 ergänzen

**Datei:** `docs/chapters/k24.md` (nach Umbenennung von k23.md)

Füge **vor dem bisherigen ersten Abschnitt** (24.1 Baualtersphasen) den neuen Abschnitt
24.0 ein. Ändere nichts an 24.1–24.5. Ändere die Zielwörter-Angabe im Kapitelkopf von
2.500–3.000 auf 2.800–3.400 ↑.

### Abschnitt 24.0: Bestandsmaßnahmen — Begriffe präzise

Diese Unterscheidungen sind im Planungsalltag, im Recht (BGB, GEG) und gegenüber
Genehmigungsbehörden zwingend — und werden ständig verwechselt. Vor jeder Sanierungsplanung
muss klar sein, welche Art von Maßnahme geplant ist.

Erkläre jeden Begriff vollständig, dann bringe die folgende Tabelle:

| Begriff | Was passiert | Eingriff in Bausubstanz | Baugenehmigung | GEG-relevant | Mietrechtlich |
|---------|-------------|------------------------|----------------|--------------|---------------|
| **Renovierung** | Kosmetische Arbeiten: Streichen, Tapezieren, Boden belegen | nein | nein | nein | keine Modernisierungsmieterhöhung |
| **Reparatur / Instandhaltung** | Laufende Pflege zur Erhaltung des Soll-Zustands (Heizungsservice, Dichtungen, Wartung) | minimal | nein | nein | Vermieterobliegenheit |
| **Instandsetzung** | Wiederherstellung nach Schaden (Dachstuhlreparatur nach Sturm, Fassadenriss schließen) | ja | ggf. (bei Eingriff in Standsicherheit oder Brandschutz) | nein (wenn kein Bauteil mit > 10% Fläche berührt) | nein |
| **Modernisierung** | Verbesserung über ursprünglichen Zustand hinaus (Wärmedämmung, neue Heizung, Aufzug nachrüsten, Barrierefreiheit) | ja | ggf. (bei Eingriff in Gebäudehülle oder TGA) | ja — GEG § 48: Anstoßregelung bei Erneuerung von > 10% eines Bauteils | ja — § 555b BGB Duldungspflicht; § 555c Ankündigung 3 Monate vorher; § 559 Mieterhöhung 8% der Kosten p.a. |
| **Sanierung** | Umfassende Erneuerung: Substanzerhalt + Qualitätsverbesserung kombiniert; oft Instandsetzung + Modernisierung zusammen | ja (umfassend) | i. d. R. ja (Baugenehmigung oder verfahrensfreie Kenntnisgabe je LBO) | ja | i. d. R. ja, je nach Maßnahmenumfang |
| **Umbau** | Eingriff in Grundriss, Tragstruktur oder Nutzung | ja | ja (Baugenehmigung, Standsicherheits- + Brandschutznachweis) | ja (wenn Hüllfläche oder TGA berührt) | ja (Nutzungsänderung kann Miete beeinflussen) |
| **Anbau / Aufstockung** | Hinzufügen neuer Gebäudeteile (seitlich, oben) | ja | ja — wie Neubau, GRZ/GFZ-Prüfung erforderlich | ja — neue Bauteile müssen GEG-Neubaustandard erfüllen | ja, wenn Wohnraum vergrößert |
| **Abbruch** | Teilweise oder vollständige Beseitigung | ja | ab gewisser Größe (§ 58 MBO: genehmigungspflichtig) | nein | Mieter: Sonderkündigungsrecht |

Praxis-Hinweis als eigenen Absatz: In Ausschreibungen, Verträgen und Bauanträgen immer
die präzise Terminologie verwenden. „Sanierung" als Catch-All-Begriff führt zu Unklarheiten
bei Leistungsumfang, Kosten und Genehmigungspflicht — und im Streitfall zu teuren Nachträgen.

IMAGE-Placeholder: `<!-- IMAGE: kap24_massnahmen_taxonomie | Infografik: alle 8 Maßnahmentypen
als farbkodierte Kacheln, Farbe nach Genehmigungspflicht (grün = keine, gelb = ggf., rot =
immer); je Kachel: Piktogramm + Kurzname + 3 Symbole für Genehmigung/GEG/Mietrecht;
landscape, weißer Hintergrund -->`

### Einzuführende Begriffe (zusätzlich zu bestehenden)

`modernisierung-bgb`, `instandsetzung`, `instandhaltung`, `bestandsmassnahme`

### Normen (ergänzen)

GEG §§ 48–52 (Anforderungen Bestand, Anstoßregelung), BGB §§ 555b–555f (Modernisierungsankündigung,
Duldungspflicht, Mieterhöhung), MBO § 58 (genehmigungspflichtiger Abbruch)

---

## SCHRITT 4: Kapitel 25 schreiben — Projektarten: Neubau, Bestand, Denkmal

**Ausgabedatei:** `docs/chapters/k25.md`

### Zielgruppe (wie K16 — gleicher Ton)

Einsteiger ohne Bau-Hintergrund + Architekturstudenten. Dieses Kapitel gibt den Kontext,
den Quereinsteiger dringend brauchen: warum das gesamte Buch am Beispiel eines MFH-Neubaus
erklärt wird, was bei anderen Projekttypen fundamental anders wäre, und wie man die
verschiedenen Typen im Planungsalltag auseinanderhält.

### Leitbeispiel — wie in K16

Identisch mit Kastanienallee-7-Daten (s. o.). In der K7-Box bei 25.2: K7 als MFH GK 4
erläutern — warum genau dieser Typ für das Buch gewählt wurde (alle relevanten Themen
vertreten: Aufzugspflicht, Brandschutz GK 4, TGA-Koordination, LP 8, BIM).

### Pflichtabschnitte

**25.1 Projektart als Rahmenbedingung**

Warum die Unterscheidung zuerst kommen muss: Projektart definiert Planungsstrategie, Behörden,
Unbekannte und Vertragsstrukturen — bevor der erste Strich gesetzt wird. Überblick:
Neubau auf freiem Grundstück / Neubau im Bestandsquartier / Sanierung / Umbau / Aufstockung /
Umnutzung / Abbruch + Neubau — je eigene Anforderungen (→ Kap. 24.0 für Begriffe).
Konsequenz für BIM: Neubau = Modell aus dem Nichts; Bestand = as-built-Modell als Ausgangspunkt
(→ Kap. 24 Scan-to-BIM); Denkmal = besondere Anforderungen an Detailtreue und Reversibilität.

**25.2 Neubautypen im Überblick**

Einleitender Absatz: warum es darauf ankommt (unterschiedliche Normen, Genehmigungsverfahren,
wirtschaftliche Logiken). Dann Tabelle:

| Typ | Typische BGF | Gebäudeklasse | Planungs-Besonderheiten | BIM-Einsatz heute |
|-----|-------------|---------------|------------------------|-------------------|
| **EFH / Doppelhaus** | 100–300 m² | GK 1–2 | Oft Freistellung vom Baugenehmigungsverfahren möglich (§ 63 MBO); Architekt häufig Generalplaner; wenige Fachplaner | BIM selten Pflicht; Einzelnutzer-Tool (Archicad, Revit) |
| **MFH (Geschosswohnungsbau)** | 800–4.000 m² | GK 3–4 | Aufzugspflicht ab GK 4 (→ Kap. 2); TGA-Koordination komplex (KWL, Hydraulikschema je Wohnung); Stellplatznachweis; Wirtschaftlichkeitsdruck in €/m² WF | BIM zunehmend Standard ab ~10 WE |
| **Gewerbe / Büro** | 1.000–20.000 m² | GK 3–5 | Nutzungsflexibilität als Entwurfsziel; Kühllasten (Server, Personendichte); Nutzlast 3,0 kN/m² Büro; LEED/DGNB häufig vertraglich gefordert | BIM oft Auftraggeber-Pflicht |
| **Industrie / Logistik** | 2.000–50.000 m² | GK 1–3 (Hallentyp) | Nutzlasten bis 50 kN/m²; Brandschutz nach Lagergut (z. B. Sprinkler); ELT-Ausstattung nach Produktion; Stahlbau dominiert; kurze Bauzeit gewünscht | BIM + FM-Integration Standard |
| **Sonderbau** | variabel | GK 5 oder Sondergesetz | Je eigene Richtlinien: Schulen (MSchulBauR), Krankenhäuser (KrankenhausBauVO), Versammlungsstätten (MVStättVO); intensiver Behördendialog, oft Brandschutzkonzept als Sondergutachten | BIM fast immer Pflicht (öffentl. AG) |
| **Modulbau / serieller Wohnungsbau** | ab 500 m² | GK 2–4 | Vorfertigung ganzer Raummodule im Werk; Planungstoleranz ±1 mm; Typengenehmigung vereinfacht Folgebauten erheblich | BIM zwingend — Modell = Fertigungsplanung |

Kastanienallee-Box nach 25.2: K7 als MFH GK 4 — alle charakteristischen Merkmale des
Typs vorhanden: Aufzugspflicht, Brandschutzkonzept GK 4, Fernwärme-Übergabestation,
KWL-Leitungsführung, Stellplatznachweis, 3 Wohnungstypen je Etage. Vergleich: was wäre
bei EFH anders? Kein Aufzug, kein LP-8-Architekt zwingend, einfacheres Genehmigungsverfahren,
ein Gewerk = ein Unternehmer möglich. Was wäre bei Sonderbau anders? Zusätzliche Sonder-
baurichtlinien, Brandschutzgutachter, zweites Genehmigungsverfahren (Sonderbehörde).

**25.3 Neubau vs. Bestand: der fundamentale Unterschied**

Neubau: leere Seite — vollständige Kontrolle über Geometrie, Konstruktion, Material;
Planung kann vollständig durchgearbeitet werden bevor der erste Spatenstich. Bestand:
immer Unbekannte: (a) Geometrie (Bestandspläne unzuverlässig — gemessen vs. geplant
weicht regelmäßig ab); (b) Konstruktion (tragende Wände wo keine erwartet, Statik
unbekannt); (c) Schadstoffe (Asbest in Dichtungen/Platten bis 1993, PCB in Kondensatoren
und Farben, PAK in Teeranstrichen, Schwermetalle); (d) Baurecht (Bestandsschutz). Konsequenz
für Planung: Bestand braucht immer Puffer — Zeit (Unvorhergesehenes) und Kosten (Reserve
15–20% statt 5–10%).

Bestandsschutz nach BauGB: Gebäude die nach heutigem Recht nicht mehr genehmigungsfähig
wären (falsche GRZ, falscher Abstand, überholte Norm), dürfen im Bestand erhalten werden.
Erlischt bei: Nutzungsänderung, wesentlicher Änderung der Konstruktion, Abbruch > 50%
(je LBO unterschiedlich). Konsequenz für Umbau: Was zählt als wesentliche Änderung?
(Nutzungsänderung, Flächenvergrößerung, konstruktiver Eingriff mit Standsicherheitsrelevanz)

IMAGE-Placeholder: `<!-- IMAGE: kap25_neubau_vs_bestand | Flussdiagramm: links linearer
Planungsablauf Neubau (Konzept → LP1 → LP2 → ... → LP8 ohne Rückschleifen); rechts iterativer
Pfad Bestand (Bestandsaufnahme → Überraschung → Konzeptanpassung → erneute Prüfung →
weiter); Rückkopplungspfeile markiert; weißer Hintergrund -->`

**25.4 Denkmalpflege als Sonderfall**

Wann ist ein Gebäude ein Denkmal: Eintrag in Denkmalliste der Unteren Denkmalschutzbehörde
(UDB); je Bundesland eigenes Denkmalschutzgesetz (BayDSchG, DSchG NRW usw.); Unterschied
Einzeldenkmal (Schutz des Objekts) vs. Ensemble (Schutz des Ensemblewerts, auch wenn
Einzelobjekt nicht schützenswert). Erhaltungsgebot: keine Zerstörung, keine wesentliche
Beeinträchtigung des Erscheinungsbilds oder der historischen Substanz.

Was ist erlaubnispflichtig: praktisch jeder Eingriff der das Erscheinungsbild oder die
Substanz verändert — Fensterwechsel, Fassadenanstrich, Dachausbau, Heizkörper hinter
Stuck. Denkmalschutzbehörde als zusätzlicher Genehmigungsträger neben der
Baugenehmigungsbehörde → längere Abstimmungszyklen einplanen.

Energetische Anforderungen: GEG § 105 — Befreiung möglich wenn Anforderungen technisch
nicht erfüllbar oder wirtschaftlich nicht zumutbar (z. B. Außendämmung vor historischer
Klinkerfassade unzulässig → Innendämmung als Kompromiss, → Kap. 24.4). Förderung:
KfW-Denkmal-Sonderkonditionen (höherer Tilgungszuschuss als Standard), Steuerabschreibung
§ 7i EStG (bis 9% p.a. für 10 Jahre auf Herstellungskosten). Planungsbesonderheiten:
Bauhistorische Untersuchung + Schadenskartierung vor LP 2; Material- und
Technikmaterial müssen mit UDB abgestimmt sein; Reversibilität neuer Eingriffe oft
gefordert. BIM bei Denkmal: as-existing-Modell mit hoher Detailtreue (LOD 400 für
historische Bauteile); Farbgebung und Oberflächen als Properties dokumentiert.

IMAGE-Placeholder: `<!-- IMAGE: kap25_projektarten_uebersicht | Infografik: 8 Projektarten
als Kacheln-Grid (EFH, MFH, Gewerbe, Industrie, Sonderbau, Modulbau, Bestand, Denkmal);
je Kachel: Piktogramm + 3 Kurzmerkmale; Farbkodierung nach Komplexität; weißer
Hintergrund -->`

### Einzuführende Begriffe

`bestandsschutz`, `denkmalschutz`, `sonderbau`, `modulbau`, `ensemble-denkmal`

### Quellen

- Stahr — Bausanierung (Bestandsschutz, Projektarten)
- Meisel/Langer — Denkmal und Energie (GEG § 105, KfW-Denkmal, Innendämmung)
- Kochendörfer/Liebchen/Viering — Bau-Projekt-Management (Projektarten und -strukturen)

### Normen

GEG § 105 (Denkmalschutzausnahme), BayDSchG Art. 6 (Erlaubnispflicht), BauGB §§ 34/35
(Bestandsschutz im Innen-/Außenbereich), MBO Anlage 2 + 3 (Sonderbauten), § 58 MBO
(Abbruchgenehmigung)

### Querverweise

→ Kap. 1 (Schichtenmodell — Gebäudetypen und Schichten), → Kap. 14 (Planungsrecht —
Genehmigungsverfahren, Bebauungsplan), → Kap. 15 (HOAI — Prozessunterschiede je Projekttyp),
→ Kap. 24 (Sanierung — Bestandsmaßnahmen-Begriffe, Scan-to-BIM)

### BIM-Brücke

`IfcBuilding.OccupancyType` (Nutzungsart als Property), `IfcSite` (Grundstück, Lagebeschreibung);
Neubau: Modell aus Null; Bestand: as-built-Modell als Planungsgrundlage (→ Kap. 24 Scan-to-BIM);
Denkmal: hohe Detailtreue, Reversibilität als Modellanforderung; öffentlicher AG + Sonderbau:
BIM-Pflicht nach Stufenplan Digitales Planen und Bauen; → Kap. 18, Kap. 24

---

## SCHREIBREGELN (Kurzfassung — vollständig in docs/WRITING-GUIDE.md)

1. **Erster Satz nach `!!! ziel`-Box:** historischer oder konzeptueller Kontext — niemals
   direkt ins Fachvokabular einsteigen.

2. **Kastanienallee 7 immer in `!!! kastanienallee`-Box** — nie nur im Fließtext erwähnen.
   Format:
   ```
   !!! kastanienallee "Kastanienallee 7"
       [Inhalt]
   ```

3. **IMAGE-Placeholder:** exakt im Format
   `<!-- IMAGE: dateiname | Beschreibung | Orientierung, Hintergrundfarbe -->`
   nach dem Absatz einfügen, in dem das Bild erstmals beschrieben wird.

4. **Begriffe:** `::Begriff::` — nur für Terms, die laut Tracker in *diesem* Kapitel
   eingeführt werden. Alle anderen bereits eingeführten Terms ebenfalls als `::Begriff::`
   verlinken (Prüfe terms-registry!). Nie `**fett**` als Ersatz für einen fehlenden
   Glossareintrag — zuerst Eintrag in `web/src/data/glossar.ts` anlegen.

5. **Quellen:** Fußnotenformat `[^quelle-id]` — IDs aus `web/src/data/sources.ts`.
   Keine freien Textreferenzen.

6. **Normen:** Eigener H2-Abschnitt `## Normen und Grundlagen` am Kapitelende —
   kurze Beschreibung je Norm wozu sie im Kapitel herangezogen wird.

7. **Zusammenfassung:** Letzter H2-Abschnitt `## Zusammenfassung` — 2–4 Sätze,
   dann Querverweise als Linkliste.

8. **Keine Listen als Gliederungsersatz:** Aufzählungen nur wo inhaltlich nötig;
   Fließtext ist Standard.

9. **Zielwörter:** Signalfarbe < 1.500 Wörter; Normalbereich 2.500–3.500 Wörter.

10. **BIM-Brücke:** eigene `!!! bim`-Box (oder äquivalente Callout-Klasse laut WRITING-GUIDE)
    am Kapitelende, vor Normen und Zusammenfassung.

---

## ABSCHLUSS-CHECKLISTE (nach allen Schritten)

- [ ] Alle Kapitel-Dateien in `docs/chapters/` korrekt umbenannt
- [ ] `specs/tracker.md` vollständig mit neuen Nummern aktualisiert
- [ ] Kein alter `Kap. 16`–`Kap. 24` Verweis mehr in docs/ oder web/src/ (`grep` zur Prüfung)
- [ ] `docs/terms-registry.yaml` um alle neuen Begriffe erweitert
- [ ] `web/src/data/glossar.ts` um alle neuen Terms erweitert
- [ ] `web/src/data/sources.ts` Kapitelzuordnungen aktualisiert
- [ ] `docs/appendix/normen.md` um neue Normen erweitert
- [ ] K16 komplett: alle 5 Abschnitte, 3 Bilder, 3 K7-Boxen, BIM-Brücke, Normen, Zusammenfassung
- [ ] K24 erweitert: Abschnitt 24.0 eingefügt, bestehende Abschnitte unverändert
- [ ] K25 komplett: alle 4 Abschnitte, 3 Bilder, 1 K7-Box, BIM-Brücke, Normen, Zusammenfassung
- [ ] Zielwörter geprüft: K16 2.500–3.000 W, K24 neu 2.800–3.400 W, K25 2.000–2.500 W

---

## ► PROMPT ENDE ◄

---

*Erstellt: 2026-05-19 | Basiert auf specs/tracker.md (Stand: 2026-05-19)*
*Kapitel 27: Wird durch Auflösung von OE-08 möglich (Holzbau K05a → K06, alle Folgekapitel +1)*
