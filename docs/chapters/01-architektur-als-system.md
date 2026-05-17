# Kapitel 1 – Architektur als System

*Teil I – Fundament*

---

Wer ein Gründerzeithaus aufmerksam betrachtet, stellt fest: Die Grundmauern und Decken stehen seit 120 Jahren. Die Fenster wurden in den 1990ern ausgetauscht. Die Heizungsanlage wurde schon dreimal erneuert. Die Küche sieht aus wie 2019. Vier verschiedene Zeitrhythmen — in einem einzigen Gebäude.

Das ist kein Zufall. Es ist die grundlegende Eigenschaft jedes gebauten Werks: Ein Gebäude besteht aus Teilen, die sich mit unterschiedlicher Geschwindigkeit verändern. Wer das versteht, plant besser.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - das Schichtenmodell benennen und auf jedes Gebäude anwenden
    - erklären, warum Entscheidungen in einer Schicht immer andere Schichten beeinflussen
    - die Kastanienallee 7 als Leitbeispiel des Buches einordnen

---

## 1.1 Das Schichtenmodell

Das **::Schichtenmodell::**, entwickelt vom britischen Planer Frank Duffy und später vom Autor Stewart Brand in *How Buildings Learn* (1994) verbreitet, unterteilt jedes Gebäude in vier Schichten — geordnet nach ihrer typischen Lebensdauer:

**Tragstruktur — 80 bis 150 Jahre.** Fundamente, Stützen, Deckenplatten, tragende Wände. Diese Schicht gibt dem Gebäude seine geometrische Grundform und ist de facto unveränderlich. Wer eine tragende Wand versetzen will, braucht einen Statiker und eine Baugenehmigung.

**Gebäudehülle — 30 bis 50 Jahre.** Außenwände, Dach, Fenster, Außentüren. Die Hülle schützt vor Witterung und regelt, was zwischen innen und außen ausgetauscht wird: Wärme, Feuchtigkeit, Schall. Sie wird im Lauf eines Gebäudelebens mindestens einmal komplett erneuert, ohne dass die Tragstruktur angetastet wird.

**Technische Gebäudeausrüstung — 15 bis 25 Jahre.** Heizung, Lüftung, Sanitär, Elektro — alles, was das Gebäude am Leben hält. Diese Systeme werden unter dem Begriff **Technische Gebäudeausrüstung** (::TGA::) zusammengefasst. Sie sind die kurzlebigste Schicht: Heizkessel werden nach 20 Jahren ersetzt, Rohrleitungen nach 40. Der wichtigste Planungsgrundsatz folgt daraus: ::TGA::-Bauteile dürfen nicht fest einbetoniert sein. Zugänglichkeit und Austauschbarkeit sind keine Option, sondern Pflicht.

**Innenausbau — 5 bis 15 Jahre.** Nichttragende Trennwände, Bodenbeläge, Deckenverkleidungen, Oberflächen, Einbauten. Der Innenausbau ist die anpassungsfähigste Schicht — er folgt den Nutzern und verändert sich mit jedem Mieterwechsel und jeder Nutzungsänderung.

<!-- IMAGE
name: kap01_schichtenmodell
type: isometric
size: landscape
desc: Isometrische Explosionsdarstellung eines viergeschossigen Mehrfamilienhauses (Kastanienallee 7).
  Vier vertikal übereinander-explodierte Schichten, jede farblich kodiert:
  (1) Tragstruktur ganz unten — Stahlbeton-Skelettrahmen mit Stützen auf 6x6 m Raster,
  Fundamentplatte, Deckenplatten in grauer Diagonalschraffur. Label "Tragstruktur · 80–150 Jahre".
  (2) Gebäudehülle — Außenwandplatten mit angedeuteter Dämmschicht (hellblau), extensiv
  begrüntes Flachdach (grüne Fläche oben). Label "Gebäudehülle · 30–50 Jahre".
  (3) TGA — schematische Rohrleitungen (rot für Heizung, blau für Sanitär), Lüftungskanäle
  (grau-oval), Elektrokabeltrassen (gelb), schwebend innerhalb des Skeletts.
  Label "TGA · 15–25 Jahre".
  (4) Innenausbau ganz oben — nichttragende Trockenbau-Trennwände (dünn, hellgrau), angedeutete
  Bodenbeläge und Einbauten. Label "Innenausbau · 5–15 Jahre".
  Jede Schicht hat eine kleine Lebensdauer-Angabe als Label rechts. Weißer Hintergrund,
  technisch-clean, Beschriftungen auf Deutsch, ohne Personen.
caption: Das Schichtenmodell — vier Schichten, vier Zeitrhythmen
tags: schichtenmodell, tragstruktur, gebaeudehuelle, tga, innenausbau, kastanienallee7
-->
![Das Schichtenmodell: vier Schichten der Kastanienallee 7](../assets/illustrations/kap01_schichtenmodell.png)

