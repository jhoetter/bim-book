# Kapitel 8 – Tragwerk: Lasten, Kräfte, Systeme

*Teil II – Baukörper*

---

Ein Raum kann leicht wirken, obwohl über ihm mehrere Geschosse stehen. Diese Leichtigkeit ist geplant: Jede Last sucht einen Weg nach unten, über Decken, Wände, Stützen und Fundamente. Wenn dieser Weg nicht stimmt, wird Architektur gefährlich.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - Lastwege vom Dach bis ins Fundament beschreiben
    - Eigengewicht, Nutzlast, Wind und Schnee als unterschiedliche Lastarten einordnen
    - eine überschlägige Stützenlast im Mehrfamilienhaus berechnen

## 8.1 Das Prinzip der Lastabtragung

Ein Tragwerk beantwortet eine einfache Frage: Wo gehen die Kräfte hin? Jede Decke trägt ihr eigenes Gewicht, den Bodenaufbau, Menschen, Möbel und Trennwände. Diese Lasten wandern zu Wänden, Stützen oder Unterzügen. Von dort gehen sie weiter in Fundamente und schließlich in den Boden. Kein Bauteil darf in dieser Kette fehlen.

Eigengewicht ist ständig vorhanden. Eine Stahlbetondecke mit 22 cm Dicke wiegt grob 0,22 m × 25 kN/m³ = 5,5 kN/m². Nutzlasten kommen aus der Nutzung: Wohnen, Büro, Versammlung, Lager. Wind und Schnee wirken nicht ständig, müssen aber nachgewiesen werden. In der Praxis werden diese Einwirkungen zu einem **::Lastfall::** kombiniert, also zu einer definierten Belastungssituation für den Nachweis.

Ein einfacher Balken zeigt das Prinzip. Die Last drückt nach unten, die Auflager drücken nach oben, im Balken entstehen Biegung und Querkraft. Unten entstehen Zugspannungen, oben Druckspannungen. Deshalb liegt die Bewehrung einer Stahlbetondecke oft dort, wo Zug entsteht. Tragwerk ist keine Magie, sondern ein kontrollierter Kraftweg.

<!-- IMAGE
name: kap04_lastabtragung
type: diagram
size: portrait
desc: Schnittdiagramm eines viergeschossigen Mehrfamilienhauses mit Lastpfeilen vom Dach über Decken, Stützen und aussteifenden Kern bis zum Fundament. Lastgrößen in kN und kN/m2 beispielhaft beschriftet, Eigengewicht und Nutzlast farblich unterschieden. Weißer Hintergrund, technische Linien, keine Personen.
caption: Jede Last braucht einen durchgehenden Weg bis in den Baugrund
tags: tragwerk, lastabtragung, stützen, fundament
-->
![Lastabtragung im Gebäude](../assets/illustrations/kap04_lastabtragung.png)

## 8.2 Lastarten im Überblick

Ständige Lasten sind dauerhaft vorhanden. Dazu gehören Eigengewicht von Decken, Wänden, Dachaufbau, Estrich, Belägen und fest eingebauten Anlagen. Sie sind meist gut abschätzbar, weil Material und Geometrie bekannt sind. Fehler bei ständigen Lasten entstehen eher durch vergessene Aufbauten: schwere Dachbegrünung, hohe Estrichdicken, massive Trennwände oder technische Anlagen.

Veränderliche Lasten hängen von der Nutzung ab. Wohnungen werden im Eurocode typischerweise mit 2,0 kN/m² Nutzlast angesetzt, Büroflächen mit 3,0 bis 5,0 kN/m² je nach Kategorie. Eine Tiefgarage, ein Archiv oder ein Technikraum kann deutlich höhere Lasten erzeugen. Der ::Eurocode:: arbeitet mit charakteristischen Werten und Sicherheitsbeiwerten; der Entwurf braucht zuerst ein Gefühl für Größenordnungen.

Windlasten wirken horizontal. Sie werden über Fassade, Decken als Scheiben, Wände und Kerne in den Baugrund geleitet. Schneelasten wirken auf Dächer und hängen von Standort, Höhe und Dachform ab. Erdbeben ist in Deutschland regional relevant, aber im normalen Wohnungsbau meist weniger bestimmend als Wind, Schnee und Nutzlasten. Entscheidend ist: Nicht jede Last geht senkrecht nach unten. Ein Gebäude muss auch ausgesteift sein.

