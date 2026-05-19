# Buch-Tracker: Vom Entwurf zum Modell

Last updated: 2026-05-19 (exhaustiver Prozessausbau geplant: Zielstruktur 41 Kapitel mit durchgehender Büro-, Genehmigungs-, Vergabe-, Baustellen- und Übergabe-Praxis)

Zweck: Master-Planungsdokument für das Buch. Kein Prosatext — nur Skizze: was muss rein, welche Bilder, welche Begriffe, welche Quellen. Writing Agents lesen diesen Tracker vor dem Schreiben eines Kapitels. **Maßgeblich ist ab 2026-05-19 die Zielstruktur mit 41 Kapiteln; der aktuelle Dateistand hat noch 26 Kapitel und wird in einem eigenen Umsetzungsschritt migriert.**

**Zielgruppe (maßgeblich für Ton, Tiefe und Beispielwahl):**
- **Primär:** Technisch versierte Einsteiger ohne Baugrundlage (Informatiker, Softwareentwickler, Ingenieure aus anderen Disziplinen) **und** Architekturstudenten im frühen Studium, denen die digitale Systematik fehlt. Beiden Gruppen fehlt jeweils eine Seite des Ganzen — das Buch schließt diese Lücke.
- **Sekundär:** Architekten und Fachplaner in der Praxis, die BIM-Methodik systematisch durchdringen wollen — und BIM-Software-Entwickler, die ihre Werkzeuge besser auf den Berufsalltag der Planer abstimmen möchten. Diese Gruppe liest mit, um festzustellen: der Autor kennt das Handwerk. Das schafft Vertrauen und Glaubwürdigkeit für die begleitende Software.

**Konsequenz für Kapiteltiefe:** Architektonische Grundlagen (Baustoffe, Konstruktion, TGA, Statik, Bauphysik) müssen vollständig und präzise erklärt werden — nicht als Zusammenfassung für Experten, sondern als solides Fundament für Einsteiger, das Architekten als fachlich korrekt erkennen. Der Projektprozess muss gleich tief werden: Problemraum, Bauherrengespräch, Skizzen, Genehmigung, Ausführungsplanung, Ausschreibung, Vergabe, Terminplanung, Lean, Baustelle, Fotodokumentation und Mängel sollen so konkret sein, dass Leser den Ablauf wie in einem langen Architekturbüro-Praktikum nachvollziehen können.

Leitbeispiel: **Kastanienallee 7** — viergeschossiges MFH, 12 Wohneinheiten, Stahlbeton-Skelett, Fernwärme + KWL, Flachdach mit PV, Vierspänner, GRZ 0,6, GFZ 2,4, Gebäudeklasse 4 nach MBO, **aufzugspflichtig nach Art. 37 BayBO** (4 Vollgeschosse; 1 Aufzug im Treppenhauskern, Kabine 1,10 × 1,40 m lichte Maße nach DIN 18040-2, maschinenraumlos).

---

## Status-Legende

- `Open` — noch nicht geschrieben
- `Entwurf` — erste Version vorhanden, noch kein Review
- `Review` — User-Feedback ausstehend
- `Done` — freigegeben

Priorität:
- `P0` — Teil I: ohne diese Kapitel funktioniert das Buch nicht als Einheit
- `P1` — Teile II–VIII: Kerninhalt
- `P2` — Teil IX + Anhang: Vertiefung/Ausblick

---

## Quellenverzeichnis

Die vollständige Quellenliste liegt als filterbare Referenzseite in der Web-App:

- Markdown-Seite: `docs/appendix/quellen.md`
- strukturierte Daten: `web/src/data/sources.ts`

Die Liste erfasst die Fachbibliothek aus Atlas-Reihe, Grundlagen/Entwurf, Baukonstruktion, Holzbau, Gebäudetechnik, Sanierung/Denkmalpflege, Recht/Verträge, Bauausführung, Zeichnen/Darstellung, Digital/BIM, Bauphysik, Tragwerkslehre sowie Normen/Gesetze. Jede Quelle trägt dort eine kurze Verwendungseinordnung und die Kapitel, in denen sie inhaltlich sinnvoll vorkommt.

Erweiterte lokale Referenzen liegen unter `~/Desktop/architecture books`, insbesondere `01_Grundlagen-und-Entwurf` (Ching; Neufert), `08_Zeichnen-und-Darstellung` (Ching Architectural Graphics; Basics Technisches Zeichnen), `06_Recht-und-Vertraege` (HOAI; Basics Ausschreibung; VOB im Bild), `07_Bauausfuehrung` (Baustelleneinrichtung; Standard Detailsammlung), `13_Projektmanagement` (Kochendörfer/Liebchen/Viering; Würfele/Bielefeld/Gralla), `05_Sanierung-und-Denkmalpflege` (Stahr; Denkmal und Energie), `09_Digital-und-BIM` und `12_Normen-und-Gesetze`.

**Schreibregel:** Kapitel behalten ihre knappen `Quellen`-Zeilen als Arbeitsnotiz. Für neue oder überarbeitete Kapitel soll die konkrete Auswahl aus `web/src/data/sources.ts` übernommen werden; die App-Seite `/appendix/quellen` bleibt das vollständige Verzeichnis.

---

## Strukturelle Lücken & Review-Notizen

Erkannte Schwachstellen nach Gliederungsanalyse (2026-05-18). Jede Lücke ist mit einer offenen Entscheidung (OE) verknüpft. Frühere Kapitelnummern beziehen sich teilweise auf den 26-Kapitel-Dateistand; die neuen OE-18 bis OE-34 beziehen sich auf die 41-Kapitel-Zielstruktur.

| Lücke | Schwere | Betrifft | OE |
|-------|---------|----------|----|
| Pläne lesen (Grundriss/Schnitt/Ansicht/Detail) fehlt komplett — für IT-Einsteiger kritisch | **hoch** | Kap. 2 | OE-06 |
| Holzbau fragmentiert über Kap. 3, 5, 8, 23 — kein kohärentes Bild | **hoch** | Kap. 5 | OE-08 |
| Bauablauf / Gewerkekoordination zu dünn — jetzt in K17 Bauoberleitung und K16 Vergabe kontextualisiert | **mittel** | Kap. 16, 17 | — |
| Kap. 19 (IFC) zu kurz für Zielgruppe — Kernkapitel für Entwickler | **hoch** | Kap. 19 | — |
| Kap. 4 (Tragwerk) ohne durchgerechnetes Zahlenbeispiel | **mittel** | Kap. 4 | — |
| Kap. 6 (Wärmeschutz) nutzt digitales Format nicht — interaktive Tabelle fehlt | **niedrig** | Kap. 6 | — |
| Kap. 26 in 2 Jahren schon veraltet — Scope zu ambitioniert | **mittel** | Kap. 26 | OE-07 |
| Kap. 20 (Klassifikation) riskiert zu abstrakt zu werden — DE-Fokus fehlt | **mittel** | Kap. 20 | — |
| Aufzug fehlt komplett — GK 4 nach Art. 37 BayBO macht ihn für K7 obligatorisch; nicht in K02-Box, K05, K12, K13 | **hoch** | Kap. 2, 5, 12, 13 | — |
| Georeferenzierung / CRS fehlt in K19 — für Entwickler kritisch: IfcGeometricRepresentationContext, IfcMapConversion, EPSG:25832 | **hoch** | Kap. 19 | — |
| MVD (Model View Definition) fehlt in K19 — erklärt nicht, warum IFC-Export zwischen Tools so stark variiert | **hoch** | Kap. 19 | — |
| BAP-Inhalt nicht erklärt — Begriff in K15 eingeführt, aber Kapitelgliederung und Erstellungsprozess fehlen | **mittel** | Kap. 15 | — |
| Innenausbau nicht systematisch — Trockenbau, Deckenraster, Unterdecken, Bodenbeläge (jenseits Estrich) fehlen | **mittel** | Kap. 5 | OE-09 |
| Stellplatznachweis / Außenanlagen fehlen — Versickerung, Pkw-Zufahrt, Stellplatzsatzung Bayern | **niedrig** | Kap. 2, 14 | OE-10 |
| Bauprojektmanagement war als eigenständiges Thema zu schwach — jetzt in K17 mit LP 8, Netzplan, kritischem Pfad, Nachtrag, Bautagebuch und Bauoberleitung geführt | **mittel** | Kap. 15, 17 | OE-11 |
| Projektarten-Systematik war zu spät sichtbar — K01 rahmt das MFH-Leitbeispiel, K24 definiert Bestandsmaßnahmen, K25 systematisiert Neubau/Bestand/Denkmal | **mittel** | Kap. 1, 24, 25 | OE-12 |
| Architekt als Problemlöser / Briefing / Bauherrengespräch stand zu spät — jetzt in K02 vor Planlesen, Raum, Bauphysik und BIM verankert | **hoch** | Kap. 2, 15 | OE-13 |
| Standortanalyse (Sonne, Wind, Lärm, Topografie, Blick, Zufahrt, Nachbarschaft) war kein eigener methodischer Block — jetzt K02.1 | **hoch** | Kap. 2 | OE-14 |
| Entwurfsdiagramme und Variantenkommunikation waren zu schwach — jetzt K02.2 mit Bubble-Diagramm, Erschließung, Sonne/Blick, Massenmodell, Kriterienmatrix | **hoch** | Kap. 2 | OE-15 |
| Bauantrag war zu abstrakt — K14 ergänzt konkrete Unterlagen, Nachweise, Genehmigungsreife vs. Ausführungsreife und BIM-to-Permit | **mittel** | Kap. 14 | OE-16 |
| Reale Vergabepraxis war zu dünn — K16 ergänzt Firmenfindung, private vs. öffentliche Vergabe, Preisspiegel, Bietergespräch, Zuschlag, GU vs. Einzelvergabe | **mittel** | Kap. 16 | OE-17 |
| Prozesskapitel sind trotz Ergänzung zu komprimiert — Problemraum, Skizzen, Bauantrag, LP 5, LV/Vergabe, Termin/Lean und Baukontrolle brauchen je eigene Kapitel | **sehr hoch** | Kap. 2, 14–17 | OE-18 |
| Kundengespräch, Briefing, Raumprogramm, Stakeholder, Budget, Zielkonflikte und Entscheidungslog fehlen als echte Arbeitsmethode | **sehr hoch** | neu K02 | OE-19 |
| Grobskizzen, Bubble-Diagramme, Sonnen-/Blick-/Lärm-Diagramme, Variantenkritik und Kundenkommunikation brauchen sichtbare Bildstrecke | **sehr hoch** | neu K03 | OE-20 |
| Übersetzung vom Vorentwurf in Detailmodell, Planpakete, Raumbuch, Tür-/Fensterlisten, Freigaben und RFI fehlt als eigener LP-5-Block | **sehr hoch** | neu K18 | OE-21 |
| Bauantrag braucht Vollständigkeitslogik, Bauvorlageberechtigung, Nachweise, digitale Portale, Nachforderungen und Behördenkommunikation statt Kurzüberblick | **sehr hoch** | neu K16 | OE-22 |
| Ausschreibung und Vergabe brauchen getrennte Kapitel: LV/Mengen/GAEB/STLB einerseits, Bieterfragen/Preisspiegel/Vergabevermerk/Vertrag andererseits | **sehr hoch** | neu K19, K20 | OE-23 |
| Terminplanung muss Gantt, Netzplan, kritischen Pfad, Taktplanung, Last Planner, Baustelleneinrichtung und Logistik zusammen erklären | **sehr hoch** | neu K21 | OE-24 |
| Baukontrolle muss konkrete Baustellenroutine zeigen: Begehung, Fotos, Bautagebuch, Mängelkarte, BCF-Ticket, Fristen, Abnahme, Gewährleistung | **sehr hoch** | neu K22 | OE-25 |
| Machbarkeitsprüfung vor dem Entwurf fehlt: Grundstück, Grundbuch, Baulasten, Leitungen, Vermessung, Boden, Altlasten, Kampfmittel, Nachbarn, Finanzierung | **sehr hoch** | neu K02, K04 | OE-26 |
| Fachplanerkoordination ist zu implizit: Planlauf, Prüfstatus, Kollisionsrunden, Durchbruchsplanung, Freigaben und Planrevisionen brauchen eigenes Kapitel | **sehr hoch** | neu K20 | OE-27 |
| Werk- und Montageplanung der Unternehmen fehlt: was plant der Architekt, was prüft er nur, was wird freigegeben, was bleibt Unternehmerverantwortung | **sehr hoch** | neu K22 | OE-28 |
| Änderungs- und Nachtragsmanagement ist zu spät und zu dünn: Bauherrenänderung, Planänderung, geänderte/zusätzliche Leistung, Bedenkenanmeldung, Claim-Log | **sehr hoch** | neu K26 | OE-29 |
| Baustellenvorbereitung fehlt als eigene Praxisphase: SiGeKo, Bauwasser/Baustrom, Verkehrssicherung, Nachbarschaft, Baustelleneinrichtung, Baustartbesprechung | **hoch** | neu K28 | OE-30 |
| Aufmaß, Rechnungsprüfung und laufende Kostenkontrolle fehlen als tägliche LP-8-Arbeit | **hoch** | neu K30 | OE-31 |
| Inbetriebnahme und Übergabe fehlen: TGA-Funktionsprüfungen, Einregulierung, Revisionsunterlagen, Betreiberhandbuch, Einweisung, Restmängel | **sehr hoch** | neu K31 | OE-32 |
| LP 9 / Gewährleistung / Objektbetreuung fehlt als praktischer Prozess: Mängel nach Bezug, Fristen, Verjährung, Wartung, as-built und FM-Übergabe | **hoch** | neu K32 | OE-33 |
| Bürorealität fehlt: Dateibenennung, Planlisten, CDE-Status, Protokolle, E-Mail-Disziplin, Entscheidungs- und Freigabelogik | **hoch** | alle Prozesskapitel | OE-34 |

---

## Gliederungsreview 2026-05-19 (überholt)

**Hinweis:** Dieser Review dokumentiert die erste, kleinere Korrektur der 26-Kapitel-Fassung. Er bleibt als Verlauf erhalten, ist aber durch den folgenden exhaustiven Prozessausbau überholt. Maßgeblich ist die 41-Kapitel-Zielstruktur im nächsten Abschnitt.

**Befund:** Die Kapitelnummern müssen nicht erneut global umgestellt werden. Die didaktische Reihenfolge ist aber nur dann stimmig, wenn architektonisches Problemlösen vor den technischen Schichten steht. K15 ist als HOAI-/Prozesskapitel zu spät für die erste Erklärung von Bauherrengespräch, Raumprogramm, Ort, Varianten und Entscheidung.

**Entscheidung:** Keine globale Umnummerierung jenseits K16/K17-Tausch. Stattdessen wird K02 erweitert und als frühes Entwurfs- und Problemklärungs-Kapitel geführt. K15 verweist auf K02 und behandelt nur noch HOAI, Rollen, Honorar, Leistungsphasen und BIM-Lieferlogik. K14 erhält konkrete Bauantrags- und BIM-to-Permit-Inhalte. K16 erhält reale Vergabepraxis und Angebotsprüfung. K17 folgt danach als Construction Administration / Bauoberleitung.

| Thema aus User-Prompt | Zielkapitel | Umsetzung |
|---|---|---|
| Architekt muss Probleme lösen, nicht nur Modelle bauen | K02 | neuer Abschnitt 2.0: Problemklärung, Bauherr, Budget, Nutzung, Kriterien |
| Kunde/Briefing/Raumprogramm | K02 | Raumprogramm, Anforderungen, Zielkonflikte, Kriterienmatrix |
| Sonne am Frühstückstisch, Abendsonne, Meerblick, Wind | K02 | Standortanalyse mit Sonne, Wind, Blick, Lärm, Topografie |
| Skizzen, Diagramme, Varianten 1–5, Entscheidung für Variante | K02 | Varianten, Bubble-/Erschließungs-/Sonnen-/Blickdiagramme, Massenmodell |
| Bauantrag konkret | K14 | Bauantrag als Paket aus Lageplan, Bauzeichnungen, Nachweisen, Formularen |
| BIM erzeugt Bauantrag? | K14 | BIM-to-Permit: was automatisierbar ist und was Auslegung bleibt |
| Handwerker finden / Kontakte vs. Ausschreibung | K16 | private vs. öffentliche Vergabe, Marktarbeit, Firmenanfrage |
| Angebotsprüfung / wer bekommt Auftrag | K16 | Preisspiegel, Bietergespräch, Zuschlagsentscheidung |
| Gantt, Bauzeitenplan, Baustellendokumentation, Fotos, Mängel | K17 | Bauoberleitung / Construction Administration |
| Renovierung/Bestand/Denkmal | K24/K25 | bereits umgesetzt, bleibt dort |

**Quellenhinweis:** Für diese Erweiterung relevante lokale Referenzen aus `~/Desktop/architecture books`: Ching `Architecture: Form, Space and Order`, Ching `Architectural Graphics`, Neufert `Bauentwurfslehre`, `Basics Technisches Zeichnen`, Brandt/Franssen `Basics Ausschreibung`, HOAI-Praxis/HOAI 2021, MBO/BauGB/GEG, Kochendörfer/Liebchen/Viering und Würfele/Bielefeld/Gralla.

---

## Exhaustiver Prozessausbau 2026-05-19 — maßgebliche Zielstruktur

**Befund:** Auch die 31-Kapitel-Zwischenstruktur war noch nicht vollständig. Sie trennte Problemraum, Skizzen, Bauantrag, Ausführungsplanung, LV/Vergabe, Termin und Baukontrolle, ließ aber mehrere reale Praxisphasen weiterhin implizit: Machbarkeit vor dem Entwurf, Grundstücks- und Due-Diligence-Prüfung, Fachplanerkoordination, Werkplanung der Unternehmen, Bemusterung/Freigaben, Nachtrags- und Änderungsmanagement, Baustellenvorbereitung, Aufmaß/Rechnungsprüfung, Inbetriebnahme, Übergabe und Gewährleistung.

**Entscheidung:** Das Buch wird auf **41 Kapitel** erweitert. Diese Struktur ist für die Umsetzung maßgeblich. Sie bleibt innerhalb des Buchfokus "Architektur & BIM", deckt aber den gesamten Architekturprozess so ab, dass Leser den praktischen Büro- und Baustellenablauf nachvollziehen können.

### Exhaustiveness-Standard

Ein Prozesskapitel gilt erst als ausreichend tief, wenn es fünf Ebenen abdeckt:

1. **Situation:** Was passiert real im Büro, im Termin, bei der Behörde, beim Bieter oder auf der Baustelle?
2. **Dokumente:** Welche Pläne, Listen, Protokolle, Nachweise, Verträge, Tickets oder Freigaben entstehen?
3. **Entscheidungen:** Wer entscheidet was, mit welcher Verantwortung und welcher Folge für Kosten, Termine, Qualität und Haftung?
4. **Typische Fehler:** Was geht in der Praxis regelmäßig schief, und wie erkennt/vermeidet man es?
5. **BIM-/Datenbrücke:** Welche Information kann modellbasiert geführt werden, was bleibt menschliche Prüfung, und wo liegen Schnittstellen zu CDE, IFC, BCF, GAEB, IDS oder FM?

### Zielstruktur 41 Kapitel

