# Kapitel 25 – Projektarten: Neubau, Bestand, Denkmal

*Teil VII – Nachhaltigkeit*

---

Das Buch folgt einem Mehrfamilienhaus-Neubau, weil daran viele Grundfragen sichtbar werden. Trotzdem ist Bauen nicht nur Neubau. Ein Einfamilienhaus, eine Schule, eine Aufstockung, ein Umbau im Bestand und ein Denkmal beginnen mit anderen Risiken, anderen Behörden und anderen Daten.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Projektarten als frühe Planungsentscheidung einordnen
    - typische Neubautypen und ihre Planungslogik unterscheiden
    - Neubau, Bestand und Denkmal fachlich abgrenzen

## 25.1 Projektart als Rahmenbedingung

Bevor der erste Strich gesetzt wird, muss klar sein, welche Art von Projekt vorliegt. Die Projektart bestimmt nicht nur die Form des Gebäudes, sondern die Planungsstrategie. Ein Neubau auf freiem Grundstück beginnt mit Baurecht, Raumprogramm und Varianten. Ein Neubau im Bestandsquartier beginnt zusätzlich mit Nachbarschaft, Baulückenlogik, Erschließung und Baustellenlogistik. Eine Sanierung beginnt mit Aufmaß, Befund und Unsicherheit.

Typische Projektarten sind Neubau auf freiem Grundstück, Neubau im Bestandsquartier, Sanierung, Umbau, Aufstockung, Umnutzung sowie Abbruch und Neubau. Kap. 24.0 trennt die Begriffe für Bestandsmaßnahmen. Diese Unterscheidung ist nicht akademisch. Sie entscheidet über Genehmigungsweg, Kostenreserve, Vertragsstruktur, Fachgutachten, Bauablauf und Kommunikationsaufwand.

Auch die Vertragsstruktur hängt daran. Ein kleiner Neubau kann mit Einzelgewerken oder einem Generalunternehmer funktionieren. Ein komplexer Sonderbau braucht häufig frühe Fachplaner, besondere Gutachten, Projektsteuerung und klare Freigabeprozesse. Ein Umbau im bewohnten Bestand braucht Etappierung, Staubschutz, provisorische Versorgung, Nutzerkommunikation und mehr Dokumentation. Wer die Projektart zu spät klärt, plant oft mit dem falschen Prozess.

Für ::BIM:: ist der Unterschied noch deutlicher. Beim Neubau entsteht das Modell aus der Planung. Beim Bestand muss zuerst ein as-built- oder as-existing-Modell erzeugt werden, oft über Aufmaß, Punktwolke und ::Scan-to-BIM::. Beim Denkmal reicht einfache Geometrie nicht aus; Material, Oberfläche, historische Substanz und Reversibilität werden zu Modellanforderungen. Stahrs Bausanierung zeigt diesen Grundsatz aus der Bestandsperspektive: Der vorhandene Bau ist keine leere Unterlage, sondern die erste Planungsquelle.[^bausanierung-stahr]

<!-- IMAGE
name: kap25_projektarten_uebersicht
type: infographic
size: landscape
desc: Infografik acht Projektarten als Kacheln-Grid: EFH, MFH, Gewerbe, Industrie, Sonderbau, Modulbau, Bestand, Denkmal; je Kachel Piktogramm und drei Kurzmerkmale; Farbkodierung nach Komplexität; weißer Hintergrund.
caption: Die Projektart setzt den Rahmen für Planung, Genehmigung und BIM-Strategie
tags: projektarten, neubau, bestand, denkmal, sonderbau
-->
![Projektarten im Überblick](../assets/illustrations/kap25_projektarten_uebersicht.png)

## 25.2 Neubautypen im Überblick

Auch innerhalb des Neubaus unterscheiden sich Projekte stark. Ein Einfamilienhaus ist meist überschaubar, mit wenigen Fachplanern und direkter Bauherrenkommunikation. Ein Geschosswohnungsbau ist stärker wirtschaftlich getrieben und technisch dichter. Ein Krankenhaus oder eine Schule ist ein Sonderbau mit eigenem Regelwerk und intensivem Behördendialog.

