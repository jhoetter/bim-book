# Kapitel 1 – Architektur als System

*Teil I – Fundament*

---

Ein Gebäude ist kein Objekt. Es ist ein System — zusammengesetzt aus Materialien, Konstruktionen, technischen Anlagen, räumlichen Beziehungen und Informationen, die über Jahrzehnte ineinandergreifen.

Wer Architektur verstehen will, muss dieses System verstehen: wie seine Teile zusammenwirken, welche Abhängigkeiten zwischen ihnen bestehen, und warum eine Entscheidung in einem Teilbereich unweigerlich Konsequenzen für alle anderen hat. Genau das ist das Ziel dieses Buches.

---

## 1.1 Drei Jahrtausende in einem Satz

Der römische Ingenieur und Architekt Marcus Vitruvius Pollio formulierte im ersten Jahrhundert v. Chr. drei Anforderungen, die jedes gute Gebäude erfüllen muss:

> *Firmitas, Utilitas, Venustas* — Standfestigkeit, Nützlichkeit, Schönheit.

Zwei Jahrtausende Architekturgeschichte haben an dieser Formel nichts Wesentliches geändert. Was sich geändert hat: die Komplexität der Antworten.

**Firmitas** meint heute nicht mehr nur das Ausharren unter Wind und Schnee. Es umfasst Erdbebensicherheit, Brandwiderstand, Schallschutz, Feuchteschutz — ein ganzes Regelwerk aus Normen und Nachweisen, das wir in den Teilen II und III dieses Buches durcharbeiten.

**Utilitas** hat sich von der schlichten Frage nach Tür und Fenster zu einer Wissenschaft der Grundrissoptimierung, Barrierefreiheit, Raumakustik und Tageslichtversorgung entwickelt. Was [Kapitel 2](/chapters/02-entwurf-raum-funktion) beginnt, zieht sich durch das gesamte Buch.

**Venustas** ist das Unberechenbarste — und bleibt es. Dieses Buch handelt von allem, was sich berechnen und normieren lässt. Das Ästhetische ist die Voraussetzung, die man mitbringt.

---

## 1.2 Das Schichtenmodell

Das wirkmächtigste Konzept für das Verständnis von Gebäuden als Systeme ist das **::Schichtenmodell::**. Es geht auf den britischen Architekten und Planer Frank Duffy zurück, der in den 1970er Jahren erkannte, dass ein Gebäude keine monolithische Einheit ist, sondern aus Schichten besteht, die mit sehr unterschiedlicher Geschwindigkeit veralten und ersetzt werden.

Der amerikanische Autor Stewart Brand hat dieses Konzept 1994 in *How Buildings Learn* popularisiert. Für die Praxis des Hochbaus sind vier Schichten entscheidend:

### Schicht 1 — Tragstruktur (80 bis 200 Jahre)

Fundamente, Stützen, Deckenplatten, tragende Wände. Diese Schicht bestimmt die geometrische Grundform des Gebäudes und ist de facto unveränderlich. Wer Wände versetzt oder Decken durchbricht, greift in das statische System ein — ein Eingriff, der immer rechnerisch nachgewiesen und baurechtlich genehmigt werden muss.

Bei der Kastanienallee 7 ist das der Stahlbeton-Skelettrahmen mit einem 6,0 × 6,0 m Stützenraster, der die Lasten über vier Vollgeschosse in die Fundamentplatte ableitet. Die Bemessung folgt dem **::Eurocode::**, der europäischen Normenreihe für Tragwerksplanung.

### Schicht 2 — Gebäudehülle (30 bis 50 Jahre)

Außenwände, Dach, Fenster, Außentüren. Die Hülle trennt innen von außen, schützt vor Witterung und reguliert den Wärme-, Feuchte- und Schallaustausch. Ihre Lebensdauer ist kürzer als die der Tragstruktur: Fassaden werden gedämmt, Fenster getauscht, Dächer neu abgedichtet — ohne dass das Tragwerk angetastet wird.

Bei der Kastanienallee 7 besteht die Hülle aus dem **Wärmedämmverbundsystem** (::WDVS::) an den Außenwänden — 160 mm **::Mineralwolle::**, Wärmeleitfähigkeitsgruppe (::WLG::) 035 — und einer extensiv begrünten Flachdachkonstruktion mit Photovoltaik-Anlage.

### Schicht 3 — Technische Gebäudeausrüstung (15 bis 25 Jahre)

Die **Technische Gebäudeausrüstung** (::TGA::) umfasst alle haustechnischen Systeme: Heizung, Lüftung, Sanitär, Elektro und Gebäudeautomation. Sie ist die lebenserhaltende Infrastruktur des Gebäudes — und die kurzlebigste der vier Schichten.

Heizkessel, Pumpen und Regelgeräte haben typische Standzeiten von 15 bis 20 Jahren. Rohrleitungen und Kabeltrassen halten länger, aber auch sie werden im Laufe eines Gebäudelebens mindestens einmal vollständig erneuert. Der wichtigste Planungsgrundsatz folgt daraus: Die ::TGA:: darf nie in der Tragstruktur einbetoniert werden. Zugänglichkeit und Austauschbarkeit sind Pflicht.