| # | Titel | Teil | Status | Prio | Wörter (Ziel) |
|---|-------|------|--------|------|----------------|
| 1 | Architektur als System | I – Fundament, Projektstart & Entwurf | `Entwurf` | P0 | 2,800–3,200 |
| 2 | Projektstart, Bauherr & Machbarkeit | I – Fundament, Projektstart & Entwurf | `Entwurf` | P0 | 4,500–6,000 |
| 3 | Problemraum: Briefing, Anforderungen, Raumprogramm | I – Fundament, Projektstart & Entwurf | `Entwurf` | P0 | 5,000–6,500 |
| 4 | Grundstück, Vorprüfung & Due Diligence | I – Fundament, Projektstart & Entwurf | `Entwurf` | P0 | 5,000–6,500 |
| 5 | Standortanalyse, Grobskizzen & Varianten | I – Fundament, Projektstart & Entwurf | `Entwurf` | P0 | 5,000–6,500 |
| 6 | Pläne, Raum, Funktion & Entwurfslogik | I – Fundament, Projektstart & Entwurf | `Migration aus alt K02` | P0 | 4,500–6,000 |
| 7 | Baustoffe | II – Baukörper | `Migration aus alt K03` | P1 | 3,000–3,500 |
| 8 | Tragwerk: Lasten, Kräfte, Systeme | II – Baukörper | `Migration aus alt K04` | P1 | 3,200–3,800 |
| 9 | Konstruktion: Gründung, Wand, Decke, Dach | II – Baukörper | `Migration aus alt K05` | P1 | 3,800–4,500 |
| 10 | Wärmeschutz & GEG | III – Bauphysik | `Migration aus alt K06` | P1 | 2,800–3,200 |
| 11 | Feuchteschutz | III – Bauphysik | `Migration aus alt K07` | P1 | 2,200–2,800 |
| 12 | Schallschutz | III – Bauphysik | `Migration aus alt K08` | P1 | 2,000–2,500 |
| 13 | Brandschutz | III – Bauphysik | `Migration aus alt K09` | P1 | 2,500–3,200 |
| 14 | Heizung & Wärmeversorgung | IV – TGA | `Migration aus alt K10` | P1 | 2,800–3,200 |
| 15 | Lüftung & Raumluftqualität | IV – TGA | `Migration aus alt K11` | P1 | 2,500–3,000 |
| 16 | Sanitär & Entwässerung | IV – TGA | `Migration aus alt K12` | P1 | 2,200–2,800 |
| 17 | Elektro & Gebäudeautomation | IV – TGA | `Migration aus alt K13` | P1 | 2,500–3,000 |
| 18 | Planungsrecht & Bauantrag im Detail | V – Genehmigung & Planungsreife | `Ausbau aus alt K14` | P1 | 5,500–7,000 |
| 19 | HOAI, Rollen & Projektorganisation | V – Genehmigung & Planungsreife | `Ausbau aus alt K15` | P1 | 4,500–6,000 |
| 20 | Fachplanerkoordination, Planlauf & BIM-Koordination | V – Genehmigung & Planungsreife | `Entwurf` | P1 | 5,000–6,500 |
| 21 | Ausführungsplanung & Bauunterlagen | V – Genehmigung & Planungsreife | `Entwurf` | P1 | 5,500–7,000 |
| 22 | Bemusterung, Werkplanung & Freigaben | V – Genehmigung & Planungsreife | `Entwurf` | P1 | 4,500–6,000 |
| 23 | Kostenplanung, Mengen & DIN 276 | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Ausbau aus alt K16` | P1 | 4,500–6,000 |
| 24 | Leistungsverzeichnis, STLB & GAEB | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Entwurf` | P1 | 5,000–6,500 |
| 25 | Ausschreibung, Bieterkommunikation & Vergabe | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Entwurf` | P1 | 5,000–6,500 |
| 26 | Bauverträge, Änderungen & Nachträge | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Entwurf` | P1 | 5,000–6,500 |
| 27 | Terminplanung, Lean & Baustellenlogistik | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Entwurf` | P1 | 5,500–7,000 |
| 28 | Baustellenvorbereitung, SiGeKo & Baustelleneinrichtung | VI – Ausschreibung, Vergabe & Bauvorbereitung | `Entwurf` | P1 | 4,500–6,000 |
| 29 | Bauoberleitung, Baukontrolle & Mängelmanagement | VII – Bauausführung, Übergabe & Betriebsvorbereitung | `Ausbau aus alt K17` | P1 | 6,000–7,500 |
| 30 | Aufmaß, Rechnungsprüfung & Kostenkontrolle | VII – Bauausführung, Übergabe & Betriebsvorbereitung | `Entwurf` | P1 | 4,500–6,000 |
| 31 | Inbetriebnahme, Abnahme & Übergabe | VII – Bauausführung, Übergabe & Betriebsvorbereitung | `Entwurf` | P1 | 5,000–6,500 |
| 32 | Gewährleistung, Objektbetreuung & As-built | VII – Bauausführung, Übergabe & Betriebsvorbereitung | `Entwurf` | P1 | 4,000–5,500 |
| 33 | Was BIM wirklich ist | VIII – BIM-Datenmethode | `Migration aus alt K18` | P1 | 2,200–2,800 |
| 34 | IFC: Die Sprache des digitalen Gebäudes | VIII – BIM-Datenmethode | `Migration aus alt K19` | P1 | 4,000–5,000 |
| 35 | Klassifikation | VIII – BIM-Datenmethode | `Migration aus alt K20` | P1 | 2,000–2,500 |
| 36 | Prozess & Kollaboration: CDE, ISO 19650 | VIII – BIM-Datenmethode | `Migration aus alt K21` | P1 | 2,500–3,200 |
| 37 | BIM in der Praxis | VIII – BIM-Datenmethode | `Migration aus alt K22` | P1 | 2,500–3,200 |
| 38 | Nachhaltigkeit & Kreislaufwirtschaft | IX – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K23` | P2 | 2,500–3,200 |
| 39 | Sanierung | IX – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K24` | P2 | 2,800–3,400 |
| 40 | Projektarten: Neubau, Bestand, Denkmal | IX – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K25` | P2 | 2,000–2,800 |
| 41 | Digitaler Zwilling & KI | IX – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K26` | P2 | 2,000–3,000 |

### Migrationsplan Alt → Neu

| Aktueller Stand | Zielstruktur | Maßnahme |
|---|---|---|
| alt K01 Architektur als System | neu K01 | bleibt |
| alt K02 Entwurf, Raum und Funktion | neu K02–K06 | aufspalten und stark erweitern: Projektstart/Machbarkeit; Briefing/Anforderungen; Grundstück/Due Diligence; Standort/Skizzen/Varianten; Planlesen/Raum/Funktion |
| alt K03–K13 Technik | neu K07–K17 | mechanisch +4 verschieben, Querverweise aktualisieren |
| alt K14 Planungsrecht | neu K18 | Bauantrag und Genehmigungsprozess stark ausbauen |
| alt K15 HOAI | neu K19–K22 | Rollen/HOAI, Fachplanerkoordination, Ausführungsplanung, Bemusterung/Werkplanung trennen |
| alt K16 Kosten & Ausschreibung | neu K23–K26 | Kosten/Mengen, LV, Ausschreibung/Vergabe, Vertrag/Nachtrag trennen |
| alt K17 Bauprojektmanagement & Bauoberleitung | neu K27–K32 | Termin/Lean/Logistik, Baustellenvorbereitung, Baukontrolle, Rechnungsprüfung, Inbetriebnahme, Gewährleistung trennen |
| alt K18–K22 BIM | neu K33–K37 | mechanisch +15 verschieben, Prozessverweise korrigieren |
| alt K23–K26 Ausblick | neu K38–K41 | mechanisch +15 verschieben, Digitaler Zwilling auf Übergabe/As-built/FM beziehen |

### Vollständigkeitsmatrix Prozesswissen

| Prozessfeld | Muss im Buch konkret vorkommen | Zielkapitel |
|---|---|---|
| Bauherrenstart | Erstkontakt, Projektanlass, Budget, Finanzierung, Entscheidungsfähigkeit, Vollmachten, Projektziele, Erfolgskriterien | K02 |
| Machbarkeit | grobe Baumasse, Kostenrahmen, Terminrahmen, Genehmigungsrisiko, Grundstücksrisiken, Varianten für "go/no-go" | K02 |
| Briefing | Raumprogramm, Nutzungsszenarien, Anforderungen, Wunsch vs. Pflicht, Zielkonflikte, Änderungslog | K03 |
| Grundstück/Due Diligence | Grundbuch, Baulasten, Dienstbarkeiten, Leitungsabfrage, Vermessung, Bodengutachten, Altlasten, Kampfmittel, Nachbarrechte | K04 |
| Standortanalyse | Sonne, Wind, Lärm, Blick, Topografie, Zufahrt, Feuerwehr, Nachbarschaft, Baumbestand, Mikroklima | K05 |
| Skizzen & Varianten | Bubble, Funktionsdiagramm, Massenmodell, Erschließung, Sonnen-/Blickdiagramm, Variantenkritik, Bauherrengespräch | K05 |
| Planlesen | Grundriss, Schnitt, Ansicht, Detail, Maßstab, Linienarten, Planstand, Raumstempel, Planrevision | K06 |
| Genehmigung | Bauvorlageberechtigung, Bauvorlagen, Nachweise, Fachstellen, TÖB, Nachforderungen, Auflagen, digitale Einreichung | K18 |
| Rollen | Bauherr, Architekt, Fachplaner, Projektsteuerer, SiGeKo, Unternehmer, Behörde, Nutzer, Betreiber, BIM-Rollen | K19 |
| Fachkoordination | Planlauf, Kollisionsrunde, Prüfvermerk, BCF, Durchbrüche, Schächte, Brandschutz-/TGA-/Tragwerksabstimmung | K20 |
| Ausführungsplanung | 1:50-Pläne, Details, Raumbuch, Tür-/Fensterlisten, Materialfestlegung, Schacht-/Durchbruchsplanung | K21 |
| Werkplanung/Freigaben | Unternehmerplanung, Freigabelauf, Bemusterung, Musterflächen, Produktdatenblätter, technische Gleichwertigkeit | K22 |
| Kosten/Mengen | DIN 276, Kostenstufen, Mengenherkunft, Modellmenge vs. Abrechnungsmenge, Kostenprognose | K23 |
| LV | Vorbemerkungen, Positionen, STLB, GAEB, VOB/C, Nebenleistungen, Schnittstellen, funktional vs. detailliert | K24 |
| Vergabe | Bieterliste, Eignung, Fristen, Bieterfragen, Nachsendung, Submission, Preisspiegel, Vergabevermerk | K25 |
| Vertrag/Nachtrag | VOB/B, Einheitspreis/Pauschale, Änderungswunsch, Bedenken, Behinderung, geänderte/zusätzliche Leistung, Claim-Log | K26 |
| Termin/Lean | Gantt, Netzplan, kritischer Pfad, Taktplanung, Last Planner, Wochenvorschau, Soll-Ist, Puffer | K27 |
| Baustellenvorbereitung | Baustelleneinrichtungsplan, Kran, Lager, Bauwasser/-strom, Verkehrssicherung, SiGeKo, Nachbarn, Startbesprechung | K28 |
| Baukontrolle | Begehung, Fotodokumentation, Bautagebuch, Baubesprechung, Mängelticket, BCF, Fristen, Nachkontrolle | K29 |
| Rechnungen | Aufmaß, Abschlagsrechnung, Prüffristen, Kostenfortschreibung, Nachtragsprüfung, Mittelabfluss | K30 |
| Inbetriebnahme | TGA-Funktionsprüfung, Einregulierung, Probebetrieb, Sachverständigenabnahmen, Dokumentation, Nutzereinweisung | K31 |
| Übergabe | Abnahmeprotokoll, Restmängel, Revisionsunterlagen, Bedienungsanleitungen, Schlüssel, Betreiberhandbuch | K31 |
| Gewährleistung | LP 9, Mängel nach Bezug, Fristen, Wartungsverträge, Verjährung, Gewährleistungsbegehung | K32 |
| As-built/FM | Revisionsmodell, LOD 500, COBie/FM-Daten, Anlagenkennzeichnung, Wartungsintervalle, Digitaler Zwilling | K32, K41 |

### Dokumenten- und Artefaktkatalog

Jeder dieser Artefakte soll mindestens einmal als Screenshot-ähnliches Bild, Tabelle, Beispielauszug oder K7-Box vorkommen:

`Projektsteckbrief`, `Erstgespraechsprotokoll`, `Raumprogramm`, `Anforderungskatalog`, `Entscheidungsmatrix`, `Grundbuch-/Baulasten-Check`, `Leitungsabfrage`, `Vermessungsplan`, `Bodengutachten-Auszug`, `Standortanalyse-Skizzenblatt`, `Variantenmatrix`, `Bauantragsmappe`, `Nachforderungsschreiben`, `Planliste`, `Planpruefliste`, `BCF-Kollisionsbericht`, `Durchbruchsliste`, `Raumbuch`, `Tuerliste`, `Fensterliste`, `Detailkatalog`, `Bemusterungsprotokoll`, `Produktdatenblatt-Pruefung`, `Freigabeliste`, `Kostenberechnung`, `LV-Auszug`, `GAEB-Export`, `Bieterfragenliste`, `Preisspiegel`, `Vergabevermerk`, `Bauvertrag-Deckblatt`, `Nachtragspruefblatt`, `Aenderungslog`, `Bauzeitenplan`, `Taktplan`, `Last-Planner-Board`, `Baustelleneinrichtungsplan`, `SiGe-Plan-Auszug`, `Bautagebuch`, `Baubesprechungsprotokoll`, `Fotodokumentation`, `Maengelliste`, `Aufmassblatt`, `Rechnungspruefvermerk`, `Inbetriebnahmeprotokoll`, `Abnahmeprotokoll`, `Revisionsunterlagenliste`, `Betreiberhandbuch`, `Gewaehrleistungslog`, `As-built-Modelluebergabe`

### Neue Prozess-Bildstrecke

| Bildname | Zielkapitel | Inhalt |
|---|---|---|
| `kap02_projektstart_machbarkeit` | K02 | Projektstart-Canvas: Anlass, Grundstück, Budget, Termin, Beteiligte, Risiken, Go/No-Go |
| `kap02_kosten_termin_qualitaet_dreieck` | K02 | Magisches Dreieck für K7 mit konkreten Zielkonflikten |
| `kap03_erstgespraech_briefing` | K03 | Besprechungstisch mit Raumprogramm, Wunschliste, Budget, Referenzbildern, Zielkonflikten |
| `kap03_anforderungsmatrix` | K03 | Wunsch → prüfbare Anforderung → Entwurfsparameter → Nachweis/Planstand |
| `kap03_stakeholder_zielkonflikte` | K03 | Stakeholder-Map mit Bauherr, Nutzer, Nachbarn, Behörde, Fachplanern, Bank, Betreiber |
| `kap04_due_diligence_check` | K04 | Grundstücksprüfung als Checkliste: Grundbuch, Baulast, Leitung, Vermessung, Boden, Altlast, Kampfmittel |
| `kap04_risikokarte_grundstueck` | K04 | Lageplan mit Baugrenze, Leitungstrasse, Baum, Zufahrt, Altlastenverdacht, Nachbarfenster |
| `kap05_standortanalyse_skizzenblatt` | K05 | Skizzenblatt mit Sonne, Wind, Lärm, Blick, Topografie, Zufahrt, Nachbarschaft |
| `kap05_bubble_erschliessung_sonne` | K05 | Bubble-, Erschließungs- und Sonnen-/Blickdiagramm nebeneinander |
| `kap05_variantenkritik_k7` | K05 | Varianten A/B/C mit Massenmodell, Matrix und Bauherrennotizen |
| `kap06_planarten_leselogik` | K06 | Grundriss, Schnitt, Ansicht, Detail mit Lesereihenfolge und Planstatus |
| `kap18_bauantrag_paket` | K18 | Bauantragsmappe/digitales Portal mit Plänen, Nachweisen, Formularen |
| `kap18_genehmigungsworkflow` | K18 | Vorprüfung → Einreichung → Vollständigkeit → Fachstellen/TÖB → Nachforderung → Genehmigung |
| `kap20_koordination_planlauf` | K20 | Planlauf-Diagramm: Fachplanerstände, Prüffristen, BCF-Issues, Freigaben |
| `kap20_durchbruch_kollision` | K20 | TGA-Durchbruch mit Tragwerk/Brandschutz-Prüfstatus |
| `kap21_planpaket_lp5` | K21 | Plan- und Dokumentensatz LP 5: 1:50, Details, Raumbuch, Türliste, Durchbruchsliste |
| `kap21_detailmodell_transformation` | K21 | Entwurfsmodell → Ausführungsmodell mit Schichten, Anschlüssen, Toleranzen |
| `kap22_bemusterung_freigabe` | K22 | Bemusterungsboard: Material, Farbe, Produktdatenblatt, Freigabestatus |
| `kap22_werkplanung_prueflauf` | K22 | Unternehmer-Werkplan → Architektenprüfung → Freigabe mit Vorbehalt |
| `kap23_kostenstufen_din276` | K23 | Kostenschätzung, Kostenberechnung, Kostenanschlag, Kostenfeststellung als Zeitachse |
| `kap24_lv_mengen_pipeline` | K24 | Modellobjekt → Menge → DIN 276 → STLB/LV → GAEB → Angebot |
| `kap25_preisspiegel_vergabevermerk` | K25 | Preisspiegel mit Ausreißern, Bieterfrage, Vergabevorschlag |
| `kap26_nachtrag_claim_log` | K26 | Änderungsanordnung → Nachtrag → Prüfung → Entscheidung → Kosten-/Terminfolge |
| `kap27_bauzeitenplan_taktplanung` | K27 | Gantt, Netzplan und Taktplan nebeneinander für K7 |
| `kap28_baustelleneinrichtung_logistik` | K28 | Kran, Zufahrt, Lagerflächen, Container, Materialfluss, Bauwasser/-strom, Nachbarschaft |
| `kap29_fotodokumentation_mangel_bcf` | K29 | Foto → Markierung → Mängelticket → BCF/Modellelement → Zuständigkeit → Frist |
| `kap30_aufmass_rechnungspruefung` | K30 | Aufmaßblatt, Rechnung, geprüfte Menge, Freigabe/Kürzung |
| `kap31_inbetriebnahme_uebergabe` | K31 | TGA-Funktionsprüfung, Revisionsunterlagen, Einweisung, Abnahmeprotokoll |
| `kap32_gewaehrleistung_asbuilt` | K32 | Gewährleistungslog + as-built-Modell + FM-Übergabedaten |

### Neue Begriffe für den exhaustiven Prozessausbau

Diese Begriffe müssen beim Schreiben in `docs/terms-registry.yaml` und `web/src/data/glossar.ts` ergänzt werden. Schreibweise als Slug vorläufig:

`machbarkeitsstudie`, `projektsteckbrief`, `kostenrahmen`, `terminrahmen`, `briefing`, `raumprogramm`, `anforderungskatalog`, `zielkonflikt`, `stakeholder`, `entscheidungslog`, `grundbuch`, `baulast`, `dienstbarkeit`, `leitungsabfrage`, `vermessungsplan`, `bodengutachten`, `altlast`, `kampfmittelsondierung`, `vorentwurf`, `variantenstudie`, `bubble-diagramm`, `funktionsdiagramm`, `standortanalyse`, `bauvorlage`, `bauvorlageberechtigung`, `bauvorlagenverordnung`, `toeb`, `nachforderung`, `auflage`, `planlauf`, `planliste`, `pruefvermerk`, `kollisionspruefung`, `durchbruchsliste`, `ausfuehrungsplanung`, `planpaket`, `raumbuch`, `tuerliste`, `fensterliste`, `detailkatalog`, `bemusterung`, `musterflaeche`, `werkplanung`, `montageplanung`, `freigabe`, `freigabe-mit-vorbehalt`, `produktdatenblatt`, `rfi`, `gaeb`, `stlb-bau`, `leistungsbeschreibung`, `nebenleistung`, `preisspiegel`, `vergabevermerk`, `bieterfrage`, `submission`, `bauvertrag`, `einheitspreisvertrag`, `pauschalvertrag`, `bedenkenanmeldung`, `nachtrag`, `aenderungsmanagement`, `claim-log`, `taktplanung`, `last-planner-system`, `baustelleneinrichtung`, `baulogistik`, `sigeko`, `verkehrssicherung`, `baustartbesprechung`, `maengelmanagement`, `abnahmeprotokoll`, `fotodokumentation`, `bcf-ticket`, `aufmass`, `abschlagsrechnung`, `rechnungspruefung`, `kostenprognose`, `inbetriebnahme`, `einregulierung`, `probebetrieb`, `revisionsunterlagen`, `betreiberhandbuch`, `gewaehrleistung`, `verjaehrungsfrist`, `as-built-dokumentation`, `fm-uebergabe`

### Bibliotheksgrundlage für die neuen Prozesskapitel

| Kapitel | Primäre lokale Referenzen |
|---|---|
| K02 Projektstart/Machbarkeit | Kochendörfer/Liebchen/Viering Projektvorbereitung, Projektziele, Risiko, Kostenrahmen; HOAI LP 1; Neufert für erste Kennwerte |
| K03 Briefing/Anforderungen | Kochendörfer/Liebchen/Viering Raum- und Funktionsprogramm; Ching `Form, Space and Order`; Neufert |
| K04 Grundstück/Due Diligence | BauGB/BauNVO/MBO; lokale Normen/Gesetze; Vermessungs-/Bodengutachten-Logik aus Projektmanagementquellen |
| K05 Skizzen/Varianten | Ching `Architectural Graphics`; Ching `Form, Space and Order`; `Basics Technisches Zeichnen`; Neufert |
| K06 Planlesen/Raum | `Basics Technisches Zeichnen`; Ching `Architectural Graphics`; Neufert |
| K18 Bauantrag | MBO/LBO/Bauvorlagenlogik; BauGB/BauNVO; HOAI 2021; GEG; Brandschutz-/Standsicherheitsnachweise |
| K19 Rollen/HOAI | HOAI 2021 Textausgabe; Siemon/Averhaus; HOAI Praxis; ISO 19650 |
| K20 Fachkoordination | ISO 19650; DIN SPEC 91391; Revit/Authoring-Referenzen; Würfele/Bielefeld/Gralla für Dokumentation |
| K21 Ausführungsplanung | HOAI Anlage 10; `Standard Detailsammlung`; Ching `Architectural Graphics`; Revit/Authoring-Referenzen |
| K22 Bemusterung/Werkplanung | VOB/B/C; Würfele/Bielefeld/Gralla; Standard Detailsammlung; Produktdaten-/Freigabelogik |
| K23 Kosten | DIN 276; Kochendörfer/Liebchen/Viering Kostenmanagement; Brandt/Franssen |
| K24 LV | Brandt/Franssen `Basics Ausschreibung`; VOB im Bild; STLB-Bau/GAEB; DIN 276 |
| K25 Vergabe | Brandt/Franssen; VOB/A; HOAI Praxis; Kochendörfer/Liebchen/Viering Vergabestrukturen |
| K26 Vertrag/Nachtrag | VOB/B; VOB im Bild; Kochendörfer/Liebchen/Viering Änderungs-/Nachtragsprüfung; Würfele/Bielefeld/Gralla |
| K27 Termin/Lean | Kochendörfer/Liebchen/Viering Terminmanagement; Hofstadler/Motzko Lean/Takt/Last Planner; Bau-Projekt-Management |
| K28 Baustellenvorbereitung | `Baustelleneinrichtung`; Hofstadler/Motzko Baulogistik; SiGeKo/Arbeitsschutz-Grundlagen |
| K29 Baukontrolle/Mängel | Würfele/Bielefeld/Gralla `Bauobjektüberwachung`; VOB/B; HOAI LP 8; ISO 19650/CDE/BCF |
| K30 Aufmaß/Rechnung | VOB/B/C; Würfele/Bielefeld/Gralla; Kochendörfer/Liebchen/Viering Kostenkontrolle |
| K31 Inbetriebnahme/Übergabe | Würfele/Bielefeld/Gralla; TGA-Quellen; VOB/B Abnahme; FM-Übergabelogik |
| K32 Gewährleistung/As-built | HOAI LP 9; VOB/B/BGB Gewährleistung; ISO 19650-3 Asset Information; COBie/FM-Quellen |

### Maßgebliche neue Kapitel-Specs K02–K06 und K18–K32

#### K02 — Projektstart, Bauherr & Machbarkeit

- **Ziel:** Leser verstehen, was passiert, bevor überhaupt entworfen wird: Auftrag klären, Projektziele festlegen, Machbarkeit prüfen, Risiken sichtbar machen.
- **Pflichtabschnitte:** Projektanlass; Bauherrentypen; Budget/Kostenrahmen; Terminrahmen; Finanzierung und Entscheidungsfähigkeit; Projektsteckbrief; erste Machbarkeitsstudie; Go/No-Go; typische Bürorealität im Erstkontakt.
- **K7-Box:** Bauherr hat Grundstück, Ziel 12 WE, Kostenrahmen 5,76 Mio. EUR, Fertigstellung in 24 Monaten ab Planungsstart, Risiko: hohe Ausnutzung, GK4/Aufzug, TGA-Koordination.
- **Bilder/Artefakte:** Projektsteckbrief K7, Machbarkeitscanvas, Kosten-Termin-Qualität-Dreieck.
- **Typische Fehler:** Budgetwunsch nicht dokumentiert; Bauherr nicht entscheidungsfähig; Grundstücksrisiken ignoriert; Terminversprechen ohne Genehmigungsrisiko.
- **BIM-Brücke:** frühes Anforderungsmodell, AIA-Light, CDE-Projektraum ab Tag 1.

#### K03 — Problemraum: Briefing, Anforderungen, Raumprogramm

- **Ziel:** Leser verstehen, wie Wünsche in prüfbare Anforderungen übersetzt werden.
- **Pflichtabschnitte:** Erstgespräch; Nutzerinterviews; Raumprogramm; Soll-/Muss-/Kann-Anforderungen; Qualitäten; Zielkonflikte; Entscheidungslog; Änderungsmanagement ab Vorplanung.
- **Praxisdetail:** "Viel Licht" wird Orientierung/Fensteranteil/Raumtiefe/Verschattung; "günstig" wird Kompaktheit/Spannweite/Wiederholung/Vergabestrategie; "flexibel" wird Raster/Schacht/Trennwand/Systemtrennung.
- **K7-Box:** Wohnungsmix, Wohnflächenquote, Erschließungsflächenquote, Schachtlogik, Aufzug, PV, Fernwärme, KWL, niedrige Betriebskosten.
- **Bilder/Artefakte:** Erstgesprächsprotokoll, Anforderungsmatrix, Stakeholder-/Zielkonfliktkarte.
- **BIM-Brücke:** Raumprogramm als strukturierte `IfcSpace`-Sollwerte; Anforderungen als prüfbare Properties; Entscheidungshistorie in CDE.

#### K04 — Grundstück, Vorprüfung & Due Diligence

- **Ziel:** Leser verstehen, welche Grundstücksinformationen vor einem belastbaren Entwurf geprüft werden müssen.
- **Pflichtabschnitte:** Grundbuch; Baulasten; Dienstbarkeiten; Bebauungsplan/§34/§35-Vorprüfung; Vermessung; Leitungsabfrage; Bodengutachten; Grundwasser; Altlasten; Kampfmittel; Baumbestand; Nachbarrechte; Bestandsschutz bei Bestandsprojekten.
- **Praxisdetail:** Ein schöner Entwurf kann an einer Leitungstrasse, Baulast, Altlast, fehlender Feuerwehrzufahrt oder falscher Vermessung scheitern.
- **K7-Box:** Due-Diligence-Check: Leitungen im Gehweg, Bodenklasse, keine Baulast, Baumbestand im Hof, Altlastenverdacht ausgeschlossen, Vermessung als Modellgrundlage.
- **Bilder/Artefakte:** Due-Diligence-Checkliste, Risikokarte Grundstück, Dokumentenquellenplan.
- **BIM-Brücke:** `IfcSite`, Georeferenzierung, Vermessungspunkt, Leitungs-/GIS-Layer, Risikoflächen als Modellkontext.

#### K05 — Standortanalyse, Grobskizzen & Varianten

- **Ziel:** Leser sehen, wie Architekten Probleme zeichnerisch untersuchen und mit Bauherren diskutieren.
- **Pflichtabschnitte:** Ortsbegehung; Sonne/Wind/Lärm/Blick/Topografie; Skizzenarten; Bubble-Diagramm; Funktionsdiagramm; Erschließungsdiagramm; Massenmodell; Varianten A/B/C; Variantenkritik; Entscheidung.
- **K7-Box:** Vierspänner, Laubengang und Hofhaus als Varianten; Entscheidung zugunsten Vierspänner plus übernommene Qualitäten aus verworfenen Varianten.
- **Bilder/Artefakte:** Standortanalyse-Skizzenblatt, Diagrammtypen, Variantenmatrix.
- **BIM-Brücke:** Konzeptmodell mit `IfcSite`, Nordrichtung, Nachbarvolumen, Sonnen-/Schattenanalyse.

#### K06 — Pläne, Raum, Funktion & Entwurfslogik

- **Ziel:** Leser können Architekturzeichnungen lesen und Planstände unterscheiden.
- **Pflichtabschnitte:** Grundriss, Schnitt, Ansicht, Detail; Maßstäbe; Linienarten; Raumorganisation; Formtransformation; Erschließung; Barrierefreiheit; Kompaktheit; Planstatus und Revision.
- **K7-Box:** K7-Grundriss lesen: Straße/Hof, Treppenhaus/Aufzug, Wohnungstypen, Schächte, Rettungswege, Möblierbarkeit.
- **Bilder/Artefakte:** Planarten-Leselogik, Planrevisionen, Grundriss mit Leseanleitung.
- **BIM-Brücke:** Planableitung aus Modell, Raumstempel, Plan-/Modellstand als Informationsreife.

#### K18 — Planungsrecht & Bauantrag im Detail

- **Ziel:** Leser verstehen den Bauantrag als Paket, Prüfverfahren und Behördenkommunikation.
- **Pflichtabschnitte:** BauGB/BauNVO/LBO; Bauvorlageberechtigung; Bauvorlagenverordnung; Bauantragsunterlagen; Nachweise; Fachstellen/TÖB; Nachbarn; Vollständigkeitsprüfung; Nachforderungen; Auflagen; digitaler Bauantrag; BIM-to-Permit.
- **K7-Box:** Lageplan, Bauzeichnungen, Baubeschreibung, GRZ/GFZ/Vollgeschoss, Stellplatz, Brandschutz GK4, Barrierefreiheit/Aufzug, Entwässerung, GEG, Schallschutz.
- **Bilder/Artefakte:** Bauantragsmappe, Genehmigungsworkflow, Nachforderungsschreiben.
- **BIM-Brücke:** harte Regelchecks vs. Auslegung; Modell + Regelquelle + Nachweislogik.

#### K19 — HOAI, Rollen & Projektorganisation

- **Ziel:** Leser verstehen Rollen, Verantwortlichkeiten, Leistungsphasen und Projektorganisation.
- **Pflichtabschnitte:** Bauherr, Architekt, Fachplaner, Projektsteuerer, SiGeKo, Unternehmer, Behörde, Nutzer, Betreiber; HOAI LP 1–9; Grundleistungen/besondere Leistungen; Organigramm; Kommunikationsmatrix; BAP/AIA.
- **K7-Box:** Projektorganigramm K7 und wer in welcher Phase welches Lieferobjekt schuldet.
- **Bilder/Artefakte:** Rollenmatrix, Informationslieferplan, Kommunikationsmatrix.
- **BIM-Brücke:** BIM-Rollen, CDE-Rechte, Informationsanforderungen, Modellverantwortung.

#### K20 — Fachplanerkoordination, Planlauf & BIM-Koordination

- **Ziel:** Leser verstehen, wie Architektur, Tragwerk, TGA, Brandschutz und BIM-Koordination praktisch zusammenarbeiten.
- **Pflichtabschnitte:** Planlauf; Planliste; Prüfstatus; Koordinationsrunden; BCF-Issues; Kollisionsprüfung; Durchbruchsplanung; Schachtkoordination; Brandschutzabschottung; Freigaben; Planrevisionen; Protokolldisziplin.
- **K7-Box:** Lüftungskanal kollidiert mit Unterzug; Lösung über Schachtverschiebung, Deckendurchbruch, Brandschutzprüfung, Planrevision.
- **Bilder/Artefakte:** Planlaufdiagramm, BCF-Issue, Durchbruchsliste, Kollisionsbericht.
- **BIM-Brücke:** CDE-Status, Koordinationsmodell, BCF, Clash-Regeln, IDS.

#### K21 — Ausführungsplanung & Bauunterlagen

- **Ziel:** Leser verstehen, wie aus Genehmigungsplanung baubare Unterlagen entstehen.
- **Pflichtabschnitte:** LP 5; 1:50-Pläne; Details; Raumbuch; Tür-/Fensterlisten; Materialfestlegung; Rohbauöffnungen; Schacht-/Durchbruchsplanung; Abdichtungsdetails; Brandschutzdetails; Planprüflisten.
- **K7-Box:** Fensteranschluss und Wohnungstür als vollständige Detailkette von Entwurfsabsicht bis Werkplananforderung.
- **Bilder/Artefakte:** LP-5-Planpaket, Detailmodell-Transformation, Türliste/Raumbuch-Auszug.
- **BIM-Brücke:** LOD/LOI, modellbasierte Listen, Planableitung, Freigabestatus.

#### K22 — Bemusterung, Werkplanung & Freigaben

- **Ziel:** Leser verstehen, welche Entscheidungen nach der Ausführungsplanung noch getroffen und geprüft werden.
- **Pflichtabschnitte:** Bemusterung; Musterflächen; Produktdatenblätter; technische Gleichwertigkeit; Werkplanung; Montageplanung; Unternehmerverantwortung; Freigabe mit/ohne Vorbehalt; RFI; Prüf- und Freigabelog.
- **K7-Box:** Fassadenputz, Wohnungseingangstür, KWL-Gerät und Geländer als Bemusterungs-/Werkplanfälle.
- **Bilder/Artefakte:** Bemusterungsprotokoll, Werkplan-Prüflauf, Freigabeliste.
- **BIM-Brücke:** Produktdaten als Properties, Freigabeworkflow in CDE, Revisionsverknüpfung zum Modell.

#### K23 — Kostenplanung, Mengen & DIN 276

- **Ziel:** Leser verstehen Kosten als laufende Steuerung über Projektphasen.
- **Pflichtabschnitte:** DIN 276; Kostenrahmen, -schätzung, -berechnung, -anschlag, -feststellung; Kostenkennwerte; Mengenherkunft; Kostenprognose; Risikobudget.
- **K7-Box:** Kostenentwicklung K7 vom Rahmen 5,76 Mio. EUR bis Kostenberechnung und Risikoreserve.
- **Bilder/Artefakte:** Kostenstufen-Zeitachse, DIN-276-Struktur, Kostenprognose.
- **BIM-Brücke:** Modellmengen, `IfcQuantitySet`, Klassifikation, 5D-Grundlage.

#### K24 — Leistungsverzeichnis, STLB & GAEB

- **Ziel:** Leser verstehen, wie Planung in bepreisbare Vertragsleistung übersetzt wird.
- **Pflichtabschnitte:** LV-Aufbau; Vorbemerkungen; Positionen; STLB-Bau; GAEB; VOB/C; Nebenleistungen; Schnittstellen; funktionale vs. detaillierte Leistungsbeschreibung; Modellmenge vs. Abrechnungsmenge.
- **K7-Box:** Außenwand als Modellobjekt wird zu Rohbau-, Dämm-, Putz-, Laibungs-, Gerüst- und Sockelposition.
- **Bilder/Artefakte:** LV-Auszug, Mengenpipeline, GAEB-Austausch.
- **BIM-Brücke:** 5D-Mapping, STLB/Klassifikation, GAEB-Versionierung.

#### K25 — Ausschreibung, Bieterkommunikation & Vergabe

- **Ziel:** Leser verstehen den Weg von Ausschreibungsunterlagen zu beauftragten Firmen.
- **Pflichtabschnitte:** Vergabeeinheiten; Bieterliste; Eignung; private/öffentliche Vergabe; Fristen; Bieterfragen; Nachsendungen; Submission; Angebotsprüfung; Preisspiegel; Aufklärungsgespräch; Vergabevorschlag; Vergabevermerk; Zuschlag.
- **K7-Box:** Rohbauvergabe mit drei Angeboten, auffälligem Einheitspreis, Bieterfrage und dokumentierter Zuschlagsentscheidung.
- **Bilder/Artefakte:** Bieterfragenliste, Preisspiegel, Vergabevermerk.
- **BIM-Brücke:** digitale Vergabeplattform, GAEB, CDE-Ausschreibungsstand.

#### K26 — Bauverträge, Änderungen & Nachträge

- **Ziel:** Leser verstehen, wie Vertragslogik, Änderungen und Nachträge Kosten und Termine verändern.
- **Pflichtabschnitte:** VOB/B-Grundlagen; Einheitspreis-/Pauschalvertrag; Vertragsunterlagenrangfolge; Bedenkenanmeldung; Behinderung; geänderte Leistung; zusätzliche Leistung; Bauherrenänderung; Nachtragsangebot; Nachtragsprüfung; Claim-Log.
- **K7-Box:** Altlastenfund oder geänderter Fassadenputz als Nachtrag mit Massennachweis, Preisprüfung, Terminfolge.
- **Bilder/Artefakte:** Nachtragsprüfblatt, Änderungslog, Vertragsunterlagenrangfolge.
- **BIM-Brücke:** Änderungsverfolgung aus Modellrevision, Kosten-/Terminfolge als Issue.

#### K27 — Terminplanung, Lean & Baustellenlogistik

- **Ziel:** Leser verstehen Bauzeit als Abhängigkeits- und Steuerungsmodell.
- **Pflichtabschnitte:** Terminrahmen; Gantt; Netzplan/CPM; kritischer Pfad; Soll-Ist; Taktplanung; Last Planner; Wochenvorschau; Bauzeitenrisiken; Materialfluss.
- **K7-Box:** 14 Monate Bauzeit, Rohbau 6 Monate, Dach, TGA, Estrich/Trocknung, Ausbau, kritischer Pfad.
- **Bilder/Artefakte:** Gantt/Netz/Takt-Vergleich, Last-Planner-Board.
- **BIM-Brücke:** 4D-BIM, `IfcTask`, `IfcRelSequence`, Baufortschrittsmodell.

#### K28 — Baustellenvorbereitung, SiGeKo & Baustelleneinrichtung

- **Ziel:** Leser verstehen, was vor dem ersten Bagger organisatorisch und logistisch vorbereitet wird.
- **Pflichtabschnitte:** Baustelleneinrichtungsplan; Kran; Lager; Zufahrt; Nachbarschaft; Baustrom/Bauwasser; Verkehrssicherung; Feuerwehr; SiGeKo; Arbeitsschutz; Baustartbesprechung; Beweissicherung Nachbargebäude.
- **K7-Box:** enge Innenstadtbaustelle mit Kranstandort, Lieferfenstern, Gehwegsicherung, Container, Materiallager und Nachbarinformation.
- **Bilder/Artefakte:** Baustelleneinrichtungsplan, SiGe-Plan-Auszug, Baustartcheckliste.
- **BIM-Brücke:** 4D/Logistikmodell, temporäre Objekte, Sicherheitszonen, Lieferplanung.

#### K29 — Bauoberleitung, Baukontrolle & Mängelmanagement

- **Ziel:** Leser verstehen die tägliche Baustellenarbeit des Architekten.
- **Pflichtabschnitte:** LP 8; Bauleiterrollen; Begehung; Fotodokumentation; Bautagebuch; Baubesprechung; Protokoll; Mängelanzeige; BCF-Ticket; Fristen; Nachkontrolle; Behinderung; Abnahmevorbereitung.
- **K7-Box:** Mangel Brandschutzdurchdringung: Foto, Planbezug, BCF, Frist, Nachkontrolle.
- **Bilder/Artefakte:** Fotodokumentation, Mängelticket, Bautagebuch, Baubesprechungsprotokoll.
- **BIM-Brücke:** modellverortete Fotos, BCF, CDE-Workflow.

#### K30 — Aufmaß, Rechnungsprüfung & Kostenkontrolle

- **Ziel:** Leser verstehen die finanzielle Baustellensteuerung im Alltag.
- **Pflichtabschnitte:** Aufmaß; Abschlagsrechnung; Prüffristen; Mengenprüfung; Preisprüfung; Kostenstand; Prognose Endkosten; Nachtragskosten; Mittelabfluss; Zahlungsfreigabe.
- **K7-Box:** Rohbau-Abschlagsrechnung: Betonmenge, Bewehrung, Aufmaß, geprüfte Kürzung, Kostenprognose.
- **Bilder/Artefakte:** Aufmaßblatt, Rechnungsprüfvermerk, Kostenprognose.
- **BIM-Brücke:** Modellmengen als Prüfhilfe, aber nicht alleiniger Zahlungsnachweis.

#### K31 — Inbetriebnahme, Abnahme & Übergabe

- **Ziel:** Leser verstehen, warum Fertigstellung mehr ist als "Bau ist optisch fertig".
- **Pflichtabschnitte:** TGA-Funktionsprüfung; Einregulierung; Probebetrieb; Sachverständigenabnahmen; Brandschutzdokumentation; Restleistungen; Abnahme; Vorbehalte; Schlüssel; Einweisung; Revisionsunterlagen; Betreiberhandbuch.
- **K7-Box:** KWL-Einregulierung, Fernwärmeübergabe, Aufzugsabnahme, Brandschutztüren, Wohnungsübergaben.
- **Bilder/Artefakte:** Inbetriebnahmeprotokoll, Abnahmeprotokoll, Revisionsunterlagenliste.
- **BIM-Brücke:** Anlagenkennzeichnung, Revisionsdaten, Asset Information Model.

#### K32 — Gewährleistung, Objektbetreuung & As-built

- **Ziel:** Leser verstehen, was nach Bezug passiert und wie aus Bauprojektinformationen Betriebsinformationen werden.
- **Pflichtabschnitte:** LP 9; Gewährleistungsfristen VOB/B vs. BGB; Mängel nach Bezug; Wartungsverträge; Gewährleistungsbegehung; Verjährungsmanagement; as-built-Modell; FM-Übergabe; Digitaler Zwilling als Ausblick.
- **K7-Box:** Feuchtefleck nach erstem Winter, KWL-Wartung, Aufzugsmangel, Gewährleistungslog und as-built-Korrektur.
- **Bilder/Artefakte:** Gewährleistungslog, as-built-Übergabe, FM-Datenblatt.
- **BIM-Brücke:** LOD 500, COBie, ISO 19650-3, FM-Assetdaten, K41 Digitaler Zwilling.

---

## Prozess-Tiefenausbau 2026-05-19 (überholt: 31-Kapitel-Zwischenschritt)

**Befund:** Die 26-Kapitel-Fassung deckt die Projektphasen grundsätzlich ab, aber nicht in der gewünschten Tiefe. K02 trägt inzwischen Problemklärung, Standortanalyse, Varianten, Planlesen und Raumlehre gleichzeitig; K14–K17 tragen Bauantrag, HOAI, LP 5, Kosten, LV, Vergabe, Terminplanung, Bauleitung und Mängel in vier Kapiteln. Das ist didaktisch zu stark verdichtet. Für das Ziel "wie ein ausführliches Praktikum bei einem Architekten" braucht der Prozess eine eigene, breitere Spange.

**Entscheidung:** Das Buch wird auf **31 Kapitel** erweitert. Der technische Kern bleibt erhalten, aber der Prozess wird in zwei eigene Teile aufgespalten:

- **Teil V — Entwurf, Genehmigung & Planungsreife:** Problemraum wird früh aufgebaut; Bauantrag und Ausführungsplanung bekommen je eigene Kapitel.
- **Teil VI — Ausschreibung, Vergabe & Baustelle:** LV/Mengen, Vergabe/Verträge, Termin/Lean/Logistik und Baukontrolle werden getrennt erklärt.
- **Teil VII — BIM-Datenmethode:** die bisherigen BIM-Kapitel wandern nach hinten, weil Leser vorher den realen Prozess kennen sollen, den BIM abbildet.
- **Teil VIII — Bestand, Nachhaltigkeit & Betrieb:** Nachhaltigkeit, Sanierung, Projektarten und Digitaler Zwilling bleiben als Transfer- und Ausblicksteil.

**Umsetzungsstatus:** Diese 31-Kapitel-Struktur ist nicht mehr maßgeblich. Sie bleibt nur als Verlauf der Gliederungsentwicklung erhalten. Maßgeblich ist die 41-Kapitel-Zielstruktur im Abschnitt "Exhaustiver Prozessausbau".

### Überholte Zielstruktur 31 Kapitel

| # | Titel | Teil | Status | Prio | Wörter (Ziel) |
|---|-------|------|--------|------|----------------|
| 1 | Architektur als System | I – Fundament | `Entwurf` | P0 | 2,800–3,200 |
| 2 | Problemraum: Bauherr, Briefing, Anforderungen | I – Fundament | `Neu/zu schreiben` | P0 | 4,500–6,000 |
| 3 | Standortanalyse, Grobskizzen & Varianten | I – Fundament | `Neu/zu schreiben` | P0 | 5,000–6,500 |
| 4 | Pläne, Raum, Funktion & Entwurfslogik | I – Fundament | `Migration aus alt K02` | P0 | 4,500–6,000 |
| 5 | Baustoffe | II – Baukörper | `Entwurf` | P1 | 3,000–3,500 |
| 6 | Tragwerk: Lasten, Kräfte, Systeme | II – Baukörper | `Entwurf` | P1 | 3,200–3,800 |
| 7 | Konstruktion: Gründung, Wand, Decke, Dach | II – Baukörper | `Entwurf` | P1 | 3,800–4,500 |
| 8 | Wärmeschutz & GEG | III – Bauphysik | `Entwurf` | P1 | 2,800–3,200 |
| 9 | Feuchteschutz | III – Bauphysik | `Entwurf` | P1 | 2,200–2,800 |
| 10 | Schallschutz | III – Bauphysik | `Entwurf` | P1 | 2,000–2,500 |
| 11 | Brandschutz | III – Bauphysik | `Entwurf` | P1 | 2,000–2,500 |
| 12 | Heizung & Wärmeversorgung | IV – TGA | `Entwurf` | P1 | 2,800–3,200 |
| 13 | Lüftung & Raumluftqualität | IV – TGA | `Entwurf` | P1 | 2,500–3,000 |
| 14 | Sanitär & Entwässerung | IV – TGA | `Entwurf` | P1 | 2,200–2,800 |
| 15 | Elektro & Gebäudeautomation | IV – TGA | `Entwurf` | P1 | 2,500–3,000 |
| 16 | Planungsrecht & Bauantrag im Detail | V – Entwurf, Genehmigung & Planungsreife | `Ausbau aus alt K14` | P1 | 5,000–6,500 |
| 17 | HOAI, Rollen & Projektorganisation | V – Entwurf, Genehmigung & Planungsreife | `Ausbau aus alt K15` | P1 | 4,000–5,000 |
| 18 | Ausführungsplanung & Bauunterlagen | V – Entwurf, Genehmigung & Planungsreife | `Neu/zu schreiben` | P1 | 5,000–6,500 |
| 19 | Kosten, Mengen & Leistungsverzeichnis | VI – Ausschreibung, Vergabe & Baustelle | `Ausbau aus alt K16` | P1 | 5,000–6,500 |
| 20 | Ausschreibung, Vergabe & Bauverträge | VI – Ausschreibung, Vergabe & Baustelle | `Neu/zu schreiben` | P1 | 5,000–6,500 |
| 21 | Terminplanung, Lean & Baustellenlogistik | VI – Ausschreibung, Vergabe & Baustelle | `Neu/zu schreiben` | P1 | 5,000–6,500 |
| 22 | Bauoberleitung, Baukontrolle & Mängelmanagement | VI – Ausschreibung, Vergabe & Baustelle | `Ausbau aus alt K17` | P1 | 6,000–7,500 |
| 23 | Was BIM wirklich ist | VII – BIM-Datenmethode | `Migration aus alt K18` | P1 | 2,200–2,800 |
| 24 | IFC: Die Sprache des digitalen Gebäudes | VII – BIM-Datenmethode | `Migration aus alt K19` | P1 | 4,000–5,000 |
| 25 | Klassifikation | VII – BIM-Datenmethode | `Migration aus alt K20` | P1 | 2,000–2,500 |
| 26 | Prozess & Kollaboration: CDE, ISO 19650 | VII – BIM-Datenmethode | `Migration aus alt K21` | P1 | 2,500–3,000 |
| 27 | BIM in der Praxis | VII – BIM-Datenmethode | `Migration aus alt K22` | P1 | 2,200–2,800 |
| 28 | Nachhaltigkeit & Kreislaufwirtschaft | VIII – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K23` | P2 | 2,500–3,000 |
| 29 | Sanierung | VIII – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K24` | P2 | 2,800–3,400 |
| 30 | Projektarten: Neubau, Bestand, Denkmal | VIII – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K25` | P2 | 2,000–2,500 |
| 31 | Digitaler Zwilling & KI | VIII – Bestand, Nachhaltigkeit & Betrieb | `Migration aus alt K26` | P2 | 1,800–2,500 |