| Typ | Typische BGF | Gebäudeklasse | Planungs-Besonderheiten | BIM-Einsatz heute |
|---|---:|---|---|---|
| EFH / Doppelhaus | 100-300 m² | GK 1-2 | Oft Freistellung vom Baugenehmigungsverfahren möglich; Architekt häufig Generalplaner; wenige Fachplaner | selten Pflicht, meist Einzelnutzer-Tool |
| MFH / Geschosswohnungsbau | 800-4.000 m² | GK 3-4 | Aufzugspflicht ab GK 4, TGA-Koordination, Stellplatznachweis, Wirtschaftlichkeitsdruck in €/m² Wohnfläche | zunehmend Standard ab etwa 10 Wohneinheiten |
| Gewerbe / Büro | 1.000-20.000 m² | GK 3-5 | Nutzungsflexibilität, Kühllasten, höhere Nutzlasten, LEED/DGNB häufig vertraglich gefordert | oft Auftraggeber-Pflicht |
| Industrie / Logistik | 2.000-50.000 m² | GK 1-3 | hohe Nutzlasten, Brandschutz nach Lagergut, Sprinkler, Stahlbau, kurze Bauzeit | BIM und FM-Integration verbreitet |
| Sonderbau | variabel | GK 5 oder Sondergesetz | Schulen, Krankenhäuser, Versammlungsstätten; zusätzliche Richtlinien und Gutachten | bei öffentlichen Auftraggebern häufig Pflicht |
| Modulbau / serieller Wohnungsbau | ab 500 m² | GK 2-4 | Vorfertigung ganzer Raummodule, geringe Toleranzen, Typengenehmigung möglich | zwingend, weil Modell Fertigungsplanung wird |

<!-- IMAGE
name: kap25_neubautypen_matrix
type: infographic
size: landscape
desc: Matrix der sechs Neubautypen EFH, MFH, Büro, Industrie, Sonderbau, Modulbau; Achsen Planungsaufwand und Wiederholungsgrad; kleine Icons, typische BGF und BIM-Reife als Balken; weißer Hintergrund.
caption: Neubautypen unterscheiden sich nach Größe, Wiederholung und Koordinationsaufwand
tags: neubau, gebaeudetyp, mfh, modulbau
-->
![Matrix der Neubautypen](../assets/illustrations/kap25_neubautypen_matrix.png)

Der **::Sonderbau::** ist keine Stilrichtung, sondern eine bauordnungsrechtliche Kategorie. Hohe Personenzahlen, besondere Nutzung, Größe oder Gefährdung können zusätzliche Anforderungen auslösen. **::Modulbau::** funktioniert anders: Er verlagert Arbeit ins Werk. Dadurch steigen frühe Planungsgenauigkeit und Datenqualität, weil jede spätere Änderung viele Module, Transportmaße und Anschlüsse betrifft.

Die BGF-Spannen in der Tabelle sind keine harten Grenzen, sondern Größenordnungen. Sie helfen, die wirtschaftliche Logik zu verstehen. Beim EFH entscheidet oft der einzelne Bauherr direkt über Komfort, Kosten und Gestaltung. Beim MFH zählt zusätzlich Vermietbarkeit, Wohnflächenquote, Wiederholbarkeit der Grundrisse und Betriebskosten. Beim Büro geht es um flexible Flächen, Ausbauraster und spätere Mieterwechsel. In der Logistikhalle dominieren Spannweite, Bodenplatte, Brandschutz und Andienung. Dieselbe BIM-Software kann all diese Typen modellieren, aber die Informationsanforderungen sind völlig verschieden.

Auch die Rolle des Architekten verschiebt sich. Im EFH ist er oft Übersetzer zwischen Bauherr, Handwerkern und Genehmigung. Im MFH wird er stärker Koordinator von Fachplanern, Kosten und Wohnflächen. Im Gewerbe- und Industriebau steht die Nutzungslogik des Betreibers im Vordergrund. Im Sonderbau muss er Anforderungen vieler Nutzergruppen und Behörden zusammenführen. Im Modulbau wird er früher Teil einer Fertigungslogik, in der Details nicht erst auf der Baustelle gelöst werden dürfen.