!!! kastanienallee "Kastanienallee 7"
    Das Gebäude folgt dem Schichtenmodell in Reinform:

    **Tragstruktur:** Stahlbeton-Skelettrahmen mit 6,0 × 6,0 m Stützenraster, Fundamentplatte, vier
    Deckenplatten über Vollgeschoss — geplant für 100 Jahre Standzeit.

    **Gebäudehülle:** Gedämmte Außenwände, extensiv begrüntes Flachdach mit Photovoltaik-Anlage.
    Typische Erneuerungsintervalle: Dachabdichtung nach 30 Jahren, Fassade nach 40 Jahren.

    **TGA:** Fernwärme-Übergabestation, Fußbodenheizung in jedem Geschoss, dezentrale Lüftung je
    Wohnung, 12 Wohnungszähler — alle Systeme in Schächten und abgehängten Decken geführt,
    zugänglich ohne Eingriff in die Tragstruktur.

    **Innenausbau:** Trockenbau-Trennwände, Parkettböden, Einbauküchen. Der erste Mieterwechsel
    wird wahrscheinlich eine neue Küche und einen neuen Bodenbelag bedeuten.

---

## 1.2 Warum die Schichten nicht unabhängig voneinander sind

Das ::Schichtenmodell:: klingt zunächst wie ein Ordnungsschema — in der Praxis ist es ein Denkwerkzeug. Denn die vier Schichten sind nicht isoliert: Eine Entscheidung in einer Schicht erzwingt immer Konsequenzen in anderen.

Ein einfaches Beispiel: Der Architekt der Kastanienallee 7 entscheidet sich für Fußbodenheizung statt Heizkörpern. Diese eine Entscheidung in der ::TGA::-Schicht zieht Folgen nach sich:

- Die Estrichdicke nimmt um 10 bis 12 cm zu. Das verändert die Aufbauhöhe des gesamten Fußbodens — vier Geschosse mal 12 cm sind fast 50 cm, die irgendwo herkommen müssen. Das muss die **Tragstruktur** früh wissen.
- Fußbodenheizung arbeitet mit niedrigen Vorlauftemperaturen. Damit sie den Raum ausreichend beheizt, muss die **Gebäudehülle** gut dämmen. Das eine setzt das andere voraus.
- Im **Innenausbau** darf der Estrich nachträglich weder gedämmt noch durchbohrt werden, ohne das Heizsystem zu beschädigen.

Diese Abhängigkeiten existieren in jedem Gebäude, bei jeder Entscheidung. Sie lassen sich nicht wegplanen — aber sie lassen sich erkennen und koordinieren. Genau dafür ist das ::Schichtenmodell:: das richtige Werkzeug: Es macht sichtbar, welche Schicht von einer Entscheidung betroffen ist.

!!! tip "Praxistipp"
    In der frühen Entwurfsphase hilft es, bei jeder größeren Entscheidung explizit zu fragen:
    *Welche anderen Schichten sind betroffen?* Diese Frage verhindert die häufigsten
    Koordinationsfehler zwischen Tragwerksplanung, Haustechnik und Architektur.

---

## 1.3 Was das für dieses Buch bedeutet

Dieses Buch ist nach der Logik des ::Schichtenmodells:: aufgebaut — von der Materie zur Methode:

**Teil I – Fundament** (Kapitel 1–2): Das Systemdenken und der Entwurf. Wo wir jetzt sind.

**Teil II – Baukörper** ([Kapitel 3–5](/chapters/03-baustoffe)): Baustoffe, Tragwerk, Konstruktion — die Tragstruktur und ihre Hülle im Detail.

**Teil III – Bauphysik** ([Kapitel 6–9](/chapters/06-waermeschutz-geg)): Wärme, Feuchtigkeit, Schall, Feuer — die physikalischen Gesetze, denen kein Bauteil entkommt.

**Teil IV – TGA** ([Kapitel 10–13](/chapters/10-heizung-waermeversorgung)): Heizung, Lüftung, Sanitär, Elektro.

**Teil V – Recht & Prozess** ([Kapitel 14–16](/chapters/14-planungsrecht)): Planungsrecht, Honorar, Kosten.

**Teil VI – BIM** ([Kapitel 17–21](/chapters/17-was-bim-wirklich-ist)): Wie das digitale Modell all das zusammenhält.

**Teil VII – Nachhaltigkeit** ([Kapitel 22–24](/chapters/22-nachhaltigkeit)): Kreislaufwirtschaft, Sanierung, Ausblick.

Alle Kapitel nutzen dasselbe Gebäude — die Kastanienallee 7. Was hier als Konzept beginnt, wird in [Kapitel 4](/chapters/04-tragwerk) als Lastpfad berechnet, in [Kapitel 10](/chapters/10-heizung-waermeversorgung) als Heizungssystem dimensioniert und in [Kapitel 18](/chapters/18-ifc) als digitales Modell beschrieben.

---

## Zusammenfassung

**Ein Gebäude ist kein monolithisches Objekt, sondern ein System aus vier Schichten mit unterschiedlicher Lebensdauer.** Das ::Schichtenmodell:: — Tragstruktur, Gebäudehülle, ::TGA::, Innenausbau — macht sichtbar, welche Teile eines Gebäudes in welchem Rhythmus erneuert werden und wie Entscheidungen in einer Schicht andere Schichten beeinflussen.

Tragwerk und Konstruktion im Detail: [Kapitel 4](/chapters/04-tragwerk) · [Kapitel 5](/chapters/05-konstruktion) · TGA-Systeme: [Kapitel 10](/chapters/10-heizung-waermeversorgung)–[13](/chapters/13-elektro) · Leitbeispiel: [Kastanienallee 7](/appendix/kastanienallee7)