### Migrationsplan Alt → Neu

| Aktueller Stand | Zielstruktur | Maßnahme |
|---|---|---|
| alt K01 Architektur als System | neu K01 | bleibt |
| alt K02 Entwurf, Raum und Funktion | neu K02, K03, K04 | in drei Kapitel aufspalten: Problemraum; Standort/Skizzen/Varianten; Planlesen/Raum/Funktion |
| alt K03–K13 Technik | neu K05–K15 | mechanisch +2 verschieben, Querverweise aktualisieren |
| alt K14 Planungsrecht | neu K16 | stark ausbauen: Bauantrag, Bauvorlagen, Nachweise, digitale Einreichung, Nachforderungen |
| alt K15 HOAI | neu K17 und neu K18 | Rollen/HOAI in K17, LP 5/Bauunterlagen als eigenes K18 |
| alt K16 Kosten & Ausschreibung | neu K19 und neu K20 | Kosten/LV/Mengen in K19, Ausschreibung/Vergabe/Vertrag in K20 |
| alt K17 Bauprojektmanagement & Bauoberleitung | neu K21 und neu K22 | Termin/Lean/Logistik in K21, Baukontrolle/Mängel/Abnahme in K22 |
| alt K18–K22 BIM | neu K23–K27 | mechanisch +5 verschieben, Prozessverweise korrigieren |
| alt K23–K26 Ausblick | neu K28–K31 | mechanisch +5 verschieben, Digitaler Zwilling auf 1,800–2,500 Wörter erweitern |

### Neue Prozess-Bildstrecke

Diese Bilder sind nicht dekorativ. Sie müssen reale Arbeitsmittel zeigen, die Architekten, Bauherren, Behörden, Bieter und Bauleiter im Prozess benutzen.

| Bildname | Zielkapitel | Inhalt |
|---|---|---|
| `kap02_erstgespraech_briefing` | K02 | Besprechungstisch als Dokumenten- und Anforderungslandschaft: Grundstück, Budget, Wunschliste, Raumprogramm, Zielkonflikte, Entscheidungsmatrix |
| `kap02_anforderungsmatrix` | K02 | Tabelle: Wunsch → prüfbare Anforderung → Entwurfsparameter → Nachweis/Planstand; Beispiel Licht, Budget, Barrierefreiheit, Lärm, Wohnfläche |
| `kap02_stakeholder_zielkonflikte` | K02 | Stakeholder-Map mit Bauherr, Nutzer, Nachbarn, Behörde, Fachplanern, Bank, Betreiber; Zielkonflikte als Pfeile |
| `kap03_standortanalyse_skizzenblatt` | K03 | Hand-/Tablet-Skizzenblatt mit Sonne, Wind, Lärm, Blick, Topografie, Zufahrt, Nachbarschaft, Baugrenze |
| `kap03_bubble_erschliessung_sonne` | K03 | Drei frühe Diagrammtypen nebeneinander: Bubble, Erschließung, Sonne/Blick |
| `kap03_variantenkritik_k7` | K03 | Varianten A/B/C für K7 mit Skizze, Massenmodell und Bewertungsmatrix |
| `kap04_planarten_leselogik` | K04 | Grundriss, Schnitt, Ansicht, Detail desselben Ausschnitts mit Lesereihenfolge |
| `kap16_bauantrag_paket` | K16 | Bauantragsmappe/digitales Portal: Lageplan, Bauzeichnungen, Baubeschreibung, Berechnungen, Nachweise, Formulare |
| `kap16_genehmigungsworkflow` | K16 | Workflow: Vorprüfung → Einreichung → Vollständigkeit → Fachstellen/TÖB → Nachforderung → Genehmigung/Auflagen |
| `kap18_planpaket_lp5` | K18 | Plan- und Dokumentensatz LP 5: Grundriss 1:50, Details 1:10, Raumbuch, Türliste, Schlitz-/Durchbruchsplanung, Freigabeliste |
| `kap18_detailmodell_transformation` | K18 | Übergang von Entwurfsmodell zu Ausführungsmodell: generische Wand → Schichten, Anschlüsse, Toleranzen, TGA-Kollisionen |
| `kap19_lv_mengen_pipeline` | K19 | Modellobjekt → Menge → DIN 276 → STLB-/LV-Position → GAEB; Unterschiede Modellmenge vs. Abrechnungsmenge |
| `kap20_preisspiegel_vergabevermerk` | K20 | Preisspiegel mit Ausreißern, Bieterfrage, Vergabevorschlag, Bauvertrag |
| `kap21_bauzeitenplan_taktplanung` | K21 | Gantt, Netzplan und Taktplan nebeneinander für K7; kritischer Pfad und Puffer sichtbar |
| `kap21_baustelleneinrichtung_logistik` | K21 | Baustelleneinrichtungsplan K7: Kran, Zufahrt, Lagerflächen, Container, Materialfluss, Feuerwehr, Nachbarschaft |
| `kap22_fotodokumentation_mangel_bcf` | K22 | Baustellenfoto mit Markierung → Mängelticket → BCF/Modellelement → Zuständigkeit → Frist |
| `kap22_abnahme_maengelmatrix` | K22 | Abnahmebegehung mit Protokoll, Mängelliste, Restleistungen, Vorbehalte, Gewährleistungsbeginn |