!!! kastanienallee "Kastanienallee 7"
    K7 ist ein Mehrfamilienhaus der ::Gebäudeklasse:: 4 mit 12 Wohneinheiten, vier Vollgeschossen, Stahlbeton-Skelett, Fernwärme, KWL, PV, Vierspänner und Aufzug. Genau deshalb eignet sich dieser Typ als Leitbeispiel: Aufzugspflicht, Brandschutz GK 4, TGA-Koordination, Wirtschaftlichkeit, LP 8 und BIM kommen alle vor. Ein EFH hätte keinen Aufzug, meist einfachere Genehmigung und weniger Fachplaner. Ein Sonderbau hätte zusätzliche Richtlinien, Brandschutzgutachter, intensivere Behördenrunden und oft eine strengere BIM-Pflicht.

## 25.3 Neubau vs. Bestand: der fundamentale Unterschied

Neubau ist planerisch näher an einer leeren Seite. Geometrie, Konstruktion, Material, Installationswege und Details können vor Baubeginn durchgearbeitet werden. Natürlich gibt es auch im Neubau Überraschungen, etwa Baugrund, Marktpreise oder Lieferzeiten. Aber das Grundprinzip bleibt: Das Gebäude entsteht aus der Planung.

Bestand beginnt umgekehrt. Das Gebäude ist schon da, aber nicht vollständig bekannt. Geometrie kann von alten Plänen abweichen. Tragende Wände können dort stehen, wo niemand sie erwartet. Deckenaufbauten, Schächte, Schadstoffe und Feuchte sind oft verborgen. Asbest in Platten, Spachtelmassen oder Dichtungen, PCB in Fugen oder Farben, PAK in Teeranstrichen und Schwermetalle in Altanstrichen können Planung und Baustelle stark verändern.

<!-- IMAGE
name: kap25_neubau_vs_bestand
type: diagram
size: landscape
desc: Flussdiagramm: links linearer Planungsablauf Neubau Konzept -> LP1 -> LP2 -> LP3 -> LP4 -> LP5 -> LP8; rechts iterativer Pfad Bestand Bestandsaufnahme -> Überraschung -> Konzeptanpassung -> erneute Prüfung -> Ausführung; Rückkopplungspfeile markiert; weißer Hintergrund.
caption: Neubau plant vorwärts, Bestand plant iterativ mit Befunden
tags: neubau, bestand, planungsprozess, scan-to-bim
-->
![Neubau und Bestand im Planungsprozess](../assets/illustrations/kap25_neubau_vs_bestand.png)

Deshalb braucht Bestand mehr Reserve. Bei einfachen Neubauten werden oft 5 bis 10 % Risikobudget angesetzt. Im Bestand sind 15 bis 20 % realistischer, wenn Konstruktion, Schadstoffe oder Nutzung nicht vollständig geklärt sind. Auch Zeitpuffer sind nötig: Bauteilöffnungen, Gutachten, Nachplanung und zusätzliche Behördenabstimmung lassen sich nicht beliebig verdichten.

Der **::Bestandsschutz::** schützt rechtmäßig errichtete Gebäude, auch wenn sie heutigen Regeln teilweise nicht mehr entsprechen. Ein Gebäude kann zu nah an der Grenze stehen, eine zu hohe GRZ haben oder alte Bauteile besitzen, ohne dass sofort alles angepasst werden muss. Dieser Schutz ist aber nicht grenzenlos. Nutzungsänderung, wesentliche konstruktive Änderung, größere Flächenerweiterung oder weitgehender Abbruch können ihn ganz oder teilweise entfallen lassen. Was "wesentlich" ist, hängt vom konkreten Landesrecht, vom Eingriff und vom Risiko ab.

Für Planer bedeutet das: Bestand wird nicht nur konstruktiv untersucht, sondern rechtlich gelesen. Welche Nutzung ist genehmigt? Welche Bauteile sind geschützt? Welche Eingriffe lösen heutige Anforderungen aus? Welche Maßnahmen bleiben Instandsetzung, welche werden Modernisierung oder Umbau? Diese Fragen entscheiden, ob ein Projekt kalkulierbar bleibt.

