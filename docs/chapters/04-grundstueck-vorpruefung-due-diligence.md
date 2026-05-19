# Kapitel 4 – Grundstück, Vorprüfung & Due Diligence

*Teil I – Fundament, Projektstart & Entwurf*

---

Ein Grundstück ist nie leer. Selbst wenn dort kein Gebäude steht, liegen Rechte, Leitungen, Höhen, Nachbarschaften, Bodenrisiken und Regeln darin. Wer diese Schicht zu spät liest, entwirft auf einer Annahme statt auf einem Ort.

---

!!! ziel "Nach diesem Kapitel können Sie …"
    - die wichtigsten Grundstücksprüfungen vor dem Entwurf benennen
    - rechtliche, technische und geologische Risiken unterscheiden
    - erklären, warum Vermessung und Baugrund für BIM und Entwurf grundlegend sind

## 4.1 Dokumente vor der Ortsidee

Vor jeder belastbaren Planung steht eine Dokumentenprüfung. Grundbuch, Baulastenverzeichnis, Bebauungsplan, Satzungen, Leitungspläne, Vermessung, Bodengutachten und Altlastenhinweise sagen, welche Spielräume ein Grundstück wirklich hat. Diese Prüfung ersetzt nicht den Entwurf, aber sie verhindert, dass der Entwurf an unsichtbaren Grenzen scheitert.

Das Grundbuch zeigt Eigentum, Rechte und Belastungen. Dienstbarkeiten können Leitungsrechte, Wegerechte oder Nutzungsbeschränkungen enthalten. Baulasten sichern öffentlich-rechtliche Verpflichtungen, etwa Abstandsflächen oder Zufahrten zugunsten eines Nachbargrundstücks. Ein Grundstück kann baulich attraktiv wirken und trotzdem durch solche Einträge stark eingeschränkt sein.

<!-- IMAGE
name: kap04_due_diligence_check
type: infographic
size: landscape
desc: Checkliste Grundstücksprüfung mit Spalten Dokument, Quelle, Prüffrage, Risiko und nächster Schritt. Zeilen: Grundbuch, Baulast, Bebauungsplan, Leitung, Vermessung, Bodengutachten, Altlast, Kampfmittel, Baumbestand. Weißer Hintergrund, deutsche Beschriftungen, technisch-clean, keine Personen.
caption: Due Diligence macht unsichtbare Grundstücksrisiken sichtbar
tags: kap04, due, diligence, check
-->
![Due Diligence macht unsichtbare Grundstücksrisiken sichtbar](../assets/illustrations/kap04_due_diligence_check.png)

## 4.2 Vermessung und Geometrie

Viele frühe Fehler entstehen aus falschen Geometrien. Ein Katasterplan ist keine Ausführungsgrundlage. Für Planung braucht es eine Vermessung mit Grenzen, Höhen, Gebäuden, Bäumen, Schächten, Einfriedungen, Nachbarbebauung und Bezugssystem. Erst dann lassen sich Abstandsflächen, Höhen, Zufahrten und Baugrenzen verlässlich prüfen.

Für digitale Planung ist die Vermessung auch der räumliche Ursprung. Ein Modell ohne sauberen Lage- und Höhenbezug kann später nicht zuverlässig mit Fachmodellen, GIS-Daten oder Vermessungsdaten abgeglichen werden. Wenn der lokale Modellursprung willkürlich gesetzt wird, entstehen Koordinationsprobleme spätestens bei Außenanlagen, Tiefbau oder Behördenplänen.

!!! kastanienallee "Kastanienallee 7"
    Für K7 wird vor dem Vorentwurf eine Vermessung mit Grundstücksgrenzen, Höhen, Gehwegkante, bestehenden Leitungen im Straßenraum, Nachbarfenstern und Baumbestand erstellt. Das Modell erhält einen lokalen Projektursprung, aber die Lage wird georeferenziert dokumentiert. Damit können Baugrenze, Zufahrt, Feuerwehrfläche und Außenanlagen später auf derselben Grundlage geplant werden.

## 4.3 Boden, Wasser, Altlasten