### Neue Begriffe für den Prozess-Tiefenausbau

Diese Begriffe müssen beim Schreiben in `docs/terms-registry.yaml` und `web/src/data/glossar.ts` ergänzt werden. Schreibweise als Slug vorläufig:

`briefing`, `raumprogramm`, `anforderungskatalog`, `zielkonflikt`, `stakeholder`, `entscheidungslog`, `vorentwurf`, `variantenstudie`, `bubble-diagramm`, `funktionsdiagramm`, `standortanalyse`, `bauvorlage`, `bauvorlageberechtigung`, `bauvorlagenverordnung`, `nachforderung`, `ausfuehrungsplanung`, `planpaket`, `raumbuch`, `tuerliste`, `fensterliste`, `freigabe`, `rfi`, `gaeb`, `stlb-bau`, `leistungsbeschreibung`, `preisspiegel`, `vergabevermerk`, `bieterfrage`, `submission`, `taktplanung`, `last-planner-system`, `baustelleneinrichtung`, `baulogistik`, `maengelmanagement`, `abnahmeprotokoll`, `fotodokumentation`, `bcf-ticket`, `as-built-dokumentation`

### Bibliotheksgrundlage für die neuen Prozesskapitel

| Kapitel | Primäre lokale Referenzen |
|---|---|
| K02 Problemraum | Ching `Architecture: Form, Space and Order`; Neufert `Bauentwurfslehre`; Kochendörfer/Liebchen/Viering, Raum- und Funktionsprogramm / Projektvorbereitung |
| K03 Skizzen & Varianten | Ching `Architectural Graphics`; Ching `Form, Space and Order`; `Basics Technisches Zeichnen`; Neufert |
| K04 Pläne & Entwurfslogik | `Basics Technisches Zeichnen`; Ching `Architectural Graphics`; Neufert |
| K16 Bauantrag | MBO / Landesbauordnungssystematik; BauGB/BauNVO; HOAI 2021; lokale Bauvorlagenlogik als Kapitelrecherche je Bundesland |
| K17 HOAI/Rollen | HOAI 2021 Textausgabe; Siemon/Averhaus; HOAI Praxis; ISO 19650 für Informationsrollen |
| K18 Ausführungsplanung | HOAI Anlage 10; `Standard Detailsammlung`; Ching `Architectural Graphics`; Revit/Authoring-Referenzen für Modellreife |
| K19 LV/Mengen | Brandt/Franssen `Basics Ausschreibung`; VOB im Bild; DIN 276; STLB-Bau/GAEB; K20 Klassifikation später als Vertiefung |
| K20 Vergabe/Verträge | Brandt/Franssen; VOB/A/B/C; HOAI Praxis; Kochendörfer/Liebchen/Viering Projektorganisation und Vergabestrukturen |
| K21 Termin/Lean/Logistik | Kochendörfer/Liebchen/Viering Terminmanagement; Hofstadler/Motzko `Agile Digitalisierung im Baubetrieb`; `Baustelleneinrichtung` |
| K22 Baukontrolle/Mängel | Würfele/Bielefeld/Gralla `Bauobjektüberwachung`; VOB/B; HOAI Anlage 10 LP 8; ISO 19650/CDE/BCF für digitale Dokumentation |

### Maßgebliche neue Kapitel-Specs für K02–K04 und K16–K22

#### K02 — Problemraum: Bauherr, Briefing, Anforderungen

- **Ziel:** Leser sollen verstehen, wie aus unscharfen Wünschen eine prüfbare Aufgabenstellung entsteht.
- **Pflichtabschnitte:** Erstgespräch; Bauherr/Nutzer/Betreiber als verschiedene Stimmen; Raumprogramm; Anforderungen vs. Wünsche; Budget und Kostenziel; Grundstück und rechtliche Vorgaben als Constraints; Zielkonflikte; Kriterienmatrix; Entscheidungslog.
- **Praxisdetail:** typische Fragen im Kundengespräch: Wer nutzt das Gebäude? Was darf es kosten? Welche Lebensdauer wird erwartet? Welche Räume sind unverhandelbar? Was ist wichtiger: Fläche, Qualität, Tempo, Energie, Flexibilität, Vermietbarkeit? Welche Bilder/Referenzen bringt der Bauherr mit, und wie übersetzt man sie fachlich?
- **K7-Box:** Bauherr will 12 Wohnungen, wirtschaftliche Wohnfläche, Fernwärme, PV, Aufzug, geringe Betriebskosten, keine komplizierte Sonderlösung. Daraus entstehen messbare Anforderungen: Wohnungsmix, Erschließungsflächenquote, Schachtlogik, GFZ-Ausnutzung, Baukostenrahmen.
- **Bilder:** `kap02_erstgespraech_briefing`, `kap02_anforderungsmatrix`, `kap02_stakeholder_zielkonflikte`.
- **BIM-Brücke:** Anforderungen als Informationsanforderungen: AIA/EIR, Raumprogramm als strukturierte Daten, `IfcSpace`-Sollwerte, Entscheidungshistorie in CDE.

#### K03 — Standortanalyse, Grobskizzen & Varianten

- **Ziel:** Leser sollen sehen, wie Architekten Probleme zeichnerisch untersuchen und mit Bauherren besprechbar machen.
- **Pflichtabschnitte:** Ortsbegehung; Sonne, Wind, Lärm, Topografie, Blick, Zufahrt, Nachbarschaft; Skizzenarten; Bubble-Diagramm; Funktionsdiagramm; Erschließungsdiagramm; Massenmodell; Varianten A/B/C; Variantenkritik; Entscheidung und Dokumentation.
- **Praxisdetail:** Jede Skizze beantwortet eine Frage. Bubble-Diagramm: Nähebeziehungen. Sonnen-/Blickdiagramm: Orientierung. Massenmodell: Volumen, Schatten, Baurecht. Erschließungsskizze: Wege, Adressen, Rettungslogik. Variantenbesprechung: nicht "schön/unschön", sondern Kriterien und Konsequenzen.
- **K7-Box:** drei Varianten: kompakter Vierspänner, Laubengang, Hofhaus. Zeige, warum Vierspänner gewinnt und welche Ideen aus den anderen Varianten übernommen werden.
- **Bilder:** `kap03_standortanalyse_skizzenblatt`, `kap03_bubble_erschliessung_sonne`, `kap03_variantenkritik_k7`.
- **BIM-Brücke:** Konzeptmodell als frühes Datenmodell: `IfcSite`, Nordrichtung, Nachbarvolumen, Raumgruppen, Simulations-Inputs.

#### K04 — Pläne, Raum, Funktion & Entwurfslogik

- **Ziel:** Leser sollen Architekturzeichnungen lesen und den Übergang von Skizze zu Grundriss/Schnitt/Ansicht/Detail verstehen.
- **Pflichtabschnitte:** Grundriss als horizontaler Schnitt; Schnitt als vertikales Denken; Ansicht; Detail; Maßstäbe; Linienarten; Raumorganisation; Formtransformation; Proportion; Erschließungstypen; Barrierefreiheit; Kompaktheit/A/V.
- **Praxisdetail:** Erst Orientierung lesen, dann Struktur, dann Nutzung, dann Maße/Details. Planstände unterscheiden: Skizze, Vorentwurf, Genehmigungsplan, Ausführungsplan.
- **K7-Box:** K7-Grundriss als lesbarer Plan: Straße/Hof, Treppenhaus/Aufzug, Wohnungstypen, Schächte, Rettungswege, Möblierbarkeit.
- **Bilder:** `kap04_planarten_leselogik`, vorhandene K02-Grundrissbilder migrieren und neu nummerieren.
- **BIM-Brücke:** Plan und Modell als zwei Darstellungsformen derselben Informationsreife; `IfcSpace`, Geschosse, Raumstempel, Schnitte aus Modell.

#### K16 — Planungsrecht & Bauantrag im Detail

- **Ziel:** Leser sollen einen Bauantrag als konkretes Unterlagenpaket, Prüfverfahren und Kommunikationsprozess verstehen.
- **Pflichtabschnitte:** Rechtsquellenhierarchie; B-Plan/BauGB §34/§35; LBO/MBO; Bauvorlageberechtigung; Bauvorlagenverordnung; Bauantragsunterlagen; Nachweise; Nachbarbeteiligung; Fachstellen/TÖB; Vollständigkeitsprüfung; Nachforderungen; Auflagen; digitaler Bauantrag; BIM-to-Permit.
- **Praxisdetail:** Unterschied Genehmigungsreife vs. Ausführungsreife. Bauantragsplan zeigt öffentlich-rechtliche Zulässigkeit; er ist noch kein Werkplan. Erkläre, wer was unterschreibt und welche Haftung/Verantwortung daraus folgt.
- **K7-Box:** Bauantrag K7: Lageplan, Bauzeichnungen, Baubeschreibung, GRZ/GFZ/Vollgeschoss, Stellplatz, Brandschutz GK4, Barrierefreiheit/Aufzug, Entwässerung, GEG-Nachweis, Schallschutz je nach Landesrecht.
- **Bilder:** `kap16_bauantrag_paket`, `kap16_genehmigungsworkflow`.
- **BIM-Brücke:** harte Regelchecks vs. Auslegung; Modell + Regelquelle + Nachweislogik; Grenzen bei §34, Befreiung, Ortsbild, Brandschutzabwägung.

#### K17 — HOAI, Rollen & Projektorganisation

- **Ziel:** Leser sollen verstehen, wer im Projekt was tut, welche Rolle der Architekt hat und wie Leistungsphasen als Informationsreife funktionieren.
- **Pflichtabschnitte:** Bauherr, Architekt, Fachplaner, Tragwerksplaner, TGA, Brandschutz, Vermesser, Bodengutachter, Projektsteuerer, SiGeKo, Unternehmen, Behörde; HOAI LP 1–9; Grundleistungen vs. besondere Leistungen; Projektorganisation; Kommunikationswege; BAP/AIA als BIM-Erweiterung.
- **Praxisdetail:** Kleine Projekte: Architekt koordiniert viel selbst. Größere Projekte: Generalplaner, Projektsteuerung, BIM-Management. Rollen nicht mit Personen verwechseln; eine Person kann mehrere Rollen tragen, die Verantwortlichkeiten bleiben getrennt.
- **K7-Box:** Projektorganisation K7 mit Architekt als Objektplaner, TGA-Planer, Tragwerksplaner, Brandschutzplaner, Vermesser, Bodengutachter, Bauherr, ausführende Gewerke.
- **Bilder:** Projektorganigramm, Informationslieferplan nach LP.
- **BIM-Brücke:** AIA/EIR, BAP, Informationslieferplan, CDE-Rechte, Modellverantwortung.

#### K18 — Ausführungsplanung & Bauunterlagen

- **Ziel:** Leser sollen verstehen, wie aus genehmigtem Entwurf ein baubares, prüfbares, ausschreibbares Plan- und Modellpaket wird.
- **Pflichtabschnitte:** LP 5; Planpaket 1:50; Details 1:20/1:10/1:5; Schnitte und Leitdetails; Raumbuch; Tür-/Fensterlisten; Material- und Bauteilfestlegungen; Schlitz- und Durchbruchsplanung; TGA-Koordination; Brandschutzdetails; Freigaben; Planlauf; RFI.
- **Praxisdetail:** Ausführungsplanung entscheidet Anschlüsse, Toleranzen, Reihenfolge und Schnittstellen. Sie ist nicht "mehr Details" im abstrakten Sinn, sondern die Übersetzung von Entwurf in Handwerk, Material, Maß und Zuständigkeit.
- **K7-Box:** K7-Fensteranschluss, Schachtkoordination und Wohnungstürliste als Beispiel: ein Entwurfsfenster wird zu Rohbauöffnung, Fensterprofil, Laibung, Abdichtung, Sonnenschutz, Brüstung, Absturzsicherung, U-Wert, Schallschutz.
- **Bilder:** `kap18_planpaket_lp5`, `kap18_detailmodell_transformation`.
- **BIM-Brücke:** LOD/LOI 300–400, Kollisionsprüfung, modellbasierte Listen, Planableitung, Freigabe-Workflow in CDE.

#### K19 — Kosten, Mengen & Leistungsverzeichnis

- **Ziel:** Leser sollen verstehen, wie Kosten, Mengen und LV-Positionen aus Planung entstehen, ohne Modellmengen mit Vertragsleistungen zu verwechseln.
- **Pflichtabschnitte:** DIN 276; Kostenschätzung/Kostenberechnung/Kostenanschlag/Kostenfeststellung; Mengen aus Plan und Modell; LV-Aufbau; Vorbemerkungen; STLB-Bau; GAEB; Nebenleistungen; Abrechnungsregeln; Einheitspreis vs. Pauschale; 5D-BIM.
- **Praxisdetail:** Eine Wand im Modell wird im LV zu mehreren Leistungen. Modellmenge ist nicht automatisch Abrechnungsmenge. Öffnungen, Laibungen, Verschnitt, Nebenleistungen und VOB/C-Regeln verändern die Kalkulation.
- **K7-Box:** Außenwand K7: Modellfläche → Rohbauwand, Dämmung, Putz, Laibungen, Gerüst, Sockel, Anschlussdetails; zeige, wo Mengen abweichen.
- **Bilder:** `kap19_lv_mengen_pipeline`, LV-Auszug mit Kommentaren.
- **BIM-Brücke:** `IfcQuantitySet`, DIN 276, STLB/GAEB, Klassifikation, 5D-Mapping.

#### K20 — Ausschreibung, Vergabe & Bauverträge

- **Ziel:** Leser sollen den realen Weg von Ausschreibungsunterlagen zu beauftragten Firmen verstehen.
- **Pflichtabschnitte:** Ausschreibungsstrategie; Vergabeeinheiten; Fachlos/Einzelvergabe/GU/TU; private vs. öffentliche Vergabe; Bieterliste; Eignung; Fristen; Bieterfragen; Submission; Angebotsprüfung; Preisspiegel; Aufklärungsgespräch; Vergabevorschlag; Vergabevermerk; Zuschlag; Bauvertrag; VOB/A/B/C.
- **Praxisdetail:** Architekten nutzen bei privaten Projekten oft bekannte Firmen, aber Vergleichbarkeit und Dokumentation bleiben wichtig. Öffentliche Vergabe verlangt Gleichbehandlung und strengere Nachvollziehbarkeit. Billigster Preis ist nicht automatisch wirtschaftlichster Zuschlag.
- **K7-Box:** Rohbauvergabe K7 mit drei Angeboten, auffälligem Einheitspreis, Bieterfrage, Preisspiegel und dokumentierter Zuschlagsentscheidung.
- **Bilder:** `kap20_preisspiegel_vergabevermerk`.
- **BIM-Brücke:** digitale Vergabeplattform, GAEB-Datenaustausch, LV-Versionierung, CDE-Ausschreibungsstand.

#### K21 — Terminplanung, Lean & Baustellenlogistik

- **Ziel:** Leser sollen verstehen, wie Bauzeit geplant, visualisiert, gesteuert und mit Baustellenlogistik verbunden wird.
- **Pflichtabschnitte:** Terminrahmen; Balkenplan/Gantt; Netzplan/CPM; FA/FE/SA/SE/GP; kritischer Pfad; Soll-Ist-Fortschreibung; Taktplanung; Last Planner System; Lean Construction; Baustelleneinrichtungsplan; Kran, Lager, Zufahrt, Materialfluss; Bauzeitenrisiken.
- **Praxisdetail:** Terminplanung ist nicht nur ein Kalender. Sie ist ein Abhängigkeitsmodell: Estrich braucht Trocknung, TGA braucht Durchbrüche, Fassade braucht Gerüst, Innenausbau braucht dichte Hülle. Lean ergänzt das durch zuverlässige Zusagen und kurze Steuerungszyklen.
- **K7-Box:** 14 Monate Bauzeit, Rohbau 6 Monate, Dach/Dichtheit, TGA-Rohinstallation, Estrich/Trocknung, Ausbau, Außenanlagen. Zeige kritischen Pfad und Puffer.
- **Bilder:** `kap21_bauzeitenplan_taktplanung`, `kap21_baustelleneinrichtung_logistik`.
- **BIM-Brücke:** 4D-BIM, `IfcTask`, `IfcRelSequence`, Modellfortschritt, Baustellensimulation.

#### K22 — Bauoberleitung, Baukontrolle & Mängelmanagement

- **Ziel:** Leser sollen die tägliche Baustellenarbeit des Architekten nachvollziehen: prüfen, dokumentieren, koordinieren, entscheiden, abnehmen.
- **Pflichtabschnitte:** LP 8; Bauleiter Architekt vs. verantwortlicher Bauleiter Unternehmen; Baustellenbegehung; Fotodokumentation; Bautagebuch; Baubesprechung; Protokoll; Planfreigaben; Mängelanzeige; Behinderungsanzeige; Nachtrag; Rechnungsprüfung; Abnahme; Gewährleistung LP 9; digitale Mängeltools.
- **Praxisdetail:** Der Architekt überwacht stichprobenartig, aber systematisch. Er fotografiert nicht wahllos, sondern beweis- und ortsbezogen: was, wo, wann, durch wen, welcher Planstand, welche Abweichung, welche Frist. Mängel brauchen Verantwortliche und Nachverfolgung.
- **K7-Box:** Woche 14 Kranstörung und Woche 32 Mangel an Wohnungstrennwand/Brandschutzdurchdringung: Foto, Markierung im Plan/Modell, BCF-Ticket, Frist, Nachkontrolle, Protokoll.
- **Bilder:** `kap22_fotodokumentation_mangel_bcf`, `kap22_abnahme_maengelmatrix`.
- **BIM-Brücke:** digitales Bautagebuch, BCF, modellverortete Fotos, CDE-Workflow, as-built-Dokumentation für K31.

---

## Kapitel-Übersicht (aktueller Dateistand — Migrationsreferenz)

Hinweis: Diese Tabelle beschreibt den heute vorhandenen 26-Kapitel-Dateistand. Sie bleibt nur als Migrationsreferenz erhalten, bis die Zielstruktur oben umgesetzt ist.

| # | Titel | Teil | Status | Prio | Wörter (Ziel) |
|---|-------|------|--------|------|----------------|
| 1 | Architektur als System | I | `Entwurf` | P0 | 2,800–3,200 |
| 2 | Entwurf, Raum und Funktion | I | `Entwurf` | P0 | 5,400–6,200 ↑↑ |
| 3 | Baustoffe | II | `Entwurf` | P1 | 3,000–3,500 |
| 4 | Tragwerk: Lasten, Kräfte, Systeme | II | `Entwurf` | P1 | 3,200–3,800 ↑ |
| 5 | Konstruktion: Gründung, Wand, Decke, Dach | II | `Entwurf` | P1 | 3,800–4,500 ↑ |
| 6 | Wärmeschutz & GEG | III | `Entwurf` | P1 | 2,800–3,200 |
| 7 | Feuchteschutz | III | `Entwurf` | P1 | 2,200–2,800 |
| 8 | Schallschutz | III | `Entwurf` | P1 | 2,000–2,500 |
| 9 | Brandschutz | III | `Entwurf` | P1 | 2,000–2,500 |
| 10 | Heizung & Wärmeversorgung | IV | `Entwurf` | P1 | 2,800–3,200 |
| 11 | Lüftung & Raumluftqualität | IV | `Entwurf` | P1 | 2,500–3,000 |
| 12 | Sanitär & Entwässerung | IV | `Entwurf` | P1 | 2,200–2,800 |
| 13 | Elektro & Gebäudeautomation | IV | `Entwurf` | P1 | 2,500–3,000 |
| 14 | Planungsrecht | V | `Entwurf` | P1 | 3,000–3,600 ↑ |
| 15 | HOAI: Phasen, Leistungen, Honorar | V | `Entwurf` | P1 | 2,700–3,200 |
| 16 | Kosten & Ausschreibung | V | `Entwurf` | P1 | 3,200–3,800 ↑ |
| 17 | Bauprojektmanagement & Bauoberleitung | V | `Entwurf` | P1 | 2,500–3,000 |
| 18 | Was BIM wirklich ist | VI | `Entwurf` | P1 | 2,200–2,800 |
| 19 | IFC: Die Sprache des digitalen Gebäudes | VI | `Entwurf` | P1 | 4,000–5,000 ↑↑ |
| 20 | Klassifikation | VI | `Entwurf` | P1 | 2,000–2,500 ↓ |
| 21 | Prozess & Kollaboration: CDE, ISO 19650 | VI | `Entwurf` | P1 | 2,500–3,000 |
| 22 | BIM in der Praxis | VI | `Entwurf` | P1 | 2,200–2,800 |
| 23 | Nachhaltigkeit & Kreislaufwirtschaft | VII | `Entwurf` | P2 | 2,500–3,000 |
| 24 | Sanierung | VII | `Entwurf` | P2 | 2,800–3,400 ↑ |
| 25 | Projektarten: Neubau, Bestand, Denkmal | VII | `Entwurf` | P2 | 2,000–2,500 |
| 26 | Digitaler Zwilling & KI | VII | `Entwurf` | P2 | 1,200–1,800 ↓↓ |

---

## Detaillierte Kapitel-Specs

---

### K01 — Architektur als System

- **Status:** `Entwurf`
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
  - 1.4 Wie dieses Buch aufgebaut ist — Buchstruktur als Schichtenmodell-Logik; alle 7 Teile + je ein Kapitel-Link pro Teil; erklärt kurz, warum K7 als MFH-Leitbeispiel gewählt wurde und warum Projektarten erst in K25 systematisiert werden; kein Anhang hier

- **Einzuführende Begriffe:** `schichtenmodell`, `tga` (beide hier — terms-registry bereits gesetzt)

- **Bilder (min. 2):**
  - `kap01_schichtenmodell` — isometrisch, landscape — Explosionsdarstellung K7, vier farbkodierte Schichten vertikal auseinander, Lebensdauer-Labels, weißer Hintergrund
  - `kap01_interdependenzen` — Diagramm, landscape — vier Rechtecke vertikal, Pfeile zwischen Schichten mit Beispiel-Labels (FBH-Estrich, Schachtlage), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 1.1: 7 Planungsbüros, BIM als gemeinsame Basis → Kap. 18, 19
  - nach 1.2: Konkrete Schichteninhalte K7 (Skelettrahmen 6×6 m, Dachabdichtung, Fernwärme-Station, Trockenbau)