Für Softwareentwickler ist dieser Unterschied besonders relevant. Ein Neubau-Modell kann viele Regeln aus geplanten Objekten ableiten: Geschosse, Räume, Bauteile, Flächen, Materialien. Ein Bestandsmodell braucht zusätzlich Quellenstatus: gemessen, aus Plan übernommen, geöffnet, vermutet oder noch zu prüfen. Ohne diesen Status wirkt ein Bestandsmodell genauso sicher wie ein Neubau-Modell, obwohl es fachlich unsicherer ist. Gute Werkzeuge behandeln Unsicherheit deshalb als Datenfeld, nicht als Kommentar.

## 25.4 Denkmalpflege als Sonderfall

**::Denkmalschutz::** beginnt nicht mit persönlichem Geschmack. Ein Gebäude ist Denkmal, wenn es nach Landesrecht als solches erfasst ist, meist über die Denkmalliste und die Untere Denkmalschutzbehörde. Jedes Bundesland hat ein eigenes Denkmalschutzgesetz, in Bayern etwa das BayDSchG. Ein Einzeldenkmal schützt das Objekt selbst. Ein **::Ensemble-Denkmal::** schützt den Zusammenhang, also Straßenbild, Platzraum oder historische Gruppe, auch wenn einzelne Gebäude für sich weniger bedeutend erscheinen.

Das Grundprinzip ist Erhaltung. Historische Substanz und Erscheinungsbild dürfen nicht zerstört oder wesentlich beeinträchtigt werden. Erlaubnispflichtig ist deshalb praktisch jeder Eingriff, der Substanz oder Erscheinung verändert: Fensterwechsel, Fassadenanstrich, Dachausbau, neue Gauben, Leitungsführung durch Stuckdecken, Heizkörper vor historischen Wandflächen oder Außendämmung vor einer Klinkerfassade. Die Denkmalbehörde wird zusätzlicher Genehmigungsträger neben der Bauaufsicht. Das verlängert Abstimmungszyklen und verlangt frühere Bemusterung.

Energetische Anforderungen werden im Denkmal anders abgewogen. § 105 ::GEG:: ermöglicht Ausnahmen, wenn Anforderungen die Substanz oder das Erscheinungsbild beeinträchtigen oder wirtschaftlich nicht vertretbar sind. Das bedeutet nicht, dass Denkmäler energetisch ignoriert werden. Es bedeutet, dass Lösungen wie Innendämmung, Kastenfenster, reversible Technikführung oder begrenzte Dämmmaßnahmen sorgfältig abgestimmt werden. *Denkmal und Energie* zeigt genau diesen Konflikt: Energieeffizienz, Nutzerkomfort und Substanzerhalt müssen zusammen geplant werden.[^denkmal-und-energie]

Förderung und Steuerrecht können die Wirtschaftlichkeit verändern. KfW-Denkmalprogramme haben eigene Anforderungen, und § 7i EStG erlaubt unter bestimmten Voraussetzungen erhöhte Abschreibungen für denkmalgerechte Herstellungskosten. Diese Vorteile ersetzen aber keine Planung; sie verlangen abgestimmte Nachweise und Bescheinigungen.

Für BIM ist Denkmal anspruchsvoll. Ein einfaches Volumenmodell reicht selten. Ein as-existing-Modell kann hohe Detailtreue für historische Bauteile brauchen, etwa profilierte Gesimse, Fensterteilungen, Gewölbe oder Oberflächen. Farbgebung, Material, Schadenskartierung und Reversibilität neuer Eingriffe sollten als Informationen am Modell geführt werden. Der Wert liegt weniger in automatischer Perfektion als in nachvollziehbarer Dokumentation: Was ist historisch, was neu, was reversibel, was geschützt?