## 8.3 Durchgerechnetes Beispiel: Last am Fundament

Ein Stützenfeld von 6,0 m × 6,0 m trägt eine Deckenfläche von 36 m². Für eine überschlägige Rechnung setzen wir Eigengewicht inklusive Deckenaufbau mit 5,0 kN/m² an und Nutzlast Wohnen mit 2,0 kN/m². Summe je Geschoss: 36 m² × (5,0 + 2,0) kN/m² = 252 kN.

Bei vier Vollgeschossen ergibt sich: 252 kN × 4 = 1.008 kN. Dazu kommen Dachlasten, Fassadenanteile, Stützengewicht, eventuell Schnee und Sicherheitszuschläge. Als Größenordnung liegt die Last am unteren Ende einer Stütze also bei etwa 1.100 kN. Das entspricht grob der Gewichtskraft von mehr als 100 Tonnen.

Diese Zahl soll keine Statik ersetzen. Sie gibt aber ein Gefühl dafür, warum Fundamente, Stützen und Baugrund ernst genommen werden. Eine Stütze von 30 cm × 30 cm sieht im Grundriss klein aus, sammelt aber Lasten aus mehreren Geschossen. Eine falsch gesetzte Öffnung oder ein später entfernte Wand ist deshalb kein kosmetischer Eingriff.

!!! kastanienallee "Kastanienallee 7"
    Für ein typisches Stützenfeld gilt: Fläche = 6,0 m × 6,0 m = 36 m². Last je Geschoss = 36 m² × 7,0 kN/m² = 252 kN. Vier Vollgeschosse: 4 × 252 kN = 1.008 kN. Mit Dachanteil und Stützengewicht wird überschlägig mit rund 1.100 kN je Innenstütze im unteren Geschoss gerechnet. Die Last wird über Stützen, Kellerdecke und Bodenplatte in den Baugrund geleitet; der Treppenhauskern übernimmt zusätzlich Aussteifung gegen horizontale Lasten.

## 8.4 Tragsysteme im Vergleich

Massivbau mit tragenden Wänden ist wirtschaftlich und robust. Wände tragen Lasten flächig ab, Decken spannen von Wand zu Wand. Das System passt gut zu wiederholten Wohnungsgrundrissen, ist aber weniger flexibel, wenn Räume später zusammengelegt oder verändert werden sollen.

Skelettbau arbeitet mit Stützen, Trägern und Decken. Nichttragende Wände können freier gesetzt werden. Das System eignet sich für Büros, Gewerbe und Wohnungsbau mit flexibleren Grundrissen. Es verlangt aber sorgfältige Aussteifung, meistens über Kerne, Wandscheiben oder Verbände.

Holztafelbau ist leicht, schnell und hoch vorfertigbar. Er funktioniert gut im Wohnungsbau, auch mehrgeschossig, braucht aber saubere Feuchte-, Brand- und Schallschutzplanung. Hybridkonstruktionen kombinieren Materialien: etwa Betonkerne mit Holzdecken oder Stahlträger mit Holzmodulen.

| System | Typische Spannweite | Flexibilität | Kosten-Tendenz | Geeignet für |
|---|---:|---|---|---|
| Tragende Wände | 4-6 m | gering bis mittel | günstig | Wohnungsbau mit Wiederholung |
| Skelettbau | 6-9 m | hoch | mittel | Wohnen, Büro, Gewerbe |
| Holztafelbau | 4-6 m | mittel | abhängig von Vorfertigung | serieller Wohnungsbau |
| Hybridbau | 6-12 m | hoch | höher, aber optimierbar | Aufstockung, Sonderbauten |

<!-- IMAGE
name: kap04_tragsysteme
type: isometric
size: landscape
desc: Drei Baukörper nebeneinander als isometrische technische Darstellung: Massivbau mit tragenden Wänden, Skelettbau mit Stützen und Unterzügen, Holztafelbau mit Wandtafeln. Tragelemente farblich markiert, nichttragende Elemente hellgrau, kurze deutsche Labels für Spannweite und Flexibilität. Weißer Hintergrund, keine Personen.
caption: Tragsysteme verteilen Lasten auf unterschiedliche Weise
tags: massivbau, skelettbau, holztafelbau, tragsystem
-->
![Tragsysteme im Vergleich](../assets/illustrations/kap04_tragsysteme.png)