- **BIM-Brücke:** Schichtenmodell = IFC-Modellstruktur; Tragstruktur → `IfcColumn`, `IfcSlab`; TGA → `IfcDistributionSystem`; Innenausbau → `IfcCovering`; Verbindung zu Kap. 18–19
  ⚠️ **Vorausverweise-Hinweis (didaktisch wichtig):** Die BIM-Brücken in K01–K17 verwenden IFC-Notation, bevor IFC in K18/19 eingeführt wird. K01 muss explizit sagen: „Diese Boxen sind Vorausgriffe — wer IFC noch nicht kennt, kann sie zunächst überfliegen und nach Kap. 19 zurückkehren." Diesen Satz in K01 setzen, damit sequenziell lesende Einsteiger nicht stolpern.

- **Quellen:** Ching (Systemdenken), Bildwörterbuch (hist. Bautechnik), FK1 (Schichtenaufbau)

- **Normen:** —

- **Querverweise:** → Kap. 4 (Tragwerk), Kap. 5 (Konstruktion), Kap. 10–13 (TGA), Kap. 18 (BIM), Kap. 19 (IFC), Kastanienallee-Appendix

---

### K02 — Entwurf, Raum und Funktion

- **Status:** `Entwurf`
- **Zielwörter:** 5,400–6,200 ↑↑ (erhöht wegen Problemklärung, Standortanalyse, Varianten + Pläne-lesen-Block)
- **Kernfragen:**
  - Wie wird aus Bauherrenwunsch, Ort, Budget und Recht eine architektonische Aufgabenstellung?
  - Wie analysiert man Grundstück, Sonne, Wind, Lärm, Topografie, Blick und Nachbarschaft?
  - Wie helfen Raumprogramm, Entwurfsdiagramme, Varianten und Kriterienmatrix bei Entscheidungen?
  - Wie liest man einen Architekturplan — was ist Grundriss, Schnitt, Ansicht, Detail?
  - Welche ersten Prinzipien räumlichen Entwerfens muss man kennen?
  - Wie werden Formen transformiert und Räume zueinander organisiert?
  - Wie entsteht ein Grundriss — welche Kräfte wirken auf ihn ein?
  - Was macht gute Raumplanung aus (Proportion, Orientierung, Erschließung)?
  - Was schreibt der Bebauungsplan vor, bevor der Stift ansetzt?
  - Was sind die Normmaße, die jeder kennen muss?
  - Was bedeutet Barrierefreiheit als Entwurfsprinzip?

- **Pflichtabschnitte (H2):**
  - 2.0 Architektur als Problemklärung ⚠️ NEU — **muss früh kommen, nicht erst K15**: Bauherrengespräch, Briefing, Raumprogramm, Budget, Nutzung, Stakeholder, Zielkonflikte; Wünsche in prüfbare Anforderungen übersetzen ("viel Licht" → Orientierung, Fensteranteil, Raumtiefe, Verschattung, sommerlicher Wärmeschutz); Kriterienmatrix als Gesprächswerkzeug
  - 2.1 Standortanalyse und Randbedingungen ⚠️ NEU — Sonne, Wind, Lärm, Topografie, Boden, Vegetation, Zufahrt, Nachbarschaft, Blick, Adresse; Beispiel "Haus am Meer": Frühstückssonne, Abendsonne, Windschutz, Blick und Überhitzung als konkurrierende Entwurfsparameter; digitale Seite: `IfcSite`, Nordrichtung, Höhenbezug, Nachbarvolumen, Sonnenstand
  - 2.2 Varianten, Diagramme und Entscheidung ⚠️ NEU — Bubble-Diagramm, Funktionsdiagramm, Erschließungsdiagramm, Sonnen-/Blickdiagramm, Massenmodell; mindestens drei echte Varianten; Kriterien: Wohnqualität, Kosten, Genehmigungsrisiko, Energie, TGA, Bauzeit; Entscheidung dokumentieren, nicht nur "gefällt besser"
  - 2.3 Architekturpläne lesen ⚠️ NEU — **für Einsteiger kritisch, für Architekten selbstverständlich**: was ist ein Grundriss (horizontaler Schnitt, ~1,00 m Schnitthöhe), was ist ein Schnitt (vertikaler Schnitt), was ist eine Ansicht (Außenansicht ohne Schnitt), was ist ein Detail (Maßstab 1:10/1:5); Maßstäbe und wann man welchen nutzt (1:100 Grundriss, 1:50 Schnitt, 1:20/1:10 Detail); was gestrichelt vs. durchgezogen bedeutet; Nordpfeil und Orientierung; Legende
  - 2.4 Raum, Form und Transformation ⚠️ NEU — Architektur als Gestaltung bewohnbarer Räume, nicht nur Objektform; Primärformen/Volumen; Translation, Rotation, Spiegelung, Array/Wiederholung, Skalierung/Dehnung; additive und subtraktive Transformationen; formale Transformation muss auf Nutzung, Kontext, Licht, Konstruktion und Maßstab reagieren
  - 2.5 Raumbeziehungen und Komposition ⚠️ NEU — Raum-in-Raum, angrenzende Räume, überlappende/interlockende Räume, verknüpfte Räume; Organisationsprinzipien: zentral, linear, radial, Cluster, Raster; Ordnungsprinzipien: Achse, Symmetrie, Hierarchie, Rhythmus, Wiederholung; räumliche Kräfte: Mensch, Licht/Sonne, Blick, Wind/Lüftung, Bewegung/Zirkulation, Funktion und Hülle
  - 2.6 Was der Bebauungsplan vorgibt — GRZ, GFZ (Formeln + Beispielrechnung), MBO Gebäudeklassen; Abstandsflächen kurz; B-Plan lesen als Kompetenz
  - 2.7 Raumplanung: Proportion und Maßstab — Neufert-Grundprinzipien: der Mensch als Maß; Mindest-Deckenhöhen (2,50 m WR, 2,75 m Büro); Türbreiten (0,875 m lichte Breite Standard, 0,90 m barrierefrei); Zimmerproportionen; Möblierbarkeit als Prüfkriterium
  - 2.8 Erschließungstypen — Zweispänner, Dreispänner, Vierspänner, Laubengang; Tabelle mit: Orientierung, Erschließungsflächenanteil, wirtschaftliche Eignung; DIN 18065 Treppenmaße kurz
  - 2.9 Barrierefreiheit als Entwurfsprinzip — DIN 18040-2 (Wohngebäude): Wendefläche ≥ 1,50 × 1,50 m, schwellenlose Zugänge, Aufzugmaße (min. 1,10 × 1,40 m Kabine), Türlichtes Maß 0,90 m; Barrierefreiheit als Qualitätsmerkmal, nicht Zusatz
  - 2.10 Kompaktheit und A/V-Verhältnis — Formel, Beispielrechnung K7, Vergleich EFH, Bedeutung für Energieeffizienz → Vorausgriff Kap. 6

- **Einzuführende Begriffe:** `grz`, `gfz`, `mbo` (bereits in terms-registry gesetzt)

- **Bilder (min. 6):**
  - `kap02_problemklaerung` — Flussdiagramm, landscape ⚠️ NEU — Bauherrengespräch → Raumprogramm → Standortanalyse → Kriterien → Varianten → Entscheidung; Rückkopplungspfeile, weißer Hintergrund
  - `kap02_standortanalyse` — Standortdiagramm, landscape ⚠️ NEU — Grundstück mit Sonnenlauf, Windrose, Lärmseite, Blickachse, Zufahrt, Nachbarbebauung, Topografie; weiße technische Darstellung
  - `kap02_variantenmatrix` — Matrix/Diagramm, landscape ⚠️ NEU — drei K7-Varianten (Vierspänner, Laubengang, Hofhaus) gegen Kriterien Wohnqualität, Kosten, Energie, Genehmigungsrisiko, TGA; weißer Hintergrund
  - `kap02_planarten` — Erklärungsdiagramm, landscape ⚠️ NEU — vier Darstellungen desselben K7-Ausschnitts: Grundriss, Schnitt, Ansicht, Detail; je mit Maßstab und Schnittlage-Annotation; weißer Hintergrund
  - `kap02_formtransformationen` — Diagramm, landscape ⚠️ NEU — Grundkörper/Quader mit Transformationen: verschieben, drehen, spiegeln, skalieren, addieren, subtrahieren; je als kleiner räumlicher Schritt mit Pfeil, weißer Hintergrund
  - `kap02_raumorganisation` — Diagramm, landscape ⚠️ NEU — sechs räumliche Organisationsprinzipien: zentral, linear, radial, Cluster, Raster, Raum-in-Raum; klare kleine Grundriss-/Volumen-Schemata, weißer Hintergrund
  - `kap02_grundriss_eg` — Grundriss (bereits vorhanden als .png) — EG K7, Vierspänner, Maßketten, Wohnungsbezeichnungen
  - `kap02_erschliessungstypen` — Vergleichsdiagramm, landscape — Zwei-/Drei-/Vierspänner nebeneinander, schematisch, Erschließungsfläche farblich, weißer Hintergrund
  - `kap02_av_verhaeltnis` — Vergleich, landscape — kompakter vs. verzweigter Baukörper mit A/V-Kennwerten (bereits spezifiziert in alter Version), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 2.1: K7-Randbedingungen — kompaktes innerstädtisches Grundstück, Straße Süd, Hof Nord, GRZ/GFZ ausgeschöpft, GK4/Aufzugspflicht
  - nach 2.2: Drei frühe Entwurfsalternativen K7 (kompakter Vierspänner, Laubengang, Hofhaus) mit Kriterienmatrix: Wohnqualität, Genehmigungsrisiko, Kosten, Energie, TGA-Koordination
  - nach 2.5: K7 als Kombination aus Raster, zentralem Kern, linearem Zugang und Hof-/Straßenbezug; 6×6-m-Tragraster und Vierspänner als räumliche Komposition
  - nach 2.6: GRZ 0,60 / GFZ 2,4 / GK 4 nach MBO — Rechenweg vollständig
  - nach 2.8: Vierspänner, Windfang Südseite, drei Wohnungstypen je Geschoss
  - nach 2.9: Aufzugspflicht K7 — GK 4, 4 Vollgeschosse → Art. 37 BayBO: Aufzug zwingend; 1 Aufzug im Treppenhauskern; Kabine 1,10 × 1,40 m lichte Maße (DIN 18040-2 barrierefrei); Schacht ca. 1,80 × 2,20 m Außenmaß Stahlbeton; Grubenmaß 1,10 m → Kellergeschoss notwendig; maschinenraumlos (MRL) nach DIN EN 81-20
  - nach 2.10: A/V ≈ 0,38 m⁻¹, Berechnung, Vergleich mit EFH > 0,8 m⁻¹

- **BIM-Brücke:** `IfcSpace` (Raumfläche nach DIN 277); Raumprogramm als Datenanforderung; GFZ-Prüfung automatisierbar aus `IfcBuilding` + `IfcSite`; → Kap. 19, 20

- **Quellen:** Neufert (Normmaße, Erschließung, Barrierefreiheit, Raumprogramme), Ching Form/Space/Order (Raum, Komposition, Site Context, Licht/Blick), Ching Architectural Graphics (Diagramm, Planlesbarkeit, Darstellung), Basics Technisches Zeichnen (Planarten und Konventionen), FK1 (Grundrissorganisation)

- **Normen:** DIN 18065 (Treppen), DIN 18040-2 (Barrierefreiheit Wohngebäude), BauNVO §19 (GRZ-Anrechnung)

- **Querverweise:** → Kap. 6 (A/V und Wärmeschutz), Kap. 9 (Gebäudeklassen und Brandschutz), Kap. 14 (Planungsrecht), Kastanienallee-Appendix

---

### K03 — Baustoffe: Eigenschaften, Verhalten, Einsatz

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcMaterial`, `IfcMaterialLayer`, `IfcMaterialLayerSet`; Kennwerte als Properties; OmniClass Table 41 (Materials); → Kap. 19, 20

- **Quellen:** AtlasBaustoff, FK1 (Kap. 5–7), Baubuch (Mauerwerk), Villmann (Dämmwerte)

- **Normen:** DIN EN 1992 (Beton-Eurocode), EN 338 (Holz-Festigkeitsklassen), DIN EN ISO 6946 (Wärmedurchgang)

- **Querverweise:** → Kap. 4 (Lasten), Kap. 5 (Konstruktionsaufbauten), Kap. 6 (U-Werte), Kap. 23 (Nachhaltigkeit/Embodied Carbon)

---

### K04 — Tragwerk: Lasten, Kräfte, Systeme

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcColumn`, `IfcBeam`, `IfcSlab`, `IfcFooting`; Property `loadBearing = true/false`; Strukturmodell separat vom Architekturmodell; → Kap. 19

- **Quellen:** FK1 (Kap. 2, 3, 4), Bildwörterbuch (Tragsysteme historisch), EnergieAtlas (Skelettbau)

- **Normen:** Eurocode 2 (Beton, DIN EN 1992), Eurocode 5 (Holz), Eurocode 1 (Lastannahmen)

- **Querverweise:** → Kap. 3 (Baustoffe), Kap. 5 (Konstruktion Gründung), Kap. 9 (Brandschutz tragende Bauteile)

---

### K05 — Konstruktion: Gründung, Wand, Decke, Dach

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcWall`, `IfcSlab`, `IfcRoof`; `IfcMaterialLayerSet` für Schichtaufbau; LOD 200 (Schichten) vs. LOD 400 (Details/Anschlüsse); → Kap. 19

- **Quellen:** FK1 (Kap. 5, 6), FK2 (Details), FassadenAtlas, FlachdachAtlas, Baubuch; Holzbau: `03_Holzbau/Atlas Mehrgeschossiger Holzbau – Kaufmann (Detail).pdf`, `03_Holzbau/R04_Holz-als-konstruktiver-Baustoff.pdf`

- **Normen:** DIN 18195 (Abdichtung), DIN 4108-3 (Feuchteschutz Schichtfolge), DIN 18202 (Maßtoleranzen), DIN EN 1995 Eurocode 5 (Holzbau), DIN 4102-4 (Brandschutz Holz)

- **Querverweise:** → Kap. 3 (Baustoffe), Kap. 6 (U-Wert der Aufbauten), Kap. 7 (Feuchteschutz Detail), Kap. 8 (Schallschutz Holzbau → verweist hierher zurück)

---

### K06 — Wärmeschutz & GEG

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `Pset_WallCommon.ThermalTransmittance`; gbXML-Export für Energiesimulation; GEG-Nachweis-Software (z.B. PHPP, IDA ICE) liest BIM-Geometrie; → Kap. 19, 21

- **Quellen:** Villmann (Kap. 2, 3), Zürcher & Frank (Kap. 1, 2), EnergieAtlas

- **Normen:** GEG 2024, DIN EN ISO 6946 (U-Wert), DIN 4108-2 (Mindestwärmeschutz)

- **Querverweise:** → Kap. 2 (A/V-Verhältnis), Kap. 5 (Wandaufbauten), Kap. 7 (Feuchteschutz), Kap. 10 (Heizung und Niedrigtemperatur)

---

### K07 — Feuchteschutz

- **Status:** `Entwurf`
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

- **BIM-Brücke:** Dampfbremsenlage in `IfcMaterialLayerSet` → `IsVapourBarrier`; Feuchtesimulation braucht Geometrie + Materialkennwerte aus IFC; → Kap. 19

- **Quellen:** Villmann, Zürcher & Frank, FK1 (Kap. 6.2), Baubuch

- **Normen:** DIN 4108-3 (Tauwasserschutz), DIN 4108-2 (Mindestwärmeschutz / Schimmel), DIN 18195 (Abdichtung)

- **Querverweise:** → Kap. 5 (Konstruktionsaufbauten), Kap. 6 (U-Wert, Wärmebrücken)

---

### K08 — Schallschutz

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `Pset_WallCommon.AcousticRating`; `IfcSpace`-Properties für Raumakustik-Anforderungen; → Kap. 19

- **Quellen:** Villmann (Kap. 5), FK1, Haustechnik (Installationsschächte)

- **Normen:** DIN 4109-1 (Anforderungen), DIN 4109-2 (Nachweise), VDI 4100 (erhöhter Schallschutz)

- **Querverweise:** → Kap. 5 (Deckenaufbau), Kap. 12 (Sanitär und Körperschall)

---

### K09 — Brandschutz

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `Pset_WallCommon.FireRating`; Brandabschnittsmodell; Rettungswegprüfung als BIM-Use-Case (Navisworks/Solibri); → Kap. 22

- **Quellen:** FK1 (Kap. 1.5), MBO als Primärquelle

- **Normen:** MBO §26–§35 (Brandschutz), DIN 4102 (Baustoffklassen), EN 13501 (Euroklassen)

- **Querverweise:** → Kap. 2 (Gebäudeklasse und Grundriss), Kap. 4 (tragende Bauteile), Kap. 14 (Planungsrecht)

---

### K10 — Heizung & Wärmeversorgung

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcBoiler`, `IfcPipeSegment`, `IfcFlowController`; MEP-Modell; Kollisionsprüfung Heizung vs. Deckenunterkante; `Pset_SpaceHeatingRequirements`; → Kap. 19, 21

- **Quellen:** Haustechnik (Laasch, Kap. 3–6), NachhaltigeGT

- **Normen:** GEG 2024, DIN EN 12831 (Heizlast), DIN EN 1264 (FBH + hydraulischer Abgleich)

- **Querverweise:** → Kap. 1 (TGA als Schicht), Kap. 5 (Deckenaufbau), Kap. 6 (Niedrigtemperatur setzt gute Dämmung voraus), Kap. 11 (Lüftung), Kap. 23 (Nachhaltigkeit Wärmeerzeuger)

---

### K11 — Lüftung & Raumluftqualität

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcAirTerminal`, `IfcDuctSegment`, `IfcFan`; Kollisionsszenarien Lüftung/Tragwerk; Luftmengen als `IfcPropertySingleValue`; → Kap. 19

- **Quellen:** Haustechnik (Laasch, Kap. 7–9)

- **Normen:** DIN 1946-6 (Lüftungskonzept Wohngebäude), VDI 6022 (Hygiene RLT), ASR A3.6 (Büro Außenluft)

- **Querverweise:** → Kap. 7 (Feuchteschutz und Lüftung), Kap. 10 (Heizung und Lüftung kombiniert)

---

### K12 — Sanitär & Entwässerung

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcSanitaryTerminal`, `IfcPipeSegment`, `IfcValve`; Fallleitungsführung als häufige Kollisionsquelle; Trinkwasserhygiene-Properties; → Kap. 19

- **Quellen:** Haustechnik (Laasch, Kap. 10–13), Neufert (Sanitärmaße)

- **Normen:** DIN EN 806 (Trinkwasserinstallation), DIN 1988 (TRWI), DIN EN 12056 (Entwässerung), DIN 18040-2 (Barrierefreiheit Sanitär)

- **Querverweise:** → Kap. 1 (Schächte und Koordination), Kap. 8 (Körperschall Rohrleitungen)

---

### K13 — Elektro & Gebäudeautomation

- **Status:** `Entwurf`
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

- **BIM-Brücke:** `IfcElectricDistributionBoard`, `IfcLamp`, `IfcSensor`; Smart-Building-Datenmodelle und digitaler Zwilling → Kap. 26

- **Quellen:** Haustechnik (Laasch, Kap. 14–17)

- **Normen:** DIN VDE 0100 (Errichten von Niederspannungsanlagen), DIN EN 12464 (Beleuchtung), GEG 2024 §72 (EV-Ladeinfrastruktur)

- **Querverweise:** → Kap. 10 (Energiemanagement Heizung), Kap. 23 (PV und Nachhaltigkeit), Kap. 26 (Digitaler Zwilling)

---

### K14 — Planungsrecht

- **Status:** `Entwurf`
- **Zielwörter:** 3,000–3,600 ↑
- **Kernfragen:**
  - Wer darf wo was bauen — wie ist das Baurecht aufgebaut?
  - Wie liest man einen Bebauungsplan, bevor der Stift ansetzt?
  - Was passiert im Genehmigungsverfahren, und wie sieht ein Bauantrag konkret aus?
  - Was kann ein BIM-Modell für den Bauantrag liefern — und was bleibt rechtliche Auslegung?
  - *(IT-Perspektive)* Wie ist Planungsrecht ein Constraint-System, das BIM-Modelle von außen beschränkt — und welche dieser Constraints sind heute schon automatisierbar prüfbar?

- **Pflichtabschnitte (H2):**
  - 14.1 Das Baurecht-System — dreistufig: BauGB (Bundesrecht) → LBO/MBO (Landesrecht) → örtliche Satzungen; BauNVO als Verordnung zum BauGB; **IT-Einstieg:** Planungsrecht als Constraint-System — der B-Plan definiert Parameter (GRZ, GFZ, Traufhöhe, Nutzungsart), das Modell muss diese einhalten; GFZ-Prüfung ist heute aus IFC-Flächen automatisierbar; vollautomatische Code-Compliance (alle Abstandsflächen, alle Brandschutzanforderungen aus Modell) ist ein offenes Forschungsfeld (→ Kap. 26 für Ausblick)
  - 14.2 Bebauungsplan lesen — Festsetzungen: Art der Nutzung (WA, WR, MI, GE, GI), GRZ, GFZ, Traufhöhe, Firsthöhe, Baugrenzen, Baulinien; was fehlt wenn kein B-Plan: §34 (Innenbereich, Einfügen), §35 (Außenbereich, Privilegierung)
  - 14.3 Genehmigungsverfahren und Bauantrag konkret ⚠️ ERWEITERT — Beteiligte: Bauherr, bauvorlageberechtigter Entwurfsverfasser, Behörde, Nachbarn, TÖB; vereinfachtes vs. reguläres Verfahren; Zeitablauf 3–12 Monate; Baulast; konkrete Bauantragsunterlagen: amtlicher Lageplan, Grundrisse/Schnitte/Ansichten, Baubeschreibung, GRZ/GFZ/Vollgeschoss-Berechnung, Stellplatznachweis, Brandschutz, Standsicherheit, Entwässerung, Schall/Wärme/Barrierefreiheit je nach Projekt; Unterschied Genehmigungsreife vs. Ausführungsreife
  - 14.4 Digitaler Bauantrag und BIM-to-Permit ⚠️ NEU — digitale Portale sind oft PDF-/Formularprozesse, nicht automatisch Modellprüfung; BIM kann Flächen, Höhen, Geschosse, Abstände, Baugrenzen und einfache Regelchecks liefern; Grenzen: §34 Einfügen, Ortsbild, Brandschutzabwägung, Befreiung, lokale Satzungsauslegung; Software braucht Modell + maschinenlesbare Regelquelle + nachvollziehbare Nachweislogik
  - 14.5 Abstandsflächen — Berechnung: Wandhöhe × Faktor (0,4 in WA, 1,0 bei Wandhöhe > 16 m); Mindestabstand 3 m; Zusammenrechnung bei Grundstücksgrenzen; Ausnahmen
  - 14.6 Sonderthemen — Denkmalschutz (Einschränkungen + Ausnahmen im GEG); Teilungsgenehmigung; Nachbarzustimmung; Bebauungsplanänderung; Befreiungen §31 BauGB
  - 14.7 Planungsrecht als Entwurfsfilter — rechtliche Hüllkurve und Variantenfilter; nicht erst vor Einreichung prüfen
  - 14.8 Prüffragen für die Praxis — Satzungen, Stellplätze, Feuerwehr, Versickerung, Baumschutz, Baulasten, Nachweise
  - 14.9 Entwicklerperspektive — harte Parameter vs. Auslegung; digitale Prüfung als Ampel mit Quelle und Begründung

- **Einzuführende Begriffe:** `hoai` (kurze Einführung, Vertiefung in Kap. 15), `mbo` (schon eingeführt in Kap. 2), `vob` (hier erste kurze Erwähnung)

- **Bilder (min. 2):**
  - `kap14_baurecht_hierarchie` — Pyramidendiagramm, portrait — BauGB → LBO → örtliche Satzungen, mit Beispielen je Ebene, weißer Hintergrund
  - `kap14_bebauungsplan_legende` — Planausschnitt + Legende, landscape — schematischer B-Plan-Auszug mit allen gängigen Festsetzungen annotiert, weißer Hintergrund
  - `kap14_bauantrag_paket` — Dokumentenpaket/Flow, landscape ⚠️ NEU — Bauantrag als Mappe aus Lageplan, Bauzeichnungen, Baubeschreibung, Berechnungen und Nachweisen; digitaler Einreichungsweg daneben