Die Denkmalplanung beginnt deshalb meist vor der üblichen Entwurfsroutine mit bauhistorischer Untersuchung, Fotodokumentation, Befundkartierung und Abstimmung der Schutzziele. Erst danach wird entschieden, welche Eingriffe möglich sind. Eine Innendämmung kann energetisch sinnvoll sein, aber historische Oberflächen gefährden. Ein Aufzug kann Barrierefreiheit verbessern, aber Raumgefüge und Substanz verändern. Denkmalpflege ist damit kein pauschales Verbot, sondern eine Abwägung mit enger Dokumentationspflicht.

Das erklärt auch, warum Projektarten nicht erst am Ende dieses Buchs wichtig sind. Das Leitbeispiel K7 ist bewusst normal genug, um Grundlagen zu lernen, und komplex genug, um Schnittstellen sichtbar zu machen. Wer danach ein Denkmal, eine Schule oder eine Aufstockung plant, muss die im Buch gelernten Prinzipien nicht verwerfen. Er muss sie mit anderen Randbedingungen starten.

Für die Praxis heißt das: Am Anfang eines Projekts gehört eine kurze Projektarten-Notiz in die Grundlagenermittlung. Sie benennt Typ, Nutzung, Bestandssituation, Sonderbau- oder Denkmalrisiken, vermutete Genehmigungswege und die Datenbasis. Diese eine Seite verhindert später viele falsche Annahmen.

Sie ist außerdem ein guter Einstieg für BIM-Anforderungen: Wird neu modelliert, gescannt, kartiert, klassifiziert oder für den Betrieb übergeben? Die Projektart beantwortet diese Frage nicht vollständig, aber sie setzt die richtige Richtung.

Ohne diese Richtung werden Datenanforderungen schnell zu generisch und schwer prüfbar und kaum projektbezogen.

Projektart ist deshalb ein Datenfilter für den Projektstart und die spätere fachliche, rechtliche Prüfung.

## BIM-Brücke: Projektart als Datenanforderung

Die Projektart sollte im Modell nicht nur im Projektnamen stehen. `IfcBuilding.OccupancyType` kann Nutzungsarten abbilden, `IfcSite` Grundstück und Lage. Beim Neubau beginnt das Modell als Planungsmodell. Im Bestand wird ein as-built-Modell zur Grundlage. Beim Denkmal kommen Detailtiefe, Befundstatus und Reversibilität hinzu. Öffentliche Auftraggeber und Sonderbauten verlangen häufig früh klare Informationsanforderungen, weil Prüfung, Betrieb und Dokumentation stärker formalisiert sind.

## Normen und Grundlagen

§§ 34 und 35 BauGB helfen bei der Einordnung von Innen- und Außenbereich und damit auch beim Bestandsschutz und Neubau im Kontext.

Die ::MBO:: und Landesbauordnungen definieren Gebäudeklassen, Sonderbauten, Abbruch- und Genehmigungspflichten. Für K7 sind GK 4, Aufzug und Brandschutz wesentlich.

Das BayDSchG, insbesondere Art. 6, steht beispielhaft für die denkmalschutzrechtliche Erlaubnispflicht. Je Bundesland gilt das jeweilige Landesrecht.

§ 105 ::GEG:: ermöglicht Ausnahmen für Baudenkmäler und sonstige besonders erhaltenswerte Bausubstanz, wenn energetische Anforderungen mit Substanzschutz oder Wirtschaftlichkeit kollidieren.

## Zusammenfassung

**Die Projektart entscheidet, welche Risiken ein Projekt zuerst klären muss.**

Neubau, Bestand und Denkmal unterscheiden sich nicht nur in der Gestaltung, sondern in Datenlage, Genehmigung, Kostenreserve, Vertragsstruktur und BIM-Anforderungen. Das Leitbeispiel K7 ist bewusst ein MFH-Neubau, weil es viele Regelthemen bündelt; andere Projektarten verlangen andere Starts.

Verwandte Kapitel: [Kap. 1](/chapters/01-architektur-als-system) · [Kap. 14](/chapters/14-planungsrecht) · [Kap. 15](/chapters/15-hoai) · [Kap. 24](/chapters/24-sanierung)

[^bausanierung-stahr]: Stahr (Hrsg.): *Bausanierung*, 4. Auflage.
[^denkmal-und-energie]: Weller & Scheuring (Hrsg.): *Denkmal und Energie 2021*.