## 8.5 Bauteile und ihre Aufgabe

Fundamente verteilen Lasten in den Boden. Einzelfundamente liegen unter Stützen, Streifenfundamente unter Wänden, Plattenfundamente unter ganzen Gebäuden. Pfahlgründungen werden nötig, wenn tragfähiger Boden erst in größerer Tiefe liegt. Der Baugrund ist dabei Teil des Tragwerks; ohne Baugrundgutachten bleibt die Lastabtragung unvollständig.

Stützen tragen Druck und können knicken. Je schlanker eine Stütze ist, desto stärker wird Knicken zum Thema. Wände tragen Lasten flächig und können gleichzeitig aussteifen. Decken tragen Flächenlasten, verteilen horizontale Kräfte und trennen Brandabschnitte. Träger überbrücken Öffnungen und sammeln Lasten aus Decken oder Wänden.

Deckensysteme unterscheiden sich in Spannweite, Eigengewicht, Installationsfreiheit und Bauzeit. Flachdecken sind einfach und ermöglichen flexible Grundrisse. Rippendecken sparen Material, haben aber komplexere Schalung. Hohldielen sind vorgefertigt und schnell, aber weniger frei bei Durchbrüchen.

<!-- IMAGE
name: kap04_deckentypen
type: comparison
size: landscape
desc: Querschnittsvergleich von drei Deckentypen: Flachdecke aus Stahlbeton, Rippendecke und Hohldielendecke. Jeweils mit typischer Spannweite, Eigengewicht-Tendenz, Installationshinweis und deutscher Beschriftung. Weißer Hintergrund, technisch-clean, keine Personen.
caption: Deckentypen unterscheiden sich in Gewicht, Spannweite und Durchbruchfreiheit
tags: decke, flachdecke, rippendecke, hohldiele
-->
![Deckentypen im Vergleich](../assets/illustrations/kap04_deckentypen.png)

!!! kastanienallee "Kastanienallee 7"
    Die Vordimensionierung setzt für 6 m Spannweite eine Stahlbetondecke von 22 cm an. Die Daumenregel l/30 ergäbe 6,0 m / 30 = 0,20 m; mit Schallschutz, Durchbiegung und Robustheit sind 22 cm plausibel. Innenstützen werden zunächst mit 30 cm × 30 cm angenommen. Stützenfläche = 0,09 m². Bei 1.100 kN Last ergibt sich eine mittlere Druckspannung von 1.100 kN / 0,09 m² = 12.222 kN/m² = 12,2 N/mm², noch ohne genaue Bemessung und Sicherheitskonzept.

## 8.6 Vordimensionierung

Vordimensionierung ist keine Statik, sondern frühe Plausibilitätsprüfung. Sie verhindert Entwürfe, die später nur mit Sonderlösungen funktionieren. Eine Stahlbetondecke kann grob mit l/30 angesetzt werden. Bei 6 m Spannweite sind das etwa 20 cm. Ein Unterzug kann überschlägig mit l/10 bis l/12 Höhe beginnen, je nach System. Eine Stütze muss nicht nur Druck aufnehmen, sondern auch brandschutztechnisch und ausführungstechnisch sinnvoll bleiben.

Wanddicken hängen von Tragfähigkeit, Schallschutz, Brandschutz, Installationen und Bauweise ab. Eine 11,5 cm Wand ist eine Trennwand, keine universelle Lösung. Eine Wohnungstrennwand braucht Masse oder Entkopplung. Ein Treppenhauskern braucht Brandschutz und Aussteifung. Wer nur "dünn" plant, erzeugt später technische Schulden.

Der Tragwerksplaner muss früh beteiligt werden, sobald Spannweiten, Auskragungen, Aufstockungen, große Öffnungen oder ungewöhnliche Lasten vorkommen. Architekten müssen nicht selbst bemessen, aber sie müssen wissen, welche Fragen rechtzeitig gestellt werden.

## 8.7 Tragwerk als Entwurfsparameter