- **Kastanienallee-Boxen:**
  - nach 14.2: B-Plan K7 — WA (allgemeines Wohngebiet), GRZ 0,6 (Ausnahmewert), GFZ 2,4; Traufhöhe 13 m als Grenze für GK 4
  - nach 14.3: Genehmigungsverfahren K7 — reguläres Verfahren (GK 4), Zeitablauf, Nachbarzustimmung wegen GRZ 0,6

- **BIM-Brücke:** Planungsrecht als Datenanforderung (GFZ-Prüfung automatisierbar); `IfcSite` und Geländemodell; GIS-Schnittstellen; Building Permits als BIM-Use-Case; → Kap. 19, 20

- **Quellen:** BauGB als Primärquelle, MBO, BauNVO, HOAI 2021 Praxisquellen, lokale Normen/Gesetze aus `12_Normen-und-Gesetze`

- **Normen:** BauGB, BauNVO, MBO/LBO (länderspezifisch)

- **Querverweise:** → Kap. 2 (GRZ/GFZ im Entwurf), Kap. 9 (Gebäudeklassen), Kap. 15 (HOAI Leistungsphasen)

---

### K15 — HOAI: Phasen, Leistungen, Koordination

- **Status:** `Entwurf`
- **Zielwörter:** 2,700–3,200 (Ausführungsplanung als Prozessbrücke ergänzt)
- **Kernfragen:**
  - Wie ist ein Bauprojekt organisiert — wer macht was wann?
  - Was leisten die 9 HOAI-Phasen, und warum sind sie so aufgeteilt?
  - Wie wird aus Entwurf eine genehmigungsfähige, ausführbare und ausschreibbare Planung?
  - Wie passt BIM in die Leistungsphasen?

- **Pflichtabschnitte (H2):**
  - 15.1 HOAI als Prozessrahmen ⚠️ GEÄNDERT — Entwurfslogik/Problemklärung steht jetzt in K02; hier: Wie wird aus räumlicher Arbeit ein vertraglich und organisatorisch geführter Prozess? Unterschied Idee, Genehmigungsplanung, Ausführungsplanung, Ausschreibung und Bauüberwachung; Phase = Informationsreife + Verantwortlichkeit
  - 15.2 Die neun Leistungsphasen — LP 1 (Grundlagenermittlung), LP 2 (Vorplanung, Kostenschätzung DIN 276), LP 3 (Entwurfsplanung, Kostenberechnung), LP 4 (Genehmigungsplanung, Bauantrag), LP 5 (Ausführungsplanung — Werkpläne, Details, Koordination), LP 6 (Vorbereitung Vergabe, LV), LP 7 (Mitwirkung Vergabe), LP 8 (Bauoberleitung), LP 9 (Objektbetreuung, Gewährleistung); je Phase: Ergebnis, beteiligte Fachplaner
  - 15.3 Honorarberechnung — anrechenbare Kosten (Bau + TGA, nicht Grundstück), Honorarzonen I–V, Mindestsatz; Beispielrechnung K7
  - 15.4 Fachplaner und ihre Rollen — Tragwerksplanung (LP 2–6), TGA (LP 2–8 je Gewerk), Brandschutz (LP 2–4 + 8), Bauphysik (LP 2–5); wer koordiniert wen (Objektplaner Architekt als Koordinator)
  - 15.5 Ausführungsplanung und Bauunterlagen ⚠️ NEU — LP 5 als Design Development / Construction Documents: Werkpläne, Detailzeichnungen, Türlisten, Raumbücher, Durchbruchsplanung, TGA-Koordination, Brandschutzdetails, Material- und Bauteilfestlegungen; was in Plänen, Modell, Listen und Freigaben stehen muss, damit daraus LV, Bauantrag-Nachträge und Baustellenanweisungen werden können; Abgrenzung Genehmigungsplanung (rechtlich plausibel) vs. Ausführungsplanung (baubar, prüfbar, ausschreibbar)
  - 15.6 BIM in den Leistungsphasen — LOD 100 (LP 1), LOD 200 (LP 2–3), LOD 300 (LP 5), LOD 400 (Ausführung/Vergabe), LOD 500 (as-built); AIA (Auftraggeber-Informations-Anforderungen) als Steuerungsinstrument; BIM-Manager als neue Rolle
  - 15.7 BIM-Ausführungsplan (BAP/BEP): Inhalt und Struktur — der BAP ist das zentrale Steuerungsdokument eines BIM-Projekts; typische Kapitelstruktur: Projektziele, BIM-Anwendungsfälle, Modellstruktur, Namenskonventionen, LOD-Matrix, Software und Formate, CDE-Workflow, Qualitätssicherung, Rollen und Verantwortlichkeiten; Erstellung: AG-seitig AIA → AN-seitig BAP; Zeitpunkt: vor LP 3-Start
  - 15.8 Warum die Reihenfolge zählt — Problemraum (K02) → Genehmigungsrahmen (K14) → Leistungsphasen/Ausführungsplanung (K15) → Kosten und Vergabe (K16) → Bauoberleitung (K17); Rücksprünge erklären, aber Prozesslogik bleibt erkennbar
  - 15.9 Prüffragen für die Praxis — welche Phase liefert welche Entscheidung, welche Unterlage, welche Kostenstufe, welche Modellreife?
  - 15.10 Entwicklerperspektive — Leistungsphasen als Zustandsmodell: Informationsreife, Freigabestatus, Verantwortlichkeiten, Modellversionen und Prüfregeln

- **Einzuführende Begriffe:** `hoai`, `lod`, `bap`

- **Bilder (min. 2):**
  - `kap15_leistungsphasen` — Zeitstrahl, landscape — LP 1–9 als Balken mit Ergebnis je Phase, Fachplaner-Beteiligung als farbige Linien darunter, weißer Hintergrund
  - `kap15_bim_lod` — Progression, landscape — Gebäudemodell K7 in LOD 100/200/300/500 nebeneinander, zunehmender Detailgrad sichtbar, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 15.2: Projektzeitplan K7 — LP 1 (3 Monate), LP 2–3 (4 Monate), LP 4 (2 Monate Genehmigung + 8 Monate Wartezeit), LP 5 (6 Monate), LP 6–7 (3 Monate), LP 8 (14 Monate Bauzeit), LP 9 (5 Jahre)
  - nach 15.5: Ausführungsplanung K7 — typische Unterlagen: Schal- und Bewehrungskoordination, TGA-Schachtführung, Türliste, Brandschutzdetails, Dachaufbau, Aufzugsdetails
  - nach 15.6: AIA K7 — welches Modell in welcher LP, LOD-Anforderungen je Disziplin

- **BIM-Brücke:** LOD-Konzept zentral; AIA/EIR als Informationsanforderungen; BAP/BEP als Projektspielregel; Modellreife darf nicht mit Planungsreife verwechselt werden; → Kap. 18, 20, 21

- **Quellen:** HOAI 2021 als Primärquelle, ISO19650, HOAI-Praxis-Kommentare

- **Normen:** HOAI 2021, DIN 276 (Kosten), ISO 19650 (Informationsmanagement)

- **Querverweise:** → Kap. 2 (Entwurf als Problemklärung), Kap. 14 (Bauantrag), Kap. 16 (Kosten und LV), Kap. 17 (Bauprojektmanagement, LP 8 detail), Kap. 18 (Was BIM ist), Kap. 21 (CDE und ISO 19650)

---

### K16 — Kosten & Ausschreibung

- **Status:** `Entwurf`
- **Zielwörter:** 3,200–3,800 ↑
- **Kernfragen:**
  - Was kostet ein Gebäude wirklich, und wie ermittelt man das?
  - Was ist ein Leistungsverzeichnis, und wie entsteht es aus Ausführungsplanung und Modell?
  - Wie findet und bewertet man ausführende Unternehmen realistisch?
  - Was regelt die VOB im Bauvertrag?
  - Wie hängen Ausschreibung, Vergabe, Bauablauf und spätere Bauoberleitung zusammen?

- **Pflichtabschnitte (H2):**
  - 16.1 Kostenermittlung nach DIN 276 — Kostengliederung KG 100–700; Kostenkennwerte in €/m² BGF; Schätzung (LP 2) → Berechnung (LP 3) → Anschlag (LP 6/7) → Feststellung (Abschluss); Kosten als Entwurfsparameter, nicht nur Controlling
  - 16.2 Leistungsverzeichnis und Ausschreibung — STLB-Bau; LV-Aufbau: OZ, Menge, Einheit, Kurztext, Langtext, Einheitspreis, Gesamtpreis; Ausführungsplanung als Voraussetzung; private Vergabe vs. öffentliche Vergabe (UVgO, VgV); bekannte Firmen anfragen ist möglich, aber Vergleichbarkeit und Dokumentation bleiben nötig
  - 16.3 Vergabepraxis und Angebotsprüfung ⚠️ NEU — Firmen finden, Eignung prüfen, Submission, Preisspiegel, rechnerische/formale/technische Prüfung, auffällige Einheitspreise, Bietergespräch, Zuschlagsentscheidung; Vergabestrukturen: Einzelvergabe vs. Generalunternehmer vs. Generalübernehmer/Totalunternehmer; Wirkung auf Kostenrisiko, Koordination und Rolle des Architekten
  - 16.4 VOB/B Grundlagen — Vertragstypen: Einheitspreisvertrag, Pauschalvertrag, GU-Vertrag; Nachträge (geänderte/zusätzliche Leistung §1/2 VOB/B); Abnahme; Gewährleistung 4 vs. 5 Jahre
  - 16.5 Baustellenablauf und Gewerkekoordination — Reihenfolge der Gewerke als Vorschau auf K17: Rohbau → Dach/Dichtheit → TGA-Rohinstallation → Innenausbau; kritischer Pfad, Behinderungsanzeige und Bauzeitenplan hier nur einordnen, Details in K17
  - 16.6 Vom Modell zur Baustelle — Modellmengen sind keine fertigen LV-Positionen; Nebenleistungen, Gerüste, Schutzmaßnahmen, Toleranzen, Abrechnungsregeln und Schnittstellen müssen beschrieben werden; 5D-BIM als Mapping-Problem
  - 16.7 Prüffragen für die Praxis — Bezugsgrößen, Kostengruppen, Risikopuffer, Schnittstellen, Vorbemerkungen, Nachtragsrisiken, Modellmengen prüfen
  - 16.8 Entwicklerperspektive — transparente Kostenpipeline: Modellversion, Mengenregel, Klassifikation, Preisquelle, Änderungsverfolgung

- **Einzuführende Begriffe:** `vob`, `din-276`, `kostengruppe`, `leistungsverzeichnis`, `gewerk`

- **Bilder (min. 3):**
  - `kap16_din276_struktur` — Baumdiagramm, portrait — KG 100–700 mit typischen Kostenanteilen (% vom Gesamt), weißer Hintergrund
  - `kap16_lv_auszug` — Tabellendarstellung, landscape — LV-Ausschnitt 3–4 Positionen Mauerwerk mit OZ, Menge, Einheit, Kurztext; schematisch, weißer Hintergrund
  - `kap16_preisspiegel` — Vergleichstabelle, landscape ⚠️ NEU — drei Bieter, Positionen, Ausreißer markiert, Zuschlagsentscheidung nachvollziehbar; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 16.1: Kostenschätzung K7 — BGF 1.800 m² × 3.200 €/m² = 5,76 Mio. €; Aufschlüsselung KG 300/400/500/700
  - nach 16.3: Preisspiegel K7 — Rohbauangebote mit auffälligen Einheitspreisen; Bietergespräch; Zuschlag an technisch plausibles wirtschaftlichstes Angebot
  - nach 16.4: Vertragsstruktur K7 — Einheitspreisverträge Rohbau + TGA-Gewerke; GU-Option wurde geprüft aber verworfen

- **BIM-Brücke:** 5D-BIM (Kosten im Modell); Mengenermittlung aus `IfcQuantitySet`; LV-Positionen aus Modellobjekten; GAEB-Format DA86; → Kap. 19, 20

- **Quellen:** VOB/B als Primärquelle, DIN 276, Brandt/Franssen `Basics Ausschreibung`, VOB im Bild, HOAI-Praxis

- **Normen:** DIN 276 (Kosten), VOB/A+B+C, UVgO, VgV

- **Querverweise:** → Kap. 15 (Ausführungsplanung und Kostenstufen), Kap. 17 (Bauoberleitung), Kap. 20 (Klassifikation und STLB)

---

### K17 — Bauprojektmanagement & Bauoberleitung

- **Status:** `Entwurf`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Was ist Bauprojektmanagement — und wer trägt die Verantwortung auf der Baustelle?
  - Wie plant man eine Bauzeit strukturiert — Gantt, Netzplan, kritischer Pfad?
  - Was bedeutet Bauoberleitung (LP 8) konkret — welche Aufgaben hat der Architekt täglich?
  - Wie kontrolliert man Kosten während der Ausführung, und wann eskaliert man?
  - Was ist eine Behinderungsanzeige — und warum ist sie rechtlich so entscheidend?

- **Pflichtabschnitte (H2):**
  - 17.1 Was Bauprojektmanagement bedeutet — Abgrenzung: Projektmanagement (Terminplanung, Kostenkontrolle, Risikomanagement, Kommunikation) vs. Objektplanung; Architekt als Objektplaner, Projektsteuerer als PM-Dienstleister (§ 31 HOAI); LP 8 = Bauoberleitung, LP 9 = Objektbetreuung; Abgrenzung Bauleiter Architekt vs. Bauleiter Unternehmen/verantwortlicher Bauleiter nach LBO
  - 17.2 Terminplanung — Balkenplan/Gantt, Netzplan, Critical Path Method; FA/FE/SA/SE, Gesamtpuffer, kritischer Pfad; Soll-Ist-Vergleich; Vertragsfristen nach § 5 VOB/B
  - 17.3 Kostenkontrolle auf der Baustelle — Soll-Ist-Vergleich nach DIN 276; Nachtragsprüfung nach § 1 Abs. 3 und § 2 Abs. 6 VOB/B; Massenprüfung, Preisangemessenheit, Risikobudget, Bauherr informieren
  - 17.4 Bauoberleitung: die tägliche Arbeit (LP 8) — Überwachung der Ausführung auf Übereinstimmung mit Genehmigung, Ausführungsplanung und LV; Baubesprechung, Protokoll, Bautagebuch, Mängelrüge, Behinderungsanzeige, Abnahme, Teilabnahmen
  - 17.5 BIM in der Bauphase — 4D-BIM, Punktwolken/Drohnen, digitales Bautagebuch, BCF-Mängeltickets, as-built/LOD 500, Übergabe an LP 9/FM

- **Einzuführende Begriffe:** `bauoberleitung`, `oba`, `bauzeitenplan`, `kritischer-pfad`, `behinderungsanzeige`, `bautagebuch`, `nachtrag`

- **Bilder (min. 3):**
  - `kap17_bauzeitenplan` — Gantt-Diagramm, landscape — K7 Bauablauf: Rohbau → Dach → TGA-Rohinstallation → Innenausbau → Außenanlagen; Gewerke als farbige Balken, kritischer Pfad hervorgehoben, Puffer sichtbar; weißer Hintergrund
  - `kap17_netzplan_prinzip` — Netzplandiagramm, landscape — schematisches Beispiel mit 6–8 Vorgängen, Pufferzeit und kritischem Pfad (rot), Frühest-/Spätesttermin je Knoten; weißer Hintergrund
  - `kap17_kostenkontrolle` — Diagramm, landscape — Kostenverlauf K7 von Anschlag bis Abschluss: Soll, Ist, Prognose Endkosten; Nachtragsvolumen als Farbblock; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 17.2: Bauzeitenplan K7 — Rohbau 6 Monate, Dach/Dichtheit 1 Monat, TGA-Rohinstallation parallel, Innenausbau-Sequenz; Gesamtbauzeit 14 Monate; kritischer Pfad Rohbau → Estrich → Innenputz/Trockenbau → Fußbodenbelag
  - nach 17.3: Nachtragsbeispiel K7 — Altlast im Bodenaushub; Entsorgungsnachtrag; Massenprüfung, Preisprüfung, Freigabe mit Auflagenprotokoll
  - nach 17.4: Baubesprechungsprotokoll K7 — Woche 14, Rohbaurückstand 3 Tage wegen Kranausfalls; Behinderungsanzeige; Auswirkung auf nachfolgende Gewerke dokumentiert

- **BIM-Brücke:** 4D-BIM — `IfcTask`, `IfcRelSequence`; BCF für Mängel auf der Baustelle; → Kap. 18, 21, 26

- **Quellen:** Kochendörfer/Liebchen/Viering (Bau-Projekt-Management), Würfele/Bielefeld/Gralla (Bauobjektüberwachung)

- **Normen:** VOB/B § 4, § 5, § 6, § 12, § 14; HOAI 2021 Anlage 10 (LP 8 Objektplanung); BayBO Art. 54 / MBO § 59 (verantwortlicher Bauleiter)

- **Querverweise:** → Kap. 15 (HOAI LP-Überblick), Kap. 16 (Kosten + VOB/B), Kap. 18 (BIM), Kap. 21 (CDE, Dokumentation), Kap. 26 (Digitaler Zwilling)

---

### K18 — Was BIM wirklich ist

- **Status:** `Entwurf`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Was ist BIM — und was ist es nicht?
  - Was ändert sich wirklich im Planungsprozess?
  - Warum ist offenes BIM so schwer?

- **Pflichtabschnitte (H2):**
  - 18.1 Drei Dimensionen von BIM — (1) Methode (Prozess, nicht Software), (2) Datenmodell (semantisch angereichertes 3D), (3) Prozess (wer liefert wann welche Information); alle drei zusammen = BIM
  - 18.2 Was BIM löst — Kollisionsprüfung (hard/soft/workflow), Mengenermittlung, Energiesimulation, Terminplanung (4D), Kostenkopplung (5D), Facility Management (6D/7D); was BIM nicht löst (schlechte Planung automatisch)
  - 18.3 BIM-Reifegradstufen — Little BIM vs. Big BIM; BIM Level 1/2/3 (UK-Modell); offenes BIM (IFC) vs. proprietäre Ökosysteme (Revit-Only); warum Offenheit die bessere Langzeitstrategie ist
  - 18.4 BIM im deutschen Markt — Stufenplan Digitales Planen und Bauen (BMVI 2015); VDI 2552; öffentliche Auftraggeber (Bahn, Autobahn, BBSR); aktueller Stand: weit verbreitet im Infrastrukturbau, im Hochbau noch inhomogen

- **Einzuführende Begriffe:** `bim`, `ifc` (Einführung — Vertiefung in Kap. 19), `bcf`

- **Bilder (min. 2):**
  - `kap18_bim_dimensionen` — Infografik, landscape — 3D/4D/5D/6D/7D visuell erklärt, je mit konkretem Beispiel, weißer Hintergrund
  - `kap18_prozessvergleich` — Flussdiagramm, landscape — Planungsprozess klassisch vs. BIM: Informationsfluss, Koordinationspunkte, Kollisionszeitpunkte, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 18.1: BIM-Modell K7 — welche Disziplinen liefern welches Teilmodell; Koordinationsmodell als Zusammenführung

- **BIM-Brücke:** Kapitel IS die BIM-Brücke — Übergang zu Kap. 19 (IFC), Kap. 20 (Klassifikation), Kap. 21 (Prozess)

- **Quellen:** DINSPEC, ISO19650, Ridder (Kap. 1)

- **Normen:** VDI 2552 (BIM-Begriffe), ISO 19650-1/2, DIN SPEC 91391

- **Querverweise:** → Kap. 15 (HOAI + LOD), Kap. 19 (IFC), Kap. 21 (CDE), Kap. 22 (Software)

---

### K19 — IFC: Die Sprache des digitalen Gebäudes

- **Status:** `Entwurf`
- **Zielwörter:** 4,000–5,000 ↑↑ — **Kernkapitel für Zielgruppe; lieber zu lang als zu kurz**
- **Kernfragen:**
  - Wie ist IFC aufgebaut — was ist die Projektstruktur?
  - Wie lese ich ein IFC-Modell als Entwickler — wie traversiere ich es programmatisch?
  - Wie werden Geometrie, Properties und Beziehungen kodiert?
  - Welche Fallstricke gibt es beim IFC-Export aus authoring tools?

- **Pflichtabschnitte (H2):**
  - 19.1 Projektstruktur — `IfcProject` → `IfcSite` → `IfcBuilding` → `IfcBuildingStorey` → `IfcSpace`; Objekthierarchie; wie Containment-Beziehungen (`IfcRelAggregates` vs. `IfcRelContainedInSpatialStructure`) funktionieren und wo der Unterschied liegt
  - 19.2 Die wichtigsten Entitäten — Architektur: `IfcWall`, `IfcSlab`, `IfcRoof`, `IfcDoor`, `IfcWindow`, `IfcStair`; Tragwerk: `IfcColumn`, `IfcBeam`, `IfcFooting`; TGA: `IfcFlowSegment`, `IfcFlowTerminal`, `IfcDistributionSystem`; je: wofür, wichtigste Properties, typische Fehler beim Export
  - 19.3 Geometrierepräsentation — SweptSolid (Extrusion: am häufigsten), Brep (Boundary Representation: für komplexe Formen), CSG (Boolean: selten in IFC direkt), Clipping; warum Revit standardmäßig SweptSolid exportiert; was dabei verloren geht; wie man Geometrietyp in STEP erkennt (`IFCEXTRUDEDAREASOLID`)
  - 19.4 Properties und PropertySets — standardisierte Psets (z.B. `Pset_WallCommon`: FireRating, ThermalTransmittance, LoadBearing); benutzerdefinierte Psets (wann sinnvoll, Naming-Konventionen); QuantitySets (Mengen formal: `Qto_WallBaseQuantities`); Properties als maschinenlesbare Semantik — warum das für Software wichtig ist
  - 19.5 Beziehungen in IFC — `IfcRelContainedInSpatialStructure`, `IfcRelAssociatesMaterial`, `IfcRelDefinesByType`, `IfcRelConnectsElements`; warum Beziehungen wichtiger sind als Objekte; wie man von einem Element zu seinem Material kommt (3 Schritte); IfcOwnerHistory als Metadaten-Container
  - 19.6 STEP-Format manuell lesen ⚠️ WICHTIG FÜR ENTWICKLER — vollständig annotiertes Beispiel: eine IfcWall von K7 in STEP-Text; Zeilennummern, Entitäts-IDs, Argumentlisten; wie man mit grep/Python erste Fragen stellt; häufige Fehlertypen (doppelte GUIDs, fehlende Containment, leere Geometrie)
  - 19.7 Programmatischer Zugriff mit IfcOpenShell ⚠️ NEU — Zielgruppe (Informatiker) direkt abholen; 10-Zeilen-Python: IFC laden, alle Wände ausgeben, Pset lesen; IfcOpenShell als de-facto Standard; Alternativen (.NET: xBIM; JS: web-ifc); was man damit bauen kann — genug um eigene Werkzeuge zu schreiben
  - 19.8 IFC-Versionen und MVD ⚠️ ERWEITERT — IFC2x3 (noch ca. 60% Marktanteil DE), IFC4 (aktuell, besser strukturiert), IFC4.3 (Infrastruktur + Brücken); was sich geändert hat; warum IFC2x3 trotzdem noch relevant ist; Empfehlung: für Neuprojekte IFC4; **MVD (Model View Definition):** warum IFC-Export zwischen Tools so stark variiert — eine MVD definiert den Sub-Schema-Subset, der für einen Anwendungsfall gültig ist; wichtigste MVDs: Coordination View 2.0 (IFC2x3, de-facto-Standard für Koordination DE), Reference View 1.2 (IFC4, read-only, für Datenübergabe), Design Transfer View (IFC4, bidirektional, voller Geometriezugriff); Revit exportiert primär CV 2.0 → deshalb gehen beim IFC4-Import oft Geometrietypen verloren; Empfehlung: MVD im BAP (Kap. 15) projektspezifisch vereinbaren und im IFC-Datei-Header prüfen
  - 19.9 Georeferenzierung und CRS ⚠️ NEU — für Entwickler die Modelle in GIS-Systeme integrieren oder mehrere Teilmodelle koordinieren; Problem: jedes Authoring-Tool platziert den lokalen Modellursprung woanders → bei CDE-Import passen Modelle nicht zusammen; `IfcGeometricRepresentationContext`: enthält `WorldCoordinateSystem` (lokales Ursprungskoordinatensystem) und `TrueNorth`; Lösung in IFC4: `IfcMapConversion` koppelt das lokale Koordinatensystem an ein geographisches CRS; EPSG-Codes: EPSG:25832 (ETRS89/UTM Zone 32N) ist Standard für Deutschland; IFC2x3-Limitation: `IfcSite.RefLatitude`/`RefLongitude` (Grad/Minuten/Sekunden, unzuverlässig, kein CRS-Link) — deshalb auch in IFC2x3-Projekten oft separate Georeferenzierungs-CSV nötig; GIS-Kopplung: Shapefile/WFS → Geländemodell → IFC-Modell georeferenziert; praktische Empfehlung: Koordinatenursprung projektbezogen definieren und im BAP festschreiben; ohne saubere Georeferenzierung scheitert Stadtmodell-Integration (CityGML, 3D-Stadtmodelle der Kommunen)