Bei der Kastanienallee 7 liefert Fernwärme die thermische Energie. Die Verteilung erfolgt über Steigestränge und eine Fußbodenheizung in jedem Geschoss. Lüftung und Elektro sind in abgehängten Decken und Installationsschächten geführt.

### Schicht 4 — Innenausbau (5 bis 15 Jahre)

Nichttragende Trennwände, Bodenbeläge, Deckenverkleidungen, Einbauten, Oberflächen. Der Innenausbau ist die anpassungsfähigste Schicht: Sie folgt den Nutzungsanforderungen, ändert sich bei jedem Mieterwechsel und wird in der Sanierung zuerst erneuert.

Der Entwurf muss die spätere Änderbarkeit des Innenausbaus ermöglichen, ohne in die Tragstruktur oder die laufende ::TGA:: eingreifen zu müssen.

!!! note "Schichtenmodell ≠ Wandschichtaufbau"
    Das Schichtenmodell beschreibt Gebäudeebenen mit unterschiedlicher Lebensdauer — nicht den materialspezifischen Schichtaufbau einer Wand oder eines Dachs. Den lernen Sie in [Kapitel 5](/chapters/05-konstruktion).

<!-- IMAGE
name: kap01_schichtenmodell
type: isometric
size: landscape
desc: Isometrische Explosionsdarstellung eines viergeschossigen Mehrfamilienhauses (Kastanienallee 7).
  Vier vertikal übereinander-explodierte Schichten, farblich kodiert mit Beschriftungen:
  (1) Tragstruktur unten — Stahlbeton-Skelettrahmen mit Stützen auf 6x6 m Raster, Fundamentplatte,
  Deckenplatten in Diagonalschraffur grau; Lebensdauer-Label "80–200 Jahre";
  (2) Gebäudehülle — Außenwand-WDVS-Platten hellblau, extensiv begrüntes Flachdach grün;
  Lebensdauer-Label "30–50 Jahre";
  (3) TGA — schematische Rohrleitungen rot (Heizung), blau (Sanitär), grau (Lüftung), gelbe Kabeltrassen,
  alle innerhalb des Skeletts schwebend; Lebensdauer-Label "15–25 Jahre";
  (4) Innenausbau oben — nichttragende Trockenbau-Trennwände, Bodenbeläge, Einbauten, hellgrau;
  Lebensdauer-Label "5–15 Jahre".
  Legende rechts mit deutschen Schichtbezeichnungen. Weißer Hintergrund, technisch-clean, ohne Personen.
caption: Das Schichtenmodell der Kastanienallee 7 — vier Schichten mit unterschiedlicher Lebensdauer
tags: schichtenmodell, tragstruktur, gebaeudehuelle, tga, innenausbau, kastanienallee7, lebensdauer
-->
![Schichtenmodell: vier Schichten der Kastanienallee 7](../assets/illustrations/kap01_schichtenmodell.png)

---

## 1.3 Kastanienallee 7 — Ein System im Überblick

Das Leitbeispiel dieses Buches ist ein typisches Mehrfamilienhaus in einer bayerischen Mittelstadt: **Kastanienallee 7**, vier Vollgeschosse plus Keller und Dachgeschoss, zwölf Wohneinheiten, rund 1.800 m² Bruttogrundfläche.

Die vollständigen Kenndaten finden sich im Anhang unter [Kastanienallee 7](/appendix/kastanienallee7). Hier eine erste Einordnung nach dem ::Schichtenmodell:::

| Schicht | Realisierung Kastanienallee 7 | Typ. Lebensdauer |
|---|---|---|
| Tragstruktur | Stahlbeton-Skelett, 6 × 6 m Stützenraster | 80–150 Jahre |
| Gebäudehülle | ::WDVS:: (::Mineralwolle:: 160 mm), Flachdach + PV | 30–50 Jahre |
| ::TGA:: | Fernwärme, Fußbodenheizung, Wohnraumlüftung | 15–25 Jahre |
| Innenausbau | Trockenbau-Trennwände, Parkettböden, Einbauten | 10–20 Jahre |

Der **::U-Wert::** der Außenwand beträgt 0,19 W/(m²K) — das entspricht den Anforderungen des **Gebäudeenergiegesetzes** (::GEG::). Die ::Mineralwolle:: der Klasse ::WLG:: 035 leistet dabei den Löwenanteil der Dämmwirkung. Was diese Kennwerte bedeuten und wie sie berechnet werden, ist Thema von [Kapitel 6](/chapters/06-waermeschutz-geg).

Das Gebäude ist bewusst typisch gewählt: keine Besonderheiten, kein Sonderbau, keine Ausnahmen. Die Kastanienallee 7 könnte in Ansbach, Rosenheim oder Landshut stehen — und steht damit für tausende Neubauten, die jedes Jahr in deutschen Mittelstädten entstehen.