Ein Tragwerk wird oft erst bemerkt, wenn es stört: eine Stütze steht im Wohnraum, ein Unterzug schneidet die lichte Höhe, ein Schacht liegt dort, wo eigentlich ein Träger verlaufen müsste. Gute Entwurfsplanung dreht diese Perspektive um. Das Tragwerk ist nicht die nachträgliche Rechtfertigung des Grundrisses, sondern eines seiner Ordnungsprinzipien.

Für den frühen Entwurf helfen drei Fragen. Erstens: Gibt es einen klaren Lastweg von jeder Decke bis zum Baugrund? Zweitens: Wiederholen sich Stützen, Wände und Kerne über die Geschosse, oder springen sie ohne Not? Drittens: Sind Öffnungen, Schächte, Treppen und Aufzüge so gelegt, dass sie das Tragwerk nicht unnötig schwächen? Ein Grundriss kann funktional wirken und statisch teuer sein, wenn jede Etage andere tragende Linien verlangt.

Besonders kritisch sind Wechsel. Ein Wechsel ist ein Bauteil, das eine unterbrochene Last weiterleitet, etwa weil im Erdgeschoss eine tragende Wand des Obergeschosses über einer Ladenfläche nicht fortgeführt werden kann. Wechsel sind möglich, aber sie kosten Höhe, Bewehrung, Planung und Bauzeit. In Mehrfamilienhäusern ist es deshalb wirtschaftlich, tragende Achsen durchlaufen zu lassen und Sonderfälle auf wenige Stellen zu begrenzen.

Auch die Aussteifung gehört in den Entwurf. Vertikale Lasten erklären, warum das Gebäude nicht nach unten versagt; horizontale Lasten erklären, warum es nicht kippt, schiebt oder sich verdreht. Treppenhaus- und Aufzugskerne, tragende Querwände oder Rahmen übernehmen diese Aufgabe. Wenn ein Baukörper sehr offen geplant ist, braucht er an anderer Stelle steife Elemente. Das ist der Grund, warum Kerne in vielen Gebäuden nicht zufällig, sondern strategisch gesetzt sind.

Für BIM ist diese Unterscheidung wichtig. Ein Architekturmodell zeigt oft alle Wände gleich. Ein Strukturmodell unterscheidet tragend und nichttragend, modelliert Achsen sauber und führt Bauteile mit anderen Toleranzen. Wenn diese Modelle vermischt werden, entstehen falsche Mengen, unklare Verantwortlichkeiten und schlechte Kollisionsprüfungen. Die einfache Eigenschaft `loadBearing = true` ist deshalb mehr als ein Häkchen: Sie entscheidet, ob ein Bauteil statisch relevant gelesen wird.

## BIM-Brücke: Tragwerk im Modell

Im digitalen Modell sollten tragende Bauteile eindeutig als solche erkennbar sein. `IfcColumn`, `IfcBeam`, `IfcSlab` und `IfcFooting` beschreiben Stützen, Träger, Decken und Fundamente. Properties wie `LoadBearing = true` sind keine Nebensache: Sie entscheiden, ob ein Prüfwerkzeug tragende von nichttragenden Elementen unterscheiden kann.

In der Praxis wird oft ein eigenes Strukturmodell geführt, getrennt vom Architekturmodell. Das ist sinnvoll, wenn Achsen, Querschnitte, Lasten und analytische Linien sauber gepflegt werden. Die Koordination zwischen beiden Modellen ist kritisch: Eine Türöffnung in der Architektur kann im Strukturmodell ein Unterzug, eine Bewehrungsänderung oder eine unzulässige Schwächung sein. IFC-Grundlagen folgen in [Kapitel 34](/chapters/34-ifc).

## Zusammenfassung

**Tragwerk ist der durchgehende Lastweg eines Gebäudes, nicht die Summe einzelner Bauteile.**

Wer Lastarten, Tragsysteme und Größenordnungen versteht, kann Entwürfe früh plausibilisieren. Das ersetzt keine Statik, macht aber Koordination möglich: Grundriss, Material, Brandschutz, Schallschutz und Kosten hängen direkt am Tragwerk.

Verwandte Kapitel: [Kap. 7](/chapters/07-baustoffe) · [Kap. 9](/chapters/09-konstruktion) · [Kap. 13](/chapters/13-brandschutz)