- **Einzuführende Begriffe:** `step`, `ifc` (wenn nicht schon in Kap. 18)

- **Bilder (min. 4):**
  - `kap19_ifc_hierarchie` — Baumdiagramm, portrait — IfcProject-Baum K7 vollständig: Site → Building → 4 Geschosse → je Räume und Elemente; weißer Hintergrund
  - `kap19_beziehungen` — Graphdiagramm, landscape ⚠️ NEU — ein IfcWall-Objekt als Zentrum, Pfeile zu: IfcMaterial (via IfcRelAssociatesMaterial), IfcSpace (via IfcRelSpaceBoundary), IfcWallType (via IfcRelDefinesByType), IfcBuildingStorey (via IfcRelContainedInSpatialStructure); zeigt warum Beziehungen das Kernsystem sind; weißer Hintergrund
  - `kap19_step_format` — Code-Darstellung, landscape — annotiertes STEP-Beispiel für eine IfcWall von K7 mit Geometrie + Psets; Zeilen farblich markiert und erklärt; weißer Hintergrund
  - `kap19_entitaeten_uebersicht` — Mindmap/Klassendiagramm, landscape — wichtigste IFC-Entitäten hierarchisch, Farbe nach Disziplin, weißer Hintergrund
  - `kap19_mvd_vergleich` — Vergleichstabelle, landscape ⚠️ NEU — Coordination View 2.0 vs. Reference View vs. Design Transfer View: IFC-Version, unterstützte Features (Geometrie, Properties, Mengen), Revit-Exportoption, typischer Use-Case; weißer Hintergrund
  - `kap19_georeferenzierung` — Systemdiagramm, landscape ⚠️ NEU — lokales Modellkoordinatensystem + IfcMapConversion-Pfeil → EPSG:25832 → GIS-Layer; daneben: Problem ohne Georeferenzierung (zwei Modelle passen nicht zusammen); weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 19.4: IFC-Auszug K7-Außenwand vollständig annotiert: `IfcWall` + `IfcMaterialLayerSet` + `Pset_WallCommon` + Geometrie
  - nach 19.6: Welche IFC-Version für K7 — IFC4 (weil öffentlicher Auftraggeber, ISO 19650)

- **BIM-Brücke:** Kapitel ist die IFC-Vertiefung; → Kap. 20 (Klassifikation in IFC), Kap. 21 (IFC in CDE), Kap. 22 (IFC-Tools)

- **Quellen:** IFC4.3 Spezifikation (im Ordner 09_Digital-und-BIM/IFC4_3)

- **Normen:** ISO 16739 (IFC), ISO 10303 (STEP)

- **Querverweise:** → Kap. 18 (Was BIM ist), Kap. 20 (Klassifikation), Kap. 21 (Prozess und CDE)

---

### K20 — Klassifikation

- **Status:** `Entwurf`
- **Zielwörter:** 2,000–2,500 ↓ (gestrafft, DE-Fokus)
- **⚠️ Fokus-Warnung:** OmniClass und Uniclass nur als Überblick — für Einsteiger in DE wenig praxisrelevant. Schwerpunkt auf Deutsche Klassifikation (DIN 276, DIN 277, STLB-Bau) und die Verbindung zu IFC. Riskiert zu abstrakt zu werden wenn zu viel Systemtheorie.
- **Kernfragen:**
  - Warum reicht IFC alleine nicht — was leistet Klassifikation zusätzlich?
  - Welche Klassifikationssysteme sind in Deutschland wirklich relevant?
  - Wie verbindet man Klassifikation konkret mit IFC-Objekten?

- **Pflichtabschnitte (H2):**
  - 20.1 Das Problem — gleiche Objekte, unterschiedliche Namen in verschiedenen Modellen; Chaos bei automatischer Auswertung (Mengen, Kosten, FM); Lösung: externe Klassifikationssysteme; konkretes Beispiel: "Außenwand" in Revit vs. "Tragende Außenwand" in Ausschreibung vs. KG 331 in DIN 276
  - 20.2 Deutsche Klassifikation im Kern — **Schwerpunkt**: DIN 277 (Flächen und Rauminhalte: BGF, NUF, VF — die Basis aller Flächenberechnungen); DIN 276 (Kosten: KG 100–700, wie in Kap. 16); STLB-Bau (Leistungstexte für Ausschreibung); wie die drei zusammenspielen; was ein BIM-Entwickler kennen muss
  - 20.3 Internationale Systeme im Überblick — OmniClass (14 Tabellen, US): Table 21 (Elements) und Table 41 (Materials) als die für BIM relevantesten; Uniclass 2015 (UK): nur wenn internationale Projekte; ISO 12006-2 als gemeinsames Framework dahinter; Empfehlung: wer nur in DE arbeitet braucht OmniClass nicht zu kennen
  - 20.4 Verbindung IFC ↔ Klassifikation — `IfcClassificationReference`; wie man ein IFC-Objekt mit DIN 276 / STLB referenziert; Mapping-Tabellen; Mehrsprachigkeit als Dauerproblems; IDS (Information Delivery Specification) als modernerer Ansatz

- **Einzuführende Begriffe:** — (keine spezifischen Glossar-Terms)

- **Bilder (min. 2):**
  - `kap20_omniclass_tabellen` — Übersichtsinfografik, landscape — 14 OmniClass-Tabellen mit Nummern, kurzer Beschreibung und Anwendungsbeispiel, weißer Hintergrund
  - `kap20_mapping` — Flussdiagramm, landscape — IFC-Objekt → IfcClassificationReference → OmniClass-Code → STLB-Position → DIN276-KG; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 20.5: Klassifikation an K7-Außenwand — OmniClass Table 21 Code + Uniclass Pr-Code + DIN276 KG 331

- **BIM-Brücke:** `IfcClassificationReference`; Mengenermittlung aus klassifizierten Objekten; → Kap. 16 (Kosten aus Modell)

- **Quellen:** OmniClass-Tabellen (im Ordner 09_Digital-und-BIM/OmniClass), Uniclass-Dokumente

- **Normen:** DIN 277, DIN 276, ISO 12006-2 (Klassifikation von Bauwerken)

- **Querverweise:** → Kap. 16 (Kosten und STLB), Kap. 19 (IFC), Kap. 21 (CDE und Klassifikation)

---

### K21 — Prozess & Kollaboration: CDE, ISO 19650 & AIA

- **Status:** `Entwurf`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wie arbeiten viele Planer zusammen ohne Datenchaos?
  - Was ist ein CDE, und wie sind die Informationsstatusworkflows aufgebaut?
  - Was ist ISO 19650, und was muss ich davon kennen?

- **Pflichtabschnitte (H2):**
  - 21.1 Das Problem der verteilten Information — ohne CDE: E-Mail, Dropbox, Versionschaos, wer hat welche Version; mit CDE: zentraler Speicher, definierter Workflow, Revisionssystem
  - 21.2 CDE und Informationsstatus — Work in Progress (WIP) → Shared (S) → Published (P) → Archived (A); Benennungskonvention nach ISO 19650-2 (Projektcode, Ursprung, Revisionsnummer, Status); Praxisbeispiele
  - 21.3 ISO 19650 im Überblick — Teil 1: Konzepte; Teil 2: Lieferprozess; Appointment-Struktur: Lead Appointed Party (LAP) und Task Teams; OIR → AIR → EIR → MIDP/TIDP als Informationsanforderungs-Kette
  - 21.4 BIM-Rollen — BIM-Manager (Auftraggeber-Seite, definiert EIR), BIM-Koordinator (Auftragnehmer-Seite, prüft Modelle), BIM-Autor (erstellt Fachmodell); wer macht was
  - 21.5 Kollisionsprüfung und BCF — Hard Collision (physische Überschneidung), Soft Collision (Mindestabstand unterschritten), Workflow Collision (Planungskonflikt); BCF-Format (Building Collaboration Format): Viewpoint + Kommentar + Status; Prüfzyklus in der Praxis

- **Einzuführende Begriffe:** `bcf` (wenn nicht schon Kap. 18)

- **Bilder (min. 2):**
  - `kap21_cde_workflow` — Flussdiagramm, landscape — Informationsstatus WIP→S→P→A mit Beispielaktionen je Status, Rollen-Icons, weißer Hintergrund
  - `kap21_iso19650_struktur` — Organigramm, portrait — Auftraggeber (OIR/AIR/EIR) → LAP (MIDP) → Task Teams (TIDP), Informationsfluss Pfeile, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 21.2: CDE-Struktur K7 — Dateibenennungsbeispiele nach ISO 19650, Shared-Modelle je Disziplin
  - nach 21.5: BCF-Mängelticket K7-Beispiel: Kollision Lüftungskanal/Betonunterzug im 2. OG

- **BIM-Brücke:** CDE-Produkte (BIMcollab, Autodesk Construction Cloud, Trimble Connect); BCF als offenes Format; IDS (Information Delivery Specification) als Validierungswerkzeug; → Kap. 22

- **Quellen:** ISO19650 (DE), DINSPEC

- **Normen:** ISO 19650-1/2, DIN SPEC 91391

- **Querverweise:** → Kap. 15 (HOAI und Informationslieferprozess), Kap. 18 (BIM-Grundlagen), Kap. 22 (Software-Ökosystem)

---

### K22 — BIM in der Praxis

- **Status:** `Entwurf`
- **Zielwörter:** 2,200–2,800
- **Kernfragen:**
  - Was passiert in einem BIM-Projekt von Anfang bis Ende konkret?
  - Welche Software-Kategorien gibt es und für was?
  - Warum scheitert BIM so oft — und wie verhindert man das?

- **Pflichtabschnitte (H2):**
  - 22.1 Authoring-Software — Revit (dominant DE), ArchiCAD, Vectorworks, Allplan; Stärken/Schwächen; Revit: warum so verbreitet (Familien, Parameter, MEP-Integration); Probleme (proprietäre Datenbank, IFC-Export-Qualität)
  - 22.2 Koordinations- und Prüftools — Navisworks (Autodesk), Solibri (Nemetschek), BIMcollab; was ein Koordinationsmodell ist; Regelbasierte Prüfung (z.B. "jede Tür muss Raumzugang haben"); Clash-Bericht als Kommunikationsmittel
  - 22.3 Analysetools — Energieanalyse (IDA ICE, DesignBuilder, OpenStudio); Statik (RFEM, Dlubal); Tageslichtsimulation (Radiance, Velux Daylight); Schnittstelle IFC → gbXML → Analysesoftware
  - 22.4 Facility Management — COBie (Construction Operations Building Information Exchange) als Datenübergabe; CAFM-Systeme (IBM Maximo, Archibus, Nemetschek Crem); Wartungsdaten im Modell ab LP 5
  - 22.5 Häufige BIM-Fehler — Modell ohne Daten (nur 3D-Hülle); Psets leer; IFC-Export-Probleme (Schichten fehlen, Geometrie zerstört); fehlende EIR → niemand weiß was geliefert werden soll; zu späte Modellkoordination; fehlende Georeferenzierung → Teilmodelle passen nicht zusammen
  - 21.5a IFC-Validierungstools ⚠️ NEU — wie man prüft, ob eine IFC-Datei valide und spezifikationskonform ist: **buildingSMART Validation Service** (online, kostenlos, prüft IFC-Datei gegen Schema + MVD + Normative Rules); **IDS (Information Delivery Specification)**: maschinenlesbares XML-Format, das festlegt welche Objekte welche Properties in welchem Kontext haben müssen; IDS-Validatoren in Solibri (kommerziell), BIMcollab ZOOM (kostenlos für Grundfunktionen), xBIM Toolkit (.NET, open source); Bedeutung für Entwickler: eigene IFC-Ausgaben gegen IDS testen statt manuell in STEP-Datei debuggen; Praxistipp: jedes Projekt sollte eine projektspezifische IDS-Datei haben, die die EIR maschinenlesbar formalisiert
  - 22.6 Open-Source-Ökosystem — IfcOpenShell (Python), BlenderBIM, xBIM Toolkit (.NET), FreeCAD BIM; was die Community baut

- **Einzuführende Begriffe:** — (keine spezifischen neuen Terms)

- **Bilder (min. 2):**
  - `kap22_bim_software_oekosystem` — Kategorisierte Übersicht, landscape — Software-Ökosystem in Kategorien: Authoring, Koordination, Analyse, FM, Open Source; je mit Logo-Platzhalter und Funktion, weißer Hintergrund
  - `kap22_clash_beispiel` — Screenshot-ähnlich, landscape — 3D-Koordinationsmodell mit markierter Kollision (rot) zwischen Lüftungskanal und Unterzug, BCF-Panel seitlich, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 22.4: BIM-Workflow K7 von LP 2 bis FM — welche Software in welcher Phase, Informationsübergabe je Meilenstein

- **BIM-Brücke:** Kapitel ist praktische Zusammenfassung aller BIM-Kapitel; → Kap. 23 (LCA aus BIM), Kap. 26 (Digitaler Zwilling)

- **Quellen:** Ridder (Revit 2026), ISO19650, DINSPEC

- **Normen:** —

- **Querverweise:** → Kap. 18 (BIM-Grundlagen), Kap. 19 (IFC), Kap. 21 (CDE), Kap. 26 (Zukunft)

---

### K23 — Nachhaltigkeit & Kreislaufwirtschaft

- **Status:** `Entwurf`
- **Zielwörter:** 2,500–3,000
- **Kernfragen:**
  - Wie nachhaltig ist Bauen wirklich — was sind die Zahlen?
  - Was ist Embodied Carbon, und warum wird es wichtiger als Operational Carbon?
  - Was bedeutet Kreislaufwirtschaft für Materialien und Planung?

- **Pflichtabschnitte (H2):**
  - 23.1 Bauen und Klimakrise — 40% des globalen CO₂ stammt aus Gebäuden; Aufschlüsselung: Operational Carbon (Betrieb) vs. Embodied Carbon (Herstellung, Bau, Rückbau); Trend: Operational sinkt (GEG), Embodied steigt relativ
  - 23.2 Lebenszyklusanalyse (LCA) — System boundary (cradle-to-gate, cradle-to-grave, cradle-to-cradle); EPD (Environmental Product Declaration): wo und wie man sie findet (EPD-DAB, IBU); Berechnungstools (oneclick LCA, Tally)
  - 23.3 Zertifizierungssysteme — DGNB (DE-System, ganzheitlich, 6 Kriteriengruppen), LEED (US-System, verbreitet international), BREEAM (UK-System); Vergleich: was sie messen, was sie nicht messen; Kosten und Nutzen
  - 23.4 Kreislaufwirtschaft — Design for Disassembly (reversible Verbindungen statt Kleben/Schweißen), Urban Mining, Materialpass (welche Materialien wo verbaut, für spätere Trennung); Baustoffrecycling-Quoten heute
  - 23.5 Begrünung als bauphysikalische Maßnahme — Dachbegrünung (Speichermasse, Kühlungseffekt, Retentionswirkung Regenwasser); Fassadenbegrünung; EU-Biodiversitätsziel; GEG und Begrünung

- **Einzuführende Begriffe:** `embodied-carbon`, `epd`

- **Bilder (min. 2):**
  - `kap23_lca_phasen` — Flussdiagramm, landscape — Lebenszyklusphasen A1–A5, B1–B7, C1–C4, D; CO₂-Anteile je Phase als Balkendiagramm, weißer Hintergrund
  - `kap23_materialpass` — Tabellen-Infografik, portrait — schematischer Materialpass K7: Bauteil, Material, Menge, EPD-Referenz, Rückbaubarkeit (gut/mittel/schwer), weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 23.2: LCA K7 — Embodied Carbon Berechnung für Tragstruktur (Beton CO₂-intensiv) vs. Alternative Holzskelett; Ergebnis: Unterschied ca. 180 vs. 60 kg CO₂eq/m²
  - nach 23.5: Dachbegrünung K7 — extensiv 400 m², Retentionswirkung 40 L/m², Temperaturreduktion Dachfläche 20°C

- **BIM-Brücke:** Materialpass im BIM-Modell; LCA-Schnittstellen (`IfcMaterial` + EPD-Link via `IfcClassificationReference`); DGNB-Dokumentation aus BIM; Rückbauinformationen als Datenpflicht; → Kap. 19
  ⚠️ **Explizit erklären was sich ändert wenn LCA-Daten im Modell liegen** — das ist der Punkt wo K23 aufhört Nachhaltigkeitskapitel-mit-BIM-Fußnote zu sein: (1) Entwurfsvarianten sofort auf CO₂-Auswirkung vergleichen (Beton vs. Holz in Sekunden, nicht Stunden), (2) Mengenermittlung aus IFC-Modell direkt in LCA-Tool (kein manuelles CSV — `Qto_WallBaseQuantities` liefert Volumen, EPD liefert CO₂/m³), (3) Materialpass automatisch exportierbar als PDF + als maschinenlesbares JSON; der Workflow: IFC-Export → oneclick LCA / Tally → CO₂-Bericht; was heute noch fehlt: standardisierte EPD-ID in IFC (kein Pflicht-Pset dafür)

- **Quellen:** AtlasRecycling, NachhaltigeGT, EnergieAtlas

- **Normen:** DIN EN 15804 (EPD-Norm), ISO 14044 (LCA), EU-Taxonomie

- **Querverweise:** → Kap. 3 (Baustoffe und CO₂), Kap. 6 (GEG), Kap. 13 (PV), Kap. 26 (Zukunft Bauen)

---

### K24 — Sanierung

- **Status:** `Entwurf`
- **Zielwörter:** 2,800–3,400 ↑ (erhöht um 24.0 Bestandsmaßnahmen-Taxonomie)
- **Kernfragen:**
  - Was meint man mit „Sanierung" — und was ist der Unterschied zu Renovierung, Modernisierung, Umbau?
  - Was ist anders bei Bestandsgebäuden — welche Unbekannten gibt es?
  - Wie geht man typische Bauschäden an?
  - Was bedeutet Scan-to-BIM in der Praxis?

- **Pflichtabschnitte (H2):**
  - 24.0 Bestandsmaßnahmen — Begriffe präzise ⚠️ NEU — diese Unterscheidungen sind in der Praxis, im Recht und gegenüber Behörden zwingend; häufig verwechselt: | Begriff | Definition | Genehmigungspflicht | GEG-Relevanz | Mietrechtlich | | --- | --- | --- | --- | --- | | **Renovierung** | kosmetische Arbeiten (Streichen, Tapezieren, Bodenbelag) ohne Eingriff in Bausubstanz | nein | nein | keine Modernisierungsmieterhöhung | | **Reparatur / Instandhaltung** | laufende Pflege zur Erhaltung des Soll-Zustands (z. B. Heizungsservice, Dichtung erneuern) | nein | nein | Vermieterobliegenheit | | **Instandsetzung** | Wiederherstellung des ursprünglichen Zustands nach Schaden (z. B. Dachstuhlreparatur nach Sturmschaden) | ggf. (wenn Eingriff in Standsicherheit) | nein (kein Wärmedurchgang verändert) | nein | | **Modernisierung** | Verbesserung über ursprünglichen Zustand hinaus (Wärmedämmung, neue Heizung, Barrierefreiheit) | ggf. (Baugenehmigung bei Eingriff in Hülle oder TGA) | ja — wenn KG 300/400 > 10% des Gebäudewertes (§ 48 GEG Anstoßregelung) | ja — § 555b BGB: Duldungspflicht Mieter, Ankündigungsfrist 3 Monate (§ 555c), Mieterhöhung 8% der Modernisierungskosten (§ 559 BGB) | | **Sanierung** | umfassende Erneuerung mit Ziel Substanzerhalt + Qualitätsverbesserung; oft kombiniert Instandsetzung + Modernisierung + ggf. Umstrukturierung | ja (i. d. R. Baugenehmigung oder zumindest verfahrensfreie Kenntnisgabe) | ja — GEG-Anforderungen bei wesentlicher Änderung (§ 48: Bauteil mit > 10% Fläche erneuert) | i. d. R. ja, je nach Maßnahmenumfang | | **Umbau** | Eingriff in Grundriss, Tragstruktur oder Nutzung ohne zwingend Qualitätsverbesserung | ja (Baugenehmigung, oft Nachweispflicht Standsicherheit + Brandschutz) | ja, wenn Hüllfläche oder TGA berührt | ja (Nutzungsänderung kann Miete beeinflussen) | | **Anbau / Erweiterung** | Hinzufügen neuer Gebäudeteile (Aufstockung, seitlicher Anbau) | ja — Baugenehmigung wie Neubau, GRZ/GFZ-Prüfung | ja — neue Bauteile müssen GEG-Neubaustandard erfüllen | ja, wenn Wohnraum vergrößert | | **Abbruch** | vollständige oder teilweise Beseitigung | ja ab gewisser Größe (§ 58 MBO: genehmigungspflichtig); Ausnahmen in LBO | nein | Mieter haben Sonderkündigungsrecht | Praxis-Hinweis: in Ausschreibungen, Verträgen und Baugenehmigungsanträgen immer präzise Terminologie verwenden — „Sanierung" als Catch-All-Begriff führt zu Unklarheiten bei Umfang, Kosten und Genehmigungspflicht
  - 24.1 Baualtersphasen und typische Konstruktionen — Gründerzeit (1880–1920): Massivmauerwerk, Holzbalkendecken; Nachkrieg (1950er): Schwemmsteinmauerwerk, Betondecken ohne Dämmung; 1960–70er: Plattenbau, Montagebau; 1990er: erste Dämmung; was bedeutet das für die Sanierungsplanung
  - 24.2 Bestandsaufnahme — was man vorfindet vs. was im Plan steht (as-built vs. as-designed); typische Schocks: andere Deckenhöhen, Schächte falsch, Statik unbekannt; systematische Bestandsaufnahme
  - 24.3 Typische Bauschäden — Feuchtigkeit (aufsteigende, eindringende, kondensierende); Schimmel; Risse (statisch vs. nicht statisch); Schadstoffbelastung (Asbest bis 1993, PCB, Lindan); Schwermetalle in Farben
  - 24.4 Energetische Sanierung — Innendämmung vs. Außendämmung (Innendämmung: Taupunktproblem, sd-Wert, Phasenverschiebung); Fensteraustausch (Kältestrahlung altes Fenster → Schimmel an Laibung); Heizungstausch im Bestand; GEG-Anforderungen bei Sanierung (§48ff)
  - 24.5 Scan-to-BIM — Punktwolkenaufnahme (Laserscanner, 3–10 mm Genauigkeit); Punktwolke → BIM-Modell (manuell vs. KI-gestützt); as-built-Modell als Planungsgrundlage; Grenzen der Methode (Hohlräume, Bewehrung)

- **Einzuführende Begriffe:** `bestandsmassnahme`, `modernisierung-bgb`, `instandsetzung`, `instandhaltung`