---

## 1.4 Systemdenken: Warum eine Entscheidung alles verändert

Das ::Schichtenmodell:: ist mehr als ein Ordnungsschema — es ist ein Denkwerkzeug. Es zeigt, dass Entscheidungen in einer Schicht immer Konsequenzen für andere Schichten haben.

Ein konkretes Beispiel aus der Kastanienallee 7: Die Entscheidung, Fußbodenheizung statt Heizkörpern zu verwenden, betrifft alle vier Schichten.

**Tragstruktur:** Der Fußbodenaufbau wird um 10–12 cm dicker. Bei vier Vollgeschossen bedeutet das eine Mehrbelastung der Deckenplatten von rund 1,5 kN/m², die der Tragwerksplaner früh kennen muss.

**Hülle:** Fußbodenheizung arbeitet mit niedrigen Vorlauftemperaturen (35–45 °C). Das macht hohe Dämmstandards erst wirtschaftlich: Ein schlecht gedämmtes Gebäude kann von der Fußbodenheizung nicht ausreichend beheizt werden.

**::TGA:::** Die Heizkreisverteilung, die Pumpenauslegung und der Hydraulische Abgleich folgen anderen Regeln als bei Heizkörpern. Schächte und Unterverteilungen müssen früh im Grundriss eingeplant werden.

**Innenausbau:** Der Estrich wird Teil des Wärmeabgabesystems und darf im Nachhinein nicht gedämmt oder durchbohrt werden — ein Planungshinweis, der bis zur Möblierung relevant bleibt.

**Daraus folgt:** Gute Planung ist immer Systemplanung. Wer nur eine Schicht betrachtet, plant das Falsche. Dieses Buch gibt die Werkzeuge, um alle vier Schichten gleichzeitig im Blick zu behalten.

!!! tip "Praxistipp"
    In der frühen Entwurfsphase lohnt es sich, für jede größere Entwurfsentscheidung explizit zu prüfen: Welche anderen Schichten sind betroffen? Diese Frage verhindert die häufigsten Koordinationsfehler zwischen Architekt, Tragwerksplaner und TGA-Fachplaner.

---

## 1.5 Wie dieses Buch aufgebaut ist

Die Struktur des Buches folgt dem ::Schichtenmodell:: — von der Materie zur Methode, vom Stoff zur digitalen Repräsentation:

**Teil I — Fundament** (Kapitel 1–2): Systemverständnis, Raum und Entwurf.

**Teil II — Baukörper** ([Kapitel 3](/chapters/03-baustoffe)–[5](/chapters/05-konstruktion)): Baustoffe, Tragwerk und Konstruktion.

**Teil III — Bauphysik** ([Kapitel 6](/chapters/06-waermeschutz-geg)–[9](/chapters/09-brandschutz)): Wärmeschutz, Feuchteschutz, Schallschutz, Brandschutz.

**Teil IV — TGA** ([Kapitel 10](/chapters/10-heizung-waermeversorgung)–[13](/chapters/13-elektro)): Heizung, Lüftung, Sanitär, Elektro.

**Teil V — Recht & Prozess** ([Kapitel 14](/chapters/14-planungsrecht)–[16](/chapters/16-kosten-ausschreibung)): Planungsrecht, HOAI, Kosten und Ausschreibung.

**Teil VI — BIM** ([Kapitel 17](/chapters/17-was-bim-wirklich-ist)–[21](/chapters/21-bim-praxis)): Was BIM wirklich ist, IFC, Klassifikation, Kollaboration.

**Teil VII — Nachhaltigkeit** ([Kapitel 22](/chapters/22-nachhaltigkeit)–[24](/chapters/24-digitaler-zwilling-ki)): Kreislaufwirtschaft, Sanierung, Digitaler Zwilling.

Alle Kapitel nutzen dasselbe Gebäude als Beispiel. Was in Kapitel 2 als Grundriss beginnt, wird in [Kapitel 6](/chapters/06-waermeschutz-geg) als energetisches Modell weitergedacht und in [Kapitel 18](/chapters/18-ifc) als IFC-Datei vollständig beschrieben.

---

## Zusammenfassung

**Ein Gebäude ist ein System aus vier Schichten mit unterschiedlicher Lebensdauer.** Das ::Schichtenmodell:: — Tragstruktur, Gebäudehülle, ::TGA::, Innenausbau — beschreibt, wie Entscheidungen in einer Schicht alle anderen beeinflussen. Gute Planung beginnt mit diesem Systemverständnis und setzt es in jeder Planungsphase konsequent fort.

Tragwerkssysteme im Detail: [Kapitel 4](/chapters/04-tragwerk) · Konstruktiver Aufbau: [Kapitel 5](/chapters/05-konstruktion) · Wärmeschutz der Hülle: [Kapitel 6](/chapters/06-waermeschutz-geg) · TGA-Systeme: [Kapitel 10](/chapters/10-heizung-waermeversorgung)–[13](/chapters/13-elektro)