Baugrund ist eine der teuersten Unsicherheiten. Bodenklasse, Tragfähigkeit, Grundwasser, Versickerungsfähigkeit, Kontamination und Kampfmittelverdacht beeinflussen Gründung, Aushub, Entsorgung, Bauzeit und Kosten. Ein Bodengutachten ist deshalb keine Formalität, sondern eine technische und wirtschaftliche Grundlage.

Altlasten können aus früheren Nutzungen entstehen: Tankstellen, Werkstätten, Druckereien, Industrie, Auffüllungen oder teerhaltige Schichten. Kampfmittelrisiken hängen stark vom Ort ab. Beide Themen müssen früh geprüft werden, weil sie nicht nur Kosten, sondern auch Genehmigung, Arbeitsschutz und Terminplan verändern.

<!-- IMAGE
name: kap04_risikokarte_grundstueck
type: diagram
size: landscape
desc: Schematischer Lageplan eines innerstädtischen Grundstücks mit Baugrenze, Leitungstrasse, geschütztem Baum, Zufahrt, Nachbarfenstern, Höhenlinien und Altlastenverdachtsfläche. Risiken farblich markiert. Weißer Hintergrund, deutsche Beschriftungen, technisch-clean, keine Personen.
caption: Eine Grundstücksrisikokarte verbindet Dokumente mit räumlicher Planung
tags: kap04, risikokarte, grundstueck
-->
![Eine Grundstücksrisikokarte verbindet Dokumente mit räumlicher Planung](../assets/illustrations/kap04_risikokarte_grundstueck.png)

## 4.4 Nachbarn, Zufahrt und Baustelle

Nachbarn sind nicht erst im Genehmigungsverfahren relevant. Ihre Gebäude bestimmen Abstandsflächen, Belichtung, Einblicke, Schallschutz, Baugrubensicherung und Baustellenlogistik. Ein Nachbarfenster, eine Grenzwand oder ein empfindlicher Keller kann den Bauablauf beeinflussen.

Auch Zufahrt und Baustelle gehören zur Vorprüfung. Kann ein Lkw anfahren? Gibt es Platz für Kran, Container und Lager? Muss ein Gehweg gesperrt werden? Gibt es Lieferzeitfenster oder enge Straßen? Solche Fragen wirken früh auf Termin, Kosten und Vergabe. Ein Entwurf, der nur die Endform zeigt, aber den Bauprozess ignoriert, ist unvollständig.

## 4.5 BIM-Brücke: Grundstück als Modellkontext

Das Grundstück erscheint im Modell nicht nur als Fläche. Es ist Kontext: `IfcSite`, Höhenbezug, Nordrichtung, Nachbarvolumen, Leitungsinformationen, Geländemodell, Risikoflächen und spätere Baustelleneinrichtung. Nicht alle Informationen müssen als IFC-Objekt modelliert werden, aber sie müssen auffindbar, versioniert und mit dem Modellbezug verbunden sein.

Gerade in frühen Phasen ist der Modellkontext oft wichtiger als Detailgeometrie. Wenn Baugrenze, Topografie und Nachbarvolumen stimmen, können Varianten realistisch bewertet werden. Wenn diese Grundlagen falsch sind, wirken selbst präzise Wände nur scheinbar professionell.

## Normen und Grundlagen

BauGB, BauNVO, Bebauungsplan und Landesbauordnung bestimmen die öffentlich-rechtliche Zulässigkeit. Vermessungsunterlagen und Baugrundgutachten liefern technische Grundlagen. Bei Altlasten, Kampfmitteln, Baumschutz oder Denkmalschutz greifen je nach Ort zusätzliche Regelwerke und Behördenzuständigkeiten.

## Zusammenfassung

**Ein Grundstück muss gelesen werden, bevor es entworfen wird.**

Grundbuch, Baulasten, Vermessung, Leitungen, Boden, Altlasten, Nachbarn und Baustellenlogistik sind keine Randnotizen. Sie bilden die unsichtbare Struktur, in der der Entwurf entstehen darf.

Verwandte Kapitel: [Kap. 5](/chapters/05-standortanalyse-grobskizzen-varianten) · [Kap. 18](/chapters/18-planungsrecht-bauantrag) · [Kap. 28](/chapters/28-baustellenvorbereitung-sigeko-baustelleneinrichtung)