- **Bilder (min. 3):**
  - `kap24_massnahmen_taxonomie` — Tabelle/Infografik, landscape ⚠️ NEU — alle 8 Bestandsmaßnahmen-Typen mit Farb-Kodierung nach Genehmigungspflicht (grün = genehmigungsfrei, gelb = ggf., rot = immer); Spalten: Begriff, Eingriff in Bausubstanz?, Genehmigung?, GEG?, Mietrecht?; weißer Hintergrund
  - `kap24_baualtersphasen` — Timeline-Infografik, landscape — 1880/1920/1950/1970/1990/2010 mit je typischem Wandaufbau und Schwachstellen, weißer Hintergrund
  - `kap24_scan_to_bim` — Prozessdiagramm, landscape — Laserscanner → Punktwolke → BIM-Modell in Phasen, mit Genauigkeitsangaben, weißer Hintergrund

- **Kastanienallee-Boxen:**
  - Keine K7-Box (Neubau) → stattdessen Vergleichsgebäude: Gründerzeithaus Nachbargrundstück mit Sanierungsszenario; Innendämmung-Problem konkret durchrechnen

- **BIM-Brücke:** Scan-to-BIM als BIM-Use-Case; Punktwolken in Revit/Archicad; as-built-Modell für FM → Kap. 22, 26

- **Quellen:** AtlasSanierung, Zürcher & Frank (Innendämmung), Stahr (Bausanierung — Bestandsmaßnahmen-Systematik)

- **Normen:** GEG §§ 48–52 (Anforderungen Bestand, Anstoßregelung), DIN 4108-3 (Innendämmung), BGB §§ 555b–555f (Modernisierungsankündigung, Duldungspflicht, Mieterhöhung), MBO § 58 (genehmigungspflichtiger Abbruch)

- **Querverweise:** → Kap. 5 (Konstruktionsaufbauten), Kap. 6 (Wärmeschutz), Kap. 7 (Feuchteschutz), Kap. 14 (Planungsrecht, Genehmigungsverfahren), Kap. 23 (Nachhaltigkeit Bestand), Kap. 25 (Projektarten, Bestand vs. Neubau)

---

### K25 — Projektarten: Neubau, Bestand, Denkmal

- **Status:** `Entwurf`
- **Zielwörter:** 2,000–2,500
- **Kernfragen:**
  - Was sind die grundlegenden Projektarten — und warum beeinflusst die Projektart jeden Schritt der Planung?
  - Welche Neubautypen gibt es, und wo unterscheiden sich Anforderungen und Prozesse?
  - Wie verändert „Bestand" den Planungsalltag gegenüber dem Neubau?
  - Was ist am Bauen im Denkmal so besonders — welche Regeln, welche Freiheiten?

- **Pflichtabschnitte (H2):**
  - 25.1 Projektarten als Rahmenbedingung — warum die Unterscheidung zuerst kommen muss: Neubau auf der grünen Wiese, Neubau im Bestandsquartier, Sanierung, Umbau, Aufstockung, Umnutzung, Abbruch und Neubau — jede Konstellation bringt andere Planungsstarts, andere Behördenanforderungen, andere Unbekannte; Konsequenz für BIM: ein as-built-Modell als Ausgangspunkt ist fundamental anders als ein Neubau-Modell von der leeren Seite

  - 25.2 Neubautypen im Überblick — Tabelle + Erklärungstext:
    | Neubautyp | Typische BGF | Gebäudeklasse | Besonderheiten Planung | BIM-Relevanz |
    | --- | --- | --- | --- | --- |
    | **EFH / Doppelhaus** | 100–300 m² | GK 1–2 | einfaches Genehmigungsverfahren, oft Freistellung möglich; Architekt häufig als Generalplaner; wenig Fachplaner | BIM selten Pflicht; Archicad-Einzelnutzung typisch |
    | **MFH (Geschosswohnungsbau)** | 800–4.000 m² | GK 3–4 (ab 4 Geschosse GK 4) | Aufzugspflicht ab GK 4; TGA komplex (KWL, Hydraulik je Wohnung); Stellplatznachweis; Wirtschaftlichkeitsdruck (€/m² Wohnfläche) | BIM zunehmend Standard ab ca. 10 WE |
    | **Gewerbe / Büro** | 1.000–20.000 m² | GK 3–5 | Nutzungsflexibilität als Entwurfsziel; Kühllasten (Server, Menschen); andere Nutzlasten als Wohnen; LEED/DGNB häufig | BIM oft vertraglich gefordert |
    | **Industrie / Logistik** | 2.000–50.000 m² | GK 1–3 (Hallentyp) | Lastannahmen bis 50 kN/m²; Brandschutz nach Lagergut; ELT-Ausstattung (Produktionslasten); Stahlbau dominiert | BIM + FM-Integration |
    | **Sonderbau** | variabel | GK 5 oder Sondergesetz | Schulen, Krankenhäuser, Parkhäuser: je eigene Richtlinien (z. B. MSchulBauR, KrankenhausBauVO); intensiver Behördendialog | BIM fast immer Pflicht bei öffentlichem Auftraggeber |
    | **Modulbau / serieller Wohnungsbau** | ab 500 m² | GK 2–4 | Vorfertigung ganzer Raummodule im Werk; Planungsgenauigkeit ±1 mm; Typengenehmigung vereinfacht Folgebauten | BIM zentral: Modell = Fertigungsplanung |
    Für das Kastanienallee-7-Beispiel: MFH, GK 4, 12 WE — alle charakteristischen Merkmale des Typs präsent

  - 25.3 Neubau vs. Bestand: der fundamentale Unterschied — Neubau: leere Seite, vollständige Kontrolle über Geometrie, Konstruktion, Materialien; Planung kann vollständig durchgearbeitet werden bevor erster Spatenstich; Bestand: immer Unbekannte — Geometrie (Bestandspläne unzuverlässig), Konstruktion (statische Tragfähigkeit unklar), Schadstoffe (Asbest, PCB, PAK), Baurecht (Bestandsschutz vs. aktuelle Anforderungen); Konsequenz: Bestandsplanung hat immer einen Puffer für Überraschungen einzuplanen (Zeit + Kosten); Bestandsschutz nach BauGB: bestehende Gebäude, die nicht mehr genehmigungsfähig wären, dürfen im Bestand erhalten werden — erlischt bei wesentlicher Änderung; Konsequenz für Umbau: was zählt als wesentliche Änderung (Nutzungsänderung, Flächenvergrößerung, konstruktive Eingriffe)?

  - 25.4 Denkmalpflege als Sonderfall — wann ist ein Gebäude ein Denkmal: Eintrag in Denkmalliste der Unteren Denkmalschutzbehörde (je Bundesland: BayDSchG, DSchG NRW usw.); Unterschied Einzeldenkmal vs. Ensemble; was ist erlaubt: Erhaltungsgebot (keine Zerstörung, keine wesentliche Beeinträchtigung des Erscheinungsbilds); was ist genehmigungspflichtig: jeder Eingriff, der das Erscheinungsbild oder die Substanz verändert — Fensterwechsel, Fassadenanstrich, Dachausbau; Denkmalschutzbehörde als zusätzlicher Genehmigungsträger neben der Baugenehmigungsbehörde; Energetische Anforderungen bei Denkmälern: GEG § 105 (Befreiung möglich, wenn Anforderungen technisch oder wirtschaftlich nicht zumutbar); Förderprogramme: KfW Denkmal (Sonderkonditionen), Steuerabschreibung nach § 7i EStG; Planungsbesonderheiten: Bestandsdokumentation besonders wichtig (Bauhistorische Untersuchung, Schadenskartierung); Material- und Technikentscheidungen müssen mit Behörde abgestimmt sein; was BIM hier bedeutet: as-existing-Modell als Denkmalmodell; Farbgebung, Materialität und Reversibilität von Maßnahmen wichtig

- **Einzuführende Begriffe:** `bestandsschutz`, `denkmalschutz`, `sonderbau`, `modulbau`, `ensemble-denkmal`

- **Bilder (min. 3):**
  - `kap25_projektarten_uebersicht` — Infografik/Matrix, landscape — sechs Neubautypen + Bestand + Denkmal als Kacheln mit Piktogramm, GK-Angabe, Planungskomplexität als Balken; weißer Hintergrund
  - `kap25_neubautypen_matrix` — Matrix, landscape — sechs Neubautypen nach Planungsaufwand und Wiederholungsgrad; BIM-Reife als Balken; weißer Hintergrund
  - `kap25_neubau_vs_bestand` — Flussdiagramm, landscape — Planungsablauf Neubau (linearer Pfad) vs. Bestand (iterativer Pfad mit Rückkopplungsschleifen: Bestandsaufnahme → Überraschung → Anpassung Konzept); weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 25.2: K7 als MFH GK 4 — warum dieser Typ für das Buch gewählt: alle relevanten Planungs- und BIM-Themen kommen vor; Vergleich: was wäre bei EFH anders (kein Aufzug, kein Brandschutzkonzept GK 4, kein Projektsteuerer), was bei Sonderbau (zusätzliche Sonderbaurichtlinien, komplexere Behördenkoordination)

- **BIM-Brücke:** `IfcBuilding.OccupancyType` (Nutzungsart), `IfcSite` (Grundstück und Lage); Neubau = Modell aus dem Nichts; Bestand = as-built-Modell als Ausgangspunkt (→ Kap. 24 Scan-to-BIM); Denkmal = besondere Anforderungen an Detailtreue und Revisionsfähigkeit; öffentlicher Auftraggeber + Sonderbau → BIM-Pflicht nach Stufenplan; → Kap. 18, 24

- **Quellen:** Stahr (Bausanierung), Meisel/Langer (Denkmal und Energie), Kochendörfer/Liebchen/Viering (Projektarten und -strukturen)

- **Normen:** GEG § 105 (Denkmal), BayDSchG Art. 6 (Erlaubnispflicht), BauGB § 35/§ 34 (Bestandsschutz im Außen-/Innenbereich), MBO Anlagen 2/3 (Sonderbauten)

- **Querverweise:** → Kap. 1 (Schichtenmodell und Gebäudetypen), Kap. 14 (Planungsrecht, Genehmigungsverfahren), Kap. 15 (HOAI — Prozessunterschiede je Projekttyp), Kap. 24 (Sanierung, Bestandsmaßnahmen)

---

### K26 — Digitaler Zwilling & KI

- **Status:** `Entwurf`
- **Zielwörter:** 1,200–1,800 ↓↓ — bewusst kurz gehalten; in 2 Jahren schon veraltet; besser ehrlich und knapp als ambitioniert und falsch; siehe OE-07
- **⚠️ Scope-Warnung:** Kein vollständiges Kapitel über KI schreiben — das Thema dreht sich zu schnell. Stattdessen: was heute (2026) produktionsreif ist, was Hype ist, und wo die echten Lücken im BIM-Ökosystem liegen. Kein Futurismus.
- **Kernfragen:**
  - Was unterscheidet einen Digitalen Zwilling vom BIM-Modell — konkret, nicht theoretisch?
  - Was funktioniert von KI im Bauwesen heute wirklich (nicht: was wird versprochen)?
  - Wo sind die echten Lücken, die neue Software schließen kann?

- **Pflichtabschnitte (H2):**
  - 26.1 Digitaler Zwilling: Was heute wirklich funktioniert — Definition: BIM + Echtzeit-Sensorik + bidirektionale Kopplung; ehrliche Bestandsaufnahme: Infrastruktur (Brücken, Tunnel) schon produktionsreif; Hochbau: Insellösungen (Energiemonitoring, Aufzugswartung), aber kein echter Zwilling; was fehlt: durchgängige Datenpipeline von Sensor bis Modell; **Datenpipeline-Architektur skizzieren** (für IT-Zielgruppe wertvoll, kurz halten): typischer Stack: Sensor (MQTT / OPC-UA / Modbus) → Edge-Gateway → Zeitreihendatenbank (InfluxDB, TimescaleDB) → API (REST/GraphQL) → BIM-Viewer/Dashboard; das technische Kernproblem benennen: IFC ist ein statisches Snapshot-Format, kein Live-Datenmodell; bestehende Ansätze zur Kopplung: Property-Update via CDE-API, buildingSMART-Streaming-Prototypen (Forschungsphase), Asset-Information-Model nach ISO 19650-3; ohne Datenpipeline-Verständnis bleibt „Digitaler Zwilling" für IT-Leser eine Marketingfloskel
  - 26.2 KI im Bauwesen: Realitätscheck — was funktioniert heute: Bildanalyse auf Baustelle (Fortschritt, Sicherheit), Kostenprognose aus Vergleichsdaten, automatische Kollisionsprüfung; was ist Hype: vollautomatische Grundrissgenerierung, "natürlichsprachliche BIM-Abfrage" (rudimentär); was fehlt noch: semantisch korrekte IFC-Ausgabe, durchgehende Code-Compliance-Prüfung
  - 26.3 Wo neue Software den Unterschied macht — die echten Lücken: kein gutes offenes Authoring-Tool, IFC-Export-Qualität chronisch schlecht, LCA-Integration fehlt, Planungsrecht-Prüfung manuell; wer diese Lücken schließt, hat einen Markt

- **Einzuführende Begriffe:** — (keine neuen Terms)

- **Bilder (min. 2):**
  - `kap26_digitaler_zwilling` — Systemdiagramm, landscape — BIM-Modell + Sensor-Datenstrom + Analyse-Layer, Rückkopplungspfeile, Gebäudeschnitt K7 als Basis; was heute funktioniert (grün) vs. was noch fehlt (gestrichelt); weißer Hintergrund
  - `kap26_ki_reifegrad` — Reifegrad-Matrix, landscape — KI-Anwendungen im Bauwesen: x-Achse Reifegrad heute, y-Achse Potenzial; Blasen je Anwendungsfall; ehrlich, keine Marketing-Folie; weißer Hintergrund

- **Kastanienallee-Boxen:**
  - nach 26.1: K7 im Betrieb — Sensorik (Raumklima, Energiezähler) → Dashboard → automatische Wartungsplanung; was heute schon machbar ist

- **BIM-Brücke:** Digitaler Zwilling als Evolution des BIM-Modells; IFC als Backbone; Smart-Building-Schnittstellen (REST APIs, MQTT); → Kap. 13 (Gebäudeautomation), Kap. 22

- **Quellen:** Ridder (Kap. Zukunft), ISO 19650 (Asset Information)

- **Normen:** ISO 23247 (Digital Twin Manufacturing — als Referenz), EU BIM-Mandate

- **Querverweise:** → Kap. 13 (Gebäudeautomation), Kap. 18 (BIM-Grundlagen), Kap. 22 (Software), Kap. 23 (Nachhaltigkeit und Sensorik)

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
| OE-02 | Kap. 24 (Sanierung) hat kein Kastanienallee-7-Beispiel (Neubau). Nachbarsgebäude als Dummy oder ganz ohne K7-Box? | Kap. 24 | Nachbarsgebäude-Dummy (Gründerzeit) |
| OE-03 | Sollen Kap. 3–5 (Baukörper) einen gemeinsamen Einstiegs-Interlude bekommen ("Warum Teil II so aufgebaut ist")? | Teil II | Ja, 1 Absatz als Teil-Intro im Kapitel 3 |
| OE-04 | Wie tief soll Kap. 26 auf bim-ai eingehen — Produkt erwähnen oder generisch bleiben? | Kap. 26 | Generisch; Produktnamen vermeiden |
| OE-05 | Formelsammlung: sollen Formeln aus Kapiteln automatisch dort auftauchen, oder manuell gepflegt? | Alle | Manuell — Automatisierung zu fehleranfällig |
| OE-06 | "Pläne lesen" (Grundriss/Schnitt/Ansicht/Detail): als eigenes Mini-Kapitel 2a oder als Block 2.0 in Kap. 2? | Kap. 2 | Block 2.0 in Kap. 2 — eigenes Kapitel übertreibt |
| OE-07 | Kap. 26 eigenständig oder als Ausblick-Abschnitt am Ende von Kap. 22 integrieren? | Kap. 22 + 26 | Eigenständig lassen, aber kürzer (→ 1,200–1,800 W) |
| OE-08 | Holzbau: eigenes Kapitel 5a (zwischen Kap. 5 und 6) oder stark ausgebauter Abschnitt 5.6 in Kap. 5? | Kap. 5 | Abschnitt 5.6 — eigenes Kapitel sprengt die Struktur |
| OE-09 | Innenausbau (Trockenbau-Systemwände, Deckenraster, Unterdecken, Bodenbeläge über Estrich) als eigener Abschnitt 5.7 in Kap. 5 oder in Kap. 16 (Ausschreibung)? Relevant für LOD 300–400 und 5D-BIM. | Kap. 5, 16 | Noch offen — bisher fehlt Trockenbau komplett im Tracker |
| OE-10 | Stellplatznachweis und Außenanlagen (Versickerung, Pkw-Zufahrtsquerschnitt, Stellplatzsatzung Bayern) als Ergänzung in Kap. 2.1 oder Kap. 14.5? K7 mit GRZ 0,6 braucht Vollständigkeit für die Genehmigungsfähigkeit. | Kap. 2, 14 | Noch offen — K7 ohne Stellplatznachweis ist formal unvollständig |
| OE-11 | K17: Bauprojektmanagement als eigenständiges Kapitel oder als ausgebaute LP-8-Sektion in K15.2? Eigenständiges Kapitel gibt dem Thema Raum (Netzplan, Nachtragsmanagement, Dokumentation), fragmentiert aber Teil V auf 4 Kapitel. | Kap. 15, 17 | Entscheidung: Eigenes Kapitel K17 — LP 8 + Terminplanung + Dokumentation trägt 2.500+ Wörter; K15.2 verweist knapp auf K17 |
| OE-12 | K25: Projektarten-Kapitel am Ende von Teil VII (nach K24) oder als Rahmungskapitel früher im Buch (z. B. nach K01 als K01a)? Im jetzigen Aufbau fehlt dem Leser die Einordnung am Anfang, dass das Buch auf den Typus MFH fokussiert. | Kap. 1, 25 | Entscheidung: K25 bleibt Teil VII als Vertiefung; K01 erklärt jetzt kurz, warum K7 als MFH-Leitbeispiel gewählt ist und verweist auf K25 |
| OE-13 | Architekt als Problemlöser früh oder erst im HOAI-Prozess erklären? | Kap. 2, 15 | Entscheidung: Früh in K02. K15 bleibt Prozess-/Leistungsphasen-Kapitel und verweist zurück |
| OE-14 | Standortanalyse als eigener Block oder in Planungsrecht/Entwurf verstreuen? | Kap. 2 | Entscheidung: K02.1 als eigener methodischer Block, weil Ort und Problemraum vor der Form kommen |
| OE-15 | Varianten, Skizzen und Diagramme als Randthema oder als Kern des frühen Entwurfs? | Kap. 2 | Entscheidung: K02.2 als Pflichtabschnitt mit Variantenlogik, Diagrammen und Kriterienmatrix |
| OE-16 | Bauantrag abstrakt halten oder konkrete Unterlagen und BIM-to-Permit erklären? | Kap. 14 | Entscheidung: K14.3/K14.4 konkretisieren Bauantragspaket, Genehmigungsreife und digitale Grenzen |
| OE-17 | Vergabe nur als VOB/LV erklären oder reale Vergabepraxis ergänzen? | Kap. 16 | Entscheidung: K16.3 ergänzt Firmenfindung, Preisspiegel, Bietergespräch, Zuschlagsentscheidung und Vergabestrukturen |
| OE-18 | Reicht die 26-/31-Kapitel-Struktur für ein praktikumsnahes Prozessverständnis? | Gesamtstruktur | Entscheidung: Nein. Maßgeblich ist Zielstruktur 41 Kapitel mit eigener Vorentwurfs-, Genehmigungs-, Vergabe-, Bauausführungs- und Übergabe-Spange |
| OE-19 | Problemraum als Abschnitt in K02 oder eigenes Kapitel? | neu K03 | Entscheidung: Eigenes Kapitel. Briefing, Raumprogramm, Budget, Stakeholder und Zielkonflikte tragen 5.000–6.500 Wörter |
| OE-20 | Standortanalyse, Grobskizzen und Varianten als Abschnitt oder eigenes Kapitel? | neu K05 | Entscheidung: Eigenes Kapitel mit Bildstrecke; Skizzen sind das zentrale Kommunikationsmittel des frühen Entwurfs |
| OE-21 | Ausführungsplanung in HOAI-Kapitel belassen oder eigenes Kapitel? | neu K21 | Entscheidung: Eigenes Kapitel. LP 5/Bauunterlagen sind der Übergang vom Entwurfsmodell zur Baustelle |
| OE-22 | Bauantrag als Planungsrechtsabschnitt oder eigenes tiefes Genehmigungskapitel? | neu K18 | Entscheidung: Planungsrecht bleibt dort, aber K18 wird auf 5.500–7.000 Wörter erweitert und erklärt das konkrete Bauantragspaket |
| OE-23 | Ausschreibung und Vergabe zusammen oder trennen? | neu K24, K25 | Entscheidung: Trennen. K24 = LV/STLB/GAEB; K25 = Bieterkommunikation, Preisspiegel, Vergabevermerk |
| OE-24 | Terminplanung in Bauoberleitung belassen oder eigenes Kapitel? | neu K27 | Entscheidung: Eigenes Kapitel. Gantt, Netzplan, Taktplanung, Last Planner und Baustellenlogistik brauchen gemeinsame Erklärung vor LP 8 |
| OE-25 | Bauoberleitung weiterhin Termin/Kosten mittragen lassen oder auf Kontrolle/Mängel/Abnahme fokussieren? | neu K29 | Entscheidung: K29 fokussiert Baukontrolle, Fotos, Bautagebuch, BCF/Mängel und Nachkontrolle |
| OE-26 | Machbarkeit/Due Diligence als Teil von Problemraum oder eigene Kapitel? | neu K02, K04 | Entscheidung: Trennen. K02 = Projektstart/Machbarkeit; K04 = Grundstück/Due Diligence |
| OE-27 | Fachplanerkoordination in Ausführungsplanung integrieren oder eigenes Kapitel? | neu K20 | Entscheidung: Eigenes Kapitel, weil Planlauf, Durchbrüche, Kollisionen, Prüfstatus und CDE-Workflow Kernpraxis sind |
| OE-28 | Werkplanung/Bemusterung in LP 5 integrieren oder eigenes Kapitel? | neu K22 | Entscheidung: Eigenes Kapitel, weil Unternehmerplanung und Freigaben in der Praxis ein eigener Verantwortungsbereich sind |
| OE-29 | Nachträge bei Bauoberleitung oder bei Verträgen erklären? | neu K26 | Entscheidung: Eigenes Vertrags-/Nachtragskapitel vor der Bauausführung; Baustelle verweist darauf zurück |
| OE-30 | Baustellenvorbereitung als Teil von Terminplanung oder eigenes Kapitel? | neu K28 | Entscheidung: Eigenes Kapitel mit SiGeKo, Baustelleneinrichtung, Verkehrssicherung, Bauwasser/-strom und Nachbarschaft |
| OE-31 | Aufmaß/Rechnungsprüfung in Bauoberleitung integrieren oder eigenes Kapitel? | neu K30 | Entscheidung: Eigenes Kapitel, weil Kostenkontrolle während LP 8 eigene Dokumente und Prüfpflichten hat |
| OE-32 | Inbetriebnahme/Übergabe als Abnahmeabschnitt oder eigenes Kapitel? | neu K31 | Entscheidung: Eigenes Kapitel, weil TGA-Prüfungen, Revisionsunterlagen, Einweisung und Betreiberübergabe sonst zu kurz bleiben |
| OE-33 | Gewährleistung/Objektbetreuung im Ausblick oder eigenes Kapitel? | neu K32 | Entscheidung: Eigenes Kapitel als Brücke von LP 9 zu As-built, FM und Digitalem Zwilling |
| OE-34 | Bürorealität als eigenes Kapitel oder Querschnitt? | alle Prozesskapitel | Entscheidung: Querschnittspflicht in K02–K32: Planlisten, CDE-Status, Protokolle, Freigaben, Entscheidungslog und typische Fehler müssen jeweils konkret vorkommen |
